// Efecto hover para las fotos de los miembros del equipo
    const equipoFotos = document.querySelectorAll('.equipo-foto');
    equipoFotos.forEach(foto => {
        foto.addEventListener('mouseenter', function () {
            foto.style.transform = "scale(1.05)";
            foto.style.transition = "transform 0.3s ease";
        });
        foto.addEventListener('mouseleave', function () {
            foto.style.transform = "scale(1)";
        });
    });


// Animación de rotación en las imágenes de los miembros del equipo
    const equipoFotos2 = document.querySelectorAll('.equipo-foto');
    equipoFotos2.forEach(foto => {
        foto.addEventListener('mouseenter', function () {
            this.querySelector('img').style.transform = "rotate(15deg)";
            this.querySelector('img').style.transition = "transform 0.3s ease";
        });
        foto.addEventListener('mouseleave', function () {
            this.querySelector('img').style.transform = "rotate(0deg)";
        });
    });


// Seleccionar todos los enlaces con la clase .link-contact
const links = document.querySelectorAll('.link-contact');

links.forEach(link => {
    // Agregar el evento de clic a cada enlace
    link.addEventListener('click', function (event) {
        event.preventDefault();  // Evitar que el enlace se ejecute normalmente

        // Obtener el nombre desde el atributo 'data-nombre' del enlace
        const nombre = link.getAttribute('data-nombre');
        // Obtener el número de teléfono o correo desde el atributo 'href'
        const contacto = link.getAttribute('href');

        let mensaje;

        // Verificamos si es un enlace de teléfono o correo
        if (contacto.startsWith('tel:')) {
            // Si es teléfono, extraemos el número del 'href'
            mensaje = `¿Estás seguro de que deseas llamar a ${nombre} al número ${contacto.replace('tel:', '')}?`;
        } else if (contacto.startsWith('mailto:')) {
            // Si es correo, simplemente mostramos el correo
            mensaje = `¿Estás seguro de que deseas enviar un correo a ${nombre} en ${contacto.replace('mailto:', '')}?`;
        }

        // Mostrar la alerta utilizando SweetAlert2
         Swal.fire({
             title: 'Confirmar acción',
             text: mensaje,
             icon: 'question',
             showCancelButton: true,
             confirmButtonText: 'Sí',
             cancelButtonText: 'No',
             iconColor: '#2F2859',
             confirmButtonColor: '#00ADE5',
        }).then((result) => {
            if (result.isConfirmed) {
                // Si el usuario confirma, abrimos el enlace
                window.location.href = contacto;
            }
        });
      });
   });





