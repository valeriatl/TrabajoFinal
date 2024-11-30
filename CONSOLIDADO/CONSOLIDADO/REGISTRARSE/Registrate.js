/*Esto muestra la contraseña o la oculta con un botón */
const mostrar = document.getElementById('mostrarc1');
const ocultar = document.getElementById('ocultarc1');


ocultar.addEventListener('click', mostrarc);

function mostrarc(){
    document.getElementById('input_contraseña1').type = 'text';
    ocultar.style.display = 'none';
    mostrar.style.display = 'flex';
}

mostrar.addEventListener('click', ocultarc);

function ocultarc(){
    document.getElementById('input_contraseña1').type = 'password';
    ocultar.style.display = 'flex';
    mostrar.style.display = 'none';
}


const mostrar2 = document.getElementById('mostrarc2');
const ocultar2 = document.getElementById('ocultarc2');

ocultar2.addEventListener('click', mostrarc2);

function mostrarc2(){
    document.getElementById('input_contraseña2').type = 'text';
    ocultar2.style.display = 'none';
    mostrar2.style.display = 'flex';
}

mostrar2.addEventListener('click', ocultarc2);

function ocultarc2(){
    document.getElementById('input_contraseña2').type = 'password';
    ocultar2.style.display = 'flex';
    mostrar2.style.display = 'none';
}

/*Esto valida el formulario y lo envía */
const inputc1 = document.getElementById('input_contraseña1');
const inputc2 = document.getElementById('input_contraseña2');


document.querySelector('form').addEventListener('submit', function(event){
    if (event.key === 'Enter'){
            if (inputc1.value === inputc2.value){
                Swal.fire({
                    position: "center-center",
                    icon: "success",
                    title: "Tu cuenta se creó exitosamente",
                    showConfirmButton: false,
                    iconColor: "#00ADE5",
                    timer: 2000
                  });
                event.preventDefault();
                enviarformulario();
            }
            else{
                alert('¡Las contraseñas deben coincidir!');
                event.preventDefault();
            }
    }
    
    else{
        if (inputc1.value === inputc2.value){
            Swal.fire({
                position: "center-center",
                icon: "success",
                title: "Tu cuenta se creó exitosamente",
                iconColor: "#00ADE5",
                showConfirmButton: false,
                timer: 2000
              });
            event.preventDefault();
            enviarformulario();
        }
        else{
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "¡Ambas contraseñas deben coincidir!",
                confirmButtonColor: "#00ADE5",

              });
            event.preventDefault();
        }

    }
})

function enviarformulario(){
    document.getElementById('input_correo').value = "";
    document.getElementById('input_usuario').value = "";
    document.getElementById('input_contraseña1').value = "";
    document.getElementById('input_contraseña2').value = "";
}


/* Esta parte Valida que ambas contraseñas sean iguales*/


inputc2.addEventListener('input', buclecontraseña)

function buclecontraseña(){
    const alerta = document.getElementById('alerta');
    const textoalerta = alerta.querySelector('p');
    
    if (inputc1.value === inputc2.value){
        textoalerta.remove();
        inputc2.style.border = '0.3vh solid #2F2859'
    }
    else{
        if (textoalerta){
        }

        else{
            function crearalerta(){
                alerta.innerHTML = ('<p>Las contraseñas deben coincidir</p>');
            }
            crearalerta();
        }
        inputc2.style.border = 'red solid 0.3vh';
    }
}