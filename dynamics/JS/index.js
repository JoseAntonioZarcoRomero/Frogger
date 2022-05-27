/* Variables
-----------------------------------------------------------------------*/
var pausa = false, jugando = false;
var tiempo=0, vidas=3, record = 9999, cronometro;

class Objetito{
    constructor(x,y,dx,dy,ruta,tx,ty){
        const imagen = new Image();
        imagen.src = ruta;
        this.x=x;
        this.y=y;
        this.tx=tx;
        this.ty=ty;
        this.dx=dx;
        this.dy=dy;
        this.sx=0;
        this.sy=0;
        this.img = imagen;
    }
    dibuja(){
        ctx.drawImage(this.img,this.sx,this.sy,this.tx,this.ty,this.x,this.y,this.tx,this.ty);
    }
    // mover(){
    // }
    // walkDown(){
    // }
    // walkUp(){
    // }
    // walkLeft(){
    // }
    // walkRight(){
    // }
}
const fondo = new Objetito(0,0,0,0,"./statics/img/fondo.png",800,800);

/* Canvas
-----------------------------------------------------------------------*/
const canvas = document.getElementById("mi-canvas");
const ctx = canvas.getContext("2d");
var cx = canvas.width/2, cy = canvas.height/2;

/* Funciones
-----------------------------------------------------------------------*/
function datosJuego(){
    ctx.fillStyle = 'blue';
    ctx.font = "30px monospace";
    ctx.textAlign = "left";
    let dato1 = "Tiempo: "+tiempo+"s";
    ctx.fillText(dato1,40,50);
    ctx.textAlign = "center";
    let dato2 = "Vidas: "+vidas;
    ctx.fillText(dato2,cx,50);
    ctx.textAlign = "right";
    let dato3 = "Récord: "+record+"s";
    ctx.fillText(dato3,770,50);
}
function dibujar(){
    if(jugando === false){
        //Interfaz principal
        fondo.dibuja();
        ctx.fillStyle = 'black';
        ctx.textAlign = "center";
        let txt1 = "OctoCross";
        ctx.font = "90px fantasy";
        ctx.fillText(txt1,cx,cy-130);
        let txt2 = "Presiona Enter para jugar";
        ctx.font = "50px monospace";
        ctx.fillText(txt2,cx,cy+10);
        let txt3 = "Presiona Escape para pausar el juego";
        ctx.font = "30px monospace";
        ctx.fillText(txt3,cx,cy+150);
        datosJuego();
    } else if(jugando === true){
        if(pausa === true){ 
            //Interfaz en pausa
            ctx.fillStyle = "gray";
            ctx.fillRect(0,0,canvas.width,canvas.height);
        } else if(pausa === false){
            //Interfaz juego
            fondo.dibuja();
            datosJuego();
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
        tiempo = 0;
        vidas = 3;
        cronometro = setInterval(()=>{
            tiempo++;
            console.log(tiempo);
            dibujar();
        },1000);
        console.log(jugando);
        dibujar();
    }
    //Pausa el juego
    if(tecla === " " && jugando === true){
        pausa = (pausa === false) ? true : false;
        if(pausa === false){
            cronometro = setInterval(()=>{
                tiempo++;
                console.log(tiempo);
                dibujar();
            },1000);
        } else {
            clearInterval(cronometro);
        }
        console.log("Pausa: "+pausa);
        dibujar();
    }
});
window.requestAnimationFrame(dibujar);