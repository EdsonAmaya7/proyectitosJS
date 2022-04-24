function Seguro(marca, year, tipo) {
  this.marca = marca;
  this.year = year;
  this.tipo = tipo;
}

// cotizar seguro coon los datos del objeto
Seguro.prototype.cotizarSeguro = function () {
  /* ingrementos del seguro
        1 americano(1.15)
        2 asiatico(1.05)
        3 europeo(1.35) */

  // console.log(this.marca);
  let cantidad;
  const base = 2000;

  switch (this.marca) {
    case "1":
      cantidad = base * 1.15;
      break;
    case "2":
      cantidad = base * 1.05;
      break;
    case "3":
      cantidad = base * 1.35;
      break;
    default:
      break;
  }

  // leer el amio
  // cada año que la diferencia sea mayor, el costo se reducira un 3%
  const diferencia = new Date().getFullYear() - this.year;

  cantidad -= (diferencia * 3 * cantidad) / 100;

  if (this.tipo === "basico") {
    cantidad *= 1.3;
  } else {
    cantidad *= 1.5;
  }
  console.log(cantidad);
  return cantidad;
};

function UI() {}

UI.prototype.llenarOpciones = () => {
  const max = new Date().getFullYear(),
    min = max - 20;

  const selectYear = document.querySelector("#year");

  for (let i = max; i > min; i--) {
    let option = document.createElement("option");
    option.value = i;
    option.textContent = i;
    selectYear.appendChild(option);
  }
};

UI.prototype.mostrarMensaje = (mensaje, tipo) => {
  const div = document.createElement("div");

  div.classList.add("mensaje", "mt-10");
  div.textContent = mensaje;

  if (tipo == "error") {
    div.classList.add("error");
  } else {
    div.classList.add("correcto");
  }

  const formulario = document.querySelector("#cotizar-seguro");
  formulario.insertBefore(div, document.querySelector("#resultado"));

  setTimeout(() => {
    div.remove();
  }, 3000);
};

UI.prototype.mostrarResultado = (seguro, total) => {
  // crear resultado
  const { marca, year, tipo } = seguro;
  const div = document.createElement("div");

    let textoMarca;

    switch(marca){
        case '1':
            textoMarca = "Americano";
            break;
        case '2':
            textoMarca = "Asiatico";
            break;
        case '3':
            textoMarca = "Europeo";
            break;
        default:
            break;
    }

  div.classList.add("mt-10");

  div.innerHTML = `
    <p class="header">Tu Resumen</p>
    <p class="font-bold">Marca:  <span class="font-normal">  ${textoMarca}</span> </p>
    <p class="font-bold">Año:  <span class="font-normal">  ${year}</span> </p>
    <p class="font-bold">Seguro:  <span class="font-normal">  ${tipo}</span> </p>
    <p class="font-bold">Total:  <span class="font-normal"> $ ${total}</span> </p>`;

  const resultadoDiv = document.querySelector("#resultado");

  const spinner = document.querySelector("#cargando");
  spinner.style.display = "block";

  setTimeout(() => {
    spinner.style.display = "none";
    resultadoDiv.appendChild(div);
  }, 3000);
};

// instanciar ui

const ui = new UI();

document.addEventListener("DOMContentLoaded", () => {
  ui.llenarOpciones();
});

eventListeners();

function eventListeners() {
  const formulario = document.querySelector("#cotizar-seguro");
  formulario.addEventListener("submit", cotizarSeguro);
}

function cotizarSeguro(e) {
  e.preventDefault();
  //   console.log("cotizando");

  // leer la marca seleccionada
  const marca = document.querySelector("#marca").value;
  //   console.log(marca);

  // leer el year seleccionadp
  const year = document.querySelector("#year").value;
  //   console.log(year);

  // leer la cobertura
  const tipo = document.querySelector('input[name="tipo"]:checked').value;
  //   console.log(tipo);

  if (marca == "" || year == "" || tipo == "") {
    ui.mostrarMensaje("Todos los campos son obligatorios", "error");
    return;
  }

  const seguro = new Seguro(marca, year, tipo);

  const total = seguro.cotizarSeguro();
  //   console.log(seguro);

  ui.mostrarMensaje("cotizando", "correcto");

  //   ocultar las cotizaciones previas
  const resultados = document.querySelector("#resultado div");

  if (resultados != null) {
    resultados.remove();
  }

  ui.mostrarResultado(seguro, total);
}
