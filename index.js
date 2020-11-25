let $botonEmpezar = document.querySelector('#boton-empezar');

let secuenciaMaquina = [];
let secuenciaUsuario = [];


$botonEmpezar.onclick = function (event) {
    actualizarEstado("Espere su turno");
    //bloquearInputUsuario();
    obtenerCuadroAleatorio().style.opacity = 1; //Resalta cuadro
    deshabilitarBotonEmpezar();
    event.preventDefault();
}

function obtenerCuadroAleatorio() {
    const $cuadros = document.querySelectorAll('.cuadro');
    const indice = Math.floor(Math.random() * $cuadros.length);
    return $cuadros[indice];
}


function actualizarEstado (estado) {
    document.querySelector('#estado').textContent = estado;
}

function deshabilitarBotonEmpezar () {
    $botonEmpezar.disabled = true;
}

function habilitarBotonEmpezar () {
    $botonEmpezar.disabled = false;
}

