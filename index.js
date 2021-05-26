const $botonEmpezar = document.querySelector("#boton-empezar");
const $tablero = document.querySelector("#tablero");

let secuenciaMaquina = [];
let secuenciaJugador = [];
let avanzaRonda = true;
let tiempoPorRonda;

$botonEmpezar.onclick = function (event) {
  deshabilitarBotonEmpezar();

  manejarRonda();

  event.preventDefault();
};

function manejarRonda() {

  tiempoPorRonda = secuenciaMaquina.length+1;

  actualizarEstado("Espere su turno");
  mostrarRonda(tiempoPorRonda);
  bloquearInputJugador();

  obtenerCuadroAleatorio();

  secuenciaMaquina.forEach(function (element, index) {
    setTimeout(function () {
      resaltarCuadro(obtenerIdCuadro(element.id));
    }, index * 500);
  });

  desbloquearInputJugador();
  setTimeout(function () {
    actualizarEstado("Su turno...");

    secuenciaMaquina.forEach(function(){
      seleccionarCuadroUsuario(secuenciaJugador);
    })
  }, tiempoPorRonda * 500);

 

  setTimeout(function () {
    avanzaRonda = compararJugadas(secuenciaMaquina, secuenciaJugador);
    avanzarRonda(avanzaRonda);
  }, tiempoPorRonda * 2000);
}

function seleccionarCuadroUsuario(secuenciaJugador) {
  $tablero.onclick = function (event) {
    secuenciaJugador.push(event.target);
    resaltarCuadro(obtenerIdCuadro(event.target.id));
  };
}

function avanzarRonda(avanzaRonda) {
  if (avanzaRonda) {
    secuenciaJugador = [];
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
  opacidad(indice, 1.5);
  setTimeout(function () {
    opacidad(indice, 0.5);
  }, 500);
}

function mostrarRonda(numeroRonda) {
  document.querySelector("#ronda").textContent = `Ronda: ${numeroRonda}`;
}
