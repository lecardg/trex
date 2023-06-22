var score = 0
var PLAY=1
var END=0
var gameState=PLAY 
var trex ,trex_running;
function preload(){
  trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png");
groundimage = loadImage("ground2.png")
nuvemimagem = loadImage("cloud.png")
cactuimagem1 = loadImage("obstacle1.png")
cactuimagem2  = loadImage("obstacle2.png")
cactuimagem3 = loadImage("obstacle3.png")
cactuimagem4 = loadImage("obstacle4.png")
cactuimagem5 = loadImage("obstacle5.png")
trexcollided= loadAnimation("trex_collided.png")
gameover= loadImage("gameOver.png")
restart= loadImage("restart.png")
die= loadSound("die.mp3")
checkpoint= loadSound("checkPoint.mp3")
jump= loadSound("jump.mp3")
}

function setup(){
  createCanvas(600,200)
  score=0
  
  //crie um sprite de trex
  trex = createSprite(50,160,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided", trexcollided);
  trex.scale = 0.5
  ground = createSprite(300,190)
  ground.addImage(groundimage)

  invisibleground = createSprite(0,195,145,5)
  invisibleground.visible=false
  cactusgroup=new Group()
  nuvensgroup=new Group()
  gameover2=createSprite(width/2,height/2)
  restart2=createSprite(width/2,height/2+30)
  gameover2.addImage(gameover)
  restart2.addImage(restart)
  restart2.scale=0.5
}

function draw(){
  background("white")
  drawSprites();
  
  trex.collide(invisibleground)
  console.log(trex.y);
  text("score: "+score,500,50)
  
  if (gameState===PLAY){
    createClouds()
    createCactus()
    if (ground.x<0){
      ground.x=ground.width/2
  
    }
    if (keyDown("space") && trex.y>=169){
      trex.velocityY=-10
    jump.play()
    }
    trex.velocityY=trex.velocityY+0.5
    score=score+Math.round(getFrameRate()/60)
    if(cactusgroup.isTouching(trex)){ 
      die.play()
      gameState=END
    }
    gameover2.visible=false
    restart2.visible=false
    if (score>0&&score%300===0){
      checkpoint.play()
    }
    ground.velocityX = -(5+score/200)
  }
  else if (gameState===END){
ground.velocityX=0
cactusgroup.setVelocityXEach(0)
nuvensgroup.setVelocityXEach(0)
cactusgroup.setLifetimeEach(-1)
nuvensgroup.setLifetimeEach(-1)
trex.changeAnimation("collided", trexcollided);
gameover2.visible=true
restart2.visible=true
if (mousePressedOver(restart2)){
  resetar()

}
trex.velocityY=0

  }
}

function createClouds(){
  if (frameCount%80===0){
    var nuvem=createSprite(600,100)
    nuvem.velocityX=-5
    nuvem.addImage(nuvemimagem)
    nuvem.lifetime=170
    nuvem.y=Math.round(random(10,100))
    trex.depth=nuvem.depth
    trex.depth=trex.depth+1
    nuvensgroup.add(nuvem)
  }
}
function createCactus(){
  if (frameCount%60===0){
    var cactu=createSprite(600,170)
    cactu.velocityX=-(5+score/200)
    var r = Math.round(random(1,5))
    switch(r){
      case 1: cactu.addImage(cactuimagem1)
      break
      case 2: cactu.addImage(cactuimagem2)
      break
      case 3: cactu.addImage(cactuimagem3)
      break
      case 4: cactu.addImage(cactuimagem4)
      break
      case 5: cactu.addImage(cactuimagem5)
      break
    }
    cactu.scale=0.7
    cactu.lifetime=150
    cactusgroup.add(cactu)
  }
}
function resetar(){
gameState=PLAY
cactusgroup.destroyEach()
nuvensgroup.destroyEach()
trex.changeAnimation("running",trex_running)
score=0
}