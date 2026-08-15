document.addEventListener('DOMContentLoaded', () => {

  // 1. EFECTO DE MOVIMIENTO 3D INTERACTIVO AL PASAR EL CURSOR
  const tarjetas = document.querySelectorAll('.tarjeta-psico');

  tarjetas.forEach(tarjeta => {
    // Al mover el cursor dentro de la imagen
    tarjeta.addEventListener('mousemove', (e) => {
      const rect = tarjeta.getBoundingClientRect();
      const x = e.clientX - rect.left; // Posición X dentro de la tarjeta
      const y = e.clientY - rect.top;  // Posición Y dentro de la tarjeta

      const centroX = rect.width / 2;
      const centroY = rect.height / 2;

      // Calcular rotación en grados
      const rotacionX = ((y - centroY) / centroY) * -12;
      const rotacionY = ((x - centroX) / centroX) * 12;

      // Aplicar transformación 3D suave
      tarjeta.style.transform = `perspective(1000px) rotateX(${rotacionX}deg) rotateY(${rotacionY}deg) scale3d(1.02, 1.02, 1.02)`;
    });

    // Al quitar el cursor, vuelve exactamente a su estado original
    tarjeta.addEventListener('mouseleave', () => {
      tarjeta.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    });
  });

  // 2. LÓGICA DE LA BARRA DE DIÁLOGO Y OPINIONES
  const formOpinion = document.getElementById('form-opinion');
  const inputNombre = document.getElementById('nombre-usuario');
  const inputTexto = document.getElementById('texto-opinion');
  const contenedorComentarios = document.getElementById('comentarios-contenedor');

  formOpinion.addEventListener('submit', (e) => {
    e.preventDefault();

    const nombre = inputNombre.value.trim();
    const texto = inputTexto.value.trim();

    if (nombre !== '' && texto !== '') {
      // Crear elemento de comentario
      const nuevoComentario = document.createElement('div');
      nuevoComentario.classList.add('comentario');

      nuevoComentario.innerHTML = `
        <span class="autor">${escapeHTML(nombre)}:</span>
        <p class="texto">${escapeHTML(texto)}</p>
      `;

      // Insertar al inicio de la lista con animación
      nuevoComentario.style.opacity = '0';
      nuevoComentario.style.transform = 'translateY(-10px)';
      nuevoComentario.style.transition = 'all 0.4s ease';

      contenedorComentarios.prepend(nuevoComentario);

      setTimeout(() => {
        nuevoComentario.style.opacity = '1';
        nuevoComentario.style.transform = 'translateY(0)';
      }, 50);

      // Limpiar el formulario
      inputNombre.value = '';
      inputTexto.value = '';
    }
  });

  // Función de seguridad para evitar inyección de código
  function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, 
      tag => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        "'": '&#39;',
        '"': '&quot;'
      }[tag] || tag)
    );
  }

});