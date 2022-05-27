/* Variables
-----------------------------------------------------------------------*/
var pausa = false, jugando = false;

/* Canvas
-----------------------------------------------------------------------*/
const canvas = document.getElementById("mi-canvas");
const ctx = canvas.getContext("2d");

/* Funciones
-----------------------------------------------------------------------*/
function dibujar (){
    //Interfaz
    if(jugando === false){
        ;
    }
}

/* Eventos
-----------------------------------------------------------------------*/
window.requestAnimationFrame(dibujar);
window.addEventListener("keyup",(evento)=>{
    let tecla = evento.key;
    //Comienza el juego
    if(tecla === "Enter" && jugando === false){
        jugando = true;
    }
    //Pausa el juego
    if(tecla === " " && jugando === true){
        pausa = (pausa === false) ? true : false;
    }
});