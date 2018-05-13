import Phaser from 'phaser'

export default class Game extends Phaser.Scene {


    constructor ()
    {
        super({ key: 'Game' })
    }

    preload ()
    {
        //load plane image
        this.load.image('plane', '/assets/plane-rayanair.png');

        //load cloud images
        for (let i=1;i<=9;i++){
            this.load.image('cloud'+i, '/assets/clouds/cloud'+i+'.png');
            
        }

        //animation
        //this.load.spritesheet('suitcase', '../assets/animation/poziomo.png', { frameWidth: 595, frameHeight: 842, endFrame: 842 });


    }

    setup(){
        this.CLOUD_SPAWN_TIME = 900
        this.COLISION_SPEED = 80
    }

    create ()
    {


        //plane
        this.physicsPlane = this.physics.add.sprite(400, window.innerHeight / 2, 'plane');
        this.physicsPlane.setScale(0.3)
        console.log(this.physicsPlane)
        this.physicsPlane.body.setCircle(250)
        this.physicsPlane.body.setOffset(90,-40)
        console.log(this.physicsPlane.body)
        this.setup()

        //clouds
        this.lastTimeSpawnedCloud = 0
        this.clouds = this.add.group();
        for (let i=1;i<=27;i++){
            let y = (i%9)+1
            console.log(y)
            let cl = this.physics.add.image(3000,100*y,'cloud'+y)
            this.clouds.add(cl)
            this.clouds.killAndHide(cl)
        }


        //Plane overlaps clouds
        this.physics.add.overlap(this.physicsPlane, this.clouds, (el) => {
            clearTimeout(this.timeout)
            this.planeOverlaps = true
            this.timeout = setTimeout(() => {
                this.planeOverlaps = false
            }, 50)
        });
        

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
        this.handleCloudsOverlapingByPlane()

        if (this.input.activePointer.isDown) {

            let rad = Math.atan2(this.input.activePointer.y - this.physicsPlane.y, this.input.activePointer.x - this.physicsPlane.x)
            this.physicsPlane.setRotation(rad)

            this.physicsPlane.setVelocityY(400 * Math.sin(rad))



        }

    }

    handleCloudsOverlapingByPlane(){
        if (this.planeOverlaps){
            this.physicsPlane.setVelocityX(-this.COLISION_SPEED)
        }else{
            this.physicsPlane.setVelocityX(0)
        }
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
                cl.setVelocityX(-((Math.random()*200)+200))
                cl.setScale((Math.random()*1.7)+0.7)
                cl.setSize(cl.frame.width/1.3, cl.frame.height/ 1.3)
                cl.setOffset((cl.frame.width - cl.frame.width/1.3) /2 ,(cl.frame.height - cl.frame.height/ 1.3)/2)

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

