// variables y selectores
const formulario = document.querySelector("#agregar-gasto");
const gastoListado = document.querySelector("#gastos ul");

// Eventos
eventListeners();

function eventListeners() {
  document.addEventListener("DOMContentLoaded", preguntarPresupuesto);
  formulario.addEventListener("submit", agregarGasto);
}

// clases
class Presupuesto {
  constructor(presupuesto) {
    this.presupuesto = Number(presupuesto);
    this.restante = Number(presupuesto);
    this.gastos = [];
  }

  nuevoGasto(gasto) {
    this.gastos = [...this.gastos, gasto];
    // console.log(this.gastos);
    this.calcularRestante();
  }

  calcularRestante() {
    const gastado = this.gastos.reduce(
      (total, gasto) => total + gasto.cantidad,
      0
    );
    // console.log("gastado", gastado);
    this.restante = this.presupuesto - gastado;
    console.log(this.restante);
  }

  eliminarGasto(id){
    this.gastos = this.gastos.filter( gasto => gasto.id !== id);
    this.calcularRestante()
  }

}

class UI {
  insertarPresupuesto(cantidad) {
    // console.log('presupuesto',presupuesto);
    const { presupuesto, restante } = cantidad;

    document.querySelector("#total").textContent = presupuesto;
    document.querySelector("#restante").textContent = restante;

    // console.log(presupuesto);
    // console.log(restante);
  }

  imprimirAlerta(mensaje, tipo) {
    // crear el div
    const divMensaje = document.createElement("div");
    divMensaje.classList.add("text-center", "alert");

    if (tipo === "error") {
      divMensaje.classList.add("alert-danger");
    } else {
      divMensaje.classList.add("alert-success");
    }

    // mensaje de error
    divMensaje.textContent = mensaje;

    // insertar en el html
    document.querySelector(".primario").insertBefore(divMensaje, formulario);

    // desaparecer mensaje
    setTimeout(() => {
      divMensaje.remove();
    }, 3000);
  }

  mostrarGastos(gastos) {
    this.limpiarHTML();
    gastos.forEach((gasto) => {
      const { cantidad, nombre, id } = gasto;

      const nuevoGasto = document.createElement("li");
      nuevoGasto.className =
        "list-group-item d-flex justify-content-between align-items-center";
      // añade un atributo al html de la lista
      nuevoGasto.setAttribute("data-id", id);
      // nuevoGasto.dataset.id = id;
      // console.log(nuevoGasto);

      nuevoGasto.innerHTML = `
      ${nombre} <span class="badge badge-primary badge-pill">$ ${cantidad}</span>`;

      // boton para borrar el gasto
      const btnBorrar = document.createElement("button");
      btnBorrar.classList.add("btn", "btn-danger", "borrar-gasto");
      btnBorrar.onclick = () => {
        eliminarGasto(id);
      }
      btnBorrar.innerHTML = "Borrar &times;";

      nuevoGasto.appendChild(btnBorrar);
      // agregar gasto al html
      gastoListado.appendChild(nuevoGasto);
    });
  }

  limpiarHTML() {
    while (gastoListado.firstChild) {
      gastoListado.removeChild(gastoListado.firstChild);
    }
  }


  actualizarRestante(restante){
    document.querySelector('#restante').textContent = restante;
  }

  comprobarPresupuesto(presupuestoObj){
    const { presupuesto, restante } = presupuestoObj
    const restanteDiv = document.querySelector('.restante')

    // comprobar el 25%
    if( (presupuesto / 4)  > restante ){
      restanteDiv.classList.remove('alert-success', 'alert-warning')
      restanteDiv.classList.add('alert-danger')
    }else if( (presupuesto / 2) > restante ) {
      restanteDiv.classList.remove('alert-success')
      restanteDiv.classList.add('alert-warning')
    }else{
      restanteDiv.classList.remove('alert-warning','alert-danger')
      restanteDiv.classList.add('alert-success')

    }

    // si el total es 0 o menor
    if(restante <= 0){
      ui.imprimirAlerta('El presupuesto se ha agotado', 'error');

      formulario.querySelector('button[type="submit"]').disabled = true
    }
  }
}

let presupuesto;
const ui = new UI();

// funciones

function preguntarPresupuesto() {
  const presupuestoUsuario = prompt("¿Cual es tu presupuesto?");

  // console.log(presupuestoUsuario);
  // console.log(typeof presupuestoUsuario);

  if (
    presupuestoUsuario === "" ||
    presupuestoUsuario === null ||
    isNaN(presupuestoUsuario) ||
    presupuestoUsuario <= 0
  ) {
    window.location.reload();
  }

  presupuesto = new Presupuesto(presupuestoUsuario);
  // console.log(presupuesto);
  ui.insertarPresupuesto(presupuesto);
}

function agregarGasto(e) {
  e.preventDefault();

  // leer los datos del formulario
  const nombre = document.querySelector("#gasto").value;
  const cantidad = Number(document.querySelector("#cantidad").value);

  // validar
  if (nombre === "" || cantidad === "") {
    // console.log('Ambos campos son obligatorios');

    ui.imprimirAlerta("Ambos campos son obligatorios", "error");
    return;
  } else if (cantidad < 0 || isNaN(cantidad)) {
    ui.imprimirAlerta("Cantidad no valida", "error");
    return;
  }

  // generar un objeto con el gasto
  const gasto = { nombre, cantidad, id: Date.now() };
  // console.log(gasto);

  // añade nuevo gasto
  presupuesto.nuevoGasto(gasto);

  ui.imprimirAlerta("Gasto Agregado Correctamente");

  const { gastos, restante } = presupuesto;
  ui.mostrarGastos(gastos);

  ui.actualizarRestante(restante)

  ui.comprobarPresupuesto(presupuesto);

  formulario.reset();
}


function eliminarGasto(id){

  presupuesto.eliminarGasto(id);
  const  { gastos, restante } = presupuesto;

  ui.mostrarGastos(gastos)
  ui.actualizarRestante(restante)

  ui.comprobarPresupuesto(presupuesto);

}