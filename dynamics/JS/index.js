/* Variables
-----------------------------------------------------------------------*/
var pausa = false, jugando = false, perder = false, ganar=false;
var tiempo=0, vidas=3, record = 9999, cronometro;
var casilla1,casilla2,casilla3,casilla4;

// Cookie
let fecha = new Date();
fecha.setTime(fecha.getTime()+(1000*60)*1440*365);
function readCokie(){
    var valorCookie = document.cookie;
    valorCookie = valorCookie.split("=");
    if(valorCookie[1] != ""){
        valorCookie = valorCookie[1];
    } else {
        valorCookie = 9999;
    }
    return valorCookie
}

// Clases
class Objetito{
    constructor(x,y,dx,dy,ruta,tx,ty,txOriginal,tyOriginal){
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
        this.txOriginal = txOriginal;
        this.tyOriginal = tyOriginal;
    }
    dibuja(){
        ctx.drawImage(this.img,this.sx,this.sy,this.txOriginal,this.tyOriginal,this.x,this.y,this.tx,this.ty);
    }
    ArrowUp(){
        if(this.y>0){
            this.y -= 50;
            this.sx=100;
        }
    }
    ArrowDown(){
        if(this.y<750){
            this.y += 50;
            this.sx=0;
        }
    }
    ArrowRight(){
        if(this.x<750){
            this.x += 50;
            this.sx=180;
        }
    }
    ArrowLeft(){
        if(this.x>0){
            this.x -= 50;
            this.sx=270;
        }
    }
    move(){
        let c1=colision(this.x,this.y,this.tx,this.ty);
        if(c1==false){
            this.x += this.dx;
        } else {
            lose.volume = .2;
            lose.play();
            frog.x=350;
            frog.y=750;
            if(vidas>1){
                vidas--;
                console.log(vidas);
                dibujar();
            } else {//if(vidas==0)
                vidas--;
                console.log(vidas);
                dibujar();
                clearInterval(cronometro);
                jugando=false;
                perder=true;
                perdiste();
            }
        }
    }
}

const fondo = new Objetito(0,0,0,0,"./statics/img/fondoFrogger.jpg",800,800,800,800);
const frog = new Objetito(350,750,0,0,"./statics/img/gatos.png",50,50,50,50);//frog.jpg
const malo = new Objetito(0,650,.05,0,"./statics/img/olas.png",150,50,353,158);
const malo5 = new Objetito(900,200,-.05,0,"./statics/img/olas.png",150,50,353,158);
const malo6 = new Objetito(900,500,.07,0,"./statics/img/olas.png",150,50,353,158);
const malo2 = new Objetito(800,400,-.05,0,"./statics/img/olas.png",100,50,353,158);
malo2.sy=180;
const malo3 = new Objetito(0,300,.07,0,"./statics/img/olas.png",50,50,353,158);
malo3.sy=363;
const malo4 = new Objetito(800,600,-.07,0,"./statics/img/olas.png",50,50,353,158);
malo4.sy=363;
const lose = new Audio("./statics/media/audio/lose.mpeg");
const win = new Audio("./statics/media/audio/win.mpeg");

/* Canvas
-----------------------------------------------------------------------*/
const canvas = document.getElementById("mi-canvas");
const ctx = canvas.getContext("2d");
var cx = canvas.width/2, cy = canvas.height/2;

/* Funciones
-----------------------------------------------------------------------*/
function perdiste(){
    ctx.fillStyle = 'black';
    ctx.textAlign = "center";
    let txt1 = "Perdiste :(";
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
function colision(x1,y1,w1,h1){
    let colision;
    let x2=frog.x;
    let y2=frog.y;
    let w2=frog.tx;
    let h2=frog.ty;
    if(( x1 > (x2+w2) )||( (x1+w1) < x2 )||( y1 > (y2+h2) )||( (y1+h1) < y2 )){
        colision=false;
    } else {
        colision=true;
    }
    return colision;
}
function dibujaCarro(){
    if(perder===false){
        malo.dibuja();
        malo.move();
        if(malo.x+malo.tx>800){
            malo.x=(-150);
        }
    }
    if(perder===false){
        malo2.dibuja();
        malo2.move();
        if(malo2.x+malo2.tx<0){
            malo2.x=800;
        }
    }
    if(perder===false){
        malo3.dibuja();
        malo3.move();
        if(malo3.x+malo3.tx>800){
            malo3.x=0;
        }
    }
    if(perder===false){
        malo4.dibuja();
        malo4.move();
        if(malo4.x+malo4.tx<0){
            malo4.x=800;
        }
    }
    if(perder===false){
        malo5.dibuja();
        malo5.move();
        if(malo5.x+malo5.tx<0){
            malo5.x=800;
        }
    }
    if(perder===false){
        malo6.dibuja();
        malo6.move();
        if(malo6.x+malo6.tx>800){
            malo6.x=(-100);
        }
    }
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
    if(perder===false){
        if(jugando === false){
            //Interfaz principal
            fondo.dibuja();
            ctx.fillStyle = 'black';
            ctx.textAlign = "center";
            let txt1 = "Frogger";
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
                let xActual=frog.x;
                let yActual=frog.y;

                if(casilla1==1){
                    frog.x=100;
                    frog.y=50;
                    frog.dibuja();
                } 
                if(casilla2==1){
                    frog.x=300;
                    frog.y=50;
                    frog.dibuja();
                } 
                if(casilla3==1){
                    frog.x=450;
                    frog.y=50;
                    frog.dibuja();
                } 
                if(casilla4==1){
                    frog.x=600;
                    frog.y=50;
                    frog.dibuja();
                }

                frog.x=xActual;
                frog.y=yActual;
                frog.dibuja();
                dibujaCarro();
            }
        }
    }
    window.requestAnimationFrame(dibujar);
}
function ganaste (){
    if(frog.y==50){
        if(frog.x==100){
            frog.x=350;
            frog.y=750;
            casilla1=1;
        }
        if(frog.x==300){
            frog.x=350;
            frog.y=750;
            casilla2=1;
        }
        if(frog.x==450){
            frog.x=350;
            frog.y=750;
            casilla3=1;
        }
        if(frog.x==600){
            frog.x=350;
            frog.y=750;
            casilla4=1;
        }
    }
    if(casilla1==1&&casilla2==1&&casilla3==1&&casilla4==1){
        document.cookie = "record=" + tiempo + '; expires="' + fecha.toGMTString();//+ '; expires="' + fecha.toGMTString()
        record = readCokie();
        clearInterval(cronometro);
        jugando=false;
        fondo.dibuja();
        ctx.fillStyle = 'black';
        ctx.textAlign = "center";
        let txt1 = "Ganaste!!!";
        ctx.font = "90px fantasy";
        ctx.fillText(txt1,cx,cy-130);
        let txt2 = "Presiona Enter para jugar";
        ctx.font = "50px monospace";
        ctx.fillText(txt2,cx,cy+10);
        let txt3 = "Presiona Escape para pausar el juego";
        ctx.font = "30px monospace";
        ctx.fillText(txt3,cx,cy+150);
        datosJuego();
        ganar = true;
        jugando = false;
        win.volume = .2;
        win.play();
    }
}

record = readCokie();

/* Eventos
-----------------------------------------------------------------------*/
window.requestAnimationFrame(dibujar);
window.addEventListener("keydown",(evento)=>{
    let tecla = evento.key;
    if(tecla === "Enter" && jugando === false && (perder === true||ganar==true)){
        tiempo = 0;
        vidas = 3;
        frog.x=350;
        frog.y=750;
        perder=false;
        ganar=false;
        casilla1=0;
        casilla2=0;
        casilla3=0;
        casilla4=0;
    }
    if(tecla === "Enter" && jugando === false && perder == false){
        jugando = true;
        tiempo = 0;
        vidas = 3;
        frog.x=350;
        frog.y=750;
        malo.x = 0;
        malo2.x = 800;
        malo3.x = 0;
        record = readCokie();
        cronometro = setInterval(()=>{
            tiempo++;
            if(perder==false)
                dibujar();
        },1000);
        // dibujar();
    }
    //Pausa el juego
    if(tecla === " " && jugando === true && perder == false){
        pausa = (pausa === false) ? true : false;
        if(pausa === false){
            cronometro = setInterval(()=>{
                tiempo++;
                console.log(tiempo);
                if(perder==false)
                    dibujar();
            },1000);
        } else {
            clearInterval(cronometro);
        }
        console.log("Pausa: "+pausa);
        // dibujar();
    }
    if(tecla === "ArrowUp" && jugando === true && perder == false){
        frog.ArrowUp();
        ganaste();
        console.log(frog.x+","+frog.y);
    }
    if(tecla === "ArrowDown" && jugando === true && perder == false){
        frog.ArrowDown();
        ganaste();
        console.log(frog.x+","+frog.y);
    }
    if(tecla === "ArrowRight" && jugando === true && perder == false){
        frog.ArrowRight();
        ganaste();
        console.log(frog.x+","+frog.y);
    }
    if(tecla === "ArrowLeft" && jugando === true && perder == false){
        frog.ArrowLeft();
        ganaste();
        console.log(frog.x+","+frog.y);
    }
});