//transiciones
const canva_transicion = {
  canva: document.getElementById("canva_transicion"), //obtienes el canva de la pag web;
  contexto: null,
  sprite: new Image(),
  frameWidth:962,
  frameHeight:600,
  totalFrames: 42,
  currentFrame: 0,
  playing:false,
  lastTime:0,
  fps:45,
  init() {
    this.contexto = this.canva.getContext("2d");
    this.sprite.src = "../animaciones/Transicion.png";
  }
}

canva_transicion.init();
const botones_principal=document.getElementById("botones_principal")
const botones_cocina=document.getElementById("botones_cocina")
const botones_baño=document.getElementById("botones_baño")
const flechas=document.getElementById("flechas")

function drawFrame(frame,canva_) { //Función que dibuja el frame en la imagen que coge como atributo el frame a dibujar
  const ctx= canva_.contexto;
  ctx.clearRect(0, 0, canva_.canva.width, canva_.canva.height); //Borra el frame anterior
  ctx.drawImage( //dibuja en la imagen el nuevo frame
    canva_.sprite, //Del sprite coge el frame
    frame * canva_.frameWidth, 0, canva_.frameWidth, canva_.frameHeight, // Recorte
    0, 0, canva_.frameWidth, canva_.frameHeight                   // Posición en canvas
  );
}

function animate(time, canva_, loop = true, reverse = false, onFinish = null) {
  if (!canva_.playing) return;

  const delta = (time - canva_.lastTime) / 1000;
  const frameTime = 1 / canva_.fps;

  if (delta >= frameTime) {
    if (reverse) {
      canva_.currentFrame--;
      canva_.lastTime = time;
      if (canva_.currentFrame==20){
        botones_principal.style.display="block";
        flechas.style.display="block";
        document.body.style.backgroundImage=`url('../imagenes/salon_principal0000.png')`;
      }
      if (canva_.currentFrame <= 0) {
        if (!loop) {
          canva_.currentFrame = 0;
          drawFrame(canva_.currentFrame, canva_);
          canva_.playing = false;

          if (onFinish) onFinish(); // ✅ ejecuta callback si existe
          return;
        } else {
          canva_.currentFrame = canva_.totalFrames - 1;
          canva_.lastTime = time;
        }
      }
    } else {
      canva_.currentFrame++;
      canva_.lastTime = time;
        
      if (canva_.currentFrame >= canva_.totalFrames) {
        if (!loop) {
          canva_.currentFrame = canva_.totalFrames - 1;
          drawFrame(canva_.currentFrame, canva_);
          canva_.playing = false;

          if (onFinish) onFinish(); // ✅ callback al terminar
          return;
        } else {
          canva_.currentFrame = 0;
          canva_.lastTime = time;
        }
      }
    }
  }

  drawFrame(canva_.currentFrame, canva_);

  // 🔁 Sigue animando mientras esté activa
  requestAnimationFrame((t) => animate(t, canva_, loop, reverse, onFinish));
}


window.onload = () => { //Cuando se cargue la imagen por primera vez
    drawFrame(42, canva_transicion);
    canva_transicion.playing = true;
    canva_transicion.currentFrame = 42;
    requestAnimationFrame((t) =>{
        animate(t, canva_transicion, false,true,()=>{
            canva_transicion.canva.style.display="none";
        })
    })

};

function boton (boton, nombre, funcion=null){

    function boton_entra(){
    boton.src=`../imagenes/${nombre}0001.png`;
    }
    function boton_sale(){
    boton.src=`../imagenes/${nombre}0000.png`;
    }
    function boton_click(){
      if (funcion){
        funcion();
      }
      else {
      boton.removeEventListener("mouseenter",boton_entra)
      boton.removeEventListener("mouseleave",boton_sale)
      boton.src=`../imagenes/${nombre}0002.png`;}
    }
    boton.addEventListener("mouseenter",boton_entra)
    boton.addEventListener("mouseleave",boton_sale)
    boton.addEventListener("click",boton_click)
}

function puerta (puerta,nombre,pagina,botones, numero=0, funcion=null){
    function puerta_entra(){
      if(numero==0){
    document.body.style.backgroundImage=`url('../imagenes/${nombre}0001.png')`;}
    else{
    document.body.style.backgroundImage=`url('../imagenes/${nombre}0002.png')`;}
    }
    function puerta_sale(){
    document.body.style.backgroundImage=`url('../imagenes/${nombre}0000.png')`;
    }
    function puerta_click(){
        botones.style.display="none"
        puerta.removeEventListener("mouseenter",puerta_entra)
        puerta.removeEventListener("mouseleave",puerta_sale)
        if (funcion){
          funcion()
        } else{
        canva_transicion.canva.style.display="block"
        drawFrame(0, canva_transicion);
        canva_transicion.playing = true;
        canva_transicion.currentFrame = 0;
        requestAnimationFrame((t) =>
            animate(t, canva_transicion, false,false,()=>{window.location.href = `../html/${pagina}.html`;})
    );}
    
    }

    puerta.addEventListener("mouseenter",puerta_entra)
    puerta.addEventListener("mouseleave",puerta_sale)
    puerta.addEventListener("click",puerta_click)
}

function flecha (flecha){
  switch (salon) {
    case 0:
      flecha_izq.style.display="block";
      botones_baño.style.display="none";
      botones_principal.style.display="block";
      document.body.style.backgroundImage=`url('../imagenes/salon_principal0000.png')`;
      salon+=1;
      break;
    case 1:
      if(flecha==flecha_izq){
        flecha_izq.style.display="none";
        botones_principal.style.display="none";
        botones_baño.style.display="block";
        document.body.style.backgroundImage=`url('../imagenes/Salon_bano0000.png')`;
        salon-=1;
        break;
      }
      else{
        flecha_drc.style.display="none";
        botones_principal.style.display="none";
        botones_cocina.style.display="block";
        document.body.style.backgroundImage=`url('../imagenes/salon_cocina0000.png')`;
        salon+=1;
        break;
      }
    case 2:
      flecha_drc.style.display="block";
      botones_cocina.style.display="none";
      botones_principal.style.display="block";
      document.body.style.backgroundImage=`url('../imagenes/salon_principal0000.png')`;
      salon-=1;
      break;
  }
}

var salon = 1;
//Flechas
const flecha_izq= document.getElementById("flecha_izq")
const flecha_drc= document.getElementById("flecha_drc")
flecha_izq.addEventListener("click",()=>{flecha(flecha_izq)})
flecha_drc.addEventListener("click",()=>{flecha(flecha_drc)})

//Botones_principal
const perro = document.getElementById("perro");
const velas = document.getElementById("velas");
const ventanas = document.getElementById("ventana");
const puerta_porche = document.getElementById("puerta_porche");

boton(perro,"perro");
boton(velas,"velas");
boton(ventanas,"ventanas");
puerta(puerta_porche,"salon_principal","album",botones_principal,0,()=>{cambio_habitación(botones_principal,porche,"porche")})

//Botones_baño
const Gatera = document.getElementById("Gatera");
const puerta_baño= document.getElementById("puerta_baño");
const puerta_habitacion= document.getElementById("puerta_habitación");

boton(Gatera,"Gatera");
function funcion_puerta_baño(){puerta(puerta_baño,"Salon_bano","introduccion",botones_principal,0,()=>{cambio_habitación(botones_baño,baño,"baño"); globo()})}
funcion_puerta_baño()
puerta(puerta_habitacion,"salon_baño","habitacion",botones_principal,2)

//Botones_cocina
const television = document.getElementById("televisión");
const puerta_cocina= document.getElementById("puerta_cocina");

boton(television,"television_botón",tele);
puerta(puerta_cocina,"salon_cocina","cocina",botones_principal)

//Div_television

const div_television = document.getElementById("television_div");
const posterior = document.getElementById("posterior");
const play = document.getElementById("play");
const anterior = document.getElementById("anterior");
const atras = document.getElementById("atrás");
const video = document.getElementById("video");

const videos=["web-EA","web-TecWeb","stop-motion","sintetizador"]
var a =0;

posterior.addEventListener("click",()=>{
  a+=1;
  if (a>videos.length -1){
    a=0;
  }
  video.src=`../videos/${videos[a]}.mp4`
})

anterior.addEventListener("click",()=>{
  a-=1;
  if (i<0){
    a=videos.length - 1;
  }
  video.src=`../videos/${videos[a]}.mp4`
})

play.addEventListener("click",()=>{
  if (video.paused){
    video.play();
  }
  else {
    video.pause();
  }
})

atras.addEventListener("click",()=>{cambio_habitación(div_television,botones_cocina,"salon_cocina",true)})


function tele(){
  botones_cocina.style.display='none';
  flechas.style.display='none';
  document.body.style.backgroundImage=`url('../imagenes/television0000.png')`;
  div_television.style.display='block';

}

function cambio_habitación(habitacion_anterior,habitacion_actual,imagen,principal,borrado=null){
  habitacion_anterior.style.display='none';
  if (principal){
    flechas.style.display='block';
  }else{
  flechas.style.display='none';}
  document.body.style.backgroundImage=`url('../imagenes/${imagen}0000.png')`;
  habitacion_actual.style.display='block';
  if (borrado){
    borrado()
  }
}

//baño
const baño = document.getElementById("baño");
const atras_2 = document.getElementById("atrás_2");
var i =0;

atras_2.addEventListener("click",()=>{cambio_habitación(baño,botones_baño,"Salon_bano",true,funcion_puerta_baño)})

//globo baño
const canva_globo = {
  canva: document.getElementById("canva_globo"), //obtienes el canva de la pag web;
  contexto: null,
  sprite: new Image(),
  frameWidth:962,
  frameHeight:500,
  totalFrames: 12,
  currentFrame: 0,
  playing:false,
  lastTime:0,
  fps:20,
  init() {
    this.contexto = this.canva.getContext("2d");
    this.sprite.src = "../animaciones/globo.png";
  }
}

canva_globo.init();
const parrafo1 = document.querySelector("p");
const texto_1 = `Quizás no vendría mal limpiar el baño...`;
function escribir(parrafo,texto,callback=null) {
  
  if (i < texto.length) {
    parrafo.textContent += texto[i];
    i++;

    // Pausa más larga al final de cada línea
    if (texto[i - 1] === '\n') {
      setTimeout(() => escribir(parrafo, texto,callback), 500);
    } else {
      setTimeout(() => escribir(parrafo, texto,callback), 80); // velocidad normal
    }
  }
  else{if(callback){callback();}}
}

function globo (){
  
    drawFrame(0, canva_globo);
    canva_globo.playing = true;
    canva_globo.currentFrame = 0;
    requestAnimationFrame((t) =>animate(t, canva_globo, false,false, () => {
    parrafo1.style.display="block";
    escribir(parrafo1,texto_1)}))

}

video.pause()

//Porche

const atras_3 = document.getElementById("atras_3");
const camara = document.getElementById("camara");
atras_3.addEventListener("click",()=>{cambio_habitación(porche,botones_principal,"salon_principal")})

boton(camara,"camara",()=>{
  camara.style.display="none"
  canva_transicion.canva.style.display="block"
  drawFrame(0, canva_transicion);
  canva_transicion.playing = true;
  canva_transicion.currentFrame = 0;
  requestAnimationFrame((t) =>
            animate(t, canva_transicion, false,false,()=>{window.location.href = `../html/album.html`;})
    );}
  )
