const btnEnviar = document.querySelector("#enviar");
const btnReset = document.querySelector("#resetBtn")
const formulario = document.querySelector("#enviar-mail");
const email = document.querySelector("#email");
const asunto = document.querySelector("#asunto");
const mensaje = document.querySelector("#mensaje");

const er =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

eventListeners();

function eventListeners() {
  document.addEventListener("DOMContentLoaded", iniciarApp);

  email.addEventListener("blur", validarFormulario);
  asunto.addEventListener("blur", validarFormulario);
  mensaje.addEventListener("blur", validarFormulario);

  //   reinicia el formulario
    btnReset.addEventListener('click', resetearFormulario)
  // envia email
  formulario.addEventListener("submit", enviarEmail);
}

function iniciarApp() {
  btnEnviar.disabled = true;
  btnEnviar.classList.add("cursor-not-allowed", "opacity-50");
}

function validarFormulario(e) {
  if (e.target.value.length > 0) {
    // elimina los erreores
    const error = document.querySelector("p.error");
    if (error) {
      error.remove();
    }

    e.target.classList.remove("border", "border-red-500");
    e.target.classList.add("border", "border-green-500");
  } else {
    e.target.classList.remove("border", "border-green-500");
    e.target.classList.add("border", "border-red-500");
    mostrarError("Todos los campos son obligatorios");
    // e.target.style.borderColor = "red";
  }

  if (e.target.type === "email") {
    if (er.test(e.target.value)) {
      // elimina los erreores
      const error = document.querySelector("p.error");
      if (error) {
        error.remove();
      }

      e.target.classList.remove("border", "border-red-500");
      e.target.classList.add("border", "border-green-500");
    } else {
      e.target.classList.add("border", "border-red-500");
      mostrarError("Email no valido");
    }
  }

  if (er.test(email.value) && asunto.value !== "" && mensaje.value !== "") {
    btnEnviar.disabled = false;
    btnEnviar.classList.remove("cursor-not-allowed", "opacity-50");
  } else {
    // console.log("");
  }
}

function mostrarError(mensaje) {
  const mensajeError = document.createElement("p");
  mensajeError.textContent = mensaje;
  mensajeError.classList.add(
    "border",
    "border-red-500",
    "background-red-100",
    "p-3",
    "mt-5",
    "text-center",
    "error"
  );

  const errores = document.querySelectorAll(".error");
  // console.log(errores);
//   console.log(errores.length);
  if (errores.length == 0) {
    formulario.appendChild(mensajeError);
    // console.log(mensajeError);
  }
}

function enviarEmail(e) {
  e.preventDefault();

  //mostrar spinner
  const spinner = document.querySelector("#spinner");
  spinner.style.display = "flex";

  //despues de 3 seg ocultar el spinner  y mostrar mensaje

  setTimeout(() => {
    spinner.style.display = "none";

    const parrafo = document.createElement('p');
    parrafo.textContent = "El mensaje ha sido enviado";
    parrafo.classList.add(
      "text-center",
      "my-10",
      "p-2",
      "bg-green",
      "text-white",
      "font-bold",
      "uppercase"
    );
    formulario.insertBefore(parrafo, spinner);

    setTimeout(() => {
    //   parrafo.remove();
      resetearFormulario();
    }, 5000);
  }, 3000);
}

function resetearFormulario() {
  formulario.reset();
  iniciarApp();
}
