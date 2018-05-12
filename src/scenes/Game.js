import Phaser from 'phaser'

export default class Game extends Phaser.Scene {

    constructor ()
    {
        super({ key: 'Game' });
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

    create ()
    {

        // var config1 = {
        //     key: 'plane',
        //     x: 400,
        //     y: 300
        // };
        // this.plane = this.make.sprite(config1)

    
        // this.clouds = []
        // for (let i=1;i<=9;i++){
        //     let cl = this.add.sprite(100*i,100*i,'cloud'+i)
        //     this.clouds.push(cl)
        // }

        //DZIEMICH TU JEST
        
        this.physicsPlane = this.physics.add.image(200, 300, 'plane');
        
        this.clouds = [];
        for (let i=1;i<=9;i++){
            let cloud = this.physics.add.image(600, 100*i, 'cloud'+i);
            cloud.setVelocity(-100, 0);
            this.clouds.push(cloud)
        }

        this.physics.add.collider(this.physicsPlane, this.clouds);
        

        //animation
        var animConfig = {
            key: 'open',
            frames: this.anims.generateFrameNumbers('suitcase', { start: 0, end: 7, first: 7 }),
            frameRate: 12
        };

        this.anims.create(animConfig);

        var suitcase= this.add.sprite(400, 500, 'suitcase');
        suitcase.anims.play('open').setScale(0.3);
    }
    update(){
        // setTimeout(function () {

        // },Math.random()*1000)

        

        this.clouds.forEach(el => el.x-=2)


        //this.plane.setCollideCallback(collide, this);

    }


}

