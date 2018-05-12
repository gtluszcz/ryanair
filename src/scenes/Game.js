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

    }

    create ()
    {
        //this.face = this.add.image(300, 200, 'plane');
        var config1 = {
            key: 'plane',
            x: 400,
            y: 300
        };
        this.plane = this.make.sprite(config1)


        this.clouds = []
        for (let i=1;i<=9;i++){
            let cl = this.add.sprite(100*i,100*i,'cloud'+i)
            this.clouds.push(cl)
        }


    }
    update(){
        setTimeout(function () {

        },Math.random()*1000)


        this.clouds.forEach(el => el.x-=2)
    }

}

