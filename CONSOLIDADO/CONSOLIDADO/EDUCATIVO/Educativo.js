let maxProgress = 0; // Variable para almacenar el progreso máximo alcanzado

function updateProgress() {
    // Obtener el alto del documento y la posición de desplazamiento actual
    const totalHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPosition = window.scrollY;

    // Calcular el porcentaje de progreso
    const percentage = (scrollPosition / totalHeight) * 100;

    // Actualizar el progreso máximo si el porcentaje actual es mayor
    if (percentage > maxProgress) {
        maxProgress = percentage;
    }

    // Actualizar la barra de progreso y el texto del porcentaje con el valor máximo alcanzado
    document.getElementById("progress-bar").style.width = maxProgress + "%";
    document.getElementById("progress-text").innerText = Math.round(maxProgress) + "%";
    console.log(percentage);
    console.log(maxProgress);

    if (maxProgress === 0){
        document.getElementById("progress-text").style.display = 'none';
    }
    if (maxProgress === 100){
        document.getElementById("progress-text").style.color = '#8ED65F';
        document.getElementById("progress-bar").style.backgroundColor = '#8ED65F';

    }
}

// Escuchar el evento de desplazamiento y actualizar la barra de progreso
window.addEventListener("scroll", updateProgress);