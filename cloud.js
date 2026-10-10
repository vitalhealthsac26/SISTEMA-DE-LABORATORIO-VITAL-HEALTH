// ============================================================
// SINCRONIZACIÓN EN LA NUBE (FIREBASE FIRESTORE + AUTH) - CORREGIDO
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
        // Asegurar que la variable global exista antes de usarla
        if (typeof window.ordenesRegistradas === "undefined") window.ordenesRegistradas = [];
        if (typeof ordenesRegistradas === "undefined") {
            var ordenesRegistradas = window.ordenesRegistradas;
        }

        // ---- ÓRDENES ----
        const snapOrd = await getDocs(collection(db, "ordenes"));
        snapOrd.forEach(d => {
            const remota = d.data();
            const idOrdenStr = String(d.id);
            // Evitar que resurjan si están en la lista negra local
            if (window.ordenesEliminadas && window.ordenesEliminadas.includes(idOrdenStr)) return;
            
            const local = ordenesRegistradas.find(o => String(o.nroOrden) === idOrdenStr);
            if (!local) ordenesRegistradas.push(remota);
            else if ((remota.en || 0) > (local.en || 0)) Object.assign(local, remota);
        });
        ordenesRegistradas.sort((a, b) => (b.en || 0) - (a.en || 0));

        // ---- CATÁLOGO ----
        const snapCat = await getDocs(collection(db, "catalogo"));
snapCat.forEach(d => {
    const remoto = d.data();
    const idCodStr = String(d.id);
    
    // FILTRO ESTRICTO EN NUBE: Si está en la lista negra local, se ignora
    const eliminadosExamenes = JSON.parse(localStorage.getItem("vital_examenes_eliminados") || "[]");
    if (eliminadosExamenes.includes(idCodStr)) return;

    const idx = examenesCatalogo.findIndex(e => String(e.codigo) === idCodStr);
    if (idx === -1) examenesCatalogo.push(remoto);
    else if ((remoto.en || 0) > (examenesCatalogo[idx].en || 0)) examenesCatalogo[idx] = remoto;
});

        // ---- CAJA ----
        const snapCaja = await getDocs(collection(db, "caja"));
        let nuevaCaja = [];
        snapCaja.forEach(d => {
            const idMovStr = String(d.id);
            // FILTRO ESTRICTO: Si está en la lista negra local, se ignora por completo de la nube
            const eliminadosCaja = JSON.parse(localStorage.getItem("vital_caja_eliminados") || "[]");
            if (eliminadosCaja.includes(idMovStr)) return;

            const remota = d.data();
            remota.id = idMovStr;
            nuevaCaja.push(remota);
        });
        // Sincronizar array local con los datos remotos filtrados
        cajaMovimientos = mergePorClave(cajaMovimientos.concat(nuevaCaja), m => m.id);
        cajaMovimientos = cajaMovimientos.filter(m => !JSON.parse(localStorage.getItem("vital_caja_eliminados") || "[]").includes(String(m.id)));
        cajaMovimientos.sort((a, b) => (b.en || 0) - (a.en || 0));
        
        // ---- PACIENTES ----
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

        // ---- COTIZACIONES ----
        const snapCot = await getDocs(collection(db, "cotizaciones"));
        let nuevasCot = [];
        snapCot.forEach(d => {
            const remota = d.data();
            const idCotStr = String(d.id);
            // FILTRO ESTRICTO: Si está en la lista negra local, se ignora por completo de la nube
            const eliminadosCot = JSON.parse(localStorage.getItem("vital_cotizaciones_eliminadas") || "[]");
            if (eliminadosCot.includes(idCotStr)) return;

            if (!window.cotizacionesGuardadas) window.cotizacionesGuardadas = [];
            const norm = (typeof estandarizarCotizacion === "function") ? estandarizarCotizacion(remota) : remota;
            norm.id = idCotStr;
            nuevasCot.push(norm);
        });
        window.cotizacionesGuardadas = mergePorClave((window.cotizacionesGuardadas || []).concat(nuevasCot), c => c.id);
        window.cotizacionesGuardadas = window.cotizacionesGuardadas.filter(c => !JSON.parse(localStorage.getItem("vital_cotizaciones_eliminadas") || "[]").includes(String(c.id)));

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

function suscribirCambios() {
    if (suscrito || !db) return;
    suscrito = true;
    onSnapshot(collection(db, "ordenes"), snap => {
        if (aplicandoRemoto) return;
        let cambio = false;
        snap.docChanges().forEach(ch => {
            const datos = ch.doc.data();
            if (typeof ordenesRegistradas === "undefined") window.ordenesRegistradas = [];
            const idx = ordenesRegistradas.findIndex(o => String(o.nroOrden) === String(ch.doc.id));
            if (ch.type === "removed") {
                if (idx >= 0) {
                    ordenesRegistradas.splice(idx, 1);
                    cambio = true;
                }
            } else if (idx === -1) {
                if (!window.ordenesEliminadas || !window.ordenesEliminadas.includes(String(ch.doc.id))) {
                    ordenesRegistradas.push(datos);
                    cambio = true;
                }
            } else if ((datos.en || 0) > (ordenesRegistradas[idx].en || 0)) {
                Object.assign(ordenesRegistradas[idx], datos);
                cambio = true;
            }
        });
        if (cambio) {
            ordenesRegistradas.sort((a, b) => (b.en || 0) - (a.en || 0));
            persistirDatos();
            if (typeof cargarOrdenes === "function") cargarOrdenes();
        }
    });
}
// ============================================================
// FUNCIONES DE GUARDADO EN LA NUBE
// ============================================================
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

// ============================================================
// FUNCIONES DE ELIMINACIÓN EN LA NUBE (NUEVAS Y CORREGIDAS)
// ============================================================
window.nubeEliminarOrden = function (nroOrden) {
    if (!db || !auth || !auth.currentUser) return;
    deleteDoc(doc(db, "ordenes", String(nroOrden)))
        .catch(error => console.error("No se pudo eliminar la orden de la nube:", error));
};

window.nubeEliminarMovimiento = async function (idMovimiento) {
    if (!db || !auth || !auth.currentUser) return;
    const idStr = String(idMovimiento);
    try {
        await deleteDoc(doc(db, "caja", idStr));
        console.log("Movimiento de caja eliminado de la nube con éxito:", idStr);
    } catch (error) {
        console.error("Error al eliminar movimiento de caja en la nube (revisa tus reglas de Firebase):", error);
    }
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
    const idStr = String(idCotizacion);
    try {
        await deleteDoc(doc(db, "cotizaciones", idStr));
        console.log("Cotización eliminada de la nube con éxito:", idStr);
    } catch (error) {
        console.error("Error al eliminar cotización en la nube (revisa tus reglas de Firebase):", error);
    }
};

window.nubeIniciar = nubeIniciar;

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => nubeIniciar());
} else {
    nubeIniciar();
}
// ==========================================
// GESTIÓN DINÁMICA DE PLANTILLAS Y PARÁMETROS
// ==========================================

// 1. Obtener la plantilla (Revisa Firebase primero, si no está, busca en el app.js local)
async function obtenerPlantillaCompleta(nombreOcodigo) {
    if (!nombreOcodigo) return null;
    const clave = String(nombreOcodigo).trim().toUpperCase();

    // Intentar leer de Firestore (Plantillas editadas o creadas por la web)
    if (typeof db !== 'undefined' && db) {
        try {
            const docRef = doc(db, "plantillas_examenes", clave);
            const snap = await getDoc(docRef);
            if (snap.exists()) {
                console.log("Plantilla cargada desde Firebase Firestore para:", clave);
                return snap.data().parametros; 
            }
        } catch (e) {
            console.warn("No se pudo leer de Firestore, usando respaldo local:", e);
        }
    }

    // Si no está en Firestore, buscar en el BASE_VALORES_REFERENCIALES estático del app.js
    if (typeof BASE_VALORES_REFERENCIALES !== 'undefined' && BASE_VALORES_REFERENCIALES[clave]) {
        console.log("Plantilla cargada desde el código local (app.js):", clave);
        return BASE_VALORES_REFERENCIALES[clave];
    }

    return null; // Retorna nulo si el examen aún no tiene plantilla
}

// 2. Guardar o actualizar la plantilla directamente en Firestore desde la web
async function guardarPlantillaEnNube(codigoOModulo, listaParametros) {
    if (!db) {
        alert("Error: Firebase no está inicializado.");
        return false;
    }
    const clave = String(codigoOModulo).trim().toUpperCase();
    try {
        const docRef = doc(db, "plantillas_examenes", clave);
        await setDoc(docRef, {
            codigo: clave,
            parametros: listaParametros,
            actualizadoEn: new Date().toISOString()
        }, { merge: true });
        
        alert("¡Plantilla guardada exitosamente en la nube!");
        return true;
    } catch (error) {
        console.error("Error al guardar la plantilla en Firestore:", error);
        alert("Hubo un error al guardar la plantilla en la nube.");
        return false;
    }
}
