var climber, climberImage, climberGroup;

var invisibleBlock, invisibleBlockGroup;

var tower, towerImage;

var door, doorImage, doorGroup;

var ghost, ghostImage;

var PLAY = 1;

var END = 0;

var gameState = PLAY;

function preload() {
  climberImage = loadImage("climber.png");

  doorImage = loadImage("door.png");

  towerImage = loadImage("tower.png");

  ghostImage = loadImage("ghost-standing.png");
}

function setup() {
  createCanvas(600, 600);

  tower = createSprite(300, 300, 0, 0);
  tower.addImage("tower", towerImage);

  ghost = createSprite(300, 300, 0, 0);
  ghost.addImage("GHOST", ghostImage);
  ghost.scale = 0.4;

  doorGroup = new Group();

  climberGroup = new Group();

  invisibleBlockGroup = new Group();
}

function draw() {
  background("black");


  if (gameState === PLAY) {


    if (keyDown("space")) {
      ghost.velocityY = -12;
    }
    ghost.velocityY = ghost.velocityY + 0.5;

    if (keyDown("a")) {
      ghost.x = ghost.x - 10;
    }
    if (keyDown("d")) {
      ghost.x = ghost.x + 10;
    }

    tower.velocityY = 2;

    if (tower.y > 600) {
      tower.y = 0;
    }
    if (climberGroup.isTouching(ghost)) {
      ghost.velocityY = 0;
    }
    if (invisibleBlockGroup.isTouching(ghost) || ghost.y >  600) {
      ghost.destroy();
      gameState = END;
    }

    SpawnDoors();

    drawSprites();

  }
  if (gameState === END) {
    stroke("yellow");
    fill("yellow");
    textSize(30);
    text("GAME OVER", 200, 300);
  }
}

function SpawnDoors() {
  if (frameCount % 150 === 0) {
    door = createSprite(300, -50, 0, 0);
    door.addImage("DOOR", doorImage);
    door.velocityY = 2;
    door.x = Math.round(random(150, 450));
    door.lifetime = 300;
    doorGroup.add(door);

    climber = createSprite(300, 0, 0, 0);
    climber.addImage("CLIMBER", climberImage);
    climber.velocityY = 2;
    climber.x = door.x;
    climber.lifetime = 300;
    climberGroup.add(climber);

    invisibleBlock = createSprite(300, 10, climber.width, 3);
    invisibleBlock.velocityY = 2;
    invisibleBlock.x = door.x;
    invisibleBlock.lifetime = 300;
    invisibleBlockGroup.add(invisibleBlock);
    invisibleBlock.debug = true;

    ghost.depth = door.depth;
    ghost.depth = ghost.depth + 1;
  }
}