let inicioX = 0;
let finX = 0;

// Registrar el punto inicial donde el usuario apoya el dedo
lightbox.addEventListener('touchstart', (e) => {
  inicioX = e.touches[0].clientX;
}, { passive: true });

// Registrar el punto donde levanta el dedo y evaluar la distancia
lightbox.addEventListener('touchend', (e) => {
  finX = e.changedTouches[0].clientX;
  procesarDeslizamiento();
}, { passive: true });

// Determinar la dirección según el umbral de movimiento
const procesarDeslizamiento = () => {
  const umbralMinimo = 50; // Píxeles mínimos requeridos para detectar el gesto
  const diferencia = inicioX - finX;

  if (Math.abs(diferencia) > umbralMinimo) {
    if (diferencia > 0) {
      fotoSiguiente(); // Deslizó a la izquierda -> Siguiente foto
    } else {
      fotoAnterior();  // Deslizó a la derecha -> Foto anterior
    }
  }
};