//Canvas
const canva_puerta = {
  canva: document.getElementById("canva_puerta"), //obtienes el canva de la pag web;
  contexto: null,
  sprite: new Image(),
  frameWidth:1500,
  frameHeight:695,
  totalFrames: 100,
  currentFrame: 0,
  playing:false,
  lastTime:0,
  fps:15,
  init() {
    this.contexto = this.canva.getContext("2d");
    this.sprite.src = "../animaciones/Puerta.png";
  }
}

const canva_transicion_amarilla = {
  canva: document.getElementById("canva_transicion"), //obtienes el canva de la pag web;
  contexto: null,
  sprite: new Image(),
  frameWidth:962,
  frameHeight:600,
  totalFrames: 23,
  currentFrame: 0,
  playing:false,
  lastTime:0,
  fps:15,
  init() {
    this.contexto = this.canva.getContext("2d");
    this.sprite.src = "../animaciones/Transicion_amarilla.png";
  }
}
//Elementos del DOM
const div_puerta = document.getElementById("div_puerta");

//Inicialización de los canvas
canva_puerta.init();
canva_transicion_amarilla.init();


function drawFrame(frame,canva_) { //Función que dibuja el frame en la imagen que coge como atributo el frame a dibujar
  const ctx= canva_.contexto;
  ctx.clearRect(0, 0, canva_.canva.width, canva_.canva.height); //Borra el frame anterior
  ctx.drawImage( //dibuja en la imagen el nuevo frame
    canva_.sprite, //Del sprite coge el frame
    frame * canva_.frameWidth, 0, canva_.frameWidth, canva_.frameHeight, // Recorte
    0, 0, canva_.frameWidth, canva_.frameHeight                   // Posición en canvas
  );
}

function animate(time, canva_, loop = true, reverse = false, onFinish = null, socorro=null) {
  if (!canva_.playing) return;

  const delta = (time - canva_.lastTime) / 1000;
  const frameTime = 1 / canva_.fps;

  if (delta >= frameTime) {
    if (reverse) {
      canva_.currentFrame--;
      canva_.lastTime = time;

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
          if (socorro) {
            window.location.href = "../html/entrada.html";

          }
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


function animacion_introduccion3(){
  drawFrame(0, canva_puerta);
  canva_puerta.playing=true;
  canva_puerta.totalFrames=41;
  requestAnimationFrame((t)=> animate(t,canva_puerta,false,false,function (){
    div_puerta.addEventListener("mouseenter",()=>{
        drawFrame(42,canva_puerta);
    });
    div_puerta.addEventListener("mouseleave",()=>{
        drawFrame(40,canva_puerta);
    });
    div_puerta.addEventListener("click",()=>{
        drawFrame(42,canva_puerta);
        canva_puerta.playing=true;
        canva_puerta.currentFrame=42;
        canva_puerta.totalFrames=100;
        
        requestAnimationFrame((t)=> animate(t,canva_puerta,false,false,()=>{
          window.location.href = "../html/entrada.html";}
          ));
    })
}
    ))
  };

animacion_introduccion3();

