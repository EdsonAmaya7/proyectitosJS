
//variables
const formulario = document.querySelector('#formulario');
const listaTweets = document.querySelector('#lista-tweets')

let tweets = [];

//event listener
addEventListener();

function addEventListener(){
    // cuando el ususario agrega un nuevo tweet
    formulario.addEventListener('submit',agregarTweet);

    // cuando el documento esta listo
    document.addEventListener('DOMContentLoaded', () => {
        tweets = JSON.parse( localStorage.getItem('tweets') ) || []

        crearHTML()
        console.log(tweets);
    })

}

//funciones

function agregarTweet(e){
    e.preventDefault();

    // text area donde el usuario escribe
    const tweet = document.querySelector('#tweet').value;

    // validacion
    if(tweet === ''){
        mostrarError('El mensaje no debe ir vacio');
        return;
    }
    // console.log('agregando tweet');
    const tweetObj = {
        id: Date.now(),
        tweet
    }

    tweets = [...tweets, tweetObj]

    console.log(tweets);
    crearHTML();
    formulario.reset()
}

function mostrarError(error){
    const mensajeError = document.createElement('p');
    mensajeError.textContent = error;
    mensajeError.classList.add('error');

    const contenido = document.querySelector('#contenido');
    contenido.appendChild(mensajeError);

    // elimina la alerta despues de 3 seg
    setTimeout( () => {
        mensajeError.remove()
    },3000);
}

function crearHTML(){
    limpiarHTML()
    
    if(tweets.length > 0){

        tweets.forEach( tweet => {
        //   crear boton eliminar
          const btnEliminar = document.createElement('a');
          btnEliminar.classList.add('borrar-tweet')
          btnEliminar.innerText = 'X';

        //   agregar la funcion de eliminar
            btnEliminar.onclick = () =>{
                borrarTweet(tweet.id);
            }

            // creat html
            const li = document.createElement('li');
            // añadir el texto
            li.innerText = tweet.tweet;

            // asignar boton
            li.appendChild(btnEliminar)
                // insertar en el html
            listaTweets.appendChild(li);
        });
    }

    sincronizarStorage();
}

// agrega los tweets actuales a localstorage
function sincronizarStorage() {

    localStorage.setItem('tweets', JSON.stringify(tweets));
}

// borrarTweet
function borrarTweet(id){
    // console.log('bprrando',id);
    tweets = tweets.filter( tweet => tweet.id !== id)
    crearHTML()
}

// limpuar el html
function limpiarHTML(){
    
    while( listaTweets.firstChild){
        listaTweets.removeChild(listaTweets.firstChild)
    }
}