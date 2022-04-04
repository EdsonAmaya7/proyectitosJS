const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
let articulosCarrito = [];

registrarEventListener();

function registrarEventListener(){
    listaCursos.addEventListener('click', agregarCurso);

    // elimina cuursos del carrito
    carrito.addEventListener('click',eliminarCurso);

    // vaciar carrito btn
    vaciarCarritoBtn.addEventListener('click', () =>{
        articulosCarrito = [];

        limpiarHTML();
    })
}

//funciones
function agregarCurso(e){
    e.preventDefault();

    if(e.target.classList.contains('agregar-carrito')){
        // console.log('agregado al carrito');
        // console.log(e.target.parentElement.parentElement);
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado)
    }
}

// elimina el curso del carrito
function eliminarCurso(e){
    if(e.target.classList.contains('borrar-curso')){
        const cursoId = e.target.getAttribute('data-id');

        // elimina del arreglo de articulos carrito por data-id

        articulosCarrito = articulosCarrito.filter( curso => curso.id  !== cursoId)
        carrioHTML();
    }
}

// leer el contenido HTML al que le di click
function leerDatosCurso(curso){
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }
    // console.log(infoCurso);

    const existe = articulosCarrito.some( curso => curso.id === infoCurso.id);
    if(existe) {
        // actualiza la cantidad +
        const cursos = articulosCarrito.map(curso =>{
            if(curso.id === infoCurso.id){
                curso.cantidad++;
                return curso;
            }else{
                return curso;
            }
        });
        articulosCarrito = [...cursos];
    }else{
        articulosCarrito = [...articulosCarrito, infoCurso];
    }

    // console.log(articulosCarrito);
    carrioHTML();
}


// muestra el carrito de compras en el html


function carrioHTML(){

    //limpia el html
    limpiarHTML();
    //recorre el carrito y genera el html
    articulosCarrito.forEach( curso => {
        const {imagen, titulo, precio, cantidad, id} = curso;
        const row = document.createElement('tr');
        row.innerHTML =`
        <td> <img src=${imagen}  width="100">  </td>
        <td>${titulo}</td>
        <td>${precio}</td>
        <td>${cantidad}</td>
        <td> <a href="#" class="borrar-curso" data-id="${id}" >X</a></td>
        `;

        //agrega el html del carrito en el body
        contenedorCarrito.appendChild(row)
    })
}

function limpiarHTML(){
    // forma lenta de limpiar
    // contenedorCarrito.innerHTML = "";

    while(contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }

}