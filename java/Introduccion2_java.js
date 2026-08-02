//Canvas
const canva_cabeza = {
  canva: document.getElementById("canva_cabeza"), //obtienes el canva de la pag web;
  contexto: null,
  sprite: new Image(),
  frameWidth:962,
  frameHeight:600,
  totalFrames: 100,
  currentFrame: 0,
  playing:false,
  lastTime:0,
  fps:15,
  init() {
    this.contexto = this.canva.getContext("2d");
    this.sprite.src = "../animaciones/introduccion2.png";
  }
}

const canva_distraido = {
  canva: document.getElementById("canva_distraido"), //obtienes el canva de la pag web;
  contexto: null,
  sprite: new Image(),
  frameWidth:962,
  frameHeight:600,
  totalFrames: 120,
  currentFrame: 0,
  playing:false,
  lastTime:0,
  fps:20,
  init() {
    this.contexto = this.canva.getContext("2d");
    this.sprite.src = "../animaciones/distraido.png";
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

//Elementos del DOM
const introduccion2 = document.getElementById("introduccion2");
const p2 = document.getElementById("texto2");
const p3 = document.getElementById("texto3");

//Textos
const texto2= `No ha sido un buen día que se diga.`
const texto3= `Solo puedes pensar en las ganas que tienes de llegar a casa.`

//Inicialización de los canvas
canva_cabeza.init();
canva_distraido.init();
canva_transicion.init();

function desaparecer(elemento, final) {
  let opacidad = 1;

  let timer = setInterval(() => {
    opacidad -= 0.1;
    elemento.style.opacity = opacidad;

    if (opacidad <= 0) {
      clearInterval(timer);
      elemento.style.display = "none";
      if (final){
      final();}
    }
  }, 80); // velocidad de desvanecimiento
}


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

let i = 0;

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

function animacion_introduccion2_pt2(){
  drawFrame(0, canva_distraido);
  canva_distraido.playing=true;
  requestAnimationFrame((t)=> animate(t,canva_distraido,false,false));
  i=0;
  escribir(p3,texto3,()=>{
    document.addEventListener("click", function () { 
      drawFrame(0,canva_transicion);
      canva_transicion.playing=true;
      requestAnimationFrame((t)=> animate(t,canva_transicion,false,false, ()=>{
    window.location.href = "../html/introduccion3.html";}))
})})}
function animacion_introduccion2(){
  drawFrame(0, canva_cabeza);
  canva_cabeza.playing=true;
  setTimeout(()=>{requestAnimationFrame((t)=> animate(t,canva_cabeza,false,false,()=>{animacion_introduccion2_pt2()})),1000});
  i=0;
  setTimeout(()=>{escribir(p2,texto2)},2000)

}

animacion_introduccion2();

