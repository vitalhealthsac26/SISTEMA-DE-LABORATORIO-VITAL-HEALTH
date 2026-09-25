let productos = [];
let itemsVenta = [];
let ordenes = JSON.parse(localStorage.getItem('ordenes_lab')) || [];

// BASE DE DATOS DE PLANTILLAS Y PARÁMETROS PREDEFINIDOS POR EXAMEN
const plantillasExamenes = {
  "HEMOGRAMA": [
    { parametro: "Leucocitos", unidad: "Cél/uL", referencia: "4,500 - 13,500", metodo: "Citometría de flujo / Impedancia" },
    { parametro: "Glóbulos Rojos (Hematíes)", unidad: "Cél/uL", referencia: "4,000,000 - 5,200,000", metodo: "Citometría de flujo" },
    { parametro: "Hemoglobina", unidad: "g/dL", referencia: "11.50 - 15.50", metodo: "Espectrofotometría" },
    { parametro: "Hematocrito", unidad: "%", referencia: "35.00 - 45.00", metodo: "Centrifugación / Cálculo" },
    { parametro: "Volumen Corpuscular Medio (VCM)", unidad: "fL", referencia: "77.00 - 95.00", metodo: "Calculado" },
    { parametro: "Hemoglobina Corpuscular Media (HCM)", unidad: "pg", referencia: "25.00 - 33.00", metodo: "Calculado" },
    { parametro: "Concentración de Hb Corpuscular Media (CHCM)", unidad: "g/dL", referencia: "30.00 - 36.00", metodo: "Calculado" },
    { parametro: "Recuento Plaquetario", unidad: "Cél/uL", referencia: "150,000 - 475,000", metodo: "Impedancia eléctrica" },
    { parametro: "Neutrófilos Segmentados", unidad: "%", referencia: "31.00 - 51.00", metodo: "Microscopía / Automatizado" },
    { parametro: "Linfocitos", unidad: "%", referencia: "4.00 - 28.00", metodo: "Microscopía / Automatizado" },
    { parametro: "Monocitos", unidad: "%", referencia: "0.00 - 10.00", metodo: "Microscopía" },
    { parametro: "Eosinófilos", unidad: "%", referencia: "0.00 - 2.50", metodo: "Microscopía" },
    { parametro: "Basófilos", unidad: "%", referencia: "0.00 - 2.00", metodo: "Microscopía" }
  ],
  "GLUCOSA": [
    { parametro: "Glucosa en Ayunas", unidad: "mg/dL", referencia: "Adultos: 74 - 106 | Niños: 60 - 100", metodo: "Colorimétrico enzimático" }
  ],
  "ACIDO URICO": [
    { parametro: "Ácido Úrico", unidad: "mg/dL", referencia: "2.50 - 7.00", metodo: "Colorimétrico enzimático" }
  ],
  "HEMOGLOBINA GLICOSILADA": [
    { parametro: "Hemoglobina Glicosilada (HbA1c)", unidad: "%", referencia: "Normal: < 5.7% | Prediabetes: 5.7-6.4%", metodo: "HPLC / Inmunoturbidimetría" }
  ],
  "PERFIL LIPIDICO": [
    { parametro: "Colesterol Total", unidad: "mg/dL", referencia: "< 200 mg/dL", metodo: "Colorimétrico enzimático" },
    { parametro: "HDL - Colesterol", unidad: "mg/dL", referencia: "40.00 - 60.00", metodo: "Colorimétrico enzimático" },
    { parametro: "LDL - Colesterol", unidad: "mg/dL", referencia: "Riesgo Bajo < 129", metodo: "Calculado (Friedewald)" },
    { parametro: "VLDL - Colesterol", unidad: "mg/dL", referencia: "2.00 - 30.00", metodo: "Calculado" },
    { parametro: "Triglicéridos", unidad: "mg/dL", referencia: "< 150 mg/dL", metodo: "Colorimétrico enzimático" }
  ],
  "PERFIL HEPATICO": [
    { parametro: "Bilirrubina Total", unidad: "mg/dL", referencia: "< 1.20", metodo: "Colorimétrico" },
    { parametro: "Bilirrubina Directa", unidad: "mg/dL", referencia: "< 0.25", metodo: "Colorimétrico" },
    { parametro: "Bilirrubina Indirecta", unidad: "mg/dL", referencia: "< 0.80", metodo: "Calculado" },
    { parametro: "Proteínas Totales", unidad: "g/dL", referencia: "6.10 - 7.90", metodo: "Biuret" },
    { parametro: "Albúmina", unidad: "g/dL", referencia: "3.50 - 4.80", metodo: "Verde de Bromocresol" },
    { parametro: "Globulinas", unidad: "g/dL", referencia: "2.00 - 3.50", metodo: "Calculado" },
    { parametro: "TGO / AST", unidad: "U/L", referencia: "M: ≤38.00 | F: ≤32.00", metodo: "UV Enzimático" },
    { parametro: "TGP / ALT", unidad: "U/L", referencia: "M: ≤41.00 | F: ≤31.00", metodo: "UV Enzimático" },
    { parametro: "Fosfatasa Alcalina", unidad: "U/L", referencia: "Adultos: 40 - 150", metodo: "DGKC / IFCC" },
    { parametro: "Gamma Glutamil Transpeptidasa (GGT)", unidad: "U/L", referencia: "5.00 - 40.00", metodo: "Enzimático" }
  ]
};

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

// Buscador desplegable
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
    detalles: []
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

  // Mapear analitos/detalles según la plantilla predefinida o por defecto
  const itemsConEstructura = itemsVenta.map(item => {
    const nombreUpper = item.Nombre.toUpperCase();
    let subParametros = [];

    // Buscar coincidencia en la plantilla
    for (let key in plantillasExamenes) {
      if (nombreUpper.includes(key)) {
        subParametros = plantillasExamenes[key].map(p => ({
          parametro: p.parametro,
          resultado: '',
          unidad: p.unidad,
          referencia: p.referencia,
          metodo: p.metodo
        }));
        break;
      }
    }

    // Si no coincide con ninguna plantilla avanzada, usar parámetro genérico
    if (subParametros.length === 0) {
      subParametros = [{
        parametro: item.Nombre,
        resultado: '',
        unidad: 'mg/dL',
        referencia: '-',
        metodo: 'Colorimétrico / Espectrofotometría'
      }];
    }

    return {
      Nombre: item.Nombre,
      Precio: item.Precio,
      detalles: subParametros
    };
  });

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
    items: itemsConEstructura,
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

// Cargar Datos de la Órden con Desglose Específico para Llenar o Editar
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

  orden.items.forEach((examen) => {
    // Fila Encabezado del Examen
    const trHeader = document.createElement('tr');
    trHeader.className = 'r-exam-header';
    trHeader.innerHTML = `<td colspan="5" style="background:#0056b3; color:white; font-weight:bold; padding:6px 10px;">${examen.Nombre.toUpperCase()}</td>`;
    tbody.appendChild(trHeader);

    // Filas para cada analito/parámetro
    examen.detalles.forEach((det) => {
      const tr = document.createElement('tr');
      tr.className = 'r-item-row';
      tr.setAttribute('data-examen', examen.Nombre);
      tr.innerHTML = `
        <td style="padding-left:15px;"><strong>${det.parametro}</strong></td>
        <td><input type="text" class="r-val" value="${det.resultado || ''}" placeholder="Resultado"></td>
        <td><input type="text" class="r-uni" value="${det.unidad || ''}"></td>
        <td><input type="text" class="r-ref" value="${det.referencia || ''}"></td>
        <td><input type="text" class="r-met" value="${det.metodo || ''}"></td>
      `;
      tbody.appendChild(tr);
    });
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

  const filas = document.querySelectorAll('#r-lista tr.r-item-row');
  
  // Re-estructurar datos guardados por cada examen y parámetro
  orden.items.forEach(examen => {
    examen.detalles = [];
  });

  filas.forEach(f => {
    const nombreExamen = f.getAttribute('data-examen');
    const examenObj = orden.items.find(i => i.Nombre === nombreExamen);

    if (examenObj) {
      const parametro = f.cells[0].innerText.trim();
      const resultado = f.querySelector('.r-val').value;
      const unidad = f.querySelector('.r-uni').value;
      const referencia = f.querySelector('.r-ref').value;
      const metodo = f.querySelector('.r-met').value;

      examenObj.detalles.push({ parametro, resultado, unidad, referencia, metodo });
    }
  });

  orden.completado = true;
  localStorage.setItem('ordenes_lab', JSON.stringify(ordenes));
  alert('¡Resultados guardados correctamente!');
}

// Imprimir PDF en A4 con la Plantilla Oficial
function imprimirResultadosPDF() {
  const paciente = document.getElementById('r-paciente').value;
  if (!paciente) {
    alert('No hay ninguna órden cargada.');
    return;
  }

  const doctorVal = document.getElementById('r-doctor').value.trim();

  document.getElementById('a4-paciente').textContent = paciente.toUpperCase();
  document.getElementById('a4-edad').textContent = document.getElementById('r-edad').value.toUpperCase() || '-';
  document.getElementById('a4-sexo').textContent = document.getElementById('r-sexo').value.toUpperCase() || '-';
  document.getElementById('a4-doctor').textContent = doctorVal ? doctorVal.toUpperCase() : '';
  document.getElementById('a4-muestra').textContent = (document.getElementById('r-muestra').value || 'SUERO').toUpperCase();
  document.getElementById('a4-fecha').textContent = new Date().toLocaleDateString('es-PE');

  const a4Items = document.getElementById('a4-items');
  a4Items.innerHTML = '';

  const numOrden = parseInt(document.getElementById('r-orden-num').value);
  const orden = ordenes.find(o => o.num === numOrden);

  if (orden) {
    orden.items.forEach(examen => {
      // Cabecera por examen en A4
      a4Items.innerHTML += `
        <tr style="background:#e9ecef; font-weight:bold;">
          <td colspan="5" style="border:1px solid #ccc; padding:6px; color:#0056b3;">${examen.Nombre.toUpperCase()}</td>
        </tr>
      `;

      // Detalle de cada parámetro
      examen.detalles.forEach(det => {
        a4Items.innerHTML += `
          <tr>
            <td style="padding-left:15px;">${det.parametro}</td>
            <td><strong>${det.resultado || '-'}</strong></td>
            <td>${det.unidad || ''}</td>
            <td>${det.referencia || ''}</td>
            <td>${det.metodo || ''}</td>
          </tr>
        `;
      });
    });
  }

  document.body.className = 'modo-impresion-a4';
  window.print();

  setTimeout(() => {
    document.body.className = '';
  }, 1000);
}
