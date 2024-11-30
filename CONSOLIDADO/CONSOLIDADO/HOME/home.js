// CÓDIGO QUE MUESTRA EL NOMBRE DEL NIÑO

const contenidonube1 = document.getElementById('contenidonube1');
const contenidonube2 = document.getElementById('contenidonube2');

document.querySelector('.entradanombre').addEventListener('keypress', function(event) {  
    if (event.key === 'Enter') {  
        event.preventDefault(); 
        actualizarnombre();
    }  
});  


function actualizarnombre(event){
    const nombre = document.getElementById('nombreusuario').value;
    const nombrenuevo = document.querySelectorAll('.nombrenuevo');

    if (nombre === ""){
        alert('¡Ingresa tu nombre!');
        return;
    }
    else{
        nombrenuevo.forEach(elemento => {
            elemento.textContent = nombre + ",";
        });
        contenidonube1.style.display = 'none';
        contenidonube2.style.display = 'block';


    }

}






//CÓDIGO QUE VA MOSTRANDO EL CONTENIDO

// Seleccionamos todos los elementos con la clase "escondido"
const hiddenElements = document.querySelectorAll('.escondido');

// Creamos el observador
const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            // Agregamos la clase 'visible' al elemento que entra al viewport
            entry.target.classList.add('visible');
            // Dejamos de observar el elemento una vez animado
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.7 // Cuando al menos el 10% del elemento sea visible
});

// Observamos cada elemento con la clase "escondido"
hiddenElements.forEach((el) => observer.observe(el));

