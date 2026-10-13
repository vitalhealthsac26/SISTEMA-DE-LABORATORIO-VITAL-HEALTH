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
            sincronizarTodoEnTiempoReal();
            sincronizarConfiguracionInicial();
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

// Carga única para configuración general (logo, etc.)
async function sincronizarConfiguracionInicial() {
    if (!db) return;
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
}

// Sincronización en tiempo real con onSnapshot para que los cambios y eliminaciones se reflejen al instante
function sincronizarTodoEnTiempoReal() {
    if (suscrito || !db) return;
    suscrito = true;

    // 1. Órdenes
    onSnapshot(collection(db, "ordenes"), (snapshot) => {
        if (typeof window.ordenesRegistradas === "undefined") window.ordenesRegistradas = [];
        
        snapshot.docChanges().forEach((change) => {
            const remota = change.doc.data();
            const idOrdenStr = String(change.doc.id);
            const eliminadas = window.ordenesEliminadas || [];

            if (change.type === "added" || change.type === "modified") {
                if (eliminadas.includes(idOrdenStr)) return;
                const idx = ordenesRegistradas.findIndex(o => String(o.nroOrden) === idOrdenStr);
                if (idx === -1) {
                    ordenesRegistradas.push(remota);
                } else if ((remota.en || 0) >= (ordenesRegistradas[idx].en || 0)) {
                    Object.assign(ordenesRegistradas[idx], remota);
                }
            }
            if (change.type === "removed") {
                ordenesRegistradas = ordenesRegistradas.filter(o => String(o.nroOrden) !== idOrdenStr);
            }
        });

        ordenesRegistradas.sort((a, b) => (b.en || 0) - (a.en || 0));
        persistirDatos();
        if (typeof cargarOrdenes === "function") cargarOrdenes();
        if (typeof actualizarTotalesCaja === "function") actualizarTotalesCaja();
    });

    // 2. Catálogo de Exámenes
    onSnapshot(collection(db, "catalogo"), (snapshot) => {
        if (typeof examenesCatalogo === "undefined") return;

        snapshot.docChanges().forEach((change) => {
            const remoto = change.doc.data();
            const idCodStr = String(change.doc.id);
            const eliminadosExamenes = JSON.parse(localStorage.getItem("vital_examenes_eliminados") || "[]");

            if (change.type === "added" || change.type === "modified") {
                if (eliminadosExamenes.includes(idCodStr)) return;
                const idx = examenesCatalogo.findIndex(e => String(e.codigo) === idCodStr);
                if (idx === -1) {
                    examenesCatalogo.push(remoto);
                } else if ((remoto.en || 0) >= (examenesCatalogo[idx].en || 0)) {
                    examenesCatalogo[idx] = remoto;
                }
            }
            if (change.type === "removed") {
                examenesCatalogo = examenesCatalogo.filter(e => String(e.codigo) !== idCodStr);
            }
        });

        persistirDatos();
        if (typeof renderizarTablaCatalogo === "function") renderizarTablaCatalogo();
    });

    // 3. Caja (Movimientos)
    onSnapshot(collection(db, "caja"), (snapshot) => {
        if (typeof cajaMovimientos === "undefined") cajaMovimientos = [];

        snapshot.docChanges().forEach((change) => {
            const remota = change.doc.data();
            const idMovStr = String(change.doc.id);
            remota.id = idMovStr;
            const eliminadosCaja = JSON.parse(localStorage.getItem("vital_caja_eliminados") || "[]");

            if (change.type === "added" || change.type === "modified") {
                if (eliminadosCaja.includes(idMovStr)) return;
                const idx = cajaMovimientos.findIndex(m => String(m.id) === idMovStr);
                if (idx === -1) {
                    cajaMovimientos.push(remota);
                } else {
                    Object.assign(cajaMovimientos[idx], remota);
                }
            }
            if (change.type === "removed") {
                cajaMovimientos = cajaMovimientos.filter(m => String(m.id) !== idMovStr);
            }
        });

        cajaMovimientos.sort((a, b) => (b.en || 0) - (a.en || 0));
        persistirDatos();
        if (typeof actualizarTotalesCaja === "function") actualizarTotalesCaja();
    });

    // 4. Pacientes
    onSnapshot(collection(db, "pacientes"), (snapshot) => {
        if (!window.pacientesRegistrados) window.pacientesRegistrados = [];

        snapshot.docChanges().forEach((change) => {
            const remota = change.doc.data();
            const norm = (typeof normalizarPaciente === "function") ? normalizarPaciente(remota) : remota;
            const clave = String(norm.dni || change.doc.id);
            if (typeof pacienteEliminado === "function" && pacienteEliminado(clave)) return;

            if (change.type === "added" || change.type === "modified") {
                const idx = window.pacientesRegistrados.findIndex(p => (p.dni && String(p.dni) === clave) || String(p.id) === change.doc.id);
                if (idx === -1) {
                    window.pacientesRegistrados.push(norm);
                } else {
                    window.pacientesRegistrados[idx] = Object.assign({}, window.pacientesRegistrados[idx], norm);
                }
            }
            if (change.type === "removed") {
                window.pacientesRegistrados = window.pacientesRegistrados.filter(p => String(p.dni) !== clave && String(p.id) !== change.doc.id);
            }
        });

        persistirDatos();
        if (typeof cargarPacientes === "function") cargarPacientes();
    });

    // 5. Cotizaciones
    onSnapshot(collection(db, "cotizaciones"), (snapshot) => {
        if (!window.cotizacionesGuardadas) window.cotizacionesGuardadas = [];

        snapshot.docChanges().forEach((change) => {
            const remota = change.doc.data();
            const idCotStr = String(change.doc.id);
            const eliminadosCot = JSON.parse(localStorage.getItem("vital_cotizaciones_eliminadas") || "[]");

            if (change.type === "added" || change.type === "modified") {
                if (eliminadosCot.includes(idCotStr)) return;
                const norm = (typeof estandarizarCotizacion === "function") ? estandarizarCotizacion(remota) : remota;
                norm.id = idCotStr;
                const idx = window.cotizacionesGuardadas.findIndex(c => String(c.id) === idCotStr);
                if (idx === -1) {
                    window.cotizacionesGuardadas.push(norm);
                } else {
                    Object.assign(window.cotizacionesGuardadas[idx], norm);
                }
            }
            if (change.type === "removed") {
                window.cotizacionesGuardadas = window.cotizacionesGuardadas.filter(c => String(c.id) !== idCotStr);
            }
        });

        persistirDatos();
        if (typeof cargarCotizaciones === "function") cargarCotizaciones();
    });
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

window.nubeIniciar = nubeIniciar;
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => nubeIniciar());
} else {
    nubeIniciar();
}
