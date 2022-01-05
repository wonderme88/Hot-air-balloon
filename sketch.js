var obstacle1,obstacle2,obstacle3;
var balloon,sky;
var balloonImg,skyImg,goldCoinImg,goldCoin,silverCoin,silverCoinImg,goldCoinGroup,silverCoinGroup,obstacleGroup;
var upperEdge;
var goldCoinAud,silverCoinAud,obstacleAud;
var canv;
var trophy,trophyImg,trophy2,trophy2Img,trophy3,trophy3Img;
var heartImg
var lifes = 5;
var score = 0;
var gameState = "PLAY";



function preload(){
  obstacle1 = loadImage("./img/obstacle1.png");
  obstacle2 = loadImage("./img/obstacle2.png");
  obstacle3 = loadImage("./img/obstacle3.png");
  balloonImg = loadImage("./img/balloon.png");
  skyImg = loadImage("./img/sky2.jpg");
  goldCoinImg = loadImage("./img/goldcoin.png");
  silverCoinImg = loadImage("./img/silvercoin.png");
  trophyImg = loadImage("./img/trophy3.png");
  trophy2Img = loadImage("./img/trophy2.png");
  trophy3Img = loadImage("./img/trophy.png");
  heartImg = loadImage("./img/heart.png");
  goldCoinAud = loadSound("./audio/10points.mp3");
  silverCoinAud = loadSound("./audio/5points.mp3");
  obstacleAud = loadSound("./audio/lost.mp3");
 }


function setup(){
   canv = createCanvas(displayWidth,displayHeight-100);
  
  sky = createSprite(displayWidth/2,displayHeight/2);
  sky.addImage(skyImg);
  sky.x = sky.width/2;
  
  balloon = createSprite(200,displayHeight/2);
  balloon.addImage(balloonImg);
  balloon.scale = 0.4;
  //balloon.debug = true;
  balloon.setCollider("circle",0,-80,210)
 
  trophy = createSprite(displayWidth/3,50);
  trophy.addImage(trophyImg);
  trophy.scale = 0.4;
  trophy.visible = false;
  
  trophy2 = createSprite(displayWidth/2.5,50);
  trophy2.addImage(trophy2Img);
  trophy2.scale = 0.5;
  trophy2.visible = false;
  
  trophy3 = createSprite(displayWidth/2,50);
  trophy3.addImage(trophy3Img);
  trophy3.scale = 0.4;
  trophy3.visible = false;
  
    
  invisibleGround = createSprite(displayWidth/2,displayHeight-120,displayWidth,20);
  invisibleGround.visible = false;

  upperEdge = createSprite(displayWidth/2,20,displayWidth,20);
  upperEdge.visible = false;
  
  //creating groups
  obstacleGroup = new Group();
  goldCoinGroup = new Group();
  silverCoinGroup = new Group();

  //text commands
  fill("purple");
  textSize(20);
  
}

function draw(){
  background(0);
  
  
  if(gameState == "PLAY"){
   sky.velocityX = -(6+3*score/50);
    if (sky.x < displayWidth-sky.width/2){ 
      sky.x = sky.width/2;
    }
    
     //jump when the space key is pressed
    if(keyDown("space") ){
      balloon.velocityY = -12 ;
      
    }
  
    //add gravity
    balloon.velocityY = balloon.velocityY + 0.5;
    
   //spawning obstacles 
    spawnObstacles();
    spawnGoldCoins();
    spawnSilverCoins();
    
        
    //End the game when balloon is touching the obstacle
    
   if(obstacleGroup.isTouching(balloon)){
      obstacleAud.play();
      obstacleGroup.destroyEach();
      lifes = lifes-1;
             
   }
    //if(lifes === 0){
      //gameState = "END";
    //}

    if(goldCoinGroup.isTouching(balloon)){
       score = score+10;
      // goldCoinAud.autoplay(true);
       goldCoinAud.play();
       goldCoinGroup.destroyEach();
    }
    if(silverCoinGroup.isTouching(balloon)){
      score = score+5;
      silverCoinAud.play();
      silverCoinGroup.destroyEach();
   }
  
    if(score >= 50)
    {
      trophy.visible = true;
        
    }
    if(score >= 100)
    {
      trophy2.visible = true;
        
    }
    
    if(score >= 150)
    {
      trophy3.visible = true;
        
    }
  }
   
  else if(gameState == "END") {
    
    //set velcity of each game object to 0
    sky.velocityX = 0;
    balloon.velocityY = 0;
    

    //stonesGroup.setVelocityXEach(0);
    //bonesGroup.setVelocityXEach(0);
    
    //change the trex animation
    //trex.addAnimation(sadballoon);
    
    //set lifetime of the game objects so that they are never destroyed
    //bonesGroup.setLifetimeEach(-1);
    //stonesGroup.setLifetimeEach(-1);
    //chocolatesGroup.setLifetimeEach(-1);
    
  }
  
    //console.log(trex.y);
    balloon.collide(invisibleGround);
    balloon.collide(upperEdge);
    
    drawSprites();

    for (var i = 0; i < lifes; i++) {
      image(heartImg, 30 + (i * 70),50,40,40);
      }

    if (lifes === 0) {
       noLoop();
      textSize(60); // textFont(font); textStyle(BOLD); textAlign(CENTER); 
      fill(255);
      text('GAME OVER', displayWidth / 2-100, displayHeight / 2);
      gameState = "END";
     }

     textSize(20);
     fill("purple");
    text("Score: "+ score, displayWidth/2+400,50);
}
function spawnGoldCoins() {
  //write code here to spawn the bones
  if (frameCount % 120 == 0) {
    goldCoin = createSprite(displayWidth,50,10,10);
    goldCoin.y = Math.round(random(20,displayHeight-150));
    goldCoin.addImage(goldCoinImg);
    goldCoin.scale = 0.2;
    goldCoin.velocityX = -3;
    goldCoin.setCollider("rectangle",0,0,40,40);

    //goldCoin.debug = true;
    
     //assign lifetime to the variable
    goldCoin.lifetime = displayWidth/3;
        
    //add each bone to the group
    goldCoinGroup.add(goldCoin);
  
  }
 }

function spawnObstacles() {
  if (frameCount % 80 == 0) {
    var obstacle = createSprite(displayWidth,400,10,10);
    obstacle.y = Math.round(random(20,displayHeight-120));
    obstacle.velocityX = -(6+3*score/50);;
    obstacle.scale = 0.7;
    //obstacle.debug = true;
    
    var rand = Math.round(random(1,3));

    switch (rand) {
      case 1: obstacle.addImage(obstacle1)
              obstacle.scale = 0.3;
              obstacle.setCollider("circle",0,-25,225);
              break;
      case 2: obstacle.addImage(obstacle2)
              obstacle.setCollider("circle",-25,0,60);
              break;
      case 3: obstacle.addImage(obstacle3)
              obstacle.setCollider("circle",0,0,50);
              break;
      default:
        break;
    }
    
     //assign lifetime to the variable
     obstacle.lifetime = displayWidth/4;
        
    //add each bone to the group
    obstacleGroup.add(obstacle);
  }
 }
function spawnSilverCoins() {
  //write code here to spawn the bones
  if (frameCount % 150 == 0) {
    silverCoin = createSprite(displayWidth,50,40,10);
    silverCoin.y = Math.round(random(20,displayHeight-120));
    silverCoin.addImage(silverCoinImg);
    silverCoin.scale = 0.2;
    silverCoin.velocityX = -3;
    silverCoin.setCollider("rectangle",0,0,40,40);
    //silverCoin.debug = true;
    
     //assign lifetime to the variable
    silverCoin.lifetime = displayWidth/3;
        
    //add each bone to the group
    silverCoinGroup.add(silverCoin);
  }
  function deleteTrophy()
  {
    if(trophy!=null)
      trophy.destroy();
  }
 }

  
  


