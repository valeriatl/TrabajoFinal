// Función que crea gotas de agua
function crearGota() {
    const agua = document.querySelector('.agua');
    const gota = document.createElement('div');
    gota.classList.add('gota_ducha');
    
    // Generar posición aleatoria para las gotas dentro de los agujeros
    const agujeros = document.querySelectorAll('.agujero');
    const agujeroSeleccionado = agujeros[Math.floor(Math.random() * agujeros.length)];
    
    const posX = agujeroSeleccionado.offsetLeft + agujeroSeleccionado.offsetWidth / 2;
    const posY = agujeroSeleccionado.offsetTop + agujeroSeleccionado.offsetHeight / 2;

    // Colocar la gota en el agujero seleccionado
    gota.style.left = `${posX - 2}px`; // Centrado en el agujero (restamos la mitad del tamaño de la gota)
    gota.style.top = `${posY - 8}px`; // Centrado verticalmente

    // Agregar la gota al contenedor de agua
    agua.appendChild(gota);

    // Duración de la animación (aleatoria entre 1s y 2s)
    const duracion = (Math.random() * 1 + 1).toFixed(3); // Duración aleatoria entre 1s y 2s
    gota.style.animation = `caida-lenta ${duracion}s ease-in-out`; // Animación ajustada

    // Eliminar la gota después de que termine la animación
    setTimeout(() => {
        agua.removeChild(gota);
    }, duracion * 1000); // Se elimina al finalizar la animación
}

// Generar gotas de forma continua cada 75ms (más seguidas)
setInterval(crearGota, 15); // Generar una gota cada 75ms