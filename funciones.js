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
    habilitarBotonReiniciar();
    deshabilitarTablero();
  }
  
}

function deshabilitarTablero() {
  $tablero.style.pointerEvents = "none";
}

function habilitarTablero() {
  $tablero.style.pointerEvents = "all";
}

function habilitarBotonReiniciar() {
  $botonReiniciar.disabled = false;
}

function deshabilitarBotonReiniciar(){
  $botonReiniciar.disabled = true;
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
  if (estado === "Ha perdido la partida") {
    document.querySelector("#estado").classList.remove("alert-primary");
    document.querySelector("#estado").classList.add("alert-dark");
  }
}

function deshabilitarBotonEmpezar() {
  $botonEmpezar.disabled = true;
}

function habilitarBotonEmpezar() {
  $botonEmpezar.disabled = false;
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
