// ==========================================
// DICCIONARIOS Y BASE DE DATOS INICIAL
// ==========================================
const BASE_VALORES_REFERENCIALES = {
  "HEMOGRAMA": [
    { id: 'leucocitos', nombre: 'Leucocitos', unidad: 'Cél/uL', refMin: 4500, refMax: 11000, referencia: '4,500 - 11,000 /uL' },
    { id: 'hematies', nombre: 'Hematíes (Glóbulos Rojos)', unidad: 'M/uL', refMin: 4.2, refMax: 5.8, referencia: 'V: 4.5-5.8 | M: 4.2-5.2 M/uL' },
    { id: 'hemoglobina', nombre: 'Hemoglobina', unidad: 'g/dL', refMin: 12.0, refMax: 16.5, referencia: 'V: 13.5-16.5 | M: 12.0-15.0 g/dL' },
    { id: 'hematocrito', nombre: 'Hematocrito', unidad: '%', refMin: 37, refMax: 50, referencia: 'V: 40-50% | M: 37-47%' },
    { id: 'vcm', nombre: 'VCM', unidad: 'fL', refMin: 80, refMax: 98, referencia: '80.0 - 98.0 fL' },
    { id: 'hcm', nombre: 'HCM', unidad: 'pg', refMin: 27, refMax: 33, referencia: '27.0 - 33.0 pg' },
    { id: 'chcm', nombre: 'CHCM', unidad: 'g/dL', refMin: 32, refMax: 36, referencia: '32.0 - 36.0 g/dL' },
    { id: 'plaquetas', nombre: 'Plaquetas', unidad: 'Cél/uL', refMin: 150000, refMax: 450000, referencia: '150,000 - 450,000 /uL' }
  ],
  "PERFIL LIPIDICO": [
    { id: 'col_tot', nombre: 'Colesterol Total', unidad: 'mg/dL', refMin: 0, refMax: 200, referencia: '< 200 mg/dL' },
    { id: 'trig', nombre: 'Triglicéridos', unidad: 'mg/dL', refMin: 0, refMax: 150, referencia: '< 150 mg/dL' },
    { id: 'hdl', nombre: 'Colesterol HDL', unidad: 'mg/dL', refMin: 40, refMax: 100, referencia: '> 40 mg/dL' },
    { id: 'ldl', nombre: 'Colesterol LDL', unidad: 'mg/dL', refMin: 0, refMax: 100, referencia: '< 100 mg/dL' }
  ],
  "PERFIL HEPATICO": [
    { id: 'bt', nombre: 'Bilirrubina Total', unidad: 'mg/dL', refMin: 0.2, refMax: 1.2, referencia: '0.2 - 1.2 mg/dL' },
    { id: 'bd', nombre: 'Bilirrubina Directa', unidad: 'mg/dL', refMin: 0.0, refMax: 0.3, referencia: '0.0 - 0.3 mg/dL' },
    { id: 'tgo', nombre: 'TGO (AST)', unidad: 'U/L', refMin: 0, refMax: 38, referencia: 'Hasta 38 U/L' },
    { id: 'tgp', nombre: 'TGP (ALT)', unidad: 'U/L', refMin: 0, refMax: 41, referencia: 'Hasta 41 U/L' }
  ]
};

let examenesCatalogo = [
  { codigo: "5", nombre: "11 - DESOXICORTISOL (COMPUESTOS)", unidad: "ng/dL", refMin: 10, refMax: 138, referencia: "< 138 ng/dL", precio: 45.00 },
  { codigo: "6", nombre: "17 - HIDROXICORTICOIDES (ORINA 24H)", unidad: "mg/24h", refMin: 3.0, refMax: 12.0, referencia: "3.0 - 12.0 mg/24h", precio: 100.00 },
  { codigo: "7", nombre: "17 KETOESTEROIDES (ORINA 24 HRS.)", unidad: "mg/24h", refMin: 6.0, refMax: 20.0, referencia: "6.0 - 20.0 mg/24h", precio: 134.00 },
  { codigo: "8", nombre: "17 OH PROGESTERONA BASAL, 30 Y 60 POST ESTIMULACIÓN CON ACTH", unidad: "ng/mL", refMin: 0.2, refMax: 3.0, referencia: "Según fase / estimulación", precio: 105.00 },
  { codigo: "9", nombre: "17- OH PROGESTERONA SERICA", unidad: "ng/mL", refMin: 0.2, refMax: 2.3, referencia: "0.2 - 2.3 ng/mL", precio: 91.00 },
  { codigo: "10", nombre: "5-HIDROXIINDOLACETICO (5-HIAA) (ORINA 24H)", unidad: "mg/24h", refMin: 2.0, refMax: 9.0, referencia: "< 9 mg/24h", precio: 136.00 },
  { codigo: "11", nombre: "5-NUCLEOTIDASA", unidad: "U/L", refMin: 0, refMax: 15, referencia: "< 15 U/L", precio: 117.00 },
  { codigo: "12", nombre: "6 DROGAS DE ABUSO PRUEBA URINARIA CUALITATIVA", unidad: "", refMin: "", refMax: "", referencia: "NEGATIVO", precio: 300.00 },
  { codigo: "13", nombre: "7-DEHIDROCOLESTEROL, SUERO", unidad: "µg/mL", refMin: 0.1, refMax: 3.0, referencia: "< 3.0 µg/mL", precio: 1747.00 },
  { codigo: "14", nombre: "A.N.C.A. ANTI-NEUTROFILOS (ANCA) (IM)", unidad: "", refMin: "", refMax: "", referencia: "NEGATIVO (< 1:20)", precio: 90.00 },
  { codigo: "15", nombre: "ACARO TEST", unidad: "", refMin: "", refMax: "", referencia: "NO SE OBSERVAN ÁCAROS", precio: 30.00 },
  { codigo: "16", nombre: "ACETAMINOPHEN - PARACETAMOL", unidad: "µg/mL", refMin: 10, refMax: 30, referencia: "10 - 30 µg/mL (Terapéutico)", precio: 173.00 },
  { codigo: "17", nombre: "ACETIL COLINA", unidad: "nmol/L", refMin: 0, refMax: 0.5, referencia: "< 0.5 nmol/L", precio: 350.00 },
  { codigo: "18", nombre: "ACETIL COLINA RECEPTOR, ANTICUERPOS", unidad: "nmol/L", refMin: 0, refMax: 0.4, referencia: "Negativo: ≤ 0.4 nmol/L", precio: 1127.00 },
  { codigo: "19", nombre: "ACETIL COLINA, ANTICUERPOS", unidad: "nmol/L", refMin: 0, refMax: 0.4, referencia: "Negativo: ≤ 0.4 nmol/L", precio: 400.00 },
  { codigo: "20", nombre: "ACETONA SERICA", unidad: "mg/dL", refMin: 0, refMax: 2.0, referencia: "< 2.0 mg/dL", precio: 74.00 },
  { codigo: "21", nombre: "ACETONA URINARIA", unidad: "", refMin: "", refMax: "", referencia: "NEGATIVO", precio: 66.00 },
  { codigo: "22", nombre: "ACIDO FOLICO (VITAMINA B9)", unidad: "ng/mL", refMin: 3.1, refMax: 17.5, referencia: "3.1 - 17.5 ng/mL", precio: 70.00 },
  { codigo: "23", nombre: "ACIDO FOLICO INTRAERITROCITARIO", unidad: "ng/mL", refMin: 140, refMax: 628, referencia: "140 - 628 ng/mL", precio: 169.00 },
  { codigo: "24", nombre: "ACIDO HIALURONICO", unidad: "ng/mL", refMin: 0, refMax: 75, referencia: "< 75 ng/mL", precio: 660.00 },
  { codigo: "25", nombre: "ACIDO HIPURICO EN ORINA", unidad: "g/g Creatinina", refMin: 0, refMax: 1.6, referencia: "< 1.6 g/g Creatinina", precio: 170.00 },
  { codigo: "26", nombre: "ACIDO HOMOVALINICO ORINA 24 HRS", unidad: "mg/24h", refMin: 1.4, refMax: 8.8, referencia: "< 8.8 mg/24h", precio: 295.00 },
  { codigo: "27", nombre: "ACIDO LACTICO (LACTATO)", unidad: "mmol/L", refMin: 0.5, refMax: 2.2, referencia: "0.5 - 2.2 mmol/L", precio: 75.00 },
  { codigo: "28", nombre: "ACIDO LACTICO EN LCR (HN)", unidad: "mg/dL", refMin: 10, refMax: 22, referencia: "10 - 22 mg/dL", precio: 42.00 },
  { codigo: "29", nombre: "ACIDO METILHIPURICO EN ORINA", unidad: "g/g Creatinina", refMin: 0, refMax: 1.5, referencia: "< 1.5 g/g Creatinina", precio: 264.00 },
  { codigo: "30", nombre: "ACIDO METILMALONICO", unidad: "µmol/L", refMin: 0.0, refMax: 0.4, referencia: "0.00 - 0.40 µmol/L", precio: 314.00 },
  { codigo: "31", nombre: "ACIDO METILMALONICO (ORINA SIMPLE)", unidad: "mg/g Creatinina", refMin: 0, refMax: 3.6, referencia: "< 3.6 mg/g Creatinina", precio: 314.00 },
  { codigo: "32", nombre: "ACIDO PIRUVICO (PIRUVATO)", unidad: "mmol/L", refMin: 0.03, refMax: 0.08, referencia: "0.03 - 0.08 mmol/L", precio: 236.00 },
  { codigo: "33", nombre: "ACIDO SALICILICO (SALICILATO)", unidad: "mg/dL", refMin: 2.0, refMax: 20.0, referencia: "2.0 - 20.0 mg/dL (Terapéutico)", precio: 135.00 },
  { codigo: "34", nombre: "ACIDO URICO", unidad: "mg/dL", refMin: 3.0, refMax: 7.0, referencia: "3.0 - 7.0 mg/dL", precio: 15.00 },
  { codigo: "35", nombre: "ACIDO URICO EN LIQUIDO ASCITICO", unidad: "mg/dL", refMin: 3.0, refMax: 7.0, referencia: "Similar a suero", precio: 20.00 },
  { codigo: "36", nombre: "ACIDO URICO EN ORINA DE 24 HORAS", unidad: "mg/24h", refMin: 250, refMax: 750, referencia: "250 - 750 mg/24h", precio: 35.00 },
  { codigo: "37", nombre: "ACIDO URICO EN ORINA SIMPLE", unidad: "mg/dL", refMin: 20, refMax: 80, referencia: "20 - 80 mg/dL", precio: 15.00 },
  { codigo: "38", nombre: "ACIDO VALPROICO", unidad: "µg/mL", refMin: 50.0, refMax: 100.0, referencia: "50 - 100 µg/mL", precio: 100.00 },
  { codigo: "39", nombre: "ACIDO VANILMANDELICO (ORINA 24 HORAS)", unidad: "mg/24h", refMin: 2.0, refMax: 7.0, referencia: "< 7.0 mg/24h", precio: 150.00 },
  { codigo: "40", nombre: "ACIDOS BILIARES", unidad: "µmol/L", refMin: 0.0, refMax: 10.0, referencia: "< 10 µmol/L", precio: 120.00 },
  { codigo: "1", nombre: "ACIDOS BILIARES TOTALES (HM)", unidad: "µmol/L", refMin: 0.0, refMax: 10.0, referencia: "< 10.0 µmol/L", precio: 110.00 },
  { codigo: "41", nombre: "ACIDOS ORGANICOS - SCREENING CORTA Y MEDIA EN ORINA", unidad: "", refMin: "", refMax: "", referencia: "PATRÓN NORMAL", precio: 756.00 },
  { codigo: "42", nombre: "ACILCARNITINA", unidad: "µmol/L", refMin: 10, refMax: 60, referencia: "Dentro de límites normales", precio: 1669.00 },
  { codigo: "43", nombre: "ADA LCR (ADENOSIN DEAMINASA)", unidad: "U/L", refMin: 0, refMax: 9, referencia: "< 9.0 U/L", precio: 70.00 },
  { codigo: "44", nombre: "ADA LIQUIDO ASCITICO (PERITONEAL)", unidad: "U/L", refMin: 0, refMax: 30, referencia: "< 30 U/L", precio: 70.00 },
  { codigo: "45", nombre: "ADA LIQUIDO PERICARDIO", unidad: "U/L", refMin: 0, refMax: 40, referencia: "< 40 U/L", precio: 42.00 },
  { codigo: "46", nombre: "ADA LIQUIDO PLEURAL", unidad: "U/L", refMin: 0, refMax: 40, referencia: "< 40 U/L", precio: 70.00 },
  { codigo: "47", nombre: "ADA LIQUIDO SINOVIAL", unidad: "U/L", refMin: 0, refMax: 30, referencia: "< 30 U/L", precio: 42.00 },
  { codigo: "48", nombre: "ADA LIQUIDOS BIOLOGICOS", unidad: "U/L", refMin: 0, refMax: 30, referencia: "< 30 U/L", precio: 42.00 },
  { codigo: "49", nombre: "ADA SUERO", unidad: "U/L", refMin: 0, refMax: 20, referencia: "< 20 U/L", precio: 42.00 },
  { codigo: "50", nombre: "ADDIS PRUEBA", unidad: "elem/min", refMin: 0, refMax: 2000, referencia: "Hematíes < 2000/min, Leucocitos < 4000/min", precio: 204.00 },
  { codigo: "51", nombre: "ADENOVIRUS ADN X PCR", unidad: "", refMin: "", refMax: "", referencia: "NO DETECTADO", precio: 1689.00 },
  { codigo: "52", nombre: "ADENOVIRUS ANTICUERPOS IGG", unidad: "U/mL", refMin: 0, refMax: 11, referencia: "Negativo: < 9 U/mL", precio: 266.00 },
  { codigo: "53", nombre: "ADENOVIRUS ANTICUERPOS IGM", unidad: "U/mL", refMin: 0, refMax: 11, referencia: "Negativo: < 9 U/mL", precio: 266.00 },
  { codigo: "54", nombre: "ADRENALES AUTOANTICUERPOS", unidad: "", refMin: "", refMax: "", referencia: "NEGATIVO", precio: 586.00 },
  { codigo: "56", nombre: "AGA Y ELECTROLITOS", unidad: "", refMin: "", refMax: "", referencia: "pH: 7.35-7.45, pCO2: 35-45 mmHg, pO2: 80-100 mmHg", precio: 150.00 },
  { codigo: "57", nombre: "AGLUTINACIONES", unidad: "", refMin: "", refMax: "", referencia: "NO REACTIVO", precio: 30.00 },
  { codigo: "58", nombre: "AGLUTINACIONES 2-MERCAPTO ETANOL", unidad: "", refMin: "", refMax: "", referencia: "NEGATIVO (< 1:20)", precio: 75.00 },
  { codigo: "59", nombre: "AGLUTINACIONES EN LAMINA", unidad: "", refMin: "", refMax: "", referencia: "NO REACTIVO", precio: 15.00 },
  { codigo: "60", nombre: "AGLUTINACIONES EN TUBO (BRUCELAS)", unidad: "", refMin: "", refMax: "", referencia: "NEGATIVO (< 1:40)", precio: 35.00 },
  { codigo: "61", nombre: "AGLUTINACIONES EN TUBO (SALMONELOSIS)", unidad: "", refMin: "", refMax: "", referencia: "NEGATIVO (< 1:80)", precio: 62.00 },
  { codigo: "62", nombre: "AGLUTINACIONES FENOMENO ZONA", unidad: "", refMin: "", refMax: "", referencia: "NO OBSERVADO", precio: 25.00 },
  { codigo: "63", nombre: "ALBUMINA EN ORINA", unidad: "mg/dL", refMin: 0, refMax: 20, referencia: "< 20 mg/dL", precio: 15.00 },
  { codigo: "64", nombre: "ALBUMINA SÉRICA", unidad: "g/dL", refMin: 3.2, refMax: 5.2, referencia: "3.2 - 5.2 g/dL", precio: 20.00 },
  { codigo: "65", nombre: "ALCOHOL ETILICO EN ORINA (HN)", unidad: "mg/dL", refMin: 0, refMax: 0, referencia: "NEGATIVO (0 mg/dL)", precio: 138.00 },
  { codigo: "66", nombre: "ALCOHOL ETILICO EN SANGRE (HN)", unidad: "g/L", refMin: 0, refMax: 0, referencia: "NEGATIVO (0.0 g/L)", precio: 120.00 },
  { codigo: "67", nombre: "ALDOLASA", unidad: "U/L", refMin: 0, refMax: 6, referencia: "0 - 6 U/L", precio: 122.00 },
  { codigo: "68", nombre: "ALDOSTERONA", unidad: "pg/mL", refMin: 30, refMax: 160, referencia: "30 - 160 pg/mL (Posición de pie)", precio: 128.00 },
  { codigo: "69", nombre: "ALDOSTERONA EN ORINA 24 HRS", unidad: "µg/24h", refMin: 2.0, refMax: 20.0, referencia: "2.0 - 20.0 µg/24h", precio: 209.00 },
  { codigo: "70", nombre: "ALFA 1 ANTITRIPSINA FECAL", unidad: "mg/g Heces", refMin: 0, refMax: 0.54, referencia: "< 0.54 mg/g Heces", precio: 174.00 },
  { codigo: "71", nombre: "ALFA FETO PROTEINA (AFP)", unidad: "ng/mL", refMin: 0, refMax: 10, referencia: "< 10 ng/mL", precio: 60.00 },
  { codigo: "72", nombre: "ALFA-1 ANTITRIPSINA", unidad: "mg/dL", refMin: 190, refMax: 260, referencia: "190 - 260 mg/dL", precio: 112.00 },
  { codigo: "73", nombre: "ALFA-2 ANTIPLASMINA", unidad: "%", refMin: 80, refMax: 120, referencia: "80 - 120 %", precio: 477.00 },
  { codigo: "74", nombre: "ALUMINIO SERICO", unidad: "µg/L", refMin: 0, refMax: 10, referencia: "< 10 µg/L", precio: 227.00 },
  { codigo: "75", nombre: "AMEBAS HISTOLITICA, ANTICUERPOS TOTALES", unidad: "", refMin: "", refMax: "", referencia: "NEGATIVO", precio: 128.00 },
  { codigo: "76", nombre: "AMILASA EN ORINA DE 24 HORAS (HN)", unidad: "U/24h", refMin: 1, refMax: 17, referencia: "1 - 17 U/24h", precio: 19.00 },
  { codigo: "77", nombre: "AMILASA ISOENZIMAS", unidad: "%", refMin: 35, refMax: 65, referencia: "P-Isoenzima: 35-65%", precio: 371.00 },
  { codigo: "78", nombre: "AMILASA PANCREATICA", unidad: "U/L", refMin: 13, refMax: 53, referencia: "13 - 53 U/L", precio: 0.00 },
  { codigo: "79", nombre: "AMILASA SERICA", unidad: "U/L", refMin: 35, refMax: 115, referencia: "35 - 115 U/L", precio: 35.00 },
  { codigo: "80", nombre: "AMIODARONA SERICA - DOSAJE", unidad: "µg/mL", refMin: 1.0, refMax: 2.5, referencia: "1.0 - 2.5 µg/mL", precio: 613.00 },
  { codigo: "81", nombre: "ANCA (ANTICITOPLASMA DEL NEUTROFILO)", unidad: "", refMin: "", refMax: "", referencia: "NEGATIVO", precio: 80.00 },
  { codigo: "82", nombre: "ANCA ANTICUERPOS ANTI-NEUTROFILOS, SUERO", unidad: "", refMin: "", refMax: "", referencia: "NEGATIVO", precio: 120.00 },
  { codigo: "83", nombre: "ANDROSTANDIOL GLUCURONIDO (3-ALFA-DIOL)", unidad: "ng/mL", refMin: 0.5, refMax: 6.0, referencia: "Según edad y sexo", precio: 347.00 },
  { codigo: "84", nombre: "ANDROSTENEDIONA", unidad: "ng/mL", refMin: 0.6, refMax: 3.1, referencia: "0.6 - 3.1 ng/mL", precio: 90.00 },
  { codigo: "85", nombre: "ANFETAMINAS (DROGAS) CUALITATIVO en orina", unidad: "", refMin: "", refMax: "", referencia: "NEGATIVO", precio: 75.00 },
  { codigo: "86", nombre: "ANFETAMINAS Y METANFETAMINAS CUANTITATIVO", unidad: "ng/mL", refMin: 0, refMax: 500, referencia: "< 500 ng/mL", precio: 380.00 },
  { codigo: "87", nombre: "ANGIOTENSINA II", unidad: "pg/mL", refMin: 10, refMax: 45, referencia: "10 - 45 pg/mL", precio: 765.00 },
  { codigo: "88", nombre: "ANTI ACUAPORINA 4 IGG (NMO AQP4 IGG)", unidad: "", refMin: "", refMax: "", referencia: "NEGATIVO", precio: 2164.00 },
  { codigo: "89", nombre: "ANTI ATG - ANTI TIROGLOBULINA", unidad: "IU/mL", refMin: 0, refMax: 115, referencia: "< 115 IU/mL", precio: 50.00 },
  { codigo: "90", nombre: "ANTI CARDIOLIPINA IGA", unidad: "APL", refMin: 0, refMax: 12, referencia: "Negativo: < 12 APL", precio: 144.00 },
  { codigo: "91", nombre: "ANTI CARDIOLIPINA IGG (IM)", unidad: "GPL", refMin: 0, refMax: 10, referencia: "Negativo: < 10 GPL", precio: 75.00 },
  { codigo: "92", nombre: "ANTI CARDIOLIPINA IGM", unidad: "MPL", refMin: 0, refMax: 10, referencia: "Negativo: < 10 MPL", precio: 65.00 },
  { codigo: "93", nombre: "ANTI CCP (PEPTIDO CICLICO CITRULINADO) IGG (IM)", unidad: "U/mL", refMin: 0, refMax: 20, referencia: "Negativo: < 20 U/mL", precio: 120.00 },
  { codigo: "94", nombre: "ANTI DNA-DS NATIVO Ó DOBLE CADENA (IM)", unidad: "IU/mL", refMin: 0, refMax: 10, referencia: "Negativo: < 10 IU/mL", precio: 60.00 },
  { codigo: "95", nombre: "ANTI DNA-SS AUTO ANTICUERPO (CADENA SIMPLE)", unidad: "U/mL", refMin: 0, refMax: 25, referencia: "Negativo: < 25 U/mL", precio: 89.00 },
  { codigo: "96", nombre: "ANTI ESTREPTOLISINA - ASO (CUANTITATIVO)", unidad: "IU/mL", refMin: 0, refMax: 200, referencia: "< 200 IU/mL", precio: 70.00 },
  { codigo: "97", nombre: "ANTI ESTREPTOLISINA - ASO (SEMICUANTITATIVO)", unidad: "", refMin: "", refMax: "", referencia: "NEGATIVO (< 200 IU/mL)", precio: 30.00 },
  { codigo: "98", nombre: "ANTI HU - ANTICUERPOS NEURONAL NUCLEAR (ANNA-1)", unidad: "", refMin: "", refMax: "", referencia: "NEGATIVO", precio: 439.00 },
  { codigo: "99", nombre: "ANTI JO", unidad: "U/mL", refMin: 0, refMax: 15, referencia: "Negativo: < 15 U/mL", precio: 142.00 },
  { codigo: "100", nombre: "ANTI LKM1 (LIVER / KIDNEY MICROSOMAS- ANTI HIGADO/ RIÑON) (IM)", unidad: "U/mL", refMin: 0, refMax: 20, referencia: "Negativo: < 20 U/mL", precio: 281.00 },
  { codigo: "101", nombre: "ANTI MITOCONDRIALES (AMA) (IM)", unidad: "", refMin: "", refMax: "", referencia: "NEGATIVO (< 1:20)", precio: 65.00 },
  { codigo: "102", nombre: "ANTI MUSCULO LISO (ASMA) (IM)", unidad: "", refMin: "", refMax: "", referencia: "NEGATIVO (< 1:20)", precio: 65.00 },
  { codigo: "103", nombre: "ANTI MUSK (MIASTENIA)", unidad: "nmol/L", refMin: 0, refMax: 0.05, referencia: "Negativo: < 0.05 nmol/L", precio: 3642.00 },
  { codigo: "104", nombre: "ANTI RNP-N (IM)", unidad: "U/mL", refMin: 0, refMax: 20, referencia: "Negativo: < 20 U/mL", precio: 74.00 },
  { codigo: "105", nombre: "ANTI SCL 70 , AUTOANTICUERPOS (IM)", unidad: "U/mL", refMin: 0, refMax: 15, referencia: "Negativo: < 15 U/mL", precio: 84.00 },
  { codigo: "106", nombre: "ANTI TIROGLOBULINA – ANTI ATG", unidad: "IU/mL", refMin: 0, refMax: 115, referencia: "< 115 IU/mL", precio: 50.00 },
  { codigo: "107", nombre: "ANTI TIROPEROXIDASA (ATPO-MICROSOMAL)", unidad: "IU/mL", refMin: 0, refMax: 34, referencia: "< 34 IU/mL", precio: 60.00 },
  { codigo: "108", nombre: "ANTI TIROPEROXIDASA (ATPO-MICROSOMAL) ANTI TPO", unidad: "IU/mL", refMin: 0, refMax: 34, referencia: "< 34 IU/mL", precio: 50.00 },
  { codigo: "109", nombre: "ANTI YO ANTICUERPOS (PURKINJE CELL CYTOPASMIC ANTIBODIES)", unidad: "", refMin: "", refMax: "", referencia: "NEGATIVO", precio: 902.00 },
  { codigo: "110", nombre: "ANTI-CCP (PEPTIDO CICLICO CITRULINADO) IGG (IM)", unidad: "U/mL", refMin: 0, refMax: 20, referencia: "Negativo: < 20 U/mL", precio: 180.00 },
  { codigo: "115", nombre: "ANTI-DNA NATIVO (DS-DOBLE CADENA)", unidad: "IU/mL", refMin: 0, refMax: 10, referencia: "Negativo: < 10 IU/mL", precio: 70.00 },
  { codigo: "122", nombre: "ANTI-LMA (MEMBRANA HEPATICA, AUTO ANTICUERPOS)", unidad: "", refMin: "", refMax: "", referencia: "NEGATIVO", precio: 506.00 },
  { codigo: "128", nombre: "ANTI-P53 (AUTOANTICUERPOS P53)", unidad: "U/mL", refMin: 0, refMax: 12, referencia: "Negativo: < 12 U/mL", precio: 371.00 },
  { codigo: "111", nombre: "ANTICOAGULANTE LUPICO", unidad: "segundos", refMin: 30, refMax: 45, referencia: "NO DETECTADO", precio: 85.00 },
  { codigo: "112", nombre: "ANTICUERPOS ANTIMITOCONDRIALES (AMA)", unidad: "", refMin: "", refMax: "", referencia: "NEGATIVO (< 1:20)", precio: 80.00 },
  { codigo: "113", nombre: "ANTICUERPOS ANTINUCLEARES (ANA) (IM)", unidad: "", refMin: "", refMax: "", referencia: "NEGATIVO (< 1:160)", precio: 60.00 },
  { codigo: "114", nombre: "ANTICUERPOS ANTITIROIDES", unidad: "IU/mL", refMin: 0, refMax: 34, referencia: "< 34 IU/mL", precio: 122.00 },
  { codigo: "117", nombre: "ANTIFOSFOLIPIDOS (PANEL COMPLETO) IGG+IGM", unidad: "U/mL", refMin: 0, refMax: 10, referencia: "Negativo: < 10 U/mL", precio: 500.00 },
  { codigo: "119", nombre: "ANTIGENO CARCINOEMBRIOGENICO - CEA", unidad: "ng/mL", refMin: 0, refMax: 5, referencia: "< 5 ng/mL (no fumadores)", precio: 60.00 },
  { codigo: "121", nombre: "ANTIGENO POLIPEPTIDO TISULAR -TPA", unidad: "U/L", refMin: 0, refMax: 75, referencia: "< 75 U/L", precio: 421.00 },
  { codigo: "123", nombre: "ANTINUCLEARES, ANTICUERPOS (ANA)", unidad: "", refMin: "", refMax: "", referencia: "NEGATIVO (< 1:160)", precio: 45.00 },
  { codigo: "124", nombre: "ANTIOXIDANTES TOTALES", unidad: "mmol/L", refMin: 1.15, refMax: 1.70, referencia: "1.15 - 1.70 mmol/L", precio: 319.00 },
  { codigo: "125", nombre: "ANTIOXIDANTES: GLUTATHIONE PEROXI", unidad: "U/g Hb", refMin: 27, refMax: 67, referencia: "27 - 67 U/g Hb", precio: 343.00 },
  { codigo: "126", nombre: "ANTIOXIDANTES: GLUTATHIONE REDUCT", unidad: "U/g Hb", refMin: 4.8, refMax: 10.5, referencia: "4.8 - 10.5 U/g Hb", precio: 343.00 },
  { codigo: "127", nombre: "ANTIOXIDANTES: SOD (SUPEROXIDO-DISMUT)", unidad: "U/g Hb", refMin: 1102, refMax: 1601, referencia: "1102 - 1601 U/g Hb", precio: 343.00 },
  { codigo: "129", nombre: "ANTITROMBINA III FUNCIONAL", unidad: "%", refMin: 80, refMax: 120, referencia: "80 - 120 %", precio: 107.00 },
  { codigo: "130", nombre: "APOLIPOPROTEINA A1", unidad: "mg/dL", refMin: 110, refMax: 205, referencia: "110 - 205 mg/dL", precio: 96.00 },
  { codigo: "131", nombre: "APOLIPOPROTEINA B", unidad: "mg/dL", refMin: 55, refMax: 130, referencia: "55 - 130 mg/dL", precio: 99.00 },
  { codigo: "132", nombre: "ARBOVIRUS ANTICUERPOS IGM", unidad: "", refMin: "", refMax: "", referencia: "NEGATIVO", precio: 618.00 },
  { codigo: "133", nombre: "ARSENICO (ORINA 24 HORAS)", unidad: "µg/24h", refMin: 0, refMax: 50, referencia: "< 50 µg/24h", precio: 176.00 },
  { codigo: "134", nombre: "ARSENICO EN ORINA", unidad: "µg/L", refMin: 0, refMax: 35, referencia: "< 35 µg/L", precio: 179.00 },
  { codigo: "135", nombre: "ARSENICO SANGRE TOTAL", unidad: "µg/L", refMin: 0, refMax: 13, referencia: "< 13 µg/L", precio: 202.00 },
  { codigo: "136", nombre: "ASCA (ANTI-SACCHAROMYCES CEREVISIAE), IGA", unidad: "U/mL", refMin: 0, refMax: 10, referencia: "Negativo: < 10 U/mL", precio: 298.00 },
  { codigo: "137", nombre: "ASCA (ANTI-SACCHAROMYCES CEREVISIAE), IGG", unidad: "U/mL", refMin: 0, refMax: 10, referencia: "Negativo: < 10 U/mL", precio: 256.00 },
  { codigo: "138", nombre: "ASPERGILLUS ANTICUERPOS", unidad: "", refMin: "", refMax: "", referencia: "NEGATIVO", precio: 160.00 },
  { codigo: "139", nombre: "AUTO ANTICUERPOS MEMBRANA BASAL GLOMERULAR", unidad: "RU/mL", refMin: 0, refMax: 20, referencia: "Negativo: < 20 RU/mL", precio: 224.00 },
  { codigo: "140", nombre: "BANDAS OLIGOCLONALES EN LCR IGG", unidad: "", refMin: "", refMax: "", referencia: "AUSENTES", precio: 603.00 },
  { codigo: "141", nombre: "BANDAS OLIGOCLONALES EN LCR IGM", unidad: "", refMin: "", refMax: "", referencia: "AUSENTES", precio: 3717.00 },
  { codigo: "142", nombre: "BANDAS OLIGOCLONALES IGG, LÍQUIDO CEFALORRAQUÍDEO", unidad: "", refMin: "", refMax: "", referencia: "AUSENTES", precio: 1400.00 },
  { codigo: "143", nombre: "BARBITURATOS EN ORINA", unidad: "ng/mL", refMin: 0, refMax: 200, referencia: "Negativo: < 200 ng/mL", precio: 287.00 },
  { codigo: "144", nombre: "BARTONELLA HENSELAE IGG", unidad: "", refMin: "", refMax: "", referencia: "Negativo: < 1:64", precio: 535.00 },
  { codigo: "145", nombre: "BARTONELLA HENSELAE IGM", unidad: "", refMin: "", refMax: "", referencia: "Negativo: < 1:20", precio: 535.00 },
  { codigo: "146", nombre: "BCR/ABL T (9;22) (P190), DETECCION X PCR", unidad: "", refMin: "", refMax: "", referencia: "NO DETECTADO", precio: 2398.00 },
  { codigo: "147", nombre: "BCR/ABL T(9;22) (P210) CUANTIFICACION X PCR", unidad: "% IS", refMin: 0, refMax: 0.1, referencia: "Respuesta Molecular Mayor ≤ 0.1%", precio: 744.00 },
  { codigo: "148", nombre: "BENCENO EN ORINA", unidad: "µg/L", refMin: 0, refMax: 25, referencia: "< 25 µg/L", precio: 493.00 },
  { codigo: "149", nombre: "BENZODIAZEPINAS (DROGAS) CUALITATIVO EN ORINA", unidad: "", refMin: "", refMax: "", referencia: "NEGATIVO", precio: 70.00 },
  { codigo: "150", nombre: "BENZODIAZEPINAS CUANTITATIVO EN ORINA", unidad: "ng/mL", refMin: 0, refMax: 200, referencia: "< 200 ng/mL", precio: 216.00 },
  { codigo: "151", nombre: "BETA 2 GLICOPROTEINA I IGG (IM)", unidad: "U/mL", refMin: 0, refMax: 20, referencia: "Negativo: < 20 U/mL", precio: 187.00 },
  { codigo: "152", nombre: "BETA 2 GLICOPROTEINA I IGM (IM)", unidad: "U/mL", refMin: 0, refMax: 20, referencia: "Negativo: < 20 U/mL", precio: 187.00 },
  { codigo: "153", nombre: "BETA 2 MICROGLOBULINA ORINA 24 HRS", unidad: "µg/24h", refMin: 0, refMax: 300, referencia: "< 300 µg/24h", precio: 120.00 },
  { codigo: "154", nombre: "BETA 2 MICROGLOBULINA ORINA SIMPLE", unidad: "µg/L", refMin: 0, refMax: 200, referencia: "< 200 µg/L", precio: 105.00 },
  { codigo: "155", nombre: "BETA 2 MICROGLOBULINA SERICA", unidad: "mg/L", refMin: 1.2, refMax: 2.7, referencia: "1.2 - 2.7 mg/L", precio: 50.00 },
  { codigo: "158", nombre: "BETA-HCG LIBRE", unidad: "mIU/mL", refMin: 0, refMax: 5, referencia: "Según semanas de gestación / No gestante < 5 mIU/mL", precio: 200.00 },
  { codigo: "159", nombre: "BICARBONATO SERICO CO2 (HN)", unidad: "mmol/L", refMin: 22, refMax: 29, referencia: "22 - 29 mmol/L", precio: 63.00 },
  { codigo: "160", nombre: "BILIRRUBINA DIRECTA", unidad: "mg/dL", refMin: 0, refMax: 0.4, referencia: "< 0.4 mg/dL", precio: 20.00 },
  { codigo: "161", nombre: "BILIRRUBINA INDIRECTA", unidad: "mg/dL", refMin: 0.2, refMax: 0.8, referencia: "0.2 - 0.8 mg/dL", precio: 20.00 },
  { codigo: "162", nombre: "BILIRRUBINAS FRACCIONADAS", unidad: "mg/dL", refMin: 0.2, refMax: 1.2, referencia: "Directa < 0.4 mg/dL, Total < 1.2 mg/dL", precio: 25.00 },
  { codigo: "163", nombre: "BILIRRUBINAS TOTALES Y FRACCIONADAS (79, 79A Y 79B)", unidad: "mg/dL", refMin: 0.2, refMax: 1.2, referencia: "Total: 0.2 - 1.2 mg/dL", precio: 20.00 },
  { codigo: "164", nombre: "BIOPSIA CERVIX", unidad: "", refMin: "", refMax: "", referencia: "INFORME HISTOPATOLÓGICO", precio: 130.00 },
  { codigo: "165", nombre: "BIOPSIA DE MAMA", unidad: "", refMin: "", refMax: "", referencia: "INFORME HISTOPATOLÓGICO", precio: 150.00 },
  { codigo: "166", nombre: "BIOPSIA DE PIEL/HISTOQUÍMICA", unidad: "", refMin: "", refMax: "", referencia: "INFORME HISTOPATOLÓGICO", precio: 150.00 },
  { codigo: "167", nombre: "BIOPSIA DE PROSTATA", unidad: "", refMin: "", refMax: "", referencia: "INFORME HISTOPATOLÓGICO", precio: 290.00 },
  { codigo: "168", nombre: "BIOPSIA DE PROSTATA ESTUDIO ANATOMOPATOLOGICO", unidad: "", refMin: "", refMax: "", referencia: "INFORME HISTOPATOLÓGICO", precio: 580.00 },
  { codigo: "169", nombre: "BIOPSIA MENTON", unidad: "", refMin: "", refMax: "", referencia: "INFORME HISTOPATOLÓGICO", precio: 150.00 },
  { codigo: "173", nombre: "BIOPSIA PIEZA OPERATORIA <=5 MM", unidad: "", refMin: "", refMax: "", referencia: "INFORME HISTOPATOLÓGICO", precio: 90.00 },
  { codigo: "171", nombre: "BIOPSIA PIEZA OPERATORIA CHICA >5 MM <= 2CM", unidad: "", refMin: "", refMax: "", referencia: "INFORME HISTOPATOLÓGICO", precio: 110.00 },
  { codigo: "170", nombre: "BIOPSIA PIEZA OPERATORIA EXTRA GRANDE >10CM", unidad: "", refMin: "", refMax: "", referencia: "INFORME HISTOPATOLÓGICO", precio: 420.00 },
  { codigo: "174", nombre: "BIOPSIA PIEZA OPERATORIA GRANDE >5 CM Y <=10 CM", unidad: "", refMin: "", refMax: "", referencia: "INFORME HISTOPATOLÓGICO", precio: 260.00 },
  { codigo: "172", nombre: "BIOPSIA PIEZA OPERATORIA MEDIANA >2 MM <= 5CM", unidad: "", refMin: "", refMax: "", referencia: "INFORME HISTOPATOLÓGICO", precio: 125.00 },
  { codigo: "175", nombre: "BIOPSIA POR ASPIRACION (BAAF)", unidad: "", refMin: "", refMax: "", referencia: "INFORME CITOPATOLÓGICO", precio: 116.00 },
  { codigo: "176", nombre: "BK (ORINA 24 HORAS)", unidad: "", refMin: "", refMax: "", referencia: "NEGATIVO", precio: 24.00 },
  { codigo: "177", nombre: "BK CULTIVO (ED)", unidad: "", refMin: "", refMax: "", referencia: "SIN DESARROLLO DE M. TUBERCULOSIS", precio: 70.00 },
  { codigo: "178", nombre: "BK CULTIVO EN ESPUTO", unidad: "", refMin: "", refMax: "", referencia: "SIN DESARROLLO DE M. TUBERCULOSIS", precio: 55.00 },
  { codigo: "179", nombre: "BK CULTIVO EN ESPUTO MX 01", unidad: "", refMin: "", refMax: "", referencia: "SIN DESARROLLO DE M. TUBERCULOSIS", precio: 55.00 },
  { codigo: "180", nombre: "BK CULTIVO EN ESPUTO MX 02", unidad: "", refMin: "", refMax: "", referencia: "SIN DESARROLLO DE M. TUBERCULOSIS", precio: 55.00 },
  { codigo: "181", nombre: "BK CULTIVO EN ESPUTO MX 03", unidad: "", refMin: "", refMax: "", referencia: "SIN DESARROLLO DE M. TUBERCULOSIS", precio: 55.00 },
  { codigo: "182", nombre: "BK DIRECTO", unidad: "", refMin: "", refMax: "", referencia: "NEGATIVO PARA B.A.A.R.", precio: 45.00 },
  { codigo: "184", nombre: "BK DIRECTO - LCR", unidad: "", refMin: "", refMax: "", referencia: "NEGATIVO PARA B.A.A.R.", precio: 60.00 },
  { codigo: "185", nombre: "BK DIRECTO EN ESPUTO (PRIMERA MUESTRA)", unidad: "", refMin: "", refMax: "", referencia: "NEGATIVO PARA B.A.A.R.", precio: 15.00 },
  { codigo: "186", nombre: "BK DIRECTO EN ESPUTO (SEGUNDA MUESTRA)", unidad: "", refMin: "", refMax: "", referencia: "NEGATIVO PARA B.A.A.R.", precio: 15.00 },
  { codigo: "187", nombre: "BK DIRECTO EN ESPUTO (TERCERA MUESTRA)", unidad: "", refMin: "", refMax: "", referencia: "NEGATIVO PARA B.A.A.R.", precio: 15.00 },
  { codigo: "188", nombre: "BK DIRECTO- LCR", unidad: "", refMin: "", refMax: "", referencia: "NEGATIVO PARA B.A.A.R.", precio: 24.00 },
  { codigo: "189", nombre: "BK DIRECTO-LIQUIDO PLEURAL", unidad: "", refMin: "", refMax: "", referencia: "NEGATIVO PARA B.A.A.R.", precio: 30.00 },
  { codigo: "191", nombre: "BK DIRECTO-LIQUIDO SINOVIAL", unidad: "", refMin: "", refMax: "", referencia: "NEGATIVO PARA B.A.A.R.", precio: 24.00 },
  { codigo: "193", nombre: "BK ESPUTO (3 MUESTRAS)", unidad: "", refMin: "", refMax: "", referencia: "NEGATIVO PARA B.A.A.R.", precio: 80.00 },
  { codigo: "194", nombre: "BK VIRUS POR PCR EN TIEMPO REAL", unidad: "copias/mL", refMin: 0, refMax: 500, referencia: "< 500 copias/mL", precio: 1813.00 },
  { codigo: "195", nombre: "BLASTOMYCES ANTICUERPOS", unidad: "", refMin: "", refMax: "", referencia: "NEGATIVO", precio: 313.00 },
  { codigo: "196", nombre: "BLOCK CELL - BIOPSIA", unidad: "", refMin: "", refMax: "", referencia: "INFORME HISTOPATOLÓGICO", precio: 177.00 },
  { codigo: "197", nombre: "BLOCK CELL- BIOPSIA", unidad: "", refMin: "", refMax: "", referencia: "INFORME HISTOPATOLÓGICO", precio: 145.00 },
  { codigo: "198", nombre: "BORDETELLA PERTUSIS (COQUELUCHE) IGG", unidad: "U/mL", refMin: 0, refMax: 40, referencia: "Negativo: < 40 U/mL", precio: 311.00 },
  { codigo: "199", nombre: "BORDETELLA PERTUSIS (COQUELUCHE) IGM", unidad: "", refMin: "", refMax: "", referencia: "NEGATIVO", precio: 315.00 },
  { codigo: "200", nombre: "BORRELIA BURGDORFERI IGG", unidad: "RU/mL", refMin: 0, refMax: 16, referencia: "Negativo: < 16 RU/mL", precio: 298.00 },
  { codigo: "201", nombre: "BORRELIA BURGDORFERI IGM", unidad: "RU/mL", refMin: 0, refMax: 16, referencia: "Negativo: < 16 RU/mL", precio: 298.00 },
  { codigo: "202", nombre: "BRUCELA SP. X PCR EN TIEMPO REAL", unidad: "", refMin: "", refMax: "", referencia: "NO DETECTADO", precio: 1242.00 },
  { codigo: "203", nombre: "BRUCELLA ANTIC. IG-G (IM)", unidad: "", refMin: "", refMax: "", referencia: "NEGATIVO", precio: 177.00 },
  { codigo: "204", nombre: "BRUCELLA ANTIC. IG-M (IM)", unidad: "", refMin: "", refMax: "", referencia: "NEGATIVO", precio: 177.00 },
  { codigo: "205", nombre: "BRUCELLA ANTICUERPOS BLOQUEADORES", unidad: "", refMin: "", refMax: "", referencia: "NEGATIVO", precio: 50.00 },
  { codigo: "206", nombre: "BTA EN ORINA (MARCADOR TUMORAL VEJIGA)", unidad: "U/mL", refMin: 0, refMax: 14, referencia: "Negativo: < 14 U/mL", precio: 1813.00 },
  { codigo: "207", nombre: "C1 INHIBIDOR DE LA ESTERASA", unidad: "mg/dL", refMin: 21, refMax: 39, referencia: "21 - 39 mg/dL", precio: 158.00 },
  { codigo: "208", nombre: "CA 125 (OVARIO)", unidad: "U/mL", refMin: 0, refMax: 35, referencia: "< 35 U/mL", precio: 70.00 },
  { codigo: "209", nombre: "CA 15-3 (MAMA)", unidad: "U/mL", refMin: 0, refMax: 30, referencia: "< 30 U/mL", precio: 55.00 },
  { codigo: "210", nombre: "CA 27-29 (MARCADOR MAMA)", unidad: "U/mL", refMin: 0, refMax: 38, referencia: "< 38 U/mL", precio: 511.00 },
  { codigo: "211", nombre: "CA 549 (MARCADOR MAMA)", unidad: "U/mL", refMin: 0, refMax: 12, referencia: "< 12 U/mL", precio: 260.00 },
  { codigo: "212", nombre: "CA 72-4 (ESTOMAGO)", unidad: "U/mL", refMin: 0, refMax: 6.9, referencia: "< 6.9 U/mL", precio: 50.00 },
  { codigo: "213", nombre: "CA19-9 (PANCREAS)", unidad: "U/mL", refMin: 0, refMax: 37, referencia: "< 37 U/mL", precio: 60.00 },
  { codigo: "214", nombre: "CADENAS LIGERAS KAPPA LIBRES EN ORINA", unidad: "mg/L", refMin: 1.35, refMax: 24.2, referencia: "1.35 - 24.2 mg/L", precio: 681.00 },
  { codigo: "215", nombre: "CADENAS LIGERAS KAPPA LIBRES EN SUERO", unidad: "mg/L", refMin: 3.3, refMax: 19.4, referencia: "3.3 - 19.4 mg/L", precio: 828.00 },
  { codigo: "216", nombre: "CADENAS LIGERAS LAMBDA LIBRES EN ORINA", unidad: "mg/L", refMin: 0.24, refMax: 6.67, referencia: "0.24 - 6.67 mg/L", precio: 365.00 },
  { codigo: "217", nombre: "CADENAS LIGERAS LAMBDA LIBRES SUERO", unidad: "mg/L", refMin: 5.7, refMax: 26.3, referencia: "5.7 - 26.3 mg/L", precio: 652.00 },
  { codigo: "218", nombre: "CADMIO (ORINA 24 HRS.)", unidad: "µg/24h", refMin: 0, refMax: 2.0, referencia: "< 2.0 µg/24h", precio: 202.00 },
  { codigo: "219", nombre: "CADMIO EN SANGRE TOTAL", unidad: "µg/L", refMin: 0, refMax: 5.0, referencia: "< 5.0 µg/L", precio: 202.00 },
  { codigo: "220", nombre: "CALCIO EN ORINA DE 24 HORAS", unidad: "mg/24h", refMin: 100, refMax: 300, referencia: "100 - 300 mg/24h", precio: 40.00 },
  { codigo: "221", nombre: "CALCIO EN ORINA SIMPLE", unidad: "mg/dL", refMin: 2.5, refMax: 20.0, referencia: "Según concentración urinaria", precio: 30.00 },
  { codigo: "222", nombre: "CALCIO IONICO", unidad: "mg/dL", refMin: 4.5, refMax: 5.3, referencia: "4.5 - 5.3 mg/dL", precio: 40.00 },
  { codigo: "223", nombre: "CALCIO SERICO", unidad: "mg/dL", refMin: 8.5, refMax: 10.5, referencia: "8.5 - 10.5 mg/dL", precio: 30.00 },
  { codigo: "224", nombre: "CALCITONINA", unidad: "pg/mL", refMin: 0, refMax: 10, referencia: "< 10 pg/mL", precio: 90.00 },
  { codigo: "226", nombre: "CALCULO BILIAR", unidad: "", refMin: "", refMax: "", referencia: "ANÁLISIS FISICOQUÍMICO", precio: 45.00 },
  { codigo: "227", nombre: "CALCULO URINARIO ANALISIS ( RENAL / VESICAL )", unidad: "", refMin: "", refMax: "", referencia: "ANÁLISIS FISICOQUÍMICO", precio: 102.00 },
  { codigo: "228", nombre: "CALPROTECTINA FECAL", unidad: "µg/g", refMin: 0, refMax: 50, referencia: "Normal: < 50 µg/g", precio: 479.00 },
  { codigo: "229", nombre: "CAMPYLOBACTER (HECES)", unidad: "", refMin: "", refMax: "", referencia: "NO SE AISLA CAMPYLOBACTER", precio: 40.00 },
  { codigo: "230", nombre: "CANDIDA ALBICANS,ANTICUERPOS (IGG)", unidad: "AU/mL", refMin: 0, refMax: 10, referencia: "Negativo: < 10 AU/mL", precio: 174.00 },
  { codigo: "232", nombre: "CARBAMATOS EN ORINA", unidad: "", refMin: "", refMax: "", referencia: "NEGATIVO", precio: 200.00 },
  { codigo: "233", nombre: "CARBAMATOS EN ORINA AL SIMPLE CUALITATIVO", unidad: "", refMin: "", refMax: "", referencia: "NEGATIVO", precio: 200.00 },
  { codigo: "234", nombre: "CARBAMAZEPINA (TEGRETOL)", unidad: "µg/mL", refMin: 4.0, refMax: 12.0, referencia: "4 - 12 µg/mL", precio: 80.00 },
  { codigo: "235", nombre: "CARBOXIHEMOGLOBINA \"COHB\" (HN)", unidad: "%", refMin: 0, refMax: 2.0, referencia: "0 - 2 % (no fumadores)", precio: 107.00 },
  { codigo: "236", nombre: "CARIOTIPO MEDULA OSEA (ESTUDIO CROMOSOMICO)", unidad: "", refMin: "", refMax: "", referencia: "46,XX / 46,XY (Cariotipo normal)", precio: 2431.00 },
  { codigo: "237", nombre: "CARIOTIPO SANGRE PERIFERICA (ESTUDIO CROMOSOMICO)", unidad: "", refMin: "", refMax: "", referencia: "46,XX / 46,XY (Cariotipo normal)", precio: 2337.00 },
  { codigo: "238", nombre: "CARNITINA TOTAL", unidad: "µmol/L", refMin: 34, refMax: 78, referencia: "34 - 78 µmol/L", precio: 389.00 },
  { codigo: "239", nombre: "CAROTENO SERICO", unidad: "µg/dL", refMin: 50, refMax: 250, referencia: "50 - 250 µg/dL", precio: 75.00 },
  { codigo: "240", nombre: "CATECOLAMINAS FRACCIONADAS (ORINA 24H)", unidad: "µg/24h", refMin: 0, refMax: 100, referencia: "Epinefrina < 20, Norepinefrina < 100", precio: 354.00 },
  { codigo: "241", nombre: "CATECOLAMINAS PLASMATICAS FRACCIONADAS", unidad: "pg/mL", refMin: 0, refMax: 500, referencia: "Epinefrina < 84, Norepinefrina < 420", precio: 620.00 },
  { codigo: "242", nombre: "CD34 - STEM CELL (SC)", unidad: "células/µL", refMin: 20, refMax: 100, referencia: "Según protocolo de aféresis", precio: 687.00 },
  { codigo: "243", nombre: "CELULAS DEL ISLOTE LANGERHANS. AUTOANTICUERPOS", unidad: "", refMin: "", refMax: "", referencia: "NEGATIVO", precio: 229.00 },
  { codigo: "244", nombre: "CELULAS NK NATURAL KILLER (CD56), SANGRE TOTAL", unidad: "%", refMin: 5, refMax: 20, referencia: "5 - 20 % de linfocitos", precio: 661.00 },
  { codigo: "245", nombre: "CELULAS PARIETALES ,AUTO ANTIC.", unidad: "", refMin: "", refMax: "", referencia: "NEGATIVO (< 1:20)", precio: 236.00 },
  { codigo: "246", nombre: "CENTROMERO , AUTOANTICUERPOS (IM)", unidad: "", refMin: "", refMax: "", referencia: "NEGATIVO", precio: 159.00 },
  { codigo: "247", nombre: "CERULOPLASMINA", unidad: "mg/dL", refMin: 27, refMax: 48, referencia: "27 - 48 mg/dL", precio: 140.00 },
  { codigo: "248", nombre: "CH 50 COMPLEMENTO", unidad: "U/mL", refMin: 60, refMax: 140, referencia: "60 - 140 U/mL", precio: 236.00 },
  { codigo: "250", nombre: "CHAGAS (TRIPANOZOMA CRUZI) ANTICUERPOS", unidad: "", refMin: "", refMax: "", referencia: "NO REACTIVO", precio: 174.00 },
  { codigo: "249", nombre: "CHAGAS - HEMOAGLUTINACIÓN (HAI)", unidad: "", refMin: "", refMax: "", referencia: "NEGATIVO (< 1:8)", precio: 147.00 },
  { codigo: "251", nombre: "CHLAMYDIA PNEUMONIAE (IGG)", unidad: "RU/mL", refMin: 0, refMax: 16, referencia: "Negativo: < 16 RU/mL", precio: 156.00 },
  { codigo: "252", nombre: "CHLAMYDIA PNEUMONIAE (IGM)", unidad: "RU/mL", refMin: 0, refMax: 16, referencia: "Negativo: < 16 RU/mL", precio: 164.00 },
  { codigo: "253", nombre: "CHLAMYDIA PSITACCI IGG", unidad: "", refMin: "", refMax: "", referencia: "Negativo: < 1:64", precio: 162.00 },
  { codigo: "254", nombre: "CHLAMYDIA PSITACCI IGM", unidad: "", refMin: "", refMax: "", referencia: "Negativo: < 1:10", precio: 162.00 },
  { codigo: "255", nombre: "CHLAMYDIA TRACHOMATIS , ADN X PCR", unidad: "", refMin: "", refMax: "", referencia: "NO DETECTADO", precio: 1112.00 },
  { codigo: "257", nombre: "CHLAMYDIA TRACHOMATIS IGG (IM)", unidad: "U/mL", refMin: 0, refMax: 10, referencia: "Negativo: < 10 U/mL", precio: 60.00 },
  { codigo: "258", nombre: "CHLAMYDIA TRACHOMATIS IGM (IM)", unidad: "U/mL", refMin: 0, refMax: 10, referencia: "Negativo: < 10 U/mL", precio: 60.00 },
  { codigo: "259", nombre: "CICLOSPORA (HECES)", unidad: "", refMin: "", refMax: "", referencia: "NO SE OBSERVAN OOCISTES", precio: 29.00 },
  { codigo: "260", nombre: "CICLOSPORINA A", unidad: "ng/mL", refMin: 100, refMax: 400, referencia: "100 - 400 ng/mL (según trasplante)", precio: 236.00 },
  { codigo: "261", nombre: "CISTATINA C", unidad: "mg/L", refMin: 0.5, refMax: 1.5, referencia: "0.5 - 1.5 mg/L", precio: 540.00 },
  { codigo: "262", nombre: "CISTICERCOS ANTIC.TOTALES ELISA", unidad: "", refMin: "", refMax: "", referencia: "NO REACTIVO", precio: 132.00 },
  { codigo: "263", nombre: "CISTICERCOSIS (WESTER BLOT) SUERO", unidad: "", refMin: "", refMax: "", referencia: "NEGATIVO", precio: 445.00 },
  { codigo: "264", nombre: "CISTICERCUS (WESTER BLOT) L.C.R", unidad: "", refMin: "", refMax: "", referencia: "NEGATIVO", precio: 479.00 },
  { codigo: "265", nombre: "CISTICERCUS LCR EIA", unidad: "", refMin: "", refMax: "", referencia: "NO REACTIVO", precio: 240.00 },
  { codigo: "266", nombre: "CISTICERCUS WESTERN BLOT", unidad: "", refMin: "", refMax: "", referencia: "NEGATIVO", precio: 240.00 },
  { codigo: "267", nombre: "CISTINA ORINA 24 HORAS", unidad: "mg/24h", refMin: 0, refMax: 60, referencia: "< 60 mg/24h", precio: 187.00 },
  { codigo: "268", nombre: "CITOBIOQUIMICO", unidad: "", refMin: "", refMax: "", referencia: "SEÚN TIPO DE LÍQUIDO BIOLÓGICO", precio: 50.00 },
  { codigo: "269", nombre: "CITOMEGALOVIRUS ANTICUERPOS IGG, LCR", unidad: "", refMin: "", refMax: "", referencia: "NEGATIVO", precio: 120.00 },
  { codigo: "270", nombre: "CITOMEGALOVIRUS ANTICUERPOS IGM, LCR", unidad: "", refMin: "", refMax: "", referencia: "NEGATIVO", precio: 80.00 },
  { codigo: "271", nombre: "CITOMEGALOVIRUS CARGA VIRAL (CUANTITATIVO)", unidad: "copias/mL", refMin: 0, refMax: 200, referencia: "< 200 copias/mL", precio: 1390.00 },
  { codigo: "272", nombre: "CITOMEGALOVIRUS DNA DETECTOR (CUALITATIVO)", unidad: "", refMin: "", refMax: "", referencia: "NO DETECTADO", precio: 911.00 },
  { codigo: "273", nombre: "CITOMELOGAVIRUS IGG", unidad: "U/mL", refMin: 0, refMax: 6, referencia: "Negativo: < 6 U/mL", precio: 90.00 },
  { codigo: "274", nombre: "CITOMELOGAVIRUS IGM", unidad: "Index", refMin: 0, refMax: 0.9, referencia: "Negativo: < 0.9 Index", precio: 90.00 },
  { codigo: "275", nombre: "CITOMETRIA DE FLUJO", unidad: "", refMin: "", refMax: "", referencia: "INFORME DE INMUNOFENOTIPO", precio: 2596.00 },
  { codigo: "276", nombre: "CITOQUIMICO - LCR", unidad: "", refMin: "", refMax: "", referencia: "Proteínas 15-45 mg/dL, Glucosa 50-80 mg/dL", precio: 60.00 },
  { codigo: "277", nombre: "CITRATO (ORINA 24HRS)(ACIDO CITRICO)", unidad: "mg/24h", refMin: 320, refMax: 1240, referencia: "> 320 mg/24h", precio: 250.00 },
  { codigo: "279", nombre: "CLOBAZAM, NORCLOBAZAM Y RATIO, SUERO", unidad: "ng/mL", refMin: 30, refMax: 300, referencia: "30 - 300 ng/mL", precio: 320.00 },
  { codigo: "280", nombre: "CLONAZEPAM (RIVOTRIL)", unidad: "ng/mL", refMin: 20, refMax: 70, referencia: "20 - 70 ng/mL", precio: 360.00 },
  { codigo: "281", nombre: "CLORO EN SUERO", unidad: "mmol/L", refMin: 96, refMax: 109, referencia: "96 - 109 mmol/L", precio: 28.00 },
  { codigo: "282", nombre: "CLOSTRIDIUM DIFFICILE TOXINA A/B", unidad: "", refMin: "", refMax: "", referencia: "NEGATIVO", precio: 191.00 },
  { codigo: "283", nombre: "COAGLUTINACION, ANTIGENOS BACTERIANOS LCR", unidad: "", refMin: "", refMax: "", referencia: "NEGATIVO", precio: 348.00 },
  { codigo: "284", nombre: "COBRE (ORINA 24 HORAS)", unidad: "µg/24h", refMin: 15, refMax: 60, referencia: "15 - 60 µg/24h", precio: 174.00 },
  { codigo: "285", nombre: "COBRE SERICO", unidad: "µg/dL", refMin: 70, refMax: 155, referencia: "70 - 155 µg/dL", precio: 174.00 },
  { codigo: "286", nombre: "COCAÍNA EN ORINA", unidad: "ng/mL", refMin: 0, refMax: 300, referencia: "Negativo: < 300 ng/mL", precio: 45.00 },
  { codigo: "287", nombre: "COCAINA PBC (ORINA SIMPLE) - AUTOMATIZADO (HN)", unidad: "", refMin: "", refMax: "", referencia: "NEGATIVO", precio: 40.00 },
  { codigo: "288", nombre: "COCAINA PBC (ORINA SIMPLE) - CCF CONFIRMATORIO CUALITOXICOLOGICO", unidad: "", refMin: "", refMax: "", referencia: "NEGATIVO", precio: 281.00 },
  { codigo: "289", nombre: "COCAINA PBC (ORINA SIMPLE) - CUALITATIVO", unidad: "", refMin: "", refMax: "", referencia: "NEGATIVO", precio: 30.00 },
  { codigo: "290", nombre: "COCAINA PBC (ORINA SIMPLE) - HPLC CONFIRMATORIO CON CROMATOGRAMA", unidad: "ng/mL", refMin: 0, refMax: 150, referencia: "Negativo: < 150 ng/mL", precio: 1416.00 },
  { codigo: "291", nombre: "COCAINA PBC (ORINA SIMPLE) - HPLC CONFIRMATORIO SIN CROMATOGRAMA", unidad: "ng/mL", refMin: 0, refMax: 150, referencia: "Negativo: < 150 ng/mL", precio: 705.00 },
  { codigo: "292", nombre: "COCCIDIOSIS , ANTICUERPOS (COCCIDIOMICOSIS)", unidad: "", refMin: "", refMax: "", referencia: "NEGATIVO", precio: 664.00 },
  { codigo: "293", nombre: "COCIENTE SFLT-1/PIGF (PREDICCIÓN DEL RIESGO DE PREECLAMPSIA)", unidad: "Ratio", refMin: 0, refMax: 38, referencia: "< 38 (Bajo riesgo)", precio: 2242.00 },
  { codigo: "294", nombre: "COFACTOR DE LA RISTOCETINA (VWF)", unidad: "%", refMin: 50, refMax: 150, referencia: "50 - 150 %", precio: 607.00 },
  { codigo: "295", nombre: "COLESTEROL - HDL", unidad: "mg/dL", refMin: 40, refMax: 60, referencia: "> 40 mg/dL (Varones), > 50 mg/dL (Mujeres)", precio: 20.00 },
  { codigo: "296", nombre: "COLESTEROL LDL", unidad: "mg/dL", refMin: 0, refMax: 100, referencia: "< 100 mg/dL (Deseable)", precio: 15.00 },
  { codigo: "297", nombre: "COLESTEROL TOTAL", unidad: "mg/dL", refMin: 0, refMax: 200, referencia: "< 200 mg/dL (Deseable)", precio: 15.00 },
  { codigo: "298", nombre: "COLESTEROL VLDL", unidad: "mg/dL", refMin: 2, refMax: 30, referencia: "< 30 mg/dL", precio: 20.00 },
  { codigo: "299", nombre: "COLESTEROL-ESTERES", unidad: "%", refMin: 60, refMax: 75, referencia: "60 - 75 % del Colesterol Total", precio: 68.00 },
  { codigo: "300", nombre: "COLINESTERASA ERITROCITARIA", unidad: "U/g Hb", refMin: 29, refMax: 44, referencia: "29 - 44 U/g Hb", precio: 114.00 },
  { codigo: "301", nombre: "COLORACION ALCIAN BLUE PARA BIOPSIA", unidad: "", refMin: "", refMax: "", referencia: "VER INFORME HISTOQUÍMICO", precio: 177.00 },
  { codigo: "302", nombre: "COLORACION BK FITE FARACO PARA BIOPSIA", unidad: "", refMin: "", refMax: "", referencia: "VER INFORME HISTOQUÍMICO", precio: 177.00 },
  { codigo: "303", nombre: "COLORACION GIEMSA PARA BIOPSIA", unidad: "", refMin: "", refMax: "", referencia: "VER INFORME HISTOQUÍMICO", precio: 177.00 },
  { codigo: "304", nombre: "COLORACION GRAM PARA BIOPSIA", unidad: "", refMin: "", refMax: "", referencia: "VER INFORME HISTOQUÍMICO", precio: 177.00 },
  { codigo: "305", nombre: "COLORACION GROCOT PARA BIOPSIA", unidad: "", refMin: "", refMax: "", referencia: "VER INFORME HISTOQUÍMICO", precio: 177.00 },
  { codigo: "306", nombre: "COLORACION HIERRO COLOIDAL PARA BIOPSIA", unidad: "", refMin: "", refMax: "", referencia: "VER INFORME HISTOQUÍMICO", precio: 177.00 },
  { codigo: "307", nombre: "COLORACION MALLORY PARA BIOPSIA", unidad: "", refMin: "", refMax: "", referencia: "VER INFORME HISTOQUÍMICO", precio: 177.00 },
  { codigo: "308", nombre: "COLORACION MASSON FONTANA PARA BIOPSIA", unidad: "", refMin: "", refMax: "", referencia: "VER INFORME HISTOQUÍMICO", precio: 177.00 },
  { codigo: "309", nombre: "COLORACION PAS ALCIAN BLUE PARA BIOPSIA", unidad: "", refMin: "", refMax: "", referencia: "VER INFORME HISTOQUÍMICO", precio: 177.00 },
  { codigo: "310", nombre: "COLORACION PAS DIASTASA PARA BIOPSIA", unidad: "", refMin: "", refMax: "", referencia: "VER INFORME HISTOQUÍMICO", precio: 177.00 },
  { codigo: "311", nombre: "COLORACION PAS PARA BIOPSIA", unidad: "", refMin: "", refMax: "", referencia: "VER INFORME HISTOQUÍMICO", precio: 177.00 },
  { codigo: "312", nombre: "COLORACION PERLS PARA BIOPSIA", unidad: "", refMin: "", refMax: "", referencia: "VER INFORME HISTOQUÍMICO", precio: 177.00 },
  { codigo: "313", nombre: "COLORACION PLATA METALAMINE PARA BIOPSIA", unidad: "", refMin: "", refMax: "", referencia: "VER INFORME HISTOQUÍMICO", precio: 177.00 },
  { codigo: "314", nombre: "COLORACION RETICULINA PARA BIOPSIA", unidad: "", refMin: "", refMax: "", referencia: "VER INFORME HISTOQUÍMICO", precio: 177.00 },
  { codigo: "315", nombre: "COLORACION ROJO CONGO PARA BIOPSIA", unidad: "", refMin: "", refMax: "", referencia: "VER INFORME HISTOQUÍMICO", precio: 177.00 },
  { codigo: "316", nombre: "COLORACION VERHOFF - FIBRAS ELÁSTICAS PARA BIOPSIA", unidad: "", refMin: "", refMax: "", referencia: "VER INFORME HISTOQUÍMICO", precio: 177.00 },
  { codigo: "317", nombre: "COLORACION VON KOSSA PARA BIOPSIA", unidad: "", refMin: "", refMax: "", referencia: "VER INFORME HISTOQUÍMICO", precio: 177.00 },
  { codigo: "318", nombre: "COMPLEMENTO C1", unidad: "mg/dL", refMin: 15, refMax: 25, referencia: "15 - 25 mg/dL", precio: 511.00 },
  { codigo: "319", nombre: "COMPLEMENTO C1Q", unidad: "mg/dL", refMin: 10, refMax: 25, referencia: "10 - 25 mg/dL", precio: 177.00 },
  { codigo: "320", nombre: "COMPLEMENTO C2", unidad: "mg/dL", refMin: 1.5, refMax: 4.0, referencia: "1.5 - 4.0 mg/dL", precio: 307.00 },
  { codigo: "321", nombre: "COMPLEMENTO C3", unidad: "mg/dL", refMin: 90, refMax: 180, referencia: "90 - 180 mg/dL", precio: 50.00 },
  { codigo: "323", nombre: "COMPLEMENTO C4", unidad: "mg/dL", refMin: 10, refMax: 40, referencia: "10 - 40 mg/dL", precio: 50.00 },
  { codigo: "325", nombre: "COMPLEMENTO C5", unidad: "mg/dL", refMin: 8, refMax: 15, referencia: "8 - 15 mg/dL", precio: 402.00 },
  { codigo: "326", nombre: "COMPLEMENTO C8", unidad: "mg/dL", refMin: 1.3, refMax: 3.5, referencia: "1.3 - 3.5 mg/dL", precio: 744.00 },
  { codigo: "327", nombre: "CONSTANTES CORPUSCULARES", unidad: "", refMin: "", refMax: "", referencia: "VCM: 83-97 fL, HCM: 27-32 pg, CCMH: 32-36 g/dL", precio: 20.00 },
  { codigo: "1163", nombre: "CONSULTA ESPECIALIDAD METABOLISMO", unidad: "", refMin: "", refMax: "", referencia: "EVALUACIÓN MÉDICA", precio: 150.00 },
  { codigo: "1161", nombre: "CONSULTA MEDICO GENERAL", unidad: "", refMin: "", refMax: "", referencia: "EVALUACIÓN MÉDICA", precio: 50.00 },
  { codigo: "328", nombre: "COPROCULTIVO", unidad: "", refMin: "", refMax: "", referencia: "NO SE AISLAN ENTEROPATÓGENOS", precio: 40.00 },
  { codigo: "329", nombre: "COPROLOGICO FUNCIONAL", unidad: "", refMin: "", refMax: "", referencia: "pH 6.0-8.0, Reacción neutra, Grasas/Almidón/Levaduras: Negativo", precio: 40.00 },
  { codigo: "330", nombre: "CORONAVIRUS SARS COV-2", unidad: "", refMin: "", refMax: "", referencia: "NO DETECTADO / NEGATIVO", precio: 60.00 },
  { codigo: "332", nombre: "CORTISOL AM", unidad: "µg/dL", refMin: 6.2, refMax: 19.4, referencia: "6.2 - 19.4 µg/dL (8:00 AM)", precio: 50.00 },
  { codigo: "333", nombre: "CORTISOL LIBRE (ORINA 24 HORAS)", unidad: "µg/24h", refMin: 10, refMax: 100, referencia: "10 - 100 µg/24h", precio: 105.00 },
  { codigo: "334", nombre: "CORTISOL P.M.", unidad: "µg/dL", refMin: 2.3, refMax: 11.9, referencia: "2.3 - 11.9 µg/dL (4:00 PM)", precio: 40.00 },
  { codigo: "335", nombre: "CORTISOL SALIVA A.M.", unidad: "ng/mL", refMin: 1.0, refMax: 8.0, referencia: "1.0 - 8.0 ng/mL", precio: 127.00 },
  { codigo: "336", nombre: "CORTISOL SALIVA P.M.", unidad: "ng/mL", refMin: 0.1, refMax: 1.5, referencia: "< 1.5 ng/mL", precio: 127.00 },
  { codigo: "337", nombre: "COTININA EN ORINA SIMPLE (NICOTINA)", unidad: "ng/mL", refMin: 0, refMax: 200, referencia: "No fumador: < 200 ng/mL", precio: 62.00 },
  { codigo: "338", nombre: "COTININA EN SANGRE", unidad: "ng/mL", refMin: 0, refMax: 15, referencia: "No fumador: < 15 ng/mL", precio: 229.00 },
  { codigo: "339", nombre: "COVID- PRUEBA RAPIDA", unidad: "", refMin: "", refMax: "", referencia: "NO REACTIVO", precio: 50.00 },
  { codigo: "340", nombre: "COVID-19 MOLECULAR PCR (PROCESAMIENTO)", unidad: "", refMin: "", refMax: "", referencia: "NO DETECTADO", precio: 156.00 },
  { codigo: "341", nombre: "COXSACKIE A VIRUS, ANTICUERPO", unidad: "", refMin: "", refMax: "", referencia: "Negativo: < 1:10", precio: 671.00 },
  { codigo: "342", nombre: "COXSACKIE B (1-6) ANTICUERPOS IGG SUERO", unidad: "", refMin: "", refMax: "", referencia: "Negativo: < 1:10", precio: 439.00 },
  { codigo: "343", nombre: "COXSACKIE B ANTICUERPOS IGM", unidad: "", refMin: "", refMax: "", referencia: "NEGATIVO", precio: 327.00 },
  { codigo: "344", nombre: "CPK MB (CREATIN FOSOFOKINASA-MB)", unidad: "U/L", refMin: 0, refMax: 25, referencia: "< 25 U/L (< 6% de CPK Total)", precio: 60.00 },
  { codigo: "345", nombre: "CPK TOTAL (CREATIN FOSFOKINASA TOTAL)", unidad: "U/L", refMin: 45, refMax: 170, referencia: "45 - 170 U/L (Hombre), 45 - 135 U/L (Mujer)", precio: 50.00 },
  { codigo: "346", nombre: "CREATINFOSFOQUINASA (CPK TOTAL) (HN)", unidad: "U/L", refMin: 45, refMax: 170, referencia: "45 - 170 U/L", precio: 80.00 },
  { codigo: "349", nombre: "CREATININA (ORINA SIMPLE)", unidad: "mg/dL", refMin: 20, refMax: 320, referencia: "20 - 320 mg/dL", precio: 30.00 },
  { codigo: "347", nombre: "CREATININA - DEPURACION ORINA 12 HRS", unidad: "mL/min", refMin: 90, refMax: 140, referencia: "90 - 140 mL/min/1.73m²", precio: 45.00 },
  { codigo: "1158", nombre: "CREATININA - DEPURACION ORINA 24 HRS", unidad: "mL/min", refMin: 90, refMax: 140, referencia: "90 - 140 mL/min/1.73m²", precio: 45.00 },
  { codigo: "348", nombre: "CREATININA - ORINA 24 HRS", unidad: "g/24h", refMin: 0.8, refMax: 2.0, referencia: "0.8 - 2.0 g/24h", precio: 30.00 },
  { codigo: "350", nombre: "CREATININA POST", unidad: "mg/dL", refMin: 0.6, refMax: 1.3, referencia: "0.6 - 1.3 mg/dL", precio: 15.00 },
  { codigo: "351", nombre: "CREATININA SERICA", unidad: "mg/dL", refMin: 0.6, refMax: 1.3, referencia: "0.6 - 1.3 mg/dL (Hombre), 0.6 - 1.1 mg/dL (Mujer)", precio: 15.00 },
  { codigo: "352", nombre: "CRIOAGLUTININAS", unidad: "", refMin: "", refMax: "", referencia: "NEGATIVO (< 1:32)", precio: 69.00 },
  { codigo: "353", nombre: "CRIOGLOBULINAS", unidad: "mg/dL", refMin: 0, refMax: 2, referencia: "NEGATIVO (< 2 mg/dL)", precio: 75.00 },
  { codigo: "354", nombre: "CRYPTOSPORIDIUM (HECES)", unidad: "", refMin: "", refMax: "", referencia: "NO SE OBSERVAN OOCISTES", precio: 43.00 },
  { codigo: "355", nombre: "CROMO EN ORINA 24 HORAS", unidad: "µg/24h", refMin: 0, refMax: 2.0, referencia: "< 2.0 µg/24h", precio: 164.00 },
  { codigo: "356", nombre: "CROMO SANGRE TOTAL", unidad: "µg/L", refMin: 0, refMax: 1.4, referencia: "< 1.4 µg/L", precio: 202.00 },
  { codigo: "357", nombre: "CROMOGRANINA A", unidad: "ng/mL", refMin: 0, refMax: 100, referencia: "< 100 ng/mL", precio: 608.00 },
  { codigo: "358", nombre: "CRYPTOCOCCUS ANTICUERPOS", unidad: "", refMin: "", refMax: "", referencia: "NEGATIVO", precio: 300.00 },
  { codigo: "359", nombre: "CRYPTOCOCCUS ANTIGENO (LATEX)", unidad: "", refMin: "", refMax: "", referencia: "NEGATIVO", precio: 170.00 },
  { codigo: "360", nombre: "CRYPTOCOCCUS ANTIGENO LATEX (EN SUERO)", unidad: "", refMin: "", refMax: "", referencia: "NEGATIVO", precio: 196.00 },
  { codigo: "361", nombre: "CRYPTOCOCCUS, ANTIGENO LATEX (EN LCR)", unidad: "", refMin: "", refMax: "", referencia: "NEGATIVO", precio: 298.00 },
  { codigo: "362", nombre: "CTX BETA CROSSLAPS (BETA C-TELOPEPTIDO)", unidad: "ng/mL", refMin: 0.1, refMax: 0.7, referencia: "Según estado menopáusico / edad", precio: 206.00 },
  { codigo: "363", nombre: "CULTIVO (GERMENES COMUNES)", unidad: "", refMin: "", refMax: "", referencia: "SIN DESARROLLO BACTERIANO", precio: 70.00 },
  { codigo: "364", nombre: "CULTIVO DE BK", unidad: "", refMin: "", refMax: "", referencia: "SIN DESARROLLO DE M. TUBERCULOSIS", precio: 95.00 },
  { codigo: "366", nombre: "CULTIVO DE ESPUTO", unidad: "", refMin: "", refMax: "", referencia: "DESARROLLO DE FLORA DE BOCA", precio: 60.00 },
  { codigo: "365", nombre: "CULTIVO DE ESPUTO ( GERMENES COMUNES )", unidad: "", refMin: "", refMax: "", referencia: "DESARROLLO DE FLORA HABITUAL", precio: 50.00 },
  { codigo: "367", nombre: "CULTIVO DE HONGOS", unidad: "", refMin: "", refMax: "", referencia: "SIN DESARROLLO MICÓTICO", precio: 50.00 },
  { codigo: "368", nombre: "CULTIVO DE LCR", unidad: "", refMin: "", refMax: "", referencia: "ESTÉRIL", precio: 42.00 },
  { codigo: "369", nombre: "CULTIVO DE LIQUIDO ASCITICO", unidad: "", refMin: "", refMax: "", referencia: "ESTÉRIL", precio: 70.00 },
  { codigo: "370", nombre: "CULTIVO DE SECRECIÓN CON MIC", unidad: "", refMin: "", refMax: "", referencia: "SIN DESARROLLO BACTERIANO PATóGENO", precio: 110.00 },
  { codigo: "371", nombre: "CULTIVO DE SECRECION CONJUNTIVAL", unidad: "", refMin: "", refMax: "", referencia: "SIN DESARROLLO PATÓGENO", precio: 40.00 },
  { codigo: "372", nombre: "CULTIVO DE SECRECION FARINGEA", unidad: "", refMin: "", refMax: "", referencia: "FLORA HABITUAL DE FARINGE", precio: 60.00 },
  { codigo: "373", nombre: "CULTIVO DE SECRECION OTICA", unidad: "", refMin: "", refMax: "", referencia: "SIN DESARROLLO PATÓGENO", precio: 50.00 },
  { codigo: "374", nombre: "CULTIVO DE SECRECION PARANASAL", unidad: "", refMin: "", refMax: "", referencia: "SIN DESARROLLO PATÓGENO", precio: 42.00 },
  { codigo: "375", nombre: "CULTIVO DE SECRECION URETRAL", unidad: "", refMin: "", refMax: "", referencia: "SIN DESARROLLO PATÓGENO", precio: 42.00 },
  { codigo: "377", nombre: "CULTIVO DE SECRECION VAGINAL", unidad: "", refMin: "", refMax: "", referencia: "FLORA HABITUAL VAGINAL", precio: 60.00 },
  { codigo: "378", nombre: "CULTIVO DE SEMEN (ESPERMA) (ED + ATB)", unidad: "", refMin: "", refMax: "", referencia: "ESTÉRIL", precio: 100.00 },
  { codigo: "379", nombre: "CULTIVO LCR", unidad: "", refMin: "", refMax: "", referencia: "ESTÉRIL", precio: 60.00 },
  { codigo: "380", nombre: "CULTIVO LIQUIDO PLEURAL", unidad: "", refMin: "", refMax: "", referencia: "ESTÉRIL", precio: 42.00 },
  { codigo: "381", nombre: "CULTIVO LIQUIDO SINOVIAL", unidad: "", refMin: "", refMax: "", referencia: "ESTÉRIL", precio: 42.00 },
  { codigo: "382", nombre: "CULTIVO OTROS", unidad: "", refMin: "", refMax: "", referencia: "SIN DESARROLLO PATÓGENO", precio: 60.00 },
  { codigo: "383", nombre: "CULTIVOS (OTROS)", unidad: "", refMin: "", refMax: "", referencia: "SIN DESARROLLO PATÓGENO", precio: 42.00 },
  { codigo: "384", nombre: "CULTIVOS DE GERMENES COMUNES", unidad: "", refMin: "", refMax: "", referencia: "SIN DESARROLLO BACTERIANO", precio: 70.00 },
  { codigo: "385", nombre: "CYFRA 21-1 (CK19)", unidad: "ng/mL", refMin: 0, refMax: 3.3, referencia: "< 3.3 ng/mL", precio: 130.00 },
  { codigo: "386", nombre: "DEMODEX FOLICULORUM", unidad: "", refMin: "", refMax: "", referencia: "NEGATIVO", precio: 29.00 },
  { codigo: "387", nombre: "DENGUE ANTIGENO NS1 CUALITATIVO", unidad: "", refMin: "", refMax: "", referencia: "NO REACTIVO", precio: 40.00 },
  { codigo: "388", nombre: "DENGUE VIRUS ANTICUERPOS IGG + IGM CUALITATIVO (IM)", unidad: "", refMin: "", refMax: "", referencia: "NO REACTIVO", precio: 80.00 },
  { codigo: "389", nombre: "DENGUE VIRUS ANTICUERPOS IGG CUANTITATIVO (IM)", unidad: "Index", refMin: 0, refMax: 0.9, referencia: "Negativo: < 0.9", precio: 147.00 },
  { codigo: "390", nombre: "DENGUE VIRUS ANTICUERPOS IGM CUANTITATIVO (IM)", unidad: "Index", refMin: 0, refMax: 0.9, referencia: "Negativo: < 0.9", precio: 112.00 },
  { codigo: "391", nombre: "DENSIDAD URINARIA", unidad: "", refMin: 1.005, refMax: 1.030, referencia: "1.005 - 1.030", precio: 48.00 },
  { codigo: "392", nombre: "DEOXYPIRIDINOLINA D-PYR (ORINA 24H)", unidad: "nM BCE/mM Creat", refMin: 2.3, refMax: 7.4, referencia: "2.3 - 7.4 nM BCE/mM Creatinina", precio: 691.00 },
  { codigo: "394", nombre: "DEPURACION DE CREATININA", unidad: "mL/min", refMin: 90, refMax: 140, referencia: "90 - 140 mL/min/1.73m²", precio: 45.00 },
  { codigo: "393", nombre: "DEPURACION DE CREATININA ENDOGENA", unidad: "mL/min", refMin: 90, refMax: 140, referencia: "90 - 140 mL/min/1.73m²", precio: 40.00 },
  { codigo: "395", nombre: "DEPURACIONDECREATININA -ORINA24HORAS", unidad: "mL/min", refMin: 90, refMax: 140, referencia: "90 - 140 mL/min/1.73m²", precio: 45.00 },
  { codigo: "396", nombre: "DESHIDROGENASA LACTICA (LDH) DHL", unidad: "U/L", refMin: 135, refMax: 225, referencia: "135 - 225 U/L", precio: 40.00 },
  { codigo: "397", nombre: "DESPISTAJE ALERGICO AMPLIADO (295 ALERGENOS)", unidad: "", refMin: "", refMax: "", referencia: "CLASE 0 (NO DETECTABLE)", precio: 1793.00 },
  { codigo: "398", nombre: "DESPISTAJE ALERGICO BASICO (32 ALERGENOS)", unidad: "", refMin: "", refMax: "", referencia: "CLASE 0 (NO DETECTABLE)", precio: 250.00 },
  { codigo: "399", nombre: "DESPISTAJE ALERGICO BASICO (36 ALERGENOS) (IM)", unidad: "", refMin: "", refMax: "", referencia: "CLASE 0 (NO DETECTABLE)", precio: 280.00 },
  { codigo: "400", nombre: "DESPISTAJE ALERGICO BASICO (36 ALERGENOS) PANEL PERUANO (IM)", unidad: "", refMin: "", refMax: "", referencia: "CLASE 0 (NO DETECTABLE)", precio: 250.00 },
  { codigo: "2", nombre: "DESPISTAJE ALERGICO BASICO (44 ALERGENOS) PANEL PERUANO (IM)", unidad: "", refMin: "", refMax: "", referencia: "CLASE 0 (NO DETECTABLE)", precio: 350.00 },
  { codigo: "401", nombre: "DHEA-S (SULFATO DE DESHIDROEPIANDROSTERONA)", unidad: "µg/dL", refMin: 80, refMax: 560, referencia: "Según edad y sexo", precio: 60.00 },
  { codigo: "402", nombre: "DHL- ISOENZIMAS", unidad: "%", refMin: 14, refMax: 37, referencia: "LDH-1: 14-26%, LDH-2: 29-37%", precio: 440.00 },
  { codigo: "403", nombre: "DIAZEPAN", unidad: "ng/mL", refMin: 200, refMax: 1000, referencia: "200 - 1000 ng/mL", precio: 313.00 },
  { codigo: "404", nombre: "DIFENIL HIDANTOINA (FENITOINA)(EPAMIN, DILANTIN)", unidad: "µg/mL", refMin: 10.0, refMax: 20.0, referencia: "10 - 20 µg/mL", precio: 75.00 },
  { codigo: "405", nombre: "DIFENIL HIDANTOINA LIBRE", unidad: "µg/mL", refMin: 1.0, refMax: 2.0, referencia: "1 - 2 µg/mL", precio: 262.00 },
  { codigo: "406", nombre: "DIGOXINA", unidad: "ng/mL", refMin: 0.8, refMax: 2.0, referencia: "0.8 - 2.0 ng/mL", precio: 108.00 },
  { codigo: "407", nombre: "DIHIDROTESTOSTERONA DHT", unidad: "pg/mL", refMin: 250, refMax: 990, referencia: "250 - 990 pg/mL (Varones)", precio: 162.00 },
  { codigo: "408", nombre: "DIMERO D", unidad: "ng/mL FEU", refMin: 0, refMax: 500, referencia: "< 500 ng/mL FEU", precio: 80.00 },
  { codigo: "410", nombre: "DOSAJE DE ACTH", unidad: "pg/mL", refMin: 7.2, refMax: 63.3, referencia: "7.2 - 63.3 pg/mL (8:00 AM)", precio: 80.00 },
  { codigo: "411", nombre: "DOSAJE DE AMIKACINA", unidad: "µg/mL", refMin: 15, refMax: 30, referencia: "Pico: 15 - 30 µg/mL", precio: 520.00 },
  { codigo: "412", nombre: "DOSAJE DE EVEROLIMUS (CDX)", unidad: "ng/mL", refMin: 3.0, refMax: 8.0, referencia: "3 - 8 ng/mL", precio: 697.00 },
  { codigo: "413", nombre: "DOSAJE DE INMUNOGLOBULINAS A,G Y M", unidad: "mg/dL", refMin: 60, refMax: 1800, referencia: "IgA: 90-400, IgG: 800-1800, IgM: 60-250", precio: 110.00 },
  { codigo: "414", nombre: "ECHOVIRUS, ANTC. (4, 9, 11, 30)", unidad: "", refMin: "", refMax: "", referencia: "Negativo: < 1:10", precio: 534.00 },
  { codigo: "415", nombre: "ECOGRAFÍA ABDOMINAL", unidad: "", refMin: "", refMax: "", referencia: "INFORME ECOGRÁFICO", precio: 130.00 },
  { codigo: "416", nombre: "ECOGRAFÍA OBSTETRICA/GINECO", unidad: "", refMin: "", refMax: "", referencia: "INFORME ECOGRÁFICO", precio: 100.00 },
  { codigo: "417", nombre: "ECOGRAFÍA PARTES BLANDAS", unidad: "", refMin: "", refMax: "", referencia: "INFORME ECOGRÁFICO", precio: 100.00 },
  { codigo: "418", nombre: "ECOGRAFÍA PELVICA", unidad: "", refMin: "", refMax: "", referencia: "INFORME ECOGRÁFICO", precio: 100.00 },
  { codigo: "419", nombre: "ECOGRAFÍA PROSTATICA (ABD)", unidad: "", refMin: "", refMax: "", referencia: "INFORME ECOGRÁFICO", precio: 90.00 },
  { codigo: "420", nombre: "ECOGRAFÍA PROSTATICA (TR)", unidad: "", refMin: "", refMax: "", referencia: "INFORME ECOGRÁFICO", precio: 110.00 },
  { codigo: "421", nombre: "ECOGRAFÍA RENO-VISECAL", unidad: "", refMin: "", refMax: "", referencia: "INFORME ECOGRÁFICO", precio: 100.00 },
  { codigo: "422", nombre: "EDN FECAL (NEUROTOXINA DERIVADA DE EOSINOFILOS)", unidad: "ng/mL", refMin: 0, refMax: 360, referencia: "< 360 ng/mL", precio: 1039.00 },
  { codigo: "423", nombre: "ELASTASA PANCREATICA FECAL (ESPECIAL)", unidad: "µg/g", refMin: 200, refMax: 500, referencia: "> 200 µg/g Heces", precio: 223.00 },
  { codigo: "424", nombre: "ELECTROFORESIS DE HEMOGLOBINA", unidad: "%", refMin: 95, refMax: 98, referencia: "HbA: 95-98%, HbA2: 1.5-3.5%, HbF: < 2%", precio: 149.00 },
  { codigo: "425", nombre: "ELECTROLITOS (NA,K,CL)", unidad: "mmol/L", refMin: 3.5, refMax: 145, referencia: "Na: 135-145, K: 3.5-5.0, Cl: 96-109", precio: 90.00 },
  { codigo: "426", nombre: "ELECTROLITOS (ORINA 24 HORAS)", unidad: "mmol/24h", refMin: 25, refMax: 220, referencia: "Na: 40-220, K: 25-125, Cl: 110-250", precio: 35.00 },
  { codigo: "427", nombre: "ELECTROLITOS ORINA SIMPLE", unidad: "mmol/L", refMin: 10, refMax: 100, referencia: "Depende del estado de hidratación", precio: 40.00 },
  { codigo: "428", nombre: "ENA - PERFIL AUTOINMUNE (IM)", unidad: "", refMin: "", refMax: "", referencia: "PANEL NEGATIVO", precio: 325.00 },
  { codigo: "429", nombre: "ENDOMISIO, AUTOANTIC. (EMA) AC TOTALES", unidad: "", refMin: "", refMax: "", referencia: "NEGATIVO (< 1:10)", precio: 343.00 },
  { codigo: "430", nombre: "EOSINOFILOS EN SECRECION (OTROS)", unidad: "%", refMin: 0, refMax: 5, referencia: "0 - 5 %", precio: 59.00 },
  { codigo: "431", nombre: "EOSINOFILOS EN SECRECION NASAL", unidad: "%", refMin: 0, refMax: 1, referencia: "< 1 %", precio: 30.00 },
  { codigo: "432", nombre: "EPSTEIN BAR VIRUS EBNA IGG (IM)", unidad: "U/mL", refMin: 0, refMax: 5, referencia: "Negativo: < 5 U/mL", precio: 75.00 },
  { codigo: "433", nombre: "EPSTEIN BAR VIRUS EBNA IGM", unidad: "U/mL", refMin: 0, refMax: 5, referencia: "Negativo: < 5 U/mL", precio: 75.00 },
  { codigo: "434", nombre: "EPSTEIN BAR VIRUS VCA IGG (IM)", unidad: "U/mL", refMin: 0, refMax: 20, referencia: "Negativo: < 20 U/mL", precio: 70.00 },
  { codigo: "435", nombre: "EPSTEIN BAR VIRUS VCA IGM (IM)", unidad: "U/mL", refMin: 0, refMax: 20, referencia: "Negativo: < 20 U/mL", precio: 60.00 },
  { codigo: "436", nombre: "EPSTEIN BARR (EBNA) IGG", unidad: "U/mL", refMin: 0, refMax: 5, referencia: "Negativo: < 5 U/mL", precio: 80.00 },
  { codigo: "437", nombre: "EPSTEIN BARR (EBNA) IGG - IGM", unidad: "U/mL", refMin: 0, refMax: 20, referencia: "Negativo: < 20 U/mL", precio: 150.00 },
  { codigo: "438", nombre: "EPSTEIN BARR (EBNA) IGM", unidad: "U/mL", refMin: 0, refMax: 5, referencia: "Negativo: < 5 U/mL", precio: 90.00 },
  { codigo: "439", nombre: "EPSTEIN BARR VIRUS, CARGA VIRAL", unidad: "copias/mL", refMin: 0, refMax: 200, referencia: "< 200 copias/mL", precio: 1242.00 },
  { codigo: "440", nombre: "EPSTEIN BARR VIRUS, EARLY ANTIGEN (EA) (IM)", unidad: "U/mL", refMin: 0, refMax: 10, referencia: "Negativo: < 10 U/mL", precio: 256.00 },
  { codigo: "441", nombre: "ERITROPOYETINA", unidad: "mU/mL", refMin: 4.3, refMax: 29.0, referencia: "4.3 - 29.0 mU/mL", precio: 110.00 },
  { codigo: "442", nombre: "ERITROPOYETINA SERICA", unidad: "mU/mL", refMin: 4.3, refMax: 29.0, referencia: "4.3 - 29.0 mU/mL", precio: 124.00 },
  { codigo: "443", nombre: "ESPECIALES", unidad: "", refMin: "", refMax: "", referencia: "SEGÚN PRUEBA SOLICITADA", precio: 100.00 },
  { codigo: "444", nombre: "ESPERMATOGRAMA", unidad: "mill/mL", refMin: 15, refMax: 200, referencia: "Volumen ≥ 1.5 mL, Conc ≥ 15 mill/mL, Movilidad Progresiva ≥ 32%", precio: 100.00 },
  { codigo: "446", nombre: "ESPERMATOZOIDES , AC (SEMEN)", unidad: "%", refMin: 0, refMax: 20, referencia: "< 20 %", precio: 174.00 },
  { codigo: "447", nombre: "ESPERMATOZOIDES , AC. SUERO", unidad: "U/mL", refMin: 0, refMax: 60, referencia: "Negativo: < 60 U/mL", precio: 131.00 },
  { codigo: "448", nombre: "ESTEATOCRITO (ACIDO)", unidad: "%", refMin: 0, refMax: 2, referencia: "< 2 %", precio: 128.00 },
  { codigo: "449", nombre: "ESTRADIOL", unidad: "pg/mL", refMin: 15, refMax: 350, referencia: "Según fase menstrual / Varones: 10-50 pg/mL", precio: 55.00 },
  { codigo: "451", nombre: "ESTRADIOL LIBRE", unidad: "pg/mL", refMin: 0.2, refMax: 5.0, referencia: "Según fase ciclo menstrual", precio: 70.00 },
  { codigo: "1162", nombre: "ESTRADIOL LIBRE (L2)", unidad: "pg/mL", refMin: 0.2, refMax: 5.0, referencia: "Según fase ciclo menstrual", precio: 225.00 },
  { codigo: "453", nombre: "ESTREPTOCOCO ß-HEMOLITICO GRUPO A (PYOGENES)", unidad: "", refMin: "", refMax: "", referencia: "NO DETECTADO / NEGATIVO", precio: 128.00 },
  { codigo: "454", nombre: "ESTRIOL LIBRE", unidad: "ng/mL", refMin: 0.2, refMax: 30, referencia: "Según semanas de gestación", precio: 85.00 },
  { codigo: "455", nombre: "ESTRIOL TOTAL", unidad: "ng/mL", refMin: 0.2, refMax: 30, referencia: "Según semanas de gestación", precio: 88.00 },
  { codigo: "456", nombre: "ESTRONA SULFATO", unidad: "ng/dL", refMin: 15, refMax: 350, referencia: "Según edad y estado gonadal", precio: 450.00 },
  { codigo: "457", nombre: "ESTUDIO DE COCCIDIOS (HECES)", unidad: "", refMin: "", refMax: "", referencia: "NO SE OBSERVAN OOCISTES", precio: 158.00 },
  { codigo: "458", nombre: "ESTUDIO MOLECULAR HLA-DRB1 (BAJA RESOLUCION)", unidad: "", refMin: "", refMax: "", referencia: "INFORME GENOTÍPICO", precio: 2290.00 },
  { codigo: "459", nombre: "EXAMEN COMPLETO DE ORINA", unidad: "", refMin: "", refMax: "", referencia: "Densidad 1.005-1.030, pH 5.0-8.0, Leucocitos 0-5/campo, Hematíes 0-2/campo", precio: 15.00 },
  { codigo: "460", nombre: "EXAMEN DE ORINA COMPLETO", unidad: "", refMin: "", refMax: "", referencia: "Densidad 1.005-1.030, pH 5.0-8.0, Leucocitos 0-5/campo, Hematíes 0-2/campo", precio: 15.00 },
  { codigo: "461", nombre: "EXAMEN DIRECTO (HONGO KOH)", unidad: "", refMin: "", refMax: "", referencia: "NO SE OBSERVAN ELEMENTOS MICÓTICOS", precio: 30.00 },
  { codigo: "463", nombre: "EXAMEN DIRECTO DE SECRECION VAGINAL (TRICHOMONA)", unidad: "", refMin: "", refMax: "", referencia: "NO SE OBSERVAN TRICHOMONAS NI LEVADURAS", precio: 16.00 },
  { codigo: "464", nombre: "EXTASIS CUALITATIVO (ORINA SIMPLE)", unidad: "", refMin: "", refMax: "", referencia: "NEGATIVO", precio: 75.00 },
  { codigo: "466", nombre: "F-ACTINA, AUTOANTICUERPOS IGG", unidad: "Units", refMin: 0, refMax: 20, referencia: "Negativo: < 20 Units", precio: 666.00 },
  { codigo: "467", nombre: "FACTOR INTRINSECO , ANTICUERPOS", unidad: "AU/mL", refMin: 0, refMax: 1.2, referencia: "Negativo: < 1.2 AU/mL", precio: 149.00 },
  { codigo: "468", nombre: "FACTOR IX", unidad: "%", refMin: 60, refMax: 140, referencia: "60 - 140 %", precio: 276.00 },
  { codigo: "469", nombre: "FACTOR REMATOIDEO ( LATEX )", unidad: "IU/mL", refMin: 0, refMax: 20, referencia: "Negativo: < 20 IU/mL", precio: 25.00 },
  { codigo: "471", nombre: "FACTOR REUMATOIDEO CUALITATIVO (LATEX)", unidad: "", refMin: "", refMax: "", referencia: "NO REACTIVO", precio: 25.00 },
  { codigo: "472", nombre: "FACTOR REUMATOIDEO CUANTITATIVO", unidad: "IU/mL", refMin: 0, refMax: 20, referencia: "Negativo: < 20 IU/mL", precio: 25.00 },
  { codigo: "473", nombre: "FACTOR V", unidad: "%", refMin: 70, refMax: 120, referencia: "70 - 120 %", precio: 219.00 },
  { codigo: "474", nombre: "FACTOR V DE LEIDEN, MUTACION X PCR EN", unidad: "", refMin: "", refMax: "", referencia: "GENOTIPO NORMAL (SIN MUTACIÓN G1691A)", precio: 693.00 },
  { codigo: "475", nombre: "FACTOR VII", unidad: "%", refMin: 60, refMax: 140, referencia: "60 - 140 %", precio: 228.00 },
  { codigo: "476", nombre: "FACTOR VIII", unidad: "%", refMin: 50, refMax: 150, referencia: "50 - 150 %", precio: 216.00 },
  { codigo: "477", nombre: "FACTOR VIII INHIBIDORES CIRCULANTES", unidad: "UB", refMin: 0, refMax: 0.6, referencia: "Negativo: < 0.6 Unidades Bethesda", precio: 354.00 },
  { codigo: "478", nombre: "FACTOR XII", unidad: "%", refMin: 60, refMax: 140, referencia: "60 - 140 %", precio: 262.00 },
  { codigo: "479", nombre: "FASCIOLA HEPATICA, ANTICUERPOS", unidad: "", refMin: "", refMax: "", referencia: "NO REACTIVO", precio: 263.00 },
  { codigo: "480", nombre: "FENCICLIDINA (PCP) (ORINA)", unidad: "ng/mL", refMin: 0, refMax: 25, referencia: "Negativo: < 25 ng/mL", precio: 107.00 },
  { codigo: "481", nombre: "FENILALANINA SERICA", unidad: "mg/dL", refMin: 0.8, refMax: 2.0, referencia: "0.8 - 2.0 mg/dL", precio: 371.00 },
  { codigo: "482", nombre: "FENILCETONURIA PKU (CLORURO FERRICO)", unidad: "", refMin: "", refMax: "", referencia: "NEGATIVO", precio: 217.00 },
  { codigo: "483", nombre: "FENITOINA", unidad: "µg/mL", refMin: 10.0, refMax: 20.0, referencia: "10 - 20 µg/mL", precio: 80.00 },
  { codigo: "484", nombre: "FENITOINA (DIFENILHIDANTOINA DPH)", unidad: "µg/mL", refMin: 10.0, refMax: 20.0, referencia: "10 - 20 µg/mL", precio: 90.00 },
  { codigo: "485", nombre: "FENOBARBITAL", unidad: "µg/mL", refMin: 15.0, refMax: 40.0, referencia: "15 - 40 µg/mL", precio: 80.00 },
  { codigo: "487", nombre: "FENOL ORINA", unidad: "mg/L", refMin: 0, refMax: 20, referencia: "< 20 mg/L", precio: 231.00 },
  { codigo: "488", nombre: "FENOMENO LE", unidad: "", refMin: "", refMax: "", referencia: "NO SE OBSERVAN CÉLULAS L.E.", precio: 40.00 },
  { codigo: "490", nombre: "FERRITINA SERICA", unidad: "ng/mL", refMin: 10, refMax: 375, referencia: "40 - 375 ng/mL (Hombre), 10 - 280 ng/mL (Mujer)", precio: 45.00 },
  { codigo: "491", nombre: "FIBRINOGENO", unidad: "mg/dL", refMin: 150, refMax: 350, referencia: "150 - 350 mg/dL", precio: 30.00 },
  { codigo: "493", nombre: "FIBROMAX", unidad: "", refMin: "", refMax: "", referencia: "INFORME EVALUACIÓN DE FIBROSIS Y ESTEATOSIS", precio: 3018.00 },
  { codigo: "494", nombre: "FILARIA IGM & IGG", unidad: "", refMin: "", refMax: "", referencia: "NEGATIVO", precio: 1041.00 },
  { codigo: "495", nombre: "FOSFATASA ACIDA PROSTATICA (HN)", unidad: "U/L", refMin: 0, refMax: 3.5, referencia: "< 3.5 U/L", precio: 35.00 },
  { codigo: "496", nombre: "FOSFATASA ACIDA TOTAL (HN)", unidad: "U/L", refMin: 0, refMax: 6.5, referencia: "< 6.5 U/L", precio: 30.00 },
  { codigo: "497", nombre: "FOSFATASA ALCALINA", unidad: "U/L", refMin: 45, refMax: 115, referencia: "45 - 115 U/L", precio: 20.00 },
  { codigo: "499", nombre: "FOSFATASA ALCALINA (ISOENZIMAS)", unidad: "%", refMin: 20, refMax: 85, referencia: "Fracción Hepática 20-70%, Ósea 25-85%", precio: 297.00 },
  { codigo: "500", nombre: "FOSFATASA ALCALINA LEUCOCITARIA", unidad: "Puntos", refMin: 20, refMax: 100, referencia: "20 - 100 Puntos FAL", precio: 197.00 },
  { codigo: "501", nombre: "FOSFATIDILSERINA ANTIC. IGG", unidad: "U/mL", refMin: 0, refMax: 10, referencia: "Negativo: < 10 U/mL", precio: 184.00 },
  { codigo: "502", nombre: "FOSFATIDILSERINA ANTIC. IGM", unidad: "U/mL", refMin: 0, refMax: 10, referencia: "Negativo: < 10 U/mL", precio: 184.00 },
  { codigo: "503", nombre: "FOSFATOS ORINA 24 HORAS", unidad: "g/24h", refMin: 0.4, refMax: 1.3, referencia: "0.4 - 1.3 g/24h", precio: 78.00 },
  { codigo: "504", nombre: "FOSFORO (ORINA 24HRS) (HN)", unidad: "g/24h", refMin: 0.4, refMax: 1.3, referencia: "0.4 - 1.3 g/24h", precio: 15.00 },
  { codigo: "505", nombre: "FOSFORO ORINA SIMPLE (HN)", unidad: "mg/dL", refMin: 30, refMax: 100, referencia: "30 - 100 mg/dL", precio: 17.00 },
  { codigo: "506", nombre: "FOSFORO SERICO", unidad: "mg/dL", refMin: 2.5, refMax: 4.5, referencia: "2.5 - 4.5 mg/dL", precio: 20.00 },
  { codigo: "508", nombre: "FRACCION EXC. SODIO FILTRADO (FENA)", unidad: "%", refMin: 1.0, refMax: 2.0, referencia: "< 1% (Prerrenal), > 2% (Parenquimatoso/NTA)", precio: 154.00 },
  { codigo: "509", nombre: "FRAGILIDAD CAPILAR", unidad: "Petequias", refMin: 0, refMax: 10, referencia: "< 10 petequias (Prueba de Rumpel-Leede)", precio: 20.00 },
  { codigo: "510", nombre: "FRAGILIDAD GLOBULAR", unidad: "% NaCl", refMin: 0.35, refMax: 0.50, referencia: "Inicio hemólisis: 0.45-0.50%, Total: 0.30-0.35%", precio: 50.00 },
  { codigo: "511", nombre: "FRAGILIDAD ERITROCITARIA", unidad: "% NaCl", refMin: 0.35, refMax: 0.50, referencia: "Inicio hemólisis: 0.45-0.50%, Total: 0.30-0.35%", precio: 295.00 },
  { codigo: "512", nombre: "FRAGMENTACIÓN DE ADN ESPERMÁTICO", unidad: "% DFI", refMin: 0, refMax: 15, referencia: "Normal: < 15% DFI", precio: 533.00 },
  { codigo: "513", nombre: "FROTIS DIRECTO (GERMENES)", unidad: "", refMin: "", refMax: "", referencia: "NO SE OBSERVAN BACTERIAS", precio: 30.00 },
  { codigo: "515", nombre: "FRUCTOSAMINA", unidad: "µmol/L", refMin: 200, refMax: 285, referencia: "< 285 µmol/L", precio: 65.00 },
  { codigo: "516", nombre: "FSH HORMONA FOLICULOESTIMULANTE", unidad: "mIU/mL", refMin: 1.5, refMax: 12.4, referencia: "Según fase menstrual / Varones: 1.5-12.4 mIU/mL", precio: 60.00 },
  { codigo: "517", nombre: "FTA ABS", unidad: "", refMin: "", refMax: "", referencia: "NO REACTIVO", precio: 80.00 },
  { codigo: "518", nombre: "FTA ABS (IM)", unidad: "", refMin: "", refMax: "", referencia: "NO REACTIVO", precio: 55.00 },
  { codigo: "519", nombre: "FTA ABS IGM", unidad: "", refMin: "", refMax: "", referencia: "NO REACTIVO", precio: 130.00 },
  { codigo: "520", nombre: "GABAPENTIN (NEURONTIN), DOSAJE", unidad: "µg/mL", refMin: 2.0, refMax: 20.0, referencia: "2 - 20 µg/mL", precio: 992.00 },
  { codigo: "521", nombre: "GAD, AUTOANTIC (GLUTAMIC ACID DESCARBOXILASE)", unidad: "IU/mL", refMin: 0, refMax: 5.0, referencia: "Negativo: < 5.0 IU/mL", precio: 465.00 },
  { codigo: "522", nombre: "GAG EN ORINA", unidad: "mg/mmol Creat", refMin: 0, refMax: 12, referencia: "Mucopolisacáridos según edad", precio: 2301.00 },
  { codigo: "523", nombre: "GALACTOMANANO (IM)", unidad: "Index", refMin: 0, refMax: 0.5, referencia: "Negativo: < 0.5 Index", precio: 603.00 },
  { codigo: "524", nombre: "GALACTOSA 1 FOSFATO URIDILTRANSFERASA (GALT)", unidad: "U/g Hb", refMin: 18.5, refMax: 28.5, referencia: "18.5 - 28.5 U/g Hb", precio: 2268.00 },
  { codigo: "525", nombre: "GAMMA GLOBULINA, DOSAJE", unidad: "g/dL", refMin: 0.7, refMax: 1.4, referencia: "0.7 - 1.4 g/dL", precio: 57.00 },
  { codigo: "526", nombre: "GAMMA GLUTAMIL TRANSPEPTIDASA", unidad: "U/L", refMin: 0, refMax: 40, referencia: "≤ 40 U/L (Hombre), ≤ 28 U/L (Mujer)", precio: 45.00 },
  { codigo: "530", nombre: "GASES ARTERIALES", unidad: "", refMin: "", refMax: "", referencia: "pH: 7.35-7.45, pCO2: 35-45, pO2: 80-100", precio: 190.00 },
  { codigo: "529", nombre: "GASES ARTERIALES (AGA) Y ELECTROLITOS", unidad: "", refMin: "", refMax: "", referencia: "pH: 7.35-7.45, Na: 135-145, K: 3.5-5.0", precio: 190.00 },
  { codigo: "531", nombre: "GASTRINA", unidad: "pg/mL", refMin: 13, refMax: 115, referencia: "< 115 pg/mL", precio: 144.00 },
  { codigo: "532", nombre: "GeneXpert", unidad: "", refMin: "", refMax: "", referencia: "M. TUBERCULOSIS NO DETECTADO", precio: 750.00 },
  { codigo: "533", nombre: "GERMENES COMUNES (OTROS)", unidad: "", refMin: "", refMax: "", referencia: "SIN DESARROLLO BACTERIANO", precio: 70.00 },
  { codigo: "534", nombre: "GIARDIA LAMBLIA ANTICUERPOS IGG", unidad: "U/mL", refMin: 0, refMax: 10, referencia: "Negativo: < 10 U/mL", precio: 243.00 },
  { codigo: "535", nombre: "GIARDIA LAMBLIA ANTICUERPOS IGM", unidad: "U/mL", refMin: 0, refMax: 10, referencia: "Negativo: < 10 U/mL", precio: 288.00 },
  { codigo: "536", nombre: "GIARDIA LAMBLIA ANTIGENO FECALES", unidad: "", refMin: "", refMax: "", referencia: "NEGATIVO", precio: 236.00 },
  { codigo: "537", nombre: "GIARDIA LAMBLIA, ANTICUERPOS IGG & IGM", unidad: "U/mL", refMin: 0, refMax: 10, referencia: "Negativo: < 10 U/mL", precio: 511.00 },
  { codigo: "538", nombre: "GLIADINA ANTICUERPOS IGA (IM)", unidad: "U/mL", refMin: 0, refMax: 12, referencia: "Negativo: < 12 U/mL", precio: 162.00 },
  { codigo: "539", nombre: "GLOBULINAS", unidad: "g/dL", refMin: 1.9, refMax: 2.7, referencia: "1.9 - 2.7 g/dL", precio: 0.00 },
  { codigo: "540", nombre: "GLUCAGON", unidad: "pg/mL", refMin: 50, refMax: 150, referencia: "50 - 150 pg/mL", precio: 194.00 },
  { codigo: "541", nombre: "GLUCAGON 30 MINUTOS", unidad: "pg/mL", refMin: 50, refMax: 150, referencia: "Según curva metabólica", precio: 196.00 },
  { codigo: "542", nombre: "GLUCAGON 60 MINUTOS", unidad: "pg/mL", refMin: 50, refMax: 150, referencia: "Según curva metabólica", precio: 255.00 },
  { codigo: "544", nombre: "GLUCOSA 120´ POST-PRANDIAL (GLUCOSA ANHIDRA)", unidad: "mg/dL", refMin: 70, refMax: 140, referencia: "< 140 mg/dL", precio: 18.00 },
  { codigo: "543", nombre: "GLUCOSA 120' POST-PRANDIAL (C / DESAYUNO)", unidad: "mg/dL", refMin: 70, refMax: 140, referencia: "< 140 mg/dL", precio: 16.00 },
  { codigo: "547", nombre: "GLUCOSA 6-FOSFATO DEHIDROGENASA", unidad: "U/g Hb", refMin: 7.0, refMax: 20.5, referencia: "7.0 - 20.5 U/g Hb", precio: 144.00 },
  { codigo: "546", nombre: "GLUCOSA 60’ (GLUCOSA ANHIDRA)", unidad: "mg/dL", refMin: 70, refMax: 180, referencia: "< 180 mg/dL", precio: 18.00 },
  { codigo: "545", nombre: "GLUCOSA 60' POST-PRANDIAL(C/DESAYUNO)", unidad: "mg/dL", refMin: 70, refMax: 180, referencia: "< 180 mg/dL", precio: 16.00 },
  { codigo: "548", nombre: "GLUCOSA BASAL", unidad: "mg/dL", refMin: 80, refMax: 110, referencia: "80 - 110 mg/dL", precio: 15.00 },
  { codigo: "550", nombre: "GLUCOSA EN LIQUIDO", unidad: "mg/dL", refMin: 50, refMax: 80, referencia: "60-80% de la glucemia plasmática", precio: 13.00 },
  { codigo: "551", nombre: "GLUCOSA EN ORINA DE 24 HORAS", unidad: "g/24h", refMin: 0, refMax: 0.5, referencia: "< 0.5 g/24h", precio: 13.00 },
  { codigo: "552", nombre: "GLUCOSA EN ORINA SIMPLE", unidad: "", refMin: "", refMax: "", referencia: "NEGATIVO", precio: 13.00 },
  { codigo: "553", nombre: "GLUCOSA POST PRANDIAL", unidad: "mg/dL", refMin: 70, refMax: 140, referencia: "< 140 mg/dL", precio: 15.00 },
  { codigo: "1165", nombre: "GLUCOSA+EXAMEN DE ORINA", unidad: "", refMin: "", refMax: "", referencia: "Glucosa: 80-110 mg/dL, Orina: Negativo a elementos patológicos", precio: 10.00 },
  { codigo: "554", nombre: "GOTA GRUESA (PALUDISMO)", unidad: "", refMin: "", refMax: "", referencia: "NO SE OBSERVAN PARÁSITOS (PLASMODIUM SPP)", precio: 25.00 },
  { codigo: "555", nombre: "GRAM EN ORINA SIN CENTRIFUGAR", unidad: "", refMin: "", refMax: "", referencia: "NO SE OBSERVAN GERMENES", precio: 20.00 },
  { codigo: "557", nombre: "GRUPO Y FACTOR", unidad: "", refMin: "", refMax: "", referencia: "A / B / AB / O ; Rh Positivo / Negativo", precio: 15.00 },
  { codigo: "558", nombre: "HAM TEST", unidad: "", refMin: "", refMax: "", referencia: "NEGATIVO (Sin hemólisis)", precio: 20.00 },
  { codigo: "559", nombre: "HAPTOGLOBINA", unidad: "mg/dL", refMin: 40, refMax: 270, referencia: "40 - 270 mg/dL", precio: 81.00 },
  { codigo: "560", nombre: "HCG CADENAS LIBRES", unidad: "mIU/mL", refMin: 0, refMax: 2, referencia: "< 2 mIU/mL (no gestante)", precio: 292.00 },
  { codigo: "564", nombre: "HE4 / WFDC2 / PROTEINA EPIDIDIMAL HUMANA", unidad: "pmol/L", refMin: 0, refMax: 140, referencia: "Premenopáusicas < 70, Posmenopáusicas < 140", precio: 0.00 },
  { codigo: "565", nombre: "HECES SIMPLE", unidad: "", refMin: "", refMax: "", referencia: "No se observan parásitos", precio: 10.00 },
  { codigo: "566", nombre: "HELICOBACTER PILORI IGG (IM)", unidad: "U/mL", refMin: 0, refMax: 0.9, referencia: "Negativo: < 0.9 Index", precio: 45.00 },
  { codigo: "567", nombre: "HELICOBACTER PILORI IGM (IM)", unidad: "U/mL", refMin: 0, refMax: 0.9, referencia: "Negativo: < 0.9 Index", precio: 45.00 },
  { codigo: "568", nombre: "HELICOBACTER PYLORI", unidad: "", refMin: "", refMax: "", referencia: "NEGATIVO", precio: 70.00 },
  { codigo: "569", nombre: "HELICOBACTER PYLORI IGA (IM)", unidad: "U/mL", refMin: 0, refMax: 0.9, referencia: "Negativo: < 0.9 Index", precio: 162.00 },
  { codigo: "570", nombre: "HELICOBACTER PYLORI, TEST DE ALIENTO - CARBONO 13 \"TEST UREASA\"", unidad: "DOB", refMin: 0, refMax: 4.0, referencia: "Negativo: < 4.0 DOB", precio: 230.00 },
  { codigo: "571", nombre: "HEMATIES, PIRUVATO-KINASA", unidad: "U/g Hb", refMin: 11.0, refMax: 17.0, referencia: "11.0 - 17.0 U/g Hb", precio: 475.00 },
  { codigo: "572", nombre: "HEMATOCRITO", unidad: "%", refMin: 37, refMax: 52, referencia: "47 ± 5% (Varón), 42 ± 5% (Mujer)", precio: 10.00 },
  { codigo: "573", nombre: "HEMATOLOGIA", unidad: "", refMin: "", refMax: "", referencia: "Dentro de límites normales", precio: 25.00 },
  { codigo: "574", nombre: "HEMATOLOGY", unidad: "", refMin: "", refMax: "", referencia: "Within normal limits", precio: 50.00 },
  { codigo: "575", nombre: "HEMOAGLUTINACION ANTICUERPOS ANTITREPONEMA PALLIDUM (MHATP )", unidad: "", refMin: "", refMax: "", referencia: "NO REACTIVO", precio: 124.00 },
  { codigo: "576", nombre: "HEMOCROMATOSIS, MUTACIONES (ADN)", unidad: "", refMin: "", refMax: "", referencia: "SIN MUTACIÓN C282Y / H63D", precio: 2490.00 },
  { codigo: "577", nombre: "HEMOCULTIVO", unidad: "", refMin: "", refMax: "", referencia: "ESTÉRIL A LOS 7 DÍAS", precio: 150.00 },
  { codigo: "581", nombre: "HEMOCULTIVO AUTOMATIZADO CON MIC (HN)", unidad: "", refMin: "", refMax: "", referencia: "ESTÉRIL", precio: 150.00 },
  { codigo: "582", nombre: "HEMOGLOBINA", unidad: "g/dL", refMin: 12.0, refMax: 18.0, referencia: "16 ± 2 g/dL (Varón), 14 ± 2 g/dL (Mujer)", precio: 15.00 },
  { codigo: "584", nombre: "HEMOGLOBINA + HEMATOCRITO", unidad: "", refMin: "", refMax: "", referencia: "Hb: 12-18 g/dL, Hcto: 37-52%", precio: 20.00 },
  { codigo: "583", nombre: "HEMOGLOBINA - HEMATOCRITO (POCT CAPILAR)", unidad: "", refMin: "", refMax: "", referencia: "Hb: 12-18 g/dL, Hcto: 37-52%", precio: 41.00 },
  { codigo: "585", nombre: "HEMOGLOBINA A2 - CUANTITATIVA", unidad: "%", refMin: 1.5, refMax: 3.5, referencia: "1.5 - 3.5 %", precio: 298.00 },
  { codigo: "586", nombre: "HEMOGLOBINA FETAL CUANTITATIVA", unidad: "%", refMin: 0, refMax: 2.0, referencia: "< 2.0 %", precio: 391.00 },
  { codigo: "587", nombre: "HEMOGLOBINA GLICOSILADA", unidad: "%", refMin: 4.0, refMax: 5.7, referencia: "Normal: 4.0 - 5.7 %, Diabetes: ≥ 6.5 %", precio: 50.00 },
  { codigo: "588", nombre: "HEMOGLOBINA GLICOSILADA HbA1c", unidad: "%", refMin: 4.0, refMax: 5.7, referencia: "Normal: 4.0 - 5.7 %, Diabetes: ≥ 6.5 %", precio: 60.00 },
  { codigo: "589", nombre: "HEMOGLOBINA S DOSAJE", unidad: "%", refMin: 0, refMax: 0, referencia: "0 % (AUSENCIA DE HbS)", precio: 731.00 },
  { codigo: "590", nombre: "HEMOGLOBINA-HEMATOCRITO", unidad: "", refMin: "", refMax: "", referencia: "Hb: 12-18 g/dL, Hcto: 37-52%", precio: 15.00 },
  { codigo: "591", nombre: "HEMOGLOBINOPATIAS ESTUDIO COMPLETO", unidad: "", refMin: "", refMax: "", referencia: "PATRÓN ELECTROFORÉTICO NORMAL (HbA1 > 95%)", precio: 680.00 },
  { codigo: "592", nombre: "HEMOGLOBINURIA PAROXISTICA NOCTURNA (HPN)", unidad: "", refMin: "", refMax: "", referencia: "EXPRESIÓN NORMAL DE CD55 Y CD59", precio: 1044.00 },
  { codigo: "593", nombre: "HEMOGRAMA", unidad: "", refMin: "", refMax: "", referencia: "Leucocitos: 6000-10000/µL, Hematíes: 4.8-5.5x10¹²/L, Plaquetas: 150-350k/µL", precio: 25.00 },
  { codigo: "1164", nombre: "HEMOGRAMA COMPLETO AUTOMATIZADO", unidad: "", refMin: "", refMax: "", referencia: "Leucocitos: 6000-10000/µL, Hematíes: 4.8-5.5x10¹²/L, Plaquetas: 150-350k/µL", precio: 25.00 },
  { codigo: "595", nombre: "HEMOSIDERINA EN ORINA SIMPLE", unidad: "", refMin: "", refMax: "", referencia: "NEGATIVO", precio: 76.00 },
  { codigo: "596", nombre: "HEPATITIS A ANTICUERPOS IGM", unidad: "", refMin: "", refMax: "", referencia: "NO REACTIVO", precio: 50.00 },
  { codigo: "597", nombre: "HEPATITIS A ANTICUERPOS TOTALES", unidad: "", refMin: "", refMax: "", referencia: "NO REACTIVO", precio: 70.00 },
  { codigo: "598", nombre: "HEPATITIS A, AC. TOTALES", unidad: "", refMin: "", refMax: "", referencia: "NO REACTIVO", precio: 84.00 },
  { codigo: "599", nombre: "HEPATITIS A, ANTICUERPO IGG", unidad: "", refMin: "", refMax: "", referencia: "NO REACTIVO", precio: 70.00 },
  { codigo: "600", nombre: "HEPATITIS A, ANTICUERPO IGM", unidad: "", refMin: "", refMax: "", referencia: "NO REACTIVO", precio: 70.00 },
  { codigo: "601", nombre: "HEPATITIS B CORE ANTICUERPOS IGM", unidad: "", refMin: "", refMax: "", referencia: "NO REACTIVO", precio: 40.00 },
  { codigo: "602", nombre: "HEPATITIS B CORE ANTICUERPOS TOTALES", unidad: "", refMin: "", refMax: "", referencia: "NO REACTIVO", precio: 60.00 },
  { codigo: "603", nombre: "HEPATITIS B DNA (CARGA VIRAL)", unidad: "IU/mL", refMin: 0, refMax: 20, referencia: "< 20 IU/mL (Incalculable / No detectado)", precio: 950.00 },
  { codigo: "604", nombre: "HEPATITIS B VIRUS X PCR (CUALITATIVO)", unidad: "", refMin: "", refMax: "", referencia: "NO DETECTADO", precio: 1145.00 },
  { codigo: "605", nombre: "HEPATITIS B, ANTI HBEAG ANTICUERPO E", unidad: "", refMin: "", refMax: "", referencia: "NO REACTIVO", precio: 80.00 },
  { codigo: "606", nombre: "HEPATITIS B, ANTI-HBCAG CORE TOTAL", unidad: "", refMin: "", refMax: "", referencia: "NO REACTIVO", precio: 60.00 },
  { codigo: "607", nombre: "HEPATITIS B, ANTI-HBCAG IGM (CORE IGM)", unidad: "", refMin: "", refMax: "", referencia: "NO REACTIVO", precio: 60.00 },
  { codigo: "608", nombre: "HEPATITIS B, ANTI-HBSAG ANTICUERPO HBS (POST- VACUNA)", unidad: "mIU/mL", refMin: 10, refMax: 1000, referencia: "Protegido: ≥ 10 mIU/mL", precio: 40.00 },
  { codigo: "609", nombre: "HEPATITIS B, DNA POLIMERASA (CUALITATIVO)", unidad: "", refMin: "", refMax: "", referencia: "NO DETECTADO", precio: 718.00 },
  { codigo: "610", nombre: "HEPATITIS B, GENOTIPO (RESISTENCIA A DROGAS)", unidad: "", refMin: "", refMax: "", referencia: "INFORME DE SECUENCIACIÓN", precio: 2870.00 },
  { codigo: "611", nombre: "HEPATITIS B, HBEAG ANTIGENO E", unidad: "", refMin: "", refMax: "", referencia: "NO REACTIVO", precio: 55.00 },
  { codigo: "612", nombre: "HEPATITIS B, HBSAG (AG AUSTR)", unidad: "", refMin: "", refMax: "", referencia: "NO REACTIVO", precio: 50.00 },
  { codigo: "614", nombre: "HEPATITIS C , (CARGA VIRAL)", unidad: "IU/mL", refMin: 0, refMax: 15, referencia: "< 15 IU/mL (No detectado)", precio: 1050.00 },
  { codigo: "615", nombre: "HEPATITIS C ANTIC. X RIBA 3 (CONFIRMATORIO)", unidad: "", refMin: "", refMax: "", referencia: "NO REACTIVO", precio: 1102.00 },
  { codigo: "616", nombre: "HEPATITIS C GENOTIPIFICACION, ESTUDIO X PCR", unidad: "", refMin: "", refMax: "", referencia: "INFORME DE GENOTIPO (1a, 1b, 2, 3, etc)", precio: 2161.00 },
  { codigo: "617", nombre: "HEPATITIS C X PCR (CUALITATIVO)", unidad: "", refMin: "", refMax: "", referencia: "NO DETECTADO", precio: 1454.00 },
  { codigo: "618", nombre: "HEPATITIS C, ANTI HCV AC TOTALES", unidad: "", refMin: "", refMax: "", referencia: "NO REACTIVO", precio: 80.00 },
  { codigo: "620", nombre: "HEPATITIS D, ANTI HDV ANTICUERPO IGG", unidad: "", refMin: "", refMax: "", referencia: "NO REACTIVO", precio: 578.00 },
  { codigo: "621", nombre: "HEPATITIS D, ANTI HDV ANTICUERPO IGM", unidad: "", refMin: "", refMax: "", referencia: "NO REACTIVO", precio: 578.00 },
  { codigo: "622", nombre: "HEPATITIS DELTA (D) ANTIGENO", unidad: "", refMin: "", refMax: "", referencia: "NO REACTIVO", precio: 438.00 },
  { codigo: "623", nombre: "HEPATITIS E, ANTI HEV ANTICUERPO IGG", unidad: "", refMin: "", refMax: "", referencia: "NO REACTIVO", precio: 224.00 },
  { codigo: "624", nombre: "HEPATITIS E, ANTI HEV ANTICUERPO IGM", unidad: "", refMin: "", refMax: "", referencia: "NO REACTIVO", precio: 248.00 },
  { codigo: "625", nombre: "HEPATITIS G VIRUS ARN X PCR", unidad: "", refMin: "", refMax: "", referencia: "NO DETECTADO", precio: 1943.00 },
  { codigo: "626", nombre: "HERPES I ANTICUERPOS IGG", unidad: "Index", refMin: 0, refMax: 0.9, referencia: "Negativo: < 0.9", precio: 60.00 },
  { codigo: "627", nombre: "HERPES I ANTICUERPOS IGM", unidad: "Index", refMin: 0, refMax: 0.9, referencia: "Negativo: < 0.9", precio: 70.00 },
  { codigo: "630", nombre: "HERPES II ANTICUERPOS IGG", unidad: "Index", refMin: 0, refMax: 0.9, referencia: "Negativo: < 0.9", precio: 60.00 },
  { codigo: "631", nombre: "HERPES II ANTICUERPOS IGM", unidad: "Index", refMin: 0, refMax: 0.9, referencia: "Negativo: < 0.9", precio: 70.00 },
  { codigo: "634", nombre: "HERPES SIMPLE I ANTICUERPOS IgG, LCR", unidad: "", refMin: "", refMax: "", referencia: "NEGATIVO", precio: 120.00 },
  { codigo: "635", nombre: "HERPES SIMPLE I ANTICUERPOS IgM, LCR", unidad: "", refMin: "", refMax: "", referencia: "NEGATIVO", precio: 120.00 },
  { codigo: "636", nombre: "HERPES SIMPLE II ANTICUERPOS IgG, LCR", unidad: "", refMin: "", refMax: "", referencia: "NEGATIVO", precio: 120.00 },
  { codigo: "637", nombre: "HERPES SIMPLE II ANTICUERPOS IgM, LCR", unidad: "", refMin: "", refMax: "", referencia: "NEGATIVO", precio: 120.00 },
  { codigo: "638", nombre: "HERPES SIMPLEX VIRUS I Y II X PCR", unidad: "", refMin: "", refMax: "", referencia: "NO DETECTADO", precio: 876.00 },
  { codigo: "639", nombre: "HERPES SIMPLEX VIRUS I Y II X PCR EN LCR", unidad: "", refMin: "", refMax: "", referencia: "NO DETECTADO", precio: 985.00 },
  { codigo: "640", nombre: "HERPES VIRUS HUMANO 6 (HHV-6) ANTICUERPOS IGG", unidad: "", refMin: "", refMax: "", referencia: "Negativo: < 1:10", precio: 931.00 },
  { codigo: "641", nombre: "HERPES VIRUS HUMANO TIPO 6 (HVH-6) ANTICUERPOS IgG", unidad: "", refMin: "", refMax: "", referencia: "Negativo: < 1:10", precio: 280.00 },
  { codigo: "642", nombre: "HERPES VIRUS HUMANO TIPO 6 (HVH-6) ANTICUERPOS IgG/IgM", unidad: "", refMin: "", refMax: "", referencia: "NEGATIVO", precio: 500.00 },
  { codigo: "643", nombre: "HERPES VIRUS HUMANO TIPO 6 (HVH-6) ANTICUERPOS IgM", unidad: "", refMin: "", refMax: "", referencia: "NEGATIVO", precio: 130.00 },
  { codigo: "645", nombre: "HIDATIDOSIS IGG EQUINOCOSIS - ELISA (IM)", unidad: "U/mL", refMin: 0, refMax: 10, referencia: "Negativo: < 10 U/mL", precio: 70.00 },
  { codigo: "646", nombre: "HIDATIDOSIS WESTERN BLOT", unidad: "", refMin: "", refMax: "", referencia: "NEGATIVO", precio: 240.00 },
  { codigo: "647", nombre: "HIDATIDOSIS, EQUINOCOCOSIS - WESTERN BLOT (IM)", unidad: "", refMin: "", refMax: "", referencia: "NEGATIVO", precio: 190.00 },
  { codigo: "648", nombre: "HIDROXIPROLINA EN PLASMA", unidad: "µg/mL", refMin: 0.8, refMax: 5.0, referencia: "0.8 - 5.0 µg/mL", precio: 330.00 },
  { codigo: "649", nombre: "HIERRO SERICO", unidad: "µg/dL", refMin: 37, refMax: 158, referencia: "59-158 µg/dL (Varón), 37-145 µg/dL (Mujer)", precio: 35.00 },
  { codigo: "651", nombre: "HISTONA AUTOANTICUERPOS", unidad: "U/mL", refMin: 0, refMax: 20, referencia: "Negativo: < 20 U/mL", precio: 162.00 },
  { codigo: "652", nombre: "HISTOPLASMA ANTICUERPOS TOTALES", unidad: "", refMin: "", refMax: "", referencia: "NO REACTIVO", precio: 176.00 },
  { codigo: "653", nombre: "HISTOPLASMA ANTIGENO ORINA", unidad: "ng/mL", refMin: 0, refMax: 0.5, referencia: "Negativo: < 0.5 ng/mL", precio: 792.00 },
  { codigo: "654", nombre: "HIV ( TEST ELISA )", unidad: "", refMin: "", refMax: "", referencia: "NO REACTIVO", precio: 40.00 },
  { codigo: "655", nombre: "HIV 1 Y 2 ANTIC.(WESTERN BLOT) (IM) - VIH", unidad: "", refMin: "", refMax: "", referencia: "NEGATIVO", precio: 320.00 },
  { codigo: "656", nombre: "HIV 1-2 (AC-AG 3°/4° GENERACION) - VIH", unidad: "S/CO", refMin: 0, refMax: 0.9, referencia: "NO REACTIVO (< 0.9 S/CO)", precio: 40.00 },
  { codigo: "657", nombre: "HIV P24 (ANTIGENO) - VIH", unidad: "pg/mL", refMin: 0, refMax: 2.0, referencia: "NO REACTIVO (< 2.0 pg/mL)", precio: 284.00 },
  { codigo: "658", nombre: "HIV-1 CARGA VIRAL ARN X PCR - VIH", unidad: "copias/mL", refMin: 0, refMax: 20, referencia: "< 20 copias/mL (No detectado)", precio: 1025.00 },
  { codigo: "659", nombre: "HLA (ENFERMEDAD CELIACA)", unidad: "", refMin: "", refMax: "", referencia: "DQ2 / DQ8 NEGATIVO", precio: 1885.00 },
  { codigo: "660", nombre: "HLA B-27", unidad: "", refMin: "", refMax: "", referencia: "NEGATIVO", precio: 409.00 },
  { codigo: "661", nombre: "HOMOCISTEINA", unidad: "µmol/L", refMin: 5, refMax: 15, referencia: "< 15 µmol/L", precio: 313.00 },
  { codigo: "662", nombre: "HORMONA ADENOCORTICOTROPA ACTH", unidad: "pg/mL", refMin: 7.2, refMax: 63.3, referencia: "7.2 - 63.3 pg/mL", precio: 75.00 },
  { codigo: "663", nombre: "HORMONA ANTI MULLERIANA (AMH / MIS), SUERO", unidad: "ng/mL", refMin: 1.0, refMax: 4.0, referencia: "1.0 - 4.0 ng/mL (según reserva ovárica)", precio: 250.00 },
  { codigo: "665", nombre: "HORMONA ANTIDIURETICA (ADH-VASOPRESINA)", unidad: "pg/mL", refMin: 1.0, refMax: 5.0, referencia: "1.0 - 5.0 pg/mL", precio: 402.00 },
  { codigo: "666", nombre: "HORMONA DE CREC. TOLERANCIA (B. 60, 120)", unidad: "ng/mL", refMin: 0, refMax: 10, referencia: "Pico de estimulación > 10 ng/mL", precio: 144.00 },
  { codigo: "667", nombre: "HORMONA DE CRECIMIENTO HUMANO BASAL (HGH)", unidad: "ng/mL", refMin: 0.05, refMax: 3.0, referencia: "< 3.0 ng/mL", precio: 50.00 },
  { codigo: "668", nombre: "HORMONA DEL CRECIMIENTO (POST CLONID) 120'", unidad: "ng/mL", refMin: 5, refMax: 20, referencia: "Respuesta normal: > 7-10 ng/mL", precio: 61.00 },
  { codigo: "669", nombre: "HORMONA DEL CRECIMIENTO (POST CLONID) 30'", unidad: "ng/mL", refMin: 5, refMax: 20, referencia: "Respuesta normal: > 7-10 ng/mL", precio: 61.00 },
  { codigo: "70", nombre: "HORMONA DEL CRECIMIENTO (POST CLONID) 60'", unidad: "ng/mL", refMin: 5, refMax: 20, referencia: "Respuesta normal: > 7-10 ng/mL", precio: 174.00 },
  { codigo: "671", nombre: "HORMONA DEL CRECIMIENTO (POST CLONID) 90'", unidad: "ng/mL", refMin: 5, refMax: 20, referencia: "Respuesta normal: > 7-10 ng/mL", precio: 61.00 },
  { codigo: "672", nombre: "HORMONA DEL CRECIMIENTO (POST EJER) 30'", unidad: "ng/mL", refMin: 5, refMax: 20, referencia: "Respuesta normal: > 7-10 ng/mL", precio: 61.00 },
  { codigo: "673", nombre: "HORMONA DEL CRECIMIENTO POST ESTIMULO", unidad: "ng/mL", refMin: 7, refMax: 20, referencia: "Pico > 7 ng/mL", precio: 61.00 },
  { codigo: "674", nombre: "HTLV 1 Y 2 (WESTERN BLOT)", unidad: "", refMin: "", refMax: "", referencia: "NEGATIVO", precio: 470.00 },
  { codigo: "675", nombre: "HTLV I - II ANTICUERPOS", unidad: "", refMin: "", refMax: "", referencia: "NO REACTIVO", precio: 70.00 },
  { codigo: "676", nombre: "IFI VIRAL EN HISOPADO NASAL-FARINGEO", unidad: "", refMin: "", refMax: "", referencia: "NEGATIVO PARA VIRUS RESPIRATORIOS", precio: 530.00 },
  { codigo: "677", nombre: "IGF BP-3 (BINDING PROTEIN)", unidad: "µg/mL", refMin: 2.0, refMax: 6.0, referencia: "Según edad y sexo", precio: 127.00 },
  { codigo: "678", nombre: "INDICE ALBUMINA/CREATININA EN ORINA (IPC)", unidad: "mg/g", refMin: 0, refMax: 30, referencia: "Normal: < 30 mg/g", precio: 50.00 },
  { codigo: "679", nombre: "INDICE DE T4 LIBRE", unidad: "Index", refMin: 1.2, refMax: 4.8, referencia: "1.2 - 4.8", precio: 109.00 },
  { codigo: "680", nombre: "INDICE PROTEINA / CREATININA (IPC) EN ORINA SIMPLE", unidad: "mg/g", refMin: 0, refMax: 200, referencia: "< 200 mg/g Creatinina", precio: 40.00 },
  { codigo: "681", nombre: "INFLUENZA", unidad: "", refMin: "", refMax: "", referencia: "NEGATIVO", precio: 90.00 },
  { codigo: "682", nombre: "INFLUENZA POR PCR EN SECRECION RHINOFARINGEA", unidad: "", refMin: "", refMax: "", referencia: "NO DETECTADO", precio: 830.00 },
  { codigo: "3", nombre: "INFLUENZA TIPO A - CUALITATIVA (PRUEBA RÁPIDA)", unidad: "", refMin: "", refMax: "", referencia: "NEGATIVO", precio: 70.00 },
  { codigo: "683", nombre: "INFLUENZA TIPO A, ANTICUERPOS IGM", unidad: "", refMin: "", refMax: "", referencia: "NEGATIVO", precio: 226.00 },
  { codigo: "4", nombre: "INFLUENZA TIPO B - CUALITATIVA (PRUEBA RÁPIDA)", unidad: "", refMin: "", refMax: "", referencia: "NEGATIVO", precio: 70.00 },
  { codigo: "684", nombre: "INFLUENZA TIPO B, ANTICUERPOS IGM", unidad: "", refMin: "", refMax: "", referencia: "NEGATIVO", precio: 226.00 },
  { codigo: "685", nombre: "INHIBIDOR ACTIVADOR DEL PLASMINOGENO (PAI-1)", unidad: "ng/mL", refMin: 4, refMax: 43, referencia: "4 - 43 ng/mL", precio: 997.00 },
  { codigo: "686", nombre: "INHIBINA A", unidad: "pg/mL", refMin: 0, refMax: 2.0, referencia: "Según estado menstrual/embarazo", precio: 248.00 },
  { codigo: "687", nombre: "INHIBINA B", unidad: "pg/mL", refMin: 25, refMax: 325, referencia: "Según sexo y edad", precio: 549.00 },
  { codigo: "688", nombre: "INMUNOFIJACION \"SUERO\"", unidad: "", refMin: "", refMax: "", referencia: "NO SE OBSERVA BANDA MONOCLONAL", precio: 200.00 },
  { codigo: "689", nombre: "INMUNOFIJACION (ORINA 24 HORAS)", unidad: "", refMin: "", refMax: "", referencia: "NO SE OBSERVA CADENA LIGERA MONOCLONAL", precio: 323.00 },
  { codigo: "690", nombre: "INMUNOFIJACION EN ORINA", unidad: "", refMin: "", refMax: "", referencia: "NO SE OBSERVA BANDA MONOCLONAL", precio: 180.00 },
  { codigo: "691", nombre: "INMUNOFIJACION EN SUERO", unidad: "", refMin: "", refMax: "", referencia: "NO SE OBSERVA BANDA MONOCLONAL", precio: 180.00 },
  { codigo: "693", nombre: "INMUNOGLOBULINA A (LCR)", unidad: "mg/dL", refMin: 0, refMax: 0.6, referencia: "< 0.6 mg/dL", precio: 205.00 },
  { codigo: "692", nombre: "INMUNOGLOBULINA A - IGA", unidad: "mg/dL", refMin: 90, refMax: 400, referencia: "90 - 400 mg/dL", precio: 45.00 },
  { codigo: "694", nombre: "INMUNOGLOBULINA A,G Y M (HN)", unidad: "mg/dL", refMin: 60, refMax: 1800, referencia: "IgA: 90-400, IgG: 800-1800, IgM: 60-250", precio: 140.00 },
  { codigo: "695", nombre: "INMUNOGLOBULINA D, DOSAJE", unidad: "mg/dL", refMin: 0.3, refMax: 4.0, referencia: "0.3 - 4.0 mg/dL", precio: 438.00 },
  { codigo: "696", nombre: "INMUNOGLOBULINA E", unidad: "IU/mL", refMin: 0, refMax: 100, referencia: "< 100 IU/mL", precio: 50.00 },
  { codigo: "699", nombre: "INMUNOGLOBULINA G (LCR)", unidad: "mg/dL", refMin: 0.8, refMax: 4.0, referencia: "0.8 - 4.0 mg/dL", precio: 70.00 },
  { codigo: "698", nombre: "INMUNOGLOBULINA G - IGG", unidad: "mg/dL", refMin: 800, refMax: 1800, referencia: "800 - 1800 mg/dL", precio: 45.00 },
  { codigo: "700", nombre: "INMUNOGLOBULINA G, SUBCLASES IGG1,IGG2, IGG3, IGG4", unidad: "mg/dL", refMin: 382, refMax: 929, referencia: "IgG1: 382-929, IgG2: 241-700, IgG3: 22-178, IgG4: 4-86", precio: 389.00 },
  { codigo: "701", nombre: "INMUNOGLOBULINA IgG", unidad: "mg/dL", refMin: 800, refMax: 1800, referencia: "800 - 1800 mg/dL", precio: 70.00 },
  { codigo: "703", nombre: "INMUNOGLOBULINA M (LCR)", unidad: "mg/dL", refMin: 0, refMax: 0.2, referencia: "< 0.2 mg/dL", precio: 210.00 },
  { codigo: "702", nombre: "INMUNOGLOBULINA M - IGM", unidad: "mg/dL", refMin: 60, refMax: 250, referencia: "60 - 250 mg/dL", precio: 45.00 },
  { codigo: "704", nombre: "INMUNOGLOBULINAS IGG, IGA, IGM (LCR)", unidad: "mg/dL", refMin: 0, refMax: 4.0, referencia: "IgG: 0.8-4.0, IgA: <0.6, IgM: <0.2", precio: 346.00 },
  { codigo: "705", nombre: "INMUNOHISTOQUÍMICA - 4", unidad: "", refMin: "", refMax: "", referencia: "INFORME DE MARCADORES (4 ANTICUERPOS)", precio: 1300.00 },
  { codigo: "706", nombre: "INSULINA 120'", unidad: "µIU/mL", refMin: 15, refMax: 60, referencia: "< 60 µIU/mL", precio: 47.00 },
  { codigo: "707", nombre: "INSULINA 120' (GLUCOSA ANHIDRA)", unidad: "µIU/mL", refMin: 15, refMax: 60, referencia: "< 60 µIU/mL", precio: 57.00 },
  { codigo: "708", nombre: "INSULINA 120' POST PRANDIAL (C/DESAYUNO)", unidad: "µIU/mL", refMin: 15, refMax: 60, referencia: "< 60 µIU/mL", precio: 42.00 },
  { codigo: "709", nombre: "INSULINA 180'", unidad: "µIU/mL", refMin: 2.6, refMax: 24.9, referencia: "Retorno a niveles basales", precio: 47.00 },
  { codigo: "710", nombre: "INSULINA 30'", unidad: "µIU/mL", refMin: 30, refMax: 100, referencia: "Pico postestímulo", precio: 47.00 },
  { codigo: "711", nombre: "INSULINA 60'", unidad: "µIU/mL", refMin: 30, refMax: 90, referencia: "Respuesta postestímulo", precio: 47.00 },
  { codigo: "712", nombre: "INSULINA 90'", unidad: "µIU/mL", refMin: 20, refMax: 70, referencia: "Curva descendente", precio: 47.00 },
  { codigo: "713", nombre: "INSULINA ANTICUERPOS", unidad: "%", refMin: 0, refMax: 8.2, referencia: "< 8.2 %", precio: 323.00 },
  { codigo: "714", nombre: "INSULINA BASAL", unidad: "µIU/mL", refMin: 2.6, refMax: 24.9, referencia: "2.6 - 24.9 µIU/mL", precio: 50.00 },
  { codigo: "716", nombre: "INSULINA POST PRANDIAL ( 120 MINUTOS)", unidad: "µIU/mL", refMin: 15, refMax: 60, referencia: "< 60 µIU/mL", precio: 60.00 },
  { codigo: "717", nombre: "INTERLEUKIN-6 (IL-6)", unidad: "pg/mL", refMin: 0, refMax: 7.0, referencia: "< 7.0 pg/mL", precio: 253.00 },
  { codigo: "718", nombre: "INYECTABLES", unidad: "", refMin: "", refMax: "", referencia: "PROCEDIMIENTO ENFERMERÍA", precio: 15.00 },
  { codigo: "719", nombre: "ISOSPORA BELLI (HECES)", unidad: "", refMin: "", refMax: "", referencia: "NO SE OBSERVAN OOCISTES", precio: 64.00 },
  { codigo: "720", nombre: "JC VIRUS- ADN, PCR", unidad: "copias/mL", refMin: 0, refMax: 500, referencia: "< 500 copias/mL", precio: 1910.00 },
  { codigo: "721", nombre: "KIT ADICIONAL TEST DE ALIENTO C13", unidad: "", refMin: "", refMax: "", referencia: "CONSUMIBLE PRUEBA", precio: 199.00 },
  { codigo: "722", nombre: "L.H. (H. LUTEINIZANTE LH)", unidad: "mIU/mL", refMin: 1.7, refMax: 8.6, referencia: "Según fase menstrual / Varones: 1.7-8.6 mIU/mL", precio: 40.00 },
  { codigo: "723", nombre: "LACTOGENO PLACENTARIO HUMANO", unidad: "µg/mL", refMin: 0.5, refMax: 11.0, referencia: "Según semanas de gestación", precio: 335.00 },
  { codigo: "724", nombre: "LAMINA PERIFERICA", unidad: "", refMin: "", refMax: "", referencia: "Morfología eritrocitaria, leucocitaria y plaquetaria normal", precio: 40.00 },
  { codigo: "726", nombre: "LAMOTRIGINE", unidad: "µg/mL", refMin: 2.5, refMax: 15.0, referencia: "2.5 - 15.0 µg/mL", precio: 300.00 },
  { codigo: "727", nombre: "LAMOTRIGINE (LAMICTAL)", unidad: "µg/mL", refMin: 2.5, refMax: 15.0, referencia: "2.5 - 15.0 µg/mL", precio: 438.00 },
  { codigo: "728", nombre: "LDL OXIDADO ANTICUERPOS, LIPOPROTEINA BAJA DENSIDAD OXIDADA", unidad: "U/L", refMin: 0, refMax: 50, referencia: "< 50 U/L", precio: 353.00 },
  { codigo: "729", nombre: "LEGIONELLA PNEUMOPHILA IGM", unidad: "", refMin: "", refMax: "", referencia: "NEGATIVO", precio: 204.00 },
{ codigo: "730", nombre: "LEGIONELLA SP, ANTIGENO EN ORINA", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 385.00 },
{ codigo: "731", nombre: "LEISHMANIA , ANTICUERPOS IGG", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 349.00 },
{ codigo: "732", nombre: "LEPTINA", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 236.00 },
{ codigo: "733", nombre: "LEPTOSPIRA ANTICUERPOS IGG", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 213.00 },
{ codigo: "734", nombre: "LEPTOSPIRA ANTICUERPOS IGM", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 213.00 },
{ codigo: "735", nombre: "LEUCOCITOS EN HECES REACCION INFLAMATORIA (PMN)", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 25.00 },
{ codigo: "737", nombre: "LEVETIRACETAM (KEPPRA) - SUERO", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 705.00 },
{ codigo: "738", nombre: "LEVETIRACETAM (KEPPRA), SUERO", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 390.00 },
{ codigo: "739", nombre: "LH HORMONA LUTEINIZANTE", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 60.00 },
{ codigo: "740", nombre: "LINFOCITOS ESTUDIO COMPLETO", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 1650.00 },
{ codigo: "741", nombre: "LINFOCITOS T CD3 (CD4+ Y CD8+)", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 420.00 },
{ codigo: "742", nombre: "LINFOCITOS T-B", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 335.00 },
{ codigo: "743", nombre: "LIPASA SERICA", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 30.00 },
{ codigo: "744", nombre: "LIPASA SERICA (HN)", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 20.00 },
{ codigo: "745", nombre: "LIPIDOGRAMA", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 105.00 },
{ codigo: "746", nombre: "LIPIDOS TOTALES", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 30.00 },
{ codigo: "747", nombre: "LIPOPROTEINA A (LP-A)", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 118.00 },
{ codigo: "748", nombre: "LIQUIDO ASCITICO CITOQUIMICO", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 54.00 },
{ codigo: "749", nombre: "LIQUIDO CEFALORAQUIDEO CITOQUIMICO ( LCR )", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 60.00 },
{ codigo: "750", nombre: "LIQUIDO PERITONEAL CITOQUIMICO", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 54.00 },
{ codigo: "751", nombre: "LIQUIDO PLEURAL CITOQUIMICO", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 70.00 },
{ codigo: "752", nombre: "LIQUIDO SINOVIAL (CRISTALES)", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 71.00 },
{ codigo: "753", nombre: "LIQUIDO SINOVIAL CITOQUIMICO", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 60.00 },
{ codigo: "754", nombre: "LISTERIA MONOCYTOGENES, AC TOTALES", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 169.00 },
{ codigo: "755", nombre: "LITIO", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 55.00 },
{ codigo: "756", nombre: "LITIO, TASA DE TRANSPORTE", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 272.00 },
{ codigo: "757", nombre: "LORAZEPAM - SUERO", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 568.00 },
{ codigo: "758", nombre: "LYME ENFERMEDAD IGG (BORRELIA BURGDORFERI)", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 157.00 },
{ codigo: "759", nombre: "LYME ENFERMEDAD IGM (BORRELIA BURGDORFERI)", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 584.00 },
{ codigo: "760", nombre: "M. TUBERCULOSIS, MDR (RIF/ISO)", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 1578.00 },
{ codigo: "762", nombre: "MAGNESIO (ORINA 24H) (HN)", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 30.00 },
{ codigo: "763", nombre: "MAGNESIO EN ORINA SIMPLE (HN)", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 30.00 },
{ codigo: "764", nombre: "MAGNESIO SERICO (HN)", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 30.00 },
{ codigo: "765", nombre: "MALARIA ANTICUERPOS IGG", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 427.00 },
{ codigo: "766", nombre: "MALARIA ANTICUERPOS IGM", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 426.00 },
{ codigo: "767", nombre: "MALARIA, ADN X PCR EN SANGRE", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 2325.00 },
{ codigo: "768", nombre: "MANGANESO EN SANGRE", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 191.00 },
{ codigo: "773", nombre: "MARIHUANA -THC (ORINA SIMPLE) CUALITATIVO", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 50.00 },
{ codigo: "769", nombre: "MARIHUANA THC (ORINA SIMPLE) - AUTOMATIZADO (HN)", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 50.00 },
{ codigo: "770", nombre: "MARIHUANA THC (ORINA SIMPLE) - CCF CONFIRMATORIO CUALITOXICOLOGICO", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 281.00 },
{ codigo: "771", nombre: "MARIHUANA THC (ORINA SIMPLE) - CUALITATIVO", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 30.00 },
{ codigo: "772", nombre: "MARIHUANA THC (ORINA SIMPLE) - HPLC CONFIRMATORIO SIN CROMATOGRAMA", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 1055.00 },
{ codigo: "774", nombre: "MERCURIO DOSAJE", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 176.00 },
{ codigo: "775", nombre: "MERCURIO EN ORINA 24 HRS", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 176.00 },
{ codigo: "776", nombre: "MERCURIO EN ORINA SIMPLE", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 176.00 },
{ codigo: "777", nombre: "METAHEMOGLOBINA \"METHB\" (HN)", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 144.00 },
{ codigo: "778", nombre: "METANEFRINA (ORINA 24 HORAS)", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 324.00 },
{ codigo: "779", nombre: "METANEFRINAS FRACCIONADAS PLASMATICAS", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 851.00 },
{ codigo: "780", nombre: "METHANFENTAMINAS CUANTITATIVO EN ORINA", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 250.00 },
{ codigo: "781", nombre: "MI-2 AUTOANTICUERPOS", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 372.00 },
{ codigo: "782", nombre: "MICOFENOLICO, ACIDO (MICOFENOLATO)", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 1107.00 },
{ codigo: "784", nombre: "MICROALBUMINURIA (ORINA 24 HORAS)", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 55.00 },
{ codigo: "785", nombre: "MICROALBUMINURIA (ORINA SIMPLE) ALB/CREA", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 50.00 },
{ codigo: "783", nombre: "MICROALBUMINURIA - ORINA SIMPLE", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 70.00 },
{ codigo: "786", nombre: "MICROALBUMINURIA 24 HORAS", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 50.00 },
{ codigo: "787", nombre: "MIELINA PROTEINA BASICA LCR", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 1369.00 },
{ codigo: "788", nombre: "MIELOCULTIVO-INCL.EXA.DIR.Y ANTIB (HN)", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 62.00 },
{ codigo: "789", nombre: "MIOCARDIO, AUTOANTICUERPOS", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 228.00 },
{ codigo: "790", nombre: "MIOGLOBINA (HN)", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 109.00 },
{ codigo: "791", nombre: "MOLIBDENO EN ORINA SIMPLE", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 209.00 },
{ codigo: "792", nombre: "MOLIBDENO SERICO", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 354.00 },
{ codigo: "793", nombre: "MONOTEST- IM (ANTICUERPOS HETEROFILOS-PAUL BUNNELL)", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 35.00 },
{ codigo: "794", nombre: "MTHFR MUTACION C677T Y A1298C", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 850.00 },
{ codigo: "795", nombre: "MYCOBACTERIUM ATIPICO X PCR EN TIEMPO REAL", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 2042.00 },
{ codigo: "796", nombre: "MYCOBACTERIUM TUBERCULOSIS POR PCR", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 1156.00 },
{ codigo: "797", nombre: "MYCOBACTERIUM TUBERCULOSIS POR PCR (RESISTENCIA RIF + INH) \"CONOCIDO COMO GENEXPERT\"", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 1500.00 },
{ codigo: "798", nombre: "MYCOBACTERIUM TUBERCULOSIS POR PCR (TEJIDOS Y BIOPSIAS)", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 1216.00 },
{ codigo: "799", nombre: "MYCOPLASMA HOMINIS, ANTICUERPOS", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 250.00 },
{ codigo: "800", nombre: "MYCOPLASMA PNEUMONIAE IGG", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 94.00 },
{ codigo: "801", nombre: "MYCOPLASMA PNEUMONIAE IGM", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 94.00 },
{ codigo: "802", nombre: "MYCOPLASMA PNEUMONIAE X PCR (ESPUTO/L.BRONQUIAL)", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 1920.00 },
{ codigo: "803", nombre: "NEISSERIA GONORRHOEAE ANTIC. TOTALES", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 511.00 },
{ codigo: "804", nombre: "NEISSERIA GONORRHOEAE, ANTICUERPOS", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 395.00 },
{ codigo: "805", nombre: "NICOTINA (ORINA SIMPLE)", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 52.00 },
{ codigo: "806", nombre: "NIQUEL ORINA SIMPLE", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 508.00 },
{ codigo: "807", nombre: "NITROGENO UREICO (BUN)", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 20.00 },
{ codigo: "808", nombre: "NITROGENO UREICO EN ORINA 24 HORAS", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 12.00 },
{ codigo: "809", nombre: "NSE ENOLASA NEURONAL ESPECIFICA (ENE)", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 167.00 },
{ codigo: "810", nombre: "NTX (N-TELOPEPTIDO EN ORINA)", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 180.00 },
{ codigo: "811", nombre: "OPIACEOS CONFIRMACION, ORINA", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 285.00 },
{ codigo: "812", nombre: "OPIACEOS EN ORINA", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 94.00 },
{ codigo: "813", nombre: "OSMOLARIDAD ORINA 24 HORAS", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 112.00 },
{ codigo: "814", nombre: "OSMOLARIDAD SERICO \"MOSM\" (HN)", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 89.00 },
{ codigo: "815", nombre: "OSMOLARIDAD URINARIA", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 74.00 },
{ codigo: "816", nombre: "OSTEOCALCINA", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 144.00 },
{ codigo: "817", nombre: "OSTEOPONTINA", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 423.00 },
{ codigo: "818", nombre: "OVARIOS, AUTOANTICUERPOS", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 730.00 },
{ codigo: "820", nombre: "OXALATOS EN ORINA DE 24 HORAS", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 160.00 },
{ codigo: "821", nombre: "OXCARBAMAZEPINA", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 456.00 },
{ codigo: "822", nombre: "OXIUROS (TEST DE GRAHAM)", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 15.00 },
{ codigo: "823", nombre: "OXOPLASMA GONDII ANTICUERPOS IgG, LCR", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 70.00 },
{ codigo: "824", nombre: "PANEL MENINGITIS/ENCEFALITIS X FILMARRAY", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 5092.00 },
{ codigo: "825", nombre: "PANEL RESPIRATORIO X FILMARRAY", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 3993.00 },
{ codigo: "826", nombre: "PAPANICOLAOU", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 30.00 },
{ codigo: "827", nombre: "PAPANICOLAOU EN BASE LIQUIDA", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 272.00 },
{ codigo: "828", nombre: "PAPANICOLAOU OTROS PAP", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 40.00 },
{ codigo: "829", nombre: "PAPERAS IGG (PARAMIXOVIRUS Ó MUMPS)", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 112.00 },
{ codigo: "830", nombre: "PAPERAS IGM (PARAMIXOVIRUS)", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 107.00 },
{ codigo: "831", nombre: "PAPILOMAVIRUS ANTICUERPO", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 250.00 },
{ codigo: "832", nombre: "PAPILOMAVIRUS GENOTIPIFICACION - HOMBRE (28 GENOTIPOS)", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 524.00 },
{ codigo: "833", nombre: "PAPILOMAVIRUS GENOTIPIFICACION - MUJER (28 GENOTIPOS)", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 524.00 },
{ codigo: "834", nombre: "PAPILOMAVIRUS SCREENING 14 GENOTIPOS - HOMBRE", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 324.00 },
{ codigo: "835", nombre: "PAPILOMAVIRUS SCREENING 14 GENOTIPOS - MUJER", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 324.00 },
{ codigo: "836", nombre: "PAPP A - PROTEINA PLASMATICA PLACENTARIA (ASOCIADA AL EMBARAZO)", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 180.00 },
{ codigo: "837", nombre: "PARACOCCIDIOIDES BRASILIENSIS, ANTICUERPOS", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 204.00 },
{ codigo: "839", nombre: "PARASITOLOGICO ESPECIAL -3 METODOS", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 30.00 },
{ codigo: "840", nombre: "PARASITOLOGICO SERIADO -3 MUESTRAS", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 30.00 },
{ codigo: "842", nombre: "PARASITOLOGICO SIMPLE X 1 MUESTRA", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 10.00 },
{ codigo: "844", nombre: "PARATOHORMONA INTACTA (PTH-INTACTA)", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 60.00 },
{ codigo: "845", nombre: "PAROXETINA (SEROXAT)", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 891.00 },
{ codigo: "846", nombre: "PARVOVIRUS B19, ADN POR PCR CUANTITATIVO", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 1438.00 },
{ codigo: "847", nombre: "PARVOVIRUS B19, IGG ANTICUERPOS", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 217.00 },
{ codigo: "848", nombre: "PARVOVIRUS B19, IGM ANTICUERPOS", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 217.00 },
{ codigo: "849", nombre: "PCR PARA BORDETELLA PERTUSIS", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 1218.00 },
{ codigo: "850", nombre: "PDF (PRODUCTO DE DEGRADACION DE FIBRINOGENO)", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 130.00 },
{ codigo: "851", nombre: "PEPSINÓGENO II", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 237.00 },
{ codigo: "852", nombre: "PEPTIDO C", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 65.00 },
{ codigo: "853", nombre: "PEPTIDO C POSTPANDRIAL 120'", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 75.00 },
{ codigo: "854", nombre: "PEPTIDO VASO ACTIVO INTESTINAL (VIP)", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 321.00 },
{ codigo: "855", nombre: "PERFIL DE ANEMIA: HIERRO SERICO, FERRITINA, B12 VITAMINA, ACIDO FOLICO, HEMOGRAMA", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 189.00 },
{ codigo: "857", nombre: "PERFIL DE COAGULACIÓN: COAGULACIÓN Y SANGRÍA, TIEMPO DE TROMBINA, TIEMPO DE TROMBOPLASTINA PARCIAL, TIEMPO DE PROTOMBINA, FIBRINOGENO, GRUPO Y FACTOR, RECUENTO DE PLAQUETAS", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 130.00 },
{ codigo: "858", nombre: "PERFIL DE DROGAS DE ABUSO 5 (CUALITATIVO)", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 50.00 },
{ codigo: "859", nombre: "PERFIL DE ESTUDIO GENETICO: ALFA FETOPROTEINAS(AFP), BETA HCG SUBUNIDAD CUANTITATIVO ESTRADIOL LIBRE(IM)", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 224.00 },
{ codigo: "860", nombre: "PERFIL DE LIPIDOS", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 50.00 },
{ codigo: "861", nombre: "PERFIL DE PRECLANCIA", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 80.00 },
{ codigo: "862", nombre: "PERFIL DROGAS DE ABUSO: BENZODIAZEPINAS (ORINA), COCAINNPBC CUANTITATIVO(M), MARIHUANA-THC(ORINA SIMPLE) CUANTITATIVO", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 198.00 },
{ codigo: "863", nombre: "PERFIL HEPATICO", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 120.00 },
{ codigo: "864", nombre: "PERFIL HEPATICO: BILIRRUBINAS FRACCIONADAS, FOSFATASA ALCALINA, GAMMA-GLUTAMIL TRANSPEPTIDASA, PROTEINAS TOTALES Y FRACCIONADAS, TRANSAMINASA OXALACETICA, TRANSAMINASA PIRUVICA", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 85.00 },
{ codigo: "865", nombre: "PERFIL HORMONAL FEMENINO I :ESTRADIOL, F.S.H., L.H", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 110.00 },
{ codigo: "866", nombre: "PERFIL HORMONAL FEMENINO II : TIROXINA (T4), ESTRADIOL, TSH ULTRASENSIBLE, F.S.H., L.H.", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 168.00 },
{ codigo: "869", nombre: "PERFIL LIPIDICO: Colesterol Total, Triglicéridos, HDL - LDL - VLDL", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 50.00 },
{ codigo: "870", nombre: "PERFIL PRE NATAL I - GESTANTE: HEMOGRAMA, GLUCOSA, UREA, CREATININA, EXAMEN DE ORINA COMPLETO(AUTOMATIZADO), GRUPO SANGUINEO Y RH, SEROLOGICAS CUALITATIVAS \"SIALIS\"", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 110.00 },
{ codigo: "871", nombre: "PERFIL PRE NATAL II - GESTANTE: HEMOGRAMA, GLUCOSA , UREA, CREATININA, EXAMEN DE ORINA COMPLETO (AUTOMATIZADO), GRUPO SANGUINEO Y RH SEROLOGICAS CUALITATIVAS \"SIALIS\", HIV 1-2(AC-AG 30/40 GENERACIÓN) HEPATITIS B, HBsAg (Ag Austr)\"", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 238.00 },
{ codigo: "872", nombre: "PERFIL PRE OPERATORIO QUIRURGICO: HIV 1-2(AC-AG 30/40 GENERACIÓN), HEPATITIS B, HBsA9 (Ag Austr) CREATININA, GLUCOSA, UREA , GRUPO SANGUINEO Y RH, SEROLOGICAS CUALITATIVAS \"SIFILIS\", COAGULACION Y SANGRIA, HEMOGRAMA COMPLETO, EXAMEN COMPLETO DE ORINA", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 205.00 },
{ codigo: "1159", nombre: "PERFIL RENAL 2 ( CREATININA, UREA, HEMOGRAMA, EXAMEN DE ORINA, ACIDO URICO, PROTEINAS EN ORINA ASSA)", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 95.00 },
{ codigo: "873", nombre: "PERFIL RENAL: CREATININA, DEPURACIÓN DE CREATININA ENDOGENA, UREA, HEMOGRAMA, ALBUMINA - 24 HORAS, EXAMEN COMPLETO DE ORINA", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 95.00 },
{ codigo: "874", nombre: "PERFIL REUMATOLÓGICO: ACIDO URICO, FENOMENO LE , ANTICUERPOS ANTINUCLEARES (ANA)(IM), FACTOR REUMATOidEO (LATEX) SEMI-CUANTITATIVO, PROTEINA C REACTIVA, VELOCIDAD DE SEDIMENTACIÓN (VSG), HEMOGRAMA", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 165.00 },
{ codigo: "875", nombre: "PERFIL ROMA (PROBABILIDAD DEL RIESGO DEL CANCER DE OVARIO)", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 531.00 },
{ codigo: "878", nombre: "PERFIL TIROIDEO LIBRE: TRIODOTlRONlNA(T3), TIROXINA(T4), TSH ULTRASENSIBLE, T3 LIBRE Y T4 LIBRE", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 130.00 },
{ codigo: "876", nombre: "PERFIL TIROIDEO: T3, T4, TSH", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 130.00 },
{ codigo: "879", nombre: "PERFIL TORCH", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 320.00 },
{ codigo: "880", nombre: "PERFIL TORCH COMPLETO: RUBEOLA IGM-IGG, CITOMEGALOVIRUS IGM-IGG, TOXOPLASMA IGM-IGG, HERPES 1 IGM-IGG, HERPES 2 IGM-IGG", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 350.00 },
{ codigo: "881", nombre: "PERFIL TORCH IgG: RUBEOLA IGG, CITOMEGALOVIRUS IGG, TOXOPLASMA IGG, HERPES 1 IGG, HERPES 2 IGG", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 292.00 },
{ codigo: "882", nombre: "PERFIL TORCH IgM: RUBEOLA IGM, CITOMEGALOVIRUS IGM, TOXOPLASMA IGM, HERPES 1 IGM, HERPES 2 IGM", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 292.00 },
{ codigo: "883", nombre: "PH EN LIQUIDO PLEURAL", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 14.00 },
{ codigo: "884", nombre: "PIRIDINOLINA (CROSSLINKS) ORINA AL AZAR", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 161.00 },
{ codigo: "885", nombre: "PLAQUETRIOS ANTICUERPOS (PLAQUETAS AC) IGG-IGM", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 579.00 },
{ codigo: "886", nombre: "PLATA SERICA", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 949.00 },
{ codigo: "887", nombre: "PLOMO EN SANGRE", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 110.00 },
{ codigo: "888", nombre: "PLOMO ORINA 24 HRS", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 176.00 },
{ codigo: "889", nombre: "PNEUMOCISTIS CARINII - EX DIRECTO", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 79.00 },
{ codigo: "890", nombre: "POLIPEPTIDO PANCREATICO", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 933.00 },
{ codigo: "891", nombre: "POTASIO (ORINA 24H)", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 20.00 },
{ codigo: "892", nombre: "POTASIO EN SUERO", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 30.00 },
{ codigo: "894", nombre: "PRO-BNP (PEPTIDO NATRIUREICO)", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 220.00 },
{ codigo: "896", nombre: "PROCALCITONINA", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 130.00 },
{ codigo: "897", nombre: "PROCALCITONINA (HN)", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 220.00 },
{ codigo: "898", nombre: "PROGESTERONA", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 40.00 },
{ codigo: "899", nombre: "PROLACTINA", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 60.00 },
{ codigo: "901", nombre: "PROLACTINA POOL", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 65.00 },
{ codigo: "902", nombre: "PROSTAGLANDINA E2, SERICA", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 2325.00 },
{ codigo: "903", nombre: "PROTEINA 14-3-3 (LCR)", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 4887.00 },
{ codigo: "904", nombre: "PROTEINA C FUNCIONAL / ACTIVIDAD", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 201.00 },
{ codigo: "1157", nombre: "PROTEINA C REACTIVA (PCR)", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 50.00 },
{ codigo: "907", nombre: "PROTEINA C REACTIVA ULTRASENSIBLE (HN) PCR US", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 35.00 },
{ codigo: "908", nombre: "PROTEINA C REACTIVA(CUANTITATIVO)", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 50.00 },
{ codigo: "909", nombre: "PROTEINA C-REACTIVA (PCR-LATEX)", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 50.00 },
{ codigo: "910", nombre: "PROTEINA EN ORINA 24 HORAS", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 40.00 },
{ codigo: "911", nombre: "PROTEINA EN ORINA SIMPLE", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 95.00 },
{ codigo: "912", nombre: "PROTEINA S FUNCIONAL", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 216.00 },
{ codigo: "913", nombre: "PROTEINA S FUNCIONAL DE LA COAGULACION, PLASMA", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 170.00 },
{ codigo: "914", nombre: "PROTEINA SOLUBLE HEPATICA(LSP) AUTOANTICUERPOS (ANTI-CITOQUERATINA)", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 453.00 },
{ codigo: "915", nombre: "PROTEINAS BENCE JONES -ORINA 24 H", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 140.00 },
{ codigo: "916", nombre: "PROTEINAS CUALITATIVAS", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 10.00 },
{ codigo: "917", nombre: "PROTEINAS CUANTITATIVAS Al AZAR", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 10.00 },
{ codigo: "918", nombre: "PROTEINAS EN 24 HORAS", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 15.00 },
{ codigo: "919", nombre: "PROTEINAS EN LIQUIDO", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 12.00 },
{ codigo: "920", nombre: "PROTEINAS TOTALES Y FRACCION (ALBUMINA Y GLOBULINA)", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 15.00 },
{ codigo: "921", nombre: "PROTEINAS TOTALES Y FRACCIONADAS", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 30.00 },
{ codigo: "922", nombre: "PROTEINOGRAMA EN LCR", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 174.00 },
{ codigo: "923", nombre: "PROTEINOGRAMA EN ORINA SIMPLE", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 224.00 },
{ codigo: "924", nombre: "PROTEINOGRAMA ORINA 24H", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 122.00 },
{ codigo: "925", nombre: "PROTEINOGRAMA SERICO (AU)", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 55.00 },
{ codigo: "926", nombre: "PROTEINURIA ORINA 24 HORAS", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 35.00 },
{ codigo: "927", nombre: "PROTEINURIA ORINA SIMPLE", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 35.00 },
{ codigo: "928", nombre: "PROTOPORFIRINA ERITROCITARIO LIBRE (FEP)", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 312.00 },
{ codigo: "929", nombre: "PROTOPORFIRINA ZINC P.P.Z. (/G HEMOGLOBINA)", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 333.00 },
{ codigo: "930", nombre: "PROTROMBINA, MUTACION G20210A (FACTOR II)", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 803.00 },
{ codigo: "931", nombre: "PRUEBA ANTIGENO COVID", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 35.00 },
{ codigo: "932", nombre: "PRUEBA DE DENGUE", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 60.00 },
{ codigo: "933", nombre: "PRUEBA DE MEZCLA (TTPA) (HN)", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 149.00 },
{ codigo: "934", nombre: "PRUEBA DE PATERNIDAD INFORMATIVA", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 850.00 },
{ codigo: "935", nombre: "PRUEBA DE PATERNIDAD LEGAL", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 1200.00 },
{ codigo: "936", nombre: "PRUEBA SEROLOGICA COVID", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 120.00 },
{ codigo: "937", nombre: "PRUEBA STAMEY MEARES", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 564.00 },
{ codigo: "938", nombre: "PSA INDICE", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 90.00 },
{ codigo: "940", nombre: "PSA LIBRE (ANTIGENO PROSTATICO LIBRE)", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 60.00 },
{ codigo: "941", nombre: "PSA PANEL COMPLETO", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 120.00 },
{ codigo: "942", nombre: "PSA TOTAL (ANTIGENO PROSTATICO ESPECIFICO)", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 50.00 },
{ codigo: "943", nombre: "PSA TOTAL (ANTIGENO PROSTATICO TOTAL)", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 50.00 },
{ codigo: "944", nombre: "PTH TERMINAL N", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 194.00 },
{ codigo: "946", nombre: "PTH-TERMINAL C", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 240.00 },
{ codigo: "945", nombre: "PTH. PROTEINA RELACIONADO A \"PTHRP\"", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 718.00 },
{ codigo: "947", nombre: "QUANTIFERON-TB PRUEBA DE IGRA", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 1256.00 },
{ codigo: "948", nombre: "RADIOGRAFÍA CRANEO COLUMNA PELVIS", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 170.00 },
{ codigo: "949", nombre: "RADIOGRAFÍA DE PARTES DE EXTREMIDADES", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 150.00 },
{ codigo: "950", nombre: "RADIOGRAFIA DE TORAX PA Y LATERAL", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 230.00 },
{ codigo: "951", nombre: "REACCION INFLAMATORIA EN HECES", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 15.00 },
{ codigo: "952", nombre: "REACCION INFLAMATORIA EN HECES (3 MUESTRAS )", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 35.00 },
{ codigo: "953", nombre: "RECEPTOR ANDROGÉNICO INMUNOHISTOQUIMICA BIOPSIA", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 539.00 },
{ codigo: "954", nombre: "RECUENTO DE PLAQUETAS", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 25.00 },
{ codigo: "956", nombre: "RECUENTO LINFOCITARIO TBNK (P-INMG)", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 539.00 },
{ codigo: "957", nombre: "RENINA PLASMATICA ACTIVIDAD", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 154.00 },
{ codigo: "958", nombre: "RESERVA ALCALINA CO2", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 75.00 },
{ codigo: "959", nombre: "RESISTENCIA A LA PROTEINA C ACTIVADA", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 462.00 },
{ codigo: "960", nombre: "RETICULINA ANTIC, IGA", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 258.00 },
{ codigo: "961", nombre: "RETICULOCITOS", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 35.00 },
{ codigo: "964", nombre: "RETICULOCITOS + PARAMETROS RUO", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 29.00 },
{ codigo: "965", nombre: "RETRACCION DE COAGULO", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 26.00 },
{ codigo: "966", nombre: "RICKETTSIA RICKETTSIA IGG", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 394.00 },
{ codigo: "967", nombre: "RICKETTSIA RICKETTSIA IGM", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 394.00 },
{ codigo: "968", nombre: "RIESGO CORONARIO", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 60.00 },
{ codigo: "969", nombre: "ROSA DE BENGALA - BRUCELLA", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 18.00 },
{ codigo: "970", nombre: "ROSE WAALER", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 35.00 },
{ codigo: "971", nombre: "ROTAVIRUS + ADENOVIRUS (HECES)", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 40.00 },
{ codigo: "972", nombre: "RPR", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 20.00 },
{ codigo: "973", nombre: "RUBEOLA IGG", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 65.00 },
{ codigo: "975", nombre: "RUBEOLA IGM", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 65.00 },
{ codigo: "977", nombre: "SALES BILIARES (COLILGLICINA)", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 587.00 },
{ codigo: "978", nombre: "SARAMPION IGG (IM)", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 147.00 },
{ codigo: "979", nombre: "SARAMPION IGM", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 89.00 },
{ codigo: "981", nombre: "SATURACIÓN DE TRANSFERRINA", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 60.00 },
{ codigo: "982", nombre: "SCHISTOSOMA MANSONI ANTICUERPOS IGG", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 714.00 },
{ codigo: "983", nombre: "SEDIMENTO DE ORINA (AUTOMATIZADO)", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 15.00 },
{ codigo: "984", nombre: "SELENIO EN ORINA 24 HRS", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 239.00 },
{ codigo: "985", nombre: "SELENIO SERICO", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 202.00 },
{ codigo: "986", nombre: "SEMEN, ALFA GLUCOSIDASA", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 181.00 },
{ codigo: "987", nombre: "SEROLOGIA", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 30.00 },
{ codigo: "988", nombre: "SEROLOGICAS CUALITATIVAS (RPR) \"SIFILIS\"", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 18.00 },
{ codigo: "989", nombre: "SEROLOGICAS SEMI-CUANTITATIVAS (RPR) \"SIFILIS\"", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 20.00 },
{ codigo: "990", nombre: "SEROTONINA (5-HIDROXITRIPTAMINA)", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 305.00 },
{ codigo: "991", nombre: "SEX HORMONE BINDING GLOBULIN SHBG \"GLOB FIJ DE HORMONA SEX", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 169.00 },
{ codigo: "992", nombre: "SLA LP (ANTIGENO SOLUBLE HEPATICO HIGADO - PANCREAS)", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 428.00 },
{ codigo: "993", nombre: "SM (SMITH), AUTOANTICUERPOS (IM)", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 70.00 },
{ codigo: "994", nombre: "SODIO EN SUERO", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 19.00 },
{ codigo: "995", nombre: "SODIO ORINA 24 HORAS", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 19.00 },
{ codigo: "996", nombre: "SODIO ORINA SIMPLE", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 19.00 },
{ codigo: "997", nombre: "SOMATOMEDINA C (IGF-1) 120'(POST)", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 86.00 },
{ codigo: "998", nombre: "SOMATOMEDINA C (IGF-1) 60' POST", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 86.00 },
{ codigo: "999", nombre: "SOMATOMEDINA C (IGF-1) 90' POST", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 86.00 },
{ codigo: "1000", nombre: "SOMATOMEDINA C (IGF-1) BASAL", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 100.00 },
{ codigo: "1002", nombre: "SOMATOMEDINA C (IGF-1) POST-ESTIMULO", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 86.00 },
{ codigo: "1003", nombre: "SS-A (ANTI-RO) AUTOANTICUERPO (IM)", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 84.00 },
{ codigo: "1004", nombre: "SS-B (ANTI-LA) AUTOANTICUERPO (IM)", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 84.00 },
{ codigo: "1005", nombre: "STRONGYLOIDES STERCOLARIS ,ANTICUERPOS IGG", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 885.00 },
{ codigo: "1006", nombre: "SUB-UNIDAD HCG BETA CUALITATIVO", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 25.00 },
{ codigo: "563", nombre: "SUB-UNIDAD HCG BETA CUANTITATIVO", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 70.00 },
{ codigo: "1007", nombre: "SUDAN III (GRASAS NEUTRAS)", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 22.00 },
{ codigo: "1008", nombre: "SUSTANCIAS REDUCTORAS", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 12.00 },
{ codigo: "1010", nombre: "T3 LIBRE", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 50.00 },
{ codigo: "1012", nombre: "T3 REVERSO (RT3)", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 160.00 },
{ codigo: "1013", nombre: "T3 TOTAL", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 50.00 },
{ codigo: "1014", nombre: "T3 UPTAKE", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 109.00 },
{ codigo: "1016", nombre: "T4 LIBRE", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 50.00 },
{ codigo: "1018", nombre: "T4 TOTAL", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 50.00 },
{ codigo: "1019", nombre: "TACOS Y LAMINAS", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 40.00 },
{ codigo: "1020", nombre: "TACROLIMUS (CDX)", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 608.00 },
{ codigo: "1021", nombre: "TALIO SANGRE TOTAL", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 273.00 },
{ codigo: "1022", nombre: "TAMIZAJE GENETICO PRENATAL - 1ER TRIMESTRE (SCREENING)", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 679.00 },
{ codigo: "1023", nombre: "TAMIZAJE GENETICO PRENATAL - 2DO TRIMESTRE (CUADRUPLE)", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 643.00 },
{ codigo: "1024", nombre: "TAMIZAJE GENETICO PRENATAL - 2DO TRIMESTRE (TRIPLE)", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 508.00 },
{ codigo: "1025", nombre: "TAMIZAJE NEONATAL AMPLIADO", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 1431.00 },
{ codigo: "1026", nombre: "TAMIZAJE NEONATAL BASICO", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 245.00 },
{ codigo: "1027", nombre: "TASA DE FILTRACION GLOMERULAR ESTIMADA (TFGE)", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 161.00 },
{ codigo: "1028", nombre: "TEOFILINA", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 142.00 },
{ codigo: "1029", nombre: "TEST DE COOMBS DIRECTO", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 40.00 },
{ codigo: "1031", nombre: "TEST DE COOMBS INDIRECTO", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 20.00 },
{ codigo: "1032", nombre: "TEST DE GRAHAM", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 10.00 },
{ codigo: "1033", nombre: "TESTOSTERONA LIBRE", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 60.00 },
{ codigo: "1035", nombre: "TESTOSTERONA TOTAL", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 50.00 },
{ codigo: "1037", nombre: "TETANO TOXOIDE ANTICUERPOS IGG", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 306.00 },
{ codigo: "1038", nombre: "TGO (ASAT)", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 15.00 },
{ codigo: "1039", nombre: "TGP (ALAT)", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 15.00 },
{ codigo: "1040", nombre: "THEVENON (SANGRE OCULTA)", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 30.00 },
{ codigo: "1041", nombre: "THEVENON (SANGRE OCULTA) INMUNOLOGICO", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 60.00 },
{ codigo: "1043", nombre: "THEVENON 1 (SANGRE OCULTA) CONVENCIONAL", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 15.00 },
{ codigo: "1044", nombre: "THEVENON 2 (SANGRE OCULTA) CONVENCIONAL", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 15.00 },
{ codigo: "1045", nombre: "THEVENON 3 (SANGRE OCULTA) CONVENCIONAL", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 15.00 },
{ codigo: "1046", nombre: "THYROID BINDING GLOBULIN (TBG)", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 349.00 },
{ codigo: "1047", nombre: "TIEMPO DE COAGULACION Y SANGRIA", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 20.00 },
{ codigo: "1049", nombre: "TIEMPO DE PROTOMBINA + INR", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 35.00 },
{ codigo: "1050", nombre: "TIEMPO DE PROTROMBINA", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 25.00 },
{ codigo: "1051", nombre: "TIEMPO DE TROMBINA", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 20.00 },
{ codigo: "1052", nombre: "TIEMPO DE TROMBOPLASTINA", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 35.00 },
{ codigo: "1053", nombre: "TIEMPO PARCIAL DE TROMBOPLASTINA", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 20.00 },
{ codigo: "1054", nombre: "TINTA CHINA (CRYPTOCOCCUS)", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 15.00 },
{ codigo: "1055", nombre: "TINTA CHINA (CRYPTOCOCOS)", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 40.00 },
{ codigo: "1056", nombre: "TIRA REACTIVA (ORINA)", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 14.00 },
{ codigo: "1057", nombre: "TIRAS DE GLUCOSA (ACCUCHECK)", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 12.00 },
{ codigo: "1059", nombre: "TIROGLOBULINA (TG)", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 70.00 },
{ codigo: "1060", nombre: "TNF-ALFA FACTOR NECROSIS TUMORAL", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 268.00 },
{ codigo: "1073", nombre: "TOLERANCIA A LA GLUCOSA", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 80.00 },
{ codigo: "1074", nombre: "TOLERANCIA A LA GLUCOSA (30, 60. 120 MIN)", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 50.00 },
{ codigo: "1061", nombre: "TOLERANCIA A LA GLUCOSA (BASAL, 30, 60, 120)", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 48.00 },
{ codigo: "1062", nombre: "TOLERANCIA A LA GLUCOSA (BASAL, 30, 60, 120, 180)", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 60.00 },
{ codigo: "1063", nombre: "TOLERANCIA A LA GLUCOSA (BASAL, 30, 60, 90, 120)", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 67.00 },
{ codigo: "1064", nombre: "TOLERANCIA A LA GLUCOSA (BASAL, 30, 60, 90, 120, 180)", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 83.00 },
{ codigo: "1065", nombre: "TOLERANCIA A LA GLUCOSA (BASAL, 60, 120)", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 45.00 },
{ codigo: "1066", nombre: "TOLERANCIA A LA GLUCOSA (BASAL, 60,120,180,240,300)", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 83.00 },
{ codigo: "1067", nombre: "TOLERANCIA A LA INSULINA (BASAL, 30, 60, 120)", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 107.00 },
{ codigo: "1068", nombre: "TOLERANCIA A LA INSULINA (BASAL, 30, 60, 120, 180)", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 118.00 },
{ codigo: "1069", nombre: "TOLERANCIA A LA INSULINA (BASAL, 30, 60, 90, 120)", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 118.00 },
{ codigo: "1070", nombre: "TOLERANCIA A LA INSULINA (BASAL, 30, 60, 90, 120, 180)", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 154.00 },
{ codigo: "1071", nombre: "TOLERANCIA A LA INSULINA (BASAL, 60, 120)", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 59.00 },
{ codigo: "1072", nombre: "TOLERANCIA A LA INSULINA (BASAL, 60, 120, 180, 240, 300)", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 154.00 },
{ codigo: "1075", nombre: "TOLERANCIA A LA LACTOSA (B, 60 , 120)", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 64.00 },
{ codigo: "1076", nombre: "TOLERANCIA A LA LACTOSA (B,30,60,120 ,180 MIN)", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 108.00 },
{ codigo: "1077", nombre: "TOLUENO - ACIDO HIPURICO EN ORINA 24 HORAS", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 397.00 },
{ codigo: "1078", nombre: "TORCH IGG", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 200.00 },
{ codigo: "1079", nombre: "TORCH IGM", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 200.00 },
{ codigo: "1080", nombre: "TOXIC SCREEN ORINA SIMPLE (10 DROGAS) CUALITATIVO", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 107.00 },
{ codigo: "1081", nombre: "TOXIC SCREEN ORINA SIMPLE (2 DROGAS) CUALITATIVO (COC, THC)", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 83.00 },
{ codigo: "1082", nombre: "TOXIC SCREEN ORINA SIMPLE (5 DROGAS) CUALITATIVO (COC,THC,AMP,MET,BZD)", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 120.00 },
{ codigo: "1084", nombre: "TOXOCARA IGG", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 315.00 },
{ codigo: "1085", nombre: "TOXOCARA IGM", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 499.00 },
{ codigo: "1086", nombre: "TOXOPLASMA GONDII ANTICUERPOS IgM, LCR", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 60.00 },
{ codigo: "1087", nombre: "TOXOPLASMA GONDII DNA X PCR", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 1302.00 },
{ codigo: "1088", nombre: "TOXOPLASMA IGG", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 60.00 },
{ codigo: "1090", nombre: "TOXOPLASMA IGM", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 60.00 },
{ codigo: "1094", nombre: "TRANSAMINASAS", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 30.00 },
{ codigo: "1095", nombre: "TRANSFERRINA", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 40.00 },
{ codigo: "1097", nombre: "TRANSFERRINA DEFICITARIA EN CARBOHIDRATOS (CDT)", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 607.00 },
{ codigo: "1098", nombre: "TRANSFERRINA RECEPTOR SOLUBLE", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 228.00 },
{ codigo: "1099", nombre: "TRANSGLUTAMINASA TISULAR AUTO ANTI IGA (IM)", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 387.00 },
{ codigo: "1100", nombre: "TRATAMIENTO", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 80.00 },
{ codigo: "1101", nombre: "TRICHINELLA SPIRALIS, AC IGG", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 526.00 },
{ codigo: "1102", nombre: "TRIGLICERIDOS", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 15.00 },
{ codigo: "1104", nombre: "TROPONINA I", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 130.00 },
{ codigo: "1106", nombre: "TROPONINA T", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 110.00 },
{ codigo: "1108", nombre: "TSH ULTRASENSIBLE", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 50.00 },
{ codigo: "1110", nombre: "TSH, AUTOANTICUERPOS ANTI RECEPTOR", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 439.00 },
{ codigo: "1111", nombre: "TSI ESTIMULANTE DE TIROIDES", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 416.00 },
{ codigo: "1112", nombre: "UREA", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 15.00 },
{ codigo: "1114", nombre: "UREA (ORINA 24 HORAS)", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 12.00 },
{ codigo: "1115", nombre: "UREA (ORINA SIMPLE)", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 12.00 },
{ codigo: "1116", nombre: "UREA POST", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 12.00 },
{ codigo: "1117", nombre: "UREAPLASMA UREALYTICUM, AC", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 345.00 },
{ codigo: "1118", nombre: "UROCULTIVO", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 60.00 },
{ codigo: "1119", nombre: "UROCULTIVO + ARD (CON REMOVEDOR DE ANTIBIOTICO)", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 160.00 },
{ codigo: "1120", nombre: "UROCULTIVO + ATB (ANTIBIOGRAMANA)", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 60.00 },
{ codigo: "1121", nombre: "UROCULTIVO AUTOMATIZADO CON MIC (HN)", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 107.00 },
{ codigo: "1122", nombre: "UROCULTIVO CON REMOVEDOR DE ANTIBIOTICO (HN)", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 150.00 },
{ codigo: "1123", nombre: "VARICELA ZOSTER IGG", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 94.00 },
{ codigo: "1124", nombre: "VARICELA ZOSTER IGM", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 99.00 },
{ codigo: "1160", nombre: "VDRL (SIFILIS) (SEROLOGIA CUANTITATIVA)", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 30.00 },
{ codigo: "1127", nombre: "VDRL (SIFILIS) EN LCR", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 60.00 },
{ codigo: "1126", nombre: "VDRL (SUERO) SIFILIS CUALITATIVO", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 30.00 },
{ codigo: "1129", nombre: "VELOCIDAD DE SEDIMENTACION (VSG)", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 15.00 },
{ codigo: "1130", nombre: "VELOCIDAD DE SEDIMENTACION/VSG", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 20.00 },
{ codigo: "1131", nombre: "VIH", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 20.00 },
{ codigo: "1132", nombre: "VIRUS RESPIRATORIO SINCICIAL IGM/IGG", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 487.00 },
{ codigo: "1133", nombre: "VIRUS RESPIRATORIO SINCITIAL IGG", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 170.00 },
{ codigo: "1134", nombre: "VIRUS RESPIRATORIO SINCITIAL IGM", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 243.00 },
{ codigo: "1135", nombre: "VISCOSIDAD SERICA", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 53.00 },
{ codigo: "1136", nombre: "VITAMINA A (RETINOL)", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 406.00 },
{ codigo: "1137", nombre: "VITAMINA B1 (THIAMINA)", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 475.00 },
{ codigo: "1138", nombre: "VITAMINA B12", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 50.00 },
{ codigo: "1140", nombre: "VITAMINA B2 (RIBOFLAVINA)", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 460.00 },
{ codigo: "1141", nombre: "VITAMINA B6 (FOSFATO PIRIDOXAL)", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 377.00 },
{ codigo: "1142", nombre: "VITAMINA C (ACIDO ASCORBICO)", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 335.00 },
{ codigo: "1143", nombre: "VITAMINA D ( 25 HIDROXI COLECALCIFEROL)", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 290.00 },
{ codigo: "1144", nombre: "VITAMINA D 1.25 DIHIDROXIVITAMINA", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 305.00 },
{ codigo: "1145", nombre: "VITAMINA D 25-HIDROXIVITAMINA TOTAL", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 180.00 },
{ codigo: "1146", nombre: "VITAMINA D TOTAL 25-HIDROXIVITAMINA D", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 147.00 },
{ codigo: "1147", nombre: "VITAMINA E (ALFA TOCOFEROL)", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 278.00 },
{ codigo: "1148", nombre: "VITAMINA E (ALFA TOCOFEROL), SUERO", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 170.00 },
{ codigo: "1149", nombre: "VON WILLEBRAND, ANTIGENO (VWFIAG)", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 623.00 },
{ codigo: "1150", nombre: "WESTERN BLOT HIV", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 350.00 },
{ codigo: "1151", nombre: "XILENO - ACIDO METILHIPURICO EN ORINA DE 24HRS", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 424.00 },
{ codigo: "1152", nombre: "XILENO, SANGRE TOTAL", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 357.00 },
{ codigo: "1153", nombre: "XILOSA, EXCRECION EN ORINA", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 104.00 },
{ codigo: "1154", nombre: "YODO PROTEICO (PBI)", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 203.00 },
{ codigo: "1155", nombre: "ZINC EN ORINA DE 24 HORAS", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 189.00 },
{ codigo: "1156", nombre: "ZINC SERICO", unidad: "", refMin: 0, refMax: 0, referencia: "<", precio: 160.00 },
];

let examenesSeleccionados = [];
let ordenesRegistradas = [];
let cajaMovimientos = [];

// Almacenamiento local para cotizaciones y órdenes
let cotizacionesGuardadas = JSON.parse(localStorage.getItem('cotizacionesGuardadas')) || [];
let ordenesLaboratorio = JSON.parse(localStorage.getItem('ordenesLaboratorio')) || [];

// ==========================================
// 1. NAVEGACIÓN FLUIDA ENTRE SECCIONES
// ==========================================
function cambiarSeccion(seccionId) {
  document.querySelectorAll('.seccion-sistema').forEach(sec => {
    sec.style.display = 'none';
  });
  const seccionActiva = document.getElementById(seccionId);
  if (seccionActiva) {
    seccionActiva.style.display = 'block';
  }
}

// ==========================================
// GUARDADO PERMANENTE EN ESTE EQUIPO
// ==========================================
const CLAVE_ALMACEN = "vitalhealth_datos_v1";

function persistirDatos() {
    try {
        localStorage.setItem(CLAVE_ALMACEN, JSON.stringify({
            ordenes: ordenesRegistradas,
            caja: cajaMovimientos,
            catalogo: examenesCatalogo
        }));
    } catch (error) {
        console.error("No se pudo guardar la información en este equipo:", error);
    }
}

function cargarDatosGuardados() {
    try {
        const crudo = localStorage.getItem(CLAVE_ALMACEN);
        if (!crudo) return;
        const datos = JSON.parse(crudo);
        if (Array.isArray(datos.ordenes)) ordenesRegistradas = datos.ordenes;
        if (Array.isArray(datos.caja)) cajaMovimientos = datos.caja;
        if (Array.isArray(datos.catalogo) && datos.catalogo.length) examenesCatalogo = datos.catalogo;
    } catch (error) {
        console.error("No se pudo leer la información guardada en este equipo:", error);
    }
}

function respaldarDatos() {
    const contenido = JSON.stringify({
        ordenes: ordenesRegistradas,
        caja: cajaMovimientos,
        catalogo: examenesCatalogo
    }, null, 2);
    const blob = new Blob([contenido], { type: "application/json" });
    const enlace = document.createElement("a");
    enlace.download = `Respaldo-VitalHealth-${new Date().toISOString().slice(0, 10)}.json`;
    enlace.href = URL.createObjectURL(blob);
    enlace.click();
    URL.revokeObjectURL(enlace.href);
}

function restaurarRespaldo(archivo) {
    const lector = new FileReader();
    lector.onload = () => {
        try {
            const datos = JSON.parse(lector.result);
            if (!Array.isArray(datos.ordenes)) {
                alert("El archivo no es un respaldo válido de Vital Health.");
                return;
            }
            ordenesRegistradas = datos.ordenes;
            cajaMovimientos = Array.isArray(datos.caja) ? datos.caja : [];
            if (Array.isArray(datos.catalogo) && datos.catalogo.length) examenesCatalogo = datos.catalogo;
            persistirDatos();
            cargarOrdenes();
            renderizarTablaCatalogo();
            actualizarTotalesCaja();
            alert("Respaldo restaurado correctamente.");
        } catch (error) {
            alert("El archivo no se pudo leer como respaldo válido.");
        }
    };
    lector.readAsText(archivo);
}

// ==========================================
// INICIALIZACIÓN Y NAVEGACIÓN (BOTONES DEL SIDEBAR)
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
    cargarDatosGuardados();
    ["logo.png", "firma-biologa.png"].forEach(src => {
        const imagen = new Image();
        imagen.src = src;
    });
    actualizarFechaActual();
    renderizarTablaCatalogo();
    cargarOrdenes();
    actualizarTotalesCaja();
    window.nubeIniciar?.();
});

function actualizarFechaActual() {
    const fechaEl = document.getElementById("current-date");
    if (fechaEl) {
        const opciones = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        fechaEl.textContent = new Date().toLocaleDateString('es-ES', opciones);
    }
}

function toggleSidebar() {
    const sidebar = document.getElementById("sidebar");
    const overlay = document.getElementById("sidebar-overlay");
    if (!sidebar) return;
    sidebar.classList.toggle("active");
    sidebar.classList.toggle("show");
    if (overlay) {
        overlay.classList.toggle("active");
        overlay.classList.toggle("show");
    }
}

function showSection(sectionId) {
    // 1. Ocultar todas las secciones (clase d-none + estilo inline)
    document.querySelectorAll('.section-content').forEach(sec => {
        sec.classList.add('d-none');
        sec.style.display = 'none';
    });

    // 2. Mostrar la sección seleccionada
    const target = document.getElementById(`sec-${sectionId}`);
    if (target) {
        target.classList.remove('d-none');
        target.style.display = 'block';
    }

    // 3. Actualizar enlaces activos del menú lateral
    document.querySelectorAll('.sidebar .nav-link').forEach(link => {
        link.classList.remove('active');
    });
    if (typeof event !== 'undefined' && event && event.currentTarget) {
        event.currentTarget.classList.add('active');
    }

    // 4. Cerrar sidebar en móviles si está abierto
    const sidebar = document.getElementById("sidebar");
    const overlay = document.getElementById("sidebar-overlay");
    if (sidebar) {
        sidebar.classList.remove('active');
        sidebar.classList.remove('show');
    }
    if (overlay) {
        overlay.classList.remove('active');
        overlay.classList.remove('show');
    }
}

// ==========================================
// MÓDULO DE RECEPCIÓN Y PACIENTES
// ==========================================
function buscarPaciente() {
    const dni = document.getElementById("pac-dni").value.trim();
    if (dni.length < 8) {
        alert("Ingrese un DNI o documento válido de al menos 8 dígitos.");
        return;
    }
    // Simulación de búsqueda o integración
    alert(`Buscando datos para el documento: ${dni}`);
}

function calcularEdad() {
    const fnacVal = document.getElementById("pac-fnac").value;
    if (!fnacVal) return;
    const fnac = new Date(fnacVal);
    const hoy = new Date();
    let edad = hoy.getFullYear() - fnac.getFullYear();
    const m = hoy.getMonth() - fnac.getMonth();
    if (m < 0 || (m === 0 && hoy.getDate() < fnac.getDate())) {
        edad--;
    }
    document.getElementById("pac-edad").value = `${edad} AÑOS`;
}

// ==========================================
// FILTRAR Y AGREGAR EXÁMENES
// ==========================================
function filtrarExamenes(query) {
    const contenedor = document.getElementById("sugerencias-examenes");
    if (!contenedor) return;
    contenedor.innerHTML = "";

    if (!query || query.trim() === "") {
        contenedor.style.display = "none";
        return;
    }

    const filtrados = examenesCatalogo.filter(ex => 
        ex.nombre.toLowerCase().includes(query.toLowerCase()) || 
        ex.codigo.toLowerCase().includes(query.toLowerCase())
    );

    if (filtrados.length === 0) {
        contenedor.style.display = "none";
        return;
    }

    contenedor.style.display = "block";
    filtrados.forEach(ex => {
        const item = document.createElement("a");
        item.href = "#";
        item.className = "list-group-item list-group-item-action py-2";
        item.innerHTML = `<strong>${ex.codigo}</strong> - ${ex.nombre} <span class="float-end text-primary">S/ ${Number(ex.precio || 0).toFixed(2)}</span>`;
        item.onclick = (e) => {
            e.preventDefault();
            agregarExamenSeleccionado(ex);
            document.getElementById("busqueda-examen").value = "";
            contenedor.style.display = "none";
        };
        contenedor.appendChild(item);
    });
}

function agregarExamenSeleccionado(ex) {
    const existente = examenesSeleccionados.find(item => item.codigo === ex.codigo);
    if (existente) {
        existente.cantidad += 1;
    } else {
        examenesSeleccionados.push({
            codigo: ex.codigo,
            nombre: ex.nombre,
            cantidad: 1,
            precio: Number(ex.precio || 0),
            unidad: ex.unidad || '',
            referencia: ex.referencia || ''
        });
    }
    renderizarTablaSeleccionados();
}

function cambiarCantidadExamen(codigo, nuevaCant) {
    const item = examenesSeleccionados.find(i => i.codigo === codigo);
    if (item) {
        item.cantidad = parseInt(nuevaCant) || 1;
        if (item.cantidad <= 0) item.cantidad = 1;
        renderizarTablaSeleccionados();
    }
}

function eliminarExamenSeleccionado(codigo) {
    examenesSeleccionados = examenesSeleccionados.filter(i => i.codigo !== codigo);
    renderizarTablaSeleccionados();
}

function renderizarTablaSeleccionados() {
    const tbody = document.querySelector("#tabla-examenes-seleccionados tbody");
    const totalCobrarEl = document.getElementById("total-cobrar");
    if (!tbody) return;

    tbody.innerHTML = "";

    if (examenesSeleccionados.length === 0) {
        tbody.innerHTML = `<tr id="empty-row"><td colspan="6" class="text-center text-muted py-4">No hay exámenes agregados.</td></tr>`;
        if (totalCobrarEl) totalCobrarEl.textContent = "0.00";
        return;
    }

    let total = 0;
    examenesSeleccionados.forEach(item => {
        const importe = item.cantidad * item.precio;
        total += importe;

        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${item.codigo}</td>
            <td>${item.nombre}</td>
            <td><input type="number" class="form-control form-control-sm" style="width: 70px;" value="${item.cantidad}" min="1" onchange="cambiarCantidadExamen('${item.codigo}', this.value)"></td>
            <td>S/ ${item.precio.toFixed(2)}</td>
            <td>S/ ${importe.toFixed(2)}</td>
            <td class="text-center"><button class="btn btn-sm btn-outline-danger" onclick="eliminarExamenSeleccionado('${item.codigo}')"><i class="bi bi-trash"></i></button></td>
        `;
        tbody.appendChild(tr);
    });

    if (totalCobrarEl) totalCobrarEl.textContent = total.toFixed(2);
}

// ==========================================
// REGISTRAR ORDEN Y GENERAR TICKET
// ==========================================
function guardarOrdenGenerarTicket() {
    const dni = document.getElementById("pac-dni").value.trim();
    const nombre = document.getElementById("pac-nombre").value.trim();
    const doctor = document.getElementById("pac-doctor").value.trim();
    const metodoPago = document.getElementById("metodo-pago").value;
    const edad = document.getElementById("pac-edad").value.trim();
    const sexo = document.getElementById("pac-sexo").value;

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
        nroOrden,
        fechaHora,
        dni,
        nombre,
        doctor,
        edad,
        sexo,
        metodoPago,
        examenes: [...examenesSeleccionados],
        total,
        estado: "Pendiente",
        en: Date.now()
    };

    ordenesRegistradas.unshift(nuevaOrden);

    // Registrar en caja
    const movimiento = {
        id: `${Date.now()}-${nroOrden}`,
        hora: new Date().toLocaleTimeString(),
        nroOrden,
        paciente: nombre,
        metodoPago,
        monto: total,
        en: Date.now()
    };
    cajaMovimientos.unshift(movimiento);

    actualizarTotalesCaja();
    cargarOrdenes();
    persistirDatos();
    window.nubeGuardarOrden?.(nuevaOrden);
    window.nubeGuardarMovimiento?.(movimiento);

    // Limpiar formulario
    document.getElementById("form-paciente").reset();
    document.getElementById("pac-edad").value = "";
    examenesSeleccionados = [];
    renderizarTablaSeleccionados();
    showSection('ordenes');
    mostrarTicket(nuevaOrden);
}

// ==========================================
// GESTIÓN DE ÓRDENES Y RESULTADOS
// ==========================================
function cargarOrdenes() {
    const tbody = document.getElementById("lista-ordenes-body");
    if (!tbody) return;

    tbody.innerHTML = "";
    if (ordenesRegistradas.length === 0) {
        tbody.innerHTML = `<tr><td colspan="6" class="text-center text-muted py-4">No hay órdenes registradas.</td></tr>`;
        return;
    }

    ordenesRegistradas.forEach(ord => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td class="fw-bold text-primary">${ord.nroOrden}</td>
            <td>${ord.fechaHora}</td>
            <td>${ord.dni}</td>
            <td>${ord.nombre}</td>
            <td><span class="badge bg-warning text-dark">${ord.estado}</span></td>
            <td class="text-end px-3">
                <button class="btn btn-sm btn-outline-secondary me-1" title="Reimprimir ticket" onclick="mostrarTicketPorNro('${ord.nroOrden}')"><i class="bi bi-receipt"></i></button>
                ${ord.resultados ? `<button class="btn btn-sm btn-outline-primary me-1" title="Imprimir informe de resultados" onclick="imprimirInforme('${ord.nroOrden}')"><i class="bi bi-file-ear-medical"></i> Informe</button>` : ""}
                ${ord.resultados ? `<button class="btn btn-sm btn-outline-danger me-1" title="Descargar informe en PDF" onclick="descargarInformePDF('${ord.nroOrden}')"><i class="bi bi-file-earmark-pdf"></i> PDF</button>` : ""}
                <button class="btn btn-sm btn-outline-primary me-1" onclick="abrirResultados('${ord.nroOrden}')"><i class="bi bi-file-earmark-medical"></i> Resultados</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

function abrirResultados(nroOrden) {
    const orden = ordenesRegistradas.find(o => o.nroOrden === nroOrden);
    if (!orden) return;

    showSection('resultados');
    const editor = document.getElementById("resultados-editor");
    if (!editor) return;

    let html = `
        <div class="alert alert-secondary d-flex justify-content-between align-items-center flex-wrap gap-2 small py-2">
            <div><strong>Orden:</strong> ${escapeHTML(orden.nroOrden)} | <strong>Paciente:</strong> ${escapeHTML(orden.nombre)} (${escapeHTML(orden.dni)})</div>
            <div>
                <button class="btn btn-success btn-sm" onclick="guardarResultados('${orden.nroOrden}')"><i class="bi bi-save me-1"></i> Guardar Resultados</button>
                <button class="btn btn-outline-primary btn-sm ms-1" onclick="imprimirInforme('${orden.nroOrden}')"><i class="bi bi-printer me-1"></i> Imprimir Informe</button>
                <button class="btn btn-outline-danger btn-sm ms-1" onclick="descargarInformePDF('${orden.nroOrden}')"><i class="bi bi-file-earmark-pdf me-1"></i> Descargar PDF</button>
            </div>
        </div>
        <div class="list-group">
    `;

    orden.examenes.forEach((ex, exIdx) => {
        const guardado = (orden.resultados || []).find(r => r.codigo === ex.codigo);
        const plantilla = obtenerPlantillaIndicadores(ex.nombre);
        const indicadores = plantilla || [{
            nombre: "Resultado del análisis",
            unidad: ex.unidad || "",
            refMin: ex.refMin ?? "",
            refMax: ex.refMax ?? "",
            referencia: ex.referencia || ""
        }];

        let filas = "";
        indicadores.forEach((ind, indIdx) => {
            const previo = guardado && guardado.indicadores[indIdx] ? guardado.indicadores[indIdx] : null;
            const referencia = ind.referencia || formatoRango(ind.refMin, ind.refMax);
            filas += `
                <div class="row g-2 mb-2 align-items-center" data-ex="${exIdx}" data-ind="${indIdx}" data-nombre="${escapeHTML(ind.nombre)}" data-refmin="${escapeHTML(ind.refMin ?? "")}" data-refmax="${escapeHTML(ind.refMax ?? "")}">
                    <div class="col-md-4"><label class="form-label small mb-0">${escapeHTML(ind.nombre)}</label></div>
                    <div class="col-md-2"><input type="text" class="form-control form-control-sm" data-campo="resultado" placeholder="Valor obtenido" value="${escapeHTML(previo ? previo.resultado : "")}"></div>
                    <div class="col-md-2"><input type="text" class="form-control form-control-sm bg-light" data-campo="unidad" value="${escapeHTML(ind.unidad || "")}" readonly></div>
                    <div class="col-md-4"><input type="text" class="form-control form-control-sm bg-light" data-campo="referencia" value="${escapeHTML(referencia)}" readonly></div>
                </div>
            `;
        });

        html += `
            <div class="list-group-item mb-3 shadow-sm border rounded">
                <h6 class="fw-bold text-primary">${escapeHTML(ex.nombre)} (${escapeHTML(ex.codigo)})</h6>
                ${filas}
            </div>
        `;
    });

    html += `</div>`;
    editor.innerHTML = html;
}

// ==========================================
// CATÁLOGO Y PLANTILLAS
// ==========================================
function prepararNuevoExamen() {
    document.getElementById("form-catalogo").reset();
    document.getElementById("cat-id-original").value = "";
    document.getElementById("catalogo-form-titulo").innerHTML = `<i class="bi bi-layout-text-window-reverse me-2"></i>Nuevo Examen`;
    document.getElementById("contenedor-indicadores").innerHTML = "";
}

function agregarIndicadorResultado() {
    const contenedor = document.getElementById("contenedor-indicadores");
    if (!contenedor) return;

    const div = document.createElement("div");
    div.className = "row g-2 mb-2 align-items-center indicador-row";
    div.innerHTML = `
        <div class="col-4"><input type="text" class="form-control form-control-sm" placeholder="Nombre parámetro"></div>
        <div class="col-3"><input type="text" class="form-control form-control-sm" placeholder="Unidad"></div>
        <div class="col-4"><input type="text" class="form-control form-control-sm" placeholder="Referencia"></div>
        <div class="col-1 text-center"><button type="button" class="btn btn-sm text-danger" onclick="this.closest('.row').remove()"><i class="bi bi-x-lg"></i></button></div>
    `;
    contenedor.appendChild(div);
}

function vaciarTodosLosIndicadores() {
    const contenedor = document.getElementById("contenedor-indicadores");
    if (contenedor) contenedor.innerHTML = "";
}

function guardarExamenCatalogo() {
    const codigo = document.getElementById("cat-codigo").value.trim();
    const nombre = document.getElementById("cat-nombre").value.trim();
    const precio = parseFloat(document.getElementById("cat-precio").value) || 0;
    const muestra = document.getElementById("cat-muestra").value;
    const metodo = document.getElementById("cat-metodo").value;
    const plantilla = document.getElementById("cat-plantilla").value;
    const refTexto = document.getElementById("cat-ref-texto").value;

    if (!codigo || !nombre) {
        alert("Complete el código y nombre del examen.");
        return;
    }

    const nuevoEx = { codigo, nombre, precio, muestra, metodo, plantilla, refTexto, en: Date.now() };
    
    // Verificar si ya existe para actualizar o agregar
    const index = examenesCatalogo.findIndex(e => e.codigo === codigo);
    if (index >= 0) {
        examenesCatalogo[index] = nuevoEx;
    } else {
        examenesCatalogo.push(nuevoEx);
    }

    renderizarTablaCatalogo();
    persistirDatos();
    window.nubeGuardarExamen?.(nuevoEx);
    alert("Examen guardado en el catálogo correctamente.");
    prepararNuevoExamen();
}

function renderizarTablaCatalogo(filtro = "") {
    const tbody = document.getElementById("tabla-catalogo-body");
    const countEl = document.getElementById("total-cat-count");
    if (!tbody) return;

    tbody.innerHTML = "";
    const filtrados = examenesCatalogo.filter(ex => 
        ex.nombre.toLowerCase().includes(filtro.toLowerCase()) || 
        ex.codigo.toLowerCase().includes(filtro.toLowerCase())
    );

    if (countEl) countEl.textContent = examenesCatalogo.length;

    if (filtrados.length === 0) {
        tbody.innerHTML = `<tr><td colspan="5" class="text-center text-muted py-3">No hay exámenes en el catálogo.</td></tr>`;
        return;
    }

    filtrados.forEach(ex => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${ex.codigo}</td>
            <td class="fw-semibold">${ex.nombre}</td>
            <td><span class="badge bg-light text-dark border">Plantilla</span></td>
            <td>S/ ${Number(ex.precio || 0).toFixed(2)}</td>
            <td class="text-end">
                <!-- Botón de Editar -->
                <button class="btn btn-sm btn-outline-primary me-1" onclick="editarExamenCatalogo('${ex.codigo}')" title="Editar">
                    <i class="bi bi-pencil"></i>
                </button>
                <!-- Botón de Borrar / Eliminar -->
                <button class="btn btn-sm btn-outline-danger" onclick="eliminarExamenCatalogo('${ex.codigo}')" title="Eliminar">
                    <i class="bi bi-trash"></i>
                </button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

function eliminarExamenCatalogo(codigo) {
    if (confirm(`¿Estás seguro de eliminar el examen con código ${codigo} del catálogo?`)) {
        // Filtramos el array excluyendo el examen que coincide con el código
        examenesCatalogo = examenesCatalogo.filter(e => e.codigo !== codigo);
        
        // Volvemos a pintar la tabla para reflejar el cambio
        renderizarTablaCatalogo();
        
        // Guardamos los cambios en tus funciones de persistencia y localStorage
        if (typeof persistirDatos === 'function') {
            persistirDatos();
        }
        localStorage.setItem('examenesCatalogo', JSON.stringify(examenesCatalogo));
        
        alert("Examen eliminado del catálogo correctamente.");
    }
}

function editarExamenCatalogo(codigo) {
    const ex = examenesCatalogo.find(e => e.codigo === codigo);
    if (!ex) return;

    document.getElementById("cat-codigo").value = ex.codigo;
    document.getElementById("cat-id-original").value = ex.codigo;
    document.getElementById("cat-nombre").value = ex.nombre;
    document.getElementById("cat-precio").value = ex.precio || 0;
    document.getElementById("cat-muestra").value = ex.muestra || "";
    document.getElementById("cat-metodo").value = ex.metodo || "";
    document.getElementById("cat-plantilla").value = ex.plantilla || "personalizada";
    document.getElementById("cat-ref-texto").value = ex.refTexto || "";
    document.getElementById("catalogo-form-titulo").innerHTML = `<i class="bi bi-pencil-square me-2"></i>Editar Examen: ${ex.codigo}`;
}
function eliminarExamenCatalogo(index) {
  if (confirm("¿Estás seguro de eliminar este examen del catálogo?")) {
    examenesCatalogo.splice(index, 1);
    renderizarTablaCatalogo();
    persistirDatos();
    // Actualizar almacenamiento si usas localStorage para el catálogo
    localStorage.setItem('examenesCatalogo', JSON.stringify(examenesCatalogo));
  }
}
// ==========================================
// 3. BÚSQUEDA Y FILTRADO POR FECHA DE ÓRDENES
// ==========================================
function filtrarOrdenes() {
  const textoBusqueda = document.getElementById('inputBusquedaOrdenes').value.toLowerCase();
  const fechaFiltro = document.getElementById('inputFechaOrdenes').value;

  const ordenesFiltradas = ordenesLaboratorio.filter(orden => {
    const coincideTexto = orden.paciente.toLowerCase().includes(textoBusqueda) || 
                          orden.codigo.toLowerCase().includes(textoBusqueda);
    const coincideFecha = fechaFiltro ? orden.fecha === fechaFiltro : true;
    return coincideTexto && coincideFecha;
  });

  renderizarTablaOrdenes(ordenesFiltradas);
}

function renderizarTablaOrdenes(lista = ordenesLaboratorio) {
  const contenedor = document.getElementById('tablaOrdenesBody');
  if (!contenedor) return;

  contenedor.innerHTML = '';
  lista.forEach(orden => {
    contenedor.innerHTML += `
      <tr>
        <td>${orden.fecha}</td>
        <td>${orden.codigo}</td>
        <td>${orden.paciente}</td>
        <td>${orden.detalles}</td>
      </tr>
    `;
  });
}

// ==========================================
// COTIZACIÓN RÁPIDA Y GESTIÓN DE COTIZACIONES
// ==========================================

function buscarPaciente() {
    const dni = document.getElementById("pac-dni").value.trim();
    if (dni.length < 8) {
        alert("Ingrese un DNI o documento válido de al menos 8 dígitos.");
        return;
    }
    // Simulación de búsqueda o integración
    alert(`Buscando datos para el documento: ${dni}`);
}

function calcularEdad() {
    const fnacVal = document.getElementById("pac-fnac").value;
    if (!fnacVal) return;
    const fnac = new Date(fnacVal);
    const hoy = new Date();
    let edad = hoy.getFullYear() - fnac.getFullYear();
    const m = hoy.getMonth() - fnac.getMonth();
    if (m < 0 || (m === 0 && hoy.getDate() < fnac.getDate())) {
        edad--;
    }
    document.getElementById("pac-edad").value = `${edad} AÑOS`;
}

let carritoCotizacion = [];

document.addEventListener('DOMContentLoaded', () => {
    if (typeof renderizarCotizacionesGuardadas === 'function') {
        renderizarCotizacionesGuardadas();
    }
});

// Cargar las cotizaciones guardadas en la tabla al iniciar la aplicación de forma segura
document.addEventListener('DOMContentLoaded', () => {
    if (typeof renderizarCotizacionesGuardadas === 'function') {
        renderizarCotizacionesGuardadas();
    }
});

function agregarItemCotizacion(codigoExamen) {
    if (typeof examenesCatalogo === 'undefined') {
        console.error("El catálogo de exámenes no está definido.");
        return;
    }
    const examenEncontrado = examenesCatalogo.find(e => e.codigo === codigoExamen);
    if (examenEncontrado) {
        carritoCotizacion.push(examenEncontrado);
        actualizarVistaCotizacionRapida();
    } else {
        alert("No se encontró el examen en el catálogo.");
    }
}

function actualizarVistaCotizacionRapida() {
    const contenedor = document.getElementById('detalleCotizacionBody');
    const totalSpan = document.getElementById('totalCotizacion');
    if (!contenedor) return;

    contenedor.innerHTML = '';
    let total = 0;

    if (carritoCotizacion.length === 0) {
        contenedor.innerHTML = `<tr><td colspan="3" class="text-center text-muted">No hay exámenes agregados.</td></tr>`;
        if (totalSpan) totalSpan.innerText = `S/ 0.00`;
        return;
    }

    carritoCotizacion.forEach((item, index) => {
        total += Number(item.precio || 0);
        contenedor.innerHTML += `
            <tr>
                <td>${item.nombre}</td>
                <td>S/ ${Number(item.precio || 0).toFixed(2)}</td>
                <td><button class="btn btn-sm btn-danger" type="button" onclick="removerItemCotizacion(${index})">X</button></td>
            </tr>
        `;
    });

    if (totalSpan) totalSpan.innerText = `S/ ${total.toFixed(2)}`;
}

function removerItemCotizacion(index) {
    carritoCotizacion.splice(index, 1);
    actualizarVistaCotizacionRapida();
}

function guardarCotizacion() {
    const inputPaciente = document.getElementById('nombrePacienteCotizacion');
    const nombrePaciente = inputPaciente ? inputPaciente.value.trim() : '';
    
    if (!nombrePaciente) {
        alert("Por favor ingrese el nombre del paciente para guardar la cotización.");
        return;
    }
    if (carritoCotizacion.length === 0) {
        alert("La cotización está vacía.");
        return;
    }

    const totalCotizacion = carritoCotizacion.reduce((acc, curr) => acc + Number(curr.precio || 0), 0);
    const nuevaCotizacion = {
        id: Date.now(),
        fecha: new Date().toISOString().split('T')[0],
        paciente: nombrePaciente,
        items: [...carritoCotizacion],
        total: totalCotizacion
    };

    cotizacionesGuardadas.push(nuevaCotizacion);
    localStorage.setItem('cotizacionesGuardadas', JSON.stringify(cotizacionesGuardadas));

    alert("¡Cotización guardada exitosamente!");
    carritoCotizacion = [];
    if (inputPaciente) inputPaciente.value = '';
    actualizarVistaCotizacionRapida();
    renderizarCotizacionesGuardadas();
}

function renderizarCotizacionesGuardadas(lista = cotizacionesGuardadas) {
    const contenedor = document.getElementById('listaCotizacionesGuardadasBody');
    if (!contenedor) return;

    const textoBusq = document.getElementById('busqCotizaciones')?.value.toLowerCase() || '';
    const fechaBusq = document.getElementById('fechaCotizaciones')?.value || '';

    const filtradas = lista.filter(cot => {
        const coincideTexto = cot.paciente.toLowerCase().includes(textoBusq);
        const coincideFecha = fechaBusq ? cot.fecha === fechaBusq : true;
        return coincideTexto && coincideFecha;
    });

    contenedor.innerHTML = '';
    if (filtradas.length === 0) {
        contenedor.innerHTML = `<tr><td colspan="4" class="text-center text-muted">No hay cotizaciones registradas.</td></tr>`;
        return;
    }

    filtradas.forEach(cot => {
        contenedor.innerHTML += `
            <tr>
                <td>${cot.fecha}</td>
                <td>${cot.paciente}</td>
                <td>S/ ${Number(cot.total || 0).toFixed(2)}</td>
                <td>
                    <button class="btn btn-sm btn-info" type="button" onclick="verDetalleCotizacion(${cot.id})">Ver</button>
                </td>
            </tr>
        `;
    });
}

function verDetalleCotizacion(id) {
    const cot = cotizacionesGuardadas.find(c => c.id === id);
    if (!cot) return;
    let detalleStr = `Paciente: ${cot.paciente}\nFecha: ${cot.fecha}\nExámenes:\n`;
    cot.items.forEach(i => {
        detalleStr += `- ${i.nombre}: S/ ${Number(i.precio || 0).toFixed(2)}\n`;
    });
    detalleStr += `TOTAL: S/ ${Number(cot.total || 0).toFixed(2)}`;
    alert(detalleStr);
}

// ==========================================
// CONTROL DE CAJA
// ==========================================
function actualizarTotalesCaja() {
    let totalHoy = 0;
    let efectivo = 0;
    let digital = 0;

    cajaMovimientos.forEach(m => {
        totalHoy += m.monto;
        if (m.metodoPago === "Efectivo") {
            efectivo += m.monto;
        } else {
            digital += m.monto;
        }
    });

    document.getElementById("caja-total-hoy").textContent = totalHoy.toFixed(2);
    document.getElementById("caja-efectivo").textContent = efectivo.toFixed(2);
    document.getElementById("caja-digital").textContent = digital.toFixed(2);

    const tbody = document.getElementById("caja-tabla-body");
    if (!tbody) return;

    tbody.innerHTML = "";
    if (cajaMovimientos.length === 0) {
        tbody.innerHTML = `<tr><td colspan="5" class="text-center text-muted py-3">No hay movimientos registrados hoy.</td></tr>`;
        return;
    }

    cajaMovimientos.forEach(m => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${m.hora}</td>
            <td class="fw-bold">${m.nroOrden}</td>
            <td>${m.paciente}</td>
            <td><span class="badge bg-info text-dark">${m.metodoPago}</span></td>
            <td class="fw-bold text-success">S/ ${m.monto.toFixed(2)}</td>
        `;
        tbody.appendChild(tr);
    });
}
// ==========================================
// UTILIDADES DE IMPRESIÓN Y RESULTADOS
// ==========================================
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

function obtenerPlantillaIndicadores(nombreExamen) {
    const normalizado = (nombreExamen || "").toUpperCase();
    const alias = {
        "HEMOGRAMA": ["HEMOGRAMA"],
        "PERFIL LIPIDICO": ["PERFIL LIPIDICO", "PERFIL DE LIPIDOS", "LIPIDICO"],
        "PERFIL HEPATICO": ["PERFIL HEPATICO", "PERFIL DE HEPATICO", "HEPATICO"]
    };
    for (const clave in alias) {
        const coincide = alias[clave].some(palabra => normalizado.includes(palabra));
        if (coincide && BASE_VALORES_REFERENCIALES[clave]) {
            return BASE_VALORES_REFERENCIALES[clave];
        }
    }
    return null;
}

function marcarRango(resultado, refMin, refMax) {
    const num = parseFloat(String(resultado).replace(",", "."));
    if (resultado === "" || resultado === null || isNaN(num)) return "";
    const min = parseFloat(refMin);
    const max = parseFloat(refMax);
    if (!isNaN(min) && num < min) return " ↓";
    if (!isNaN(max) && num > max) return " ↑";
    return "";
}

// ==========================================
// TICKET DE VENTA (TICKETERA TÉRMICA 58mm)
// ==========================================
function construirTicketHTML(orden) {
    const fechaHora = String(orden.fechaHora || "").split(", ");
    const fecha = fechaHora[0] || "";
    const hora = fechaHora[1] || "";

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

    const datoExtra = orden.doctor
        ? `<div class="t-row"><span>Médico:</span><span>${escapeHTML(orden.doctor)}</span></div>`
        : "";

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
            ${datoExtra}
            <div class="t-linea"></div>
            <div class="t-cabecera-items t-negrita">
                <span>CANT</span><span>DESCRIPCION</span><span>IMPORTE</span>
            </div>
            <div class="t-linea"></div>
            ${lineas}
            <div class="t-linea"></div>
            <div class="t-row t-negrita t-total"><span>TOTAL S/</span><span>${Number(orden.total).toFixed(2)}</span></div>
            <div class="t-row"><span>Pago:</span><span>${escapeHTML(orden.metodoPago)}</span></div>
            <div class="t-linea-doble"></div>
            <div class="t-centro t-obs">¡Gracias por su preferencia!</div>
            <div class="t-centro t-obs">Conserve este ticket para recoger</div>
            <div class="t-centro t-obs">sus resultados de laboratorio</div>
            <div class="t-centro t-obs">"Análisis de calidad para el</div>
            <div class="t-centro t-obs">cuidado de tu salud"</div>
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
    if (modalEl && window.bootstrap) {
        bootstrap.Modal.getOrCreateInstance(modalEl).show();
    } else {
        imprimirTicket();
    }
}

function descargarTicketPNG() {
    const nodo = document.querySelector("#modal-ticket-body .ticket-visual");
    const orden = window._ticketActual;

    if (!nodo || !orden) {
        alert("Primero registre una orden para poder descargar su ticket.");
        return;
    }
    if (typeof window.html2canvas !== "function") {
        alert("No se pudo cargar la librería de descarga. Revise su conexión a internet y vuelva a intentar.");
        return;
    }

    window.html2canvas(nodo, { scale: 3, backgroundColor: "#ffffff", useCORS: true }).then(canvas => {
        const enlace = document.createElement("a");
        enlace.download = `Ticket-${orden.nroOrden}.png`;
        enlace.href = canvas.toDataURL("image/png");
        enlace.click();
    }).catch(() => {
        alert("No se pudo generar la imagen del ticket.");
    });
}

function mostrarTicketPorNro(nroOrden) {
    const orden = ordenesRegistradas.find(o => o.nroOrden === nroOrden);
    if (orden) mostrarTicket(orden);
}

function ajustarPaginaTicket() {
    const visual = document.querySelector("#modal-ticket-body .ticket-visual");
    let altoMm = 200;
    if (visual && visual.scrollHeight > 0) {
        altoMm = Math.ceil((visual.scrollHeight * 25.4) / 96) + 10;
    }

    let estilo = document.getElementById("estilo-pagina-ticket");
    if (!estilo) {
        estilo = document.createElement("style");
        estilo.id = "estilo-pagina-ticket";
        document.head.appendChild(estilo);
    }
    estilo.textContent = `@page ticket { size: 58mm ${altoMm}mm; margin: 3mm 2mm; }`;
}

function imprimirTicket() {
    ajustarPaginaTicket();
    const modalEl = document.getElementById("modalTicket");
    if (modalEl && window.bootstrap) {
        bootstrap.Modal.getInstance(modalEl)?.hide();
    }
    const zona = document.getElementById("zona-impresion");
    if (zona) {
        esperarImagenes(zona).then(() => imprimirZona());
    } else {
        imprimirZona();
    }
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

// ==========================================
// GUARDADO E IMPRESIÓN DE RESULTADOS (A4)
// ==========================================
function guardarResultados(nroOrden, silencioso = false) {
    const orden = ordenesRegistradas.find(o => o.nroOrden === nroOrden);
    const editor = document.getElementById("resultados-editor");
    if (!orden || !editor) return false;

    const grupos = editor.querySelectorAll("[data-ex]");
    if (!grupos.length) return false;

    const porExamen = {};
    grupos.forEach(fila => {
        const exIdx = fila.dataset.ex;
        if (!porExamen[exIdx]) porExamen[exIdx] = [];
        const leer = campo => {
            const el = fila.querySelector(`[data-campo="${campo}"]`);
            return el ? el.value.trim() : "";
        };
        porExamen[exIdx].push({
            nombre: fila.dataset.nombre || "Resultado",
            resultado: leer("resultado"),
            unidad: leer("unidad"),
            refMin: fila.dataset.refmin || "",
            refMax: fila.dataset.refmax || "",
            referencia: leer("referencia")
        });
    });

    orden.resultados = Object.keys(porExamen).sort((a, b) => a - b).map(exIdx => {
        const base = orden.examenes[parseInt(exIdx, 10)];
        const catalogo = examenesCatalogo.find(c => c.codigo === base.codigo);
        return {
            codigo: base.codigo,
            nombre: base.nombre,
            metodo: (catalogo && catalogo.metodo) || "",
            indicadores: porExamen[exIdx]
        };
    });
    orden.estado = "Resultados listos";
    orden.en = Date.now();
    cargarOrdenes();
    persistirDatos();
    window.nubeGuardarOrden?.(orden);

    if (!silencioso) {
        alert(`Resultados guardados correctamente para la orden ${nroOrden}.`);
    }
    return true;
}

function construirInformeHTML(orden) {
    const fechaEmision = new Date().toLocaleDateString("es-PE", { day: "2-digit", month: "2-digit", year: "numeric" });
    const horaEmision = new Date().toLocaleTimeString("es-PE", { hour: "2-digit", minute: "2-digit" });

    let tablas = "";
    (orden.resultados || []).forEach(ex => {
        let filas = "";
        ex.indicadores.forEach(ind => {
            const flag = marcarRango(ind.resultado, ind.refMin, ind.refMax);
            const rango = formatoRango(ind.refMin, ind.refMax);
            const clase = flag.indexOf("↑") >= 0 ? "res-flag res-alto" : (flag.indexOf("↓") >= 0 ? "res-flag res-bajo" : "res-flag");
            const celdasRango = rango
                ? `<td class="td-centro">${escapeHTML(ind.refMin)}</td><td class="td-centro">${escapeHTML(ind.refMax)}</td>`
                : `<td colspan="2" class="td-centro">${escapeHTML(ind.referencia || "")}</td>`;
            filas += `
                <tr>
                    <td>${escapeHTML(ind.nombre)}</td>
                    <td class="${clase} td-centro">${escapeHTML(ind.resultado || "______")}${flag}</td>
                    <td class="td-centro">${escapeHTML(ind.unidad || "")}</td>
                    ${celdasRango}
                </tr>
            `;
        });

        tablas += `
            <table class="informe-tabla">
                <tr class="informe-examen-titulo">
                    <th colspan="5">${escapeHTML(ex.nombre)} (${escapeHTML(ex.codigo)})${ex.metodo ? `<span class="informe-metodo">Método: ${escapeHTML(ex.metodo)}</span>` : ""}</th>
                </tr>
                <thead>
                    <tr>
                        <th style="width:36%">Indicador</th>
                        <th class="th-centro" style="width:16%">Resultado</th>
                        <th class="th-centro" style="width:12%">Unidad</th>
                        <th class="th-centro" style="width:18%">V. Mínimo</th>
                        <th class="th-centro" style="width:18%">V. Máximo</th>
                    </tr>
                </thead>
                <tbody>${filas}</tbody>
            </table>
        `;
    });

    const nota = `Los valores de referencia son orientativos y deben interpretarse según la clínica del paciente. Los resultados corresponden únicamente a la muestra analizada.`;

    return `
        <div class="informe-cabecera">
            <img src="logo.png" alt="Centro Médico Vital Health" class="informe-logo" onerror="this.style.display='none'">
            <h1>CENTRO MEDICO VITAL HEALTH</h1>
            <p><strong>Laboratorio Clínico</strong></p>
            <p>Av. Grau N° 1799 - Veintiséis de Octubre &nbsp;|&nbsp; WhatsApp: 984 089 927</p>
        </div>

        <div class="informe-titulo">INFORME DE RESULTADOS DE LABORATORIO</div>

        <div class="informe-datos">
            <div class="dato dato-ancho"><span class="dato-rotulo">Paciente</span><span class="dato-valor">${escapeHTML(orden.nombre)}</span></div>
            <div class="dato"><span class="dato-rotulo">DNI</span><span class="dato-valor">${escapeHTML(orden.dni)}</span></div>
            <div class="dato"><span class="dato-rotulo">Edad</span><span class="dato-valor">${escapeHTML(orden.edad || "—")}</span></div>
            <div class="dato"><span class="dato-rotulo">Sexo</span><span class="dato-valor">${escapeHTML(orden.sexo || "—")}</span></div>
            <div class="dato"><span class="dato-rotulo">Médico solicitante</span><span class="dato-valor">${escapeHTML(orden.doctor || "Particular")}</span></div>
            <div class="dato"><span class="dato-rotulo">N° de orden</span><span class="dato-valor">${escapeHTML(orden.nroOrden)}</span></div>
            <div class="dato"><span class="dato-rotulo">Toma de muestra</span><span class="dato-valor">${escapeHTML(orden.fechaHora || "")}</span></div>
            <div class="dato"><span class="dato-rotulo">Fecha de informe</span><span class="dato-valor">${fechaEmision} ${horaEmision}</span></div>
            <div class="dato"><span class="dato-rotulo">Exámenes incluidos</span><span class="dato-valor">${(orden.resultados || []).length}</span></div>
        </div>

        ${tablas}

        <div class="informe-nota">Nota: ${nota}</div>

        <div class="informe-firma">
            <img src="firma-biologa.png" alt="Firma" class="informe-firma-img" onerror="this.style.display='none'">
            <div class="informe-firma-linea"></div>
            <div class="informe-firma-nombre">FIRMA DE LA BIÓLOGA</div>
            <div class="informe-firma-det">Bióloga Responsable del Laboratorio &bull; Centro Médico Vital Health</div>
        </div>

        <div class="informe-pie-fijo">
            <div><strong>CENTRO MEDICO VITAL HEALTH</strong> &nbsp;|&nbsp; <strong>984 089 927</strong> &nbsp;|&nbsp; SERVICIO A DOMICILIO</div>
            <div>Av. Grau N° 1799 - Veintiséis de Octubre &nbsp;&bull;&nbsp; "Análisis de calidad para el cuidado de tu salud"</div>
        </div>
    `;
}

function imprimirInforme(nroOrden) {
    const orden = ordenesRegistradas.find(o => o.nroOrden === nroOrden);
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

function descargarInformePDF(nroOrden) {
    const orden = ordenesRegistradas.find(o => o.nroOrden === nroOrden);
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

    const contenedor = document.createElement("div");
    contenedor.style.position = "absolute";
    contenedor.style.left = "-10000px";
    contenedor.style.top = "0";
    contenedor.style.width = "794px";
    contenedor.style.background = "#ffffff";
    contenedor.innerHTML = `<div class="informe-print">${construirInformeHTML(orden)}</div>`;
    document.body.appendChild(contenedor);

    const hoja = contenedor.querySelector(".informe-print");
    hoja.querySelectorAll(".informe-pie-fijo").forEach(el => {
        el.classList.remove("informe-pie-fijo");
        el.classList.add("informe-pie-estatico");
    });

    window.html2canvas(hoja, { scale: 2, backgroundColor: "#ffffff", useCORS: true }).then(canvas => {
        const pdf = new window.jspdf.jsPDF("p", "mm", "a4");
        const anchoHoja = 210;
        const altoHoja = 297;
        const margen = 10;
        const anchoUtil = anchoHoja - margen * 2;
        const altoImagen = canvas.height * anchoUtil / canvas.width;
        const altoUtil = altoHoja - margen * 2;

        let restante = altoImagen;
        let posicion = 0;
        let pagina = 0;

        while (restante > 0) {
            if (pagina > 0) pdf.addPage();
            pdf.addImage(canvas.toDataURL("image/jpeg", 0.95), "JPEG", margen, margen - posicion, anchoUtil, altoImagen);
            posicion += altoUtil;
            restante -= altoUtil;
            pagina++;
        }

        pdf.save(`Informe-Resultados-${orden.nroOrden}.pdf`);
    }).catch(() => {
        alert("No se pudo generar el PDF del informe.");
    }).finally(() => {
        contenedor.remove();
    });
}
// ==========================================
// LÓGICA DE COTIZACIONES
// ==========================================
let listaCotizacion = [];

// Función para agregar un examen al carrito de cotización
function agregarACotizacion(codigoExamen) {
  const examen = examenesCatalogo.find(e => e.codigo === codigoExamen);
  if (examen) {
    // Evitar duplicados o incrementar cantidad si lo deseas
    const existe = listaCotizacion.find(e => e.codigo === codigoExamen);
    if (!existe) {
      listaCotizacion.push({ ...examen, cantidad: 1 });
      actualizarVistaCotizacion();
    }
  }
}

// Función para eliminar un ítem de la cotización
function eliminarDeCotizacion(codigoExamen) {
  listaCotizacion = listaCotizacion.filter(e => e.codigo !== codigoExamen);
  actualizarVistaCotizacion();
}

// Función para renderizar la sección de cotizaciones en el HTML
function actualizarVistaCotizacion() {
  const contenedorTabla = document.getElementById('tabla-cotizacion-body');
  const contenedorTotal = document.getElementById('total-cotizacion');
  
  if (!contenedorTabla) return;

  contenedorTabla.innerHTML = '';
  let subtotalGeneral = 0;

  listaCotizacion.forEach(item => {
    let totalItem = item.precio * item.cantidad;
    subtotalGeneral += totalItem;

    const fila = document.createElement('tr');
    fila.innerHTML = `
      <td>${item.nombre}</td>
      <td>S/ ${item.precio.toFixed(2)}</td>
      <td>${item.cantidad}</td>
      <td>S/ ${totalItem.toFixed(2)}</td>
      <td><button onclick="eliminarDeCotizacion('${item.codigo}')">Eliminar</button></td>
    `;
    contenedorTabla.appendChild(fila);
  });

  if (contenedorTotal) {
    contenedorTotal.textContent = `S/ ${subtotalGeneral.toFixed(2)}`;
  }
}

// ==========================================
// CONTROL DE NAVEGACIÓN Y BOTONES
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
  const fechaActualEl = document.getElementById("current-date");
  if (fechaActualEl) {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    fechaActualEl.textContent = new Date().toLocaleDateString('es-ES', options);
  }
});




// ==========================================
// COTIZACIÓN INDEPENDIENTE (sec-cotizacion)
// ==========================================
let listaCotizacionInd = [];

function filtrarExamenesCotizacion(query) {
    const contenedor = document.getElementById("sugerencias-examenes-cotizacion");
    if (!contenedor) return;
    contenedor.innerHTML = "";

    if (!query || query.trim() === "") {
        contenedor.style.display = "none";
        return;
    }

    const filtrados = examenesCatalogo.filter(ex =>
        ex.nombre.toLowerCase().includes(query.toLowerCase()) ||
        ex.codigo.toLowerCase().includes(query.toLowerCase())
    );

    if (filtrados.length === 0) {
        contenedor.style.display = "none";
        return;
    }

    contenedor.style.display = "block";
    filtrados.forEach(ex => {
        const item = document.createElement("a");
        item.href = "#";
        item.className = "list-group-item list-group-item-action py-2";
        item.innerHTML = `<strong>${ex.codigo}</strong> - ${ex.nombre} <span class="float-end text-primary">S/ ${Number(ex.precio || 0).toFixed(2)}</span>`;
        item.onclick = (e) => {
            e.preventDefault();
            agregarExamenCotizacion(ex);
            document.getElementById("busqueda-examen-cotizacion").value = "";
            contenedor.style.display = "none";
        };
        contenedor.appendChild(item);
    });
}

function agregarExamenCotizacion(ex) {
    const existente = listaCotizacionInd.find(i => i.codigo === ex.codigo);
    if (existente) {
        existente.cantidad += 1;
    } else {
        listaCotizacionInd.push({
            codigo: ex.codigo,
            nombre: ex.nombre,
            cantidad: 1,
            precio: Number(ex.precio || 0)
        });
    }
    renderizarTablaCotizacion();
}

function cambiarCantidadCotizacion(codigo, nuevaCant) {
    const item = listaCotizacionInd.find(i => i.codigo === codigo);
    if (item) {
        item.cantidad = parseInt(nuevaCant) || 1;
        if (item.cantidad <= 0) item.cantidad = 1;
        renderizarTablaCotizacion();
    }
}

function eliminarExamenCotizacion(codigo) {
    listaCotizacionInd = listaCotizacionInd.filter(i => i.codigo !== codigo);
    renderizarTablaCotizacion();
}

function renderizarTablaCotizacion() {
    const tbody = document.querySelector("#tabla-cotizacion-independiente tbody");
    const totalEl = document.getElementById("total-cotizacion");
    if (!tbody) return;

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
            <td>${item.codigo}</td>
            <td>${item.nombre}</td>
            <td><input type="number" class="form-control form-control-sm" style="width: 70px;" value="${item.cantidad}" min="1" onchange="cambiarCantidadCotizacion('${item.codigo}', this.value)"></td>
            <td>S/ ${item.precio.toFixed(2)}</td>
            <td>S/ ${importe.toFixed(2)}</td>
            <td class="text-center"><button class="btn btn-sm btn-outline-danger" onclick="eliminarExamenCotizacion('${item.codigo}')"><i class="bi bi-trash"></i></button></td>
        `;
        tbody.appendChild(tr);
    });

    if (totalEl) totalEl.textContent = total.toFixed(2);
}

function imprimirCotizacion() {
    if (listaCotizacionInd.length === 0) {
        alert("No hay exámenes en la cotización para imprimir.");
        return;
    }
    const total = listaCotizacionInd.reduce((acc, i) => acc + i.cantidad * i.precio, 0);
    const convenio = document.getElementById("tipo-convenio-cotizacion")?.value || "Particular";
    const fecha = new Date().toLocaleDateString("es-PE");

    let filas = "";
    listaCotizacionInd.forEach(i => {
        filas += `<tr><td>${escapeHTML(i.nombre)}</td><td style="text-align:center">${i.cantidad}</td><td style="text-align:right">S/ ${i.precio.toFixed(2)}</td><td style="text-align:right">S/ ${(i.cantidad * i.precio).toFixed(2)}</td></tr>`;
    });

    const zona = document.getElementById("zona-impresion");
    if (!zona) return;
    zona.innerHTML = `
        <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 700px; margin: 0 auto;">
            <div style="text-align:center; border-bottom: 2px solid #0d6efd; padding-bottom: 10px; margin-bottom: 15px;">
                <h2 style="margin:0; color:#0d6efd;">CENTRO MÉDICO VITAL HEALTH</h2>
                <div>Laboratorio Clínico &nbsp;|&nbsp; Av. Grau N° 1799 - Veintiséis de Octubre</div>
                <div>WhatsApp: 984 089 927</div>
            </div>
            <h3 style="text-align:center;">COTIZACIÓN DE EXÁMENES</h3>
            <div style="margin-bottom: 10px;"><strong>Fecha:</strong> ${fecha} &nbsp;|&nbsp; <strong>Tipo:</strong> ${escapeHTML(convenio)}</div>
            <table style="width:100%; border-collapse: collapse;" border="1" cellpadding="6">
                <thead>
                    <tr style="background:#e7f1ff;">
                        <th>Examen</th><th>Cant.</th><th>P. Unit.</th><th>Importe</th>
                    </tr>
                </thead>
                <tbody>${filas}</tbody>
                <tfoot>
                    <tr>
                        <td colspan="3" style="text-align:right; font-weight:bold;">TOTAL</td>
                        <td style="text-align:right; font-weight:bold;">S/ ${total.toFixed(2)}</td>
                    </tr>
                </tfoot>
            </table>
            <p style="margin-top: 15px; font-size: 12px; color: #555;">Cotización válida por 7 días. Los precios pueden variar según convenio.</p>
        </div>
    `;
    imprimirZona();
}

function pasarCotizacionARecepcion() {
    if (listaCotizacionInd.length === 0) {
        alert("No hay exámenes en la cotización para pasar a admisión.");
        return;
    }
    listaCotizacionInd.forEach(item => {
        const existente = examenesSeleccionados.find(i => i.codigo === item.codigo);
        if (existente) {
            existente.cantidad += item.cantidad;
        } else {
            const catalogo = examenesCatalogo.find(c => c.codigo === item.codigo);
            examenesSeleccionados.push({
                codigo: item.codigo,
                nombre: item.nombre,
                cantidad: item.cantidad,
                precio: item.precio,
                unidad: catalogo ? catalogo.unidad || '' : '',
                referencia: catalogo ? catalogo.referencia || '' : ''
            });
        }
    });
    listaCotizacionInd = [];
    renderizarTablaCotizacion();
    renderizarTablaSeleccionados();
    showSection('recepcion');
    alert("Cotización pasada a admisión. Complete los datos del paciente y registre la orden.");
}
