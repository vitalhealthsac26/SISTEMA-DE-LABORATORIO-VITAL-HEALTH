/* =========================================================
   VITAL HEALTH LIS - CORE V2
   Front-end modular para recepción, órdenes, resultados,
   catálogo, historial, caja, dashboard y reportes.
   ========================================================= */

"use strict";

let db = null;
let firebaseReady = false;
let ordenesLocales = loadJSON("vitalhealth_ordenes", []);
let catalogoExamenes = loadJSON("vitalhealth_catalogo", []);
let examenesSeleccionados = [];
let ordenActualVisualizando = null;

const STORAGE_ORDENES = "vitalhealth_ordenes";
const STORAGE_CATALOGO = "vitalhealth_catalogo";
const STORAGE_SEQ = "vitalhealth_order_sequence";

const DEFAULT_CATALOG = [
    {codigo:"101",nombre:"HEMOGRAMA COMPLETO",precio:35,muestra:"Sangre Total (EDTA)",metodo:"Citometría de flujo / Impedancia eléctrica",plantilla:"hemograma",refTexto:"",parametros:[
        {nombre:"Leucocitos",unidad:"Cél/uL",refMin:"4500",refMax:"13500"},
        {nombre:"Glóbulos Rojos (hematíes)",unidad:"Cél/uL",refMin:"4000000",refMax:"5200000"},
        {nombre:"Hemoglobina",unidad:"g/dL",refMin:"11.50",refMax:"15.50"},
        {nombre:"Hematocrito",unidad:"%",refMin:"35",refMax:"45"},
        {nombre:"Volumen Corpuscular Medio - VCM",unidad:"fL",refMin:"77",refMax:"95"},
        {nombre:"Hemoglobina Corpuscular Media - HCM",unidad:"pg",refMin:"25",refMax:"33"},
        {nombre:"Concentración de Hemoglobina Corpuscular Media - CHCM",unidad:"g/dL",refMin:"30",refMax:"36"},
        {nombre:"Recuento Plaquetario",unidad:"Cél/uL",refMin:"150000",refMax:"475000"}
    ]},
    {codigo:"102",nombre:"GLUCOSA EN AYUNAS",precio:15,muestra:"Suero",metodo:"Colorimétrico enzimático",plantilla:"bioquimica",refTexto:"",parametros:[
        {nombre:"Glucosa",unidad:"mg/dL",refMin:"74",refMax:"106",refTexto:"Adultos: 74 - 106 mg/dL"}
    ]},
    {codigo:"103",nombre:"HEMOGLOBINA GLICOSILADA (HbA1c)",precio:60,muestra:"Sangre Total (EDTA)",metodo:"HPLC / Inmunoturbidimetría",plantilla:"hba1c",refTexto:"",parametros:[
        {nombre:"Hemoglobina Glicosilada (HbA1c)",unidad:"%",refMin:"",refMax:"5.6",refTexto:"Normal: < 5.7% | Prediabetes: 5.7 - 6.4%"}
    ]}
];

document.addEventListener("DOMContentLoaded", async () => {
    inicializarFirebase();
    if (!Array.isArray(catalogoExamenes) || !catalogoExamenes.length) {
        catalogoExamenes = DEFAULT_CATALOG;
        guardarCatalogoLocal();
    }
    iniciarReloj();
    await cargarProductosJSON();
    escucharSincronizacion();
    renderExamenes();
    cargarOrdenes();
    renderizarPacientes();
    renderizarTablaCatalogo();
    actualizarControlCaja();
    actualizarDashboard();
    prepararNuevoExamen();

    document.addEventListener("click", e => {
        const sug = document.getElementById("sugerencias-examenes");
        const input = document.getElementById("busqueda-examen");
        if (sug && input && !sug.contains(e.target) && e.target !== input) sug.innerHTML = "";
    });

    window.addEventListener("online", () => setConnectionState(true));
    window.addEventListener("offline", () => setConnectionState(false));
    setConnectionState(navigator.onLine);
});

function loadJSON(key, fallback) {
    try { return JSON.parse(localStorage.getItem(key)) ?? fallback; }
    catch { return fallback; }
}

function saveJSON(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

function escapeHtml(value) {
    return String(value ?? "")
        .replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;")
        .replaceAll('"',"&quot;").replaceAll("'","&#039;");
}

function money(v) { return Number(v || 0).toFixed(2); }

function formatDate(timestamp) {
    return new Date(timestamp).toLocaleDateString("es-PE");
}

function formatTime(timestamp) {
    return new Date(timestamp).toLocaleTimeString("es-PE",{hour:"2-digit",minute:"2-digit"});
}

function todayKey() {
    const d = new Date();
    return d.toLocaleDateString("es-PE");
}

function inicializarFirebase() {
    try {
        if (typeof firebase === "undefined") return;
        const firebaseConfig = {
            databaseURL: "https://vital-health-default-rtdb.firebaseio.com"
        };
        if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);
        db = firebase.database();
        firebaseReady = true;
        setConnectionState(navigator.onLine);
    } catch (e) {
        firebaseReady = false;
        console.warn("Firebase no inicializado:", e);
    }
}

function setConnectionState(online) {
    const dot = document.getElementById("connection-dot");
    const txt = document.getElementById("connection-text");
    if (!dot || !txt) return;
    if (firebaseReady && online) {
        dot.className = "status-dot online";
        txt.textContent = "Sincronización disponible";
    } else {
        dot.className = "status-dot offline";
        txt.textContent = "Modo local";
    }
}

async function cargarProductosJSON() {
    try {
        const response = await fetch("productos.json?v=" + Date.now(), {cache:"no-store"});
        if (!response.ok) return;
        const data = await response.json();
        if (!Array.isArray(data) || !data.length) return;
        catalogoExamenes = data.map((p,i)=>({
            codigo:String(p.Codigo ?? p.codigo ?? i+1),
            nombre:String(p.Nombre ?? p.nombre ?? "").toUpperCase(),
            precio:Number(p.Precio ?? p.precio ?? 0),
            muestra:p.muestra || "Suero",
            metodo:p.metodo || "Estándar",
            plantilla:p.plantilla || "estandar",
            refTexto:p.refTexto || "",
            parametros:Array.isArray(p.parametros) ? p.parametros : []
        }));
        guardarCatalogoLocal();
    } catch(e) {
        console.info("productos.json no disponible; se conserva catálogo local.");
    }
}

function guardarCatalogoLocal() {
    saveJSON(STORAGE_CATALOGO, catalogoExamenes);
}

function escucharSincronizacion() {
    if (!db) return;
    try {
        db.ref("ordenes").on("value", snapshot => {
            const data = snapshot.val();
            if (!data) return;
            ordenesLocales = Array.isArray(data) ? data : Object.values(data);
            saveJSON(STORAGE_ORDENES, ordenesLocales);
            cargarOrdenes();
            renderizarPacientes();
            actualizarControlCaja();
            actualizarDashboard();
        });
    } catch(e) { console.warn("Sincronización no disponible.",e); }
}

function guardarEnNubeYLocal() {
    saveJSON(STORAGE_ORDENES, ordenesLocales);
    if (!db) return;
    try {
        /* Mantiene compatibilidad con tu estructura actual. 
           En producción se recomienda migrar a /ordenes/{id} con reglas de seguridad. */
        const updates = {};
        ordenesLocales.forEach(o => updates[o.id] = o);
        db.ref("ordenes").set(updates).catch(err => console.warn("Firebase:",err));
    } catch(e) { console.warn("No se pudo sincronizar:",e); }
}

function toggleSidebar() {
    document.getElementById("sidebar")?.classList.toggle("active");
    document.getElementById("sidebar-overlay")?.classList.toggle("active");
}

function showSection(id) {
    document.querySelectorAll(".section-content").forEach(s=>s.classList.add("d-none"));
    document.getElementById("sec-"+id)?.classList.remove("d-none");
    document.querySelectorAll(".sidebar .nav-link").forEach(a=>a.classList.remove("active"));
    document.querySelectorAll(".sidebar .nav-link").forEach(a=>{
        if ((a.getAttribute("onclick")||"").includes(`'${id}'`)) a.classList.add("active");
    });
    const labels={dashboard:"Dashboard",recepcion:"Recepción",pacientes:"Pacientes / Historial",ordenes:"Órdenes de Trabajo",resultados:"Resultados / Validación",catalogo:"Catálogo",caja:"Caja",reportes:"Reportes"};
    document.getElementById("breadcrumb-label").textContent=labels[id]||id;
    if (innerWidth<992) {
        document.getElementById("sidebar")?.classList.remove("active");
        document.getElementById("sidebar-overlay")?.classList.remove("active");
    }
    if(id==="dashboard") actualizarDashboard();
    if(id==="ordenes") cargarOrdenes();
    if(id==="pacientes") renderizarPacientes();
    if(id==="catalogo") renderizarTablaCatalogo();
    if(id==="caja") actualizarControlCaja();
}

function iniciarReloj() {
    const tick=()=>{
        const now=new Date();
        const d=document.getElementById("current-date"), t=document.getElementById("current-time");
        if(d)d.textContent=now.toLocaleDateString("es-PE",{weekday:"long",year:"numeric",month:"long",day:"numeric"});
        if(t)t.textContent=now.toLocaleTimeString("es-PE");
    };
    tick(); setInterval(tick,1000);
}

function calcularEdad() {
    const val=document.getElementById("pac-fnac")?.value;
    const out=document.getElementById("pac-edad");
    if(!val||!out){if(out)out.value="";return}
    const birth=new Date(val+"T00:00:00"), now=new Date();
    let age=now.getFullYear()-birth.getFullYear();
    if(now.getMonth()<birth.getMonth() || (now.getMonth()===birth.getMonth()&&now.getDate()<birth.getDate())) age--;
    out.value=`${Math.max(0,age)} AÑOS`;
}

async function buscarPaciente() {
    const dni=document.getElementById("pac-dni")?.value.trim();
    if(!dni || dni.length<8) return alert("Ingrese un documento válido.");
    const found=ordenesLocales.find(o=>o.dni===dni);
    if(found){
        setVal("pac-nombre",found.paciente);
        setVal("pac-edad",found.edad);
        setVal("pac-sexo",found.sexo||"NO ESPECIFICADO");
        setVal("pac-doctor",found.doctor==="Particular"?"":found.doctor);
        showSection("recepcion");
        return;
    }
    alert("No existe un paciente con ese documento en el historial local. Puede registrar sus datos manualmente.");
}

function setVal(id,value){const e=document.getElementById(id);if(e)e.value=value??""}

function filtrarExamenes(texto) {
    const box=document.getElementById("sugerencias-examenes");
    if(!box)return;
    box.innerHTML="";
    const q=texto.trim().toLowerCase();
    if(!q)return;
    const list=catalogoExamenes.filter(e=>
        String(e.codigo).toLowerCase().includes(q)||String(e.nombre).toLowerCase().includes(q)
    ).slice(0,20);
    if(!list.length){box.innerHTML='<div class="list-group-item text-muted">No se encontraron exámenes.</div>';return}
    list.forEach(ex=>{
        const a=document.createElement("button");
        a.type="button";a.className="list-group-item list-group-item-action";
        a.textContent=`${ex.codigo} - ${ex.nombre} | S/ ${money(ex.precio)}`;
        a.onclick=()=>{agregarExamen(ex);box.innerHTML="";setVal("busqueda-examen","")};
        box.appendChild(a);
    });
}

function agregarExamen(examen) {
    examenesSeleccionados.push({...examen});
    renderExamenes();
}

function renderExamenes() {
    const tbody=document.querySelector("#tabla-examenes-seleccionados tbody");
    const totalEl=document.getElementById("total-cobrar");
    if(!tbody)return;
    tbody.innerHTML="";
    if(!examenesSeleccionados.length){
        tbody.innerHTML='<tr><td colspan="6" class="text-center text-muted py-4">No hay exámenes agregados.</td></tr>';
        if(totalEl)totalEl.textContent="0.00";
        return;
    }
    let total=0;
    examenesSeleccionados.forEach((ex,i)=>{
        total+=Number(ex.precio||0);
        const tr=document.createElement("tr");
        tr.innerHTML=`<td><span class="badge bg-light text-dark border">${escapeHtml(ex.codigo)}</span></td>
        <td><strong>${escapeHtml(ex.nombre)}</strong></td><td>1</td><td>S/ ${money(ex.precio)}</td><td>S/ ${money(ex.precio)}</td>
        <td class="text-end"><button class="btn btn-sm btn-outline-danger" onclick="eliminarExamen(${i})"><i class="bi bi-trash"></i></button></td>`;
        tbody.appendChild(tr);
    });
    if(totalEl)totalEl.textContent=money(total);
}

function eliminarExamen(i){examenesSeleccionados.splice(i,1);renderExamenes()}

/* ================= CATÁLOGO ================= */
function renderizarTablaCatalogo(filtro=""){
    const body=document.getElementById("tabla-catalogo-body"), count=document.getElementById("total-cat-count");
    if(!body)return;
    const q=String(filtro).toLowerCase().trim();
    const list=catalogoExamenes.filter(e=>String(e.codigo).toLowerCase().includes(q)||String(e.nombre).toLowerCase().includes(q));
    body.innerHTML="";
    if(count)count.textContent=list.length;
    if(!list.length){body.innerHTML='<tr><td colspan="5" class="text-center text-muted py-4">Sin resultados.</td></tr>';return}
    list.forEach(ex=>{
        const tr=document.createElement("tr");
        tr.innerHTML=`<td><span class="badge bg-light text-dark border">${escapeHtml(ex.codigo)}</span></td>
        <td><strong>${escapeHtml(ex.nombre)}</strong></td>
        <td><small>${escapeHtml(ex.muestra||"")}</small><br><span class="badge bg-info-subtle text-info-emphasis">${escapeHtml(ex.plantilla||"estandar")}</span></td>
        <td>S/ ${money(ex.precio)}</td>
        <td class="text-end"><button class="btn btn-sm btn-outline-primary me-1" onclick="seleccionarExamenParaEditar('${escapeHtml(ex.codigo)}')"><i class="bi bi-pencil"></i></button>
        <button class="btn btn-sm btn-outline-danger" onclick="eliminarExamenCatalogo('${escapeHtml(ex.codigo)}')"><i class="bi bi-trash"></i></button></td>`;
        body.appendChild(tr);
    });
}

function seleccionarExamenParaEditar(codigo){
    const ex=catalogoExamenes.find(e=>String(e.codigo)===String(codigo)); if(ex)cargarDatosEnFormularioCatalogo(ex);
}

function cargarDatosEnFormularioCatalogo(ex){
    setVal("cat-id-original",ex.codigo);setVal("cat-codigo",ex.codigo);setVal("cat-nombre",ex.nombre);setVal("cat-precio",ex.precio);
    setVal("cat-muestra",ex.muestra);setVal("cat-metodo",ex.metodo);setVal("cat-plantilla",ex.plantilla||"estandar");setVal("cat-ref-texto",ex.refTexto);
    const c=document.getElementById("contenedor-parametros");if(!c)return;c.innerHTML="";
    (ex.parametros||[]).forEach(p=>agregarFilaParametro(p));actualizarEstadoVacioParametros();
    const t=document.getElementById("catalogo-form-titulo");if(t)t.innerHTML=`<i class="bi bi-pencil-square me-2"></i>Editando ${escapeHtml(ex.codigo)} - ${escapeHtml(ex.nombre)}`;
    const b=document.getElementById("btn-guardar-cat");if(b)b.innerHTML='<i class="bi bi-check-circle me-1"></i>Guardar cambios';
}

function agregarFilaParametro(p={}){
    const c=document.getElementById("contenedor-parametros");if(!c)return;
    c.querySelector(".no-params-msg")?.remove();
    const div=document.createElement("div");div.className="parametro-card";
    div.innerHTML=`<div class="d-flex justify-content-between mb-2"><b class="small text-primary">Parámetro</b><button type="button" class="btn btn-sm btn-link text-danger p-0" onclick="quitarFilaParametro(this)">Eliminar</button></div>
    <div class="row g-2"><div class="col-md-7"><input class="form-control form-control-sm param-nombre" placeholder="Nombre" value="${escapeHtml(p.nombre||"")}"></div>
    <div class="col-md-5"><input class="form-control form-control-sm param-unidad" placeholder="Unidad" value="${escapeHtml(p.unidad||"")}"></div>
    <div class="col-md-6"><input class="form-control form-control-sm param-ref-min" placeholder="Referencia mínima" value="${escapeHtml(p.refMin||"")}"></div>
    <div class="col-md-6"><input class="form-control form-control-sm param-ref-max" placeholder="Referencia máxima" value="${escapeHtml(p.refMax||"")}"></div>
    <div class="col-12"><input class="form-control form-control-sm param-ref-texto" placeholder="Referencia textual" value="${escapeHtml(p.refTexto||"")}"></div></div>`;
    c.appendChild(div);
}
function quitarFilaParametro(btn){btn.closest(".parametro-card")?.remove();actualizarEstadoVacioParametros()}
function vaciarTodosLosParametros(){const c=document.getElementById("contenedor-parametros");if(c)c.innerHTML="";actualizarEstadoVacioParametros()}
function actualizarEstadoVacioParametros(){
    const c=document.getElementById("contenedor-parametros");if(!c)return;
    if(!c.querySelector(".parametro-card"))c.innerHTML='<div class="no-params-msg text-center text-muted small border rounded p-3">Este examen no tiene parámetros configurados.</div>';
}
function prepararNuevoExamen(){
    document.getElementById("form-catalogo")?.reset();
    setVal("cat-id-original","");
    const next=String(Math.max(0,...catalogoExamenes.map(e=>Number(e.codigo)).filter(Number.isFinite))+1);
    setVal("cat-codigo",next);vaciarTodosLosParametros();
    const t=document.getElementById("catalogo-form-titulo");if(t)t.innerHTML='<i class="bi bi-plus-circle me-2"></i>Crear nuevo examen';
    const b=document.getElementById("btn-guardar-cat");if(b)b.innerHTML='<i class="bi bi-save me-1"></i>Registrar examen';
}
function guardarExamenCatalogo(){
    const original=document.getElementById("cat-id-original")?.value.trim()||"";
    const codigo=document.getElementById("cat-codigo")?.value.trim()||"";
    const nombre=document.getElementById("cat-nombre")?.value.trim().toUpperCase()||"";
    const precio=Number(document.getElementById("cat-precio")?.value);
    if(!codigo||!nombre||!Number.isFinite(precio)||precio<0)return alert("Complete código, nombre y precio.");
    const parametros=[...document.querySelectorAll("#contenedor-parametros .parametro-card")].map(card=>({
        nombre:card.querySelector(".param-nombre")?.value.trim()||"",
        unidad:card.querySelector(".param-unidad")?.value.trim()||"",
        refMin:card.querySelector(".param-ref-min")?.value.trim()||"",
        refMax:card.querySelector(".param-ref-max")?.value.trim()||"",
        refTexto:card.querySelector(".param-ref-texto")?.value.trim()||""
    })).filter(p=>p.nombre||p.refTexto||p.refMin||p.refMax);
    const obj={codigo,nombre,precio,muestra:document.getElementById("cat-muestra")?.value.trim()||"",metodo:document.getElementById("cat-metodo")?.value.trim()||"",plantilla:document.getElementById("cat-plantilla")?.value||"estandar",refTexto:document.getElementById("cat-ref-texto")?.value.trim()||"",parametros};
    if(original){
        const i=catalogoExamenes.findIndex(e=>String(e.codigo)===original);if(i>=0)catalogoExamenes[i]=obj;else catalogoExamenes.unshift(obj);
    }else{
        if(catalogoExamenes.some(e=>String(e.codigo)===codigo))return alert("Ya existe ese código.");
        catalogoExamenes.unshift(obj);
    }
    guardarCatalogoLocal();renderizarTablaCatalogo();seleccionarExamenParaEditar(codigo);alert("Configuración guardada.");
}
function eliminarExamenCatalogo(codigo){
    if(!confirm("¿Eliminar este examen del catálogo? Las órdenes históricas conservarán la información que ya tengan."))return;
    catalogoExamenes=catalogoExamenes.filter(e=>String(e.codigo)!==String(codigo));guardarCatalogoLocal();renderizarTablaCatalogo();prepararNuevoExamen();
}

/* ================= ORDENES ================= */
function nextOrderId(){
    const year=new Date().getFullYear();
    let seq=Number(localStorage.getItem(STORAGE_SEQ)||0);
    seq++;
    localStorage.setItem(STORAGE_SEQ,String(seq));
    return `VH-${year}-${String(seq).padStart(6,"0")}`;
}
function guardarOrdenGenerarTicket(){
    const dni=document.getElementById("pac-dni")?.value.trim()||"";
    const paciente=document.getElementById("pac-nombre")?.value.trim()||"";
    const doctor=document.getElementById("pac-doctor")?.value.trim()||"Particular";
    const edad=document.getElementById("pac-edad")?.value.trim()||"";
    const sexo=document.getElementById("pac-sexo")?.value||"NO ESPECIFICADO";
    const metodo=document.getElementById("metodo-pago")?.value||"Efectivo";
    if(!dni||!paciente||!examenesSeleccionados.length)return alert("Complete DNI, paciente y agregue al menos un examen.");
    const timestamp=Date.now(), total=examenesSeleccionados.reduce((s,e)=>s+Number(e.precio||0),0);
    const orden={id:nextOrderId(),timestamp,fecha:formatDate(timestamp),hora:formatTime(timestamp),dni,paciente,doctor,edad,sexo,examenes:examenesSeleccionados.map(e=>({...e})),total,metodoPago:metodo,estado:"PENDIENTE",resultados:{},observaciones:"",auditoria:[{accion:"CREADA",fecha:new Date().toISOString()}]};
    ordenesLocales.unshift(orden);guardarEnNubeYLocal();imprimirTicket58mm(orden);
    examenesSeleccionados=[];renderExamenes();document.getElementById("form-paciente")?.reset();
    actualizarControlCaja();actualizarDashboard();renderizarPacientes();
}
function imprimirTicket58mm(orden){
    const area=document.getElementById("ticket-print-area");if(!area)return;
    const rows=orden.examenes.map(e=>`<tr><td colspan="2">${escapeHtml(e.nombre)}</td></tr><tr><td>1 x S/ ${money(e.precio)}</td><td style="text-align:right">S/ ${money(e.precio)}</td></tr>`).join("");
    area.innerHTML=`<div style="width:58mm;font-family:Arial,sans-serif;font-size:11px;padding:4mm"><div style="text-align:center;font-weight:bold;font-size:14px">CENTRO MÉDICO VITAL HEALTH</div><div style="text-align:center">LABORATORIO CLÍNICO</div><div style="text-align:center">Av. Grau N° 1799 - Piura</div><div style="text-align:center">984 089 927</div><hr><b>ORDEN:</b> ${escapeHtml(orden.id)}<br><b>FECHA:</b> ${escapeHtml(orden.fecha)} ${escapeHtml(orden.hora)}<br><b>DNI:</b> ${escapeHtml(orden.dni)}<br><b>PACIENTE:</b> ${escapeHtml(orden.paciente)}<hr><table style="width:100%">${rows}</table><hr><b>TOTAL: S/ ${money(orden.total)}</b><br><div style="text-align:center;margin-top:10px">Gracias por su preferencia</div></div>`;
    window.print();
}
function estadoBadge(estado){
    const map={"PENDIENTE":"status-pendiente","EN PROCESO":"status-proceso","COMPLETADO":"status-completado","VALIDADO":"status-validado","ENTREGADO":"status-entregado"};
    return `<span class="badge-status ${map[estado]||"status-pendiente"}">${escapeHtml(estado)}</span>`;
}
function cargarOrdenes(filtro=""){
    const body=document.getElementById("lista-ordenes-body");if(!body)return;
    const q=(filtro||document.getElementById("filtro-ordenes")?.value||"").toLowerCase().trim();
    const estado=document.getElementById("filtro-estado")?.value||"";
    const list=ordenesLocales.filter(o=>(!estado||o.estado===estado)&&(!q||[o.id,o.dni,o.paciente].some(v=>String(v||"").toLowerCase().includes(q)))).sort((a,b)=>(b.timestamp||0)-(a.timestamp||0));
    body.innerHTML="";
    if(!list.length){body.innerHTML='<tr><td colspan="7" class="text-center text-muted py-5">No hay órdenes que coincidan.</td></tr>';return}
    list.forEach(o=>{
        const tr=document.createElement("tr");
        tr.innerHTML=`<td><strong>${escapeHtml(o.id)}</strong></td><td>${escapeHtml(o.fecha)} ${escapeHtml(o.hora)}</td><td>${escapeHtml(o.dni)}</td><td>${escapeHtml(o.paciente)}</td><td>${estadoBadge(o.estado)}</td><td>S/ ${money(o.total)}</td><td class="text-end px-3"><button class="btn btn-sm btn-primary me-1" onclick="abrirResultados('${escapeHtml(o.id)}')"><i class="bi bi-journal-medical"></i></button><button class="btn btn-sm btn-outline-secondary me-1" onclick="imprimirOrden('${escapeHtml(o.id)}')"><i class="bi bi-printer"></i></button><button class="btn btn-sm btn-outline-danger" onclick="eliminarOrden('${escapeHtml(o.id)}')"><i class="bi bi-trash"></i></button></td>`;
        body.appendChild(tr);
    });
}
function eliminarOrden(id){
    if(!confirm("¿Eliminar esta orden? Esta acción debe restringirse a usuarios autorizados en producción."))return;
    ordenesLocales=ordenesLocales.filter(o=>o.id!==id);guardarEnNubeYLocal();cargarOrdenes();renderizarPacientes();actualizarControlCaja();actualizarDashboard();
}
function imprimirOrden(id){const o=ordenesLocales.find(x=>x.id===id);if(o)imprimirTicket58mm(o)}

/* ================= RESULTADOS / VALIDACION ================= */
function abrirResultados(ordenId){
    const orden=ordenesLocales.find(o=>o.id===ordenId);if(!orden)return;
    ordenActualVisualizando=orden;showSection("resultados");
    const c=document.getElementById("resultados-editor");if(!c)return;
    let html=`<div class="validation-box mb-3"><div class="d-flex flex-wrap justify-content-between gap-2"><div><h5 class="mb-1">${escapeHtml(orden.paciente)}</h5><div class="small text-muted">DNI ${escapeHtml(orden.dni)} · ${escapeHtml(orden.edad)} · ${escapeHtml(orden.doctor||"Particular")}</div></div><div>${estadoBadge(orden.estado)}</div></div></div>`;
    orden.examenes.forEach(ex=>{
        const cat=catalogoExamenes.find(x=>String(x.codigo)===String(ex.codigo))||ex;
        const params=Array.isArray(cat.parametros)?cat.parametros:[];
        html+=`<div class="result-exam"><div class="result-exam-header"><strong>${escapeHtml(ex.nombre)}</strong><span class="badge bg-secondary">${escapeHtml(cat.plantilla||"estandar")}</span></div><div class="result-exam-body">`;
        if(cat.plantilla==="texto_libre"){
            const key=`${ex.codigo}_texto`, val=orden.resultados?.[key]?.resultado||"";
            html+=`<label class="form-label">Informe descriptivo</label><textarea id="res-val-${safeId(key)}" data-result-key="${escapeHtml(key)}" class="form-control result-input" rows="6">${escapeHtml(val)}</textarea>`;
        }else if(params.length){
            params.forEach((p,i)=>{
                const key=`${ex.codigo}_${i}`, val=orden.resultados?.[key]?.resultado||"";
                html+=`<div class="result-row"><div><b>${escapeHtml(p.nombre)}</b></div><div><input id="res-val-${safeId(key)}" data-result-key="${escapeHtml(key)}" data-ref-min="${escapeHtml(p.refMin||"")}" data-ref-max="${escapeHtml(p.refMax||"")}" class="form-control result-input result-value" value="${escapeHtml(val)}" placeholder="Resultado"></div><div class="result-ref">${p.unidad?`Unidad: ${escapeHtml(p.unidad)}<br>`:""}${p.refTexto?escapeHtml(p.refTexto):((p.refMin||p.refMax)?`Ref.: ${escapeHtml(p.refMin||"-")} - ${escapeHtml(p.refMax||"-")}`:"Sin referencia configurada")}</div></div>`;
            });
        }else html+=`<div class="text-muted small">Este examen no tiene parámetros configurados.</div>`;
        html+=`</div></div>`;
    });
    html+=`<div class="validation-box"><div class="mb-2"><label class="form-label">Observaciones del informe</label><textarea id="orden-observaciones" class="form-control" rows="3">${escapeHtml(orden.observaciones||"")}</textarea></div><div class="result-toolbar"><button class="btn btn-success" onclick="guardarResultados('COMPLETADO')"><i class="bi bi-save me-1"></i>Guardar</button><button class="btn btn-primary" onclick="guardarResultados('VALIDADO')"><i class="bi bi-shield-check me-1"></i>Guardar y validar</button><button class="btn btn-outline-primary" onclick="visualizarEImprimirResultados()"><i class="bi bi-printer me-1"></i>Informe A4</button><button class="btn btn-outline-secondary" onclick="cambiarEstadoOrden('ENTREGADO')">Marcar entregado</button></div></div>`;
    c.innerHTML=html;
    document.querySelectorAll(".result-input").forEach(i=>i.addEventListener("input",()=>marcarBandera(i)));
    document.querySelectorAll(".result-input").forEach(marcarBandera);
}
function safeId(s){return String(s).replace(/[^a-zA-Z0-9_-]/g,"_")}
function marcarBandera(input){
    input.classList.remove("flag-high","flag-low");
    const v=Number(String(input.value).replace(",","."));
    if(!Number.isFinite(v))return;
    const min=Number(input.dataset.refMin),max=Number(input.dataset.refMax);
    if(Number.isFinite(min)&&v<min)input.classList.add("flag-low");
    if(Number.isFinite(max)&&v>max)input.classList.add("flag-high");
}
function guardarResultados(nuevoEstado="COMPLETADO"){
    if(!ordenActualVisualizando)return;
    const orden=ordenActualVisualizando;
    orden.resultados=orden.resultados||{};
    document.querySelectorAll(".result-input").forEach(input=>{
        const key=input.dataset.resultKey;
        orden.resultados[key]={resultado:input.value,parametro:key};
    });
    orden.observaciones=document.getElementById("orden-observaciones")?.value||"";
    orden.estado=nuevoEstado;
    orden.auditoria=orden.auditoria||[];
    orden.auditoria.push({accion:nuevoEstado,fecha:new Date().toISOString()});
    guardarEnNubeYLocal();cargarOrdenes();actualizarDashboard();alert(nuevoEstado==="VALIDADO"?"Resultados guardados y validados.":"Resultados guardados.");
}
function cambiarEstadoOrden(estado){
    if(!ordenActualVisualizando)return;
    ordenActualVisualizando.estado=estado;ordenActualVisualizando.auditoria=ordenActualVisualizando.auditoria||[];
    ordenActualVisualizando.auditoria.push({accion:estado,fecha:new Date().toISOString()});
    guardarEnNubeYLocal();cargarOrdenes();actualizarDashboard();abrirResultados(ordenActualVisualizando.id);
}
function generarTablaEspecializada(ex,cat,orden){
    const params=Array.isArray(cat.parametros)?cat.parametros:[];
    if(cat.plantilla==="texto_libre"){
        const key=`${ex.codigo}_texto`,val=orden.resultados?.[key]?.resultado||"Sin descripción.";
        return `<div style="white-space:pre-wrap;border:1px solid #ddd;padding:10px;border-radius:6px">${escapeHtml(val)}</div>`;
    }
    if(!params.length)return `<p style="color:#64748b">Sin parámetros configurados.</p>`;
    const rows=params.map((p,i)=>{
        const key=`${ex.codigo}_${i}`,v=orden.resultados?.[key]?.resultado||"-";
        const ref=p.refTexto||((p.refMin||p.refMax)?`${p.refMin||"-"} - ${p.refMax||"-"}`:"-");
        return `<tr><td>${escapeHtml(p.nombre)}</td><td><b>${escapeHtml(v)}</b></td><td>${escapeHtml(p.unidad||"-")}</td><td>${escapeHtml(ref)}</td><td>${escapeHtml(cat.metodo||"Estándar")}</td></tr>`;
    }).join("");
    return `<table><thead><tr><th>PARÁMETRO / PRUEBA</th><th>RESULTADO</th><th>UNIDAD</th><th>VALOR REFERENCIAL</th><th>MÉTODO</th></tr></thead><tbody>${rows}</tbody></table>`;
}
function visualizarEImprimirResultados(){
    if(!ordenActualVisualizando)return;
    const o=ordenActualVisualizando;
    const blocks=o.examenes.map(ex=>{
        const cat=catalogoExamenes.find(c=>String(c.codigo)===String(ex.codigo))||ex;
        return `<section class="exam-block"><h3>${escapeHtml(ex.nombre)}</h3>${generarTablaEspecializada(ex,cat,o)}</section>`;
    }).join("");
    const w=window.open("","_blank");if(!w)return alert("El navegador bloqueó la ventana de impresión.");
    w.document.write(`<!doctype html><html><head><title>Informe ${escapeHtml(o.id)}</title><style>
    @page{size:A4;margin:12mm}body{font-family:Arial,sans-serif;color:#172033;font-size:11px}.header{border-bottom:2px solid #0072bc;padding-bottom:8px;display:flex;justify-content:space-between}.patient{border:1px solid #94a3b8;padding:10px;margin:12px 0;display:grid;grid-template-columns:1fr 1fr;gap:5px}.exam-block{page-break-inside:avoid;margin-top:16px}.exam-block h3{text-align:center;font-size:14px;margin:0 0 6px;text-transform:uppercase}table{width:100%;border-collapse:collapse}th,td{border:1px solid #cbd5e1;padding:6px}th{background:#dbeafe;color:#1e3a8a}footer{margin-top:25px;border-top:1px solid #ddd;padding-top:10px}</style></head><body>
    <div class="header"><div><b>CENTRO MÉDICO VITAL HEALTH</b><br>LABORATORIO CLÍNICO<br>Av. Grau N° 1799 - Veintiséis de Octubre</div><div>984 089 927</div></div>
    <div class="patient"><div><b>PACIENTE:</b> ${escapeHtml(o.paciente)}</div><div><b>EDAD:</b> ${escapeHtml(o.edad)}</div><div><b>DNI:</b> ${escapeHtml(o.dni)}</div><div><b>FECHA:</b> ${escapeHtml(o.fecha)}</div><div><b>ORDEN:</b> ${escapeHtml(o.id)}</div><div><b>MÉDICO:</b> ${escapeHtml(o.doctor||"Particular")}</div></div>
    ${blocks}<footer><b>Observaciones:</b><br>${escapeHtml(o.observaciones||"")}</footer><script>window.onload=()=>window.print();<\/script></body></html>`);
    w.document.close();
}

/* ================= PACIENTES ================= */
function getPacientes(){
    const map=new Map();
    ordenesLocales.forEach(o=>{
        const prev=map.get(o.dni);
        if(!prev || (o.timestamp||0)>(prev.ultima||0))map.set(o.dni,{dni:o.dni,nombre:o.paciente,sexo:o.sexo,ultima:o.timestamp,ordenes:0});
        const p=map.get(o.dni);p.ordenes++;
    });
    return [...map.values()].sort((a,b)=>(b.ultima||0)-(a.ultima||0));
}
function renderizarPacientes(filtro=""){
    const body=document.getElementById("lista-pacientes-body");if(!body)return;
    const q=(filtro||document.getElementById("filtro-pacientes")?.value||"").toLowerCase().trim();
    const list=getPacientes().filter(p=>!q||p.dni.toLowerCase().includes(q)||p.nombre.toLowerCase().includes(q));
    body.innerHTML="";
    if(!list.length){body.innerHTML='<tr><td colspan="6" class="text-center text-muted py-5">No hay pacientes.</td></tr>';return}
    list.forEach(p=>{
        const tr=document.createElement("tr");
        tr.innerHTML=`<td>${escapeHtml(p.dni)}</td><td><strong>${escapeHtml(p.nombre)}</strong></td><td>${escapeHtml(p.sexo||"-")}</td><td>${escapeHtml(formatDate(p.ultima))}</td><td>${p.ordenes}</td><td class="text-end"><button class="btn btn-sm btn-outline-primary" onclick="verHistorialPaciente('${escapeHtml(p.dni)}')"><i class="bi bi-clock-history me-1"></i>Historial</button></td>`;
        body.appendChild(tr);
    });
}
function verHistorialPaciente(dni){
    const rows=ordenesLocales.filter(o=>o.dni===dni).sort((a,b)=>(b.timestamp||0)-(a.timestamp||0));
    if(!rows.length)return;
    const o=rows[0];
    setVal("pac-dni",o.dni);setVal("pac-nombre",o.paciente);setVal("pac-edad",o.edad);setVal("pac-sexo",o.sexo);setVal("pac-doctor",o.doctor);
    showSection("recepcion");
    alert(`Paciente: ${o.paciente}\nÓrdenes registradas: ${rows.length}\nÚltima atención: ${o.fecha} ${o.hora}`);
}

/* ================= CAJA / DASHBOARD ================= */
function actualizarControlCaja(){
    const hoy=ordenesLocales.filter(o=>o.fecha===todayKey());
    let total=0,ef=0,digital=0;
    const body=document.getElementById("caja-tabla-body");if(body)body.innerHTML="";
    hoy.forEach(o=>{
        total+=Number(o.total||0);
        if(o.metodoPago==="Efectivo")ef+=Number(o.total||0);else digital+=Number(o.total||0);
        if(body){const tr=document.createElement("tr");tr.innerHTML=`<td>${escapeHtml(o.hora||"")}</td><td><b>${escapeHtml(o.id)}</b></td><td>${escapeHtml(o.paciente)}</td><td>${escapeHtml(o.metodoPago)}</td><td>S/ ${money(o.total)}</td>`;body.appendChild(tr)}
    });
    setText("caja-total-hoy",money(total));setText("caja-efectivo",money(ef));setText("caja-digital",money(digital));
}
function actualizarDashboard(){
    const hoy=ordenesLocales.filter(o=>o.fecha===todayKey());
    setText("dash-ordenes",hoy.length);
    setText("dash-pendientes",hoy.filter(o=>o.estado==="PENDIENTE"||o.estado==="EN PROCESO").length);
    setText("dash-validados",hoy.filter(o=>o.estado==="VALIDADO"||o.estado==="ENTREGADO").length);
    setText("dash-ingresos",money(hoy.reduce((s,o)=>s+Number(o.total||0),0)));
}
function setText(id,value){const e=document.getElementById(id);if(e)e.textContent=value}

/* ================= EXPORTACION ================= */
function downloadText(filename,text,type){
    const blob=new Blob([text],{type}),url=URL.createObjectURL(blob),a=document.createElement("a");
    a.href=url;a.download=filename;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);
}
function exportarOrdenesCSV(){
    const headers=["Orden","Fecha","Hora","DNI","Paciente","Doctor","Estado","Método de pago","Total"];
    const rows=ordenesLocales.map(o=>[o.id,o.fecha,o.hora,o.dni,o.paciente,o.doctor,o.estado,o.metodoPago,o.total]);
    const csv=[headers,...rows].map(r=>r.map(v=>`"${String(v??"").replaceAll('"','""')}"`).join(",")).join("\n");
    downloadText("vitalhealth_ordenes.csv","\uFEFF"+csv,"text/csv;charset=utf-8");
}
function exportarRespaldoJSON(){
    const data={version:2,fecha:new Date().toISOString(),catalogo:catalogoExamenes,ordenes:ordenesLocales};
    downloadText("vitalhealth_respaldo.json",JSON.stringify(data,null,2),"application/json");
}
