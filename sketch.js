var rex,rex_run,bordas,solo,solo_run,collide_solo;
var nuvem,nuvem_image,obstacle,pontos,grupo_nuvens,grupo_obstacle;
var trex_colide;
var restart,restart_img,gameover,gameover_img;
var jump,die,checkpoint;

var PLAY = 0;
var END = 1;
var estadodejogo = PLAY;

function preload(){
  rex_run = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_colide = loadImage('trex_collided.png');
  solo_run = loadImage('ground2.png');
  nuvem_image = loadImage('cloud.png');
  obstacle1 = loadImage (' obstacle1.png');
  obstacle2 = loadImage (' obstacle2.png');
  obstacle3 = loadImage (' obstacle3.png');
  obstacle4 = loadImage (' obstacle4.png');
  obstacle5 = loadImage (' obstacle5.png');
  obstacle6 = loadImage (' obstacle6.png');
  restart_img = loadImage('restart.png');
  gameover_img = loadImage('gameOver.png');
  die = loadSound ('die.mp3');
  jump = loadSound ('jump.mp3');
  checkpoint = loadSound ('checkPoint.mp3');
  
}

function setup(){
  createCanvas(600,200);
  
  //sprite rex
  rex = createSprite(100,100,10,10);
  //animação rex correndo
  rex.addAnimation("running",rex_run);
  rex.addImage('lose',trex_colide);
  
  rex.scale = 0.5;
  rex.x = 50;
  
  //rex.setCollider('rectangle',50,0,30,rex.width,rex.height);
  //rex.debug= true;
  rex.setCollider('circle',0,0,40);
  
  colisao_solo = createSprite(300,198,600,15);
  colisao_solo.visible=false;

  solo = createSprite(300,190,600,20);
  solo.addImage('solo',solo_run);
  solo.x = solo.width / 2;
  
   gameover = createSprite(300,80,20,20);
   gameover.addImage(gameover_img);
  
  restart=createSprite(300,120,20,20);
  
  restart.addImage(restart_img);
  
  
  pontos = 0;
  
  grupo_nuvens = new Group();
  
  grupo_obstacle = new Group();
  
  
  //bordas do jogo
  bordas = createEdgeSprites();
  
}

function draw(){
  background('white');
  
  text('pontos:'+ pontos,500,20);
  
  
  
  if (estadodejogo===PLAY){
    
     pontos = pontos + Math.round(frameRate()/60);
    
    solo.velocityX = -(5+pontos/100);
    
    //Pulo rex
    if(keyDown("space") && rex.isTouching(solo)){
    rex.velocityY = -12;
      jump.play();
      } 
      if(solo.x<0){
    solo.x = solo.width / 2;
    }   
    
    if(pontos%100 === 0 && pontos>0){
      
      checkpoint.play();
      
    }
    
  //gravidade
   rex.velocityY = rex.velocityY + 0.8;
  
      
  nuvens();
  
  obstacle_();
    
      
     if (grupo_obstacle.isTouching(rex)){
       
       //rex.velocityY = -12;
       //jump.play();
      estadodejogo = END;
      die.play();
       
     }
    
    restart.visible = false;
    
    gameover.visible = false;
    
  }else if(estadodejogo===END){
    
     solo.velocityX = 0;
    
    rex.changeAnimation('lose',trex_colide);
    
    grupo_nuvens.setVelocityXEach(0);
    
    grupo_obstacle.setVelocityXEach(0);
    
    grupo_obstacle.setLifetimeEach(-1);
    
    grupo_nuvens.setLifetimeEach(-1); 
    
    rex.velocityY = 0;
    
    rex.velocityX = 0;
    
    restart.visible = true;
    
    gameover.visible = true;
    
    if(mousePressedOver(restart)){
    
    reset();
    
  }
    
  }
  
 
  
  //chão
  rex.collide (colisao_solo);
  
  
  
  drawSprites();
}
  
function reset(){
  
  estadodejogo = PLAY;
  restart.visible = false;
  gameover.visible = false;
  grupo_obstacle.destroyEach();
  grupo_nuvens.destroyEach();
  rex.changeAnimation("running",rex_run);
  pontos = 0;
}

function nuvens(){

  if (frameCount%70===0){
   
    nuvem = createSprite(600,80,10,10);
    nuvem.y = Math.round(random(10,110));
    nuvem.addImage(nuvem_image);
    nuvem.scale = 0.5;
    nuvem.velocityX = -2;
    rex.depth = nuvem.depth;
    rex.depth = rex.depth + 1;
    
    nuvem.lifetime = 310;
  grupo_nuvens.add(nuvem);
  }
  
}



function obstacle_(){
  
  //var randomFrame = Math.round(random(70,90));
  
  if (frameCount%80===0){
    
    obstacle = createSprite(600,180,20,20);
    obstacle.velocityX = -(5+pontos/500);
    obstacle.scale  = 0.5;
    
    
    var rand = Math.round(random(1,6));
    
    switch(rand){
        
      case 1 : obstacle.addImage(obstacle1);
        break;
        
        case 2 : obstacle.addImage(obstacle2);
        break;
        
        case 3 : obstacle.addImage(obstacle3);
        break;
        
        case 4 : obstacle.addImage(obstacle4);
        break;
        
        case 5 : obstacle.addImage(obstacle5);
        break;
        
        case 6 : obstacle.addImage(obstacle6);
        break;
        
        default : break;
    }
    
    obstacle.lifetime = 200;
  
    grupo_obstacle.add(obstacle);
  }
  
}