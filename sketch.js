var tower, towerImage;
var ghost, ghostImage;
var door, doorImg, doorGroup;
var climber, climberImg, climberGroup;
var block, blockGroup;
var gamestate = "play";
var sound;
var score = 0;

function preload(){
  towerImage = loadImage("tower.png");
  ghostImage = loadImage("ghost-standing.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  sound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600,600);
  
  //creating the tower
  tower = createSprite (300,300);
  tower.addImage("tower",towerImage);
  tower.velocityY = 1;
  
  //creating the ghost
  ghost = createSprite (300,300,20,20);
  ghost.addImage(ghostImage);
  ghost.scale = 0.3;
 
  //looping the sound
  //sound.loop();
  
  //making the groups
  doorGroup = new Group();
  climberGroup = new Group();
  blockGroup = new Group();
  
}


function draw() {
  background(0);
  
  if(gamestate === "play"){
    
  //making the tower infinite
  if(tower.y > 400){
    tower.y = 300;
  }
  
    //defining the score
  score = score + Math.round(getFrameRate()/60);
    
  //making the ghost go right
  if(keyDown(RIGHT_ARROW)){
    ghost.x = ghost.x + 3;
  }
  //making the ghost go left
  if(keyDown(LEFT_ARROW)){
    ghost.x = ghost.x - 3;
  }
  //making the ghost jump
  if(keyDown("space")){
    ghost.velocityY = -5;
  }
  
  //giving the ghost gravity
  ghost.velocityY = ghost.velocityY + 0.8;

  //lettting the ghost rest on the railing
  if(climberGroup.isTouching(ghost)){
    ghost.velocityY = 0;
  }
  
  
    
    
    
  //ending the game if the ghost falls or touches the rail from the bottom 
  if(blockGroup.isTouching(ghost)||ghost.y > 600){
    ghost.destroy();
    gamestate = "end";
  }

  spawnDoor();
  drawSprites();
    
    stroke("yellow");
    fill("yellow");
    textSize(10);
    text("score: "+ score, 50, 50);
    
  } else if (gamestate === "end"){
    stroke("yellow");
    fill("yellow");
    textSize(30);
    text("Game Over!", 230, 250);
    
  }

  
}

function spawnDoor(){
  
  if(frameCount % 250 === 0){
  //creating the door
  door = createSprite(200,-50);
  door.addImage(doorImg);
    climber = createSprite(200,10);
    climber.addImage(climberImg);
  door.x = random(120,400);
  door.velocityY = 1;
    climber.x = door.x;
    climber.velocityY = 1;
  door.lifetime = 600;
    climber.lifetime = 600;
    
  //creating the block
  block = createSprite(200,15);
  block.width = climber.width;
  block.height = 2;
  block.x = door.x;
  block.velocityY = 1;
  block.debug = true;
  
  //making the ghost in front of the door
  ghost.depth = door.depth;
  ghost.depth = ghost.depth+1;
    
  doorGroup.add(door);
    climberGroup.add(climber);
  blockGroup.add(block);
  }
 
}
