// CONFIGURACIÓN DE FIREBASE
const firebaseConfig = {
    databaseURL: "https://vital-health-default-rtdb.firebaseio.com"
};

if (typeof firebase !== 'undefined' && !firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
const db = (typeof firebase !== 'undefined') ? firebase.database() : null;

// Catálogo base de exámenes con tipos de plantillas
let catalogoExamenes = [
    {
        codigo: '568',
        nombre: 'HELICOBACTER PYLORI',
        precio: 70.00,
        muestra: 'Suero',
        metodo: 'Inmunocromatografía',
        plantilla: 'estandar',
        refTexto: '',
        parametros: [
            { nombre: 'HELICOBACTER PYLORI', unidad: '', refMin: '', refMax: '', refTexto: 'NO REACTIVO / REACTIVO' }
        ]
    },
    {
        codigo: '101',
        nombre: 'HEMOGRAMA COMPLETO',
        precio: 35.00,
        muestra: 'Sangre Total (EDTA)',
        metodo: 'Citometría de flujo / Impedancia',
        plantilla: 'hemograma',
        refTexto: '',
        parametros: [
            { nombre: 'Leucocitos', unidad: 'Cél/uL', refMin: '4500', refMax: '13500' },
            { nombre: 'Glóbulos Rojos (hematíes)', unidad: 'Cél/uL', refMin: '4000000', refMax: '5200000' },
            { nombre: 'Hemoglobina', unidad: 'g/dL', refMin: '11.5', refMax: '15.5' },
            { nombre: 'Hematocrito', unidad: '%', refMin: '35', refMax: '45' },
            { nombre: 'Volumen Corpuscular medio - VCM', unidad: 'fL', refMin: '77', refMax: '95' },
            { nombre: 'Hemoglobina Corpuscular media - HCM', unidad: 'pg', refMin: '25', refMax: '33' },
            { nombre: 'Concentración de Hemoglobina Corpuscular media - CHCM', unidad: 'g/dL', refMin: '30', refMax: '36' },
            { nombre: 'Recuento Plaquetario', unidad: 'Cél/uL', refMin: '150000', refMax: '475000' },
            { nombre: 'RDW-SD', unidad: 'fL', refMin: '37', refMax: '54' },
            { nombre: 'RDW-CV', unidad: '%', refMin: '11.5', refMax: '15.6' },
            { nombre: 'Vol. plaquetario medio - VPM', unidad: 'fL', refMin: '7.6', refMax: '10.8' },
            { nombre: 'Neutrófilos Segmentados', unidad: '%', refMin: '31', refMax: '51' },
            { nombre: 'Neutrófilos Abastonados', unidad: '%', refMin: '0', refMax: '5' },
            { nombre: 'Linfocitos', unidad: '%', refMin: '4', refMax: '28' },
            { nombre: 'Monocitos', unidad: '%', refMin: '0', refMax: '10' },
            { nombre: 'Eosinófilos', unidad: '%', refMin: '0', refMax: '2.5' },
            { nombre: 'Basófilo', unidad: '%', refMin: '0', refMax: '2' }
        ]
    },
    {
        codigo: '102',
        nombre: 'GLUCOSA EN AYUNAS',
        precio: 15.00,
        muestra: 'Suero',
        metodo: 'Colorimétrico enzimático',
        plantilla: 'bioquimica',
        refTexto: '',
        parametros: [
            { nombre: 'Glucosa', unidad: 'mg/dL', refTexto: 'Adultos: 74 - 106 | Niños: 60 - 100 | Neonatos: 50 - 80' }
        ]
    },
    {
        codigo: '103',
        nombre: 'HEMOGLOBINA GLICOSILADA (HbA1c)',
        precio: 60.00,
        muestra: 'Sangre Total (EDTA)',
        metodo: 'HPLC / Inmunoturbidimetría',
        plantilla: 'hba1c',
        refTexto: '',
        parametros: [
            { nombre: 'Hemoglobina Glicosilada (HbA1c)', unidad: '%', refTexto: 'Normal: < 5.7% | Prediabetes: 5.7 - 6.4% | Diabetes: >= 6.5%' }
        ]
    }
];

let examenesSeleccionados = [];
let ordenesLocales = JSON.parse(localStorage.getItem('vitalhealth_ordenes')) || [];
let ordenActualVisualizando = null;

document.addEventListener('DOMContentLoaded', async () => {
    const dateEl = document.getElementById('current-date');
    if (dateEl) {
        dateEl.innerText = new Date().toLocaleDateString('es-PE', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    }
    
    await cargarProductosJSON();
    escucharSincronizacion();
    cargarOrdenes();
    actualizarControlCaja();
    renderizarTablaCatalogo();
});

async function cargarProductosJSON() {
    const catalogoGuardado = localStorage.getItem('vitalhealth_catalogo');
    if (catalogoGuardado) {
        catalogoExamenes = JSON.parse(catalogoGuardado);
        if (catalogoExamenes.length > 0) {
            cargarDatosEnFormularioCatalogo(catalogoExamenes[0]);
        }
        return;
    }

    try {
        const response = await fetch('productos.json?v=' + new Date().getTime());
        if (response.ok) {
            const data = await response.json();
            if (Array.isArray(data) && data.length > 0) {
                catalogoExamenes = data.map((prod, index) => ({
                    codigo: String(prod.Codigo || prod.codigo || index + 1),
                    nombre: String(prod.Nombre || prod.nombre || '').toUpperCase(),
                    precio: parseFloat(prod.Precio || prod.precio || 0),
                    muestra: prod.muestra || 'Suero',
                    metodo: prod.metodo || 'Estándar',
                    plantilla: prod.plantilla || 'estandar',
                    refTexto: prod.refTexto || '',
                    parametros: Array.isArray(prod.parametros) ? prod.parametros : []
                }));
                guardarCatalogoLocal();
            }
        }
    } catch (error) {
        console.warn('Cargando catálogo básico.');
    }

    if (catalogoExamenes.length > 0) {
        cargarDatosEnFormularioCatalogo(catalogoExamenes[0]);
    }
}

function guardarCatalogoLocal() {
    localStorage.setItem('vitalhealth_catalogo', JSON.stringify(catalogoExamenes));
}

function toggleSidebar() {
    document.getElementById('sidebar').classList.toggle('active');
    document.getElementById('sidebar-overlay').classList.toggle('active');
}

function escucharSincronizacion() {
    if (db) {
        db.ref('ordenes').on('value', (snapshot) => {
            const data = snapshot.val();
            if (data) {
                ordenesLocales = Object.values(data);
                localStorage.setItem('vitalhealth_ordenes', JSON.stringify(ordenesLocales));
                cargarOrdenes();
                actualizarControlCaja();
            }
        });
    }
}

function guardarEnNubeYLocal() {
    localStorage.setItem('vitalhealth_ordenes', JSON.stringify(ordenesLocales));
    if (db) {
        db.ref('ordenes').set(ordenesLocales);
    }
}

function showSection(sectionId) {
    document.querySelectorAll('.section-content').forEach(el => el.classList.add('d-none'));
    document.querySelectorAll('.nav-link').forEach(el => el.classList.remove('active'));
    
    const sec = document.getElementById(`sec-${sectionId}`);
    if (sec) sec.classList.remove('d-none');
    
    const activeNav = document.querySelector(`.nav-link[onclick*="'${sectionId}'"]`);
    if (activeNav) activeNav.classList.add('active');

    if (window.innerWidth < 768) {
        document.getElementById('sidebar').classList.remove('active');
        document.getElementById('sidebar-overlay').classList.remove('active');
    }

    if (sectionId === 'caja') actualizarControlCaja();
    if (sectionId === 'catalogo') renderizarTablaCatalogo();
}

function calcularEdad() {
    const fnacVal = document.getElementById('pac-fnac').value;
    if (!fnacVal) return;
    const hoy = new Date();
    const fnac = new Date(fnacVal);
    let edad = hoy.getFullYear() - fnac.getFullYear();
    const mes = hoy.getMonth() - fnac.getMonth();
    if (mes < 0 || (mes === 0 && hoy.getDate() < fnac.getDate())) {
        edad--;
    }
    document.getElementById('pac-edad').value = `${edad} AÑOS`;
}

async function buscarPaciente() {
    const dniInput = document.getElementById('pac-dni');
    const dni = dniInput.value.trim();

    if (dni.length !== 8 || isNaN(dni)) {
        return alert('Por favor, ingrese un DNI de 8 dígitos.');
    }

    const encontrada = ordenesLocales.find(o => o.dni === dni);
    if (encontrada) {
        document.getElementById('pac-nombre').value = encontrada.paciente;
        document.getElementById('pac-edad').value = encontrada.edad;
        document.getElementById('pac-sexo').value = encontrada.sexo || 'MASCULINO';
        return;
    }

    try {
        const response = await fetch(`https://apiperu.dev/api/dni/${dni}`);
        if (response.ok) {
            const res = await response.json();
            if (res.data) {
                document.getElementById('pac-nombre').value = `${res.data.nombres} ${res.data.apellido_paterno} ${res.data.apellido_materno}`.trim();
            }
        }
    } catch (e) {
        alert('No se pudo conectar a RENIEC. Ingrese el nombre manualmente.');
    }
}

function filtrarExamenes(texto) {
    const contenedor = document.getElementById('sugerencias-examenes');
    contenedor.innerHTML = '';
    const busqueda = texto.trim().toLowerCase();
    
    if (!busqueda) return;

    const filtrados = catalogoExamenes
        .filter(e => e.nombre.toLowerCase().includes(busqueda) || e.codigo.toLowerCase().includes(busqueda))
        .slice(0, 15);
    
    if (filtrados.length === 0) {
        contenedor.innerHTML = '<div class="list-group-item text-muted">No se encontraron exámenes</div>';
        return;
    }

    filtrados.forEach(ex => {
        const item = document.createElement('a');
        item.className = 'list-group-item list-group-item-action cursor-pointer';
        item.innerText = `${ex.nombre} - S/ ${ex.precio.toFixed(2)}`;
        item.onclick = () => {
            agregarExamen(ex);
            contenedor.innerHTML = '';
            document.getElementById('busqueda-examen').value = '';
        };
        contenedor.appendChild(item);
    });
}

function agregarExamen(examen) {
    examenesSeleccionados.push(examen);
    renderExamenes();
}

function renderExamenes() {
    const tbody = document.querySelector('#tabla-examenes-seleccionados tbody');
    tbody.innerHTML = '';
    
    if (examenesSeleccionados.length === 0) {
        tbody.innerHTML = '<tr id="empty-row"><td colspan="6" class="text-center text-muted py-4">No hay exámenes agregados.</td></tr>';
        document.getElementById('total-cobrar').innerText = '0.00';
        return;
    }

    let total = 0;
    examenesSeleccionados.forEach((ex, index) => {
        total += ex.precio;
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><span class="badge bg-light text-dark border">${ex.codigo}</span></td>
            <td><strong>${ex.nombre}</strong></td>
            <td>1</td>
            <td>S/ ${ex.precio.toFixed(2)}</td>
            <td>S/ ${ex.precio.toFixed(2)}</td>
            <td class="text-center"><button class="btn btn-sm btn-outline-danger" onclick="eliminarExamen(${index})"><i class="bi bi-trash"></i></button></td>
        `;
        tbody.appendChild(row);
    });

    document.getElementById('total-cobrar').innerText = total.toFixed(2);
}

function eliminarExamen(index) {
    examenesSeleccionados.splice(index, 1);
    renderExamenes();
}

// GESTIÓN DE CATÁLOGO CON PLANTILLAS Y PARÁMETROS DINÁMICOS
function renderizarTablaCatalogo(filtro = '') {
    const tbody = document.getElementById('tabla-catalogo-body');
    const countEl = document.getElementById('total-cat-count');
    if (!tbody) return;

    tbody.innerHTML = '';
    const busqueda = filtro.trim().toLowerCase();

    const filtrados = catalogoExamenes.filter(ex => 
        ex.codigo.toLowerCase().includes(busqueda) || 
        ex.nombre.toLowerCase().includes(busqueda)
    );

    if (countEl) countEl.innerText = filtrados.length;

    if (filtrados.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" class="text-center text-muted py-3">No hay exámenes registrados.</td></tr>';
        return;
    }

    filtrados.forEach(ex => {
        const tr = document.createElement('tr');
        tr.style.cursor = 'pointer';
        tr.onclick = (e) => {
            if (e.target.closest('button')) return;
            seleccionarExamenParaEditar(ex.codigo);
        };
        tr.innerHTML = `
            <td><span class="badge bg-light text-dark border">${ex.codigo}</span></td>
            <td><strong>${ex.nombre}</strong></td>
            <td><small class="text-muted">${ex.muestra || 'Suero'} | <span class="badge bg-info text-dark">${ex.plantilla || 'estandar'}</span></small></td>
            <td>S/ ${ex.precio.toFixed(2)}</td>
            <td class="text-end px-3">
                <button class="btn btn-sm btn-outline-primary me-1" onclick="seleccionarExamenParaEditar('${ex.codigo}')" title="Editar Examen">
                    <i class="bi bi-pencil"></i>
                </button>
                <button class="btn btn-sm btn-outline-danger" onclick="eliminarExamenCatalogo('${ex.codigo}')" title="Eliminar Examen">
                    <i class="bi bi-trash"></i>
                </button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

function seleccionarExamenParaEditar(codigo) {
    const ex = catalogoExamenes.find(e => e.codigo === String(codigo));
    if (!ex) return;
    cargarDatosEnFormularioCatalogo(ex);
}

function cargarDatosEnFormularioCatalogo(ex) {
    document.getElementById('cat-id-original').value = ex.codigo;
    document.getElementById('cat-codigo').value = ex.codigo;
    document.getElementById('cat-nombre').value = ex.nombre;
    document.getElementById('cat-precio').value = ex.precio;
    document.getElementById('cat-muestra').value = ex.muestra || '';
    document.getElementById('cat-metodo').value = ex.metodo || '';
    document.getElementById('cat-plantilla').value = ex.plantilla || 'estandar';
    document.getElementById('cat-ref-texto').value = ex.refTexto || '';

    const contenedor = document.getElementById('contenedor-parametros');
    contenedor.innerHTML = '';

    const params = Array.isArray(ex.parametros) ? ex.parametros : [];

    if (params.length > 0) {
        params.forEach(p => agregarFilaParametro(p));
    } else {
        actualizarEstadoVacioParametros();
    }

    document.getElementById('catalogo-form-titulo').innerHTML = `<i class="bi bi-pencil-square me-2"></i>Editando: ${ex.nombre}`;
    document.getElementById('btn-guardar-cat').innerHTML = '<i class="bi bi-check-circle me-1"></i>Guardar Cambios del Examen';
}

function agregarFilaParametro(p = {}) {
    const contenedor = document.getElementById('contenedor-parametros');
    
    const avisoVacio = contenedor.querySelector('.no-params-msg');
    if (avisoVacio) avisoVacio.remove();

    const div = document.createElement('div');
    div.className = 'parametro-card';
    div.innerHTML = `
        <div class="d-flex justify-content-between align-items-center mb-2">
            <span class="fw-bold small text-primary"><i class="bi bi-card-list me-1"></i>Indicador / Parámetro</span>
            <button type="button" class="btn btn-sm btn-link text-danger p-0" onclick="quitarFilaParametro(this)">
                <i class="bi bi-x-circle-fill"></i> Quitar
            </button>
        </div>
        <div class="row g-2">
            <div class="col-7">
                <input type="text" class="form-control form-control-sm param-nombre" placeholder="Nombre (Ej: Hemoglobina)" value="${p.nombre || ''}">
            </div>
            <div class="col-5">
                <input type="text" class="form-control form-control-sm param-unidad" placeholder="Unidad (Ej: g/dL)" value="${p.unidad || ''}">
            </div>
            <div class="col-6">
                <input type="text" class="form-control form-control-sm param-ref-min" placeholder="Ref. Mínimo" value="${p.refMin || ''}">
            </div>
            <div class="col-6">
                <input type="text" class="form-control form-control-sm param-ref-max" placeholder="Ref. Máximo" value="${p.refMax || ''}">
            </div>
            <div class="col-12">
                <input type="text" class="form-control form-control-sm param-ref-texto" placeholder="Texto Ref. (Ej: Adultos: 74 - 106)" value="${p.refTexto || ''}">
            </div>
        </div>
    `;
    contenedor.appendChild(div);
}

function quitarFilaParametro(btn) {
    const card = btn.closest('.parametro-card');
    if (card) card.remove();
    actualizarEstadoVacioParametros();
}

function vaciarTodosLosParametros() {
    const contenedor = document.getElementById('contenedor-parametros');
    contenedor.innerHTML = '';
    actualizarEstadoVacioParametros();
}

function actualizarEstadoVacioParametros() {
    const contenedor = document.getElementById('contenedor-parametros');
    const tarjetas = contenedor.querySelectorAll('.parametro-card');
    if (tarjetas.length === 0) {
        contenedor.innerHTML = `
            <div class="no-params-msg text-center text-muted p-3 border rounded bg-light small">
                <i class="bi bi-info-circle me-1"></i> Este examen no requiere cuadro de parámetros/indicadores.
            </div>
        `;
    }
}

function prepararNuevoExamen() {
    document.getElementById('form-catalogo').reset();
    document.getElementById('cat-id-original').value = '';
    const nuevoCodigo = String(catalogoExamenes.length + 100);
    document.getElementById('cat-codigo').value = nuevoCodigo;

    vaciarTodosLosParametros();

    document.getElementById('catalogo-form-titulo').innerHTML = '<i class="bi bi-plus-circle me-2"></i>Crear Nuevo Examen';
    document.getElementById('btn-guardar-cat').innerHTML = '<i class="bi bi-save me-1"></i>Registrar Nuevo Examen';
}

function guardarExamenCatalogo() {
    const idOrig = document.getElementById('cat-id-original').value.trim();
    const codigo = document.getElementById('cat-codigo').value.trim();
    const nombre = document.getElementById('cat-nombre').value.trim().toUpperCase();
    const precio = parseFloat(document.getElementById('cat-precio').value);

    const muestra = document.getElementById('cat-muestra').value.trim();
    const metodo = document.getElementById('cat-metodo').value.trim();
    const plantilla = document.getElementById('cat-plantilla').value;
    const refTexto = document.getElementById('cat-ref-texto').value.trim();

    if (!codigo || !nombre || isNaN(precio)) {
        return alert('Por favor complete el Código, Nombre y Precio del examen.');
    }

    const filasParam = document.querySelectorAll('#contenedor-parametros .parametro-card');
    const parametros = [];

    filasParam.forEach(card => {
        const pNom = card.querySelector('.param-nombre').value.trim();
        const pUni = card.querySelector('.param-unidad').value.trim();
        const pMin = card.querySelector('.param-ref-min').value.trim();
        const pMax = card.querySelector('.param-ref-max').value.trim();
        const pTex = card.querySelector('.param-ref-texto').value.trim();

        if (pNom || pTex || pMin || pMax) {
            parametros.push({
                nombre: pNom || nombre,
                unidad: pUni,
                refMin: pMin,
                refMax: pMax,
                refTexto: pTex
            });
        }
    });

    const examenObj = { codigo, nombre, precio, muestra, metodo, plantilla, refTexto, parametros };

    if (idOrig) {
        const idx = catalogoExamenes.findIndex(e => e.codigo === idOrig);
        if (idx !== -1) {
            catalogoExamenes[idx] = examenObj;
        } else {
            catalogoExamenes.unshift(examenObj);
        }
        alert('Cambios guardados exitosamente.');
    } else {
        if (catalogoExamenes.some(e => e.codigo === codigo)) {
            return alert('Ya existe un examen registrado con este código.');
        }
        catalogoExamenes.unshift(examenObj);
        alert('Nuevo examen creado exitosamente.');
    }

    guardarCatalogoLocal();
    renderizarTablaCatalogo();
    seleccionarExamenParaEditar(codigo);
}

function eliminarExamenCatalogo(codigo) {
    if (confirm(`¿Desea eliminar del catálogo el examen con código ${codigo}?`)) {
        catalogoExamenes = catalogoExamenes.filter(e => e.codigo !== String(codigo));
        guardarCatalogoLocal();
        renderizarTablaCatalogo();
        if (catalogoExamenes.length > 0) {
            seleccionarExamenParaEditar(catalogoExamenes[0].codigo);
        } else {
            prepararNuevoExamen();
        }
    }
}

function guardarOrdenGenerarTicket() {
    const dni = document.getElementById('pac-dni').value.trim();
    const paciente = document.getElementById('pac-nombre').value.trim();
    const doctor = document.getElementById('pac-doctor').value.trim() || 'Particular';
    const edad = document.getElementById('pac-edad').value.trim();
    const sexo = document.getElementById('pac-sexo').value;
    const metodo = document.getElementById('metodo-pago').value;

    if (!dni || !paciente || examenesSeleccionados.length === 0) {
        return alert('Complete los datos obligatorios del paciente y agregue al menos un examen.');
    }

    const numOrden = `VH-2026-${String(ordenesLocales.length + 1).padStart(5, '0')}`;
    const total = examenesSeleccionados.reduce((a, b) => a + b.precio, 0);
    const ahora = new Date();

    const nuevaOrden = {
        id: numOrden,
        fecha: ahora.toLocaleDateString('es-PE'),
        hora: ahora.toLocaleTimeString('es-PE'),
        timestamp: ahora.getTime(),
        dni: dni,
        paciente: paciente,
        doctor: doctor,
        edad: edad || 'N/A',
        sexo: sexo,
        examenes: [...examenesSeleccionados],
        total: total,
        metodoPago: metodo,
        estado: 'PENDIENTE',
        resultados: {}
    };

    ordenesLocales.unshift(nuevaOrden);
    guardarEnNubeYLocal();

    imprimirTicket58mm(nuevaOrden);

    examenesSeleccionados = [];
    renderExamenes();
    document.getElementById('form-paciente').reset();
    alert('Orden registrada correctamente.');
}

function imprimirTicket58mm(orden) {
    const area = document.getElementById('ticket-print-area');
    let listaHTML = '';
    orden.examenes.forEach(e => {
        listaHTML += `
            <tr>
                <td colspan="2">${e.nombre}</td>
            </tr>
            <tr>
                <td>1 x S/ ${e.precio.toFixed(2)}</td>
                <td class="text-end">S/ ${e.precio.toFixed(2)}</td>
            </tr>
        `;
    });

    area.innerHTML = `
        <div class="ticket-header">
            <div class="ticket-title">CENTRO MÉDICO VITAL HEALTH</div>
            <div>LABORATORIO CLÍNICO</div>
            <div>Av. Grau N° 1799 - Piura</div>
            <div>Tel: 984 089 927</div>
        </div>
        <div class="ticket-divider"></div>
        <div><strong>ORDEN:</strong> ${orden.id}</div>
        <div><strong>FECHA:</strong> ${orden.fecha} ${orden.hora}</div>
        <div><strong>DNI:</strong> ${orden.dni}</div>
        <div><strong>PACIENTE:</strong> ${orden.paciente}</div>
        <div class="ticket-divider"></div>
        <table class="ticket-table">
            <tbody>${listaHTML}</tbody>
        </table>
        <div class="ticket-divider"></div>
        <div class="text-end"><strong>TOTAL: S/ ${orden.total.toFixed(2)}</strong></div>
    `;

    window.print();
}

function cargarOrdenes() {
    const tbody = document.getElementById('lista-ordenes-body');
    if (!tbody) return;
    tbody.innerHTML = '';

    ordenesLocales.forEach((orden) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><strong>${orden.id}</strong></td>
            <td>${orden.fecha}</td>
            <td>${orden.dni}</td>
            <td>${orden.paciente}</td>
            <td><span class="badge ${orden.estado === 'COMPLETADO' ? 'bg-success' : 'bg-warning text-dark'}">${orden.estado}</span></td>
            <td class="text-end px-3">
                <button class="btn btn-sm btn-primary me-1" onclick="abrirResultados('${orden.id}')"><i class="bi bi-journal-medical"></i> Cargar Resultados</button>
                <button class="btn btn-sm btn-outline-danger" onclick="eliminarOrden('${orden.id}')"><i class="bi bi-trash"></i></button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

function eliminarOrden(id) {
    if (confirm(`¿Eliminar la orden ${id}?`)) {
        ordenesLocales = ordenesLocales.filter(o => o.id !== id);
        guardarEnNubeYLocal();
        cargarOrdenes();
        actualizarControlCaja();
    }
}

function abrirResultados(ordenId) {
    const orden = ordenesLocales.find(o => o.id === ordenId);
    if (!orden) return;

    ordenActualVisualizando = orden;
    showSection('resultados');

    const container = document.getElementById('resultados-editor');
    let camposHTML = '';

    orden.examenes.forEach((ex) => {
        const catEx = catalogoExamenes.find(c => c.codigo === ex.codigo) || ex;
        const params = Array.isArray(catEx.parametros) ? catEx.parametros : [];

        let filasParamsHTML = '';

        if (params.length > 0) {
            params.forEach((p, idx) => {
                const resKey = `${ex.codigo}_${idx}`;
                const valRes = (orden.resultados && orden.resultados[resKey]) ? orden.resultados[resKey].resultado : '';

                filasParamsHTML += `
                    <div class="row g-2 align-items-center mb-2 pb-2 border-bottom">
                        <div class="col-12 col-md-4">
                            <label class="form-label small fw-bold mb-0">${p.nombre}</label>
                        </div>
                        <div class="col-12 col-md-4">
                            <input type="text" id="res-val-${resKey}" class="form-control form-control-sm border-primary fw-bold" placeholder="Resultado..." value="${valRes}">
                        </div>
                        <div class="col-12 col-md-4">
                            <small class="text-muted">${p.unidad ? 'Unidad: ' + p.unidad : ''} ${p.refTexto ? '| Ref: ' + p.refTexto : ''}</small>
                        </div>
                    </div>
                `;
            });
        } else {
            filasParamsHTML = `<p class="text-muted small mb-0">Este examen no requiere carga de parámetros específicos.</p>`;
        }

        camposHTML += `
            <div class="card mb-3 shadow-sm border">
                <div class="card-header bg-light d-flex justify-content-between align-items-center">
                    <h6 class="fw-bold text-primary mb-0">${ex.nombre}</h6>
                    <span class="badge bg-secondary">Plantilla: ${catEx.plantilla || 'estandar'}</span>
                </div>
                <div class="card-body">
                    ${filasParamsHTML}
                </div>
            </div>
        `;
    });

    container.innerHTML = `
        <div class="p-3 mb-3 bg-light border rounded">
            <h5 class="fw-bold mb-1">Paciente: ${orden.paciente}</h5>
            <div class="text-muted small">
                <strong>DNI:</strong> ${orden.dni} | <strong>Edad:</strong> ${orden.edad} | <strong>Doctor:</strong> ${orden.doctor || 'Particular'}
            </div>
        </div>
        ${camposHTML}
        <div class="d-flex flex-wrap gap-2 mt-4">
            <button class="btn btn-success fw-semibold" onclick="guardarResultados()"><i class="bi bi-floppy me-1"></i> Guardar Resultados</button>
            <button class="btn btn-primary fw-semibold" onclick="visualizarEImprimirResultados()"><i class="bi bi-printer me-1"></i> Visualizar e Imprimir Resultados</button>
        </div>
    `;
}

function guardarResultados() {
    if (!ordenActualVisualizando) return;

    if (!ordenActualVisualizando.resultados) ordenActualVisualizando.resultados = {};

    ordenActualVisualizando.examenes.forEach(ex => {
        const catEx = catalogoExamenes.find(c => c.codigo === ex.codigo) || ex;
        const params = Array.isArray(catEx.parametros) ? catEx.parametros : [];

        params.forEach((p, idx) => {
            const resKey = `${ex.codigo}_${idx}`;
            const resVal = document.getElementById(`res-val-${resKey}`)?.value || '';
            ordenActualVisualizando.resultados[resKey] = { resultado: resVal, parametro: p.nombre };
        });
    });

    ordenActualVisualizando.estado = 'COMPLETADO';
    guardarEnNubeYLocal();
    cargarOrdenes();
    alert('Resultados guardados correctamente.');
}

// GENERADOR DINÁMICO DE SECCIONES IMPRESAS SEGÚN PLANTILLA
function generarTablaEspecializada(ex, catEx, orden) {
    const params = Array.isArray(catEx.parametros) ? catEx.parametros : [];
    const tipoPlantilla = catEx.plantilla || 'estandar';

    if (params.length === 0) {
        return `<p style="text-align:center; font-size:12px; color:#64748b; font-style:italic;">Examen sin plantilla de parámetros específicos.</p>`;
    }

    // PLANTILLA: HEMOGRAMA COMPLETO
    if (tipoPlantilla === 'hemograma') {
        let filasSerieRojaBlanca = '';
        let filasRecuentoDiferencial = '';

        params.forEach((p, idx) => {
            const resKey = `${ex.codigo}_${idx}`;
            const resData = orden.resultados[resKey] || {};
            const val = resData.resultado || '-';

            const esDiferencial = ['Neutrófilos Segmentados', 'Neutrófilos Abastonados', 'Linfocitos', 'Monocitos', 'Eosinófilos', 'Basófilo'].includes(p.nombre);

            const filaHTML = `
                <tr>
                    <td style="padding: 6px; border-bottom: 1px solid #e2e8f0; text-align:left; font-weight: 500;">${p.nombre}</td>
                    <td style="padding: 6px; border-bottom: 1px solid #e2e8f0; font-weight: bold; text-align:right;">${val}</td>
                    <td style="padding: 6px; border-bottom: 1px solid #e2e8f0; text-align:center;">${p.unidad || ''}</td>
                    <td style="padding: 6px; border-bottom: 1px solid #e2e8f0; text-align:center;">${p.refMin || '-'}</td>
                    <td style="padding: 6px; border-bottom: 1px solid #e2e8f0; text-align:center;">${p.refMax || '-'}</td>
                </tr>
            `;

            if (esDiferencial) {
                filasRecuentoDiferencial += filaHTML;
            } else {
                filasSerieRojaBlanca += filaHTML;
            }
        });

        return `
            <table style="width:100%; border-collapse:collapse; font-size:11px; margin-top:5px;">
                <thead>
                    <tr style="background-color: #cbd5e1; color: #0f172a; font-weight:bold;">
                        <th style="padding: 6px; text-align:left;">SERIE / PARÁMETRO</th>
                        <th style="padding: 6px; text-align:right;">RESULTADO</th>
                        <th style="padding: 6px; text-align:center;">UNIDAD</th>
                        <th style="padding: 6px; text-align:center;">MÍNIMO</th>
                        <th style="padding: 6px; text-align:center;">MÁXIMO</th>
                    </tr>
                </thead>
                <tbody>
                    ${filasSerieRojaBlanca}
                    <tr style="background-color: #f1f5f9; font-weight:bold;">
                        <td colspan="5" style="padding: 6px; text-align:left; color:#1e3a8a;">Recuento Diferencial Porcentual %</td>
                    </tr>
                    ${filasRecuentoDiferencial}
                </tbody>
            </table>
            <div style="font-size:10px; font-style:italic; text-align:right; margin-top:4px; color:#475569;">Método: ${catEx.metodo || 'Citometría de flujo / Impedancia'}</div>
        `;
    }

    // PLANTILLA: BIOQUÍMICA (Múltiples Rangos de Edad/Condición)
    if (tipoPlantilla === 'bioquimica') {
        let filasHTML = '';
        params.forEach((p, idx) => {
            const resKey = `${ex.codigo}_${idx}`;
            const resData = orden.resultados[resKey] || {};

            filasHTML += `
                <tr>
                    <td style="padding: 8px; border: 1px solid #cbd5e1; font-weight:bold; text-align:left;">${p.nombre}</td>
                    <td style="padding: 8px; border: 1px solid #cbd5e1; font-weight:bold; text-align:center; font-size:13px;">${resData.resultado || '-'}</td>
                    <td style="padding: 8px; border: 1px solid #cbd5e1; text-align:center;">${p.unidad || ''}</td>
                    <td style="padding: 8px; border: 1px solid #cbd5e1; text-align:left; font-size:10px;">
                        ${p.refTexto ? p.refTexto : `${p.refMin \vert{}\vert{} '-'} -${p.refMax || '-'}`}
                    </td>
                    <td style="padding: 8px; border: 1px solid #cbd5e1; text-align:center; font-style:italic; font-size:10px;">${catEx.metodo || 'Colorimétrico'}</td>
                </tr>
            `;
        });

        return `
            <div style="font-size:11px; font-weight:bold; margin-bottom:4px;">Muestra: ${catEx.muestra || 'Suero'}</div>
            <table style="width:100%; border-collapse:collapse; font-size:11px;">
                <thead>
                    <tr style="background-color: #bae6fd; color: #0369a1;">
                        <th style="padding: 6px; border: 1px solid #7dd3fc; text-align:left;">Bioquímica</th>
                        <th style="padding: 6px; border: 1px solid #7dd3fc; text-align:center;">Resultado</th>
                        <th style="padding: 6px; border: 1px solid #7dd3fc; text-align:center;">Unidad</th>
                        <th style="padding: 6px; border: 1px solid #7dd3fc; text-align:left;">Valor Referencial</th>
                        <th style="padding: 6px; border: 1px solid #7dd3fc; text-align:center;">Método</th>
                    </tr>
                </thead>
                <tbody>
                    ${filasHTML}
                </tbody>
            </table>
        `;
    }

    // PLANTILLA: HEMOGLOBINA GLICOSILADA (HbA1c)
    if (tipoPlantilla === 'hba1c') {
        const resKey = `${ex.codigo}_0`;
        const resData = orden.resultados[resKey] || {};

        return `
            <table style="width:100%; border-collapse:collapse; font-size:11px; margin-top:5px;">
                <thead>
                    <tr style="background-color: #bae6fd; color: #0369a1; text-align:center;">
                        <th style="padding: 6px; border: 1px solid #7dd3fc;">MUESTRA</th>
                        <th style="padding: 6px; border: 1px solid #7dd3fc;">RESULTADO</th>
                        <th style="padding: 6px; border: 1px solid #7dd3fc;">UNIDAD</th>
                        <th style="padding: 6px; border: 1px solid #7dd3fc;">VALOR REFERENCIAL</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td style="padding: 10px; border: 1px solid #cbd5e1; font-weight:bold; text-align:center;">${catEx.muestra || 'SANGRE'}</td>
                        <td style="padding: 10px; border: 1px solid #cbd5e1; font-weight:bold; text-align:center; font-size:14px;">${resData.resultado || '-'}</td>
                        <td style="padding: 10px; border: 1px solid #cbd5e1; text-align:center;">%</td>
                        <td style="padding: 10px; border: 1px solid #cbd5e1; text-align:left; font-size:11px; line-height:1.4;">
                            Normal: Menos del 5.7%<br>
                            Prediabetes: 5.7% - 6.4%<br>
                            Diabetes: 6.5% a más
                        </td>
                    </tr>
                </tbody>
            </table>
        `;
    }

    // PLANTILLA: ESTÁNDAR
    let filasEstandar = '';
    params.forEach((p, idx) => {
        const resKey = `${ex.codigo}_${idx}`;
        const resData = orden.resultados[resKey] || {};

        let valRefHTML = p.refTexto || (p.refMin || p.refMax ? `${p.refMin || '-'} - ${p.refMax || '-'}` : '-');

        filasEstandar += `
            <tr style="background-color: #f8fafc;">
                <td style="padding: 8px; border: 1px solid #e2e8f0; font-weight: bold; text-align:left;">${p.nombre}</td>
                <td style="padding: 8px; border: 1px solid #e2e8f0; font-weight: bold; font-size:13px; text-align:center;">${resData.resultado || '-'}</td>
                <td style="padding: 8px; border: 1px solid #e2e8f0; text-align:center;">${p.unidad || '-'}</td>
                <td style="padding: 8px; border: 1px solid #e2e8f0; text-align:center;">${valRefHTML}</td>
                <td style="padding: 8px; border: 1px solid #e2e8f0; font-style: italic; font-size: 11px; text-align:center;">${catEx.metodo || 'Estándar'}</td>
            </tr>
        `;
    });

    return `
        <table style="width:100%; border-collapse:collapse; font-size:11px; text-align:center;">
            <thead>
                <tr style="background-color: #dbeafe; color: #1e3a8a;">
                    <th style="padding: 6px; border: 1px solid #bfdbfe; text-align:left;">PARÁMETRO / PRUEBA</th>
                    <th style="padding: 6px; border: 1px solid #bfdbfe;">RESULTADO</th>
                    <th style="padding: 6px; border: 1px solid #bfdbfe;">UNIDAD</th>
                    <th style="padding: 6px; border: 1px solid #bfdbfe;">VALOR REFERENCIAL</th>
                    <th style="padding: 6px; border: 1px solid #bfdbfe;">MÉTODO</th>
                </tr>
            </thead>
            <tbody>
                ${filasEstandar}
            </tbody>
        </table>
    `;
}

function visualizarEImprimirResultados() {
    if (!ordenActualVisualizando) return;

    guardarResultados();

    let bloquesExamenesHTML = '';

    ordenActualVisualizando.examenes.forEach(ex => {
        const catEx = catalogoExamenes.find(c => c.codigo === ex.codigo) || ex;
        const contenidoExamen = generarTablaEspecializada(ex, catEx, ordenActualVisualizando);

        bloquesExamenesHTML += `
            <div style="margin-top:20px; page-break-inside: avoid;">
                <h3 style="text-align:center; font-size:16px; font-weight:bold; margin-bottom:8px; font-family:'Segoe UI', sans-serif; color: #0072bc; text-transform: uppercase;">
                    ${ex.nombre}
                </h3>
                ${contenidoExamen}
            </div>
        `;
    });

    const ventanaImp = window.open('', '_blank');
    ventanaImp.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Resultado - ${ordenActualVisualizando.paciente}</title>
            <style>
                @page { size: A4; margin: 15mm; }
                body { font-family: 'Segoe UI', Arial, sans-serif; color: #1e293b; margin: 0; padding: 0; }
                .header { display: flex; align-items: center; justify-content: space-between; border-bottom: 2px solid #0072bc; padding-bottom: 10px; }
                .logo-section { display: flex; align-items: center; gap: 15px; }
                .logo-img { height: 75px; }
                .header-title h2 { margin: 0; color: #0072bc; font-size: 20px; font-weight: bold; }
                .header-title p { margin: 2px 0; font-size: 12px; color: #475569; }
                .header-info { font-size: 11px; color: #475569; text-align: right; }
                
                .patient-box {
                    border: 1.5px solid #3b82f6;
                    border-radius: 12px;
                    padding: 12px 18px;
                    margin-top: 15px;
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    row-gap: 6px;
                    font-size: 12px;
                    font-weight: 600;
                    color: #1e293b;
                }

                .footer-firma {
                    margin-top: 50px;
                    text-align: right;
                    padding-right: 40px;
                }
                .firma-linea {
                    display: inline-block;
                    text-align: center;
                    border-top: 1px solid #000;
                    padding-top: 5px;
                    width: 220px;
                    font-size: 11px;
                }

                .footer-page {
                    position: fixed;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    border-top: 2px solid #0072bc;
                    padding-top: 6px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    font-size: 11px;
                    font-weight: bold;
                    color: #0072bc;
                }
            </style>
        </head>
        <body>
            <div class="header">
                <div class="logo-section">
                    <img src="logo.png" class="logo-img" onerror="this.style.display='none'">
                    <div class="header-title">
                        <h2>Centro Médico VITAL HEALTH</h2>
                        <p>Laboratorio clínico, comprometido con tu salud.</p>
                    </div>
                </div>
                <div class="header-info">
                    📍 Av. Grau N° 1799 - Veintiséis de Octubre<br>
                    📷 Vitalhealthlaboratorio | 👍 Vital Health's Lab
                </div>
            </div>

            <div class="patient-box">
                <div>PACIENTE: ${ordenActualVisualizando.paciente.toUpperCase()}</div>
                <div>EDAD: ${ordenActualVisualizando.edad}</div>
                <div>DNI: ${ordenActualVisualizando.dni}</div>
                <div>SEXO: ${ordenActualVisualizando.sexo || 'MASCULINO'}</div>
                <div>DOCTOR: ${ordenActualVisualizando.doctor || 'PARTICULAR'}</div>
                <div>FECHA: ${ordenActualVisualizando.fecha}</div>
            </div>

            ${bloquesExamenesHTML}

            <div class="footer-firma">
                <div class="firma-linea">
                    <strong>Raysa Yadira Ursula Alberca Atarama</strong><br>
                    Bióloga - C.B.P. 17763
                </div>
            </div>

            <div class="footer-page">
                <div>📞 984 089 927</div>
                <div>🏠 SERVICIO A DOMICILIO</div>
                <div>"ANÁLISIS DE CALIDAD PARA EL CUIDADO DE TU SALUD"</div>
            </div>

            <script>
                window.onload = function() { window.print(); }
            </script>
        </body>
        </html>
    `);
    ventanaImp.document.close();
}

function actualizarControlCaja() {
    const hoyStr = new Date().toLocaleDateString('es-PE');
    const ordenesHoy = ordenesLocales.filter(o => o.fecha === hoyStr);

    let total = 0, efectivo = 0, digital = 0;
    const tbody = document.getElementById('caja-tabla-body');
    if (tbody) tbody.innerHTML = '';

    ordenesHoy.forEach(o => {
        total += o.total;
        if (o.metodoPago === 'Efectivo') efectivo += o.total;
        else digital += o.total;

        if (tbody) {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${o.hora || 'S/H'}</td>
                <td><strong>${o.id}</strong></td>
                <td>${o.paciente}</td>
                <td><span class="badge bg-secondary">${o.metodoPago}</span></td>
                <td>S/ ${o.total.toFixed(2)}</td>
            `;
            tbody.appendChild(tr);
        }
    });

    if (document.getElementById('caja-total-hoy')) {
        document.getElementById('caja-total-hoy').innerText = total.toFixed(2);
        document.getElementById('caja-efectivo').innerText = efectivo.toFixed(2);
        document.getElementById('caja-digital').innerText = digital.toFixed(2);
    }
}
