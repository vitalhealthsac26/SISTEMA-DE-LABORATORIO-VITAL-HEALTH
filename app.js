// Cambiar de módulo (Pestañas)
function cambiarModulo(idModulo) {
  document.querySelectorAll('.modulo').forEach(m => m.classList.remove('active'));
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));

  document.getElementById(idModulo).classList.add('active');
  event.target.classList.add('active');
}

// Fecha por defecto
document.getElementById('v-fecha').valueAsDate = new Date();

// --- 1. IMPRIMIR TICKET DE 58 MM ---
function imprimirTicket() {
  // Transferir datos de la pantalla al ticket
  document.getElementById('t-paciente').textContent = document.getElementById('v-paciente').value || 'PÚBLICO GENERAL';
  document.getElementById('t-dni').textContent = document.getElementById('v-dni').value || '-';
  document.getElementById('t-fecha').textContent = document.getElementById('v-fecha').value;

  // Asignar clase de impresión de ticket
  document.body.className = 'modo-impresion-ticket';

  // Lanzar diálogo de impresión
  window.print();

  // Limpiar clases al terminar o cancelar
  setTimeout(() => {
    document.body.className = '';
  }, 1000);
}

// --- 2. IMPRIMIR RESULTADOS EN A4 / PDF ---
function imprimirPDF() {
  // Transferir datos de la pantalla a la hoja A4
  document.getElementById('a4-paciente').textContent = document.getElementById('r-paciente').value || '-';
  document.getElementById('a4-edad').textContent = document.getElementById('r-edad').value || '-';
  document.getElementById('a4-doctor').textContent = document.getElementById('r-doctor').value || 'A QUIEN CORRESPONDA';
  document.getElementById('a4-fecha').textContent = new Date().toLocaleDateString('es-PE');

  // Asignar clase de impresión A4
  document.body.className = 'modo-impresion-a4';

  // Lanzar diálogo de impresión / Guardar como PDF
  window.print();

  // Limpiar clases al terminar o cancelar
  setTimeout(() => {
    document.body.className = '';
  }, 1000);
}
