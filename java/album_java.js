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
const fotos_1=document.getElementById("fotos_1")
const fotos_2=document.getElementById("fotos_2")
const fotos_3=document.getElementById("fotos_3")
const fotos_4=document.getElementById("fotos_4")
const fotos_5=document.getElementById("fotos_5")
const fotos_6=document.getElementById("fotos_6")
const flechas=document.getElementById("flechas")
const atras=document.getElementById("atrás")
const fotografias=document.getElementById("fotografias")

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
        //botones_principal.style.display="block";
        flechas.style.display="block";
        flecha()
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


function flecha (){
    if (fotos === 0) {
        flecha_drc.style.display="block";
        flecha_izq.style.display="none";
        fotografias.style.display="none";
        document.body.style.backgroundImage=`url('../imagenes/album0000.png')`;
        
         
    } 
    else if (fotos >= 1 && fotos <= grupo_fotos.length) {
        fotografias.style.display="block";
        flecha_drc.style.display="block";
        flecha_izq.style.display="block";
        grupo_fotos[fotos-1].style.display="block";
        if (fotos_ant>0 && fotos_ant <= grupo_fotos.length){
            grupo_fotos[fotos_ant-1].style.display="none";}
        if(fotos%2==0){
            document.body.style.backgroundImage=`url('../imagenes/album0001.png')`;
        }
        else{
            document.body.style.backgroundImage=`url('../imagenes/album0002.png')`;
        }
    } 
    else if (fotos === grupo_fotos.length + 1) {
            fotografias.style.display="none";
            flecha_drc.style.display="none";
            document.body.style.backgroundImage=`url('../imagenes/album0003.png')`;
            fotos=grupo_fotos.length+1;
    }
}

var fotos = 0;
var fotos_ant=0
var grupo_fotos= [fotos_1,fotos_2];
  //,fotos_3,fotos_4,fotos_5,fotos_6];
fotos = Math.max(0, Math.min(fotos, grupo_fotos.length + 1));

//Flechas
const flecha_izq= document.getElementById("flecha_izq")
const flecha_drc= document.getElementById("flecha_drc")
flecha_izq.addEventListener("click", () => {
  fotos_ant = fotos;
  fotos--;
  fotos = Math.max(0, fotos);
  flecha();
  console.log("fotos", fotos, "fotos ant", fotos_ant);
});

flecha_drc.addEventListener("click", () => {
  fotos_ant = fotos;
  fotos++;
  fotos = Math.min(grupo_fotos.length + 1, fotos);
  flecha();
  console.log("fotos", fotos, "fotos ant", fotos_ant);
});

function atras_click(){
        fotografias.style.display="none"
        canva_transicion.canva.style.display="block"
        drawFrame(0, canva_transicion);
        canva_transicion.playing = true;
        canva_transicion.currentFrame = 0;
        requestAnimationFrame((t) =>
            animate(t, canva_transicion, false,false,()=>{window.location.href = `../html/salon.html`;})
    )}

atras.addEventListener("click",atras_click)

