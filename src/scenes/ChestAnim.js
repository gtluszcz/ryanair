import Phaser from 'phaser'

export default class ChestAnim extends Phaser.Scene {


    constructor (){
        super({ key: 'ChestAnim' })
    }

    preload(){
        this.load.spritesheet('greenBriefcaseStylesheet', '/assets/animation/stylesheet3.png', {frameWidth:91, frameHeight: 64, endFrame: 10});
        //64x91
    }

    create(){
        var coinAnimConfig = {
            key: 'greenBriefcaseAnim',
            frames: this.anims.generateFrameNumbers('greenBriefcaseStylesheet', {start:0, end:10, first: 10}),
            frameRate: 8,
            repeat: -1
        };

        this.anims.create(coinAnimConfig);
        let greenBriefcase = this.add.sprite(600, 400, 'greenBriefcaseStylesheet');
        greenBriefcase.anims.play('greenBriefcaseAnim').setScale(4);
    }

}