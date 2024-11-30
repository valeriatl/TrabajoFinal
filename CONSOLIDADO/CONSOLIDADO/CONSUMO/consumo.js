let consumoTotal = 0;  // Variable para el consumo total acumulado
let actividades = [];   // Lista para almacenar las actividades y sus consumos

// Variables globales para almacenar las instancias de los gráficos
let graficoBarras, graficoTorta;

// Función para calcular el consumo y agregar las actividades seleccionadas
function calcularConsumo() {
    document.getElementById('graficos').style.display = 'flex';
    const numPersonas = parseInt(document.getElementById('personas').value);

    // Validar si el número de personas es válido
    if (isNaN(numPersonas) || numPersonas <= 0) {
        alert("Por favor, ingresa un número de personas válido.");
        return;
    }

    // Mapeo de actividades a consumo por persona
    const consumoPorPersona = {
        "ducha": 60,
        "lavado": 80,
        "cocina": 30,
        "limpieza": 50,
        "bebida": 2
    };

    // Obtener todas las actividades seleccionadas (checkboxes marcados)
    const actividadesSeleccionadas = Array.from(document.querySelectorAll('input[name="actividad"]:checked'));

    // Resetear variables para nueva selección
    consumoTotal = 0;
    actividades = [];

    // Recorrer las actividades seleccionadas y calcular el consumo
    actividadesSeleccionadas.forEach(actividad => {
        const actividadName = actividad.value;
        const consumoPorActividad = consumoPorPersona[actividadName];
        
        // Calcular el consumo para la actividad seleccionada
        const consumoActividad = numPersonas * consumoPorActividad;

        // Acumular el consumo total
        consumoTotal += consumoActividad;

        // Agregar la actividad y su consumo a la lista de actividades
        actividades.push({ actividad: actividadName.charAt(0).toUpperCase() + actividadName.slice(1), consumo: consumoActividad, consumoPorPersona: consumoPorActividad });
    });

    // Crear el elemento de fila para la tabla
    actualizarTabla();

    // Actualizar el total de consumo
    const totalElement = document.getElementById('consumo-resultado');
    totalElement.textContent = consumoTotal;

    // Mostrar el resultado
    document.getElementById('resultado').style.display = 'block';

    // Actualizar los gráficos
    actualizarGraficos();
}

// Función para actualizar la tabla con los consumos de actividades
function actualizarTabla() {
    const tabla = document.getElementById('tabla-actividades').getElementsByTagName('tbody')[0];
    tabla.innerHTML = ''; // Limpiar la tabla antes de actualizarla

    // Agregar las filas a la tabla
    actividades.forEach(item => {
        const row = tabla.insertRow();
        row.insertCell(0).textContent = item.actividad;
        row.insertCell(1).textContent = item.consumoPorPersona;
        row.insertCell(2).textContent = item.consumo;
    });
}

// Función para actualizar los gráficos
function actualizarGraficos() {
    const nombresActividades = actividades.map(item => item.actividad);
    const consumos = actividades.map(item => item.consumo);

    // Si los gráficos no han sido inicializados, los inicializamos ahora
    if (!graficoBarras) {
        // Gráfico de barras
        const ctxBarras = document.getElementById('graficoBarras').getContext('2d');
        graficoBarras = new Chart(ctxBarras, {
            type: 'bar',
            data: {
                labels: nombresActividades,
                datasets: [{
                    label: 'Consumo de Agua (litros)',
                    data: consumos,
                    backgroundColor: '#3c8dbc',
                    borderColor: '#3578b7',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    } else {
        // Si el gráfico ya está creado, actualizamos los datos y lo redibujamos
        graficoBarras.data.labels = nombresActividades;
        graficoBarras.data.datasets[0].data = consumos;
        graficoBarras.update(); // Actualizar el gráfico de barras
    }

    // Si el gráfico de torta no ha sido inicializado, lo inicializamos ahora
    if (!graficoTorta) {
        // Gráfico de torta
        const ctxTorta = document.getElementById('graficoTorta').getContext('2d');
        graficoTorta = new Chart(ctxTorta, {
            type: 'pie',
            data: {
                labels: nombresActividades,
                datasets: [{
                    data: consumos,
                    backgroundColor: ['#ff6384', '#36a2eb', '#cc65fe', '#ffce56', '#ff9933'],
                    hoverOffset: 4
                }]
            }
        });
    } else {
        // Si el gráfico de torta ya está creado, actualizamos los datos y lo redibujamos
        graficoTorta.data.labels = nombresActividades;
        graficoTorta.data.datasets[0].data = consumos;
        graficoTorta.update(); // Actualizar el gráfico de torta
    }
}

// Función para limpiar los datos
function limpiarFormulario() {
    // Limpiar el número de personas
    document.getElementById('personas').value = 1;

    // Limpiar los checkboxes
    const checkboxes = document.querySelectorAll('input[name="actividad"]');
    checkboxes.forEach(checkbox => checkbox.checked = false);

    // Limpiar los resultados de la tabla y los gráficos
    document.getElementById('resultado').style.display = 'none';
    document.getElementById('consumo-resultado').textContent = '';
    document.getElementById('tabla-actividades').getElementsByTagName('tbody')[0].innerHTML = '';

    // Limpiar los gráficos si existen
    if (graficoBarras) {
        graficoBarras.destroy();
        graficoBarras = null;
    }
    if (graficoTorta) {
        graficoTorta.destroy();
        graficoTorta = null;
    }
    document.getElementById('graficos').style.display = 'none';
}