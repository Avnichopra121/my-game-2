var player, obstacle1, obstacle2, obstacle3, ground;
var playerImg, obstacleImg, obstacle2Img, obstacle3Img, obstacle4Img, groundImg, bgImg;
var obstaclesGroup;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var score = 0;
var restart, restartImg, gameOverImg, gameOver;

function preload()
{
    playerImg = loadImage("player.png");
    obstacleImg = loadImage("obstacle1.png");
    obstacle2Img = loadImage("obstacle2.png");
    obstacle3Img = loadImage("obstacle3.png");
    obstacle4Img = loadImage("obstacle4.png");

    bgImg = loadImage("bg.jpg");

    restartImg = loadImage("restart.png");
    gameOverImg = loadImage("game.jpg");
}

function setup()
{
    createCanvas(1000,500)

    player = createSprite(200,400,55,55);
    player.addImage("player",playerImg);
    player.scale = 0.5;

    ground = createSprite(500,450,2000,10);
    ground.x = ground.width /2;
    ground.visible = false;

    obstaclesGroup = new Group();

    player.debug = false;
    player.setCollider("rectangle",0,0,100,200);

    restart = createSprite(500, 250, 10,10);
    restart.addImage(restartImg);
    restart.scale = 0.5;
    restart.visible = false;

    gameOver = createSprite(500, 180, 10,10);
    gameOver.addImage(gameOverImg);
    gameOver.scale = 0.09;
    gameOver.visible = false;
}

function draw()
{
    background(bgImg)

    if(gameState === PLAY)
    {
      ground.velocityX = -(4 + 3* score/100)
      score = score + Math.round(getFrameRate()/60);
      
       if (ground.x < 0)
       {
        ground.x = ground.width/2;
       }
      
       //jump when the space key is pressed
       if(keyDown("space")&& player.y >= 100)
       {
          player.velocityY = -12;
       }
      
       //add gravity
       player.velocityY = player.velocityY + 0.8
       player.collide(ground);
      
       if(obstaclesGroup.isTouching(player))
       {
          gameState = END;
       }
    }
     else if (gameState === END) 
     {     
        ground.velocityX = 0;
        player.velocityY = 0      
       
        //set lifetime of the game objects so that they are never destroyed
        obstaclesGroup.setLifetimeEach(-1);
  
        obstaclesGroup.setVelocityXEach(0);

        restart.visible = true;
        gameOver.visible = true;

        if(mousePressedOver(restart))
        {
            reset();
        }
     }

     noStroke();
     textSize(25);
     text("Score: " + score, 800,50);

    obstacles();

    drawSprites();
}

function obstacles()
{
    if(frameCount % 150 === 0)
    {
        var stone = createSprite(1000,430,10,10);
        stone.velocityX = -5;
        var rand = Math.round(random(1,4));
        switch(rand)
        {
            case 1: stone.addImage(obstacleImg);
            stone.scale = 0.5;
            break;
            case 2: stone.addImage(obstacle2Img);
            stone.scale = 0.2;
            break;
            case 3: stone.addImage(obstacle3Img);
            stone.scale = 0.3;
            break;
            case 4: stone.addImage(obstacle4Img);
            stone.velocityY = -5;
            stone.scale = 0.5;
            break;
        }

        obstaclesGroup.add(stone);
        stone.lifetime = 200;
    }
}

function reset()
{
    gameState = PLAY;
    obstaclesGroup.destroyEach();
    score = 0;
    restart.visible = false;
    gameOver.visible = false;
}