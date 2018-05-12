import Phaser from 'phaser'

export default class Game extends Phaser.Scene {


    constructor ()
    {
        super({ key: 'Game' })
    }

    preload ()
    {
        //load plane image
        this.load.image('plane', '/assets/planeBlue1.png');
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
    }

    create ()
    {


        //plane
        this.physicsPlane = this.physics.add.image(400, window.innerHeight / 2, 'plane');
        
       
        this.setup()

        //clouds
        this.lastTimeSpawnedCloud = 0
        this.clouds = this.add.group();
        for (let i=1;i<=27;i++){
            let y = (i%9)+1
            console.log(y)
            let cl = this.physics.add.image(100*y,100*y,'cloud'+y)
            this.clouds.add(cl)
            this.clouds.killAndHide(cl)
        }


        this.physics.add.collider(this.physicsPlane, this.clouds);
        

        //animation
//         var animConfig = {
//             key: 'open',
//             frames: this.anims.generateFrameNumbers('suitcase', { start: 0, end: 7, first: 7 }),
//             frameRate: 12
//         };

//         this.anims.create(animConfig);

//         var suitcase= this.add.sprite(400, 500, 'suitcase');
//         suitcase.anims.play('open').setScale(0.3);
    }


    update(time,delta){
        this.respawnClouds()
        this.removeCloudsWhenOffScreen()

        console.log(delta/(1000/60))
        // Move Clouds
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


}

