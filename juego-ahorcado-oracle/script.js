// Definir variables 
let palabras = [
  'java',
  'codigo',
  'letra',
  'computadora',
  'programacion',
  'alura',
  'oracle',
  'html',
  'css',
  'javascript',
  'cafe',
  'aprender',
  'codigo',
  'variable',
];

let paginaInicial = document.getElementById('pagina-inicial'); 
let paginaJuego = document.getElementById('pagina-juego'); 
let paginaPalabra = document.getElementById('pagina-ingreso-palabra');

let btnIniciar = document.getElementById('btn-iniciar'); 
let btnPalabra = document.getElementById('btn-palabra'); 

let btnNuevo = document.getElementById('btn-nuevo'); 
let btnDesistir = document.getElementById('btn-desistir');

let btnGuardar = document.getElementById('btn-guardar');  
let btnCancelar = document.getElementById('btn-cancelar');

let divPalabra = document.getElementById('palabra');  
let letrasError = document.getElementById('letras-error'); 

let agregarPalabra = document.getElementById('ingresar-palabra');
let inputImaginario = document.querySelector('#imaginario');
let keyMobil = document.querySelectorAll(".keys");
let conE = 0;

let banG = true;
let banP = true;

let contError = 0;

let ganaste = false;
let perdio = false;

let tieneLetras = false;

let arrError = [];

let palabraRandom;

let letraPresionadaMobil;
let teclaQue;

// Funciones 

function nuevoJuego() {
  crearDivVacio(palabraRandom);
  if (window.innerWidth > 1020) {
    mostrarLetras();
  } else {
    mostrarMobil();
  }
}

function reiniciar() {
  conG = 0;
  conE = 0;
  banG = true;
  banP = true;
  contError = 0;
  ganaste = false;
  perdio = false;
  arrError = [];
  nuevoCanvas();
  removerDiv(palabraRandom);
  removerError();
  eliminarMensajes();
  palabraRandom = '';
  palabraInput = '';
  teclaQue = '';
  letraPresionadaMobil = '';
}

function crearArr(arg) {
  let arr = [];
  for (let i = 0; i < arg.length; i++) {
    arr.push(arg[i]);
  }
  return arr;
}

function azarPalabras() {
  let aleatorio = Math.floor(Math.random() * palabras.length);
  let palabra = palabras.slice(aleatorio, aleatorio + 1).join('').toUpperCase();
  mostrarCon(palabra);
  return palabra;
}

function crearDivVacio(palabra) {
  for (let i = 0; i < palabra.length; i++) {
    let div = document.createElement('div');
    let input = document.createElement('input');
    input.classList.add('p-letras');
    input.readOnly = true;
    div.classList.add('letras');
    divPalabra.appendChild(div);
    div.appendChild(input);
  }
  conG = 0;
  conE = 0;
}

function removerDiv() {
  let listDiv = document.getElementsByClassName('letras');
  for (let i = listDiv.length; i > 0; i--) {
    divPalabra.removeChild(listDiv[0]);
  }
}

function removerError() {
  let listP = document.getElementsByClassName('error');
  for (let i = 0; i < listP.length;) {
    letrasError.removeChild(listP[0]);
  }
}

function eliminarMensajes() {
  let mensajeFinal = document.querySelector('.mensaje');
  let prueba = mensajeFinal.childNodes;

  if (mensajeFinal.childNodes.length !== 0) {

    if (prueba[0].innerText === 'GANASTE') {
      eliminarMensajeGano();
    } else if (prueba[0].innerText === 'PERDISTE') {
      eliminarMensajePerdio();
    }
  }

  banG = true;
  banP = true;
}

function eliminarMensajePerdio() {
  let mensajeFinal = document.querySelector('.mensaje');
  let perdio = document.querySelector('.mensaje-perdio');
  let p2 = document.querySelector(".mensaje-perdio-pala");

  if (mensajeFinal.innerHTML.length > 0) {
    mensajeFinal.style.display = 'none';
    mensajeFinal.removeChild(perdio);
    mensajeFinal.removeChild(p2);
  }
  console.log(mensajeFinal.innerHTML);
}

function eliminarMensajeGano() {
  let mensajeFinal = document.querySelector('.mensaje');
  let gano = document.querySelector('.mensaje-gano');


  if (mensajeFinal.innerHTML.length > 0) {
    mensajeFinal.style.display = 'none';
    mensajeFinal.removeChild(gano);
  }
  console.log(mensajeFinal.innerHTML);
}

function mensajeGano() {
  let mensajeFinal = document.querySelector('.mensaje');
  let parrafo = document.createElement('p');

  if (banG) {
    mensajeFinal.appendChild(parrafo);
    parrafo.innerText = "GANASTE";
    mensajeFinal.style.display = "flex";
    parrafo.classList.add("mensaje-gano");
    banG = false;
  }
}

function mensajePerdio() {
  let mensajeFinal = document.querySelector('.mensaje');
  let parrafo = document.createElement('p');
  let p2 = document.createElement('p');
  if (banP) {
    mensajeFinal.appendChild(parrafo);
    parrafo.innerText = "PERDISTE";
    p2.innerText = 'La palabra es: ' + palabraRandom;
    mensajeFinal.appendChild(p2);
    mensajeFinal.style.display = "flex";
    parrafo.classList.add("mensaje-perdio");
    p2.classList.add("mensaje-perdio-pala");
    banP = false;
  }

}

function error(letra, palabra) {
  let p = document.createElement('p');
  let comparacion = arrError.join('');
  if (conE < 10 && ganaste === false) {
    if (comparacion.includes(letra) === false) {
      if (palabra.indexOf(letra) < 0) {
        p.innerText = letra;
        p.classList.add('error');
        letrasError.appendChild(p);
        intentos(contError);
        arrError.push(letra);
        conE = conE + 1;
        console.log(comparacion);
      }
    }
  }
}

function gano(arr, palabra) {
  let arrayGano = [];
  for (let i = 0; i < palabra.length; i++) {
    let value = arr[i].value;
    arrayGano.push(value);
  }
  let comparacion = arrayGano.join('');

  if (comparacion == palabra) {
    mensajeGano();
    ganaste = true;
  }
}

function ingresarLetra(letra, index) {
  let listDiv = document.getElementsByClassName('letras');
  let input = document.getElementsByClassName('p-letras');
  input[index].value = letra;
  listDiv[index].appendChild(input[index]);
}

function letrasIguales(letra, palabra) {
  if (palabra.includes(letra) === true) {
    let index = palabra.indexOf(letra);
    let index2 = palabra.indexOf(letra, index + 1);
    if (palabra[index] === palabra[index2]) {
      ingresarLetra(letra, index2);
    }
  }
}

function mostrarCon(arg) {
  console.log(arg);
}

function asignarPalabra() {
  palabraRandom = azarPalabras();
}

function palabraNueva() {
  palabraRandom = agregarPalabra.value;
  if (palabraRandom.length > 0) {
    palabras.push(palabraInput);
    tieneLetras = true;
  } else {
    alert('Por favor ingrese una palabra');
  }
}

function blanquearInput() {
  agregarPalabra.value = '';
}

function letraPresionada() {   // Obtiene la letra presionada por teclado
  document.addEventListener('keydown', (e) => {
    let teclaPresionada = e.key.toLocaleUpperCase();
    let code = e.keyCode;
    let redex = /[^0-9]|[A-Za-z]/;
    if (code >= 65 && code <= 90 || code === 192) {
      if (redex.test(teclaPresionada)) {
        console.log('Tecla Presionada es: ' + teclaPresionada + ' ' + typeof (code))
        return teclaPresionada;
      }
    }
  });
}

function probra() {
  document.addEventListener('click', () => {
    return teclaQue;
  })
}

function teclaMobil(id) {
  let key = document.querySelector(id).value;
  console.log(key);
  teclaQue = key;
}


function mostrarMobil() {
  document.addEventListener('click', () => {

    letraPresionadaMobil = teclaQue;
    let palabra = palabraRandom.toUpperCase();
    let index = palabra.indexOf(letraPresionadaMobil);
    let listInput = document.getElementsByClassName('p-letras');

    if (letraPresionadaMobil != undefined) {
      console.log(letraPresionadaMobil + ' dentro de mosMobil');
      if (palabra.includes(letraPresionadaMobil) === true) {
        if (conE < 10) {
          ingresarLetra(letraPresionadaMobil, index);
          console.log(conG);
          conG = conG + 1;
        }

      }
      else {
        error(letraPresionadaMobil, palabra);
      }
      if (palabra.includes(letraPresionadaMobil) === true) {
        letrasIguales(letraPresionadaMobil, palabra);
      }
      if (conE === 10) {
        mensajePerdio();
      }
      gano(listInput, palabra);
      intentos(conE);
    } else {
      console.log(letraPresionadaMobil + ' dentro de mosMobil');
    }
  });

}

function mostrarLetras() {

  document.addEventListener('keydown', (e) => {
    let letraPresionada = e.key.toUpperCase();
    let palabra = palabraRandom.toUpperCase();
    let code = e.keyCode;
    let index = palabra.indexOf(letraPresionada);
    let listInput = document.getElementsByClassName('p-letras');

    if (code >= 65 && code <= 90 || code === 192) {

      if (palabra.includes(letraPresionada) === true) {
        if (conE < 10) {
          ingresarLetra(letraPresionada, index);
          console.log(conG);
          conG = conG + 1;
        }

      }
      else {
        error(letraPresionada, palabra);
      }
      if (palabra.includes(letraPresionada) === true) {
        letrasIguales(letraPresionada, palabra);
      }
    }
    if (conE === 10) {
      mensajePerdio();
    }
    gano(listInput, palabra);
    intentos(conE);
  });
}

// Eventos Botones ----------------

btnIniciar.addEventListener('click', () => {
  paginaInicial.style.display = 'none';
  paginaJuego.style.display = 'flex';
  reiniciar();
  asignarPalabra();
  nuevoJuego();
});

btnPalabra.addEventListener('click', () => {
  paginaInicial.style.display = 'none';
  paginaPalabra.style.display = 'flex';
  agregarPalabra.focus();
  blanquearInput();

});

btnDesistir.addEventListener('click', () => {
  paginaInicial.style.display = 'flex';
  paginaJuego.style.display = 'none';
});

btnCancelar.addEventListener('click', () => {
  paginaInicial.style.display = 'flex';
  paginaPalabra.style.display = 'none';
});

btnGuardar.addEventListener('click', () => {
  if (tieneLetras) {
    paginaJuego.style.display = 'flex';
    paginaPalabra.style.display = 'none';
  }
  reiniciar();
  palabraNueva();
  nuevoJuego();

});

btnNuevo.addEventListener('click', () => {
  reiniciar();
  asignarPalabra();
  nuevoJuego();
});

//   ---- canvas -------

let pantalla = document.querySelector('#canvas');
let pincel = pantalla.getContext('2d');

function nuevoCanvas() {
  pincel.clearRect(0, 0, 680, 428);
  conE = 0;
}

function dibujarRectangulo(poX, poY, largo, alto, color) {
  pincel.fillStyle = color
  pincel.fillRect(poX, poY, largo, alto);
}

function dibujarCirculo(poX, poY, largo, alto, color) {
  pincel.fillStyle = color;
  pincel.beginPath();
  pincel.arc(poX, poY, largo, alto, 2 * 3.14);
  pincel.fill();
  pincel.fillStyle = '#ebebeb';
  pincel.beginPath();
  pincel.arc(poX, poY, largo - 2, alto - 3, 2 * 3.14);
  pincel.fill();
}

function dibujarLinea(poX, poY, poX2, poY2, color) {
  pincel.fillStyle = color;
  pincel.beginPath();
  pincel.moveTo(poX, poY);
  pincel.lineTo(poX2, poY2);
  pincel.strokeStyle = color;
  pincel.stroke();
}

function intentos(arg) {

  if (arg == 0) {

  }
  if (arg == 1) {
    dibujarRectangulo(80, 130, 150, 3, '#4b3a1d');
  }
  if (arg == 2) {
    dibujarRectangulo(120, 15, 3, 118, '#2f3c03');
  }
  if (arg == 3) {
    dibujarRectangulo(120, 15, 100, 3, '#2f3c03');
  }
  if (arg == 4) {
    dibujarRectangulo(185, 15, 3, 20, '#d08d39');
  }
  if (arg == 5) {
    dibujarCirculo(186, 45, 10, 0, '#b30017');
  }
  if (arg == 6) {
    dibujarRectangulo(185, 54, 3, 40, '#b30017');
  }
  if (arg == 7) {
    dibujarLinea(185, 60, 170, 80, '#b30017');
  }
  if (arg == 8) {
    dibujarLinea(185, 94, 170, 113, '#b30017');
  }
  if (arg == 9) {
    dibujarLinea(188, 60, 205, 80, '#b30017');
  }
  if (arg == 10) {
    dibujarLinea(188, 94, 205, 113, '#b30017');
  }
}

// Funciones Cmabia Color

let contBtnColor = document.querySelector('.cambio-color');
let btnColor = document.querySelector('.btn-color');
let body = document.querySelector('body');
let letra = document.querySelector('.letras');
let img = document.querySelector('#img-logo');
let img2 = document.querySelector('#img-logo2');
let ban = true;


function cambioClass(elemento, claseAdd, claseRemove) {
  elemento.classList.add(claseAdd);
  elemento.classList.remove(claseRemove);
}

function mueveBtnColor() {

  if (ban == true) {
    contBtnColor.style.justifyContent = 'flex-end';
    cambioClass(contBtnColor, 'colorBlanco', 'colorAzul');
    cambioClass(btnColor, 'colorAzul', 'colorBlanco');
    cambioClass(body, 'colorAzul', 'colorBlanco');
    img2.style.display = 'flex';
    img.style.display = 'none';
    ban = false;
  } else
    if (ban == false) {
      contBtnColor.style.justifyContent = 'flex-start';
      cambioClass(contBtnColor, 'colorAzul', 'colorBlanco');
      cambioClass(btnColor, 'colorBlanco', 'colorAzul');
      cambioClass(body, 'colorBlanco', 'colorAzul');
      img.style.display = 'flex';
      img2.style.display = 'none';
      ban = true;
    }
}

btnColor.addEventListener('click', mueveBtnColor);



