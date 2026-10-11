// ==========================================
// DICCIONARIOS Y BASE DE DATOS INICIAL
// ==========================================
const BASE_VALORES_REFERENCIALES = {
  "HEMOGRAMA COMPLETO AUTOMATIZADO": [
  // --- SERIE ROJA Y BLANCA PRINCIPAL ---
  { id: 'leucocitos', nombre: 'Leucocitos', valor: '', unidad: 'Cél/uL', refMin: 4500.00, refMax: 10000.00, referencia: 'Adultos: 4,500 - 10,000 | Niños: 5,000 - 13,500 | Neonatos: 9,000 - 30,000', metodo: 'Citometría de flujo o impedancia eléctrica (Método Coulter)' },
  { id: 'hematies', nombre: 'Glóbulos Rojos (hematíes)', valor: '', unidad: 'Cél/uL', refMin: 4000000.00, refMax: 5400000.00, referencia: 'Hombres: 4.5 - 5.9 | Mujeres: 4.0 - 5.2 | Niños: 3.8 - 5.0' },
  { id: 'hemoglobina', nombre: 'Hemoglobina', valor: '', unidad: 'g/dL', refMin: 12.00, refMax: 17.50, referencia: 'Hombres: 13.5 - 17.5 | Mujeres: 12.0 - 15.5 | Niños: 11.5 - 15.0' },
  { id: 'hematocrito', nombre: 'Hematocrito', valor: '', unidad: '%', refMin: 36.00, refMax: 50.00, referencia: 'Hombres: 41.0 - 50.0 | Mujeres: 36.0 - 45.0 | Niños: 35.0 - 44.0' },
  { id: 'vcm', nombre: 'Volumen Corpuscular medio VCM', valor: '', unidad: 'fL', refMin: 77.00, refMax: 95.00, referencia: '77.00 - 95.00' },
  { id: 'hcm', nombre: 'Hemoglobina Corpuscular media - HCM', valor: '', unidad: 'pg', refMin: 25.00, refMax: 33.00, referencia: '25.00 - 33.00' },
  { id: 'chcm', nombre: 'Concentración de Hemoglobina Corpuscular media - CHCM', valor: '', unidad: 'g/dL', refMin: 30.00, refMax: 36.00, referencia: '30.00 - 36.00' },
  { id: 'plaquetas', nombre: 'Recuento Plaquetario', valor: '', unidad: 'Cél/uL', refMin: 150000.00, refMax: 475000.00, referencia: '150,000 - 475,000' },
  { id: 'rdw_sd', nombre: 'RDW-SD', valor: '', unidad: 'fL', refMin: 37.00, refMax: 54.00, referencia: '37.00 - 54.00' },
  { id: 'rdw_cv', nombre: 'RDW-CV', valor: '', unidad: '%', refMin: 11.50, refMax: 15.60, referencia: '11.50 - 15.60' },
  { id: 'vpm', nombre: 'Vol. plaquetario medio - VPM', valor: '', unidad: 'fL', refMin: 7.60, refMax: 10.80, referencia: '7.60 - 10.80' },

  // --- SECCIÓN: RECUENTO DIFERENCIAL PORCENTUAL ---
  { nombre: "Recuento Diferencial Porcentual", esSeccion: true },
  { id: 'neutrofilos_seg', nombre: 'Neutrófilos Segmentados', valor: '', unidad: '%', refMin: 31.00, refMax: 51.00, referencia: '31.00 - 51.00' },
  { id: 'neutrofilos_aba', nombre: 'Neutrófilos Abastonados', valor: '', unidad: '%', refMin: 0.00, refMax: 5.00, referencia: '0.00 - 5.00' },
  { id: 'linfocitos', nombre: 'Linfocitos', valor: '', unidad: '%', refMin: 20.00, refMax: 45.00, referencia: '20.00 - 45.00' },
  { id: 'monocitos', nombre: 'Monocitos', valor: '', unidad: '%', refMin: 0.00, refMax: 10.00, referencia: '0.00 - 10.00' },
  { id: 'eosinofilos', nombre: 'Eosinófilos', valor: '', unidad: '%', refMin: 0.00, refMax: 2.50, referencia: '0.00 - 2.50' },
  { id: 'basofilos', nombre: 'Basófilo', valor: '', unidad: '%', refMin: 0.00, refMax: 2.00, referencia: '0.00 - 2.00' },
  { id: 'metamielocitos', nombre: 'Metamielocitos', valor: '', unidad: '%', refMin: 0, refMax: 0, referencia: '0 - 0' },
  { id: 'mielocitos', nombre: 'Mielocitos', valor: '', unidad: '%', refMin: 0, refMax: 0, referencia: '0 - 0' },
  { id: 'promielocitos', nombre: 'Promielocitos', valor: '', unidad: '%', refMin: 0, refMax: 0, referencia: '0 - 0' },
  { id: 'blastos', nombre: 'Blastos', valor: '', unidad: '%', refMin: 0, refMax: 0, referencia: '0 - 0' },
  { id: 'suma_diferencial', nombre: 'Suma de recuento diferencial', valor: '100.00', unidad: '%', refMin: '', refMax: '', referencia: '100.00' },

  // --- SECCIÓN: RECUENTO DIFERENCIAL ABSOLUTO ---
  { nombre: "Recuento Diferencial Absoluto", esSeccion: true },
  { id: 'seg_absoluto', nombre: 'Segmentados', valor: '', unidad: 'Cél/uL', refMin: 1200.00, refMax: 5500.00, referencia: '1200.00 - 5500.00' }
],
  "GLUCOSA BASAL": [
  { id: 'glucosa', nombre: 'GLUCOSA BASAL', valor: '', unidad: 'mg/dL', refMin: 74, refMax: 106, referencia: 'Adultos: 74 - 106 | Niños: 60 - 100 | Neonatos: 50 - 80', metodo: 'Colorimétrico Enzimático o Espectrofotometría EC 9200' }
],
  "ACIDO URICO": [
  { id: 'acido_urico', nombre: 'ACIDO URICO', valor: '', unidad: 'mg/dL', refMin: 2.40, refMax: 7.00, referencia: 'Hombres: 3.40 - 7.00 | Mujeres: 2.40 - 5.70 | Niños: 2.00 - 5.50', metodo: 'Colorimétrico Enzimático o Espectrofotometría EC 9200' }
],
 "UREA": [
  { id: 'urea', nombre: 'UREA', valor: '', unidad: 'mg/dL', refMin: 10.00, refMax: 50.00, referencia: 'Adultos: 15.00 - 45.00 | Niños: 10.00 - 40.00', metodo: 'Colorimétrico enzimático o Espectrofotometría EC9200' }
],
  "CREATININA SERICA": [
  { id: 'creatinina_serica', nombre: 'CREATININA SERICA', valor: '', unidad: 'mg/dL', refMin: 0.6, refMax: 1.3, referencia: 'Hombres: 0.70 - 1.30 | Mujeres: 0.60 - 1.10 | Niños: 0.30 - 0.70', metodo: 'Colorimétrico enzimático o Espectrofotometría EC9200' }
],
  "T4 LIBRE": [
  { id: 't4_libre', nombre: 'T4 LIBRE', valor: '', unidad: 'ng/dL', refMin: 0.90, refMax: 1.70, referencia: 'Adultos: 0.90 - 1.70 | Niños: 0.65 - 1.75 | Neonatos: 0.83 - 3.09', metodo: 'Ensayo de electroquimioluminiscencia (ECLIA)' }
],
  "TSH ULTRASENSIBLE": [
  { id: 'tsh_ultrasensible', nombre: 'TSH ULTRASENSIBLE', valor: '', unidad: 'uUI / mL', refMin: 0.27, refMax: 4.2, referencia: 'Adultos: 0.27 - 4.20 | Niños: 0.54 - 4.50 | Neonatos: 0.43 - 16.0', metodo: 'Ensayo de electroquimioluminiscencia (ECLIA)' }
],
  "VIH 1-2 (AC - AG 3º/4º Generación)-VIH": [
  { id: 'vih', nombre: 'VIH 1-2 (AC - AG 3º/4º Generación)-VIH', valor: '', unidad: 'S/U', refMin: '', refMax: '', referencia: 'No Reactivo (-)', metodo: 'Inmunocromatografía' }
],
  "HEPATITIS B CORE ANITCUERPOS IGM": [
  { id: 'hep_b', nombre: 'HEPATITIS B CORE ANITCUERPOS IGM', valor: '', unidad: 'S/U', refMin: '', refMax: '', referencia: 'No Reactivo (-)', metodo: 'Inmunocromatografía' }
],
  "PARASITOLOGICO SERIADO 3 MUESTRAS": [
    // Primera Sección
    { nombre: "Física", esSeccion: true },
    { id: 'color', nombre: 'Color', referencia: '-' },
    { id: 'consistencia', nombre: 'Consistencia', referencia: '-' },
    { id: 'sangre_macro', nombre: 'Sangre Macro', referencia: '-' },
    { id: 'moco', nombre: 'Moco', referencia: '-' },
    
    // Segunda Sección
    { nombre: "Microscópico", esSeccion: true },
    { id: 'leucocitos', nombre: 'Leucocitos', referencia: '-' },
    { id: 'eritrocitos', nombre: 'Eritrocitos', referencia: '-' },
    { id: 'cristales', nombre: 'Cristales', referencia: '-' },
    { id: 'levaduras', nombre: 'Levaduras', referencia: '-' },
    { id: 'trofozoitos', nombre: 'Trofozoitos', referencia: '-' },
    { id: 'otros', nombre: 'Otros', referencia: '-' },
    
    // Muestras finales
    { nombre: "Muestras", esSeccion: true },
    { id: 'muestra_1', nombre: 'MUESTRA I', referencia: '' },
    { id: 'muestra_2', nombre: 'MUESTRA II', referencia: '' },
    { id: 'muestra_3', nombre: 'MUESTRA III', referencia: '' }
  ],
  
  // ============ EXTENDIDA: PERFIL LIPIDICO (se agrega VLDL del PDF) ============
"PERFIL LIPIDICO": [
  { id: 'col_tot', nombre: 'Colesterol Total', valor: '', unidad: 'mg/dL', refMin: 0, refMax: 200, referencia: 'Deseable: < 200 | Moderadamente alto: 200 - 239 | Elevado: >= 240' },
  { id: 'hdl', nombre: 'HDL - Colesterol', valor: '', unidad: 'mg/dL', refMin: 40, refMax: 60, referencia: 'Hombres: > 40.00 | Mujeres: > 50.00' },
  { id: 'ldl', nombre: 'LDL - Colesterol', valor: '', unidad: 'mg/dL', refMin: 0, refMax: 129, referencia: 'Óptimo: < 100 | Riesgo moderado: 100 - 129 | Riesgo alto: >= 130' },
  { id: 'vldl', nombre: 'VLDL - Colesterol', valor: '', unidad: 'mg/dL', refMin: 2, refMax: 30, referencia: '2.00 - 30.00' },
  { id: 'trig', nombre: 'Triglicéridos', valor: '', unidad: 'mg/dL', refMin: 0, refMax: 150, referencia: 'Normal: < 150 | Límite: 150 - 199 | Elevado: >= 200' }
],

// ============ EXTENDIDA: PERFIL HEPATICO (completa según PDF, 10 parámetros) ============
"PERFIL HEPATICO": [
  { id: 'bt', nombre: 'Bilirrubina Total', valor: '', unidad: 'mg/dL', refMin: 0.0, refMax: 1.2, referencia: 'Adultos: 0.20 - 1.20 | Neonatos: hasta 12.00' },
  { id: 'bd', nombre: 'Bilirrubina Directa', valor: '', unidad: 'mg/dL', refMin: 0.0, refMax: 0.3, referencia: '0.00 - 0.30' },
  { id: 'bi', nombre: 'Bilirrubina Indirecta', valor: '', unidad: 'mg/dL', refMin: 0.0, refMax: 0.8, referencia: '0.00 - 0.80' },
  { id: 'pt', nombre: 'Proteínas Totales', valor: '', unidad: 'g/dL', refMin: 6.10, refMax: 7.90, referencia: '6.10 - 7.90' },
  { id: 'alb', nombre: 'Albúmina', valor: '', unidad: 'g/dL', refMin: 3.50, refMax: 4.80, referencia: '3.50 - 4.80' },
  { id: 'glob', nombre: 'Globulinas', valor: '', unidad: 'g/dL', refMin: 2.00, refMax: 3.50, referencia: '2.00 - 3.50' },
  { id: 'tgo', nombre: 'TGO (ASAT)', valor: '', unidad: 'U/L', refMin: 0, refMax: 38, referencia: 'Hombres: <= 38.00 | Mujeres: <= 32.00 | Niños: <= 40.00' },
  { id: 'tgp', nombre: 'TGP (ALAT)', valor: '', unidad: 'U/L', refMin: 0, refMax: 41, referencia: 'Hombres: <= 41.00 | Mujeres: <= 31.00 | Niños: <= 35.00' },
  { id: 'fal', nombre: 'Fosfatasa Alcalina (ALP)', valor: '', unidad: 'U/L', refMin: 40, refMax: 300, referencia: 'Adultos: 40.0 - 150.0 | Niños y adolescentes: < 645.0' },
  { id: 'ggt', nombre: 'Gamma Glutamil Transpeptidasa (GGT)', valor: '', unidad: 'U/L', refMin: 5, refMax: 40, referencia: 'Hombres: 11.00 - 50.00 | Mujeres: 7.00 - 32.00' }
],

// ============ OTRAS PLANTILLAS CLÍNICAS ============
"HEMOGLOBINA GLICOSILADA": [
  { id: 'hba1c', nombre: 'Hemoglobina Glicosilada (HbA1c)', valor: '', unidad: '%', refMin:'', refMax:'', referencia: 'Normal: Menos del 5.7% | Prediabetes: 5.7 - 6.4% | Diabetes: 6.5% a más' }
],

"EXAMEN COMPLETO DE ORINA": [
  { nombre: "Física", esSeccion: true },
  { id: 'color', nombre: 'Color', valor: '', referencia: 'Translúcido - Amarillo' },
  { id: 'aspecto', nombre: 'Aspecto', valor: '', referencia: 'Ligeramente Turbio' },
  { nombre: "Química", esSeccion: true },
  { id: 'sangre', nombre: 'Sangre', valor: '', unidad: 'mg/dL', referencia: 'Negativo' },
  { id: 'urobilinogeno', nombre: 'Urobilinógeno', valor: '', referencia: 'Normal' },
  { id: 'bilirrubinas', nombre: 'Bilirrubinas', valor: '', referencia: 'Negativo' },
  { id: 'proteinas', nombre: 'Proteínas', valor: '', unidad: 'mg/dL', referencia: 'Negativo' },
  { id: 'nitritos', nombre: 'Nitritos', valor: '', referencia: 'Negativo' },
  { id: 'cetonas', nombre: 'Cetonas', valor: '', unidad: 'mg/dL', referencia: 'Negativo' },
  { id: 'acido_ascorbico', nombre: 'Ácido Ascórbico', valor: '', unidad: 'mmol/L', referencia: 'Negativo' },
  { id: 'glucosa', nombre: 'Glucosa', valor: '', unidad: 'mg/dL', referencia: 'Negativo - Normal' },
  { id: 'ph', nombre: 'pH', valor: '', referencia: '5.0 - 8.0' },
  { id: 'densidad', nombre: 'Densidad', valor: '', referencia: '1.005 - 1.030' },
  { id: 'leucocitos_q', nombre: 'Leucocitos', valor: '', referencia: 'Negativo' },
  { nombre: "Microscópico", esSeccion: true },
  { id: 'cel_epiteliales', nombre: 'Células epiteliales', unidad: 'cél/campo' },
  { id: 'leucocitos_m', nombre: 'Leucocitos', valor: '', unidad: 'cél/campo' },
  { id: 'hematies', nombre: 'Hematíes', valor: '', unidad: 'cél/campo' },
  { id: 'piocitos', nombre: 'Piocitos', valor: '', unidad: 'cél/campo' },
  { id: 'cristales', nombre: 'Cristales', valor: '', unidad: 'cr/campo' },
  { id: 'filamento_mucoide', nombre: 'Filamento Mucoide', valor: '', unidad: 'fm/campo' },
  { id: 'bacterias', nombre: 'Bacterias', valor: '', unidad: 'cél/campo' },
  { id: 'levaduras', nombre: 'Levaduras', valor: '', unidad: 'cél/campo' },
  { id: 'otros', nombre: 'Otros', valor: '', unidad: '/campo', referencia: 'Negativo' }
],

"REACCION INFLAMATORIA EN HECES": [
  { nombre: "Física", esSeccion: true },
  { id: 'color', nombre: 'Color', valor: '', referencia: 'Pardo' },
  { id: 'olor', nombre: 'Olor', valor: '', referencia: 'Fétida' },
  { id: 'consistencia', nombre: 'Consistencia', valor: '', referencia: '-' },
  { id: 'sangre_macro', nombre: 'Sangre Macro', valor: '', referencia: 'No se observa' },
  { id: 'moco', nombre: 'Moco', valor: '', referencia: 'Negativo' },
  { nombre: "Microscópico", valor: '', esSeccion: true },
  { id: 'pmn', nombre: 'Leucocitos Polimorfonucleares', valor: '', referencia: 'NEGATIVO' }
],

"UROCULTIVO Y ANTIBIOGRAMA": [
  { nombre: "Física", esSeccion: true },
  { id: 'color', nombre: 'Color', valor: '', referencia: 'Amarillo' },
  { id: 'aspecto', nombre: 'Aspecto', valor: '', referencia: 'Transparente - Ligeramente Turbio' },
  { nombre: "Microscópico", esSeccion: true },
  { id: 'cel_epiteliales', nombre: 'Células epiteliales', valor: '', unidad: 'cél/campo', referencia: '0 - 6' },
  { id: 'leucocitos', nombre: 'Leucocitos', valor: '', unidad: 'cél/campo', referencia: '0 - 5' },
  { id: 'hematies', nombre: 'Hematíes', valor: '', unidad: 'cél/campo', referencia: '0 - 2' },
  { id: 'piocitos', nombre: 'Piocitos', valor: '', unidad: 'cél/campo', referencia: 'No se observan' },
  { id: 'levaduras', nombre: 'Levaduras', valor: '', unidad: 'cr/campo', referencia: 'No se observan' },
  { id: 'germenes', nombre: 'Gérmenes', valor: '', unidad: 'fm/campo', referencia: 'Escasos' },
  { id: 'recuento', nombre: 'Recuento Bacteriano', valor: '', unidad: 'UFC/ml', refMin: 0, refMax: 1000, referencia: 'Negativo: < 1000 (10³) UFC/ml | Positivo: > 100000 (10⁵) UFC/ml' },
  { id: 'microorganismo', nombre: 'Microorganismo aislado', valor: '', referencia: 'No se observó crecimiento a las 48 horas de incubación' }
],

"INDICE DE PSA": [
  { nombre: "Suero", esSeccion: true },
  { id: 'psa_libre', nombre: 'PSA Libre', valor: '', unidad: 'ng/mL', refMin: 0.00, refMax: 0.40, referencia: '0.00 - 0.40' },
  { id: 'psa_total', nombre: 'PSA Total', valor: '', unidad: 'ng/mL', refMin: 0.00, refMax: 4.10, referencia: '0.00 - 4.10' }
],

"PROTEINA C REACTIVA": [
  { id: 'pcr', nombre: 'Proteína C Reactiva - Cuantitativa', valor: '', unidad: 'mg/dL', refMin: 0, refMax: 10, referencia: 'Normal: Menor 10 | Leve a Moderado: 10.0 - 40.0 | Moderado a Severo: 40.0 - 200.0 | Severo: > 200.0' }
],

"VELOCIDAD DE SEDIMENTACION GLOBULAR": [
  { nombre: "Sangre", esSeccion: true },
  { id: 'vsg', nombre: '(VSG) Velocidad de Sedimentación Globular', valor: '', unidad: 'mm/h', refMin: 0, refMax: 30, referencia: '0 - 30 mm/h' }
],

"DENGUE IGG / IGM": [
  { id: 'igg', nombre: 'Banda IgG', valor: '', unidad: 'S/U', referencia: 'No Reactivo' },
  { id: 'igm', nombre: 'Banda IgM', valor: '', unidad: 'S/U', referencia: 'No Reactivo' }
]
};

let examenesCatalogo = [
  { codigo: "593", nombre: "HEMOGRAMA COMPLETO AUTOMATIZADO", unidad: "", refMin: "", refMax: "", referencia: "Leucocitos: 4500-10000 | Hb: H 13.5-17.5, M 12.0-15.5", precio: 25.00 },
  { codigo: "864", nombre: "PERFIL HEPATICO", unidad: "", refMin: "", refMax: "", referencia: "Bilirrubinas, Transaminasas, Fosfatasa", precio: 85.00 },
  { codigo: "869", nombre: "PERFIL LIPIDICO", unidad: "", refMin: "", refMax: "", referencia: "Colesterol, HDL, LDL, VLDL, Triglicéridos", precio: 50.00 },
  { codigo: "840", nombre: "PARASITOLOGICO SERIADO 3 MUESTRAS", unidad: "", refMin: "", refMax: "", referencia: "Física, Microscópico, Muestras", precio: 30.00 },
  { codigo: "548", nombre: "GLUCOSA BASAL", unidad: "mg/dL", refMin: 74, refMax: 106, referencia: "Adultos: 74 - 106 | Niños: 60 - 100 | Neonatos: 50 - 80", precio: 15.00 },
  { codigo: "351", nombre: "CREATININA SERICA", unidad: "mg/dL", refMin: 0.6, refMax: 1.3, referencia: "Hombres: 0.70 - 1.30 | Mujeres: 0.60 - 1.10 | Niños: 0.30 - 0.70", precio: 15.00 },
  { codigo: "1112", nombre: "UREA", unidad: "mg/dL", refMin: 10, refMax: 50, referencia: "Adultos: 15.00 - 45.00 | Niños: 10.00 - 40.00", precio: 15.00 },
  { codigo: "34", nombre: "ACIDO URICO", unidad: "mg/dL", refMin: 1.1, refMax: 5.4, referencia: "Hombres: 3.40 - 7.00 | Mujeres: 2.40 - 5.70 | Niños: 2.00 - 5.50", precio: 15.00 },
  { codigo: "459", nombre: "EXAMEN COMPLETO DE ORINA", unidad: "", refMin: "", refMax: "", referencia: "Física, Química, Microscópico", precio: 15.00 },
  { codigo: "1050", nombre: "UROCULTIVO Y ANTIBIOGRAMA", unidad: "", refMin: "", refMax: "", referencia: "Física, Microscópico, Cultivo y Antibiograma", precio: 35.00 }
];

// ==========================================
// ESTADO GLOBAL EN MEMORIA
// ==========================================
let examenesSeleccionados = [];          // Carrito de Recepción / Admisión
let listaCotizacionInd = [];             // Carrito del módulo de Cotización
let currentCotizacionId = null;          // Id de la cotización que se está editando

let ordenesRegistradas = JSON.parse(localStorage.getItem("vital_ordenes") || "[]");
let cajaMovimientos = JSON.parse(localStorage.getItem("vital_caja") || "[]");
window.pacientesRegistrados = JSON.parse(localStorage.getItem("vital_pacientes") || "[]");
window.cotizacionesGuardadas = JSON.parse(localStorage.getItem("vital_cotizaciones") || "[]");

// ==========================================
// CLAVES CANÓNICAS DE ALMACENAMIENTO
// ==========================================
const KEY_ORDENES = "vital_ordenes";
const KEY_CAJA = "vital_caja";
const KEY_CATALOGO = "vital_catalogo";
const KEY_PACIENTES = "vital_pacientes";
const KEY_COTIZACIONES = "vital_cotizaciones";
const KEY_PACIENTES_ELIMINADOS = "vital_pacientes_eliminados";

// ==========================================
// UTILIDADES GENERALES
// ==========================================
function val(id) {
    const el = document.getElementById(id);
    return el ? String(el.value || "").trim() : "";
}
function setVal(id, valor) {
    const el = document.getElementById(id);
    if (el) el.value = valor == null ? "" : valor;
}
function leerJSON(clave, porDefecto) {
    try {
        const raw = localStorage.getItem(clave);
        if (!raw) return porDefecto;
        const v = JSON.parse(raw);
        return (v == null) ? porDefecto : v;
    } catch (e) {
        return porDefecto;
    }
}
function mergePorClave(lista, claveFn) {
    const map = new Map();
    (lista || []).forEach(it => {
        if (!it || typeof it !== "object") return;
        const k = claveFn(it);
        const key = (k == null || k === "") ? "__sincave_" + Math.random().toString(36).slice(2) : String(k);
        if (!map.has(key)) map.set(key, it);
    });
    return Array.from(map.values());
}
function escapeHTML(valor) {
    return String(valor ?? "").replace(/[&<>"']/g, c => ({
        "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
    }[c]));
}
function formatoRango(refMin, refMax) {
    const tieneMin = refMin !== "" && refMin !== null && refMin !== undefined;
    const tieneMax = refMax !== "" && refMax !== null && refMax !== undefined;
    if (tieneMin && tieneMax) return `${refMin} - ${refMax}`;
    if (tieneMax) return `< ${refMax}`;
    if (tieneMin) return `> ${refMin}`;
    return "";
}
function numeroTexto(v) {
    return parseFloat(String(v ?? "0").replace("S/", "").replace(",", "").trim()) || 0;
}

// ==========================================
// NORMALIZACIÓN DE PACIENTES Y COTIZACIONES
// ==========================================
function normalizarPaciente(p) {
    p = p || {};
    return {
        id: p.id || ("pac_" + (p.dni || p.documento || Date.now())),
        dni: String(p.dni || p.documento || ""),
        nombre: p.nombre || p.nombres || p.name || "",
        celular: p.celular || p.telefono || p.cell || "",
        fnac: p.fnac || p.fechaNacimiento || p.fecha_nacimiento || "",
        edad: p.edad || "",
        sexo: p.sexo || "MASCULINO",
        ultimaAtencion: p.ultimaAtencion || p.fechaRegistro || ""
    };
}
function normalizarExamenCot(ex) {
    ex = ex || {};
    const precio = numeroTexto(ex.precioUnit != null ? ex.precioUnit : ex.precio);
    const cantidad = parseFloat(ex.cantidad) || 1;
    return {
        codigo: ex.codigo || "",
        nombre: ex.nombre || "",
        cantidad,
        precio,
        importe: cantidad * precio
    };
}
function estandarizarCotizacion(c) {
    c = c || {};
    const p = c.paciente || {};
    let id = c.id != null ? String(c.id) : (c.nroCotizacion ? String(c.nroCotizacion) : "cot_" + Date.now() + "_" + Math.floor(Math.random() * 1000));
    const examenes = (c.examenes || []).map(normalizarExamenCot);
    const total = c.total != null ? numeroTexto(c.total) : examenes.reduce((a, e) => a + e.importe, 0);
    return {
        id,
        nroCotizacion: c.nroCotizacion || ("COT-" + id.replace(/\D/g, "").slice(-4) || "0001"),
        fechaHora: c.fechaHora || new Date().toLocaleString(),
        convenio: c.convenio || c.tipoConvenio || "Particular",
        paciente: {
            dni: String(p.dni || c.dni || ""),
            nombres: p.nombres || c.nombre || c.nombres || "",
            medico: p.medico || c.doctor || c.medico || "",
            fechaNacimiento: p.fechaNacimiento || c.fechaNacimiento || "",
            edad: p.edad || c.edad || "",
            celular: p.celular || c.celular || "",
            sexo: p.sexo || c.sexo || "MASCULINO"
        },
        examenes,
        total
    };
}
function normalizarCotizacion(c) {
    const s = estandarizarCotizacion(c);
    return {
        id: s.id,
        nroCotizacion: s.nroCotizacion,
        fechaHora: s.fechaHora,
        convenio: s.convenio,
        dni: s.paciente.dni,
        nombre: s.paciente.nombres,
        doctor: s.paciente.medico,
        fechaNacimiento: s.paciente.fechaNacimiento,
        edad: s.paciente.edad,
        celular: s.paciente.celular,
        sexo: s.paciente.sexo,
        examenes: s.examenes,
        total: s.total
    };
}

// ==========================================
// PERSISTENCIA AUTOMÁTICA
// ==========================================
function persistirDatos() {
    try {
        localStorage.setItem(KEY_ORDENES, JSON.stringify(ordenesRegistradas || []));
        localStorage.setItem(KEY_CAJA, JSON.stringify(cajaMovimientos || []));
        localStorage.setItem(KEY_CATALOGO, JSON.stringify(examenesCatalogo || []));
        localStorage.setItem(KEY_PACIENTES, JSON.stringify(window.pacientesRegistrados || []));
        localStorage.setItem(KEY_COTIZACIONES, JSON.stringify(window.cotizacionesGuardadas || []));
        localStorage.setItem(KEY_PACIENTES_ELIMINADOS, JSON.stringify(window.pacientesEliminados || []));
    } catch (error) {
        console.error("No se pudo guardar la información:", error);
    }
}

function cargarDatosGuardados() {
    window.ordenesEliminadas = leerJSON("vital_ordenes_eliminadas", []);
    window.cajaEliminados = leerJSON("vital_caja_eliminados", []);
    window.cotizacionesEliminadas = leerJSON("vital_cotizaciones_eliminadas", []);
    window.examenesEliminados = leerJSON("vital_examenes_eliminados", []);

    let ordenes = leerJSON("vital_ordenes", []).concat(leerJSON("vital_health_ordenes", []));
    let ordenesFusionadas = mergePorClave(ordenes, o => o.nroOrden || o.id);
    ordenesRegistradas = ordenesFusionadas.filter(o => !window.ordenesEliminadas.includes(String(o.nroOrden)));
    ordenesRegistradas.sort((a, b) => (b.en || 0) - (a.en || 0));

    let caja = cajaMovimientos.concat(leerJSON("vital_caja", []));
    cajaMovimientos = mergePorClave(caja, m => m.id);
    cajaMovimientos.sort((a, b) => (b.en || 0) - (a.en || 0));

    let cat = examenesCatalogo.concat(leerJSON("vital_catalogo", [])).concat(leerJSON("examenesCatalogo", []));
    let catFusionado = mergePorClave(cat, c => c.codigo);
    examenesCatalogo = catFusionado.filter(e => !window.examenesEliminados.includes(String(e.codigo)));

    window.pacientesEliminados = leerJSON(KEY_PACIENTES_ELIMINADOS, []).map(d => String(d).trim()).filter(Boolean);
    let pac = (window.pacientesRegistrados || []).concat(leerJSON("vital_pacientes", [])).concat(leerJSON("vital_health_pacientes", []));
    pac = pac.map(normalizarPaciente).filter(p => (p.dni || p.nombre) && !pacienteEliminado(p.dni));
    window.pacientesRegistrados = mergePorClave(pac, p => p.dni || p.id);

    let cot = (window.cotizacionesGuardadas || []).concat(leerJSON("vital_cotizaciones", []));
    cot = cot.map(estandarizarCotizacion);
    window.cotizacionesGuardadas = mergePorClave(cot, c => c.id);
}

function pacienteEliminado(dni) {
    const d = String(dni || "").trim();
    return !!d && (window.pacientesEliminados || []).indexOf(d) !== -1;
}
function marcarPacienteEliminado(dni) {
    const d = String(dni || "").trim();
    if (!d) return;
    if (!window.pacientesEliminados) window.pacientesEliminados = [];
    if (window.pacientesEliminados.indexOf(d) === -1) window.pacientesEliminados.push(d);
}
function desmarcarPacienteEliminado(dni) {
    const d = String(dni || "").trim();
    if (!d || !window.pacientesEliminados) return;
    window.pacientesEliminados = window.pacientesEliminados.filter(x => String(x) !== d);
}

function upsertPaciente(datos) {
    datos = datos || {};
    const dni = String(datos.dni || "").trim();
    if (!window.pacientesRegistrados) window.pacientesRegistrados = [];
    if (dni) desmarcarPacienteEliminado(dni);
    const existente = window.pacientesRegistrados.find(p => String(p.dni) === dni && dni !== "");
    const registro = {
        id: existente ? existente.id : ("pac_" + (dni || Date.now())),
        dni: dni,
        nombre: datos.nombre || (existente ? existente.nombre : "") || "",
        celular: datos.celular || (existente ? existente.celular : "") || "",
        fnac: datos.fnac || (existente ? existente.fnac : "") || "",
        edad: datos.edad || (existente ? existente.edad : "") || "",
        sexo: datos.sexo || (existente ? existente.sexo : "MASCULINO") || "MASCULINO",
        ultimaAtencion: new Date().toISOString()
    };
    if (existente) {
        Object.assign(existente, registro);
        return existente;
    }
    window.pacientesRegistrados.push(registro);
    return registro;
}

function registrarPacienteDesdeOrden(orden) {
    if (!orden) return null;
    const dni = String(orden.dni || "").trim();
    if (!dni) return null;
    const paciente = upsertPaciente({
        dni,
        nombre: orden.nombre || "",
        celular: orden.celular || "",
        fnac: orden.fechaNacimiento || orden.fnac || "",
        edad: orden.edad || "",
        sexo: orden.sexo || "MASCULINO"
    });
    window.nubeGuardarPaciente?.(paciente);
    return paciente;
}
window.registrarPacienteDesdeOrden = registrarPacienteDesdeOrden;

function reconciliarPacientesDesdeOrdenes() {
    (ordenesRegistradas || []).forEach(o => {
        if (o && o.dni && !pacienteEliminado(o.dni)) {
            upsertPaciente({
                dni: o.dni,
                nombre: o.nombre || "",
                celular: o.celular || "",
                fnac: o.fechaNacimiento || o.fnac || "",
                edad: o.edad || "",
                sexo: o.sexo || "MASCULINO"
            });
        }
    });
}

// ==========================================
// NAVEGACIÓN
// ==========================================
function actualizarFechaActual() {
    const fechaEl = document.getElementById("current-date");
    if (fechaEl) {
        const opciones = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        fechaEl.textContent = new Date().toLocaleDateString('es-ES', opciones);
    }
}

function toggleSidebar() {
    const wrapper = document.getElementById("wrapper");
    const sidebar = document.getElementById("sidebar");
    const overlay = document.getElementById("sidebar-overlay");

    if (window.innerWidth <= 991) {
        if (sidebar) {
            sidebar.classList.toggle("active");
            sidebar.classList.toggle("show");
        }
        if (overlay) {
            overlay.classList.toggle("active");
            overlay.classList.toggle("show");
        }
    } else {
        if (wrapper) {
            wrapper.classList.toggle("sidebar-colapsado");
            const estaColapsado = wrapper.classList.contains("sidebar-colapsado");
            localStorage.setItem("vital_sidebar_colapsado", estaColapsado ? "1" : "0");
        }
    }
}

function marcarNavActiva(sectionId) {
    document.querySelectorAll('#sidebar .nav-link').forEach(link => {
        const oc = link.getAttribute('onclick') || '';
        link.classList.toggle('active', oc.indexOf("'" + sectionId + "'") !== -1);
    });
    document.querySelectorAll('.vital-navbtn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.section === sectionId);
    });
}

function showSection(sectionId) {
    document.querySelectorAll('.section-content').forEach(sec => {
        sec.classList.add('d-none');
        sec.style.display = 'none';
    });
    const target = document.getElementById(`sec-${sectionId}`);
    if (target) {
        target.classList.remove('d-none');
        target.style.display = 'block';
    }
    marcarNavActiva(sectionId);
    const sidebar = document.getElementById("sidebar");
    const overlay = document.getElementById("sidebar-overlay");
    if (sidebar) { sidebar.classList.remove('active'); sidebar.classList.remove('show'); }
    if (overlay) { overlay.classList.remove('active'); overlay.classList.remove('show'); }
}

function crearBarraNavegacion() {
    if (document.getElementById("vital-navbar-botones")) return;
    const main = document.getElementById("main-content");
    if (!main) return;

    const secciones = [
        { id: 'cotizacion', texto: 'Cotización', icono: 'bi-calculator' },
        { id: 'recepcion', texto: 'Recepción', icono: 'bi-person-plus-fill' },
        { id: 'pacientes', texto: 'Pacientes', icono: 'bi-people-fill' },
        { id: 'ordenes', texto: 'Órdenes', icono: 'bi-receipt' },
        { id: 'resultados', texto: 'Resultados', icono: 'bi-file-earmark-medical-fill' },
        { id: 'caja', texto: 'Caja', icono: 'bi-cash-stack' },
        { id: 'catalogo', texto: 'Catálogo', icono: 'bi-journal-bookmark-fill' }
    ];

    const barra = document.createElement("div");
    barra.id = "vital-navbar-botones";
    barra.className = "vital-navbar-botones d-flex flex-wrap gap-2 mb-3 px-1 py-2";
    secciones.forEach(s => {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "vital-navbtn btn btn-sm btn-outline-primary";
        btn.dataset.section = s.id;
        btn.innerHTML = `<i class="bi ${s.icono} me-1"></i>${s.texto}`;
        btn.onclick = () => showSection(s.id);
        barra.appendChild(btn);
    });

    try {
        const topbar = main.querySelector("nav.navbar");
        if (topbar && topbar.parentNode === main) {
            main.insertBefore(barra, topbar.nextSibling);
        } else {
            main.insertBefore(barra, main.firstChild);
        }
    } catch (e) {
        main.appendChild(barra);
    }

    const visible = document.querySelector('.section-content:not(.d-none)');
    if (visible) marcarNavActiva(visible.id.replace('sec-', ''));
}

// ==========================================
// CÁLCULO DE EDAD
// ==========================================
function calcularEdadDesde(fecha) {
    if (!fecha) return "";
    const nac = new Date(fecha);
    if (isNaN(nac.getTime())) return "";
    const hoy = new Date();
    let edad = hoy.getFullYear() - nac.getFullYear();
    const m = hoy.getMonth() - nac.getMonth();
    if (m < 0 || (m === 0 && hoy.getDate() < nac.getDate())) edad--;
    return (edad >= 0 ? edad : 0) + " AÑOS";
}
function calcularEdad() {
    const pares = [["pac-fnac", "pac-edad"], ["fechaNacimiento", "edad"]];
    pares.forEach(([idFecha, idEdad]) => {
        const f = document.getElementById(idFecha);
        const e = document.getElementById(idEdad);
        if (!f || !e || !f.value) return;
        const resultado = calcularEdadDesde(f.value);
        if (resultado) e.value = resultado;
    });
}

// ==========================================
// RECEPCIÓN: BÚSQUEDA Y CARRITO
// ==========================================
function buscarPaciente() {
    const dni = val("pac-dni");
    if (dni.length < 8) {
        alert("Ingrese un DNI o documento válido de al menos 8 dígitos.");
        return;
    }
    const lista = (window.pacientesRegistrados || []).concat(window.listaPacientesCache || []);
    const pac = lista.map(normalizarPaciente).find(p => String(p.dni) === dni);
    if (!pac) {
        alert("No se encontró un paciente registrado con ese DNI. Complete los datos manualmente.");
        return;
    }
    setVal("pac-nombre", pac.nombre);
    setVal("pac-celular", pac.celular);
    setVal("pac-fnac", pac.fnac);
    setVal("pac-sexo", pac.sexo || "MASCULINO");
    if (pac.fnac) {
        setVal("pac-edad", calcularEdadDesde(pac.fnac) || pac.edad);
    } else {
        setVal("pac-edad", pac.edad);
    }
}

function filtrarExamenes(query) {
    const contenedor = document.getElementById("sugerencias-examenes");
    if (!contenedor) return;
    contenedor.innerHTML = "";
    if (!query || query.trim() === "") { contenedor.style.display = "none"; return; }

    const q = query.toLowerCase();
    const filtrados = examenesCatalogo.filter(ex =>
        String(ex.nombre || "").toLowerCase().includes(q) ||
        String(ex.codigo || "").toLowerCase().includes(q)
    ).slice(0, 60);

    if (filtrados.length === 0) { contenedor.style.display = "none"; return; }
    contenedor.style.display = "block";
    filtrados.forEach(ex => {
        const item = document.createElement("a");
        item.href = "#";
        item.className = "list-group-item list-group-item-action py-2";
        item.innerHTML = `<strong>${escapeHTML(ex.codigo)}</strong> - ${escapeHTML(ex.nombre)} <span class="float-end text-primary">S/ ${Number(ex.precio || 0).toFixed(2)}</span>`;
        item.onclick = (e) => {
            e.preventDefault();
            agregarExamenSeleccionado(ex);
            const input = document.getElementById("busqueda-examen");
            if (input) input.value = "";
            contenedor.style.display = "none";
        };
        contenedor.appendChild(item);
    });
}

function agregarExamenSeleccionado(ex) {
    const existente = examenesSeleccionados.find(i => i.codigo === ex.codigo);
    if (existente) {
        existente.cantidad += 1;
    } else {
        examenesSeleccionados.push({
            codigo: ex.codigo,
            nombre: ex.nombre,
            cantidad: 1,
            precio: Number(ex.precio || 0),
            unidad: ex.unidad || "",
            referencia: ex.referencia || ""
        });
    }
    renderizarTablaSeleccionados();
}

function cambiarCantidadSeleccionado(codigo, nuevaCant) {
    const item = examenesSeleccionados.find(i => i.codigo === codigo);
    if (!item) return;
    item.cantidad = parseInt(nuevaCant) || 1;
    if (item.cantidad <= 0) item.cantidad = 1;
    renderizarTablaSeleccionados();
}

function eliminarExamenSeleccionado(codigo) {
    examenesSeleccionados = examenesSeleccionados.filter(i => i.codigo !== codigo);
    renderizarTablaSeleccionados();
}

function renderizarTablaSeleccionados() {
    const tabla = document.getElementById("tabla-examenes-seleccionados");
    if (!tabla) return;
    const tbody = tabla.querySelector("tbody");
    const totalEl = document.getElementById("total-cobrar");
    tbody.innerHTML = "";

    if (examenesSeleccionados.length === 0) {
        tbody.innerHTML = `<tr id="empty-row"><td colspan="6" class="text-center text-muted py-4">No hay exámenes agregados.</td></tr>`;
        if (totalEl) totalEl.textContent = "0.00";
        return;
    }

    let total = 0;
    examenesSeleccionados.forEach(item => {
        const importe = item.cantidad * item.precio;
        total += importe;
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${escapeHTML(item.codigo)}</td>
            <td>${escapeHTML(item.nombre)}</td>
            <td><input type="number" class="form-control form-control-sm" style="width:70px" value="${item.cantidad}" min="1" onchange="cambiarCantidadSeleccionado('${item.codigo}', this.value)"></td>
            <td>S/ ${Number(item.precio).toFixed(2)}</td>
            <td>S/ ${importe.toFixed(2)}</td>
            <td class="text-center"><button type="button" class="btn btn-sm btn-outline-danger" onclick="eliminarExamenSeleccionado('${item.codigo}')"><i class="bi bi-trash"></i></button></td>
        `;
        tbody.appendChild(tr);
    });
    if (totalEl) totalEl.textContent = total.toFixed(2);
}

// ==========================================
// REGISTRAR ORDEN Y TICKET
// ==========================================
function guardarOrdenGenerarTicket() {
    const dni = val("pac-dni");
    const nombre = val("pac-nombre");
    const sexo = val("pac-sexo");
    const inputFnac = document.getElementById("pac-fnac");
    const fechaNacimiento = inputFnac ? inputFnac.value.trim() : "";
    const edad = val("pac-edad");
    const celularPaciente = val("pac-celular");
    const doctor = val("pac-doctor");
    const metodoPago = val("metodo-pago") || "Efectivo";

    if (!dni || !nombre) {
        alert("Por favor ingrese al menos el DNI y los Nombres y Apellidos del paciente.");
        return;
    }
    if (examenesSeleccionados.length === 0) {
        alert("Debe agregar al menos un examen a la orden.");
        return;
    }

    const total = examenesSeleccionados.reduce((acc, item) => acc + (item.cantidad * item.precio), 0);
    const nroOrden = "ORD-" + Math.floor(100000 + Math.random() * 900000);
    const fechaHora = new Date().toLocaleString();

    const nuevaOrden = {
        nroOrden, fechaHora, dni, nombre, sexo, fechaNacimiento, edad,
        celular: celularPaciente, doctor, metodoPago,
        examenes: examenesSeleccionados.map(i => ({ ...i })),
        total, estado: "Pendiente", en: Date.now()
    };

    ordenesRegistradas.unshift(nuevaOrden);

    const movimiento = {
        id: `${Date.now()}-${nroOrden}`,
        hora: new Date().toLocaleTimeString(),
        nroOrden, paciente: nombre, metodoPago, monto: total, en: Date.now()
    };
    cajaMovimientos.unshift(movimiento);

    registrarPacienteDesdeOrden(nuevaOrden);

    persistirDatos();
    actualizarTotalesCaja();
    cargarOrdenes();
    cargarPacientes();
    window.nubeGuardarOrden?.(nuevaOrden);
    window.nubeGuardarMovimiento?.(movimiento);

    const form = document.getElementById("form-paciente");
    if (form) form.reset();
    setVal("pac-edad", "");
    examenesSeleccionados = [];
    renderizarTablaSeleccionados();

    showSection('ordenes');
    mostrarTicket(nuevaOrden);
}

// ==========================================
// GESTIÓN DE ÓRDENES
// ==========================================
function cargarOrdenes() {
    const tbody = document.getElementById('lista-ordenes-body');
    if (!tbody) return;
    tbody.innerHTML = "";
    const ordenes = ordenesRegistradas || [];
    if (ordenes.length === 0) {
        tbody.innerHTML = `<tr><td colspan="6" class="text-center text-muted py-4">No hay órdenes registradas.</td></tr>`;
        return;
    }
    ordenes.forEach(ord => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td class="fw-bold text-primary">${escapeHTML(ord.nroOrden)}</td>
            <td>${escapeHTML(ord.fechaHora)}</td>
            <td>${escapeHTML(ord.dni)}</td>
            <td>${escapeHTML(ord.nombre)}</td>
            <td><span class="badge bg-warning text-dark">${escapeHTML(ord.estado || "Pendiente")}</span></td>
            <td class="text-end px-3">
                <button class="btn btn-sm btn-outline-secondary me-1" title="Reimprimir ticket" onclick="mostrarTicketPorNro('${ord.nroOrden}')"><i class="bi bi-receipt"></i></button>
                ${ord.resultados ? `<button class="btn btn-sm btn-outline-primary me-1" title="Imprimir informe de resultados" onclick="imprimirInforme('${ord.nroOrden}')"><i class="bi bi-printer"></i> Informe</button>` : ""}
                ${ord.resultados ? `<button class="btn btn-sm btn-outline-danger me-1" title="Descargar informe en PDF" onclick="descargarInformePDF('${ord.nroOrden}')"><i class="bi bi-file-earmark-pdf"></i> PDF</button>` : ""}
                <button class="btn btn-sm btn-outline-primary me-1" onclick="abrirResultados('${ord.nroOrden}')" title="Resultados"><i class="bi bi-file-earmark-medical"></i> Resultados</button>
                <button class="btn btn-sm btn-outline-danger" onclick="eliminarOrden('${ord.nroOrden}')" title="Eliminar Orden"><i class="bi bi-trash"></i></button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

function eliminarOrden(nroOrden) {
    if (confirm("¿Estás seguro de eliminar esta orden por completo?")) {
        const idOrden = String(nroOrden);
        if (!window.ordenesEliminadas) window.ordenesEliminadas = leerJSON("vital_ordenes_eliminadas", []);
        if (!window.ordenesEliminadas.includes(idOrden)) {
            window.ordenesEliminadas.push(idOrden);
            localStorage.setItem("vital_ordenes_eliminadas", JSON.stringify(window.ordenesEliminadas));
        }
        ordenesRegistradas = ordenesRegistradas.filter(o => String(o.nroOrden) !== idOrden);
        persistirDatos();
        if (typeof nubeEliminarOrden === "function") nubeEliminarOrden(idOrden);
        cargarOrdenes();
        if (typeof actualizarTotalesCaja === "function") actualizarTotalesCaja();
    }
}

function extraerReferenciaSegunPaciente(referencia, sexo, edad) {
    if (!referencia || typeof referencia !== "string") return null;
    const partes = referencia.split("|").map(p => p.trim()).filter(Boolean);
    if (partes.length <= 1) return null;

    const sexoNorm = String(sexo || "").trim().toUpperCase();
    const esFemenino = sexoNorm.startsWith("F") || sexoNorm.includes("MUJER");
    const esMasculino = sexoNorm.startsWith("M") || sexoNorm.includes("HOMBRE") || sexoNorm.includes("VARON");

    const edadStr = String(edad || "").toLowerCase().trim();
    const edadNum = parseFloat(edadStr.replace(/[^0-9.]/g, ""));
    const esNeonato = edadStr.includes("día") || edadStr.includes("dia") || edadStr.includes("mes") || (!isNaN(edadNum) && edadNum === 0);
    const esNino = !esNeonato && !isNaN(edadNum) && edadNum > 0 && edadNum < 18;
    const esAdulto = !esNeonato && !esNino && !isNaN(edadNum) && edadNum >= 18;

    let sugerencia = null;
    let etiqueta = "";

    // 1. Prioridad: Etapa etaria si es neonato o niño
    if (esNeonato) {
        const parte = partes.find(p => /neonato/i.test(p));
        if (parte) { sugerencia = parte; etiqueta = "Neonato"; }
    } else if (esNino) {
        const parte = partes.find(p => /niño|pedi[aá]tr/i.test(p));
        if (parte) { sugerencia = parte; etiqueta = "Niño"; }
    }

    // 2. Por sexo si no hubo coincidencia pediátrica
    if (!sugerencia) {
        if (esFemenino) {
            const parte = partes.find(p => /(?:^|[\s(])(?:mujer|femenina|f:)(?:[\s)]|$)/i.test(p) || /(?:^|[\s])f\s*:/i.test(p) || /mujeres/i.test(p));
            if (parte) { sugerencia = parte; etiqueta = "Mujer"; }
        } else if (esMasculino) {
            const parte = partes.find(p => /(?:^|[\s(])(?:hombre|masculino|varon|m:)(?:[\s)]|$)/i.test(p) || /(?:^|[\s])m\s*:/i.test(p) || /hombres/i.test(p));
            if (parte) { sugerencia = parte; etiqueta = "Hombre"; }
        }
    }

    // 3. Si aún no hay sugerencia y es adulto
    if (!sugerencia && esAdulto) {
        const parte = partes.find(p => /adulto/i.test(p));
        if (parte) { sugerencia = parte; etiqueta = "Adulto"; }
    }

    return { sugerencia, etiqueta, todas: partes };
}
window.extraerReferenciaSegunPaciente = extraerReferenciaSegunPaciente;

function aplicarVariacionRef(btn, texto) {
    const fila = btn.closest(".row[data-ex]");
    if (!fila) return;
    const input = fila.querySelector('[data-campo="referencia"]');
    if (input) {
        input.value = texto;
        input.dispatchEvent(new Event("input", { bubbles: true }));
        const bgOriginal = input.style.backgroundColor;
        input.style.backgroundColor = "#e0f2fe";
        setTimeout(() => { input.style.backgroundColor = bgOriginal; }, 400);
    }
}
window.aplicarVariacionRef = aplicarVariacionRef;

function formatearReferenciaParaInforme(ref) {
    if (!ref || ref === "-") return "-";
    if (typeof ref === "string" && ref.includes("|")) {
        const lineas = ref.split("|").map(l => escapeHTML(l.trim())).filter(Boolean);
        return lineas.join("<br>");
    }
    return escapeHTML(ref);
}
window.formatearReferenciaParaInforme = formatearReferenciaParaInforme;

function obtenerIndicadoresParaOrden(ex) {
    if (!ex) return [];
    return obtenerPlantillaIndicadores(ex.nombre, ex.codigo);
}

function abrirResultados(nroOrden) {
    const orden = (ordenesRegistradas || []).find(o => o.nroOrden === nroOrden);
    if (!orden) return;

    showSection('resultados');
    const editor = document.getElementById("resultados-editor");
    if (!editor) return;

    let html = `
        <div class="alert alert-secondary d-flex justify-content-between align-items-center flex-wrap gap-2 small py-2 mb-3">
            <div>
                <strong>Orden:</strong> ${escapeHTML(orden.nroOrden)} | <strong>Paciente:</strong> ${escapeHTML(orden.nombre)} (${escapeHTML(orden.dni)})
                <span class="badge bg-primary-subtle text-primary border border-primary-subtle ms-2">Sexo: ${escapeHTML(orden.sexo || "—")}</span>
                <span class="badge bg-secondary-subtle text-secondary border ms-1">Edad: ${escapeHTML(orden.edad || "—")}</span>
                <span class="text-muted ms-2 d-block d-md-inline mt-1 mt-md-0">
                    <i class="bi bi-arrow-down-up me-1 text-primary"></i>Organiza el orden o usa los atajos rápidos de variación por sexo/edad.
                </span>
            </div>
            <div class="d-flex gap-2 flex-wrap">
                <button class="btn btn-success btn-sm" onclick="guardarResultados('${orden.nroOrden}')"><i class="bi bi-save me-1"></i> Guardar Resultados</button>
                <button class="btn btn-outline-primary btn-sm ms-1" onclick="imprimirInforme('${orden.nroOrden}')"><i class="bi bi-printer me-1"></i> Imprimir Informe</button>
                <button class="btn btn-outline-danger btn-sm ms-1" onclick="descargarInformePDF('${orden.nroOrden}')"><i class="bi bi-file-earmark-pdf me-1"></i> Descargar PDF</button>
            </div>
        </div>
        <div class="list-group" id="contenedor-cards-examenes">
    `;

    orden.examenes.forEach((ex, exIdx) => {
        const guardado = (orden.resultados || []).find(r => r.codigo === ex.codigo);
        const plantilla = obtenerIndicadoresParaOrden(ex);
        const itemCatalogo = (typeof examenesCatalogo !== 'undefined' ? examenesCatalogo : []).find(c => c.codigo === ex.codigo);
        const nombreLimpioExamen = itemCatalogo && itemCatalogo.nombre ? itemCatalogo.nombre : ex.nombre;

        // Limpiar cualquier contaminación previa de la plantilla de 24 indicadores de orina en exámenes independientes
        const teniaPlantillaOrinaErronea = (!plantilla || plantilla.length === 0) && guardado && Array.isArray(guardado.indicadores) &&
            guardado.indicadores.some(i => i.nombre === "Urobilinógeno" || i.nombre === "Ácido Ascórbico" || i.nombre === "Recuento Bacteriano");

        let indicadores = plantilla && plantilla.length ? plantilla : null;
        if (!indicadores && guardado && Array.isArray(guardado.indicadores) && guardado.indicadores.length > 0 && !teniaPlantillaOrinaErronea) {
            indicadores = guardado.indicadores;
        }

        if (!indicadores || !indicadores.length) {
            indicadores = [{
                nombre: nombreLimpioExamen || "Resultado del análisis",
                unidad: ex.unidad || (itemCatalogo && itemCatalogo.unidad) || "",
                refMin: ex.refMin ?? (itemCatalogo && itemCatalogo.refMin !== undefined ? itemCatalogo.refMin : ""),
                refMax: ex.refMax ?? (itemCatalogo && itemCatalogo.refMax !== undefined ? itemCatalogo.refMax : ""),
                referencia: ex.referencia || (itemCatalogo && itemCatalogo.referencia) || "",
                metodo: ex.metodo || (itemCatalogo && itemCatalogo.metodo) || ""
            }];
        }

        let filas = "";
        indicadores.forEach((ind, indIdx) => {
            const previo = guardado && guardado.indicadores && guardado.indicadores[indIdx] ? guardado.indicadores[indIdx] : null;
            if (ind.esSeccion) {
                filas += `
                    <div class="row g-2 mb-2 mt-3" data-ex="${exIdx}" data-esseccion="true" data-nombre="${escapeHTML(ind.nombre)}">
                        <div class="col-12">
                            <h6 class="fw-bold text-dark bg-light p-2 border-start border-primary border-4 mb-0">${escapeHTML(ind.nombre)}</h6>
                        </div>
                    </div>
                `;
                return;
            }
            const referenciaBase = ind.referencia || formatoRango(ind.refMin, ind.refMax);
            const valorReferenciaPrevio = (previo && previo.referencia !== undefined && previo.referencia !== "") 
                ? previo.referencia 
                : referenciaBase;
            const tieneUnidad = ind.unidad && ind.unidad.trim() !== "";
            const valorResultadoPrevio = previo ? previo.resultado : "";
            const valorMetodoPrevio = previo && previo.metodo !== undefined ? previo.metodo : (ind.metodo || "");

            // Variaciones inteligentes para Sexo / Edad
            let htmlVariaciones = "";
            if (referenciaBase && typeof referenciaBase === "string" && referenciaBase.includes("|")) {
                const varAnalisis = extraerReferenciaSegunPaciente(referenciaBase, orden.sexo, orden.edad);
                if (varAnalisis && Array.isArray(varAnalisis.todas)) {
                    const botonesVar = [];
                    if (varAnalisis.sugerencia) {
                        botonesVar.push(`
                            <button type="button" class="btn btn-xs btn-outline-primary py-0 px-2 fw-semibold" style="font-size: 10px;" onclick="aplicarVariacionRef(this, '${escapeHTML(varAnalisis.sugerencia)}')" title="Aplicar automáticamente para este paciente (${escapeHTML(varAnalisis.etiqueta)})">
                                ⚡ ${escapeHTML(varAnalisis.etiqueta)}: ${escapeHTML(varAnalisis.sugerencia)}
                            </button>
                        `);
                    }
                    varAnalisis.todas.forEach(v => {
                        if (!varAnalisis.sugerencia || v !== varAnalisis.sugerencia) {
                            const label = v.split(":")[0]?.trim() || v;
                            botonesVar.push(`
                                <button type="button" class="btn btn-xs btn-outline-secondary py-0 px-1" style="font-size: 10px;" onclick="aplicarVariacionRef(this, '${escapeHTML(v)}')" title="Usar: ${escapeHTML(v)}">
                                    ${escapeHTML(label)}
                                </button>
                            `);
                        }
                    });
                    botonesVar.push(`
                        <button type="button" class="btn btn-xs btn-link text-decoration-none py-0 px-1 text-muted" style="font-size: 10px;" onclick="aplicarVariacionRef(this, '${escapeHTML(referenciaBase)}')" title="Restaurar texto completo">
                            ↺ Todos
                        </button>
                    `);
                    htmlVariaciones = `<div class="d-flex flex-wrap gap-1 mt-1">${botonesVar.join("")}</div>`;
                }
            }

            filas += `
                <div class="row g-2 mb-2 align-items-center" data-ex="${exIdx}" data-ind="${indIdx}" data-nombre="${escapeHTML(ind.nombre)}" data-refmin="${escapeHTML(ind.refMin ?? "")}" data-refmax="${escapeHTML(ind.refMax ?? "")}">
                    <div class="col-md-3">
                        <label class="form-label small mb-0 ps-2 fw-semibold">${escapeHTML(ind.nombre)}</label>
                    </div>
                    <div class="${tieneUnidad ? 'col-md-2' : 'col-md-3'}">
                        <input type="text" class="form-control form-control-sm" data-campo="resultado" placeholder="Valor obtenido" value="${escapeHTML(valorResultadoPrevio)}">
                    </div>
                    ${tieneUnidad ? `
                    <div class="col-md-2">
                        <input type="text" class="form-control form-control-sm bg-light" data-campo="unidad" value="${escapeHTML(ind.unidad)}" readonly>
                    </div>` : `<input type="hidden" data-campo="unidad" value="">`}
                    <div class="${tieneUnidad ? 'col-md-3' : 'col-md-4'}">
                        <input type="text" class="form-control form-control-sm bg-white" data-campo="referencia" value="${escapeHTML(valorReferenciaPrevio)}" placeholder="Valores de referencia">
                        ${htmlVariaciones}
                    </div>
                    <div class="col-md-2">
                        <input type="text" class="form-control form-control-sm" data-campo="metodo" placeholder="Método" value="${escapeHTML(valorMetodoPrevio)}">
                    </div>
                </div>
            `;
        });

        html += `
            <div class="list-group-item mb-3 shadow-sm border rounded card-examen-arrastrable" 
                 draggable="true" 
                 data-ex-card-idx="${exIdx}"
                 style="cursor: default; transition: all 0.2s ease;">
                <div class="d-flex justify-content-between align-items-center mb-3 pb-2 border-bottom flex-wrap gap-2 bg-light p-2 rounded">
                    <div class="d-flex align-items-center gap-2">
                        <span class="badge bg-primary text-white fs-6 px-2 py-1 drag-handle" style="cursor: grab;" title="Arrastrar para reordenar examen">
                            <i class="bi bi-grip-vertical me-1"></i>#${exIdx + 1}
                        </span>
                        <h6 class="fw-bold text-primary mb-0 fs-6">${escapeHTML(nombreLimpioExamen)}</h6>
                    </div>
                    <div class="btn-group btn-group-sm" role="group">
                        <button type="button" class="btn btn-outline-secondary" onclick="moverExamenEnResultados('${orden.nroOrden}', ${exIdx}, -1)" ${exIdx === 0 ? 'disabled' : ''} title="Subir examen en el informe">
                            <i class="bi bi-arrow-up-circle me-1"></i> Subir
                        </button>
                        <button type="button" class="btn btn-outline-secondary" onclick="moverExamenEnResultados('${orden.nroOrden}', ${exIdx}, 1)" ${exIdx === orden.examenes.length - 1 ? 'disabled' : ''} title="Bajar examen en el informe">
                            <i class="bi bi-arrow-down-circle me-1"></i> Bajar
                        </button>
                    </div>
                </div>
                ${filas}
            </div>
        `;
    });

    html += `</div>`;
    editor.innerHTML = html;
    inicializarDragAndDropResultados(nroOrden);
}

function inicializarDragAndDropResultados(nroOrden) {
    const contenedor = document.getElementById("contenedor-cards-examenes");
    if (!contenedor) return;

    let indexArrastrado = null;
    const cards = contenedor.querySelectorAll(".card-examen-arrastrable");

    cards.forEach(card => {
        card.addEventListener("dragstart", (e) => {
            indexArrastrado = parseInt(card.dataset.exCardIdx, 10);
            card.classList.add("arrastrando");
            e.dataTransfer.effectAllowed = "move";
            e.dataTransfer.setData("text/plain", indexArrastrado);
        });

        card.addEventListener("dragend", () => {
            card.classList.remove("arrastrando");
            cards.forEach(c => c.classList.remove("drag-sobre"));
        });

        card.addEventListener("dragover", (e) => {
            e.preventDefault();
            e.dataTransfer.dropEffect = "move";
            card.classList.add("drag-sobre");
        });

        card.addEventListener("dragleave", () => {
            card.classList.remove("drag-sobre");
        });

        card.addEventListener("drop", (e) => {
            e.preventDefault();
            card.classList.remove("drag-sobre");
            const indexDestino = parseInt(card.dataset.exCardIdx, 10);
            if (isNaN(indexArrastrado) || isNaN(indexDestino) || indexArrastrado === indexDestino) return;

            reordenarExamenesDragDrop(nroOrden, indexArrastrado, indexDestino);
        });
    });
}

function moverExamenEnResultados(nroOrden, indexActual, direccion) {
    guardarResultados(nroOrden, true);

    const orden = (ordenesRegistradas || []).find(o => o.nroOrden === nroOrden);
    if (!orden || !Array.isArray(orden.examenes)) return;

    const nuevoIndex = indexActual + direccion;
    if (nuevoIndex < 0 || nuevoIndex >= orden.examenes.length) return;

    const temp = orden.examenes[indexActual];
    orden.examenes[indexActual] = orden.examenes[nuevoIndex];
    orden.examenes[nuevoIndex] = temp;

    if (Array.isArray(orden.resultados)) {
        orden.resultados.sort((a, b) => {
            const idxA = orden.examenes.findIndex(e => e.codigo === a.codigo);
            const idxB = orden.examenes.findIndex(e => e.codigo === b.codigo);
            return idxA - idxB;
        });
    }

    orden.en = Date.now();
    persistirDatos();
    cargarOrdenes();
    window.nubeGuardarOrden?.(orden);
    abrirResultados(nroOrden);
}
window.moverExamenEnResultados = moverExamenEnResultados;

function reordenarExamenesDragDrop(nroOrden, desdeIndex, haciaIndex) {
    guardarResultados(nroOrden, true);

    const orden = (ordenesRegistradas || []).find(o => o.nroOrden === nroOrden);
    if (!orden || !Array.isArray(orden.examenes)) return;

    if (desdeIndex < 0 || desdeIndex >= orden.examenes.length || haciaIndex < 0 || haciaIndex >= orden.examenes.length) return;

    const [elemento] = orden.examenes.splice(desdeIndex, 1);
    orden.examenes.splice(haciaIndex, 0, elemento);

    if (Array.isArray(orden.resultados)) {
        orden.resultados.sort((a, b) => {
            const idxA = orden.examenes.findIndex(e => e.codigo === a.codigo);
            const idxB = orden.examenes.findIndex(e => e.codigo === b.codigo);
            return idxA - idxB;
        });
    }

    orden.en = Date.now();
    persistirDatos();
    cargarOrdenes();
    window.nubeGuardarOrden?.(orden);
    abrirResultados(nroOrden);
}
window.reordenarExamenesDragDrop = reordenarExamenesDragDrop;

function guardarResultados(nroOrden, silencioso = false) {
    const orden = (ordenesRegistradas || []).find(o => o.nroOrden === nroOrden);
    const editor = document.getElementById("resultados-editor");
    if (!orden || !editor) return false;

    const grupos = editor.querySelectorAll("[data-ex]");
    if (!grupos.length) return false;

    const porExamen = {};
    grupos.forEach(fila => {
        const exIdx = fila.dataset.ex;
        if (!porExamen[exIdx]) porExamen[exIdx] = [];
        const esSeccion = fila.dataset.esseccion === "true";
        if (esSeccion) {
            porExamen[exIdx].push({
                nombre: fila.dataset.nombre || "", esSeccion: true,
                resultado: "", unidad: "", refMin: "", refMax: "", referencia: "", metodo: ""
            });
            return;
        }
        const leer = campo => {
            const el = fila.querySelector(`[data-campo="${campo}"]`);
            return el ? el.value.trim() : "";
        };

        porExamen[exIdx].push({
            nombre: fila.dataset.nombre || "Resultado", esSeccion: false,
            resultado: leer("resultado"), unidad: leer("unidad"),
            refMin: fila.dataset.refmin || "", refMax: fila.dataset.refmax || "",
            referencia: leer("referencia"),
            metodo: leer("metodo")
        });
    });

    orden.resultados = Object.keys(porExamen).sort((a, b) => a - b).map(exIdx => {
        const base = orden.examenes[parseInt(exIdx, 10)];
        const catalogo = examenesCatalogo.find(c => c.codigo === base.codigo);
        return {
            codigo: base.codigo, nombre: base.nombre,
            metodo: (catalogo && catalogo.metodo) || "",
            indicadores: porExamen[exIdx]
        };
    });

    orden.estado = "Resultados listos";
    orden.en = Date.now();
    persistirDatos();
    cargarOrdenes();
    window.nubeGuardarOrden?.(orden);

    if (!silencioso) alert(`Resultados guardados correctamente para la orden ${nroOrden}.`);
    return true;
}

// ==========================================
// CATÁLOGO Y PLANTILLAS
// ==========================================
function obtenerPlantillaIndicadores(nombreExamen, codigoExamen = null) {
    if (codigoExamen) {
        const exCat = examenesCatalogo.find(e => String(e.codigo) === String(codigoExamen));
        if (exCat && Array.isArray(exCat.plantillaPersonalizada) && exCat.plantillaPersonalizada.length > 0) {
            return exCat.plantillaPersonalizada;
        }
    }
    
    if (nombreExamen) {
        const exCatByName = examenesCatalogo.find(e => String(e.nombre || "").trim().toUpperCase() === String(nombreExamen).trim().toUpperCase());
        if (exCatByName && Array.isArray(exCatByName.plantillaPersonalizada) && exCatByName.plantillaPersonalizada.length > 0) {
            return exCatByName.plantillaPersonalizada;
        }
    }

    if (!nombreExamen) return [];
    const normalizado = String(nombreExamen).toUpperCase()
        .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
        .replace(/[-+]/g, " ")
        .replace(/\s+/g, " ")
        .trim();

    // 1. UROCULTIVO + ANTIBIOGRAMA (Exclusivo para Urocultivo / Cultivo de Orina)
    const esUrocultivo = normalizado.includes("UROCULTIVO") || 
                         normalizado.includes("CULTIVO DE ORINA") || 
                         normalizado.includes("CULTIVO EN ORINA") ||
                         (normalizado.includes("CULTIVO") && normalizado.includes("ORINA")) ||
                         normalizado.includes("ANTIBIOGRAMA EN ORINA");

    if (esUrocultivo) {
        return BASE_VALORES_REFERENCIALES["UROCULTIVO Y ANTIBIOGRAMA"] || [];
    }

    // 2. EXAMEN COMPLETO DE ORINA (SOLO si es específicamente el examen general/completo de orina)
    // NUNCA asignar a exámenes con 'orina' como: Proteínas en orina, Microalbuminuria, Creatinina, Sedimento, Calcio, etc.
    const esTerminoExamenOrina = normalizado === "EXAMEN COMPLETO DE ORINA" ||
                                 normalizado === "EXAMEN DE ORINA COMPLETO" ||
                                 normalizado === "ORINA COMPLETA" ||
                                 normalizado === "EXAMEN GENERAL DE ORINA" ||
                                 normalizado === "EXAMEN DE ORINA" ||
                                 normalizado === "ANALISIS DE ORINA" ||
                                 normalizado === "ANALISIS COMPLETO DE ORINA" ||
                                 normalizado === "EGO" ||
                                 normalizado.startsWith("EXAMEN COMPLETO DE ORINA") ||
                                 normalizado.startsWith("ORINA COMPLETA") ||
                                 normalizado.startsWith("EXAMEN GENERAL DE ORINA");

    const contieneAnalisisEspecifico = normalizado.includes("PROTEIN") ||
                                      normalizado.includes("MICROALBUMIN") ||
                                      normalizado.includes("CREATIN") ||
                                      normalizado.includes("CALCIO") ||
                                      normalizado.includes("ELECTROLIT") ||
                                      normalizado.includes("ACIDO URICO") ||
                                      normalizado.includes("AMILAS") ||
                                      normalizado.includes("SEDIMENTO") ||
                                      normalizado.includes("EMBARAZO") ||
                                      normalizado.includes("HCG") ||
                                      normalizado.includes("24 H") ||
                                      normalizado.includes("24H") ||
                                      normalizado.includes("DEPURACION") ||
                                      normalizado.includes("CULTIVO");

    if (esTerminoExamenOrina && !contieneAnalisisEspecifico) {
        return BASE_VALORES_REFERENCIALES["EXAMEN COMPLETO DE ORINA"] || [];
    }

    // Si el nombre contiene la palabra "ORINA" pero no es ni Urocultivo ni Examen Completo de Orina,
    // NO debe cargar ninguna de las dos plantillas grandes.
    if (normalizado.includes("ORINA") || normalizado.includes("URINARI")) {
        return [];
    }

    // 3. RESTO DE EQUIVALENCIAS CLÍNICAS NORMADAS
    const equivalencias = [
        { test: n => n.includes("HEMOGRAMA"), key: "HEMOGRAMA COMPLETO AUTOMATIZADO" },
        { test: n => n.includes("LIPIDICO"), key: "PERFIL LIPIDICO" },
        { test: n => n.includes("HEPATICO"), key: "PERFIL HEPATICO" },
        { test: n => n.includes("GLICOSILADA") || n.includes("HBA1C"), key: "HEMOGLOBINA GLICOSILADA" },
        { test: n => n.includes("DENGUE"), key: "DENGUE IGG / IGM" },
        { test: n => n.includes("REACCION INFLAMATORIA"), key: "REACCION INFLAMATORIA EN HECES" },
        { test: n => n.includes("PARASITOLOGICO"), key: "PARASITOLOGICO SERIADO 3 MUESTRAS" },
        { test: n => n === "PSA" || n.includes("INDICE DE PSA") || n.includes("PSA TOTAL"), key: "INDICE DE PSA" },
        { test: n => n.includes("PROTEINA C REACTIVA") || n === "PCR" || n.startsWith("PCR "), key: "PROTEINA C REACTIVA" },
        { test: n => n.includes("SEDIMENTACION") || n.includes("VSG"), key: "VELOCIDAD DE SEDIMENTACION GLOBULAR" }
    ];

    for (const item of equivalencias) {
        if (item.test(normalizado) && BASE_VALORES_REFERENCIALES[item.key]) {
            return BASE_VALORES_REFERENCIALES[item.key];
        }
    }
    
    for (const clave in BASE_VALORES_REFERENCIALES) {
        const claveNormalizada = clave.toUpperCase()
            .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
            .replace(/[-+]/g, " ")
            .replace(/\s+/g, " ")
            .trim();
        // Solo coincidencia exacta o si el examen contiene el nombre completo de la plantilla
        // NUNCA al revés para evitar que palabras comunes atrapen plantillas erróneas
        if (normalizado === claveNormalizada || (normalizado.length > 5 && normalizado.includes(claveNormalizada))) {
            return BASE_VALORES_REFERENCIALES[clave];
        }
    }
    return [];
}

function renderizarTablaCatalogo(filtro = "") {
    const tbody = document.getElementById("tabla-catalogo-body");
    const countEl = document.getElementById("total-cat-count");
    if (!tbody) return;
    tbody.innerHTML = "";
    filtro = filtro || "";
    const filtrados = examenesCatalogo.filter(ex =>
        String(ex.nombre || "").toLowerCase().includes(filtro.toLowerCase()) ||
        String(ex.codigo || "").toLowerCase().includes(filtro.toLowerCase())
    );
    if (countEl) countEl.textContent = examenesCatalogo.length;
    if (filtrados.length === 0) {
        tbody.innerHTML = `<tr><td colspan="5" class="text-center text-muted py-3">No hay exámenes en el catálogo.</td></tr>`;
        return;
    }
    filtrados.forEach(ex => {
        const tienePersonalizada = Array.isArray(ex.plantillaPersonalizada) && ex.plantillaPersonalizada.length > 0;
        const badgeClass = tienePersonalizada ? "bg-success text-white" : "bg-light text-dark border";
        const badgeText = tienePersonalizada ? `Personalizada (${ex.plantillaPersonalizada.length})` : "Plantilla";

        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${escapeHTML(ex.codigo)}</td>
            <td class="fw-semibold">${escapeHTML(ex.nombre)}</td>
            <td><span class="badge ${badgeClass}">${badgeText}</span></td>
            <td>S/ ${Number(ex.precio || 0).toFixed(2)}</td>
            <td class="text-end">
                <button class="btn btn-sm btn-outline-primary me-1" onclick="editarExamenCatalogo('${ex.codigo}')" title="Editar"><i class="bi bi-pencil"></i></button>
                <button class="btn btn-sm btn-outline-danger" onclick="eliminarExamenCatalogo('${ex.codigo}')" title="Eliminar"><i class="bi bi-trash"></i></button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

function prepararNuevoExamen() {
    const form = document.getElementById("form-catalogo");
    if (form) form.reset();
    setVal("cat-id-original", "");
    const titulo = document.getElementById("catalogo-form-titulo");
    if (titulo) titulo.innerHTML = `<i class="bi bi-layout-text-window-reverse me-2"></i>Nuevo Examen`;
    const cont = document.getElementById("contenedor-indicadores");
    if (cont) cont.innerHTML = "";
}

function insertarPlantillaRef(btn, tipo) {
    const fila = btn.closest(".indicador-row");
    if (!fila) return;
    const inputRef = fila.querySelector(".ind-referencia");
    if (!inputRef) return;
    if (tipo === "sexo") {
        inputRef.value = "Hombres: 0.00 - 0.00 | Mujeres: 0.00 - 0.00";
    } else if (tipo === "edad") {
        inputRef.value = "Adultos: 0.00 - 0.00 | Niños: 0.00 - 0.00 | Neonatos: 0.00 - 0.00";
    } else if (tipo === "generico") {
        inputRef.value = "Deseable: < 0.00 | Límite: 0.00 - 0.00 | Elevado: >= 0.00";
    }
    inputRef.focus();
}
window.insertarPlantillaRef = insertarPlantillaRef;

function agregarIndicadorResultado(datos = {}) {
    const contenedor = document.getElementById("contenedor-indicadores");
    if (!contenedor) return;
    
    const div = document.createElement("div");
    div.className = "row g-2 mb-2 p-2 rounded bg-light border indicador-row align-items-center";
    
    const refVal = datos.referencia || (datos.refMin !== undefined && datos.refMax !== undefined && datos.refMin !== "" && datos.refMax !== "" ? formatoRango(datos.refMin, datos.refMax) : "");

    div.innerHTML = `
        <input type="hidden" class="ind-id" value="${datos.id || ''}">
        <div class="col-md-4 col-12">
            <label class="form-label small text-muted mb-0 fw-semibold">Nombre Parámetro</label>
            <input type="text" class="form-control form-control-sm ind-nombre" value="${datos.nombre || ''}" placeholder="ej. Creatinina Sérica">
        </div>
        <div class="col-md-2 col-4">
            <label class="form-label small text-muted mb-0 fw-semibold">Unidad</label>
            <input type="text" class="form-control form-control-sm ind-unidad" value="${datos.unidad || ''}" placeholder="mg/dL">
        </div>
        <div class="col-md-2 col-4">
            <label class="form-label small text-muted mb-0 fw-semibold">Mín / Máx</label>
            <div class="input-group input-group-sm">
                <input type="number" step="any" class="form-control ind-min px-1" value="${datos.refMin ?? ''}" placeholder="Mín">
                <input type="number" step="any" class="form-control ind-max px-1" value="${datos.refMax ?? ''}" placeholder="Máx">
            </div>
        </div>
        <div class="col-md-3 col-3">
            <label class="form-label small text-muted mb-0 fw-semibold">Método</label>
            <input type="text" class="form-control form-control-sm ind-metodo" value="${datos.metodo || ''}" placeholder="Colorimétrico...">
        </div>
        <div class="col-md-1 col-1 text-center d-flex align-items-end justify-content-center">
            <button type="button" class="btn btn-sm btn-outline-danger mt-3" onclick="this.closest('.indicador-row').remove()" title="Eliminar indicador">
                <i class="bi bi-trash"></i>
            </button>
        </div>
        <!-- FILA DE VALORES DE REFERENCIA Y VARIACIONES POR SEXO / EDAD -->
        <div class="col-12 mt-1 pt-1 border-top">
            <div class="d-flex justify-content-between align-items-center mb-1 flex-wrap gap-1">
                <label class="form-label small text-primary mb-0 fw-bold">
                    <i class="bi bi-person-lines-fill me-1"></i>Valores de Referencia / Variaciones (Sexo, Edad, etc.):
                </label>
                <div class="btn-group btn-group-sm">
                    <button type="button" class="btn btn-outline-secondary py-0 px-2" style="font-size: 10px;" onclick="insertarPlantillaRef(this, 'sexo')" title="Plantilla rápida para Hombre y Mujer">
                        + Sexo (H/M)
                    </button>
                    <button type="button" class="btn btn-outline-secondary py-0 px-2" style="font-size: 10px;" onclick="insertarPlantillaRef(this, 'edad')" title="Plantilla rápida para Adulto, Niño y Neonato">
                        + Edad (Adulto/Niño/Neonato)
                    </button>
                    <button type="button" class="btn btn-outline-secondary py-0 px-2" style="font-size: 10px;" onclick="insertarPlantillaRef(this, 'generico')" title="Plantilla rápida">
                        + Rangos
                    </button>
                </div>
            </div>
            <input type="text" class="form-control form-control-sm ind-referencia bg-white" value="${escapeHTML(refVal)}" placeholder="Ej: Hombres: 0.70 - 1.30 | Mujeres: 0.60 - 1.10   ó   Adultos: 74 - 106 | Niños: 60 - 100 | Neonatos: 50 - 80">
        </div>
    `;
    contenedor.appendChild(div);
}

function vaciarTodosLosIndicadores() {
    const contenedor = document.getElementById("contenedor-indicadores");
    if (contenedor) contenedor.innerHTML = "";
}

function guardarExamenCatalogo() {
    const codigo = val("cat-codigo").trim();
    const codigoOriginal = val("cat-id-original").trim();
    const nombre = val("cat-nombre").trim();
    const precio = parseFloat(document.getElementById("cat-precio").value) || 0;
    const muestra = val("cat-muestra");
    const metodo = val("cat-metodo");
    const plantilla = val("cat-plantilla");
    const refTexto = val("cat-ref-texto");

    if (!codigo || !nombre) {
        alert("Complete el código y nombre del examen.");
        return;
    }

    const filas = document.querySelectorAll("#contenedor-indicadores .indicador-row");
    let plantillaPersonalizada = [];

    filas.forEach(fila => {
        const idInput = fila.querySelector(".ind-id").value.trim();
        const nombreParam = fila.querySelector(".ind-nombre").value.trim();
        const unidad = fila.querySelector(".ind-unidad").value.trim();
        const refMin = fila.querySelector(".ind-min").value;
        const refMax = fila.querySelector(".ind-max").value;
        const referenciaParam = fila.querySelector(".ind-referencia") ? fila.querySelector(".ind-referencia").value.trim() : "";
        const metodoParam = fila.querySelector(".ind-metodo").value.trim();

        if (nombreParam) {
            const idGenerado = idInput || nombreParam.toLowerCase().replace(/[^a-z0-9]/g, '_');
            plantillaPersonalizada.push({
                id: idGenerado,
                nombre: nombreParam,
                valor: "",
                unidad: unidad,
                refMin: refMin !== "" ? parseFloat(refMin) : "",
                refMax: refMax !== "" ? parseFloat(refMax) : "",
                referencia: referenciaParam,
                metodo: metodoParam
            });
        }
    });

    const nuevoEx = { 
        codigo, nombre, precio, muestra, metodo, plantilla, refTexto, plantillaPersonalizada, en: Date.now()
    };

    let index = -1;
    if (codigoOriginal && codigoOriginal !== codigo) {
        index = examenesCatalogo.findIndex(e => String(e.codigo) === String(codigoOriginal));
        if (typeof nubeEliminarExamen === "function") nubeEliminarExamen(codigoOriginal);
    }
    
    if (index === -1) index = examenesCatalogo.findIndex(e => String(e.codigo) === String(codigo));
    if (index >= 0) examenesCatalogo[index] = nuevoEx;
    else examenesCatalogo.push(nuevoEx);

    setVal("cat-id-original", "");
    renderizarTablaCatalogo();
    persistirDatos();
    window.nubeGuardarExamen?.(nuevoEx);
    alert("Examen y plantilla guardados en el catálogo correctamente.");
    prepararNuevoExamen();
}

function editarExamenCatalogo(codigo) {
    const ex = examenesCatalogo.find(e => String(e.codigo) === String(codigo));
    if (!ex) return;
    setVal("cat-codigo", ex.codigo);
    setVal("cat-id-original", ex.codigo);
    setVal("cat-nombre", ex.nombre);
    setVal("cat-precio", ex.precio || 0);
    setVal("cat-muestra", ex.muestra || "");
    setVal("cat-metodo", ex.metodo || "");
    setVal("cat-plantilla", ex.plantilla || "personalizada");
    setVal("cat-ref-texto", ex.refTexto || "");
    
    const titulo = document.getElementById("catalogo-form-titulo");
    if (titulo) titulo.innerHTML = `<i class="bi bi-pencil-square me-2"></i>Editar Examen: ${escapeHTML(ex.codigo)}`;

    vaciarTodosLosIndicadores();
    if (Array.isArray(ex.plantillaPersonalizada) && ex.plantillaPersonalizada.length > 0) {
        ex.plantillaPersonalizada.forEach(ind => {
            agregarIndicadorResultado(ind);
        });
    } else {
        const plantillaBase = obtenerPlantillaIndicadores(ex.nombre, ex.codigo);
        if (Array.isArray(plantillaBase)) {
            plantillaBase.forEach(ind => {
                if (!ind.esSeccion) agregarIndicadorResultado(ind);
            });
        }
    }
}

function eliminarExamenCatalogo(codigo) {
    if (!confirm(`¿Estás seguro de eliminar el examen con código ${codigo} del catálogo?`)) return;
    const idCodStr = String(codigo);
    if (!window.examenesEliminados) window.examenesEliminados = leerJSON("vital_examenes_eliminados", []);
    if (!window.examenesEliminados.includes(idCodStr)) {
        window.examenesEliminados.push(idCodStr);
        localStorage.setItem("vital_examenes_eliminados", JSON.stringify(window.examenesEliminados));
    }
    examenesCatalogo = examenesCatalogo.filter(e => String(e.codigo) !== idCodStr);
    persistirDatos();
    renderizarTablaCatalogo();
    if (typeof nubeEliminarExamen === "function") nubeEliminarExamen(idCodStr);
    alert("Examen eliminado del catálogo.");
}

// ==========================================
// CONTROL DE CAJA
// ==========================================
function actualizarTotalesCaja() {
    let totalHoy = 0, efectivo = 0, digital = 0;
    (cajaMovimientos || []).forEach(m => {
        const monto = Number(m.monto || 0);
        totalHoy += monto;
        if (m.metodoPago === "Efectivo") efectivo += monto;
        else digital += monto;
    });
    const setTxt = (id, txt) => { const el = document.getElementById(id); if (el) el.textContent = txt; };
    setTxt("caja-total-hoy", totalHoy.toFixed(2));
    setTxt("caja-efectivo", efectivo.toFixed(2));
    setTxt("caja-digital", digital.toFixed(2));

    const tbody = document.getElementById("caja-tabla-body");
    if (!tbody) return;
    tbody.innerHTML = "";
    
    if (!cajaMovimientos || cajaMovimientos.length === 0) {
        tbody.innerHTML = `<tr><td colspan="6" class="text-center text-muted py-3">No hay movimientos registrados hoy.</td></tr>`;
        return;
    }
    
    cajaMovimientos.forEach(m => {
        if (!m.id) m.id = 'mov_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5);
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${escapeHTML(m.hora)}</td>
            <td class="fw-bold">${escapeHTML(m.nroOrden)}</td>
            <td>${escapeHTML(m.paciente)}</td>
            <td><span class="badge bg-info text-dark">${escapeHTML(m.metodoPago)}</span></td>
            <td class="fw-bold text-success">S/ ${Number(m.monto || 0).toFixed(2)}</td>
            <td class="text-end">
                <button class="btn btn-sm btn-outline-danger" onclick="eliminarMovimientoCaja('${m.id}')" title="Eliminar movimiento">
                    <i class="bi bi-trash"></i>
                </button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

function eliminarMovimientoCaja(idMovimiento) {
    if (confirm("¿Deseas eliminar este movimiento de caja?")) {
        const idMovStr = String(idMovimiento);
        let eliminados = JSON.parse(localStorage.getItem("vital_caja_eliminados") || "[]");
        if (!eliminados.includes(idMovStr)) {
            eliminados.push(idMovStr);
            localStorage.setItem("vital_caja_eliminados", JSON.stringify(eliminados));
        }
        cajaMovimientos = cajaMovimientos.filter(m => String(m.id) !== idMovStr);
        persistirDatos();
        actualizarTotalesCaja();
        if (typeof nubeEliminarMovimiento === "function") nubeEliminarMovimiento(idMovStr);
    }
}

// ==========================================
// MÓDULO DE COTIZACIÓN
// ==========================================
function filtrarExamenesCotizacion(query) {
    const contenedor = document.getElementById("sugerencias-examenes-cotizacion");
    if (!contenedor) return;
    contenedor.innerHTML = "";
    if (!query || query.trim() === "") { contenedor.style.display = "none"; return; }

    const q = query.toLowerCase();
    const filtrados = examenesCatalogo.filter(ex =>
        String(ex.nombre || "").toLowerCase().includes(q) ||
        String(ex.codigo || "").toLowerCase().includes(q)
    ).slice(0, 60);

    if (filtrados.length === 0) { contenedor.style.display = "none"; return; }
    contenedor.style.display = "block";
    filtrados.forEach(ex => {
        const item = document.createElement("a");
        item.href = "#";
        item.className = "list-group-item list-group-item-action py-2";
        item.innerHTML = `<strong>${escapeHTML(ex.codigo)}</strong> - ${escapeHTML(ex.nombre)} <span class="float-end text-primary">S/ ${Number(ex.precio || 0).toFixed(2)}</span>`;
        item.onclick = (e) => {
            e.preventDefault();
            agregarExamenCotizacion(ex);
            const input = document.getElementById("busqueda-examen-cotizacion");
            if (input) input.value = "";
            contenedor.style.display = "none";
        };
        contenedor.appendChild(item);
    });
}

function agregarExamenCotizacion(ex) {
    const existente = listaCotizacionInd.find(i => i.codigo === ex.codigo);
    if (existente) existente.cantidad += 1;
    else listaCotizacionInd.push({ codigo: ex.codigo, nombre: ex.nombre, cantidad: 1, precio: Number(ex.precio || 0) });
    renderizarTablaCotizacion();
}

function cambiarCantidadCotizacion(codigo, nuevaCant) {
    const item = listaCotizacionInd.find(i => i.codigo === codigo);
    if (!item) return;
    item.cantidad = parseInt(nuevaCant) || 1;
    if (item.cantidad <= 0) item.cantidad = 1;
    renderizarTablaCotizacion();
}

function eliminarExamenCotizacion(codigo) {
    listaCotizacionInd = listaCotizacionInd.filter(i => i.codigo !== codigo);
    renderizarTablaCotizacion();
}

function renderizarTablaCotizacion() {
    const tabla = document.getElementById("tabla-cotizacion-independiente");
    if (!tabla) return;
    const tbody = tabla.querySelector("tbody");
    const totalEl = document.getElementById("total-cotizacion");
    tbody.innerHTML = "";

    if (listaCotizacionInd.length === 0) {
        tbody.innerHTML = `<tr id="empty-row-cotizacion"><td colspan="6" class="text-center text-muted py-4">No hay exámenes agregados para cotizar.</td></tr>`;
        if (totalEl) totalEl.textContent = "0.00";
        return;
    }
    let total = 0;
    listaCotizacionInd.forEach(item => {
        const importe = item.cantidad * item.precio;
        total += importe;
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${escapeHTML(item.codigo)}</td>
            <td>${escapeHTML(item.nombre)}</td>
            <td><input type="number" class="form-control form-control-sm" style="width:70px" value="${item.cantidad}" min="1" onchange="cambiarCantidadCotizacion('${item.codigo}', this.value)"></td>
            <td>S/ ${Number(item.precio).toFixed(2)}</td>
            <td>S/ ${importe.toFixed(2)}</td>
            <td class="text-center"><button type="button" class="btn btn-sm btn-outline-danger" onclick="eliminarExamenCotizacion('${item.codigo}')"><i class="bi bi-trash"></i></button></td>
        `;
        tbody.appendChild(tr);
    });
    if (totalEl) totalEl.textContent = total.toFixed(2);
}

function guardarCotizacion() {
    const nombres = val("nombres");
    if (!nombres) {
        alert("Por favor ingrese al menos el nombre del paciente para guardar la cotización.");
        return;
    }
    if (listaCotizacionInd.length === 0) {
        alert("Debe agregar al menos un examen para guardar la cotización.");
        return;
    }

    const total = listaCotizacionInd.reduce((a, i) => a + i.cantidad * i.precio, 0);
    const cotizacion = {
        id: currentCotizacionId || ("cot_" + Date.now()),
        nroCotizacion: currentCotizacionId
            ? ((window.cotizacionesGuardadas.find(c => c.id === currentCotizacionId) || {}).nroCotizacion || ("COT-" + String(Date.now()).slice(-4)))
            : ("COT-" + Math.floor(1000 + Math.random() * 9000)),
        fechaHora: new Date().toLocaleString(),
        convenio: val("tipo-convenio-cotizacion") || "Particular",
        paciente: {
            dni: val("dni"),
            nombres: nombres,
            medico: val("medico"),
            fechaNacimiento: val("fechaNacimiento"),
            edad: val("edad"),
            celular: val("celular"),
            sexo: val("sexo") || "MASCULINO"
        },
        examenes: listaCotizacionInd.map(i => ({ codigo: i.codigo, nombre: i.nombre, cantidad: i.cantidad, precio: i.precio, importe: i.cantidad * i.precio })),
        total
    };

    if (!window.cotizacionesGuardadas) window.cotizacionesGuardadas = [];
    const idx = window.cotizacionesGuardadas.findIndex(c => String(c.id) === String(cotizacion.id));
    if (idx >= 0) {
        cotizacion.nroCotizacion = window.cotizacionesGuardadas[idx].nroCotizacion || cotizacion.nroCotizacion;
        window.cotizacionesGuardadas[idx] = cotizacion;
        alert("¡Cotización actualizada con éxito!");
    } else {
        window.cotizacionesGuardadas.unshift(cotizacion);
        alert("¡Cotización guardada exitosamente!");
    }
    currentCotizacionId = cotizacion.id;

    persistirDatos();
    window.nubeGuardarCotizacion?.(cotizacion);
    setVal("input-buscar-cotizacion", "");
    cargarCotizaciones();
}

function cargarCotizaciones() {
    const lista = (window.cotizacionesGuardadas || []).map(normalizarCotizacion);
    lista.sort((a, b) => String(b.fechaHora).localeCompare(String(a.fechaHora)));
    renderizarTablaCotizaciones(lista);
}

function buscarCotizaciones() {
    const input = document.getElementById("input-buscar-cotizacion");
    const filtro = (input ? input.value : "").toLowerCase().trim();
    let lista = (window.cotizacionesGuardadas || []).map(normalizarCotizacion);
    if (filtro !== "") {
        lista = lista.filter(c =>
            String(c.nombre || "").toLowerCase().includes(filtro) ||
            String(c.dni || "").toLowerCase().includes(filtro) ||
            String(c.celular || "").toLowerCase().includes(filtro) ||
            String(c.nroCotizacion || "").toLowerCase().includes(filtro)
        );
    }
    lista.sort((a, b) => String(b.fechaHora).localeCompare(String(a.fechaHora)));
    renderizarTablaCotizaciones(lista);
}

function renderizarTablaCotizaciones(lista) {
    const tbody = document.getElementById("tabla-cotizaciones-body");
    if (!tbody) return;
    tbody.innerHTML = "";
    if (!lista || lista.length === 0) {
        tbody.innerHTML = `<tr><td colspan="5" class="text-center text-muted py-3">No se encontraron cotizaciones registradas.</td></tr>`;
        return;
    }
    lista.forEach(c => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td><strong>${escapeHTML(c.nroCotizacion || c.id)}</strong></td>
            <td><small>${escapeHTML(c.fechaHora || "")}</small></td>
            <td><strong>${escapeHTML(c.nombre || "N/A")}</strong><br><span class="text-muted small">DNI: ${escapeHTML(c.dni || "-")}</span></td>
            <td><strong>S/ ${Number(c.total || 0).toFixed(2)}</strong></td>
            <td class="text-center">
                <div class="btn-group btn-group-sm" role="group">
                    <button class="btn btn-outline-primary" title="Ver / Modificar" onclick="cargarCotizacion('${c.id}')"><i class="bi bi-pencil-square"></i></button>
                    <button class="btn btn-outline-info" title="Imprimir" onclick="imprimirCotizacionGuardada('${c.id}')"><i class="bi bi-printer"></i></button>
                    <button class="btn btn-outline-success" title="Pasar a Recepción" onclick="pasarCotizacionARecepcionDesde('${c.id}')"><i class="bi bi-arrow-right-circle"></i></button>
                    <button class="btn btn-outline-danger" title="Eliminar" onclick="eliminarCotizacion('${c.id}')"><i class="bi bi-trash"></i></button>
                </div>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

function buscarCotizacionPorId(id) {
    return (window.cotizacionesGuardadas || []).find(c => String(c.id) === String(id));
}

function cargarCotizacion(id) {
    const c = buscarCotizacionPorId(id);
    if (!c) return;
    const n = normalizarCotizacion(c);
    currentCotizacionId = n.id;

    setVal("dni", n.dni);
    setVal("nombres", n.nombre);
    setVal("medico", n.doctor);
    setVal("fechaNacimiento", n.fechaNacimiento);
    setVal("edad", n.edad);
    setVal("celular", n.celular);
    setVal("sexo", n.sexo || "MASCULINO");
    setVal("tipo-convenio-cotizacion", n.convenio || "Particular");

    listaCotizacionInd = (n.examenes || []).map(e => ({ codigo: e.codigo, nombre: e.nombre, cantidad: e.cantidad, precio: e.precio }));
    renderizarTablaCotizacion();
    window.scrollTo({ top: 0, behavior: "smooth" });
}

function eliminarCotizacion(id) {
    if (!confirm("¿Desea eliminar esta cotización guardada?")) return;
    const idCotStr = String(id);
    let eliminados = JSON.parse(localStorage.getItem("vital_cotizaciones_eliminadas") || "[]");
    if (!eliminados.includes(idCotStr)) {
        eliminados.push(idCotStr);
        localStorage.setItem("vital_cotizaciones_eliminadas", JSON.stringify(eliminados));
    }
    window.cotizacionesGuardadas = (window.cotizacionesGuardadas || []).filter(c => String(c.id) !== idCotStr);
    persistirDatos();
    cargarCotizaciones();
    if (typeof nubeEliminarCotizacion === "function") nubeEliminarCotizacion(idCotStr);
}

function pasarCotizacionARecepcion() {
    if (listaCotizacionInd.length === 0) {
        alert("No hay exámenes en la cotización para pasar a admisión.");
        return;
    }
    setVal("pac-dni", val("dni"));
    setVal("pac-nombre", val("nombres"));
    setVal("pac-doctor", val("medico"));
    setVal("pac-fnac", val("fechaNacimiento"));
    setVal("pac-celular", val("celular"));
    setVal("pac-sexo", val("sexo") || "MASCULINO");
    setVal("pac-edad", val("edad"));

    listaCotizacionInd.forEach(item => {
        const existente = examenesSeleccionados.find(i => i.codigo === item.codigo);
        if (existente) existente.cantidad += item.cantidad;
        else {
            const catalogo = examenesCatalogo.find(c => c.codigo === item.codigo);
            examenesSeleccionados.push({
                codigo: item.codigo, nombre: item.nombre, cantidad: item.cantidad, precio: item.precio,
                unidad: catalogo ? catalogo.unidad || "" : "", referencia: catalogo ? catalogo.referencia || "" : ""
            });
        }
    });
    listaCotizacionInd = [];
    renderizarTablaCotizacion();
    renderizarTablaSeleccionados();
    showSection('recepcion');
    alert("Cotización pasada a admisión.");
}

function pasarCotizacionARecepcionDesde(id) {
    const c = buscarCotizacionPorId(id);
    if (!c) return;
    const n = normalizarCotizacion(c);
    setVal("pac-dni", n.dni);
    setVal("pac-nombre", n.nombre);
    setVal("pac-doctor", n.doctor);
    setVal("pac-fnac", n.fechaNacimiento);
    setVal("pac-celular", n.celular);
    setVal("pac-sexo", n.sexo || "MASCULINO");
    setVal("pac-edad", n.edad);

    examenesSeleccionados = (n.examenes || []).map(e => {
        const catalogo = examenesCatalogo.find(cat => cat.codigo === e.codigo);
        return {
            codigo: e.codigo, nombre: e.nombre, cantidad: e.cantidad, precio: e.precio,
            unidad: catalogo ? catalogo.unidad || "" : "", referencia: catalogo ? catalogo.referencia || "" : ""
        };
    });
    renderizarTablaSeleccionados();
    showSection('recepcion');
    alert(`Cotización ${n.nroCotizacion} transferida a Recepción.`);
}

function normalizarCotizacionParaTicket(c) {
    const n = normalizarCotizacion(c);
    return {
        id: n.id,
        nroCotizacion: n.nroCotizacion,
        fechaHora: n.fechaHora,
        convenio: n.convenio,
        paciente: {
            dni: n.dni, nombres: n.nombre, medico: n.doctor,
            fechaNacimiento: n.fechaNacimiento, edad: n.edad, celular: n.celular
        },
        examenes: n.examenes.map(e => ({ nombre: e.nombre, cantidad: e.cantidad, precioUnit: e.precio, importe: e.importe })),
        total: n.total
    };
}
function imprimirCotizacionGuardada(id) {
    const c = buscarCotizacionPorId(id);
    if (!c) return;
    mostrarTicketCotizacion(normalizarCotizacionParaTicket(c));
}
function imprimirCotizacion() {
    if (listaCotizacionInd.length === 0) return;
    const cotActual = {
        id: currentCotizacionId || Date.now(),
        nroCotizacion: currentCotizacionId
            ? ((buscarCotizacionPorId(currentCotizacionId) || {}).nroCotizacion || ("COT-" + String(currentCotizacionId).slice(-4)))
            : "COT-" + Math.floor(1000 + Math.random() * 9000),
        fechaHora: new Date().toLocaleString(),
        convenio: val("tipo-convenio-cotizacion") || "Particular",
        paciente: {
            dni: val("dni"), nombres: val("nombres"), medico: val("medico"),
            fechaNacimiento: val("fechaNacimiento"), edad: val("edad"), celular: val("celular")
        },
        examenes: listaCotizacionInd.map(i => ({ nombre: i.nombre, cantidad: i.cantidad, precioUnit: i.precio, importe: i.cantidad * i.precio })),
        total: listaCotizacionInd.reduce((a, i) => a + i.cantidad * i.precio, 0)
    };
    mostrarTicketCotizacion(cotActual);
}

// ==========================================
// PACIENTES REGISTRADOS
// ==========================================
function cargarPacientes() {
    const lista = (window.pacientesRegistrados || []).map(normalizarPaciente);
    lista.sort((a, b) => String(b.ultimaAtencion || "").localeCompare(String(a.ultimaAtencion || "")));
    window.listaPacientesCache = lista;
    renderizarTablaPacientes(lista);
}

function renderizarTablaPacientes(pacientes) {
    const tbody = document.getElementById('lista-pacientes-body');
    if (!tbody) return;
    tbody.innerHTML = '';
    if (!pacientes || pacientes.length === 0) {
        tbody.innerHTML = `<tr><td colspan="7" class="text-center text-muted py-4">No se encontraron pacientes registrados.</td></tr>`;
        return;
    }
    pacientes.forEach(p => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td class="fw-bold">${escapeHTML(p.dni)}</td>
            <td>${escapeHTML(p.nombre)}</td>
            <td>${escapeHTML(p.celular || '-')}</td>
            <td>${escapeHTML(p.fnac || '-')}</td>
            <td>${escapeHTML(p.edad || '-')}</td>
            <td>${escapeHTML(p.sexo || '-')}</td>
            <td class="text-end px-3 text-nowrap">
                <button type="button" class="btn btn-sm btn-outline-primary me-1 btn-editar-paciente" title="Editar"><i class="bi bi-pencil-square"></i></button>
                <button type="button" class="btn btn-sm btn-outline-danger btn-eliminar-paciente" title="Eliminar"><i class="bi bi-trash3-fill"></i></button>
            </td>
        `;
        tr.querySelector('.btn-editar-paciente').addEventListener('click', () => abrirEditarPaciente(p.dni));
        tr.querySelector('.btn-eliminar-paciente').addEventListener('click', () => eliminarPaciente(p.dni));
        tbody.appendChild(tr);
    });
}

function filtrarPacientesTabla(filtro) {
    const cache = window.listaPacientesCache || [];
    const texto = (filtro || "").toLowerCase();
    const filtrados = cache.filter(p =>
        String(p.dni || "").toLowerCase().includes(texto) ||
        String(p.nombre || "").toLowerCase().includes(texto)
    );
    renderizarTablaPacientes(filtrados);
}

function abrirEditarPaciente(dni) {
    const pac = (window.listaPacientesCache || []).find(p => String(p.dni) === String(dni));
    if (!pac) return;
    setVal('edit-pac-original-dni', pac.dni);
    setVal('edit-pac-dni', pac.dni);
    setVal('edit-pac-nombre', pac.nombre);
    setVal('edit-pac-celular', pac.celular);
    setVal('edit-pac-sexo', pac.sexo || 'MASCULINO');
    setVal('edit-pac-fnac', pac.fnac);
    setVal('edit-pac-edad', pac.edad);
    const modalEl = document.getElementById('modalEditarPaciente');
    if (modalEl && window.bootstrap) bootstrap.Modal.getOrCreateInstance(modalEl).show();
}

function calcularEdadEdicion() {
    const fnac = val('edit-pac-fnac');
    if (!fnac) return;
    const edad = calcularEdadDesde(fnac);
    if (edad) setVal('edit-pac-edad', edad);
}

function guardarCambiosPaciente() {
    const dniOriginal = val('edit-pac-original-dni');
    const nuevoDni = val('edit-pac-dni');
    const nuevoNombre = val('edit-pac-nombre');
    const nuevoCelular = val('edit-pac-celular');
    const nuevoSexo = val('edit-pac-sexo');
    const nuevaFnac = val('edit-pac-fnac');
    const nuevaEdad = val('edit-pac-edad');

    if (!nuevoDni || !nuevoNombre) {
        alert('El DNI y el Nombre son obligatorios.');
        return;
    }

    const pac = (window.pacientesRegistrados || []).find(p => String(p.dni) === String(dniOriginal));
    if (pac) {
        pac.dni = nuevoDni; pac.nombre = nuevoNombre; pac.celular = nuevoCelular;
        pac.sexo = nuevoSexo; pac.fnac = nuevaFnac; pac.edad = nuevaEdad;
        window.nubeGuardarPaciente?.(pac);
    } else {
        upsertPaciente({ dni: nuevoDni, nombre: nuevoNombre, celular: nuevoCelular, sexo: nuevoSexo, fnac: nuevaFnac, edad: nuevaEdad });
    }

    (ordenesRegistradas || []).forEach(o => {
        if (String(o.dni) === String(dniOriginal)) {
            o.dni = nuevoDni; o.nombre = nuevoNombre; o.celular = nuevoCelular;
            o.sexo = nuevoSexo; o.fechaNacimiento = nuevaFnac; o.edad = nuevaEdad;
            window.nubeGuardarOrden?.(o);
        }
    });

    persistirDatos();
    const modalEl = document.getElementById('modalEditarPaciente');
    if (modalEl && window.bootstrap) bootstrap.Modal.getInstance(modalEl)?.hide();
    cargarPacientes();
    cargarOrdenes();
    alert('Datos del paciente actualizados correctamente.');
}

function eliminarPaciente(dni) {
    const lista = window.pacientesRegistrados || [];
    const indice = lista.findIndex(p => String(p.dni) === String(dni));
    if (indice === -1) return;
    const pac = normalizarPaciente(lista[indice]);
    if (!confirm(`¿Eliminar al paciente ${pac.nombre} (${pac.dni})?`)) return;

    lista.splice(indice, 1);
    window.pacientesRegistrados = lista;
    marcarPacienteEliminado(pac.dni);
    if (typeof window.nubeEliminarPaciente === "function") window.nubeEliminarPaciente(pac);

    persistirDatos();
    cargarPacientes();
}

// ==========================================
// TICKETS TÉRMICOS 58mm
// ==========================================
function construirTicketHTML(orden) {
    const fechaHora = String(orden.fechaHora || "").split(", ");
    const fecha = fechaHora[0] || "";
    const hora = fechaHora[1] || "";
    const datoCelular = orden.celular ? `<div class="t-row"><span>Celular:</span><span>${escapeHTML(orden.celular)}</span></div>` : '';

    let lineas = "";
    orden.examenes.forEach(item => {
        const importe = item.cantidad * item.precio;
        lineas += `
            <div class="t-item">
                <span class="t-cant">${item.cantidad} x</span>
                <span class="t-desc">${escapeHTML(item.nombre)}</span>
                <span class="t-importe">${importe.toFixed(2)}</span>
            </div>
        `;
    });

    const datoExtra = orden.doctor ? `<div class="t-row"><span>Médico:</span><span>${escapeHTML(orden.doctor)}</span></div>` : "";
    let fechaNac = orden.fechaNacimiento || orden.fnac || "-";
    const textoEdad = orden.edad ? String(orden.edad).trim() : "-";

    return `
        <div class="ticket-contenido">
            <img src="logo.png" alt="" class="t-logo" onerror="this.style.display='none'">
            <div class="t-centro t-negrita t-titulo">CENTRO MEDICO</div>
            <div class="t-centro t-negrita t-titulo">VITAL HEALTH</div>
            <div class="t-centro">Laboratorio Clínico</div>
            <div class="t-centro t-dato">Av. Grau N° 1799 - Veintiséis de Octubre</div>
            <div class="t-centro t-dato">WhatsApp: 984 089 927</div>
            <div class="t-linea-doble"></div>
            <div class="t-centro t-negrita t-subtitulo">TICKET DE VENTA</div>
            <div class="t-centro t-dato">${escapeHTML(orden.nroOrden)}</div>
            <div class="t-linea"></div>
            <div class="t-row"><span>Fecha:</span><span>${escapeHTML(fecha)}</span></div>
            <div class="t-row"><span>Hora:</span><span>${escapeHTML(hora)}</span></div>
            <div class="t-row"><span>Paciente:</span><span>${escapeHTML(orden.nombre)}</span></div>
            <div class="t-row"><span>DNI:</span><span>${escapeHTML(orden.dni)}</span></div>
            <div class="t-row"><span>F. Nac:</span><span>${escapeHTML(fechaNac)}</span></div>
            <div class="t-row"><span>Edad:</span><span>${escapeHTML(textoEdad)}</span></div>
            ${datoCelular}
            ${datoExtra}
            <div class="t-linea"></div>
            <div class="t-cabecera-items t-negrita"><span>CANT</span><span>DESCRIPCION</span><span>IMPORTE</span></div>
            <div class="t-linea"></div>
            ${lineas}
            <div class="t-linea"></div>
            <div class="t-row t-negrita t-total"><span>TOTAL S/</span><span>${Number(orden.total).toFixed(2)}</span></div>
            <div class="t-row"><span>Pago:</span><span>${escapeHTML(orden.metodoPago)}</span></div>
            <div class="t-linea-doble"></div>
            <div class="t-centro t-obs">¡Gracias por su preferencia!</div>
            <div class="t-centro t-obs">Conserve este ticket para recoger sus resultados</div>
        </div>
    `;
}

function mostrarTicket(orden) {
    const html = construirTicketHTML(orden);
    window._ticketActual = orden;
    const cuerpo = document.getElementById("modal-ticket-body");
    if (cuerpo) cuerpo.innerHTML = `<div class="ticket-visual">${html}</div>`;
    const titulo = document.getElementById("modal-ticket-titulo");
    if (titulo) titulo.innerHTML = `<i class="bi bi-receipt-cutoff me-1"></i>Ticket ${escapeHTML(orden.nroOrden)} (58 mm)`;
    const zona = document.getElementById("zona-impresion");
    if (zona) zona.innerHTML = `<div class="ticket-print">${html}</div>`;

    const modalEl = document.getElementById("modalTicket");
    if (modalEl && window.bootstrap) bootstrap.Modal.getOrCreateInstance(modalEl).show();
}

function mostrarTicketPorNro(nroOrden) {
    const orden = (ordenesRegistradas || []).find(o => o.nroOrden === nroOrden);
    if (orden) mostrarTicket(orden);
}

function construirTicketCotizacionHTML(cot) {
    const fechaHora = String(cot.fechaHora || new Date().toLocaleString()).split(", ");
    const fecha = fechaHora[0] || "";
    const hora = fechaHora[1] || "";
    const pac = cot.paciente || {};
    const datoCelular = pac.celular ? `<div class="t-row"><span>Celular:</span><span>${escapeHTML(pac.celular)}</span></div>` : '';
    const datoExtra = pac.medico ? `<div class="t-row"><span>Médico:</span><span>${escapeHTML(pac.medico)}</span></div>` : "";

    let lineas = "";
    (cot.examenes || []).forEach(item => {
        let precioNum = parseFloat(String(item.precioUnit || item.precio || "0").replace('S/', '').trim()) || 0;
        let cantNum = parseFloat(item.cantidad) || 1;
        const importe = cantNum * precioNum;
        lineas += `
            <div class="t-item">
                <span class="t-cant">${cantNum} x</span>
                <span class="t-desc">${escapeHTML(item.nombre)}</span>
                <span class="t-importe">${importe.toFixed(2)}</span>
            </div>
        `;
    });

    return `
        <div class="ticket-contenido">
            <img src="logo.png" alt="" class="t-logo" onerror="this.style.display='none'">
            <div class="t-centro t-negrita t-titulo">CENTRO MEDICO</div>
            <div class="t-centro t-negrita t-titulo">VITAL HEALTH</div>
            <div class="t-centro">Laboratorio Clínico</div>
            <div class="t-centro t-dato">Av. Grau N° 1799 - Veintiséis de Octubre</div>
            <div class="t-centro t-dato">WhatsApp: 984 089 927</div>
            <div class="t-linea-doble"></div>
            <div class="t-centro t-negrita t-subtitulo">COTIZACIÓN DE EXÁMENES</div>
            <div class="t-centro t-dato">Nro: ${escapeHTML(String(cot.nroCotizacion || cot.id))}</div>
            <div class="t-linea"></div>
            <div class="t-row"><span>Fecha:</span><span>${escapeHTML(fecha)}</span></div>
            <div class="t-row"><span>Hora:</span><span>${escapeHTML(hora)}</span></div>
            <div class="t-row"><span>Paciente:</span><span>${escapeHTML(pac.nombres || 'Cliente General')}</span></div>
            <div class="t-row"><span>DNI:</span><span>${escapeHTML(pac.dni || '-')}</span></div>
            <div class="t-row"><span>Edad:</span><span>${escapeHTML(pac.edad || '-')}</span></div>
            ${datoCelular}
            ${datoExtra}
            <div class="t-linea"></div>
            <div class="t-cabecera-items t-negrita"><span>CANT</span><span>DESCRIPCION</span><span>IMPORTE</span></div>
            <div class="t-linea"></div>
            ${lineas}
            <div class="t-linea"></div>
            <div class="t-row t-negrita t-total"><span>TOTAL S/</span><span>${Number(cot.total || 0).toFixed(2)}</span></div>
            <div class="t-row"><span>Tipo:</span><span>${escapeHTML(cot.convenio || 'Particular')}</span></div>
            <div class="t-linea-doble"></div>
            <div class="t-centro t-negrita" style="font-size: 10px;">¡VALIDEZ: 7 DÍAS!</div>
        </div>
    `;
}

function mostrarTicketCotizacion(cot) {
    const html = construirTicketCotizacionHTML(cot);
    window._cotizacionActual = cot;
    const cuerpo = document.getElementById("modal-ticket-body");
    if (cuerpo) cuerpo.innerHTML = `<div class="ticket-visual">${html}</div>`;
    const titulo = document.getElementById("modal-ticket-titulo");
    if (titulo) titulo.innerHTML = `<i class="bi bi-file-earmark-text me-1"></i>Cotización ${escapeHTML(cot.nroCotizacion || cot.id)} (58 mm)`;
    const zona = document.getElementById("zona-impresion");
    if (zona) zona.innerHTML = `<div class="ticket-print">${html}</div>`;
    const modalEl = document.getElementById("modalTicket");
    if (modalEl && window.bootstrap) bootstrap.Modal.getOrCreateInstance(modalEl).show();
}

function descargarTicketPNG() {
    const nodo = document.querySelector("#modal-ticket-body .ticket-visual");
    const orden = window._ticketActual;
    if (!nodo || !orden) return;
    if (typeof window.html2canvas !== "function") return;
    window.html2canvas(nodo, { scale: 3, backgroundColor: "#ffffff", useCORS: true }).then(canvas => {
        const enlace = document.createElement("a");
        enlace.download = `Ticket-${orden.nroOrden}.png`;
        enlace.href = canvas.toDataURL("image/png");
        enlace.click();
    });
}

function imprimirTicket() {
    const modalEl = document.getElementById("modalTicket");
    if (modalEl && window.bootstrap) bootstrap.Modal.getInstance(modalEl)?.hide();
    const zona = document.getElementById("zona-impresion");
    if (zona) esperarImagenes(zona).then(() => imprimirZona());
}

function imprimirZona() {
    document.body.classList.add("imprimiendo");
    const alTerminar = () => {
        document.body.classList.remove("imprimiendo");
        window.removeEventListener("afterprint", alTerminar);
    };
    window.addEventListener("afterprint", alTerminar);
    window.print();
}

// =========================================================================
// ESTRUCTURAS DEL INFORME CLÍNICO A4 (CABECERA, PACIENTE, EXÁMENES, PIE)
// =========================================================================

function construirCabeceraInformeHTML() {
    return `
        <div class="informe-cabecera" style="border-bottom: 1px solid #cbd5e1; padding-bottom: 6px; margin-bottom: 6px;">
            <div style="display: flex; align-items: center; justify-content: space-between; gap: 10px;">
                <div style="display: flex; align-items: center; gap: 12px;">
                    <img src="logo.png" alt="Centro Médico Vital Health" class="informe-logo" style="width: 70px; height: 70px; object-fit: contain;" onerror="this.style.display='none'">
                    <div>
                        <h1 style="font-size: 19px; margin: 0; letter-spacing: 2px; font-weight: 800; color: #0f172a;">CENTRO MEDICO VITAL HEALTH</h1>
                        <p style="margin: 1px 0; font-size: 9.5px; color: #475569;"><strong>Laboratorio clínico, comprometido con tu salud.</strong></p>
                    </div>
                </div>
                <div class="informe-qr-box" style="text-align: center;">
                    <img src="qr-redes.png" alt="QR de redes sociales" class="informe-qr" style="width: 76px; height: 76px; object-fit: contain;" onerror="this.parentNode.style.display='none'">
                    <div class="informe-qr-texto" style="font-size: 8.5px; font-weight: 700; color: #0f172a; margin-top: 1px;">¡Síguenos aquí!</div>
                </div>
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 4px; font-size: 9px; color: #334155;">
                <div>📍 Av. Grau N° 1799 - Veintiséis de Octubre</div>
                <div style="display: flex; gap: 14px;">
                    <span>📷 Vitalhealthlaboratorio</span>
                    <span>f Vital Health's Lab</span>
                </div>
            </div>
        </div>
    `;
}

function construirDatosPacienteInformeHTML(orden) {
    const fechaEmision = new Date().toLocaleDateString();
    const horaEmision = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    return `
        <div class="informe-titulo" style="text-align: center; color: #0072bc; font-weight: 800; font-size: 12px; letter-spacing: 2px; margin: 4px 0 8px 0;">INFORME DE RESULTADOS DE LABORATORIO</div>
        <div class="informe-datos">
            <div class="dato dato-ancho"><span class="dato-rotulo">Paciente</span><span class="dato-valor">${escapeHTML(orden.nombre)}</span></div>
            <div class="dato"><span class="dato-rotulo">DNI</span><span class="dato-valor">${escapeHTML(orden.dni)}</span></div>
            <div class="dato"><span class="dato-rotulo">Edad</span><span class="dato-valor">${escapeHTML(orden.edad || "—")}</span></div>
            <div class="dato"><span class="dato-rotulo">Sexo</span><span class="dato-valor">${escapeHTML(orden.sexo || "—")}</span></div>
            <div class="dato"><span class="dato-rotulo">Médico solicitante</span><span class="dato-valor">${escapeHTML(orden.doctor || "Particular")}</span></div>
            <div class="dato"><span class="dato-rotulo">N° de orden</span><span class="dato-valor">${escapeHTML(orden.nroOrden)}</span></div>
            <div class="dato"><span class="dato-rotulo">Fecha de informe</span><span class="dato-valor">${fechaEmision} ${horaEmision}</span></div>
            <div class="dato"><span class="dato-rotulo">Exámenes incluidos</span><span class="dato-valor">${(orden.resultados || orden.examenes || []).length}</span></div>
        </div>
    `;
}

function construirPieInformeHTML(numPagina, totalPaginas) {
    const textoPaginacion = (numPagina && totalPaginas) ? `<div style="text-align: center; font-size: 8px; color: #64748b; margin-top: 2px;">Página ${numPagina} de ${totalPaginas}</div>` : '';
    return `
        <div class="informe-pie-fijo" style="border-top: 1px solid #0072bc; margin-top: 8px; padding-top: 4px;">
            <div style="display: flex; justify-content: space-between; align-items: center; padding: 0 4px; font-size: 9px; color: #000;">
                <div style="display: flex; align-items: center; gap: 4px;">
                    <span style="font-size: 11px;">🟢</span> <strong style="font-size: 9.5px; color: #0f172a;">984 089 927</strong>
                </div>
                <div style="display: flex; align-items: center; gap: 4px;">
                    <span style="font-size: 11px;">🏠</span> <strong style="font-size: 9.5px; color: #0f172a;">SERVICIO A DOMICILIO</strong>
                </div>
                <div style="font-weight: 700; font-style: italic; font-size: 8.5px; color: #0f172a;">
                    “ANÁLISIS DE CALIDAD PARA EL CUIDADO DE TU SALUD”
                </div>
            </div>
            ${textoPaginacion}
        </div>
    `;
}

function construirFirmaInformeHTML(nota = "Ninguna.") {
    return `
        <div class="bloque-firma-completo" style="page-break-inside: avoid; break-inside: avoid; margin-top: 12px;">
            <div class="informe-nota" style="font-size: 9px; font-style: italic; color: #64748b; margin-bottom: 8px;">Nota: ${escapeHTML(nota)}</div>
            <div class="informe-firma" style="text-align: center;">
                <img src="firma-biologa.png" alt="Firma" class="informe-firma-img" style="height: 100px; object-fit: contain; display: block; margin: 0 auto 2px auto;" onerror="this.style.display='none'">
                <div class="informe-firma-linea" style="width: 250px; border-top: 1.5px solid #0f172a; margin: 0 auto 3px auto;"></div>
                <div class="informe-firma-nombre" style="font-weight: 700; font-size: 11px; color: #0f172a;">Raysa Yadira Ursula Alberca Atarama</div>
                <div class="informe-firma-det" style="font-size: 9px; color: #475569;">Bióloga</div>
                <div class="informe-firma-det" style="font-size: 9px; color: #475569;">C.B.P.17763</div>
            </div>
        </div>
    `;
}

function generarBloqueExamenHTML(ex, orden) {
    const itemCatalogo = (typeof examenesCatalogo !== 'undefined' ? examenesCatalogo : []).find(c => c.codigo === ex.codigo);
    const nombreLimpioExamen = itemCatalogo && itemCatalogo.nombre ? itemCatalogo.nombre : ex.nombre;
    const plantilla = obtenerIndicadoresParaOrden(ex);
    const guardado = (orden.resultados || []).find(r => r.codigo === ex.codigo);

    // Evitar contaminación si el examen tenía accidentalmente indicadores de orina guardados en el pasado
    const teniaPlantillaOrinaErronea = (!plantilla || plantilla.length === 0) && guardado && Array.isArray(guardado.indicadores) &&
        guardado.indicadores.some(i => i.nombre === "Urobilinógeno" || i.nombre === "Ácido Ascórbico" || i.nombre === "Recuento Bacteriano");

    let listaIndicadores = [];
    if (plantilla && plantilla.length > 0) {
        listaIndicadores = plantilla;
    } else if (guardado && Array.isArray(guardado.indicadores) && guardado.indicadores.length > 0 && !teniaPlantillaOrinaErronea) {
        listaIndicadores = guardado.indicadores;
    } else {
        listaIndicadores = [{
            nombre: nombreLimpioExamen || "Resultado del análisis",
            unidad: ex.unidad || (itemCatalogo && itemCatalogo.unidad) || "",
            refMin: ex.refMin ?? (itemCatalogo && itemCatalogo.refMin !== undefined ? itemCatalogo.refMin : ""),
            refMax: ex.refMax ?? (itemCatalogo && itemCatalogo.refMax !== undefined ? itemCatalogo.refMax : ""),
            referencia: ex.referencia || (itemCatalogo && itemCatalogo.referencia) || "",
            metodo: ex.metodo || (itemCatalogo && itemCatalogo.metodo) || ""
        }];
    }

    let filasHTML = '';
    if (listaIndicadores && listaIndicadores.length > 0) {
        listaIndicadores.forEach((ind, indIdx) => {
            if (ind.esSeccion) {
                filasHTML += `
                    <tr class="seccion-fila">
                        <td colspan="4" style="background-color: #e2e8f0; font-weight: bold; color: #0f172a; padding: 4px 6px; font-size: 10.5px;">
                            ${escapeHTML(ind.nombre)}
                        </td>
                    </tr>
                `;
                return;
            }
            const previo = guardado && guardado.indicadores && guardado.indicadores[indIdx] ? guardado.indicadores[indIdx] : null;
            const valorObtenido = ind.resultado !== undefined && ind.resultado !== "" ? ind.resultado : (previo ? previo.resultado : '');
            const unidadVal = ind.unidad || (previo && previo.unidad) || '';
            const unidadTexto = unidadVal ? ` ${unidadVal}` : '';
            const referencia = (previo && previo.referencia !== undefined && previo.referencia !== "") 
                ? previo.referencia 
                : (ind.referencia || formatoRango(ind.refMin, ind.refMax) || '-');
            const textoMetodo = (ind.metodo || (previo && previo.metodo)) ? escapeHTML(ind.metodo || previo.metodo) : '-';

            filasHTML += `
                <tr style="border-bottom: 1px solid #e2e8f0;">
                    <td style="padding: 3.5px 6px; color: #334155; padding-left: 10px;">${escapeHTML(ind.nombre)}</td>
                    <td style="padding: 3.5px 6px; font-weight: bold; color: #0f172a;">${escapeHTML(valorObtenido)}${escapeHTML(unidadTexto)}</td>
                    <td style="padding: 3.5px 6px; color: #64748b; line-height: 1.35; font-size: 10px;">${formatearReferenciaParaInforme(referencia)}</td>
                    <td style="padding: 3.5px 6px; color: #64748b; font-style: italic; font-size: 9.5px;">${textoMetodo}</td>
                </tr>
            `;
        });
    } else {
        filasHTML += `
            <tr>
                <td colspan="4" style="padding: 6px; color: #64748b; text-align: center;">Sin parámetros configurados para este examen.</td>
            </tr>
        `;
    }

    return `
        <div class="examen-bloque" data-codigo="${escapeHTML(ex.codigo)}" style="margin-bottom: 12px; page-break-inside: avoid; break-inside: avoid;">
            <h3 style="background-color: #f1f5f9; padding: 5px 8px; font-size: 12.5px; color: #1e293b; border-left: 4px solid #2563eb; margin: 0 0 4px 0; font-weight: 700;">
                ${escapeHTML(nombreLimpioExamen)}
            </h3>
            <table class="informe-tabla" style="width: 100%; border-collapse: collapse; font-size: 10.5px; margin-bottom: 4px;">
                <thead>
                    <tr style="background-color: #f8fafc; border-bottom: 1.5px solid #0072bc;">
                        <th style="text-align: left; padding: 4px 6px; width: 35%; color: #475569; font-size: 8.5px; text-transform: uppercase;">Parámetro / Indicador</th>
                        <th style="text-align: left; padding: 4px 6px; width: 22%; color: #475569; font-size: 8.5px; text-transform: uppercase;">Resultado</th>
                        <th style="text-align: left; padding: 4px 6px; width: 23%; color: #475569; font-size: 8.5px; text-transform: uppercase;">Valores de Referencia</th>
                        <th style="text-align: left; padding: 4px 6px; width: 20%; color: #475569; font-size: 8.5px; text-transform: uppercase;">Método</th>
                    </tr>
                </thead>
                <tbody>
                    ${filasHTML}
                </tbody>
            </table>
        </div>
    `;
}

// Vista de impresión nativa (para Imprimir Informe / Ctrl + P)
function construirInformeHTML(orden) {
    const cabecera = construirCabeceraInformeHTML();
    const datos = construirDatosPacienteInformeHTML(orden);
    const examenesHTML = (orden.examenes || []).map(ex => generarBloqueExamenHTML(ex, orden)).join("");
    const firma = construirFirmaInformeHTML(orden.nota || "Ninguna.");
    const pie = construirPieInformeHTML();

    return `
        ${cabecera}
        ${datos}
        ${examenesHTML}
        ${firma}
        ${pie}
    `;
}

function imprimirInforme(nroOrden) {
    const orden = (ordenesRegistradas || []).find(o => o.nroOrden === nroOrden);
    if (!orden) return;
    if (!orden.resultados || !orden.resultados.length) {
        const guardado = guardarResultados(nroOrden, true);
        if (!guardado) {
            alert("Primero capture los resultados en el editor y guárdelos.");
            return;
        }
    }
    const zona = document.getElementById("zona-impresion");
    if (!zona) return;
    zona.innerHTML = `<div class="informe-print">${construirInformeHTML(orden)}</div>`;
    esperarImagenes(zona).then(() => imprimirZona());
}

function esperarImagenes(contenedor) {
    const imagenes = Array.from(contenedor.querySelectorAll("img"));
    return Promise.all(imagenes.map(img => {
        if (img.complete && img.naturalWidth > 0) return Promise.resolve();
        return new Promise(resolver => {
            img.addEventListener("load", resolver, { once: true });
            img.addEventListener("error", resolver, { once: true });
        });
    }));
}

// =========================================================================
// DESCARGA PROFESIONAL DE INFORME EN PDF (CON PAGINACIÓN INTELIGENTE A4)
// =========================================================================
async function descargarInformePDF(nroOrden) {
    const orden = (ordenesRegistradas || []).find(o => o.nroOrden === nroOrden);
    if (!orden) return;
    if (!orden.resultados || !orden.resultados.length) {
        const guardado = guardarResultados(nroOrden, true);
        if (!guardado) {
            alert("Primero capture los resultados en el editor y guárdelos.");
            return;
        }
    }
    if (typeof window.html2canvas !== "function" || !window.jspdf) {
        alert("No se pudo cargar la librería de PDF. Revise su conexión a internet y vuelva a intentar.");
        return;
    }

    // 1. Crear un contenedor invisible para medir con exactitud los elementos
    const medidor = document.createElement("div");
    medidor.style.position = "absolute";
    medidor.style.left = "-10000px";
    medidor.style.top = "0";
    medidor.style.width = "718px"; // Ancho útil dentro de la hoja A4 (794px - 76px de márgenes)
    medidor.style.fontFamily = "'Segoe UI', Arial, Helvetica, sans-serif";
    medidor.style.fontSize = "11px";
    medidor.style.color = "#1e293b";
    medidor.style.background = "#ffffff";
    document.body.appendChild(medidor);

    // Medir altura de la cabecera
    medidor.innerHTML = construirCabeceraInformeHTML();
    await esperarImagenes(medidor);
    const altoCabecera = medidor.offsetHeight;

    // Medir altura de los datos del paciente
    medidor.innerHTML = construirDatosPacienteInformeHTML(orden);
    const altoDatosPaciente = medidor.offsetHeight;

    // Medir altura de la firma y nota
    medidor.innerHTML = construirFirmaInformeHTML(orden.nota || "Ninguna.");
    await esperarImagenes(medidor);
    const altoFirma = medidor.offsetHeight;

    // Medir altura del pie de página
    medidor.innerHTML = construirPieInformeHTML(1, 1);
    const altoPie = medidor.offsetHeight;

    // Medir cada bloque de examen individualmente
    const examenes = orden.examenes || [];
    const bloquesExamenes = [];
    for (const ex of examenes) {
        const html = generarBloqueExamenHTML(ex, orden);
        medidor.innerHTML = html;
        const alto = medidor.offsetHeight;
        bloquesExamenes.push({ examen: ex, html, alto });
    }
    medidor.remove();

    // 2. Altura útil de una página A4 en px a 96DPI (1123px total)
    // Con padding superior e inferior de 55px y margen seguro para el pie fijo:
    const ALTO_PAGINA_TOTAL = 1123;
    const PADDING_V = 55;
    const ESPACIO_UTIL_MAX = ALTO_PAGINA_TOTAL - PADDING_V - altoPie - 15;

    // En Página 1: Cabecera + Datos del Paciente
    const altoFijoPagina1 = altoCabecera + altoDatosPaciente + 10;
    // En Páginas siguientes: Cabecera
    const altoFijoOtrasPaginas = altoCabecera + 10;

    // 3. Distribución inteligente de exámenes en páginas
    const paginas = [];
    let paginaActual = {
        esPrimera: true,
        elementosHTML: [],
        altoDisponible: ESPACIO_UTIL_MAX - altoFijoPagina1,
        altoUsado: 0
    };

    for (const item of bloquesExamenes) {
        if (paginaActual.altoUsado + item.alto <= paginaActual.altoDisponible) {
            paginaActual.elementosHTML.push(item.html);
            paginaActual.altoUsado += item.alto + 8;
        } else {
            if (paginaActual.elementosHTML.length > 0) {
                paginas.push(paginaActual);
            }
            paginaActual = {
                esPrimera: false,
                elementosHTML: [item.html],
                altoDisponible: ESPACIO_UTIL_MAX - altoFijoOtrasPaginas,
                altoUsado: item.alto + 8
            };
        }
    }

    // 4. Ubicar la firma: ¡ÚNICAMENTE al final de la última hoja!
    const espacioRestante = paginaActual.altoDisponible - paginaActual.altoUsado;
    if (espacioRestante >= altoFirma) {
        paginaActual.elementosHTML.push(construirFirmaInformeHTML(orden.nota || "Ninguna."));
        paginas.push(paginaActual);
    } else {
        paginas.push(paginaActual);
        paginas.push({
            esPrimera: false,
            elementosHTML: [construirFirmaInformeHTML(orden.nota || "Ninguna.")],
            altoDisponible: ESPACIO_UTIL_MAX - altoFijoOtrasPaginas,
            altoUsado: altoFirma
        });
    }

    const totalPaginas = paginas.length;

    // 5. Renderizar cada página A4 independiente y armar el PDF
    const contenedorPaginas = document.createElement("div");
    contenedorPaginas.style.position = "absolute";
    contenedorPaginas.style.left = "-10000px";
    contenedorPaginas.style.top = "0";
    document.body.appendChild(contenedorPaginas);

    try {
        const pdf = new window.jspdf.jsPDF("p", "mm", "a4");

        for (let i = 0; i < totalPaginas; i++) {
            const numPag = i + 1;
            const p = paginas[i];

            const paginaDiv = document.createElement("div");
            paginaDiv.className = "pagina-a4-pdf";
            paginaDiv.style.width = "794px";
            paginaDiv.style.height = "1123px";
            paginaDiv.style.padding = "25px 38px 20px 38px";
            paginaDiv.style.boxSizing = "border-box";
            paginaDiv.style.background = "#ffffff";
            paginaDiv.style.display = "flex";
            paginaDiv.style.flexDirection = "column";
            paginaDiv.style.justifyContent = "space-between";
            paginaDiv.style.overflow = "hidden";

            const cabeceraHTML = construirCabeceraInformeHTML();
            const datosHTML = p.esPrimera ? construirDatosPacienteInformeHTML(orden) : "";
            const cuerpoHTML = `<div class="pagina-cuerpo" style="flex: 1 1 auto;">${p.elementosHTML.join("")}</div>`;
            const pieHTML = `<div class="pagina-pie" style="flex: 0 0 auto; margin-top: auto;">${construirPieInformeHTML(numPag, totalPaginas)}</div>`;

            paginaDiv.innerHTML = `
                <div style="flex: 0 0 auto;">
                    ${cabeceraHTML}
                    ${datosHTML}
                </div>
                ${cuerpoHTML}
                ${pieHTML}
            `;

            contenedorPaginas.appendChild(paginaDiv);
            await esperarImagenes(paginaDiv);

            const canvas = await window.html2canvas(paginaDiv, {
                scale: 2,
                backgroundColor: "#ffffff",
                useCORS: true,
                logging: false
            });

            const imgData = canvas.toDataURL("image/jpeg", 0.96);
            if (i > 0) pdf.addPage();
            pdf.addImage(imgData, "JPEG", 0, 0, 210, 297);

            paginaDiv.remove();
        }

        pdf.save(`Informe-Resultados-${orden.nroOrden}.pdf`);
    } catch (err) {
        console.error("Error al generar PDF:", err);
        alert("Ocurrió un error al generar el PDF del informe.");
    } finally {
        contenedorPaginas.remove();
    }
}

// ==========================================
// INICIALIZACIÓN
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
    cargarDatosGuardados();
    reconciliarPacientesDesdeOrdenes();
    persistirDatos();

    actualizarFechaActual();
    crearBarraNavegacion();
    renderizarTablaCatalogo();
    cargarOrdenes();
    cargarPacientes();
    cargarCotizaciones();
    actualizarTotalesCaja();
    renderizarTablaSeleccionados();
    renderizarTablaCotizacion();
    showSection('recepcion');

    window.nubeIniciar?.();

    if (window.innerWidth > 991 && localStorage.getItem("vital_sidebar_colapsado") === "1") {
        document.getElementById("wrapper")?.classList.add("sidebar-colapsado");
    }
});

window.addEventListener("beforeunload", persistirDatos);
