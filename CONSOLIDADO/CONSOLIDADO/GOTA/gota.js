   // Seleccionamos las pupilas
   const pupilaIzquierda = document.querySelector('.ojopizquierdo');
   const pupilaDerecha = document.querySelector('.ojopderecho');
   const pupilabizquierda = document.querySelector('.ojoppizquierdo');
   const pupilabderecha = document.querySelector('.ojoppderecho');

   // Función para mover las pupilas según el movimiento del mouse
   document.addEventListener('mousemove', (event) => {
       // Obtener las coordenadas del mouse
       const x = (event.clientX / window.innerWidth) * 100;
       const y = (event.clientY / window.innerHeight) * 100;

       // Ajustar la posición de las pupilas con un rango limitado     
       pupilabderecha.style.transform = `translate(${x / 4.5 - 6}px, ${y / 7 - 6}px)`;
       pupilabizquierda.style.transform = `translate(${x / 4.5 - 6}px, ${y / 7 - 6}px)`;
       pupilaIzquierda.style.transform = `translate(${x / 4.5 - 6}px, ${y / 7 - 6}px)`;
       pupilaDerecha.style.transform = `translate(${x / 4.5 - 6}px, ${y / 7 - 6}px)`;
   });

    // Seleccionamos los ojos
    const ojoIzquierdo = document.querySelector('.ojoizquierdo');
   const ojoDerecho = document.querySelector('.ojoderecho');

   // Función para iniciar la animación de parpadeo
   function parpadear() {
       // Reiniciar la animación restableciendo el estilo
       ojoIzquierdo.style.animation = 'none';
       ojoDerecho.style.animation = 'none';
       
       // Forzar un reflow para que la animación se reinicie
       ojoIzquierdo.offsetHeight; 
       ojoDerecho.offsetHeight; 

       // Iniciar la animación de nuevo
       ojoIzquierdo.style.animation = 'parpadeo 0.2s ease-in-out';
       ojoDerecho.style.animation = 'parpadeo 0.2s ease-in-out';
   }


   // Parpadear cada 2 segundos
   setInterval(parpadear, 2000);