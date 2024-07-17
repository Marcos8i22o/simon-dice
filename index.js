const $botonEmpezar = document.querySelector("#boton-empezar");
const $botonReiniciar = document.querySelector("#reiniciar");
const $tablero = document.querySelector("#tablero");

let secuenciaMaquina = [];
let secuenciaJugador = [];
let cantidadDeJugadas = 0;

$botonEmpezar.onclick = function (event) {
  comenzarJuego();

  event.preventDefault();
};

$botonReiniciar.onclick = reiniciarJuego;

function comenzarJuego() {
  

  deshabilitarBotonEmpezar();
  deshabilitarBotonReiniciar();

  manejarRonda();
}

function manejarRonda() {
  turnoMaquina();
  actualizarEstado("Su turno...");
  cantidadDeJugadas = 0;
  
  $tablero.onclick = manejarClickTablero;
  
  function manejarClickTablero (event) {
    
    const $cuadro = event.target;

    if ($cuadro.classList.contains("cuadro")) {
      secuenciaJugador.push($cuadro);
      resaltarCuadro(obtenerIdCuadro($cuadro.id));

    }
    let resultado = compararJugadas(secuenciaMaquina[secuenciaMaquina.length - 1], $cuadro);
    cantidadDeJugadas++;

    
    if (cantidadDeJugadas === secuenciaMaquina.length) {
      if (resultado) {

        cantidadDeJugadas = 0;
        setTimeout(function () {
          manejarRonda()
        }, 1000);
      } else {
        setTimeout(function () {
          actualizarEstado("Ha perdido la partida"),
            deshabilitarTablero(),
            habilitarBotonReiniciar()
        }, 1000)
      }
    }
  };


  function turnoMaquina() {
    let tiempoPorRonda = secuenciaMaquina.length + 1;

    actualizarEstado("Espere su turno");
    mostrarRonda(tiempoPorRonda);

    obtenerCuadroAleatorio();

    secuenciaMaquina.forEach(function (element, index) {

      setTimeout(function () {
        resaltarCuadro(obtenerIdCuadro(element.id));
      }, index * 1000);
    });
  }
}


function reiniciarJuego() {
  secuenciaMaquina = [];
  secuenciaJugador = [];
  cantidadDeJugadas = 0;

  habilitarTablero();
  mostrarRonda("-");

  document.querySelector("#estado").classList.remove("alert-dark");
  document.querySelector("#estado").classList.add("alert-primary");

  comenzarJuego();
}
