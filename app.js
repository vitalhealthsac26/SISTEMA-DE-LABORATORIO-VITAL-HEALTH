// Variable global para almacenar el catálogo de exámenes desde productos.json
let productos = [];
let itemsVenta = [];

// Cargar catálogo de exámenes al iniciar
fetch('productos.json')
  .then(response => response.json())
  .then(data => {
    productos = data;
    console.log('Catálogo cargado con éxito:', productos.length, 'exámenes.');
  })
  .catch(err => console.error('Error al cargar productos.json:', err));

// Configurar fecha por defecto en la interfaz
document.addEventListener('DOMContentLoaded', () => {
  const inputFecha = document.getElementById('v-fecha');
  if (inputFecha) {
    inputFecha.valueAsDate = new Date();
  }
});

// ----------------------------------------------------
// NAVEGACIÓN ENTRE PESTAÑAS
// ----------------------------------------------------
function cambiarModulo(idModulo) {
  document.querySelectorAll('.modulo').forEach(m => m.classList.remove('active'));
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));

  document.getElementById(idModulo).classList.add('active');
  if (event && event.target) {
    event.target.classList.add('active');
  }
}

// ----------------------------------------------------
// BÚSQUEDA Y GESTIÓN DE VENTA (RECEPCIÓN Y TICKET)
// ----------------------------------------------------
const inputBuscar = document.getElementById('v-buscar');

if (inputBuscar) {
  // Evento para autocompletar / agregar examen al presionar Enter o buscar
  inputBuscar.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
      agregarExamenAVenta();
    }
  });
}

function agregarExamenAVenta() {
  const query = inputBuscar.value.trim().toLowerCase();
  if (!query) return;

  // Buscar coincidencia en el catálogo productos.json
  const encontrado = productos.find(p => p.Nombre.toLowerCase().includes(query) || (p.Codigo && p.Codigo.toLowerCase() === query));

  if (encontrado) {
    // Verificar si ya está en la lista de venta
    const existe = itemsVenta.find(item => item.Nombre === encontrado.Nombre);
    if (!existe) {
      itemsVenta.push({
        Nombre: encontrado.Nombre,
        Precio: parseFloat(encontrado.Precio || 0)
      });
      renderizarTablaVenta();
    } else {
      alert('El examen ya está agregado a la orden.');
    }
    inputBuscar.value = '';
  } else {
    // Si no está registrado en el JSON, permite agregarlo manualmente
    const precioManual = prompt(`Examen "${inputBuscar.value}" no encontrado en el catálogo. Ingresa el precio (S/):`, "0.00");
    if (precioManual !== null) {
      itemsVenta.push({
        Nombre: inputBuscar.value.toUpperCase(),
        Precio: parseFloat(precioManual) || 0
      });
      renderizarTablaVenta();
      inputBuscar.value = '';
    }
  }
}

function eliminarItemVenta(index) {
  itemsVenta.splice(index, 1);
  renderizarTablaVenta();
}

function renderizarTablaVenta() {
  const tbodyVenta = document.getElementById('v-lista');
  const totalSpan = document.getElementById('v-total');
  tbodyVenta.innerHTML = '';

  let total = 0;

  itemsVenta.forEach((item, index) => {
    total += item.Precio;
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><strong>${item.Nombre}</strong></td>
      <td>S/ ${item.Precio.toFixed(2)}</td>
      <td><button type="button" style="color:red; cursor:pointer;" onclick="eliminarItemVenta(${index})">✕ Eliminar</button></td>
    `;
    tbodyVenta.appendChild(tr);
  });

  totalSpan.textContent = total.toFixed(2);

  // Sincronizar automáticamente la lista para el módulo de Resultados
  actualizarTablaResultadosIngreso();
}

// ----------------------------------------------------
// SINCRONIZACIÓN DE MÓDULO DE RESULTADOS
// ----------------------------------------------------
function actualizarTablaResultadosIngreso() {
  const tbodyResultados = document.getElementById('r-lista');
  if (!tbodyResultados) return;

  tbodyResultados.innerHTML = '';

  itemsVenta.forEach((item) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><strong>${item.Nombre}</strong></td>
      <td><input type="text" class="r-val" placeholder="Ej: Negativo / 12.5"></td>
      <td><input type="text" class="r-uni" placeholder="Ej: mg/dL o S/U"></td>
      <td><input type="text" class="r-ref" placeholder="Ej: 70 - 105"></td>
    `;
    tbodyResultados.appendChild(tr);
  });

  // Copiar datos del cliente al paciente de resultados si no se han escrito
  const pVenta = document.getElementById('v-paciente').value;
  const pRes = document.getElementById('r-paciente');
  if (pVenta && pRes && !pRes.value) {
    pRes.value = pVenta;
  }
}

// ----------------------------------------------------
// 1. IMPRIMIR TICKET DE 58 MM
// ----------------------------------------------------
function imprimirTicket() {
  if (itemsVenta.length === 0) {
    alert('Agrega al menos un examen antes de imprimir el ticket.');
    return;
  }

  // Transferir datos de cabecera
  document.getElementById('t-paciente').textContent = document.getElementById('v-paciente').value.toUpperCase() || 'PÚBLICO GENERAL';
  document.getElementById('t-dni').textContent = document.getElementById('v-dni').value || '-';
  document.getElementById('t-fecha').textContent = document.getElementById('v-fecha').value;

  // Llenar tabla del ticket
  const tItems = document.getElementById('t-items');
  const tTotal = document.getElementById('t-total');
  tItems.innerHTML = '';

  let total = 0;
  itemsVenta.forEach(item => {
    total += item.Precio;
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${item.Nombre}</td>
      <td class="t-right">S/${item.Precio.toFixed(2)}</td>
    `;
    tItems.appendChild(tr);
  });

  tTotal.textContent = total.toFixed(2);

  // Activar clase CSS exclusiva para Ticket de 58mm
  document.body.className = 'modo-impresion-ticket';

  // Lanzar cuadro de diálogo de impresión
  window.print();

  // Restaurar vista de pantalla
  setTimeout(() => {
    document.body.className = '';
  }, 1000);
}

// ----------------------------------------------------
// 2. IMPRIMIR RESULTADOS EN A4 / PDF
// ----------------------------------------------------
function imprimirPDF() {
  // Transferir datos del paciente
  document.getElementById('a4-paciente').textContent = (document.getElementById('r-paciente').value || document.getElementById('v-paciente').value || '-').toUpperCase();
  document.getElementById('a4-edad').textContent = document.getElementById('r-edad').value.toUpperCase() || '-';
  document.getElementById('a4-doctor').textContent = (document.getElementById('r-doctor').value || 'A QUIEN CORRESPONDA').toUpperCase();
  document.getElementById('a4-fecha').textContent = new Date().toLocaleDateString('es-PE');

  // Llenar tabla A4 con los valores ingresados en los inputs
  const a4Items = document.getElementById('a4-items');
  const filasResultados = document.querySelectorAll('#r-lista tr');

  a4Items.innerHTML = '';

  if (filasResultados.length === 0) {
    alert('No hay resultados cargados para imprimir.');
    return;
  }

  filasResultados.forEach(row => {
    const nombre = row.cells[0].innerText;
    const valor = row.querySelector('.r-val') ? row.querySelector('.r-val').value : '';
    const unidad = row.querySelector('.r-uni') ? row.querySelector('.r-uni').value : '';
    const ref = row.querySelector('.r-ref') ? row.querySelector('.r-ref').value : '';

    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><strong>${nombre}</strong></td>
      <td>${valor}</td>
      <td>${unidad}</td>
      <td>${ref}</td>
    `;
    a4Items.appendChild(tr);
  });

  // Activar clase CSS exclusiva para Hoja A4
  document.body.className = 'modo-impresion-a4';

  // Lanzar ventana de impresión
  window.print();

  // Restaurar vista de pantalla
  setTimeout(() => {
    document.body.className = '';
  }, 1000);
}
