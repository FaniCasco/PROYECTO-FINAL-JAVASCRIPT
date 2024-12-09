// Variables para la lógica del juego 1
var jugador;
var sumaCorrecta;
// Variables para la lógica del juego 2
let mascotaEnCasa = Math.floor(Math.random() * 4); // Mascota aleatoriamente asignada
let intentosJuego2 = 0;

//const de las imagenes
const interiores = ["img/interior-1.png", "img/interior-2.png", "img/interior-3.png", "img/interior-4.png"];
const interiorConMascota = "img/interiorMascota.png";

// Variables para la lógica del juego 3
let mascotaPosicion = Math.floor(Math.random() * 4); // Posición aleatoria
let intentosRestantes = 2; // Solo dos intentos permitidos

/********************************************************************************************* */
// Inicializar el juego al cargar la página
window.onload = inicializarJuego;

// Función para registrar el nombre del jugador
function registrarNombre(event) {
  event.preventDefault(); // este evento es para evitar que se recargue la página
  jugador = document.getElementById("nombreJugador").value;

  // Ocultar el contenedor inicial (incluyendo el GIF)
  document.querySelector(".tit-principal").classList.add("oculto");
  document.getElementById("contenedorInicio").classList.add("oculto");

  // Mostrar el contenedor de bienvenida sin dejar espacio vacío
  document.getElementById("contenedorBienvenida").classList.remove("oculto");
  document.getElementById("bienvenida").textContent = "¡Hola " + jugador + " !";
  //agregamos un mensaje a la bienvenida
  document.getElementById("bienvenida").innerHTML += "<br> <br> <p>¡Comencemos!.</p>";


}

/************************************************Minijuego 1********************************************* */
// Función para mostrar el Minijuego 1
function mostrarMinijuego1() {
  document.getElementById("contenedorBienvenida").classList.add("oculto"); // ocultar el contenedor de bienvenida
  document.getElementById("contenedorMinijuego1").classList.remove("oculto"); // mostrar el contenedor del minijuego 1

  let num1 = Math.floor(Math.random() * 10) + 1; // Generar un número aleatorio entre 1 y 10
  let num2 = Math.floor(Math.random() * 10) + 1; // Generar otro número aleatorio entre 1 y 10
  sumaCorrecta = num1 + num2; //se guarda la suma correcta
  document.getElementById("num1").textContent = num1; // Mostrar el primer número en el HTML
  document.getElementById("num2").textContent = num2; // Mostrar el segundo número en el HTML
}


// Función para verificar la suma   
function verificarSuma() {
  let respuesta = parseInt(document.getElementById("respuestaSuma").value);
  const mensajeSuma = document.getElementById("mensajeSuma");
  const botonSiguiente = document.getElementById("botonSiguiente-1");
  const botonEnviar = document.querySelector("#contenedorMinijuego1 button.btn-primary");

  //Si la respuesta es correcta, mostrar mensaje de acierto y pasar al siguiente juego
  if (respuesta === sumaCorrecta) {
    mensajeSuma.textContent = "Correcto!. ";
    //agregamos un parrafo mas
    mensajeSuma.innerHTML += "<br> <p>¡Continúa al siguiente juego!.</p>";


    // Mostrar botón "Siguiente" y ocultar "Enviar"
    botonSiguiente.classList.remove("oculto");
    botonEnviar.classList.add("oculto");

  } else {
    mensajeSuma.textContent = "Respuesta incorrecta. Inténtalo de nuevo.";
    mensajeSuma.style.color = "red";
  }
}


/********************************************************************************************* */
// Función para pasar al siguiente juego del Minijuego 1 a Minijuego 2
function pasarAlSiguienteJuego() {
  document.getElementById("contenedorMinijuego1").classList.add("oculto");
  document.getElementById("contenedorMinijuego2").classList.remove("oculto");
  inicializarJuego2(); // Inicializar el Minijuego 2
}


/*********************************************Minijuego 2************************************************ */
// Función para inicializar el Juego 2
function revelarCarta(indice) {
  const carta = document.getElementById(`carta-${indice}`);
  const mensaje = document.getElementById("mensaje-2");
  const botonSiguiente = document.getElementById("botonSiguiente-2");

  // Evitar voltear cartas ya volteadas
  if (carta.parentNode.classList.contains("volteada")) {
    return;
  }

  // Voltear la carta
  carta.parentNode.classList.add("volteada");

  // Verificar si es la carta con la mascota
  if (indice === mascotaEnCasa) {
    setTimeout(() => {
      carta.querySelector(".carta-detras img").src = interiorConMascota;
      mensaje.textContent = "¡Encontraste a la mascota! Puedes continuar.";
      mensaje.style.color = "green";
      mensaje.style.fontSize = "2rem";
      mensaje.style.fontFamily = "Slackey, sans-serif";
      botonSiguiente.classList.remove("oculto");
      botonSiguiente.style.marginBottom = "30px";
    }, 600);
  } else {
    intentosJuego2++;
    mensaje.textContent = "No está aquí. ¡Sigue buscando!";
    mensaje.style.color = "red";

    // Reiniciar juego si se alcanza el límite de intentos
    if (intentosJuego2 >= 3) {
      setTimeout(() => {
        mensaje.textContent = "Reinicializando juego...";
        reiniciarMinijuego2();
      }, 1000);
    }

  }
}


// Función para reiniciar el Minijuego 2
function reiniciarMinijuego2() {
  // Reiniciar variables
  mascotaEnCasa = Math.floor(Math.random() * 4);
  intentosJuego2 = 0;

  // Restablecer mensajes y ocultar botón "Siguiente"
  const mensaje = document.getElementById("mensaje");
  mensaje.textContent = "Busca la mascota en la casa.";
  mensaje.style.color = "white";
  document.getElementById("botonSiguiente-2").classList.add("oculto");

  // Volver las cartas a su estado original
  for (let i = 0; i < 4; i++) {
    const carta = document.getElementById(`carta-${i}`);
    carta.parentNode.classList.remove("volteada");
    carta.querySelector(".carta-detras img").src = interiores[i];
  }
}


/********************************************************************************************* */
// Función para pasar al siguiente juego
function siguienteMinijuego() {
  // Verificar si estamos en el juego 2
  if (document.getElementById("contenedorMinijuego2").classList.contains("oculto") === false) {
    document.getElementById("contenedorMinijuego2").classList.add("oculto");// ocultamos el juego 2
    document.getElementById("contenedorMinijuego3").classList.remove("oculto");// mostramos el juego 3
  }
}

//******************************************/ Minijuego 3 ***************************************

// Función para manejar la búsqueda (Minijuego 3)
function buscarMascota(event, posicion) {
  const mensajeJuego3 = document.getElementById("mensajeJuego3");
  const botonReiniciar = document.getElementById("botonReiniciar");
  const botonVolverInicio = document.getElementById("botonVolverInicio");

  if (posicion === mascotaPosicion) {
    event.currentTarget.innerHTML = `<img src="img/mascota-animada.gif" alt="Mascota encontrada" class="img-fluid">`;
    mensajeJuego3.textContent = "¡Felicidades! Encontraste a la mascota.";
    mensajeJuego3.style.color = "green";

    desactivarCartas(); 
    botonVolverInicio.classList.remove("oculto"); // Mostrar el botón de inicio
  } else {
    intentosRestantes--;
    if (intentosRestantes > 0) {
      mensajeJuego3.textContent = `No está aquí. Te queda ${intentosRestantes} intento.`;
      mensajeJuego3.style.color = "red";
    } else {
      mensajeJuego3.textContent = "¡Perdiste! La mascota estaba en otro lugar.";
      mensajeJuego3.style.color = "red";
      mostrarMascotaCorrecta();
      desactivarCartas();
      botonReiniciar.classList.remove("oculto"); 
    }
  }
}

// Función para mostrar la mascota correcta (Minijuego 3)
function mostrarMascotaCorrecta() {
  const cartaCorrecta = document.querySelectorAll(".arbol")[mascotaPosicion];
  cartaCorrecta.innerHTML = `<img src="img/mascota-animada.gif" alt="Mascota encontrada" class="img-fluid">`;
}

function desactivarCartas() {
  const cartas = document.querySelectorAll(".arbol");
  cartas.forEach(carta => carta.onclick = null);
}

function reiniciarJuego() {
  mascotaPosicion = Math.floor(Math.random() * 4);
  intentosRestantes = 2;

  const mensajeJuego3 = document.getElementById("mensajeJuego3");
  const botonReiniciar = document.getElementById("botonReiniciar");
  const cartas = document.querySelectorAll(".arbol");

  cartas.forEach((carta, index) => {
    carta.innerHTML = `<img src="img/arbol-${index + 1}.png" alt="Árbol ${index + 1}" class="img-fluid">`;
    carta.onclick = (event) => buscarMascota(event, index);
  });

  mensajeJuego3.textContent = "";
  botonReiniciar.classList.add("oculto");
}
// Función para volver al inicio (recargando la página)
function volverInicio() {
  // Recargar la página
  location.reload();
}


