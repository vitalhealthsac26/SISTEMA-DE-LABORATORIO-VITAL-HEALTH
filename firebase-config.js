// ============================================================
// CONFIGURACIÓN DE FIREBASE (NUBE GRATUITA)
// ------------------------------------------------------------
// 1. Entra a https://console.firebase.google.com con tu correo de Google.
// 2. Crea un proyecto (por ejemplo: vital-health).
// 3. En el panel: icono de engranaje > Configuración del proyecto >
//    pestaña "Tus apps" > icono de Web (</>) > registra la app.
// 4. Copia el objeto firebaseConfig que te muestra y REEMPLAZA el de abajo.
// Estos valores NO son contraseñas: son públicos por diseño.
// La seguridad real la dan las reglas de Firestore + el inicio de sesión.
// Mientras quede "PEGAR_AQUI", el sistema trabaja solo con guardado local.
// ============================================================
window.FIREBASE_CONFIG = {
    apiKey: "AIzaSyCnfZWIK9DMhArtAyZWr0k-AjutROgAey8",
    authDomain: "vital-health-87bd5.firebaseapp.com",
    projectId: "vital-health-87bd5",
    storageBucket: "vital-health-87bd5.firebasestorage.app",
    messagingSenderId: "771716316070",
    appId: "1:771716316070:web:02feb539bf11a32821ad67"
    // databaseId: "vital-health"   <-- quitar las // del inicio SOLO si en la
    // consola de Firestore tu base de datos aparece con un nombre propio
    // (por ejemplo "vital-health") en vez de "(default)".
};
