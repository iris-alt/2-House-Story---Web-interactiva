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

//Divs
canva_transicion.init();
const botones=document.getElementById("botones")
const despacho=document.getElementById("despacho")
const radio=document.getElementById("radio")
const carta=document.getElementById("carta")

//Funciones animacion
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
        botones.style.display="block";
        document.body.style.backgroundImage=`url('../imagenes/habitación0000.png')`;
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

//Animación transicion inicio
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

//Funciones botones y puertas

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

function cambio_habitación(habitacion_anterior,habitacion_actual,imagen,principal,borrado=null){
  habitacion_anterior.style.display='none';
  if (principal){
    botones.style.display='block';
  }else{
  botones.style.display='none';}
  document.body.style.backgroundImage=`url('../imagenes/${imagen}0000.png')`;
  habitacion_actual.style.display='block';
  if (borrado){
    borrado()
  }
}


//Botones 
const radio_boton = document.getElementById("radio_boton");
const carta_boton = document.getElementById("carta_boton");
const atras_1 = document.getElementById("atras_1");
const puerta_despacho = document.getElementById("puerta_despacho");

boton(radio_boton,"radio_boton",()=>{cambio_habitación(botones,radio,"radio")});
boton(carta_boton,"carta_boton", ()=>{cambio_habitación(botones,carta,"carta")});
puerta(puerta_despacho,"habitación","despacho",botones,0,()=>{cambio_habitación(botones,despacho,"despacho")})

function atras (botones_, pagina=null){
  botones_.style.display='none';
  if (pagina){
    canva_transicion.canva.style.display="block"
    drawFrame(0, canva_transicion);
    canva_transicion.playing = true;
    canva_transicion.currentFrame = 0;
    requestAnimationFrame((t) =>
    animate(t, canva_transicion, false,false,()=>{window.location.href = `../html/salon.html`;})
  )} else{
    document.body.style.backgroundImage=`url('../imagenes/habitación0000.png')`;
    botones.style.display='block'
  }
}

atras_1.addEventListener("click",()=>{atras(botones,true)})

//Botones despacho
const atras_2 = document.getElementById("atras_2");

atras_2.addEventListener("click",()=>{atras(despacho)})

//botones carta
const atras_4 = document.getElementById("atras_4");

atras_4.addEventListener("click",()=>{atras(carta)})

//Botones radio
const anterior = document.getElementById("anterior");
const posterior= document.getElementById("posterior");
const play= document.getElementById("play");
const atras_3= document.getElementById("atras_3");
const nombre_cancion= document.getElementById("nombre_canción");
const url= document.getElementById("cancion");
const controles= document.getElementById("controles");

atras_3.addEventListener("click",()=>{atras(radio)})

const canciones=["Porfa","Te quiero","Imperfect for you","Tengo un pensamiento","Tu manta","Antes de morirme","Luces de tecno","Where is my husband!"]
var i =0;

posterior.addEventListener("click",()=>{
  i+=1;
  if (i>=canciones.length){
    i=0;
  }
  console.log(i);
  url.src=`../Canciones/${canciones[i]}.mp3`
  controles.load();                                     // recargar audio
  controles.play();  
  nombre_cancion.innerHTML=`${canciones[i]}`
})

anterior.addEventListener("click",()=>{
  i-=1;
  if (i<0){
    i=canciones.length-1;
  }
  console.log(i);
  url.src=`../Canciones/${canciones[i]}.mp3`
  controles.load();                                     // recargar audio
  controles.play();  
  nombre_cancion.innerHTML=`${canciones[i]}`
})

play.addEventListener("click",()=>{
    nombre_cancion.innerHTML=`${canciones[i]}`
  if (controles.paused){
    document.body.style.backgroundImage=`url('../imagenes/radio0000.png')`;
    controles.play();
  }
  else {
    document.body.style.backgroundImage=`url('../imagenes/radio0001.png')`;
    controles.pause();
  }
})







