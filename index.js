
const $botonEmpezar = document.querySelector("#boton-empezar");
//const $tablero = document.querySelector("#tablero");
const $btn1 = document.querySelector("#cuadro-1");
const $btn2 = document.querySelector("#cuadro-2");
const $btn3 = document.querySelector("#cuadro-3");
const $btn4 = document.querySelector("#cuadro-4");

let secuenciaMaquina = [];
let secuenciaUsuario = [];

$botonEmpezar.onclick = function (event) {
  actualizarEstado("Espere su turno");
  deshabilitarBotonEmpezar();
  //bloquearInputUsuario();
  manejarRonda();

  event.preventDefault();
};

function manejarRonda() {
  /************OBTIENE CUADRO DE FORMA ALEATORIA********************/
  obtenerCuadroAleatorio();

  /************ACCEDE AL ID DEL CUADRO OBTENIDO*********************/
  const $indiceMaquina = "#" + secuenciaMaquina[secuenciaMaquina.length - 1].id;
  /****************------------------*******************************/
  document.querySelector("#ronda").innerText = "Ronda: 1";
  /*********************RESALTA CUADRO*******************************/
  resaltarCuadro($indiceMaquina);

  /*****************DEJA DE RESALTAR CUADRO**************************/

  //   setTimeout(function () {
  //   let resultado;
  //   opacidad($indiceMaquina, 0.5);
  //   actualizarEstado("Le toca a usted");
  //   desbloquearInputUsuario();
  //  $tablero.onclick = manejarInputUsuario;
  //   setTimeout(function () {
  //     resultado = compararJugadas(secuenciaMaquina, secuenciaUsuario);
  //     if (resultado === "") {
  //       secuenciaMaquina.forEach(function (){
  //         manejarRonda();
  //       });
  //     }else{
  //       actualizarEstado(`¡Ha perdido!. Presione el botón "Empezar" para volver a jugar`);
  //     }
  //   }, 5000);
  // }, 1000);

  //console.log(e.target.id)

  function elegirCuadro() {
    $btn1.onclick = function () {
      secuenciaUsuario.push($btn1);
      resaltarCuadro("#cuadro-1");
    };

    $btn2.onclick = function () {
      secuenciaUsuario.push($btn2);
      resaltarCuadro("#cuadro-2");
    };
    $btn3.onclick = function () {
      secuenciaUsuario.push($btn3);
      resaltarCuadro("#cuadro-3");
    };
    $btn4.onclick = function () {
      secuenciaUsuario.push($btn4);
      resaltarCuadro("#cuadro-4");
    };
  }
}

manejarInputUsuario(event);
/*******************INICIO**USUARIO*************************/

function manejarInputUsuario(event) {
  const $indiceUsuario = event.target.id;
  /*******************USUARIO ELIGE CUADRO********************/
  const $cuadroUsuario = document.querySelector($indiceUsuario);
  secuenciaUsuario.push($cuadroUsuario);
  /*******************RESALTA CUADRO**************************/
  resaltarCuadro($indiceUsuario);
  actualizarEstado("Espere su turno");

  return secuenciaUsuario;
}

/*****************FIN**USUARIO****************************/

/********************COMPARA JUGADAS**********************/

/*if (seguirJugando === "") {
    secuenciaMaquina.forEach(function (element) {
      const indiceCuadro = "#" + element.id;
      opacidad(indiceCuadro, 1);
      setTimeout(function () {
        opacidad(indiceCuadro, 0.5);
        manejarRonda();
      }, 1000);
    });
  } else {
    actualizarEstado(`¡Ha perdido!. Presione el botón "Empezar" para volver a jugar`);
    secuenciaUsuario = [];
    secuenciaMaquina = [];
    habilitarBotonEmpezar();
  }*/

/*****************FIN COMPARA JUGADAS*********************/

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

function compararJugadas(jugadaMaquina, jugadaUsuario) {
  for (let i = 0; i < jugadaMaquina.length; i++) {
    if (jugadaUsuario[i] !== jugadaMaquina[i]) {
      return "perdió";
    }
  }

  return "";
}

function resaltarCuadro(indice) {
  opacidad(indice, 1);
  setTimeout(function () {
    opacidad(indice, 0.5);
  }, 1000);
}
