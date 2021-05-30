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
  
  tiempoPorRonda = secuenciaMaquina.length + 1;

  actualizarEstado("Espere su turno");
  mostrarRonda(tiempoPorRonda);

  obtenerCuadroAleatorio();

  secuenciaMaquina.forEach(function (element, index) {
    setTimeout(function () {
      resaltarCuadro(obtenerIdCuadro(element.id));
    }, index * 500);
  });

  setTimeout(function () {
    actualizarEstado("Su turno...");

    secuenciaMaquina.forEach(function () {
      seleccionarCuadroUsuario(secuenciaJugador);
    });
  }, tiempoPorRonda * 500);

  setTimeout(function () {
    avanzaRonda = compararJugadas(secuenciaMaquina, secuenciaJugador);
    avanzarRonda(avanzaRonda);
  }, tiempoPorRonda * 2000);
}

function reiniciarJuego() {
  
  secuenciaMaquina = [];
  secuenciaJugador = [];

  habilitarTablero();
  mostrarRonda("-");

  document.querySelector("#estado").classList.remove("alert-dark");
  document.querySelector("#estado").classList.add("alert-primary");

  comenzarJuego();

  
}
