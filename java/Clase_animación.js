class SpriteAnimation {
  constructor({ canvasId, src, frameWidth, frameHeight, totalFrames, fps = 30 }) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext("2d");

    this.sprite = new Image();
    this.sprite.src = src;

    this.frameWidth = frameWidth;
    this.frameHeight = frameHeight;
    this.totalFrames = totalFrames;
    this.fps = fps;

    this.currentFrame = 0;
    this.playing = false;
    this.lastTime = 0;

    this.sprite.onload = () => this.drawFrame(0);
  }

  drawFrame(frame) {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.drawImage(
      this.sprite,
      frame * this.frameWidth, 0, this.frameWidth, this.frameHeight,
      0, 0, this.frameWidth, this.frameHeight
    );
  }

  animate(time) {
    if (!this.playing) return;

    const delta = (time - this.lastTime) / 1000;
    const frameTime = 1 / this.fps;

    if (delta >= frameTime) {
      this.currentFrame++;
      if (this.currentFrame >= this.totalFrames) this.currentFrame = 0;
      this.lastTime = time;
    }

    this.drawFrame(this.currentFrame);
    requestAnimationFrame(this.animate.bind(this));
  }

  start() {
    if (!this.playing) {
      this.playing = true;
      this.currentFrame = 0;
      requestAnimationFrame(this.animate.bind(this));
    }
  }

  stop() {
    this.playing = false;
    this.currentFrame = 0;
    this.drawFrame(0);
  }
}