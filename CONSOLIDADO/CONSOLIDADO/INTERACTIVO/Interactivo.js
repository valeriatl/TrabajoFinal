// script.js

// Función para mostrar la sección seleccionada
      function mostrarSeccion(id) {
         const secciones = document.querySelectorAll('main > section'); // Todas las secciones
         const tabs = document.querySelectorAll('.nav-tab'); // Todas las pestañas

    // Ocultar todas las secciones y desactivar todas las pestañas
    secciones.forEach(seccion => {
        seccion.classList.add('seccion-oculta');
        seccion.classList.remove('seccion-activa');
    });

    tabs.forEach(tab => tab.classList.remove('active'));

    // Mostrar la sección seleccionada y activar la pestaña correspondiente
    const seccionSeleccionada = document.getElementById(id);
    if (seccionSeleccionada) {
        seccionSeleccionada.classList.remove('seccion-oculta');
        seccionSeleccionada.classList.add('seccion-activa');
        document.querySelector(`[onclick="mostrarSeccion('${id}')"]`).classList.add('active');
    }
}


// Selección del lienzo y contexto
const lienzoTurbina = document.getElementById("lienzo-turbina");
const contexto = lienzoTurbina.getContext("2d");
// se usa para obtener el contexto de dibujo bidimensional del lienzo
// Seleccionar el bombillo
const bombillo = document.getElementById("bombillo");

// Variables de la turbina
let anguloTurbina = 0; // Ángulo de rotación
let velocidadRotacionTurbina = 0.01; // Velocidad inicial de rotación

// Variables para las gotas de agua
const gotasDeAgua = [];
const maximoGotas = 25; // Máximo de gotas visibles al mismo tiempo
const radioDeGota = 5;

// Coordenadas del cursor y temporizador para inactividad
let posicionCursor = { x: lienzoTurbina.width / 2, y: lienzoTurbina.height / 2 };
let tiempoInactividad = 0;
let ultimaPosicionCursor = { x: 0, y: 0 };

// Crear una gota de agua
function crearGotaDeAgua() {
    const x = Math.random() * lienzoTurbina.width; // Posición horizontal aleatoria
    const y = 0; // Todas las gotas comienzan en la parte superior
    const velocidad = Math.random() * 2 + 1; // Velocidad de movimiento
    gotasDeAgua.push({ x, y, velocidad });
}

// Dibujar la turbina
function dibujarTurbina() {
    contexto.save();
    contexto.translate(lienzoTurbina.width / 2, lienzoTurbina.height / 2); // Centro del lienzo
    contexto.rotate(anguloTurbina);
    contexto.fillStyle = "#00E0FE";
    for (let i = 0; i < 4; i++) {
        contexto.rotate(Math.PI / 2); // Rotar 90 grados
        contexto.fillRect(0, -10, 100, 20); // Dibujo de un aspa
    }
    contexto.restore();
}

// Dibujar las gotas de agua
function dibujarGotasDeAgua() {
    contexto.fillStyle = "#0288d1";
    for (let gota of gotasDeAgua) {
        contexto.beginPath();
        contexto.arc(gota.x, gota.y, radioDeGota, 0, Math.PI * 2);
        contexto.fill();
        contexto.closePath();
    }
}

// Función para actualizar el estado del bombillo
function actualizarBombillo() {
    if (velocidadRotacionTurbina > 0.05) {
        bombillo.classList.add("encendido"); // Encender el bombillo
    } else {
        bombillo.classList.remove("encendido"); // Apagar el bombillo
    }
}



// Actualizar la posición de las gotas hacia el cursor
function actualizarGotasDeAgua() {
    for (let i = 0; i < gotasDeAgua.length; i++) {
        const gota = gotasDeAgua[i];

        // Movimiento hacia el cursor
        const direccionX = posicionCursor.x - gota.x;
        const direccionY = posicionCursor.y - gota.y;
        const distancia = Math.sqrt(direccionX ** 2 + direccionY ** 2);

        if (distancia > 0.5) {
            // Movimiento suave hacia el cursor
            gota.x += (direccionX / distancia) * gota.velocidad;
            gota.y += (direccionY / distancia) * gota.velocidad;
        }


        // Detectar Choque con la turbina
        const distanciaAlCentro = Math.hypot(
            gota.x - lienzoTurbina.width / 2,
            gota.y - lienzoTurbina.height / 2
        );
        if (distanciaAlCentro < 50) {
            // Incrementar velocidad de rotación
            velocidadRotacionTurbina += 0.002;
            gotasDeAgua.splice(i, 1); // Eliminar la gota
            i--;
        }
    }

    // Crear nuevas gotas si hay menos del máximo permitido
    if (gotasDeAgua.length < maximoGotas) {
        crearGotaDeAgua();
    }
}

// Modificar la función de animación para incluir el bombillo
function animarLienzo() {
    contexto.clearRect(0, 0, lienzoTurbina.width, lienzoTurbina.height); // Limpiar el lienzo

    // Dibujar y actualizar
    actualizarGotasDeAgua();
    dibujarGotasDeAgua();
    dibujarTurbina();

    // Actualizar ángulo de rotación
    anguloTurbina += velocidadRotacionTurbina;

    // Reducir la velocidad de la turbina si el cursor no se mueve
    if (tiempoInactividad > 10 && velocidadRotacionTurbina > 0) {
        velocidadRotacionTurbina -= 0.001; // Reducir gradualmente
    }

    // Actualizar el estado del bombillo
    actualizarBombillo();

    // Animar en el siguiente cuadro
    requestAnimationFrame(animarLienzo);
}

// Actualizar la posición del cursor y reiniciar temporizador de inactividad
lienzoTurbina.addEventListener("mousemove", (evento) => {
    const rect = lienzoTurbina.getBoundingClientRect();
    posicionCursor.x = evento.clientX - rect.left;
    posicionCursor.y = evento.clientY - rect.top;

    // Verificar si el cursor se ha movido realmente
    if (
        posicionCursor.x !== ultimaPosicionCursor.x ||
        posicionCursor.y !== ultimaPosicionCursor.y
    ) {
        velocidadRotacionTurbina = Math.max(velocidadRotacionTurbina, 0.02); // Asegurar velocidad mínima
        tiempoInactividad = 0; // Reiniciar el contador
    }

    ultimaPosicionCursor = { ...posicionCursor }; // Actualizar última posición
});

// Incrementar el tiempo de inactividad
setInterval(() => {
    tiempoInactividad++;
}, 100);

// Iniciar animación
animarLienzo();


// Actividad 2: Atrapa las gotas de agua
const contenedorJuego = document.getElementById("contenedor-juego");
const gota = document.getElementById("gota");
const cubeta = document.getElementById("cubeta");
const puntuacionTexto = document.getElementById("puntuacion");
const botonIniciar = document.getElementById("boton-iniciar");


// Variables de posición
let posicionGotaY = 0; // Posición vertical de la gota
let posicionCubetaX = 120; // Posición horizontal de la cubeta
let velocidadGota = 1.7; // Velocidad de caída de la gota
let puntuacion = 0;
let juegoActivo = false; // Control del estado del juego

 // Función para actualizar la puntuación en pantalla
 function actualizarPuntuacion() {
    puntuacionTexto.innerText = `Puntuación: ${puntuacion}`;
}

// Función para mover la gota
function moverGota() {

    if (!juegoActivo) return; // Detener si el juego no está activo

    posicionGotaY += velocidadGota;

    // Si la gota llega al fondo del contenedor
    if (posicionGotaY >= 370) {
        // Verificar si la gota cae en la cubeta
        const centroGotaX = parseInt(gota.style.left) + 10; // Centro de la gota
        if (
            centroGotaX >= posicionCubetaX &&
            centroGotaX <= posicionCubetaX + 60 // Cubeta tiene 60px de ancho
        ) {
            puntuacion++;
            actualizarPuntuacion(); // Actualizar puntuación en pantalla
        } 
        else {
            Swal.fire({
                icon: "error",
                title: "Lo siento...",
                text: "¡Perdiste! Reiniciando el juego",
                confirmButtonColor: "#00ADE5",
              });
            reiniciarJuego(); // Reiniciar el juego al perder
        }
        // Reiniciar posición de la gota
        posicionGotaY = 0;
        gota.style.left = `${Math.random() * 280}px`; // Nueva posición horizontal
    }

    gota.style.top = `${posicionGotaY}px`;

    requestAnimationFrame(moverGota);
}

// Función para mover la cubeta
function moverCubeta(event) {
     if (!juegoActivo) return; // Detener si el juego no está activo
    if (event.key === "ArrowLeft" && posicionCubetaX > 0) {
        posicionCubetaX -= 15;
    } else if (event.key === "ArrowRight" && posicionCubetaX < 240) {
        posicionCubetaX += 15;
    }
    cubeta.style.left = `${posicionCubetaX}px`;
}

// Función para iniciar el juego
function iniciarJuego() {
    if (juegoActivo) return; // Evitar múltiples inicios
    juegoActivo = true;
    puntuacion = 0;
    actualizarPuntuacion();
    posicionGotaY = 0;
    gota.style.left = `${Math.random() * 280}px`;
    moverGota();
}

// Función para reiniciar 
function reiniciarJuego() {
    juegoActivo = false; // Detener el juego actual
    puntuacion = 0; // Reiniciar puntuación
    actualizarPuntuacion(); // Actualizar visualmente la puntuación
    posicionGotaY = 0; // Reiniciar posición vertical de la gota
    gota.style.top = "0px"; // Colocar la gota en la parte superior
    gota.style.left = `${Math.random() * 280}px`; // Nueva posición horizontal aleatoria
    posicionCubetaX = 120; // Reiniciar posición de la cubeta
    cubeta.style.left = `${posicionCubetaX}px`; // Colocar la cubeta en su posición inicial
}

// Ajustar el botón "Iniciar Juego" para que reinicie el juego al perder
botonIniciar.addEventListener("click", () => {
    reiniciarJuego(); // Reiniciar 
    iniciarJuego();   // Volver a iniciar el juego
});

// Eventos de teclado para mover la cubeta
document.addEventListener("keydown", moverCubeta);

// Iniciar movimiento de la gota con estado inicial
gota.style.left = `${Math.random() * 280}px`; // Posición inicial aleatoria


// ACTIVIDAD 4


// Las piezas del rompecabezas
const piezas = [
    { id: "pieza1", position: 0, top: 0, left: 0 },
    { id: "pieza2", position: 1, top: 0, left: 1 },
    { id: "pieza3", position: 2, top: 0, left: 2 },
    { id: "pieza4", position: 3, top: 1, left: 0 },
    { id: "pieza5", position: 4, top: 1, left: 1 },
    { id: "pieza6", position: 5, top: 1, left: 2 },
    { id: "pieza7", position: 6, top: 2, left: 0 },
    { id: "pieza8", position: 7, top: 2, left: 1 },
    { id: "pieza9", position: 8, top: 2, left: 2 }
];

// Asignar el fondo de la imagen a cada pieza
const fondoImagen = "url('https://i.pinimg.com/736x/9f/8e/f6/9f8ef668bb0eb3578382a18d8880924a.jpg')"; // Ruta de la imagen a usar

// Función para reorganizar las piezas aleatoriamente
function mezclarPiezas() {
    let posiciones = [...piezas].sort(() => Math.random() - 0.5);

    piezas.forEach((pieza, index) => {
        const divPieza = document.getElementById(pieza.id);
        divPieza.style.backgroundImage = fondoImagen;
        divPieza.style.backgroundPosition = `-${posiciones[index].left * 130}px -${posiciones[index].top * 130}px`;

        divPieza.setAttribute("data-position", posiciones[index].position);

        divPieza.draggable = true;
        divPieza.addEventListener("dragstart", dragStart);
    });
}

    // Reiniciar la disposición del rompecabezas (solo en la página)
    document.getElementById("rompecabezas").addEventListener("dragover", dragOver);
    document.getElementById("rompecabezas").addEventListener("drop", drop);


// Funciones para arrastrar y soltar las piezas
let piezaArrastrada = null;

function dragStart(e) {
    piezaArrastrada = e.target;
}

function dragOver(e) {
    e.preventDefault();  // Necesario para permitir el "drop"
}

function drop(e) {
    e.preventDefault();
    const piezaSoltada = e.target;

    // Asegurarse de que la pieza soltada sea una pieza válida
    if (piezaSoltada.classList.contains('pieza')) {
        const positionPiezaArrastrada = piezaArrastrada.getAttribute("data-position");
        const positionPiezaSoltada = piezaSoltada.getAttribute("data-position");

        piezaArrastrada.setAttribute("data-position", positionPiezaSoltada);
        piezaSoltada.setAttribute("data-position", positionPiezaArrastrada);

        let temp = piezaArrastrada.style.backgroundPosition;
        piezaArrastrada.style.backgroundPosition = piezaSoltada.style.backgroundPosition;
        piezaSoltada.style.backgroundPosition = temp;

        if (completarRompecabezas()) {
            Swal.fire({
                position: "center",
                icon: "success",
                iconColor: "#00ADE5",
                title: "¡Has completado el Rompecabezas!",
                showConfirmButton: false,
                timer: 3000
              });
        }
    }
}

// Función para verificar si el rompecabezas está completo
function completarRompecabezas() {
    for (let i = 0; i < piezas.length; i++) {
        if (piezas[i].position !== parseInt(document.getElementById(piezas[i].id).getAttribute("data-position"))) {
            return false;
        }
    }
    return true;
}

// Función para reiniciar el juego
document.getElementById("reiniciar").addEventListener("click", function() {
    mezclarPiezas();
});

// Inicializar el juego
mezclarPiezas();