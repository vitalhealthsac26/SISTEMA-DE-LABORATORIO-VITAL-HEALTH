// ============================================================
// SINCRONIZACIÓN EN LA NUBE (FIREBASE FIRESTORE + AUTH)
// ============================================================
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
    getFirestore, collection, getDocs, doc, setDoc, deleteDoc, onSnapshot
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import {
    getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const config = window.FIREBASE_CONFIG;
const configurado = !!(config && config.apiKey && String(config.apiKey).indexOf("PEGAR") === -1);

let db = null;
let auth = null;
let iniciado = false;
let suscrito = false;
let aplicandoRemoto = false;

function limpiar(objeto) {
    return JSON.parse(JSON.stringify(objeto));
}

function nubeIniciar() {
    if (iniciado) return;
    iniciado = true;

    const login = document.getElementById("modalLogin");
    const sesion = document.getElementById("nube-sesion");

    if (!configurado) {
        if (login) login.classList.add("d-none");
        if (sesion) sesion.classList.add("d-none");
        return;
    }

    const app = initializeApp(config);
    db = config.databaseId ? getFirestore(app, config.databaseId) : getFirestore(app);
    auth = getAuth(app);

    onAuthStateChanged(auth, usuario => {
        if (usuario) {
            if (login) login.classList.add("d-none");
            if (sesion) {
                sesion.classList.remove("d-none");
                const correo = document.getElementById("nube-correo");
                if (correo) correo.textContent = usuario.email || "sesión iniciada";
            }
            sincronizarTodo();
        } else if (login) {
            login.classList.remove("d-none");
        }
    });
}

window.nubeIniciarSesion = async function () {
    if (!auth) return;
    const correo = (document.getElementById("login-correo")?.value || "").trim();
    const clave = document.getElementById("login-clave")?.value || "";
    const error = document.getElementById("login-error");
    if (error) error.textContent = "";
    try {
        await signInWithEmailAndPassword(auth, correo, clave);
    } catch (e) {
        if (error) error.textContent = "Correo o contraseña incorrectos.";
    }
};

window.nubeCerrarSesion = function () {
    if (auth) signOut(auth);
};

async function sincronizarTodo() {
    if (aplicandoRemoto || window.bloquearSincronizacion || !db) return;
    aplicandoRemoto = true;
    try {
        if (typeof window.ordenesRegistradas === "undefined") window.ordenesRegistradas = [];
        const ordenesLocales = window.ordenesRegistradas || [];
        const snapOrd = await getDocs(collection(db, "ordenes"));
        let ordenesActualizadas = [...ordenesLocales];

        snapOrd.forEach(d => {
            const remota = d.data();
            const idOrdenStr = String(d.id);
            if (window.ordenesEliminadas && window.ordenesEliminadas.includes(idOrdenStr)) return;
            
            const local = ordenesActualizadas.find(o => String(o.nroOrden) === idOrdenStr);
            if (!local) ordenesActualizadas.push(remota);
            else if ((remota.en || 0) > (local.en || 0)) Object.assign(local, remota);
        });
        ordenesActualizadas.sort((a, b) => (b.en || 0) - (a.en || 0));

        if (typeof window.actualizarOrdenesDesdeRemoto === "function") {
            window.actualizarOrdenesDesdeRemoto(ordenesActualizadas);
        } else {
            window.ordenesRegistradas = ordenesActualizadas;
        }

        const snapCat = await getDocs(collection(db, "catalogo"));
        const catalogoLocal = window.examenesCatalogo || [];
        snapCat.forEach(d => {
            const remoto = d.data();
            const idCodStr = String(d.id);
            const eliminadosExamenes = JSON.parse(localStorage.getItem("vital_examenes_eliminados") || "[]");
            if (eliminadosExamenes.includes(idCodStr)) return;

            const idx = catalogoLocal.findIndex(e => String(e.codigo) === idCodStr);
            if (idx === -1) catalogoLocal.push(remoto);
            else if ((remoto.en || 0) > (catalogoLocal[idx].en || 0)) catalogoLocal[idx] = remoto;
        });

        const snapCaja = await getDocs(collection(db, "caja"));
        const eliminadosCaja = JSON.parse(localStorage.getItem("vital_caja_eliminados") || "[]");
        const ordenesEliminadas = window.ordenesEliminadas || JSON.parse(localStorage.getItem("vital_ordenes_eliminadas") || "[]");
        const nrosOrdenesActivas = new Set();
        (window.ordenesRegistradas || []).forEach(o => {
            if (o && o.nroOrden) {
                const s = String(o.nroOrden).trim().toUpperCase();
                nrosOrdenesActivas.add(s);
                const sinPrefijo = s.replace(/^ORD-/, "");
                nrosOrdenesActivas.add(sinPrefijo);
                nrosOrdenesActivas.add("ORD-" + sinPrefijo);
            }
        });

        let nuevaCaja = [];
        for (const d of snapCaja.docs) {
            const idMovStr = String(d.id);
            const remota = d.data();
            remota.id = idMovStr;
            const nroOrdNorm = String(remota.nroOrden || "").trim().toUpperCase();

            // Validación estricta: sólo cobros de órdenes que existan actualmente
            const ordenFueEliminada = nroOrdNorm && (ordenesEliminadas.includes(nroOrdNorm) || ordenesEliminadas.includes(nroOrdNorm.replace(/^ORD-/, "")));
            const ordenInexistente = nroOrdNorm && !nrosOrdenesActivas.has(nroOrdNorm);
            const sinOrden = !nroOrdNorm;

            if (ordenFueEliminada || ordenInexistente || sinOrden) {
                // Eliminar cobro huérfano de Firestore
                try {
                    await deleteDoc(doc(db, "caja", idMovStr));
                } catch (e) {
                    console.error("Error purgando cobro inválido en Firestore:", e);
                }
                continue;
            }

            nuevaCaja.push(remota);
        }

        const mergeFn = window.mergePorClave || function(list, fn) {
            const m = new Map();
            (list || []).forEach(x => { const k = fn(x); if (!m.has(k)) m.set(k, x); });
            return Array.from(m.values());
        };

        const cajaActual = window.cajaMovimientos || [];
        const cajaCombinada = mergeFn(cajaActual.concat(nuevaCaja), m => m.id);
        cajaCombinada.sort((a, b) => (b.en || 0) - (a.en || 0));

        if (typeof window.actualizarCajaDesdeRemoto === "function") {
            window.actualizarCajaDesdeRemoto(cajaCombinada);
        } else {
            window.cajaMovimientos = cajaCombinada;
        }
        
        const snapPac = await getDocs(collection(db, "pacientes"));
        snapPac.forEach(d => {
            const remota = d.data();
            if (!window.pacientesRegistrados) window.pacientesRegistrados = [];
            const norm = (typeof normalizarPaciente === "function") ? normalizarPaciente(remota) : remota;
            const clave = String(norm.dni || d.id);
            if (typeof pacienteEliminado === "function" && pacienteEliminado(clave)) return;
            
            const idx = window.pacientesRegistrados.findIndex(p => (p.dni && String(p.dni) === clave) || String(p.id) === d.id);
            if (idx === -1) window.pacientesRegistrados.push(norm);
            else window.pacientesRegistrados[idx] = Object.assign({}, window.pacientesRegistrados[idx], norm);
        });

        const snapCot = await getDocs(collection(db, "cotizaciones"));
        let nuevasCot = [];
        snapCot.forEach(d => {
            const remota = d.data();
            const idCotStr = String(d.id);
            const eliminadosCot = JSON.parse(localStorage.getItem("vital_cotizaciones_eliminadas") || "[]");
            if (eliminadosCot.includes(idCotStr)) return;

            if (!window.cotizacionesGuardadas) window.cotizacionesGuardadas = [];
            const norm = (typeof estandarizarCotizacion === "function") ? estandarizarCotizacion(remota) : remota;
            norm.id = idCotStr;
            nuevasCot.push(norm);
        });
        window.cotizacionesGuardadas = mergePorClave((window.cotizacionesGuardadas || []).concat(nuevasCot), c => c.id);
        window.cotizacionesGuardadas = window.cotizacionesGuardadas.filter(c => !JSON.parse(localStorage.getItem("vital_cotizaciones_eliminadas") || "[]").includes(String(c.id)));

        try {
            const snapConf = await getDocs(collection(db, "configuracion"));
            snapConf.forEach(d => {
                if (d.id === "general") {
                    const remota = d.data();
                    if (remota && remota.logoBase64) {
                        localStorage.setItem("vital_logo_custom", remota.logoBase64);
                        window.VITAL_LOGO_CUSTOM = remota.logoBase64;
                        const sideImg = document.getElementById("sidebar-logo-img");
                        if (sideImg) sideImg.src = remota.logoBase64;
                    }
                }
            });
        } catch (eConf) {
            // Documento de configuración opcional
        }

        persistirDatos();
        if (typeof actualizarTotalesCaja === "function") actualizarTotalesCaja();
        if (typeof cargarCotizaciones === "function") cargarCotizaciones();
        if (typeof cargarOrdenes === "function") cargarOrdenes();
    } catch (error) {
        console.error("No se pudo sincronizar con la nube:", error);
    } finally {
        aplicandoRemoto = false;
    }
}

window.nubeGuardarConfiguracion = function (conf) {
    if (!db || !auth || !auth.currentUser) return;
    setDoc(doc(db, "configuracion", "general"), limpiar(conf), { merge: true })
        .catch(error => console.error("No se pudo subir la configuración a la nube:", error));
};

window.nubeGuardarOrden = function (orden) {
    if (!db || !auth || !auth.currentUser) return;
    setDoc(doc(db, "ordenes", String(orden.nroOrden)), limpiar(orden))
        .catch(error => console.error("No se pudo subir la orden a la nube:", error));
};

window.nubeGuardarMovimiento = function (movimiento) {
    if (!db || !auth || !auth.currentUser) return;
    setDoc(doc(db, "caja", String(movimiento.id)), limpiar(movimiento))
        .catch(error => console.error("No se pudo subir el movimiento a la nube:", error));
};

window.nubeGuardarExamen = function (examen) {
    if (!db || !auth || !auth.currentUser) return;
    setDoc(doc(db, "catalogo", String(examen.codigo)), limpiar(examen))
        .catch(error => console.error("No se pudo subir el examen a la nube:", error));
};

window.nubeGuardarPaciente = function (paciente) {
    if (!db || !auth || !auth.currentUser) return;
    const idDoc = String(paciente.dni || paciente.id || `pac_${Date.now()}`);
    setDoc(doc(db, "pacientes", idDoc), limpiar(paciente))
        .catch(error => console.error("No se pudo subir el paciente a la nube:", error));
};

window.nubeGuardarCotizacion = function (cotizacion) {
    if (!db || !auth || !auth.currentUser) return;
    const idDoc = String(cotizacion.id || `cot_${Date.now()}`);
    setDoc(doc(db, "cotizaciones", idDoc), limpiar(cotizacion))
        .catch(error => console.error("No se pudo subir la cotización a la nube:", error));
};

window.nubeEliminarOrden = function (nroOrden) {
    if (!db || !auth || !auth.currentUser) return;
    deleteDoc(doc(db, "ordenes", String(nroOrden)))
        .catch(error => console.error("No se pudo eliminar la orden de la nube:", error));
};

window.nubeEliminarMovimiento = async function (idMovimiento) {
    if (!db || !auth || !auth.currentUser) return;
    deleteDoc(doc(db, "caja", String(idMovimiento))).catch(e => console.error(e));
};

window.nubeEliminarExamen = function (codigoExamen) {
    if (!db || !auth || !auth.currentUser) return;
    deleteDoc(doc(db, "catalogo", String(codigoExamen)))
        .catch(error => console.error("No se pudo eliminar el examen de la nube:", error));
};

window.nubeEliminarPaciente = function (paciente) {
    if (!db || !auth || !auth.currentUser) return;
    const idDoc = String(paciente.dni || paciente.id);
    if (!idDoc) return;
    deleteDoc(doc(db, "pacientes", idDoc))
        .catch(error => console.error("No se pudo eliminar el paciente de la nube:", error));
};

window.nubeEliminarCotizacion = async function (idCotizacion) {
    if (!db || !auth || !auth.currentUser) return;
    deleteDoc(doc(db, "cotizaciones", String(idCotizacion))).catch(e => console.error(e));
};

window.nubeSincronizarTodo = sincronizarTodo;
window.nubeIniciar = nubeIniciar;
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => nubeIniciar());
} else {
    nubeIniciar();
}
