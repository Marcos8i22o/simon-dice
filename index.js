const $botonEmpezar = document.querySelector("#boton-empezar");
const $botonReiniciar = document.querySelector('#reiniciar');
const $tablero = document.querySelector("#tablero");



let secuenciaMaquina = [];
let secuenciaJugador = [];
let avanzaRonda = true;
let tiempoPorRonda;

comenzarJuego();
$botonReiniciar.onclick = reiniciarJuego;

function comenzarJuego() {
  $botonEmpezar.onclick = function (event) {
    deshabilitarBotonEmpezar();

    manejarRonda();

    event.preventDefault();
  };
}

function manejarRonda() {

  tiempoPorRonda = secuenciaMaquina.length+1;

  actualizarEstado("Espere su turno");
  mostrarRonda(tiempoPorRonda);
  //bloquearInputJugador();

  obtenerCuadroAleatorio();

  secuenciaMaquina.forEach(function (element, index) {
    setTimeout(function () {
      resaltarCuadro(obtenerIdCuadro(element.id));
    }, index * 500);
  });

  //desbloquearInputJugador();
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

function reiniciarJuego() {
  secuenciaMaquina = [];
  secuenciaJugador = [];
  avanzaRonda = true;
  tiempoPorRonda = 0;

  habilitarBotonEmpezar();
  mostrarRonda('-')
  actualizarEstado(`Presione "Comenzar" para jugar`);

  document.querySelector("#estado").classList.remove("alert-dark");
  document.querySelector("#estado").classList.add("alert-primary");

  
}

