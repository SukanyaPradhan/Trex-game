var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;

var cloud,cloud_image,obstacle, obs1,obs2,ons3,obs4,obs5,obs6,obs_group,cloud_group;

var score=0;
var gameOver_image,restart_image;

var PLAY = 1;
var END = 0;
var gameState= PLAY;

function preload(){
trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadAnimation("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  cloud_image = loadImage("cloud.png");
  
  obs1=loadImage("obstacle1.png");
  obs2=loadImage("obstacle2.png");
  obs3=loadImage("obstacle3.png");
  obs4=loadImage("obstacle4.png");
  obs5=loadImage("obstacle5.png");
  obs6=loadImage("obstacle6.png");
  
  gameOver_image=loadImage("gameOver.png");
  restart_image=loadImage("restart.png");
}

function setup() {
  createCanvas(600, 400);
  
  trex = createSprite(50,380,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided",trex_collided);
  trex.scale = 0.5;
  
  ground = createSprite(200,380,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -3;
  
  invisibleGround = createSprite(200,390,400,10);
  invisibleGround.visible = false;
  
  gameOver=createSprite(300,170);
  gameOver.addImage("gameover",gameOver_image);
  gameOver.visible=false;
  
  restart=createSprite(300,220);
  restart.addImage("restart",restart_image);
  restart.scale=0.5;
  restart.visible=false;
  
  cloud_group = new Group();
  obs_group = new Group();
}

function draw() {
  background(0);
  if(gameState === PLAY){
    
    score=score+1;
    
    if(keyDown("space") && trex.y > 340 ) {
    trex.velocityY = -10;
  } 
    trex.velocityY = trex.velocityY + 0.8

    if (ground.x < 0){
    ground.x = ground.width/2;
  }
  spawnObstacle();
  spawnClouds();
    
    if (obs_group.isTouching(trex)){
    gameState=END;
    }
    textSize(25);
    text("Score:" + score , 450, 50);
     }                           
  else if (gameState=== END){
    
    gameOver.visible=true;
    restart.visible=true;
        
    trex.velocityY=0;
    ground.velocityX=0;
    obs_group.setVelocityXEach(0);
    cloud_group.setVelocityXEach(0);
    trex.changeAnimation("collided", trex_collided );
    obs_group.setLifetimeEach(-1);
    cloud_group.setLifetimeEach(-1);
    
    if (mousePressedOver(restart)){
        reset();
        
        }
           
           }
  
  
  
  
  trex.collide(invisibleGround);
  
  
  drawSprites();
}

function spawnClouds(){
if(frameCount % 100 === 0){
 var cloud=createSprite(600,200,10,10);
 cloud.y=Math.round(random(50,300));
  cloud.addImage("cloud",cloud_image);
  cloud.velocityX=-4;
  cloud.lifetime=150;
  cloud_group.add(cloud);
}
}

function spawnObstacle(){
if (frameCount % 150 === 0 ){
  var obstacle=createSprite(600,360,10,10);
  obstacle.velocityX=-4;
  obstacle.scale=0.5;
var rand = Math.round(random(1,6));
switch(rand) {
  case 1: obstacle.addImage(obs1);
  break;
  case 2: obstacle.addImage(obs2);
  break;
  case 3: obstacle.addImage(obs3);
  break;
  case 4: obstacle.addImage(obs4);
  break;
  case 5: obstacle.addImage(obs5);
  break;
  case 6: obstacle.addImage(obs6);
  break;
  default:break;
  }
  obstacle.lifetime=150;
  obs_group.add(obstacle);
}
}
function reset(){
  
gameOver.visible=false;
restart.visible=false;
score=0;
gameState=PLAY;
obs_group.destroyEach();
cloud_group.destroyEach();
ground.velocityX=-3;
trex.changeAnimation("running",trex_running);
  
}