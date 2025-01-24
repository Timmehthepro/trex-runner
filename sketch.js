var trex, trexImg,trexCollideImg, cloud, cloudImg, obs, obs1, obs2 , obs3 , obs4, obs5, obs6, restart, restartImg, gameover, gameoverImg,ground, groundImg,cloudGroup,obsGroup
var jump, checkpoint, die
var gamestates="play"
var score=0







function preload(){
    trexImg=loadAnimation("assets/trex1.png" , "assets/trex3.png" , "assets/trex4.png" )
    trexCollideImg= loadAnimation("assets/trex_collided.png")
    cloudImg=loadImage("assets/cloud.png")
    obs1=loadImage("assets/obstacle1.png" )
    obs2=loadImage("assets/obstacle2.png" )
    obs3=loadImage("assets/obstacle3.png" )
    obs4=loadImage("assets/obstacle4.png" )
    obs5=loadImage("assets/obstacle5.png" )
    obs6=loadImage("assets/obstacle6.png" )
    restartImg=loadImage("assets/restart.png")
    gameoverImg=loadImage("assets/gameOver.png")
    jump=loadSound("assets/jump.mp3")
    checkpoint=loadSound("assets/checkPoint.mp3")
    die=loadSound("assets/die.mp3")
    groundImg=loadImage("assets/ground2.png")
}
function setup(){
    createCanvas(800,300)  
    ground=createSprite(400,270)
    ground.addImage(groundImg)
   
    trex=createSprite(90,265)
    trex.addAnimation("running", trexImg)
    trex.addAnimation("die", trexCollideImg)
    trex.scale=0.55

    restart=createSprite( 400,200)
    restart.addImage(restartImg)
    restart.scale=0.7
    
    gameover=createSprite(400,150)
    gameover.addImage(gameoverImg)
    gameover.scale=0.7

    cloudGroup=createGroup()
    obsGroup=createGroup()

    
}
function draw(){
    background("gray")

        
    trex.velocityY=trex.velocityY+0.7
    trex.collide(ground)

    drawSprites()
    textSize(18)
    fill ("black")
  
    text("score:"+score,710,30)
    
   
    
    if(gamestates=="play"){
        ground.velocityX=-(7+(score/50))
        restart.visible=false
        gameover.visible=false
        if(keyDown ("space") && trex.y>230 ){
            trex.velocityY=-13
            jump.play()
            
        } 
        if(ground.x<0){
            ground.x=ground.width/2
        }
        if (trex.isTouching(obsGroup)){
            die.play()
            gamestates="end"        
        }
        if(frameCount % 3 ==  0){
            score= score+1
        }

        if(score % 100==0 && score != 0){
            checkpoint.play()
        }
        spawnclouds()
        spawnobstacles()
        trex.changeAnimation("running", trexImg)
    }
    
    if(gamestates=="end"){
        ground.velocityX=0
        restart.visible=true
        gameover.visible=true
        trex.velocityY=0;
        cloudGroup.setVelocityXEach(0)
        obsGroup.setVelocityXEach(0)
        trex.changeAnimation("die", trexCollideImg)

        if (mousePressedOver(restart)){
            gamestates="play"
            obsGroup.destroyEach()
            cloudGroup.destroyEach()
            score=0
            
        }
    }
}


function spawnclouds(){

    if(frameCount % 50 == 0){
        cloud=createSprite(800,100)
        cloud.addImage(cloudImg)
        cloud.velocityX=- (7+(score/50))
        cloud.scale=random(0.4,0.8)
        cloud.y=random(100,150)
        trex.depth=cloud.depth+1
       cloudGroup.add(cloud)
    }



}
function spawnobstacles(){
    if( frameCount % 50 == 0){
        obstacle=createSprite(800,250)
        var r = Math.round(random(1,6))
        switch(r){
            case 1 : obstacle.addImage(obs1)
            break
            case 2 : obstacle.addImage(obs2)
            break
            case 3 : obstacle.addImage(obs3)
            break
            case 4 : obstacle.addImage(obs4)
            break
            case 5 : obstacle.addImage(obs5)
            break
            case 6 : obstacle.addImage(obs6)
            break 
            
        }
       obsGroup.add(obstacle)
        obstacle.scale=0.55
        obstacle.velocityX=-(7+(score/50)) 
    }
}


// BETA TESTING OF THE GAME
// add code to give trex AI so that game plays on its own
















































































































































