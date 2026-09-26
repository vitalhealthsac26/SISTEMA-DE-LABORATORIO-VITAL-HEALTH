/* ============================================================
   CENTRO MÉDICO VITAL HEALTH - SISTEMA DE LABORATORIO
   Código JS completo y corregido
   ============================================================ */

'use strict';

const STORAGE = {
  ORDENES: 'ordenes_lab',
  PLANTILLAS: 'plantillas_lab',
  CONFIG: 'vital_health_config',
  DNI_CACHE: 'vital_health_dni_cache',
  CONTADOR: 'vital_health_contador_orden',
  PRODUCTOS: 'vital_health_productos'
};

const APP_CONFIG_DEFAULT = {
  nombreCentro: 'CENTRO MÉDICO VITAL HEALTH',
  moneda: 'S/',
  maxResultadosBusqueda: 10,
  timeoutMs: 8000
};

let itemsVenta = [];
let ordenes = cargarJSON(STORAGE.ORDENES, []) || [];
let ordenResultadoActual = null;

/* PLANTILLAS POR DEFECTO */
const plantillasPredeterminadas = {
  "HEMOGRAMA COMPLETO": [
    { parametro: "Leucocitos", unidad: "Cél/uL", referencia: "4,500 - 11,000", metodo: "Automatizado" },
    { parametro: "Hemoglobina", unidad: "g/dL", referencia: "12.0 - 16.0", metodo: "Espectrofotometría" },
    { parametro: "Hematocrito", unidad: "%", referencia: "37.0 - 48.0", metodo: "Centrifugación" },
    { parametro: "Plaquetas", unidad: "Cél/uL", referencia: "150,000 - 450,000", metodo: "Impedancia" }
  ],
  "PERFIL LIPIDICO": [
    { parametro: "Colesterol Total", unidad: "mg/dL", referencia: "< 200", metodo: "Enzimático" },
    { parametro: "Triglicéridos", unidad: "mg/dL", referencia: "< 150", metodo: "Enzimático" },
    { parametro: "HDL Colesterol", unidad: "mg/dL", referencia: "> 40", metodo: "Directo" },
    { parametro: "LDL Colesterol", unidad: "mg/dL", referencia: "< 100", metodo: "Calculado" }
  ],
  "GLUCOSA EN AYUNAS": [
    { parametro: "Glucosa", unidad: "mg/dL", referencia: "70 - 106", metodo: "Enzimático" }
  ]
};

let plantillasExamenes = cargarJSON(STORAGE.PLANTILLAS, plantillasPredeterminadas) || plantillasPredeterminadas;

// EXÁMENES DISPONIBLES
let productos = [
  { Codigo: "EX-01", Nombre: "HEMOGRAMA COMPLETO", Precio: 25.00 },
  { Codigo: "EX-02", Nombre: "PERFIL LIPIDICO", Precio: 45.00 },
  { Codigo: "EX-03", Nombre: "GLUCOSA EN AYUNAS", Precio: 12.00 },
  { Codigo: "EX-04", Nombre: "EXAMEN COMPLETO DE ORINA", Precio: 15.00 },
  { Codigo: "EX-05", Nombre: "CREATININA EN SANGRE", Precio: 15.00 },
  { Codigo: "EX-06", Nombre: "UREA EN SANGRE", Precio: 15.00 }
];

/* INICIALIZACIÓN */
document.addEventListener('DOMContentLoaded', () => {
  actualizarFechaActual();
  inicializarEventos();
  poblarSelectPlantillas();
  renderizarVenta();
  cargarTablaOrdenes();
  cargarTablaOrdenesResultados();
});

function actualizarFechaActual() {
  const el = document.getElementById('fechaActual');
  if (el) {
    const opciones = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    el.textContent = new Date().toLocaleDateString('es-PE', opciones);
  }
}

function inicializarEventos() {
  const dniInput = document.getElementById('v-dni');
  if (dniInput) {
    dniInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        consultarDNI();
      }
    });
  }

  const busquedaExamen = document.getElementById('v-buscar');
  if (busquedaExamen) {
    busquedaExamen.addEventListener('input', (e) => {
      mostrarResultadosBusqueda(e.target.value.trim());
    });
  }
}

/* ============================================================
   BÚSQUEDA Y CONSULTA DNI (RENIEC / CACHÉ LOCAL)
   ============================================================ */

async function consultarDNI() {
  const dniInput = document.getElementById('v-dni');
  const nombreInput = document.getElementById('v-paciente');
  const btn = document.getElementById('btnConsultarDNI');

  if (!dniInput || !nombreInput) return;

  const dni = dniInput.value.replace(/\D/g, '').trim();

  if (dni.length !== 8) {
    notificar('Ingrese un DNI válido de 8 dígitos.', 'warning');
    return;
  }

  // 1. Revisar Caché local o Pacientes Previos
  const cache = cargarJSON(STORAGE.DNI_CACHE, {}) || {};
  if (cache[dni]) {
    completarCamposPaciente(cache[dni]);
    notificar('Paciente encontrado en historial.', 'success');
    return;
  }

  // 2. Consulta API Externa (Respaldo RENIEC)
  setLoading(btn, true, 'Buscando...');
  try {
    const res = await fetch(`https://dniruc.apisperu.com/api/v1/dni/${dni}?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjo2MzA5LCJpYXQiOjE3MDY4OTgwNDd9.3`);
    
    if (res.ok) {
      const data = await res.json();
      if (data && data.nombres) {
        const nombreCompleto = `${data.nombres} ${data.apellidoPaterno} ${data.apellidoMaterno}`.trim();
        const infoPaciente = {
          nombreCompleto,
          dni
        };
        
        cache[dni] = infoPaciente;
        guardarJSON(STORAGE.DNI_CACHE, cache);
        
        completarCamposPaciente(infoPaciente);
        notificar('Datos obtenidos correctamente.', 'success');
        return;
      }
    }
    throw new Error('No encontrado');
  } catch (error) {
    notificar('No se pudo autocompletar. Ingrese el nombre manualmente.', 'warning');
    nombreInput.focus();
  } finally {
    setLoading(btn, false, '🔍 Consultar');
  }
}

function completarCamposPaciente(data) {
  const nombreInput = document.getElementById('v-paciente');
  if (nombreInput) nombreInput.value = data.nombreCompleto || '';
}

function calcularEdad() {
  const fnacInput = document.getElementById('v-fnac');
  const edadInput = document.getElementById('v-edad');
  
  if (!fnacInput || !fnacInput.value) return;

  const nac = new Date(fnacInput.value);
  const hoy = new Date();
  let edad = hoy.getFullYear() - nac.getFullYear();
  const m = hoy.getMonth() - nac.getMonth();

  if (m < 0 || (m === 0 && hoy.getDate() < nac.getDate())) {
    edad--;
  }

  if (edadInput) edadInput.value = Math.max(0, edad);
}

/* ============================================================
   GESTIÓN DE RECEPCIÓN Y VENTA
   ============================================================ */

function mostrarResultadosBusqueda(termino) {
  const cont = document.getElementById('v-resultados');
  if (!cont) return;

  if (!termino) {
    cont.innerHTML = '';
    return;
  }

  const norm = termino.toLowerCase();
  const coincidencia = productos.filter(p => 
    p.Nombre.toLowerCase().includes(norm) || p.Codigo.toLowerCase().includes(norm)
  );

  if (!coincidencia.length) {
    cont.innerHTML = `<div class="search-result-item"><span>No se encontraron exámenes</span></div>`;
    return;
  }

  cont.innerHTML = coincidencia.map(p => `
    <div class="search-result-item" onclick="seleccionarExamen('${p.Codigo}')">
      <div>
        <strong>${escapeHTML(p.Nombre)}</strong>
        <br><small>Código: ${p.Codigo}</small>
      </div>
      <strong>S/ ${p.Precio.toFixed(2)}</strong>
    </div>
  `).join('');
}

function seleccionarExamen(codigo) {
  const prod = productos.find(p => p.Codigo === codigo);
  if (!prod) return;

  const exist = itemsVenta.find(item => item.Codigo === codigo);
  if (exist) {
    exist.cantidad++;
  } else {
    itemsVenta.push({ ...prod, cantidad: 1 });
  }

  renderizarVenta();
  calcularTotalCobro();

  const inputBusqueda = document.getElementById('v-buscar');
  if (inputBusqueda) inputBusqueda.value = '';
  mostrarResultadosBusqueda('');
}

function renderizarVenta() {
  const tabla = document.getElementById('v-lista');
  if (!tabla) return;

  if (!itemsVenta.length) {
    tabla.innerHTML = `<tr><td colspan="6" class="text-center">No hay exámenes agregados a la orden.</td></tr>`;
    return;
  }

  tabla.innerHTML = itemsVenta.map((item, idx) => `
    <tr>
      <td>${item.Codigo}</td>
      <td>${escapeHTML(item.Nombre)}</td>
      <td>
        <input type="number" min="1" value="${item.cantidad}" style="width:60px" onchange="cambiarCantidad(${idx}, this.value)">
      </td>
      <td>S/ ${item.Precio.toFixed(2)}</td>
      <td>S/ ${(item.Precio * item.cantidad).toFixed(2)}</td>
      <td class="text-center">
        <button type="button" class="btn-delete" onclick="eliminarItemVenta(${idx})">🗑️</button>
      </td>
    </tr>
  `).join('');
}

function cambiarCantidad(idx, val) {
  const c = Math.max(1, parseInt(val) || 1);
  itemsVenta[idx].cantidad = c;
  renderizarVenta();
  calcularTotalCobro();
}

function eliminarItemVenta(idx) {
  itemsVenta.splice(idx, 1);
  renderizarVenta();
  calcularTotalCobro();
}

function calcularTotalCobro() {
  const subtotal = itemsVenta.reduce((acc, item) => acc + (item.Precio * item.cantidad), 0);
  const descInput = document.getElementById('v-descuento');
  const descuento = parseFloat(descInput?.value) || 0;
  const total = Math.max(0, subtotal - descuento);

  document.getElementById('v-subtotal').textContent = `S/ ${subtotal.toFixed(2)}`;
  document.getElementById('v-total').textContent = `S/ ${total.toFixed(2)}`;
}

function cargarPlantillaEnVenta() {
  const select = document.getElementById('selectorPlantilla');
  const nombre = select?.value;

  if (!nombre) return;

  let prod = productos.find(p => p.Nombre.toUpperCase() === nombre.toUpperCase());
  if (!prod) {
    prod = { Codigo: `PL-${Date.now().toString().slice(-4)}`, Nombre: nombre, Precio: 30.00 };
  }

  seleccionarExamen(prod.Codigo);
}

/* ============================================================
   EMISIÓN DE ÓRDENES Y TICKET
   ============================================================ */

function guardarYEmitirTicket() {
  const dni = document.getElementById('v-dni')?.value.trim();
  const paciente = document.getElementById('v-paciente')?.value.trim();

  if (!dni || !paciente) {
    notificar('Complete el DNI y nombre del paciente.', 'warning');
    return;
  }

  if (!itemsVenta.length) {
    notificar('Agregue al menos un examen a la orden.', 'warning');
    return;
  }

  const contador = (parseInt(localStorage.getItem(STORAGE.CONTADOR) || '0') + 1);
  localStorage.setItem(STORAGE.CONTADOR, contador.toString());

  const numOrden = `VH-${new Date().getFullYear()}-${contador.toString().padStart(5, '0')}`;
  
  const subtotal = itemsVenta.reduce((acc, item) => acc + (item.Precio * item.cantidad), 0);
  const descuento = parseFloat(document.getElementById('v-descuento')?.value) || 0;

  const nuevaOrden = {
    id: Date.now().toString(),
    numeroOrden: numOrden,
    fecha: new Date().toISOString().split('T')[0],
    hora: new Date().toLocaleTimeString('es-PE', { hour: '2-digit', minute: '2-digit' }),
    paciente: {
      dni,
      nombre: paciente,
      edad: document.getElementById('v-edad')?.value || '-',
      sexo: document.getElementById('v-sexo')?.value || '-'
    },
    examenes: [...itemsVenta],
    subtotal,
    descuento,
    total: Math.max(0, subtotal - descuento),
    estado: 'PENDIENTE'
  };

  ordenes.unshift(nuevaOrden);
  guardarJSON(STORAGE.ORDENES, ordenes);

  notificar(`Orden ${numOrden} registrada con éxito.`, 'success');
  imprimirTicketVentana(nuevaOrden);
  limpiarFormularioRecepcion();
  cargarTablaOrdenes();
  cargarTablaOrdenesResultados();
}

function imprimirTicketVentana(orden) {
  const win = window.open('', '_blank', 'width=400,height=600');
  if (!win) return;

  win.document.write(`
    <html>
    <head>
      <title>Ticket ${orden.numeroOrden}</title>
      <style>
        body { font-family: monospace; padding: 10px; width: 280px; font-size: 12px; }
        .text-center { text-align: center; }
        .line { border-bottom: 1px dashed #000; margin: 8px 0; }
        table { width: 100%; font-size: 11px; }
      </style>
    </head>
    <body>
      <div class="text-center">
        <strong>CENTRO MÉDICO VITAL HEALTH</strong><br>
        Av. Grau N° 1799 - Piura<br>
        Telf: 984 089 927
      </div>
      <div class="line"></div>
      <div>
        <strong>ORDEN:</strong> ${orden.numeroOrden}<br>
        <strong>FECHA:</strong> ${orden.fecha} ${orden.hora}<br>
        <strong>DNI:</strong> ${orden.paciente.dni}<br>
        <strong>PACIENTE:</strong> ${orden.paciente.nombre}
      </div>
      <div class="line"></div>
      <table>
        ${orden.examenes.map(e => `
          <tr>
            <td>${e.cantidad}x${e.Nombre}</td>
            <td style="text-align:right">S/ ${(e.Precio * e.cantidad).toFixed(2)}</td>
          </tr>
        `).join('')}
      </table>
      <div class="line"></div>
      <div style="text-align:right">
        Subtotal: S/ ${orden.subtotal.toFixed(2)}<br>
        Descuento: S/ ${orden.descuento.toFixed(2)}<br>
        <strong>TOTAL: S/ ${orden.total.toFixed(2)}</strong>
      </div>
      <div class="line"></div>
      <div class="text-center">¡Gracias por su preferencia!</div>
      <script>window.onload = function() { window.print(); window.close(); }</script>
    </body>
    </html>
  `);
  win.document.close();
}

function limpiarFormularioRecepcion() {
  document.getElementById('v-dni').value = '';
  document.getElementById('v-paciente').value = '';
  document.getElementById('v-fnac').value = '';
  document.getElementById('v-edad').value = '';
  document.getElementById('v-sexo').value = '';
  document.getElementById('v-descuento').value = '0';
  itemsVenta = [];
  renderizarVenta();
  calcularTotalCobro();
}

/* ============================================================
   HISTORIAL Y RESULTADOS
   ============================================================ */

function cargarTablaOrdenes() {
  const tbody = document.getElementById('o-lista');
  if (!tbody) return;

  const busqueda = document.getElementById('o-buscar')?.value.toLowerCase() || '';

  const filtradas = ordenes.filter(o => 
    o.numeroOrden.toLowerCase().includes(busqueda) ||
    o.paciente.nombre.toLowerCase().includes(busqueda) ||
    o.paciente.dni.includes(busqueda)
  );

  if (!filtradas.length) {
    tbody.innerHTML = `<tr><td colspan="7" class="text-center">No hay órdenes encontradas.</td></tr>`;
    return;
  }

  tbody.innerHTML = filtradas.map(o => `
    <tr>
      <td><strong>${o.numeroOrden}</strong></td>
      <td>${o.fecha}</td>
      <td>${o.paciente.dni}</td>
      <td>${escapeHTML(o.paciente.nombre)}</td>
      <td>S/ ${o.total.toFixed(2)}</td>
      <td><span class="estado estado-${o.estado.toLowerCase()}">${o.estado}</span></td>
      <td class="text-center">
        <button type="button" class="btn btn-primary" onclick="cargarOrdenParaResultados('${o.id}')">🧪 Resultados</button>
      </td>
    </tr>
  `).join('');
}

function cargarTablaOrdenesResultados() {
  const cont = document.getElementById('r-lista');
  if (!cont) return;

  const busqueda = document.getElementById('r-buscar')?.value.toLowerCase() || '';

  const filtradas = ordenes.filter(o => 
    o.numeroOrden.toLowerCase().includes(busqueda) ||
    o.paciente.nombre.toLowerCase().includes(busqueda) ||
    o.paciente.dni.includes(busqueda)
  );

  cont.innerHTML = filtradas.map(o => `
    <div class="orden-result-item" onclick="cargarOrdenParaResultados('${o.id}')">
      <div>
        <strong>${o.numeroOrden}</strong> - ${escapeHTML(o.paciente.nombre)}
        <br><small>DNI: ${o.paciente.dni} | Fecha: ${o.fecha}</small>
      </div>
      <span class="estado estado-${o.estado.toLowerCase()}">${o.estado}</span>
    </div>
  `).join('');
}

function cargarOrdenParaResultados(id) {
  const orden = ordenes.find(o => o.id === id);
  if (!orden) return;

  ordenResultadoActual = orden;
  cambiarModulo('resultados');

  const pacienteDiv = document.getElementById('r-paciente');
  pacienteDiv.innerHTML = `
    <h3>📋 ${escapeHTML(orden.paciente.nombre)}</h3>
    <p><strong>DNI:</strong> ${orden.paciente.dni} | <strong>Orden:</strong> ${orden.numeroOrden} | <strong>Edad:</strong> ${orden.paciente.edad} | <strong>Sexo:</strong> ${orden.paciente.sexo}</p>
  `;

  const examenesDiv = document.getElementById('r-examenes');
  examenesDiv.innerHTML = orden.examenes.map((ex, idx) => {
    const plantilla = plantillasExamenes[ex.Nombre] || plantillasExamenes[Object.keys(plantillasExamenes).find(k => ex.Nombre.includes(k))];

    if (plantilla) {
      return `
        <div class="card" style="margin-top:15px;">
          <h4>🧪 ${escapeHTML(ex.Nombre)}</h4>
          <table>
            <thead>
              <tr>
                <th>Parámetro</th>
                <th>Resultado</th>
                <th>Unidad</th>
                <th>Referencia</th>
              </tr>
            </thead>
            <tbody>
              ${plantilla.map(p => `
                <tr>
                  <td>${p.parametro}</td>
                  <td>
                    <input type="text" class="input-param" data-exam="${idx}" data-param="${p.parametro}" value="${ex.resultadosParams?.[p.parametro] || ''}">
                  </td>
                  <td>${p.unidad}</td>
                  <td>${p.referencia}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      `;
    }

    return `
      <div class="card" style="margin-top:15px;">
        <h4>🧪 ${escapeHTML(ex.Nombre)}</h4>
        <div class="form-group">
          <label>Resultado General:</label>
          <input type="text" class="input-simple" data-exam="${idx}" value="${ex.resultadoSimple || ''}">
        </div>
      </div>
    `;
  }).join('');
}

function guardarResultadosOrden() {
  if (!ordenResultadoActual) return;

  ordenResultadoActual.examenes.forEach((ex, idx) => {
    const paramsInputs = document.querySelectorAll(`.input-param[data-exam="${idx}"]`);
    if (paramsInputs.length) {
      ex.resultadosParams = ex.resultadosParams || {};
      paramsInputs.forEach(inp => {
        ex.resultadosParams[inp.dataset.param] = inp.value;
      });
    }

    const simpleInput = document.querySelector(`.input-simple[data-exam="${idx}"]`);
    if (simpleInput) {
      ex.resultadoSimple = simpleInput.value;
    }
  });

  ordenResultadoActual.estado = 'COMPLETADO';
  guardarJSON(STORAGE.ORDENES, ordenes);
  notificar('Resultados guardados correctamente.', 'success');
  cargarTablaOrdenes();
  cargarTablaOrdenesResultados();
}

function imprimirResultadosPDF() {
  if (!ordenResultadoActual) {
    notificar('Seleccione una orden primero.', 'warning');
    return;
  }

  const element = document.createElement('div');
  element.style.padding = '30px';
  element.style.fontFamily = 'Arial, sans-serif';

  element.innerHTML = `
    <div style="text-align:center; border-bottom:2px solid #0284c7; padding-bottom:10px;">
      <h2 style="color:#0284c7; margin:0;">CENTRO MÉDICO VITAL HEALTH</h2>
      <p style="margin:0;">Av. Grau N° 1799 - Piura | Tel: 984 089 927</p>
      <h3 style="margin-top:10px;">INFORME DE RESULTADOS DE LABORATORIO</h3>
    </div>
    <div style="margin:15px 0; font-size:12px;">
      <p><strong>PACIENTE:</strong> ${ordenResultadoActual.paciente.nombre} | <strong>DNI:</strong> ${ordenResultadoActual.paciente.dni}</p>
      <p><strong>N° ORDEN:</strong> ${ordenResultadoActual.numeroOrden} | <strong>FECHA:</strong> ${ordenResultadoActual.fecha}</p>
    </div>
    <hr>
    ${ordenResultadoActual.examenes.map(ex => `
      <div style="margin-top:15px;">
        <h4 style="background:#e0f2fe; padding:5px; margin:0;">Examen: ${ex.Nombre}</h4>${ex.resultadosParams ? `
          <table style="width:100%; border-collapse:collapse; font-size:11px; margin-top:5px;">
            <thead>
              <tr style="border-bottom:1px solid #ccc;">
                <th style="text-align:left;">Parámetro</th>
                <th style="text-align:center;">Resultado</th>
                <th style="text-align:center;">Unidad</th>
                <th style="text-align:left;">Referencia</th>
              </tr>
            </thead>
            <tbody>
              ${Object.entries(ex.resultadosParams).map(([k, v]) => `
                <tr style="border-bottom:1px solid #eee;">
                  <td>${k}</td>
                  <td style="text-align:center; font-weight:bold;">${v}</td>
                  <td style="text-align:center;">-</td>
                  <td>-</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        ` : `<p><strong>Resultado:</strong> ${ex.resultadoSimple || 'Pendiente'}</p>`}
      </div>
    `).join('')}
  `;

  html2pdf().from(element).save(`Resultado_${ordenResultadoActual.numeroOrden}.pdf`);
}

/* ============================================================
   PLANTILLAS Y NAVEGACIÓN
   ============================================================ */

function cambiarModulo(modulo, btn) {
  document.querySelectorAll('.module').forEach(m => m.classList.remove('active-module'));
  const target = document.getElementById(`modulo-${modulo}`);
  if (target) target.classList.add('active-module');

  document.querySelectorAll('.menu-item').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');

  const titulos = {
    recepcion: ['Recepción', 'Registro y atención de pacientes'],
    ordenes: ['Órdenes', 'Historial de órdenes registradas'],
    resultados: ['Resultados', 'Ingreso y validación de analíticas'],
    plantillas: ['Plantillas', 'Configuración de parámetros por examen']
  };

  if (titulos[modulo]) {
    document.getElementById('tituloModulo').textContent = titulos[modulo][0];
    document.getElementById('subtituloModulo').textContent = titulos[modulo][1];
  }
}

function poblarSelectPlantillas() {
  const selects = [document.getElementById('selectorPlantilla'), document.getElementById('selectorPlantillaEditar')];
  const keys = Object.keys(plantillasExamenes);

  selects.forEach(s => {
    if (s) {
      s.innerHTML = '<option value="">Seleccionar plantilla...</option>' + 
        keys.map(k => `<option value="${k}">${k}</option>`).join('');
    }
  });
}

/* AUXILIARES */
function cargarJSON(k, fallback) {
  try {
    const raw = localStorage.getItem(k);
    return raw ? JSON.parse(raw) : fallback;
  } catch { return fallback; }
}

function guardarJSON(k, val) {
  try { localStorage.setItem(k, JSON.stringify(val)); } catch {}
}

function escapeHTML(str) {
  return String(str || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function setLoading(btn, cargando, text) {
  if (!btn) return;
  btn.disabled = cargando;
  btn.textContent = text;
}

function notificar(msg, tipo = 'info') {
  alert(`${tipo.toUpperCase()}: ${msg}`);
}
