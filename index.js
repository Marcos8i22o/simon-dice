let $botonEmpezar = document.querySelector("#boton-empezar");

let secuenciaMaquina = [];
let secuenciaUsuario = [];

$botonEmpezar.onclick = function (event) {
  actualizarEstado("Espere su turno");
  deshabilitarBotonEmpezar();
  bloquearInputUsuario();
  manejarRonda();
  event.preventDefault();
};

/*setTimeout(function () {
  const seguirJugando = compararJugadas(secuenciaUsuario, secuenciaMaquina);
}, 10000);
*/
/*if (seguirJugando) {
}*/

function manejarRonda() {
/************OBTIENE CUADRO DE FORMA ALEATORIA********************/  
/************ACCEDE AL ID DEL CUADRO OBTENIDO*********************/
    const indiceMaquina =
      "#" + secuenciaMaquina[secuenciaMaquina.length - 1].id;

    document.querySelector("#ronda").innerText = "Ronda: 1";

    opacidad(indiceMaquina, 1);

    setTimeout(function () {
      opacidad(indiceMaquina, 0.5);
      //actualizarEstado("Le toca a usted");
      //desbloquearInputUsuario();
    }, 1000);

    document.querySelector("#tablero").onclick = manejarInputUsuario;
  
}

/*******************INICIO**USUARIO*************************/

function manejarInputUsuario(e) {
  const indiceUsuario = "#" + e.target.id;

  secuenciaUsuario.push(document.querySelector(indiceUsuario));
  opacidad(indiceUsuario, 1);
  setTimeout(function () {
    opacidad(indiceUsuario, 0.5);
  }, 1000);

  actualizarEstado("Espere su turno");
}

/*****************FIN**USUARIO************************** */

function opacidad(numero, grado) {
  document.querySelector(numero).style.opacity = grado;
}

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
    $cuadros.style.pointerEvents = "none";
  });
}

function desbloquearInputUsuario() {
  const $cuadros = document.querySelectorAll(".cuadro");
  $cuadros.forEach(function ($cuadros) {
    $cuadros.style.pointerEvents = "all";
  });
}

function compararJugadas(jugadaUsuario, jugadaMaquina) {
  for (let i = 0; i < jugadaMaquina.length; i++) {
    if (jugadaUsuario[i] === jugadaMaquina[i]) {
      return "iguales";
    } else {
      //console.log("distintos")
      return "perdió";
    }
  }
}
