// JavaScript para interactividad de la Galería y el Foro
document.addEventListener("DOMContentLoaded", () => {
  // Manejo del formulario de comentarios / diálogo
  const formOpinion = document.getElementById("form-opinion");
  const comentariosContenedor = document.getElementById("comentarios-contenedor");

  if (formOpinion) {
    formOpinion.addEventListener("submit", (e) => {
      e.preventDefault();

      const nombre = document.getElementById("nombre-usuario").value.trim();
      const opinion = document.getElementById("texto-opinion").value.trim();

      if (nombre && opinion) {
        // Crear nuevo elemento de comentario
        const nuevoComentario = document.createElement("div");
        nuevoComentario.classList.add("comentario");

        nuevoComentario.innerHTML = `
          <span class="autor">${nombre}:</span>
          <p class="texto">${opinion}</p>
        `;

        // Insertar al inicio de la lista
        comentariosContenedor.prepend(nuevoComentario);

        // Limpiar formulario
        formOpinion.reset();
      }
    });
  }

  // Tilt e inclinación 3D en las tarjetas según el movimiento del cursor
  const tarjetas = document.querySelectorAll(".tarjeta-psico");

  tarjetas.forEach((tarjeta) => {
    tarjeta.addEventListener("mousemove", (e) => {
      const rect = tarjeta.getBoundingClientRect();
      const x = e.clientX - rect.left; // Posición X dentro de la tarjeta
      const y = e.clientY - rect.top;  // Posición Y dentro de la tarjeta

      const centroX = rect.width / 2;
      const centroY = rect.height / 2;

      const rotarX = ((y - centroY) / centroY) * -12; // Ángulo máximo X
      const rotarY = ((x - centroX) / centroX) * 12;  // Ángulo máximo Y

      tarjeta.style.transform = `perspective(1000px) rotateX(${rotarX}deg) rotateY(${rotarY}deg) translateY(-8px)`;
    });

    tarjeta.addEventListener("mouseleave", () => {
      tarjeta.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)";
    });
  });
});