import Phaser from 'phaser'

export default class Game extends Phaser.Scene {


    constructor (){
        super({ key: 'Game' })
    }

    preload (){
        //load plane image
        this.load.image('plane', '/assets/planeBlue1.png');
        //load coin image
        this.load.image('coin', '/assets/coinPlaceholder.png');
        //load cloud images
        for (let i=1;i<=9;i++){
            this.load.image('cloud'+i, '/assets/clouds/cloud'+i+'.png');
            
        }

        
        


        //animation

        this.load.spritesheet('suitcase', '../assets/animation/poziomo.png', { frameWidth: 595, frameHeight: 842, endFrame: 842 });


    }

    setup(){
        this.CLOUD_SPAWN_TIME = 500
        this.CLOUD_SPEED = 5
        this.COIN_SPAWN_TIME = 5000

    }

    create (){
        //plane
        this.physicsPlane = this.physics.add.image(400, window.innerHeight / 2, 'plane');
    
        //setup macros
        this.setup()

        //setup variables useful for clouds and coins

        this.lastTimeSpawnedCloud = 0;
        this.lastTimeSpawnedCoin = 0;
        this.clouds = this.add.group();
        this.coins = this.add.group();
        this.score=0;

        //coin overlapping

        this.physics.add.overlap(this.physicsPlane, this.coins, (A,B) =>{
            this.coins.remove(B);
            B.destroy()
            this.score++;
            console.log(this.score);            
        });
    

        //cloud setup
        for (let i=1;i<=27;i++){
            let y = (i%9)+1
            let cl = this.physics.add.image(100*y,100*y,'cloud'+y)
            this.clouds.add(cl)
            this.clouds.killAndHide(cl)
        }
    }

        


        //animation
//         var animConfig = {
//             key: 'open',
//             frames: this.anims.generateFrameNumbers('suitcase', { start: 0, end: 7, first: 7 }),
//             frameRate: 12
//         };

//         this.anims.create(animConfig);

//         var suitcase= this.add.sprite(400, 500, 'suitcase');
//         suitcase.anims.play('open').setScale(0.3);
    


    update(time,delta){
        this.respawnClouds()
        this.removeCloudsWhenOffScreen()
        this.respawnCoins();
        this.removeCoinsWhenOffScreen();

        if (this.planeOverlaps){
            this.physicsPlane.setVelocityX(-this.COLISION_SPEED)
        }else{
            this.physicsPlane.setVelocityX(0)
        }
        this.clouds.getChildren().forEach(el => el.x-=this.CLOUD_SPEED*(delta/(1000/60)))
    }

    respawnClouds(){
        if (this.time.now - this.lastTimeSpawnedCloud > this.CLOUD_SPAWN_TIME){
            this.lastTimeSpawnedCloud = this.time.now
            let x = window.innerWidth
            let y = (Math.random()*(window.innerHeight+400))-200
            let cl = this.clouds.getFirstDead(false, x, y)
            if (cl!==null){
                cl.x += cl.frame.width / 2
                cl.active=true
                cl.setVisible(true)
            }
        }
    }

    removeCloudsWhenOffScreen(){
        this.clouds.getChildren().forEach(el => {
            if (el.x + el.frame.width < 0){
                this.clouds.killAndHide(el)
            }
        })
    }

    respawnCoins(){
        if (this.time.now - this.lastTimeSpawnedCoin > this.COIN_SPAWN_TIME){
            this.lastTimeSpawnedCoin = this.time.now
            let x = window.innerWidth
            let y = Math.random()*window.innerHeight
            let coin = this.physics.add.image(x, y, 'coin')
            if (coin!==null){
                this.coins.add(coin)
                coin.setVelocityX(-250)
                coin.setScale(0.2)
                coin.x +=coin.frame.width / 2
                coin.setCircle(coin.frame.width/2)

                
            }
            
        }
    }

    removeCoinsWhenOffScreen(){
        this.coins.getChildren().forEach(el => {
            if (el.x + el.frame.width < 0){
                this.coins.remove(el)
                el.destroy()
            }
        })
    }
}

