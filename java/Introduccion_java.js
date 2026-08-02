//Canvas
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

const canva_zapatillas = {
  canva: document.getElementById("canva_zapatillas"), //obtienes el canva de la pag web;
  contexto: null,
  sprite: new Image(),
  frameWidth:1100,
  frameHeight:900,
  totalFrames: 100,
  currentFrame: 0,
  playing:false,
  lastTime:0,
  fps:15,
  init() {
    this.contexto = this.canva.getContext("2d");
    this.sprite.src = "../animaciones/Spritesheet.png";
  }
}

//Elementos del DOM
const transicion_div=document.getElementById("transicion");
/*const zapas=document.getElementById("canva_zapatillas")*/
const div_texto1 = document.querySelector("#texto_1");
const parrafo1 = document.querySelector("#texto_1 p");
const introduccion = document.getElementById("introduccion");
//Textos
const texto_1 = `Estás volviendo a casa después de un largo
día de trabajo`;
//Inicialización de los canvas
canva_transicion.init();
canva_globo.init();
canva_zapatillas.init();

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
canva_transicion.sprite.onload = () => { //Cuando se cargue la imagen por primera vez
    drawFrame(42, canva_transicion);
    document.body.style.backgroundColor='#f2e9e4';
    canva_transicion.playing = true;
    canva_transicion.currentFrame = 42;

    drawFrame(0, canva_zapatillas);
    canva_zapatillas.canva.style.display="block";
    canva_zapatillas.playing = true;
    canva_zapatillas.currentFrame=0;
    
    requestAnimationFrame((t) =>
        animate(t, canva_zapatillas, true,false)
  );
  
    requestAnimationFrame((t) =>
        animate(t, canva_transicion, false,true, () => {
        //Se ejecuta cuando acaba la animación
        transicion_div.style.display = "none";
        
        div_texto1.style.display="block";
        drawFrame(0, canva_globo);
        canva_globo.playing = true;
        canva_globo.currentFrame = 0;
        requestAnimationFrame((t) =>animate(t, canva_globo, false,false, () => {
          parrafo1.style.display="block";
          escribir(parrafo1,texto_1,()=>{div_texto1.onclick= function(){ desaparecer(div_texto1);
            desaparecer(introduccion, ()=>{window.location.href = "../html/introduccion2.html";});}
          })
        }))
    })
  );

};


