const $botonEmpezar = document.querySelector("#boton-empezar");
const $botonReiniciar = document.querySelector("#reiniciar");
const $tablero = document.querySelector("#tablero");

let secuenciaMaquina = [];
let secuenciaJugador = [];

$botonEmpezar.onclick = function (event) {
  comenzarJuego();

  event.preventDefault();
};

$botonReiniciar.onclick = reiniciarJuego;

function comenzarJuego() {
  let avanzaRonda = true;
  let tiempoPorRonda = 0;

  deshabilitarBotonEmpezar();
  deshabilitarBotonReiniciar();

  manejarRonda();
}

function manejarRonda() {
  turnoMaquina();

  actualizarEstado("Su turno...");

  let i = 0;
  

  $tablero.onclick = function (event) {
    let resultado = false;
    const $cuadro = event.target;

    if ($cuadro.classList.contains("cuadro")) {
      secuenciaJugador.push($cuadro);
      resaltarCuadro(obtenerIdCuadro($cuadro.id));

      resultado = compararJugadas(secuenciaMaquina[i], $cuadro);
    }

    /*El usuario tiene que poder jugar más de una vez si el arreglo de la 
      máquina tiene más de una jugada */
    if (secuenciaJugador.length === secuenciaMaquina.length) {
      if (resultado) {
        setTimeout(manejarRonda(), 1000);
      } else {
        actualizarEstado("Ha perdido la partida");
        habilitarBotonReiniciar();
        deshabilitarTablero();
      }
    }
  };

  function turnoMaquina() {
    tiempoPorRonda = secuenciaMaquina.length + 1;

    actualizarEstado("Espere su turno");
    mostrarRonda(tiempoPorRonda);

    obtenerCuadroAleatorio();

    secuenciaMaquina.forEach(function (element, index) {
      setTimeout(function () {
        resaltarCuadro(obtenerIdCuadro(element.id));
      }, index * 500);
    });
  }
}
//setTimeout(function () {
//avanzaRonda =
//avanzarRonda(avanzaRonda);
//}, tiempoPorRonda * 2000);

function reiniciarJuego() {
  secuenciaMaquina = [];
  secuenciaJugador = [];

  habilitarTablero();
  mostrarRonda("-");

  document.querySelector("#estado").classList.remove("alert-dark");
  document.querySelector("#estado").classList.add("alert-primary");

  comenzarJuego();
}
