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

async function cargarProductosJSON() {
    const catalogoGuardado = localStorage.getItem('vitalhealth_catalogo');
    if (catalogoGuardado) {
        try {
            catalogoExamenes = JSON.parse(catalogoGuardado);
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
                    parametros: Array.isArray(prod.parametros) ? prod.parametros : []
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
            <td><small class="text-muted">${ex.muestra || 'Suero'} | <span class="badge bg-info text-dark">${ex.plantilla || 'estandar'}</span></small></td>
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
    document.getElementById('cat-plantilla').value = ex.plantilla || 'estandar';
    document.getElementById('cat-ref-texto').value = ex.refTexto || '';

    const contenedor = document.getElementById('contenedor-parametros');
    if (contenedor) {
        contenedor.innerHTML = '';
        const params = Array.isArray(ex.parametros) ? ex.parametros : [];

        if (params.length > 0) {
            params.forEach(p => agregarFilaParametro(p));
        } else {
            actualizarEstadoVacioParametros();
        }
    }

    const tit = document.getElementById('catalogo-form-titulo');
    if (tit) tit.innerHTML = `<i class="bi bi-pencil-square me-2"></i>Editando: ${ex.codigo} - ${ex.nombre}`;
    
    const btnGuardar = document.getElementById('btn-guardar-cat');
    if (btnGuardar) btnGuardar.innerHTML = '<i class="bi bi-check-circle me-1"></i>Guardar Cambios del Examen';
}

function agregarFilaParametro(p = {}) {
    const contenedor = document.getElementById('contenedor-parametros');
    if (!contenedor) return;
    
    const avisoVacio = contenedor.querySelector('.no-params-msg');
    if (avisoVacio) avisoVacio.remove();

    const div = document.createElement('div');
    div.className = 'parametro-card border p-2 mb-2 rounded bg-light shadow-sm';
    div.innerHTML = `
        <div class="d-flex justify-content-between align-items-center mb-2">
            <span class="fw-bold small text-primary"><i class="bi bi-card-list me-1"></i>Parámetro Técnico</span>
            <button type="button" class="btn btn-sm btn-link text-danger p-0 text-decoration-none" onclick="quitarFilaParametro(this)">
                <i class="bi bi-x-circle-fill"></i> Eliminar
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
                <input type="text" class="form-control form-control-sm param-ref-min" placeholder="Min. Numérico" value="${p.refMin || ''}">
            </div>
            <div class="col-6">
                <input type="text" class="form-control form-control-sm param-ref-max" placeholder="Max. Numérico" value="${p.refMax || ''}">
            </div>
            <div class="col-12">
                <input type="text" class="form-control form-control-sm param-ref-texto" placeholder="Descripción Referencial" value="${p.refTexto || ''}">
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
    if (contenedor) {
        contenedor.innerHTML = '';
        actualizarEstadoVacioParametros();
    }
}

function actualizarEstadoVacioParametros() {
    const contenedor = document.getElementById('contenedor-parametros');
    if (!contenedor) return;

    const tarjetas = contenedor.querySelectorAll('.parametro-card');
    if (tarjetas.length === 0) {
        contenedor.innerHTML = `
            <div class="no-params-msg text-center text-muted p-3 border rounded bg-light small">
                <i class="bi bi-info-circle me-1"></i> Este examen no posee parámetros dinámicos asignados.
            </div>
        `;
    }
}

function prepararNuevoExamen() {
    const form = document.getElementById('form-catalogo');
    if (form) form.reset();
    
    const idOrig = document.getElementById('cat-id-original');
    if (idOrig) idOrig.value = '';

    const inputCod = document.getElementById('cat-codigo');
    if (inputCod) inputCod.value = String(catalogoExamenes.length + 1);

    vaciarTodosLosParametros();

    const tit = document.getElementById('catalogo-form-titulo');
    if (tit) tit.innerHTML = '<i class="bi bi-plus-circle me-2"></i>Crear Nuevo Examen';
    
    const btnGuardar = document.getElementById('btn-guardar-cat');
    if (btnGuardar) btnGuardar.innerHTML = '<i class="bi bi-save me-1"></i>Registrar Examen';
}

function guardarExamenCatalogo() {
    const idOrigEl = document.getElementById('cat-id-original');
    const codEl = document.getElementById('cat-codigo');
    const nomEl = document.getElementById('cat-nombre');
    const precEl = document.getElementById('cat-precio');

    if (!codEl || !nomEl || !precEl) return;

    const idOrig = idOrigEl ? idOrigEl.value.trim() : '';
    const codigo = codEl.value.trim();
    const nombre = nomEl.value.trim().toUpperCase();
    const precio = parseFloat(precEl.value);

    const muestra = document.getElementById('cat-muestra')?.value.trim() || '';
    const metodo = document.getElementById('cat-metodo')?.value.trim() || '';
    const plantilla = document.getElementById('cat-plantilla')?.value || 'estandar';
    const refTexto = document.getElementById('cat-ref-texto')?.value.trim() || '';

    if (!codigo || !nombre || isNaN(precio)) {
        return alert('Debe proporcionar el Código, Nombre y Precio del examen.');
    }

    const filasParam = document.querySelectorAll('#contenedor-parametros .parametro-card');
    const parametros = [];

    filasParam.forEach(card => {
        const pNom = card.querySelector('.param-nombre')?.value.trim() || '';
        const pUni = card.querySelector('.param-unidad')?.value.trim() || '';
        const pMin = card.querySelector('.param-ref-min')?.value.trim() || '';
        const pMax = card.querySelector('.param-ref-max')?.value.trim() || '';
        const pTex = card.querySelector('.param-ref-texto')?.value.trim() || '';

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
        alert('Examen y parámetros actualizados correctamente.');
    } else {
        if (catalogoExamenes.some(e => e.codigo === codigo)) {
            return alert('Ya existe un examen registrado con este código.');
        }
        catalogoExamenes.unshift(examenObj);
        alert('Nuevo examen agregado al catálogo.');
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

    orden.examenes.forEach((ex) => {
        const catEx = catalogoExamenes.find(c => c.codigo === ex.codigo) || ex;
        const params = Array.isArray(catEx.parametros) ? catEx.parametros : [];

        let filasParamsHTML = '';

        if (catEx.plantilla === 'texto_libre') {
            const resKey = `${ex.codigo}_texto`;
            const valRes = (orden.resultados && orden.resultados[resKey]) ? orden.resultados[resKey].resultado : (catEx.refTexto || '');
            filasParamsHTML = `
                <div class="mb-2">
                    <label class="form-label small fw-bold">Informe Descriptivo / Texto Completo:</label>
                    <textarea id="res-val-${resKey}" class="form-control border-primary" rows="5" placeholder="Escriba la descripción del análisis...">${valRes}</textarea>
                </div>
            `;
        } else if (params.length > 0) {
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
            filasParamsHTML = `<p class="text-muted small mb-0">Sin parámetros configurados. Configúrelos en "Catálogo / Plantillas".</p>`;
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
            <button class="btn btn-primary fw-semibold" onclick="visualizarEImprimirResultados()"><i class="bi bi-printer me-1"></i> Visualizar e Imprimir Reporte A4</button>
        </div>
    `;
}

function guardarResultados() {
    if (!ordenActualVisualizando) return;

    if (!ordenActualVisualizando.resultados) ordenActualVisualizando.resultados = {};

    ordenActualVisualizando.examenes.forEach(ex => {
        const catEx = catalogoExamenes.find(c => c.codigo === ex.codigo) || ex;
        
        if (catEx.plantilla === 'texto_libre') {
            const resKey = `${ex.codigo}_texto`;
            const resVal = document.getElementById(`res-val-${resKey}`)?.value || '';
            ordenActualVisualizando.resultados[resKey] = { resultado: resVal, parametro: ex.nombre };
        } else {
            const params = Array.isArray(catEx.parametros) ? catEx.parametros : [];
            params.forEach((p, idx) => {
                const resKey = `${ex.codigo}_${idx}`;
                const resVal = document.getElementById(`res-val-${resKey}`)?.value || '';
                ordenActualVisualizando.resultados[resKey] = { resultado: resVal, parametro: p.nombre };
            });
        }
    });

    ordenActualVisualizando.estado = 'COMPLETADO';
    guardarEnNubeYLocal();
    cargarOrdenes();
    alert('Resultados almacenados con éxito.');
}

function generarTablaEspecializada(ex, catEx, orden) {
    const params = Array.isArray(catEx.parametros) ? catEx.parametros : [];
    const tipoPlantilla = catEx.plantilla || 'estandar';

    if (tipoPlantilla === 'texto_libre') {
        const resKey = `${ex.codigo}_texto`;
        const resData = (orden.resultados && orden.resultados[resKey]) ? orden.resultados[resKey] : {};
        const contenido = resData.resultado || catEx.refTexto || 'Sin descripción ingresada.';

        return `
            <div style="background-color:#f8fafc; border: 1px solid #cbd5e1; border-radius: 6px; padding: 12px; font-size:12px; line-height: 1.6; white-space: pre-wrap; font-family: 'Segoe UI', Tahoma, sans-serif;">
                ${contenido}
            </div>
        `;
    }

    if (params.length === 0) {
        return `<p style="text-align:center; font-size:12px; color:#64748b; font-style:italic;">Examen sin parámetros descriptivos.</p>`;
    }

    let filasEstandar = '';
    params.forEach((p, idx) => {
        const resKey = `${ex.codigo}_${idx}`;
        const resData = (orden.resultados && orden.resultados[resKey]) ? orden.resultados[resKey] : {};
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
        <table style="width:100%; border-collapse:collapse; font-size:11px; text-align:center; margin-top:5px;">
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
            <div style="margin-top:18px; page-break-inside: avoid;">
                <h3 style="text-align:center; font-size:15px; font-weight:bold; margin-bottom:6px; font-family:'Segoe UI', sans-serif; color: #000000; text-transform: uppercase;">
                    EXAMEN DE ${ex.nombre}
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
            <title>Informe - ${ordenActualVisualizando.paciente}</title>
            <style>
                @page { size: A4; margin: 12mm; }
                body { font-family: 'Segoe UI', Arial, sans-serif; color: #1e293b; margin: 0; padding: 0; }
                .header { display: flex; align-items: center; justify-content: space-between; border-bottom: 2px solid #0072bc; padding-bottom: 8px; }
                .patient-box { border: 1.5px solid #3b82f6; border-radius: 8px; padding: 10px 16px; margin-top: 12px; display: grid; grid-template-columns: 1fr 1fr; row-gap: 5px; font-size: 11px; font-weight: 600; background-color: #fafafa; }
            </style>
        </head>
        <body>
            <div class="header">
                <h2>Centro Médico VITAL HEALTH</h2>
                <div>Tel: 984 089 927</div>
            </div>
            <div class="patient-box">
                <div>PACIENTE: ${ordenActualVisualizando.paciente.toUpperCase()}</div>
                <div>EDAD: ${ordenActualVisualizando.edad}</div>
                <div>DNI: ${ordenActualVisualizando.dni}</div>
                <div>FECHA: ${ordenActualVisualizando.fecha}</div>
            </div>
            ${bloquesExamenesHTML}
            <script>window.onload = function() { window.print(); }</script>
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

    const elTot = document.getElementById('caja-total-hoy');
    const elEf = document.getElementById('caja-efectivo');
    const elDig = document.getElementById('caja-digital');

    if (elTot) elTot.innerText = total.toFixed(2);
    if (elEf) elEf.innerText = efectivo.toFixed(2);
    if (elDig) elDig.innerText = digital.toFixed(2);
}
