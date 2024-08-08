<template>
  <div ref="background" class="background">
    <canvas ref="canvas"></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const STAR_COLOR = '#fff';
const STAR_SIZE = 3;
const STAR_MIN_SCALE = 0.2;
const OVERFLOW_THRESHOLD = 50;
const STAR_COUNT = (window.innerWidth + window.innerHeight) / 8;

const canvas = ref(null);
let context;
let scale = 1;
let width;
let height;
let stars = [];
let pointerX;
let pointerY;
let velocity = { x: 0, y: 0, tx: 0, ty: 0, z: 0.0009 };
let touchInput = false;

const generate = () => {
  for (let i = 0; i < STAR_COUNT; i++) {
    stars.push({
      x: 0,
      y: 0,
      z: STAR_MIN_SCALE + Math.random() * (1 - STAR_MIN_SCALE),
    });
  }
};

const placeStar = (star) => {
  star.x = Math.random() * width;
  star.y = Math.random() * height;
};

const recycleStar = (star) => {
  let direction = 'z';
  let vx = Math.abs(velocity.x);
  let vy = Math.abs(velocity.y);

  if (vx > 1 || vy > 1) {
    let axis;
    if (vx > vy) {
      axis = Math.random() < vx / (vx + vy) ? 'h' : 'v';
    } else {
      axis = Math.random() < vy / (vx + vy) ? 'v' : 'h';
    }
    if (axis === 'h') {
      direction = velocity.x > 0 ? 'l' : 'r';
    } else {
      direction = velocity.y > 0 ? 't' : 'b';
    }
  }

  star.z = STAR_MIN_SCALE + Math.random() * (1 - STAR_MIN_SCALE);

  if (direction === 'z') {
    star.z = 0.1;
    star.x = Math.random() * width;
    star.y = Math.random() * height;
  } else if (direction === 'l') {
    star.x = -OVERFLOW_THRESHOLD;
    star.y = height * Math.random();
  } else if (direction === 'r') {
    star.x = width + OVERFLOW_THRESHOLD;
    star.y = height * Math.random();
  } else if (direction === 't') {
    star.x = width * Math.random();
    star.y = -OVERFLOW_THRESHOLD;
  } else if (direction === 'b') {
    star.x = width * Math.random();
    star.y = height + OVERFLOW_THRESHOLD;
  }
};

const resize = () => {
  scale = window.devicePixelRatio || 1;
  width = window.innerWidth * scale;
  height = window.innerHeight * scale;
  canvas.value.width = width;
  canvas.value.height = height;
  stars.forEach(placeStar);
};

const step = () => {
  context.clearRect(0, 0, width, height);
  update();
  render();
  requestAnimationFrame(step);
};

const update = () => {
  velocity.tx *= 0.96;
  velocity.ty *= 0.96;
  velocity.x += (velocity.tx - velocity.x) * 0.8;
  velocity.y += (velocity.ty - velocity.y) * 0.8;

  stars.forEach((star) => {
    star.x += velocity.x * star.z;
    star.y += velocity.y * star.z;
    star.x += (star.x - width / 2) * velocity.z * star.z;
    star.y += (star.y - height / 2) * velocity.z * star.z;
    star.z += velocity.z;

    if (
      star.x < -OVERFLOW_THRESHOLD ||
      star.x > width + OVERFLOW_THRESHOLD ||
      star.y < -OVERFLOW_THRESHOLD ||
      star.y > height + OVERFLOW_THRESHOLD
    ) {
      recycleStar(star);
    }
  });
};

const render = () => {
  stars.forEach((star) => {
    context.beginPath();
    context.lineCap = 'round';
    context.lineWidth = STAR_SIZE * star.z * scale;
    context.globalAlpha = 0.5 + 0.5 * Math.random();
    context.strokeStyle = STAR_COLOR;
    context.beginPath();
    context.moveTo(star.x, star.y);
    let tailX = velocity.x * 2;
    let tailY = velocity.y * 2;
    if (Math.abs(tailX) < 0.1) tailX = 0.5;
    if (Math.abs(tailY) < 0.1) tailY = 0.5;
    context.lineTo(star.x + tailX, star.y + tailY);
    context.stroke();
  });
};

const movePointer = (x, y) => {
  if (typeof pointerX === 'number' && typeof pointerY === 'number') {
    let ox = x - pointerX;
    let oy = y - pointerY;
    velocity.tx = velocity.tx + (ox / 8) * scale * (touchInput ? 1 : -1);
    velocity.ty = velocity.ty + (oy / 8) * scale * (touchInput ? 1 : -1);
  }
  pointerX = x;
  pointerY = y;
};

const onMouseMove = (event) => {
  touchInput = false;
  movePointer(event.clientX, event.clientY);
};

const onTouchMove = (event) => {
  touchInput = true;
  movePointer(event.touches[0].clientX, event.touches[0].clientY, true);
  event.preventDefault();
};

const onMouseLeave = () => {
  pointerX = null;
  pointerY = null;
};

onMounted(() => {
  context = canvas.value.getContext('2d');
  generate();
  resize();
  step();
  window.addEventListener('resize', resize);
  canvas.value.addEventListener('mousemove', onMouseMove);
  canvas.value.addEventListener('touchmove', onTouchMove);
  canvas.value.addEventListener('touchend', onMouseLeave);
  document.addEventListener('mouseleave', onMouseLeave);
});

onUnmounted(() => {
  // 
  window.removeEventListener('resize', resize);
  if (canvas.value) {
    canvas.value.removeEventListener('mousemove', onMouseMove);
    canvas.value.removeEventListener('touchmove', onTouchMove);
    canvas.value.removeEventListener('touchend', onMouseLeave);
    document.removeEventListener('mouseleave', onMouseLeave);
  }
  
});
</script>

<style lang="scss" >

.background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: -1; /* 确保背景在所有内容的后面 */
  overflow: hidden;
  // background-image: linear-gradient(-225deg, #231557 0%, #43107a 29%, #ff1361 100%);
  background-image: linear-gradient(-225deg, #5944a4 0%, #9770c2 29%, #e098b0 100%);
  // z-index: -2;
  // pointer-events: auto; /* 重新启用鼠标事件 */
  // pointer-events: none; /* 背景不接收鼠标事件 */

  canvas {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    // z-index: 2;
    pointer-events: auto;
  }
}

</style>