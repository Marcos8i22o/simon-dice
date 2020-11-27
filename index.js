
let $botonEmpezar = document.querySelector("#boton-empezar");

let secuenciaMaquina = [];
let secuenciaUsuario = [];

$botonEmpezar.onclick = function (event) {
  actualizarEstado("Espere su turno");
  //bloquearInputUsuario();

  secuenciaMaquina.push(obtenerCuadroAleatorio());
  secuenciaMaquina[secuenciaMaquina.length - 1].style.opacity = 1;

  deshabilitarBotonEmpezar();
  event.preventDefault();
};

/*******************USUARIO*************************/
function manejarInputUsuario(e) {
  const indiceUsuario =  (e.target.id);  
  const $cuadroUsuario = document.querySelector(`#${indiceUsuario}`);
	opacidad(indiceUsuario,1);
}

document.querySelector('body').onclick = manejarInputUsuario;
 

function opacidad(numero,grado) {
  document.querySelector(`#${numero}`).style.opacity = grado;
}
/*****************FIN USUARIO************************** */

function obtenerCuadroAleatorio() {
  const $cuadros = document.querySelectorAll(".cuadro");
  const indice = Math.floor(Math.random() * $cuadros.length);
  return $cuadros[indice];
}

function actualizarEstado(estado) {
  document.querySelector("#estado").textContent = estado;
}

function deshabilitarBotonEmpezar() {
  $botonEmpezar.disabled = true;
}

function habilitarBotonEmpezar() {
  $botonEmpezar.disabled = false;
}
