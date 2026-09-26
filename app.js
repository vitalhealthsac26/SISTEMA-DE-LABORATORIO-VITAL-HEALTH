/* ============================================================
   CENTRO MÉDICO VITAL HEALTH
   SISTEMA DE LABORATORIO - APP.JS
   Versión robusta / modular / compatible con el index.html actual

   IMPORTANTE - RENIEC/DNI:
   1) Se recomienda usar un backend propio:
      GET /api/dni/{dni}
      o GET /api/dni?dni={dni}

   2) Si usas un proveedor externo, configura:
      window.RENIEC_CONFIG = {
        providers: [
          {
            name: 'APISPERU',
            type: 'GET_BEARER',
            url: 'https://api.apisperu.pro/api/consultas/v1/dni/{dni}',
            token: 'TU_TOKEN'
          }
        ]
      };

   3) NO publiques tokens privados en GitHub Pages.

   4) También puedes guardar la configuración mediante:
      configurarRENIEC({...})
   ============================================================ */

'use strict';

/* ============================================================
   CONFIGURACIÓN GENERAL
   ============================================================ */

const STORAGE = {
  ORDENES: 'ordenes_lab',
  PLANTILLAS: 'plantillas_lab',
  CONFIG: 'vital_health_config',
  DNI_CACHE: 'vital_health_dni_cache',
  CONTADOR: 'vital_health_contador_orden',
  PRODUCTOS: 'vital_health_productos'
};

const APP_CONFIG_DEFAULT = {
  nombreCentro: 'CENTRO MÉDICO VITAL HEALTH',
  ruc: '20615708829',
  direccion: 'Av. Grau N° 1799, Piura',
  telefono: '984 089 927',
  maxDniCache: 200,
  dniCacheDias: 30,
  timeoutMs: 10000,
  maxResultadosBusqueda: 10,
  moneda: 'S/',
  modoSeguro: true
};

let appConfig = cargarJSON(STORAGE.CONFIG, {}) || {};
appConfig = { ...APP_CONFIG_DEFAULT, ...appConfig };

let productos = [];
let itemsVenta = [];
let ordenes = cargarJSON(STORAGE.ORDENES, []) || [];


/* ============================================================
   PLANTILLAS PREDETERMINADAS
   ============================================================ */

const plantillasPredeterminadas = {

  "HEMOGRAMA": [
    {
      parametro: "Leucocitos",
      unidad: "Cél/uL",
      referencia: "4,500 - 13,500",
      metodo: "Citometría de flujo / Impedancia"
    },
    {
      parametro: "Glóbulos Rojos (Hematíes)",
      unidad: "Cél/uL",
      referencia: "4,000,000 - 5,200,000",
      metodo: "Citometría de flujo"
    },
    {
      parametro: "Hemoglobina",
      unidad: "g/dL",
      referencia: "11.50 - 15.50",
      metodo: "Espectrofotometría"
    },
    {
      parametro: "Hematocrito",
      unidad: "%",
      referencia: "35.00 - 45.00",
      metodo: "Centrifugación / Cálculo"
    },
    {
      parametro: "Volumen Corpuscular Medio (VCM)",
      unidad: "fL",
      referencia: "77.00 - 95.00",
      metodo: "Calculado"
    },
    {
      parametro: "Hemoglobina Corpuscular Media (HCM)",
      unidad: "pg",
      referencia: "25.00 - 33.00",
      metodo: "Calculado"
    },
    {
      parametro: "Concentración de Hb Corpuscular Media (CHCM)",
      unidad: "g/dL",
      referencia: "30.00 - 36.00",
      metodo: "Calculado"
    },
    {
      parametro: "Recuento Plaquetario",
      unidad: "Cél/uL",
      referencia: "150,000 - 475,000",
      metodo: "Impedancia eléctrica"
    },
    {
      parametro: "Neutrófilos Segmentados",
      unidad: "%",
      referencia: "31.00 - 51.00",
      metodo: "Microscopía / Automatizado"
    },
    {
      parametro: "Linfocitos",
      unidad: "%",
      referencia: "4.00 - 28.00",
      metodo: "Microscopía / Automatizado"
    },
    {
      parametro: "Monocitos",
      unidad: "%",
      referencia: "0.00 - 10.00",
      metodo: "Microscopía"
    },
    {
      parametro: "Eosinófilos",
      unidad: "%",
      referencia: "0.00 - 2.50",
      metodo: "Microscopía"
    },
    {
      parametro: "Basófilos",
      unidad: "%",
      referencia: "0.00 - 2.00",
      metodo: "Microscopía"
    }
  ],

  "GLUCOSA": [
    {
      parametro: "Glucosa en Ayunas",
      unidad: "mg/dL",
      referencia: "Adultos: 74 - 106 | Niños: 60 - 100",
      metodo: "Colorimétrico enzimático"
    }
  ],

  "ACIDO URICO": [
    {
      parametro: "Ácido Úrico",
      unidad: "mg/dL",
      referencia: "2.50 - 7.00",
      metodo: "Colorimétrico enzimático"
    }
  ],

  "HEMOGLOBINA GLICOSILADA": [
    {
      parametro: "Hemoglobina Glicosilada (HbA1c)",
      unidad: "%",
      referencia: "Normal: < 5.7% | Prediabetes: 5.7-6.4%",
      metodo: "HPLC / Inmunoturbidimetría"
    }
  ],

  "PERFIL LIPIDICO": [
    {
      parametro: "Colesterol Total",
      unidad: "mg/dL",
      referencia: "< 200 mg/dL",
      metodo: "Colorimétrico enzimático"
    },
    {
      parametro: "HDL - Colesterol",
      unidad: "mg/dL",
      referencia: "40.00 - 60.00",
      metodo: "Colorimétrico enzimático"
    },
    {
      parametro: "LDL - Colesterol",
      unidad: "mg/dL",
      referencia: "Riesgo Bajo < 129",
      metodo: "Calculado (Friedewald)"
    },
    {
      parametro: "VLDL - Colesterol",
      unidad: "mg/dL",
      referencia: "2.00 - 30.00",
      metodo: "Calculado"
    },
    {
      parametro: "Triglicéridos",
      unidad: "mg/dL",
      referencia: "< 150 mg/dL",
      metodo: "Colorimétrico enzimático"
    }
  ],

  "PERFIL HEPATICO": [
    {
      parametro: "Bilirrubina Total",
      unidad: "mg/dL",
      referencia: "< 1.20",
      metodo: "Colorimétrico"
    },
    {
      parametro: "Bilirrubina Directa",
      unidad: "mg/dL",
      referencia: "< 0.25",
      metodo: "Colorimétrico"
    },
    {
      parametro: "Bilirrubina Indirecta",
      unidad: "mg/dL",
      referencia: "< 0.80",
      metodo: "Calculado"
    },
    {
      parametro: "Proteínas Totales",
      unidad: "g/dL",
      referencia: "6.10 - 7.90",
      metodo: "Biuret"
    },
    {
      parametro: "Albúmina",
      unidad: "g/dL",
      referencia: "3.50 - 4.80",
      metodo: "Verde de Bromocresol"
    },
    {
      parametro: "Globulinas",
      unidad: "g/dL",
      referencia: "2.00 - 3.50",
      metodo: "Calculado"
    },
    {
      parametro: "TGO / AST",
      unidad: "U/L",
      referencia: "M: ≤38.00 | F: ≤32.00",
      metodo: "UV Enzimático"
    },
    {
      parametro: "TGP / ALT",
      unidad: "U/L",
      referencia: "M: ≤41.00 | F: ≤31.00",
      metodo: "UV Enzimático"
    },
    {
      parametro: "Fosfatasa Alcalina",
      unidad: "U/L",
      referencia: "Adultos: 40 - 150",
      metodo: "DGKC / IFCC"
    },
    {
      parametro: "Gamma Glutamil Transpeptidasa (GGT)",
      unidad: "U/L",
      referencia: "5.00 - 40.00",
      metodo: "Enzimático"
    }
  ]
};


let plantillasExamenes = cargarJSON(
  STORAGE.PLANTILLAS,
  null
);

if (
  !plantillasExamenes ||
  typeof plantillasExamenes !== 'object'
) {

  plantillasExamenes =
    clonar(plantillasPredeterminadas);

  guardarJSON(
    STORAGE.PLANTILLAS,
    plantillasExamenes
  );
}


/* ============================================================
   UTILIDADES
   ============================================================ */

function cargarJSON(clave, fallback = null) {

  try {

    const raw =
      localStorage.getItem(clave);

    return raw
      ? JSON.parse(raw)
      : fallback;

  } catch (error) {

    console.error(
      `Error leyendo ${clave}:`,
      error
    );

    return fallback;
  }
}


function guardarJSON(clave, valor) {

  try {

    localStorage.setItem(
      clave,
      JSON.stringify(valor)
    );

    return true;

  } catch (error) {

    console.error(
      `Error guardando ${clave}:`,
      error
    );

    notificar(
      'No se pudo guardar la información localmente.',
      'error'
    );

    return false;
  }
}


function clonar(obj) {

  return JSON.parse(
    JSON.stringify(obj)
  );
}


function escapeHTML(valor) {

  return String(valor ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}


function normalizarTexto(valor) {

  return String(valor ?? '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();
}


function hoyLocalISO() {

  const d = new Date();

  const offset =
    d.getTimezoneOffset();

  return new Date(
    d.getTime() -
    offset * 60000
  )
    .toISOString()
    .slice(0, 10);
}


function formatearFecha(fecha) {

  if (!fecha) return '-';

  const d =
    new Date(`${fecha}T00:00:00`);

  if (
    Number.isNaN(
      d.getTime()
    )
  ) {
    return fecha;
  }

  return d.toLocaleDateString(
    'es-PE'
  );
}


function generarId() {

  return `${Date.now()}_${Math.random()
    .toString(36)
    .slice(2, 8)}`;
}


function dormir(ms) {

  return new Promise(
    resolve => setTimeout(resolve, ms)
  );
}


function notificar(
  mensaje,
  tipo = 'info'
) {

  let toast =
    document.getElementById(
      'vh-toast'
    );

  if (!toast) {

    toast =
      document.createElement('div');

    toast.id = 'vh-toast';

    toast.style.cssText = `
      position:fixed;
      right:20px;
      bottom:20px;
      z-index:99999;
      max-width:420px;
      padding:14px 18px;
      border-radius:10px;
      color:#fff;
      font:600 14px Arial,sans-serif;
      box-shadow:0 8px 25px rgba(0,0,0,.18);
      transition:opacity .25s,transform .25s;
    `;

    document.body.appendChild(
      toast
    );
  }


  const fondos = {

    success: '#198754',

    error: '#dc3545',

    warning: '#b58105',

    info: '#0d6efd'

  };


  toast.style.background =
    fondos[tipo] ||
    fondos.info;

  toast.textContent =
    mensaje;

  toast.style.opacity = '1';

  toast.style.transform =
    'translateY(0)';


  clearTimeout(
    toast._timer
  );


  toast._timer =
    setTimeout(() => {

      toast.style.opacity = '0';

      toast.style.transform =
        'translateY(8px)';

    }, 4000);
}


function setLoadingBoton(
  boton,
  cargando,
  texto = 'Procesando...'
) {

  if (!boton) return;

  if (cargando) {

    if (
      !boton.dataset.textoOriginal
    ) {

      boton.dataset.textoOriginal =
        boton.innerHTML;
    }

    boton.disabled = true;

    boton.innerHTML =
      `⏳ ${escapeHTML(texto)}`;

  } else {

    boton.disabled = false;

    if (
      boton.dataset.textoOriginal
    ) {

      boton.innerHTML =
        boton.dataset.textoOriginal;
    }
  }
}


function asegurarArray(valor) {

  return Array.isArray(valor)
    ? valor
    : [];
}


/* ============================================================
   CARGA DE PRODUCTOS
   ============================================================ */

async function cargarProductos() {

  const fuentes = [
    'productos.json'
  ];

  for (
    const fuente of fuentes
  ) {

    try {

      const res =
        await fetch(
          fuente,
          {
            cache: 'no-store'
          }
        );

      if (!res.ok) {

        throw new Error(
          `HTTP ${res.status}`
        );
      }


      const data =
        await res.json();


      if (!Array.isArray(data)) {

        throw new Error(
          'productos.json no contiene un array'
        );
      }


      productos =
        data
          .map(
            (p, index) => ({

              Codigo:
                String(
                  p.Codigo ??
                  p.codigo ??
                  index + 1
                ),

              Nombre:
                String(
                  p.Nombre ??
                  p.nombre ??
                  ''
                ).trim(),

              Precio:
                Number.parseFloat(
                  p.Precio ??
                  p.precio ??
                  0
                ) || 0

            })
          )
          .filter(
            p => p.Nombre
          );


      guardarJSON(
        STORAGE.PRODUCTOS,
        productos
      );

      configurarBuscadorLive();

      return productos;

    } catch (error) {

      console.warn(
        `No se pudo cargar ${fuente}:`,
        error
      );
    }
  }


  const cache =
    cargarJSON(
      STORAGE.PRODUCTOS,
      []
    );


  if (
    Array.isArray(cache) &&
    cache.length
  ) {

    productos =
      cache;

    configurarBuscadorLive();

    notificar(
      'Se utilizaron los exámenes guardados localmente.',
      'warning'
    );

  } else {

    productos = [];

    notificar(
      'No se pudo cargar productos.json. Revisa que esté junto al index.html.',
      'error'
    );
  }


  return productos;
}


/* ============================================================
   RENIEC / DNI
   ============================================================ */

const RENIEC_CONFIG_DEFAULT = {

  providers: [

    {
      name: 'BACKEND_LOCAL',

      type: 'BACKEND',

      url: '/api/dni/{dni}'
    }

  ]

};


function obtenerConfigReniec() {

  const externa =
    window.RENIEC_CONFIG ||
    {};

  const guardada =
    cargarJSON(
      'vital_health_reniec_config',
      {}
    ) || {};


  return {

    ...RENIEC_CONFIG_DEFAULT,

    ...guardada,

    ...externa,

    providers:
      Array.isArray(
        externa.providers
      )
        ? externa.providers
        : Array.isArray(
            guardada.providers
          )
          ? guardada.providers
          : RENIEC_CONFIG_DEFAULT.providers

  };
}


function configurarRENIEC(config) {

  if (
    !config ||
    typeof config !== 'object'
  ) {

    throw new Error(
      'Configuración RENIEC inválida.'
    );
  }


  guardarJSON(
    'vital_health_reniec_config',
    config
  );


  notificar(
    'Configuración de DNI guardada.',
    'success'
  );
}


function validarDNI(dni) {

  return /^\d{8}$/.test(
    String(dni).trim()
  );
}


function obtenerCacheDNI(dni) {

  const cache =
    cargarJSON(
      STORAGE.DNI_CACHE,
      {}
    ) || {};


  const registro =
    cache[dni];


  if (!registro) {
    return null;
  }


  const edadCacheMs =
    appConfig.dniCacheDias *
    24 *
    60 *
    60 *
    1000;


  if (
    Date.now() -
    registro.timestamp >
    edadCacheMs
  ) {

    delete cache[dni];

    guardarJSON(
      STORAGE.DNI_CACHE,
      cache
    );

    return null;
  }


  return registro.data ||
    null;
}


function guardarCacheDNI(
  dni,
  data
) {

  const cache =
    cargarJSON(
      STORAGE.DNI_CACHE,
      {}
    ) || {};


  cache[dni] = {

    timestamp:
      Date.now(),

    data

  };


  const claves =
    Object.keys(cache);


  if (
    claves.length >
    appConfig.maxDniCache
  ) {

    claves
      .sort(
        (a, b) =>
          cache[a].timestamp -
          cache[b].timestamp
      )
      .slice(
        0,
        claves.length -
          appConfig.maxDniCache
      )
      .forEach(
        k => delete cache[k]
      );
  }


  guardarJSON(
    STORAGE.DNI_CACHE,
    cache
  );
}


function construirURL(
  url,
  dni
) {

  return String(url)

    .replaceAll(
      '{dni}',
      encodeURIComponent(dni)
    )

    .replaceAll(
      ':dni',
      encodeURIComponent(dni)
    );
}


async function fetchConTimeout(
  url,
  opciones = {},
  timeout =
    appConfig.timeoutMs
) {

  const controller =
    new AbortController();


  const timer =
    setTimeout(
      () =>
        controller.abort(),
      timeout
    );


  try {

    return await fetch(
      url,
      {
        ...opciones,
        signal:
          controller.signal,
        cache:
          'no-store'
      }
    );

  } finally {

    clearTimeout(timer);

  }
}


async function leerRespuestaJSON(
  res
) {

  const texto =
    await res.text();


  if (!texto) {
    return {};
  }


  try {

    return JSON.parse(
      texto
    );

  } catch {

    throw new Error(
      `Respuesta no válida del servidor (HTTP ${res.status}).`
    );
  }
}


function normalizarRespuestaDNI(
  data,
  dni
) {

  if (
    !data ||
    typeof data !== 'object'
  ) {

    return null;
  }


  const candidato =
    data.data &&
    typeof data.data === 'object'

      ? data.data

      : data.result &&
        typeof data.result === 'object'

        ? data.result

        : data;


  const nombres =
    candidato.nombres ??
    candidato.Nombres ??
    candidato.names ??
    candidato.first_names ??
    '';


  const apellidoPaterno =
    candidato.apellidoPaterno ??
    candidato.apellido_paterno ??
    candidato.paterno ??
    candidato.first_surname ??
    '';


  const apellidoMaterno =
    candidato.apellidoMaterno ??
    candidato.apellido_materno ??
    candidato.materno ??
    candidato.second_surname ??
    '';


  const nombreDirecto =
    candidato.nombreCompleto ??
    candidato.nombre_completo ??
    candidato.nombre ??
    candidato.full_name ??
    '';


  let nombreCompleto =
    String(
      nombreDirecto || ''
    ).trim();


  if (!nombreCompleto) {

    nombreCompleto =
      [
        nombres,
        apellidoPaterno,
        apellidoMaterno
      ]

        .map(
          v =>
            String(v || '')
              .trim()
        )

        .filter(Boolean)

        .join(' ')

        .trim();
  }


  if (
    !nombreCompleto ||
    nombreCompleto.length < 3
  ) {

    return null;
  }


  const sexoRaw =
    candidato.sexo ??
    candidato.genero ??
    candidato.gender ??
    '';


  const fechaRaw =
    candidato.fechaNacimiento ??
    candidato.fecha_nacimiento ??
    candidato.fechaNacimientoFormato ??
    candidato.birth_date ??
    '';


  return {

    dni:
      String(
        candidato.dni ??
        candidato.numero ??
        candidato.document_number ??
        dni
      )
        .replace(/\D/g, '')
        .slice(0, 8),

    nombres:
      String(
        nombres || ''
      ).trim(),

    apellidoPaterno:
      String(
        apellidoPaterno || ''
      ).trim(),

    apellidoMaterno:
      String(
        apellidoMaterno || ''
      ).trim(),

    nombreCompleto:
      nombreCompleto.toUpperCase(),

    sexo:
      normalizarSexo(
        sexoRaw
      ),

    fechaNacimiento:
      normalizarFechaNacimiento(
        fechaRaw
      ),

    fuente:
      candidato.fuente ??
      candidato.provider ??
      data.provider ??
      '',

    consultadoEn:
      new Date().toISOString()

  };
}


function normalizarSexo(
  valor
) {

  const s =
    normalizarTexto(
      valor
    );


  if (!s) {
    return '';
  }


  if (
    s === 'm' ||
    s.startsWith('mascul') ||
    s === '1'
  ) {

    return 'MASCULINO';
  }


  if (
    s === 'f' ||
    s.startsWith('femen') ||
    s === '2'
  ) {

    return 'FEMENINO';
  }


  return '';
}


function normalizarFechaNacimiento(
  valor
) {

  if (!valor) {
    return '';
  }


  const texto =
    String(valor).trim();


  if (
    /^\d{4}-\d{2}-\d{2}$/.test(
      texto
    )
  ) {

    return texto;
  }


  const matchDMY =
    texto.match(
      /^(\d{1,2})[\/-](\d{1,2})[\/-](\d{4})$/
    );


  if (matchDMY) {

    const [
      ,
      d,
      m,
      y
    ] = matchDMY;


    return `${y}-${m.padStart(
      2,
      '0'
    )}-${d.padStart(
      2,
      '0'
    )}`;
  }


  const iso =
    texto.match(
      /^(\d{4})-(\d{2})-(\d{2})T/
    );


  if (iso) {

    return `${iso[1]}-${iso[2]}-${iso[3]}`;
  }


  return '';
}


async function consultarProveedorDNI(
  proveedor,
  dni
) {

  if (
    !proveedor ||
    !proveedor.url
  ) {

    throw new Error(
      'Proveedor DNI sin URL configurada.'
    );
  }


  const tipo =
    String(
      proveedor.type ||
      'GET_BEARER'
    ).toUpperCase();


  const url =
    construirURL(
      proveedor.url,
      dni
    );


  const headers = {

    Accept:
      'application/json'

  };


  if (proveedor.token) {

    headers.Authorization =
      `Bearer ${proveedor.token}`;
  }


  let opciones = {

    method: 'GET',

    headers

  };


  if (
    tipo === 'POST_BEARER'
  ) {

    opciones = {

      method: 'POST',

      headers: {

        ...headers,

        'Content-Type':
          'application/json'

      },

      body:
        JSON.stringify({
          dni
        })

    };
  }


  if (
    tipo === 'BACKEND' &&
    proveedor.token
  ) {

    headers.Authorization =
      `Bearer ${proveedor.token}`;
  }


  const res =
    await fetchConTimeout(
      url,
      opciones
    );


  if (!res.ok) {

    const detalle =
      res.status === 404

        ? 'DNI no encontrado.'

        : res.status === 401 ||
          res.status === 403

          ? 'Credencial/token rechazado.'

          : `Servicio respondió HTTP ${res.status}.`;


    throw new Error(
      detalle
    );
  }


  const data =
    await leerRespuestaJSON(
      res
    );


  const normalizado =
    normalizarRespuestaDNI(
      data,
      dni
    );


  if (!normalizado) {

    throw new Error(
      'El proveedor respondió, pero no devolvió datos personales reconocibles.'
    );
  }


  return normalizado;
}


async function consultarDNIAPI(
  dni
) {

  const cache =
    obtenerCacheDNI(
      dni
    );


  if (cache) {

    return {

      ...cache,

      desdeCache:
        true

    };
  }


  const config =
    obtenerConfigReniec();


  const proveedores =
    asegurarArray(
      config.providers
    );


  if (!proveedores.length) {

    throw new Error(
      'No hay ningún proveedor de DNI configurado.'
    );
  }


  const errores = [];


  for (
    const proveedor of proveedores
  ) {

    try {

      const resultado =
        await consultarProveedorDNI(
          proveedor,
          dni
        );


      guardarCacheDNI(
        dni,
        resultado
      );


      return resultado;

    } catch (error) {

      errores.push(
        `${proveedor.name || 'Proveedor'}: ${error.message}`
      );

      console.warn(
        'Consulta DNI fallida:',
        proveedor.name,
        error
      );
    }
  }


  throw new Error(
    'No fue posible consultar el DNI. ' +
    (
      errores.length
        ? errores.join(' | ')
        : 'Verifique la configuración del servicio.'
    )
  );
}


async function consultarDNI() {

  const inputDni =
    document.getElementById(
      'v-dni'
    );

  const inputPaciente =
    document.getElementById(
      'v-paciente'
    );

  const inputFnac =
    document.getElementById(
      'v-fnac'
    );

  const inputSexo =
    document.getElementById(
      'v-sexo'
    );

  const boton =
    document.querySelector(
      '[onclick*="consultarDNI"]'
    );


  if (
    !inputDni ||
    !inputPaciente
  ) {

    return;
  }


  const dni =
    inputDni.value
      .replace(/\D/g, '')
      .slice(0, 8);


  inputDni.value =
    dni;


  if (
    !validarDNI(dni)
  ) {

    notificar(
      'Ingrese un DNI válido de 8 dígitos.',
      'warning'
    );

    inputDni.focus();

    return;
  }


  const textoAnterior =
    inputPaciente.value;


  setLoadingBoton(
    boton,
    true,
    'Consultando DNI...'
  );


  try {

    inputPaciente.value =
      'CONSULTANDO DNI...';


    const data =
      await consultarDNIAPI(
        dni
      );


    inputPaciente.value =
      data.nombreCompleto ||
      textoAnterior ||
      '';


    if (
      inputFnac &&
      data.fechaNacimiento
    ) {

      inputFnac.value =
        data.fechaNacimiento;

      calcularEdad();
    }


    if (
      inputSexo &&
      data.sexo
    ) {

      inputSexo.value =
        data.sexo;
    }


    notificar(

      data.desdeCache

        ? 'Paciente encontrado en caché local.'

        : 'Datos del paciente obtenidos correctamente.',

      'success'

    );


    inputPaciente.focus();


  } catch (error) {

    console.error(
      error
    );


    inputPaciente.value =
      textoAnterior ===
      'CONSULTANDO DNI...'
        ? ''
        : textoAnterior;


    notificar(
      'No se pudo consultar el DNI. Puede continuar ingresando los datos manualmente.',
      'warning'
    );


    inputPaciente.focus();


  } finally {

    setLoadingBoton(
      boton,
      false
    );

  }
}
/* ============================================================
   INICIALIZACIÓN DEL SISTEMA
   ============================================================ */

document.addEventListener(
  'DOMContentLoaded',
  async () => {

    try {

      inicializarFechas();

      inicializarEventosDNI();

      configurarBuscadorLive();

      poblarSelectPlantillas();

      cargarTablaOrdenes();

      inicializarModuloResultados();

      actualizarFechaActual();

      await cargarProductos();

      renderizarVenta();

      calcularTotalCobro();

      console.log(
        'Vital Health: sistema inicializado correctamente.'
      );

    } catch (error) {

      console.error(
        'Error inicializando sistema:',
        error
      );

      notificar(
        'El sistema inició con algunas funciones limitadas.',
        'warning'
      );
    }
  }
);


/* ============================================================
   FECHAS
   ============================================================ */

function inicializarFechas() {

  const hoy =
    hoyLocalISO();


  const fechaOrden =
    document.getElementById(
      'o-fecha'
    );

  if (
    fechaOrden &&
    !fechaOrden.value
  ) {

    fechaOrden.value =
      hoy;
  }


  const fechaNacimiento =
    document.getElementById(
      'v-fnac'
    );

  if (
    fechaNacimiento &&
    fechaNacimiento.value
  ) {

    calcularEdad();
  }
}


function actualizarFechaActual() {

  const elemento =
    document.getElementById(
      'fechaActual'
    );


  if (!elemento) {
    return;
  }


  const ahora =
    new Date();


  elemento.textContent =
    ahora.toLocaleDateString(
      'es-PE',
      {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }
    );
}


/* ============================================================
   EVENTOS DNI
   ============================================================ */

function inicializarEventosDNI() {

  const dni =
    document.getElementById(
      'v-dni'
    );


  if (!dni) {
    return;
  }


  dni.addEventListener(
    'input',
    () => {

      dni.value =
        dni.value
          .replace(/\D/g, '')
          .slice(0, 8);

    }
  );


  dni.addEventListener(
    'keydown',
    event => {

      if (
        event.key === 'Enter'
      ) {

        event.preventDefault();

        consultarDNI();
      }
    }
  );
}


/* ============================================================
   CÁLCULO DE EDAD
   ============================================================ */

function calcularEdad() {

  const fechaInput =
    document.getElementById(
      'v-fnac'
    );

  const edadInput =
    document.getElementById(
      'v-edad'
    );


  if (
    !fechaInput ||
    !edadInput
  ) {

    return 0;
  }


  const fecha =
    fechaInput.value;


  if (!fecha) {

    edadInput.value =
      '';

    return 0;
  }


  const nacimiento =
    new Date(
      `${fecha}T00:00:00`
    );


  if (
    Number.isNaN(
      nacimiento.getTime()
    )
  ) {

    edadInput.value =
      '';

    return 0;
  }


  const hoy =
    new Date();


  let edad =
    hoy.getFullYear() -
    nacimiento.getFullYear();


  const mes =
    hoy.getMonth() -
    nacimiento.getMonth();


  if (
    mes < 0 ||
    (
      mes === 0 &&
      hoy.getDate() <
      nacimiento.getDate()
    )
  ) {

    edad--;
  }


  edad =
    Math.max(
      0,
      edad
    );


  edadInput.value =
    edad;


  return edad;
}


/* ============================================================
   MÓDULOS
   ============================================================ */

function cambiarModulo(
  modulo,
  boton = null
) {

  const modulos =
    document.querySelectorAll(
      '.modulo, .module'
    );


  modulos.forEach(
    elemento => {

      elemento.classList.remove(
        'active',
        'active-module'
      );

      elemento.style.display =
        'none';

    }
  );


  const objetivo =
    document.getElementById(
      modulo
    ) ||
    document.getElementById(
      `modulo-${modulo}`
    );


  if (objetivo) {

    objetivo.classList.add(
      'active'
    );

    objetivo.classList.add(
      'active-module'
    );

    objetivo.style.display =
      '';
  }


  const botones =
    document.querySelectorAll(
      '.menu-item, .nav-btn, .sidebar button'
    );


  botones.forEach(
    b =>
      b.classList.remove(
        'active'
      )
  );


  if (boton) {

    boton.classList.add(
      'active'
    );

  } else {

    const candidato =
      Array.from(
        botones
      ).find(
        b =>
          String(
            b.getAttribute(
              'onclick'
            ) || ''
          ).includes(
            `'${modulo}'`
          )
      );


    if (candidato) {

      candidato.classList.add(
        'active'
      );
    }
  }


  const titulos = {

    recepcion: [
      'Recepción',
      'Registro y atención de pacientes'
    ],

    ordenes: [
      'Órdenes',
      'Órdenes de laboratorio'
    ],

    resultados: [
      'Resultados',
      'Gestión de resultados'
    ],

    plantillas: [
      'Plantillas',
      'Configuración de exámenes'
    ]

  };


  const titulo =
    document.getElementById(
      'tituloModulo'
    );

  const subtitulo =
    document.getElementById(
      'subtituloModulo'
    );


  if (
    titulos[modulo]
  ) {

    if (titulo) {

      titulo.textContent =
        titulos[modulo][0];
    }


    if (subtitulo) {

      subtitulo.textContent =
        titulos[modulo][1];
    }
  }


  if (
    modulo === 'ordenes'
  ) {

    cargarTablaOrdenes();
  }


  if (
    modulo === 'resultados'
  ) {

    cargarTablaOrdenesResultados();
  }


  if (
    modulo === 'plantillas'
  ) {

    poblarSelectPlantillas();
  }
}


/* ============================================================
   BUSCADOR DE EXÁMENES
   ============================================================ */

function configurarBuscadorLive() {

  const buscador =
    document.getElementById(
      'v-buscar'
    );


  if (!buscador) {
    return;
  }


  if (
    buscador.dataset.configurado ===
    'true'
  ) {

    return;
  }


  buscador.dataset.configurado =
    'true';


  buscador.addEventListener(
    'input',
    () => {

      const termino =
        buscador.value.trim();


      mostrarResultadosBusqueda(
        termino
      );

    }
  );


  buscador.addEventListener(
    'keydown',
    event => {

      if (
        event.key === 'Enter'
      ) {

        event.preventDefault();

        const termino =
          buscador.value.trim();


        const encontrados =
          buscarProductos(
            termino
          );


        if (
          encontrados.length === 1
        ) {

          seleccionarExamen(
            encontrados[0].Codigo
          );
        }
      }
    }
  );
}


function buscarProductos(
  termino
) {

  if (!termino) {

    return [];
  }


  const q =
    normalizarTexto(
      termino
    );


  return productos

    .filter(
      producto =>
        normalizarTexto(
          producto.Nombre
        ).includes(q) ||

        String(
          producto.Codigo
        )
        .toLowerCase()
        .includes(q)
    )

    .slice(
      0,
      appConfig.maxResultadosBusqueda
    );
}


function mostrarResultadosBusqueda(
  termino
) {

  let contenedor =
    document.getElementById(
      'v-resultados'
    );


  if (!contenedor) {

    contenedor =
      document.getElementById(
        'resultadosBuscadorExamen'
      );
  }


  if (!contenedor) {
    return;
  }


  if (!termino) {

    contenedor.innerHTML =
      '';

    return;
  }


  const resultados =
    buscarProductos(
      termino
    );


  if (!resultados.length) {

    contenedor.innerHTML = `
      <div class="search-empty">
        No se encontraron exámenes.
      </div>
    `;

    return;
  }


  contenedor.innerHTML =
    resultados
      .map(
        producto => `

          <div
            class="search-result-item"
            onclick="seleccionarExamen('${escapeHTML(producto.Codigo)}')"
          >

            <div>
              <strong>
                ${escapeHTML(producto.Nombre)}
              </strong>

              <small>
                Código: ${escapeHTML(producto.Codigo)}
              </small>
            </div>

            <strong>
              ${appConfig.moneda}
              ${Number(producto.Precio).toFixed(2)}
            </strong>

          </div>

        `
      )
      .join('');
}


/* ============================================================
   AGREGAR EXAMEN
   ============================================================ */

function seleccionarExamen(
  codigo
) {

  const producto =
    productos.find(
      p =>
        String(
          p.Codigo
        ) === String(codigo)
    );


  if (!producto) {

    notificar(
      'No se encontró el examen seleccionado.',
      'error'
    );

    return;
  }


  const existente =
    itemsVenta.find(
      item =>
        String(
          item.Codigo
        ) === String(
          producto.Codigo
        )
    );


  if (existente) {

    existente.cantidad =
      Number(
        existente.cantidad || 1
      ) + 1;

  } else {

    itemsVenta.push({

      id:
        generarId(),

      Codigo:
        producto.Codigo,

      Nombre:
        producto.Nombre,

      Precio:
        Number(
          producto.Precio
        ) || 0,

      cantidad:
        1

    });
  }


  renderizarVenta();

  calcularTotalCobro();


  const buscador =
    document.getElementById(
      'v-buscar'
    );


  if (buscador) {

    buscador.value =
      '';

    mostrarResultadosBusqueda(
      ''
    );
  }
}


/* ============================================================
   ELIMINAR EXAMEN
   ============================================================ */

function eliminarItemVenta(
  indice
) {

  if (
    indice < 0 ||
    indice >= itemsVenta.length
  ) {

    return;
  }


  const nombre =
    itemsVenta[indice].Nombre;


  itemsVenta.splice(
    indice,
    1
  );


  renderizarVenta();

  calcularTotalCobro();


  notificar(
    `${nombre} eliminado de la orden.`,
    'info'
  );
}


/* ============================================================
   CAMBIAR CANTIDAD
   ============================================================ */

function cambiarCantidadVenta(
  indice,
  cantidad
) {

  if (
    !itemsVenta[indice]
  ) {
    return;
  }


  let nuevaCantidad =
    Number(cantidad);


  if (
    !Number.isFinite(
      nuevaCantidad
    ) ||
    nuevaCantidad < 1
  ) {

    nuevaCantidad =
      1;
  }


  nuevaCantidad =
    Math.floor(
      nuevaCantidad
    );


  itemsVenta[indice].cantidad =
    nuevaCantidad;


  renderizarVenta();

  calcularTotalCobro();
}


/* ============================================================
   RENDERIZAR VENTA
   ============================================================ */

function renderizarVenta() {

  const tabla =
    document.getElementById(
      'v-lista'
    );


  if (!tabla) {
    return;
  }


  if (!itemsVenta.length) {

    tabla.innerHTML = `

      <tr>

        <td
          colspan="5"
          style="text-align:center;padding:25px;"
        >
          No hay exámenes agregados.

        </td>

      </tr>

    `;

    return;
  }


  tabla.innerHTML =
    itemsVenta
      .map(
        (item, index) => {

          const cantidad =
            Number(
              item.cantidad || 1
            );


          const precio =
            Number(
              item.Precio || 0
            );


          const importe =
            cantidad *
            precio;


          return `

            <tr>

              <td>
                ${escapeHTML(
                  item.Codigo
                )}
              </td>

              <td>
                ${escapeHTML(
                  item.Nombre
                )}
              </td>

              <td>

                <input
                  type="number"
                  min="1"
                  value="${cantidad}"
                  style="width:70px"
                  onchange="cambiarCantidadVenta(${index}, this.value)"
                >

              </td>

              <td>
                ${appConfig.moneda}
                ${precio.toFixed(2)}
              </td>

              <td>
                ${appConfig.moneda}
                ${importe.toFixed(2)}
              </td>

              <td>

                <button
                  type="button"
                  class="btn-delete"
                  onclick="eliminarItemVenta(${index})"
                  title="Eliminar"
                >
                  🗑️
                </button>

              </td>

            </tr>

          `;

        }
      )
      .join('');
}


/* ============================================================
   CÁLCULO DEL COBRO
   ============================================================ */

function obtenerDescuento() {

  const posibles = [

    document.getElementById(
      'v-descuento'
    ),

    document.getElementById(
      'descuentoVenta'
    )

  ];


  const input =
    posibles.find(
      el => !!el
    );


  if (!input) {
    return 0;
  }


  const valor =
    Number(
      input.value
    );


  if (
    !Number.isFinite(valor) ||
    valor < 0
  ) {

    return 0;
  }


  return valor;
}


function calcularTotalCobro() {

  const subtotal =
    itemsVenta.reduce(
      (
        acumulado,
        item
      ) => {

        const cantidad =
          Number(
            item.cantidad || 1
          );

        const precio =
          Number(
            item.Precio || 0
          );

        return acumulado +
          (
            cantidad *
            precio
          );

      },
      0
    );


  const descuento =
    obtenerDescuento();


  const total =
    Math.max(
      0,
      subtotal -
      descuento
    );


  const elementosSubtotal = [

    document.getElementById(
      'v-subtotal'
    ),

    document.getElementById(
      'subtotalVenta'
    )

  ];


  const elementosDescuento = [

    document.getElementById(
      'v-descuento'
    )

  ];


  const elementosTotal = [

    document.getElementById(
      'v-total'
    ),

    document.getElementById(
      'totalVenta'
    )

  ];


  elementosSubtotal
    .filter(Boolean)
    .forEach(
      elemento => {

        elemento.textContent =
          `${appConfig.moneda} ${subtotal.toFixed(2)}`;

      }
    );


  elementosTotal
    .filter(Boolean)
    .forEach(
      elemento => {

        elemento.textContent =
          `${appConfig.moneda} ${total.toFixed(2)}`;

      }
    );


  elementosDescuento
    .filter(Boolean)
    .forEach(
      elemento => {

        if (
          elemento.tagName ===
          'INPUT'
        ) {

          elemento.value =
            descuento;

        }

      }
    );


  return {

    subtotal,

    descuento,

    total

  };
}


/* ============================================================
   GENERAR NÚMERO DE ORDEN
   ============================================================ */

function generarNumeroOrden() {

  let contador =
    Number(
      localStorage.getItem(
        STORAGE.CONTADOR
      )
    );


  if (
    !Number.isFinite(
      contador
    )
  ) {

    contador = 0;
  }


  contador++;


  localStorage.setItem(
    STORAGE.CONTADOR,
    String(contador)
  );


  const año =
    new Date()
      .getFullYear();


  return `VH-${año}-${String(
    contador
  ).padStart(
    5,
    '0'
  )}`;
}


/* ============================================================
   OBTENER DATOS DEL PACIENTE
   ============================================================ */

function obtenerDatosPaciente() {

  const obtener =
    id => {

      const el =
        document.getElementById(
          id
        );

      return el
        ? el.value.trim()
        : '';
    };


  return {

    dni:
      obtener(
        'v-dni'
      ),

    paciente:
      obtener(
        'v-paciente'
      ),

    fnac:
      obtener(
        'v-fnac'
      ),

    edad:
      obtener(
        'v-edad'
      ),

    sexo:
      obtener(
        'v-sexo'
      )

  };
}


/* ============================================================
   VALIDAR RECEPCIÓN
   ============================================================ */

function validarRecepcion() {

  const paciente =
    obtenerDatosPaciente();


  if (
    !paciente.dni
  ) {

    return {
      ok: false,
      mensaje:
        'Ingrese el DNI del paciente.'
    };
  }


  if (
    !validarDNI(
      paciente.dni
    )
  ) {

    return {
      ok: false,
      mensaje:
        'El DNI debe tener 8 dígitos.'
    };
  }


  if (
    !paciente.paciente
  ) {

    return {
      ok: false,
      mensaje:
        'Ingrese los nombres y apellidos del paciente.'
    };
  }


  if (
    !itemsVenta.length
  ) {

    return {
      ok: false,
      mensaje:
        'Agregue al menos un examen a la orden.'
    };
  }


  return {
    ok: true
  };
}


/* ============================================================
   GUARDAR Y EMITIR ORDEN
   ============================================================ */

function guardarYEmitirTicket() {

  const validacion =
    validarRecepcion();


  if (!validacion.ok) {

    notificar(
      validacion.mensaje,
      'warning'
    );

    return;
  }


  const paciente =
    obtenerDatosPaciente();


  const cobro =
    calcularTotalCobro();


  const numero =
    generarNumeroOrden();


  const fecha =
    hoyLocalISO();


  const hora =
    new Date()
      .toLocaleTimeString(
        'es-PE'
      );


  const examenes =
    itemsVenta.map(
      item => ({

        id:
          generarId(),

        Codigo:
          item.Codigo,

        Nombre:
          item.Nombre,

        Precio:
          Number(
            item.Precio || 0
          ),

        cantidad:
          Number(
            item.cantidad || 1
          ),

        resultado:
          '',

        observacion:
          '',

        estado:
          'PENDIENTE'

      })
    );


  const orden = {

    id:
      generarId(),

    numeroOrden:
      numero,

    fecha:
      fecha,

    hora:
      hora,

    paciente: {

      dni:
        paciente.dni,

      nombre:
        paciente.paciente,

      fechaNacimiento:
        paciente.fnac,

      edad:
        paciente.edad,

      sexo:
        paciente.sexo

    },

    examenes,

    subtotal:
      cobro.subtotal,

    descuento:
      cobro.descuento,

    total:
      cobro.total,

    estado:
      'PENDIENTE',

    creadoEn:
      new Date().toISOString(),

    actualizadoEn:
      new Date().toISOString()

  };


  ordenes.push(
    orden
  );


  guardarJSON(
    STORAGE.ORDENES,
    ordenes
  );


  mostrarTicketOrden(
    orden
  );


  limpiarFormularioRecepcion();


  cargarTablaOrdenes();


  notificar(
    `Orden ${numero} guardada correctamente.`,
    'success'
  );
}


/* ============================================================
   TICKET
   ============================================================ */

function mostrarTicketOrden(
  orden
) {

  const ventana =
    window.open(
      '',
      '_blank',
      'width=500,height=750'
    );


  if (!ventana) {

    notificar(
      'El navegador bloqueó la ventana del ticket. Permite ventanas emergentes.',
      'warning'
    );

    return;
  }


  const filas =
    orden.examenes
      .map(
        examen => {

          const cantidad =
            Number(
              examen.cantidad || 1
            );


          const importe =
            cantidad *
            Number(
              examen.Precio || 0
            );


          return `

            <tr>

              <td>
                ${escapeHTML(
                  examen.Nombre
                )}
              </td>

              <td style="text-align:center">
                ${cantidad}
              </td>

              <td style="text-align:right">
                ${importe.toFixed(2)}
              </td>

            </tr>

          `;

        }
      )
      .join('');


  ventana.document.write(`

    <!DOCTYPE html>

    <html>

    <head>

      <meta charset="UTF-8">

      <title>
        Ticket ${escapeHTML(
          orden.numeroOrden
        )}
      </title>

      <style>

        body {
          font-family: Arial, sans-serif;
          width: 80mm;
          margin: 0 auto;
          padding: 10px;
          color: #111;
        }

        h1 {
          font-size: 18px;
          text-align: center;
          margin: 0 0 4px;
        }

        h2 {
          font-size: 13px;
          text-align: center;
          margin: 0 0 10px;
        }

        .center {
          text-align: center;
        }

        .line {
          border-top: 1px dashed #333;
          margin: 8px 0;
        }

        .datos {
          font-size: 11px;
          line-height: 1.5;
        }

        table {
          width: 100%;
          border-collapse: collapse;
          font-size: 10px;
        }

        th {
          text-align: left;
          border-bottom: 1px solid #333;
        }

        td {
          padding: 3px 0;
        }

        .total {
          font-size: 15px;
          font-weight: bold;
          text-align: right;
        }

        .gracias {
          text-align: center;
          margin-top: 15px;
          font-size: 11px;
        }

      </style>

    </head>

    <body>

      <h1>
        CENTRO MÉDICO VITAL HEALTH
      </h1>

      <h2>
        LABORATORIO CLÍNICO
      </h2>

      <div class="center">
        Av. Grau N° 1799 - Piura
      </div>

      <div class="center">
        Tel: 984 089 927
      </div>

      <div class="line"></div>

      <div class="datos">

        <strong>ORDEN:</strong>
        ${escapeHTML(
          orden.numeroOrden
        )}
        <br>

        <strong>FECHA:</strong>
        ${formatearFecha(
          orden.fecha
        )}
        ${escapeHTML(
          orden.hora
        )}
        <br>

        <strong>DNI:</strong>
        ${escapeHTML(
          orden.paciente.dni
        )}
        <br>

        <strong>PACIENTE:</strong>
        ${escapeHTML(
          orden.paciente.nombre
        )}

      </div>

      <div class="line"></div>

      <table>

        <thead>

          <tr>

            <th>
              Examen
            </th>

            <th>
              Cant.
            </th>

            <th>
              Importe
            </th>

          </tr>

        </thead>

        <tbody>

          ${filas}

        </tbody>

      </table>

      <div class="line"></div>

      <div>
        Subtotal:
        S/ ${orden.subtotal.toFixed(2)}
      </div>

      <div>
        Descuento:
        S/ ${orden.descuento.toFixed(2)}
      </div>

      <div class="total">
        TOTAL:
        S/ ${orden.total.toFixed(2)}
      </div>

      <div class="gracias">

        Gracias por confiar en
        <strong>Vital Health</strong>.

        <br><br>

        Tu salud es nuestra prioridad.

      </div>

      <script>

        window.onload = function() {

          window.print();

        };

      <\/script>

    </body>

    </html>

  `);


  ventana.document.close();
}


/* ============================================================
   LIMPIAR FORMULARIO
   ============================================================ */

function limpiarFormularioRecepcion() {

  const ids = [

    'v-dni',

    'v-paciente',

    'v-fnac',

    'v-edad',

    'v-sexo',

    'v-buscar'

  ];


  ids.forEach(
    id => {

      const elemento =
        document.getElementById(
          id
        );


      if (!elemento) {
        return;
      }


      if (
        elemento.tagName ===
        'SELECT'
      ) {

        elemento.value =
          '';

      } else {

        elemento.value =
          '';

      }
    }
  );


  itemsVenta = [];


  renderizarVenta();

  calcularTotalCobro();


  const resultados =
    document.getElementById(
      'v-resultados'
    );


  if (resultados) {

    resultados.innerHTML =
      '';
  }
}
/* ============================================================
   ÓRDENES
   ============================================================ */

function cargarTablaOrdenes() {

  const tabla =
    document.getElementById(
      'o-lista'
    );


  if (!tabla) {
    return;
  }


  const buscador =
    document.getElementById(
      'o-buscar'
    );


  const termino =
    buscador
      ? normalizarTexto(
          buscador.value
        )
      : '';


  let lista =
    [...ordenes]
      .sort(
        (a, b) =>
          new Date(
            b.actualizadoEn ||
            b.creadoEn ||
            0
          ) -
          new Date(
            a.actualizadoEn ||
            a.creadoEn ||
            0
          )
      );


  if (termino) {

    lista =
      lista.filter(
        orden => {

          const texto = [

            orden.numeroOrden,

            orden.paciente?.dni,

            orden.paciente?.nombre,

            orden.estado,

            orden.fecha

          ]

            .filter(Boolean)

            .join(' ');


          return normalizarTexto(
            texto
          ).includes(
            termino
          );
        }
      );
  }


  if (!lista.length) {

    tabla.innerHTML = `

      <tr>

        <td
          colspan="8"
          style="text-align:center;padding:30px;"
        >

          No hay órdenes registradas.

        </td>

      </tr>

    `;

    return;
  }


  tabla.innerHTML =
    lista
      .map(
        orden => {

          const estado =
            obtenerEstadoOrden(
              orden
            );


          const clase =
            claseEstado(
              estado
            );


          return `

            <tr>

              <td>
                <strong>
                  ${escapeHTML(
                    orden.numeroOrden
                  )}
                </strong>
              </td>

              <td>
                ${formatearFecha(
                  orden.fecha
                )}
              </td>

              <td>
                ${escapeHTML(
                  orden.paciente?.dni ||
                  ''
                )}
              </td>

              <td>
                ${escapeHTML(
                  orden.paciente?.nombre ||
                  ''
                )}
              </td>

              <td>
                ${appConfig.moneda}
                ${Number(
                  orden.total || 0
                ).toFixed(2)}
              </td>

              <td>

                <span
                  class="estado ${clase}"
                >
                  ${escapeHTML(
                    estado
                  )}
                </span>

              </td>

              <td>

                <div
                  style="
                    display:flex;
                    gap:5px;
                    flex-wrap:wrap;
                  "
                >

                  <button
                    type="button"
                    onclick="cargarOrdenParaResultados('${escapeHTML(orden.id)}')"
                    class="btn btn-primary"
                  >
                    🧪 Resultados
                  </button>

                  <button
                    type="button"
                    onclick="duplicarOrden('${escapeHTML(orden.id)}')"
                    class="btn btn-secondary"
                  >
                    📋 Duplicar
                  </button>

                </div>

              </td>

            </tr>

          `;

        }
      )
      .join('');
}


function obtenerEstadoOrden(
  orden
) {

  if (!orden) {
    return 'PENDIENTE';
  }


  if (
    orden.estado
  ) {

    return orden.estado;
  }


  const examenes =
    asegurarArray(
      orden.examenes
    );


  if (!examenes.length) {
    return 'PENDIENTE';
  }


  const completados =
    examenes.filter(
      examen =>
        String(
          examen.resultado ??
          ''
        ).trim() !== ''
    ).length;


  if (
    completados === 0
  ) {

    return 'PENDIENTE';
  }


  if (
    completados <
    examenes.length
  ) {

    return 'EN PROCESO';
  }


  return 'COMPLETADO';
}


function claseEstado(
  estado
) {

  const e =
    normalizarTexto(
      estado
    );


  if (
    e.includes('complet')
  ) {

    return 'estado-completado';
  }


  if (
    e.includes('proceso')
  ) {

    return 'estado-proceso';
  }


  if (
    e.includes('cancel')
  ) {

    return 'estado-cancelado';
  }


  return 'estado-pendiente';
}


/* ============================================================
   BUSCADOR DE ÓRDENES
   ============================================================ */

function configurarBuscadorOrdenes() {

  const buscador =
    document.getElementById(
      'o-buscar'
    );


  if (!buscador) {
    return;
  }


  if (
    buscador.dataset.configurado
  ) {

    return;
  }


  buscador.dataset.configurado =
    'true';


  buscador.addEventListener(
    'input',
    cargarTablaOrdenes
  );
}


/* ============================================================
   RESULTADOS
   ============================================================ */

let ordenResultadoActual = null;


function inicializarModuloResultados() {

  configurarBuscadorOrdenes();

  cargarTablaOrdenesResultados();
}


function cargarTablaOrdenesResultados() {

  const contenedor =
    document.getElementById(
      'r-lista'
    );


  if (!contenedor) {
    return;
  }


  const buscador =
    document.getElementById(
      'r-buscar'
    );


  const termino =
    buscador
      ? normalizarTexto(
          buscador.value
        )
      : '';


  let lista =
    [...ordenes]
      .sort(
        (a, b) =>
          new Date(
            b.fecha ||
            0
          ) -
          new Date(
            a.fecha ||
            0
          )
      );


  if (termino) {

    lista =
      lista.filter(
        orden => {

          const texto = [

            orden.numeroOrden,

            orden.paciente?.dni,

            orden.paciente?.nombre

          ]

            .filter(Boolean)

            .join(' ');


          return normalizarTexto(
            texto
          ).includes(
            termino
          );

        }
      );
  }


  if (!lista.length) {

    contenedor.innerHTML = `

      <div
        class="empty-state"
        style="
          padding:30px;
          text-align:center;
        "
      >

        No se encontraron órdenes.

      </div>

    `;

    return;
  }


  contenedor.innerHTML =
    lista
      .map(
        orden => {

          const estado =
            obtenerEstadoOrden(
              orden
            );


          return `

            <div
              class="orden-result-item"
              style="
                border:1px solid #ddd;
                border-radius:10px;
                padding:12px;
                margin-bottom:8px;
                cursor:pointer;
              "
              onclick="cargarOrdenParaResultados('${escapeHTML(orden.id)}')"
            >

              <div>

                <strong>
                  ${escapeHTML(
                    orden.numeroOrden
                  )}
                </strong>

                <br>

                <span>
                  ${escapeHTML(
                    orden.paciente?.nombre ||
                    ''
                  )}
                </span>

                <br>

                <small>
                  DNI:
                  ${escapeHTML(
                    orden.paciente?.dni ||
                    ''
                  )}
                  ·
                  ${formatearFecha(
                    orden.fecha
                  )}
                </small>

              </div>

              <span
                class="estado ${claseEstado(estado)}"
              >
                ${escapeHTML(
                  estado
                )}
              </span>

            </div>

          `;

        }
      )
      .join('');
}


function cargarOrdenParaResultados(
  id
) {

  const orden =
    ordenes.find(
      item =>
        String(
          item.id
        ) === String(id)
    );


  if (!orden) {

    notificar(
      'No se encontró la orden.',
      'error'
    );

    return;
  }


  ordenResultadoActual =
    orden;


  const modulo =
    document.getElementById(
      'resultados'
    ) ||
    document.getElementById(
      'modulo-resultados'
    );


  if (
    modulo &&
    !modulo.classList.contains(
      'active'
    )
  ) {

    cambiarModulo(
      'resultados'
    );
  }


  renderizarExamenesResultados(
    orden
  );
}


function renderizarExamenesResultados(
  orden =
    ordenResultadoActual
) {

  if (!orden) {
    return;
  }


  ordenResultadoActual =
    orden;


  const paciente =
    orden.paciente ||
    {};


  const cabecera =
    document.getElementById(
      'r-paciente'
    );


  if (cabecera) {

    cabecera.innerHTML = `

      <div class="patient-header">

        <h3>
          ${escapeHTML(
            paciente.nombre ||
            'Paciente'
          )}
        </h3>

        <p>
          <strong>DNI:</strong>
          ${escapeHTML(
            paciente.dni ||
            ''
          )}
        </p>

        <p>
          <strong>Orden:</strong>
          ${escapeHTML(
            orden.numeroOrden ||
            ''
          )}
        </p>

        <p>
          <strong>Fecha:</strong>
          ${formatearFecha(
            orden.fecha
          )}
        </p>

      </div>

    `;
  }


  const contenedor =
    document.getElementById(
      'r-examenes'
    );


  if (!contenedor) {
    return;
  }


  const examenes =
    asegurarArray(
      orden.examenes
    );


  if (!examenes.length) {

    contenedor.innerHTML =
      '<p>No hay exámenes.</p>';

    return;
  }


  contenedor.innerHTML =
    examenes
      .map(
        (examen, index) => {

          const plantilla =
            obtenerPlantillaExamen(
              examen.Nombre
            );


          const parametros =
            asegurarArray(
              plantilla
            );


          if (
            parametros.length
          ) {

            return renderizarExamenConParametros(
              examen,
              parametros,
              index
            );

          }


          return renderizarExamenSimple(
            examen,
            index
          );

        }
      )
      .join('');
}


function obtenerPlantillaExamen(
  nombre
) {

  const buscado =
    normalizarTexto(
      nombre
    );


  const clave =
    Object.keys(
      plantillasExamenes
    ).find(
      key =>
        normalizarTexto(
          key
        ) ===
        buscado
    );


  if (clave) {

    return plantillasExamenes[
      clave
    ];
  }


  const aproximada =
    Object.keys(
      plantillasExamenes
    ).find(
      key =>
        buscado.includes(
          normalizarTexto(
            key
          )
        ) ||
        normalizarTexto(
          key
        ).includes(
          buscado
        )
    );


  return aproximada
    ? plantillasExamenes[
        aproximada
      ]
    : [];
}


/* ============================================================
   RENDERIZAR EXAMEN CON PARÁMETROS
   ============================================================ */

function renderizarExamenConParametros(
  examen,
  parametros,
  indiceExamen
) {

  const valores =
    examen.parametros ||
    {};


  return `

    <div
      class="resultado-examen"
      data-examen-index="${indiceExamen}"
      style="
        margin-bottom:25px;
        border:1px solid #ddd;
        border-radius:12px;
        overflow:hidden;
      "
    >

      <div
        class="resultado-examen-header"
        style="
          padding:14px;
          background:#f5f7fa;
        "
      >

        <strong>
          ${escapeHTML(
            examen.Nombre
          )}
        </strong>

      </div>


      <div
        style="
          overflow-x:auto;
        "
      >

        <table
          class="tabla-resultados"
          style="
            width:100%;
            border-collapse:collapse;
          "
        >

          <thead>

            <tr>

              <th>
                Parámetro
              </th>

              <th>
                Resultado
              </th>

              <th>
                Unidad
              </th>

              <th>
                Valores de referencia
              </th>

              <th>
                Método
              </th>

            </tr>

          </thead>

          <tbody>

            ${parametros
              .map(
                (parametro, indiceParametro) => {

                  const valor =
                    valores[
                      parametro.parametro
                    ] ??
                    '';


                  return `

                    <tr>

                      <td>
                        ${escapeHTML(
                          parametro.parametro
                        )}
                      </td>

                      <td>

                        <input
                          type="text"
                          class="resultado-input"
                          data-examen="${indiceExamen}"
                          data-parametro="${escapeHTML(parametro.parametro)}"
                          value="${escapeHTML(valor)}"
                          placeholder="Resultado"
                        >

                      </td>

                      <td>
                        ${escapeHTML(
                          parametro.unidad ||
                          ''
                        )}
                      </td>

                      <td>
                        ${escapeHTML(
                          parametro.referencia ||
                          ''
                        )}
                      </td>

                      <td>
                        ${escapeHTML(
                          parametro.metodo ||
                          ''
                        )}
                      </td>

                    </tr>

                  `;

                }
              )
              .join('')}

          </tbody>

        </table>

      </div>


      <div
        style="
          padding:12px;
        "
      >

        <label>
          Observaciones
        </label>

        <textarea
          class="observacion-examen"
          data-examen="${indiceExamen}"
          rows="3"
          style="
            width:100%;
            box-sizing:border-box;
          "
          placeholder="Observaciones del examen..."
        >${escapeHTML(
          examen.observacion ||
          ''
        )}</textarea>

      </div>

    </div>

  `;
}


function renderizarExamenSimple(
  examen,
  indiceExamen
) {

  return `

    <div
      class="resultado-examen"
      data-examen-index="${indiceExamen}"
      style="
        margin-bottom:20px;
        border:1px solid #ddd;
        border-radius:12px;
        padding:15px;
      "
    >

      <h3>
        ${escapeHTML(
          examen.Nombre
        )}
      </h3>

      <div
        class="form-grid"
      >

        <div
          class="form-group"
        >

          <label>
            Resultado
          </label>

          <input
            type="text"
            class="resultado-simple"
            data-examen="${indiceExamen}"
            value="${escapeHTML(
              examen.resultado ||
              ''
            )}"
            placeholder="Ingrese resultado"
          >

        </div>


        <div
          class="form-group"
        >

          <label>
            Observación
          </label>

          <input
            type="text"
            class="observacion-simple"
            data-examen="${indiceExamen}"
            value="${escapeHTML(
              examen.observacion ||
              ''
            )}"
            placeholder="Observación"
          >

        </div>

      </div>

    </div>

  `;
}


/* ============================================================
   GUARDAR RESULTADOS
   ============================================================ */

function guardarResultadosOrden() {

  if (
    !ordenResultadoActual
  ) {

    notificar(
      'Seleccione una orden primero.',
      'warning'
    );

    return;
  }


  const orden =
    ordenes.find(
      item =>
        String(
          item.id
        ) === String(
          ordenResultadoActual.id
        )
    );


  if (!orden) {

    notificar(
      'La orden ya no existe.',
      'error'
    );

    return;
  }


  const examenes =
    asegurarArray(
      orden.examenes
    );


  examenes.forEach(
    (examen, indiceExamen) => {

      const plantilla =
        obtenerPlantillaExamen(
          examen.Nombre
        );


      if (
        plantilla.length
      ) {

        const parametros = {};


        document
          .querySelectorAll(
            `.resultado-input[data-examen="${indiceExamen}"]`
          )
          .forEach(
            input => {

              const nombre =
                input.dataset.parametro;


              parametros[nombre] =
                input.value.trim();

            }
          );


        examen.parametros =
          parametros;


      } else {

        const resultado =
          document.querySelector(
            `.resultado-simple[data-examen="${indiceExamen}"]`
          );


        if (resultado) {

          examen.resultado =
            resultado.value.trim();
        }

      }


      const observacion =
        document.querySelector(
          `.observacion-examen[data-examen="${indiceExamen}"]`
        );


      if (observacion) {

        examen.observacion =
          observacion.value.trim();

      } else {

        const observacionSimple =
          document.querySelector(
            `.observacion-simple[data-examen="${indiceExamen}"]`
          );


        if (
          observacionSimple
        ) {

          examen.observacion =
            observacionSimple.value.trim();
        }
      }


      const tieneResultado =
        examen.parametros
          ? Object.values(
              examen.parametros
            ).some(
              value =>
                String(
                  value || ''
                ).trim() !== ''
            )
          : String(
              examen.resultado ||
              ''
            ).trim() !== '';


      examen.estado =
        tieneResultado
          ? 'COMPLETADO'
          : 'PENDIENTE';

    }
  );


  const todosCompletos =
    examenes.length > 0 &&
    examenes.every(
      examen =>
        examen.estado ===
        'COMPLETADO'
    );


  const algunosCompletos =
    examenes.some(
      examen =>
        examen.estado ===
        'COMPLETADO'
    );


  orden.estado =
    todosCompletos
      ? 'COMPLETADO'
      : algunosCompletos
        ? 'EN PROCESO'
        : 'PENDIENTE';


  orden.actualizadoEn =
    new Date().toISOString();


  guardarJSON(
    STORAGE.ORDENES,
    ordenes
  );


  ordenResultadoActual =
    orden;


  renderizarExamenesResultados(
    orden
  );


  cargarTablaOrdenes();

  cargarTablaOrdenesResultados();


  notificar(
    'Resultados guardados correctamente.',
    'success'
  );
}
/* ============================================================
   MOVER EXAMEN
   ============================================================ */

function moverExamen(
  indice,
  direccion
) {

  if (
    !ordenResultadoActual
  ) {
    return;
  }


  const examenes =
    ordenResultadoActual.examenes;


  if (
    indice < 0 ||
    indice >= examenes.length
  ) {

    return;
  }


  const nuevoIndice =
    indice + direccion;


  if (
    nuevoIndice < 0 ||
    nuevoIndice >= examenes.length
  ) {

    return;
  }


  const temporal =
    examenes[indice];


  examenes[indice] =
    examenes[nuevoIndice];


  examenes[nuevoIndice] =
    temporal;


  guardarJSON(
    STORAGE.ORDENES,
    ordenes
  );


  renderizarExamenesResultados(
    ordenResultadoActual
  );
}


/* ============================================================
   PDF DE RESULTADOS
   ============================================================ */

function imprimirResultadosPDF() {

  if (
    !ordenResultadoActual
  ) {

    notificar(
      'Seleccione una orden para generar el PDF.',
      'warning'
    );

    return;
  }


  const orden =
    ordenResultadoActual;


  const paciente =
    orden.paciente ||
    {};


  const contenedor =
    document.createElement(
      'div'
    );


  contenedor.style.cssText = `
    background:#fff;
    color:#111;
    padding:30px;
    width:190mm;
    box-sizing:border-box;
    font-family:Arial,sans-serif;
  `;


  let html = `

    <div
      style="
        text-align:center;
        border-bottom:2px solid #1c7ed6;
        padding-bottom:12px;
        margin-bottom:18px;
      "
    >

      <h1
        style="
          margin:0;
          font-size:22px;
        "
      >
        CENTRO MÉDICO VITAL HEALTH
      </h1>

      <div>
        LABORATORIO CLÍNICO
      </div>

      <div>
        Av. Grau N° 1799 - Piura
      </div>

      <div>
        Tel: 984 089 927
      </div>

    </div>


    <div
      style="
        display:grid;
        grid-template-columns:1fr 1fr;
        gap:8px;
        margin-bottom:20px;
        font-size:12px;
      "
    >

      <div>
        <strong>Paciente:</strong>
        ${escapeHTML(
          paciente.nombre ||
          ''
        )}
      </div>

      <div>
        <strong>DNI:</strong>
        ${escapeHTML(
          paciente.dni ||
          ''
        )}
      </div>

      <div>
        <strong>Fecha nacimiento:</strong>
        ${formatearFecha(
          paciente.fechaNacimiento ||
          ''
        )}
      </div>

      <div>
        <strong>Edad:</strong>
        ${escapeHTML(
          paciente.edad ||
          ''
        )}
      </div>

      <div>
        <strong>Sexo:</strong>
        ${escapeHTML(
          paciente.sexo ||
          ''
        )}
      </div>

      <div>
        <strong>N° Orden:</strong>
        ${escapeHTML(
          orden.numeroOrden ||
          ''
        )}
      </div>

      <div>
        <strong>Fecha:</strong>
        ${formatearFecha(
          orden.fecha ||
          ''
        )}
      </div>

    </div>

  `;


  orden.examenes.forEach(
    examen => {

      html += `

        <div
          style="
            margin-bottom:20px;
            page-break-inside:avoid;
          "
        >

          <h3
            style="
              background:#f0f4f8;
              padding:8px;
              margin:0;
              font-size:14px;
              border-left:4px solid #1c7ed6;
            "
          >
            ${escapeHTML(
              examen.Nombre
            )}
          </h3>

      `;


      const parametros =
        examen.parametros ||
        {};


      const plantilla =
        obtenerPlantillaExamen(
          examen.Nombre
        );


      if (
        plantilla.length
      ) {

        html += `

          <table
            style="
              width:100%;
              border-collapse:collapse;
              font-size:10px;
            "
          >

            <thead>

              <tr>

                <th
                  style="
                    border:1px solid #ccc;
                    padding:5px;
                    text-align:left;
                  "
                >
                  Parámetro
                </th>

                <th
                  style="
                    border:1px solid #ccc;
                    padding:5px;
                  "
                >
                  Resultado
                </th>

                <th
                  style="
                    border:1px solid #ccc;
                    padding:5px;
                  "
                >
                  Unidad
                </th>

                <th
                  style="
                    border:1px solid #ccc;
                    padding:5px;
                  "
                >
                  Referencia
                </th>

              </tr>

            </thead>

            <tbody>

        `;


        plantilla.forEach(
          parametro => {

            html += `

              <tr>

                <td
                  style="
                    border:1px solid #ccc;
                    padding:5px;
                  "
                >
                  ${escapeHTML(
                    parametro.parametro
                  )}
                </td>

                <td
                  style="
                    border:1px solid #ccc;
                    padding:5px;
                    text-align:center;
                    font-weight:bold;
                  "
                >
                  ${escapeHTML(
                    parametros[
                      parametro.parametro
                    ] ||
                    ''
                  )}
                </td>

                <td
                  style="
                    border:1px solid #ccc;
                    padding:5px;
                    text-align:center;
                  "
                >
                  ${escapeHTML(
                    parametro.unidad ||
                    ''
                  )}
                </td>

                <td
                  style="
                    border:1px solid #ccc;
                    padding:5px;
                  "
                >
                  ${escapeHTML(
                    parametro.referencia ||
                    ''
                  )}
                </td>

              </tr>

            `;

          }
        );


        html += `

            </tbody>

          </table>

        `;

      } else {

        html += `

          <div
            style="
              padding:10px;
              border:1px solid #ccc;
            "
          >

            <strong>
              Resultado:
            </strong>

            ${escapeHTML(
              examen.resultado ||
              ''
            )}

          </div>

        `;

      }


      if (
        examen.observacion
      ) {

        html += `

          <div
            style="
              margin-top:8px;
              font-size:10px;
            "
          >

            <strong>
              Observación:
            </strong>

            ${escapeHTML(
              examen.observacion
            )}

          </div>

        `;

      }


      html += `
        </div>
      `;

    }
  );


  html += `

    <div
      style="
        margin-top:30px;
        text-align:center;
        font-size:10px;
        color:#555;
      "
    >

      <p>
        Resultado de laboratorio.
      </p>

      <p>
        Centro Médico Vital Health
      </p>

      <p>
        Tu salud es nuestra prioridad.
      </p>

    </div>

  `;


  contenedor.innerHTML =
    html;


  document.body.appendChild(
    contenedor
  );


  if (
    typeof html2pdf ===
    'undefined'
  ) {

    notificar(
      'No se encontró la librería PDF. Revise la conexión a internet.',
      'error'
    );


    contenedor.remove();

    return;
  }


  const opciones = {

    margin:
      8,

    filename:
      `Resultado_${orden.numeroOrden}_${paciente.dni || ''}.pdf`,

    image: {

      type:
        'jpeg',

      quality:
        0.98

    },

    html2canvas: {

      scale:
        2,

      useCORS:
        true

    },

    jsPDF: {

      unit:
        'mm',

      format:
        'a4',

      orientation:
        'portrait'

    }

  };


  html2pdf()

    .set(
      opciones
    )

    .from(
      contenedor
    )

    .save()

    .then(
      () => {

        contenedor.remove();

        notificar(
          'PDF generado correctamente.',
          'success'
        );

      }
    )

    .catch(
      error => {

        console.error(
          error
        );

        contenedor.remove();

        notificar(
          'No se pudo generar el PDF.',
          'error'
        );

      }
    );
}


/* ============================================================
   PLANTILLAS
   ============================================================ */

function poblarSelectPlantillas() {

  const selects = [

    document.getElementById(
      'p-select'
    ),

    document.getElementById(
      'selectorPlantillaEditar'
    ),

    document.getElementById(
      'selectorPlantilla'
    )

  ];


  const claves =
    Object.keys(
      plantillasExamenes
    );


  selects
    .filter(Boolean)
    .forEach(
      select => {

        const valorActual =
          select.value;


        select.innerHTML = `

          <option value="">
            Seleccionar plantilla
          </option>

          ${claves
            .map(
              clave => `

                <option
                  value="${escapeHTML(clave)}"
                >
                  ${escapeHTML(clave)}
                </option>

              `
            )
            .join('')}

        `;


        if (
          claves.includes(
            valorActual
          )
        ) {

          select.value =
            valorActual;
        }

      }
    );
}


/* Alias solicitado por compatibilidad */

function pobladorSelectPlantillas() {

  poblarSelectPlantillas();
}


function cargarPlantillaParaEditar() {

  const select =
    document.getElementById(
      'p-select'
    ) ||
    document.getElementById(
      'selectorPlantillaEditar'
    );


  if (!select) {
    return;
  }


  const nombre =
    select.value;


  if (!nombre) {
    return;
  }


  const inputNombre =
    document.getElementById(
      'p-nombre'
    ) ||
    document.getElementById(
      'nombrePlantilla'
    );


  if (inputNombre) {

    inputNombre.value =
      nombre;
  }


  const tabla =
    document.getElementById(
      'p-parametros'
    ) ||
    document.getElementById(
      'tablaParametrosPlantilla'
    );


  if (!tabla) {
    return;
  }


  const parametros =
    asegurarArray(
      plantillasExamenes[
        nombre
      ]
    );


  tabla.innerHTML =
    parametros
      .map(
        parametro =>
          crearFilaParametroHTML(
            parametro
          )
      )
      .join('');
}


function crearFilaParametroHTML(
  parametro = {}
) {

  return `

    <tr>

      <td>

        <input
          type="text"
          class="parametro-nombre"
          value="${escapeHTML(
            parametro.parametro ||
            ''
          )}"
          placeholder="Parámetro"
        >

      </td>

      <td>

        <input
          type="text"
          class="parametro-unidad"
          value="${escapeHTML(
            parametro.unidad ||
            ''
          )}"
          placeholder="Unidad"
        >

      </td>

      <td>

        <input
          type="text"
          class="parametro-referencia"
          value="${escapeHTML(
            parametro.referencia ||
            ''
          )}"
          placeholder="Referencia"
        >

      </td>

      <td>

        <input
          type="text"
          class="parametro-metodo"
          value="${escapeHTML(
            parametro.metodo ||
            ''
          )}"
          placeholder="Método"
        >

      </td>

      <td>

        <button
          type="button"
          class="btn-delete"
          onclick="eliminarFilaParametro(this)"
        >
          🗑️
        </button>

      </td>

    </tr>

  `;
}


function agregarFilaParametro() {

  const tabla =
    document.getElementById(
      'p-parametros'
    ) ||
    document.getElementById(
      'tablaParametrosPlantilla'
    );


  if (!tabla) {
    return;
  }


  const fila =
    document.createElement(
      'tr'
    );


  fila.innerHTML =
    `

      <td>

        <input
          type="text"
          class="parametro-nombre"
          placeholder="Parámetro"
        >

      </td>

      <td>

        <input
          type="text"
          class="parametro-unidad"
          placeholder="Unidad"
        >

      </td>

      <td>

        <input
          type="text"
          class="parametro-referencia"
          placeholder="Referencia"
        >

      </td>

      <td>

        <input
          type="text"
          class="parametro-metodo"
          placeholder="Método"
        >

      </td>

      <td>

        <button
          type="button"
          class="btn-delete"
          onclick="eliminarFilaParametro(this)"
        >
          🗑️
        </button>

      </td>

    `;


  tabla.appendChild(
    fila
  );
}


function eliminarFilaParametro(
  boton
) {

  if (!boton) {
    return;
  }


  const fila =
    boton.closest(
      'tr'
    );


  if (fila) {

    fila.remove();
  }
}


function crearNuevaPlantilla() {

  const inputNombre =
    document.getElementById(
      'p-nombre'
    ) ||
    document.getElementById(
      'nombrePlantilla'
    );


  const tabla =
    document.getElementById(
      'p-parametros'
    ) ||
    document.getElementById(
      'tablaParametrosPlantilla'
    );


  if (inputNombre) {

    inputNombre.value =
      '';
  }


  if (tabla) {

    tabla.innerHTML =
      '';
  }


  agregarFilaParametro();


  if (inputNombre) {

    inputNombre.focus();
  }
}


function guardarPlantillaActual() {

  const inputNombre =
    document.getElementById(
      'p-nombre'
    ) ||
    document.getElementById(
      'nombrePlantilla'
    );


  const tabla =
    document.getElementById(
      'p-parametros'
    ) ||
    document.getElementById(
      'tablaParametrosPlantilla'
    );


  if (
    !inputNombre ||
    !tabla
  ) {

    notificar(
      'No se encontró el formulario de plantilla.',
      'error'
    );

    return;
  }


  const nombre =
    inputNombre.value.trim();


  if (!nombre) {

    notificar(
      'Ingrese el nombre del examen.',
      'warning'
    );

    inputNombre.focus();

    return;
  }


  const filas =
    Array.from(
      tabla.querySelectorAll(
        'tr'
      )
    );


  const parametros =
    filas
      .map(
        fila => {

          const obtener =
            clase => {

              const input =
                fila.querySelector(
                  clase
                );

              return input
                ? input.value.trim()
                : '';

            };


          return {

            parametro:
              obtener(
                '.parametro-nombre'
              ),

            unidad:
              obtener(
                '.parametro-unidad'
              ),

            referencia:
              obtener(
                '.parametro-referencia'
              ),

            metodo:
              obtener(
                '.parametro-metodo'
              )

          };

        }
      )
      .filter(
        parametro =>
          parametro.parametro
      );


  plantillasExamenes[
    nombre
  ] =
    parametros;


  guardarJSON(
    STORAGE.PLANTILLAS,
    plantillasExamenes
  );


  poblarSelectPlantillas();


  notificar(
    `Plantilla "${nombre}" guardada correctamente.`,
    'success'
  );
}


/* ============================================================
   CARGAR PLANTILLA EN RECEPCIÓN
   ============================================================ */

function cargarPlantillaSeleccionada() {

  const select =
    document.getElementById(
      'v-plantilla'
    ) ||
    document.getElementById(
      'selectorPlantilla'
    );


  if (!select) {
    return;
  }


  const nombre =
    select.value;


  if (!nombre) {

    notificar(
      'Seleccione una plantilla.',
      'warning'
    );

    return;
  }


  const producto =
    productos.find(
      p =>
        normalizarTexto(
          p.Nombre
        ) ===
        normalizarTexto(
          nombre
        )
    );


  if (producto) {

    seleccionarExamen(
      producto.Codigo
    );

    return;
  }


  const encontrado =
    productos.find(
      p =>
        normalizarTexto(
          p.Nombre
        ).includes(
          normalizarTexto(
            nombre
          )
        ) ||
        normalizarTexto(
          nombre
        ).includes(
          normalizarTexto(
            p.Nombre
          )
        )
    );


  if (encontrado) {

    seleccionarExamen(
      encontrado.Codigo
    );

  } else {

    notificar(
      'La plantilla existe, pero el examen no se encuentra en productos.json.',
      'warning'
    );
  }
}


/* ============================================================
   DUPLICAR ORDEN
   ============================================================ */

function duplicarOrden(
  id
) {

  const original =
    ordenes.find(
      orden =>
        String(
          orden.id
        ) === String(id)
    );


  if (!original) {

    notificar(
      'No se encontró la orden.',
      'error'
    );

    return;
  }


  const nuevaOrden =
    clonar(
      original
    );


  nuevaOrden.id =
    generarId();


  nuevaOrden.numeroOrden =
    generarNumeroOrden();


  nuevaOrden.fecha =
    hoyLocalISO();


  nuevaOrden.hora =
    new Date()
      .toLocaleTimeString(
        'es-PE'
      );


  nuevaOrden.creadoEn =
    new Date().toISOString();


  nuevaOrden.actualizadoEn =
    new Date().toISOString();


  nuevaOrden.estado =
    'PENDIENTE';


  nuevaOrden.examenes =
    asegurarArray(
      nuevaOrden.examenes
    )
      .map(
        examen => ({

          ...examen,

          id:
            generarId(),

          resultado:
            '',

          parametros:
            {},

          observacion:
            '',

          estado:
            'PENDIENTE'

        })
      );


  ordenes.push(
    nuevaOrden
  );


  guardarJSON(
    STORAGE.ORDENES,
    ordenes
  );


  cargarTablaOrdenes();


  notificar(
    `Orden duplicada como ${nuevaOrden.numeroOrden}.`,
    'success'
  );
}


/* ============================================================
   RESPALDO
   ============================================================ */

function exportarRespaldoLaboratorio() {

  const respaldo = {

    version:
      '1.0',

    fecha:
      new Date().toISOString(),

    centro:
      appConfig.nombreCentro,

    ordenes:
      ordenes,

    plantillas:
      plantillasExamenes,

    productos:
      productos

  };


  const contenido =
    JSON.stringify(
      respaldo,
      null,
      2
    );


  const blob =
    new Blob(
      [
        contenido
      ],
      {
        type:
          'application/json'
      }
    );


  const url =
    URL.createObjectURL(
      blob
    );


  const enlace =
    document.createElement(
      'a'
    );


  enlace.href =
    url;


  enlace.download =
    `respaldo_vital_health_${hoyLocalISO()}.json`;


  document.body.appendChild(
    enlace
  );


  enlace.click();


  enlace.remove();


  URL.revokeObjectURL(
    url
  );


  notificar(
    'Respaldo generado correctamente.',
    'success'
  );
}


function importarRespaldoLaboratorio(
  archivo
) {

  if (!archivo) {

    notificar(
      'Seleccione un archivo de respaldo.',
      'warning'
    );

    return;
  }


  const lector =
    new FileReader();


  lector.onload =
    event => {

      try {

        const respaldo =
          JSON.parse(
            event.target.result
          );


        if (
          !respaldo ||
          typeof respaldo !==
          'object'
        ) {

          throw new Error(
            'Archivo inválido.'
          );
        }


        if (
          Array.isArray(
            respaldo.ordenes
          )
        ) {

          ordenes =
            respaldo.ordenes;

          guardarJSON(
            STORAGE.ORDENES,
            ordenes
          );
        }


        if (
          respaldo.plantillas &&
          typeof respaldo.plantillas ===
          'object'
        ) {

          plantillasExamenes =
            respaldo.plantillas;

          guardarJSON(
            STORAGE.PLANTILLAS,
            plantillasExamenes
          );
        }


        if (
          Array.isArray(
            respaldo.productos
          )
        ) {

          productos =
            respaldo.productos;

          guardarJSON(
            STORAGE.PRODUCTOS,
            productos
          );
        }


        poblarSelectPlantillas();

        cargarTablaOrdenes();

        cargarTablaOrdenesResultados();


        notificar(
          'Respaldo restaurado correctamente.',
          'success'
        );


      } catch (error) {

        console.error(
          error
        );


        notificar(
          'El archivo de respaldo no es válido.',
          'error'
        );

      }

    };


  lector.onerror =
    () => {

      notificar(
        'No se pudo leer el archivo.',
        'error'
      );

    };


  lector.readAsText(
    archivo
  );
}


/* ============================================================
   LIMPIAR CACHÉ DNI
   ============================================================ */

function limpiarCacheDNI() {

  const confirmar =
    window.confirm(
      '¿Deseas eliminar los datos de DNI guardados temporalmente en este navegador?'
    );


  if (!confirmar) {
    return;
  }


  localStorage.removeItem(
    STORAGE.DNI_CACHE
  );


  notificar(
    'Caché de DNI eliminada.',
    'success'
  );
}


/* ============================================================
   ELIMINAR TODAS LAS ÓRDENES
   ============================================================ */

function eliminarTodasLasOrdenes() {

  const confirmar =
    window.confirm(
      'ATENCIÓN: Esta acción eliminará todas las órdenes almacenadas en este navegador. ¿Deseas continuar?'
    );


  if (!confirmar) {
    return;
  }


  const confirmar2 =
    window.confirm(
      'Esta acción no se puede deshacer. Confirma nuevamente.'
    );


  if (!confirmar2) {
    return;
  }


  ordenes =
    [];


  localStorage.removeItem(
    STORAGE.ORDENES
  );


  ordenResultadoActual =
    null;


  cargarTablaOrdenes();

  cargarTablaOrdenesResultados();


  notificar(
    'Todas las órdenes fueron eliminadas.',
    'success'
  );
}


/* ============================================================
   CONFIGURACIÓN
   ============================================================ */

function guardarConfiguracionLaboratorio(
  cambios = {}
) {

  appConfig = {

    ...appConfig,

    ...cambios

  };


  guardarJSON(
    STORAGE.CONFIG,
    appConfig
  );


  notificar(
    'Configuración guardada.',
    'success'
  );
}


/* ============================================================
   FUNCIONES DE COMPATIBILIDAD
   ============================================================ */

window.cambiarModulo =
  cambiarModulo;

window.calcularEdad =
  calcularEdad;

window.consultarDNI =
  consultarDNI;

window.seleccionarExamen =
  seleccionarExamen;

window.eliminarItemVenta =
  eliminarItemVenta;

window.renderizarVenta =
  renderizarVenta;

window.calcularTotalCobro =
  calcularTotalCobro;

window.guardarYEmitirTicket =
  guardarYEmitirTicket;

window.cargarTablaOrdenes =
  cargarTablaOrdenes;

window.cargarOrdenParaResultados =
  cargarOrdenParaResultados;

window.renderizarExamenesResultados =
  renderizarExamenesResultados;

window.moverExamen =
  moverExamen;

window.guardarResultadosOrden =
  guardarResultadosOrden;

window.imprimirResultadosPDF =
  imprimirResultadosPDF;

window.pobladorSelectPlantillas =
  pobladorSelectPlantillas;

window.poblarSelectPlantillas =
  poblarSelectPlantillas;

window.cargarPlantillaParaEditar =
  cargarPlantillaParaEditar;

window.agregarFilaParametro =
  agregarFilaParametro;

window.eliminarFilaParametro =
  eliminarFilaParametro;

window.crearNuevaPlantilla =
  crearNuevaPlantilla;

window.guardarPlantillaActual =
  guardarPlantillaActual;

window.duplicarOrden =
  duplicarOrden;

window.exportarRespaldoLaboratorio =
  exportarRespaldoLaboratorio;

window.importarRespaldoLaboratorio =
  importarRespaldoLaboratorio;

window.limpiarCacheDNI =
  limpiarCacheDNI;

window.eliminarTodasLasOrdenes =
  eliminarTodasLasOrdenes;

window.configurarRENIEC =
  configurarRENIEC;

window.guardarConfiguracionLaboratorio =
  guardarConfiguracionLaboratorio;

window.cargarTablaOrdenesResultados =
  cargarTablaOrdenesResultados;

window.cargarPlantillaSeleccionada =
  cargarPlantillaSeleccionada;

window.limpiarFormularioRecepcion =
  limpiarFormularioRecepcion;

window.cambiarCantidadVenta =
  cambiarCantidadVenta;


/* ============================================================
   EXPOSICIÓN DE DATOS PARA DEPURACIÓN
   ============================================================ */

window.VitalHealth =
  {

    version:
      '2026.09',

    get ordenes() {
      return ordenes;
    },

    get productos() {
      return productos;
    },

    get plantillas() {
      return plantillasExamenes;
    },

    get configuracion() {
      return appConfig;
    },

    recargarOrdenes() {

      ordenes =
        cargarJSON(
          STORAGE.ORDENES,
          []
        ) || [];

      cargarTablaOrdenes();

      cargarTablaOrdenesResultados();

    },

    limpiarCacheDNI,

    exportarRespaldoLaboratorio,

    importarRespaldoLaboratorio

  };


console.log(
  'Centro Médico Vital Health - App.js cargado correctamente.'
);
