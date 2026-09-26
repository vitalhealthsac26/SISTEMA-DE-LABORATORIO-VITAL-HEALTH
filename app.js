// CONFIGURACIÓN DE FIREBASE
const firebaseConfig = {
    databaseURL: "https://vital-health-default-rtdb.firebaseio.com"
};

if (typeof firebase !== 'undefined' && !firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
const db = (typeof firebase !== 'undefined') ? firebase.database() : null;

// Catálogo base con plantillas
let catalogoExamenes = [
    {
        codigo: 'EX001',
        nombre: 'ÁCIDO ÚRICO',
        precio: 25.00,
        muestra: 'Suero',
        unidad: 'mg/dL',
        refMin: '2.50',
        refMax: '7.00',
        refTexto: '',
        metodo: 'Colorimétrico enzimático o Espectrofotometría EC9200'
    },
    {
        codigo: 'EX002',
        nombre: 'HEMOGLOBINA GLICOSILADA (HbA1c)',
        precio: 50.00,
        muestra: 'Sangre',
        unidad: '%',
        refMin: '',
        refMax: '',
        refTexto: 'Normal: Menos del 5.7%\nPrediabetes: 5.7- 6.4%\nDiabetes: 6.5% a más',
        metodo: 'Inmunoturbidimetría'
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
                    unidad: prod.unidad || '',
                    refMin: prod.refMin || '',
                    refMax: prod.refMax || '',
                    refTexto: prod.refTexto || '',
                    metodo: prod.metodo || ''
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
            // Si hace clic en la papelera no selecciona
            if (e.target.closest('button')) return;
            seleccionarExamenParaEditar(ex.codigo);
        };
        tr.innerHTML = `
            <td><span class="badge bg-light text-dark border">${ex.codigo}</span></td>
            <td><strong>${ex.nombre}</strong></td>
            <td><small class="text-muted">${ex.muestra || 'Suero'} | ${ex.metodo || 'Estándar'}</small></td>
            <td>S/ ${ex.precio.toFixed(2)}</td>
            <td class="text-end px-3">
                <button class="btn btn-sm btn-outline-primary me-1" onclick="seleccionarExamenParaEditar('${ex.codigo}')" title="Editar en formulario">
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
    const ex = catalogoExamenes.find(e => e.codigo === codigo);
    if (!ex) return;
    cargarDatosEnFormularioCatalogo(ex);
}

function cargarDatosEnFormularioCatalogo(ex) {
    document.getElementById('cat-id-original').value = ex.codigo;
    document.getElementById('cat-codigo').value = ex.codigo;
    document.getElementById('cat-nombre').value = ex.nombre;
    document.getElementById('cat-precio').value = ex.precio;
    document.getElementById('cat-muestra').value = ex.muestra || '';
    document.getElementById('cat-unidad').value = ex.unidad || '';
    document.getElementById('cat-ref-min').value = ex.refMin || '';
    document.getElementById('cat-ref-max').value = ex.refMax || '';
    document.getElementById('cat-ref-texto').value = ex.refTexto || '';
    document.getElementById('cat-metodo').value = ex.metodo || '';

    document.getElementById('catalogo-form-titulo').innerHTML = `<i class="bi bi-pencil-square me-2"></i>Editando: ${ex.nombre}`;
    document.getElementById('btn-guardar-cat').innerHTML = '<i class="bi bi-check-circle me-1"></i>Guardar Cambios del Examen';
}

function prepararNuevoExamen() {
    document.getElementById('form-catalogo').reset();
    document.getElementById('cat-id-original').value = ''; // Vacío indica que es NUEVO
    const nuevoCodigo = 'EX-' + String(catalogoExamenes.length + 100);
    document.getElementById('cat-codigo').value = nuevoCodigo;
    document.getElementById('catalogo-form-titulo').innerHTML = '<i class="bi bi-plus-circle me-2"></i>Crear Nuevo Examen';
    document.getElementById('btn-guardar-cat').innerHTML = '<i class="bi bi-save me-1"></i>Registrar Nuevo Examen';
}

function guardarExamenCatalogo() {
    const idOrig = document.getElementById('cat-id-original').value.trim();
    const codigo = document.getElementById('cat-codigo').value.trim();
    const nombre = document.getElementById('cat-nombre').value.trim().toUpperCase();
    const precio = parseFloat(document.getElementById('cat-precio').value);

    const muestra = document.getElementById('cat-muestra').value.trim();
    const unidad = document.getElementById('cat-unidad').value.trim();
    const refMin = document.getElementById('cat-ref-min').value.trim();
    const refMax = document.getElementById('cat-ref-max').value.trim();
    const refTexto = document.getElementById('cat-ref-texto').value.trim();
    const metodo = document.getElementById('cat-metodo').value.trim();

    if (!codigo || !nombre || isNaN(precio)) {
        return alert('Por favor complete el Código, Nombre y Precio del examen.');
    }

    const examenObj = { codigo, nombre, precio, muestra, unidad, refMin, refMax, refTexto, metodo };

    if (idOrig) {
        // ACTUALIZAR EXAMEN EXISTENTE
        const idx = catalogoExamenes.findIndex(e => e.codigo === idOrig);
        if (idx !== -1) {
            catalogoExamenes[idx] = examenObj;
        } else {
            catalogoExamenes.unshift(examenObj);
        }
        alert('Cambios guardados exitosamente.');
    } else {
        // CREAR NUEVO EXAMEN
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
        catalogoExamenes = catalogoExamenes.filter(e => e.codigo !== codigo);
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
        const valRes = (orden.resultados && orden.resultados[ex.codigo]) ? orden.resultados[ex.codigo].resultado : '';

        camposHTML += `
            <div class="card mb-3 shadow-sm border">
                <div class="card-header bg-light">
                    <h6 class="fw-bold text-primary mb-0">${ex.nombre}</h6>
                </div>
                <div class="card-body">
                    <div class="row g-3">
                        <div class="col-12 col-md-3">
                            <label class="form-label small fw-semibold">Muestra</label>
                            <input type="text" id="res-muestra-${ex.codigo}" class="form-control form-control-sm" value="${catEx.muestra || 'Suero'}">
                        </div>
                        <div class="col-12 col-md-3">
                            <label class="form-label small fw-semibold">Resultado obtenido</label>
                            <input type="text" id="res-val-${ex.codigo}" class="form-control form-control-sm border-primary fw-bold" value="${valRes}">
                        </div>
                        <div class="col-12 col-md-2">
                            <label class="form-label small fw-semibold">Unidad</label>
                            <input type="text" id="res-unidad-${ex.codigo}" class="form-control form-control-sm" value="${catEx.unidad || ''}">
                        </div>
                        <div class="col-12 col-md-4">
                            <label class="form-label small fw-semibold">Método</label>
                            <input type="text" id="res-metodo-${ex.codigo}" class="form-control form-control-sm" value="${catEx.metodo || ''}">
                        </div>
                    </div>
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
        const resVal = document.getElementById(`res-val-${ex.codigo}`)?.value || '';
        const muestra = document.getElementById(`res-muestra-${ex.codigo}`)?.value || '';
        const unidad = document.getElementById(`res-unidad-${ex.codigo}`)?.value || '';
        const metodo = document.getElementById(`res-metodo-${ex.codigo}`)?.value || '';

        ordenActualVisualizando.resultados[ex.codigo] = { resultado: resVal, muestra, unidad, metodo };
    });

    ordenActualVisualizando.estado = 'COMPLETADO';
    guardarEnNubeYLocal();
    cargarOrdenes();
    alert('Resultados guardados correctamente.');
}

function visualizarEImprimirResultados() {
    if (!ordenActualVisualizando) return;

    guardarResultados();

    let bloquesExamenesHTML = '';

    ordenActualVisualizando.examenes.forEach(ex => {
        const catEx = catalogoExamenes.find(c => c.codigo === ex.codigo) || ex;
        const resData = ordenActualVisualizando.resultados[ex.codigo] || {};

        let valRefHTML = '';
        if (catEx.refMin || catEx.refMax) {
            valRefHTML = `
                <table style="width:100%; text-align:center; border-collapse:collapse; font-size:12px;">
                    <tr>
                        <td style="border-bottom:1px solid #ccc; padding-bottom:2px;">Mínimo</td>
                        <td style="border-bottom:1px solid #ccc; padding-bottom:2px;">Máximo</td>
                    </tr>
                    <tr>
                        <td style="padding-top:2px;">${catEx.refMin || '-'}</td>
                        <td style="padding-top:2px;">${catEx.refMax || '-'}</td>
                    </tr>
                </table>
            `;
        } else {
            valRefHTML = (catEx.refTexto || '-').replace(/\n/g, '<br>');
        }

        bloquesExamenesHTML += `
            <div style="margin-top:25px;">
                <h3 style="text-align:center; font-size:18px; font-weight:bold; margin-bottom:12px; font-family:'Segoe UI', sans-serif;">
                    ${ex.nombre}
                </h3>
                <table style="width:100%; border-collapse:collapse; font-size:12px; text-align:center;">
                    <thead>
                        <tr style="background-color: #dbeafe; color: #1e3a8a;">
                            <th style="padding: 8px; border: 1px solid #bfdbfe;">MUESTRA: ${resData.muestra || catEx.muestra || 'Suero'}</th>
                            <th style="padding: 8px; border: 1px solid #bfdbfe;">RESULTADO</th>
                            <th style="padding: 8px; border: 1px solid #bfdbfe;">UNIDAD</th>
                            <th style="padding: 8px; border: 1px solid #bfdbfe;">VALOR REFERENCIAL</th>
                            <th style="padding: 8px; border: 1px solid #bfdbfe;">MÉTODO</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr style="background-color: #f8fafc;">
                            <td style="padding: 10px; border: 1px solid #e2e8f0; font-weight: bold;">${ex.nombre}</td>
                            <td style="padding: 10px; border: 1px solid #e2e8f0; font-weight: bold; font-size:14px;">${resData.resultado || ''}</td>
                            <td style="padding: 10px; border: 1px solid #e2e8f0;">${resData.unidad || catEx.unidad || ''}</td>
                            <td style="padding: 10px; border: 1px solid #e2e8f0;">${valRefHTML}</td>
                            <td style="padding: 10px; border: 1px solid #e2e8f0; font-style: italic; font-size: 11px;">${resData.metodo || catEx.metodo || ''}</td>
                        </tr>
                    </tbody>
                </table>
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
                    margin-top: 60px;
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
