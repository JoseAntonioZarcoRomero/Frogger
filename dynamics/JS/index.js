/* Variables
-----------------------------------------------------------------------*/
var pausa = false, jugando = false;

/* Canvas
-----------------------------------------------------------------------*/
const canvas = document.getElementById("mi-canvas");
const ctx = canvas.getContext("2d");
var cx = canvas.width/2, cy = canvas.height/2;

/* Funciones
-----------------------------------------------------------------------*/
function dibujar(){
    if(jugando === false){
        //Interfaz principal
        ctx.fillStyle = 'black';
        ctx.textAlign = "center";
        let txt1 = "OctoCross";
        ctx.font = "90px fantasy";
        ctx.fillText(txt1,cx,cy-140);
        let txt2 = "Presiona Enter para jugar";
        ctx.font = "50px monospace";
        ctx.fillText(txt2,cx,cy+20);
        let txt3 = "Presiona Escape para pausar el juego";
        ctx.font = "30px monospace";
        ctx.fillText(txt3,cx,cy+150);
    } else if(jugando === true){
        if(pausa === true){ 
            //Interfaz en pausa
            ctx.fillStyle = "gray";
            ctx.fillRect(0,0,canvas.width,canvas.height);
        } else if(pausa === false){
            //Interfaz juego
            ctx.fillStyle = 'white';
            ctx.fillRect(0,0,canvas.width,canvas.height);
        }
    }
}

/* Eventos
-----------------------------------------------------------------------*/
window.addEventListener("keyup",(evento)=>{
    let tecla = evento.key;
    //Comienza el juego
    if(tecla === "Enter" && jugando === false){
        jugando = true;
        console.log(jugando);
        dibujar();
    }
    //Pausa el juego
    if(tecla === " " && jugando === true){
        pausa = (pausa === false) ? true : false;
        console.log("Pausa: "+pausa);
        dibujar();
    }
});
window.requestAnimationFrame(dibujar);