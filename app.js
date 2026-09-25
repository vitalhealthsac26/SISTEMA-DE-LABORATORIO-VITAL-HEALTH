let productos = [];
let itemsVenta = [];
let ordenes = JSON.parse(localStorage.getItem('ordenes_lab')) || [];

// Cargar el catálogo productos.json
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

function cambiarModulo(idModulo, event) {
  document.querySelectorAll('.modulo').forEach(m => m.classList.remove('active'));
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));

  document.getElementById(idModulo).classList.add('active');
  if (event && event.target) event.target.classList.add('active');

  if (idModulo === 'modulo-ordenes') cargarTablaOrdenes();
}

// Calcular Edad desde Fecha de Nacimiento
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

// Configuración del Buscador Desplegable
function configurarBuscadorLive() {
  const input = document.getElementById('v-buscar');
  const sugerencias = document.getElementById('v-sugerencias');

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
    alert('El examen ya está en la lista.');
    return;
  }
  itemsVenta.push({ Nombre: prod.Nombre, Precio: parseFloat(prod.Precio) || 0 });
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
      <td>${item.Nombre}</td>
      <td>S/ ${item.Precio.toFixed(2)}</td>
      <td><button style="color:red; cursor:pointer;" onclick="eliminarItemVenta(${index})">✕ Eliminar</button></td>
    `;
    tbody.appendChild(tr);
  });

  totalSpan.textContent = total.toFixed(2);
}

// Guardar Órden y Emitir Ticket
function guardarYEmitirTicket() {
  const paciente = document.getElementById('v-paciente').value;
  if (!paciente || itemsVenta.length === 0) {
    alert('Por favor ingrese el nombre del paciente y al menos un examen.');
    return;
  }

  const nuevaOrden = {
    num: ordenes.length + 1,
    dni: document.getElementById('v-dni').value || '-',
    paciente: paciente.toUpperCase(),
    fnac: document.getElementById('v-fnac').value,
    edad: document.getElementById('v-edad').value || '-',
    sexo: document.getElementById('v-sexo').value,
    fecha: document.getElementById('v-fecha').value,
    items: [...itemsVenta],
    total: itemsVenta.reduce((acc, i) => acc + i.Precio, 0)
  };

  ordenes.push(nuevaOrden);
  localStorage.setItem('ordenes_lab', JSON.stringify(ordenes));

  // Imprimir Ticket
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
    // Limpiar formulario venta
    itemsVenta = [];
    renderizarVenta();
    document.getElementById('v-paciente').value = '';
    document.getElementById('v-dni').value = '';
  }, 1000);
}

// Cargar Tabla de Órdenes del Día
function cargarTablaOrdenes() {
  const filtroFecha = document.getElementById('o-filtro-fecha').value;
  const filtroPaciente = document.getElementById('o-filtro-paciente').value.toLowerCase();
  const tbody = document.getElementById('o-lista');
  tbody.innerHTML = '';

  const filtradas = ordenes.filter(o => {
    const coincideFecha = !filtroFecha || o.fecha === filtroFecha;
    const coincidePaciente = !filtroPaciente || o.paciente.toLowerCase().includes(filtroPaciente) || o.dni.includes(filtroPaciente);
    return coincideFecha && coincidePaciente;
  });

  filtradas.forEach(o => {
    const listaExamenes = o.items.map(i => i.Nombre).join(', ');
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><strong>#${String(o.num).padStart(4, '0')}</strong></td>
      <td>${o.fecha}</td>
      <td>${o.paciente}</td>
      <td>${o.dni}</td>
      <td><small>${listaExamenes}</small></td>
      <td>S/ ${o.total.toFixed(2)}</td>
      <td><button class="btn-action" onclick="cargarOrdenParaResultados(${o.num})">Ingresar Resultados</button></td>
    `;
    tbody.appendChild(tr);
  });
}

// Cargar Órden para llenar Resultados
function cargarOrdenParaResultados(numOrden) {
  const orden = ordenes.find(o => o.num === numOrden);
  if (!orden) return;

  document.getElementById('r-paciente').value = orden.paciente;
  document.getElementById('r-edad').value = orden.edad;
  document.getElementById('r-sexo').value = orden.sexo;

  const tbody = document.getElementById('r-lista');
  tbody.innerHTML = '';

  orden.items.forEach(item => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><strong>${item.Nombre}</strong></td>
      <td><input type="text" class="r-val" placeholder="Resultado"></td>
      <td><input type="text" class="r-uni" placeholder="Unidad"></td>
      <td><input type="text" class="r-ref" placeholder="Val. Referencial"></td>
      <td><input type="text" class="r-met" placeholder="Método"></td>
    `;
    tbody.appendChild(tr);
  });

  // Cambiar directamente a pestaña de resultados
  cambiarModulo('modulo-resultados');
}

// Imprimir PDF en Hoja A4
function imprimirPDF() {
  document.getElementById('a4-paciente').textContent = document.getElementById('r-paciente').value || '-';
  document.getElementById('a4-edad').textContent = document.getElementById('r-edad').value || '-';
  document.getElementById('a4-sexo').textContent = document.getElementById('r-sexo').value || '-';
  document.getElementById('a4-doctor').textContent = document.getElementById('r-doctor').value || 'A QUIEN CORRESPONDA';
  document.getElementById('a4-muestra').textContent = document.getElementById('r-muestra').value || 'SUERO';
  document.getElementById('a4-fecha').textContent = new Date().toLocaleDateString('es-PE');

  const a4Items = document.getElementById('a4-items');
  const filas = document.querySelectorAll('#r-lista tr');
  a4Items.innerHTML = '';

  if (filas.length === 0) {
    alert('No hay exámenes cargados.');
    return;
  }

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
