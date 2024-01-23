var car,carImage,carImage2
var player,allPlayers
var obstacles
var background,backgroundImage,bg,bg2
var bullet,bullets
var fuel,fuelImage,fuleBox,fuelAmount,fuelBoxIcon
var life,lifeBox1,lifeBox2,lifeBox3,lifeAmount,lifeBoxIcon,lifeImage
var track
var gameState = 1
var allGameObjects,obstaclesGroup
var bullet,bullet1,bullet2,bulletImage,bulletGroup,bulletAmount,bulletAmountDisplay
var gun1,gun2,gunImage
var finishLineBlock,finishLineBlockImage
var gameDifficulty,gameDifficultyInput
var score,playBox,playBoxImage
var roadBlock1,roadBlock2,roadBlock1Image,roadBlock2Image
var car3,car3Image,car4,car4Image,car2Image
var obstacle1,obstacle1Image,obstacle2,obstacle2Image




function preload(){
  carImage = loadImage("assets/carWar.png")
  gunImage = loadImage("assets/gun1.png")
  backgroundImage = loadImage("assets/background1.png")
  fuelImage = loadImage("assets/fuel.png")
  bulletImage = loadImage("assets/bullet.png")
  carImage2 = loadAnimation("assets/car2.png")
  car2Image = loadImage("assets/car2.png")
  finishLineBlockImage = loadImage("assets/finishline.png")
  playBoxImage = loadImage("assets/playButton.png")
  roadBlock1Image = loadImage("assets/roadblock.png")
  roadBlock2Image = loadImage("assets/cone.png")
  car3Image = loadImage("assets/car3.png")
  car4Image = loadImage("assets/car4.png")
  obstacle1Image = loadImage("assets/cone.png")
  obstacle2Image = loadImage("assets/roadblock.png")
  playBoxImage = loadImage("assets/playButton.png")
  
}

function setup() {
  createCanvas(windowWidth,windowHeight);

  gameState = "play"
 
  obstaclesGroup =  new Group()

  bulletGroup = new Group()

  lifeAmount = 4

  

  bulletAmount = 100

 

  
  if(gameState =="play"||gameState == "win"){
    backGround()
  }
  
  gameDifficulty = 1
  
  
 
  



  bullets = createImg("assets/shoot.png")
  bullets.position(1400,500)
  bullets.size(150,150)
  bullets.mouseClicked(gunShoot)
  
  car = createSprite(windowWidth/2,windowHeight-40,20,20)
  car.addImage("car",carImage)
  car.addAnimation("car2",carImage2)
  
  gun1 = createSprite(car.x+5,car.y,20,20)
  gun1.addImage("gun",gunImage)

  gun2 = createSprite(car.x+5,car.y,20,20)
  gun2.addImage("gun",gunImage)

  finishLineBlock = createSprite(windowWidth/2,-windowHeight*3*gameDifficulty,windowWidth + 600,50)
  finishLineBlock.addImage("finishline",finishLineBlockImage)
  finishLineBlock.scale = 4
  
  
  
}

function draw() {
  background("black");
   
  gun1.x = car.x + 30
  gun1.y = car.y - 30
  gun1.scale = 1.5

 

  
  gun2.x = car.x - 35
  gun2.y = car.y - 30
  gun2.scale = 1.5

  

  if(gameState ="play"){
    playerMovements()
  }


  if(gameState == "play"/*||gameState =="win"*/){

  spawnObstacles()
  play()
  lives()
  backgroundMovements()
  

  }

  if(gameState == "win"){
    console.log("something")

  }


  /*if(gameState == "titleScreen"){
    console.log(gameState)
    startScreen()

  }*/



  
  drawSprites();
  if(car.x == 50){
    car.x = 50
  }

  if(car.x == 1400){
    car.x = 1400
  }

  
  

  //console.log(finishLineBlock.y)
  //console.log(lifeBoxIcon.position.x)
  //console.log(car.position.x)
  console.log(lifeAmount)

  //bulletAmountDisplay = createSprite(200,car.y - 200,5*bulletAmount,50)
  
}

function playerMovements(){
  if(keyIsDown(LEFT_ARROW)||keyIsDown(65)&&car.x>=50){
    car.position.x = car.position.x - 10
  }
  if(keyIsDown(RIGHT_ARROW)||keyIsDown(68)&&car.x<=1400){
    car.position.x = car.position.x + 10
  }
  if(keyIsDown(UP_ARROW)||keyIsDown(87)){
    car.position.y = car.position.y - 10
    bg.position.y = bg.position.y + 10
    bg2.position.y = bg2.position.y + 10
    finishLineBlock.y = finishLineBlock.y+10
  }
  if(keyIsDown(DOWN_ARROW)||keyIsDown(83)){
    car.position.y = car.position.y + 10
    bg.position.y = bg.position.y - 10
    bg2.position.y = bg2.position.y - 10
    finishLineBlock.y = finishLineBlock.y - 10
  }

  

  
}

function play(){
 //camera.position.y = car.position.y

 //console.log(windowHeight)

 
 

 allGameObjects = new Group()

 

 

 if(car.y<=windowHeight/2 + 200){
  car.y = windowHeight/2+200
  background.velocitY = -10
  
 }

 if(car.isTouching(obstaclesGroup)){
  car.changeAnimation("car2")
  lifeAmount = lifeAmount-1 

 }

 if(obstaclesGroup.isTouching(bulletGroup)){
  //obstaclesGroup.destroyEach()
  for(var i=0;i<obstaclesGroup.length;i++){     
      
    if(obstaclesGroup[i].isTouching(bulletGroup)){
         obstaclesGroup[i].destroy()
         } 
   }
 }

 if(finishLineBlock.isTouching(car)){
  text("you win",1200,600)
  gameState = "win"
 }


}

function spawnObstacles(){
  if(frameCount*gameDifficulty % 60 == 0){
  var randX = Math.round(random(windowWidth - windowWidth + 400,windowWidth - 400))
  
  var randSize = Math.round(random(10,60))
  obstacles = createSprite(randX,-100,randSize,randSize)

  var rand = Math.round(random(1,3))
  switch(rand){
    case 1:obstacles.addImage(car3Image);
    break;

    case 2:obstacles.addImage(car4Image);
    break;

    case 3:obstacles.addImage(car2Image)
    break;
  }
  obstacles.velocityY = 10
  obstacles.lifetime = 400
  obstacles.debug = false

  if(obstacles.y>2000){
    obstacles.destroy()
  }
  
  obstaclesGroup.add(obstacles)


  }
}

function gunShoot(){
  bullet1 = createSprite(gun1.x,gun1.y,50,50)
  bullet1.addImage("bullet",bulletImage)
  bullet1.scale = 0.1
  bullet1.velocityY = -60

  bullet2 = createSprite(gun2.x,gun2.y,50,50)
  bullet2.addImage("bullet",bulletImage)
  bullet2.scale = 0.1
  bullet2.velocityY = -60
  
  bulletGroup.add(bullet1)
  bulletGroup.add(bullet2)

  bulletAmount-= 2
}

function backGround(){
  bg = createSprite(windowWidth/2,windowHeight/2,windowWidth,windowHeight)
  bg.addImage("background",backgroundImage)
  bg.scale = 8

  bg2 = createSprite(windowWidth/2,windowHeight/2 - 800,windowWidth,windowHeight)
  bg2.addImage("background",backgroundImage)
  bg2.scale = 8

 
}

function backgroundMovements(){
  
  if(bg.y >= 600){
    bg.y = windowHeight/2
  }
  
  if(bg2.y >= 350){
    bg2.y = windowHeight/2 - 500
  }

  
}

function lives(){

  if(lifeAmount>=1){
  lifeBoxIcon = createImg("assets/life.png")
  lifeBoxIcon.position(50,200)
  lifeBoxIcon.size(100,100)
  lifeBoxIcon.depth = bg.depth
  lifeBoxIcon.depth += 1
  }
  if(lifeAmount>=2){
  lifeBox2 = createImg("assets/life.png")
  lifeBox2.position(50,600)
  lifeBox2.size(100,100)
  lifeBox2.depth = bg.depth
  lifeBox2.depth += 1
  }
  if(lifeAmount>=3){
  lifeBox3 = createImg("assets/life.png")
  lifeBox3.position(50,400)
  lifeBox3.size(100,100)
  lifeBox3.depth = bg.depth
  lifeBox3.depth += 1
  }

}

function startScreen(){
  playBox = createImg("assets/playButton.png")
  playBox.position(windowWidth/2 - 300,windowHeight/2)
  playBox.size(500,300)
  playBox.mouseClicked(changeState)

}

function changeState(){
  gameState = "play"
}

