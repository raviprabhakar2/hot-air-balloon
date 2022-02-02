var bg, bgImg
var bottomGround
var topGround
var balloon, balloonImg
 var gameState ="play"

function preload(){
bgImg = loadImage("assets/bg.png")

balloonImg = loadAnimation("assets/balloon1.png","assets/balloon2.png","assets/balloon3.png")
 birdImage = loadImage("assets/bird.png")
 coinImage = loadImage("assets/coin.png")
}

function setup(){  

//background image
bg = createSprite(165,485,1,1);
bg.addImage(bgImg);
bg.scale = 1.3
bg.x = bg.width /2;
bg.velocityX = -3;

//creating top and bottom grounds
bottomGround = createSprite(200,390,800,20);
bottomGround.visible = false;

topGround = createSprite(200,10,800,20);
topGround.visible = false;
      
//creating balloon     
balloon = createSprite(100,200,20,50);
balloon.addAnimation("balloon",balloonImg);
balloon.scale = 0.2;


birdGroup = new Group()
coinGroup = new Group()


}

function draw() {
  
  background("white");
 if(gameState=="play")  { 
   console.log(gameState)  
          //making the hot air balloon jump
          if(keyDown("space")) {
            balloon.velocityY = -10 ;
            console.log("jump")
          }
          //adding gravity
           balloon.velocityY = balloon.velocityY + 0.5;
   
           if (bg.x < 0){
            bg.x = bg.width/2;
          }
        
          spawnBirds();
          spawnCoins();
          if(balloon.isTouching(birdGroup)){
            gameState ="end"        
          }
        drawSprites();
 }
  if (gameState=="end"){
   text ("gameend",200,200)
 }
}


function spawnBirds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var bird = createSprite(400,120,40,10);
    bird.y = Math.round(random(80,120));
    bird.addImage(birdImage);
    bird.scale = 0.07;
    bird.velocityX = -3;
    
     //assign lifetime to the variable
    bird.lifetime = 200;
    
    //adjust the depth
    bird.depth = balloon.depth;
    balloon.depth = balloon.depth + 1;
    
    //add each cloud to the group
    birdGroup.add(bird);
  }
}

function spawnCoins() {
  //write code here to spawn the clouds
  if (frameCount % 110 === 0) {
    var coin= createSprite(400,120,10,10);
    coin.y = Math.round(random(70,150));
    coin.addImage(coinImage);
  coin.scale = 0.03;
    coin.velocityX = -3;
    coin.shapeColor = "yellow"
     //assign lifetime to the variable
    coin.lifetime = 200;
    
    //adjust the depth
    coin.depth = balloon.depth;
    balloon.depth = balloon.depth + 1;
    
    //add each cloud to the group
    coinGroup.add(coin);
  }
}