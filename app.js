let productos = [];
let itemsVenta = [];
let ordenes = JSON.parse(localStorage.getItem('ordenes_lab')) || [];

// Cargar catálogo de exámenes desde productos.json
fetch('productos.json')
  .then(res => res.json())
  .then(data => { productos = data; })
  .catch(err => console.error('Error cargando catálogo:', err));

document.addEventListener('DOMContentLoaded', () => {
  const inputFecha = document.getElementById('v-fecha');
  const inputFiltroFecha = document.getElementById('o-filtro-fecha');
  const hoy = new Date().toISOString().split('T')[0];

  if (inputFecha) inputFecha.value = hoy;
  if (inputFiltroFecha) inputFiltroFecha.value = hoy;

  configurarBuscadorLive();
  cargarTablaOrdenes();
});

// Cambiar de módulo
function cambiarModulo(idModulo, event) {
  document.querySelectorAll('.modulo').forEach(m => m.classList.remove('active'));
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));

  document.getElementById(idModulo).classList.add('active');
  if (event && event.target) event.target.classList.add('active');

  if (idModulo === 'modulo-ordenes') cargarTablaOrdenes();
}

// Cálculo automático de edad
function calcularEdad() {
  const fnac = document.getElementById('v-fnac').value;
  if (!fnac) return;

  const fechaNac = new Date(fnac);
  const hoy = new Date();
  let edad = hoy.getFullYear() - fechaNac.getFullYear();
  const mes = hoy.getMonth() - fechaNac.getMonth();

  if (mes < 0 || (mes === 0 && hoy.getDate() < fechaNac.getDate())) {
    edad--;
  }

  document.getElementById('v-edad').value = `${edad} AÑOS`;
}

// Buscador con lista interactiva
function configurarBuscadorLive() {
  const input = document.getElementById('v-buscar');
  const sugerencias = document.getElementById('v-sugerencias');

  if (!input) return;

  input.addEventListener('input', () => {
    const text = input.value.trim().toLowerCase();
    sugerencias.innerHTML = '';

    if (!text) {
      sugerencias.style.display = 'none';
      return;
    }

    const coincidencias = productos.filter(p => p.Nombre.toLowerCase().includes(text));

    if (coincidencias.length > 0) {
      coincidencias.slice(0, 8).forEach(prod => {
        const div = document.createElement('div');
        div.className = 'dropdown-item';
        div.innerHTML = `<span>${prod.Nombre}</span> <strong>S/ ${parseFloat(prod.Precio).toFixed(2)}</strong>`;
        div.onclick = () => {
          seleccionarExamen(prod);
          sugerencias.style.display = 'none';
          input.value = '';
        };
        sugerencias.appendChild(div);
      });
      sugerencias.style.display = 'block';
    } else {
      sugerencias.style.display = 'none';
    }
  });

  document.addEventListener('click', (e) => {
    if (e.target !== input) sugerencias.style.display = 'none';
  });
}

function seleccionarExamen(prod) {
  const existe = itemsVenta.find(i => i.Nombre === prod.Nombre);
  if (existe) {
    alert('El examen ya está agregado en esta orden.');
    return;
  }
  itemsVenta.push({
    Nombre: prod.Nombre,
    Precio: parseFloat(prod.Precio) || 0,
    resultado: '',
    unidad: '',
    referencia: '',
    metodo: ''
  });
  renderizarVenta();
}

function eliminarItemVenta(index) {
  itemsVenta.splice(index, 1);
  renderizarVenta();
}

function renderizarVenta() {
  const tbody = document.getElementById('v-lista');
  const totalSpan = document.getElementById('v-total');
  tbody.innerHTML = '';
  let total = 0;

  itemsVenta.forEach((item, index) => {
    total += item.Precio;
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><strong>${item.Nombre}</strong></td>
      <td>S/ ${item.Precio.toFixed(2)}</td>
      <td><button style="color:red; cursor:pointer;" onclick="eliminarItemVenta(${index})">✕ Eliminar</button></td>
    `;
    tbody.appendChild(tr);
  });

  totalSpan.textContent = total.toFixed(2);
}

// Guardar Órden en Sistema e Imprimir Ticket
function guardarYEmitirTicket() {
  const paciente = document.getElementById('v-paciente').value.trim();
  if (!paciente || itemsVenta.length === 0) {
    alert('Por favor ingrese el nombre del paciente y agregue al menos un examen.');
    return;
  }

  const nuevaOrden = {
    num: ordenes.length + 1,
    dni: document.getElementById('v-dni').value.trim() || '-',
    paciente: paciente.toUpperCase(),
    fnac: document.getElementById('v-fnac').value,
    edad: document.getElementById('v-edad').value || '-',
    sexo: document.getElementById('v-sexo').value,
    fecha: document.getElementById('v-fecha').value,
    doctor: '',
    muestra: 'SUERO / SANGRE TOTAL',
    completado: false,
    items: JSON.parse(JSON.stringify(itemsVenta)),
    total: itemsVenta.reduce((acc, i) => acc + i.Precio, 0)
  };

  ordenes.push(nuevaOrden);
  localStorage.setItem('ordenes_lab', JSON.stringify(ordenes));

  // Llenar Plantilla Ticket
  document.getElementById('t-num').textContent = String(nuevaOrden.num).padStart(4, '0');
  document.getElementById('t-paciente').textContent = nuevaOrden.paciente;
  document.getElementById('t-dni').textContent = nuevaOrden.dni;
  document.getElementById('t-edad').textContent = nuevaOrden.edad;
  document.getElementById('t-fecha').textContent = nuevaOrden.fecha;

  const tItems = document.getElementById('t-items');
  tItems.innerHTML = '';
  nuevaOrden.items.forEach(i => {
    tItems.innerHTML += `<tr><td>${i.Nombre}</td><td class="t-right">S/${i.Precio.toFixed(2)}</td></tr>`;
  });
  document.getElementById('t-total').textContent = nuevaOrden.total.toFixed(2);

  document.body.className = 'modo-impresion-ticket';
  window.print();

  setTimeout(() => {
    document.body.className = '';
    // Limpiar campos de recepción
    itemsVenta = [];
    renderizarVenta();
    document.getElementById('v-paciente').value = '';
    document.getElementById('v-dni').value = '';
    document.getElementById('v-fnac').value = '';
    document.getElementById('v-edad').value = '';
  }, 1000);
}

// Cargar Historial de Órdenes del Día
function cargarTablaOrdenes() {
  const filtroFecha = document.getElementById('o-filtro-fecha').value;
  const filtroPaciente = document.getElementById('o-filtro-paciente').value.toLowerCase();
  const tbody = document.getElementById('o-lista');
  if (!tbody) return;

  tbody.innerHTML = '';

  const filtradas = ordenes.filter(o => {
    const coincideFecha = !filtroFecha || o.fecha === filtroFecha;
    const coincidePaciente = !filtroPaciente || o.paciente.toLowerCase().includes(filtroPaciente) || o.dni.includes(filtroPaciente);
    return coincideFecha && coincidePaciente;
  });

  filtradas.forEach(o => {
    const listaExamenes = o.items.map(i => i.Nombre).join(', ');
    const estadoBadge = o.completado 
      ? '<span style="color:green; font-weight:bold;">✔ Completado</span>' 
      : '<span style="color:#d9534f; font-weight:bold;">⏳ Pendiente</span>';

    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><strong>#${String(o.num).padStart(4, '0')}</strong></td>
      <td>${o.fecha}</td>
      <td>${o.paciente}</td>
      <td>${o.dni}</td>
      <td><small>${listaExamenes}</small></td>
      <td>S/ ${o.total.toFixed(2)}</td>
      <td>${estadoBadge}</td>
      <td><button class="btn-action" onclick="cargarOrdenParaResultados(${o.num})">Ingresar / Editar Resultados</button></td>
    `;
    tbody.appendChild(tr);
  });
}

// Cargar Datos de la Órden para Llenar o Editar Resultados
function cargarOrdenParaResultados(numOrden) {
  const orden = ordenes.find(o => o.num === numOrden);
  if (!orden) return;

  document.getElementById('r-orden-num').value = orden.num;
  document.getElementById('r-num-orden-title').textContent = `(Órden #${String(orden.num).padStart(4, '0')})`;
  document.getElementById('r-paciente').value = orden.paciente;
  document.getElementById('r-edad').value = orden.edad;
  document.getElementById('r-sexo').value = orden.sexo;
  document.getElementById('r-doctor').value = orden.doctor || '';
  document.getElementById('r-muestra').value = orden.muestra || 'SUERO / SANGRE TOTAL';

  const tbody = document.getElementById('r-lista');
  tbody.innerHTML = '';

  orden.items.forEach((item, idx) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><strong>${item.Nombre}</strong></td>
      <td><input type="text" class="r-val" value="${item.resultado || ''}" placeholder="Ej: NEGATIVO o 12.5"></td>
      <td><input type="text" class="r-uni" value="${item.unidad || ''}" placeholder="Ej: mg/dL"></td>
      <td><input type="text" class="r-ref" value="${item.referencia || ''}" placeholder="Ej: 70 - 105"></td>
      <td><input type="text" class="r-met" value="${item.metodo || ''}" placeholder="Ej: Espectrofotometría"></td>
    `;
    tbody.appendChild(tr);
  });

  cambiarModulo('modulo-resultados');
}

// Guardar los Resultados Editados en la Órden
function guardarResultadosOrden() {
  const numOrden = parseInt(document.getElementById('r-orden-num').value);
  const orden = ordenes.find(o => o.num === numOrden);

  if (!orden) {
    alert('Seleccione una órden válida desde la sección "Órdenes del Día".');
    return;
  }

  orden.paciente = document.getElementById('r-paciente').value.toUpperCase();
  orden.edad = document.getElementById('r-edad').value;
  orden.sexo = document.getElementById('r-sexo').value;
  orden.doctor = document.getElementById('r-doctor').value.toUpperCase();
  orden.muestra = document.getElementById('r-muestra').value.toUpperCase();

  const filas = document.querySelectorAll('#r-lista tr');
  filas.forEach((f, idx) => {
    orden.items[idx].resultado = f.querySelector('.r-val').value;
    orden.items[idx].unidad = f.querySelector('.r-uni').value;
    orden.items[idx].referencia = f.querySelector('.r-ref').value;
    orden.items[idx].metodo = f.querySelector('.r-met').value;
  });

  orden.completado = true;
  localStorage.setItem('ordenes_lab', JSON.stringify(ordenes));
  alert('¡Resultados guardados exitosamente!');
}

// Imprimir PDF en A4 con la Plantilla Oficial
function imprimirResultadosPDF() {
  const paciente = document.getElementById('r-paciente').value;
  if (!paciente) {
    alert('No hay ninguna órden cargada.');
    return;
  }

  // Si el usuario no ingresó doctor, se deja el espacio en blanco (no muestra nada)
  const doctorVal = document.getElementById('r-doctor').value.trim();

  document.getElementById('a4-paciente').textContent = paciente.toUpperCase();
  document.getElementById('a4-edad').textContent = document.getElementById('r-edad').value.toUpperCase() || '-';
  document.getElementById('a4-sexo').textContent = document.getElementById('r-sexo').value.toUpperCase() || '-';
  document.getElementById('a4-doctor').textContent = doctorVal ? doctorVal.toUpperCase() : '';
  document.getElementById('a4-muestra').textContent = (document.getElementById('r-muestra').value || 'SUERO').toUpperCase();
  document.getElementById('a4-fecha').textContent = new Date().toLocaleDateString('es-PE');

  const a4Items = document.getElementById('a4-items');
  const filas = document.querySelectorAll('#r-lista tr');
  a4Items.innerHTML = '';

  filas.forEach(f => {
    const nombre = f.cells[0].innerText;
    const val = f.querySelector('.r-val').value;
    const uni = f.querySelector('.r-uni').value;
    const ref = f.querySelector('.r-ref').value;
    const met = f.querySelector('.r-met').value;

    a4Items.innerHTML += `
      <tr>
        <td><strong>${nombre}</strong></td>
        <td>${val}</td>
        <td>${uni}</td>
        <td>${ref}</td>
        <td>${met}</td>
      </tr>
    `;
  });

  document.body.className = 'modo-impresion-a4';
  window.print();

  setTimeout(() => {
    document.body.className = '';
  }, 1000);
}
