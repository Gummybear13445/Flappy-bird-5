var bg, bg_img;
var bird, bird_img;
var ground;
var ground, ground_img;
var pipe1, pipe1_img;
var pipe2, pipe2_img;
var pipesGroup;
var gameState = 1;
var gameOver, end_score;
var gameOver_img, end_score_img;
var dead;

function preload() {
  bg_img = loadImage("Background.png");
  bird_img = loadImage("Flappy Bird.png");
  ground_img = loadImage("Ground.png");
  pipe1_img = loadImage("Pipe1.png");
  pipe2_img = loadImage("pipe2.png");
  gameOver_img = loadImage("Gameover Flappy bird.png");
  end_score_img = loadImage("end_score.png");
  dead = loadImage("Dead_Flappybird.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  bg = createSprite(
    windowWidth / 2,
    windowHeight / 2,
    windowWidth,
    windowHeight
  );
  bg.addImage(bg_img);
  bg.scale = 2.7;

  pipesGroup = new Group();

  bird = createSprite(windowWidth / 2 - 200, windowHeight / 2, 10, 10);
  bird.addImage(bird_img);
  bird.scale = 0.27;

  ground = createSprite(windowWidth / 2, windowHeight + 270);
  ground.addImage(ground_img);
  ground.scale = 1.3;

  gameOver = createSprite(windowWidth / 2, windowHeight / 2 - 300);
  gameOver.addImage(gameOver_img);

  end_score = createSprite(windowWidth / 2, windowHeight / 2);
  end_score.addImage(end_score_img);

  bird.debug = true;
}

function draw() {
  background(0);

  if (gameState === 1) {
    if (bg.x < windowWidth - 1200) {
      bg.x = windowWidth / 2;
    }

    bg.velocityX = -3;

    if (keyDown("space")) {
      bird.velocityY = -10;
    }

    bird.velocityY = bird.velocityY + 1;

    if (bird.isTouching(pipesGroup) || bird.isTouching(ground)) {
      gameState = 0;
    }

    piping();

    ground.velocityX = -7;
    if (ground.x < windowWidth / 2) {
      ground.x = windowWidth / 2;
    }

    gameOver.visible = false;
    end_score.visible = false;
  } else if (gameState === 0) {
    bg.velocityX = 0;
    pipesGroup.setVelocityXEach(0);

    ground.velocityX = 0;

    gameOver.visible = true;
    end_score.visible = true;

    pipesGroup.destroyEach();

    bird.velocityY = 0;
    bird.x = windowWidth / 2 - 200;
    bird.y = windowHeight - 90;
    bird.addImage(dead);
  }

  drawSprites();
}

function piping() {
  if (frameCount % 100 === 0) {
    pipe1 = createSprite(width, 0, 10, 60);
    pipe2 = createSprite(width, windowHeight - 100);
    pipe2.x = pipe1.x;
    pipe1.addImage(pipe1_img);
    pipe2.addImage(pipe2_img);
    pipe1.velocityX = -3;
    pipe2.velocityX = -3;
    pipe1.scale = 5;
    pipe2.scale = 5;
    pipesGroup.add(pipe1);
    pipesGroup.add(pipe2);
    pipe1.debug = true;
    pipe2.debug = true;
  }
}
