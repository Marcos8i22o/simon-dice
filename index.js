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
  $tablero.onclick = function (event) {
    secuenciaJugador.push(event.target);
    resaltarCuadro(obtenerIdCuadro(event.target.id));
  };

  for (let i = 0; i < secuenciaMaquina.length; i++) {
    let resultado;
    
    $tablero.onclick = function (event) {
      secuenciaJugador.push(event.target);
      resaltarCuadro(obtenerIdCuadro(event.target.id));
      resultado = compararJugadas(
        secuenciaMaquina[i],
        secuenciaJugador[i]
      );
      if (resultado) {
        secuenciaJugador = [];
        //turnoMaquina();
      } else {
        actualizarEstado("Ha perdido la partida");
        habilitarBotonReiniciar();
        deshabilitarTablero();
      }
    };
  }

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
