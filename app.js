// Base de datos local (Persistencia con localStorage)
let examenes = JSON.parse(localStorage.getItem('vh_examenes')) || [
  {
    codigo: '1006',
    nombre: 'SUB-UNIDAD HCG BETA CUALITATIVO',
    precio: 25,
    tipoMuestra: 'Suero / Sangre',
    metodo: 'Inmunocromatografía',
    observaciones: 'Prueba Cualitativa',
    parametros: [
      { nombre: 'SUB-UNIDAD HCG BETA CUALITATIVO', unidad: '', refMin: '', refMax: '', textoRef: 'No Reactivo' }
    ]
  }
];

let ordenes = JSON.parse(localStorage.getItem('vh_ordenes')) || [];

document.addEventListener("DOMContentLoaded", () => {
  actualizarFecha();
  renderizarCatalogo();
  renderizarOrdenes();
  renderizarCaja();
  document.getElementById('filtro-fecha-caja').valueAsDate = new Date();
});

function guardarPersistencia() {
  localStorage.setItem('vh_examenes', JSON.stringify(examenes));
  localStorage.setItem('vh_ordenes', JSON.stringify(ordenes));
}

function actualizarFecha() {
  const hoy = new Date();
  const opciones = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  document.getElementById('current-date').innerText = hoy.toLocaleDateString('es-ES', opciones);
}

function switchTab(tabId) {
  document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
  document.getElementById(`tab-${tabId}`).classList.add('active');
  event.currentTarget.classList.add('active');
  
  if (tabId === 'caja') renderizarCaja();
}

/* CATALOGO DE EXAMENES Y PARAMETROS DINAMICOS */
function renderizarCatalogo() {
  if (examenes.length > 0) {
    cargarFormularioExamen(0);
  }
}

function cargarFormularioExamen(index) {
  const ex = examenes[index];
  const container = document.getElementById('editor-examen-container');
  
  container.innerHTML = `
    <h3><i class="fa-regular fa-pen-to-square"></i> Editando: ${ex.nombre}</h3>
    <br>
    <div class="form-grid">
      <div class="form-group">
        <label>Código</label>
        <input type="text" id="edit-codigo" value="${ex.codigo}">
      </div>
      <div class="form-group">
        <label>Precio (S/)</label>
        <input type="number" id="edit-precio" value="${ex.precio}">
      </div>
    </div>
    <div class="form-group">
      <label>Nombre del Examen</label>
      <input type="text" id="edit-nombre" value="${ex.nombre}">
    </div>
    <div class="form-grid" style="margin-top:10px;">
      <div class="form-group">
        <label>Tipo de Muestra</label>
        <input type="text" id="edit-muestra" value="${ex.tipoMuestra || ''}">
      </div>
      <div class="form-group">
        <label>Método de Análisis</label>
        <input type="text" id="edit-metodo" value="${ex.metodo || ''}">
      </div>
    </div>

    <div style="display:flex; justify-content:space-between; align-items:center; margin:15px 0;">
      <h4><i class="fa-solid fa-list"></i> Parámetros / Indicadores</h4>
      <button class="btn btn-secondary" onclick="agregarParametroCuadro()"><i class="fa-solid fa-plus"></i> Agregar Parámetro</button>
    </div>

    <div id="contenedor-parametros">
      ${ex.parametros.map((p, i) => generarHtmlParametro(p, i)).join('')}
    </div>

    <div class="form-group" style="margin-top:15px;">
      <label>Texto de Observación o Método Predeterminado</label>
      <textarea id="edit-obs" rows="3">${ex.observaciones || ''}</textarea>
    </div>

    <button class="btn btn-primary" style="width:100%; margin-top:15px;" onclick="guardarCambiosExamen(${index})">
      <i class="fa-solid fa-circle-check"></i> Guardar Cambios del Examen
    </button>
  `;
}

function generarHtmlParametro(p, index) {
  return `
    <div class="param-card" id="param-box-${index}">
      <div class="param-header">
        <span><i class="fa-regular fa-list-alt"></i> Indicador / Parámetro #${index + 1}</span>
        <button class="btn-remove" onclick="quitarParametroCuadro(${index})"><i class="fa-solid fa-xmark"></i> Quitar</button>
      </div>
      <div class="form-grid">
        <input type="text" class="p-nombre" value="${p.nombre || ''}" placeholder="Nombre Indicador">
        <input type="text" class="p-unidad" value="${p.unidad || ''}" placeholder="Unidad (Ej: mg/dL)">
      </div>
      <div class="form-grid" style="margin-top:5px;">
        <input type="text" class="p-refmin" value="${p.refMin || ''}" placeholder="Ref. Mínimo">
        <input type="text" class="p-refmax" value="${p.refMax || ''}" placeholder="Ref. Máximo">
      </div>
      <input type="text" class="p-texto" value="${p.textoRef || ''}" placeholder="Texto Ref. (Ej: No Reactivo)" style="width:100%; margin-top:5px;">
    </div>
  `;
}

function agregarParametroCuadro() {
  const container = document.getElementById('contenedor-parametros');
  const index = container.children.length;
  const div = document.createElement('div');
  div.innerHTML = generarHtmlParametro({ nombre: '', unidad: '', refMin: '', refMax: '', textoRef: '' }, index);
  container.appendChild(div.firstElementChild);
}

function quitarParametroCuadro(index) {
  const box = document.getElementById(`param-box-${index}`);
  if (box) box.remove();
}

function guardarCambiosExamen(index) {
  const paramBoxes = document.querySelectorAll('.param-card');
  const nuevosParametros = [];

  paramBoxes.forEach(box => {
    nuevosParametros.push({
      nombre: box.querySelector('.p-nombre').value,
      unidad: box.querySelector('.p-unidad').value,
      refMin: box.querySelector('.p-refmin').value,
      refMax: box.querySelector('.p-refmax').value,
      textoRef: box.querySelector('.p-texto').value
    });
  });

  examenes[index] = {
    codigo: document.getElementById('edit-codigo').value,
    nombre: document.getElementById('edit-nombre').value,
    precio: parseFloat(document.getElementById('edit-precio').value) || 0,
    tipoMuestra: document.getElementById('edit-muestra').value,
    metodo: document.getElementById('edit-metodo').value,
    observaciones: document.getElementById('edit-obs').value,
    parametros: nuevosParametros
  };

  guardarPersistencia();
  alert('Examen guardado con éxito.');
}

/* GESTIÓN DE RECEPCIÓN Y ÓRDENES */
function guardarOrden(e) {
  e.preventDefault();
  const fechaHoy = new Date().toISOString().split('T')[0];
  const horaHoy = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });

  const nuevaOrden = {
    numero: `VH-2026-${String(ordenes.length + 1).padStart(5, '0')}`,
    fecha: fechaHoy,
    hora: horaHoy,
    dni: document.getElementById('pac-dni').value,
    paciente: document.getElementById('pac-nombre').value,
    metodoPago: document.getElementById('pac-pago').value,
    monto: examenes[0] ? examenes[0].precio : 25.00,
    estado: 'COMPLETADO'
  };

  ordenes.push(nuevaOrden);
  guardarPersistencia();
  document.getElementById('form-orden').reset();
  renderizarOrdenes();
  alert('Orden guardada correctamente');
}

function renderizarOrdenes() {
  const tbody = document.getElementById('tabla-ordenes');
  tbody.innerHTML = ordenes.map(o => `
    <tr>
      <td><strong>${o.numero}</strong></td>
      <td>${o.fecha}</td>
      <td>${o.dni}</td>
      <td>${o.paciente}</td>
      <td><span class="badge">${o.estado}</span></td>
      <td>
        <button class="btn btn-primary" onclick="alert('Cargando resultados...')">
          <i class="fa-solid fa-list-check"></i> Cargar Resultados
        </button>
      </td>
    </tr>
  `).join('');
}

/* CAJA DIARIA CON FILTROS */
function renderizarCaja() {
  const filtroFecha = document.getElementById('filtro-fecha-caja').value;
  const filtroBuscar = document.getElementById('filtro-buscar-caja').value.toLowerCase();
  
  const ordenesFiltradas = ordenes.filter(o => {
    const coincideFecha = !filtroFecha || o.fecha === filtroFecha;
    const coincideBusqueda = o.paciente.toLowerCase().includes(filtroBuscar) || o.numero.toLowerCase().includes(filtroBuscar);
    return coincideFecha && coincideBusqueda;
  });

  let total = 0, efectivo = 0, digital = 0;
  const tbody = document.getElementById('tabla-caja');
  tbody.innerHTML = '';

  ordenesFiltradas.forEach(o => {
    total += o.monto;
    if (o.metodoPago === 'Efectivo') efectivo += o.monto;
    else digital += o.monto;

    tbody.innerHTML += `
      <tr>
        <td>${o.hora || '12:00:00 p. m.'}</td>
        <td><strong>${o.numero}</strong></td>
        <td>${o.paciente}</td>
        <td><span class="badge">${o.metodoPago}</span></td>
        <td>S/ ${o.monto.toFixed(2)}</td>
      </tr>
    `;
  });

  document.getElementById('caja-total').innerText = `S/ ${total.toFixed(2)}`;
  document.getElementById('caja-efectivo').innerText = `S/ ${efectivo.toFixed(2)}`;
  document.getElementById('caja-digital').innerText = `S/ ${digital.toFixed(2)}`;
}
