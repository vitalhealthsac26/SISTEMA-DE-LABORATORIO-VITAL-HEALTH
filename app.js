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
   { codigo: "5", nombre: "11 - DESOXICORTISOL (COMPUESTOS)", unidad: "ng/dL", refMin: 10, refMax: 138, referencia: "< 138 ng/dL" },
  { codigo: "6", nombre: "17 - HIDROXICORTICOIDES (ORINA 24H)", unidad: "mg/24h", refMin: 3.0, refMax: 12.0, referencia: "3.0 - 12.0 mg/24h" },
  { codigo: "7", nombre: "17 KETOESTEROIDES (ORINA 24 HRS.)", unidad: "mg/24h", refMin: 6.0, refMax: 20.0, referencia: "6.0 - 20.0 mg/24h" },
  { codigo: "8", nombre: "17 OH PROGESTERONA BASAL, 30 Y 60 POST ESTIMULACIÓN CON ACTH", unidad: "ng/mL", refMin: 0.2, refMax: 3.0, referencia: "Según fase / estimulación" },
  { codigo: "9", nombre: "17- OH PROGESTERONA SERICA", unidad: "ng/mL", refMin: 0.2, refMax: 2.3, referencia: "0.2 - 2.3 ng/mL" },
  { codigo: "10", nombre: "5-HIDROXIINDOLACETICO (5-HIAA) (ORINA 24H)", unidad: "mg/24h", refMin: 2.0, refMax: 9.0, referencia: "< 9 mg/24h" },
  { codigo: "11", nombre: "5-NUCLEOTIDASA", unidad: "U/L", refMin: 0, refMax: 15, referencia: "< 15 U/L" },
  { codigo: "12", nombre: "6 DROGAS DE ABUSO PRUEBA URINARIA CUALITATIVA", unidad: "", refMin: "", refMax: "", referencia: "NEGATIVO" },
  { codigo: "13", nombre: "7-DEHIDROCOLESTEROL, SUERO", unidad: "µg/mL", refMin: 0.1, refMax: 3.0, referencia: "< 3.0 µg/mL" },
  { codigo: "14", nombre: "A.N.C.A. ANTI-NEUTROFILOS (ANCA) (IM)", unidad: "", refMin: "", refMax: "", referencia: "NEGATIVO (< 1:20)" },
  { codigo: "15", nombre: "ACARO TEST", unidad: "", refMin: "", refMax: "", referencia: "NO SE OBSERVAN ÁCAROS" },
  { codigo: "16", nombre: "ACETAMINOPHEN - PARACETAMOL", unidad: "µg/mL", refMin: 10, refMax: 30, referencia: "10 - 30 µg/mL (Terapéutico)" },
  { codigo: "17", nombre: "ACETIL COLINA", unidad: "nmol/L", refMin: 0, refMax: 0.5, referencia: "< 0.5 nmol/L" },
  { codigo: "18", nombre: "ACETIL COLINA RECEPTOR, ANTICUERPOS", unidad: "nmol/L", refMin: 0, refMax: 0.4, referencia: "Negativo: ≤ 0.4 nmol/L" },
  { codigo: "19", nombre: "ACETIL COLINA, ANTICUERPOS", unidad: "nmol/L", refMin: 0, refMax: 0.4, referencia: "Negativo: ≤ 0.4 nmol/L" },
  { codigo: "20", nombre: "ACETONA SERICA", unidad: "mg/dL", refMin: 0, refMax: 2.0, referencia: "< 2.0 mg/dL" },
  { codigo: "21", nombre: "ACETONA URINARIA", unidad: "", refMin: "", refMax: "", referencia: "NEGATIVO" },
  { codigo: "22", nombre: "ACIDO FOLICO (VITAMINA B9)", unidad: "ng/mL", refMin: 3.1, refMax: 17.5, referencia: "3.1 - 17.5 ng/mL" },
  { codigo: "23", nombre: "ACIDO FOLICO INTRAERITROCITARIO", unidad: "ng/mL", refMin: 140, refMax: 628, referencia: "140 - 628 ng/mL" },
  { codigo: "24", nombre: "ACIDO HIALURONICO", unidad: "ng/mL", refMin: 0, refMax: 75, referencia: "< 75 ng/mL" },
  { codigo: "25", nombre: "ACIDO HIPURICO EN ORINA", unidad: "g/g Creatinina", refMin: 0, refMax: 1.6, referencia: "< 1.6 g/g Creatinina" },
  { codigo: "26", nombre: "ACIDO HOMOVALINICO ORINA 24 HRS", unidad: "mg/24h", refMin: 1.4, refMax: 8.8, referencia: "< 8.8 mg/24h" },
  { codigo: "27", nombre: "ACIDO LACTICO (LACTATO)", unidad: "mmol/L", refMin: 0.5, refMax: 2.2, referencia: "0.5 - 2.2 mmol/L" },
  { codigo: "28", nombre: "ACIDO LACTICO EN LCR (HN)", unidad: "mg/dL", refMin: 10, refMax: 22, referencia: "10 - 22 mg/dL" },
  { codigo: "29", nombre: "ACIDO METILHIPURICO EN ORINA", unidad: "g/g Creatinina", refMin: 0, refMax: 1.5, referencia: "< 1.5 g/g Creatinina" },
  { codigo: "30", nombre: "ACIDO METILMALONICO", unidad: "µmol/L", refMin: 0.0, refMax: 0.4, referencia: "0.00 - 0.40 µmol/L" },
  { codigo: "31", nombre: "ACIDO METILMALONICO (ORINA SIMPLE)", unidad: "mg/g Creatinina", refMin: 0, refMax: 3.6, referencia: "< 3.6 mg/g Creatinina" },
  { codigo: "32", nombre: "ACIDO PIRUVICO (PIRUVATO)", unidad: "mmol/L", refMin: 0.03, refMax: 0.08, referencia: "0.03 - 0.08 mmol/L" },
  { codigo: "33", nombre: "ACIDO SALICILICO (SALICILATO)", unidad: "mg/dL", refMin: 2.0, refMax: 20.0, referencia: "2.0 - 20.0 mg/dL (Terapéutico)" },
  { codigo: "34", nombre: "ACIDO URICO", unidad: "mg/dL", refMin: 3.0, refMax: 7.0, referencia: "3.0 - 7.0 mg/dL" },
  { codigo: "35", nombre: "ACIDO URICO EN LIQUIDO ASCITICO", unidad: "mg/dL", refMin: 3.0, refMax: 7.0, referencia: "Similar a suero" },
  { codigo: "36", nombre: "ACIDO URICO EN ORINA DE 24 HORAS", unidad: "mg/24h", refMin: 250, refMax: 750, referencia: "250 - 750 mg/24h" },
  { codigo: "37", nombre: "ACIDO URICO EN ORINA SIMPLE", unidad: "mg/dL", refMin: 20, refMax: 80, referencia: "20 - 80 mg/dL" },
  { codigo: "38", nombre: "ACIDO VALPROICO", unidad: "µg/mL", refMin: 50.0, refMax: 100.0, referencia: "50 - 100 µg/mL" },
  { codigo: "39", nombre: "ACIDO VANILMANDELICO (ORINA 24 HORAS)", unidad: "mg/24h", refMin: 2.0, refMax: 7.0, referencia: "< 7.0 mg/24h" },
  { codigo: "40", nombre: "ACIDOS BILIARES", unidad: "µmol/L", refMin: 0.0, refMax: 10.0, referencia: "< 10 µmol/L" },
  { codigo: "1", nombre: "ACIDOS BILIARES TOTALES (HM)", unidad: "µmol/L", refMin: 0.0, refMax: 10.0, referencia: "< 10.0 µmol/L" },
  { codigo: "41", nombre: "ACIDOS ORGANICOS - SCREENING CORTA Y MEDIA EN ORINA", unidad: "", refMin: "", refMax: "", referencia: "PATRÓN NORMAL" },
  { codigo: "42", nombre: "ACILCARNITINA", unidad: "µmol/L", refMin: 10, refMax: 60, referencia: "Dentro de límites normales" },
  { codigo: "43", nombre: "ADA LCR (ADENOSIN DEAMINASA)", unidad: "U/L", refMin: 0, refMax: 9, referencia: "< 9.0 U/L" },
  { codigo: "44", nombre: "ADA LIQUIDO ASCITICO (PERITONEAL)", unidad: "U/L", refMin: 0, refMax: 30, referencia: "< 30 U/L" },
  { codigo: "45", nombre: "ADA LIQUIDO PERICARDIO", unidad: "U/L", refMin: 0, refMax: 40, referencia: "< 40 U/L" },
  { codigo: "46", nombre: "ADA LIQUIDO PLEURAL", unidad: "U/L", refMin: 0, refMax: 40, referencia: "< 40 U/L" },
  { codigo: "47", nombre: "ADA LIQUIDO SINOVIAL", unidad: "U/L", refMin: 0, refMax: 30, referencia: "< 30 U/L" },
  { codigo: "48", nombre: "ADA LIQUIDOS BIOLOGICOS", unidad: "U/L", refMin: 0, refMax: 30, referencia: "< 30 U/L" },
  { codigo: "49", nombre: "ADA SUERO", unidad: "U/L", refMin: 0, refMax: 20, referencia: "< 20 U/L" },
  { codigo: "50", nombre: "ADDIS PRUEBA", unidad: "elem/min", refMin: 0, refMax: 2000, referencia: "Hematíes < 2000/min, Leucocitos < 4000/min" },
  { codigo: "51", nombre: "ADENOVIRUS ADN X PCR", unidad: "", refMin: "", refMax: "", referencia: "NO DETECTADO" },
  { codigo: "52", nombre: "ADENOVIRUS ANTICUERPOS IGG", unidad: "U/mL", refMin: 0, refMax: 11, referencia: "Negativo: < 9 U/mL" },
  { codigo: "53", nombre: "ADENOVIRUS ANTICUERPOS IGM", unidad: "U/mL", refMin: 0, refMax: 11, referencia: "Negativo: < 9 U/mL" },
  { codigo: "54", nombre: "ADRENALES AUTOANTICUERPOS", unidad: "", refMin: "", refMax: "", referencia: "NEGATIVO" },
  { codigo: "56", nombre: "AGA Y ELECTROLITOS", unidad: "", refMin: "", refMax: "", referencia: "pH: 7.35-7.45, pCO2: 35-45 mmHg, pO2: 80-100 mmHg" },
  { codigo: "57", nombre: "AGLUTINACIONES", unidad: "", refMin: "", refMax: "", referencia: "NO REACTIVO" },
  { codigo: "58", nombre: "AGLUTINACIONES 2-MERCAPTO ETANOL", unidad: "", refMin: "", refMax: "", referencia: "NEGATIVO (< 1:20)" },
  { codigo: "59", nombre: "AGLUTINACIONES EN LAMINA", unidad: "", refMin: "", refMax: "", referencia: "NO REACTIVO" },
  { codigo: "60", nombre: "AGLUTINACIONES EN TUBO (BRUCELAS)", unidad: "", refMin: "", refMax: "", referencia: "NEGATIVO (< 1:40)" },
  { codigo: "61", nombre: "AGLUTINACIONES EN TUBO (SALMONELOSIS)", unidad: "", refMin: "", refMax: "", referencia: "NEGATIVO (< 1:80)" },
  { codigo: "62", nombre: "AGLUTINACIONES FENOMENO ZONA", unidad: "", refMin: "", refMax: "", referencia: "NO OBSERVADO" },
  { codigo: "63", nombre: "ALBUMINA EN ORINA", unidad: "mg/dL", refMin: 0, refMax: 20, referencia: "< 20 mg/dL" },
  { codigo: "64", nombre: "ALBUMINA SÉRICA", unidad: "g/dL", refMin: 3.2, refMax: 5.2, referencia: "3.2 - 5.2 g/dL" },
  { codigo: "65", nombre: "ALCOHOL ETILICO EN ORINA (HN)", unidad: "mg/dL", refMin: 0, refMax: 0, referencia: "NEGATIVO (0 mg/dL)" },
  { codigo: "66", nombre: "ALCOHOL ETILICO EN SANGRE (HN)", unidad: "g/L", refMin: 0, refMax: 0, referencia: "NEGATIVO (0.0 g/L)" },
  { codigo: "67", nombre: "ALDOLASA", unidad: "U/L", refMin: 0, refMax: 6, referencia: "0 - 6 U/L" },
  { codigo: "68", nombre: "ALDOSTERONA", unidad: "pg/mL", refMin: 30, refMax: 160, referencia: "30 - 160 pg/mL (Posición de pie)" },
  { codigo: "69", nombre: "ALDOSTERONA EN ORINA 24 HRS", unidad: "µg/24h", refMin: 2.0, refMax: 20.0, referencia: "2.0 - 20.0 µg/24h" },
  { codigo: "70", nombre: "ALFA 1 ANTITRIPSINA FECAL", unidad: "mg/g Heces", refMin: 0, refMax: 0.54, referencia: "< 0.54 mg/g Heces" },
  { codigo: "71", nombre: "ALFA FETO PROTEINA (AFP)", unidad: "ng/mL", refMin: 0, refMax: 10, referencia: "< 10 ng/mL" },
  { codigo: "72", nombre: "ALFA-1 ANTITRIPSINA", unidad: "mg/dL", refMin: 190, refMax: 260, referencia: "190 - 260 mg/dL" },
  { codigo: "73", nombre: "ALFA-2 ANTIPLASMINA", unidad: "%", refMin: 80, refMax: 120, referencia: "80 - 120 %" },
  { codigo: "74", nombre: "ALUMINIO SERICO", unidad: "µg/L", refMin: 0, refMax: 10, referencia: "< 10 µg/L" },
  { codigo: "75", nombre: "AMEBAS HISTOLITICA, ANTICUERPOS TOTALES", unidad: "", refMin: "", refMax: "", referencia: "NEGATIVO" },
  { codigo: "76", nombre: "AMILASA EN ORINA DE 24 HORAS (HN)", unidad: "U/24h", refMin: 1, refMax: 17, referencia: "1 - 17 U/24h" },
  { codigo: "77", nombre: "AMILASA ISOENZIMAS", unidad: "%", refMin: 35, refMax: 65, referencia: "P-Isoenzima: 35-65%" },
  { codigo: "78", nombre: "AMILASA PANCREATICA", unidad: "U/L", refMin: 13, refMax: 53, referencia: "13 - 53 U/L" },
  { codigo: "79", nombre: "AMILASA SERICA", unidad: "U/L", refMin: 35, refMax: 115, referencia: "35 - 115 U/L" },
  { codigo: "80", nombre: "AMIODARONA SERICA - DOSAJE", unidad: "µg/mL", refMin: 1.0, refMax: 2.5, referencia: "1.0 - 2.5 µg/mL" },
  { codigo: "81", nombre: "ANCA (ANTICITOPLASMA DEL NEUTROFILO)", unidad: "", refMin: "", refMax: "", referencia: "NEGATIVO" },
  { codigo: "82", nombre: "ANCA ANTICUERPOS ANTI-NEUTROFILOS, SUERO", unidad: "", refMin: "", refMax: "", referencia: "NEGATIVO" },
  { codigo: "83", nombre: "ANDROSTANDIOL GLUCURONIDO (3-ALFA-DIOL)", unidad: "ng/mL", refMin: 0.5, refMax: 6.0, referencia: "Según edad y sexo" },
  { codigo: "84", nombre: "ANDROSTENEDIONA", unidad: "ng/mL", refMin: 0.6, refMax: 3.1, referencia: "0.6 - 3.1 ng/mL" },
  { codigo: "85", nombre: "ANFETAMINAS (DROGAS) CUALITATIVO en orina", unidad: "", refMin: "", refMax: "", referencia: "NEGATIVO" },
  { codigo: "86", nombre: "ANFETAMINAS Y METANFETAMINAS CUANTITATIVO", unidad: "ng/mL", refMin: 0, refMax: 500, referencia: "< 500 ng/mL" },
  { codigo: "87", nombre: "ANGIOTENSINA II", unidad: "pg/mL", refMin: 10, refMax: 45, referencia: "10 - 45 pg/mL" },
  { codigo: "88", nombre: "ANTI ACUAPORINA 4 IGG (NMO AQP4 IGG)", unidad: "", refMin: "", refMax: "", referencia: "NEGATIVO" },
  { codigo: "89", nombre: "ANTI ATG - ANTI TIROGLOBULINA", unidad: "IU/mL", refMin: 0, refMax: 115, referencia: "< 115 IU/mL" },
  { codigo: "90", nombre: "ANTI CARDIOLIPINA IGA", unidad: "APL", refMin: 0, refMax: 12, referencia: "Negativo: < 12 APL" },
  { codigo: "91", nombre: "ANTI CARDIOLIPINA IGG (IM)", unidad: "GPL", refMin: 0, refMax: 10, referencia: "Negativo: < 10 GPL" },
  { codigo: "92", nombre: "ANTI CARDIOLIPINA IGM", unidad: "MPL", refMin: 0, refMax: 10, referencia: "Negativo: < 10 MPL" },
  { codigo: "93", nombre: "ANTI CCP (PEPTIDO CICLICO CITRULINADO) IGG (IM)", unidad: "U/mL", refMin: 0, refMax: 20, referencia: "Negativo: < 20 U/mL" },
  { codigo: "94", nombre: "ANTI DNA-DS NATIVO Ó DOBLE CADENA (IM)", unidad: "IU/mL", refMin: 0, refMax: 10, referencia: "Negativo: < 10 IU/mL" },
  { codigo: "95", nombre: "ANTI DNA-SS AUTO ANTICUERPO (CADENA SIMPLE)", unidad: "U/mL", refMin: 0, refMax: 25, referencia: "Negativo: < 25 U/mL" },
  { codigo: "96", nombre: "ANTI ESTREPTOLISINA - ASO (CUANTITATIVO)", unidad: "IU/mL", refMin: 0, refMax: 200, referencia: "< 200 IU/mL" },
  { codigo: "97", nombre: "ANTI ESTREPTOLISINA - ASO (SEMICUANTITATIVO)", unidad: "", refMin: "", refMax: "", referencia: "NEGATIVO (< 200 IU/mL)" },
  { codigo: "98", nombre: "ANTI HU - ANTICUERPOS NEURONAL NUCLEAR (ANNA-1)", unidad: "", refMin: "", refMax: "", referencia: "NEGATIVO" },
  { codigo: "99", nombre: "ANTI JO", unidad: "U/mL", refMin: 0, refMax: 15, referencia: "Negativo: < 15 U/mL" },
  { codigo: "100", nombre: "ANTI LKM1 (LIVER / KIDNEY MICROSOMAS- ANTI HIGADO/ RIÑON) (IM)", unidad: "U/mL", refMin: 0, refMax: 20, referencia: "Negativo: < 20 U/mL" },
  { codigo: "101", nombre: "ANTI MITOCONDRIALES (AMA) (IM)", unidad: "", refMin: "", refMax: "", referencia: "NEGATIVO (< 1:20)" },
  { codigo: "102", nombre: "ANTI MUSCULO LISO (ASMA) (IM)", unidad: "", refMin: "", refMax: "", referencia: "NEGATIVO (< 1:20)" },
  { codigo: "103", nombre: "ANTI MUSK (MIASTENIA)", unidad: "nmol/L", refMin: 0, refMax: 0.05, referencia: "Negativo: < 0.05 nmol/L" },
  { codigo: "104", nombre: "ANTI RNP-N (IM)", unidad: "U/mL", refMin: 0, refMax: 20, referencia: "Negativo: < 20 U/mL" },
  { codigo: "105", nombre: "ANTI SCL 70 , AUTOANTICUERPOS (IM)", unidad: "U/mL", refMin: 0, refMax: 15, referencia: "Negativo: < 15 U/mL" },
  { codigo: "106", nombre: "ANTI TIROGLOBULINA – ANTI ATG", unidad: "IU/mL", refMin: 0, refMax: 115, referencia: "< 115 IU/mL" },
  { codigo: "107", nombre: "ANTI TIROPEROXIDASA (ATPO-MICROSOMAL)", unidad: "IU/mL", refMin: 0, refMax: 34, referencia: "< 34 IU/mL" },
  { codigo: "108", nombre: "ANTI TIROPEROXIDASA (ATPO-MICROSOMAL) ANTI TPO", unidad: "IU/mL", refMin: 0, refMax: 34, referencia: "< 34 IU/mL" },
  { codigo: "109", nombre: "ANTI YO ANTICUERPOS (PURKINJE CELL CYTOPASMIC ANTIBODIES)", unidad: "", refMin: "", refMax: "", referencia: "NEGATIVO" },
  { codigo: "110", nombre: "ANTI-CCP (PEPTIDO CICLICO CITRULINADO) IGG (IM)", unidad: "U/mL", refMin: 0, refMax: 20, referencia: "Negativo: < 20 U/mL" },
  { codigo: "115", nombre: "ANTI-DNA NATIVO (DS-DOBLE CADENA)", unidad: "IU/mL", refMin: 0, refMax: 10, referencia: "Negativo: < 10 IU/mL" },
  { codigo: "122", nombre: "ANTI-LMA (MEMBRANA HEPATICA, AUTO ANTICUERPOS)", unidad: "", refMin: "", refMax: "", referencia: "NEGATIVO" },
  { codigo: "128", nombre: "ANTI-P53 (AUTOANTICUERPOS P53)", unidad: "U/mL", refMin: 0, refMax: 12, referencia: "Negativo: < 12 U/mL" },
  { codigo: "111", nombre: "ANTICOAGULANTE LUPICO", unidad: "segundos", refMin: 30, refMax: 45, referencia: "NO DETECTADO" },
  { codigo: "112", nombre: "ANTICUERPOS ANTIMITOCONDRIALES (AMA)", unidad: "", refMin: "", refMax: "", referencia: "NEGATIVO (< 1:20)" },
  { codigo: "113", nombre: "ANTICUERPOS ANTINUCLEARES (ANA) (IM)", unidad: "", refMin: "", refMax: "", referencia: "NEGATIVO (< 1:160)" },
  { codigo: "114", nombre: "ANTICUERPOS ANTITIROIDES", unidad: "IU/mL", refMin: 0, refMax: 34, referencia: "< 34 IU/mL" },
  { codigo: "117", nombre: "ANTIFOSFOLIPIDOS (PANEL COMPLETO) IGG+IGM", unidad: "U/mL", refMin: 0, refMax: 10, referencia: "Negativo: < 10 U/mL" },
  { codigo: "119", nombre: "ANTIGENO CARCINOEMBRIOGENICO - CEA", unidad: "ng/mL", refMin: 0, refMax: 5, referencia: "< 5 ng/mL (no fumadores)" },
  { codigo: "121", nombre: "ANTIGENO POLIPEPTIDO TISULAR -TPA", unidad: "U/L", refMin: 0, refMax: 75, referencia: "< 75 U/L" },
  { codigo: "123", nombre: "ANTINUCLEARES, ANTICUERPOS (ANA)", unidad: "", refMin: "", refMax: "", referencia: "NEGATIVO (< 1:160)" },
  { codigo: "124", nombre: "ANTIOXIDANTES TOTALES", unidad: "mmol/L", refMin: 1.15, refMax: 1.70, referencia: "1.15 - 1.70 mmol/L" },
  { codigo: "125", nombre: "ANTIOXIDANTES: GLUTATHIONE PEROXI", unidad: "U/g Hb", refMin: 27, refMax: 67, referencia: "27 - 67 U/g Hb" },
  { codigo: "126", nombre: "ANTIOXIDANTES: GLUTATHIONE REDUCT", unidad: "U/g Hb", refMin: 4.8, refMax: 10.5, referencia: "4.8 - 10.5 U/g Hb" },
  { codigo: "127", nombre: "ANTIOXIDANTES: SOD (SUPEROXIDO-DISMUT)", unidad: "U/g Hb", refMin: 1102, refMax: 1601, referencia: "1102 - 1601 U/g Hb" },
  { codigo: "129", nombre: "ANTITROMBINA III FUNCIONAL", unidad: "%", refMin: 80, refMax: 120, referencia: "80 - 120 %" },
  { codigo: "130", nombre: "APOLIPOPROTEINA A1", unidad: "mg/dL", refMin: 110, refMax: 205, referencia: "110 - 205 mg/dL" },
  { codigo: "131", nombre: "APOLIPOPROTEINA B", unidad: "mg/dL", refMin: 55, refMax: 130, referencia: "55 - 130 mg/dL" },
  { codigo: "132", nombre: "ARBOVIRUS ANTICUERPOS IGM", unidad: "", refMin: "", refMax: "", referencia: "NEGATIVO" },
  { codigo: "133", nombre: "ARSENICO (ORINA 24 HORAS)", unidad: "µg/24h", refMin: 0, refMax: 50, referencia: "< 50 µg/24h" },
  { codigo: "134", nombre: "ARSENICO EN ORINA", unidad: "µg/L", refMin: 0, refMax: 35, referencia: "< 35 µg/L" },
  { codigo: "135", nombre: "ARSENICO SANGRE TOTAL", unidad: "µg/L", refMin: 0, refMax: 13, referencia: "< 13 µg/L" },
  { codigo: "136", nombre: "ASCA (ANTI-SACCHAROMYCES CEREVISIAE), IGA", unidad: "U/mL", refMin: 0, refMax: 10, referencia: "Negativo: < 10 U/mL" },
  { codigo: "137", nombre: "ASCA (ANTI-SACCHAROMYCES CEREVISIAE), IGG", unidad: "U/mL", refMin: 0, refMax: 10, referencia: "Negativo: < 10 U/mL" },
  { codigo: "138", nombre: "ASPERGILLUS ANTICUERPOS", unidad: "", refMin: "", refMax: "", referencia: "NEGATIVO" },
  { codigo: "139", nombre: "AUTO ANTICUERPOS MEMBRANA BASAL GLOMERULAR", unidad: "RU/mL", refMin: 0, refMax: 20, referencia: "Negativo: < 20 RU/mL" },
  { codigo: "140", nombre: "BANDAS OLIGOCLONALES EN LCR IGG", unidad: "", refMin: "", refMax: "", referencia: "AUSENTES" },
  { codigo: "141", nombre: "BANDAS OLIGOCLONALES EN LCR IGM", unidad: "", refMin: "", refMax: "", referencia: "AUSENTES" },
  { codigo: "142", nombre: "BANDAS OLIGOCLONALES IGG, LÍQUIDO CEFALORRAQUÍDEO", unidad: "", refMin: "", refMax: "", referencia: "AUSENTES" },
  { codigo: "143", nombre: "BARBITURATOS EN ORINA", unidad: "ng/mL", refMin: 0, refMax: 200, referencia: "Negativo: < 200 ng/mL" },
  { codigo: "144", nombre: "BARTONELLA HENSELAE IGG", unidad: "", refMin: "", refMax: "", referencia: "Negativo: < 1:64" },
  { codigo: "145", nombre: "BARTONELLA HENSELAE IGM", unidad: "", refMin: "", refMax: "", referencia: "Negativo: < 1:20" },
  { codigo: "146", nombre: "BCR/ABL T (9;22) (P190), DETECCION X PCR", unidad: "", refMin: "", refMax: "", referencia: "NO DETECTADO" },
  { codigo: "147", nombre: "BCR/ABL T(9;22) (P210) CUANTIFICACION X PCR", unidad: "% IS", refMin: 0, refMax: 0.1, referencia: "Respuesta Molecular Mayor ≤ 0.1%" },
  { codigo: "148", nombre: "BENCENO EN ORINA", unidad: "µg/L", refMin: 0, refMax: 25, referencia: "< 25 µg/L" },
  { codigo: "149", nombre: "BENZODIAZEPINAS (DROGAS) CUALITATIVO EN ORINA", unidad: "", refMin: "", refMax: "", referencia: "NEGATIVO" },
  { codigo: "150", nombre: "BENZODIAZEPINAS CUANTITATIVO EN ORINA", unidad: "ng/mL", refMin: 0, refMax: 200, referencia: "< 200 ng/mL" },
  { codigo: "151", nombre: "BETA 2 GLICOPROTEINA I IGG (IM)", unidad: "U/mL", refMin: 0, refMax: 20, referencia: "Negativo: < 20 U/mL" },
  { codigo: "152", nombre: "BETA 2 GLICOPROTEINA I IGM (IM)", unidad: "U/mL", refMin: 0, refMax: 20, referencia: "Negativo: < 20 U/mL" },
  { codigo: "153", nombre: "BETA 2 MICROGLOBULINA ORINA 24 HRS", unidad: "µg/24h", refMin: 0, refMax: 300, referencia: "< 300 µg/24h" },
  { codigo: "154", nombre: "BETA 2 MICROGLOBULINA ORINA SIMPLE", unidad: "µg/L", refMin: 0, refMax: 200, referencia: "< 200 µg/L" },
  { codigo: "155", nombre: "BETA 2 MICROGLOBULINA SERICA", unidad: "mg/L", refMin: 1.2, refMax: 2.7, referencia: "1.2 - 2.7 mg/L" },
  { codigo: "158", nombre: "BETA-HCG LIBRE", unidad: "mIU/mL", refMin: 0, refMax: 5, referencia: "Según semanas de gestación / No gestante < 5 mIU/mL" },
  { codigo: "159", nombre: "BICARBONATO SERICO CO2 (HN)", unidad: "mmol/L", refMin: 22, refMax: 29, referencia: "22 - 29 mmol/L" },
  { codigo: "160", nombre: "BILIRRUBINA DIRECTA", unidad: "mg/dL", refMin: 0, refMax: 0.4, referencia: "< 0.4 mg/dL" },
  { codigo: "161", nombre: "BILIRRUBINA INDIRECTA", unidad: "mg/dL", refMin: 0.2, refMax: 0.8, referencia: "0.2 - 0.8 mg/dL" },
  { codigo: "162", nombre: "BILIRRUBINAS FRACCIONADAS", unidad: "mg/dL", refMin: 0.2, refMax: 1.2, referencia: "Directa < 0.4 mg/dL, Total < 1.2 mg/dL" },
  { codigo: "163", nombre: "BILIRRUBINAS TOTALES Y FRACCIONADAS (79, 79A Y 79B)", unidad: "mg/dL", refMin: 0.2, refMax: 1.2, referencia: "Total: 0.2 - 1.2 mg/dL" },
  { codigo: "164", nombre: "BIOPSIA CERVIX", unidad: "", refMin: "", refMax: "", referencia: "INFORME HISTOPATOLÓGICO" },
  { codigo: "165", nombre: "BIOPSIA DE MAMA", unidad: "", refMin: "", refMax: "", referencia: "INFORME HISTOPATOLÓGICO" },
  { codigo: "166", nombre: "BIOPSIA DE PIEL/HISTOQUÍMICA", unidad: "", refMin: "", refMax: "", referencia: "INFORME HISTOPATOLÓGICO" },
  { codigo: "167", nombre: "BIOPSIA DE PROSTATA", unidad: "", refMin: "", refMax: "", referencia: "INFORME HISTOPATOLÓGICO" },
  { codigo: "168", nombre: "BIOPSIA DE PROSTATA ESTUDIO ANATOMOPATOLOGICO", unidad: "", refMin: "", refMax: "", referencia: "INFORME HISTOPATOLÓGICO" },
  { codigo: "169", nombre: "BIOPSIA MENTON", unidad: "", refMin: "", refMax: "", referencia: "INFORME HISTOPATOLÓGICO" },
  { codigo: "173", nombre: "BIOPSIA PIEZA OPERATORIA <=5 MM", unidad: "", refMin: "", refMax: "", referencia: "INFORME HISTOPATOLÓGICO" },
  { codigo: "171", nombre: "BIOPSIA PIEZA OPERATORIA CHICA >5 MM <= 2CM", unidad: "", refMin: "", refMax: "", referencia: "INFORME HISTOPATOLÓGICO" },
  { codigo: "170", nombre: "BIOPSIA PIEZA OPERATORIA EXTRA GRANDE >10CM", unidad: "", refMin: "", refMax: "", referencia: "INFORME HISTOPATOLÓGICO" },
  { codigo: "174", nombre: "BIOPSIA PIEZA OPERATORIA GRANDE >5 CM Y <=10 CM", unidad: "", refMin: "", refMax: "", referencia: "INFORME HISTOPATOLÓGICO" },
  { codigo: "172", nombre: "BIOPSIA PIEZA OPERATORIA MEDIANA >2 MM <= 5CM", unidad: "", refMin: "", refMax: "", referencia: "INFORME HISTOPATOLÓGICO" },
  { codigo: "175", nombre: "BIOPSIA POR ASPIRACION (BAAF)", unidad: "", refMin: "", refMax: "", referencia: "INFORME CITOPATOLÓGICO" },
  { codigo: "176", nombre: "BK (ORINA 24 HORAS)", unidad: "", refMin: "", refMax: "", referencia: "NEGATIVO" },
  { codigo: "177", nombre: "BK CULTIVO (ED)", unidad: "", refMin: "", refMax: "", referencia: "SIN DESARROLLO DE M. TUBERCULOSIS" },
  { codigo: "178", nombre: "BK CULTIVO EN ESPUTO", unidad: "", refMin: "", refMax: "", referencia: "SIN DESARROLLO DE M. TUBERCULOSIS" },
  { codigo: "179", nombre: "BK CULTIVO EN ESPUTO MX 01", unidad: "", refMin: "", refMax: "", referencia: "SIN DESARROLLO DE M. TUBERCULOSIS" },
  { codigo: "180", nombre: "BK CULTIVO EN ESPUTO MX 02", unidad: "", refMin: "", refMax: "", referencia: "SIN DESARROLLO DE M. TUBERCULOSIS" },
  { codigo: "181", nombre: "BK CULTIVO EN ESPUTO MX 03", unidad: "", refMin: "", refMax: "", referencia: "SIN DESARROLLO DE M. TUBERCULOSIS" },
  { codigo: "182", nombre: "BK DIRECTO", unidad: "", refMin: "", refMax: "", referencia: "NEGATIVO PARA B.A.A.R." },
  { codigo: "184", nombre: "BK DIRECTO - LCR", unidad: "", refMin: "", refMax: "", referencia: "NEGATIVO PARA B.A.A.R." },
  { codigo: "185", nombre: "BK DIRECTO EN ESPUTO (PRIMERA MUESTRA)", unidad: "", refMin: "", refMax: "", referencia: "NEGATIVO PARA B.A.A.R." },
  { codigo: "186", nombre: "BK DIRECTO EN ESPUTO (SEGUNDA MUESTRA)", unidad: "", refMin: "", refMax: "", referencia: "NEGATIVO PARA B.A.A.R." },
  { codigo: "187", nombre: "BK DIRECTO EN ESPUTO (TERCERA MUESTRA)", unidad: "", refMin: "", refMax: "", referencia: "NEGATIVO PARA B.A.A.R." },
  { codigo: "188", nombre: "BK DIRECTO- LCR", unidad: "", refMin: "", refMax: "", referencia: "NEGATIVO PARA B.A.A.R." },
  { codigo: "189", nombre: "BK DIRECTO-LIQUIDO PLEURAL", unidad: "", refMin: "", refMax: "", referencia: "NEGATIVO PARA B.A.A.R." },
  { codigo: "191", nombre: "BK DIRECTO-LIQUIDO SINOVIAL", unidad: "", refMin: "", refMax: "", referencia: "NEGATIVO PARA B.A.A.R." },
  { codigo: "193", nombre: "BK ESPUTO (3 MUESTRAS)", unidad: "", refMin: "", refMax: "", referencia: "NEGATIVO PARA B.A.A.R." },
  { codigo: "194", nombre: "BK VIRUS POR PCR EN TIEMPO REAL", unidad: "copias/mL", refMin: 0, refMax: 500, referencia: "< 500 copias/mL" },
  { codigo: "195", nombre: "BLASTOMYCES ANTICUERPOS", unidad: "", refMin: "", refMax: "", referencia: "NEGATIVO" },
  { codigo: "196", nombre: "BLOCK CELL - BIOPSIA", unidad: "", refMin: "", refMax: "", referencia: "INFORME HISTOPATOLÓGICO" },
  { codigo: "197", nombre: "BLOCK CELL- BIOPSIA", unidad: "", refMin: "", refMax: "", referencia: "INFORME HISTOPATOLÓGICO" },
  { codigo: "198", nombre: "BORDETELLA PERTUSIS (COQUELUCHE) IGG", unidad: "U/mL", refMin: 0, refMax: 40, referencia: "Negativo: < 40 U/mL" },
  { codigo: "199", nombre: "BORDETELLA PERTUSIS (COQUELUCHE) IGM", unidad: "", refMin: "", refMax: "", referencia: "NEGATIVO" },
  { codigo: "200", nombre: "BORRELIA BURGDORFERI IGG", unidad: "RU/mL", refMin: 0, refMax: 16, referencia: "Negativo: < 16 RU/mL" },
  { codigo: "201", nombre: "BORRELIA BURGDORFERI IGM", unidad: "RU/mL", refMin: 0, refMax: 16, referencia: "Negativo: < 16 RU/mL" },
  { codigo: "202", nombre: "BRUCELA SP. X PCR EN TIEMPO REAL", unidad: "", refMin: "", refMax: "", referencia: "NO DETECTADO" },
  { codigo: "203", nombre: "BRUCELLA ANTIC. IG-G (IM)", unidad: "", refMin: "", refMax: "", referencia: "NEGATIVO" },
  { codigo: "204", nombre: "BRUCELLA ANTIC. IG-M (IM)", unidad: "", refMin: "", refMax: "", referencia: "NEGATIVO" },
  { codigo: "205", nombre: "BRUCELLA ANTICUERPOS BLOQUEADORES", unidad: "", refMin: "", refMax: "", referencia: "NEGATIVO" },
  { codigo: "206", nombre: "BTA EN ORINA (MARCADOR TUMORAL VEJIGA)", unidad: "U/mL", refMin: 0, refMax: 14, referencia: "Negativo: < 14 U/mL" },
  { codigo: "207", nombre: "C1 INHIBIDOR DE LA ESTERASA", unidad: "mg/dL", refMin: 21, refMax: 39, referencia: "21 - 39 mg/dL" },
  { codigo: "208", nombre: "CA 125 (OVARIO)", unidad: "U/mL", refMin: 0, refMax: 35, referencia: "< 35 U/mL" },
  { codigo: "209", nombre: "CA 15-3 (MAMA)", unidad: "U/mL", refMin: 0, refMax: 30, referencia: "< 30 U/mL" },
  { codigo: "210", nombre: "CA 27-29 (MARCADOR MAMA)", unidad: "U/mL", refMin: 0, refMax: 38, referencia: "< 38 U/mL" },
  { codigo: "211", nombre: "CA 549 (MARCADOR MAMA)", unidad: "U/mL", refMin: 0, refMax: 12, referencia: "< 12 U/mL" },
  { codigo: "212", nombre: "CA 72-4 (ESTOMAGO)", unidad: "U/mL", refMin: 0, refMax: 6.9, referencia: "< 6.9 U/mL" },
  { codigo: "213", nombre: "CA19-9 (PANCREAS)", unidad: "U/mL", refMin: 0, refMax: 37, referencia: "< 37 U/mL" },
  { codigo: "214", nombre: "CADENAS LIGERAS KAPPA LIBRES EN ORINA", unidad: "mg/L", refMin: 1.35, refMax: 24.2, referencia: "1.35 - 24.2 mg/L" },
  { codigo: "215", nombre: "CADENAS LIGERAS KAPPA LIBRES EN SUERO", unidad: "mg/L", refMin: 3.3, refMax: 19.4, referencia: "3.3 - 19.4 mg/L" },
  { codigo: "216", nombre: "CADENAS LIGERAS LAMBDA LIBRES EN ORINA", unidad: "mg/L", refMin: 0.24, refMax: 6.67, referencia: "0.24 - 6.67 mg/L" },
  { codigo: "217", nombre: "CADENAS LIGERAS LAMBDA LIBRES SUERO", unidad: "mg/L", refMin: 5.7, refMax: 26.3, referencia: "5.7 - 26.3 mg/L" },
  { codigo: "218", nombre: "CADMIO (ORINA 24 HRS.)", unidad: "µg/24h", refMin: 0, refMax: 2.0, referencia: "< 2.0 µg/24h" },
  { codigo: "219", nombre: "CADMIO EN SANGRE TOTAL", unidad: "µg/L", refMin: 0, refMax: 5.0, referencia: "< 5.0 µg/L" },
  { codigo: "220", nombre: "CALCIO EN ORINA DE 24 HORAS", unidad: "mg/24h", refMin: 100, refMax: 300, referencia: "100 - 300 mg/24h" },
  { codigo: "221", nombre: "CALCIO EN ORINA SIMPLE", unidad: "mg/dL", refMin: 2.5, refMax: 20.0, referencia: "Según concentración urinaria" },
  { codigo: "222", nombre: "CALCIO IONICO", unidad: "mg/dL", refMin: 4.5, refMax: 5.3, referencia: "4.5 - 5.3 mg/dL" },
  { codigo: "223", nombre: "CALCIO SERICO", unidad: "mg/dL", refMin: 8.5, refMax: 10.5, referencia: "8.5 - 10.5 mg/dL" },
  { codigo: "224", nombre: "CALCITONINA", unidad: "pg/mL", refMin: 0, refMax: 10, referencia: "< 10 pg/mL" },
  { codigo: "226", nombre: "CALCULO BILIAR", unidad: "", refMin: "", refMax: "", referencia: "ANÁLISIS FISICOQUÍMICO" },
  { codigo: "227", nombre: "CALCULO URINARIO ANALISIS ( RENAL / VESICAL )", unidad: "", refMin: "", refMax: "", referencia: "ANÁLISIS FISICOQUÍMICO" },
  { codigo: "228", nombre: "CALPROTECTINA FECAL", unidad: "µg/g", refMin: 0, refMax: 50, referencia: "Normal: < 50 µg/g" },
  { codigo: "229", nombre: "CAMPYLOBACTER (HECES)", unidad: "", refMin: "", refMax: "", referencia: "NO SE AISLA CAMPYLOBACTER" },
  { codigo: "230", nombre: "CANDIDA ALBICANS,ANTICUERPOS (IGG)", unidad: "AU/mL", refMin: 0, refMax: 10, referencia: "Negativo: < 10 AU/mL" },
  { codigo: "232", nombre: "CARBAMATOS EN ORINA", unidad: "", refMin: "", refMax: "", referencia: "NEGATIVO" },
  { codigo: "233", nombre: "CARBAMATOS EN ORINA AL SIMPLE CUALITATIVO", unidad: "", refMin: "", refMax: "", referencia: "NEGATIVO" },
  { codigo: "234", nombre: "CARBAMAZEPINA (TEGRETOL)", unidad: "µg/mL", refMin: 4.0, refMax: 12.0, referencia: "4 - 12 µg/mL" },
  { codigo: "235", nombre: "CARBOXIHEMOGLOBINA \"COHB\" (HN)", unidad: "%", refMin: 0, refMax: 2.0, referencia: "0 - 2 % (no fumadores)" },
  { codigo: "236", nombre: "CARIOTIPO MEDULA OSEA (ESTUDIO CROMOSOMICO)", unidad: "", refMin: "", refMax: "", referencia: "46,XX / 46,XY (Cariotipo normal)" },
  { codigo: "237", nombre: "CARIOTIPO SANGRE PERIFERICA (ESTUDIO CROMOSOMICO)", unidad: "", refMin: "", refMax: "", referencia: "46,XX / 46,XY (Cariotipo normal)" },
  { codigo: "238", nombre: "CARNITINA TOTAL", unidad: "µmol/L", refMin: 34, refMax: 78, referencia: "34 - 78 µmol/L" },
  { codigo: "239", nombre: "CAROTENO SERICO", unidad: "µg/dL", refMin: 50, refMax: 250, referencia: "50 - 250 µg/dL" },
  { codigo: "240", nombre: "CATECOLAMINAS FRACCIONADAS (ORINA 24H)", unidad: "µg/24h", refMin: 0, refMax: 100, referencia: "Epinefrina < 20, Norepinefrina < 100" },
  { codigo: "241", nombre: "CATECOLAMINAS PLASMATICAS FRACCIONADAS", unidad: "pg/mL", refMin: 0, refMax: 500, referencia: "Epinefrina < 84, Norepinefrina < 420" },
  { codigo: "242", nombre: "CD34 - STEM CELL (SC)", unidad: "células/µL", refMin: 20, refMax: 100, referencia: "Según protocolo de aféresis" },
  { codigo: "243", nombre: "CELULAS DEL ISLOTE LANGERHANS. AUTOANTICUERPOS", unidad: "", refMin: "", refMax: "", referencia: "NEGATIVO" },
  { codigo: "244", nombre: "CELULAS NK NATURAL KILLER (CD56), SANGRE TOTAL", unidad: "%", refMin: 5, refMax: 20, referencia: "5 - 20 % de linfocitos" },
  { codigo: "245", nombre: "CELULAS PARIETALES ,AUTO ANTIC.", unidad: "", refMin: "", refMax: "", referencia: "NEGATIVO (< 1:20)" },
  { codigo: "246", nombre: "CENTROMERO , AUTOANTICUERPOS (IM)", unidad: "", refMin: "", refMax: "", referencia: "NEGATIVO" },
  { codigo: "247", nombre: "CERULOPLASMINA", unidad: "mg/dL", refMin: 27, refMax: 48, referencia: "27 - 48 mg/dL" },
  { codigo: "248", nombre: "CH 50 COMPLEMENTO", unidad: "U/mL", refMin: 60, refMax: 140, referencia: "60 - 140 U/mL" },
  { codigo: "250", nombre: "CHAGAS (TRIPANOZOMA CRUZI) ANTICUERPOS", unidad: "", refMin: "", refMax: "", referencia: "NO REACTIVO" },
  { codigo: "249", nombre: "CHAGAS - HEMOAGLUTINACIÓN (HAI)", unidad: "", refMin: "", refMax: "", referencia: "NEGATIVO (< 1:8)" },
  { codigo: "251", nombre: "CHLAMYDIA PNEUMONIAE (IGG)", unidad: "RU/mL", refMin: 0, refMax: 16, referencia: "Negativo: < 16 RU/mL" },
  { codigo: "252", nombre: "CHLAMYDIA PNEUMONIAE (IGM)", unidad: "RU/mL", refMin: 0, refMax: 16, referencia: "Negativo: < 16 RU/mL" },
  { codigo: "253", nombre: "CHLAMYDIA PSITACCI IGG", unidad: "", refMin: "", refMax: "", referencia: "Negativo: < 1:64" },
  { codigo: "254", nombre: "CHLAMYDIA PSITACCI IGM", unidad: "", refMin: "", refMax: "", referencia: "Negativo: < 1:10" },
  { codigo: "255", nombre: "CHLAMYDIA TRACHOMATIS , ADN X PCR", unidad: "", refMin: "", refMax: "", referencia: "NO DETECTADO" },
  { codigo: "257", nombre: "CHLAMYDIA TRACHOMATIS IGG (IM)", unidad: "U/mL", refMin: 0, refMax: 10, referencia: "Negativo: < 10 U/mL" },
  { codigo: "258", nombre: "CHLAMYDIA TRACHOMATIS IGM (IM)", unidad: "U/mL", refMin: 0, refMax: 10, referencia: "Negativo: < 10 U/mL" },
  { codigo: "259", nombre: "CICLOSPORA (HECES)", unidad: "", refMin: "", refMax: "", referencia: "NO SE OBSERVAN OOCISTES" },
  { codigo: "260", nombre: "CICLOSPORINA A", unidad: "ng/mL", refMin: 100, refMax: 400, referencia: "100 - 400 ng/mL (según trasplante)" },
  { codigo: "261", nombre: "CISTATINA C", unidad: "mg/L", refMin: 0.5, refMax: 1.5, referencia: "0.5 - 1.5 mg/L" },
  { codigo: "262", nombre: "CISTICERCOS ANTIC.TOTALES ELISA", unidad: "", refMin: "", refMax: "", referencia: "NO REACTIVO" },
  { codigo: "263", nombre: "CISTICERCOSIS (WESTER BLOT) SUERO", unidad: "", refMin: "", refMax: "", referencia: "NEGATIVO" },
  { codigo: "264", nombre: "CISTICERCUS (WESTER BLOT) L.C.R", unidad: "", refMin: "", refMax: "", referencia: "NEGATIVO" },
  { codigo: "265", nombre: "CISTICERCUS LCR EIA", unidad: "", refMin: "", refMax: "", referencia: "NO REACTIVO" },
  { codigo: "266", nombre: "CISTICERCUS WESTERN BLOT", unidad: "", refMin: "", refMax: "", referencia: "NEGATIVO" },
  { codigo: "267", nombre: "CISTINA ORINA 24 HORAS", unidad: "mg/24h", refMin: 0, refMax: 60, referencia: "< 60 mg/24h" },
  { codigo: "268", nombre: "CITOBIOQUIMICO", unidad: "", refMin: "", refMax: "", referencia: "SEÚN TIPO DE LÍQUIDO BIOLÓGICO" },
  { codigo: "269", nombre: "CITOMEGALOVIRUS ANTICUERPOS IGG, LCR", unidad: "", refMin: "", refMax: "", referencia: "NEGATIVO" },
  { codigo: "270", nombre: "CITOMEGALOVIRUS ANTICUERPOS IGM, LCR", unidad: "", refMin: "", refMax: "", referencia: "NEGATIVO" },
  { codigo: "271", nombre: "CITOMEGALOVIRUS CARGA VIRAL (CUANTITATIVO)", unidad: "copias/mL", refMin: 0, refMax: 200, referencia: "< 200 copias/mL" },
  { codigo: "272", nombre: "CITOMEGALOVIRUS DNA DETECTOR (CUALITATIVO)", unidad: "", refMin: "", refMax: "", referencia: "NO DETECTADO" },
  { codigo: "273", nombre: "CITOMELOGAVIRUS IGG", unidad: "U/mL", refMin: 0, refMax: 6, referencia: "Negativo: < 6 U/mL" },
  { codigo: "274", nombre: "CITOMELOGAVIRUS IGM", unidad: "Index", refMin: 0, refMax: 0.9, referencia: "Negativo: < 0.9 Index" },
  { codigo: "275", nombre: "CITOMETRIA DE FLUJO", unidad: "", refMin: "", refMax: "", referencia: "INFORME DE INMUNOFENOTIPO" },
  { codigo: "276", nombre: "CITOQUIMICO - LCR", unidad: "", refMin: "", refMax: "", referencia: "Proteínas 15-45 mg/dL, Glucosa 50-80 mg/dL" },
  { codigo: "277", nombre: "CITRATO (ORINA 24HRS)(ACIDO CITRICO)", unidad: "mg/24h", refMin: 320, refMax: 1240, referencia: "> 320 mg/24h" },
  { codigo: "279", nombre: "CLOBAZAM, NORCLOBAZAM Y RATIO, SUERO", unidad: "ng/mL", refMin: 30, refMax: 300, referencia: "30 - 300 ng/mL" },
  { codigo: "280", nombre: "CLONAZEPAM (RIVOTRIL)", unidad: "ng/mL", refMin: 20, refMax: 70, referencia: "20 - 70 ng/mL" },
  { codigo: "281", nombre: "CLORO EN SUERO", unidad: "mmol/L", refMin: 96, refMax: 109, referencia: "96 - 109 mmol/L" },
  { codigo: "282", nombre: "CLOSTRIDIUM DIFFICILE TOXINA A/B", unidad: "", refMin: "", refMax: "", referencia: "NEGATIVO" },
  { codigo: "283", nombre: "COAGLUTINACION, ANTIGENOS BACTERIANOS LCR", unidad: "", refMin: "", refMax: "", referencia: "NEGATIVO" },
  { codigo: "284", nombre: "COBRE (ORINA 24 HORAS)", unidad: "µg/24h", refMin: 15, refMax: 60, referencia: "15 - 60 µg/24h" },
  { codigo: "285", nombre: "COBRE SERICO", unidad: "µg/dL", refMin: 70, refMax: 155, referencia: "70 - 155 µg/dL" },
  { codigo: "286", nombre: "COCAÍNA EN ORINA", unidad: "ng/mL", refMin: 0, refMax: 300, referencia: "Negativo: < 300 ng/mL" },
  { codigo: "287", nombre: "COCAINA PBC (ORINA SIMPLE) - AUTOMATIZADO (HN)", unidad: "", refMin: "", refMax: "", referencia: "NEGATIVO" },
  { codigo: "288", nombre: "COCAINA PBC (ORINA SIMPLE) - CCF CONFIRMATORIO CUALITOXICOLOGICO", unidad: "", refMin: "", refMax: "", referencia: "NEGATIVO" },
  { codigo: "289", nombre: "COCAINA PBC (ORINA SIMPLE) - CUALITATIVO", unidad: "", refMin: "", refMax: "", referencia: "NEGATIVO" },
  { codigo: "290", nombre: "COCAINA PBC (ORINA SIMPLE) - HPLC CONFIRMATORIO CON CROMATOGRAMA", unidad: "ng/mL", refMin: 0, refMax: 150, referencia: "Negativo: < 150 ng/mL" },
  { codigo: "291", nombre: "COCAINA PBC (ORINA SIMPLE) - HPLC CONFIRMATORIO SIN CROMATOGRAMA", unidad: "ng/mL", refMin: 0, refMax: 150, referencia: "Negativo: < 150 ng/mL" },
  { codigo: "292", nombre: "COCCIDIOSIS , ANTICUERPOS (COCCIDIOMICOSIS)", unidad: "", refMin: "", refMax: "", referencia: "NEGATIVO" },
  { codigo: "293", nombre: "COCIENTE SFLT-1/PIGF (PREDICCIÓN DEL RIESGO DE PREECLAMPSIA)", unidad: "Ratio", refMin: 0, refMax: 38, referencia: "< 38 (Bajo riesgo)" },
  { codigo: "294", nombre: "COFACTOR DE LA RISTOCETINA (VWF)", unidad: "%", refMin: 50, refMax: 150, referencia: "50 - 150 %" },
  { codigo: "295", nombre: "COLESTEROL - HDL", unidad: "mg/dL", refMin: 40, refMax: 60, referencia: "> 40 mg/dL (Varones), > 50 mg/dL (Mujeres)" },
  { codigo: "296", nombre: "COLESTEROL LDL", unidad: "mg/dL", refMin: 0, refMax: 100, referencia: "< 100 mg/dL (Deseable)" },
  { codigo: "297", nombre: "COLESTEROL TOTAL", unidad: "mg/dL", refMin: 0, refMax: 200, referencia: "< 200 mg/dL (Deseable)" },
  { codigo: "298", nombre: "COLESTEROL VLDL", unidad: "mg/dL", refMin: 2, refMax: 30, referencia: "< 30 mg/dL" },
  { codigo: "299", nombre: "COLESTEROL-ESTERES", unidad: "%", refMin: 60, refMax: 75, referencia: "60 - 75 % del Colesterol Total" },
  { codigo: "300", nombre: "COLINESTERASA ERITROCITARIA", unidad: "U/g Hb", refMin: 29, refMax: 44, referencia: "29 - 44 U/g Hb" },
  { codigo: "301", nombre: "COLORACION ALCIAN BLUE PARA BIOPSIA", unidad: "", refMin: "", refMax: "", referencia: "VER INFORME HISTOQUÍMICO" },
  { codigo: "302", nombre: "COLORACION BK FITE FARACO PARA BIOPSIA", unidad: "", refMin: "", refMax: "", referencia: "VER INFORME HISTOQUÍMICO" },
  { codigo: "303", nombre: "COLORACION GIEMSA PARA BIOPSIA", unidad: "", refMin: "", refMax: "", referencia: "VER INFORME HISTOQUÍMICO" },
  { codigo: "304", nombre: "COLORACION GRAM PARA BIOPSIA", unidad: "", refMin: "", refMax: "", referencia: "VER INFORME HISTOQUÍMICO" },
  { codigo: "305", nombre: "COLORACION GROCOT PARA BIOPSIA", unidad: "", refMin: "", refMax: "", referencia: "VER INFORME HISTOQUÍMICO" },
  { codigo: "306", nombre: "COLORACION HIERRO COLOIDAL PARA BIOPSIA", unidad: "", refMin: "", refMax: "", referencia: "VER INFORME HISTOQUÍMICO" },
  { codigo: "307", nombre: "COLORACION MALLORY PARA BIOPSIA", unidad: "", refMin: "", refMax: "", referencia: "VER INFORME HISTOQUÍMICO" },
  { codigo: "308", nombre: "COLORACION MASSON FONTANA PARA BIOPSIA", unidad: "", refMin: "", refMax: "", referencia: "VER INFORME HISTOQUÍMICO" },
  { codigo: "309", nombre: "COLORACION PAS ALCIAN BLUE PARA BIOPSIA", unidad: "", refMin: "", refMax: "", referencia: "VER INFORME HISTOQUÍMICO" },
  { codigo: "310", nombre: "COLORACION PAS DIASTASA PARA BIOPSIA", unidad: "", refMin: "", refMax: "", referencia: "VER INFORME HISTOQUÍMICO" },
  { codigo: "311", nombre: "COLORACION PAS PARA BIOPSIA", unidad: "", refMin: "", refMax: "", referencia: "VER INFORME HISTOQUÍMICO" },
  { codigo: "312", nombre: "COLORACION PERLS PARA BIOPSIA", unidad: "", refMin: "", refMax: "", referencia: "VER INFORME HISTOQUÍMICO" },
  { codigo: "313", nombre: "COLORACION PLATA METALAMINE PARA BIOPSIA", unidad: "", refMin: "", refMax: "", referencia: "VER INFORME HISTOQUÍMICO" },
  { codigo: "314", nombre: "COLORACION RETICULINA PARA BIOPSIA", unidad: "", refMin: "", refMax: "", referencia: "VER INFORME HISTOQUÍMICO" },
  { codigo: "315", nombre: "COLORACION ROJO CONGO PARA BIOPSIA", unidad: "", refMin: "", refMax: "", referencia: "VER INFORME HISTOQUÍMICO" },
  { codigo: "316", nombre: "COLORACION VERHOFF - FIBRAS ELÁSTICAS PARA BIOPSIA", unidad: "", refMin: "", refMax: "", referencia: "VER INFORME HISTOQUÍMICO" },
  { codigo: "317", nombre: "COLORACION VON KOSSA PARA BIOPSIA", unidad: "", refMin: "", refMax: "", referencia: "VER INFORME HISTOQUÍMICO" },
  { codigo: "318", nombre: "COMPLEMENTO C1", unidad: "mg/dL", refMin: 15, refMax: 25, referencia: "15 - 25 mg/dL" },
  { codigo: "319", nombre: "COMPLEMENTO C1Q", unidad: "mg/dL", refMin: 10, refMax: 25, referencia: "10 - 25 mg/dL" },
  { codigo: "320", nombre: "COMPLEMENTO C2", unidad: "mg/dL", refMin: 1.5, refMax: 4.0, referencia: "1.5 - 4.0 mg/dL" },
  { codigo: "321", nombre: "COMPLEMENTO C3", unidad: "mg/dL", refMin: 90, refMax: 180, referencia: "90 - 180 mg/dL" },
  { codigo: "323", nombre: "COMPLEMENTO C4", unidad: "mg/dL", refMin: 10, refMax: 40, referencia: "10 - 40 mg/dL" },
  { codigo: "325", nombre: "COMPLEMENTO C5", unidad: "mg/dL", refMin: 8, refMax: 15, referencia: "8 - 15 mg/dL" },
  { codigo: "326", nombre: "COMPLEMENTO C8", unidad: "mg/dL", refMin: 1.3, refMax: 3.5, referencia: "1.3 - 3.5 mg/dL" },
  { codigo: "327", nombre: "CONSTANTES CORPUSCULARES", unidad: "", refMin: "", refMax: "", referencia: "VCM: 83-97 fL, HCM: 27-32 pg, CCMH: 32-36 g/dL" },
  { codigo: "1163", nombre: "CONSULTA ESPECIALIDAD METABOLISMO", unidad: "", refMin: "", refMax: "", referencia: "EVALUACIÓN MÉDICA" },
  { codigo: "1161", nombre: "CONSULTA MEDICO GENERAL", unidad: "", refMin: "", refMax: "", referencia: "EVALUACIÓN MÉDICA" },
  { codigo: "328", nombre: "COPROCULTIVO", unidad: "", refMin: "", refMax: "", referencia: "NO SE AISLAN ENTEROPATÓGENOS" },
  { codigo: "329", nombre: "COPROLOGICO FUNCIONAL", unidad: "", refMin: "", refMax: "", referencia: "pH 6.0-8.0, Reacción neutra, Grasas/Almidón/Levaduras: Negativo" },
  { codigo: "330", nombre: "CORONAVIRUS SARS COV-2", unidad: "", refMin: "", refMax: "", referencia: "NO DETECTADO / NEGATIVO" },
  { codigo: "332", nombre: "CORTISOL AM", unidad: "µg/dL", refMin: 6.2, refMax: 19.4, referencia: "6.2 - 19.4 µg/dL (8:00 AM)" },
  { codigo: "333", nombre: "CORTISOL LIBRE (ORINA 24 HORAS)", unidad: "µg/24h", refMin: 10, refMax: 100, referencia: "10 - 100 µg/24h" },
  { codigo: "334", nombre: "CORTISOL P.M.", unidad: "µg/dL", refMin: 2.3, refMax: 11.9, referencia: "2.3 - 11.9 µg/dL (4:00 PM)" },
  { codigo: "335", nombre: "CORTISOL SALIVA A.M.", unidad: "ng/mL", refMin: 1.0, refMax: 8.0, referencia: "1.0 - 8.0 ng/mL" },
  { codigo: "336", nombre: "CORTISOL SALIVA P.M.", unidad: "ng/mL", refMin: 0.1, refMax: 1.5, referencia: "< 1.5 ng/mL" },
  { codigo: "337", nombre: "COTININA EN ORINA SIMPLE (NICOTINA)", unidad: "ng/mL", refMin: 0, refMax: 200, referencia: "No fumador: < 200 ng/mL" },
  { codigo: "338", nombre: "COTININA EN SANGRE", unidad: "ng/mL", refMin: 0, refMax: 15, referencia: "No fumador: < 15 ng/mL" },
  { codigo: "339", nombre: "COVID- PRUEBA RAPIDA", unidad: "", refMin: "", refMax: "", referencia: "NO REACTIVO" },
  { codigo: "340", nombre: "COVID-19 MOLECULAR PCR (PROCESAMIENTO)", unidad: "", refMin: "", refMax: "", referencia: "NO DETECTADO" },
  { codigo: "341", nombre: "COXSACKIE A VIRUS, ANTICUERPO", unidad: "", refMin: "", refMax: "", referencia: "Negativo: < 1:10" },
  { codigo: "342", nombre: "COXSACKIE B (1-6) ANTICUERPOS IGG SUERO", unidad: "", refMin: "", refMax: "", referencia: "Negativo: < 1:10" },
  { codigo: "343", nombre: "COXSACKIE B ANTICUERPOS IGM", unidad: "", refMin: "", refMax: "", referencia: "NEGATIVO" },
  { codigo: "344", nombre: "CPK MB (CREATIN FOSOFOKINASA-MB)", unidad: "U/L", refMin: 0, refMax: 25, referencia: "< 25 U/L (< 6% de CPK Total)" },
  { codigo: "345", nombre: "CPK TOTAL (CREATIN FOSFOKINASA TOTAL)", unidad: "U/L", refMin: 45, refMax: 170, referencia: "45 - 170 U/L (Hombre), 45 - 135 U/L (Mujer)" },
  { codigo: "346", nombre: "CREATINFOSFOQUINASA (CPK TOTAL) (HN)", unidad: "U/L", refMin: 45, refMax: 170, referencia: "45 - 170 U/L" },
  { codigo: "349", nombre: "CREATININA (ORINA SIMPLE)", unidad: "mg/dL", refMin: 20, refMax: 320, referencia: "20 - 320 mg/dL" },
  { codigo: "347", nombre: "CREATININA - DEPURACION ORINA 12 HRS", unidad: "mL/min", refMin: 90, refMax: 140, referencia: "90 - 140 mL/min/1.73m²" },
  { codigo: "1158", nombre: "CREATININA - DEPURACION ORINA 24 HRS", unidad: "mL/min", refMin: 90, refMax: 140, referencia: "90 - 140 mL/min/1.73m²" },
  { codigo: "348", nombre: "CREATININA - ORINA 24 HRS", unidad: "g/24h", refMin: 0.8, refMax: 2.0, referencia: "0.8 - 2.0 g/24h" },
  { codigo: "350", nombre: "CREATININA POST", unidad: "mg/dL", refMin: 0.6, refMax: 1.3, referencia: "0.6 - 1.3 mg/dL" },
  { codigo: "351", nombre: "CREATININA SERICA", unidad: "mg/dL", refMin: 0.6, refMax: 1.3, referencia: "0.6 - 1.3 mg/dL (Hombre), 0.6 - 1.1 mg/dL (Mujer)" },
  { codigo: "352", nombre: "CRIOAGLUTININAS", unidad: "", refMin: "", refMax: "", referencia: "NEGATIVO (< 1:32)" },
  { codigo: "353", nombre: "CRIOGLOBULINAS", unidad: "mg/dL", refMin: 0, refMax: 2, referencia: "NEGATIVO (< 2 mg/dL)" },
  { codigo: "354", nombre: "CRYPTOSPORIDIUM (HECES)", unidad: "", refMin: "", refMax: "", referencia: "NO SE OBSERVAN OOCISTES" },
  { codigo: "355", nombre: "CROMO EN ORINA 24 HORAS", unidad: "µg/24h", refMin: 0, refMax: 2.0, referencia: "< 2.0 µg/24h" },
  { codigo: "356", nombre: "CROMO SANGRE TOTAL", unidad: "µg/L", refMin: 0, refMax: 1.4, referencia: "< 1.4 µg/L" },
  { codigo: "357", nombre: "CROMOGRANINA A", unidad: "ng/mL", refMin: 0, refMax: 100, referencia: "< 100 ng/mL" },
  { codigo: "358", nombre: "CRYPTOCOCCUS ANTICUERPOS", unidad: "", refMin: "", refMax: "", referencia: "NEGATIVO" },
  { codigo: "359", nombre: "CRYPTOCOCCUS ANTIGENO (LATEX)", unidad: "", refMin: "", refMax: "", referencia: "NEGATIVO" },
  { codigo: "360", nombre: "CRYPTOCOCCUS ANTIGENO LATEX (EN SUERO)", unidad: "", refMin: "", refMax: "", referencia: "NEGATIVO" },
  { codigo: "361", nombre: "CRYPTOCOCCUS, ANTIGENO LATEX (EN LCR)", unidad: "", refMin: "", refMax: "", referencia: "NEGATIVO" },
  { codigo: "362", nombre: "CTX BETA CROSSLAPS (BETA C-TELOPEPTIDO)", unidad: "ng/mL", refMin: 0.1, refMax: 0.7, referencia: "Según estado menopáusico / edad" },
  { codigo: "363", nombre: "CULTIVO (GERMENES COMUNES)", unidad: "", refMin: "", refMax: "", referencia: "SIN DESARROLLO BACTERIANO" },
  { codigo: "364", nombre: "CULTIVO DE BK", unidad: "", refMin: "", refMax: "", referencia: "SIN DESARROLLO DE M. TUBERCULOSIS" },
  { codigo: "366", nombre: "CULTIVO DE ESPUTO", unidad: "", refMin: "", refMax: "", referencia: "DESARROLLO DE FLORA DE BOCA" },
  { codigo: "365", nombre: "CULTIVO DE ESPUTO ( GERMENES COMUNES )", unidad: "", refMin: "", refMax: "", referencia: "DESARROLLO DE FLORA HABITUAL" },
  { codigo: "367", nombre: "CULTIVO DE HONGOS", unidad: "", refMin: "", refMax: "", referencia: "SIN DESARROLLO MICÓTICO" },
  { codigo: "368", nombre: "CULTIVO DE LCR", unidad: "", refMin: "", refMax: "", referencia: "ESTÉRIL" },
  { codigo: "369", nombre: "CULTIVO DE LIQUIDO ASCITICO", unidad: "", refMin: "", refMax: "", referencia: "ESTÉRIL" },
  { codigo: "370", nombre: "CULTIVO DE SECRECIÓN CON MIC", unidad: "", refMin: "", refMax: "", referencia: "SIN DESARROLLO BACTERIANO PATÓGENO" },
  { codigo: "371", nombre: "CULTIVO DE SECRECION CONJUNTIVAL", unidad: "", refMin: "", refMax: "", referencia: "SIN DESARROLLO PATÓGENO" },
  { codigo: "372", nombre: "CULTIVO DE SECRECION FARINGEA", unidad: "", refMin: "", refMax: "", referencia: "FLORA HABITUAL DE FARINGE" },
  { codigo: "373", nombre: "CULTIVO DE SECRECION OTICA", unidad: "", refMin: "", refMax: "", referencia: "SIN DESARROLLO PATÓGENO" },
  { codigo: "374", nombre: "CULTIVO DE SECRECION PARANASAL", unidad: "", refMin: "", refMax: "", referencia: "SIN DESARROLLO PATÓGENO" },
  { codigo: "375", nombre: "CULTIVO DE SECRECION URETRAL", unidad: "", refMin: "", refMax: "", referencia: "SIN DESARROLLO PATÓGENO" },
  { codigo: "377", nombre: "CULTIVO DE SECRECION VAGINAL", unidad: "", refMin: "", refMax: "", referencia: "FLORA HABITUAL VAGINAL" },
  { codigo: "378", nombre: "CULTIVO DE SEMEN (ESPERMA) (ED + ATB)", unidad: "", refMin: "", refMax: "", referencia: "ESTÉRIL" },
  { codigo: "379", nombre: "CULTIVO LCR", unidad: "", refMin: "", refMax: "", referencia: "ESTÉRIL" },
  { codigo: "380", nombre: "CULTIVO LIQUIDO PLEURAL", unidad: "", refMin: "", refMax: "", referencia: "ESTÉRIL" },
  { codigo: "381", nombre: "CULTIVO LIQUIDO SINOVIAL", unidad: "", refMin: "", refMax: "", referencia: "ESTÉRIL" },
  { codigo: "382", nombre: "CULTIVO OTROS", unidad: "", refMin: "", refMax: "", referencia: "SIN DESARROLLO PATÓGENO" },
  { codigo: "383", nombre: "CULTIVOS (OTROS)", unidad: "", refMin: "", refMax: "", referencia: "SIN DESARROLLO PATÓGENO" },
  { codigo: "384", nombre: "CULTIVOS DE GERMENES COMUNES", unidad: "", refMin: "", refMax: "", referencia: "SIN DESARROLLO BACTERIANO" },
  { codigo: "385", nombre: "CYFRA 21-1 (CK19)", unidad: "ng/mL", refMin: 0, refMax: 3.3, referencia: "< 3.3 ng/mL" },
  { codigo: "386", nombre: "DEMODEX FOLICULORUM", unidad: "", refMin: "", refMax: "", referencia: "NEGATIVO" },
  { codigo: "387", nombre: "DENGUE ANTIGENO NS1 CUALITATIVO", unidad: "", refMin: "", refMax: "", referencia: "NO REACTIVO" },
  { codigo: "388", nombre: "DENGUE VIRUS ANTICUERPOS IGG + IGM CUALITATIVO (IM)", unidad: "", refMin: "", refMax: "", referencia: "NO REACTIVO" },
  { codigo: "389", nombre: "DENGUE VIRUS ANTICUERPOS IGG CUANTITATIVO (IM)", unidad: "Index", refMin: 0, refMax: 0.9, referencia: "Negativo: < 0.9" },
  { codigo: "390", nombre: "DENGUE VIRUS ANTICUERPOS IGM CUANTITATIVO (IM)", unidad: "Index", refMin: 0, refMax: 0.9, referencia: "Negativo: < 0.9" },
  { codigo: "391", nombre: "DENSIDAD URINARIA", unidad: "", refMin: 1.005, refMax: 1.030, referencia: "1.005 - 1.030" },
  { codigo: "392", nombre: "DEOXYPIRIDINOLINA D-PYR (ORINA 24H)", unidad: "nM BCE/mM Creat", refMin: 2.3, refMax: 7.4, referencia: "2.3 - 7.4 nM BCE/mM Creatinina" },
  { codigo: "394", nombre: "DEPURACION DE CREATININA", unidad: "mL/min", refMin: 90, refMax: 140, referencia: "90 - 140 mL/min/1.73m²" },
  { codigo: "393", nombre: "DEPURACION DE CREATININA ENDOGENA", unidad: "mL/min", refMin: 90, refMax: 140, referencia: "90 - 140 mL/min/1.73m²" },
  { codigo: "395", nombre: "DEPURACIONDECREATININA -ORINA24HORAS", unidad: "mL/min", refMin: 90, refMax: 140, referencia: "90 - 140 mL/min/1.73m²" },
  { codigo: "396", nombre: "DESHIDROGENASA LACTICA (LDH) DHL", unidad: "U/L", refMin: 135, refMax: 225, referencia: "135 - 225 U/L" },
  { codigo: "397", nombre: "DESPISTAJE ALERGICO AMPLIADO (295 ALERGENOS)", unidad: "", refMin: "", refMax: "", referencia: "CLASE 0 (NO DETECTABLE)" },
  { codigo: "398", nombre: "DESPISTAJE ALERGICO BASICO (32 ALERGENOS)", unidad: "", refMin: "", refMax: "", referencia: "CLASE 0 (NO DETECTABLE)" },
  { codigo: "399", nombre: "DESPISTAJE ALERGICO BASICO (36 ALERGENOS) (IM)", unidad: "", refMin: "", refMax: "", referencia: "CLASE 0 (NO DETECTABLE)" },
  { codigo: "400", nombre: "DESPISTAJE ALERGICO BASICO (36 ALERGENOS) PANEL PERUANO (IM)", unidad: "", refMin: "", refMax: "", referencia: "CLASE 0 (NO DETECTABLE)" },
  { codigo: "2", nombre: "DESPISTAJE ALERGICO BASICO (44 ALERGENOS) PANEL PERUANO (IM)", unidad: "", refMin: "", refMax: "", referencia: "CLASE 0 (NO DETECTABLE)" },
  { codigo: "401", nombre: "DHEA-S (SULFATO DE DESHIDROEPIANDROSTERONA)", unidad: "µg/dL", refMin: 80, refMax: 560, referencia: "Según edad y sexo" },
  { codigo: "402", nombre: "DHL- ISOENZIMAS", unidad: "%", refMin: 14, refMax: 37, referencia: "LDH-1: 14-26%, LDH-2: 29-37%" },
  { codigo: "403", nombre: "DIAZEPAN", unidad: "ng/mL", refMin: 200, refMax: 1000, referencia: "200 - 1000 ng/mL" },
  { codigo: "404", nombre: "DIFENIL HIDANTOINA (FENITOINA)(EPAMIN, DILANTIN)", unidad: "µg/mL", refMin: 10.0, refMax: 20.0, referencia: "10 - 20 µg/mL" },
  { codigo: "405", nombre: "DIFENIL HIDANTOINA LIBRE", unidad: "µg/mL", refMin: 1.0, refMax: 2.0, referencia: "1 - 2 µg/mL" },
  { codigo: "406", nombre: "DIGOXINA", unidad: "ng/mL", refMin: 0.8, refMax: 2.0, referencia: "0.8 - 2.0 ng/mL" },
  { codigo: "407", nombre: "DIHIDROTESTOSTERONA DHT", unidad: "pg/mL", refMin: 250, refMax: 990, referencia: "250 - 990 pg/mL (Varones)" },
  { codigo: "408", nombre: "DIMERO D", unidad: "ng/mL FEU", refMin: 0, refMax: 500, referencia: "< 500 ng/mL FEU" },
  { codigo: "410", nombre: "DOSAJE DE ACTH", unidad: "pg/mL", refMin: 7.2, refMax: 63.3, referencia: "7.2 - 63.3 pg/mL (8:00 AM)" },
  { codigo: "411", nombre: "DOSAJE DE AMIKACINA", unidad: "µg/mL", refMin: 15, refMax: 30, referencia: "Pico: 15 - 30 µg/mL" },
  { codigo: "412", nombre: "DOSAJE DE EVEROLIMUS (CDX)", unidad: "ng/mL", refMin: 3.0, refMax: 8.0, referencia: "3 - 8 ng/mL" },
  { codigo: "413", nombre: "DOSAJE DE INMUNOGLOBULINAS A,G Y M", unidad: "mg/dL", refMin: 60, refMax: 1800, referencia: "IgA: 90-400, IgG: 800-1800, IgM: 60-250" },
  { codigo: "414", nombre: "ECHOVIRUS, ANTC. (4, 9, 11, 30)", unidad: "", refMin: "", refMax: "", referencia: "Negativo: < 1:10" },
  { codigo: "415", nombre: "ECOGRAFÍA ABDOMINAL", unidad: "", refMin: "", refMax: "", referencia: "INFORME ECOGRÁFICO" },
  { codigo: "416", nombre: "ECOGRAFÍA OBSTETRICA/GINECO", unidad: "", refMin: "", refMax: "", referencia: "INFORME ECOGRÁFICO" },
  { codigo: "417", nombre: "ECOGRAFÍA PARTES BLANDAS", unidad: "", refMin: "", refMax: "", referencia: "INFORME ECOGRÁFICO" },
  { codigo: "418", nombre: "ECOGRAFÍA PELVICA", unidad: "", refMin: "", refMax: "", referencia: "INFORME ECOGRÁFICO" },
  { codigo: "419", nombre: "ECOGRAFÍA PROSTATICA (ABD)", unidad: "", refMin: "", refMax: "", referencia: "INFORME ECOGRÁFICO" },
  { codigo: "420", nombre: "ECOGRAFÍA PROSTATICA (TR)", unidad: "", refMin: "", refMax: "", referencia: "INFORME ECOGRÁFICO" },
  { codigo: "421", nombre: "ECOGRAFÍA RENO-VISECAL", unidad: "", refMin: "", refMax: "", referencia: "INFORME ECOGRÁFICO" },
  { codigo: "422", nombre: "EDN FECAL (NEUROTOXINA DERIVADA DE EOSINOFILOS)", unidad: "ng/mL", refMin: 0, refMax: 360, referencia: "< 360 ng/mL" },
  { codigo: "423", nombre: "ELASTASA PANCREATICA FECAL (ESPECIAL)", unidad: "µg/g", refMin: 200, refMax: 500, referencia: "> 200 µg/g Heces" },
  { codigo: "424", nombre: "ELECTROFORESIS DE HEMOGLOBINA", unidad: "%", refMin: 95, refMax: 98, referencia: "HbA: 95-98%, HbA2: 1.5-3.5%, HbF: < 2%" },
  { codigo: "425", nombre: "ELECTROLITOS (NA,K,CL)", unidad: "mmol/L", refMin: 3.5, refMax: 145, referencia: "Na: 135-145, K: 3.5-5.0, Cl: 96-109" },
  { codigo: "426", nombre: "ELECTROLITOS (ORINA 24 HORAS)", unidad: "mmol/24h", refMin: 25, refMax: 220, referencia: "Na: 40-220, K: 25-125, Cl: 110-250" },
  { codigo: "427", nombre: "ELECTROLITOS ORINA SIMPLE", unidad: "mmol/L", refMin: 10, refMax: 100, referencia: "Depende del estado de hidratación" },
  { codigo: "428", nombre: "ENA - PERFIL AUTOINMUNE (IM)", unidad: "", refMin: "", refMax: "", referencia: "PANEL NEGATIVO" },
  { codigo: "429", nombre: "ENDOMISIO, AUTOANTIC. (EMA) AC TOTALES", unidad: "", refMin: "", refMax: "", referencia: "NEGATIVO (< 1:10)" },
  { codigo: "430", nombre: "EOSINOFILOS EN SECRECION (OTROS)", unidad: "%", refMin: 0, refMax: 5, referencia: "0 - 5 %" },
  { codigo: "431", nombre: "EOSINOFILOS EN SECRECION NASAL", unidad: "%", refMin: 0, refMax: 1, referencia: "< 1 %" },
  { codigo: "432", nombre: "EPSTEIN BAR VIRUS EBNA IGG (IM)", unidad: "U/mL", refMin: 0, refMax: 5, referencia: "Negativo: < 5 U/mL" },
  { codigo: "433", nombre: "EPSTEIN BAR VIRUS EBNA IGM", unidad: "U/mL", refMin: 0, refMax: 5, referencia: "Negativo: < 5 U/mL" },
  { codigo: "434", nombre: "EPSTEIN BAR VIRUS VCA IGG (IM)", unidad: "U/mL", refMin: 0, refMax: 20, referencia: "Negativo: < 20 U/mL" },
  { codigo: "435", nombre: "EPSTEIN BAR VIRUS VCA IGM (IM)", unidad: "U/mL", refMin: 0, refMax: 20, referencia: "Negativo: < 20 U/mL" },
  { codigo: "436", nombre: "EPSTEIN BARR (EBNA) IGG", unidad: "U/mL", refMin: 0, refMax: 5, referencia: "Negativo: < 5 U/mL" },
  { codigo: "437", nombre: "EPSTEIN BARR (EBNA) IGG - IGM", unidad: "U/mL", refMin: 0, refMax: 20, referencia: "Negativo: < 20 U/mL" },
  { codigo: "438", nombre: "EPSTEIN BARR (EBNA) IGM", unidad: "U/mL", refMin: 0, refMax: 5, referencia: "Negativo: < 5 U/mL" },
  { codigo: "439", nombre: "EPSTEIN BARR VIRUS, CARGA VIRAL", unidad: "copias/mL", refMin: 0, refMax: 200, referencia: "< 200 copias/mL" },
  { codigo: "440", nombre: "EPSTEIN BARR VIRUS, EARLY ANTIGEN (EA) (IM)", unidad: "U/mL", refMin: 0, refMax: 10, referencia: "Negativo: < 10 U/mL" },
  { codigo: "441", nombre: "ERITROPOYETINA", unidad: "mU/mL", refMin: 4.3, refMax: 29.0, referencia: "4.3 - 29.0 mU/mL" },
  { codigo: "442", nombre: "ERITROPOYETINA SERICA", unidad: "mU/mL", refMin: 4.3, refMax: 29.0, referencia: "4.3 - 29.0 mU/mL" },
  { codigo: "443", nombre: "ESPECIALES", unidad: "", refMin: "", refMax: "", referencia: "SEGÚN PRUEBA SOLICITADA" },
  { codigo: "444", nombre: "ESPERMATOGRAMA", unidad: "mill/mL", refMin: 15, refMax: 200, referencia: "Volumen ≥ 1.5 mL, Conc ≥ 15 mill/mL, Movilidad Progresiva ≥ 32%" },
  { codigo: "446", nombre: "ESPERMATOZOIDES , AC (SEMEN)", unidad: "%", refMin: 0, refMax: 20, referencia: "< 20 %" },
  { codigo: "447", nombre: "ESPERMATOZOIDES , AC. SUERO", unidad: "U/mL", refMin: 0, refMax: 60, referencia: "Negativo: < 60 U/mL" },
  { codigo: "448", nombre: "ESTEATOCRITO (ACIDO)", unidad: "%", refMin: 0, refMax: 2, referencia: "< 2 %" },
  { codigo: "449", nombre: "ESTRADIOL", unidad: "pg/mL", refMin: 15, refMax: 350, referencia: "Según fase menstrual / Varones: 10-50 pg/mL" },
  { codigo: "451", nombre: "ESTRADIOL LIBRE", unidad: "pg/mL", refMin: 0.2, refMax: 5.0, referencia: "Según fase ciclo menstrual" },
  { codigo: "1162", nombre: "ESTRADIOL LIBRE (L2)", unidad: "pg/mL", refMin: 0.2, refMax: 5.0, referencia: "Según fase ciclo menstrual" },
  { codigo: "453", nombre: "ESTREPTOCOCO ß-HEMOLITICO GRUPO A (PYOGENES)", unidad: "", refMin: "", refMax: "", referencia: "NO DETECTADO / NEGATIVO" },
  { codigo: "454", nombre: "ESTRIOL LIBRE", unidad: "ng/mL", refMin: 0.2, refMax: 30, referencia: "Según semanas de gestación" },
  { codigo: "455", nombre: "ESTRIOL TOTAL", unidad: "ng/mL", refMin: 0.2, refMax: 30, referencia: "Según semanas de gestación" },
  { codigo: "456", nombre: "ESTRONA SULFATO", unidad: "ng/dL", refMin: 15, refMax: 350, referencia: "Según edad y estado gonadal" },
  { codigo: "457", nombre: "ESTUDIO DE COCCIDIOS (HECES)", unidad: "", refMin: "", refMax: "", referencia: "NO SE OBSERVAN OOCISTES" },
  { codigo: "458", nombre: "ESTUDIO MOLECULAR HLA-DRB1 (BAJA RESOLUCION)", unidad: "", refMin: "", refMax: "", referencia: "INFORME GENOTÍPICO" },
  { codigo: "459", nombre: "EXAMEN COMPLETO DE ORINA", unidad: "", refMin: "", refMax: "", referencia: "Densidad 1.005-1.030, pH 5.0-8.0, Leucocitos 0-5/campo, Hematíes 0-2/campo" },
  { codigo: "460", nombre: "EXAMEN DE ORINA COMPLETO", unidad: "", refMin: "", refMax: "", referencia: "Densidad 1.005-1.030, pH 5.0-8.0, Leucocitos 0-5/campo, Hematíes 0-2/campo" },
  { codigo: "461", nombre: "EXAMEN DIRECTO (HONGO KOH)", unidad: "", refMin: "", refMax: "", referencia: "NO SE OBSERVAN ELEMENTOS MICÓTICOS" },
  { codigo: "463", nombre: "EXAMEN DIRECTO DE SECRECION VAGINAL (TRICHOMONA)", unidad: "", refMin: "", refMax: "", referencia: "NO SE OBSERVAN TRICHOMONAS NI LEVADURAS" },
  { codigo: "464", nombre: "EXTASIS CUALITATIVO (ORINA SIMPLE)", unidad: "", refMin: "", refMax: "", referencia: "NEGATIVO" },
  { codigo: "466", nombre: "F-ACTINA, AUTOANTICUERPOS IGG", unidad: "Units", refMin: 0, refMax: 20, referencia: "Negativo: < 20 Units" },
  { codigo: "467", nombre: "FACTOR INTRINSECO , ANTICUERPOS", unidad: "AU/mL", refMin: 0, refMax: 1.2, referencia: "Negativo: < 1.2 AU/mL" },
  { codigo: "468", nombre: "FACTOR IX", unidad: "%", refMin: 60, refMax: 140, referencia: "60 - 140 %" },
  { codigo: "469", nombre: "FACTOR REMATOIDEO ( LATEX )", unidad: "IU/mL", refMin: 0, refMax: 20, referencia: "Negativo: < 20 IU/mL" },
  { codigo: "471", nombre: "FACTOR REUMATOIDEO CUALITATIVO (LATEX)", unidad: "", refMin: "", refMax: "", referencia: "NO REACTIVO" },
  { codigo: "472", nombre: "FACTOR REUMATOIDEO CUANTITATIVO", unidad: "IU/mL", refMin: 0, refMax: 20, referencia: "Negativo: < 20 IU/mL" },
  { codigo: "473", nombre: "FACTOR V", unidad: "%", refMin: 70, refMax: 120, referencia: "70 - 120 %" },
  { codigo: "474", nombre: "FACTOR V DE LEIDEN, MUTACION X PCR EN", unidad: "", refMin: "", refMax: "", referencia: "GENOTIPO NORMAL (SIN MUTACIÓN G1691A)" },
  { codigo: "475", nombre: "FACTOR VII", unidad: "%", refMin: 60, refMax: 140, referencia: "60 - 140 %" },
  { codigo: "476", nombre: "FACTOR VIII", unidad: "%", refMin: 50, refMax: 150, referencia: "50 - 150 %" },
  { codigo: "477", nombre: "FACTOR VIII INHIBIDORES CIRCULANTES", unidad: "UB", refMin: 0, refMax: 0.6, referencia: "Negativo: < 0.6 Unidades Bethesda" },
  { codigo: "478", nombre: "FACTOR XII", unidad: "%", refMin: 60, refMax: 140, referencia: "60 - 140 %" },
  { codigo: "479", nombre: "FASCIOLA HEPATICA, ANTICUERPOS", unidad: "", refMin: "", refMax: "", referencia: "NO REACTIVO" },
  { codigo: "480", nombre: "FENCICLIDINA (PCP) (ORINA)", unidad: "ng/mL", refMin: 0, refMax: 25, referencia: "Negativo: < 25 ng/mL" },
  { codigo: "481", nombre: "FENILALANINA SERICA", unidad: "mg/dL", refMin: 0.8, refMax: 2.0, referencia: "0.8 - 2.0 mg/dL" },
  { codigo: "482", nombre: "FENILCETONURIA PKU (CLORURO FERRICO)", unidad: "", refMin: "", refMax: "", referencia: "NEGATIVO" },
  { codigo: "483", nombre: "FENITOINA", unidad: "µg/mL", refMin: 10.0, refMax: 20.0, referencia: "10 - 20 µg/mL" },
  { codigo: "484", nombre: "FENITOINA (DIFENILHIDANTOINA DPH)", unidad: "µg/mL", refMin: 10.0, refMax: 20.0, referencia: "10 - 20 µg/mL" },
  { codigo: "485", nombre: "FENOBARBITAL", unidad: "µg/mL", refMin: 15.0, refMax: 40.0, referencia: "15 - 40 µg/mL" },
  { codigo: "487", nombre: "FENOL ORINA", unidad: "mg/L", refMin: 0, refMax: 20, referencia: "< 20 mg/L" },
  { codigo: "488", nombre: "FENOMENO LE", unidad: "", refMin: "", refMax: "", referencia: "NO SE OBSERVAN CÉLULAS L.E." },
  { codigo: "490", nombre: "FERRITINA SERICA", unidad: "ng/mL", refMin: 10, refMax: 375, referencia: "40 - 375 ng/mL (Hombre), 10 - 280 ng/mL (Mujer)" },
  { codigo: "491", nombre: "FIBRINOGENO", unidad: "mg/dL", refMin: 150, refMax: 350, referencia: "150 - 350 mg/dL" },
  { codigo: "493", nombre: "FIBROMAX", unidad: "", refMin: "", refMax: "", referencia: "INFORME EVALUACIÓN DE FIBROSIS Y ESTEATOSIS" },
  { codigo: "494", nombre: "FILARIA IGM & IGG", unidad: "", refMin: "", refMax: "", referencia: "NEGATIVO" },
  { codigo: "495", nombre: "FOSFATASA ACIDA PROSTATICA (HN)", unidad: "U/L", refMin: 0, refMax: 3.5, referencia: "< 3.5 U/L" },
  { codigo: "496", nombre: "FOSFATASA ACIDA TOTAL (HN)", unidad: "U/L", refMin: 0, refMax: 6.5, referencia: "< 6.5 U/L" },
  { codigo: "497", nombre: "FOSFATASA ALCALINA", unidad: "U/L", refMin: 45, refMax: 115, referencia: "45 - 115 U/L" },
  { codigo: "499", nombre: "FOSFATASA ALCALINA (ISOENZIMAS)", unidad: "%", refMin: 20, refMax: 85, referencia: "Fracción Hepática 20-70%, Ósea 25-85%" },
  { codigo: "500", nombre: "FOSFATASA ALCALINA LEUCOCITARIA", unidad: "Puntos", refMin: 20, refMax: 100, referencia: "20 - 100 Puntos FAL" },
  { codigo: "501", nombre: "FOSFATIDILSERINA ANTIC. IGG", unidad: "U/mL", refMin: 0, refMax: 10, referencia: "Negativo: < 10 U/mL" },
  { codigo: "502", nombre: "FOSFATIDILSERINA ANTIC. IGM", unidad: "U/mL", refMin: 0, refMax: 10, referencia: "Negativo: < 10 U/mL" },
  { codigo: "503", nombre: "FOSFATOS ORINA 24 HORAS", unidad: "g/24h", refMin: 0.4, refMax: 1.3, referencia: "0.4 - 1.3 g/24h" },
  { codigo: "504", nombre: "FOSFORO (ORINA 24HRS) (HN)", unidad: "g/24h", refMin: 0.4, refMax: 1.3, referencia: "0.4 - 1.3 g/24h" },
  { codigo: "505", nombre: "FOSFORO ORINA SIMPLE (HN)", unidad: "mg/dL", refMin: 30, refMax: 100, referencia: "30 - 100 mg/dL" },
  { codigo: "506", nombre: "FOSFORO SERICO", unidad: "mg/dL", refMin: 2.5, refMax: 4.5, referencia: "2.5 - 4.5 mg/dL" },
  { codigo: "508", nombre: "FRACCION EXC. SODIO FILTRADO (FENA)", unidad: "%", refMin: 1.0, refMax: 2.0, referencia: "< 1% (Prerrenal), > 2% (Parenquimatoso/NTA)" },
  { codigo: "509", nombre: "FRAGILIDAD CAPILAR", unidad: "Petequias", refMin: 0, refMax: 10, referencia: "< 10 petequias (Prueba de Rumpel-Leede)" },
  { codigo: "510", nombre: "FRAGILIDAD GLOBULAR", unidad: "% NaCl", refMin: 0.35, refMax: 0.50, referencia: "Inicio hemólisis: 0.45-0.50%, Total: 0.30-0.35%" },
  { codigo: "511", nombre: "FRAGILIDAD OSMOTICA/GLOBULAR", unidad: "% NaCl", refMin: 0.36, refMax: 0.42, referencia: "H50: 0.36 - 0.42 % NaCl" },
  { codigo: "512", nombre: "FRAGMENTACIÓN DE ADN ESPERMÁTICO", unidad: "% DFI", refMin: 0, refMax: 15, referencia: "Normal: < 15% DFI" },
  { codigo: "513", nombre: "FROTIS DIRECTO (GERMENES)", unidad: "", refMin: "", refMax: "", referencia: "NO SE OBSERVAN BACTERIAS" },
  { codigo: "515", nombre: "FRUCTOSAMINA", unidad: "µmol/L", refMin: 200, refMax: 285, referencia: "< 285 µmol/L" },
  { codigo: "516", nombre: "FSH HORMONA FOLICULOESTIMULANTE", unidad: "mIU/mL", refMin: 1.5, refMax: 12.4, referencia: "Según fase menstrual / Varones: 1.5-12.4 mIU/mL" },
  { codigo: "517", nombre: "FTA ABS", unidad: "", refMin: "", refMax: "", referencia: "NO REACTIVO" },
  { codigo: "518", nombre: "FTA ABS (IM)", unidad: "", refMin: "", refMax: "", referencia: "NO REACTIVO" },
  { codigo: "519", nombre: "FTA ABS IGM", unidad: "", refMin: "", refMax: "", referencia: "NO REACTIVO" },
  { codigo: "520", nombre: "GABAPENTIN (NEURONTIN), DOSAJE", unidad: "µg/mL", refMin: 2.0, refMax: 20.0, referencia: "2 - 20 µg/mL" },
  { codigo: "521", nombre: "GAD, AUTOANTIC (GLUTAMIC ACID DESCARBOXILASE)", unidad: "IU/mL", refMin: 0, refMax: 5.0, referencia: "Negativo: < 5.0 IU/mL" },
  { codigo: "522", nombre: "GAG EN ORINA", unidad: "mg/mmol Creat", refMin: 0, refMax: 12, referencia: "Mucopolisacáridos según edad" },
  { codigo: "523", nombre: "GALACTOMANANO (IM)", unidad: "Index", refMin: 0, refMax: 0.5, referencia: "Negativo: < 0.5 Index" },
  { codigo: "524", nombre: "GALACTOSA 1 FOSFATO URIDILTRANSFERASA (GALT)", unidad: "U/g Hb", refMin: 18.5, refMax: 28.5, referencia: "18.5 - 28.5 U/g Hb" },
  { codigo: "525", nombre: "GAMMA GLOBULINA, DOSAJE", unidad: "g/dL", refMin: 0.7, refMax: 1.4, referencia: "0.7 - 1.4 g/dL" },
  { codigo: "526", nombre: "GAMMA GLUTAMIL TRANSPEPTIDASA", unidad: "U/L", refMin: 0, refMax: 40, referencia: "≤ 40 U/L (Hombre), ≤ 28 U/L (Mujer)" },
  { codigo: "530", nombre: "GASES ARTERIALES", unidad: "", refMin: "", refMax: "", referencia: "pH: 7.35-7.45, pCO2: 35-45, pO2: 80-100" },
  { codigo: "529", nombre: "GASES ARTERIALES (AGA) Y ELECTROLITOS", unidad: "", refMin: "", refMax: "", referencia: "pH: 7.35-7.45, Na: 135-145, K: 3.5-5.0" },
  { codigo: "531", nombre: "GASTRINA", unidad: "pg/mL", refMin: 13, refMax: 115, referencia: "< 115 pg/mL" },
  { codigo: "532", nombre: "GeneXpert", unidad: "", refMin: "", refMax: "", referencia: "M. TUBERCULOSIS NO DETECTADO" },
  { codigo: "533", nombre: "GERMENES COMUNES (OTROS)", unidad: "", refMin: "", refMax: "", referencia: "SIN DESARROLLO BACTERIANO" },
  { codigo: "534", nombre: "GIARDIA LAMBLIA ANTICUERPOS IGG", unidad: "U/mL", refMin: 0, refMax: 10, referencia: "Negativo: < 10 U/mL" },
  { codigo: "535", nombre: "GIARDIA LAMBLIA ANTICUERPOS IGM", unidad: "U/mL", refMin: 0, refMax: 10, referencia: "Negativo: < 10 U/mL" },
  { codigo: "536", nombre: "GIARDIA LAMBLIA ANTIGENO FECALES", unidad: "", refMin: "", refMax: "", referencia: "NEGATIVO" },
  { codigo: "537", nombre: "GIARDIA LAMBLIA, ANTICUERPOS IGG & IGM", unidad: "U/mL", refMin: 0, refMax: 10, referencia: "Negativo: < 10 U/mL" },
  { codigo: "538", nombre: "GLIADINA ANTICUERPOS IGA (IM)", unidad: "U/mL", refMin: 0, refMax: 12, referencia: "Negativo: < 12 U/mL" },
  { codigo: "539", nombre: "GLOBULINAS", unidad: "g/dL", refMin: 1.9, refMax: 2.7, referencia: "1.9 - 2.7 g/dL" },
  { codigo: "540", nombre: "GLUCAGON", unidad: "pg/mL", refMin: 50, refMax: 150, referencia: "50 - 150 pg/mL" },
  { codigo: "541", nombre: "GLUCAGON 30 MINUTOS", unidad: "pg/mL", refMin: 50, refMax: 150, referencia: "Según curva metabólica" },
  { codigo: "542", nombre: "GLUCAGON 60 MINUTOS", unidad: "pg/mL", refMin: 50, refMax: 150, referencia: "Según curva metabólica" },
  { codigo: "544", nombre: "GLUCOSA 120´ POST-PRANDIAL (GLUCOSA ANHIDRA)", unidad: "mg/dL", refMin: 70, refMax: 140, referencia: "< 140 mg/dL" },
  { codigo: "543", nombre: "GLUCOSA 120' POST-PRANDIAL (C / DESAYUNO)", unidad: "mg/dL", refMin: 70, refMax: 140, referencia: "< 140 mg/dL" },
  { codigo: "547", nombre: "GLUCOSA 6-FOSFATO DEHIDROGENASA", unidad: "U/g Hb", refMin: 7.0, refMax: 20.5, referencia: "7.0 - 20.5 U/g Hb" },
  { codigo: "546", nombre: "GLUCOSA 60’ (GLUCOSA ANHIDRA)", unidad: "mg/dL", refMin: 70, refMax: 180, referencia: "< 180 mg/dL" },
  { codigo: "545", nombre: "GLUCOSA 60' POST-PRANDIAL(C/DESAYUNO)", unidad: "mg/dL", refMin: 70, refMax: 180, referencia: "< 180 mg/dL" },
  { codigo: "548", nombre: "GLUCOSA BASAL", unidad: "mg/dL", refMin: 80, refMax: 110, referencia: "80 - 110 mg/dL" },
  { codigo: "550", nombre: "GLUCOSA EN LIQUIDO", unidad: "mg/dL", refMin: 50, refMax: 80, referencia: "60-80% de la glucemia plasmática" },
  { codigo: "551", nombre: "GLUCOSA EN ORINA DE 24 HORAS", unidad: "g/24h", refMin: 0, refMax: 0.5, referencia: "< 0.5 g/24h" },
  { codigo: "552", nombre: "GLUCOSA EN ORINA SIMPLE", unidad: "", refMin: "", refMax: "", referencia: "NEGATIVO" },
  { codigo: "553", nombre: "GLUCOSA POST PRANDIAL", unidad: "mg/dL", refMin: 70, refMax: 140, referencia: "< 140 mg/dL" },
  { codigo: "1165", nombre: "GLUCOSA+EXAMEN DE ORINA", unidad: "", refMin: "", refMax: "", referencia: "Glucosa: 80-110 mg/dL, Orina: Negativo a elementos patológicos" },
  { codigo: "554", nombre: "GOTA GRUESA (PALUDISMO)", unidad: "", refMin: "", refMax: "", referencia: "NO SE OBSERVAN PARÁSITOS (PLASMODIUM SPP)" },
  { codigo: "555", nombre: "GRAM EN ORINA SIN CENTRIFUGAR", unidad: "", refMin: "", refMax: "", referencia: "NO SE OBSERVAN GERMENES" },
  { codigo: "557", nombre: "GRUPO Y FACTOR", unidad: "", refMin: "", refMax: "", referencia: "A / B / AB / O ; Rh Positivo / Negativo" },
  { codigo: "558", nombre: "HAM TEST", unidad: "", refMin: "", refMax: "", referencia: "NEGATIVO (Sin hemólisis)" },
  { codigo: "559", nombre: "HAPTOGLOBINA", unidad: "mg/dL", refMin: 40, refMax: 270, referencia: "40 - 270 mg/dL" },
  { codigo: "560", nombre: "HCG CADENAS LIBRES", unidad: "mIU/mL", refMin: 0, refMax: 2, referencia: "< 2 mIU/mL (no gestante)" },
  { codigo: "564", nombre: "HE4 / WFDC2 / PROTEINA EPIDIDIMAL HUMANA", unidad: "pmol/L", refMin: 0, refMax: 140, referencia: "Premenopáusicas < 70, Posmenopáusicas < 140" },
  { codigo: "565", nombre: "HECES SIMPLE", unidad: "", refMin: "", refMax: "", referencia: "No se observan parásitos" },
  { codigo: "566", nombre: "HELICOBACTER PILORI IGG (IM)", unidad: "U/mL", refMin: 0, refMax: 0.9, referencia: "Negativo: < 0.9 Index" },
  { codigo: "567", nombre: "HELICOBACTER PILORI IGM (IM)", unidad: "U/mL", refMin: 0, refMax: 0.9, referencia: "Negativo: < 0.9 Index" },
  { codigo: "568", nombre: "HELICOBACTER PYLORI", unidad: "", refMin: "", refMax: "", referencia: "NEGATIVO" },
  { codigo: "569", nombre: "HELICOBACTER PYLORI IGA (IM)", unidad: "U/mL", refMin: 0, refMax: 0.9, referencia: "Negativo: < 0.9 Index" },
  { codigo: "570", nombre: "HELICOBACTER PYLORI, TEST DE ALIENTO - CARBONO 13 \"TEST UREASA\"", unidad: "DOB", refMin: 0, refMax: 4.0, referencia: "Negativo: < 4.0 DOB" },
  { codigo: "571", nombre: "HEMATIES, PIRUVATO-KINASA", unidad: "U/g Hb", refMin: 11.0, refMax: 17.0, referencia: "11.0 - 17.0 U/g Hb" },
  { codigo: "572", nombre: "HEMATOCRITO", unidad: "%", refMin: 37, refMax: 52, referencia: "47 ± 5% (Varón), 42 ± 5% (Mujer)" },
  { codigo: "573", nombre: "HEMATOLOGIA", unidad: "", refMin: "", refMax: "", referencia: "Dentro de límites normales" },
  { codigo: "574", nombre: "HEMATOLOGY", unidad: "", refMin: "", refMax: "", referencia: "Within normal limits" },
  { codigo: "575", nombre: "HEMOAGLUTINACION ANTICUERPOS ANTITREPONEMA PALLIDUM (MHATP )", unidad: "", refMin: "", refMax: "", referencia: "NO REACTIVO" },
  { codigo: "576", nombre: "HEMOCROMATOSIS, MUTACIONES (ADN)", unidad: "", refMin: "", refMax: "", referencia: "SIN MUTACIÓN C282Y / H63D" },
  { codigo: "577", nombre: "HEMOCULTIVO", unidad: "", refMin: "", refMax: "", referencia: "ESTÉRIL A LOS 7 DÍAS" },
  { codigo: "581", nombre: "HEMOCULTIVO AUTOMATIZADO CON MIC (HN)", unidad: "", refMin: "", refMax: "", referencia: "ESTÉRIL" },
  { codigo: "582", nombre: "HEMOGLOBINA", unidad: "g/dL", refMin: 12.0, refMax: 18.0, referencia: "16 ± 2 g/dL (Varón), 14 ± 2 g/dL (Mujer)" },
  { codigo: "584", nombre: "HEMOGLOBINA + HEMATOCRITO", unidad: "", refMin: "", refMax: "", referencia: "Hb: 12-18 g/dL, Hcto: 37-52%" },
  { codigo: "583", nombre: "HEMOGLOBINA - HEMATOCRITO (POCT CAPILAR)", unidad: "", refMin: "", refMax: "", referencia: "Hb: 12-18 g/dL, Hcto: 37-52%" },
  { codigo: "585", nombre: "HEMOGLOBINA A2 - CUANTITATIVA", unidad: "%", refMin: 1.5, refMax: 3.5, referencia: "1.5 - 3.5 %" },
  { codigo: "586", nombre: "HEMOGLOBINA FETAL CUANTITATIVA", unidad: "%", refMin: 0, refMax: 2.0, referencia: "< 2.0 %" },
  { codigo: "587", nombre: "HEMOGLOBINA GLICOSILADA", unidad: "%", refMin: 4.0, refMax: 5.7, referencia: "Normal: 4.0 - 5.7 %, Diabetes: ≥ 6.5 %" },
  { codigo: "588", nombre: "HEMOGLOBINA GLICOSILADA HbA1c", unidad: "%", refMin: 4.0, refMax: 5.7, referencia: "Normal: 4.0 - 5.7 %, Diabetes: ≥ 6.5 %" },
  { codigo: "589", nombre: "HEMOGLOBINA S DOSAJE", unidad: "%", refMin: 0, refMax: 0, referencia: "0 % (AUSENCIA DE HbS)" },
  { codigo: "590", nombre: "HEMOGLOBINA-HEMATOCRITO", unidad: "", refMin: "", refMax: "", referencia: "Hb: 12-18 g/dL, Hcto: 37-52%" },
  { codigo: "591", nombre: "HEMOGLOBINOPATIAS ESTUDIO COMPLETO", unidad: "", refMin: "", refMax: "", referencia: "PATRÓN ELECTROFORÉTICO NORMAL (HbA1 > 95%)" },
  { codigo: "592", nombre: "HEMOGLOBINURIA PAROXISTICA NOCTURNA (HPN)", unidad: "", refMin: "", refMax: "", referencia: "EXPRESIÓN NORMAL DE CD55 Y CD59" },
  { codigo: "593", nombre: "HEMOGRAMA", unidad: "", refMin: "", refMax: "", referencia: "Leucocitos: 6000-10000/µL, Hematíes: 4.8-5.5x10¹²/L, Plaquetas: 150-350k/µL" },
  { codigo: "1164", nombre: "HEMOGRAMA COMPLETO AUTOMATIZADO", unidad: "", refMin: "", refMax: "", referencia: "Leucocitos: 6000-10000/µL, Hematíes: 4.8-5.5x10¹²/L, Plaquetas: 150-350k/µL" },
  { codigo: "595", nombre: "HEMOSIDERINA EN ORINA SIMPLE", unidad: "", refMin: "", refMax: "", referencia: "NEGATIVO" },
  { codigo: "596", nombre: "HEPATITIS A ANTICUERPOS IGM", unidad: "", refMin: "", refMax: "", referencia: "NO REACTIVO" },
  { codigo: "597", nombre: "HEPATITIS A ANTICUERPOS TOTALES", unidad: "", refMin: "", refMax: "", referencia: "NO REACTIVO" },
  { codigo: "598", nombre: "HEPATITIS A, AC. TOTALES", unidad: "", refMin: "", refMax: "", referencia: "NO REACTIVO" },
  { codigo: "599", nombre: "HEPATITIS A, ANTICUERPO IGG", unidad: "", refMin: "", refMax: "", referencia: "NO REACTIVO" },
  { codigo: "600", nombre: "HEPATITIS A, ANTICUERPO IGM", unidad: "", refMin: "", refMax: "", referencia: "NO REACTIVO" },
  { codigo: "601", nombre: "HEPATITIS B CORE ANTICUERPOS IGM", unidad: "", refMin: "", refMax: "", referencia: "NO REACTIVO" },
  { codigo: "602", nombre: "HEPATITIS B CORE ANTICUERPOS TOTALES", unidad: "", refMin: "", refMax: "", referencia: "NO REACTIVO" },
  { codigo: "603", nombre: "HEPATITIS B DNA (CARGA VIRAL)", unidad: "IU/mL", refMin: 0, refMax: 20, referencia: "< 20 IU/mL (Incalculable / No detectado)" },
  { codigo: "604", nombre: "HEPATITIS B VIRUS X PCR (CUALITATIVO)", unidad: "", refMin: "", refMax: "", referencia: "NO DETECTADO" },
  { codigo: "605", nombre: "HEPATITIS B, ANTI HBEAG ANTICUERPO E", unidad: "", refMin: "", refMax: "", referencia: "NO REACTIVO" },
  { codigo: "606", nombre: "HEPATITIS B, ANTI-HBCAG CORE TOTAL", unidad: "", refMin: "", refMax: "", referencia: "NO REACTIVO" },
  { codigo: "607", nombre: "HEPATITIS B, ANTI-HBCAG IGM (CORE IGM)", unidad: "", refMin: "", refMax: "", referencia: "NO REACTIVO" },
  { codigo: "608", nombre: "HEPATITIS B, ANTI-HBSAG ANTICUERPO HBS (POST- VACUNA)", unidad: "mIU/mL", refMin: 10, refMax: 1000, referencia: "Protegido: ≥ 10 mIU/mL" },
  { codigo: "609", nombre: "HEPATITIS B, DNA POLIMERASA (CUALITATIVO)", unidad: "", refMin: "", refMax: "", referencia: "NO DETECTADO" },
  { codigo: "610", nombre: "HEPATITIS B, GENOTIPO (RESISTENCIA A DROGAS)", unidad: "", refMin: "", refMax: "", referencia: "INFORME DE SECUENCIACIÓN" },
  { codigo: "611", nombre: "HEPATITIS B, HBEAG ANTIGENO E", unidad: "", refMin: "", refMax: "", referencia: "NO REACTIVO" },
  { codigo: "612", nombre: "HEPATITIS B, HBSAG (AG AUSTR)", unidad: "", refMin: "", refMax: "", referencia: "NO REACTIVO" },
  { codigo: "614", nombre: "HEPATITIS C , (CARGA VIRAL)", unidad: "IU/mL", refMin: 0, refMax: 15, referencia: "< 15 IU/mL (No detectado)" },
  { codigo: "615", nombre: "HEPATITIS C ANTIC. X RIBA 3 (CONFIRMATORIO)", unidad: "", refMin: "", refMax: "", referencia: "NO REACTIVO" },
  { codigo: "616", nombre: "HEPATITIS C GENOTIPIFICACION, ESTUDIO X PCR", unidad: "", refMin: "", refMax: "", referencia: "INFORME DE GENOTIPO (1a, 1b, 2, 3, etc)" },
  { codigo: "617", nombre: "HEPATITIS C X PCR (CUALITATIVO)", unidad: "", refMin: "", refMax: "", referencia: "NO DETECTADO" },
  { codigo: "618", nombre: "HEPATITIS C, ANTI HCV AC TOTALES", unidad: "", refMin: "", refMax: "", referencia: "NO REACTIVO" },
  { codigo: "620", nombre: "HEPATITIS D, ANTI HDV ANTICUERPO IGG", unidad: "", refMin: "", refMax: "", referencia: "NO REACTIVO" },
  { codigo: "621", nombre: "HEPATITIS D, ANTI HDV ANTICUERPO IGM", unidad: "", refMin: "", refMax: "", referencia: "NO REACTIVO" },
  { codigo: "622", nombre: "HEPATITIS DELTA (D) ANTIGENO", unidad: "", refMin: "", refMax: "", referencia: "NO REACTIVO" },
  { codigo: "623", nombre: "HEPATITIS E, ANTI HEV ANTICUERPO IGG", unidad: "", refMin: "", refMax: "", referencia: "NO REACTIVO" },
  { codigo: "624", nombre: "HEPATITIS E, ANTI HEV ANTICUERPO IGM", unidad: "", refMin: "", refMax: "", referencia: "NO REACTIVO" },
  { codigo: "625", nombre: "HEPATITIS G VIRUS ARN X PCR", unidad: "", refMin: "", refMax: "", referencia: "NO DETECTADO" },
  { codigo: "626", nombre: "HERPES I ANTICUERPOS IGG", unidad: "Index", refMin: 0, refMax: 0.9, referencia: "Negativo: < 0.9" },
  { codigo: "627", nombre: "HERPES I ANTICUERPOS IGM", unidad: "Index", refMin: 0, refMax: 0.9, referencia: "Negativo: < 0.9" },
  { codigo: "630", nombre: "HERPES II ANTICUERPOS IGG", unidad: "Index", refMin: 0, refMax: 0.9, referencia: "Negativo: < 0.9" },
  { codigo: "631", nombre: "HERPES II ANTICUERPOS IGM", unidad: "Index", refMin: 0, refMax: 0.9, referencia: "Negativo: < 0.9" },
  { codigo: "634", nombre: "HERPES SIMPLE I ANTICUERPOS IgG, LCR", unidad: "", refMin: "", refMax: "", referencia: "NEGATIVO" },
  { codigo: "635", nombre: "HERPES SIMPLE I ANTICUERPOS IgM, LCR", unidad: "", refMin: "", refMax: "", referencia: "NEGATIVO" },
  { codigo: "636", nombre: "HERPES SIMPLE II ANTICUERPOS IgG, LCR", unidad: "", refMin: "", refMax: "", referencia: "NEGATIVO" },
  { codigo: "637", nombre: "HERPES SIMPLE II ANTICUERPOS IgM, LCR", unidad: "", refMin: "", refMax: "", referencia: "NEGATIVO" },
  { codigo: "638", nombre: "HERPES SIMPLEX VIRUS I Y II X PCR", unidad: "", refMin: "", refMax: "", referencia: "NO DETECTADO" },
  { codigo: "639", nombre: "HERPES SIMPLEX VIRUS I Y II X PCR EN LCR", unidad: "", refMin: "", refMax: "", referencia: "NO DETECTADO" },
  { codigo: "640", nombre: "HERPES VIRUS HUMANO 6 (HHV-6) ANTICUERPOS IGG", unidad: "", refMin: "", refMax: "", referencia: "Negativo: < 1:10" },
  { codigo: "641", nombre: "HERPES VIRUS HUMANO TIPO 6 (HVH-6) ANTICUERPOS IgG", unidad: "", refMin: "", refMax: "", referencia: "Negativo: < 1:10" },
  { codigo: "642", nombre: "HERPES VIRUS HUMANO TIPO 6 (HVH-6) ANTICUERPOS IgG/IgM", unidad: "", refMin: "", refMax: "", referencia: "NEGATIVO" },
  { codigo: "643", nombre: "HERPES VIRUS HUMANO TIPO 6 (HVH-6) ANTICUERPOS IgM", unidad: "", refMin: "", refMax: "", referencia: "NEGATIVO" },
  { codigo: "645", nombre: "HIDATIDOSIS IGG EQUINOCOSIS - ELISA (IM)", unidad: "U/mL", refMin: 0, refMax: 10, referencia: "Negativo: < 10 U/mL" },
  { codigo: "646", nombre: "HIDATIDOSIS WESTERN BLOT", unidad: "", refMin: "", refMax: "", referencia: "NEGATIVO" },
  { codigo: "647", nombre: "HIDATIDOSIS, EQUINOCOCOSIS - WESTERN BLOT (IM)", unidad: "", refMin: "", refMax: "", referencia: "NEGATIVO" },
  { codigo: "648", nombre: "HIDROXIPROLINA EN PLASMA", unidad: "µg/mL", refMin: 0.8, refMax: 5.0, referencia: "0.8 - 5.0 µg/mL" },
  { codigo: "649", nombre: "HIERRO SERICO", unidad: "µg/dL", refMin: 37, refMax: 158, referencia: "59-158 µg/dL (Varón), 37-145 µg/dL (Mujer)" },
  { codigo: "651", nombre: "HISTONA AUTOANTICUERPOS", unidad: "U/mL", refMin: 0, refMax: 20, referencia: "Negativo: < 20 U/mL" },
  { codigo: "652", nombre: "HISTOPLASMA ANTICUERPOS TOTALES", unidad: "", refMin: "", refMax: "", referencia: "NO REACTIVO" },
  { codigo: "653", nombre: "HISTOPLASMA ANTIGENO ORINA", unidad: "ng/mL", refMin: 0, refMax: 0.5, referencia: "Negativo: < 0.5 ng/mL" },
  { codigo: "654", nombre: "HIV ( TEST ELISA )", unidad: "", refMin: "", refMax: "", referencia: "NO REACTIVO" },
  { codigo: "655", nombre: "HIV 1 Y 2 ANTIC.(WESTERN BLOT) (IM) - VIH", unidad: "", refMin: "", refMax: "", referencia: "NEGATIVO" },
  { codigo: "656", nombre: "HIV 1-2 (AC-AG 3°/4° GENERACION) - VIH", unidad: "S/CO", refMin: 0, refMax: 0.9, referencia: "NO REACTIVO (< 0.9 S/CO)" },
  { codigo: "657", nombre: "HIV P24 (ANTIGENO) - VIH", unidad: "pg/mL", refMin: 0, refMax: 2.0, referencia: "NO REACTIVO (< 2.0 pg/mL)" },
  { codigo: "658", nombre: "HIV-1 CARGA VIRAL ARN X PCR - VIH", unidad: "copias/mL", refMin: 0, refMax: 20, referencia: "< 20 copias/mL (No detectado)" },
  { codigo: "659", nombre: "HLA (ENFERMEDAD CELIACA)", unidad: "", refMin: "", refMax: "", referencia: "DQ2 / DQ8 NEGATIVO" },
  { codigo: "660", nombre: "HLA B-27", unidad: "", refMin: "", refMax: "", referencia: "NEGATIVO" },
  { codigo: "661", nombre: "HOMOCISTEINA", unidad: "µmol/L", refMin: 5, refMax: 15, referencia: "< 15 µmol/L" },
  { codigo: "662", nombre: "HORMONA ADENOCORTICOTROPA ACTH", unidad: "pg/mL", refMin: 7.2, refMax: 63.3, referencia: "7.2 - 63.3 pg/mL" },
  { codigo: "663", nombre: "HORMONA ANTI MULLERIANA (AMH / MIS), SUERO", unidad: "ng/mL", refMin: 1.0, refMax: 4.0, referencia: "1.0 - 4.0 ng/mL (según reserva ovárica)" },
  { codigo: "665", nombre: "HORMONA ANTIDIURETICA (ADH-VASOPRESINA)", unidad: "pg/mL", refMin: 1.0, refMax: 5.0, referencia: "1.0 - 5.0 pg/mL" },
  { codigo: "666", nombre: "HORMONA DE CREC. TOLERANCIA (B. 60, 120)", unidad: "ng/mL", refMin: 0, refMax: 10, referencia: "Pico de estimulación > 10 ng/mL" },
  { codigo: "667", nombre: "HORMONA DE CRECIMIENTO HUMANO BASAL (HGH)", unidad: "ng/mL", refMin: 0.05, refMax: 3.0, referencia: "< 3.0 ng/mL" },
  { codigo: "668", nombre: "HORMONA DEL CRECIMIENTO (POST CLONID) 120'", unidad: "ng/mL", refMin: 5, refMax: 20, referencia: "Respuesta normal: > 7-10 ng/mL" },
  { codigo: "669", nombre: "HORMONA DEL CRECIMIENTO (POST CLONID) 30'", unidad: "ng/mL", refMin: 5, refMax: 20, referencia: "Respuesta normal: > 7-10 ng/mL" },
  { codigo: "70", nombre: "HORMONA DEL CRECIMIENTO (POST CLONID) 60'", unidad: "ng/mL", refMin: 5, refMax: 20, referencia: "Respuesta normal: > 7-10 ng/mL" },
  { codigo: "671", nombre: "HORMONA DEL CRECIMIENTO (POST CLONID) 90'", unidad: "ng/mL", refMin: 5, refMax: 20, referencia: "Respuesta normal: > 7-10 ng/mL" },
  { codigo: "672", nombre: "HORMONA DEL CRECIMIENTO (POST EJER) 30'", unidad: "ng/mL", refMin: 5, refMax: 20, referencia: "Respuesta normal: > 7-10 ng/mL" },
  { codigo: "673", nombre: "HORMONA DEL CRECIMIENTO POST ESTIMULO", unidad: "ng/mL", refMin: 7, refMax: 20, referencia: "Pico > 7 ng/mL" },
  { codigo: "674", nombre: "HTLV 1 Y 2 (WESTERN BLOT)", unidad: "", refMin: "", refMax: "", referencia: "NEGATIVO" },
  { codigo: "675", nombre: "HTLV I - II ANTICUERPOS", unidad: "", refMin: "", refMax: "", referencia: "NO REACTIVO" },
  { codigo: "676", nombre: "IFI VIRAL EN HISOPADO NASAL-FARINGEO", unidad: "", refMin: "", refMax: "", referencia: "NEGATIVO PARA VIRUS RESPIRATORIOS" },
  { codigo: "677", nombre: "IGF BP-3 (BINDING PROTEIN)", unidad: "µg/mL", refMin: 2.0, refMax: 6.0, referencia: "Según edad y sexo" },
  { codigo: "678", nombre: "INDICE ALBUMINA/CREATININA EN ORINA (IPC)", unidad: "mg/g", refMin: 0, refMax: 30, referencia: "Normal: < 30 mg/g" },
  { codigo: "679", nombre: "INDICE DE T4 LIBRE", unidad: "Index", refMin: 1.2, refMax: 4.8, referencia: "1.2 - 4.8" },
  { codigo: "680", nombre: "INDICE PROTEINA / CREATININA (IPC) EN ORINA SIMPLE", unidad: "mg/g", refMin: 0, refMax: 200, referencia: "< 200 mg/g Creatinina" },
  { codigo: "681", nombre: "INFLUENZA", unidad: "", refMin: "", refMax: "", referencia: "NEGATIVO" },
  { codigo: "682", nombre: "INFLUENZA POR PCR EN SECRECION RHINOFARINGEA", unidad: "", refMin: "", refMax: "", referencia: "NO DETECTADO" },
  { codigo: "3", nombre: "INFLUENZA TIPO A - CUALITATIVA (PRUEBA RÁPIDA)", unidad: "", refMin: "", refMax: "", referencia: "NEGATIVO" },
  { codigo: "683", nombre: "INFLUENZA TIPO A, ANTICUERPOS IGM", unidad: "", refMin: "", refMax: "", referencia: "NEGATIVO" },
  { codigo: "4", nombre: "INFLUENZA TIPO B - CUALITATIVA (PRUEBA RÁPIDA)", unidad: "", refMin: "", refMax: "", referencia: "NEGATIVO" },
  { codigo: "684", nombre: "INFLUENZA TIPO B, ANTICUERPOS IGM", unidad: "", refMin: "", refMax: "", referencia: "NEGATIVO" },
  { codigo: "685", nombre: "INHIBIDOR ACTIVADOR DEL PLASMINOGENO (PAI-1)", unidad: "ng/mL", refMin: 4, refMax: 43, referencia: "4 - 43 ng/mL" },
  { codigo: "686", nombre: "INHIBINA A", unidad: "pg/mL", refMin: 0, refMax: 2.0, referencia: "Según estado menstrual/embarazo" },
  { codigo: "687", nombre: "INHIBINA B", unidad: "pg/mL", refMin: 25, refMax: 325, referencia: "Según sexo y edad" },
  { codigo: "688", nombre: "INMUNOFIJACION \"SUERO\"", unidad: "", refMin: "", refMax: "", referencia: "NO SE OBSERVA BANDA MONOCLONAL" },
  { codigo: "689", nombre: "INMUNOFIJACION (ORINA 24 HORAS)", unidad: "", refMin: "", refMax: "", referencia: "NO SE OBSERVA CADENA LIGERA MONOCLONAL" },
  { codigo: "690", nombre: "INMUNOFIJACION EN ORINA", unidad: "", refMin: "", refMax: "", referencia: "NO SE OBSERVA BANDA MONOCLONAL" },
  { codigo: "691", nombre: "INMUNOFIJACION EN SUERO", unidad: "", refMin: "", refMax: "", referencia: "NO SE OBSERVA BANDA MONOCLONAL" },
  { codigo: "693", nombre: "INMUNOGLOBULINA A (LCR)", unidad: "mg/dL", refMin: 0, refMax: 0.6, referencia: "< 0.6 mg/dL" },
  { codigo: "692", nombre: "INMUNOGLOBULINA A - IGA", unidad: "mg/dL", refMin: 90, refMax: 400, referencia: "90 - 400 mg/dL" },
  { codigo: "694", nombre: "INMUNOGLOBULINA A,G Y M (HN)", unidad: "mg/dL", refMin: 60, refMax: 1800, referencia: "IgA: 90-400, IgG: 800-1800, IgM: 60-250" },
  { codigo: "695", nombre: "INMUNOGLOBULINA D, DOSAJE", unidad: "mg/dL", refMin: 0.3, refMax: 4.0, referencia: "0.3 - 4.0 mg/dL" },
  { codigo: "696", nombre: "INMUNOGLOBULINA E", unidad: "IU/mL", refMin: 0, refMax: 100, referencia: "< 100 IU/mL" },
  { codigo: "699", nombre: "INMUNOGLOBULINA G (LCR)", unidad: "mg/dL", refMin: 0.8, refMax: 4.0, referencia: "0.8 - 4.0 mg/dL" },
  { codigo: "698", nombre: "INMUNOGLOBULINA G - IGG", unidad: "mg/dL", refMin: 800, refMax: 1800, referencia: "800 - 1800 mg/dL" },
  { codigo: "700", nombre: "INMUNOGLOBULINA G, SUBCLASES IGG1,IGG2, IGG3, IGG4", unidad: "mg/dL", refMin: 382, refMax: 929, referencia: "IgG1: 382-929, IgG2: 241-700, IgG3: 22-178, IgG4: 4-86" },
  { codigo: "701", nombre: "INMUNOGLOBULINA IgG", unidad: "mg/dL", refMin: 800, refMax: 1800, referencia: "800 - 1800 mg/dL" },
  { codigo: "703", nombre: "INMUNOGLOBULINA M (LCR)", unidad: "mg/dL", refMin: 0, refMax: 0.2, referencia: "< 0.2 mg/dL" },
  { codigo: "702", nombre: "INMUNOGLOBULINA M - IGM", unidad: "mg/dL", refMin: 60, refMax: 250, referencia: "60 - 250 mg/dL" },
  { codigo: "704", nombre: "INMUNOGLOBULINAS IGG, IGA, IGM (LCR)", unidad: "mg/dL", refMin: 0, refMax: 4.0, referencia: "IgG: 0.8-4.0, IgA: <0.6, IgM: <0.2" },
  { codigo: "705", nombre: "INMUNOHISTOQUÍMICA - 4", unidad: "", refMin: "", refMax: "", referencia: "INFORME DE MARCADORES (4 ANTICUERPOS)" },
  { codigo: "706", nombre: "INSULINA 120'", unidad: "µIU/mL", refMin: 15, refMax: 60, referencia: "< 60 µIU/mL" },
  { codigo: "707", nombre: "INSULINA 120' (GLUCOSA ANHIDRA)", unidad: "µIU/mL", refMin: 15, refMax: 60, referencia: "< 60 µIU/mL" },
  { codigo: "708", nombre: "INSULINA 120' POST PRANDIAL (C/DESAYUNO)", unidad: "µIU/mL", refMin: 15, refMax: 60, referencia: "< 60 µIU/mL" },
  { codigo: "709", nombre: "INSULINA 180'", unidad: "µIU/mL", refMin: 2.6, refMax: 24.9, referencia: "Retorno a niveles basales" },
  { codigo: "710", nombre: "INSULINA 30'", unidad: "µIU/mL", refMin: 30, refMax: 100, referencia: "Pico postestímulo" },
  { codigo: "711", nombre: "INSULINA 60'", unidad: "µIU/mL", refMin: 30, refMax: 90, referencia: "Respuesta postestímulo" },
  { codigo: "712", nombre: "INSULINA 90'", unidad: "µIU/mL", refMin: 20, refMax: 70, referencia: "Curva descendente" },
  { codigo: "713", nombre: "INSULINA ANTICUERPOS", unidad: "%", refMin: 0, refMax: 8.2, referencia: "< 8.2 %" },
  { codigo: "714", nombre: "INSULINA BASAL", unidad: "µIU/mL", refMin: 2.6, refMax: 24.9, referencia: "2.6 - 24.9 µIU/mL" },
  { codigo: "716", nombre: "INSULINA POST PRANDIAL ( 120 MINUTOS)", unidad: "µIU/mL", refMin: 15, refMax: 60, referencia: "< 60 µIU/mL" },
  { codigo: "717", nombre: "INTERLEUKIN-6 (IL-6)", unidad: "pg/mL", refMin: 0, refMax: 7.0, referencia: "< 7.0 pg/mL" },
  { codigo: "718", nombre: "INYECTABLES", unidad: "", refMin: "", refMax: "", referencia: "PROCEDIMIENTO ENFERMERÍA" },
  { codigo: "719", nombre: "ISOSPORA BELLI (HECES)", unidad: "", refMin: "", refMax: "", referencia: "NO SE OBSERVAN OOCISTES" },
  { codigo: "720", nombre: "JC VIRUS- ADN, PCR", unidad: "copias/mL", refMin: 0, refMax: 500, referencia: "< 500 copias/mL" },
  { codigo: "721", nombre: "KIT ADICIONAL TEST DE ALIENTO C13", unidad: "", refMin: "", refMax: "", referencia: "CONSUMIBLE PRUEBA" },
  { codigo: "722", nombre: "L.H. (H. LUTEINIZANTE LH)", unidad: "mIU/mL", refMin: 1.7, refMax: 8.6, referencia: "Según fase menstrual / Varones: 1.7-8.6 mIU/mL" },
  { codigo: "723", nombre: "LACTOGENO PLACENTARIO HUMANO", unidad: "µg/mL", refMin: 0.5, refMax: 11.0, referencia: "Según semanas de gestación" },
  { codigo: "724", nombre: "LAMINA PERIFERICA", unidad: "", refMin: "", refMax: "", referencia: "Morfología eritrocitaria, leucocitaria y plaquetaria normal" },
  { codigo: "726", nombre: "LAMOTRIGINE", unidad: "µg/mL", refMin: 2.5, refMax: 15.0, referencia: "2.5 - 15.0 µg/mL" },
  { codigo: "727", nombre: "LAMOTRIGINE (LAMICTAL)", unidad: "µg/mL", refMin: 2.5, refMax: 15.0, referencia: "2.5 - 15.0 µg/mL" },
  { codigo: "728", nombre: "LDL OXIDADO ANTICUERPOS, LIPOPROTEINA BAJA DENSIDAD OXIDADA", unidad: "U/L", refMin: 0, refMax: 50, referencia: "< 50 U/L" },
  { codigo: "729", nombre: "LEGIONELLA PNEUMOPHILA IGM", unidad: "", refMin: "", refMax: "", referencia: "NEGATIVO" }
];

// ESTADO GLOBAL DE LA APLICACIÓN
let examenesSeleccionados = [];
let ordenesGlobales = [];
let ordenSeleccionadaResultados = null;
let resultadosTemporales = {};

// ==========================================
// INICIALIZACIÓN
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  const elFecha = document.getElementById('current-date');
  if (elFecha) {
    const hoy = new Date();
    elFecha.textContent = hoy.toLocaleDateString('es-PE', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  }

  const ordenesGuardadas = localStorage.getItem('vitalhealth_ordenes');
  if (ordenesGuardadas) {
    try {
      ordenesGlobales = JSON.parse(ordenesGuardadas);
    } catch (e) {
      console.error("Error al cargar ordenes guardadas", e);
    }
  }

  const catGuardado = localStorage.getItem('vitalhealth_catalogo');
  if (catGuardado) {
    try {
      examenesCatalogo = JSON.parse(catGuardado);
    } catch (e) {
      console.error("Error al cargar catálogo guardado", e);
    }
  }

  renderizarTablaCatalogo('');
  actualizarCaja();
});

// ==========================================
// NAVEGACIÓN Y SIDEBAR
// ==========================================
function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('sidebar-overlay');
  if (sidebar) sidebar.classList.toggle('active');
  if (overlay) overlay.classList.toggle('active');
}

function showSection(sectionId) {
  const secciones = document.querySelectorAll('.section-content');
  secciones.forEach(sec => sec.classList.add('d-none'));

  const secObjetivo = document.getElementById(`sec-${sectionId}`);
  if (secObjetivo) {
    secObjetivo.classList.remove('d-none');
  }

  const navLinks = document.querySelectorAll('.sidebar .nav-link');
  navLinks.forEach(link => link.classList.remove('active'));
  
  const linkActivo = Array.from(navLinks).find(l => l.getAttribute('onclick')?.includes(`'${sectionId}'`));
  if (linkActivo) linkActivo.classList.add('active');

  if (sectionId === 'ordenes') {
    cargarOrdenes();
  } else if (sectionId === 'caja') {
    actualizarCaja();
  } else if (sectionId === 'catalogo') {
    renderizarTablaCatalogo('');
  }

  if (window.innerWidth < 992) {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebar-overlay');
    if (sidebar) sidebar.classList.remove('active');
    if (overlay) overlay.classList.remove('active');
  }
}

// ==========================================
// RECEPCIÓN / ADMISIÓN
// ==========================================
function buscarPaciente() {
  const dni = document.getElementById('pac-dni').value.trim();
  if (!dni) {
    alert("Por favor ingrese un número de DNI / Documento.");
    return;
  }

  const ordenPrev = ordenesGlobales.find(o => o.paciente && o.paciente.dni === dni);
  if (ordenPrev) {
    document.getElementById('pac-nombre').value = ordenPrev.paciente.nombre || '';
    document.getElementById('pac-doctor').value = ordenPrev.paciente.doctor || 'Particular';
    document.getElementById('pac-edad').value = ordenPrev.paciente.edad || '';
    if (ordenPrev.paciente.sexo) {
      document.getElementById('pac-sexo').value = ordenPrev.paciente.sexo;
    }
  } else {
    alert("Paciente no encontrado en el registro previo local. Complete los datos manualmente.");
  }
}

function calcularEdad() {
  const fnac = document.getElementById('pac-fnac').value;
  if (!fnac) return;

  const hoy = new Date();
  const nac = new Date(fnac);
  let edad = hoy.getFullYear() - nac.getFullYear();
  const m = hoy.getMonth() - nac.getMonth();
  
  if (m < 0 || (m === 0 && hoy.getDate() < nac.getDate())) {
    edad--;
  }

  document.getElementById('pac-edad').value = `${edad > 0 ? edad : 0} AÑOS`;
}

function filtrarExamenes(query) {
  const contenedor = document.getElementById('sugerencias-examenes');
  if (!contenedor) return;

  if (!query || query.trim().length === 0) {
    contenedor.innerHTML = '';
    return;
  }

  const q = query.toLowerCase();
  const resultados = examenesCatalogo.filter(e => 
    e.nombre.toLowerCase().includes(q) || e.codigo.toLowerCase().includes(q)
  );

  if (resultados.length === 0) {
    contenedor.innerHTML = '<div class="list-group-item disabled">No se encontraron exámenes</div>';
    return;
  }

  let html = '';
  resultados.slice(0, 8).forEach(e => {
    html += `
      <button type="button" class="list-group-item list-group-item-action d-flex justify-content-between align-items-center" onclick="seleccionarExamen('${e.codigo}')">
        <div>
          <strong>[${e.codigo}]</strong> ${e.nombre}
        </div>
        <span class="badge bg-primary rounded-pill">S/ ${parseFloat(e.precio || 25).toFixed(2)}</span>
      </button>
    `;
  });

  contenedor.innerHTML = html;
}

function seleccionarExamen(codigo) {
  const item = examenesCatalogo.find(e => e.codigo === codigo);
  if (!item) return;

  if (!examenesSeleccionados.some(e => e.codigo === item.codigo)) {
    examenesSeleccionados.push({
      ...item,
      precio: parseFloat(item.precio || 25.0)
    });
    actualizarTablaSeleccionados();
  }

  document.getElementById('busqueda-examen').value = '';
  document.getElementById('sugerencias-examenes').innerHTML = '';
}

function eliminarExamenSeleccionado(codigo) {
  examenesSeleccionados = examenesSeleccionados.filter(e => e.codigo !== codigo);
  actualizarTablaSeleccionados();
}

function actualizarTablaSeleccionados() {
  const tbody = document.querySelector('#tabla-examenes-seleccionados tbody');
  const totalEl = document.getElementById('total-cobrar');
  if (!tbody) return;

  if (examenesSeleccionados.length === 0) {
    tbody.innerHTML = `
      <tr id="empty-row">
        <td colspan="6" class="text-center text-muted py-4">No hay exámenes agregados.</td>
      </tr>
    `;
    if (totalEl) totalEl.textContent = '0.00';
    return;
  }

  let html = '';
  let total = 0;

  examenesSeleccionados.forEach(item => {
    const precio = item.precio || 25.0;
    total += precio;
    html += `
      <tr>
        <td><strong>${item.codigo}</strong></td>
        <td>${item.nombre}</td>
        <td>1</td>
        <td>S/ ${precio.toFixed(2)}</td>
        <td>S/ ${precio.toFixed(2)}</td>
        <td class="text-center">
          <button class="btn btn-sm btn-outline-danger" onclick="eliminarExamenSeleccionado('${item.codigo}')">
            <i class="bi bi-trash"></i>
          </button>
        </td>
      </tr>
    `;
  });

  tbody.innerHTML = html;
  if (totalEl) totalEl.textContent = total.toFixed(2);
}

function guardarOrdenGenerarTicket() {
  const dni = document.getElementById('pac-dni').value.trim();
  const nombre = document.getElementById('pac-nombre').value.trim();
  const doctor = document.getElementById('pac-doctor').value.trim() || 'Particular';
  const edad = document.getElementById('pac-edad').value.trim() || 'N/R';
  const sexo = document.getElementById('pac-sexo').value;
  const metodoPago = document.getElementById('metodo-pago').value;

  if (!dni || !nombre || examenesSeleccionados.length === 0) {
    alert("Por favor complete los datos obligatorios del paciente (DNI, Nombre) y agregue al menos un examen.");
    return;
  }

  const total = examenesSeleccionados.reduce((acc, curr) => acc + (curr.precio || 25.0), 0);
  const ahora = new Date();
  
  const nuevaOrden = {
    id: `VH-2026-${String(ordenesGlobales.length + 1).padStart(5, '0')}`,
    fecha: ahora.toLocaleDateString('es-PE'),
    hora: ahora.toLocaleTimeString('es-PE', { hour: '2-digit', minute: '2-digit' }),
    paciente: { dni, nombre, doctor, edad, sexo },
    examenes: [...examenesSeleccionados],
    total,
    metodoPago,
    estado: 'PENDIENTE',
    resultados: {}
  };

  ordenesGlobales.unshift(nuevaOrden);
  localStorage.setItem('vitalhealth_ordenes', JSON.stringify(ordenesGlobales));

  imprimirTicket58mm(nuevaOrden);

  document.getElementById('form-paciente').reset();
  examenesSeleccionados = [];
  actualizarTablaSeleccionados();
  alert(`Orden ${nuevaOrden.id} registrada con éxito.`);
}

function imprimirTicket58mm(orden) {
  const ventanaImp = window.open('', '_blank', 'width=300,height=600');
  if (!ventanaImp) return;

  let filasExamenes = orden.examenes.map(e => `
    <tr>
      <td colspan="2" style="padding-top:4px;">${e.nombre}</td>
    </tr>
    <tr>
      <td>1 x S/ ${(e.precio || 25.0).toFixed(2)}</td>
      <td style="text-align:right;">S/ ${(e.precio || 25.0).toFixed(2)}</td>
    </tr>
  `).join('');

  ventanaImp.document.write(`
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <title>Ticket ${orden.id}</title>
      <style>
        @page { size: 58mm auto; margin: 2mm; }
        body { font-family: monospace; width: 200px; font-size: 11px; padding: 5px; color: #000; margin: 0; }
        .center { text-align: center; font-weight: bold; }
        .line { border-top: 1px dashed #000; margin: 5px 0; }
      </style>
    </head>
    <body>
      <div class="center">
        CENTRO MÉDICO VITAL HEALTH<br/>
        LABORATORIO CLÍNICO<br/>
        <small style="font-weight:normal;">Av. Grau N° 1799 - Veintiséis de Octubre</small><br/>
        <small style="font-weight:normal;">Tel: 984 089 927</small>
      </div>
      <div class="line"></div>
      <div><strong>ORDEN:</strong> ${orden.id}</div>
      <div><strong>FECHA:</strong> ${orden.fecha} ${orden.hora}</div>
      <div><strong>DNI:</strong> ${orden.paciente.dni}</div>
      <div><strong>PACIENTE:</strong> ${orden.paciente.nombre}</div>
      <div><strong>MÉDICO:</strong> ${orden.paciente.doctor}</div>
      <div><strong>PAGO:</strong> ${orden.metodoPago}</div>
      <div class="line"></div>
      <table style="width:100%; border-collapse:collapse;">
        <tbody>${filasExamenes}</tbody>
      </table>
      <div class="line"></div>
      <div style="text-align:right; font-size: 12px;"><strong>TOTAL: S/ ${orden.total.toFixed(2)}</strong></div>
      <div class="line"></div>
      <div class="center" style="margin-top:8px; font-weight:normal;">
        *** ¡Gracias por su confianza! ***
      </div>
      <script>
        window.onload = function() {
          window.print();
          window.close();
        }
      </script>
    </body>
    </html>
  `);
  ventanaImp.document.close();
}

// ==========================================
// SECCIÓN ÓRDENES DE TRABAJO
// ==========================================
function cargarOrdenes() {
  const tbody = document.getElementById('lista-ordenes-body');
  if (!tbody) return;

  if (ordenesGlobales.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="6" class="text-center text-muted py-4">No se han registrado órdenes aún.</td>
      </tr>
    `;
    return;
  }

  let html = '';
  ordenesGlobales.forEach(o => {
    const badgeColor = o.estado === 'COMPLETADO' ? 'bg-success' : 'bg-warning text-dark';
    html += `
      <tr>
        <td><strong>${o.id}</strong></td>
        <td>${o.fecha} <small class="text-muted">${o.hora}</small></td>
        <td>${o.paciente.dni}</td>
        <td>${o.paciente.nombre}</td>
        <td><span class="badge ${badgeColor}">${o.estado}</span></td>
        <td class="text-end px-3">
          <button class="btn btn-sm btn-primary" onclick="abrirResultadosParaOrden('${o.id}')">
            <i class="bi bi-pencil-square me-1"></i> Resultados
          </button>
        </td>
      </tr>
    `;
  });

  tbody.innerHTML = html;
}

// ==========================================
// REGISTRO Y GESTIÓN DE RESULTADOS
// ==========================================
function obtenerIndicadoresExamen(examen) {
  if (!examen) return [];
  const nombreNorm = (examen.nombre || '').toUpperCase().trim();
  if (BASE_VALORES_REFERENCIALES[nombreNorm]) {
    return BASE_VALORES_REFERENCIALES[nombreNorm];
  }

  if (examen.indicadores && Array.isArray(examen.indicadores) && examen.indicadores.length > 0) {
    return examen.indicadores;
  }

  return [{
    id: `ind_${examen.codigo}`,
    nombre: examen.nombre,
    unidad: examen.unidad || '',
    refMin: examen.refMin,
    refMax: examen.refMax,
    referencia: examen.referencia || ''
  }];
}

function abrirResultadosParaOrden(ordenId) {
  const orden = ordenesGlobales.find(o => o.id === ordenId);
  if (!orden) return;

  ordenSeleccionadaResultados = orden;
  resultadosTemporales = { ...(orden.resultados || {}) };

  showSection('resultados');
  renderizarEditorResultados();
}

function renderizarEditorResultados() {
  const editor = document.getElementById('resultados-editor');
  if (!editor || !ordenSeleccionadaResultados) return;

  const ord = ordenSeleccionadaResultados;
  let bloquesHTML = '';

  ord.examenes.forEach(ex => {
    const indicadores = obtenerIndicadoresExamen(ex);
    let camposHTML = '';

    indicadores.forEach(ind => {
      const valActual = resultadosTemporales[ind.id] || '';
      camposHTML += `
        <div class="row align-items-center mb-2 g-2">
          <div class="col-12 col-md-4">
            <label class="form-label mb-0 fw-semibold small">${ind.nombre}</label>
          </div>
          <div class="col-12 col-md-4">
            <input type="text" class="form-control form-control-sm" 
                   value="${valActual}" 
                   placeholder="Ingresar resultado"
                   onchange="actualizarValorResultado('${ind.id}', this.value)">
          </div>
          <div class="col-12 col-md-4">
            <small class="text-muted">${ind.unidad || ''} ${ind.referencia ? `(${ind.referencia})` : ''}</small>
          </div>
        </div>
      `;
    });

    bloquesHTML += `
      <div class="card mb-3 border border-light-subtle shadow-sm">
        <div class="card-header bg-light fw-bold text-primary">
          <i class="bi bi-file-text me-2"></i>${ex.nombre}
        </div>
        <div class="card-body">
          ${camposHTML}
        </div>
      </div>
    `;
  });

  editor.innerHTML = `
    <div class="d-flex justify-content-between align-items-center mb-3 pb-2 border-bottom flex-wrap gap-2">
      <div>
        <h5 class="fw-bold mb-0 text-dark">Paciente: ${ord.paciente.nombre}</h5>
        <small class="text-muted">Orden: <strong>${ord.id}</strong> | DNI: ${ord.paciente.dni} | Médico: ${ord.paciente.doctor}</small>
      </div>
      <div class="d-flex gap-2">
        <button class="btn btn-success" onclick="guardarResultadosOrden()">
          <i class="bi bi-save me-1"></i>Guardar Resultados
        </button>
        <button class="btn btn-primary" onclick="imprimirReporteA4()">
          <i class="bi bi-printer me-1"></i>Visualizar e Imprimir Reporte A4
        </button>
      </div>
    </div>
    ${bloquesHTML}
  `;
}

function actualizarValorResultado(indicadorId, valor) {
  resultadosTemporales[indicadorId] = valor;
}

function guardarResultadosOrden() {
  if (!ordenSeleccionadaResultados) return;

  const index = ordenesGlobales.findIndex(o => o.id === ordenSeleccionadaResultados.id);
  if (index !== -1) {
    ordenesGlobales[index].resultados = { ...resultadosTemporales };
    ordenesGlobales[index].estado = 'COMPLETADO';
    ordenSeleccionadaResultados = ordenesGlobales[index];

    localStorage.setItem('vitalhealth_ordenes', JSON.stringify(ordenesGlobales));
    alert('Resultados guardados exitosamente.');
  }
}

function evaluarRangoClinico(valStr, minVal, maxVal) {
let numericVal = parseFloat(val);
    let numericMin = parseFloat(min);
    let numericMax = parseFloat(max);

    if (isNaN(numericVal)) return val; 
    if (!isNaN(numericMin) && numericVal < numericMin) return val + ' *';
    if (!isNaN(numericMax) && numericVal > numericMax) return val + ' *';
    return val;
}

function imprimirReporteA4() {
  if (!ordenSeleccionadaResultados) return;
  guardarResultadosOrden();

  const ord = ordenSeleccionadaResultados;
  const ventanaImp = window.open('', '_blank');
  if (!ventanaImp) return;

  let bloquesHTML = ord.examenes.map(ex => {
    const indicadores = obtenerIndicadoresExamen(ex);
    let filas = indicadores.map(ind => {
      const valRes = ord.resultados[ind.id] || '-';
      const estado = evaluarRangoClinico(valRes, ind.refMin, ind.refMax);

      let celdaRes = valRes;
      if (estado === 'alto' || estado === 'bajo') {
        celdaRes = `<span style="color:red; font-weight:bold;">${valRes} * (${estado.toUpperCase()})</span>`;
      }

      const rangoTexto = ind.referencia ? ind.referencia : ((ind.refMin || ind.refMax) ? `${ind.refMin || ''} - ${ind.refMax || ''}` : '-');

      return `
        <tr>
          <td style="padding:6px; border:1px solid #ccc;">${ind.nombre}</td>
          <td style="padding:6px; border:1px solid #ccc; text-align:center; font-weight:bold;">${celdaRes}</td>
          <td style="padding:6px; border:1px solid #ccc; text-align:center;">${ind.unidad || '-'}</td>
          <td style="padding:6px; border:1px solid #ccc; text-align:center;">${rangoTexto}</td>
        </tr>
      `;
    }).join('');

    return `
      <div style="margin-top:15px;">
        <h4 style="color:#0072bc; border-bottom:1px solid #0072bc; margin-bottom:5px; font-size:14px; text-transform:uppercase;">${ex.nombre}</h4>
        <table style="width:100%; border-collapse:collapse; font-size:11px;">
          <thead>
            <tr style="background:#f0f4f8;">
              <th style="padding:6px; border:1px solid #ccc; text-align:left;">PARÁMETRO</th>
              <th style="padding:6px; border:1px solid #ccc; text-align:center;">RESULTADO</th>
              <th style="padding:6px; border:1px solid #ccc; text-align:center;">UNIDAD</th>
              <th style="padding:6px; border:1px solid #ccc; text-align:center;">VALOR REFERENCIAL</th>
            </tr>
          </thead>
          <tbody>${filas}</tbody>
        </table>
      </div>
    `;
  }).join('');

  ventanaImp.document.write(`
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <title>Informe Clínico - ${ord.paciente.nombre}</title>
      <style>
        @page { size: A4; margin: 15mm; }
        body { font-family: Arial, sans-serif; font-size: 11px; color: #333; line-height: 1.4; }
        .header { border-bottom: 2px solid #0072bc; padding-bottom: 8px; display: flex; justify-content: space-between; align-items: center; }
        .patient-box { border: 1px solid #b7c7d9; border-radius: 5px; padding: 10px; margin-top: 15px; display: grid; grid-template-columns: 1fr 1fr; gap: 6px; background-color: #fafafa; }
        .footer-sign { margin-top: 50px; text-align: center; }
      </style>
    </head>
    <body>
      <div class="header">
        <div>
          <h2 style="color:#0072bc; margin:0; font-size:18px;">CENTRO MÉDICO VITAL HEALTH</h2>
          <div style="font-weight:bold; color:#555;">LABORATORIO CLÍNICO</div>
        </div>
        <div style="text-align:right; font-size:10px;">
          <div>Av. Grau N° 1799 - Veintiséis de Octubre</div>
          <div>Tel / WhatsApp: 984 089 927</div>
        </div>
      </div>

      <div class="patient-box">
        <div><strong>PACIENTE:</strong> ${ord.paciente.nombre.toUpperCase()}</div>
        <div><strong>DNI / DOC:</strong> ${ord.paciente.dni}</div>
        <div><strong>EDAD:</strong> ${ord.paciente.edad} | <strong>SEXO:</strong> ${ord.paciente.sexo}</div>
        <div><strong>MÉDICO:</strong> ${ord.paciente.doctor}</div>
        <div><strong>N° ORDEN:</strong> ${ord.id}</div>
        <div><strong>FECHA / HORA:</strong> ${ord.fecha} ${ord.hora}</div>
      </div>

      ${bloquesHTML}

      <div class="footer-sign">
        <div style="border-top:1px solid #333; width:220px; margin:0 auto 5px auto;"></div>
        <strong>Raysa Yadira Ursula Alberca Atarama/strong><br/>
        <strong>Bióloga/strong><br/>
        <strong>C.B.P.17763/strong><br/>
      </div>

      <script>
        window.onload = function() { window.print(); }
      </script>
    </body>
    </html>
  `);
  ventanaImp.document.close();
}

// ==========================================
// CATÁLOGO Y PLANTILLAS
// ==========================================
function renderizarTablaCatalogo(filtro) {
  const tbody = document.getElementById('tabla-catalogo-body');
  const countEl = document.getElementById('total-cat-count');
  if (!tbody) return;

  const f = (filtro || '').toLowerCase();
  const lista = examenesCatalogo.filter(e => 
    e.nombre.toLowerCase().includes(f) || e.codigo.toLowerCase().includes(f)
  );

  if (countEl) countEl.textContent = examenesCatalogo.length;

  if (lista.length === 0) {
    tbody.innerHTML = `<tr><td colspan="5" class="text-center text-muted py-3">No hay exámenes registrados.</td></tr>`;
    return;
  }

  let html = '';
  lista.forEach(item => {
    const numInd = obtenerIndicadoresExamen(item).length;
    html += `
      <tr>
        <td><strong>${item.codigo}</strong></td>
        <td>${item.nombre}</td>
        <td><span class="badge bg-secondary">${numInd} ind.</span></td>
        <td>S/ ${parseFloat(item.precio || 25).toFixed(2)}</td>
        <td class="text-end">
          <button class="btn btn-sm btn-outline-primary" onclick="cargarExamenEnFormulario('${item.codigo}')" title="Configurar o modificar plantilla">
            <i class="bi bi-pencil-square"></i> Editar
          </button>
        </td>
      </tr>
    `;
  });

  tbody.innerHTML = html;
}

function prepararNuevoExamen() {
  document.getElementById('form-catalogo').reset();
  document.getElementById('cat-id-original').value = '';
  document.getElementById('catalogo-form-titulo').innerHTML = `<i class="bi bi-layout-text-window-reverse me-2"></i>Nuevo Examen`;
  document.getElementById('contenedor-indicadores').innerHTML = '';
}

function cargarExamenEnFormulario(codigo) {
  const item = examenesCatalogo.find(e => e.codigo === codigo);
  if (!item) return;

  document.getElementById('cat-id-original').value = item.codigo;
  document.getElementById('cat-codigo').value = item.codigo;
  document.getElementById('cat-nombre').value = item.nombre;
  document.getElementById('cat-precio').value = item.precio || 25.0;
  document.getElementById('cat-muestra').value = item.muestra || '';
  document.getElementById('cat-metodo').value = item.metodo || '';
  document.getElementById('cat-ref-texto').value = item.referencia || '';

  document.getElementById('catalogo-form-titulo').innerHTML = `<i class="bi bi-pencil-square me-2"></i>Editar Examen: ${item.nombre}`;

  const cont = document.getElementById('contenedor-indicadores');
  cont.innerHTML = '';
  const indicadores = obtenerIndicadoresExamen(item);

  indicadores.forEach(ind => {
    agregarIndicadorDOM(ind.nombre, ind.unidad, ind.refMin, ind.refMax, ind.referencia);
  });
}

function agregarIndicadorResultado() {
  agregarIndicadorDOM('', '', '', '', '');
}

function agregarIndicadorDOM(nombre = '', unidad = '', min = '', max = '', refText = '') {
  const cont = document.getElementById('contenedor-indicadores');
  if (!cont) return;

  const div = document.createElement('div');
  div.className = 'card p-2 mb-2 indicador-card bg-light';
  div.innerHTML = `
    <div class="row g-2 align-items-center">
      <div class="col-12 col-md-4">
        <input type="text" class="form-control form-control-sm ind-nombre" placeholder="Nombre Indicador" value="${nombre}" required>
      </div>
      <div class="col-4 col-md-2">
        <input type="text" class="form-control form-control-sm ind-unidad" placeholder="Unidad" value="${unidad}">
      </div>
      <div class="col-4 col-md-2">
        <input type="number" step="any" class="form-control form-control-sm ind-min" placeholder="Min" value="${min}">
      </div>
      <div class="col-4 col-md-2">
        <input type="number" step="any" class="form-control form-control-sm ind-max" placeholder="Max" value="${max}">
      </div>
      <div class="col-12 col-md-2 text-end">
        <button type="button" class="btn btn-sm btn-outline-danger" onclick="this.closest('.card').remove()"><i class="bi bi-trash"></i> Quitar</button>
      </div>
    </div>
  `;
  cont.appendChild(div);
}

function vaciarTodosLosIndicadores() {
  const cont = document.getElementById('contenedor-indicadores');
  if (cont) cont.innerHTML = '';
}

function guardarExamenCatalogo() {
  const codigoOrig = document.getElementById('cat-id-original').value;
  const codigo = document.getElementById('cat-codigo').value.trim();
  const nombre = document.getElementById('cat-nombre').value.trim();
  const precio = parseFloat(document.getElementById('cat-precio').value) || 0;
  const muestra = document.getElementById('cat-muestra').value.trim();
  const metodo = document.getElementById('cat-metodo').value.trim();
  const refTexto = document.getElementById('cat-ref-texto').value.trim();

  if (!codigo || !nombre) {
        alert("Código y Nombre son obligatorios.");
    return;
  }

  const indCards = document.querySelectorAll('#contenedor-indicadores .indicador-card');
  const indicadores = [];

  indCards.forEach((card, idx) => {
    const nom = card.querySelector('.ind-nombre').value.trim();
    if (nom) {
      indicadores.push({
        id: `ind_${codigo}_${idx + 1}`,
        nombre: nom,
        unidad: card.querySelector('.ind-unidad').value.trim(),
        refMin: card.querySelector('.ind-min').value,
        refMax: card.querySelector('.ind-max').value,
        referencia: refTexto
      });
    }
  });

  const nuevoExamen = {
    codigo,
    nombre,
    precio,
    muestra,
    metodo,
    unidad: indicadores[0]?.unidad || '',
    refMin: indicadores[0]?.refMin || '',
    refMax: indicadores[0]?.refMax || '',
    referencia: refTexto || (indicadores[0] ? `${indicadores[0].refMin} - ${indicadores[0].refMax}` : ''),
    indicadores
  };

  const idx = examenesCatalogo.findIndex(e => e.codigo === (codigoOrig || codigo));
  if (idx !== -1) {
    examenesCatalogo[idx] = nuevoExamen;
  } else {
    examenesCatalogo.push(nuevoExamen);
  }

  localStorage.setItem('vitalhealth_catalogo', JSON.stringify(examenesCatalogo));
  renderizarTablaCatalogo('');
  prepararNuevoExamen();
  alert("Examen guardado exitosamente en el catálogo.");
}

// ==========================================
// ARQUEO Y CONTROL DE CAJA
// ==========================================
function actualizarCaja() {
  const hoyStr = new Date().toLocaleDateString('es-PE');
  const ordenesHoy = ordenesGlobales.filter(o => o.fecha === hoyStr);

  let totalGeneral = 0;
  let totalEfectivo = 0;
  let totalDigital = 0;

  const tbody = document.getElementById('caja-tabla-body');
  let html = '';

  ordenesHoy.forEach(o => {
    const monto = parseFloat(o.total || 0);
    totalGeneral += monto;

    if (o.metodoPago === 'Efectivo') {
      totalEfectivo += monto;
    } else {
      totalDigital += monto;
    }

    html += `
      <tr>
        <td>${o.hora}</td>
        <td><strong>${o.id}</strong></td>
        <td>${o.paciente.nombre}</td>
        <td><span class="badge bg-light text-dark border">${o.metodoPago}</span></td>
        <td class="fw-bold">S/ ${monto.toFixed(2)}</td>
      </tr>
    `;
  });

  const elTotal = document.getElementById('caja-total-hoy');
  const elEfec = document.getElementById('caja-efectivo');
  const elDig = document.getElementById('caja-digital');

  if (elTotal) elTotal.textContent = totalGeneral.toFixed(2);
  if (elEfec) elEfec.textContent = totalEfectivo.toFixed(2);
  if (elDig) elDig.textContent = totalDigital.toFixed(2);

  if (tbody) {
    tbody.innerHTML = html || `<tr><td colspan="5" class="text-center text-muted py-3">No hay movimientos registrados el día de hoy.</td></tr>`;
  }
}
