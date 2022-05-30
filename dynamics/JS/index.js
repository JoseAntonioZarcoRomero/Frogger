/* Variables
-----------------------------------------------------------------------*/
var pausa = false, jugando = false, perder = false;
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
    ArrowUp(){
        // console.log(this.y);
        if(colision()==false){
            if(this.y>0){
                this.y -= 50;
            }
        } else {
            if(vidas>0){
                vidas--;
                this.x=350;
                this.y=750;
                dibujar();
            } else if(vidas==0){
                perdiste();
            }
        }
    }
    ArrowDown(){
        if(colision()==false){
            if(this.y<750){
                this.y += 50;
            }
        }else {
            if(vidas>0){
                vidas--;
                this.x=350;
                this.y=750;
                dibujar();
            } else if(vidas==0){
                perdiste();
            }
        }
        // console.log(this.y);
    }
    ArrowRight(){
        if(colision()==false){
            if(this.x<750){
                this.x += 50;
            }
        } else {
            if(vidas>0){
                vidas--;
                this.x=350;
                this.y=750;
                dibujar();
            } else {
                perdiste();
            }
        }
        // console.log(this.x);
        
    }
    ArrowLeft(){
        if(colision()==false){
            if(this.x>0){
                this.x -= 50;
            }
        }else {
            if(vidas>0){
                vidas--;
                this.x=350;
                this.y=750;
                dibujar();
            } else if(vidas==0){
                perdiste();
            }
        }
        // console.log(this.x);
    }
    move(){
        this.x+=this.dx;
    }
}

const fondo = new Objetito(0,0,0,0,"./statics/img/fondoFrogger.jpg",800,800);
const frog = new Objetito(350,750,0,0,"./statics/img/frog.jpg",50,50);
const malo = new Objetito(0,650,50,0,"./statics/img/malo.jpg",150,50);
const malo2 = new Objetito(800,400,-50,0,"./statics/img/malo.jpg",100,50);

/* Canvas
-----------------------------------------------------------------------*/
const canvas = document.getElementById("mi-canvas");
const ctx = canvas.getContext("2d");
var cx = canvas.width/2, cy = canvas.height/2;

/* Funciones
-----------------------------------------------------------------------*/
function perdiste(){
    clearInterval(cronometro);
    ctx.fillStyle = "white";
    ctx.fillRect(0,0,canvas.width,canvas.height);
    ctx.textAlign = "center";
    ctx.fillStyle = 'blue';
    ctx.fillText("Perdiste :(",cx,cy);
    jugando=false;
    perder=true;
}
function colision(){
    let colision;
    let x2=frog.x;
    let y2=frog.y;
    let w2=frog.tx;
    let h2=frog.ty;
    let x1=malo.x;
    let y1=malo.y;
    let w1=malo.tx;
    let h1=malo.ty;
    if(( x1 > (x2+w2) )||( (x1+w1) < x2 )||( y1 > (y2+h2) )||( (y1+h1) < y2 )){
        colision=false;
    } else {
        colision=true;
    }
    console.log(colision);
    return colision;
}
function dibujaCarro(){
    malo.dibuja();
    malo.move();
    malo2.dibuja();
    malo2.move();
}
function datosJuego(){
    ctx.fillStyle = 'white';
    ctx.font = "30px monospace";
    ctx.textAlign = "left";
    let dato1 = "Tiempo: "+tiempo+"s";
    ctx.fillText(dato1,40,35);
    ctx.textAlign = "center";
    let dato2 = "Vidas: "+vidas;
    ctx.fillText(dato2,cx,35);
    ctx.textAlign = "right";
    let dato3 = "Récord: "+record+"s";
    ctx.fillText(dato3,770,35);
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
    } else if(jugando === true && perder == false){
        if(pausa === true){ 
            //Interfaz en pausa
            ctx.fillStyle = "gray";
            ctx.fillRect(0,0,canvas.width,canvas.height);
        } else if(pausa === false){
            //Interfaz juego
            fondo.dibuja();
            datosJuego();
            frog.dibuja();
            dibujaCarro();
        }
    }
}

/* Eventos
-----------------------------------------------------------------------*/
window.addEventListener("keyup",(evento)=>{
    let tecla = evento.key;
    //Comienza el juego
    if(tecla === "Enter" && jugando === false && perder === true){
        jugando = false;
        tiempo = 0;
        vidas = 3;
        frog.x=350;
        frog.y=750;
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
    }
    if(tecla === "Enter" && jugando === false && perder == false){
        jugando = true;
        tiempo = 0;
        vidas = 3;
        frog.x=350;
        frog.y=750;
        cronometro = setInterval(()=>{
            tiempo++;
            // console.log(tiempo);
            dibujar();
        },1000);
        // console.log(jugando);
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
    if(tecla === "ArrowUp" && jugando === true){
        frog.ArrowUp();
    }
    if(tecla === "ArrowDown" && jugando === true){
        frog.ArrowDown();
    }
    if(tecla === "ArrowRight" && jugando === true){
        frog.ArrowRight();
    }
    if(tecla === "ArrowLeft" && jugando === true){
        frog.ArrowLeft();
    }
    // console.log(tecla);
});
window.requestAnimationFrame(dibujar);