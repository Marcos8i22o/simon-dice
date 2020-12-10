let $botonEmpezar = document.querySelector("#boton-empezar");

let secuenciaMaquina = [];
let secuenciaUsuario = [];

$botonEmpezar.onclick = function (event) {
  actualizarEstado("Espere su turno");
  deshabilitarBotonEmpezar();
  bloquearInputUsuario();
  manejarRonda();
  desbloquearInputUsuario();
  //event.preventDefault();
};

function manejarRonda() {
  secuenciaMaquina.push(obtenerCuadroAleatorio());
  const indiceMaquina = "#" + secuenciaMaquina[secuenciaMaquina.length - 1].id;
  //console.log(indiceMaquina)

  opacidad(indiceMaquina, 1);
  setTimeout(function () {
    opacidad(indiceMaquina, 0.5);
  }, 1000);
}

/*******************INICIO**USUARIO*************************/

function manejarInputUsuario(e) {
  const indiceUsuario = "#" + e.target.id;

  secuenciaUsuario.push(document.querySelector(indiceUsuario));
  opacidad(indiceUsuario, 1);
  setTimeout(function () {
    opacidad(indiceUsuario, 0.5);
  }, 1000);
}

document.querySelector("#tablero").onclick = manejarInputUsuario;

function opacidad(numero, grado) {
  
  document.querySelector(numero).style.opacity = grado;
}
/*****************FIN**USUARIO************************** */

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

function bloquearInputUsuario() {
  const $cuadros = document.querySelectorAll(".cuadro");
  $cuadros.forEach(function ($cuadros) {
    $cuadros.id.disabled = true;
  });
}

function desbloquearInputUsuario() {
  const $cuadros = document.querySelectorAll(".cuadro");
  $cuadros.disabled = false;
}
