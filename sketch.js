let walkSheet;

// 精靈圖設定
const TOTAL_FRAMES = 9;
const FRAME_WIDTH = 138;
const FRAME_HEIGHT = 198;

// 角色位置與移動速度
let playerX;
let playerY;
const speed = 5;

// 目前動畫影格
let currentFrame = 0;
let animationTimer = 0;
const animationSpeed = 6;

// 鍵盤狀態
let movingLeft = false;
let movingRight = false;

function preload() {
  // 請確認圖片路徑與檔名正確
  walkSheet = loadImage("walk/walk.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  // 灰色背景
  background(128, 128, 128);

  // 將角色放在畫面中央偏下方
  playerX = width / 2;
  playerY = height - FRAME_HEIGHT - 50;

  // 如果圖片背景是黑色，可以取消下面這行的註解來移除黑色
  // removeBlackBackground();
}

function draw() {
  background(128, 128, 128);

  // 根據按鍵移動角色
  if (movingRight) {
    playerX += speed;
  }

  if (movingLeft) {
    playerX -= speed;
  }

  // 限制角色不要超出畫面
  playerX = constrain(playerX, 0, width - FRAME_WIDTH);

  // 移動時播放動畫
  if (movingLeft || movingRight) {
    animationTimer++;

    if (animationTimer >= animationSpeed) {
      animationTimer = 0;

      // 動畫影格固定由左至右播放
      currentFrame++;

      if (currentFrame >= TOTAL_FRAMES) {
        currentFrame = 0;
      }
    }
  } else {
    // 未按鍵時停止播放
    currentFrame = 0;
    animationTimer = 0;
  }

  push();

  if (movingLeft) {
    // 左右鏡像
    translate(playerX + FRAME_WIDTH, playerY);
    scale(-1, 1);

    image(
      walkSheet,
      0,
      0,
      FRAME_WIDTH,
      FRAME_HEIGHT,
      currentFrame * FRAME_WIDTH,
      0,
      FRAME_WIDTH,
      FRAME_HEIGHT
    );
  } else {
    // 向右正常顯示
    image(
      walkSheet,
      playerX,
      playerY,
      FRAME_WIDTH,
      FRAME_HEIGHT,
      currentFrame * FRAME_WIDTH,
      0,
      FRAME_WIDTH,
      FRAME_HEIGHT
    );
  }

  pop();
}

// 按下鍵盤
function keyPressed() {
  if (keyCode === RIGHT_ARROW) {
    movingRight = true;
  }

  if (keyCode === LEFT_ARROW) {
    movingLeft = true;
  }
}

// 放開鍵盤
function keyReleased() {
  if (keyCode === RIGHT_ARROW) {
    movingRight = false;
  }

  if (keyCode === LEFT_ARROW) {
    movingLeft = false;
  }
}

// 瀏覽器視窗大小改變時，重新調整畫布
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);

  playerY = height - FRAME_HEIGHT - 50;
  playerX = constrain(playerX, 0, width - FRAME_WIDTH);
}