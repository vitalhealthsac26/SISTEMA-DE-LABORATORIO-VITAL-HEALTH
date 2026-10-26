// ==========================================
// GESTIÓN DE LOGO Y FORMATOS DE MARCA
// ==========================================
function obtenerLogoSrc() {
    return localStorage.getItem("vital_logo_custom") || (typeof window !== "undefined" && window.VITAL_LOGO_BASE64) || "logo.png";
}

function cambiarLogoLaboratorio(event) {
    const file = event.target.files && event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function(e) {
        const base64 = e.target.result;
        try {
            localStorage.setItem("vital_logo_custom", base64);
            if (typeof window !== "undefined") window.VITAL_LOGO_CUSTOM = base64;
            const sideImg = document.getElementById("sidebar-logo-img");
            if (sideImg) sideImg.src = base64;
            if (window.nubeGuardarConfiguracion) {
                window.nubeGuardarConfiguracion({ logoBase64: base64 });
            }
            alert("Logo del Centro Médico actualizado con éxito en todos los formatos.");
        } catch (err) {
            console.error("Error al guardar logo:", err);
            alert("No se pudo guardar el logo en el almacenamiento local.");
        }
    };
    reader.readAsDataURL(file);
}
window.obtenerLogoSrc = obtenerLogoSrc;
window.cambiarLogoLaboratorio = cambiarLogoLaboratorio;

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
  { id: 't4_libre', nombre: 'Tiroxina Libre (FT4)', valor: '', unidad: 'ng/dL', refMin: 0.90, refMax: 1.70, referencia: 'Adultos: 0.90 - 1.70 | Niños: 4 a 30 días: 0.83 - 3.09 | 1 a 12 meses: 0.48 - 2.34 | 1 a 6 años: 0.65 - 1.75 | 7 a 11 años: 0.90 - 1.67 | 12 a 19 años: 0.93 - 1.60', metodo: 'Ensayo de electroquimioluminiscencia (ECLIA)' }
],
  "TSH ULTRASENSIBLE": [
  { id: 'tsh_ultrasensible', nombre: 'Hormona estimulante de tiroides ultrasensible (TSH us)', valor: '', unidad: 'uUI / mL', refMin: 0.27, refMax: 4.20, referencia: 'Adultos: 0.27 - 4.2 | Niños: 4 a 30 días: 0.43 - 16.0 | 1 a 12 meses: 0.62 - 8.0 | 1 a 6 años: 0.54 - 4.5 | 7 a 11 años: 0.66 - 4.14 | 12 a 19 años: 0.53 - 3.59', metodo: 'Ensayo de electroquimioluminiscencia (ECLIA)' }
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
  { id: 'pcr', nombre: 'Proteina C Reactiva - Cuantitativa', valor: '', unidad: 'mg/dL', refMin: 0, refMax: 10, referencia: 'Normal: Menor 10 | Leve a Moderado: 10.0 - 40.0 | Moderado a Severo: 40.0 - 200.0 | Severo: > 200.0', metodo: 'Inmunoturbidimetría' }
],

"PROTEINA C REACTIVA - CUANTITATIVA": [
  { id: 'pcr', nombre: 'Proteina C Reactiva - Cuantitativa', valor: '', unidad: 'mg/dL', refMin: 0, refMax: 10, referencia: 'Normal: Menor 10 | Leve a Moderado: 10.0 - 40.0 | Moderado a Severo: 40.0 - 200.0 | Severo: > 200.0', metodo: 'Inmunoturbidimetría' }
],

"PROTEINA C REACTIVA - CUANTITATIVO": [
  { id: 'pcr', nombre: 'Proteina C Reactiva - Cuantitativa', valor: '', unidad: 'mg/dL', refMin: 0, refMax: 10, referencia: 'Normal: Menor 10 | Leve a Moderado: 10.0 - 40.0 | Moderado a Severo: 40.0 - 200.0 | Severo: > 200.0', metodo: 'Inmunoturbidimetría' }
],

"PROTEINA C REACTIVA CUANTITATIVA": [
  { id: 'pcr', nombre: 'Proteina C Reactiva - Cuantitativa', valor: '', unidad: 'mg/dL', refMin: 0, refMax: 10, referencia: 'Normal: Menor 10 | Leve a Moderado: 10.0 - 40.0 | Moderado a Severo: 40.0 - 200.0 | Severo: > 200.0', metodo: 'Inmunoturbidimetría' }
],

"PROTEINA C REACTIVA CUANTITATIVO": [
  { id: 'pcr', nombre: 'Proteina C Reactiva - Cuantitativa', valor: '', unidad: 'mg/dL', refMin: 0, refMax: 10, referencia: 'Normal: Menor 10 | Leve a Moderado: 10.0 - 40.0 | Moderado a Severo: 40.0 - 200.0 | Severo: > 200.0', metodo: 'Inmunoturbidimetría' }
],

"PCR CUANTITATIVO": [
  { id: 'pcr', nombre: 'Proteina C Reactiva - Cuantitativa', valor: '', unidad: 'mg/dL', refMin: 0, refMax: 10, referencia: 'Normal: Menor 10 | Leve a Moderado: 10.0 - 40.0 | Moderado a Severo: 40.0 - 200.0 | Severo: > 200.0', metodo: 'Inmunoturbidimetría' }
],

"TIROXINA LIBRE (FT4)": [
  { id: 't4_libre', nombre: 'Tiroxina Libre (FT4)', valor: '', unidad: 'ng/dL', refMin: 0.90, refMax: 1.70, referencia: 'Adultos: 0.90 - 1.70 | Niños: 4 a 30 días: 0.83 - 3.09 | 1 a 12 meses: 0.48 - 2.34 | 1 a 6 años: 0.65 - 1.75 | 7 a 11 años: 0.90 - 1.67 | 12 a 19 años: 0.93 - 1.60', metodo: 'Ensayo de electroquimioluminiscencia (ECLIA)' }
],

"T4 LIBRE (TIROXINA LIBRE FT4)": [
  { id: 't4_libre', nombre: 'Tiroxina Libre (FT4)', valor: '', unidad: 'ng/dL', refMin: 0.90, refMax: 1.70, referencia: 'Adultos: 0.90 - 1.70 | Niños: 4 a 30 días: 0.83 - 3.09 | 1 a 12 meses: 0.48 - 2.34 | 1 a 6 años: 0.65 - 1.75 | 7 a 11 años: 0.90 - 1.67 | 12 a 19 años: 0.93 - 1.60', metodo: 'Ensayo de electroquimioluminiscencia (ECLIA)' }
],

"HORMONA ESTIMULANTE DE TIROIDES ULTRASENSIBLE (TSH US)": [
  { id: 'tsh_ultrasensible', nombre: 'Hormona estimulante de tiroides ultrasensible (TSH us)', valor: '', unidad: 'uUI / mL', refMin: 0.27, refMax: 4.20, referencia: 'Adultos: 0.27 - 4.2 | Niños: 4 a 30 días: 0.43 - 16.0 | 1 a 12 meses: 0.62 - 8.0 | 1 a 6 años: 0.54 - 4.5 | 7 a 11 años: 0.66 - 4.14 | 12 a 19 años: 0.53 - 3.59', metodo: 'Ensayo de electroquimioluminiscencia (ECLIA)' }
],

"VELOCIDAD DE SEDIMENTACION GLOBULAR": [
  { nombre: "Sangre", esSeccion: true },
  { id: 'vsg', nombre: '(VSG) Velocidad de Sedimentación Globular', valor: '', unidad: 'mm/h', refMin: 0, refMax: 30, referencia: '0 - 30 mm/h' }
],

"DENGUE IGG / IGM": [
  { id: 'igg', nombre: 'Banda IgG', valor: '', unidad: 'S/U', referencia: 'No Reactivo' },
  { id: 'igm', nombre: 'Banda IgM', valor: '', unidad: 'S/U', referencia: 'No Reactivo' }
],


"PRUEBA DE PATERNIDAD LEGAL": [
  // --- IDENTIFICACIÓN DEL CASO Y MUESTRAS ---
  { nombre: "Datos del Caso y Participantes", esSeccion: true },
  { id: 'codigo_caso', nombre: 'Código de caso', valor: 'PAV-2610', unidad: '', metodo: '-' },
  { id: 'fecha_atencion', nombre: 'Fecha de atención', valor: '13/10/26', unidad: '', referencia: 'Fecha de toma', metodo: '-' },
  { id: 'fecha_emision', nombre: 'Fecha de emisión', valor: '26/10/26', unidad: '', referencia: 'Fecha de informe', metodo: '-' },
  { id: 'tecnologia', nombre: 'Metodología / Plataforma', valor: 'Análisis realizado con el Spectrum Compact CE System / VersaPlex™ 27PY System / GeneMarker®HID Software', unidad: '', referencia: 'Plataforma de alta resolución', metodo: 'PCR Multiplex / Electroforesis Capilar' },
  { id: 'caso_titulo', nombre: 'Caso / Referencia', valor: 'PAT-2610', unidad: '', referencia: 'Nro de Caso', metodo: '-' },
  { id: 'madre_nombre', nombre: 'Nombre MADRE BIOLÓGICA', valor: 'ESTRELLA LUCERO CASTRO ALFARO', unidad: '', referencia: 'Madre evaluada', metodo: '-' },
  { id: 'madre_tipo_muestra', nombre: 'Tipo de muestra MADRE', valor: 'Bucal / Sangre', unidad: '', referencia: 'Hisopado Bucal / Sangre', metodo: '-' },
  { id: 'madre_prueba_nro', nombre: 'Prueba N° MADRE', valor: '2610-10', unidad: '', referencia: 'Identificador muestra', metodo: '-' },
  { id: 'menor_nombre', nombre: 'Nombre MENOR', valor: 'AITANA LUCERO', unidad: '', referencia: 'Hijo(a) evaluado(a)', metodo: '-' },
  { id: 'menor_cui', nombre: 'CUI / DNI MENOR', valor: 'CUI:94778406', unidad: '', referencia: 'CUI o DNI del menor', metodo: '-' },
  { id: 'menor_tipo_muestra', nombre: 'Tipo de muestra MENOR', valor: 'Bucal / Sangre', unidad: '', referencia: 'Hisopado Bucal / Sangre', metodo: '-' },
  { id: 'menor_prueba_nro', nombre: 'Prueba N° MENOR', valor: '2610-20', unidad: '', referencia: 'Identificador muestra', metodo: '-' },
  { id: 'padre_nombre', nombre: 'Nombre PRESUNTO PADRE', valor: 'DIONEL GOMEZ PEÑA', unidad: '', referencia: 'Presunto Padre evaluado', metodo: '-' },
  { id: 'padre_tipo_muestra', nombre: 'Tipo de muestra PRESUNTO PADRE', valor: 'Bucal / Sangre', unidad: '', referencia: 'Hisopado Bucal / Sangre', metodo: '-' },
  { id: 'padre_prueba_nro', nombre: 'Prueba N° PRESUNTO PADRE', valor: '2610-30', unidad: '', referencia: 'Identificador muestra', metodo: '-' },

  // --- CUADRO COMPARATIVO DE LOCI / STR (24 Loci del PDF) ---
  { nombre: "Cuadro Comparativo de Marcadores STR (24 Loci)", esSeccion: true },
  { id: 'loci_d3s1358', nombre: 'D3S1358', ip: '0.00', madre1: '15', madre2: '16', menor1: '15', menor2: '16', padre1: '14', padre2: '18', valor: '0.00 | M: 15, 16 | H: 15, 16 | P: 14, 18', referencia: 'Locus STR' },
  { id: 'loci_d1s1656', nombre: 'D1S1656', ip: '3.63', madre1: '14', madre2: '', menor1: '14', menor2: '15', padre1: '14', padre2: '15', valor: '3.63 | M: 14 | H: 14, 15 | P: 14, 15', referencia: 'Locus STR' },
  { id: 'loci_d2s441', nombre: 'D2S441', ip: '1.67', madre1: '10', madre2: '14', menor1: '11', menor2: '14', padre1: '10', padre2: '11', valor: '1.67 | M: 10, 14 | H: 11, 14 | P: 10, 11', referencia: 'Locus STR' },
  { id: 'loci_d10s1248', nombre: 'D10S1248', ip: '0.00', madre1: '15', madre2: '', menor1: '15', menor2: '', padre1: '13', padre2: '14', valor: '0.00 | M: 15 | H: 15 | P: 13, 14', referencia: 'Locus STR' },
  { id: 'loci_d13s317', nombre: 'D13S317', ip: '0.00', madre1: '9', madre2: '13', menor1: '9', menor2: '13', padre1: '11', padre2: '12', valor: '0.00 | M: 9, 13 | H: 9, 13 | P: 11, 12', referencia: 'Locus STR' },
  { id: 'loci_penta_e', nombre: 'Penta E', ip: '0.00', madre1: '14', madre2: '16', menor1: '5', menor2: '16', padre1: '12', padre2: '15', valor: '0.00 | M: 14, 16 | H: 5, 16 | P: 12, 15', referencia: 'Locus STR' },
  { id: 'loci_d16s539', nombre: 'D16S539', ip: '2.34', madre1: '10', madre2: '12', menor1: '10', menor2: '12', padre1: '10', padre2: '12', valor: '2.34 | M: 10, 12 | H: 10, 12 | P: 10, 12', referencia: 'Locus STR' },
  { id: 'loci_d18s51', nombre: 'D18S51', ip: '0.00', madre1: '14', madre2: '17', menor1: '15', menor2: '17', padre1: '16', padre2: '', valor: '0.00 | M: 14, 17 | H: 15, 17 | P: 16', referencia: 'Locus STR' },
  { id: 'loci_d2s1338', nombre: 'D2S1338', ip: '0.00', madre1: '17', madre2: '23', menor1: '23', menor2: '24', padre1: '17', padre2: '23', valor: '0.00 | M: 17, 23 | H: 23, 24 | P: 17, 23', referencia: 'Locus STR' },
  { id: 'loci_csf1po', nombre: 'CSF1PO', ip: '0.00', madre1: '12', madre2: '', menor1: '12', menor2: '13', padre1: '12', padre2: '', valor: '0.00 | M: 12 | H: 12, 13 | P: 12', referencia: 'Locus STR' },
  { id: 'loci_penta_d', nombre: 'Penta D', ip: '0.00', madre1: '11', madre2: '13', menor1: '11', menor2: '12', padre1: '10', padre2: '', valor: '0.00 | M: 11, 13 | H: 11, 12 | P: 10', referencia: 'Locus STR' },
  { id: 'loci_th01', nombre: 'TH01', ip: '0.00', madre1: '7', madre2: '', menor1: '6', menor2: '7', padre1: '7', padre2: '9.3', valor: '0.00 | M: 7 | H: 6, 7 | P: 7, 9.3', referencia: 'Locus STR' },
  { id: 'loci_vwa', nombre: 'vWA', ip: '2.03', madre1: '16', madre2: '', menor1: '16', menor2: '17', padre1: '16', padre2: '17', valor: '2.03 | M: 16 | H: 16, 17 | P: 16, 17', referencia: 'Locus STR' },
  { id: 'loci_d21s11', nombre: 'D21S11', ip: '0.00', madre1: '29', madre2: '31.2', menor1: '29', menor2: '33.2', padre1: '29', padre2: '32.2', valor: '0.00 | M: 29, 31.2 | H: 29, 33.2 | P: 29, 32.2', referencia: 'Locus STR' },
  { id: 'loci_d7s820', nombre: 'D7S820', ip: '0.00', madre1: '10', madre2: '', menor1: '10', menor2: '12', padre1: '11', padre2: '', valor: '0.00 | M: 10 | H: 10, 12 | P: 11', referencia: 'Locus STR' },
  { id: 'loci_d5s818', nombre: 'D5S818', ip: '0.00', madre1: '11', madre2: '', menor1: '11', menor2: '', padre1: '12', padre2: '', valor: '0.00 | M: 11 | H: 11 | P: 12', referencia: 'Locus STR' },
  { id: 'loci_tpox', nombre: 'TPOX', ip: '1.35', madre1: '8', madre2: '11', menor1: '8', menor2: '11', padre1: '8', padre2: '11', valor: '1.35 | M: 8, 11 | H: 8, 11 | P: 8, 11', referencia: 'Locus STR' },
  { id: 'loci_d8s1179', nombre: 'D8S1179', ip: '3.87', madre1: '11', madre2: '14', menor1: '12', menor2: '14', padre1: '12', padre2: '15', valor: '3.87 | M: 11, 14 | H: 12, 14 | P: 12, 15', referencia: 'Locus STR' },
  { id: 'loci_d12s391', nombre: 'D12S391', ip: '0.00', madre1: '19', madre2: '20', menor1: '19', menor2: '23', padre1: '18', padre2: '21', valor: '0.00 | M: 19, 20 | H: 19, 23 | P: 18, 21', referencia: 'Locus STR' },
  { id: 'loci_d19s433', nombre: 'D19S433', ip: '0.00', madre1: '13', madre2: '15.2', menor1: '12.2', menor2: '13', padre1: '13', padre2: '', valor: '0.00 | M: 13, 15.2 | H: 12.2, 13 | P: 13', referencia: 'Locus STR' },
  { id: 'loci_d6s1043', nombre: 'D6S1043', ip: '11.79', madre1: '14', madre2: '18', menor1: '18', menor2: '21.3', padre1: '12', padre2: '21.3', valor: '11.79 | M: 14, 18 | H: 18, 21.3 | P: 12, 21.3', referencia: 'Locus STR' },
  { id: 'loci_d22s1045', nombre: 'D22S1045', ip: '1.43', madre1: '16', madre2: '', menor1: '16', menor2: '', padre1: '15', padre2: '16', valor: '1.43 | M: 16 | H: 16 | P: 15, 16', referencia: 'Locus STR' },
  { id: 'loci_fga', nombre: 'FGA', ip: '0.00', madre1: '20', madre2: '22', menor1: '20', menor2: '21', padre1: '24', padre2: '27', valor: '0.00 | M: 20, 22 | H: 20, 21 | P: 24, 27', referencia: 'Locus STR' },
  { id: 'loci_amelogenina', nombre: 'Amelogenina', ip: '', madre1: 'X', madre2: '', menor1: 'X', menor2: '', padre1: 'X', padre2: 'Y', valor: 'M: X | H: X | P: X, Y', referencia: 'Marcador Sexual (X, Y)' },

  // --- INTERPRETACIÓN Y RESULTADOS GLOBALES ---
  { nombre: "Interpretación y Resultados Bioestadísticos Globales", esSeccion: true },
  { id: 'interpretacion', nombre: 'Interpretación Clínica', valor: 'El presunto padre es excluído como padre biológico del niño (a). Examinado (a). Esta conclusión es basada en los alelos no correspondientes observados en los loci listados con un IP igual a 0. Al presunto padre le faltan los marcadores genéticos que deben ser contrubuídos al niño (a) por el padre biológico. La probabilidad de paternidad es de 0%.', unidad: '', referencia: 'Texto de dictamen pericial', metodo: '-' },
  { id: 'ipc_acumulado', nombre: 'ÍNDICE DE PATERNIDAD ACUMULATIVO', valor: '0', unidad: '', referencia: 'IPC acumulativo Bayesiano', metodo: '-' },
  { id: 'probabilidad_acumulada', nombre: 'PROBABILIDAD DE PATERNIDAD ACUMULATIVA', valor: '0%', unidad: '%', referencia: 'Probabilidad Essen-Möller', metodo: '-' },
  { id: 'nota_laboratorio', nombre: 'Nota de procedencia de muestra', valor: 'Basado en las muestras recibidas de labotatorio VITAL HEALTH el cual provee los nombres de las partes probadas que aparecen en este reporte.', unidad: '', referencia: 'Constancia de recepción', metodo: '-' }
],

"PRUEBA DE PATERNIDAD INFORMATIVA": [
  // --- IDENTIFICACIÓN DEL CASO Y MUESTRAS ---
  { nombre: "Datos del Caso y Participantes", esSeccion: true },
  { id: 'codigo_caso', nombre: 'Código de caso', valor: 'PAV-2609', unidad: '', metodo: '-' },
  { id: 'fecha_atencion', nombre: 'Fecha de atención', valor: '', unidad: '', referencia: 'Fecha de toma', metodo: '-' },
  { id: 'fecha_emision', nombre: 'Fecha de emisión', valor: '', unidad: '', referencia: 'Fecha de informe', metodo: '-' },
  { id: 'tecnologia', nombre: 'Metodología / Plataforma', valor: 'Análisis realizado con el Spectrum Compact CE System / VersaPlex™ 27PY System / GeneMarker®HID Software', unidad: '', referencia: 'Plataforma de alta resolución', metodo: 'PCR Multiplex / Electroforesis Capilar' },
  { id: 'caso_titulo', nombre: 'Caso / Referencia', valor: 'PAV-2609', unidad: '', referencia: 'Nro de Caso', metodo: '-' },
  { id: 'menor_nombre', nombre: 'Nombre MENOR', valor: '', unidad: '', referencia: 'Hijo(a) evaluado(a)', metodo: '-' },
  { id: 'menor_tipo_muestra', nombre: 'Tipo de muestra MENOR', valor: 'Bucal', unidad: '', referencia: 'Hisopado Bucal', metodo: '-' },
  { id: 'menor_prueba_nro', nombre: 'Prueba N° MENOR', valor: '2609-20', unidad: '', referencia: 'Identificador muestra', metodo: '-' },
  { id: 'padre_nombre', nombre: 'Nombre PRESUNTO PADRE', valor: '', unidad: '', referencia: 'Presunto Padre evaluado', metodo: '-' },
  { id: 'padre_tipo_muestra', nombre: 'Tipo de muestra PRESUNTO PADRE', valor: 'Bucal', unidad: '', referencia: 'Hisopado Bucal', metodo: '-' },
  { id: 'padre_prueba_nro', nombre: 'Prueba N° PRESUNTO PADRE', valor: '2609-30', unidad: '', referencia: 'Identificador muestra', metodo: '-' },

  // --- CUADRO COMPARATIVO DE LOCI / STR (ORDEN EXACTO DEL PDF) ---
  { nombre: "Cuadro Comparativo de Marcadores STR (Loci / IP / Alelos)", esSeccion: true },
  { id: 'loci_d3s1358', nombre: 'D3S1358', ip: '1.55', menor1: '15', menor2: '', padre1: '15', padre2: '16', valor: '1.55 | M: 15 | P: 15, 16', referencia: 'Locus STR autosómico' },
  { id: 'loci_d1s1656', nombre: 'D1S1656', ip: '2.19', menor1: '13', menor2: '16', padre1: '13', padre2: '15', valor: '2.19 | M: 13, 16 | P: 13, 15', referencia: 'Locus STR autosómico' },
  { id: 'loci_d2s441', nombre: 'D2S441', ip: '2.97', menor1: '10', menor2: '', padre1: '10', padre2: '', valor: '2.97 | M: 10 | P: 10', referencia: 'Locus STR autosómico' },
  { id: 'loci_d10s1248', nombre: 'D10S1248', ip: '1.47', menor1: '14', menor2: '', padre1: '13', padre2: '14', valor: '1.47 | M: 14 | P: 13, 14', referencia: 'Locus STR autosómico' },
  { id: 'loci_d13s317', nombre: 'D13S317', ip: '4.25', menor1: '12', menor2: '', padre1: '12', padre2: '', valor: '4.25 | M: 12 | P: 12', referencia: 'Locus STR autosómico' },
  { id: 'loci_penta_e', nombre: 'Penta E', ip: '3.47', menor1: '14', menor2: '17', padre1: '13', padre2: '14', valor: '3.47 | M: 14, 17 | P: 13, 14', referencia: 'Locus STR autosómico' },
  { id: 'loci_d16s539', nombre: 'D16S539', ip: '3.78', menor1: '11', menor2: '', padre1: '11', padre2: '', valor: '3.78 | M: 11 | P: 11', referencia: 'Locus STR autosómico' },
  { id: 'loci_d18s51', nombre: 'D18S51', ip: '2.00', menor1: '14', menor2: '16', padre1: '13', padre2: '16', valor: '2.00 | M: 14, 16 | P: 13, 16', referencia: 'Locus STR autosómico' },
  { id: 'loci_d2s1338', nombre: 'D2S1338', ip: '2.59', menor1: '18', menor2: '19', padre1: '19', padre2: '', valor: '2.59 | M: 18, 19 | P: 19', referencia: 'Locus STR autosómico' },
  { id: 'loci_csf1po', nombre: 'CSF1PO', ip: '4.88', menor1: '12', menor2: '13', padre1: '12', padre2: '13', valor: '4.88 | M: 12, 13 | P: 12, 13', referencia: 'Locus STR autosómico' },
  { id: 'loci_penta_d', nombre: 'Penta D', ip: '1.61', menor1: '11', menor2: '12', padre1: '9', padre2: '11', valor: '1.61 | M: 11, 12 | P: 9, 11', referencia: 'Locus STR autosómico' },
  { id: 'loci_th01', nombre: 'TH01', ip: '2.09', menor1: '6', menor2: '9.3', padre1: '6', padre2: '', valor: '2.09 | M: 6, 9.3 | P: 6', referencia: 'Locus STR autosómico' },
  { id: 'loci_vwa', nombre: 'vWA', ip: '2.03', menor1: '16', menor2: '17', padre1: '17', padre2: '', valor: '2.03 | M: 16, 17 | P: 17', referencia: 'Locus STR autosómico' },
  { id: 'loci_d21s11', nombre: 'D21S11', ip: '7.37', menor1: '29', menor2: '33.2', padre1: '32.2', padre2: '33.2', valor: '7.37 | M: 29, 33.2 | P: 32.2, 33.2', referencia: 'Locus STR autosómico' },
  { id: 'loci_d7s820', nombre: 'D7S820', ip: '2.07', menor1: '8', menor2: '10', padre1: '8', padre2: '11', valor: '2.07 | M: 8, 10 | P: 8, 11', referencia: 'Locus STR autosómico' },
  { id: 'loci_d5s818', nombre: 'D5S818', ip: '1.48', menor1: '11', menor2: '12', padre1: '12', padre2: '', valor: '1.48 | M: 11, 12 | P: 12', referencia: 'Locus STR autosómico' },
  { id: 'loci_tpox', nombre: 'TPOX', ip: '1.03', menor1: '8', menor2: '', padre1: '8', padre2: '12', valor: '1.03 | M: 8 | P: 8, 12', referencia: 'Locus STR autosómico' },
  { id: 'loci_d8s1179', nombre: 'D8S1179', ip: '2.89', menor1: '12', menor2: '14', padre1: '12', padre2: '14', valor: '2.89 | M: 12, 14 | P: 12, 14', referencia: 'Locus STR autosómico' },
  { id: 'loci_d12s391', nombre: 'D12S391', ip: '2.23', menor1: '18', menor2: '21', padre1: '20', padre2: '21', valor: '2.23 | M: 18, 21 | P: 20, 21', referencia: 'Locus STR autosómico' },
  { id: 'loci_d19s433', nombre: 'D19S433', ip: '0.71', menor1: '12.2', menor2: '14', padre1: '14', padre2: '15', valor: '0.71 | M: 12.2, 14 | P: 14, 15', referencia: 'Locus STR autosómico' },
  { id: 'loci_d6s1043', nombre: 'D6S1043', ip: '19.69', menor1: '14', menor2: '22.3', padre1: '21.3', padre2: '22.3', valor: '19.69 | M: 14, 22.3 | P: 21.3, 22.3', referencia: 'Locus STR autosómico' },
  { id: 'loci_d22s1045', nombre: 'D22S1045', ip: '1.43', menor1: '16', menor2: '', padre1: '15', padre2: '16', valor: '1.43 | M: 16 | P: 15, 16', referencia: 'Locus STR autosómico' },
  { id: 'loci_fga', nombre: 'FGA', ip: '3.11', menor1: '19', menor2: '22', padre1: '19', padre2: '23', valor: '3.11 | M: 19, 22 | P: 19, 23', referencia: 'Locus STR autosómico' },
  { id: 'loci_amelogenina', nombre: 'Amelogenina', ip: '', menor1: 'X', menor2: '', padre1: 'X', padre2: 'Y', valor: 'M: X | P: X, Y', referencia: 'Marcador Sexual (X, Y)' },

  // --- INTERPRETACIÓN Y RESULTADOS GLOBALES ---
  { nombre: "Interpretación y Resultados Bioestadísticos Globales", esSeccion: true },
  { id: 'interpretacion', nombre: 'Interpretación Clínica', valor: 'El presunto padre no es excluído como el padre biológico del niño(a) examinado(a). Basándose en los resultados de los análisis obtenidos de los loci de ADN listados, la probabilidad de paternidad es de 99.99999992 %. Esta probabilidad de paternidad fue calculada en comparación con un individuo al azar de la población Hispanica , no analizados ni relacionados (asume una probabilidad previa igual a 0.50).', unidad: '', referencia: 'Texto de dictamen pericial', metodo: '-' },
  { id: 'ipc_acumulado', nombre: 'ÍNDICE DE PATERNIDAD ACUMULATIVO', valor: '1,321,629,527', unidad: '', referencia: 'IPC acumulativo Bayesiano', metodo: '-' },
  { id: 'probabilidad_acumulada', nombre: 'PROBABILIDAD DE PATERNIDAD ACUMULATIVA', valor: '99.99999992%', unidad: '%', referencia: 'Probabilidad Essen-Möller', metodo: '-' },
  { id: 'nota_laboratorio', nombre: 'Nota de procedencia de muestra', valor: 'Basado en las muestras recibidas de laboratorio VITAL HEALTH el cual provee los nombres de las partes probadas que aparecen en este reporte.', unidad: '', referencia: 'Constancia de recepción', metodo: '-' },
  { id: 'alcance_privado', nombre: 'Alcance del informe', valor: 'Informe de prueba de ADN - Solo para conocimiento propio. No tiene validez judicial ni pericial.', unidad: '', referencia: 'Uso estrictamente confidencial', metodo: '-' }
]
};

// ==========================================
// 1. TUS EXÁMENES DETALLADOS PRINCIPALES
// ==========================================
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
  { codigo: "1050", nombre: "UROCULTIVO Y ANTIBIOGRAMA", unidad: "", refMin: "", refMax: "", referencia: "Física, Microscópico, Cultivo y Antibiograma", precio: 35.00 },
  { codigo: "658", nombre: "T4 LIBRE (TIROXINA LIBRE FT4)", unidad: "ng/dL", refMin: 0.90, refMax: 1.70, referencia: "Adultos: 0.90 - 1.70...", metodo: "Ensayo de electroquimioluminiscencia (ECLIA)", precio: 45.00 },
  { codigo: "659", nombre: "TSH ULTRASENSIBLE", unidad: "uUI / mL", refMin: 0.27, refMax: 4.20, referencia: "Adultos: 0.27 - 4.2...", metodo: "Ensayo de electroquimioluminiscencia (ECLIA)", precio: 45.00 },
  { codigo: "750", nombre: "PROTEINA C REACTIVA - CUANTITATIVA", unidad: "mg/dL", refMin: 0, refMax: 10, referencia: "Normal: Menor 10...", metodo: "Inmunoturbidimetría", precio: 35.00 },
  { codigo: "935", nombre: "PRUEBA DE PATERNIDAD LEGAL", unidad: "", refMin: "", refMax: "", referencia: "Exclusión: 0% / Inclusión: > 99.999%", metodo: "Análisis realizado con el Spectrum Compact CE System / VersaPlex™ 27PY System / GeneMarker®HID Software", precio: 1200.00 },
  { codigo: "990", nombre: "PRUEBA DE PATERNIDAD INFORMATIVA", unidad: "", refMin: "", refMax: "", referencia: "Probabilidad: > 99.999%", metodo: "Extracción de ADN y PCR Multiplex...", precio: 750.00 }
];

// ==========================================
// 2. CARGA AUTOMÁTICA DESDE productos.json
// ==========================================
async function cargarProductosJson() {
    try {
        const respuesta = await fetch('productos.json');
        if (!respuesta.ok) throw new Error('No se pudo acceder a productos.json');
        
        const listaProductos = await respuesta.json();
        
        listaProductos.forEach(prod => {
            const codigoStr = String(prod.Codigo || "").trim();
            const nombreStr = String(prod.Nombre || "").trim();
            const precioNum = Number(prod.Precio || 0);

            if (codigoStr && nombreStr) {
                // Revisamos si ya existe en los 14 principales para no duplicarlo ni sobreescribir su configuración avanzada
                const yaExiste = examenesCatalogo.find(e => String(e.codigo) === codigoStr);
                
                if (!yaExiste) {
                    // Le inyectamos automáticamente las propiedades vacías o por defecto que necesita tu app
                    examenesCatalogo.push({
                        codigo: codigoStr,
                        nombre: nombreStr,
                        unidad: "",
                        refMin: "",
                        refMax: "",
                        referencia: "Según criterio clínico",
                        precio: precioNum
                    });
                }
            }
        });
        
        console.log(`✅ Catálogo unificado correctamente. Total de exámenes disponibles: ${examenesCatalogo.length}`);
        
    } catch (error) {
        console.error("❌ Error cargando el archivo productos.json:", error);
    }
}

// Ejecutamos la función de carga al iniciar la app
cargarProductosJson();

// ==========================================
// ESTADO GLOBAL EN MEMORIA (Tus variables actuales)
// ==========================================
let examenesSeleccionados = [];
let listaCotizacionInd = [];
let currentCotizacionId = null;

let ordenesRegistradas = JSON.parse(localStorage.getItem("vital_ordenes") || "[]");
let cajaMovimientos = JSON.parse(localStorage.getItem("vital_caja") || "[]");
window.pacientesRegistrados = JSON.parse(localStorage.getItem("vital_pacientes") || "[]");
window.cotizacionesGuardadas = JSON.parse(localStorage.getItem("vital_cotizaciones") || "[]");
window.ordenesRegistradas = ordenesRegistradas;
window.cajaMovimientos = cajaMovimientos;

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

// Resuelve siempre el nombre del examen tal como está configurado actualmente en el sistema / catálogo
function resolverNombreExamenCatalogo(item) {
    if (!item) return "";
    const cod = item.codigo != null ? String(item.codigo).trim() : "";
    const nomOriginal = item.nombre != null ? String(item.nombre).trim() : "";
    const catalogo = (typeof examenesCatalogo !== "undefined" && Array.isArray(examenesCatalogo)) ? examenesCatalogo : [];

    // 1. Búsqueda por código exacto
    if (cod) {
        const porCod = catalogo.find(c => String(c.codigo).trim() === cod);
        if (porCod && porCod.nombre) return porCod.nombre;
    }

    // 2. Búsqueda por nombre original normalizado en caso de que coincida con uno modificado
    if (nomOriginal) {
        const porNom = catalogo.find(c => String(c.nombre || "").trim().toUpperCase() === nomOriginal.toUpperCase());
        if (porNom && porNom.nombre) return porNom.nombre;
    }

    return nomOriginal || (cod ? `Examen (${cod})` : "Servicio de Laboratorio");
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
    const subtotal = c.subtotal != null ? numeroTexto(c.subtotal) : examenes.reduce((a, e) => a + (e.importe || 0), 0);
    const descuentoTipo = c.descuentoTipo === "S/" ? "S/" : "%";
    const descuentoValor = c.descuentoValor != null ? numeroTexto(c.descuentoValor) : 0;
    let montoDescuento = c.montoDescuento != null ? numeroTexto(c.montoDescuento) : 0;
    if (montoDescuento === 0 && descuentoValor > 0) {
        if (descuentoTipo === "%") {
            montoDescuento = (subtotal * Math.min(100, Math.max(0, descuentoValor))) / 100;
        } else {
            montoDescuento = Math.min(subtotal, Math.max(0, descuentoValor));
        }
    }
    const total = c.total != null ? numeroTexto(c.total) : Math.max(0, subtotal - montoDescuento);
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
        subtotal,
        descuentoTipo,
        descuentoValor,
        montoDescuento,
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
        subtotal: s.subtotal,
        descuentoTipo: s.descuentoTipo,
        descuentoValor: s.descuentoValor,
        montoDescuento: s.montoDescuento,
        total: s.total
    };
}

// ==========================================
// PERSISTENCIA AUTOMÁTICA
// ==========================================
function sincronizarGlobals() {
    window.ordenesRegistradas = ordenesRegistradas;
    window.cajaMovimientos = cajaMovimientos;
    window.examenesCatalogo = examenesCatalogo;
    window.mergePorClave = mergePorClave;
    window.persistirDatos = persistirDatos;
}
window.sincronizarGlobals = sincronizarGlobals;

function persistirDatos() {
    try {
        sincronizarGlobals();
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

    sincronizarGlobals();
    // Purgar inmediatamente cobros huérfanos o eliminados para que no reaparezcan
    if (typeof purgarMovimientosCajaInvalidos === "function") {
        purgarMovimientosCajaInvalidos(false);
    }

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

    sincronizarGlobals();
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
    if (sectionId === 'cotizacion') {
        cargarCotizaciones();
    } else if (sectionId === 'caja') {
        actualizarTotalesCaja();
    } else if (sectionId === 'ordenes') {
        cargarOrdenes();
    } else if (sectionId === 'pacientes') {
        cargarPacientes();
    }
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

function buscarPacienteCotizacion() {
    const dni = val("dni");
    if (dni.length < 8) {
        alert("Ingrese un DNI o documento válido de al menos 8 dígitos.");
        return;
    }
    const lista = (window.pacientesRegistrados || []).concat(window.listaPacientesCache || []);
    const pac = lista.map(normalizarPaciente).find(p => String(p.dni) === dni);
    if (!pac) {
        alert("No se encontró un paciente registrado con ese DNI en la base de datos.");
        return;
    }
    setVal("nombres", pac.nombre);
    setVal("celular", pac.celular);
    setVal("fechaNacimiento", pac.fnac);
    setVal("sexo", pac.sexo || "MASCULINO");
    if (pac.fnac) {
        setVal("edad", calcularEdadDesde(pac.fnac) || pac.edad);
    } else {
        setVal("edad", pac.edad);
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
    tbody.innerHTML = "";

    if (examenesSeleccionados.length === 0) {
        tbody.innerHTML = `<tr id="empty-row"><td colspan="6" class="text-center text-muted py-4">No hay exámenes agregados.</td></tr>`;
        const subtotalEl = document.getElementById("subtotal-cobrar");
        const totalEl = document.getElementById("total-cobrar");
        if (subtotalEl) subtotalEl.textContent = "0.00";
        if (totalEl) totalEl.textContent = "0.00";
        const inputACuenta = document.getElementById("orden-monto-acuenta");
        if (inputACuenta) {
            inputACuenta.value = "0.00";
            delete inputACuenta.dataset.modificadoManual;
        }
        actualizarCalculoSaldoNuevaOrden(false);
        return;
    }

    examenesSeleccionados.forEach(item => {
        const importe = item.cantidad * item.precio;
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

    actualizarCalculoDescuentoRecepcion();
}

function actualizarCalculoDescuentoRecepcion() {
    const subtotal = examenesSeleccionados.reduce((acc, item) => acc + (item.cantidad * item.precio), 0);
    const subtotalEl = document.getElementById("subtotal-cobrar");
    if (subtotalEl) subtotalEl.textContent = subtotal.toFixed(2);

    const tipoDescEl = document.getElementById("orden-descuento-tipo");
    const valDescEl = document.getElementById("orden-descuento-valor");
    const tipo = tipoDescEl ? tipoDescEl.value : "%";
    const valNum = valDescEl ? (parseFloat(valDescEl.value) || 0) : 0;

    let montoDescuento = 0;
    if (valNum > 0) {
        if (tipo === "%") {
            montoDescuento = subtotal * (valNum / 100);
        } else {
            montoDescuento = Math.min(subtotal, valNum);
        }
    }
    const totalNeto = Math.max(0, subtotal - montoDescuento);

    const totalEl = document.getElementById("total-cobrar");
    if (totalEl) totalEl.textContent = totalNeto.toFixed(2);

    const inputACuenta = document.getElementById("orden-monto-acuenta");
    if (inputACuenta && (!inputACuenta.dataset.modificadoManual || inputACuenta.value === "" || inputACuenta.value === "0.00")) {
        inputACuenta.value = totalNeto.toFixed(2);
    }
    actualizarCalculoSaldoNuevaOrden(false);
}
window.actualizarCalculoDescuentoRecepcion = actualizarCalculoDescuentoRecepcion;

function actualizarCalculoSaldoNuevaOrden(porUsuario = false) {
    const totalEl = document.getElementById("total-cobrar");
    const total = totalEl ? (parseFloat(totalEl.textContent) || 0) : 0;
    const inputACuenta = document.getElementById("orden-monto-acuenta");
    const badgeSaldo = document.getElementById("badge-saldo-nueva-orden");
    if (!badgeSaldo) return;

    if (porUsuario && inputACuenta) {
        inputACuenta.dataset.modificadoManual = "true";
    }

    let aCuenta = (inputACuenta && inputACuenta.value.trim() !== "") ? parseFloat(inputACuenta.value) : total;
    if (isNaN(aCuenta) || aCuenta < 0) aCuenta = 0;

    const saldo = Math.max(0, total - aCuenta);

    if (saldo > 0.009) {
        badgeSaldo.className = "badge bg-danger fs-6 py-2 px-3 shadow-sm";
        badgeSaldo.innerHTML = `<i class="bi bi-exclamation-triangle-fill me-1"></i>Debe: S/ ${saldo.toFixed(2)}`;
    } else {
        badgeSaldo.className = "badge bg-success fs-6 py-2 px-3 shadow-sm";
        badgeSaldo.innerHTML = `<i class="bi bi-check-circle-fill me-1"></i>S/ 0.00 (Pagado)`;
    }
}
window.actualizarCalculoSaldoNuevaOrden = actualizarCalculoSaldoNuevaOrden;

function establecerPagoCompletoNuevaOrden() {
    const totalEl = document.getElementById("total-cobrar");
    const total = totalEl ? (parseFloat(totalEl.textContent) || 0) : 0;
    const inputACuenta = document.getElementById("orden-monto-acuenta");
    if (inputACuenta) {
        inputACuenta.value = total.toFixed(2);
        delete inputACuenta.dataset.modificadoManual;
    }
    actualizarCalculoSaldoNuevaOrden(false);
}
window.establecerPagoCompletoNuevaOrden = establecerPagoCompletoNuevaOrden;

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

    const subtotal = examenesSeleccionados.reduce((acc, item) => acc + (item.cantidad * item.precio), 0);
    const tipoDescEl = document.getElementById("orden-descuento-tipo");
    const valDescEl = document.getElementById("orden-descuento-valor");
    const descuentoTipo = tipoDescEl ? tipoDescEl.value : "%";
    const descuentoValor = valDescEl ? (parseFloat(valDescEl.value) || 0) : 0;
    let montoDescuento = 0;
    if (descuentoValor > 0) {
        if (descuentoTipo === "%") {
            montoDescuento = subtotal * (descuentoValor / 100);
        } else {
            montoDescuento = Math.min(subtotal, descuentoValor);
        }
    }
    const total = Math.max(0, subtotal - montoDescuento);

    const nroOrden = "ORD-" + Math.floor(100000 + Math.random() * 900000);
    const fechaHora = new Date().toLocaleString();

    const inputACuenta = document.getElementById("orden-monto-acuenta");
    let aCuenta = (inputACuenta && inputACuenta.value.trim() !== "") ? parseFloat(inputACuenta.value) : total;
    if (isNaN(aCuenta) || aCuenta < 0) aCuenta = total;
    if (aCuenta > total) aCuenta = total;
    const saldoPendiente = Math.max(0, total - aCuenta);
    const estadoPago = saldoPendiente > 0.009 ? "Pendiente" : "Pagado";

    const hoyLocalISO = obtenerFechaISO(new Date());
    const nuevaOrden = {
        nroOrden, fechaHora, dni, nombre, sexo, fechaNacimiento, edad,
        celular: celularPaciente, doctor, metodoPago,
        examenes: examenesSeleccionados.map(i => ({ ...i })),
        subtotal,
        descuentoTipo,
        descuentoValor,
        montoDescuento,
        total,
        aCuenta,
        saldoPendiente,
        estadoPago,
        estado: "Pendiente",
        fechaISO: hoyLocalISO,
        en: Date.now()
    };

    ordenesRegistradas.unshift(nuevaOrden);

    const ahora = new Date();
    let movimiento = null;
    if (aCuenta > 0.009) {
        movimiento = {
            id: `${Date.now()}-${nroOrden}`,
            fecha: hoyLocalISO,
            fechaVisual: ahora.toLocaleDateString("es-PE"),
            hora: ahora.toLocaleTimeString(),
            nroOrden,
            dni,
            paciente: nombre,
            metodoPago,
            monto: aCuenta,
            concepto: saldoPendiente > 0.009 ? `Pago a cuenta orden ${nroOrden} (Resta S/ ${saldoPendiente.toFixed(2)})` : `Pago completo orden ${nroOrden}`,
            en: Date.now()
        };
        cajaMovimientos.unshift(movimiento);
    }

    registrarPacienteDesdeOrden(nuevaOrden);

    persistirDatos();
    actualizarTotalesCaja();
    cargarOrdenes();
    cargarPacientes();
    window.nubeGuardarOrden?.(nuevaOrden);
    if (movimiento) window.nubeGuardarMovimiento?.(movimiento);

    const form = document.getElementById("form-paciente");
    if (form) form.reset();
    setVal("pac-edad", "");
    if (valDescEl) valDescEl.value = "";
    if (tipoDescEl) tipoDescEl.value = "%";
    if (inputACuenta) {
        inputACuenta.value = "0.00";
        delete inputACuenta.dataset.modificadoManual;
    }
    actualizarCalculoSaldoNuevaOrden(false);
    examenesSeleccionados = [];
    renderizarTablaSeleccionados();

    showSection('ordenes');
    mostrarTicket(nuevaOrden);
}

// ==========================================
// GESTIÓN Y FILTROS DE ÓRDENES
// ==========================================
window.filtroFechaOrdenes = null;
window.filtroBusquedaOrdenes = "";

function cambiarFechaFiltroOrdenes(fechaValor) {
    window.filtroFechaOrdenes = fechaValor || "todas";
    filtrarOrdenes();
}
window.cambiarFechaFiltroOrdenes = cambiarFechaFiltroOrdenes;

function filtrarOrdenesHoy() {
    const hoyISO = obtenerFechaISO(new Date());
    window.filtroFechaOrdenes = hoyISO;
    const inputFecha = document.getElementById("filtro-ordenes-fecha");
    if (inputFecha) inputFecha.value = hoyISO;
    filtrarOrdenes();
}
window.filtrarOrdenesHoy = filtrarOrdenesHoy;

function filtrarOrdenesTodas() {
    window.filtroFechaOrdenes = "todas";
    const inputFecha = document.getElementById("filtro-ordenes-fecha");
    if (inputFecha) inputFecha.value = "";
    filtrarOrdenes();
}
window.filtrarOrdenesTodas = filtrarOrdenesTodas;

function filtrarOrdenes() {
    const inputBusqueda = document.getElementById("filtro-ordenes-busqueda");
    const inputFecha = document.getElementById("filtro-ordenes-fecha");
    const texto = inputBusqueda ? inputBusqueda.value.trim().toLowerCase() : "";
    window.filtroBusquedaOrdenes = texto;

    const hoyISO = obtenerFechaISO(new Date());
    if (window.filtroFechaOrdenes === null) {
        window.filtroFechaOrdenes = hoyISO;
        if (inputFecha && !inputFecha.value) inputFecha.value = hoyISO;
    }

    const fechaFiltro = window.filtroFechaOrdenes;
    let lista = (ordenesRegistradas || []).filter(o => o && o.nroOrden && !window.ordenesEliminadas?.includes(String(o.nroOrden)));

    // 1. Filtrar por fecha
    if (fechaFiltro && fechaFiltro !== "todas") {
        lista = lista.filter(ord => {
            const fOrd = obtenerFechaISO(ord.fechaISO || ord.fechaHora || ord.en);
            return fOrd === fechaFiltro;
        });
    }

    // 2. Filtrar por texto (paciente, DNI, orden, médico)
    if (texto) {
        lista = lista.filter(ord => {
            return String(ord.nombre || "").toLowerCase().includes(texto) ||
                   String(ord.dni || "").toLowerCase().includes(texto) ||
                   String(ord.nroOrden || "").toLowerCase().includes(texto) ||
                   String(ord.doctor || "").toLowerCase().includes(texto);
        });
    }

    const badgeContador = document.getElementById("contador-ordenes-filtradas");
    if (badgeContador) {
        let etiqueta = "";
        if (fechaFiltro === "todas") {
            etiqueta = `Mostrando histórico completo (${lista.length} órdenes)`;
        } else if (fechaFiltro === hoyISO) {
            etiqueta = `Mostrando órdenes de hoy (${lista.length} órdenes)`;
        } else {
            const partes = fechaFiltro.split("-").reverse().join("/");
            etiqueta = `Mostrando órdenes del ${partes} (${lista.length} órdenes)`;
        }
        if (texto) etiqueta += ` • Búsqueda: "${texto}"`;
        badgeContador.textContent = etiqueta;
    }

    renderizarTablaOrdenes(lista);
}
window.filtrarOrdenes = filtrarOrdenes;

function cargarOrdenes() {
    const inputFecha = document.getElementById("filtro-ordenes-fecha");
    const hoyISO = obtenerFechaISO(new Date());
    if (window.filtroFechaOrdenes === null) {
        window.filtroFechaOrdenes = hoyISO;
    }
    if (inputFecha && window.filtroFechaOrdenes !== "todas" && !inputFecha.value) {
        inputFecha.value = window.filtroFechaOrdenes;
    }
    filtrarOrdenes();
}

function renderizarTablaOrdenes(ordenes) {
    const tbody = document.getElementById('lista-ordenes-body');
    if (!tbody) return;
    tbody.innerHTML = "";
    if (!ordenes || ordenes.length === 0) {
        const fechaFiltro = window.filtroFechaOrdenes;
        const texto = window.filtroBusquedaOrdenes;
        const hoyISO = obtenerFechaISO(new Date());
        let msg = "No se encontraron órdenes para la fecha seleccionada.";
        if (fechaFiltro === "todas") {
            msg = "No se encontraron órdenes en el historial.";
        } else if (fechaFiltro === hoyISO) {
            msg = `No hay órdenes registradas para hoy (${new Date().toLocaleDateString("es-PE")}).`;
        }
        tbody.innerHTML = `
            <tr>
                <td colspan="6" class="text-center text-muted py-4">
                    <i class="bi bi-info-circle me-1"></i>${escapeHTML(msg)}${texto ? ` (Búsqueda: "${escapeHTML(texto)}")` : ''}
                    ${fechaFiltro !== 'todas' ? `<div class="mt-2"><button type="button" class="btn btn-sm btn-outline-primary" onclick="filtrarOrdenesTodas()"><i class="bi bi-collection me-1"></i>Ver todas las órdenes registradas</button></div>` : ''}
                </td>
            </tr>
        `;
        return;
    }
    ordenes.forEach(ord => {
        const totalOrd = Number(ord.total || 0);
        const aCuentaOrd = ord.aCuenta !== undefined ? Number(ord.aCuenta) : totalOrd;
        const saldoOrd = ord.saldoPendiente !== undefined ? Number(ord.saldoPendiente) : Math.max(0, totalOrd - aCuentaOrd);
        const tieneDeuda = saldoOrd > 0.009;

        const badgeClinico = `<span class="badge ${ord.resultados && ord.resultados.length ? 'bg-primary' : 'bg-secondary'}">${escapeHTML(ord.estado || (ord.resultados && ord.resultados.length ? 'Completado' : 'Pendiente'))}</span>`;
        
        let badgePago = "";
        if (tieneDeuda) {
            badgePago = `
                <div class="mt-1">
                    <span class="badge bg-danger text-white py-1 px-2" style="cursor: pointer; font-size: 0.76rem;" onclick="abrirModalGestionPago('${escapeHTML(ord.nroOrden)}')" title="Haga clic para cobrar o modificar pago">
                        <i class="bi bi-exclamation-triangle-fill me-1"></i>Debe: S/ ${saldoOrd.toFixed(2)}
                    </span>
                </div>
            `;
        } else {
            badgePago = `
                <div class="mt-1">
                    <span class="badge bg-success-subtle text-success border border-success-subtle py-1 px-2" style="font-size: 0.74rem;">
                        <i class="bi bi-check-circle-fill me-1"></i>Pagado (S/ ${totalOrd.toFixed(2)})
                    </span>
                </div>
            `;
        }

        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td class="fw-bold text-primary">${escapeHTML(ord.nroOrden)}</td>
            <td>${escapeHTML(ord.fechaHora)}</td>
            <td>${escapeHTML(ord.dni)}</td>
            <td>${escapeHTML(ord.nombre)}</td>
            <td>
                ${badgeClinico}
                ${badgePago}
            </td>
            <td class="text-end px-3">
                <button class="btn btn-sm ${tieneDeuda ? 'btn-danger text-white fw-bold' : 'btn-outline-secondary'} me-1" title="Gestionar Pago / Cobrar Saldo / Modificar Deuda" onclick="abrirModalGestionPago('${ord.nroOrden}')">
                    <i class="bi bi-cash-stack"></i> ${tieneDeuda ? 'Cobrar' : 'Pago'}
                </button>
                <button class="btn btn-sm btn-outline-success me-1 text-success" title="Enviar mensaje por WhatsApp al paciente" onclick="enviarResultadoWhatsApp('${ord.nroOrden}')">
                    <i class="bi bi-whatsapp"></i>
                </button>
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

// ==========================================
// GESTIÓN DE COBRO, SALDO Y DEUDA DE ÓRDENES
// ==========================================
function abrirModalGestionPago(nroOrden) {
    const orden = (ordenesRegistradas || []).find(o => String(o.nroOrden) === String(nroOrden));
    if (!orden) {
        alert("No se encontró la orden especificada.");
        return;
    }

    const totalOrd = Number(orden.total || 0);
    // Si la orden tenía un aCuenta inflado artificialmente, corregir valor base
    let aCuentaOrd = orden.aCuenta !== undefined ? Number(orden.aCuenta) : totalOrd;
    let saldoOrd = orden.saldoPendiente !== undefined ? Number(orden.saldoPendiente) : Math.max(0, totalOrd - aCuentaOrd);
    
    // Si por error previo aCuenta superaba el total, normalizar
    if (aCuentaOrd > totalOrd && totalOrd > 0) {
        // Consultar los cobros reales en caja
        const movsOrden = (cajaMovimientos || []).filter(m => String(m.nroOrden) === String(orden.nroOrden));
        const sumaCaja = movsOrden.reduce((acc, m) => acc + Number(m.monto || 0), 0);
        if (sumaCaja <= totalOrd && sumaCaja > 0) {
            aCuentaOrd = sumaCaja;
            saldoOrd = Math.max(0, totalOrd - aCuentaOrd);
        }
    }

    const elNro = document.getElementById("modal-pago-nroOrden");
    if (elNro) elNro.value = orden.nroOrden;

    const elSub = document.getElementById("modal-pago-subtitulo");
    if (elSub) elSub.textContent = `Orden: ${orden.nroOrden} | Fecha: ${orden.fechaHora || ''}`;

    const elPac = document.getElementById("modal-pago-paciente");
    if (elPac) elPac.textContent = orden.nombre || "Paciente";

    const elDet = document.getElementById("modal-pago-paciente-detalles");
    if (elDet) elDet.textContent = `DNI: ${orden.dni || '—'} | Tel: ${orden.celular || '—'} | Médico: ${orden.doctor || 'Particular'}`;

    // Campos principales editables
    const elTot = document.getElementById("mod-pago-total");
    if (elTot) elTot.value = totalOrd.toFixed(2);

    const elAcu = document.getElementById("mod-pago-acuenta");
    if (elAcu) elAcu.value = aCuentaOrd.toFixed(2);

    const elSal = document.getElementById("mod-pago-saldo");
    if (elSal) elSal.value = saldoOrd.toFixed(2);

    const elMet = document.getElementById("mod-pago-metodo");
    if (elMet) elMet.value = orden.metodoPago || "Efectivo";

    const elNot = document.getElementById("mod-pago-nota");
    if (elNot) elNot.value = orden.notaPago || "";

    actualizarBadgeModal(saldoOrd);

    // Listar los movimientos registrados en Caja para esta orden
    renderizarMovimientosCajaOrdenEnModal(orden.nroOrden);

    const modalEl = document.getElementById("modalGestionPago");
    if (modalEl && window.bootstrap) {
        bootstrap.Modal.getOrCreateInstance(modalEl).show();
    }
}
window.abrirModalGestionPago = abrirModalGestionPago;

function renderizarMovimientosCajaOrdenEnModal(nroOrden) {
    const contenedor = document.getElementById("contenedor-movimientos-caja-orden");
    if (!contenedor) return;
    
    const movsDeEstaOrden = (cajaMovimientos || []).filter(m => String(m.nroOrden) === String(nroOrden));
    if (movsDeEstaOrden.length === 0) {
        contenedor.innerHTML = `
            <div class="p-2 border rounded bg-light text-muted small">
                <i class="bi bi-info-circle me-1"></i>No hay registros de cobro en el Arqueo de Caja para esta orden.
            </div>
        `;
        return;
    }

    let sumaCaja = 0;
    let filas = "";
    movsDeEstaOrden.forEach(m => {
        const montoM = Number(m.monto || 0);
        sumaCaja += montoM;
        filas += `
            <div class="d-flex justify-content-between align-items-center py-1 border-bottom small">
                <div>
                    <span class="fw-bold text-dark">${escapeHTML(m.fechaVisual || m.fecha)}</span>
                    <span class="text-muted ms-1">${escapeHTML(m.hora || '')}</span>
                    <span class="badge bg-light text-dark border ms-1">${escapeHTML(m.metodoPago || 'Efectivo')}</span>
                    ${m.concepto ? `<span class="text-secondary ms-1">(${escapeHTML(m.concepto)})</span>` : ''}
                </div>
                <div class="d-flex align-items-center gap-2">
                    <span class="fw-bold text-success">S/ ${montoM.toFixed(2)}</span>
                    <button type="button" class="btn btn-xs btn-outline-danger py-0 px-2" title="Eliminar este cobro de caja si fue duplicado o erróneo" onclick="eliminarMovimientoCajaDesdeModal('${escapeHTML(m.id)}', '${escapeHTML(nroOrden)}')">
                        <i class="bi bi-trash me-1"></i>Eliminar cobro
                    </button>
                </div>
            </div>
        `;
    });

    const orden = (ordenesRegistradas || []).find(o => String(o.nroOrden) === String(nroOrden));
    const totalOrd = orden ? Number(orden.total || 0) : 0;
    const tieneExceso = sumaCaja > totalOrd && totalOrd > 0;

    contenedor.innerHTML = `
        <div class="border rounded p-2 bg-light shadow-sm">
            <div class="d-flex justify-content-between align-items-center mb-1 pb-1 border-bottom flex-wrap gap-1">
                <strong class="small text-secondary"><i class="bi bi-cash-stack me-1"></i>Cobros registrados en Arqueo de Caja:</strong>
                <span class="badge ${tieneExceso ? 'bg-danger' : 'bg-primary'} fs-7">
                    ${tieneExceso ? '⚠️ Cobros en caja superan el total: S/ ' : 'Total en caja: S/ '}${sumaCaja.toFixed(2)}
                </span>
            </div>
            ${filas}
            ${tieneExceso ? `
                <div class="text-danger small mt-1">
                    <i class="bi bi-exclamation-circle-fill me-1"></i>Hay cobros adicionales que suman más de S/ ${totalOrd.toFixed(2)}. Puedes eliminar el cobro extra con el botón del tacho, o al presionar "Guardar" se corregirá automáticamente.
                </div>
            ` : ''}
        </div>
    `;
}

function eliminarMovimientoCajaDesdeModal(idMovimiento, nroOrden) {
    if (eliminarMovimientoCaja(idMovimiento)) {
        // Refrescar los campos del modal con los nuevos valores recalculados
        const orden = (ordenesRegistradas || []).find(o => String(o.nroOrden) === String(nroOrden));
        if (orden) {
            const elTot = document.getElementById("mod-pago-total");
            const elAcu = document.getElementById("mod-pago-acuenta");
            const elSal = document.getElementById("mod-pago-saldo");
            if (elTot) elTot.value = Number(orden.total || 0).toFixed(2);
            if (elAcu) elAcu.value = Number(orden.aCuenta || 0).toFixed(2);
            if (elSal) elSal.value = Number(orden.saldoPendiente || 0).toFixed(2);
            actualizarBadgeModal(orden.saldoPendiente);
        }
        renderizarMovimientosCajaOrdenEnModal(nroOrden);
    }
}
window.eliminarMovimientoCajaDesdeModal = eliminarMovimientoCajaDesdeModal;

// Cálculos bidireccionales en tiempo real
function alCambiarTotalEnModal() {
    const elTot = document.getElementById("mod-pago-total");
    const elAcu = document.getElementById("mod-pago-acuenta");
    const elSal = document.getElementById("mod-pago-saldo");
    if (!elTot || !elAcu || !elSal) return;

    const tot = parseFloat(elTot.value) || 0;
    const acu = parseFloat(elAcu.value) || 0;
    const sal = Math.max(0, tot - acu);
    elSal.value = sal.toFixed(2);
    actualizarBadgeModal(sal);
}
window.alCambiarTotalEnModal = alCambiarTotalEnModal;

function alCambiarACuentaEnModal() {
    const elTot = document.getElementById("mod-pago-total");
    const elAcu = document.getElementById("mod-pago-acuenta");
    const elSal = document.getElementById("mod-pago-saldo");
    if (!elTot || !elAcu || !elSal) return;

    const tot = parseFloat(elTot.value) || 0;
    const acu = parseFloat(elAcu.value) || 0;
    const sal = Math.max(0, tot - acu);
    elSal.value = sal.toFixed(2);
    actualizarBadgeModal(sal);
}
window.alCambiarACuentaEnModal = alCambiarACuentaEnModal;

function alCambiarSaldoEnModal() {
    const elTot = document.getElementById("mod-pago-total");
    const elAcu = document.getElementById("mod-pago-acuenta");
    const elSal = document.getElementById("mod-pago-saldo");
    if (!elTot || !elAcu || !elSal) return;

    const tot = parseFloat(elTot.value) || 0;
    const sal = parseFloat(elSal.value) || 0;
    const acu = Math.max(0, tot - sal);
    elAcu.value = acu.toFixed(2);
    actualizarBadgeModal(sal);
}
window.alCambiarSaldoEnModal = alCambiarSaldoEnModal;

function fijarPagoCompletoModal() {
    const elTot = document.getElementById("mod-pago-total");
    const elAcu = document.getElementById("mod-pago-acuenta");
    const elSal = document.getElementById("mod-pago-saldo");
    const tot = elTot ? (parseFloat(elTot.value) || 0) : 0;
    if (elAcu) elAcu.value = tot.toFixed(2);
    if (elSal) elSal.value = "0.00";
    actualizarBadgeModal(0);
}
window.fijarPagoCompletoModal = fijarPagoCompletoModal;

function fijarMitadModal() {
    const elTot = document.getElementById("mod-pago-total");
    const elAcu = document.getElementById("mod-pago-acuenta");
    const elSal = document.getElementById("mod-pago-saldo");
    const tot = elTot ? (parseFloat(elTot.value) || 0) : 0;
    const mitad = Math.round((tot / 2) * 100) / 100;
    const resta = Math.max(0, tot - mitad);
    if (elAcu) elAcu.value = mitad.toFixed(2);
    if (elSal) elSal.value = resta.toFixed(2);
    actualizarBadgeModal(resta);
}
window.fijarMitadModal = fijarMitadModal;

function fijarNadaModal() {
    const elTot = document.getElementById("mod-pago-total");
    const elAcu = document.getElementById("mod-pago-acuenta");
    const elSal = document.getElementById("mod-pago-saldo");
    const tot = elTot ? (parseFloat(elTot.value) || 0) : 0;
    if (elAcu) elAcu.value = "0.00";
    if (elSal) elSal.value = tot.toFixed(2);
    actualizarBadgeModal(tot);
}
window.fijarNadaModal = fijarNadaModal;

function actualizarBadgeModal(saldo) {
    const badge = document.getElementById("modal-pago-badge-estado");
    if (!badge) return;
    const s = parseFloat(saldo) || 0;
    if (s > 0.009) {
        badge.className = "badge bg-danger fs-6 py-2 px-3 shadow-sm";
        badge.innerHTML = `<i class="bi bi-exclamation-triangle-fill me-1"></i>Debe: S/ ${s.toFixed(2)}`;
    } else {
        badge.className = "badge bg-success fs-6 py-2 px-3 shadow-sm";
        badge.innerHTML = `<i class="bi bi-check-circle-fill me-1"></i>Pagado Completo`;
    }
}

function guardarAjusteRetroactivoDeuda() {
    const nroOrden = val("modal-pago-nroOrden");
    const orden = (ordenesRegistradas || []).find(o => String(o.nroOrden) === String(nroOrden));
    if (!orden) {
        alert("Orden no válida.");
        return;
    }

    const inputTot = document.getElementById("mod-pago-total");
    const inputAcu = document.getElementById("mod-pago-acuenta");
    const inputSal = document.getElementById("mod-pago-saldo");

    let nuevoTotal = inputTot ? parseFloat(inputTot.value) : Number(orden.total || 0);
    let nuevoACuenta = inputAcu ? parseFloat(inputAcu.value) : 0;

    if (isNaN(nuevoTotal) || nuevoTotal < 0) {
        alert("El total debe ser un número válido mayor o igual a 0.");
        return;
    }
    if (isNaN(nuevoACuenta) || nuevoACuenta < 0) {
        nuevoACuenta = 0;
    }

    // El saldo siempre es exactamente Total - ACuenta
    let nuevoSaldo = Math.max(0, nuevoTotal - nuevoACuenta);
    if (inputSal && Math.abs((parseFloat(inputSal.value) || 0) - nuevoSaldo) > 0.01) {
        nuevoSaldo = Math.max(0, parseFloat(inputSal.value) || 0);
        nuevoACuenta = Math.max(0, nuevoTotal - nuevoSaldo);
    }

    const metodo = val("mod-pago-metodo") || orden.metodoPago || "Efectivo";
    const nota = val("mod-pago-nota") || "";
    const syncCaja = document.getElementById("mod-pago-sync-caja")?.checked ?? true;

    orden.total = nuevoTotal;
    orden.aCuenta = nuevoACuenta;
    orden.saldoPendiente = nuevoSaldo;
    orden.estadoPago = nuevoSaldo > 0.009 ? "Pendiente" : "Pagado";
    orden.metodoPago = metodo;
    orden.notaPago = nota;

    // Sincronización inteligente con Arqueo de Caja
    if (syncCaja) {
        const movsOrden = (cajaMovimientos || []).filter(m => String(m.nroOrden) === String(orden.nroOrden));
        if (movsOrden.length > 0) {
            // El primer movimiento se actualiza al monto real pagado
            movsOrden[0].monto = nuevoACuenta;
            movsOrden[0].metodoPago = metodo;
            movsOrden[0].concepto = nuevoSaldo > 0.009 
                ? `Pago a cuenta orden ${orden.nroOrden} (Resta S/ ${nuevoSaldo.toFixed(2)})` 
                : `Pago completo orden ${orden.nroOrden}`;
            window.nubeGuardarMovimiento?.(movsOrden[0]);

            // Eliminar cobros adicionales duplicados para que la caja no quede inflada con 1800
            for (let i = 1; i < movsOrden.length; i++) {
                const extraId = String(movsOrden[i].id);
                cajaMovimientos = cajaMovimientos.filter(m => String(m.id) !== extraId);
                let eliminados = JSON.parse(localStorage.getItem("vital_caja_eliminados") || "[]");
                if (!eliminados.includes(extraId)) {
                    eliminados.push(extraId);
                    localStorage.setItem("vital_caja_eliminados", JSON.stringify(eliminados));
                }
                if (typeof nubeEliminarMovimiento === "function") nubeEliminarMovimiento(extraId);
            }
        } else if (nuevoACuenta > 0) {
            const ahora = new Date();
            const nuevoMov = {
                id: `${Date.now()}-${orden.nroOrden}`,
                fecha: ahora.toISOString().split("T")[0],
                fechaVisual: ahora.toLocaleDateString("es-PE"),
                hora: ahora.toLocaleTimeString(),
                nroOrden: orden.nroOrden,
                dni: orden.dni,
                paciente: orden.nombre,
                metodoPago: metodo,
                monto: nuevoACuenta,
                concepto: nuevoSaldo > 0.009 ? `Pago a cuenta orden ${orden.nroOrden} (Resta S/ ${nuevoSaldo.toFixed(2)})` : `Pago completo orden ${orden.nroOrden}`,
                en: Date.now()
            };
            cajaMovimientos.unshift(nuevoMov);
            window.nubeGuardarMovimiento?.(nuevoMov);
        }
    }

    persistirDatos();
    actualizarTotalesCaja();
    cargarOrdenes();
    window.nubeGuardarOrden?.(orden);

    // Si la pantalla de resultados estaba abierta con esta orden, refrescarla
    const secResultados = document.getElementById("sec-resultados");
    if (secResultados && !secResultados.classList.contains("d-none")) {
        const editor = document.getElementById("resultados-editor");
        if (editor && editor.innerHTML.includes(orden.nroOrden)) {
            abrirResultados(orden.nroOrden);
        }
    }

    // Actualizar el ticket en memoria y pantalla de inmediato
    window._ticketActual = orden;
    const cuerpoTicket = document.getElementById("modal-ticket-body");
    if (cuerpoTicket && cuerpoTicket.innerHTML.includes(orden.nroOrden)) {
        cuerpoTicket.innerHTML = `<div class="ticket-visual">${construirTicketHTML(orden)}</div>`;
    }

    const modalEl = document.getElementById("modalGestionPago");
    if (modalEl && window.bootstrap) {
        bootstrap.Modal.getInstance(modalEl)?.hide();
    }

    alert(`✅ Orden ${orden.nroOrden} actualizada exitosamente:\n\n• Total: S/ ${nuevoTotal.toFixed(2)}\n• Monto Pagado (A Cuenta): S/ ${nuevoACuenta.toFixed(2)}\n• Deuda Actual (Saldo): S/ ${nuevoSaldo.toFixed(2)}\n• Estado: ${nuevoSaldo > 0.009 ? 'PENDIENTE DE PAGO' : 'PAGADO COMPLETO'}\n\nLos cambios quedaron sincronizados en la orden, ticket y arqueo de caja.`);
}
window.guardarAjusteRetroactivoDeuda = guardarAjusteRetroactivoDeuda;

function enviarResultadoWhatsApp(nroOrden) {
    const orden = (ordenesRegistradas || []).find(o => String(o.nroOrden) === String(nroOrden));
    if (!orden) {
        alert("Orden no encontrada.");
        return;
    }

    // Obtener celular de la orden o buscar en el registro de pacientes
    let tel = (orden.celular || "").trim();
    if (!tel && orden.dni) {
        const pac = (window.pacientesRegistrados || []).find(p => String(p.dni) === String(orden.dni));
        if (pac && pac.celular) tel = pac.celular.trim();
    }

    // Limpiar caracteres no numéricos
    let numeroLimpio = tel.replace(/[^0-9]/g, "");
    if (!numeroLimpio || numeroLimpio.length < 8) {
        const nuevoTel = prompt(`El paciente "${orden.nombre}" no tiene un celular registrado válido.\nIngrese el número de WhatsApp (9 dígitos):`, "");
        if (!nuevoTel) return;
        numeroLimpio = nuevoTel.replace(/[^0-9]/g, "");
        if (numeroLimpio.length >= 9) {
            orden.celular = numeroLimpio;
            persistirDatos();
        }
    }

    // Prefijo de Perú (51) si tiene 9 dígitos locales
    if (numeroLimpio.length === 9) {
        numeroLimpio = "51" + numeroLimpio;
    }

    // Saludo según sexo: Estimado si es hombre o Estimada si es mujer
    const sexoNorm = String(orden.sexo || "").trim().toUpperCase();
    const esMujer = sexoNorm.startsWith("F") || sexoNorm.includes("MUJER");
    const tratamiento = esMujer ? "Estimada" : "Estimado";

    const pacienteNombre = (orden.nombre || "paciente").trim();
    const codigoOrden = orden.nroOrden || "";

    // Mensaje conciso exacto solicitado
    const mensaje = `${tratamiento} paciente ${pacienteNombre}, se hace envío de su resultado de laboratorio de Centro Médico Vital Health correspondiente a la orden ${codigoOrden}.`;

    const url = `https://wa.me/${numeroLimpio}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, "_blank");
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

        // Depurar inmediatamente de Caja todos los cobros asociados a esta orden eliminada
        const movsOrden = (cajaMovimientos || []).filter(m => String(m.nroOrden) === idOrden);
        if (movsOrden.length > 0) {
            let eliminados = JSON.parse(localStorage.getItem("vital_caja_eliminados") || "[]");
            movsOrden.forEach(m => {
                const mid = String(m.id);
                if (!eliminados.includes(mid)) eliminados.push(mid);
                if (typeof nubeEliminarMovimiento === "function") nubeEliminarMovimiento(mid);
            });
            localStorage.setItem("vital_caja_eliminados", JSON.stringify(eliminados));
            if (!window.cajaEliminados) window.cajaEliminados = [];
            eliminados.forEach(id => {
                if (!window.cajaEliminados.includes(id)) window.cajaEliminados.push(id);
            });
            cajaMovimientos = cajaMovimientos.filter(m => String(m.nroOrden) !== idOrden);
        }

        sincronizarGlobals();
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
    let edadDias = null;
    let edadMeses = null;
    let edadAnos = null;

    if (edadStr.includes("día") || edadStr.includes("dia")) {
        edadDias = parseFloat(edadStr.replace(/[^0-9.]/g, "")) || 0;
    } else if (edadStr.includes("mes")) {
        edadMeses = parseFloat(edadStr.replace(/[^0-9.]/g, "")) || 0;
    } else {
        const num = parseFloat(edadStr.replace(/[^0-9.]/g, ""));
        if (!isNaN(num)) edadAnos = num;
    }

    let sugerencia = null;
    let etiqueta = "";

    // 1. Evaluación por sub-etapas pediátricas precisas si existen
    if (edadDias !== null) {
        const parte = partes.find(p => /d[ií]as/i.test(p) || /neonato/i.test(p));
        if (parte) { sugerencia = parte; etiqueta = `${edadDias} días`; }
    } else if (edadMeses !== null) {
        const parte = partes.find(p => /meses/i.test(p));
        if (parte) { sugerencia = parte; etiqueta = `${edadMeses} meses`; }
    } else if (edadAnos !== null && edadAnos < 19) {
        for (const p of partes) {
            const m = p.match(/(\d+)\s*a\s*(\d+)\s*a[ñn]os/i);
            if (m) {
                const minA = parseInt(m[1], 10);
                const maxA = parseInt(m[2], 10);
                if (edadAnos >= minA && edadAnos <= maxA) {
                    sugerencia = p;
                    etiqueta = `${edadAnos} años`;
                    break;
                }
            }
        }
        if (!sugerencia) {
            const parteNino = partes.find(p => /niño|pedi[aá]tr/i.test(p));
            if (parteNino) { sugerencia = parteNino; etiqueta = "Niño"; }
        }
    }

    // 2. Si es adulto (>= 18 años o sin bracket pediátrico)
    if (!sugerencia && (edadAnos === null || edadAnos >= 18)) {
        if (esFemenino) {
            const parte = partes.find(p => /(?:^|[\s(])(?:mujer|femenina|f:)(?:[\s)]|$)/i.test(p) || /(?:^|[\s])f\s*:/i.test(p) || /mujeres/i.test(p));
            if (parte) { sugerencia = parte; etiqueta = "Mujer"; }
        } else if (esMasculino) {
            const parte = partes.find(p => /(?:^|[\s(])(?:hombre|masculino|varon|m:)(?:[\s)]|$)/i.test(p) || /(?:^|[\s])m\s*:/i.test(p) || /hombres/i.test(p));
            if (parte) { sugerencia = parte; etiqueta = "Hombre"; }
        }
        if (!sugerencia) {
            const parteAdulto = partes.find(p => /adulto/i.test(p));
            if (parteAdulto) { sugerencia = parteAdulto; etiqueta = "Adulto"; }
        }
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


function esExamenPaternidad(exOItem) {
    if (!exOItem) return false;
    const nom = String(exOItem.nombre || "").toUpperCase()
        .normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    const cod = String(exOItem.codigo || "");
    return nom.includes("PATERNIDAD") || nom.includes("ADN") || nom.includes("FILIACION") || cod === "990" || cod === "934" || cod === "935";
}
window.esExamenPaternidad = esExamenPaternidad;

function esExamenPaternidadLegal(exOItem) {
    if (!exOItem) return false;
    const nom = String(exOItem.nombre || "").toUpperCase()
        .normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    const cod = String(exOItem.codigo || "");
    return (nom.includes("LEGAL") && (nom.includes("PATERNIDAD") || nom.includes("ADN") || nom.includes("FILIACION"))) || cod === "935";
}
window.esExamenPaternidadLegal = esExamenPaternidadLegal;

// Lista de los 24 Loci STR canónicos para la Prueba Legal (del PDF Spectrum Compact CE)
const LOCI_PATERNIDAD_LEGAL_DEFECTO = [
    { locus: 'D3S1358', ip: '0.00', m1: '15', m2: '16', hijo1: '15', hijo2: '16', p1: '14', p2: '18' },
    { locus: 'D1S1656', ip: '3.63', m1: '14', m2: '', hijo1: '14', hijo2: '15', p1: '14', p2: '15' },
    { locus: 'D2S441', ip: '1.67', m1: '10', m2: '14', hijo1: '11', hijo2: '14', p1: '10', p2: '11' },
    { locus: 'D10S1248', ip: '0.00', m1: '15', m2: '', hijo1: '15', hijo2: '', p1: '13', p2: '14' },
    { locus: 'D13S317', ip: '0.00', m1: '9', m2: '13', hijo1: '9', hijo2: '13', p1: '11', p2: '12' },
    { locus: 'Penta E', ip: '0.00', m1: '14', m2: '16', hijo1: '5', hijo2: '16', p1: '12', p2: '15' },
    { locus: 'D16S539', ip: '2.34', m1: '10', m2: '12', hijo1: '10', hijo2: '12', p1: '10', p2: '12' },
    { locus: 'D18S51', ip: '0.00', m1: '14', m2: '17', hijo1: '15', hijo2: '17', p1: '16', p2: '' },
    { locus: 'D2S1338', ip: '0.00', m1: '17', m2: '23', hijo1: '23', hijo2: '24', p1: '17', p2: '23' },
    { locus: 'CSF1PO', ip: '0.00', m1: '12', m2: '', hijo1: '12', hijo2: '13', p1: '12', p2: '' },
    { locus: 'Penta D', ip: '0.00', m1: '11', m2: '13', hijo1: '11', hijo2: '12', p1: '10', p2: '' },
    { locus: 'TH01', ip: '0.00', m1: '7', m2: '', hijo1: '6', hijo2: '7', p1: '7', p2: '9.3' },
    { locus: 'vWA', ip: '2.03', m1: '16', m2: '', hijo1: '16', hijo2: '17', p1: '16', p2: '17' },
    { locus: 'D21S11', ip: '0.00', m1: '29', m2: '31.2', hijo1: '29', hijo2: '33.2', p1: '29', p2: '32.2' },
    { locus: 'D7S820', ip: '0.00', m1: '10', m2: '', hijo1: '10', hijo2: '12', p1: '11', p2: '' },
    { locus: 'D5S818', ip: '0.00', m1: '11', m2: '', hijo1: '11', hijo2: '', p1: '12', p2: '' },
    { locus: 'TPOX', ip: '1.35', m1: '8', m2: '11', hijo1: '8', hijo2: '11', p1: '8', p2: '11' },
    { locus: 'D8S1179', ip: '3.87', m1: '11', m2: '14', hijo1: '12', hijo2: '14', p1: '12', p2: '15' },
    { locus: 'D12S391', ip: '0.00', m1: '19', m2: '20', hijo1: '19', hijo2: '23', p1: '18', p2: '21' },
    { locus: 'D19S433', ip: '0.00', m1: '13', m2: '15.2', hijo1: '12.2', hijo2: '13', p1: '13', p2: '' },
    { locus: 'D6S1043', ip: '11.79', m1: '14', m2: '18', hijo1: '18', hijo2: '21.3', p1: '12', p2: '21.3' },
    { locus: 'D22S1045', ip: '1.43', m1: '16', m2: '', hijo1: '16', hijo2: '', p1: '15', p2: '16' },
    { locus: 'FGA', ip: '0.00', m1: '20', m2: '22', hijo1: '20', hijo2: '21', p1: '24', p2: '27' },
    { locus: 'Amelogenina', ip: '', m1: 'X', m2: '', hijo1: 'X', hijo2: '', p1: 'X', p2: 'Y' }
];

function extraerDatosPaternidadLegalDeOrden(orden, guardado) {
    const d = {
        codigoCaso: 'PAV-2610',
        fechaAtencion: '13/10/26',
        fechaEmision: '26/10/26',
        tecnologia: 'Análisis realizado con el Spectrum Compact CE System / VersaPlex™ 27PY System / GeneMarker®HID Software',
        casoTitulo: 'PAT-2610',
        madreNombre: 'ESTRELLA LUCERO CASTRO ALFARO',
        madreTipoMuestra: 'Bucal / Sangre',
        madrePruebaNro: '2610-10',
        menorNombre: 'AITANA LUCERO',
        menorCui: 'CUI:94778406',
        menorTipoMuestra: 'Bucal / Sangre',
        menorPruebaNro: '2610-20',
        padreNombre: 'DIONEL GOMEZ PEÑA',
        padreTipoMuestra: 'Bucal / Sangre',
        padrePruebaNro: '2610-30',
        interpretacion: 'El presunto padre es excluído como padre biológico del niño (a). Examinado (a). Esta conclusión es basada en los alelos no correspondientes observados en los loci listados con un IP igual a 0. Al presunto padre le faltan los marcadores genéticos que deben ser contrubuídos al niño (a) por el padre biológico. La probabilidad de paternidad es de 0%.',
        ipcAcumulado: '0',
        probabilidadAcumulada: '0%',
        notaLaboratorio: 'Basado en las muestras recibidas de labotatorio VITAL HEALTH el cual provee los nombres de las partes probadas que aparecen en este reporte.',
        loci: JSON.parse(JSON.stringify(LOCI_PATERNIDAD_LEGAL_DEFECTO))
    };

    if (orden && orden.fechaHora) {
        const partesF = String(orden.fechaHora).split(',')[0].trim();
        if (partesF) d.fechaAtencion = partesF;
    }

    if (guardado && guardado.datosPaternidadLegal) {
        return Object.assign(d, guardado.datosPaternidadLegal);
    }

    if (guardado && Array.isArray(guardado.indicadores) && guardado.indicadores.length) {
        guardado.indicadores.forEach(ind => {
            const nom = String(ind.nombre || '').toUpperCase();
            if (nom.includes('CODIGO DE CASO') && ind.resultado) d.codigoCaso = ind.resultado;
            if (nom.includes('FECHA DE ATENCION') && ind.resultado) d.fechaAtencion = ind.resultado;
            if (nom.includes('FECHA DE EMISION') && ind.resultado) d.fechaEmision = ind.resultado;
            if (nom.includes('NOMBRE MADRE') && ind.resultado) d.madreNombre = ind.resultado;
            if (nom.includes('NOMBRE MENOR') && ind.resultado) d.menorNombre = ind.resultado;
            if (nom.includes('CUI') && ind.resultado) d.menorCui = ind.resultado;
            if (nom.includes('NOMBRE PRESUNTO PADRE') && ind.resultado) d.padreNombre = ind.resultado;
            if (nom.includes('INTERPRETACION') && ind.resultado) d.interpretacion = ind.resultado;
            if (nom.includes('INDICE DE PATERNIDAD ACUMULATIVO') && ind.resultado) d.ipcAcumulado = ind.resultado;
            if (nom.includes('PROBABILIDAD DE PATERNIDAD ACUMULATIVA') && ind.resultado) d.probabilidadAcumulada = ind.resultado;
        });
    }

    return d;
}

window.cargarPlantillaPaternidadLegalExclusion = function() {
    const elInter = document.getElementById("pl-edit-interpretacion");
    const elIpc = document.getElementById("pl-edit-ipcAcumulado");
    const elProb = document.getElementById("pl-edit-probabilidadAcumulada");
    if (elInter) elInter.value = "El presunto padre es excluído como padre biológico del niño (a). Examinado (a). Esta conclusión es basada en los alelos no correspondientes observados en los loci listados con un IP igual a 0. Al presunto padre le faltan los marcadores genéticos que deben ser contrubuídos al niño (a) por el padre biológico. La probabilidad de paternidad es de 0%.";
    if (elIpc) elIpc.value = "0";
    if (elProb) elProb.value = "0%";
    alert("Se aplicó la plantilla de EXCLUSIÓN DE PATERNIDAD (0%).");
};

window.cargarPlantillaPaternidadLegalInclusion = function() {
    const elInter = document.getElementById("pl-edit-interpretacion");
    const elIpc = document.getElementById("pl-edit-ipcAcumulado");
    const elProb = document.getElementById("pl-edit-probabilidadAcumulada");
    if (elInter) elInter.value = "El presunto padre no es excluído como el padre biológico del niño(a) examinado(a). Basándose en los resultados de los análisis obtenidos de los loci de ADN listados, la probabilidad de paternidad es de 99.99999992 %. Esta probabilidad de paternidad fue calculada en comparación con un individuo al azar de la población Hispanica , no analizados ni relacionados (asume una probabilidad previa igual a 0.50).";
    if (elIpc) elIpc.value = "1,321,629,527";
    if (elProb) elProb.value = "99.99999992%";
    alert("Se aplicó la plantilla de INCLUSIÓN DE PATERNIDAD (>99.999%).");
};

function generarEditorFormularioPaternidadLegal(ex, exIdx, orden, guardado) {
    const pData = extraerDatosPaternidadLegalDeOrden(orden, guardado);

    let filasLoci = '';
    (pData.loci || LOCI_PATERNIDAD_LEGAL_DEFECTO).forEach((item, lIdx) => {
        filasLoci += `
            <tr data-pl-locus-row="${lIdx}">
                <td class="text-center bg-light fw-bold" style="width: 14%;">
                    <input type="text" class="form-control form-control-sm text-center fw-bold py-1" data-pl-campo="locus" value="${escapeHTML(item.locus)}">
                </td>
                <td style="width: 10%;">
                    <input type="text" class="form-control form-control-sm text-center py-1 fw-bold" data-pl-campo="ip" placeholder="IP" value="${escapeHTML(item.ip ?? '')}">
                </td>
                <td style="width: 12%;">
                    <input type="text" class="form-control form-control-sm text-center py-1 font-monospace" data-pl-campo="m1" placeholder="Alelo 1" value="${escapeHTML(item.m1 ?? '')}">
                </td>
                <td style="width: 12%;">
                    <input type="text" class="form-control form-control-sm text-center py-1 font-monospace" data-pl-campo="m2" placeholder="Alelo 2" value="${escapeHTML(item.m2 ?? '')}">
                </td>
                <td style="width: 13%;">
                    <input type="text" class="form-control form-control-sm text-center py-1 font-monospace bg-primary-subtle" data-pl-campo="hijo1" placeholder="Alelo 1" value="${escapeHTML(item.hijo1 ?? '')}">
                </td>
                <td style="width: 13%;">
                    <input type="text" class="form-control form-control-sm text-center py-1 font-monospace bg-primary-subtle" data-pl-campo="hijo2" placeholder="Alelo 2" value="${escapeHTML(item.hijo2 ?? '')}">
                </td>
                <td style="width: 13%;">
                    <input type="text" class="form-control form-control-sm text-center py-1 font-monospace bg-success-subtle fw-semibold" data-pl-campo="p1" placeholder="Alelo 1" value="${escapeHTML(item.p1 ?? '')}">
                </td>
                <td style="width: 13%;">
                    <input type="text" class="form-control form-control-sm text-center py-1 font-monospace bg-success-subtle fw-semibold" data-pl-campo="p2" placeholder="Alelo 2" value="${escapeHTML(item.p2 ?? '')}">
                </td>
            </tr>
        `;
    });

    return `
        <div class="list-group-item mb-3 shadow-sm border border-success border-2 rounded card-examen-arrastrable p-3 bg-white" 
             draggable="false" 
             data-ex-card-idx="${exIdx}"
             data-paternidad-legal-card="true">
            <div class="d-flex justify-content-between align-items-center mb-3 pb-2 border-bottom flex-wrap gap-2 bg-success-subtle p-2 rounded">
                <div class="d-flex align-items-center gap-2">
                    <span class="badge bg-success text-white fs-6 px-2 py-1">
                        <i class="bi bi-file-earmark-check-fill me-1"></i>PRUEBA DE PATERNIDAD LEGAL (FORMATO OFICIAL)
                    </span>
                    <span class="badge bg-primary text-white border fw-semibold">
                        <i class="bi bi-patch-check-fill me-1"></i>Con Sello y Firma Pericial (C.B.P. 14529)
                    </span>
                </div>
                <div class="d-flex gap-2">
                    <button type="button" class="btn btn-sm btn-outline-danger fw-semibold bg-white shadow-sm" onclick="cargarPlantillaPaternidadLegalExclusion()">
                        <i class="bi bi-x-circle me-1"></i>Plantilla Exclusión (0%)
                    </button>
                    <button type="button" class="btn btn-sm btn-outline-success fw-semibold bg-white shadow-sm" onclick="cargarPlantillaPaternidadLegalInclusion()">
                        <i class="bi bi-check-circle me-1"></i>Plantilla Inclusión (>99.999%)
                    </button>
                </div>
            </div>

            <!-- ENCABEZADO PERICIAL Y FECHAS -->
            <div class="card mb-3 border bg-light">
                <div class="card-header bg-white py-2 fw-bold text-dark border-bottom d-flex justify-content-between">
                    <span><i class="bi bi-folder2-open me-1 text-success"></i>1. Identificación del Caso, Convenio y Fechas</span>
                    <small class="text-muted">Aparece en la parte superior del informe</small>
                </div>
                <div class="card-body p-3">
                    <div class="row g-2 mb-2">
                        <div class="col-md-3">
                            <label class="form-label small fw-bold mb-1">Código de caso:</label>
                            <input type="text" class="form-control form-control-sm" id="pl-edit-codigoCaso" value="${escapeHTML(pData.codigoCaso)}" placeholder="ej. PAV-2610">
                        </div>
                        <div class="col-md-3">
                            <label class="form-label small fw-bold mb-1">Fecha de atención:</label>
                            <input type="text" class="form-control form-control-sm" id="pl-edit-fechaAtencion" value="${escapeHTML(pData.fechaAtencion)}" placeholder="DD/MM/AA">
                        </div>
                        <div class="col-md-3">
                            <label class="form-label small fw-bold mb-1">Fecha de emisión:</label>
                            <input type="text" class="form-control form-control-sm" id="pl-edit-fechaEmision" value="${escapeHTML(pData.fechaEmision)}" placeholder="DD/MM/AA">
                        </div>
                    </div>
                    <div class="row g-2">
                        <div class="col-md-4">
                            <label class="form-label small fw-bold mb-1">Caso / Referencia Tabla:</label>
                            <input type="text" class="form-control form-control-sm bg-white" id="pl-edit-casoTitulo" value="${escapeHTML(pData.casoTitulo || 'PAT-2610')}">
                        </div>
                        <div class="col-md-8">
                            <label class="form-label small fw-bold mb-1">Texto de Tecnología / Plataforma (encima del cuadro):</label>
                            <input type="text" class="form-control form-control-sm bg-white" id="pl-edit-tecnologia" value="${escapeHTML(pData.tecnologia)}">
                        </div>
                    </div>
                </div>
            </div>

            <!-- PARTICIPANTES Y MUESTRAS (3 PARTES: MADRE, MENOR Y PRESUNTO PADRE) -->
            <div class="card mb-3 border bg-light">
                <div class="card-header bg-white py-2 fw-bold text-dark border-bottom">
                    <i class="bi bi-people me-1 text-success"></i>2. Datos de los Participantes y Muestras (Madre, Menor y Presunto Padre)
                </div>
                <div class="card-body p-3">
                    <div class="row g-3">
                        <!-- MADRE BIOLÓGICA -->
                        <div class="col-md-4 border-end">
                            <h6 class="fw-bold text-secondary mb-2"><i class="bi bi-gender-female me-1"></i>MADRE BIOLÓGICA</h6>
                            <div class="mb-2">
                                <label class="form-label small mb-1">Nombre Completo de la Madre:</label>
                                <input type="text" class="form-control form-control-sm fw-bold" id="pl-edit-madreNombre" value="${escapeHTML(pData.madreNombre)}" placeholder="ej. ESTRELLA LUCERO CASTRO ALFARO">
                            </div>
                            <div class="row g-2">
                                <div class="col-6">
                                    <label class="form-label small mb-1">Tipo de muestra:</label>
                                    <input type="text" class="form-control form-control-sm" id="pl-edit-madreTipoMuestra" value="${escapeHTML(pData.madreTipoMuestra)}" placeholder="Bucal / Sangre">
                                </div>
                                <div class="col-6">
                                    <label class="form-label small mb-1">Prueba N°:</label>
                                    <input type="text" class="form-control form-control-sm" id="pl-edit-madrePruebaNro" value="${escapeHTML(pData.madrePruebaNro)}" placeholder="2610-10">
                                </div>
                            </div>
                        </div>

                        <!-- MENOR -->
                        <div class="col-md-4 border-end">
                            <h6 class="fw-bold text-primary mb-2"><i class="bi bi-person me-1"></i>MENOR</h6>
                            <div class="mb-2">
                                <label class="form-label small mb-1">Nombre Completo del Menor:</label>
                                <input type="text" class="form-control form-control-sm fw-bold" id="pl-edit-menorNombre" value="${escapeHTML(pData.menorNombre || orden.nombre)}" placeholder="ej. AITANA LUCERO">
                            </div>
                            <div class="mb-2">
                                <label class="form-label small mb-1">CUI / DNI del Menor:</label>
                                <input type="text" class="form-control form-control-sm" id="pl-edit-menorCui" value="${escapeHTML(pData.menorCui)}" placeholder="CUI:94778406">
                            </div>
                            <div class="row g-2">
                                <div class="col-6">
                                    <label class="form-label small mb-1">Tipo de muestra:</label>
                                    <input type="text" class="form-control form-control-sm" id="pl-edit-menorTipoMuestra" value="${escapeHTML(pData.menorTipoMuestra)}" placeholder="Bucal / Sangre">
                                </div>
                                <div class="col-6">
                                    <label class="form-label small mb-1">Prueba N°:</label>
                                    <input type="text" class="form-control form-control-sm" id="pl-edit-menorPruebaNro" value="${escapeHTML(pData.menorPruebaNro)}" placeholder="2610-20">
                                </div>
                            </div>
                        </div>

                        <!-- PRESUNTO PADRE -->
                        <div class="col-md-4">
                            <h6 class="fw-bold text-success mb-2"><i class="bi bi-person-badge me-1"></i>PRESUNTO PADRE</h6>
                            <div class="mb-2">
                                <label class="form-label small mb-1">Nombre Completo del Presunto Padre:</label>
                                <input type="text" class="form-control form-control-sm fw-bold" id="pl-edit-padreNombre" value="${escapeHTML(pData.padreNombre)}" placeholder="ej. DIONEL GOMEZ PEÑA">
                            </div>
                            <div class="row g-2 mt-4">
                                <div class="col-6">
                                    <label class="form-label small mb-1">Tipo de muestra:</label>
                                    <input type="text" class="form-control form-control-sm" id="pl-edit-padreTipoMuestra" value="${escapeHTML(pData.padreTipoMuestra)}" placeholder="Bucal / Sangre">
                                </div>
                                <div class="col-6">
                                    <label class="form-label small mb-1">Prueba N°:</label>
                                    <input type="text" class="form-control form-control-sm" id="pl-edit-padrePruebaNro" value="${escapeHTML(pData.padrePruebaNro)}" placeholder="2610-30">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- CUADRO COMPARATIVO DE LOCI / IP / TAMAÑO DE ALELO -->
            <div class="card mb-3 border">
                <div class="card-header bg-dark text-white py-2 d-flex justify-content-between align-items-center">
                    <span class="fw-bold" style="font-size: 1.1rem;"><i class="bi bi-table me-1"></i>3. Cuadro Comparativo de Marcadores STR (24 Loci con IP y Alelos)</span>
                    <small class="opacity-75" style="font-size: 0.9rem;">Orden idéntico al PDF pericial de 4 columnas</small>
                </div>
                <div class="table-responsive p-0">
                    <table class="table table-bordered align-middle mb-0" id="tabla-editor-loci-paternidad-legal">
                        <thead class="table-light text-center" style="font-size: 1.05rem;">
                            <tr>
                                <th rowspan="2" class="align-middle" style="width: 14%;">Loci</th>
                                <th rowspan="2" class="align-middle" style="width: 10%;">IP</th>
                                <th colspan="2" class="border-bottom-0" style="width: 24%;">MADRE BIOLÓGICA</th>
                                <th colspan="2" class="bg-primary-subtle text-primary border-bottom-0" style="width: 26%;">MENOR</th>
                                <th colspan="2" class="bg-success-subtle text-success border-bottom-0" style="width: 26%;">PRESUNTO PADRE</th>
                            </tr>
                            <tr>
                                <th class="py-1" style="font-size: 0.95rem;">Alelo 1</th>
                                <th class="py-1" style="font-size: 0.95rem;">Alelo 2</th>
                                <th class="bg-primary-subtle text-primary py-1" style="font-size: 0.95rem;">Alelo 1</th>
                                <th class="bg-primary-subtle text-primary py-1" style="font-size: 0.95rem;">Alelo 2</th>
                                <th class="bg-success-subtle text-success py-1" style="font-size: 0.95rem;">Alelo 1</th>
                                <th class="bg-success-subtle text-success py-1" style="font-size: 0.95rem;">Alelo 2</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${filasLoci}
                        </tbody>
                    </table>
                </div>
            </div>

            <!-- INTERPRETACIÓN Y RESULTADOS GLOBALES -->
            <div class="card mb-2 border bg-light">
                <div class="card-header bg-white py-2 fw-bold text-dark border-bottom" style="font-size: 1.1rem;">
                    <i class="bi bi-file-earmark-check me-1 text-success"></i>4. Interpretación y Resultados Globales Bioestadísticos
                </div>
                <div class="card-body p-3">
                    <div class="mb-3">
                        <label class="form-label fw-bold mb-1" style="font-size: 1rem;">Interpretación (Texto debajo del cuadro):</label>
                        <textarea class="form-control" id="pl-edit-interpretacion" rows="3" style="font-size: 1rem;">${escapeHTML(pData.interpretacion)}</textarea>
                    </div>

                    <div class="row g-2 mb-3">
                        <div class="col-md-6">
                            <label class="form-label fw-bold mb-1" style="font-size: 1rem;">ÍNDICE DE PATERNIDAD ACUMULATIVO (IPC):</label>
                            <input type="text" class="form-control fw-bold font-monospace" id="pl-edit-ipcAcumulado" value="${escapeHTML(pData.ipcAcumulado)}" style="font-size: 1.1rem;">
                        </div>
                        <div class="col-md-6">
                            <label class="form-label fw-bold mb-1" style="font-size: 1rem;">PROBABILIDAD DE PATERNIDAD ACUMULATIVA (%):</label>
                            <input type="text" class="form-control fw-bold font-monospace text-success" id="pl-edit-probabilidadAcumulada" value="${escapeHTML(pData.probabilidadAcumulada)}" style="font-size: 1.1rem;">
                        </div>
                    </div>

                    <div class="row g-2 mb-3">
                        <div class="col-12">
                            <label class="form-label fw-bold mb-1" style="font-size: 1rem;">Nota de procedencia de muestra:</label>
                            <input type="text" class="form-control" id="pl-edit-notaLaboratorio" value="${escapeHTML(pData.notaLaboratorio)}" style="font-size: 1rem;">
                        </div>
                    </div>

                    <!-- VISTA PREVIA DE LOS CUADROS DE FIRMAS Y SELLOS LEGALES -->
                    <div class="card border">
                        <div class="card-header bg-white py-1 px-2 border-bottom fw-bold text-secondary" style="font-size: 1rem;">
                            <i class="bi bi-shield-check me-1 text-success"></i>Diseño Oficial del Pie Legal (Resultados Globales + Toma de Muestra + Análisis con Sello y Firma):
                        </div>
                        <div class="card-body p-2 bg-white">
                            <div class="row g-2 align-items-center">
                                <div class="col-md-4 border-end text-center p-2">
                                    <span class="badge bg-light text-dark border d-block py-1 mb-1" style="font-size: 0.9rem;">PERSONAL A CARGO DE LA TOMA</span>
                                    <span class="text-muted d-block" style="font-size: 0.95rem;">Recuadro reglamentario para firma física y sello del personal de toma de muestra.</span>
                                </div>
                                <div class="col-md-8 text-center p-2">
                                    <span class="badge bg-light text-dark border d-block py-1 mb-1" style="font-size: 0.9rem;">PERSONAL A CARGO DEL ANALISIS DE LA MUESTRA</span>
                                    <img src="sello-firma-biologo-legal.png" alt="Sello y Firma del Biólogo Genetista" style="max-height: 70px; object-fit: contain; margin-top: 4px;" onerror="this.src='./sello-firma-biologo-legal.png'">
                                    <div class="fw-bold text-dark mt-1" style="font-size: 1.05rem;">Christian Emilio Cancho Ccaico — Biólogo genetista C.B.P. 14529</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function generarBloquePaternidadLegalOficialHTML(ex, orden) {
    const guardado = (orden.resultados || []).find(r => r.codigo === ex.codigo);
    const pData = extraerDatosPaternidadLegalDeOrden(orden, guardado);

    const cabeceraHabitual = construirCabeceraInformeHTML();
    const pieHabitual = construirPieInformeHTML();

    const codigoCaso = escapeHTML(pData.codigoCaso || orden.nroOrden || 'PAV-2610');
    const convenio = orden.convenio || "Particular";
    const fechaAtencion = escapeHTML(pData.fechaAtencion || (orden.fechaHora ? String(orden.fechaHora).split(',')[0].trim() : '13/10/26'));
    const fechaEmision = escapeHTML(pData.fechaEmision || new Date().toLocaleDateString('es-PE', { day: '2-digit', month: '2-digit', year: '2-digit' }));
    const tecnologia = escapeHTML(pData.tecnologia || 'Análisis realizado con el Spectrum Compact CE System / VersaPlex™ 27PY System / GeneMarker®HID Software');
    const casoTitulo = escapeHTML(pData.casoTitulo || 'PAT-2610');
    
    const madreNombre = escapeHTML(pData.madreNombre || 'ESTRELLA LUCERO CASTRO ALFARO');
    const madreMuestra = escapeHTML(pData.madreTipoMuestra || 'Bucal / Sangre');
    const madrePrueba = escapeHTML(pData.madrePruebaNro || '2610-10');

    const menorNombre = escapeHTML(pData.menorNombre || orden.nombre || 'AITANA LUCERO');
    const menorCui = escapeHTML(pData.menorCui || 'CUI:94778406');
    const menorMuestra = escapeHTML(pData.menorTipoMuestra || 'Bucal / Sangre');
    const menorPrueba = escapeHTML(pData.menorPruebaNro || '2610-20');

    const padreNombre = escapeHTML(pData.padreNombre || 'DIONEL GOMEZ PEÑA');
    const padreMuestra = escapeHTML(pData.padreTipoMuestra || 'Bucal / Sangre');
    const padrePrueba = escapeHTML(pData.padrePruebaNro || '2610-30');

    const interpretacion = escapeHTML(pData.interpretacion || '');
    const ipc = escapeHTML(pData.ipcAcumulado || '0');
    const prob = escapeHTML(pData.probabilidadAcumulada || '0%');
    const notaLab = escapeHTML(pData.notaLaboratorio || 'Basado en las muestras recibidas de labotatorio VITAL HEALTH el cual provee los nombres de las partes probadas que aparecen en este reporte.');

    let filasLociHTML = '';
    (pData.loci || LOCI_PATERNIDAD_LEGAL_DEFECTO).forEach(l => {
        const locusNom = escapeHTML(l.locus);
        const ipVal = escapeHTML(l.ip ?? '');
        const m1Val = escapeHTML(l.m1 ?? '');
        const m2Val = escapeHTML(l.m2 ?? '');
        const hijo1Val = escapeHTML(l.hijo1 ?? '');
        const hijo2Val = escapeHTML(l.hijo2 ?? '');
        const p1Val = escapeHTML(l.p1 ?? '');
        const p2Val = escapeHTML(l.p2 ?? '');

        filasLociHTML += `
            <tr style="height: 18px; border-bottom: 0.5px solid #000000;">
                <td style="font-weight: 700; text-align: left; padding: 1px 4px; font-size: 9.2px;">${locusNom}</td>
                <td style="font-weight: 700; text-align: center; padding: 1px 2px; font-size: 9.2px; border-right: 1.5px solid #000000;">${ipVal}</td>
                <td style="text-align: center; padding: 1px 2px; font-size: 9.2px; width: 13%;">${m1Val}</td>
                <td style="text-align: center; padding: 1px 2px; font-size: 9.2px; width: 13%; border-right: 1.5px solid #000000;">${m2Val}</td>
                <td style="text-align: center; padding: 1px 2px; font-size: 9.2px; width: 13%;">${hijo1Val}</td>
                <td style="text-align: center; padding: 1px 2px; font-size: 9.2px; width: 13%; border-right: 1.5px solid #000000;">${hijo2Val}</td>
                <td style="text-align: center; padding: 1px 2px; font-size: 9.2px; width: 13%;">${p1Val}</td>
                <td style="text-align: center; padding: 1px 2px; font-size: 9.2px; width: 13%;">${p2Val}</td>
            </tr>
        `;
    });

    return `
        <div class="adn-paternidad-contenedor adn-paternidad-legal-contenedor" style="font-family: Arial, Helvetica, sans-serif; color: #000000; width: 100%; box-sizing: border-box; margin: 0 auto; line-height: 1.25; display: flex; flex-direction: column; justify-content: space-between; min-height: 275mm; page-break-inside: avoid; break-inside: avoid;">
            <div style="flex: 0 0 auto;">
                <!-- ENCABEZADO HABITUAL CON LOGO Y CÓDIGO QR -->
                ${cabeceraHabitual}
            </div>

            <div style="flex: 1 1 auto;">
                <!-- TÍTULO OFICIAL LEGAL -->
                <div style="text-align: center; margin: 3px 0 2px 0;">
                    <div style="font-size: 15.5px; font-weight: 900; letter-spacing: 0.8px; color: #000000; text-transform: uppercase;">PRUEBA DE PATERNIDAD LEGAL</div>
                </div>

                <!-- CUADRO DE DATOS DE CASO CON CONVENIO -->
                <div style="background-color: #e2f0d9; border: 1px solid #b7d7a8; padding: 4px 10px; margin-bottom: 4px; font-size: 10.5px; line-height: 1.35; display: flex; justify-content: space-between; align-items: center;">
                    <div>
                        <div style="display: flex; margin-bottom: 1px;">
                            <span style="width: 140px; font-weight: 700; color: #1f3864;">Código de caso</span>
                            <span style="font-weight: 700; color: #000000;">${codigoCaso}</span>
                        </div>
                        <div style="display: flex; margin-bottom: 1px;">
                            <span style="width: 140px; font-weight: 700; color: #1f3864;">Fecha de atención</span>
                            <span style="font-weight: 700; color: #000000;">${fechaAtencion}</span>
                        </div>
                        <div style="display: flex;">
                            <span style="width: 140px; font-weight: 700; color: #1f3864;">Fecha de emisión</span>
                            <span style="font-weight: 700; color: #000000;">${fechaEmision}</span>
                        </div>
                    </div>
                </div>

                <!-- SUBTÍTULO TECNOLOGÍA EXACTA -->
                <div style="text-align: center; font-size: 7.8px; font-weight: 700; color: #000000; margin-bottom: 3px; letter-spacing: 0.2px;">
                    ${tecnologia}
                </div>

                <!-- CUADRO COMPARATIVO COMPLETO LEGAL (IDENTICO AL PDF DE 4 COLUMNAS) -->
                <table class="adn-tabla-comparativa-legal" style="width: 100%; border-collapse: collapse; border: 1.5px solid #000000; font-size: 9.5px; margin-bottom: 4px;">
                    <thead>
                        <!-- FILA 1: CASO Y NOMBRES -->
                        <tr style="border-bottom: 1.5px solid #000000;">
                            <th colspan="2" style="border-right: 1.5px solid #000000; text-align: left; padding: 2px 4px; width: 22%; background: #ffffff;">
                                <span style="font-weight: 700; font-size: 9.5px;">Caso: ${casoTitulo}</span><br>
                                <span style="font-weight: 700; font-size: 9.5px;">Nombre</span>
                            </th>
                            <th colspan="2" style="border-right: 1.5px solid #000000; text-align: center; padding: 2px 4px; width: 26%; background: #ffffff;">
                                <span style="font-weight: 800; font-size: 9px; text-transform: uppercase;">MADRE BIOLÓGICA</span><br>
                                <span style="font-weight: 800; font-size: 9.5px; text-transform: uppercase;">${madreNombre}</span>
                            </th>
                            <th colspan="2" style="border-right: 1.5px solid #000000; text-align: center; padding: 2px 4px; width: 26%; background: #ffffff;">
                                <span style="font-weight: 800; font-size: 9px; text-transform: uppercase;">MENOR</span><br>
                                <span style="font-weight: 800; font-size: 9.5px; text-transform: uppercase;">${menorNombre}</span>
                                ${menorCui ? `<br><span style="font-weight: 700; font-size: 8.5px;">${menorCui}</span>` : ''}
                            </th>
                            <th colspan="2" style="text-align: center; padding: 2px 4px; width: 26%; background: #ffffff;">
                                <span style="font-weight: 800; font-size: 9px; text-transform: uppercase;">PRESUNTO PADRE</span><br>
                                <span style="font-weight: 800; font-size: 9.5px; text-transform: uppercase;">${padreNombre}</span>
                            </th>
                        </tr>
                        <!-- FILA 2: TIPO DE MUESTRAS -->
                        <tr style="border-bottom: 1px solid #000000;">
                            <th colspan="2" style="border-right: 1.5px solid #000000; text-align: left; padding: 1.5px 4px; font-weight: 700; background: #ffffff;">
                                Tipo de muestras
                            </th>
                            <th colspan="2" style="border-right: 1.5px solid #000000; text-align: center; padding: 1.5px 4px; font-weight: normal; background: #ffffff;">
                                ${madreMuestra}
                            </th>
                            <th colspan="2" style="border-right: 1.5px solid #000000; text-align: center; padding: 1.5px 4px; font-weight: normal; background: #ffffff;">
                                ${menorMuestra}
                            </th>
                            <th colspan="2" style="text-align: center; padding: 1.5px 4px; font-weight: normal; background: #ffffff;">
                                ${padreMuestra}
                            </th>
                        </tr>
                        <!-- FILA 3: PRUEBA N° -->
                        <tr style="border-bottom: 1.5px solid #000000;">
                            <th colspan="2" style="border-right: 1.5px solid #000000; text-align: left; padding: 1.5px 4px; font-weight: 700; background: #ffffff;">
                                Prueba N°
                            </th>
                            <th colspan="2" style="border-right: 1.5px solid #000000; text-align: center; padding: 1.5px 4px; font-weight: 700; background: #ffffff;">
                                ${madrePrueba}
                            </th>
                            <th colspan="2" style="border-right: 1.5px solid #000000; text-align: center; padding: 1.5px 4px; font-weight: 700; background: #ffffff;">
                                ${menorPrueba}
                            </th>
                            <th colspan="2" style="text-align: center; padding: 1.5px 4px; font-weight: 700; background: #ffffff;">
                                ${padrePrueba}
                            </th>
                        </tr>
                        <!-- FILA 4: CABECERA TAMAÑO DE ALELO -->
                        <tr style="border-bottom: 1.5px solid #000000; background-color: #ffffff;">
                            <th style="width: 14%; padding: 2px 3px; text-align: left; font-weight: 700; font-size: 9.5px;">Loci</th>
                            <th style="border-right: 1.5px solid #000000; width: 8%; padding: 2px 2px; text-align: center; font-weight: 700; font-size: 9.5px;">IP</th>
                            <th colspan="2" style="border-right: 1.5px solid #000000; width: 26%; padding: 2px 3px; text-align: center; font-weight: 700; font-size: 9px;">Tamaño de Alelo</th>
                            <th colspan="2" style="border-right: 1.5px solid #000000; width: 26%; padding: 2px 3px; text-align: center; font-weight: 700; font-size: 9px;">Tamaño de Alelo</th>
                            <th colspan="2" style="width: 26%; padding: 2px 3px; text-align: center; font-weight: 700; font-size: 9px;">Tamaño de Alelo</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${filasLociHTML}
                    </tbody>
                </table>

                <!-- CUADRO DE INTERPRETACIÓN PERICIAL -->
                <div style="border: 1.5px solid #000000; padding: 4px 6px; margin-bottom: 4px; font-size: 9.2px; line-height: 1.35; background: #ffffff;">
                    <div style="font-weight: 700; margin-bottom: 1px;">Interpretación:</div>
                    <div style="text-align: justify; color: #000000;">
                        ${interpretacion}
                    </div>
                </div>

                <!-- CUADRO DE RESULTADOS GLOBALES Y FIRMAS LEGALES (SELLO Y FIRMA DE CHRISTIAN CANCHO) -->
                <div style="border: 1.5px solid #000000; margin-bottom: 3px; display: flex; background: #ffffff;">
                    <!-- COLUMNA IZQUIERDA: RESULTADOS GLOBALES -->
                    <div style="flex: 1 1 48%; border-right: 1.5px solid #000000; padding: 4px 8px; display: flex; flex-direction: column; justify-content: space-between;">
                        <div>
                            <div style="text-align: center; font-weight: 800; font-size: 11.5px; margin-bottom: 3px; letter-spacing: 0.5px;">
                                RESULTADOS GLOBALES
                            </div>
                            <div style="font-size: 9.5px; margin-bottom: 2px;">
                                <span style="font-weight: 700;">ÍNDICE DE PATERNIDAD ACUMULATIVO:</span> 
                                <span style="font-weight: 800; font-size: 13.5px;">${ipc}</span>
                            </div>
                            <div style="font-size: 9.5px; margin-bottom: 4px;">
                                <span style="font-weight: 700;">PROBABILIDAD DE PATERNIDAD ACUMULATIVA:</span> 
                                <span style="font-weight: 800; font-size: 13.5px;">${prob}</span>
                            </div>
                        </div>
                        <div style="font-size: 8px; color: #222222; line-height: 1.25; margin-top: 2px;">
                            ${notaLab}
                        </div>
                    </div>

                    <!-- COLUMNA DERECHA: DOS CUADROS (TOMA DE MUESTRA Y ANALISIS CON SELLO/FIRMA) -->
                    <div style="flex: 1 1 52%; display: flex;">
                        <!-- CUADRO 1: TOMA DE MUESTRA -->
                        <div style="flex: 1 1 50%; border-right: 1.5px solid #000000; display: flex; flex-direction: column;">
                            <div style="font-weight: 800; font-size: 7.2px; text-align: center; padding: 2px 2px; border-bottom: 1.5px solid #000000; line-height: 1.15; background: #ffffff;">
                                PERSONAL A CARGO DE LA TOMA<br>DE LA MUESTRA
                            </div>
                            <div style="flex: 1 1 auto; min-height: 75px; background: #ffffff;">
                                <!-- Espacio libre para firma/sello de toma -->
                            </div>
                        </div>

                        <!-- CUADRO 2: ANALISIS DE LA MUESTRA CON SELLO Y FIRMA DE CHRISTIAN CANCHO -->
                        <div style="flex: 1 1 50%; display: flex; flex-direction: column;">
                            <div style="font-weight: 800; font-size: 7.2px; text-align: center; padding: 2px 2px; border-bottom: 1.5px solid #000000; line-height: 1.15; background: #ffffff;">
                                PERSONAL A CARGO DEL ANALISIS DE<br>LA MUESTRA
                            </div>
                            <div style="flex: 1 1 auto; min-height: 75px; display: flex; align-items: center; justify-content: center; padding: 2px;">
                                <img src="sello-firma-biologo-legal.png" alt="Sello y Firma del Biólogo Genetista" style="max-height: 70px; max-width: 98%; object-fit: contain; display: block;" onerror="this.src='./sello-firma-biologo-legal.png'">
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- SEDES Y PIE DE PÁGINA HABITUAL DE VITAL HEALTH -->
            <div style="flex: 0 0 auto; margin-top: auto;">
                <div style="display: flex; justify-content: space-between; font-size: 7.5px; color: #94a3b8; padding: 1px 4px; margin-bottom: 1px;">
                    <span>Santiago de Surco (Sede Central, Lima)</span>
                    <span>Los Olivos (Sede Lima Norte)</span>
                    <span>Yanahuara, Arequipa</span>
                    <span>Piura, Piura</span>
                </div>
                ${pieHabitual}
            </div>
        </div>
    `;
}


function debeOcultarFirma(orden) {
    if (!orden) return false;
    if (orden.ocultarFirma === true) return true;
    const examenes = orden.examenes || orden.resultados || [];
    return examenes.some(e => esExamenPaternidad(e));
}

function cambiarOcultarFirma(nroOrden, ocultar) {
    const orden = (ordenesRegistradas || []).find(o => o.nroOrden === nroOrden);
    if (!orden) return;
    orden.ocultarFirma = !!ocultar;
    persistirDatos();
    window.nubeGuardarOrden?.(orden);
}
window.debeOcultarFirma = debeOcultarFirma;
window.cambiarOcultarFirma = cambiarOcultarFirma;

// Lista de los 24 Loci STR canónicos en el orden exacto del PDF pericial
const LOCI_PATERNIDAD_DEFECTO = [
    { locus: 'D3S1358', ip: '1.55', m1: '15', m2: '', p1: '15', p2: '16' },
    { locus: 'D1S1656', ip: '2.19', m1: '13', m2: '16', p1: '13', p2: '15' },
    { locus: 'D2S441', ip: '2.97', m1: '10', m2: '', p1: '10', p2: '' },
    { locus: 'D10S1248', ip: '1.47', m1: '14', m2: '', p1: '13', p2: '14' },
    { locus: 'D13S317', ip: '4.25', m1: '12', m2: '', p1: '12', p2: '' },
    { locus: 'Penta E', ip: '3.47', m1: '14', m2: '17', p1: '13', p2: '14' },
    { locus: 'D16S539', ip: '3.78', m1: '11', m2: '', p1: '11', p2: '' },
    { locus: 'D18S51', ip: '2.00', m1: '14', m2: '16', p1: '13', p2: '16' },
    { locus: 'D2S1338', ip: '2.59', m1: '18', m2: '19', p1: '19', p2: '' },
    { locus: 'CSF1PO', ip: '4.88', m1: '12', m2: '13', p1: '12', p2: '13' },
    { locus: 'Penta D', ip: '1.61', m1: '11', m2: '12', p1: '9', p2: '11' },
    { locus: 'TH01', ip: '2.09', m1: '6', m2: '9.3', p1: '6', p2: '' },
    { locus: 'vWA', ip: '2.03', m1: '16', m2: '17', p1: '17', p2: '' },
    { locus: 'D21S11', ip: '7.37', m1: '29', m2: '33.2', p1: '32.2', p2: '33.2' },
    { locus: 'D7S820', ip: '2.07', m1: '8', m2: '10', p1: '8', p2: '11' },
    { locus: 'D5S818', ip: '1.48', m1: '11', m2: '12', p1: '12', p2: '' },
    { locus: 'TPOX', ip: '1.03', m1: '8', m2: '', p1: '8', p2: '12' },
    { locus: 'D8S1179', ip: '2.89', m1: '12', m2: '14', p1: '12', p2: '14' },
    { locus: 'D12S391', ip: '2.23', m1: '18', m2: '21', p1: '20', p2: '21' },
    { locus: 'D19S433', ip: '0.71', m1: '12.2', m2: '14', p1: '14', p2: '15' },
    { locus: 'D6S1043', ip: '19.69', m1: '14', m2: '22.3', p1: '21.3', p2: '22.3' },
    { locus: 'D22S1045', ip: '1.43', m1: '16', m2: '', p1: '15', p2: '16' },
    { locus: 'FGA', ip: '3.11', m1: '19', m2: '22', p1: '19', p2: '23' },
    { locus: 'Amelogenina', ip: '', m1: 'X', m2: '', p1: 'X', p2: 'Y' }
];

function extraerDatosPaternidadDeOrden(orden, guardado) {
    const d = {
        codigoCaso: 'PAV-2609',
        fechaAtencion: '',
        fechaEmision: new Date().toLocaleDateString('es-PE', { day: '2-digit', month: '2-digit', year: '2-digit' }),
        tecnologia: 'Análisis realizado con el Spectrum Compact CE System / VersaPlex™ 27PY System / GeneMarker®HID Software',
        casoTitulo: 'PAV-2609',
        menorNombre: '',
        menorTipoMuestra: 'Bucal',
        menorPruebaNro: '2609-20',
        padreNombre: '',
        padreTipoMuestra: 'Bucal',
        padrePruebaNro: '2609-30',
        interpretacion: 'El presunto padre no es excluído como el padre biológico del niño(a) examinado(a). Basándose en los resultados de los análisis obtenidos de los loci de ADN listados, la probabilidad de paternidad es de 99.99999992 %. Esta probabilidad de paternidad fue calculada en comparación con un individuo al azar de la población Hispanica , no analizados ni relacionados (asume una probabilidad previa igual a 0.50).',
        interpretacion: 'El presunto padre no es excluído como el padre biológico de la persona examinada. Basándose en los resultados de los análisis obtenidos de los loci de ADN listados, la probabilidad de paternidad es de 99.99999992 %. Esta probabilidad de paternidad fue calculada en comparación con un individuo al azar de la población Hispanica , no analizados ni relacionados (asume una probabilidad previa igual a 0.50).',
        ipcAcumulado: '1,321,629,527',
        probabilidadAcumulada: '99.99999992%',
        notaLaboratorio: 'Basado en las muestras recibidas de laboratorio VITAL HEALTH el cual provee los nombres de las partes probadas que aparecen en este reporte.',
        alcancePrivado: 'Solo para conocimiento propio',
        loci: JSON.parse(JSON.stringify(LOCI_PATERNIDAD_DEFECTO))
    };

    if (orden && orden.fechaHora) {
        const partesF = String(orden.fechaHora).split(',')[0].trim();
        d.fechaAtencion = partesF;
    }

    if (guardado && guardado.datosPaternidad) {
        return Object.assign(d, guardado.datosPaternidad);
    }

    if (guardado && Array.isArray(guardado.indicadores) && guardado.indicadores.length) {
        guardado.indicadores.forEach(ind => {
            const nom = String(ind.nombre || '').toUpperCase();
            if (nom.includes('CODIGO DE CASO') && ind.resultado) d.codigoCaso = ind.resultado;
            if (nom.includes('FECHA DE ATENCION') && ind.resultado) d.fechaAtencion = ind.resultado;
            if (nom.includes('FECHA DE EMISION') && ind.resultado) d.fechaEmision = ind.resultado;
            if (nom.includes('NOMBRE MENOR') && ind.resultado) d.menorNombre = ind.resultado;
            if (nom.includes('NOMBRE PRESUNTO PADRE') && ind.resultado) d.padreNombre = ind.resultado;
            if (nom.includes('INTERPRETACION') && ind.resultado) d.interpretacion = ind.resultado;
            if (nom.includes('INDICE DE PATERNIDAD ACUMULATIVO') && ind.resultado) d.ipcAcumulado = ind.resultado;
            if (nom.includes('PROBABILIDAD DE PATERNIDAD ACUMULATIVA') && ind.resultado) d.probabilidadAcumulada = ind.resultado;
        });
    }

    return d;
}

function generarEditorFormularioPaternidad(ex, exIdx, orden, guardado) {
    const pData = extraerDatosPaternidadDeOrden(orden, guardado);

    let filasLoci = '';
    (pData.loci || LOCI_PATERNIDAD_DEFECTO).forEach((item, lIdx) => {
        filasLoci += `
            <tr data-p-locus-row="${lIdx}">
                <td class="text-center bg-light fw-bold" style="width: 15%;">
                    <input type="text" class="form-control form-control-sm text-center fw-bold py-1" data-p-campo="locus" value="${escapeHTML(item.locus)}">
                </td>
                <td style="width: 15%;">
                    <input type="text" class="form-control form-control-sm text-center py-1" data-p-campo="ip" placeholder="IP (ej. 1.55)" value="${escapeHTML(item.ip ?? '')}">
                </td>
                <td style="width: 17%;">
                    <input type="text" class="form-control form-control-sm text-center py-1 font-monospace" data-p-campo="m1" placeholder="Alelo 1" value="${escapeHTML(item.m1 ?? '')}">
                </td>
                <td style="width: 17%;">
                    <input type="text" class="form-control form-control-sm text-center py-1 font-monospace" data-p-campo="m2" placeholder="Alelo 2 (opc)" value="${escapeHTML(item.m2 ?? '')}">
                </td>
                <td style="width: 18%;">
                    <input type="text" class="form-control form-control-sm text-center py-1 font-monospace fw-semibold" data-p-campo="p1" placeholder="Alelo 1" value="${escapeHTML(item.p1 ?? '')}">
                </td>
                <td style="width: 18%;">
                    <input type="text" class="form-control form-control-sm text-center py-1 font-monospace fw-semibold" data-p-campo="p2" placeholder="Alelo 2 (opc)" value="${escapeHTML(item.p2 ?? '')}">
                </td>
            </tr>
        `;
    });

    return `
        <div class="list-group-item mb-3 shadow-sm border border-primary border-2 rounded card-examen-arrastrable p-3 bg-white" 
             draggable="false" 
             data-ex-card-idx="${exIdx}"
             data-paternidad-card="true">
            <div class="d-flex justify-content-between align-items-center mb-3 pb-2 border-bottom flex-wrap gap-2 bg-primary-subtle p-2 rounded">
                <div class="d-flex align-items-center gap-2">
                    <span class="badge bg-primary text-white fs-6 px-2 py-1">
                        <i class="bi bi-dna me-1"></i>PRUEBA DE PATERNIDAD INFORMATIVA (FORMATO OFICIAL)
                    </span>
                    <span class="badge bg-danger-subtle text-danger border border-danger-subtle fw-semibold">
                        <i class="bi bi-shield-slash me-1"></i>Sin Firma (Conocimiento Propio)
                    </span>
                </div>
                <div class="text-muted small">
                    <i class="bi bi-pencil-square me-1"></i>Todos los datos son 100% editables para generar el documento oficial.
                </div>
            </div>

            <!-- ENCABEZADO PERICIAL Y FECHAS -->
            <div class="card mb-3 border bg-light">
                <div class="card-header bg-white py-2 fw-bold text-dark border-bottom d-flex justify-content-between">
                    <span><i class="bi bi-folder2-open me-1 text-primary"></i>1. Identificación del Caso, Convenio y Fechas</span>
                    <small class="text-muted">Aparece en la parte superior del informe</small>
                </div>
                <div class="card-body p-3">
                    <div class="row g-2 mb-2">
                        <div class="col-md-3">
                            <label class="form-label small fw-bold mb-1">Código de caso:</label>
                            <input type="text" class="form-control form-control-sm" id="p-edit-codigoCaso" value="${escapeHTML(pData.codigoCaso)}" placeholder="ej. PAV-2609">
                        </div>
                        <div class="col-md-3">
                            <label class="form-label small fw-bold mb-1">Fecha de atención:</label>
                            <input type="text" class="form-control form-control-sm" id="p-edit-fechaAtencion" value="${escapeHTML(pData.fechaAtencion)}" placeholder="DD/MM/AA">
                        </div>
                        <div class="col-md-3">
                            <label class="form-label small fw-bold mb-1">Fecha de emisión:</label>
                            <input type="text" class="form-control form-control-sm" id="p-edit-fechaEmision" value="${escapeHTML(pData.fechaEmision)}" placeholder="DD/MM/AA">
                        </div>
                    </div>
                    <div class="row g-2">
                        <div class="col-12">
                            <label class="form-label small fw-bold mb-1">Texto de Tecnología / Plataforma (encima del cuadro):</label>
                            <input type="text" class="form-control form-control-sm bg-white" id="p-edit-tecnologia" value="${escapeHTML(pData.tecnologia)}">
                        </div>
                    </div>
                </div>
            </div>

            <!-- PARTICIPANTES Y MUESTRAS -->
            <div class="card mb-3 border bg-light">
                <div class="card-header bg-white py-2 fw-bold text-dark border-bottom">
                    <i class="bi bi-people me-1 text-primary"></i>2. Datos de los Participantes y Muestras
                </div>
                <div class="card-body p-3">
                    <div class="row g-3">
                        <div class="col-md-6 border-end">
                            <h6 class="fw-bold text-primary mb-2"><i class="bi bi-person me-1"></i>MENOR / EXAMINADO(A)</h6>
                            <div class="mb-2">
                                <label class="form-label small mb-1">Nombre Completo del Menor:</label>
                                <input type="text" class="form-control form-control-sm fw-bold" id="p-edit-menorNombre" value="${escapeHTML(pData.menorNombre || orden.nombre)}" placeholder="ej. NORMA">
                            </div>
                            <div class="row g-2">
                                <div class="col-6">
                                    <label class="form-label small mb-1">Tipo de muestra:</label>
                                    <input type="text" class="form-control form-control-sm" id="p-edit-menorTipoMuestra" value="${escapeHTML(pData.menorTipoMuestra)}" placeholder="Bucal">
                                </div>
                                <div class="col-6">
                                    <label class="form-label small mb-1">Prueba N°:</label>
                                    <input type="text" class="form-control form-control-sm" id="p-edit-menorPruebaNro" value="${escapeHTML(pData.menorPruebaNro)}" placeholder="2609-20">
                                </div>
                            </div>
                        </div>

                        <div class="col-md-6">
                            <h6 class="fw-bold text-success mb-2"><i class="bi bi-person-badge me-1"></i>PRESUNTO PADRE</h6>
                            <div class="mb-2">
                                <label class="form-label small mb-1">Nombre Completo del Presunto Padre:</label>
                                <input type="text" class="form-control form-control-sm fw-bold" id="p-edit-padreNombre" value="${escapeHTML(pData.padreNombre)}" placeholder="ej. ENRIQUE">
                            </div>
                            <div class="row g-2">
                                <div class="col-6">
                                    <label class="form-label small mb-1">Tipo de muestra:</label>
                                    <input type="text" class="form-control form-control-sm" id="p-edit-padreTipoMuestra" value="${escapeHTML(pData.padreTipoMuestra)}" placeholder="Bucal">
                                </div>
                                <div class="col-6">
                                    <label class="form-label small mb-1">Prueba N°:</label>
                                    <input type="text" class="form-control form-control-sm" id="p-edit-padrePruebaNro" value="${escapeHTML(pData.padrePruebaNro)}" placeholder="2609-30">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- CUADRO COMPARATIVO DE LOCI / IP / TAMAÑO DE ALELO -->
            <div class="card mb-3 border">
                <div class="card-header bg-dark text-white py-2 d-flex justify-content-between align-items-center">
                    <span class="fw-bold"><i class="bi bi-table me-1"></i>3. Cuadro Comparativo de Marcadores STR (24 Loci con IP y Alelos)</span>
                    <small class="opacity-75">Orden idéntico al PDF del Spectrum Compact CE</small>
                </div>
                <div class="table-responsive p-0">
                    <table class="table table-bordered table-sm align-middle mb-0" id="tabla-editor-loci-paternidad">
                        <thead class="table-light text-center" style="font-size: 0.8rem;">
                            <tr>
                                <th rowspan="2" class="align-middle">Loci</th>
                                <th rowspan="2" class="align-middle">IP</th>
                                <th colspan="2" class="bg-primary-subtle text-primary border-bottom-0">MENOR (Tamaño de Alelo)</th>
                                <th colspan="2" class="bg-success-subtle text-success border-bottom-0">PRESUNTO PADRE (Tamaño de Alelo)</th>
                            </tr>
                            <tr>
                                <th class="bg-primary-subtle text-primary py-1" style="font-size: 0.75rem;">Alelo 1</th>
                                <th class="bg-primary-subtle text-primary py-1" style="font-size: 0.75rem;">Alelo 2</th>
                                <th class="bg-success-subtle text-success py-1" style="font-size: 0.75rem;">Alelo 1</th>
                                <th class="bg-success-subtle text-success py-1" style="font-size: 0.75rem;">Alelo 2</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${filasLoci}
                        </tbody>
                    </table>
                </div>
            </div>

            <!-- INTERPRETACIÓN Y RESULTADOS GLOBALES -->
            <div class="card mb-2 border bg-light">
                <div class="card-header bg-white py-2 fw-bold text-dark border-bottom">
                    <i class="bi bi-file-earmark-check me-1 text-primary"></i>4. Interpretación y Resultados Globales Bioestadísticos
                </div>
                <div class="card-body p-3">
                    <div class="mb-3">
                        <label class="form-label small fw-bold mb-1">Interpretación (Texto que va debajo del cuadro):</label>
                        <textarea class="form-control form-control-sm" id="p-edit-interpretacion" rows="3">${escapeHTML(pData.interpretacion)}</textarea>
                    </div>

                    <div class="row g-2 mb-3">
                        <div class="col-md-6">
                            <label class="form-label small fw-bold mb-1">ÍNDICE DE PATERNIDAD ACUMULATIVO (IPC):</label>
                            <input type="text" class="form-control form-control-sm fw-bold font-monospace" id="p-edit-ipcAcumulado" value="${escapeHTML(pData.ipcAcumulado)}">
                        </div>
                        <div class="col-md-6">
                            <label class="form-label small fw-bold mb-1">PROBABILIDAD DE PATERNIDAD ACUMULATIVA (%):</label>
                            <input type="text" class="form-control form-control-sm fw-bold font-monospace text-primary" id="p-edit-probabilidadAcumulada" value="${escapeHTML(pData.probabilidadAcumulada)}">
                        </div>
                    </div>

                    <div class="row g-2">
                        <div class="col-md-8">
                            <label class="form-label small fw-bold mb-1">Nota de procedencia de muestra:</label>
                            <input type="text" class="form-control form-control-sm" id="p-edit-notaLaboratorio" value="${escapeHTML(pData.notaLaboratorio)}">
                        </div>
                        <div class="col-md-4">
                            <label class="form-label small fw-bold mb-1">Alcance:</label>
                            <input type="text" class="form-control form-control-sm" id="p-edit-alcancePrivado" value="${escapeHTML(pData.alcancePrivado)}">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function abrirResultados(nroOrden) {
    const orden = (ordenesRegistradas || []).find(o => o.nroOrden === nroOrden);
    if (!orden) return;

    showSection('resultados');
    const editor = document.getElementById("resultados-editor");
    if (!editor) return;

    const totalOrd = Number(orden.total || 0);
    const aCuentaOrd = orden.aCuenta !== undefined ? Number(orden.aCuenta) : totalOrd;
    const saldoOrd = orden.saldoPendiente !== undefined ? Number(orden.saldoPendiente) : Math.max(0, totalOrd - aCuentaOrd);
    const tieneDeuda = saldoOrd > 0.009;

    let bannerAlertaDeuda = "";
    if (tieneDeuda) {
        bannerAlertaDeuda = `
            <div class="alert alert-danger border border-danger border-2 shadow-sm p-3 mb-3 rounded-3 d-flex justify-content-between align-items-center flex-wrap gap-2">
                <div class="d-flex align-items-center gap-3">
                    <span class="fs-1 text-danger"><i class="bi bi-exclamation-octagon-fill"></i></span>
                    <div>
                        <h5 class="fw-bold text-danger mb-1"><i class="bi bi-bell-fill me-1"></i>ALERTA DE COBRO: PACIENTE CON SALDO PENDIENTE</h5>
                        <div class="fs-6 text-dark">
                            El paciente <strong>${escapeHTML(orden.nombre)}</strong> (DNI: ${escapeHTML(orden.dni)}) aún debe:
                            <span class="badge bg-danger fs-6 px-2 py-1 ms-1">S/ ${saldoOrd.toFixed(2)}</span>
                            <span class="text-muted ms-2">(Total: S/ ${totalOrd.toFixed(2)} | A cuenta abonado: S/ ${aCuentaOrd.toFixed(2)})</span>
                        </div>
                        <small class="text-danger fw-semibold">
                            ⚠️ Por favor, solicite el cobro del saldo pendiente antes de entregar o emitir los resultados finales.
                        </small>
                    </div>
                </div>
                <div class="d-flex gap-2">
                    <button class="btn btn-danger fw-bold shadow-sm px-3 py-2" onclick="abrirModalGestionPago('${escapeHTML(orden.nroOrden)}')">
                        <i class="bi bi-cash-stack me-1"></i> Cobrar / Saldar Deuda Ahora
                    </button>
                </div>
            </div>
        `;
    }

    let html = `
        ${bannerAlertaDeuda}
        <div class="alert alert-secondary d-flex justify-content-between align-items-center flex-wrap gap-2 small py-2 mb-3">
            <div>
                <strong>Orden:</strong> ${escapeHTML(orden.nroOrden)} | <strong>Paciente:</strong> ${escapeHTML(orden.nombre)} (${escapeHTML(orden.dni)})
                <span class="badge bg-primary-subtle text-primary border border-primary-subtle ms-2">Sexo: ${escapeHTML(orden.sexo || "—")}</span>
                <span class="badge bg-secondary-subtle text-secondary border ms-1">Edad: ${escapeHTML(orden.edad || "—")}</span>
                ${tieneDeuda ? `<span class="badge bg-danger ms-2" style="cursor:pointer;" onclick="abrirModalGestionPago('${escapeHTML(orden.nroOrden)}')"><i class="bi bi-exclamation-triangle-fill me-1"></i>Debe S/ ${saldoOrd.toFixed(2)}</span>` : `<span class="badge bg-success-subtle text-success border ms-2"><i class="bi bi-check-circle-fill me-1"></i>Pagado</span>`}
                <span class="text-muted ms-2 d-block d-md-inline mt-1 mt-md-0">
                    <i class="bi bi-arrow-down-up me-1 text-primary"></i>Organiza el orden o usa los atajos rápidos de variación por sexo/edad.
                </span>
            </div>
            <div class="d-flex gap-2 flex-wrap align-items-center">
                <button class="btn ${tieneDeuda ? 'btn-danger text-white fw-bold' : 'btn-outline-secondary'} btn-sm" onclick="abrirModalGestionPago('${orden.nroOrden}')" title="Ver / gestionar pagos de esta orden"><i class="bi bi-cash-stack me-1"></i> ${tieneDeuda ? 'Cobrar Deuda' : 'Cobro'}</button>
                <button class="btn btn-outline-info btn-sm fw-semibold" onclick="abrirHistorialEvolutivo('${orden.dni}')" title="Ver Historial Evolutivo y Comparativa del Paciente"><i class="bi bi-graph-up me-1"></i> Evolución</button>
                <div class="form-check form-switch ms-1 me-1 mb-0 py-1 px-2 border rounded bg-white shadow-sm" title="Activar para omitir la firma física o de la bióloga en el informe impreso y en el PDF">
                    <input class="form-check-input ms-0 me-1" type="checkbox" id="check-ocultar-firma-${orden.nroOrden}" ${debeOcultarFirma(orden) ? 'checked' : ''} onchange="cambiarOcultarFirma('${orden.nroOrden}', this.checked)">
                    <label class="form-check-label small fw-semibold text-secondary" for="check-ocultar-firma-${orden.nroOrden}" style="font-size: 0.78rem; cursor: pointer;">
                        <i class="bi bi-pen me-1 text-muted"></i>Sin firma en informe
                    </label>
                </div>
                <button class="btn btn-success btn-sm fw-semibold" onclick="enviarResultadoWhatsApp('${orden.nroOrden}')" title="Enviar WhatsApp al paciente"><i class="bi bi-whatsapp me-1"></i> WhatsApp</button>
                <button class="btn btn-primary btn-sm" onclick="guardarResultados('${orden.nroOrden}')"><i class="bi bi-save me-1"></i> Guardar Resultados</button>
                <button class="btn btn-outline-primary btn-sm ms-1" onclick="imprimirInforme('${orden.nroOrden}')"><i class="bi bi-printer me-1"></i> Imprimir Informe</button>
                <button class="btn btn-outline-danger btn-sm ms-1" onclick="descargarInformePDF('${orden.nroOrden}')"><i class="bi bi-file-earmark-pdf me-1"></i> Descargar PDF</button>
            </div>
        </div>
        <div class="list-group" id="contenedor-cards-examenes">
    `;

    orden.examenes.forEach((ex, exIdx) => {
        const guardado = (orden.resultados || []).find(r => r.codigo === ex.codigo);
        const itemCatalogo = (typeof examenesCatalogo !== 'undefined' ? examenesCatalogo : []).find(c => c.codigo === ex.codigo);
        const nombreLimpioExamen = itemCatalogo && itemCatalogo.nombre ? itemCatalogo.nombre : ex.nombre;

        // Si es la prueba de paternidad legal o informativa, renderizar su respectivo editor pericial
        const esPatLegal = esExamenPaternidadLegal(ex) || esExamenPaternidadLegal(itemCatalogo);
        const esPatGeneral = esExamenPaternidad(ex) || esExamenPaternidad(itemCatalogo);

        if (esPatLegal) {
            html += generarEditorFormularioPaternidadLegal(ex, exIdx, orden, guardado);
            return;
        }

        if (esPatGeneral) {
            html += generarEditorFormularioPaternidad(ex, exIdx, orden, guardado);
            return;
        }

        const plantilla = obtenerIndicadoresParaOrden(ex);
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
    const cardPaternidad = editor.querySelector("[data-paternidad-card='true']");
    const cardPaternidadLegal = editor.querySelector("[data-paternidad-legal-card='true']");
    if (!grupos.length && !cardPaternidad && !cardPaternidadLegal) return false;

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

    // Si la orden incluye la prueba de paternidad legal
    let datosPaternidadLegalGuardar = null;
    if (cardPaternidadLegal) {
        const valPL = id => {
            const el = document.getElementById(id);
            return el ? el.value.trim() : "";
        };

        const lociLegalExtraidos = [];
        const filasLL = cardPaternidadLegal.querySelectorAll("[data-pl-locus-row]");
        filasLL.forEach(fl => {
            const getVal = c => {
                const el = fl.querySelector(`[data-pl-campo="${c}"]`);
                return el ? el.value.trim() : "";
            };
            lociLegalExtraidos.push({
                locus: getVal("locus"),
                ip: getVal("ip"),
                m1: getVal("m1"),
                m2: getVal("m2"),
                hijo1: getVal("hijo1"),
                hijo2: getVal("hijo2"),
                p1: getVal("p1"),
                p2: getVal("p2")
            });
        });

        datosPaternidadLegalGuardar = {
            codigoCaso: valPL("pl-edit-codigoCaso"),
            fechaAtencion: valPL("pl-edit-fechaAtencion"),
            fechaEmision: valPL("pl-edit-fechaEmision"),
            tecnologia: valPL("pl-edit-tecnologia"),
            casoTitulo: valPL("pl-edit-casoTitulo") || valPL("pl-edit-codigoCaso") || "PAT-2610",
            madreNombre: valPL("pl-edit-madreNombre"),
            madreTipoMuestra: valPL("pl-edit-madreTipoMuestra"),
            madrePruebaNro: valPL("pl-edit-madrePruebaNro"),
            menorNombre: valPL("pl-edit-menorNombre"),
            menorCui: valPL("pl-edit-menorCui"),
            menorTipoMuestra: valPL("pl-edit-menorTipoMuestra"),
            menorPruebaNro: valPL("pl-edit-menorPruebaNro"),
            padreNombre: valPL("pl-edit-padreNombre"),
            padreTipoMuestra: valPL("pl-edit-padreTipoMuestra"),
            padrePruebaNro: valPL("pl-edit-padrePruebaNro"),
            interpretacion: valPL("pl-edit-interpretacion"),
            ipcAcumulado: valPL("pl-edit-ipcAcumulado"),
            probabilidadAcumulada: valPL("pl-edit-probabilidadAcumulada"),
            notaLaboratorio: valPL("pl-edit-notaLaboratorio"),
            loci: lociLegalExtraidos
        };
    }

    // Si la orden incluye la prueba de paternidad informativa
    let datosPaternidadGuardar = null;
    if (cardPaternidad) {
        const valP = id => {
            const el = document.getElementById(id);
            return el ? el.value.trim() : "";
        };

        const lociExtraidos = [];
        const filasL = cardPaternidad.querySelectorAll("[data-p-locus-row]");
        filasL.forEach(fl => {
            const getVal = c => {
                const el = fl.querySelector(`[data-p-campo="${c}"]`);
                return el ? el.value.trim() : "";
            };
            lociExtraidos.push({
                locus: getVal("locus"),
                ip: getVal("ip"),
                m1: getVal("m1"),
                m2: getVal("m2"),
                p1: getVal("p1"),
                p2: getVal("p2")
            });
        });

        datosPaternidadGuardar = {
            codigoCaso: valP("p-edit-codigoCaso"),
            fechaAtencion: valP("p-edit-fechaAtencion"),
            fechaEmision: valP("p-edit-fechaEmision"),
            tecnologia: valP("p-edit-tecnologia"),
            casoTitulo: valP("p-edit-codigoCaso") || "PAV-2609",
            menorNombre: valP("p-edit-menorNombre"),
            menorTipoMuestra: valP("p-edit-menorTipoMuestra"),
            menorPruebaNro: valP("p-edit-menorPruebaNro"),
            padreNombre: valP("p-edit-padreNombre"),
            padreTipoMuestra: valP("p-edit-padreTipoMuestra"),
            padrePruebaNro: valP("p-edit-padrePruebaNro"),
            interpretacion: valP("p-edit-interpretacion"),
            ipcAcumulado: valP("p-edit-ipcAcumulado"),
            probabilidadAcumulada: valP("p-edit-probabilidadAcumulada"),
            notaLaboratorio: valP("p-edit-notaLaboratorio"),
            alcancePrivado: valP("p-edit-alcancePrivado"),
            loci: lociExtraidos
        };
    }

    orden.resultados = (orden.examenes || []).map((base, exIdx) => {
        const catalogo = examenesCatalogo.find(c => c.codigo === base.codigo);
        const esPatLegal = esExamenPaternidadLegal(base) || esExamenPaternidadLegal(catalogo);
        const esPat = esExamenPaternidad(base) || esExamenPaternidad(catalogo);

        if (esPatLegal && datosPaternidadLegalGuardar) {
            const indPaternidadLegal = [
                { nombre: "Datos del Caso y Participantes", esSeccion: true },
                { id: 'codigo_caso', nombre: 'Código de caso', resultado: datosPaternidadLegalGuardar.codigoCaso },
                { id: 'fecha_atencion', nombre: 'Fecha de atención', resultado: datosPaternidadLegalGuardar.fechaAtencion, referencia: 'Fecha de atención' },
                { id: 'fecha_emision', nombre: 'Fecha de emisión', resultado: datosPaternidadLegalGuardar.fechaEmision, referencia: 'Fecha de emisión' },
                { id: 'madre_nombre', nombre: 'Nombre MADRE BIOLÓGICA', resultado: datosPaternidadLegalGuardar.madreNombre, referencia: `Prueba: ${datosPaternidadLegalGuardar.madrePruebaNro}` },
                { id: 'menor_nombre', nombre: 'Nombre MENOR', resultado: datosPaternidadLegalGuardar.menorNombre, referencia: `Prueba: ${datosPaternidadLegalGuardar.menorPruebaNro}` },
                { id: 'padre_nombre', nombre: 'Nombre PRESUNTO PADRE', resultado: datosPaternidadLegalGuardar.padreNombre, referencia: `Prueba: ${datosPaternidadLegalGuardar.padrePruebaNro}` },
                { nombre: "Cuadro Comparativo de Marcadores STR", esSeccion: true }
            ];

            datosPaternidadLegalGuardar.loci.forEach(l => {
                const alelosMadre = [l.m1, l.m2].filter(Boolean).join(', ');
                const alelosHijo = [l.hijo1, l.hijo2].filter(Boolean).join(', ');
                const alelosPadre = [l.p1, l.p2].filter(Boolean).join(', ');
                indPaternidadLegal.push({
                    nombre: l.locus,
                    resultado: `IP: ${l.ip || '0.00'} | Madre: [${alelosMadre}] | Menor: [${alelosHijo}] | Padre: [${alelosPadre}]`,
                    referencia: 'Locus STR'
                });
            });

            indPaternidadLegal.push({ nombre: "Evaluación Bioestadística", esSeccion: true });
            indPaternidadLegal.push({ nombre: 'ÍNDICE DE PATERNIDAD ACUMULATIVO', resultado: datosPaternidadLegalGuardar.ipcAcumulado, referencia: '-' });
            indPaternidadLegal.push({ nombre: 'PROBABILIDAD DE PATERNIDAD ACUMULATIVA', resultado: datosPaternidadLegalGuardar.probabilidadAcumulada, referencia: '-' });
            indPaternidadLegal.push({ nombre: 'Interpretación Clínica', resultado: datosPaternidadLegalGuardar.interpretacion, referencia: '-' });

            return {
                codigo: base.codigo,
                nombre: base.nombre,
                metodo: "Spectrum Compact CE System / VersaPlex™ 27PY System / GeneMarker®HID Software",
                datosPaternidadLegal: datosPaternidadLegalGuardar,
                indicadores: indPaternidadLegal
            };
        }

        if (esPat && datosPaternidadGuardar) {
            // Formatear indicadores sintéticos para compatibilidad universal
            const indPaternidad = [
                { nombre: "Datos del Caso y Participantes", esSeccion: true },
                { id: 'codigo_caso', nombre: 'Código de caso', resultado: datosPaternidadGuardar.codigoCaso },
                { id: 'fecha_atencion', nombre: 'Fecha de atención', resultado: datosPaternidadGuardar.fechaAtencion, referencia: 'Fecha de atención' },
                { id: 'fecha_emision', nombre: 'Fecha de emisión', resultado: datosPaternidadGuardar.fechaEmision, referencia: 'Fecha de emisión' },
                { id: 'menor_nombre', nombre: 'Nombre MENOR', resultado: datosPaternidadGuardar.menorNombre, referencia: `Prueba: ${datosPaternidadGuardar.menorPruebaNro}` },
                { id: 'padre_nombre', nombre: 'Nombre PRESUNTO PADRE', resultado: datosPaternidadGuardar.padreNombre, referencia: `Prueba: ${datosPaternidadGuardar.padrePruebaNro}` },
                { nombre: "Cuadro Comparativo de Marcadores STR", esSeccion: true }
            ];

            datosPaternidadGuardar.loci.forEach(l => {
                const alelosM = [l.m1, l.m2].filter(Boolean).join(', ');
                const alelosP = [l.p1, l.p2].filter(Boolean).join(', ');
                indPaternidad.push({
                    nombre: l.locus,
                    resultado: `IP: ${l.ip || '-'} | Menor: [${alelosM}] | Padre: [${alelosP}]`,
                    referencia: 'Locus STR'
                });
            });

            indPaternidad.push({ nombre: "Evaluación Bioestadística", esSeccion: true });
            indPaternidad.push({ nombre: 'ÍNDICE DE PATERNIDAD ACUMULATIVO', resultado: datosPaternidadGuardar.ipcAcumulado, referencia: '-' });
            indPaternidad.push({ nombre: 'PROBABILIDAD DE PATERNIDAD ACUMULATIVA', resultado: datosPaternidadGuardar.probabilidadAcumulada, referencia: '-' });
            indPaternidad.push({ nombre: 'Interpretación Clínica', resultado: datosPaternidadGuardar.interpretacion, referencia: '-' });

            return {
                codigo: base.codigo,
                nombre: base.nombre,
                metodo: "",
                datosPaternidad: datosPaternidadGuardar,
                indicadores: indPaternidad
            };
        }

        return {
            codigo: base.codigo,
            nombre: base.nombre,
            metodo: (catalogo && catalogo.metodo) || "",
            indicadores: porExamen[exIdx] || []
        };
    });

    const checkOcultar = document.getElementById(`check-ocultar-firma-${nroOrden}`);
    if (checkOcultar) {
        orden.ocultarFirma = checkOcultar.checked;
    } else if (orden.examenes.some(e => esExamenPaternidad(e))) {
        orden.ocultarFirma = true;
    }

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
        { test: n => n.includes("T4 LIBRE") || n.includes("TIROXINA LIBRE") || n === "T4" || n.includes("FT4"), key: "T4 LIBRE" },
        { test: n => n.includes("TSH") || n.includes("TIROIDES ULTRASENSIBLE") || n.includes("TIROTROPINA"), key: "TSH ULTRASENSIBLE" },
        { test: n => n.includes("PROTEINA C REACTIVA") || n === "PCR" || n.startsWith("PCR ") || n.includes("PCR CUANTITATIV"), key: "PROTEINA C REACTIVA" },
        { test: n => n.includes("SEDIMENTACION") || n.includes("VSG"), key: "VELOCIDAD DE SEDIMENTACION GLOBULAR" },
        { test: n => n.includes("LEGAL") && (n.includes("PATERNIDAD") || n.includes("ADN") || n.includes("FILIACION")), key: "PRUEBA DE PATERNIDAD LEGAL" },
        { test: n => n.includes("PATERNIDAD") || n.includes("ADN") || n.includes("FILIACION"), key: "PRUEBA DE PATERNIDAD INFORMATIVA" }
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
        const tuboInfo = ex.tubo ? `<small class="text-primary d-block mt-0" style="font-size:0.75rem;"><i class="bi bi-eyedropper me-1"></i>${escapeHTML(ex.tubo)}</small>` : '';

        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${escapeHTML(ex.codigo)}</td>
            <td>
                <span class="fw-semibold">${escapeHTML(ex.nombre)}</span>
                ${tuboInfo}
            </td>
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
    setVal("cat-tubo", "");
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
    } else if (tipo === "tiroideo") {
        inputRef.value = "Adultos: 0.90 - 1.70 | Niños: 4 a 30 días: 0.83 - 3.09 | 1 a 12 meses: 0.48 - 2.34 | 1 a 6 años: 0.65 - 1.75 | 7 a 11 años: 0.90 - 1.67 | 12 a 19 años: 0.93 - 1.60";
    } else if (tipo === "pcr") {
        inputRef.value = "Normal: Menor 10 | Leve a Moderado: 10.0 - 40.0 | Moderado a Severo: 40.0 - 200.0 | Severo: > 200.0";
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
                <div class="btn-group btn-group-sm flex-wrap">
                    <button type="button" class="btn btn-outline-secondary py-0 px-2" style="font-size: 10px;" onclick="insertarPlantillaRef(this, 'sexo')" title="Plantilla rápida para Hombre y Mujer">
                        + Sexo (H/M)
                    </button>
                    <button type="button" class="btn btn-outline-secondary py-0 px-2" style="font-size: 10px;" onclick="insertarPlantillaRef(this, 'edad')" title="Plantilla rápida para Adulto, Niño y Neonato">
                        + Edad
                    </button>
                    <button type="button" class="btn btn-outline-secondary py-0 px-2" style="font-size: 10px;" onclick="insertarPlantillaRef(this, 'tiroideo')" title="Plantilla rápida por rangos etarios pediátricos y adultos">
                        + Tiroideo/Pediatría
                    </button>
                    <button type="button" class="btn btn-outline-secondary py-0 px-2" style="font-size: 10px;" onclick="insertarPlantillaRef(this, 'pcr')" title="Plantilla rápida para etapas clínicas (PCR)">
                        + PCR/Etapas
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
    const tubo = val("cat-tubo").trim();
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
        codigo, nombre, precio, muestra, metodo, tubo, plantilla, refTexto, plantillaPersonalizada, en: Date.now()
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
    setVal("cat-tubo", ex.tubo || "");
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
// CONTROL DE CAJA Y CIERRE DIARIO
// ==========================================
// Variable global de filtro de fecha para caja (por defecto fecha de hoy en formato YYYY-MM-DD)
window.fechaSeleccionadaCaja = null;

// Depuración estricta de caja: SOLO muestra los pagos correspondientes a las órdenes actualmente vigentes
// Obtiene el monto real pagado / abonado de una orden
function obtenerMontoPagadoOrden(orden) {
    if (!orden) return 0;
    const total = Number(orden.total || 0);
    if (orden.aCuenta !== undefined && orden.aCuenta !== null && String(orden.aCuenta).trim() !== "") {
        const val = Number(orden.aCuenta);
        return isNaN(val) ? 0 : Math.max(0, val);
    }
    if (orden.saldoPendiente !== undefined && orden.saldoPendiente !== null && String(orden.saldoPendiente).trim() !== "") {
        const saldo = Number(orden.saldoPendiente);
        return Math.max(0, total - (isNaN(saldo) ? 0 : saldo));
    }
    // Si la orden no tiene campo de saldo (orden creada sin abono parcial previo), se considera pagada completa
    return total;
}
window.obtenerMontoPagadoOrden = obtenerMontoPagadoOrden;

function normalizarClaveOrden(nro) {
    if (!nro) return "";
    return String(nro).trim().toUpperCase();
}

// Depuración y reconciliación estricta de caja: muestra con total precisión los pagos de órdenes vigentes
function purgarMovimientosCajaInvalidos(notificar = false) {
    if (!window.cajaEliminados) {
        window.cajaEliminados = leerJSON("vital_caja_eliminados", []);
    }
    if (!window.ordenesEliminadas) {
        window.ordenesEliminadas = leerJSON("vital_ordenes_eliminadas", []);
    }

    const mapaOrdenesActivas = new Map();
    (ordenesRegistradas || []).forEach(o => {
        if (!o || !o.nroOrden) return;
        const nroNorm = normalizarClaveOrden(o.nroOrden);
        if (window.ordenesEliminadas.includes(nroNorm)) return;
        mapaOrdenesActivas.set(nroNorm, o);
        const sinPrefijo = nroNorm.replace(/^ORD-/, "");
        mapaOrdenesActivas.set(sinPrefijo, o);
        mapaOrdenesActivas.set("ORD-" + sinPrefijo, o);
    });

    let cantEliminados = 0;
    const acumuladoPorOrden = {};
    const cajaLimpia = [];

    (cajaMovimientos || []).forEach(m => {
        if (!m) return;
        const idMovStr = String(m.id || "");
        const nroOrdStr = normalizarClaveOrden(m.nroOrden);

        // 1. Descartar si el cobro no tiene orden o si la orden fue eliminada / ya no existe
        if (!nroOrdStr || window.ordenesEliminadas.includes(nroOrdStr) || !mapaOrdenesActivas.has(nroOrdStr)) {
            cantEliminados++;
            if (typeof nubeEliminarMovimiento === "function" && idMovStr) {
                nubeEliminarMovimiento(idMovStr);
            }
            return;
        }

        const orden = mapaOrdenesActivas.get(nroOrdStr);
        const montoMov = Number(m.monto || 0);
        const montoPagadoOrd = obtenerMontoPagadoOrden(orden);

        // 2. Si la orden registra pago 0 (no ha pagado nada), descartar cobros residuales
        if (montoPagadoOrd <= 0.009 && montoMov > 0) {
            cantEliminados++;
            if (typeof nubeEliminarMovimiento === "function" && idMovStr) {
                nubeEliminarMovimiento(idMovStr);
            }
            return;
        }

        // 3. Si la suma de pagos en caja para esta orden supera el monto real pagado, descartar excedente
        const claveUnica = normalizarClaveOrden(orden.nroOrden);
        const acumuladoActual = acumuladoPorOrden[claveUnica] || 0;
        if (acumuladoActual + montoMov > montoPagadoOrd + 0.05) {
            cantEliminados++;
            if (typeof nubeEliminarMovimiento === "function" && idMovStr) {
                nubeEliminarMovimiento(idMovStr);
            }
            return;
        }

        acumuladoPorOrden[claveUnica] = acumuladoActual + montoMov;
        cajaLimpia.push(m);
    });

    // Reconciliación: Toda orden activa con pago registrado DEBE figurar en caja
    const ordenesProcesadas = new Set();
    mapaOrdenesActivas.forEach(orden => {
        const claveUnica = normalizarClaveOrden(orden.nroOrden);
        if (ordenesProcesadas.has(claveUnica)) return;
        ordenesProcesadas.add(claveUnica);

        const totalOrd = Number(orden.total || 0);
        const montoPagadoOrd = obtenerMontoPagadoOrden(orden);
        const saldoOrd = Math.max(0, totalOrd - montoPagadoOrd);

        // Mantener consistencia de estado en la orden
        orden.aCuenta = montoPagadoOrd;
        orden.saldoPendiente = saldoOrd;
        orden.estadoPago = saldoOrd > 0.009 ? "Pendiente" : "Pagado";

        const pagadoActualmenteEnCaja = acumuladoPorOrden[claveUnica] || 0;

        // Si la orden tiene un monto pagado real, pero no tiene movimiento en caja (o quedó incompleto)
        if (montoPagadoOrd > 0.009 && pagadoActualmenteEnCaja < 0.009) {
            let fechaISO = "";
            let fechaVisual = "";
            let hora = "";

            if (orden.fechaISO) {
                fechaISO = obtenerFechaISO(orden.fechaISO);
            }
            if (!fechaISO && orden.fechaHora) {
                fechaISO = obtenerFechaISO(orden.fechaHora);
                const partes = String(orden.fechaHora).split(/,\s*/);
                fechaVisual = partes[0] || "";
                hora = partes[1] || "";
            }
            if (!fechaISO && orden.en) {
                fechaISO = obtenerFechaISO(orden.en);
                const d = new Date(orden.en);
                if (!isNaN(d.getTime())) {
                    fechaVisual = d.toLocaleDateString("es-PE");
                    hora = d.toLocaleTimeString();
                }
            }
            if (!fechaISO) {
                fechaISO = obtenerFechaISO(new Date());
                fechaVisual = new Date().toLocaleDateString("es-PE");
                hora = new Date().toLocaleTimeString();
            }

            const mov = {
                id: 'mov_' + claveUnica + '_' + (orden.en || Date.now()),
                fecha: fechaISO,
                fechaVisual: fechaVisual || fechaISO,
                hora: hora || "-",
                nroOrden: orden.nroOrden,
                dni: orden.dni || "-",
                paciente: orden.nombre || "Cliente General",
                metodoPago: orden.metodoPago || "Efectivo",
                monto: montoPagadoOrd,
                concepto: saldoOrd > 0.009 ? `Pago a cuenta orden ${orden.nroOrden} (Resta S/ ${saldoOrd.toFixed(2)})` : `Pago completo orden ${orden.nroOrden}`,
                en: orden.en || Date.now()
            };

            cajaLimpia.push(mov);
            acumuladoPorOrden[claveUnica] = montoPagadoOrd;
            if (typeof nubeGuardarMovimiento === "function") {
                nubeGuardarMovimiento(mov);
            }
        }
    });

    cajaLimpia.sort((a, b) => (b.en || 0) - (a.en || 0));

    cajaMovimientos = cajaLimpia;
    sincronizarGlobals();
    persistirDatos();

    if (notificar) {
        alert(`✅ Caja sincronizada correctamente:\n\n• Se validaron todas las órdenes registradas.\n• La caja muestra los cobros vigentes de las órdenes actuales.`);
    }

    return cantEliminados;
}
window.purgarMovimientosCajaInvalidos = purgarMovimientosCajaInvalidos;

function purgarYSincronizarCajaConOrdenes(notificar = false) {
    const cantEliminados = purgarMovimientosCajaInvalidos(false);
    actualizarTotalesCaja();
    if (typeof window.nubeSincronizarTodo === "function") {
        window.nubeSincronizarTodo().catch(e => console.error("Error en sincronización con nube:", e));
    }
    if (notificar) {
        alert(`✅ Sincronización de Caja completada:\n\n• Se validaron todas las órdenes vigentes.\n• Se limpiaron cobros huérfanos o eliminados (${cantEliminados} depurados).\n• La caja ahora refleja exclusivamente los pagos de las órdenes que existen actualmente en el sistema.\n• Los cambios se enviaron a la nube para reflejarse en todos los dispositivos.`);
    }
}
window.purgarYSincronizarCajaConOrdenes = purgarYSincronizarCajaConOrdenes;

function actualizarCajaDesdeRemoto(nuevaCaja) {
    cajaMovimientos = nuevaCaja || [];
    sincronizarGlobals();
    purgarMovimientosCajaInvalidos(false);
    persistirDatos();
    actualizarTotalesCaja();
}
window.actualizarCajaDesdeRemoto = actualizarCajaDesdeRemoto;

function actualizarOrdenesDesdeRemoto(nuevasOrdenes) {
    ordenesRegistradas = nuevasOrdenes || [];
    sincronizarGlobals();
    purgarMovimientosCajaInvalidos(false);
    persistirDatos();
    cargarOrdenes();
    actualizarTotalesCaja();
}
window.actualizarOrdenesDesdeRemoto = actualizarOrdenesDesdeRemoto;

function obtenerFechaISO(fechaStrOEn) {
    if (!fechaStrOEn) return "";
    if (typeof fechaStrOEn === "number") {
        const d = new Date(fechaStrOEn);
        if (isNaN(d.getTime())) return "";
        const anio = d.getFullYear();
        const mes = String(d.getMonth() + 1).padStart(2, "0");
        const dia = String(d.getDate()).padStart(2, "0");
        return `${anio}-${mes}-${dia}`;
    }
    if (typeof fechaStrOEn === "string") {
        const str = fechaStrOEn.trim();
        if (/^\d{4}-\d{2}-\d{2}$/.test(str)) return str;
        // Soporte completo para formato peruano DD/MM/YYYY o DD-MM-YYYY o estadounidense MM/DD/YYYY
        const match = str.match(/^(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})/);
        if (match) {
            let part1 = parseInt(match[1], 10);
            let part2 = parseInt(match[2], 10);
            const anio = match[3];
            let dia, mes;
            if (part2 > 12 && part1 <= 12) {
                // Formato MM/DD/YYYY
                mes = String(part1).padStart(2, "0");
                dia = String(part2).padStart(2, "0");
            } else {
                // Formato estándar DD/MM/YYYY
                dia = String(part1).padStart(2, "0");
                mes = String(part2).padStart(2, "0");
            }
            return `${anio}-${mes}-${dia}`;
        }
        const d = new Date(str);
        if (!isNaN(d.getTime())) {
            const anio = d.getFullYear();
            const mes = String(d.getMonth() + 1).padStart(2, "0");
            const dia = String(d.getDate()).padStart(2, "0");
            return `${anio}-${mes}-${dia}`;
        }
    }
    const d = new Date(fechaStrOEn);
    if (isNaN(d.getTime())) return "";
    const anio = d.getFullYear();
    const mes = String(d.getMonth() + 1).padStart(2, "0");
    const dia = String(d.getDate()).padStart(2, "0");
    return `${anio}-${mes}-${dia}`;
}
window.obtenerFechaISO = obtenerFechaISO;

function filtrarCajaPorFecha(fechaValor) {
    window.fechaSeleccionadaCaja = fechaValor || null;
    actualizarTotalesCaja();
}
window.filtrarCajaPorFecha = filtrarCajaPorFecha;

function cargarCajaHoy() {
    const hoyStr = obtenerFechaISO(new Date());
    window.fechaSeleccionadaCaja = hoyStr;
    const inputFecha = document.getElementById("filtro-caja-fecha");
    if (inputFecha) inputFecha.value = hoyStr;
    actualizarTotalesCaja();
}
window.cargarCajaHoy = cargarCajaHoy;

function verTodosLosCobrosCaja() {
    window.fechaSeleccionadaCaja = "todos";
    const inputFecha = document.getElementById("filtro-caja-fecha");
    if (inputFecha) inputFecha.value = "";
    actualizarTotalesCaja();
}
window.verTodosLosCobrosCaja = verTodosLosCobrosCaja;

// Normaliza un movimiento de caja asegurando fecha, hora, DNI y paciente
function normalizarMovimientoCaja(m) {
    if (!m) return {};
    let fechaISO = "";
    if (m.fecha) fechaISO = obtenerFechaISO(m.fecha);
    if (!fechaISO && m.en) fechaISO = obtenerFechaISO(m.en);
    if (!fechaISO && m.nroOrden) {
        const ord = (ordenesRegistradas || []).find(o => normalizarClaveOrden(o.nroOrden) === normalizarClaveOrden(m.nroOrden));
        if (ord) fechaISO = obtenerFechaISO(ord.fechaISO || ord.fechaHora || ord.en);
    }
    if (!fechaISO) fechaISO = obtenerFechaISO(new Date());

    let fechaVisual = m.fechaVisual || "";
    if (!fechaVisual && fechaISO) {
        const partes = fechaISO.split("-");
        if (partes.length === 3) fechaVisual = `${partes[2]}/${partes[1]}/${partes[0]}`;
    }

    let hora = m.hora || "";
    if (!hora && m.en) {
        const d = new Date(m.en);
        if (!isNaN(d.getTime())) hora = d.toLocaleTimeString();
    }

    return {
        ...m,
        fecha: fechaISO,
        fechaVisual: fechaVisual || fechaISO,
        hora: hora || "-",
        dni: m.dni || "-",
        paciente: m.paciente || "Cliente General",
        metodoPago: m.metodoPago || "Efectivo",
        monto: Number(m.monto || 0)
    };
}
window.normalizarMovimientoCaja = normalizarMovimientoCaja;

function actualizarTotalesCaja() {
    purgarMovimientosCajaInvalidos(false);

    // Si no hay fecha elegida, fijar hoy en el input
    const inputFecha = document.getElementById("filtro-caja-fecha");
    const hoyISO = obtenerFechaISO(new Date());
    if (window.fechaSeleccionadaCaja === null) {
        window.fechaSeleccionadaCaja = hoyISO;
        if (inputFecha && !inputFecha.value) inputFecha.value = hoyISO;
    }

    const fechaFiltro = window.fechaSeleccionadaCaja;
    const movimientosNormalizados = (cajaMovimientos || []).map(normalizarMovimientoCaja);

    // Filtrar movimientos según la fecha seleccionada
    let movimientosFiltrados = movimientosNormalizados;
    let textoSubtitulo = "Mostrando cobros de hoy";
    if (fechaFiltro && fechaFiltro !== "todos") {
        movimientosFiltrados = movimientosNormalizados.filter(m => m.fecha === fechaFiltro);
        textoSubtitulo = fechaFiltro === hoyISO 
            ? `Mostrando cobros de hoy (${new Date().toLocaleDateString("es-PE")})` 
            : `Mostrando cobros del día: ${fechaFiltro.split("-").reverse().join("/")}`;
    } else if (fechaFiltro === "todos") {
        textoSubtitulo = `Mostrando histórico completo de cobros (${movimientosNormalizados.length} movimientos)`;
    }

    const subEl = document.getElementById("caja-subtitulo-fecha");
    if (subEl) subEl.textContent = textoSubtitulo;

    let totalRecaudado = 0;
    let efectivo = 0;
    let yape = 0;
    let plin = 0;
    let tarjeta = 0;

    movimientosFiltrados.forEach(m => {
        const monto = Number(m.monto || 0);
        totalRecaudado += monto;
        const metodo = String(m.metodoPago || "").trim().toLowerCase();
        if (metodo === "efectivo") {
            efectivo += monto;
        } else if (metodo === "yape") {
            yape += monto;
        } else if (metodo === "plin") {
            plin += monto;
        } else {
            tarjeta += monto;
        }
    });

    const setTxt = (id, txt) => { const el = document.getElementById(id); if (el) el.textContent = txt; };
    setTxt("caja-total-hoy", totalRecaudado.toFixed(2));
    setTxt("caja-efectivo", efectivo.toFixed(2));
    setTxt("caja-yape", yape.toFixed(2));
    setTxt("caja-plin", plin.toFixed(2));
    setTxt("caja-tarjeta", tarjeta.toFixed(2));

    const tbody = document.getElementById("caja-tabla-body");
    if (tbody) {
        tbody.innerHTML = "";
        if (movimientosFiltrados.length === 0) {
            tbody.innerHTML = `<tr><td colspan="8" class="text-center text-muted py-4">No se encontraron movimientos registrados para la fecha seleccionada.</td></tr>`;
        } else {
            movimientosFiltrados.forEach(m => {
                if (!m.id) m.id = 'mov_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5);
                const tr = document.createElement("tr");
                tr.innerHTML = `
                    <td><small class="text-secondary fw-semibold">${escapeHTML(m.fechaVisual || m.fecha)}</small></td>
                    <td>${escapeHTML(m.hora)}</td>
                    <td class="fw-bold text-primary">${escapeHTML(m.nroOrden)}</td>
                    <td><span class="badge bg-light text-dark border">${escapeHTML(m.dni)}</span></td>
                    <td class="fw-semibold">${escapeHTML(m.paciente)}</td>
                    <td><span class="badge bg-info text-dark">${escapeHTML(m.metodoPago)}</span></td>
                    <td class="fw-bold text-success">S/ ${Number(m.monto || 0).toFixed(2)}</td>
                    <td class="text-end">
                        <button class="btn btn-sm btn-outline-danger" onclick="eliminarMovimientoCaja('${m.id}')" title="Eliminar cobro de caja">
                            <i class="bi bi-trash"></i>
                        </button>
                    </td>
                `;
                tbody.appendChild(tr);
            });
        }
    }

    // Actualizar reporte de productividad y demanda de reactivos
    renderizarTopExamenesCaja(fechaFiltro);
}

// Renderiza el Top 10 de exámenes más solicitados para gestión y compras de reactivos
function renderizarTopExamenesCaja(fechaFiltro) {
    const tbody = document.getElementById("top-examenes-body");
    const subtitulo = document.getElementById("top-examenes-subtitulo");
    if (!tbody) return;

    let ordenes = (ordenesRegistradas || []);
    let etiquetaPeriodo = "del periodo histórico general";
    const hoyISO = obtenerFechaISO(new Date());

    if (fechaFiltro && fechaFiltro !== "todos") {
        ordenes = ordenes.filter(o => obtenerFechaISO(o.fechaHora || o.en) === fechaFiltro);
        etiquetaPeriodo = fechaFiltro === hoyISO 
            ? `de hoy (${new Date().toLocaleDateString("es-PE")})` 
            : `del día ${fechaFiltro.split("-").reverse().join("/")}`;
    }

    if (subtitulo) {
        subtitulo.innerHTML = `Demanda de pruebas para control de reactivos e insumos <strong>${etiquetaPeriodo}</strong> (${ordenes.length} órdenes analizadas).`;
    }

    const mapa = {};
    let totalGeneralVeces = 0;

    ordenes.forEach(ord => {
        (ord.examenes || []).forEach(ex => {
            const cod = String(ex.codigo || ex.id || "").trim();
            const nombre = resolverNombreExamenCatalogo(ex) || ex.nombre;
            const cant = Number(ex.cantidad || 1);
            const precio = Number(ex.precio || 0);
            const clave = cod || nombre;

            if (!mapa[clave]) {
                const exCat = examenesCatalogo.find(c => String(c.codigo) === cod || c.nombre === nombre);
                mapa[clave] = {
                    codigo: cod || "-",
                    nombre: nombre,
                    tubo: (exCat && (exCat.tubo || exCat.muestra)) || "Tubo estándar / Suero",
                    veces: 0,
                    monto: 0
                };
            }
            mapa[clave].veces += cant;
            mapa[clave].monto += (cant * precio);
            totalGeneralVeces += cant;
        });
    });

    const ranking = Object.values(mapa).sort((a, b) => b.veces - a.veces).slice(0, 10);
    window.topExamenesActuales = ranking;

    tbody.innerHTML = "";
    if (ranking.length === 0) {
        tbody.innerHTML = `<tr><td colspan="6" class="text-center text-muted py-4"><i class="bi bi-info-circle me-1"></i>No hay órdenes registradas en este periodo para generar el ranking.</td></tr>`;
        return;
    }

    const maxVeces = ranking[0].veces || 1;

    ranking.forEach((item, index) => {
        const pct = totalGeneralVeces > 0 ? ((item.veces / totalGeneralVeces) * 100).toFixed(1) : "0.0";
        const barPct = Math.round((item.veces / maxVeces) * 100);
        const badgeColor = index === 0 ? "bg-warning text-dark fw-bold" : (index === 1 ? "bg-secondary text-white fw-bold" : (index === 2 ? "bg-info text-white fw-bold" : "bg-light text-dark border fw-semibold"));

        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td class="text-center"><span class="badge ${badgeColor} rounded-circle px-2 py-1">${index + 1}</span></td>
            <td>
                <strong class="text-dark">${escapeHTML(item.nombre)}</strong>
                <small class="text-muted d-block" style="font-size:0.75rem;">Cód: ${escapeHTML(item.codigo)}</small>
            </td>
            <td>
                <span class="badge bg-light text-primary border border-primary-subtle px-2 py-1" style="font-size:0.75rem;">
                    <i class="bi bi-eyedropper me-1"></i>${escapeHTML(item.tubo)}
                </span>
            </td>
            <td class="text-center fw-bold fs-6 text-primary">${item.veces}</td>
            <td>
                <div class="d-flex align-items-center gap-2">
                    <div class="progress flex-grow-1" style="height: 8px;">
                        <div class="progress-bar bg-primary" role="progressbar" style="width: ${barPct}%;" aria-valuenow="${barPct}" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                    <small class="text-muted fw-semibold" style="min-width: 45px;">${pct}%</small>
                </div>
            </td>
            <td class="text-end fw-bold text-success">S/ ${item.monto.toFixed(2)}</td>
        `;
        tbody.appendChild(tr);
    });
}

// Exporta el ranking de los 10 exámenes más pedidos a Excel (.xlsx)
function exportarTopExamenesExcel() {
    const ranking = window.topExamenesActuales || [];
    if (!ranking || ranking.length === 0) {
        alert("No hay exámenes en el ranking actual para exportar.");
        return;
    }
    const fechaFiltro = window.fechaSeleccionadaCaja || "historico";
    const etiquetaFecha = (fechaFiltro === "todos" || !fechaFiltro) ? "HISTORICO_COMPLETO" : fechaFiltro;

    const datos = [
        ["CENTRO MÉDICO VITAL HEALTH - LABORATORIO CLÍNICO"],
        ["REPORTE DE PRODUCTIVIDAD Y TOP EXÁMENES MÁS SOLICITADOS"],
        [`Periodo evaluado: ${etiquetaFecha}`],
        [`Fecha de Emisión: ${new Date().toLocaleString("es-PE")}`],
        [],
        ["RANKING", "CÓDIGO", "EXAMEN / PRUEBA", "TUBO / RECIPIENTE DE MUESTRA", "VECES SOLICITADO", "TOTAL GENERADO (S/)"]
    ];

    ranking.forEach((r, idx) => {
        datos.push([idx + 1, r.codigo, r.nombre, r.tubo, r.veces, Number(r.monto.toFixed(2))]);
    });

    if (window.XLSX) {
        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.aoa_to_sheet(datos);
        ws["!cols"] = [{ wch: 10 }, { wch: 12 }, { wch: 38 }, { wch: 32 }, { wch: 18 }, { wch: 22 }];
        XLSX.utils.book_append_sheet(wb, ws, "Top Exámenes");
        XLSX.writeFile(wb, `VitalHealth_Top_Examenes_${etiquetaFecha}.xlsx`);
    } else {
        alert("Generando reporte...");
    }
}

// Cierre de caja y reporte diario a Excel (.xlsx) con desglose exacto
function exportarCierreCajaExcel() {
    const fechaFiltro = window.fechaSeleccionadaCaja;
    const movimientosNormalizados = (cajaMovimientos || []).map(normalizarMovimientoCaja);
    let listaExportar = movimientosNormalizados;

    if (fechaFiltro && fechaFiltro !== "todos") {
        listaExportar = movimientosNormalizados.filter(m => m.fecha === fechaFiltro);
    }

    if (listaExportar.length === 0) {
        alert("No hay movimientos registrados para exportar en la fecha seleccionada.");
        return;
    }

    let efectivo = 0, yape = 0, plin = 0, tarjeta = 0, total = 0;
    const filasDetalle = [];

    listaExportar.forEach((m, idx) => {
        const monto = Number(m.monto || 0);
        total += monto;
        const metodoNorm = String(m.metodoPago || "").trim().toLowerCase();
        if (metodoNorm === "efectivo") efectivo += monto;
        else if (metodoNorm === "yape") yape += monto;
        else if (metodoNorm === "plin") plin += monto;
        else tarjeta += monto;

        filasDetalle.push({
            "N°": idx + 1,
            "Fecha": m.fechaVisual || m.fecha || "",
            "Hora": m.hora || "",
            "N° Orden": m.nroOrden || "",
            "DNI": m.dni || "-",
            "Paciente": m.paciente || "",
            "Método de Pago": m.metodoPago || "",
            "Monto (S/)": monto
        });
    });

    const etiquetaFecha = (fechaFiltro && fechaFiltro !== "todos") ? fechaFiltro : new Date().toLocaleDateString("es-PE").replace(/\//g, "-");

    // Si la librería XLSX está disponible, genera archivo .xlsx real con dos hojas
    if (window.XLSX) {
        const wb = XLSX.utils.book_new();

        // Hoja 1: Resumen de Cierre de Caja
        const datosResumen = [
            ["CENTRO MÉDICO VITAL HEALTH - LABORATORIO CLÍNICO"],
            ["REPORTE Y CUADRE DE CAJA DIARIO"],
            [`Fecha del Arqueo: ${etiquetaFecha}`],
            [`Generado: ${new Date().toLocaleString("es-PE")}`],
            [],
            ["MÉTODO DE PAGO", "IMPORTE TOTAL (S/)", "NRO. OPERACIONES"],
            ["Efectivo en Caja", efectivo, listaExportar.filter(m => String(m.metodoPago).toLowerCase() === "efectivo").length],
            ["Yape", yape, listaExportar.filter(m => String(m.metodoPago).toLowerCase() === "yape").length],
            ["Plin", plin, listaExportar.filter(m => String(m.metodoPago).toLowerCase() === "plin").length],
            ["Tarjeta / Transferencia / POS", tarjeta, listaExportar.filter(m => !["efectivo", "yape", "plin"].includes(String(m.metodoPago).toLowerCase())).length],
            [],
            ["TOTAL RECAUDADO (S/)", total, listaExportar.length],
            [],
            ["Estado del Cuadre", "CAJA CONCILIADA CON RECEPCIÓN", "SIN DISCREPANCIAS"]
        ];
        const wsResumen = XLSX.utils.aoa_to_sheet(datosResumen);
        XLSX.utils.book_append_sheet(wb, wsResumen, "Resumen_Caja");

        // Hoja 2: Detalle de Movimientos
        const wsDetalle = XLSX.utils.json_to_sheet(filasDetalle);
        XLSX.utils.book_append_sheet(wb, wsDetalle, "Detalle_Cobros");

        XLSX.writeFile(wb, `Cierre_Caja_VitalHealth_${etiquetaFecha}.xlsx`);
    } else {
        // Fallback a CSV compatible con Excel
        let csv = "sep=,\n";
        csv += "CENTRO MEDICO VITAL HEALTH - CIERRE DE CAJA\n";
        csv += `Fecha,${etiquetaFecha}\n\n`;
        csv += "DESGLOSE POR METODO DE PAGO\n";
        csv += `Efectivo,${efectivo.toFixed(2)}\n`;
        csv += `Yape,${yape.toFixed(2)}\n`;
        csv += `Plin,${plin.toFixed(2)}\n`;
        csv += `Tarjeta / POS,${tarjeta.toFixed(2)}\n`;
        csv += `TOTAL,${total.toFixed(2)}\n\n`;
        csv += "DETALLE DE MOVIMIENTOS\n";
        csv += "N,Fecha,Hora,Nro Orden,DNI,Paciente,Metodo,Monto S/\n";
        filasDetalle.forEach(f => {
            csv += `${f["N°"]},"${f.Fecha}","${f.Hora}","${f["N° Orden"]}","${f.DNI}","${f.Paciente}","${f["Método de Pago"]}",${f["Monto (S/)"]}\n`;
        });

        const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
        const enlace = document.createElement("a");
        enlace.href = URL.createObjectURL(blob);
        enlace.download = `Cierre_Caja_VitalHealth_${etiquetaFecha}.csv`;
        enlace.click();
    }
}

// Imprimir Cierre de Caja en ticketera de 58 mm
function imprimirCierreCajaTicket() {
    const fechaFiltro = window.fechaSeleccionadaCaja;
    const movimientosNormalizados = (cajaMovimientos || []).map(normalizarMovimientoCaja);
    let listaFiltrada = movimientosNormalizados;
    if (fechaFiltro && fechaFiltro !== "todos") {
        listaFiltrada = movimientosNormalizados.filter(m => m.fecha === fechaFiltro);
    }

    let efectivo = 0, yape = 0, plin = 0, tarjeta = 0, total = 0;
    listaFiltrada.forEach(m => {
        const monto = Number(m.monto || 0);
        total += monto;
        const metodoNorm = String(m.metodoPago || "").trim().toLowerCase();
        if (metodoNorm === "efectivo") efectivo += monto;
        else if (metodoNorm === "yape") yape += monto;
        else if (metodoNorm === "plin") plin += monto;
        else tarjeta += monto;
    });

    const fechaVisual = (fechaFiltro && fechaFiltro !== "todos") 
        ? fechaFiltro.split("-").reverse().join("/") 
        : new Date().toLocaleDateString("es-PE");
    const ahora = new Date().toLocaleTimeString("es-PE");

    const html = `
        <div class="ticket-contenido">
            <img src="${obtenerLogoSrc()}" alt="Centro Médico Vital Health" class="t-logo" onerror="this.style.display='none'">
            <div class="t-linea-doble"></div>
            <div class="t-centro t-negrita t-subtitulo">CIERRE DE CAJA</div>
            <div class="t-centro t-dato">Fecha: ${fechaVisual} ${ahora}</div>
            <div class="t-linea"></div>
            <div class="t-cabecera-items t-negrita"><span>MÉTODO</span><span></span><span>IMPORTE</span></div>
            <div class="t-linea"></div>
            <div class="t-item"><span>Efectivo:</span><span></span><span class="t-negrita">S/ ${efectivo.toFixed(2)}</span></div>
            <div class="t-item"><span>Yape:</span><span></span><span class="t-negrita">S/ ${yape.toFixed(2)}</span></div>
            <div class="t-item"><span>Plin:</span><span></span><span class="t-negrita">S/ ${plin.toFixed(2)}</span></div>
            <div class="t-item"><span>Tarjeta / POS:</span><span></span><span class="t-negrita">S/ ${tarjeta.toFixed(2)}</span></div>
            <div class="t-linea"></div>
            <div class="t-row t-negrita t-total"><span>TOTAL</span><span>S/ ${total.toFixed(2)}</span></div>
            <div class="t-row"><span>Operaciones:</span><span>${listaFiltrada.length}</span></div>
            <div class="t-linea-doble"></div>
            <div class="t-centro t-negrita">CUADRE DE TURNO CONFORME</div>
            <div class="t-centro t-obs" style="margin-top: 25px; border-top: 1px dashed #000; padding-top: 4px;">Firma Recepcionista / Cajero</div>
        </div>
    `;

    const cierreObj = { nroOrden: `CIERRE-${Date.now()}` };
    window._ticketActual = cierreObj;

    const cuerpo = document.getElementById("modal-ticket-body");
    if (cuerpo) cuerpo.innerHTML = `<div class="ticket-visual">${html}</div>`;
    const titulo = document.getElementById("modal-ticket-titulo");
    if (titulo) titulo.innerHTML = `<i class="bi bi-cash-stack me-1"></i>Cierre de Caja (58 mm)`;
    const zona = document.getElementById("zona-impresion");
    if (zona) zona.innerHTML = `<div class="ticket-print">${html}</div>`;

    const modalEl = document.getElementById("modalTicket");
    if (modalEl && window.bootstrap) bootstrap.Modal.getOrCreateInstance(modalEl).show();
}

function eliminarMovimientoCaja(idMovimiento) {
    if (confirm("¿Deseas eliminar este movimiento de cobro de caja?")) {
        const idMovStr = String(idMovimiento);
        const mov = (cajaMovimientos || []).find(m => String(m.id) === idMovStr);
        let eliminados = JSON.parse(localStorage.getItem("vital_caja_eliminados") || "[]");
        if (!eliminados.includes(idMovStr)) {
            eliminados.push(idMovStr);
            localStorage.setItem("vital_caja_eliminados", JSON.stringify(eliminados));
        }
        cajaMovimientos = cajaMovimientos.filter(m => String(m.id) !== idMovStr);

        // ¡ACTUALIZACIÓN AUTOMÁTICA DE LA ORDEN Y SU TICKET!
        if (mov && mov.nroOrden) {
            const orden = (ordenesRegistradas || []).find(o => String(o.nroOrden) === String(mov.nroOrden));
            if (orden) {
                // Calcular la suma de los cobros que quedan en caja para esta orden
                const pagosRestantesEnCaja = cajaMovimientos
                    .filter(m => String(m.nroOrden) === String(orden.nroOrden))
                    .reduce((acc, m) => acc + Number(m.monto || 0), 0);
                
                orden.aCuenta = Math.max(0, pagosRestantesEnCaja);
                orden.saldoPendiente = Math.max(0, Number(orden.total || 0) - orden.aCuenta);
                orden.estadoPago = orden.saldoPendiente > 0.009 ? "Pendiente" : "Pagado";
                window.nubeGuardarOrden?.(orden);
                cargarOrdenes();

                // Si el ticket en pantalla estaba mostrando esta orden, actualizarlo de inmediato
                if (window._ticketActual && String(window._ticketActual.nroOrden) === String(orden.nroOrden)) {
                    window._ticketActual = orden;
                    const cuerpo = document.getElementById("modal-ticket-body");
                    if (cuerpo) cuerpo.innerHTML = `<div class="ticket-visual">${construirTicketHTML(orden)}</div>`;
                }
            }
        }

        persistirDatos();
        actualizarTotalesCaja();
        if (typeof nubeEliminarMovimiento === "function") nubeEliminarMovimiento(idMovStr);
        return true;
    }
    return false;
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

function calcularTotalCotizacion() {
    const subtotal = listaCotizacionInd.reduce((acc, i) => acc + (Number(i.cantidad || 1) * Number(i.precio || 0)), 0);
    const tipoDescEl = document.getElementById("cot-descuento-tipo");
    const valDescEl = document.getElementById("cot-descuento-valor");
    const tipo = tipoDescEl ? tipoDescEl.value : "%";
    const valor = valDescEl ? (parseFloat(valDescEl.value) || 0) : 0;

    let montoDescuento = 0;
    if (valor > 0) {
        if (tipo === "%") {
            const porc = Math.min(100, Math.max(0, valor));
            montoDescuento = (subtotal * porc) / 100;
        } else {
            montoDescuento = Math.min(subtotal, Math.max(0, valor));
        }
    }
    montoDescuento = Math.round(montoDescuento * 100) / 100;
    const total = Math.max(0, Math.round((subtotal - montoDescuento) * 100) / 100);

    const elSub = document.getElementById("subtotal-cotizacion");
    if (elSub) elSub.textContent = subtotal.toFixed(2);

    const elDesc = document.getElementById("etiqueta-descuento-cotizacion");
    if (elDesc) {
        elDesc.textContent = `- S/ ${montoDescuento.toFixed(2)}${valor > 0 && tipo === '%' ? ` (${valor}%)` : ''}`;
    }

    const elTot = document.getElementById("total-cotizacion");
    if (elTot) elTot.textContent = total.toFixed(2);

    return { subtotal, descuentoTipo: tipo, descuentoValor: valor, montoDescuento, total };
}
window.calcularTotalCotizacion = calcularTotalCotizacion;

function renderizarTablaCotizacion() {
    const tabla = document.getElementById("tabla-cotizacion-independiente");
    if (!tabla) return;
    const tbody = tabla.querySelector("tbody");
    tbody.innerHTML = "";

    if (listaCotizacionInd.length === 0) {
        tbody.innerHTML = `<tr id="empty-row-cotizacion"><td colspan="6" class="text-center text-muted py-4">No hay exámenes agregados para cotizar.</td></tr>`;
        calcularTotalCotizacion();
        return;
    }
    listaCotizacionInd.forEach(item => {
        const importe = item.cantidad * item.precio;
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
    calcularTotalCotizacion();
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

    const calculo = calcularTotalCotizacion();
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
        subtotal: calculo.subtotal,
        descuentoTipo: calculo.descuentoTipo,
        descuentoValor: calculo.descuentoValor,
        montoDescuento: calculo.montoDescuento,
        total: calculo.total,
        en: Date.now()
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

// Variable global para filtrar cotizaciones por fecha
window.fechaSeleccionadaCotizacion = null;

function filtrarCotizacionesPorFecha(fechaValor) {
    window.fechaSeleccionadaCotizacion = fechaValor || null;
    buscarCotizaciones();
}

function cargarCotizacionesHoy() {
    const hoyStr = obtenerFechaISO(new Date());
    window.fechaSeleccionadaCotizacion = hoyStr;
    const inputFecha = document.getElementById("filtro-cotizacion-fecha");
    if (inputFecha) inputFecha.value = hoyStr;
    buscarCotizaciones();
}

function verTodasLasCotizaciones() {
    window.fechaSeleccionadaCotizacion = "todos";
    const inputFecha = document.getElementById("filtro-cotizacion-fecha");
    if (inputFecha) inputFecha.value = "";
    buscarCotizaciones();
}

function limpiarFiltrosCotizaciones() {
    window.fechaSeleccionadaCotizacion = null;
    const inputFecha = document.getElementById("filtro-cotizacion-fecha");
    if (inputFecha) inputFecha.value = "";
    const inputTexto = document.getElementById("input-buscar-cotizacion");
    if (inputTexto) inputTexto.value = "";
    cargarCotizaciones();
}

function cargarCotizaciones() {
    buscarCotizaciones();
}

function buscarCotizaciones() {
    const input = document.getElementById("input-buscar-cotizacion");
    const filtroTexto = (input ? input.value : "").toLowerCase().trim();
    const fechaFiltro = window.fechaSeleccionadaCotizacion;

    let lista = (window.cotizacionesGuardadas || []).map(normalizarCotizacion);

    // 1. Filtrar por fecha si está activa
    if (fechaFiltro && fechaFiltro !== "todos") {
        lista = lista.filter(c => {
            const fechaCot = obtenerFechaISO(c.fechaHora || "");
            return fechaCot === fechaFiltro;
        });
    }

    // 2. Filtrar por texto (nombre, DNI, celular, nro cotización)
    if (filtroTexto !== "") {
        lista = lista.filter(c =>
            String(c.nombre || "").toLowerCase().includes(filtroTexto) ||
            String(c.dni || "").toLowerCase().includes(filtroTexto) ||
            String(c.celular || "").toLowerCase().includes(filtroTexto) ||
            String(c.nroCotizacion || "").toLowerCase().includes(filtroTexto)
        );
    }

    lista.sort((a, b) => String(b.fechaHora).localeCompare(String(a.fechaHora)));
    renderizarTablaCotizaciones(lista);
}

function renderizarTablaCotizaciones(lista) {
    const tbody = document.getElementById("tabla-cotizaciones-body");
    const contadorEl = document.getElementById("cotizaciones-contador-texto");
    if (!tbody) return;
    tbody.innerHTML = "";

    const totalGuardadas = (window.cotizacionesGuardadas || []).length;
    const cantFiltrada = (lista || []).length;
    const fechaFiltro = window.fechaSeleccionadaCotizacion;
    const hoyStr = obtenerFechaISO(new Date());

    let detalleFiltro = "todas";
    if (fechaFiltro === hoyStr) {
        detalleFiltro = `de hoy (${new Date().toLocaleDateString("es-PE")})`;
    } else if (fechaFiltro && fechaFiltro !== "todos") {
        detalleFiltro = `del ${fechaFiltro.split("-").reverse().join("/")}`;
    }

    const totalMonto = (lista || []).reduce((acc, c) => acc + (Number(c.total) || 0), 0);

    // Actualizar estilo visual activo de los botones de filtro rápido
    const btnHoy = document.getElementById("btn-cot-hoy");
    const btnTodas = document.getElementById("btn-cot-todas");
    if (btnHoy && btnTodas) {
        if (fechaFiltro === hoyStr) {
            btnHoy.className = "btn btn-primary text-white";
            btnTodas.className = "btn btn-outline-secondary";
        } else if (fechaFiltro === "todos" || (!fechaFiltro && !document.getElementById("filtro-cotizacion-fecha")?.value)) {
            btnHoy.className = "btn btn-outline-secondary";
            btnTodas.className = "btn btn-primary text-white";
        } else {
            btnHoy.className = "btn btn-outline-secondary";
            btnTodas.className = "btn btn-outline-secondary";
        }
    }

    const badgeTotal = document.getElementById("badge-total-cotizaciones");
    if (badgeTotal) {
        badgeTotal.innerHTML = `<i class="bi bi-file-earmark-text me-1"></i>${cantFiltrada} Cotizaciones | S/ ${totalMonto.toFixed(2)}`;
    }

    if (contadorEl) {
        contadorEl.innerHTML = `Mostrando <strong>${cantFiltrada}</strong> cotizaciones (${detalleFiltro}) de <strong>${totalGuardadas}</strong> registradas — Total cotizado: <strong class="text-success">S/ ${totalMonto.toFixed(2)}</strong>`;
    }

    if (!lista || lista.length === 0) {
        tbody.innerHTML = `<tr><td colspan="5" class="text-center text-muted py-4"><i class="bi bi-search me-1"></i>No se encontraron cotizaciones para los filtros seleccionados.</td></tr>`;
        return;
    }

    lista.forEach(c => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td><strong class="text-primary">${escapeHTML(c.nroCotizacion || c.id)}</strong></td>
            <td><small class="text-secondary fw-semibold">${escapeHTML(c.fechaHora || "")}</small></td>
            <td><strong>${escapeHTML(c.nombre || "N/A")}</strong><br><span class="text-muted small">DNI: ${escapeHTML(c.dni || "-")}</span></td>
            <td class="fw-bold text-success">S/ ${Number(c.total || 0).toFixed(2)}</td>
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
    setVal("cot-descuento-tipo", n.descuentoTipo || "%");
    setVal("cot-descuento-valor", n.descuentoValor > 0 ? n.descuentoValor : "");

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

    // Transferir descuento a admisión
    const tipoDesc = val("cot-descuento-tipo") || "%";
    const valDesc = parseFloat(val("cot-descuento-valor")) || 0;
    setVal("orden-descuento-tipo", tipoDesc);
    setVal("orden-descuento-valor", valDesc > 0 ? valDesc : "");

    listaCotizacionInd = [];
    renderizarTablaCotizacion();
    renderizarTablaSeleccionados();
    actualizarCalculoDescuentoRecepcion();
    showSection('recepcion');
    alert("Cotización transferida a Admisión / Recepción con descuentos y exámenes calculados.");
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

    // Transferir descuento
    const tipoDesc = n.descuentoTipo || "%";
    const valDesc = n.descuentoValor || (n.montoDescuento > 0 ? n.montoDescuento : 0);
    setVal("orden-descuento-tipo", tipoDesc);
    setVal("orden-descuento-valor", valDesc > 0 ? valDesc : "");

    renderizarTablaSeleccionados();
    actualizarCalculoDescuentoRecepcion();
    showSection('recepcion');
    alert(`Cotización ${n.nroCotizacion} transferida a Admisión / Recepción con descuentos y exámenes calculados.`);
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
        subtotal: n.subtotal,
        descuentoTipo: n.descuentoTipo,
        descuentoValor: n.descuentoValor,
        montoDescuento: n.montoDescuento,
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
    const calc = calcularTotalCotizacion();
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
        subtotal: calc.subtotal,
        descuentoTipo: calc.descuentoTipo,
        descuentoValor: calc.descuentoValor,
        montoDescuento: calc.montoDescuento,
        total: calc.total
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
                <button type="button" class="btn btn-sm btn-outline-info me-1 btn-evolucion-paciente" title="Historial Evolutivo y Comparativa de Resultados"><i class="bi bi-graph-up me-1"></i>Evolución</button>
                <button type="button" class="btn btn-sm btn-outline-primary me-1 btn-editar-paciente" title="Editar"><i class="bi bi-pencil-square"></i></button>
                <button type="button" class="btn btn-sm btn-outline-danger btn-eliminar-paciente" title="Eliminar"><i class="bi bi-trash3-fill"></i></button>
            </td>
        `;
        tr.querySelector('.btn-evolucion-paciente').addEventListener('click', () => abrirHistorialEvolutivo(p.dni));
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

// ==========================================
// HISTORIAL EVOLUTIVO Y COMPARATIVO DE PACIENTES
// ==========================================
window.historialPacienteActual = null;

function abrirHistorialEvolutivo(dni) {
    if (!dni) {
        alert("DNI de paciente no especificado.");
        return;
    }
    const dniLimpio = String(dni).trim();

    // 1. Obtener datos del paciente
    const pacRegistrado = (window.pacientesRegistrados || []).find(p => String(p.dni) === dniLimpio);
    const ordRelacionada = (ordenesRegistradas || []).find(o => String(o.dni) === dniLimpio || String(o.pacienteDni) === dniLimpio);

    const paciente = {
        dni: dniLimpio,
        nombre: (pacRegistrado && pacRegistrado.nombre) || (ordRelacionada && ordRelacionada.nombre) || "Paciente",
        edad: (pacRegistrado && pacRegistrado.edad) || (ordRelacionada && ordRelacionada.edad) || "—",
        sexo: (pacRegistrado && pacRegistrado.sexo) || (ordRelacionada && ordRelacionada.sexo) || "—",
        celular: (pacRegistrado && pacRegistrado.celular) || (ordRelacionada && ordRelacionada.celular) || "—",
        fnac: (pacRegistrado && pacRegistrado.fnac) || (ordRelacionada && ordRelacionada.fnac) || "—"
    };

    // 2. Buscar todas las órdenes de este paciente ordenadas cronológicamente
    const ordenes = (ordenesRegistradas || [])
        .filter(o => String(o.dni) === dniLimpio || String(o.pacienteDni) === dniLimpio)
        .sort((a, b) => {
            const tA = new Date(a.fechaHora || a.en || 0).getTime();
            const tB = new Date(b.fechaHora || b.en || 0).getTime();
            return tA - tB;
        });

    // 3. Extraer todas las mediciones de resultados analíticos
    const mediciones = [];
    ordenes.forEach(ord => {
        const fechaStr = ord.fechaHora || (ord.en ? new Date(ord.en).toLocaleString("es-PE") : "Sin fecha");
        const nroOrden = ord.nroOrden || "-";
        const resultados = ord.resultados || [];

        resultados.forEach(res => {
            const exNombre = res.nombre || "Examen";
            (res.indicadores || []).forEach(ind => {
                const valStr = String(ind.valor !== undefined && ind.valor !== null ? ind.valor : "").trim();
                if (valStr !== "" && !ind.esSeccion) {
                    const numLimpio = parseFloat(valStr.replace(",", "."));
                    mediciones.push({
                        fecha: fechaStr,
                        nroOrden: nroOrden,
                        examen: exNombre,
                        parametro: (ind.nombre || exNombre).trim(),
                        valorTexto: valStr,
                        numVal: !isNaN(numLimpio) ? numLimpio : null,
                        unidad: ind.unidad || "",
                        refMin: (ind.refMin !== "" && ind.refMin !== undefined && ind.refMin !== null) ? Number(ind.refMin) : null,
                        refMax: (ind.refMax !== "" && ind.refMax !== undefined && ind.refMax !== null) ? Number(ind.refMax) : null,
                        referencia: ind.referencia || "",
                        metodo: ind.metodo || res.metodo || ""
                    });
                }
            });
        });
    });

    // 4. Agrupar mediciones por parámetro
    const porParametro = {};
    mediciones.forEach(m => {
        const clave = m.parametro.toUpperCase();
        if (!porParametro[clave]) porParametro[clave] = [];
        porParametro[clave].push(m);
    });

    window.historialPacienteActual = {
        paciente,
        ordenesTotal: ordenes.length,
        porParametro,
        medicionesTotal: mediciones.length
    };

    const modalBody = document.getElementById("historial-modal-body");
    const modalTitulo = document.getElementById("historial-modal-titulo");
    if (!modalBody) return;

    if (modalTitulo) {
        modalTitulo.innerHTML = `<i class="bi bi-graph-up-arrow me-2"></i>Evolución Clínica: ${escapeHTML(paciente.nombre)}`;
    }

    // Cabecera con datos del paciente
    let html = `
        <div class="card border-0 shadow-sm mb-3">
            <div class="card-body p-3">
                <div class="row g-2 align-items-center">
                    <div class="col-12 col-md-5">
                        <div class="d-flex align-items-center gap-2">
                            <div class="bg-primary text-white rounded-circle p-2 text-center" style="width: 42px; height: 42px; line-height: 26px;">
                                <i class="bi bi-person-fill fs-5"></i>
                            </div>
                            <div>
                                <h6 class="fw-bold mb-0 text-dark">${escapeHTML(paciente.nombre)}</h6>
                                <small class="text-muted">DNI: <strong class="text-primary">${escapeHTML(paciente.dni)}</strong> | ${escapeHTML(paciente.edad)} | ${escapeHTML(paciente.sexo)}</small>
                            </div>
                        </div>
                    </div>
                    <div class="col-6 col-md-4 text-md-center">
                        <span class="badge bg-light text-dark border px-3 py-2">
                            <i class="bi bi-receipt me-1 text-primary"></i><strong>${ordenes.length}</strong> Órdenes Registradas
                        </span>
                    </div>
                    <div class="col-6 col-md-3 text-end">
                        <span class="badge bg-info-subtle text-info-emphasis border border-info-subtle px-3 py-2">
                            <i class="bi bi-check2-circle me-1"></i><strong>${mediciones.length}</strong> Resultados Históricos
                        </span>
                    </div>
                </div>
            </div>
        </div>
    `;

    const clavesParametros = Object.keys(porParametro).sort((a, b) => porParametro[b].length - porParametro[a].length);

    if (clavesParametros.length === 0) {
        html += `
            <div class="alert alert-warning border-0 shadow-sm text-center py-4 my-3">
                <i class="bi bi-clock-history fs-1 d-block mb-2 text-warning"></i>
                <h5 class="fw-bold">No hay resultados ingresados para este paciente</h5>
                <p class="mb-0 text-muted small">
                    El paciente tiene ${ordenes.length} orden(es) registrada(s), pero aún no se han capturado resultados en el sistema para comparar o graficar su evolución.<br>
                    Ingrese a <strong>Resultados</strong> y complete sus análisis para ver su tendencia clínica.
                </p>
            </div>
        `;
        modalBody.innerHTML = html;
        abrirModalHistorialBootstrap();
        return;
    }

    // Selector de parámetro a evaluar
    html += `
        <div class="card border-0 shadow-sm mb-3">
            <div class="card-body p-3">
                <div class="row g-2 align-items-center">
                    <div class="col-12 col-md-4">
                        <label class="form-label fw-bold text-primary mb-0 small">
                            <i class="bi bi-funnel-fill me-1"></i>Seleccionar Parámetro o Examen:
                        </label>
                    </div>
                    <div class="col-12 col-md-8">
                        <select id="sel-parametro-evolucion" class="form-select form-select-sm border-primary fw-semibold" onchange="renderizarDetalleParametroHistorial(this.value)">
    `;

    clavesParametros.forEach((clave) => {
        const cant = porParametro[clave].length;
        const nombreMostrar = porParametro[clave][0].parametro;
        const unidad = porParametro[clave][0].unidad ? ` (${porParametro[clave][0].unidad})` : '';
        html += `<option value="${escapeHTML(clave)}">${escapeHTML(nombreMostrar)}${escapeHTML(unidad)} — ${cant} control(es)</option>`;
    });

    html += `
                        </select>
                    </div>
                </div>
            </div>
        </div>
        <div id="contenedor-detalle-evolucion"></div>
    `;

    modalBody.innerHTML = html;
    abrirModalHistorialBootstrap();
    renderizarDetalleParametroHistorial(clavesParametros[0]);
}

function abrirModalHistorialBootstrap() {
    const modalEl = document.getElementById("modalHistorialEvolutivo");
    if (modalEl && window.bootstrap) {
        bootstrap.Modal.getOrCreateInstance(modalEl).show();
    }
}

function renderizarDetalleParametroHistorial(clave) {
    const cont = document.getElementById("contenedor-detalle-evolucion");
    if (!cont || !window.historialPacienteActual) return;

    const lista = window.historialPacienteActual.porParametro[clave] || [];
    if (lista.length === 0) {
        cont.innerHTML = `<div class="text-center text-muted py-4">No hay datos para este parámetro.</div>`;
        return;
    }

    const primerDato = lista[0];
    const ultimoDato = lista[lista.length - 1];
    const unidad = primerDato.unidad || "";
    const refTexto = primerDato.referencia || (primerDato.refMin !== null && primerDato.refMax !== null ? `${primerDato.refMin} - ${primerDato.refMax} ${unidad}` : "No definida");

    // Calcular estadísticas para valores numéricos
    const valoresNum = lista.map(d => d.numVal).filter(v => v !== null);
    let minHistorico = null;
    let maxHistorico = null;
    let promedio = null;
    let variacionReciente = null;

    if (valoresNum.length > 0) {
        minHistorico = Math.min(...valoresNum);
        maxHistorico = Math.max(...valoresNum);
        promedio = (valoresNum.reduce((a, b) => a + b, 0) / valoresNum.length).toFixed(2);

        if (lista.length >= 2) {
            const penultimo = lista[lista.length - 2].numVal;
            const ultimo = ultimoDato.numVal;
            if (penultimo !== null && ultimo !== null) {
                variacionReciente = (ultimo - penultimo).toFixed(2);
            }
        }
    }

    // Evaluar estado del último resultado
    let estadoUltimo = { texto: "REGISTRADO", clase: "bg-secondary text-white", icono: "bi-check-circle" };
    if (ultimoDato.numVal !== null && ultimoDato.refMin !== null && ultimoDato.refMax !== null) {
        if (ultimoDato.numVal < ultimoDato.refMin) {
            estadoUltimo = { texto: "DISMINUIDO / BAJO", clase: "bg-info text-dark", icono: "bi-arrow-down-circle" };
        } else if (ultimoDato.numVal > ultimoDato.refMax) {
            estadoUltimo = { texto: "ELEVADO / ALTO", clase: "bg-danger text-white", icono: "bi-arrow-up-circle" };
        } else {
            estadoUltimo = { texto: "DENTRO DE RANGO NORMAL", clase: "bg-success text-white", icono: "bi-check-circle" };
        }
    }

    let kpiHtml = `
        <div class="row g-2 mb-3">
            <div class="col-12 col-md-3">
                <div class="card bg-white border-0 shadow-sm h-100 p-3">
                    <small class="text-muted fw-semibold">Último Valor Registrado</small>
                    <div class="d-flex align-items-baseline gap-2 mt-1">
                        <span class="fs-4 fw-bold text-primary">${escapeHTML(ultimoDato.valorTexto)}</span>
                        <small class="text-secondary fw-semibold">${escapeHTML(unidad)}</small>
                    </div>
                    <div><span class="badge ${estadoUltimo.clase} mt-1"><i class="bi ${estadoUltimo.icono} me-1"></i>${estadoUltimo.texto}</span></div>
                    <small class="text-muted mt-1 d-block" style="font-size:0.75rem;">Fecha: ${escapeHTML(ultimoDato.fecha)}</small>
                </div>
            </div>
            <div class="col-12 col-md-3">
                <div class="card bg-white border-0 shadow-sm h-100 p-3">
                    <small class="text-muted fw-semibold">Rango de Referencia Normal</small>
                    <div class="fs-6 fw-bold text-dark mt-1">${escapeHTML(refTexto)}</div>
                    <small class="text-muted mt-auto" style="font-size:0.75rem;">Método: ${escapeHTML(primerDato.metodo || "Estándar")}</small>
                </div>
            </div>
            <div class="col-6 col-md-3">
                <div class="card bg-white border-0 shadow-sm h-100 p-3">
                    <small class="text-muted fw-semibold">Variación vs Control Anterior</small>
                    <div class="fs-5 fw-bold mt-1 ${variacionReciente !== null ? (Number(variacionReciente) > 0 ? 'text-danger' : 'text-success') : 'text-muted'}">
                        ${variacionReciente !== null ? (Number(variacionReciente) > 0 ? `+${variacionReciente} ▲` : `${variacionReciente} ▼`) : 'Primer control'}
                    </div>
                    <small class="text-muted" style="font-size:0.75rem;">${valoresNum.length >= 2 ? 'Diferencia neta' : 'Sin datos previos'}</small>
                </div>
            </div>
            <div class="col-6 col-md-3">
                <div class="card bg-white border-0 shadow-sm h-100 p-3">
                    <small class="text-muted fw-semibold">Resumen Histórico</small>
                    <div class="small mt-1">
                        <div>Promedio: <strong>${promedio !== null ? promedio : '—'} ${escapeHTML(unidad)}</strong></div>
                        <div class="text-muted" style="font-size:0.75rem;">Mín: ${minHistorico !== null ? minHistorico : '—'} | Máx: ${maxHistorico !== null ? maxHistorico : '—'}</div>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Gráfica visual y línea temporal de controles
    let timelineHtml = `
        <div class="card border-0 shadow-sm mb-3">
            <div class="card-header bg-white py-2 border-bottom d-flex justify-content-between align-items-center">
                <h6 class="fw-bold text-primary mb-0"><i class="bi bi-clock-history me-2"></i>Línea de Tiempo y Curva Evolutiva</h6>
                <span class="badge bg-light text-muted border">${lista.length} controles</span>
            </div>
            <div class="card-body p-3">
                <div class="row g-3">
    `;

    const minGrafica = minHistorico !== null && primerDato.refMin !== null ? Math.min(minHistorico, primerDato.refMin) * 0.8 : 0;
    const maxGrafica = maxHistorico !== null && primerDato.refMax !== null ? Math.max(maxHistorico, primerDato.refMax) * 1.2 : 100;
    const rangoGrafica = maxGrafica - minGrafica || 1;

    lista.forEach((item, idx) => {
        let badgeItem = { clase: "badge bg-light text-dark border", texto: "Normal" };
        let barColor = "bg-primary";
        let barPct = 50;

        if (item.numVal !== null) {
            barPct = Math.max(5, Math.min(100, Math.round(((item.numVal - minGrafica) / rangoGrafica) * 100)));
            if (item.refMin !== null && item.refMax !== null) {
                if (item.numVal < item.refMin) {
                    badgeItem = { clase: "badge bg-info text-dark", texto: "Bajo" };
                    barColor = "bg-info";
                } else if (item.numVal > item.refMax) {
                    badgeItem = { clase: "badge bg-danger text-white", texto: "Alto" };
                    barColor = "bg-danger";
                } else {
                    badgeItem = { clase: "badge bg-success text-white", texto: "Normal" };
                    barColor = "bg-success";
                }
            }
        }

        timelineHtml += `
            <div class="col-12 col-md-6 col-lg-4">
                <div class="p-3 rounded border bg-white h-100 shadow-sm">
                    <div class="d-flex justify-content-between align-items-center mb-1">
                        <span class="badge bg-light text-primary border border-primary-subtle fw-semibold">Control #${idx + 1}</span>
                        <span class="${badgeItem.clase}">${badgeItem.texto}</span>
                    </div>
                    <div class="fs-4 fw-bold text-dark mt-2 mb-1">
                        ${escapeHTML(item.valorTexto)} <small class="text-secondary fw-semibold fs-6">${escapeHTML(item.unidad)}</small>
                    </div>
                    <div class="progress mb-2" style="height: 6px;">
                        <div class="progress-bar ${barColor}" style="width: ${barPct}%;"></div>
                    </div>
                    <div class="d-flex justify-content-between text-muted small" style="font-size:0.75rem;">
                        <span><i class="bi bi-calendar3 me-1"></i>${escapeHTML(item.fecha)}</span>
                        <span>Ord: <strong>${escapeHTML(item.nroOrden)}</strong></span>
                    </div>
                </div>
            </div>
        `;
    });

    timelineHtml += `
                </div>
            </div>
        </div>
    `;

    // Tabla comparativa cronológica completa
    let tablaHtml = `
        <div class="card border-0 shadow-sm">
            <div class="card-header bg-white py-2 border-bottom">
                <h6 class="fw-bold text-dark mb-0"><i class="bi bi-table me-2"></i>Tabla Comparativa Detallada</h6>
            </div>
            <div class="card-body p-0">
                <div class="table-responsive">
                    <table class="table table-hover align-middle mb-0">
                        <thead class="table-light">
                            <tr>
                                <th>#</th>
                                <th>Fecha y Hora</th>
                                <th>N° Orden</th>
                                <th>Examen</th>
                                <th>Resultado</th>
                                <th>Valores Referenciales</th>
                                <th class="text-center">Estado Clínico</th>
                            </tr>
                        </thead>
                        <tbody>
    `;

    lista.forEach((item, idx) => {
        let estadoBadge = `<span class="badge bg-light text-dark border">Registrado</span>`;
        if (item.numVal !== null && item.refMin !== null && item.refMax !== null) {
            if (item.numVal < item.refMin) estadoBadge = `<span class="badge bg-info text-dark">Disminuido</span>`;
            else if (item.numVal > item.refMax) estadoBadge = `<span class="badge bg-danger text-white">Elevado</span>`;
            else estadoBadge = `<span class="badge bg-success text-white">Normal</span>`;
        }

        tablaHtml += `
            <tr>
                <td class="text-muted fw-bold">${idx + 1}</td>
                <td><small class="fw-semibold text-secondary">${escapeHTML(item.fecha)}</small></td>
                <td><strong class="text-primary">${escapeHTML(item.nroOrden)}</strong></td>
                <td>${escapeHTML(item.examen)}</td>
                <td><strong class="fs-6 text-dark">${escapeHTML(item.valorTexto)}</strong> <small class="text-muted">${escapeHTML(item.unidad)}</small></td>
                <td><small class="text-muted">${escapeHTML(item.referencia || (item.refMin !== null ? `${item.refMin} - ${item.refMax}` : '—'))}</small></td>
                <td class="text-center">${estadoBadge}</td>
            </tr>
        `;
    });

    tablaHtml += `
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `;

    cont.innerHTML = kpiHtml + timelineHtml + tablaHtml;
}

function imprimirHistorialEvolutivo() {
    if (!window.historialPacienteActual) {
        alert("No hay historial cargado para imprimir.");
        return;
    }
    const select = document.getElementById("sel-parametro-evolucion");
    const clave = select ? select.value : Object.keys(window.historialPacienteActual.porParametro)[0];
    const lista = window.historialPacienteActual.porParametro[clave] || [];
    const p = window.historialPacienteActual.paciente;

    if (lista.length === 0) return;

    let filas = "";
    lista.forEach((item, idx) => {
        filas += `
            <tr>
                <td style="border:1px solid #ccc; padding:6px; text-align:center;">${idx + 1}</td>
                <td style="border:1px solid #ccc; padding:6px;">${escapeHTML(item.fecha)}</td>
                <td style="border:1px solid #ccc; padding:6px; font-weight:bold;">${escapeHTML(item.nroOrden)}</td>
                <td style="border:1px solid #ccc; padding:6px; font-size:14px; font-weight:bold;">${escapeHTML(item.valorTexto)} ${escapeHTML(item.unidad)}</td>
                <td style="border:1px solid #ccc; padding:6px;">${escapeHTML(item.referencia || `${item.refMin} - ${item.refMax}`)}</td>
            </tr>
        `;
    });

    const printHTML = `
        <div style="font-family:Arial, sans-serif; padding:20px; color:#222; max-width:800px; margin:auto;">
            <div style="text-align:center; border-bottom:2px solid #0d6efd; padding-bottom:10px; margin-bottom:15px;">
                <h2 style="margin:0; color:#0d6efd;">CENTRO MÉDICO VITAL HEALTH</h2>
                <div style="font-size:12px; color:#666;">Laboratorio Clínico Especializado | Av. Grau N° 1799 | WhatsApp: 984 089 927</div>
                <h3 style="margin:10px 0 0; color:#333;">HISTORIAL EVOLUTIVO Y COMPARATIVO DE ANÁLISIS CLÍNICOS</h3>
            </div>
            <div style="background:#f8f9fa; border:1px solid #ddd; padding:10px; border-radius:4px; margin-bottom:15px; font-size:13px;">
                <div><strong>Paciente:</strong> ${escapeHTML(p.nombre)} &nbsp;&nbsp;|&nbsp;&nbsp; <strong>DNI:</strong> ${escapeHTML(p.dni)} &nbsp;&nbsp;|&nbsp;&nbsp; <strong>Edad:</strong> ${escapeHTML(p.edad)} &nbsp;&nbsp;|&nbsp;&nbsp; <strong>Sexo:</strong> ${escapeHTML(p.sexo)}</div>
                <div style="margin-top:4px;"><strong>Parámetro Analizado:</strong> <span style="color:#0d6efd; font-weight:bold;">${escapeHTML(lista[0].parametro)}</span> &nbsp;&nbsp;|&nbsp;&nbsp; <strong>Unidad:</strong> ${escapeHTML(lista[0].unidad)}</div>
            </div>
            <table style="width:100%; border-collapse:collapse; font-size:12px; margin-bottom:20px;">
                <thead>
                    <tr style="background:#e9ecef;">
                        <th style="border:1px solid #ccc; padding:6px;">#</th>
                        <th style="border:1px solid #ccc; padding:6px;">Fecha / Hora</th>
                        <th style="border:1px solid #ccc; padding:6px;">N° Orden</th>
                        <th style="border:1px solid #ccc; padding:6px;">Resultado Obtenido</th>
                        <th style="border:1px solid #ccc; padding:6px;">Valores de Referencia</th>
                    </tr>
                </thead>
                <tbody>${filas}</tbody>
            </table>
            <div style="font-size:11px; color:#666; border-top:1px dashed #aaa; padding-top:10px; text-align:right;">
                Reporte emitido el ${new Date().toLocaleString("es-PE")} — Centro Médico Vital Health
            </div>
        </div>
    `;

    const ventana = window.open("", "_blank");
    if (ventana) {
        ventana.document.write(`<html><head><title>Historial Evolutivo - ${escapeHTML(p.nombre)}</title></head><body onload="window.print();window.close();">${printHTML}</body></html>`);
        ventana.document.close();
    }
}
window.abrirHistorialEvolutivo = abrirHistorialEvolutivo;
window.renderizarDetalleParametroHistorial = renderizarDetalleParametroHistorial;
window.imprimirHistorialEvolutivo = imprimirHistorialEvolutivo;

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
        const nombreVigente = resolverNombreExamenCatalogo(item);
        lineas += `
            <div class="t-item">
                <span class="t-cant">${item.cantidad} x</span>
                <span class="t-desc">${escapeHTML(nombreVigente)}</span>
                <span class="t-importe">${importe.toFixed(2)}</span>
            </div>
        `;
    });

    const datoExtra = orden.doctor ? `<div class="t-row"><span>Médico:</span><span>${escapeHTML(orden.doctor)}</span></div>` : "";
    let fechaNac = orden.fechaNacimiento || orden.fnac || "";
    if (!fechaNac && orden.dni) {
        const pEncontrado = (window.pacientesRegistrados || []).find(p => String(p.dni) === String(orden.dni));
        if (pEncontrado && pEncontrado.fnac) fechaNac = pEncontrado.fnac;
    }
    const textoFechaNac = fechaNac ? `<div class="t-row"><span>F. Nac:</span><span>${escapeHTML(fechaNac)}</span></div>` : '<div class="t-row"><span>F. Nac:</span><span>-</span></div>';
    const textoEdad = orden.edad ? String(orden.edad).trim() : "-";

    return `
        <div class="ticket-contenido">
            <img src="${obtenerLogoSrc()}" alt="Centro Médico Vital Health" class="t-logo" onerror="this.style.display='none'">
            <div class="t-centro t-dato">Av. Grau N° 1799 - Veintiséis de Octubre</div>
            <div class="t-centro t-dato">WhatsApp: 984 089 927</div>
            <div class="t-linea-doble"></div>
            <div class="t-centro t-negrita t-subtitulo">TICKET DE VENTA</div>
            <div class="t-centro t-dato">${escapeHTML(orden.nroOrden)}</div>
            <div class="t-linea"></div>
            <div class="t-row"><span>Fecha:</span><span>${escapeHTML(fecha)}</span></div>
            <div class="t-row"><span>Hora:</span><span>${escapeHTML(hora)}</span></div>
            <div class="t-row"><span>Paciente:</span><span>${escapeHTML(orden.nombre)}</span></div>
            <div class="t-row"><span>DNI:</span><span>${escapeHTML(orden.dni || '-')}</span></div>
            ${textoFechaNac}
            <div class="t-row"><span>Edad:</span><span>${escapeHTML(textoEdad)}</span></div>
            ${datoCelular}
            ${datoExtra}
            <div class="t-linea"></div>
            <div class="t-cabecera-items t-negrita"><span>CANT</span><span>DESCRIPCION</span><span>IMPORTE</span></div>
            <div class="t-linea"></div>
            ${lineas}
            <div class="t-linea"></div>
            <div class="t-row t-negrita t-total"><span>TOTAL S/</span><span>${Number(orden.total || 0).toFixed(2)}</span></div>
            ${(() => {
                const totT = Number(orden.total || 0);
                const acuT = orden.aCuenta !== undefined ? Number(orden.aCuenta) : totT;
                const salT = orden.saldoPendiente !== undefined ? Number(orden.saldoPendiente) : Math.max(0, totT - acuT);
                if (salT > 0.009) {
                    return `
                        <div class="t-row t-negrita"><span>A CUENTA S/:</span><span>${acuT.toFixed(2)}</span></div>
                        <div class="t-row t-negrita" style="font-weight: 800; font-size: 13px;"><span>SALDO A PAGAR:</span><span>S/ ${salT.toFixed(2)}</span></div>
                        <div class="t-row"><span style="color:#b91c1c; font-weight: 700;">ESTADO:</span><span style="color:#b91c1c; font-weight: 800;">PENDIENTE</span></div>
                    `;
                } else {
                    return `
                        <div class="t-row"><span>A CUENTA:</span><span>S/ ${totT.toFixed(2)} (PAGADO)</span></div>
                    `;
                }
            })()}
            <div class="t-row"><span>Pago:</span><span>${escapeHTML(orden.metodoPago || 'Efectivo')}</span></div>
            ${orden.notaPago ? `<div class="t-row"><small style="font-size: 9px;">Nota: ${escapeHTML(orden.notaPago)}</small></div>` : ''}
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

    let fechaNacCot = pac.fechaNacimiento || pac.fnac || "";
    if (!fechaNacCot && pac.dni) {
        const pEncontrado = (window.pacientesRegistrados || []).find(p => String(p.dni) === String(pac.dni));
        if (pEncontrado && pEncontrado.fnac) fechaNacCot = pEncontrado.fnac;
    }
    const textoFechaNacCot = fechaNacCot ? `<div class="t-row"><span>F. Nac:</span><span>${escapeHTML(fechaNacCot)}</span></div>` : '<div class="t-row"><span>F. Nac:</span><span>-</span></div>';

    let lineas = "";
    (cot.examenes || []).forEach(item => {
        let precioNum = parseFloat(String(item.precioUnit || item.precio || "0").replace('S/', '').trim()) || 0;
        let cantNum = parseFloat(item.cantidad) || 1;
        const importe = cantNum * precioNum;
        const nombreVigente = resolverNombreExamenCatalogo(item);
        lineas += `
            <div class="t-item">
                <span class="t-cant">${cantNum} x</span>
                <span class="t-desc">${escapeHTML(nombreVigente)}</span>
                <span class="t-importe">${importe.toFixed(2)}</span>
            </div>
        `;
    });

    return `
        <div class="ticket-contenido">
            <img src="${obtenerLogoSrc()}" alt="Centro Médico Vital Health" class="t-logo" onerror="this.style.display='none'">
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
            ${textoFechaNacCot}
            <div class="t-row"><span>Edad:</span><span>${escapeHTML(pac.edad || '-')}</span></div>
            ${datoCelular}
            ${datoExtra}
            <div class="t-linea"></div>
            <div class="t-cabecera-items t-negrita"><span>CANT</span><span>DESCRIPCION</span><span>IMPORTE</span></div>
            <div class="t-linea"></div>
            ${lineas}
            <div class="t-linea"></div>
            ${(() => {
                const subT = Number(cot.subtotal || (Number(cot.total || 0) + Number(cot.montoDescuento || 0)));
                const descM = Number(cot.montoDescuento || 0);
                if (descM > 0.009) {
                    const tipoD = cot.descuentoTipo === '%' ? `(${cot.descuentoValor || ''}%)` : 'S/';
                    return `
                        <div class="t-row"><span>SUBTOTAL S/:</span><span>${subT.toFixed(2)}</span></div>
                        <div class="t-row" style="color: #b91c1c; font-weight: 700;"><span>DESCUENTO ${tipoD}:</span><span>- S/ ${descM.toFixed(2)}</span></div>
                    `;
                }
                return '';
            })()}
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
    const nodo = document.querySelector("#modal-ticket-body .ticket-visual") || document.querySelector("#modal-ticket-body");
    const item = window._ticketActual || window._cotizacionActual;
    if (!nodo) {
        alert("No se encontró el contenido del ticket para descargar.");
        return;
    }

    // Determinar nombre del archivo
    let nombreArchivo = "Ticket-VitalHealth.png";
    if (item) {
        if (item.nroOrden) {
            nombreArchivo = `Ticket-${item.nroOrden}.png`;
        } else if (item.nroCotizacion || item.id) {
            nombreArchivo = `Cotizacion-${item.nroCotizacion || item.id}.png`;
        }
    } else {
        const tituloEl = document.getElementById("modal-ticket-titulo");
        const txt = tituloEl ? tituloEl.textContent.trim().replace(/[^a-zA-Z0-9_-]/g, "_") : "";
        if (txt) nombreArchivo = `${txt}.png`;
    }

    // Feedback visual en el botón de descarga
    const btnDescargar = document.querySelector("#modalTicket button[onclick*='descargarTicketPNG']");
    const textoOriginal = btnDescargar ? btnDescargar.innerHTML : "";
    if (btnDescargar) {
        btnDescargar.disabled = true;
        btnDescargar.innerHTML = `<span class="spinner-border spinner-border-sm me-1"></span>Descargando...`;
    }

    const restaurarBoton = () => {
        if (btnDescargar) {
            btnDescargar.disabled = false;
            btnDescargar.innerHTML = textoOriginal;
        }
    };

    if (typeof window.html2canvas !== "function") {
        restaurarBoton();
        alert("La herramienta de captura aún se está cargando. Intente en 1 segundo.");
        return;
    }

    // html2canvas ultra-optimizado: scale 2 (nítido y ligero), logging deshabilitado, timeout corto
    window.html2canvas(nodo, {
        scale: 2,
        backgroundColor: "#ffffff",
        useCORS: true,
        allowTaint: true,
        logging: false,
        imageTimeout: 1500
    }).then(canvas => {
        try {
            const dataUrl = canvas.toDataURL("image/png");
            const enlace = document.createElement("a");
            enlace.download = nombreArchivo;
            enlace.href = dataUrl;
            document.body.appendChild(enlace);
            enlace.click();
            setTimeout(() => {
                document.body.removeChild(enlace);
                restaurarBoton();
            }, 100);
        } catch (e) {
            console.error("Error al exportar imagen:", e);
            restaurarBoton();
        }
    }).catch(err => {
        console.error("Error en captura canvas:", err);
        restaurarBoton();
        alert("Hubo un problema al generar la imagen. Inténtelo nuevamente.");
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
    const logoSrc = obtenerLogoSrc();
    return `
        <div class="informe-cabecera" style="border-bottom: 1.5px solid #0072bc; padding-bottom: 6px; margin-bottom: 6px;">
            <div style="display: flex; align-items: center; justify-content: space-between; gap: 12px;">
                <div style="display: flex; align-items: center;">
                    <img src="${logoSrc}" alt="Centro Médico Vital Health" class="informe-logo" style="max-height: 64px; max-width: 320px; width: auto; height: auto; object-fit: contain; display: block;" onerror="this.style.display='none'">
                </div>
                <div class="informe-qr-box" style="text-align: center;">
                    <img src="qr-redes.png" alt="QR de redes sociales" class="informe-qr" style="width: 72px; height: 72px; object-fit: contain;" onerror="this.parentNode.style.display='none'">
                    <div class="informe-qr-texto" style="font-size: 8.5px; font-weight: 700; color: #0f172a; margin-top: 1px;">¡Síguenos aquí!</div>
                </div>
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 4px; font-size: 9px; color: #334155; border-top: 1px solid #e2e8f0; padding-top: 3px;">
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
        <div class="informe-pie-fijo" style="border-top: 1px solid #0072bc; margin-top: 4px; padding-top: 4px; width: 100%;">
            <div style="display: flex; justify-content: space-between; align-items: center; padding: 0 4px; font-size: 8.5px; color: #000;">
                <div style="display: flex; align-items: center; gap: 4px;">
                    <span style="font-size: 10px;">🟢</span> <strong style="font-size: 9px; color: #0f172a;">984 089 927</strong>
                </div>
                <div style="display: flex; align-items: center; gap: 4px;">
                    <span style="font-size: 10px;">🏠</span> <strong style="font-size: 9px; color: #0f172a;">SERVICIO A DOMICILIO</strong>
                </div>
                <div style="font-weight: 700; font-style: italic; font-size: 8px; color: #0f172a;">
                    “ANÁLISIS DE CALIDAD PARA EL CUIDADO DE TU SALUD”
                </div>
            </div>
            ${textoPaginacion}
        </div>
    `;
}

function construirFirmaInformeHTML(nota = "Ninguna.", mostrarNota = true, orden = null) {
    const textoNota = (mostrarNota && nota && nota.trim() !== "" && nota.trim().toLowerCase() !== "ninguna.")
        ? `<div class="informe-nota" style="font-size: 8.5px; font-style: italic; color: #64748b; margin-bottom: 4px;">Nota: ${escapeHTML(nota)}</div>`
        : "";

    if (debeOcultarFirma(orden)) {
        return `
            <div class="bloque-firma-completo" style="page-break-inside: avoid; break-inside: avoid; margin-top: auto; padding-top: 4px; min-height: 20px;">
                ${textoNota}
            </div>
        `;
    }

    return `
        <div class="bloque-firma-completo" style="page-break-inside: avoid; break-inside: avoid; margin-top: auto; padding-top: 4px;">
            ${textoNota}
            <div class="informe-firma" style="text-align: center;">
                <img src="firma-biologa.png" alt="Firma" class="informe-firma-img" style="height: 72px; max-height: 72px; object-fit: contain; display: block; margin: 0 auto 2px auto;" onerror="this.style.display='none'">
                <div class="informe-firma-linea" style="width: 220px; border-top: 1.5px solid #0f172a; margin: 0 auto 3px auto;"></div>
                <div class="informe-firma-nombre" style="font-weight: 700; font-size: 10.5px; color: #0f172a;">Raysa Yadira Ursula Alberca Atarama</div>
                <div class="informe-firma-det" style="font-weight: 700; font-size: 8.5px; color: #0f172a;">Bióloga</div>
                <div class="informe-firma-det" style="font-weight: 700; font-size: 8.5px; color: #0f172a;">C.B.P. 17763</div>
            </div>
        </div>
    `;
}

function generarBloquePaternidadOficialHTML(ex, orden) {
    const guardado = (orden.resultados || []).find(r => r.codigo === ex.codigo);
    const pData = extraerDatosPaternidadDeOrden(orden, guardado);

    const cabeceraHabitual = construirCabeceraInformeHTML();
    const pieHabitual = construirPieInformeHTML();

    const codigoCaso = escapeHTML(pData.codigoCaso || orden.nroOrden || 'PAV-2609');
    const fechaAtencion = escapeHTML(pData.fechaAtencion || (orden.fechaHora ? String(orden.fechaHora).split(',')[0].trim() : '-'));
    const fechaEmision = escapeHTML(pData.fechaEmision || new Date().toLocaleDateString('es-PE', { day: '2-digit', month: '2-digit', year: '2-digit' }));
    const tecnologia = escapeHTML(pData.tecnologia || 'Análisis realizado con el Spectrum Compact CE System / VersaPlex™ 27PY System / GeneMarker®HID Software');
    const menorNombre = escapeHTML(pData.menorNombre || orden.nombre || '');
    const menorMuestra = escapeHTML(pData.menorTipoMuestra || 'Bucal');
    const menorPrueba = escapeHTML(pData.menorPruebaNro || '2609-20');
    const padreNombre = escapeHTML(pData.padreNombre || '');
    const padreMuestra = escapeHTML(pData.padreTipoMuestra || 'Bucal');
    const padrePrueba = escapeHTML(pData.padrePruebaNro || '2609-30');
    const interpretacion = escapeHTML(pData.interpretacion || '');
    const ipc = escapeHTML(pData.ipcAcumulado || '1,321,629,527');
    const prob = escapeHTML(pData.probabilidadAcumulada || '99.99999992%');
    const notaLab = escapeHTML(pData.notaLaboratorio || 'Basado en las muestras recibidas de laboratorio VITAL HEALTH el cual provee los nombres de las partes probadas que aparecen en este reporte.');

    let filasLociHTML = '';
    (pData.loci || LOCI_PATERNIDAD_DEFECTO).forEach(l => {
        const locusNom = escapeHTML(l.locus);
        const ipVal = escapeHTML(l.ip ?? '');
        const m1Val = escapeHTML(l.m1 ?? '');
        const m2Val = escapeHTML(l.m2 ?? '');
        const p1Val = escapeHTML(l.p1 ?? '');
        const p2Val = escapeHTML(l.p2 ?? '');

        filasLociHTML += `
            <tr style="height: 20px; border-bottom: 0.5px solid #000000;">
                <td style="font-weight: 700; text-align: left; padding: 1.5px 5px; font-size: 10px;">${locusNom}</td>
                <td style="font-weight: 700; text-align: center; padding: 1.5px 3px; font-size: 10px; border-right: 1.5px solid #000000;">${ipVal}</td>
                <td style="text-align: center; padding: 1.5px 3px; font-size: 10px; width: 18%;">${m1Val}</td>
                <td style="text-align: center; padding: 1.5px 3px; font-size: 10px; width: 18%; border-right: 1.5px solid #000000;">${m2Val}</td>
                <td style="text-align: center; padding: 1.5px 3px; font-size: 10px; width: 18%;">${p1Val}</td>
                <td style="text-align: center; padding: 1.5px 3px; font-size: 10px; width: 18%;">${p2Val}</td>
            </tr>
        `;
    });

    return `
        <div class="adn-paternidad-contenedor" style="font-family: Arial, Helvetica, sans-serif; color: #000000; width: 100%; box-sizing: border-box; margin: 0 auto; line-height: 1.25; display: flex; flex-direction: column; justify-content: space-between; min-height: 275mm; page-break-inside: avoid; break-inside: avoid;">
            <div style="flex: 0 0 auto;">
                <!-- ENCABEZADO HABITUAL CON LOGO Y CÓDIGO QR -->
                ${cabeceraHabitual}
            </div>

            <div style="flex: 1 1 auto;">
                <!-- TÍTULO -->
                <div style="text-align: center; margin: 4px 0 3px 0;">
                    <div style="font-size: 15px; font-weight: 800; letter-spacing: 0.5px; color: #000000;">Informe de prueba de ADN</div>
                    <div style="font-size: 9.5px; font-weight: 700; color: #111111; margin-top: 1px;">Solo para conocimiento propio</div>
                </div>

                <!-- CUADRO DE DATOS DE CASO (SIN CONVENIO) -->
                <div style="background-color: #e2f0d9; border: 1px solid #b7d7a8; padding: 5px 9px; margin-bottom: 5px; font-size: 11px; line-height: 1.4;">
                    <div style="display: flex; margin-bottom: 1px;">
                        <span style="width: 140px; font-weight: 700; color: #1f3864;">Código de caso</span>
                        <span style="font-weight: 700; color: #000000;">${codigoCaso}</span>
                    </div>
                    <div style="display: flex; margin-bottom: 1px;">
                        <span style="width: 140px; font-weight: 700; color: #1f3864;">Fecha de atención</span>
                        <span style="font-weight: 700; color: #000000;">${fechaAtencion}</span>
                    </div>
                    <div style="display: flex;">
                        <span style="width: 140px; font-weight: 700; color: #1f3864;">Fecha de emisión</span>
                        <span style="font-weight: 700; color: #000000;">${fechaEmision}</span>
                    </div>
                </div>

                <!-- SUBTÍTULO TECNOLOGÍA EXACTA -->
                <div style="text-align: center; font-size: 7.8px; font-weight: 700; color: #000000; margin-bottom: 3px; letter-spacing: 0.2px;">
                    ${tecnologia}
                </div>

                <!-- CUADRO COMPARATIVO COMPLETO (IDENTICO AL PDF) -->
                <table class="adn-tabla-comparativa" style="width: 100%; border-collapse: collapse; border: 1.5px solid #000000; font-size: 10px; margin-bottom: 5px;">
                    <thead>
                        <!-- FILA 1: CASO Y NOMBRES -->
                        <tr style="border-bottom: 1.5px solid #000000;">
                            <th colspan="2" style="border-right: 1.5px solid #000000; text-align: left; padding: 2px 5px; width: 28%; background: #ffffff;">
                                <span style="font-weight: 700; font-size: 10px;">Caso: ${codigoCaso}</span><br>
                                <span style="font-weight: 700; font-size: 10px;">Nombre</span>
                            </th>
                            <th colspan="2" style="border-right: 1.5px solid #000000; text-align: center; padding: 2px 5px; width: 36%; background: #ffffff;">
                                <span style="font-weight: 800; font-size: 10px; text-transform: uppercase;">MENOR / EXAMINADO(A)</span><br>
                                <span style="font-weight: 800; font-size: 11px; text-transform: uppercase;">${menorNombre}</span>
                            </th>
                            <th colspan="2" style="text-align: center; padding: 2px 5px; width: 36%; background: #ffffff;">
                                <span style="font-weight: 800; font-size: 10px; text-transform: uppercase;">PRESUNTO PADRE</span><br>
                                <span style="font-weight: 800; font-size: 11px; text-transform: uppercase;">${padreNombre}</span>
                            </th>
                        </tr>
                        <!-- FILA 2: TIPO DE MUESTRAS -->
                        <tr style="border-bottom: 1px solid #000000;">
                            <th colspan="2" style="border-right: 1.5px solid #000000; text-align: left; padding: 1.5px 5px; font-weight: 700; background: #ffffff;">
                                Tipo de muestras
                            </th>
                            <th colspan="2" style="border-right: 1.5px solid #000000; text-align: center; padding: 1.5px 5px; font-weight: normal; background: #ffffff;">
                                ${menorMuestra}
                            </th>
                            <th colspan="2" style="text-align: center; padding: 1.5px 5px; font-weight: normal; background: #ffffff;">
                                ${padreMuestra}
                            </th>
                        </tr>
                        <!-- FILA 3: PRUEBA N° -->
                        <tr style="border-bottom: 1.5px solid #000000;">
                            <th colspan="2" style="border-right: 1.5px solid #000000; text-align: left; padding: 1.5px 5px; font-weight: 700; background: #ffffff;">
                                Prueba N°
                            </th>
                            <th colspan="2" style="border-right: 1.5px solid #000000; text-align: center; padding: 1.5px 5px; font-weight: 700; background: #ffffff;">
                                ${menorPrueba}
                            </th>
                            <th colspan="2" style="text-align: center; padding: 1.5px 5px; font-weight: 700; background: #ffffff;">
                                ${padrePrueba}
                            </th>
                        </tr>
                        <!-- FILA 4: CABECERA TAMAÑO DE ALELO -->
                        <tr style="border-bottom: 1.5px solid #000000; background-color: #ffffff;">
                            <th style="width: 16%; padding: 2px 4px; text-align: left; font-weight: 700; font-size: 10px;">Loci</th>
                            <th style="border-right: 1.5px solid #000000; width: 12%; padding: 2px 4px; text-align: center; font-weight: 700; font-size: 10px;">IP</th>
                            <th colspan="2" style="border-right: 1.5px solid #000000; width: 36%; padding: 2px 4px; text-align: center; font-weight: 700; font-size: 9.5px;">Tamaño de Alelo</th>
                            <th colspan="2" style="width: 36%; padding: 2px 4px; text-align: center; font-weight: 700; font-size: 9.5px;">Tamaño de Alelo</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${filasLociHTML}
                    </tbody>
                </table>

                <!-- CUADRO DE INTERPRETACIÓN PERICIAL -->
                <div style="border: 1.5px solid #000000; padding: 5px 7px; margin-bottom: 5px; font-size: 10px; line-height: 1.35; background: #ffffff;">
                    <div style="font-weight: 700; margin-bottom: 2px;">Interpretación:</div>
                    <div style="text-align: justify; color: #000000;">
                        ${interpretacion}
                    </div>
                </div>

                <!-- CUADRO DE RESULTADOS GLOBALES -->
                <div style="border: 1.5px solid #000000; padding: 5px 8px; margin-bottom: 4px; background: #ffffff;">
                    <div style="text-align: center; font-weight: 800; font-size: 11.5px; margin-bottom: 4px; letter-spacing: 0.5px;">
                        RESULTADOS GLOBALES
                    </div>
                    <div style="font-size: 10px; margin-bottom: 3px;">
                        <span style="font-weight: 700;">ÍNDICE DE PATERNIDAD ACUMULATIVO:</span> 
                        <span style="font-weight: 800; font-size: 14.5px;">${ipc}</span>
                    </div>
                    <div style="font-size: 10px; margin-bottom: 4px;">
                        <span style="font-weight: 700;">PROBABILIDAD DE PATERNIDAD ACUMULATIVA:</span> 
                        <span style="font-weight: 800; font-size: 14.5px;">${prob}</span>
                    </div>
                    <div style="font-size: 8.5px; color: #222222; line-height: 1.25;">
                        ${notaLab}
                    </div>
                </div>
            </div>

            <!-- SU PIE DE PÁGINA QUE SIEMPRE LE PONES A LOS RESULTADOS -->
            <div style="flex: 0 0 auto; margin-top: auto;">
                ${pieHabitual}
            </div>
        </div>
    `;
}

function generarBloqueExamenHTML(ex, orden) {
    const itemCatalogo = (typeof examenesCatalogo !== 'undefined' ? examenesCatalogo : []).find(c => c.codigo === ex.codigo);
    const nombreLimpioExamen = itemCatalogo && itemCatalogo.nombre ? itemCatalogo.nombre : ex.nombre;

    // Si es examen de paternidad legal, bifurcar al formato pericial legal
    if (esExamenPaternidadLegal(ex) || esExamenPaternidadLegal(itemCatalogo)) {
        return generarBloquePaternidadLegalOficialHTML(ex, orden);
    }

    // Si es examen de paternidad informativa, bifurcar al formato informativo oficial
    if (esExamenPaternidad(ex) || esExamenPaternidad(itemCatalogo)) {
        return generarBloquePaternidadOficialHTML(ex, orden);
    }

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

// =========================================================================
// PAGINACIÓN INTELIGENTE A4 (CON FIRMA EN TODAS LAS HOJAS DE RESULTADOS)
// =========================================================================
function paginarInformeOrden(orden) {
    const examenes = orden.examenes || [];
    if (!examenes.length) {
        return [{
            esPrimera: true,
            elementosHTML: [`<div style="padding: 20px; text-align: center; color: #64748b;">No hay exámenes asignados a esta orden.</div>`]
        }];
    }

    // Medir altura de cada bloque de examen en el DOM en una única pasada rápida
    const medidor = document.createElement("div");
    medidor.style.cssText = "position: fixed; left: 0; top: 0; width: 718px; opacity: 0; pointer-events: none; z-index: -9999; font-family: 'Segoe UI', Arial, sans-serif; font-size: 10.5px; background: #ffffff;";
    medidor.innerHTML = examenes.map((ex, i) => `<div class="medidor-bloque" data-idx="${i}">${generarBloqueExamenHTML(ex, orden)}</div>`).join("");
    document.body.appendChild(medidor);

    const alturas = Array.from(medidor.querySelectorAll(".medidor-bloque")).map(el => Math.max(el.offsetHeight, 65));
    medidor.remove();

    // Alturas útiles estimadas por hoja A4 a 96DPI (1123px total):
    const sinFirma = debeOcultarFirma(orden);
    const ALTO_UTIL_PAGINA_1 = sinFirma ? 760 : 690; // En hoja 1 se restan además los datos del paciente (~95px)
    const ALTO_UTIL_OTRAS = sinFirma ? 860 : 790;

    const bloques = examenes.map((ex, i) => {
        const itemCat = (typeof examenesCatalogo !== 'undefined' ? examenesCatalogo : []).find(c => c.codigo === ex.codigo);
        const esPat = esExamenPaternidad(ex) || esExamenPaternidad(itemCat);
        return {
            examen: ex,
            esPaternidad: esPat,
            html: generarBloqueExamenHTML(ex, orden),
            alto: alturas[i] || 100
        };
    });

    const paginas = [];
    let paginaActual = {
        esPrimera: true,
        esPaternidad: false,
        elementosHTML: [],
        altoDisponible: ALTO_UTIL_PAGINA_1,
        altoUsado: 0
    };

    for (const bloque of bloques) {
        if (bloque.esPaternidad) {
            // Si la página acumulada tiene exámenes convencionales previos, cerrarla
            if (paginaActual.elementosHTML.length > 0) {
                paginas.push(paginaActual);
                paginaActual = {
                    esPrimera: false,
                    esPaternidad: false,
                    elementosHTML: [],
                    altoDisponible: ALTO_UTIL_OTRAS,
                    altoUsado: 0
                };
            }
            // La prueba de paternidad va en su propia página A4 dedicada
            paginas.push({
                esPrimera: paginas.length === 0,
                esPaternidad: true,
                elementosHTML: [bloque.html],
                altoDisponible: 1120,
                altoUsado: 1000
            });
            continue;
        }

        const espacioRequerido = bloque.alto + 8;
        if (paginaActual.elementosHTML.length === 0 || (paginaActual.altoUsado + espacioRequerido <= paginaActual.altoDisponible)) {
            paginaActual.elementosHTML.push(bloque.html);
            paginaActual.altoUsado += espacioRequerido;
        } else {
            paginas.push(paginaActual);
            paginaActual = {
                esPrimera: false,
                esPaternidad: false,
                elementosHTML: [bloque.html],
                altoDisponible: ALTO_UTIL_OTRAS,
                altoUsado: espacioRequerido
            };
        }
    }

    if (paginaActual.elementosHTML.length > 0) {
        paginas.push(paginaActual);
    }

    return paginas;
}

// Vista de impresión nativa (para Imprimir Informe / Ctrl + P)
function construirInformeHTML(orden) {
    const paginas = paginarInformeOrden(orden);
    const totalPaginas = paginas.length;

    return paginas.map((p, idx) => {
        const numPag = idx + 1;

        if (p.esPaternidad) {
            return `
                <div class="informe-pagina-a4 informe-pagina-paternidad" style="padding: 16px 26px 12px 26px; box-sizing: border-box; background: #ffffff; width: 100%; min-height: 297mm; display: flex; flex-direction: column; justify-content: flex-start; ${idx < totalPaginas - 1 ? 'page-break-after: always; break-after: page;' : ''}">
                    ${p.elementosHTML.join("")}
                </div>
            `;
        }

        const cabecera = construirCabeceraInformeHTML();
        const datos = p.esPrimera ? construirDatosPacienteInformeHTML(orden) : "";
        const cuerpo = p.elementosHTML.join("");
        // En TODAS las hojas convencionales se incluye la firma (o se omite si el usuario lo activó)
        const firma = construirFirmaInformeHTML(orden.nota || "Ninguna.", numPag === totalPaginas, orden);
        const pie = construirPieInformeHTML(numPag, totalPaginas);

        return `
            <div class="informe-pagina-a4" style="${idx < totalPaginas - 1 ? 'page-break-after: always; break-after: page;' : ''}">
                <div class="pagina-superior">
                    ${cabecera}
                    ${datos}
                </div>
                <div class="pagina-cuerpo">
                    ${cuerpo}
                </div>
                <div class="pagina-inferior">
                    ${firma}
                    ${pie}
                </div>
            </div>
        `;
    }).join("");
}

function imprimirInforme(nroOrden) {
    const orden = (ordenesRegistradas || []).find(o => o.nroOrden === nroOrden);
    if (!orden) return;

    const saldoOrd = orden.saldoPendiente !== undefined ? Number(orden.saldoPendiente) : Math.max(0, Number(orden.total || 0) - Number(orden.aCuenta !== undefined ? orden.aCuenta : orden.total || 0));
    if (saldoOrd > 0.009) {
        const continuar = confirm(`⚠️ ATENCIÓN DE CAJA: El paciente ${orden.nombre} tiene un saldo pendiente de pago de S/ ${saldoOrd.toFixed(2)}.\n\n¿Desea continuar con la emisión del informe de todas maneras?`);
        if (!continuar) return;
    }

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

let imagenesInformeCacheadas = false;
async function precargarImagenesInforme() {
    if (imagenesInformeCacheadas) return;
    const fuentes = [obtenerLogoSrc(), "qr-redes.png", "firma-biologa.png", "sello-firma-biologo-legal.png"];
    await Promise.all(fuentes.map(src => new Promise(resolver => {
        const img = new Image();
        img.onload = img.onerror = resolver;
        img.src = src;
        if (img.complete) resolver();
    })));
    imagenesInformeCacheadas = true;
}

function esperarImagenes(contenedor) {
    if (!contenedor) return Promise.resolve();
    const imagenes = Array.from(contenedor.querySelectorAll("img"));
    if (!imagenes.length) return Promise.resolve();
    return Promise.all(imagenes.map(img => {
        if (img.complete) return Promise.resolve();
        return new Promise(resolver => {
            const timer = setTimeout(resolver, 300);
            img.addEventListener("load", () => { clearTimeout(timer); resolver(); }, { once: true });
            img.addEventListener("error", () => { clearTimeout(timer); resolver(); }, { once: true });
        });
    }));
}

// =========================================================================
// DESCARGA AUTOMÁTICA Y ULTRARRÁPIDA DE INFORME EN PDF EN ALTA DEFINICIÓN (HD)
// CON FIRMA DE LA BIÓLOGA EN TODAS LAS HOJAS
// =========================================================================
async function descargarInformePDF(nroOrden) {
    const orden = (ordenesRegistradas || []).find(o => o.nroOrden === nroOrden);
    if (!orden) return;

    const saldoOrd = orden.saldoPendiente !== undefined ? Number(orden.saldoPendiente) : Math.max(0, Number(orden.total || 0) - Number(orden.aCuenta !== undefined ? orden.aCuenta : orden.total || 0));
    if (saldoOrd > 0.009) {
        const continuar = confirm(`⚠️ ATENCIÓN DE CAJA: El paciente ${orden.nombre} tiene un saldo pendiente de pago de S/ ${saldoOrd.toFixed(2)}.\n\n¿Desea continuar con la descarga del PDF de todas maneras?`);
        if (!continuar) return;
    }

    if (!orden.resultados || !orden.resultados.length) {
        const guardado = guardarResultados(nroOrden, true);
        if (!guardado) {
            alert("Primero capture los resultados en el editor y guárdelos.");
            return;
        }
    }

    // Feedback visual inmediato en el botón
    const botones = Array.from(document.querySelectorAll(`button[onclick*="descargarInformePDF('${nroOrden}')"]`));
    const btn = botones.find(b => b.offsetWidth > 0) || botones[0];
    let textoOriginal = "";
    if (btn) {
        textoOriginal = btn.innerHTML;
        btn.disabled = true;
        btn.innerHTML = `<span class="spinner-border spinner-border-sm me-1" role="status" aria-hidden="true"></span> Generando PDF HD...`;
    }

    // Ceder el hilo para pintar el spinner de inmediato
    await new Promise(r => setTimeout(r, 20));

    if (typeof window.html2canvas !== "function" || !window.jspdf) {
        if (btn) { btn.disabled = false; btn.innerHTML = textoOriginal; }
        alert("Librería de exportación no lista. Abriendo vista de impresión para Guardar como PDF...");
        imprimirInforme(nroOrden);
        return;
    }

    // Aislar la aplicación del clonador de html2canvas para máxima velocidad
    const wrapper = document.getElementById("wrapper");
    if (wrapper) wrapper.setAttribute("data-html2canvas-ignore", "true");
    const modales = document.querySelectorAll(".modal");
    modales.forEach(m => m.setAttribute("data-html2canvas-ignore", "true"));

    // Precargar imágenes en memoria
    await precargarImagenesInforme();

    // 1. Paginación inteligente
    const paginas = paginarInformeOrden(orden);
    const totalPaginas = paginas.length;

    // 2. Contenedor invisible pero renderizable por el navegador
    const contenedor = document.createElement("div");
    contenedor.id = "pdf-render-container";
    contenedor.style.cssText = "position: fixed; left: -9999px; top: 0; width: 794px; background: #ffffff; pointer-events: none; z-index: -9999; overflow: visible;";
    document.body.appendChild(contenedor);

    try {
        const { jsPDF } = window.jspdf;
        const pdf = new jsPDF({
            orientation: "portrait",
            unit: "mm",
            format: "a4",
            compress: true
        });

        // Montar todas las páginas en el DOM para procesado
        const elementosPagina = [];
        for (let i = 0; i < totalPaginas; i++) {
            const numPag = i + 1;
            const p = paginas[i];

            const paginaDiv = document.createElement("div");
            paginaDiv.className = "pagina-a4-pdf";

            if (p.esPaternidad) {
                paginaDiv.style.cssText = "width: 794px; height: 1123px; padding: 20px 28px 14px 28px; box-sizing: border-box; background: #ffffff; display: flex; flex-direction: column; justify-content: flex-start; overflow: hidden; font-family: Arial, Helvetica, sans-serif; color: #000000; margin-bottom: 20px; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; text-rendering: optimizeLegibility;";
                paginaDiv.innerHTML = p.elementosHTML.join("");
            } else {
                paginaDiv.style.cssText = "width: 794px; height: 1123px; padding: 24px 38px 18px 38px; box-sizing: border-box; background: #ffffff; display: flex; flex-direction: column; justify-content: space-between; overflow: hidden; font-family: 'Segoe UI', Arial, Helvetica, sans-serif; color: #0f172a; margin-bottom: 20px; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; text-rendering: optimizeLegibility;";

                const cabeceraHTML = construirCabeceraInformeHTML();
                const datosHTML = p.esPrimera ? construirDatosPacienteInformeHTML(orden) : "";
                const cuerpoHTML = `<div class="pagina-cuerpo" style="flex: 1 1 auto; overflow: hidden;">${p.elementosHTML.join("")}</div>`;
                const firmaHTML = construirFirmaInformeHTML(orden.nota || "Ninguna.", numPag === totalPaginas, orden);
                const pieHTML = `<div class="pagina-pie" style="flex: 0 0 auto; margin-top: auto;">${construirPieInformeHTML(numPag, totalPaginas)}</div>`;

                paginaDiv.innerHTML = `
                    <div style="flex: 0 0 auto;">
                        ${cabeceraHTML}
                        ${datosHTML}
                    </div>
                    ${cuerpoHTML}
                    <div style="flex: 0 0 auto; margin-top: auto;">
                        ${firmaHTML}
                        ${pieHTML}
                    </div>
                `;
            }

            contenedor.appendChild(paginaDiv);
            elementosPagina.push(paginaDiv);
        }

        // Asegurar que las imágenes estén renderizadas en el contenedor
        await esperarImagenes(contenedor);
        await new Promise(r => setTimeout(r, 20));

        // Capturar páginas en ALTA RESOLUCIÓN (HD scale 2 = 1588x2246 px) de forma ultrarrápida
        for (let i = 0; i < totalPaginas; i++) {
            const paginaDiv = elementosPagina[i];

            const canvas = await window.html2canvas(paginaDiv, {
                scale: 2.0, // Alta definición nítida (1588 x 2246 píxeles por página A4)
                backgroundColor: "#ffffff",
                useCORS: true,
                allowTaint: true,
                logging: false,
                imageTimeout: 1000,
                removeContainer: false,
                windowWidth: 794,
                windowHeight: 1123,
                ignoreElements: (el) => {
                    // Ignorar cualquier elemento fuera del contenedor para clonación casi instantánea
                    if (el.parentElement === document.body && el !== contenedor) {
                        return true;
                    }
                    return false;
                }
            });

            // Calidad máxima 0.96: nitidez absoluta en textos, tablas y firmas
            const imgData = canvas.toDataURL("image/jpeg", 0.96);
            if (i > 0) pdf.addPage("a4", "portrait");
            pdf.addImage(imgData, "JPEG", 0, 0, 210, 297, undefined, "FAST");
            
            // Pausa mínima entre páginas para fluidez
            if (i < totalPaginas - 1) {
                await new Promise(r => setTimeout(r, 10));
            }
        }

        const nombreLimpio = (orden.nombre || "Paciente").replace(/[^a-zA-Z0-9áéíóúÁÉÍÓÚñÑ\s_-]/g, "").trim();
        const nombreArchivo = `Informe-${orden.nroOrden}-${nombreLimpio || "Resultados"}.pdf`;
        pdf.save(nombreArchivo);
    } catch (err) {
        console.error("Error al generar PDF:", err);
        alert("Ocurrió una eventualidad con el generador rápido. Abriendo vista de impresión para Guardar como PDF...");
        imprimirInforme(nroOrden);
    } finally {
        contenedor.remove();
        if (wrapper) wrapper.removeAttribute("data-html2canvas-ignore");
        modales.forEach(m => m.removeAttribute("data-html2canvas-ignore"));
        if (btn) {
            btn.disabled = false;
            btn.innerHTML = textoOriginal;
        }
    }
}

// ==========================================
// INICIALIZACIÓN
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
    const sideImg = document.getElementById("sidebar-logo-img");
    if (sideImg) sideImg.src = obtenerLogoSrc();

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
    setTimeout(precargarImagenesInforme, 800);

    if (window.innerWidth > 991 && localStorage.getItem("vital_sidebar_colapsado") === "1") {
        document.getElementById("wrapper")?.classList.add("sidebar-colapsado");
    }
});

window.addEventListener("beforeunload", persistirDatos);
