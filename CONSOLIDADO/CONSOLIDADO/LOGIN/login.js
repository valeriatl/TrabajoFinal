const mostrar = document.getElementById('mostrarc');
const ocultar = document.getElementById('ocultarc');

ocultar.addEventListener('click', mostrarc);

function mostrarc(){
    document.getElementById('input_contraseña').type = 'text';
    ocultar.style.display = 'none';
    mostrar.style.display = 'flex';
}

mostrar.addEventListener('click', ocultarc);

function ocultarc(){
    document.getElementById('input_contraseña').type = 'password';
    ocultar.style.display = 'flex';
    mostrar.style.display = 'none';
}

document.querySelector('form').addEventListener('submit', function(event){
    if (event.key === 'Enter'){
        Swal.fire({
            position: "center-center",
            icon: "success",
            title: "Has iniciado correctamente",
            iconColor: "#00ADE5",
            showConfirmButton: false,
            timer: 2000
          });
        event.preventDefault();
        document.getElementById('inputs').value = "";
        document.getElementById('input_contraseña').value = "";
    }
    else{
        Swal.fire({
            position: "center-center",
            icon: "success",
            title: "Has iniciado correctamente",
            iconColor: "#00ADE5",
            showConfirmButton: false,
            timer: 2000
          });
        event.preventDefault();
        document.getElementById('inputs').value = "";
        document.getElementById('input_contraseña').value = "";
    }
})

