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

// DICCIONARIO DE VALORES Y PARÁMETROS REFERENCIALES NORMATIVOS (BALCELLS / LA CLÍNICA Y EL LABORATORIO)
const BASE_VALORES_REFERENCIALES = {
    // HEMATOLOGÍA
    "HEMOGRAMA": [
        { nombre: 'Leucocitos', unidad: 'Cél/uL', refMin: '4500', refMax: '11000', referencia: '4,500 - 11,000 /uL' },
        { nombre: 'Hematíes (Glóbulos Rojos)', unidad: 'M/uL', refMin: '4.2', refMax: '5.8', referencia: 'V: 4.5-5.8 | M: 4.2-5.2 M/uL' },
        { nombre: 'Hemoglobina', unidad: 'g/dL', refMin: '12.0', refMax: '16.5', referencia: 'V: 13.5-16.5 | M: 12.0-15.0 g/dL' },
        { nombre: 'Hematocrito', unidad: '%', refMin: '37', refMax: '50', referencia: 'V: 40-50% | M: 37-47%' },
        { nombre: 'VCM (Volumen Corpuscular Medio)', unidad: 'fL', refMin: '80', refMax: '98', referencia: '80.0 - 98.0 fL' },
        { nombre: 'HCM (Hemoglobina Corp. Media)', unidad: 'pg', refMin: '27', refMax: '33', referencia: '27.0 - 33.0 pg' },
        { nombre: 'CHCM (Conc. Hb Corp. Media)', unidad: 'g/dL', refMin: '32', refMax: '36', referencia: '32.0 - 36.0 g/dL' },
        { nombre: 'Plaquetas', unidad: 'Cél/uL', refMin: '150000', refMax: '450000', referencia: '150,000 - 450,000 /uL' },
        { nombre: 'Neutrófilos Segmentados', unidad: '%', refMin: '50', refMax: '70', referencia: '50 - 70 %' },
        { nombre: 'Linfocitos', unidad: '%', refMin: '20', refMax: '40', referencia: '20 - 40 %' },
        { nombre: 'Monocitos', unidad: '%', refMin: '2', refMax: '8', referencia: '2 - 8 %' },
        { nombre: 'Eosinófilos', unidad: '%', refMin: '1', refMax: '4', referencia: '1 - 4 %' },
        { nombre: 'Basófilos', unidad: '%', refMin: '0', refMax: '1', referencia: '0 - 1 %' },
        { nombre: 'Abastonados', unidad: '%', refMin: '0', refMax: '4', referencia: '0 - 4 %' }
    ],
    "HEMOGRAMA COMPLETO AUTOMATIZADO": [
        { nombre: 'Leucocitos Totales', unidad: '10^3/uL', refMin: '4.5', refMax: '11.0', referencia: '4.5 - 11.0 x10^3/uL' },
        { nombre: 'Eritrocitos', unidad: '10^6/uL', refMin: '4.2', refMax: '5.6', referencia: '4.20 - 5.60 x10^6/uL' },
        { nombre: 'Hemoglobina', unidad: 'g/dL', refMin: '12.0', refMax: '16.5', referencia: 'V: 13.5 - 16.5 | M: 12.0 - 15.0 g/dL' },
        { nombre: 'Hematocrito', unidad: '%', refMin: '37', refMax: '50', referencia: 'V: 40 - 50% | M: 37 - 47%' },
        { nombre: 'VCM', unidad: 'fL', refMin: '80', refMax: '98', referencia: '80.0 - 98.0 fL' },
        { nombre: 'HCM', unidad: 'pg', refMin: '27', refMax: '33', referencia: '27.0 - 33.0 pg' },
        { nombre: 'CHCM', unidad: 'g/dL', refMin: '32', refMax: '36', referencia: '32.0 - 36.0 g/dL' },
        { nombre: 'Recuento de Plaquetas', unidad: '10^3/uL', refMin: '150', refMax: '450', referencia: '150 - 450 x10^3/uL' },
        { nombre: 'Neutrófilos %', unidad: '%', refMin: '50', refMax: '70', referencia: '50 - 70 %' },
        { nombre: 'Linfocitos %', unidad: '%', refMin: '20', refMax: '40', referencia: '20 - 40 %' }
    ],
    "HEMOGLOBINA": [
        { nombre: 'Hemoglobina', unidad: 'g/dL', refMin: '12.0', refMax: '16.5', referencia: 'Mujeres: 12.0-15.0 | Varones: 13.5-16.5 g/dL' }
    ],
    "HEMATOCRITO": [
        { nombre: 'Hematocrito', unidad: '%', refMin: '37', refMax: '50', referencia: 'Mujeres: 37-47% | Varones: 40-50%' }
    ],
    "HEMOGLOBINA + HEMATOCRITO": [
        { nombre: 'Hemoglobina', unidad: 'g/dL', refMin: '12.0', refMax: '16.5', referencia: 'V: 13.5-16.5 | M: 12.0-15.0 g/dL' },
        { nombre: 'Hematocrito', unidad: '%', refMin: '37', refMax: '50', referencia: 'V: 40-50% | M: 37-47%' }
    ],
    "VELOCIDAD DE SEDIMENTACION (VSG)": [
        { nombre: 'VSG 1ra Hora', unidad: 'mm/h', refMin: '0', refMax: '20', referencia: 'Varones: 0 - 15 | Mujeres: 0 - 20 mm/h' }
    ],
    "RECUENTO DE PLAQUETAS": [
        { nombre: 'Recuento de Plaquetas', unidad: '/uL', refMin: '150000', refMax: '450000', referencia: '150,000 - 450,000 /uL' }
    ],

    // BIOQUÍMICA / METABOLISMO
    "GLUCOSA BASAL": [
        { nombre: 'Glucosa en Ayunas', unidad: 'mg/dL', refMin: '70', refMax: '100', referencia: 'Normal: 70 - 100 mg/dL | Prediabetes: 100 - 125 mg/dL' }
    ],
    "UREA": [
        { nombre: 'Urea Sérica', unidad: 'mg/dL', refMin: '15', refMax: '45', referencia: '15 - 45 mg/dL' }
    ],
    "CREATININA SERICA": [
        { nombre: 'Creatinina Sérica', unidad: 'mg/dL', refMin: '0.6', refMax: '1.2', referencia: 'Varones: 0.7 - 1.2 | Mujeres: 0.6 - 1.1 mg/dL' }
    ],
    "ACIDO URICO": [
        { nombre: 'Ácido Úrico', unidad: 'mg/dL', refMin: '2.5', refMax: '7.0', referencia: 'Varones: 3.4 - 7.0 | Mujeres: 2.5 - 6.0 mg/dL' }
    ],
    "PERFIL LIPIDICO": [
        { nombre: 'Colesterol Total', unidad: 'mg/dL', refMin: '0', refMax: '200', referencia: '< 200 mg/dL (Deseable)' },
        { nombre: 'Triglicéridos', unidad: 'mg/dL', refMin: '0', refMax: '150', referencia: '< 150 mg/dL (Normal)' },
        { nombre: 'Colesterol HDL', unidad: 'mg/dL', refMin: '40', refMax: '100', referencia: '> 40 mg/dL (Protector)' },
        { nombre: 'Colesterol LDL', unidad: 'mg/dL', refMin: '0', refMax: '100', referencia: '< 100 mg/dL (Óptimo)' },
        { nombre: 'Colesterol VLDL', unidad: 'mg/dL', refMin: '2', refMax: '30', referencia: '2 - 30 mg/dL' }
    ],
    "COLESTEROL TOTAL": [
        { nombre: 'Colesterol Total', unidad: 'mg/dL', refMin: '0', refMax: '200', referencia: 'Deseable: < 200 mg/dL' }
    ],
    "TRIGLICERIDOS": [
        { nombre: 'Triglicéridos', unidad: 'mg/dL', refMin: '0', refMax: '150', referencia: 'Normal: < 150 mg/dL' }
    ],
    "BILIRRUBINAS TOTALES Y FRACCIONADAS (79, 79A Y 79B)": [
        { nombre: 'Bilirrubina Total', unidad: 'mg/dL', refMin: '0.2', refMax: '1.2', referencia: '0.2 - 1.2 mg/dL' },
        { nombre: 'Bilirrubina Directa', unidad: 'mg/dL', refMin: '0.0', refMax: '0.3', referencia: '0.0 - 0.3 mg/dL' },
        { nombre: 'Bilirrubina Indirecta', unidad: 'mg/dL', refMin: '0.2', refMax: '0.9', referencia: '0.2 - 0.9 mg/dL' }
    ],
    "PERFIL HEPATICO": [
        { nombre: 'Bilirrubina Total', unidad: 'mg/dL', refMin: '0.2', refMax: '1.2', referencia: '0.2 - 1.2 mg/dL' },
        { nombre: 'Bilirrubina Directa', unidad: 'mg/dL', refMin: '0.0', refMax: '0.3', referencia: '0.0 - 0.3 mg/dL' },
        { nombre: 'Bilirrubina Indirecta', unidad: 'mg/dL', refMin: '0.1', refMax: '0.9', referencia: '0.1 - 0.9 mg/dL' },
        { nombre: 'TGO (AST)', unidad: 'U/L', refMin: '0', refMax: '38', referencia: 'Hasta 38 U/L' },
        { nombre: 'TGP (ALT)', unidad: 'U/L', refMin: '0', refMax: '41', referencia: 'Hasta 41 U/L' },
        { nombre: 'Fosfatasa Alcalina', unidad: 'U/L', refMin: '40', refMax: '129', referencia: '40 - 129 U/L' },
        { nombre: 'GGTP (Gamma Glutamil)', unidad: 'U/L', refMin: '8', refMax: '61', referencia: '8 - 61 U/L' },
        { nombre: 'Proteínas Totales', unidad: 'g/dL', refMin: '6.4', refMax: '8.3', referencia: '6.4 - 8.3 g/dL' },
        { nombre: 'Albúmina', unidad: 'g/dL', refMin: '3.5', refMax: '5.2', referencia: '3.5 - 5.2 g/dL' },
        { nombre: 'Globulina', unidad: 'g/dL', refMin: '2.0', refMax: '3.5', referencia: '2.0 - 3.5 g/dL' }
    ],
    "TGO (ASAT)": [
        { nombre: 'TGO / AST', unidad: 'U/L', refMin: '0', refMax: '38', referencia: 'Varones: < 38 | Mujeres: < 32 U/L' }
    ],
    "TGP (ALAT)": [
        { nombre: 'TGP / ALT', unidad: 'U/L', refMin: '0', refMax: '41', referencia: 'Varones: < 41 | Mujeres: < 33 U/L' }
    ],
    "FOSFATASA ALCALINA": [
        { nombre: 'Fosfatasa Alcalina', unidad: 'U/L', refMin: '40', refMax: '129', referencia: 'Adultos: 40 - 129 U/L' }
    ],
    "GAMMA GLUTAMIL TRANSPEPTIDASA": [
        { nombre: 'GGT', unidad: 'U/L', refMin: '8', refMax: '61', referencia: 'Varones: 11 - 61 | Mujeres: 8 - 36 U/L' }
    ],
    "PROTEINAS TOTALES Y FRACCIONADAS": [
        { nombre: 'Proteínas Totales', unidad: 'g/dL', refMin: '6.4', refMax: '8.3', referencia: '6.4 - 8.3 g/dL' },
        { nombre: 'Albúmina Sérica', unidad: 'g/dL', refMin: '3.5', refMax: '5.0', referencia: '3.5 - 5.0 g/dL' },
        { nombre: 'Globulinas', unidad: 'g/dL', refMin: '2.0', refMax: '3.5', referencia: '2.0 - 3.5 g/dL' },
        { nombre: 'Relación A/G', unidad: 'Ratio', refMin: '1.1', refMax: '2.2', referencia: '1.1 - 2.2' }
    ],
    "ALBUMINA SÉRICA": [
        { nombre: 'Albúmina Sérica', unidad: 'g/dL', refMin: '3.5', refMax: '5.2', referencia: '3.5 - 5.2 g/dL' }
    ],
    "AMILASA SERICA": [
        { nombre: 'Amilasa Sérica', unidad: 'U/L', refMin: '28', refMax: '100', referencia: '28 - 100 U/L' }
    ],
    "LIPASA SERICA": [
        { nombre: 'Lipasa Sérica', unidad: 'U/L', refMin: '13', refMax: '60', referencia: '13 - 60 U/L' }
    ],
    "HEMOGLOBINA GLICOSILADA HbA1c": [
        { nombre: 'HbA1c', unidad: '%', refMin: '4.0', refMax: '5.6', referencia: 'Normal: < 5.7% | Prediabetes: 5.7 - 6.4% | Diabetes: >= 6.5%' }
    ],
    "HEMOGLOBINA GLICOSILADA": [
        { nombre: 'HbA1c', unidad: '%', refMin: '4.0', refMax: '5.6', referencia: 'Normal: < 5.7% | Prediabetes: 5.7 - 6.4%' }
    ],

    // ELECTROLITOS Y MINERALES
    "ELECTROLITOS (NA,K,CL)": [
        { nombre: 'Sodio (Na)', unidad: 'mEq/L', refMin: '135', refMax: '145', referencia: '135 - 145 mEq/L' },
        { nombre: 'Potasio (K)', unidad: 'mEq/L', refMin: '3.5', refMax: '5.1', referencia: '3.5 - 5.1 mEq/L' },
        { nombre: 'Cloro (Cl)', unidad: 'mEq/L', refMin: '98', refMax: '107', referencia: '98 - 107 mEq/L' }
    ],
    "CALCIO SERICO": [
        { nombre: 'Calcio Total', unidad: 'mg/dL', refMin: '8.5', refMax: '10.5', referencia: '8.5 - 10.5 mg/dL' }
    ],
    "CALCIO IONICO": [
        { nombre: 'Calcio Iónico', unidad: 'mmol/L', refMin: '1.15', refMax: '1.33', referencia: '1.15 - 1.33 mmol/L' }
    ],
    "MAGNESIO SERICO (HN)": [
        { nombre: 'Magnesio Sérico', unidad: 'mg/dL', refMin: '1.7', refMax: '2.5', referencia: '1.7 - 2.5 mg/dL' }
    ],
    "FOSFORO SERICO": [
        { nombre: 'Fósforo Sérico', unidad: 'mg/dL', refMin: '2.5', refMax: '4.5', referencia: '2.5 - 4.5 mg/dL' }
    ],

    // PERFIL TIROIDEO
    "PERFIL TIROIDEO: T3, T4, TSH": [
        { nombre: 'TSH Ultrasensible', unidad: 'uIU/mL', refMin: '0.4', refMax: '4.2', referencia: '0.40 - 4.20 uIU/mL' },
        { nombre: 'T4 Total', unidad: 'ug/dL', refMin: '4.5', refMax: '12.0', referencia: '4.5 - 12.0 ug/dL' },
        { nombre: 'T3 Total', unidad: 'ng/dL', refMin: '80', refMax: '200', referencia: '80 - 200 ng/dL' }
    ],
    "PERFIL TIROIDEO LIBRE: TRIODOTlRONlNA(T3), TIROXINA(T4), TSH ULTRASENSIBLE, T3 LIBRE Y T4 LIBRE": [
        { nombre: 'TSH Ultrasensible', unidad: 'uIU/mL', refMin: '0.4', refMax: '4.2', referencia: '0.40 - 4.20 uIU/mL' },
        { nombre: 'T4 Libre', unidad: 'ng/dL', refMin: '0.89', refMax: '1.76', referencia: '0.89 - 1.76 ng/dL' },
        { nombre: 'T3 Libre', unidad: 'pg/mL', refMin: '2.0', refMax: '4.4', referencia: '2.0 - 4.4 pg/mL' }
    ],
    "TSH ULTRASENSIBLE": [
        { nombre: 'TSH', unidad: 'uIU/mL', refMin: '0.4', refMax: '4.2', referencia: '0.40 - 4.20 uIU/mL' }
    ],
    "T4 LIBRE": [
        { nombre: 'T4 Libre', unidad: 'ng/dL', refMin: '0.89', refMax: '1.76', referencia: '0.89 - 1.76 ng/dL' }
    ],
    "T3 LIBRE": [
        { nombre: 'T3 Libre', unidad: 'pg/mL', refMin: '2.0', refMax: '4.4', referencia: '2.0 - 4.4 pg/mL' }
    ],

    // COAGULACIÓN
    "TIEMPO DE PROTROMBINA": [
        { nombre: 'Tiempo de Protrombina (TP)', unidad: 'segundos', refMin: '11.0', refMax: '13.5', referencia: '11.0 - 13.5 s' },
        { nombre: 'INR', unidad: 'Ratio', refMin: '0.8', refMax: '1.2', referencia: '0.8 - 1.2 (Sin anticoagulación)' }
    ],
    "TIEMPO DE PROTOMBINA + INR": [
        { nombre: 'Tiempo de Protrombina', unidad: 'seg', refMin: '11.0', refMax: '13.5', referencia: '11.0 - 13.5 seg' },
        { nombre: 'INR', unidad: 'Ratio', refMin: '0.8', refMax: '1.2', referencia: '0.8 - 1.2' }
    ],
    "TIEMPO PARCIAL DE TROMBOPLASTINA": [
        { nombre: 'TTPa', unidad: 'segundos', refMin: '25.0', refMax: '38.0', referencia: '25.0 - 38.0 seg' }
    ],
    "FIBRINOGENO": [
        { nombre: 'Fibrinógeno', unidad: 'mg/dL', refMin: '200', refMax: '400', referencia: '200 - 400 mg/dL' }
    ],
    "PERFIL DE COAGULACIÓN: COAGULACIÓN Y SANGRÍA, TIEMPO DE TROMBINA, TIEMPO DE TROMBOPLASTINA PARCIAL, TIEMPO DE PROTOMBINA, FIBRINOGENO, GRUPO Y FACTOR, RECUENTO DE PLAQUETAS": [
        { nombre: 'Tiempo de Coagulación', unidad: 'minutos', refMin: '5', refMax: '10', referencia: '5 - 10 min' },
        { nombre: 'Tiempo de Sangría', unidad: 'minutos', refMin: '1', refMax: '4', referencia: '1 - 4 min' },
        { nombre: 'Tiempo de Protrombina (TP)', unidad: 'seg', refMin: '11.0', refMax: '13.5', referencia: '11.0 - 13.5 s' },
        { nombre: 'INR', unidad: 'Ratio', refMin: '0.8', refMax: '1.2', referencia: '0.8 - 1.2' },
        { nombre: 'TTPa', unidad: 'seg', refMin: '25', refMax: '38', referencia: '25 - 38 s' },
        { nombre: 'Fibrinógeno', unidad: 'mg/dL', refMin: '200', refMax: '400', referencia: '200 - 400 mg/dL' },
        { nombre: 'Recuento de Plaquetas', unidad: '/uL', refMin: '150000', refMax: '450000', referencia: '150,000 - 450,000 /uL' }
    ],

    // EXAMEN DE ORINA
    "EXAMEN COMPLETO DE ORINA": [
        { nombre: 'Aspecto', unidad: '', tipo: 'texto', referencia: 'Límpido / Transparente' },
        { nombre: 'Color', unidad: '', tipo: 'texto', referencia: 'Amarillo Pajizo' },
        { nombre: 'Densidad', unidad: '', refMin: '1.005', refMax: '1.030', referencia: '1.005 - 1.030' },
        { nombre: 'pH', unidad: '', refMin: '5.0', refMax: '8.0', referencia: '5.0 - 8.0' },
        { nombre: 'Proteínas', unidad: 'mg/dL', tipo: 'texto', referencia: 'Negativo' },
        { nombre: 'Glucosa', unidad: 'mg/dL', tipo: 'texto', referencia: 'Negativo' },
        { nombre: 'Cuerpos Cetónicos', unidad: '', tipo: 'texto', referencia: 'Negativo' },
        { nombre: 'Bilirrubina', unidad: '', tipo: 'texto', referencia: 'Negativo' },
        { nombre: 'Urobilinógeno', unidad: 'mg/dL', tipo: 'texto', referencia: 'Normal (< 1 mg/dL)' },
        { nombre: 'Nitritos', unidad: '', tipo: 'texto', referencia: 'Negativo' },
        { nombre: 'Leucocitos (Sedimento)', unidad: '/campo', refMin: '0', refMax: '5', referencia: '0 - 5 por campo' },
        { nombre: 'Hematíes (Sedimento)', unidad: '/campo', refMin: '0', refMax: '3', referencia: '0 - 3 por campo' },
        { nombre: 'Células Epiteliales', unidad: '', tipo: 'texto', referencia: 'Escasas' },
        { nombre: 'Bacterias', unidad: '', tipo: 'texto', referencia: 'Escasas o Ausentes' }
    ],
    "EXAMEN DE ORINA COMPLETO": [
        { nombre: 'Aspecto', unidad: '', tipo: 'texto', referencia: 'Límpido' },
        { nombre: 'Color', unidad: '', tipo: 'texto', referencia: 'Amarillo' },
        { nombre: 'Densidad', unidad: '', refMin: '1.005', refMax: '1.030', referencia: '1.005 - 1.030' },
        { nombre: 'pH', unidad: '', refMin: '5.0', refMax: '7.5', referencia: '5.0 - 7.5' },
        { nombre: 'Leucocitos', unidad: '/campo', refMin: '0', refMax: '5', referencia: '0 - 5 x campo' },
        { nombre: 'Hematíes', unidad: '/campo', refMin: '0', refMax: '2', referencia: '0 - 2 x campo' }
    ],

    // MARCADORES TUMORALES
    "PSA TOTAL (ANTIGENO PROSTATICO ESPECIFICO)": [
        { nombre: 'PSA Total', unidad: 'ng/mL', refMin: '0', refMax: '4.0', referencia: '0.0 - 4.0 ng/mL' }
    ],
    "PSA LIBRE (ANTIGENO PROSTATICO LIBRE)": [
        { nombre: 'PSA Libre', unidad: 'ng/mL', refMin: '0', refMax: '0.93', referencia: '< 0.93 ng/mL' },
        { nombre: 'Relación PSA Libre / Total', unidad: '%', refMin: '18', refMax: '100', referencia: '> 18% (Riesgo bajo benigno)' }
    ],
    "CA 125 (OVARIO)": [
        { nombre: 'CA 125', unidad: 'U/mL', refMin: '0', refMax: '35', referencia: '0 - 35 U/mL' }
    ],
    "CA 15-3 (MAMA)": [
        { nombre: 'CA 15-3', unidad: 'U/mL', refMin: '0', refMax: '25', referencia: '< 25 U/mL' }
    ],
    "CA19-9 (PANCREAS)": [
        { nombre: 'CA 19-9', unidad: 'U/mL', refMin: '0', refMax: '37', referencia: '< 37 U/mL' }
    ],
    "ANTIGENO CARCINOEMBRIOGENICO - CEA": [
        { nombre: 'CEA', unidad: 'ng/mL', refMin: '0', refMax: '5.0', referencia: 'No fumadores: < 3.0 | Fumadores: < 5.0 ng/mL' }
    ],
    "ALFA FETO PROTEINA (AFP)": [
        { nombre: 'AFP', unidad: 'IU/mL', refMin: '0', refMax: '7.0', referencia: '< 7.0 IU/mL' }
    ],

    // HORMONAS FEMENINAS
    "FSH HORMONA FOLICULOESTIMULANTE": [
        { nombre: 'FSH', unidad: 'mIU/mL', refMin: '', refMax: '', referencia: 'F. Folicular: 3.5-12.5 | F. Ovulatoria: 4.7-21.5 | F. Lútea: 1.7-7.7 | Menopausia: 25.8-134.8 mIU/mL' }
    ],
    "LH HORMONA LUTEINIZANTE": [
        { nombre: 'LH', unidad: 'mIU/mL', refMin: '', refMax: '', referencia: 'F. Folicular: 2.4-12.6 | F. Ovulatoria: 14.0-95.6 | F. Lútea: 1.0-11.4 mIU/mL' }
    ],
    "PROLACTINA": [
        { nombre: 'Prolactina', unidad: 'ng/mL', refMin: '4.8', refMax: '23.3', referencia: 'Mujeres no embarazadas: 4.8 - 23.3 | Varones: 4.0 - 15.2 ng/mL' }
    ],
    "ESTRADIOL": [
        { nombre: 'Estradiol (E2)', unidad: 'pg/mL', refMin: '', refMax: '', referencia: 'F. Folicular: 12.5-166 | F. Ovulatoria: 85.8-498 | F. Lútea: 43.8-211 pg/mL' }
    ],
    "PROGESTERONA": [
        { nombre: 'Progesterona', unidad: 'ng/mL', refMin: '', refMax: '', referencia: 'F. Folicular: 0.05-0.89 | F. Lútea: 1.83-23.9 ng/mL' }
    ],
    "SUB-UNIDAD HCG BETA CUANTITATIVO": [
        { nombre: 'Beta-HCG Cuantitativo', unidad: 'mIU/mL', refMin: '0', refMax: '5', referencia: 'Hombres y mujeres no gestantes: < 5 mIU/mL' }
    ],

    // SEROLOGÍA / INMUNOLOGÍA
    "PROTEINA C REACTIVA (PCR)": [
        { nombre: 'PCR Cuantitativo', unidad: 'mg/L', refMin: '0', refMax: '6.0', referencia: '< 6.0 mg/L' }
    ],
    "PROTEINA C REACTIVA ULTRASENSIBLE (HN) PCR US": [
        { nombre: 'PCR Us', unidad: 'mg/L', refMin: '0', refMax: '3.0', referencia: 'Bajo riesgo: < 1.0 | Alto riesgo: > 3.0 mg/L' }
    ],
    "FACTOR REUMATOIDEO CUANTITATIVO": [
        { nombre: 'Factor Reumatoideo', unidad: 'IU/mL', refMin: '0', refMax: '14.0', referencia: '< 14.0 IU/mL' }
    ],
    "ANTI ESTREPTOLISINA - ASO (CUANTITATIVO)": [
        { nombre: 'ASTO / ASO', unidad: 'IU/mL', refMin: '0', refMax: '200', referencia: '< 200 IU/mL' }
    ]
};

// BASE DE DATOS LOCAL
let catalogoExamenes = [];
let examenesSeleccionados = [];
let ordenesLocales = JSON.parse(localStorage.getItem('vitalhealth_ordenes')) || [];
let ordenActualVisualizando = null;

// INICIALIZACIÓN GLOBAL SEGURA DEL DOM
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
    if (Array.isArray(examen.indicadores) && examen.indicadores.length > 0) {
        return normalizarIndicadores(examen.indicadores, examen.codigo || 'ind');
    }
    // Si no tiene indicadores guardados, busca automáticamente en el diccionario normativo clínico
    const nombreNorm = (examen.nombre || '').toUpperCase().trim();
    if (BASE_VALORES_REFERENCIALES[nombreNorm]) {
        return normalizarIndicadores(BASE_VALORES_REFERENCIALES[nombreNorm], examen.codigo || 'ind');
    }
    if (Array.isArray(examen.parametros) && examen.parametros.length > 0) {
        return normalizarIndicadores(examen.parametros, examen.codigo || 'ind');
    }
    return [];
}

async function cargarProductosJSON() {
    const catalogoGuardado = localStorage.getItem('vitalhealth_catalogo');
    if (catalogoGuardado) {
        try {
            catalogoExamenes = JSON.parse(catalogoGuardado).map(ex => ({
                ...ex,
                indicadores: obtenerIndicadoresExamen(ex)
            }));
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
                catalogoExamenes = data.map((prod, index) => {
                    const exTmp = {
                        codigo: String(prod.Codigo || prod.codigo || index + 1),
                        nombre: String(prod.Nombre || prod.nombre || '').toUpperCase(),
                        precio: parseFloat(prod.Precio || prod.precio || 0),
                        muestra: prod.muestra || 'Suero',
                        metodo: prod.metodo || 'Estándar',
                        plantilla: prod.plantilla || 'estandar',
                        refTexto: prod.refTexto || ''
                    };
                    return {
                        ...exTmp,
                        indicadores: obtenerIndicadoresExamen(exTmp)
                    };
                });
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
        const indCant = obtenerIndicadoresExamen(ex).length;
        const tr = document.createElement('tr');
        tr.style.cursor = 'pointer';
        tr.onclick = (e) => {
            if (e.target.closest('button')) return;
            seleccionarExamenParaEditar(ex.codigo);
        };
        tr.innerHTML = `
            <td><span class="badge bg-light text-dark border">${ex.codigo}</span></td>
            <td><strong>${ex.nombre}</strong></td>
            <td><small class="text-muted">${ex.muestra || 'Suero'} | <span class="badge bg-info text-dark">${indCant} indicador(es)</span></small></td>
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
        referencia: ind.referencia || '', min: ind.min || ind.refMin || '', max: ind.max || ind.refMax || '',
        contenido: ind.contenido || '', obligatorio: ind.obligatorio !== false
    };

    const div = document.createElement('div');
    div.className = 'indicador-card border rounded-3 p-3 mb-3 bg-white shadow-sm';
    div.dataset.indicadorId = indicador.id;
    div.innerHTML = `
        <div class="d-flex justify-content-between align-items-center mb-3">
            <div><span class="badge bg-primary-subtle text-primary">PARÁMETRO CLÍNICO</span><span class="small text-muted ms-2">Configuración Rango</span></div>
            <button type="button" class="btn btn-sm btn-outline-danger" onclick="quitarIndicadorResultado(this)"><i class="bi bi-trash"></i> Eliminar</button>
        </div>
        <div class="row g-2">
            <div class="col-md-6">
                <label class="form-label small fw-semibold">Nombre del indicador / Parámetro</label>
                <input type="text" class="form-control form-control-sm ind-nombre" value="${escapeHtmlVH(indicador.nombre)}" placeholder="Ej. Hemoglobina">
            </div>
            <div class="col-md-3">
                <label class="form-label small fw-semibold">Tipo de resultado</label>
                <select class="form-select form-select-sm ind-tipo">
                    <option value="texto" ${indicador.tipo==='texto'?'selected':''}>Texto</option>
                    <option value="numerico" ${indicador.tipo==='numerico'||!indicador.tipo?'selected':''}>Numérico</option>
                    <option value="multilinea" ${indicador.tipo==='multilinea'?'selected':''}>Texto largo</option>
                    <option value="seleccion" ${indicador.tipo==='seleccion'?'selected':''}>Selección</option>
                </select>
            </div>
            <div class="col-md-3">
                <label class="form-label small fw-semibold">Unidad de Medida</label>
                <input type="text" class="form-control form-control-sm ind-unidad" value="${escapeHtmlVH(indicador.unidad)}" placeholder="g/dL, mg/dL, etc.">
            </div>
            <div class="col-md-4">
                <label class="form-label small fw-semibold">Valor Referencial (Texto)</label>
                <input type="text" class="form-control form-control-sm ind-referencia" value="${escapeHtmlVH(indicador.referencia)}" placeholder="Ej. 12.0 - 16.0">
            </div>
            <div class="col-md-4">
                <label class="form-label small fw-semibold">Mínimo Normal</label>
                <input type="text" class="form-control form-control-sm ind-min" value="${escapeHtmlVH(indicador.min)}" placeholder="Ej. 12.0">
            </div>
            <div class="col-md-4">
                <label class="form-label small fw-semibold">Máximo Normal</label>
                <input type="text" class="form-control form-control-sm ind-max" value="${escapeHtmlVH(indicador.max)}" placeholder="Ej. 16.0">
            </div>
            <div class="col-12">
                <label class="form-label small fw-semibold">Observaciones / Descripción del Parámetro</label>
                <textarea class="form-control form-control-sm ind-contenido" rows="2" placeholder="Notas referenciales adicionales...">${escapeHtmlVH(indicador.contenido)}</textarea>
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
        contenedor.innerHTML = `<div class="no-indicadores-msg text-center text-muted p-4 border rounded-3 bg-light small"><i class="bi bi-layout-text-window-reverse fs-4 d-block mb-2"></i>Este examen todavía no tiene indicadores. Puedes agregar parámetros individuales.</div>`;
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
        if (idx === -1) return alert('No se encontró el examen original para actualizar.');

        const codigoDuplicado = catalogoExamenes.some((e, i) => i !== idx && e.codigo === codigo);
        if (codigoDuplicado) {
            return alert('No se puede guardar: ya existe otro examen con el código ' + codigo + '.');
        }

        catalogoExamenes[idx] = examenObj;
        alert('Examen y sus parámetros actualizados correctamente.');
    } else {
        if (catalogoExamenes.some(e => e.codigo === codigo)) return alert('Ya existe un examen registrado con este código.');
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

// EVALUACIÓN CLÍNICA AUTOMÁTICA
function evaluarRangoClinico(valStr, minStr, maxStr) {
    const val = parseFloat(valStr);
    const min = parseFloat(minStr);
    const max = parseFloat(maxStr);

    if (isNaN(val)) return 'normal';
    if (!isNaN(min) && val < min) return 'bajo';
    if (!isNaN(max) && val > max) return 'alto';
    return 'normal';
}

function evaluarYResaltarCampo(inputEl, minStr, maxStr) {
    const estado = evaluarRangoClinico(inputEl.value, minStr, maxStr);
    inputEl.classList.remove('resultado-alto', 'resultado-bajo', 'resultado-normal');
    
    const badgeEl = inputEl.parentNode.querySelector('.badge-estado-clinico');
    if (badgeEl) badgeEl.remove();

    if (estado === 'alto') {
        inputEl.classList.add('resultado-alto');
        inputEl.insertAdjacentHTML('afterend', '<span class="badge bg-danger ms-1 badge-estado-clinico">ALTO</span>');
    } else if (estado === 'bajo') {
        inputEl.classList.add('resultado-bajo');
        inputEl.insertAdjacentHTML('afterend', '<span class="badge bg-warning text-dark ms-1 badge-estado-clinico">BAJO</span>');
    } else if (inputEl.value.trim() !== '') {
        inputEl.classList.add('resultado-normal');
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
                const minVal = ind.min || ind.refMin || '';
                const maxVal = ind.max || ind.refMax || '';

                if (ind.tipo === 'multilinea') {
                    control = `<textarea class="form-control form-control-sm resultado-individual" rows="3" data-examen="${escapeHtmlVH(ex.codigo)}" data-indicador="${escapeHtmlVH(key)}" placeholder="Resultado...">${escapeHtmlVH(data.resultado || '')}</textarea>`;
                } else if (ind.tipo === 'seleccion') {
                    const opciones = (ind.contenido || 'POSITIVO, NEGATIVO, REACTIVO, NO REACTIVO').split(/[,;\n]/).map(x=>x.trim()).filter(Boolean);
                    control = `<select class="form-select form-select-sm resultado-individual" data-examen="${escapeHtmlVH(ex.codigo)}" data-indicador="${escapeHtmlVH(key)}"><option value="">Seleccione...</option>${opciones.map(o=>`<option ${String(data.resultado||'')===o?'selected':''} value="${escapeHtmlVH(o)}">${escapeHtmlVH(o)}</option>`).join('')}</select>`;
                } else {
                    control = `<div class="d-flex align-items-center"><input type="text" step="any" class="form-control form-control-sm resultado-individual fw-bold" data-examen="${escapeHtmlVH(ex.codigo)}" data-indicador="${escapeHtmlVH(key)}" data-min="${escapeHtmlVH(minVal)}" data-max="${escapeHtmlVH(maxVal)}" value="${escapeHtmlVH(data.resultado || '')}" placeholder="Resultado..." oninput="evaluarYResaltarCampo(this, '${escapeHtmlVH(minVal)}', '${escapeHtmlVH(maxVal)}')"></div>`;
                }
                const refTextoMostrar = ind.referencia || ((minVal || maxVal) ? `${minVal} - ${maxVal}` : 'Sin referencia');
                filas += `<div class="resultado-indicador-row border-bottom pb-3 mb-3"><div class="row g-2 align-items-start"><div class="col-md-4"><label class="form-label fw-bold small mb-1">${escapeHtmlVH(ind.nombre)}</label>${ind.contenido ? `<div class="small text-muted">${escapeHtmlVH(ind.contenido)}</div>` : ''}</div><div class="col-md-4">${control}</div><div class="col-md-4 small text-muted pt-1">${ind.unidad ? `<div><strong>Unidad:</strong> ${escapeHtmlVH(ind.unidad)}</div>` : ''}<div><strong>Valor de Referencia:</strong> <span class="badge bg-light text-dark border">${escapeHtmlVH(refTextoMostrar)}</span></div></div></div></div>`;
            });
        } else {
            filas = `<div class="alert alert-light border small mb-0">Este examen no tiene indicadores configurados. Ve a <strong>Catálogo / Plantillas</strong> e créalos.</div>`;
        }
        camposHTML += `<div class="card mb-3 shadow-sm border"><div class="card-header bg-light d-flex justify-content-between align-items-center"><h6 class="fw-bold text-primary mb-0">${escapeHtmlVH(ex.nombre)}</h6><span class="badge bg-secondary">${indicadores.length} indicador(es)</span></div><div class="card-body">${filas}</div></div>`;
    });

    container.innerHTML = `<div class="p-3 mb-3 bg-light border rounded"><h5 class="fw-bold mb-1">Paciente: ${escapeHtmlVH(orden.paciente)}</h5><div class="text-muted small"><strong>DNI:</strong> ${escapeHtmlVH(orden.dni)} | <strong>Edad:</strong> ${escapeHtmlVH(orden.edad)} | <strong>Doctor:</strong> ${escapeHtmlVH(orden.doctor || 'Particular')}</div></div>${camposHTML}<div class="d-flex flex-wrap gap-2 mt-4"><button class="btn btn-success fw-semibold" onclick="guardarResultados()"><i class="bi bi-floppy me-1"></i>Guardar Resultados</button><button class="btn btn-primary fw-semibold" onclick="visualizarEImprimirResultados()"><i class="bi bi-printer me-1"></i>Visualizar e Imprimir Reporte A4</button></div>`;

    // Evaluar estado visual inicial de los valores cargados
    setTimeout(() => {
        document.querySelectorAll('#resultados-editor input.resultado-individual').forEach(input => {
            const min = input.dataset.min;
            const max = input.dataset.max;
            if (input.value && (min || max)) {
                evaluarYResaltarCampo(input, min, max);
            }
        });
    }, 100);
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
        
        const minVal = el.dataset.min || ind.min || ind.refMin || '';
        const maxVal = el.dataset.max || ind.max || ind.refMax || '';
        const estadoClinico = evaluarRangoClinico(el.value, minVal, maxVal);

        ordenActualVisualizando.resultados[indicador] = {
            resultado: el.value || '',
            indicadorId: indicador,
            indicador: ind.nombre || '',
            unidad: ind.unidad || '',
            referencia: ind.referencia || ((minVal || maxVal) ? `${minVal} - ${maxVal}` : ''),
            min: minVal,
            max: maxVal,
            estadoClinico: estadoClinico
        };
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
        const ref = ind.referencia || data.referencia || ((ind.min || ind.max) ? `${ind.min || '-'} - ${ind.max || '-'}` : '-');
        
        const minVal = ind.min || ind.refMin || data.min || '';
        const maxVal = ind.max || ind.refMax || data.max || '';
        const estado = evaluarRangoClinico(data.resultado, minVal, maxVal);

        let celdaRes = escapeHtmlVH(data.resultado || '-');
        if (estado === 'alto' || estado === 'bajo') {
            celdaRes = `<span style="color:#dc3545;font-weight:bold;">${celdaRes} * (${estado.toUpperCase()})</span>`;
        }

        filas += `<tr><td>${escapeHtmlVH(ind.nombre)}</td><td class="resultado">${celdaRes}</td><td>${escapeHtmlVH(ind.unidad || '-')}</td><td>${escapeHtmlVH(ref)}</td></tr>`;
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

    ventanaImp.document.write(`<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<title>Informe - ${escapeHtmlVH(o.paciente)}</title>
<style>
    @page { size: A4; margin: 14mm 12mm 22mm 12mm; }
    * { box-sizing: border-box; }
    html, body { margin: 0; padding: 0; }
    body { font-family: 'Segoe UI', Arial, sans-serif; color: #172033; font-size: 11px; padding-bottom: 16mm; }
    .header { display:flex; align-items:center; gap:18px; border-bottom:2px solid #0072bc; padding-bottom:10px; }
    .logo { width:105px; height:70px; object-fit:contain; }
    .brand { flex:1; }
    .brand h1 { margin:0; font-size:19px; color:#0072bc; }
    .brand div { font-size:10px; color:#475569; }
    .patient-box { border:1px solid #b7c7d9; border-radius:7px; padding:10px 12px; margin-top:12px; display:grid; grid-template-columns:1fr 1fr; gap:5px 20px; font-size:10.5px; }
    .bloque-examen { margin-top:18px; break-inside:avoid; page-break-inside:avoid; }
    .bloque-examen h3 { text-align:center; font-size:14px; margin:0 0 7px; text-transform:uppercase; color:#0f3d62; }
    .tabla-resultados { width:100%; border-collapse:collapse; font-size:10px; }
    .tabla-resultados th { background:#eaf3f9; color:#164e6f; font-weight:700; }
    .tabla-resultados td, .tabla-resultados th { border:1px solid #cbd5e1; padding:6px; }
    .tabla-resultados td.resultado { font-weight:700; text-align:center; font-size:11px; }
    .resultado-descriptivo { border:1px solid #cbd5e1; border-radius:5px; padding:10px; line-height:1.55; white-space:normal; }
    .firma-final { margin-top:32mm; width:280px; text-align:center; break-inside:avoid; page-break-inside:avoid; }
    .firma-img { max-width:180px; max-height:65px; object-fit:contain; display:block; margin:0 auto 2px; }
    .firma-linea { border-top:1px solid #334155; margin-bottom:5px; }
    .firma-final small { display:block; }
    .nota { margin-top:10px; font-size:9px; color:#64748b; }
    .footer { position:fixed; left:0; right:0; bottom:0; height:10mm; border-top:1px solid #cbd5e1; padding-top:3mm; text-align:center; font-size:8.5px; color:#64748b; background:#fff; }
    @media print { .footer { display:block; } }
</style>
</head>
<body>
    <div class="header">
        <img class="logo" src="logo.png" onerror="this.style.display='none'">
        <div class="brand">
            <h1>Centro Médico Vital Health</h1>
            <div>LABORATORIO CLÍNICO</div>
            <div>Av. Grau N° 1799 - Veintiséis de Octubre, Piura</div>
            <div>Tel. 984 089 927</div>
        </div>
    </div>

    <div class="patient-box">
        <div><strong>PACIENTE:</strong> ${escapeHtmlVH(o.paciente).toUpperCase()}</div>
        <div><strong>DNI:</strong> ${escapeHtmlVH(o.dni)}</div>
        <div><strong>EDAD:</strong> ${escapeHtmlVH(o.edad)}</div>
        <div><strong>SEXO:</strong> ${escapeHtmlVH(o.sexo || '')}</div>
        <div><strong>MÉDICO:</strong> ${escapeHtmlVH(o.doctor || 'Particular')}</div>
        <div><strong>ORDEN:</strong> ${escapeHtmlVH(o.id)}</div>
        <div><strong>FECHA:</strong> ${escapeHtmlVH(o.fecha)}</div>
    </div>

    ${bloques}

    <div class="firma-final">
        <img class="firma-img" src="firma-biologa.png" onerror="this.style.display='none'">
        <div class="firma-linea"></div>
        <strong>Bióloga responsable</strong>
        <small>Laboratorio Clínico - Centro Médico Vital Health</small>
    </div>

    <div class="nota">* Valores fuera de los rangos referenciales normales. Este informe corresponde a los resultados registrados en el sistema del laboratorio.</div>

    <div class="footer">Centro Médico Vital Health · Av. Grau N° 1799 · Veintiséis de Octubre, Piura · 984 089 927</div>

    <script>window.onload=function(){setTimeout(function(){window.print()},300)}</script>
</body>
</html>`);
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
