// CONTROL DE FIREBASE CON PROTECCIÓN ANTE ERRORES DE RED O INICIALIZACIÓN
let db = null;
try {
    if (typeof firebase !== 'undefined') {
        const firebaseConfig = {
            databaseURL: "https://vital-health-default-rtdb.firebaseio.com"
        };
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }
        db = firebase.database();
    }
} catch (e) {
    console.warn("Firebase no inicializado. Operando en modo local seguro.", e);
}

// BASE DE DATOS LOCAL PREDETERMINADA
let catalogoExamenes = [
    {
        codigo: '101',
        nombre: 'HEMOGRAMA COMPLETO',
        precio: 35.00,
        muestra: 'Sangre Total (EDTA)',
        metodo: 'Citometría de flujo / Impedancia eléctrica',
        plantilla: 'hemograma',
        refTexto: '',
        parametros: [
            { nombre: 'Leucocitos', unidad: 'Cél/uL', refMin: '4500.00', refMax: '13500.00' },
            { nombre: 'Glóbulos Rojos (hematíes)', unidad: 'Cél/uL', refMin: '4000000.00', refMax: '5200000.00' },
            { nombre: 'Hemoglobina', unidad: 'g/dL', refMin: '11.50', refMax: '15.50' },
            { nombre: 'Hematocrito', unidad: '%', refMin: '35.00', refMax: '45.00' },
            { nombre: 'Volumen Corpuscular medio - VCM', unidad: 'fL', refMin: '77.00', refMax: '95.00' },
            { nombre: 'Hemoglobina Corpuscular media - HCM', unidad: 'pg', refMin: '25.00', refMax: '33.00' },
            { nombre: 'Concentración de Hemoglobina Corpuscular media - CHCM', unidad: 'g/dL', refMin: '30.00', refMax: '36.00' },
            { nombre: 'Recuento Plaquetario', unidad: 'Cél/uL', refMin: '150000.00', refMax: '475000.00' },
            { nombre: 'Neutrófilos Segmentados', unidad: '%', refMin: '31', refMax: '51' },
            { nombre: 'Linfocitos', unidad: '%', refMin: '4.00', refMax: '28.00' }
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
            { nombre: 'Glucosa', unidad: 'mg/dL', refMin: '74', refMax: '106', refTexto: 'Adultos: 74 - 106 | Niños: 60 - 100' }
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
            { nombre: 'Hemoglobina Glicosilada (HbA1c)', unidad: '%', refMin: '', refMax: '5.6', refTexto: 'Normal: Menos del 5.7% | Prediabetes: 5.7- 6.4%' }
        ]
    }
];

let examenesSeleccionados = [];
let ordenesLocales = JSON.parse(localStorage.getItem('vitalhealth_ordenes')) || [];
let ordenActualVisualizando = null;

// INICIALIZACIÓN GLOBAL SEGURO DEL DOM
document.addEventListener('DOMContentLoaded', async () => {
    try {
        const dateEl = document.getElementById('current-date');
        if (dateEl) {
            dateEl.innerText = new Date().toLocaleDateString('es-PE', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
        }

        await cargarProductosJSON();
        escucharSincronizacion();
        cargarOrdenes();
        actualizarControlCaja();
        
        // Cerrar lista flotante al hacer clic afuera
        document.addEventListener('click', (e) => {
            const sug = document.getElementById('sugerencias-examenes');
            const busq = document.getElementById('busqueda-examen');
            if (sug && busq && !sug.contains(e.target) && e.target !== busq) {
                sug.innerHTML = '';
            }
        });
    } catch (e) {
        console.error("Error al inicializar interfaz:", e);
    }
});

function escapeHtmlVH(value) {
    return String(value ?? '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

function generarIdIndicador() {
    return 'ind_' + Date.now().toString(36) + '_' + Math.random().toString(36).slice(2, 8);
}

function normalizarIndicadores(lista, prefix = 'ind') {
    if (!Array.isArray(lista)) return [];
    return lista.map((item, index) => ({
        id: item.id || `${prefix}_${index}`,
        nombre: item.nombre || item.titulo || '',
        tipo: item.tipo || 'texto',
        unidad: item.unidad || '',
        referencia: item.referencia ?? item.refTexto ?? '',
        min: item.min ?? item.refMin ?? '',
        max: item.max ?? item.refMax ?? '',
        contenido: item.contenido ?? item.descripcion ?? '',
        obligatorio: item.obligatorio !== false,
        orden: Number.isFinite(Number(item.orden)) ? Number(item.orden) : index + 1
    }));
}

function obtenerIndicadoresExamen(examen) {
    if (!examen) return [];
    if (Array.isArray(examen.indicadores)) return normalizarIndicadores(examen.indicadores, examen.codigo || 'ind');
    // Compatibilidad con catálogos/órdenes anteriores.
    if (Array.isArray(examen.parametros)) return normalizarIndicadores(examen.parametros, examen.codigo || 'ind');
    return [];
}

async function cargarProductosJSON() {
    const catalogoGuardado = localStorage.getItem('vitalhealth_catalogo');
    if (catalogoGuardado) {
        try {
            catalogoExamenes = JSON.parse(catalogoGuardado).map(ex => ({ ...ex, indicadores: normalizarIndicadores(ex.indicadores || ex.parametros || [], ex.codigo || 'ind') }));
            return;
        } catch (e) {
            console.warn("Error en la caché local.");
        }
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
                    indicadores: normalizarIndicadores(prod.indicadores || prod.parametros || [], String(prod.Codigo || prod.codigo || index + 1))
                }));
                guardarCatalogoLocal();
            }
        }
    } catch (error) {
        console.warn('Cargando catálogo por defecto.');
    }
}

function guardarCatalogoLocal() {
    localStorage.setItem('vitalhealth_catalogo', JSON.stringify(catalogoExamenes));
}

function toggleSidebar() {
    const sb = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebar-overlay');
    if (sb) sb.classList.toggle('active');
    if (overlay) overlay.classList.toggle('active');
}

function escucharSincronizacion() {
    if (db) {
        try {
            db.ref('ordenes').on('value', (snapshot) => {
                const data = snapshot.val();
                if (data) {
                    ordenesLocales = Object.values(data);
                    localStorage.setItem('vitalhealth_ordenes', JSON.stringify(ordenesLocales));
                    cargarOrdenes();
                    actualizarControlCaja();
                }
            });
        } catch (err) {
            console.warn("Trabajando en modo fuera de línea.");
        }
    }
}

function guardarEnNubeYLocal() {
    localStorage.setItem('vitalhealth_ordenes', JSON.stringify(ordenesLocales));
    if (db) {
        try {
            db.ref('ordenes').set(ordenesLocales);
        } catch (e) {
            console.warn("Sincronización diferida.");
        }
    }
}

function showSection(sectionId) {
    document.querySelectorAll('.section-content').forEach(el => el.classList.add('d-none'));
    document.querySelectorAll('.sidebar .nav-link').forEach(el => el.classList.remove('active'));
    
    const sec = document.getElementById(`sec-${sectionId}`);
    if (sec) sec.classList.remove('d-none');
    
    // Activar botón navegación
    const navLinks = document.querySelectorAll('.sidebar .nav-link');
    navLinks.forEach(link => {
        if (link.getAttribute('onclick') && link.getAttribute('onclick').includes(sectionId)) {
            link.classList.add('active');
        }
    });

    if (window.innerWidth < 768) {
        const sb = document.getElementById('sidebar');
        const overlay = document.getElementById('sidebar-overlay');
        if (sb) sb.classList.remove('active');
        if (overlay) overlay.classList.remove('active');
    }

    if (sectionId === 'caja') actualizarControlCaja();
    if (sectionId === 'catalogo') {
        renderizarTablaCatalogo();
        if (catalogoExamenes.length > 0) {
            cargarDatosEnFormularioCatalogo(catalogoExamenes[0]);
        }
    }
}

function calcularEdad() {
    const inputFnac = document.getElementById('pac-fnac');
    const inputEdad = document.getElementById('pac-edad');
    if (!inputFnac || !inputEdad || !inputFnac.value) return;

    const hoy = new Date();
    const fnac = new Date(inputFnac.value);
    let edad = hoy.getFullYear() - fnac.getFullYear();
    const mes = hoy.getMonth() - fnac.getMonth();
    if (mes < 0 || (mes === 0 && hoy.getDate() < fnac.getDate())) {
        edad--;
    }
    inputEdad.value = `${Math.max(0, edad)} AÑOS`;
}

async function buscarPaciente() {
    const dniInput = document.getElementById('pac-dni');
    if (!dniInput) return;
    const dni = dniInput.value.trim();

    if (dni.length < 8) {
        return alert('Ingrese un número de documento válido de al menos 8 dígitos.');
    }

    const encontrada = ordenesLocales.find(o => o.dni === dni);
    if (encontrada) {
        const elNom = document.getElementById('pac-nombre');
        const elEdad = document.getElementById('pac-edad');
        const elSexo = document.getElementById('pac-sexo');
        if (elNom) elNom.value = encontrada.paciente;
        if (elEdad) elEdad.value = encontrada.edad;
        if (elSexo) elSexo.value = encontrada.sexo || 'MASCULINO';
        return;
    }

    try {
        const response = await fetch(`https://apiperu.dev/api/dni/${dni}`);
        if (response.ok) {
            const res = await response.json();
            if (res.data) {
                const elNom = document.getElementById('pac-nombre');
                if (elNom) elNom.value = `${res.data.nombres} ${res.data.apellido_paterno} ${res.data.apellido_materno}`.trim();
                return;
            }
        }
        alert('DNI no encontrado. Por favor, escriba los datos del paciente manualmente.');
    } catch (e) {
        alert('Servicio de búsqueda externa no disponible. Complete manualmente.');
    }
}

function filtrarExamenes(texto) {
    const contenedor = document.getElementById('sugerencias-examenes');
    if (!contenedor) return;

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
        item.href = "#";
        item.className = 'list-group-item list-group-item-action border-0 shadow-sm mb-1 rounded';
        item.innerText = `${ex.codigo} - ${ex.nombre} | S/ ${ex.precio.toFixed(2)}`;
        item.onclick = (e) => {
            e.preventDefault();
            agregarExamen(ex);
            contenedor.innerHTML = '';
            const elBusqueda = document.getElementById('busqueda-examen');
            if (elBusqueda) elBusqueda.value = '';
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
    if (!tbody) return;

    tbody.innerHTML = '';
    
    if (examenesSeleccionados.length === 0) {
        tbody.innerHTML = '<tr id="empty-row"><td colspan="6" class="text-center text-muted py-4">No hay exámenes agregados.</td></tr>';
        const totalEl = document.getElementById('total-cobrar');
        if (totalEl) totalEl.innerText = '0.00';
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
            <td class="text-center">
                <button class="btn btn-sm btn-outline-danger" onclick="eliminarExamen(${index})">
                    <i class="bi bi-trash"></i>
                </button>
            </td>
        `;
        tbody.appendChild(row);
    });

    const totalEl = document.getElementById('total-cobrar');
    if (totalEl) totalEl.innerText = total.toFixed(2);
}

function eliminarExamen(index) {
    examenesSeleccionados.splice(index, 1);
    renderExamenes();
}

// CATÁLOGO Y PARÁMETROS
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
        tbody.innerHTML = '<tr><td colspan="5" class="text-center text-muted py-3">Sin resultados.</td></tr>';
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
            <td><small class="text-muted">${ex.muestra || 'Suero'} | <span class="badge bg-info text-dark">${obtenerIndicadoresExamen(ex).length} indicador(es)</span></small></td>
            <td>S/ ${ex.precio.toFixed(2)}</td>
            <td class="text-end px-3">
                <button class="btn btn-sm btn-outline-primary me-1" onclick="seleccionarExamenParaEditar('${ex.codigo}')" title="Editar">
                    <i class="bi bi-pencil"></i>
                </button>
                <button class="btn btn-sm btn-outline-danger" onclick="eliminarExamenCatalogo('${ex.codigo}')" title="Eliminar">
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
    if (!document.getElementById('cat-id-original')) return;

    document.getElementById('cat-id-original').value = ex.codigo;
    document.getElementById('cat-codigo').value = ex.codigo;
    document.getElementById('cat-nombre').value = ex.nombre;
    document.getElementById('cat-precio').value = ex.precio;
    document.getElementById('cat-muestra').value = ex.muestra || '';
    document.getElementById('cat-metodo').value = ex.metodo || '';
    document.getElementById('cat-plantilla').value = ex.plantilla || 'personalizada';
    document.getElementById('cat-ref-texto').value = ex.refTexto || '';

    const contenedor = document.getElementById('contenedor-indicadores');
    if (contenedor) {
        contenedor.innerHTML = '';
        const indicadores = obtenerIndicadoresExamen(ex);
        indicadores.forEach(ind => agregarIndicadorResultado(ind));
        actualizarEstadoVacioIndicadores();
    }

    const tit = document.getElementById('catalogo-form-titulo');
    if (tit) tit.innerHTML = `<i class="bi bi-pencil-square me-2"></i>Editando: ${escapeHtmlVH(ex.codigo)} - ${escapeHtmlVH(ex.nombre)}`;
    const btnGuardar = document.getElementById('btn-guardar-cat');
    if (btnGuardar) btnGuardar.innerHTML = '<i class="bi bi-check-circle me-1"></i>Guardar Cambios del Examen';
}

function agregarIndicadorResultado(ind = {}) {
    const contenedor = document.getElementById('contenedor-indicadores');
    if (!contenedor) return;
    const aviso = contenedor.querySelector('.no-indicadores-msg');
    if (aviso) aviso.remove();

    const indicador = {
        id: ind.id || generarIdIndicador(),
        nombre: ind.nombre || '', tipo: ind.tipo || 'texto', unidad: ind.unidad || '',
        referencia: ind.referencia || '', min: ind.min || '', max: ind.max || '',
        contenido: ind.contenido || '', obligatorio: ind.obligatorio !== false
    };

    const div = document.createElement('div');
    div.className = 'indicador-card border rounded-3 p-3 mb-3 bg-white shadow-sm';
    div.dataset.indicadorId = indicador.id;
    div.innerHTML = `
        <div class="d-flex justify-content-between align-items-center mb-3">
            <div><span class="badge bg-primary-subtle text-primary">INDICADOR</span><span class="small text-muted ms-2">ID independiente</span></div>
            <button type="button" class="btn btn-sm btn-outline-danger" onclick="quitarIndicadorResultado(this)"><i class="bi bi-trash"></i> Eliminar</button>
        </div>
        <div class="row g-2">
            <div class="col-md-6">
                <label class="form-label small fw-semibold">Nombre del indicador</label>
                <input type="text" class="form-control form-control-sm ind-nombre" value="${escapeHtmlVH(indicador.nombre)}" placeholder="Ej. Hemoglobina">
            </div>
            <div class="col-md-3">
                <label class="form-label small fw-semibold">Tipo de resultado</label>
                <select class="form-select form-select-sm ind-tipo">
                    <option value="texto" ${indicador.tipo==='texto'?'selected':''}>Texto</option>
                    <option value="numerico" ${indicador.tipo==='numerico'?'selected':''}>Numérico</option>
                    <option value="multilinea" ${indicador.tipo==='multilinea'?'selected':''}>Texto largo</option>
                    <option value="seleccion" ${indicador.tipo==='seleccion'?'selected':''}>Selección</option>
                </select>
            </div>
            <div class="col-md-3">
                <label class="form-label small fw-semibold">Unidad</label>
                <input type="text" class="form-control form-control-sm ind-unidad" value="${escapeHtmlVH(indicador.unidad)}" placeholder="g/dL, mg/dL, etc.">
            </div>
            <div class="col-md-4">
                <label class="form-label small fw-semibold">Valor referencial</label>
                <input type="text" class="form-control form-control-sm ind-referencia" value="${escapeHtmlVH(indicador.referencia)}" placeholder="Ej. 12 - 16">
            </div>
            <div class="col-md-4">
                <label class="form-label small fw-semibold">Mínimo (opcional)</label>
                <input type="text" class="form-control form-control-sm ind-min" value="${escapeHtmlVH(indicador.min)}" placeholder="Solo si corresponde">
            </div>
            <div class="col-md-4">
                <label class="form-label small fw-semibold">Máximo (opcional)</label>
                <input type="text" class="form-control form-control-sm ind-max" value="${escapeHtmlVH(indicador.max)}" placeholder="Solo si corresponde">
            </div>
            <div class="col-12">
                <label class="form-label small fw-semibold">Contenido / instrucciones / opciones</label>
                <textarea class="form-control form-control-sm ind-contenido" rows="2" placeholder="Texto que quieras mostrar para este indicador o instrucciones internas...">${escapeHtmlVH(indicador.contenido)}</textarea>
            </div>
        </div>`;
    contenedor.appendChild(div);
}

function quitarIndicadorResultado(btn) {
    const card = btn.closest('.indicador-card');
    if (card) card.remove();
    actualizarEstadoVacioIndicadores();
}

function vaciarTodosLosIndicadores() {
    const contenedor = document.getElementById('contenedor-indicadores');
    if (contenedor) contenedor.innerHTML = '';
    actualizarEstadoVacioIndicadores();
}

function actualizarEstadoVacioIndicadores() {
    const contenedor = document.getElementById('contenedor-indicadores');
    if (!contenedor) return;
    if (contenedor.querySelectorAll('.indicador-card').length === 0) {
        contenedor.innerHTML = `<div class="no-indicadores-msg text-center text-muted p-4 border rounded-3 bg-light small"><i class="bi bi-layout-text-window-reverse fs-4 d-block mb-2"></i>Este examen todavía no tiene indicadores. Puedes crear una plantilla completamente diferente para cada examen.</div>`;
    }
}

function prepararNuevoExamen() {
    const form = document.getElementById('form-catalogo');
    if (form) form.reset();
    const idOrig = document.getElementById('cat-id-original');
    if (idOrig) idOrig.value = '';
    const inputCod = document.getElementById('cat-codigo');
    if (inputCod) inputCod.value = String(catalogoExamenes.length + 1);
    vaciarTodosLosIndicadores();
    const tit = document.getElementById('catalogo-form-titulo');
    if (tit) tit.innerHTML = '<i class="bi bi-plus-circle me-2"></i>Crear Nuevo Examen';
    const btnGuardar = document.getElementById('btn-guardar-cat');
    if (btnGuardar) btnGuardar.innerHTML = '<i class="bi bi-save me-1"></i>Registrar Examen';
}

function guardarExamenCatalogo() {
    const idOrig = document.getElementById('cat-id-original')?.value.trim() || '';
    const codigo = document.getElementById('cat-codigo')?.value.trim() || '';
    const nombre = document.getElementById('cat-nombre')?.value.trim().toUpperCase() || '';
    const precio = parseFloat(document.getElementById('cat-precio')?.value);
    const muestra = document.getElementById('cat-muestra')?.value.trim() || '';
    const metodo = document.getElementById('cat-metodo')?.value.trim() || '';
    const plantilla = document.getElementById('cat-plantilla')?.value || 'personalizada';
    const refTexto = document.getElementById('cat-ref-texto')?.value.trim() || '';

    if (!codigo || !nombre || Number.isNaN(precio)) return alert('Debe proporcionar Código, Nombre y Precio del examen.');

    const indicadores = [];
    document.querySelectorAll('#contenedor-indicadores .indicador-card').forEach((card, index) => {
        const nombreInd = card.querySelector('.ind-nombre')?.value.trim() || '';
        if (!nombreInd) return;
        indicadores.push({
            id: card.dataset.indicadorId || generarIdIndicador(),
            nombre: nombreInd,
            tipo: card.querySelector('.ind-tipo')?.value || 'texto',
            unidad: card.querySelector('.ind-unidad')?.value.trim() || '',
            referencia: card.querySelector('.ind-referencia')?.value.trim() || '',
            min: card.querySelector('.ind-min')?.value.trim() || '',
            max: card.querySelector('.ind-max')?.value.trim() || '',
            contenido: card.querySelector('.ind-contenido')?.value.trim() || '',
            obligatorio: true,
            orden: index + 1
        });
    });

    const examenObj = { codigo, nombre, precio, muestra, metodo, plantilla, refTexto, indicadores };
    if (idOrig) {
        const idx = catalogoExamenes.findIndex(e => e.codigo === idOrig);
        if (idx !== -1) catalogoExamenes[idx] = examenObj;
        else catalogoExamenes.unshift(examenObj);
        alert('Examen y su plantilla individual actualizados correctamente.');
    } else {
        if (catalogoExamenes.some(e => e.codigo === codigo)) return alert('Ya existe un examen registrado con este código.');
        catalogoExamenes.unshift(examenObj);
        alert('Nuevo examen y plantilla individual agregados al catálogo.');
    }
    guardarCatalogoLocal();
    renderizarTablaCatalogo();
    seleccionarExamenParaEditar(codigo);
}

function eliminarExamenCatalogo(codigo) {
    if (confirm(`¿Confirma la eliminación del examen ${codigo}?`)) {
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
    const dni = document.getElementById('pac-dni')?.value.trim() || '';
    const paciente = document.getElementById('pac-nombre')?.value.trim() || '';
    const doctor = document.getElementById('pac-doctor')?.value.trim() || 'Particular';
    const edad = document.getElementById('pac-edad')?.value.trim() || '0 AÑOS';
    const sexo = document.getElementById('pac-sexo')?.value || 'MASCULINO';
    const metodo = document.getElementById('metodo-pago')?.value || 'Efectivo';

    if (!dni || !paciente || examenesSeleccionados.length === 0) {
        return alert('Faltan datos obligatorios: DNI, Nombre del paciente y al menos un examen.');
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
        edad: edad,
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
    const formPac = document.getElementById('form-paciente');
    if (formPac) formPac.reset();
}

function imprimirTicket58mm(orden) {
    const area = document.getElementById('ticket-print-area');
    if (!area) return;

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

    if (ordenesLocales.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" class="text-center text-muted py-4">No hay órdenes registradas aún.</td></tr>';
        return;
    }

    ordenesLocales.forEach((orden) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><strong>${orden.id}</strong></td>
            <td>${orden.fecha} ${orden.hora || ''}</td>
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
    if (confirm(`¿Desea eliminar la orden ${id}?`)) {
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
    if (!container) return;
    let camposHTML = '';

    orden.examenes.forEach((ex, examenIndex) => {
        const catEx = catalogoExamenes.find(c => c.codigo === ex.codigo) || ex;
        const indicadores = obtenerIndicadoresExamen(catEx);
        let filas = '';
        if (catEx.plantilla === 'texto_libre' && indicadores.length === 0) {
            const resKey = `${ex.codigo}_texto`;
            const val = orden.resultados?.[resKey]?.resultado || '';
            filas = `<textarea id="res-val-${escapeHtmlVH(resKey)}" class="form-control border-primary resultado-directo" rows="6" data-examen="${escapeHtmlVH(ex.codigo)}" placeholder="Escriba el informe descriptivo...">${escapeHtmlVH(val)}</textarea>`;
        } else if (indicadores.length) {
            indicadores.forEach((ind, idx) => {
                const key = ind.id || `${ex.codigo}_${idx}`;
                const oldKey = `${ex.codigo}_${idx}`;
                const data = orden.resultados?.[key] || orden.resultados?.[oldKey] || {};
                let control = '';
                if (ind.tipo === 'multilinea') {
                    control = `<textarea class="form-control form-control-sm resultado-individual" rows="3" data-examen="${escapeHtmlVH(ex.codigo)}" data-indicador="${escapeHtmlVH(key)}" placeholder="Resultado...">${escapeHtmlVH(data.resultado || '')}</textarea>`;
                } else if (ind.tipo === 'seleccion') {
                    const opciones = (ind.contenido || '').split(/[,;\n]/).map(x=>x.trim()).filter(Boolean);
                    control = `<select class="form-select form-select-sm resultado-individual" data-examen="${escapeHtmlVH(ex.codigo)}" data-indicador="${escapeHtmlVH(key)}"><option value="">Seleccione...</option>${opciones.map(o=>`<option ${String(data.resultado||'')===o?'selected':''} value="${escapeHtmlVH(o)}">${escapeHtmlVH(o)}</option>`).join('')}</select>`;
                } else {
                    control = `<input type="${ind.tipo==='numerico'?'number':'text'}" step="any" class="form-control form-control-sm resultado-individual fw-bold" data-examen="${escapeHtmlVH(ex.codigo)}" data-indicador="${escapeHtmlVH(key)}" value="${escapeHtmlVH(data.resultado || '')}" placeholder="Resultado...">`;
                }
                filas += `<div class="resultado-indicador-row border-bottom pb-3 mb-3"><div class="row g-2 align-items-start"><div class="col-md-4"><label class="form-label fw-bold small mb-1">${escapeHtmlVH(ind.nombre)}</label>${ind.contenido ? `<div class="small text-muted">${escapeHtmlVH(ind.contenido)}</div>` : ''}</div><div class="col-md-4">${control}</div><div class="col-md-4 small text-muted pt-1">${ind.unidad ? `<div><strong>Unidad:</strong> ${escapeHtmlVH(ind.unidad)}</div>` : ''}${ind.referencia ? `<div><strong>Referencia:</strong> ${escapeHtmlVH(ind.referencia)}</div>` : ''}</div></div></div>`;
            });
        } else {
            filas = `<div class="alert alert-light border small mb-0">Este examen no tiene indicadores configurados. Ve a <strong>Catálogo / Plantillas</strong> y créalos de forma individual.</div>`;
        }
        camposHTML += `<div class="card mb-3 shadow-sm border"><div class="card-header bg-light d-flex justify-content-between align-items-center"><h6 class="fw-bold text-primary mb-0">${escapeHtmlVH(ex.nombre)}</h6><span class="badge bg-secondary">${indicadores.length} indicador(es)</span></div><div class="card-body">${filas}</div></div>`;
    });

    container.innerHTML = `<div class="p-3 mb-3 bg-light border rounded"><h5 class="fw-bold mb-1">Paciente: ${escapeHtmlVH(orden.paciente)}</h5><div class="text-muted small"><strong>DNI:</strong> ${escapeHtmlVH(orden.dni)} | <strong>Edad:</strong> ${escapeHtmlVH(orden.edad)} | <strong>Doctor:</strong> ${escapeHtmlVH(orden.doctor || 'Particular')}</div></div>${camposHTML}<div class="d-flex flex-wrap gap-2 mt-4"><button class="btn btn-success fw-semibold" onclick="guardarResultados()"><i class="bi bi-floppy me-1"></i>Guardar Resultados</button><button class="btn btn-primary fw-semibold" onclick="visualizarEImprimirResultados()"><i class="bi bi-printer me-1"></i>Visualizar e Imprimir Reporte A4</button></div>`;
}

function guardarResultados() {
    if (!ordenActualVisualizando) return;
    if (!ordenActualVisualizando.resultados) ordenActualVisualizando.resultados = {};

    document.querySelectorAll('#resultados-editor .resultado-individual').forEach(el => {
        const examen = el.dataset.examen;
        const indicador = el.dataset.indicador;
        if (!examen || !indicador) return;
        const catEx = catalogoExamenes.find(c => c.codigo === examen) || {};
        const ind = obtenerIndicadoresExamen(catEx).find(x => x.id === indicador) || {};
        ordenActualVisualizando.resultados[indicador] = { resultado: el.value || '', indicadorId: indicador, indicador: ind.nombre || '', unidad: ind.unidad || '', referencia: ind.referencia || '' };
    });

    document.querySelectorAll('#resultados-editor .resultado-directo').forEach(el => {
        const examen = el.dataset.examen;
        const key = `${examen}_texto`;
        ordenActualVisualizando.resultados[key] = { resultado: el.value || '', indicadorId: key, indicador: examen };
    });

    ordenActualVisualizando.estado = 'COMPLETADO';
    guardarEnNubeYLocal();
    cargarOrdenes();
    alert('Resultados almacenados correctamente.');
}

function generarTablaEspecializada(ex, catEx, orden) {
    const indicadores = obtenerIndicadoresExamen(catEx);
    if (catEx.plantilla === 'texto_libre' && indicadores.length === 0) {
        const data = orden.resultados?.[`${ex.codigo}_texto`] || {};
        return `<div class="resultado-descriptivo">${escapeHtmlVH(data.resultado || catEx.refTexto || 'Sin descripción ingresada.').replace(/\n/g,'<br>')}</div>`;
    }
    if (!indicadores.length) return `<p style="text-align:center;font-size:12px;color:#64748b;font-style:italic;">Examen sin indicadores configurados.</p>`;
    let filas = '';
    indicadores.forEach((ind, idx) => {
        const key = ind.id || `${ex.codigo}_${idx}`;
        const data = orden.resultados?.[key] || orden.resultados?.[`${ex.codigo}_${idx}`] || {};
        const ref = ind.referencia || ((ind.min || ind.max) ? `${ind.min || '-'} - ${ind.max || '-'}` : '-');
        filas += `<tr><td>${escapeHtmlVH(ind.nombre)}</td><td class="resultado">${escapeHtmlVH(data.resultado || '-')}</td><td>${escapeHtmlVH(ind.unidad || '-')}</td><td>${escapeHtmlVH(ref)}</td></tr>`;
    });
    return `<table class="tabla-resultados"><thead><tr><th>INDICADOR / PRUEBA</th><th>RESULTADO</th><th>UNIDAD</th><th>VALOR REFERENCIAL</th></tr></thead><tbody>${filas}</tbody></table>`;
}

function visualizarEImprimirResultados() {
    if (!ordenActualVisualizando) return;
    guardarResultados();
    let bloques = '';
    ordenActualVisualizando.examenes.forEach(ex => {
        const catEx = catalogoExamenes.find(c => c.codigo === ex.codigo) || ex;
        bloques += `<section class="bloque-examen"><h3>${escapeHtmlVH(ex.nombre)}</h3>${generarTablaEspecializada(ex, catEx, ordenActualVisualizando)}</section>`;
    });

    const o = ordenActualVisualizando;
    const ventanaImp = window.open('', '_blank');
    if (!ventanaImp) return alert('El navegador bloqueó la ventana de impresión. Permita ventanas emergentes para este sistema.');
    ventanaImp.document.write(`<!DOCTYPE html><html lang="es"><head><meta charset="UTF-8"><title>Informe - ${escapeHtmlVH(o.paciente)}</title><style>
        @page{size:A4;margin:14mm 12mm 18mm}*{box-sizing:border-box}body{font-family:'Segoe UI',Arial,sans-serif;color:#172033;margin:0;font-size:11px}.header{display:flex;align-items:center;gap:18px;border-bottom:2px solid #0072bc;padding-bottom:10px}.logo{width:105px;height:70px;object-fit:contain}.brand{flex:1}.brand h1{margin:0;font-size:19px;color:#0072bc}.brand div{font-size:10px;color:#475569}.patient-box{border:1px solid #b7c7d9;border-radius:7px;padding:10px 12px;margin-top:12px;display:grid;grid-template-columns:1fr 1fr;gap:5px 20px;font-size:10.5px}.bloque-examen{margin-top:18px;page-break-inside:avoid}.bloque-examen h3{text-align:center;font-size:14px;margin:0 0 7px;text-transform:uppercase;color:#0f3d62}.tabla-resultados{width:100%;border-collapse:collapse;font-size:10px}.tabla-resultados th{background:#eaf3f9;color:#164e6f;font-weight:700}.tabla-resultados td,.tabla-resultados th{border:1px solid #cbd5e1;padding:6px}.tabla-resultados td.resultado{font-weight:700;text-align:center;font-size:11px}.resultado-descriptivo{border:1px solid #cbd5e1;border-radius:5px;padding:10px;line-height:1.55;white-space:normal}.firma{margin-top:40px;width:280px;text-align:center}.firma-img{max-width:180px;max-height:65px;object-fit:contain;display:block;margin:0 auto 2px}.firma-linea{border-top:1px solid #334155;margin-bottom:5px}.firma small{display:block}.footer{position:fixed;left:0;right:0;bottom:-8mm;border-top:1px solid #cbd5e1;padding-top:5px;text-align:center;font-size:8.5px;color:#64748b}.nota{margin-top:12px;font-size:9px;color:#64748b}
    </style></head><body><div class="header"><img class="logo" src="logo.png" onerror="this.style.display='none'"><div class="brand"><h1>Centro Médico Vital Health</h1><div>LABORATORIO CLÍNICO</div><div>Av. Grau N° 1799 - Veintiséis de Octubre, Piura</div><div>Tel. 984 089 927</div></div></div><div class="patient-box"><div><strong>PACIENTE:</strong> ${escapeHtmlVH(o.paciente).toUpperCase()}</div><div><strong>DNI:</strong> ${escapeHtmlVH(o.dni)}</div><div><strong>EDAD:</strong> ${escapeHtmlVH(o.edad)}</div><div><strong>SEXO:</strong> ${escapeHtmlVH(o.sexo || '')}</div><div><strong>MÉDICO:</strong> ${escapeHtmlVH(o.doctor || 'Particular')}</div><div><strong>ORDEN:</strong> ${escapeHtmlVH(o.id)}</div><div><strong>FECHA:</strong> ${escapeHtmlVH(o.fecha)}</div></div>${bloques}<div class="firma"><img class="firma-img" src="firma-biologa.png" onerror="this.style.display='none'"><div class="firma-linea"></div><strong>Bióloga responsable</strong><small>Laboratorio Clínico - Centro Médico Vital Health</small></div><div class="nota">Este informe corresponde a los resultados registrados en el sistema del laboratorio.</div><div class="footer">Centro Médico Vital Health · Av. Grau N° 1799 · Veintiséis de Octubre, Piura · 984 089 927</div><script>window.onload=function(){setTimeout(function(){window.print()},300)}</script></body></html>`);
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

    const elTot = document.getElementById('caja-total-hoy');
    const elEf = document.getElementById('caja-efectivo');
    const elDig = document.getElementById('caja-digital');

    if (elTot) elTot.innerText = total.toFixed(2);
    if (elEf) elEf.innerText = efectivo.toFixed(2);
    if (elDig) elDig.innerText = digital.toFixed(2);
}
