/* Vital Health - respaldo de solo lectura. No restaura ni escribe en Firebase. */
import { getApps, getApp } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js';
import { getFirestore, collection, getDocs } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js';
const COLECCIONES = ['ordenes','caja','catalogo','pacientes','cotizaciones','configuracion'];
const esperar = ms => new Promise(resolve => setTimeout(resolve, ms));
function descargarJSON(datos, nombre) {
  const blob = new Blob([JSON.stringify(datos, null, 2)], { type: 'application/json;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a'); a.href = url; a.download = nombre;
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 60000);
}
async function crearRespaldoVitalHealth(boton) {
  const original = boton.textContent;
  boton.disabled = true; boton.textContent = 'Preparando respaldo...';
  try {
    const fecha = new Date();
    const datos = { formato: 'VITAL_HEALTH_BACKUP', version: 1, generadoEn: fecha.toISOString(),
      origen: location.origin, local: {}, firebase: {}, advertencias: [], resumen: {} };
    for (let i = 0; i < localStorage.length; i++) {
      const clave = localStorage.key(i);
      if (!clave || !clave.startsWith('vital_')) continue;
      const valor = localStorage.getItem(clave);
      try { datos.local[clave] = JSON.parse(valor); } catch { datos.local[clave] = valor; }
    }
    if (!getApps().length) {
      for (let n = 0; n < 12 && !getApps().length; n++) await esperar(250);
    }
    if (!getApps().length) {
      datos.advertencias.push('Firebase no está inicializado. Respaldo únicamente local.');
    } else {
      const app = getApp();
      const usuario = getAuth(app).currentUser;
      if (!usuario) {
        datos.advertencias.push('No hay sesión Firebase activa. Respaldo únicamente local.');
      } else {
        const config = window.FIREBASE_CONFIG || {};
        const db = config.databaseId ? getFirestore(app, config.databaseId) : getFirestore(app);
        for (const nombre of COLECCIONES) {
          try {
            const snap = await getDocs(collection(db, nombre));
            datos.firebase[nombre] = snap.docs.map(d => ({ id: d.id, datos: d.data() }));
            datos.resumen[nombre] = snap.size;
          } catch (e) {
            datos.advertencias.push('No se pudo leer Firebase/' + nombre + ': ' + (e.code || e.message));
          }
        }
      }
    }
    datos.resumen.clavesLocales = Object.keys(datos.local).length;
    datos.completo = datos.advertencias.length === 0;
    const sello = fecha.toISOString().replace(/[:.]/g, '-');
    descargarJSON(datos, `VITAL_HEALTH_RESPALDO_${datos.completo ? 'COMPLETO' : 'PARCIAL'}_${sello}.json`);
    alert(datos.completo
      ? 'Respaldo descargado. Guárdalo en un lugar seguro y comprueba que puedes abrirlo.'
      : 'Respaldo PARCIAL descargado. Revisa las advertencias dentro del JSON; no es una copia completa.');
  } catch (e) {
    console.error('Respaldo Vital Health:', e);
    alert('No se pudo completar el respaldo: ' + e.message);
  } finally { boton.disabled = false; boton.textContent = original; }
}
function instalarBoton() {
  if (document.getElementById('vital-btn-respaldo')) return;
  const btn = document.createElement('button');
  btn.id = 'vital-btn-respaldo'; btn.type = 'button';
  btn.className = 'btn btn-sm btn-outline-light mt-2';
  btn.textContent = 'Descargar respaldo';
  btn.addEventListener('click', () => crearRespaldoVitalHealth(btn));
  const lugar = document.querySelector('.sidebar-footer') || document.body;
  lugar.appendChild(btn);
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', instalarBoton);
else instalarBoton();
