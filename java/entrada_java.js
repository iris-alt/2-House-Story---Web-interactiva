//transiciones
const canva_transicion_amarilla = {
  canva: document.getElementById("canva_transicion_amarilla"), //obtienes el canva de la pag web;
  contexto: null,
  sprite: new Image(),
  frameWidth:962,
  frameHeight:600,
  totalFrames: 36,
  currentFrame: 0,
  playing:false,
  lastTime:0,
  fps:45,
  init() {
    this.contexto = this.canva.getContext("2d");
    this.sprite.src = "../animaciones/Transicion_amarilla.png";
  }
}
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

canva_transicion_amarilla.init();
canva_transicion.init();
const botones=document.getElementById("botones")

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
        botones.style.visibility="visible";
        puerta_sale();
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
    drawFrame(35, canva_transicion_amarilla);
    canva_transicion_amarilla.playing = true;
    canva_transicion_amarilla.currentFrame = 35;
    requestAnimationFrame((t) =>{
        animate(t, canva_transicion_amarilla, false,true,()=>{
            canva_transicion_amarilla.canva.style.display="none";
        })
    })

};




//Botones
const percha = document.getElementById("percha");
const jarron = document.getElementById("jarron");
const joyero = document.getElementById("joyero");
const puerta = document.getElementById("div_puerta");

function percha_entra(){
    percha.src="../imagenes/abrigo0001.png";
}
function percha_sale(){
    percha.src="../imagenes/abrigo0000.png";
}
function percha_click(){
    percha.removeEventListener("mouseenter",percha_entra)
    percha.removeEventListener("mouseleave",percha_sale)
    percha.src="../imagenes/abrigo0002.png";
}

percha.addEventListener("mouseenter",percha_entra)
percha.addEventListener("mouseleave",percha_sale)
percha.addEventListener("click",percha_click)

function jarron_entra(){
    jarron.src="../imagenes/jarron0001.png";
}
function jarron_sale(){
    jarron.src="../imagenes/jarron0000.png";
}
function jarron_click(){
    jarron.removeEventListener("mouseenter",jarron_entra)
    jarron.removeEventListener("mouseleave",jarron_sale)
    jarron.src="../imagenes/jarron0002.png";
}

jarron.addEventListener("mouseenter",jarron_entra)
jarron.addEventListener("mouseleave",jarron_sale)
jarron.addEventListener("click",jarron_click)

function joyero_entra(){
    joyero.src="../imagenes/joyero0001.png";
}
function joyero_sale(){
    joyero.src="../imagenes/joyero0000.png";
}
function joyero_click(){
    joyero.removeEventListener("mouseenter",joyero_entra)
    joyero.removeEventListener("mouseleave",joyero_sale)
    joyero.src="../imagenes/joyero0002.png";
}

joyero.addEventListener("mouseenter",joyero_entra)
joyero.addEventListener("mouseleave",joyero_sale)
joyero.addEventListener("click",joyero_click)

function puerta_entra(){
    document.body.style.backgroundImage="url('../imagenes/entrada0001.png')";
}
function puerta_sale(){
    document.body.style.backgroundImage="url('../imagenes/entrada0000.png')";
}
function puerta_click(){
    botones.style.display="none"
    puerta.removeEventListener("mouseenter",puerta_entra)
    puerta.removeEventListener("mouseleave",puerta_sale)
    canva_transicion.canva.style.display="block"
    drawFrame(0, canva_transicion);
    canva_transicion.playing = true;
    canva_transicion.currentFrame = 0;
    requestAnimationFrame((t) =>
        animate(t, canva_transicion, false,false,()=>{window.location.href = "../html/salon.html";})
  );
    
}

puerta.addEventListener("mouseenter",puerta_entra)
puerta.addEventListener("mouseleave",puerta_sale)
puerta.addEventListener("click",puerta_click)