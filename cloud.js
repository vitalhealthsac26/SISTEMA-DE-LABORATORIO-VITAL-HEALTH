// ============================================================
// SINCRONIZACIÓN EN LA NUBE (FIREBASE FIRESTORE + AUTH)
// Permite usar el mismo sistema desde varias laptops.
// Si firebase-config.js sigue con "PEGAR_AQUI", este módulo
// se desactiva y el sistema trabaja con guardado local.
// ============================================================
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
    getFirestore, collection, getDocs, doc, setDoc, onSnapshot
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
    if (aplicandoRemoto || !db) return;
    aplicandoRemoto = true;
    try {
        const snapOrd = await getDocs(collection(db, "ordenes"));
        const remotasOrd = {};
        snapOrd.forEach(d => { remotasOrd[d.id] = d.data(); });

        snapOrd.forEach(d => {
            const remota = d.data();
            const local = ordenesRegistradas.find(o => o.nroOrden === d.id);
            if (!local) ordenesRegistradas.push(remota);
            else if ((remota.en || 0) > (local.en || 0)) Object.assign(local, remota);
        });
        ordenesRegistradas.sort((a, b) => (b.en || 0) - (a.en || 0));

        const snapCat = await getDocs(collection(db, "catalogo"));
        const remotasCat = {};
        snapCat.forEach(d => { remotasCat[d.id] = d.data(); });
        snapCat.forEach(d => {
            const remoto = d.data();
            const idx = examenesCatalogo.findIndex(e => e.codigo === d.id);
            if (idx === -1) examenesCatalogo.push(remoto);
            else if ((remoto.en || 0) > (examenesCatalogo[idx].en || 0)) examenesCatalogo[idx] = remoto;
        });

        const snapCaja = await getDocs(collection(db, "caja"));
        const remotasCaja = {};
        snapCaja.forEach(d => { remotasCaja[d.id] = d.data(); });
        snapCaja.forEach(d => {
            if (!cajaMovimientos.some(m => m.id === d.id)) cajaMovimientos.push(d.data());
        });
        cajaMovimientos.sort((a, b) => (b.en || 0) - (a.en || 0));

        for (const ord of ordenesRegistradas) {
            if (!ord.en) ord.en = Date.now();
            const remota = remotasOrd[ord.nroOrden];
            if (!remota || (remota.en || 0) < ord.en) {
                await setDoc(doc(db, "ordenes", ord.nroOrden), limpiar(ord));
            }
        }
        for (const ex of examenesCatalogo) {
            if (!ex.en) ex.en = Date.now();
            const remoto = remotasCat[ex.codigo];
            if (!remoto || (remoto.en || 0) < ex.en) {
                await setDoc(doc(db, "catalogo", ex.codigo), limpiar(ex));
            }
        }
        for (const mov of cajaMovimientos) {
            if (!mov.id) mov.id = `${mov.en || Date.now()}-${mov.nroOrden}`;
            if (!remotasCaja[mov.id]) {
                await setDoc(doc(db, "caja", mov.id), limpiar(mov));
            }
        }

        persistirDatos();
        cargarOrdenes();
        renderizarTablaCatalogo();
        actualizarTotalesCaja();
        suscribirCambios();
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
            const idx = ordenesRegistradas.findIndex(o => o.nroOrden === ch.doc.id);
            if (ch.type === "removed") {
                if (idx >= 0) {
                    ordenesRegistradas.splice(idx, 1);
                    cambio = true;
                }
            } else if (idx === -1) {
                ordenesRegistradas.push(datos);
                cambio = true;
            } else if ((datos.en || 0) > (ordenesRegistradas[idx].en || 0)) {
                Object.assign(ordenesRegistradas[idx], datos);
                cambio = true;
            }
        });
        if (cambio) {
            ordenesRegistradas.sort((a, b) => (b.en || 0) - (a.en || 0));
            persistirDatos();
            cargarOrdenes();
        }
    });
}

window.nubeGuardarOrden = function (orden) {
    if (!db || !auth || !auth.currentUser) return;
    setDoc(doc(db, "ordenes", orden.nroOrden), limpiar(orden))
        .catch(error => console.error("No se pudo subir la orden a la nube:", error));
};

window.nubeGuardarMovimiento = function (movimiento) {
    if (!db || !auth || !auth.currentUser) return;
    setDoc(doc(db, "caja", movimiento.id), limpiar(movimiento))
        .catch(error => console.error("No se pudo subir el movimiento a la nube:", error));
};

window.nubeGuardarExamen = function (examen) {
    if (!db || !auth || !auth.currentUser) return;
    setDoc(doc(db, "catalogo", examen.codigo), limpiar(examen))
        .catch(error => console.error("No se pudo subir el examen a la nube:", error));
};

window.nubeIniciar = nubeIniciar;

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => nubeIniciar());
} else {
    nubeIniciar();
}
