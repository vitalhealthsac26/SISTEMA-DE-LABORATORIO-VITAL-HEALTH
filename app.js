let productos = [];
let itemsVenta = [];
let ordenes = JSON.parse(localStorage.getItem('ordenes_lab')) || [];

const plantillasPredeterminadas = {
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

let plantillasExamenes = JSON.parse(localStorage.getItem('plantillas_lab')) || plantillasPredeterminadas;

fetch('productos.json')
  .then(res => res.json())
  .then(data => { productos = data; })
  .catch(err => console.error('Error cargando productos:', err));

document.addEventListener('DOMContentLoaded', () => {
  const inputFecha = document.getElementById('v-fecha');
  const inputFiltroFecha = document.getElementById('o-filtro-fecha');
  const hoy = new Date().toISOString().split('T')[0];

  if (inputFecha) inputFecha.value = hoy;
  if (inputFiltroFecha) inputFiltroFecha.value = hoy;

  configurarBuscadorLive();
  cargarTablaOrdenes();
  pobladorSelectPlantillas();
});

function cambiarModulo(idModulo, event) {
  document.querySelectorAll('.modulo').forEach(m => m.classList.remove('active'));
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));

  document.getElementById(idModulo).classList.add('active');
  if (event && event.target) event.target.classList.add('active');

  if (idModulo === 'modulo-ordenes') cargarTablaOrdenes();
  if (idModulo === 'modulo-plantillas') {
    pobladorSelectPlantillas();
    cargarPlantillaParaEditar();
  }
}

function calcularEdad() {
  const fnac = document.getElementById('v-fnac').value;
  if (!fnac) return;

  const fechaNac = new Date(fnac);
  const hoy = new Date();
  let edad = hoy.getFullYear() - fechaNac.getFullYear();
  const mes = hoy.getMonth() - fechaNac.getMonth();

  if (mes < 0 || (mes === 0 && hoy.getDate() < fechaNac.getDate())) edad--;
  document.getElementById('v-edad').value = `${edad} AÑOS`;
}

function configurarBuscadorLive() {
  const input = document.getElementById('v-buscar');
  const sugerencias = document.getElementById('v-sugerencias');
  if (!input) return;

  input.addEventListener('input', () => {
    const text = input.value.trim().toLowerCase();
    sugerencias.innerHTML = '';
    if (!text) { sugerencias.style.display = 'none'; return; }

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
  if (itemsVenta.find(i => i.Nombre === prod.Nombre)) {
    alert('El examen ya está agregado.');
    return;
  }
  itemsVenta.push({ Nombre: prod.Nombre, Precio: parseFloat(prod.Precio) || 0, detalles: [] });
  renderizarVenta();
}

function eliminarItemVenta(index) {
  itemsVenta.splice(index, 1);
  renderizarVenta();
}

function renderizarVenta() {
  const tbody = document.getElementById('v-lista');
  tbody.innerHTML = '';

  itemsVenta.forEach((item, index) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><strong>${item.Nombre}</strong></td>
      <td>S/ ${item.Precio.toFixed(2)}</td>
      <td><button style="color:red; cursor:pointer; border:none; background:none; font-weight:bold;" onclick="eliminarItemVenta(${index})">✕ Eliminar</button></td>
    `;
    tbody.appendChild(tr);
  });

  calcularTotalCobro();
}

function calcularTotalCobro() {
  const subtotal = itemsVenta.reduce((sum, item) => sum + item.Precio, 0);

  const selectTipo = document.getElementById('v-tipo-descuento');
  const inputVal = document.getElementById('v-val-descuento');
  
  const tipo = selectTipo ? selectTipo.value : 'SIN';
  const valInput = inputVal ? parseFloat(inputVal.value) || 0 : 0;

  let descuento = 0;

  if (tipo === 'PORCENTAJE') {
    descuento = subtotal * (valInput / 100);
  } else if (tipo === 'MONTO') {
    descuento = valInput;
  }

  if (descuento > subtotal) descuento = subtotal;

  const totalFinal = subtotal - descuento;

  const subtotalElem = document.getElementById('v-subtotal');
  const descElem = document.getElementById('v-descuento-aplicado');
  const totalElem = document.getElementById('v-total');

  if (subtotalElem) subtotalElem.innerText = subtotal.toFixed(2);
  if (descElem) descElem.innerText = descuento.toFixed(2);
  if (totalElem) totalElem.innerText = totalFinal.toFixed(2);
}

function guardarYEmitirTicket() {
  const paciente = document.getElementById('v-paciente').value.trim();
  if (!paciente || itemsVenta.length === 0) {
    alert('Ingrese el paciente y al menos un examen.');
    return;
  }

  const itemsConEstructura = itemsVenta.map(item => {
    const nombreUpper = item.Nombre.toUpperCase();
    let subParametros = [];

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

    if (subParametros.length === 0) {
      subParametros = [{
        parametro: item.Nombre,
        resultado: '',
        unidad: 'mg/dL',
        referencia: '-',
        metodo: 'Colorimétrico / Espectrofotometría'
      }];
    }

    return { Nombre: item.Nombre, Precio: item.Precio, detalles: subParametros };
  });

  const subtotal = itemsVenta.reduce((acc, i) => acc + i.Precio, 0);
  const tipoDesc = document.getElementById('v-tipo-descuento').value;
  const valDesc = parseFloat(document.getElementById('v-val-descuento').value) || 0;
  
  let descuento = 0;
  if (tipoDesc === 'PORCENTAJE') descuento = subtotal * (valDesc / 100);
  else if (tipoDesc === 'MONTO') descuento = valDesc;
  if (descuento > subtotal) descuento = subtotal;

  const totalFinal = subtotal - descuento;

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
    subtotal: subtotal,
    descuento: descuento,
    total: totalFinal
  };

  ordenes.push(nuevaOrden);
  localStorage.setItem('ordenes_lab', JSON.stringify(ordenes));

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

  if (descuento > 0) {
    tItems.innerHTML += `<tr><td><strong>DESCUENTO AP.</strong></td><td class="t-right">-S/${descuento.toFixed(2)}</td></tr>`;
  }

  document.getElementById('t-total').textContent = nuevaOrden.total.toFixed(2);

  document.body.className = 'modo-impresion-ticket';
  window.print();

  setTimeout(() => {
    document.body.className = '';
    itemsVenta = [];
    document.getElementById('v-tipo-descuento').value = 'SIN';
    document.getElementById('v-val-descuento').value = '0';
    renderizarVenta();
    document.getElementById('v-paciente').value = '';
    document.getElementById('v-dni').value = '';
    document.getElementById('v-fnac').value = '';
    document.getElementById('v-edad').value = '';
  }, 1000);
}

function cargarTablaOrdenes() {
  const filtroFecha = document.getElementById('o-filtro-fecha').value;
  const filtroPaciente = document.getElementById('o-filtro-paciente').value.toLowerCase().trim();
  const tbody = document.getElementById('o-lista');
  if (!tbody) return;

  tbody.innerHTML = '';

  const filtradas = ordenes.filter(o => {
    const coincideFecha = !filtroFecha || o.fecha === filtroFecha;
    const coincidePaciente = !filtroPaciente || 
      (o.paciente && o.paciente.toLowerCase().includes(filtroPaciente)) || 
      (o.dni && o.dni.includes(filtroPaciente));
    
    return coincideFecha && coincidePaciente;
  });

  filtradas.forEach(o => {
    const listaExamenes = o.items ? o.items.map(i => i.Nombre).join(', ') : '';
    const estadoBadge = o.completado 
      ? '<span style="color:#28a745; font-weight:bold;">✔ Completado</span>' 
      : '<span style="color:#d9534f; font-weight:bold;">⏳ Pendiente</span>';

    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><strong>#${String(o.num).padStart(4, '0')}</strong></td>
      <td>${o.fecha}</td>
      <td>${o.paciente}</td>
      <td>${o.dni}</td>
      <td><small>${listaExamenes}</small></td>
      <td>S/ ${parseFloat(o.total || 0).toFixed(2)}</td>
      <td>${estadoBadge}</td>
      <td><button class="btn-action" onclick="cargarOrdenParaResultados(${o.num})">Atender</button></td>
    `;
    tbody.appendChild(tr);
  });
}

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

  renderizarExamenesResultados(orden);
  cambiarModulo('modulo-resultados');
}

function renderizarExamenesResultados(orden) {
  const cont = document.getElementById('r-lista-examenes');
  cont.innerHTML = '';

  orden.items.forEach((examen, exIndex) => {
    const box = document.createElement('div');
    box.className = 'exam-block';
    box.setAttribute('data-ex-index', exIndex);

    let html = `
      <div style="background:#0056b3; color:white; padding:10px; display:flex; justify-content:space-between; align-items:center; border-radius:6px 6px 0 0; margin-top:15px;">
        <strong style="font-size:14px;">${examen.Nombre.toUpperCase()}</strong>
        <div>
          <button style="background:#ffc107; border:none; padding:4px 8px; font-weight:bold; cursor:pointer; border-radius:4px;" onclick="moverExamen(${exIndex}, -1)">🔼</button>
          <button style="background:#ffc107; border:none; padding:4px 8px; font-weight:bold; cursor:pointer; border-radius:4px;" onclick="moverExamen(${exIndex}, 1)">🔽</button>
        </div>
      </div>
      <div class="table-responsive">
        <table>
          <thead>
            <tr>
              <th style="min-width:140px;">Parámetro</th>
              <th style="min-width:110px;">Resultado</th>
              <th style="min-width:90px;">Unidad</th>
              <th style="min-width:140px;">Valores Ref.</th>
              <th style="min-width:120px;">Método</th>
            </tr>
          </thead>
          <tbody>
    `;

    examen.detalles.forEach((det, dIndex) => {
      html += `
        <tr class="r-row" data-ex="${exIndex}" data-det="${dIndex}">
          <td><strong>${det.parametro}</strong></td>
          <td><input type="text" class="r-val" value="${det.resultado || ''}" placeholder="Ingresar"></td>
          <td><input type="text" class="r-uni" value="${det.unidad || ''}"></td>
          <td><input type="text" class="r-ref" value="${det.referencia || ''}"></td>
          <td><input type="text" class="r-met" value="${det.metodo || ''}"></td>
        </tr>
      `;
    });

    html += `</tbody></table></div>`;
    box.innerHTML = html;
    cont.appendChild(box);
  });
}

function moverExamen(index, direccion) {
  const numOrden = parseInt(document.getElementById('r-orden-num').value);
  const orden = ordenes.find(o => o.num === numOrden);
  if (!orden) return;

  const targetIndex = index + direccion;
  if (targetIndex < 0 || targetIndex >= orden.items.length) return;

  const temp = orden.items[index];
  orden.items[index] = orden.items[targetIndex];
  orden.items[targetIndex] = temp;

  renderizarExamenesResultados(orden);
}

function guardarResultadosOrden() {
  const numOrden = parseInt(document.getElementById('r-orden-num').value);
  const orden = ordenes.find(o => o.num === numOrden);

  if (!orden) { alert('Seleccione una órden válida.'); return; }

  orden.paciente = document.getElementById('r-paciente').value.toUpperCase();
  orden.edad = document.getElementById('r-edad').value;
  orden.sexo = document.getElementById('r-sexo').value;
  orden.doctor = document.getElementById('r-doctor').value.toUpperCase();
  orden.muestra = document.getElementById('r-muestra').value.toUpperCase();

  const filas = document.querySelectorAll('#r-lista-examenes tr.r-row');
  filas.forEach(f => {
    const exIdx = parseInt(f.getAttribute('data-ex'));
    const detIdx = parseInt(f.getAttribute('data-det'));

    if (orden.items[exIdx] && orden.items[exIdx].detalles[detIdx]) {
      orden.items[exIdx].detalles[detIdx].resultado = f.querySelector('.r-val').value;
      orden.items[exIdx].detalles[detIdx].unidad = f.querySelector('.r-uni').value;
      orden.items[exIdx].detalles[detIdx].referencia = f.querySelector('.r-ref').value;
      orden.items[exIdx].detalles[detIdx].metodo = f.querySelector('.r-met').value;
    }
  });

  orden.completado = true;
  localStorage.setItem('ordenes_lab', JSON.stringify(ordenes));
  alert('¡Resultados guardados correctamente!');
}

function imprimirResultadosPDF() {
  const paciente = document.getElementById('r-paciente').value;
  if (!paciente) { alert('No hay ninguna órden cargada.'); return; }

  document.getElementById('a4-paciente').textContent = paciente.toUpperCase();
  document.getElementById('a4-edad').textContent = document.getElementById('r-edad').value.toUpperCase() || '-';
  document.getElementById('a4-sexo').textContent = document.getElementById('r-sexo').value.toUpperCase() || '-';
  document.getElementById('a4-doctor').textContent = document.getElementById('r-doctor').value.toUpperCase() || '';
  document.getElementById('a4-muestra').textContent = (document.getElementById('r-muestra').value || 'SUERO').toUpperCase();
  document.getElementById('a4-fecha').textContent = new Date().toLocaleDateString('es-PE');

  const container = document.getElementById('a4-container-examenes');
  container.innerHTML = '';

  const numOrden = parseInt(document.getElementById('r-orden-num').value);
  const orden = ordenes.find(o => o.num === numOrden);

  if (orden) {
    orden.items.forEach((examen) => {
      let tableHtml = `
        <div class="a4-exam-block">
          <table class="a4-table">
            <thead>
              <tr class="a4-exam-title-row">
                <th colspan="5" style="background-color: #0056b3; color: white; font-weight: bold; font-size: 13px; text-transform: uppercase; padding: 6px 10px;">
                  ${examen.Nombre.toUpperCase()}
                </th>
              </tr>
              <tr style="background:#f2f2f2; font-size: 11px;">
                <th style="width: 32%;">PRUEBA / EXAMEN</th>
                <th style="width: 18%;">RESULTADO</th>
                <th style="width: 15%;">UNIDAD</th>
                <th style="width: 20%;">VALOR REFERENCIAL</th>
                <th style="width: 15%;">MÉTODO</th>
              </tr>
            </thead>
            <tbody>
      `;

      examen.detalles.forEach(det => {
        tableHtml += `
          <tr>
            <td style="padding-left:12px;">${det.parametro}</td>
            <td><strong>${det.resultado || '-'}</strong></td>
            <td>${det.unidad || ''}</td>
            <td>${det.referencia || ''}</td>
            <td>${det.metodo || ''}</td>
          </tr>
        `;
      });

      tableHtml += `
            </tbody>
          </table>
        </div>
      `;

      container.innerHTML += tableHtml;
    });
  }

  // Generación/Impresión del documento PDF
  if (typeof html2pdf !== 'undefined') {
    const elemento = document.getElementById('print-a4');
    elemento.style.display = 'block';

    const opciones = {
      margin:       [10, 10, 10, 10],
      filename:     `Resultado_${paciente.replace(/ /g, "_")}.pdf`,
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2, useCORS: true },
      jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    html2pdf().set(opciones).from(elemento).save().then(() => {
      elemento.style.display = 'none';
    });
  } else {
    document.body.className = 'modo-impresion-a4';
    window.print();
    setTimeout(() => { document.body.className = ''; }, 1000);
  }
}

function pobladorSelectPlantillas() {
  const select = document.getElementById('p-select-examen');
  if (!select) return;
  select.innerHTML = '';

  for (let key in plantillasExamenes) {
    const opt = document.createElement('option');
    opt.value = key;
    opt.textContent = key;
    select.appendChild(opt);
  }
}

function cargarPlantillaParaEditar() {
  const select = document.getElementById('p-select-examen');
  if (!select) return;
  const key = select.value;
  const tbody = document.getElementById('p-lista-parametros');
  if (!tbody) return;
  tbody.innerHTML = '';

  if (!plantillasExamenes[key]) return;

  plantillasExamenes[key].forEach((p, idx) => {
    const tr = document.createElement('tr');
    tr.className = 'p-row';
    tr.innerHTML = `
      <td><input type="text" class="p-par" value="${p.parametro}"></td>
      <td><input type="text" class="p-uni" value="${p.unidad}"></td>
      <td><input type="text" class="p-ref" value="${p.referencia}"></td>
      <td><input type="text" class="p-met" value="${p.metodo}"></td>
      <td><button style="color:red; cursor:pointer; border:none; background:none; font-weight:bold;" onclick="eliminarFilaParametro(${idx})">✕</button></td>
    `;
    tbody.appendChild(tr);
  });
}

function agregarFilaParametro() {
  const tbody = document.getElementById('p-lista-parametros');
  if (!tbody) return;
  const tr = document.createElement('tr');
  tr.className = 'p-row';
  tr.innerHTML = `
    <td><input type="text" class="p-par" placeholder="Nombre analito"></td>
    <td><input type="text" class="p-uni" placeholder="Ej: mg/dL"></td>
    <td><input type="text" class="p-ref" placeholder="Ej: 70 - 105"></td>
    <td><input type="text" class="p-met" placeholder="Método"></td>
    <td><button style="color:red; cursor:pointer; border:none; background:none; font-weight:bold;" onclick="this.closest('tr').remove()">✕</button></td>
  `;
  tbody.appendChild(tr);
}

function eliminarFilaParametro(idx) {
  const rows = document.querySelectorAll('#p-lista-parametros tr.p-row');
  if (rows[idx]) rows[idx].remove();
}

function crearNuevaPlantilla() {
  const nombre = document.getElementById('p-nuevo-examen').value.trim().toUpperCase();
  if (!nombre) { alert('Escriba un nombre válido.'); return; }

  if (!plantillasExamenes[nombre]) {
    plantillasExamenes[nombre] = [];
    localStorage.setItem('plantillas_lab', JSON.stringify(plantillasExamenes));
    pobladorSelectPlantillas();
    document.getElementById('p-select-examen').value = nombre;
    cargarPlantillaParaEditar();
    document.getElementById('p-nuevo-examen').value = '';
  } else {
    alert('Esta plantilla ya existe.');
  }
}

function guardarPlantillaActual() {
  const key = document.getElementById('p-select-examen').value;
  if (!key) return;

  const filas = document.querySelectorAll('#p-lista-parametros tr.p-row');
  const lista = [];

  filas.forEach(f => {
    const parametro = f.querySelector('.p-par').value.trim();
    if (parametro) {
      lista.push({
        parametro: parametro,
        unidad: f.querySelector('.p-uni').value.trim(),
        referencia: f.querySelector('.p-ref').value.trim(),
        metodo: f.querySelector('.p-met').value.trim()
      });
    }
  });

  plantillasExamenes[key] = lista;
  localStorage.setItem('plantillas_lab', JSON.stringify(plantillasExamenes));
  alert(`Plantilla "${key}" actualizada correctamente.`);
}
