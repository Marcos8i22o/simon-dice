const $botonEmpezar = document.querySelector("#boton-empezar");
const $tablero = document.querySelector("#tablero");

let secuenciaMaquina = [];
let secuenciaJugador = [];

$botonEmpezar.onclick = function (event) {
  deshabilitarBotonEmpezar();
  manejarRonda();

  event.preventDefault();
};
/*************************************** */

function manejarRonda() {
  /*------Turno de la máquina-----*/

  actualizarEstado("Espere su turno");
  bloquearInputJugador();

  secuenciaJugador = [];

  obtenerCuadroAleatorio();

  secuenciaMaquina.forEach(function (element, index) {
    setTimeout(resaltarCuadro(obtenerIdCuadro(element.id)), index * 1000);
  });

  desbloquearInputJugador();
  actualizarEstado("Su turno...");

  secuenciaMaquina.forEach(function (element, index) {
    $tablero.onclick = function (event) {
      secuenciaJugador.push(event.target);
      setTimeout(
        resaltarCuadro(obtenerIdCuadro(secuenciaJugador[index].id)),
        index * 1000
      );
    };
  });

  setTimeout(function () {
    const avanzaRonda = compararJugadas(secuenciaMaquina, secuenciaJugador);
    avanzarRonda(avanzaRonda);
  }, 4000);
}

function avanzarRonda(avanzaRonda) {
  if (avanzaRonda) {
    manejarRonda();
  } else {
    actualizarEstado("Ha perdido la partida");
  }
}

function compararJugadas(arr1, arr2) {
  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) {
      return false;
    }
  }
  return true;
}

function obtenerIdCuadro(posicionArreglo) {
  const idCuadro = `#${posicionArreglo}`;
  return idCuadro;
}

function opacidad(numero, grado) {
  document.querySelector(numero).style.opacity = grado;
}

function obtenerCuadroAleatorio() {
  const $cuadros = document.querySelectorAll(".cuadro");
  const indice = Math.floor(Math.random() * $cuadros.length);
  secuenciaMaquina.push($cuadros[indice]);

  return secuenciaMaquina;
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

function bloquearInputJugador() {
  const $cuadros = document.querySelectorAll(".cuadro");
  $cuadros.forEach(function ($cuadros) {
    $cuadros.style.pointerEvents = "none";
  });
}

function desbloquearInputJugador() {
  const $cuadros = document.querySelectorAll(".cuadro");
  $cuadros.forEach(function ($cuadros) {
    $cuadros.style.pointerEvents = "all";
  });
}

function resaltarCuadro(indice) {
  opacidad(indice, 1);
  setTimeout(function () {
    opacidad(indice, 0.5);
  }, 1000);
}
