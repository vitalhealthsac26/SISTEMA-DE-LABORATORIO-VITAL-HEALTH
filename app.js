// CONFIGURACIÓN DE FIREBASE
const firebaseConfig = {
    databaseURL: "https://vital-health-default-rtdb.firebaseio.com"
};

if (typeof firebase !== 'undefined' && !firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
const db = (typeof firebase !== 'undefined') ? firebase.database() : null;

// Catálogo base de exámenes
let catalogoExamenes = [
    { codigo: 'EX001', nombre: 'HEMOGRAMA COMPLETO', precio: 25.00 },
    { codigo: 'EX002', nombre: 'PERFIL LIPÍDICO: Colesterol Total, Triglicéridos, HDL, LDL', precio: 50.00 },
    { codigo: 'EX003', nombre: 'PERFIL DE COAGULACIÓN', precio: 130.00 },
    { codigo: 'EX004', nombre: 'GLUCOSA EN AYUNAS', precio: 15.00 },
    { codigo: 'EX005', nombre: 'EXAMEN COMPLETO DE ORINA', precio: 20.00 }
];

let examenesSeleccionados = [];
let ordenesLocales = JSON.parse(localStorage.getItem('vitalhealth_ordenes')) || [];
let ordenActualVisualizando = null;

document.addEventListener('DOMContentLoaded', async () => {
    const dateEl = document.getElementById('current-date');
    if (dateEl) {
        dateEl.innerText = new Date().toLocaleDateString('es-PE', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    }
    
    // Cargar catálogo desde JSON o localStorage
    await cargarProductosJSON();
    
    escucharSincronizacion();
    cargarOrdenes();
    actualizarControlCaja();
    renderizarTablaCatalogo();
});

// Cargar catálogo de exámenes desde productos.json o localStorage
async function cargarProductosJSON() {
    const catalogoGuardado = localStorage.getItem('vitalhealth_catalogo');
    if (catalogoGuardado) {
        catalogoExamenes = JSON.parse(catalogoGuardado);
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
                    precio: parseFloat(prod.Precio || prod.precio || 0)
                }));
                guardarCatalogoLocal();
            }
        }
    } catch (error) {
        console.error('No se pudo cargar productos.json:', error);
    }
}

function guardarCatalogoLocal() {
    localStorage.setItem('vitalhealth_catalogo', JSON.stringify(catalogoExamenes));
}

// Toggle para menú móvil
function toggleSidebar() {
    document.getElementById('sidebar').classList.toggle('active');
    document.getElementById('sidebar-overlay').classList.toggle('active');
}

// Sincronización multi-dispositivo en tiempo real vía Firebase
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

// CONSULTA AUTOMÁTICA DNI (RENIEC / API + HISTORIAL LOCAL)
async function buscarPaciente() {
    const dniInput = document.getElementById('pac-dni');
    const dni = dniInput.value.trim();

    if (dni.length !== 8 || isNaN(dni)) {
        return alert('Por favor, ingrese un número de DNI válido de 8 dígitos.');
    }

    const encontrada = ordenesLocales.find(o => o.dni === dni);
    if (encontrada) {
        document.getElementById('pac-nombre').value = encontrada.paciente;
        document.getElementById('pac-edad').value = encontrada.edad;
        return;
    }

    const btnText = document.getElementById('btn-text');
    if (btnText) btnText.innerText = 'Buscando...';

    let encontrado = false;

    try {
        const response = await fetch(`https://apiperu.dev/api/dni/${dni}`);
        if (response.ok) {
            const res = await response.json();
            if (res.data) {
                const nombreCompleto = `${res.data.nombres} ${res.data.apellido_paterno} ${res.data.apellido_materno}`.trim();
                document.getElementById('pac-nombre').value = nombreCompleto;
                encontrado = true;
            }
        }
    } catch (e) {
        console.warn('Falló intento 1 DNI:', e);
    }

    if (!encontrado) {
        try {
            const response = await fetch(`https://api.apis.net.pe/v1/dni?numero=${dni}`);
            if (response.ok) {
                const data = await response.json();
                const nombreCompleto = `${data.nombres} ${data.apellidoPaterno} ${data.apellidoMaterno}`.trim();
                document.getElementById('pac-nombre').value = nombreCompleto;
                encontrado = true;
            }
        } catch (e) {
            console.warn('Falló intento 2 DNI:', e);
        }
    }

    if (!encontrado) {
        alert('No se obtuvo respuesta automática de RENIEC. Por favor, ingrese el nombre manualmente.');
    }

    if (btnText) btnText.innerText = 'Consultar';
}

// FILTRADO RÁPIDO DE EXÁMENES EN RECEPCIÓN (MÁXIMO 15 RESULTADOS)
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
        tbody.innerHTML = '<tr id="empty-row"><td colspan="6" class="text-center text-muted">No hay exámenes agregados.</td></tr>';
        document.getElementById('total-cobrar').innerText = '0.00';
        return;
    }

    let total = 0;
    examenesSeleccionados.forEach((ex, index) => {
        total += ex.precio;
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${ex.codigo}</td>
            <td>${ex.nombre}</td>
            <td>1</td>
            <td>S/ ${ex.precio.toFixed(2)}</td>
            <td>S/ ${ex.precio.toFixed(2)}</td>
            <td><button class="btn btn-sm btn-outline-danger" onclick="eliminarExamen(${index})"><i class="bi bi-trash"></i></button></td>
        `;
        tbody.appendChild(row);
    });

    document.getElementById('total-cobrar').innerText = total.toFixed(2);
}

function eliminarExamen(index) {
    examenesSeleccionados.splice(index, 1);
    renderExamenes();
}

// FUNCIONES PARA LA GESTIÓN DEL CATÁLOGO
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
        tbody.innerHTML = '<tr><td colspan="4" class="text-center text-muted py-3">No hay exámenes registrados.</td></tr>';
        return;
    }

    // Renderizamos máximo 100 elementos por rendimiento visual
    filtrados.slice(0, 100).forEach(ex => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><span class="badge bg-light text-dark border">${ex.codigo}</span></td>
            <td><strong>${ex.nombre}</strong></td>
            <td>S/ ${ex.precio.toFixed(2)}</td>
            <td class="text-end">
                <button class="btn btn-sm btn-outline-primary me-1" onclick="editarExamenCatalogo('${ex.codigo}')">
                    <i class="bi bi-pencil"></i>
                </button>
                <button class="btn btn-sm btn-outline-danger" onclick="eliminarExamenCatalogo('${ex.codigo}')">
                    <i class="bi bi-trash"></i>
                </button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

function guardarExamenCatalogo() {
    const idOrig = document.getElementById('cat-id-original').value;
    const codigo = document.getElementById('cat-codigo').value.trim();
    const nombre = document.getElementById('cat-nombre').value.trim().toUpperCase();
    const precio = parseFloat(document.getElementById('cat-precio').value);

    if (!codigo || !nombre || isNaN(precio)) {
        return alert('Por favor complete todos los campos del examen.');
    }

    if (idOrig) {
        // Modo Edición
        const idx = catalogoExamenes.findIndex(e => e.codigo === idOrig);
        if (idx !== -1) {
            catalogoExamenes[idx] = { codigo, nombre, precio };
        }
    } else {
        // Modo Creación
        if (catalogoExamenes.some(e => e.codigo === codigo)) {
            return alert('Ya existe un examen con este mismo código.');
        }
        catalogoExamenes.unshift({ codigo, nombre, precio });
    }

    guardarCatalogoLocal();
    renderizarTablaCatalogo();
    cancelarEdicionCatalogo();
    alert('Examen guardado correctamente.');
}

function editarExamenCatalogo(codigo) {
    const ex = catalogoExamenes.find(e => e.codigo === codigo);
    if (!ex) return;

    document.getElementById('cat-id-original').value = ex.codigo;
    document.getElementById('cat-codigo').value = ex.codigo;
    document.getElementById('cat-nombre').value = ex.nombre;
    document.getElementById('cat-precio').value = ex.precio;

    document.getElementById('catalogo-form-titulo').innerHTML = '<i class="bi bi-pencil-square me-2"></i>Editar Examen';
    document.getElementById('btn-guardar-cat').innerHTML = '<i class="bi bi-check-circle me-1"></i>Actualizar Examen';
    document.getElementById('btn-cancelar-cat').classList.remove('d-none');
}

function cancelarEdicionCatalogo() {
    document.getElementById('form-catalogo').reset();
    document.getElementById('cat-id-original').value = '';
    document.getElementById('catalogo-form-titulo').innerHTML = '<i class="bi bi-plus-circle me-2"></i>Agregar Nuevo Examen';
    document.getElementById('btn-guardar-cat').innerHTML = '<i class="bi bi-save me-1"></i>Guardar Examen';
    document.getElementById('btn-cancelar-cat').classList.add('d-none');
}

function eliminarExamenCatalogo(codigo) {
    if (confirm(`¿Está seguro de eliminar el examen con código ${codigo}?`)) {
        catalogoExamenes = catalogoExamenes.filter(e => e.codigo !== codigo);
        guardarCatalogoLocal();
        renderizarTablaCatalogo();
    }
}

// GENERACIÓN DE TICKET Y ÓRDENES
function guardarOrdenGenerarTicket() {
    const dni = document.getElementById('pac-dni').value.trim();
    const paciente = document.getElementById('pac-nombre').value.trim();
    const edad = document.getElementById('pac-edad').value.trim();
    const metodo = document.getElementById('metodo-pago').value;

    if (!dni || !paciente || examenesSeleccionados.length === 0) {
        return alert('Por favor complete todos los datos requeridos y añada al menos un examen.');
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
        edad: edad || 'N/A',
        examenes: [...examenesSeleccionados],
        total: total,
        metodoPago: metodo,
        estado: 'EN PROCESO',
        resultados: {}
    };

    ordenesLocales.unshift(nuevaOrden);
    guardarEnNubeYLocal();

    imprimirTicket58mm(nuevaOrden);

    examenesSeleccionados = [];
    renderExamenes();
    document.getElementById('form-paciente').reset();
    alert('Orden guardada correctamente.');
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
        <div><strong>EDAD:</strong> ${orden.edad}</div>
        <div class="ticket-divider"></div>
        <table class="ticket-table">
            <thead>
                <tr>
                    <th>Examen</th>
                    <th class="text-end">Importe</th>
                </tr>
            </thead>
            <tbody>
                ${listaHTML}
            </tbody>
        </table>
        <div class="ticket-divider"></div>
        <div class="text-end"><strong>TOTAL: S/ ${orden.total.toFixed(2)}</strong></div>
        <div class="ticket-divider"></div>
        <div class="text-center" style="margin-top: 5px;">
            Gracias por confiar en Vital Health.<br>Tu salud es nuestra prioridad.
        </div>
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
            <td>${orden.edad}</td>
            <td>S/ ${orden.total.toFixed(2)}</td>
            <td><span class="badge bg-info text-dark">${orden.estado}</span></td>
            <td>
                <button class="btn btn-sm btn-primary" onclick="abrirResultados('${orden.id}')"><i class="bi bi-journal-medical"></i> Resultados</button>
                <button class="btn btn-sm btn-danger" onclick="eliminarOrden('${orden.id}')"><i class="bi bi-trash"></i> Eliminar</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

function eliminarOrden(id) {
    if (confirm(`¿Está seguro de que desea eliminar la orden ${id}? Esta acción no se puede deshacer.`)) {
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
        const val = (orden.resultados && orden.resultados[ex.codigo]) ? orden.resultados[ex.codigo] : '';
        camposHTML += `
            <div class="mb-3 p-3 border rounded bg-light">
                <h6><strong>${ex.nombre}</strong></h6>
                <div class="row g-2">
                    <div class="col-12 col-md-8">
                        <label class="form-label">Resultado</label>
                        <input type="text" id="res-${ex.codigo}" class="form-control" value="${val}">
                    </div>
                    <div class="col-12 col-md-4">
                        <label class="form-label">Unidad / Observación</label>
                        <input type="text" id="obs-${ex.codigo}" class="form-control" placeholder="Valores normales...">
                    </div>
                </div>
            </div>
        `;
    });

    container.innerHTML = `
        <div class="p-2 mb-3 bg-white border-bottom">
            <h4>Paciente: ${orden.paciente} | Edad: ${orden.edad} | DNI: ${orden.dni}</h4>
            <small class="text-muted">N° Orden: ${orden.id}</small>
        </div>
        ${camposHTML}
        <div class="d-flex flex-wrap gap-2 mt-3">
            <button class="btn btn-success" onclick="guardarResultados()"><i class="bi bi-floppy"></i> Guardar Resultados</button>
            <button class="btn btn-primary" onclick="visualizarEImprimirResultados()"><i class="bi bi-printer"></i> Visualizar e Imprimir Resultados</button>
        </div>
    `;
}

function guardarResultados() {
    if (!ordenActualVisualizando) return;

    ordenActualVisualizando.examenes.forEach(ex => {
        const el = document.getElementById(`res-${ex.codigo}`);
        if (el) {
            if (!ordenActualVisualizando.resultados) ordenActualVisualizando.resultados = {};
            ordenActualVisualizando.resultados[ex.codigo] = el.value;
        }
    });

    ordenActualVisualizando.estado = 'COMPLETADO';
    guardarEnNubeYLocal();
    alert('Resultados guardados exitosamente.');
}

function visualizarEImprimirResultados() {
    if (!ordenActualVisualizando) return;

    guardarResultados();

    let filasResultados = '';
    ordenActualVisualizando.examenes.forEach(ex => {
        const val = ordenActualVisualizando.resultados[ex.codigo] || 'Pendiente';
        filasResultados += `
            <tr>
                <td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>${ex.nombre}</strong></td>
                <td style="padding: 8px; border-bottom: 1px solid #ddd;">${val}</td>
            </tr>
        `;
    });

    const ventanaImp = window.open('', '_blank');
    ventanaImp.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Informe de Resultados - ${ordenActualVisualizando.id}</title>
            <style>
                body { font-family: Arial, sans-serif; margin: 30px; color: #333; }
                .header { text-align: center; border-bottom: 2px solid #0072bc; padding-bottom: 10px; margin-bottom: 20px; }
                .patient-info { background: #f4f4f4; padding: 15px; border-radius: 5px; margin-bottom: 20px; }
                table { width: 100%; border-collapse: collapse; margin-top: 10px; }
                th { background: #0072bc; color: white; padding: 10px; text-align: left; }
                .footer { margin-top: 40px; text-align: center; font-size: 12px; color: #777; }
            </style>
        </head>
        <body>
            <div class="header">
                <h2 style="margin:0;">CENTRO MÉDICO VITAL HEALTH</h2>
                <p style="margin:5px 0;">LABORATORIO CLÍNICO</p>
                <small>Av. Grau N° 1799 - Piura | Tel: 984 089 927</small>
            </div>
            <div class="patient-info">
                <strong>PACIENTE:</strong> ${ordenActualVisualizando.paciente}<br>
                <strong>DNI:</strong> ${ordenActualVisualizando.dni} | <strong>EDAD:</strong> ${ordenActualVisualizando.edad}<br>
                <strong>N° ORDEN:</strong> ${ordenActualVisualizando.id} | <strong>FECHA:</strong> ${ordenActualVisualizando.fecha}
            </div>
            <h3>RESULTADOS DE ANÁLISIS</h3>
            <table>
                <thead>
                    <tr>
                        <th>Examen</th>
                        <th>Resultado</th>
                    </tr>
                </thead>
                <tbody>
                    ${filasResultados}
                </tbody>
            </table>
            <div class="footer">
                <p>Este informe refleja los resultados procesados electrónicamente por Vital Health.</p>
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

    let total = 0;
    let efectivo = 0;
    let digital = 0;

    const tbody = document.getElementById('caja-tabla-body');
    if (tbody) tbody.innerHTML = '';

    ordenesHoy.forEach(o => {
        total += o.total;
        if (o.metodoPago === 'Efectivo') {
            efectivo += o.total;
        } else {
            digital += o.total;
        }

        if (tbody) {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${o.hora || 'S/H'}</td>
                <td>${o.id}</td>
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
