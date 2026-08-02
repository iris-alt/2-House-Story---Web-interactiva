const canva_llave = {
  canva: document.getElementById("spriteCanvas"), //obtienes el canva de la pag web;
  contexto: null,
  sprite: new Image(),
  frameWidth:962,
  frameHeight:680,
  totalFrames: 100,
  currentFrame: 0,
  playing:false,
  lastTime:0,
  fps:45,
  init() {
    this.contexto = this.canva.getContext("2d");
    this.sprite.src = "animaciones/llave.png";
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
    this.sprite.src = "animaciones/Transicion.png";
  }
}

transicion_div=document.getElementById("transicion")
canva_llave.init();
canva_transicion.init();

// Espera a que la imagen de transición se cargue antes de usarla


canva_llave.sprite.onload = () => { //Cuando se cargue la imagen por primera vez
  // Al cargar la imagen, dibuja el primer frame por defecto
  drawFrame(0,canva_llave); //El primer frame
};

function drawFrame(frame,canva_) { //Función que dibuja el frame en la imagen que coge como atributo el frame a dibujar
  const ctx= canva_.contexto;
  ctx.clearRect(0, 0, canva_.canva.width, canva_.canva.height); //Borra el frame anterior
  ctx.drawImage( //dibuja en la imagen el nuevo frame
    canva_.sprite, //Del sprite coge el frame
    frame * canva_.frameWidth, 0, canva_.frameWidth, canva_.frameHeight, // Recorte
    0, 0, canva_.frameWidth, canva_.frameHeight                   // Posición en canvas
  );
}

function animate(time, canva_, loop = true, onFinish = null) {
  if (!canva_.playing) return;

  const delta = (time - canva_.lastTime) / 1000;
  const frameTime = 1 / canva_.fps;

  if (delta >= frameTime) {
    canva_.currentFrame++;
    canva_.lastTime = time;

    // Si ya llegó al último frame:
    if (canva_.currentFrame >= canva_.totalFrames) {
      if (!loop) {
        canva_.currentFrame = canva_.totalFrames - 1;
        drawFrame(canva_.currentFrame, canva_);
        canva_.playing = false;

        // Ejecuta la función final si existe
        if (onFinish) onFinish();
        return;
      } else {
        canva_.currentFrame = 0;
        canva_.lastTime = time;
      }
    }
  }

  drawFrame(canva_.currentFrame, canva_);

  // Continuar la animación
  requestAnimationFrame((t) => animate(t, canva_, loop, onFinish));
}



canva_llave.canva.addEventListener("mouseenter", () => {//cuando el ratón entra al canva
  canva_llave.playing = true;//activa la animación
  canva_llave.currentFrame = 0; //lo empieza en el frame 0
  requestAnimationFrame((t) => animate(t, canva_llave,true)); //inicia el bucle de la animación
});

canva_llave.canva.addEventListener("mouseleave", () => {//cuando el ratón sale del canva
  canva_llave.playing = false;//desactiva la animación
  canva_llave.currentFrame = 0;//vuelve a poner el frame inicial
  drawFrame(0,canva_llave); // Mostrar el primer frame al salir del hover
});




canva_llave.canva.onclick = function () {
  transicion_div.style.display = "block";
  
  canva_transicion.playing = true;
  canva_transicion.currentFrame = 0;
  drawFrame(0, canva_transicion);

  requestAnimationFrame((t) =>
    animate(t, canva_transicion, false, () => {
      //Se ejecuta cuando acaba la animación
      window.location.href = "html/introduccion.html";
    })
  );
};



