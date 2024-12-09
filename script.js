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
let mascotaPosicion = Math.floor(Math.random() * 5); // La mascota estará en una de las 5 posiciones
let intentosRestantes = 3; // El jugador tiene 3 intentos

/********************************************************************************************* */
// Inicializar el juego al cargar la página
window.onload = inicializarJuego;

// Función para registrar el nombre del jugador
// Función para registrar el nombre del jugador
function registrarNombre(event) {
  event.preventDefault(); // este evento es para evitar que se recargue la página
  jugador = document.getElementById("nombreJugador").value;

  // Ocultar el contenedor inicial (incluyendo el GIF)
  document.querySelector(".tit-principal").classList.add("oculto");
  document.getElementById("contenedorInicio").classList.add("oculto");

  // Mostrar el contenedor de bienvenida sin dejar espacio vacío
  document.getElementById("contenedorBienvenida").classList.remove("oculto");
  document.getElementById("bienvenida").textContent = "Hola " + jugador + ", ¡Empecemos!";
}

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


// Función para verificar la suma en Minijuego 1 y     
function verificarSuma() {
  let respuesta = parseInt(document.getElementById("respuestaSuma").value);
  const mensajeSuma = document.getElementById("mensajeSuma");
  const botonSiguiente = document.getElementById("botonSiguiente-1");
  const botonEnviar = document.querySelector("#contenedorMinijuego1 button.btn-primary");

  if (respuesta === sumaCorrecta) {
    mensajeSuma.textContent = "Respuesta correcta. ¡Puedes pasar al siguiente juego!";
    mensajeSuma.style.color = "green";

    // Mostrar botón "Siguiente" y ocultar "Enviar"
    botonSiguiente.classList.remove("oculto");
    botonEnviar.classList.add("oculto");

  } else {
    mensajeSuma.textContent = "Respuesta incorrecta. Inténtalo de nuevo.";
    mensajeSuma.style.color = "red";
  }
}


// Función para pasar al siguiente juego del Minijuego 1 a Minijuego 2
function pasarAlSiguienteJuego() {
  document.getElementById("contenedorMinijuego1").classList.add("oculto");
  document.getElementById("contenedorMinijuego2").classList.remove("oculto");
  inicializarJuego2(); // Inicializar el Minijuego 2
}

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
      botonSiguiente.classList.remove("oculto");
      botonSiguiente.style.marginBottom = "30px";
    }, 600);
  } else {
    intentosJuego2++;
    mensaje.textContent = "No está aquí. ¡Sigue buscando!";
    mensaje.style.color = "red";

    // Reiniciar juego si se alcanza el límite de intentos
    if (intentosJuego2 >= 2) {
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




// Función para pasar al siguiente juego
function siguienteMinijuego() {
  // Verificar si estamos en el juego 2
  if (document.getElementById("contenedorMinijuego2").classList.contains("oculto") === false) {
    document.getElementById("contenedorMinijuego2").classList.add("oculto");// ocultamos el juego 2
    document.getElementById("contenedorMinijuego3").classList.remove("oculto");// mostramos el juego 3
  }
}

//******************************************/ Minijuego 3 ***************************************

// Función para manejar la búsqueda
function buscarMascota(event, posicion) {
  const mensajeJuego3 = document.getElementById("mensajeJuego3");// selecciona el elemento con el id "mensajeJuego3"
  const botonReiniciar = document.getElementById("botonReiniciar");// selecciona el elemento con el id "botonReiniciar"
  const botonVolverInicio = document.getElementById("botonVolverInicio");// selecciona el elemento con el id "botonVolverInicio"

  // Verificar si el jugador encontró la mascota
  if (posicion === mascotaPosicion) {
    event.target.classList.add("mascota-encontrada");// agrega la clase "mascota-encontrada" al elemento que se hizo clic
    event.target.innerHTML = `<img src="img/mascota.png" alt="Mascota encontrada" class="img-fluid">`;// cambia la imagen del elemento por la de la mascota
    mensajeJuego3.textContent = "¡Felicidades! Encontraste a la mascota.";// muestra un mensaje de éxito
    mensajeJuego3.style.color = "green";
    botonVolverInicio.classList.remove("oculto"); // Mostrar botón de volver al inicio
  } else {
    intentosRestantes--; // decrementa el número de intentos restantes
    if (intentosRestantes > 0) { // si quedan intentos restantes
      mensajeJuego3.textContent = `No está aquí. Te quedan ${intentosRestantes} intentos.`;
      mensajeJuego3.style.fontFamily = "Slackey", sans - serif;
      mensajeJuego3.style.fontSize = "1rem";
      mensajeJuego3.style.color = "red";
    } else {
      mensajeJuego3.textContent = "¡Perdiste! La mascota estaba en otro lugar.";
      mensajeJuego3.style.color = "red";
      botonReiniciar.classList.remove("oculto"); // Mostrar botón de reiniciar
    }
  }
}

// Función para reiniciar el juego 3

function reiniciarJuego3() {
  // Reiniciar variables
  mascotaPosicion = Math.floor(Math.random() * 5);
  intentosRestantes = 3;

  // Reiniciar el mensaje y botones
  const mensajeJuego3 = document.getElementById("mensajeJuego3");
  const botonReiniciar = document.getElementById("botonReiniciar");
  mensajeJuego3.textContent = "";
  botonReiniciar.classList.add("oculto");

  // Reiniciar el área de búsqueda
  const arboles = document.querySelectorAll(".arbol");
  arboles.forEach((arbol, index) => {
    // Limpiar el estado de cada árbol
    arbol.classList.remove("mascota-encontrada");

    // Volver a establecer la imagen del árbol original
    // Asegúrate de que las imágenes de los árboles sean las correctas. Puedo asumir que usas imágenes como "arbol-1.png", "arbol-2.png", etc.
    arbol.innerHTML = `<img src="img/arbol-${index + 1}.png" alt="Árbol ${index + 1}" class="img-fluid;">`;
  });
}


// Función para volver al inicio (recargando la página)
function volverInicio() {
  // Recargar la página
  location.reload();
}


