import Phaser from 'phaser'

export default class ChestAnim extends Phaser.Scene {


    constructor (){
        super({ key: 'ChestAnim' })
    }

    preload(){
        this.load.spritesheet('greenBriefcaseStylesheet', '/assets/animation/stylesheet3.png', {frameWidth:91, frameHeight: 64, endFrame: 10});
        this.load.spritesheet('ryanairCard', '/assets/animation/card.png', {frameWidth:162, frameHeight: 227, endFrame: 10})
        //64x91
        //162x227
    }

    create(){
        let briefcaseready = false;
        var briefcaseConfig = {
            key: 'greenBriefcaseAnim',
            frames: this.anims.generateFrameNumbers('greenBriefcaseStylesheet', {start:0, end:5}),
            frameRate: 8,
            
        };
        

        var ryanairCardConfig = {
            key: 'ryanairCardAnim',
            frames: this.anims.generateFrameNumbers('ryanairCard', {start:0, end:5}),
            frameRate: 8,
            
        };

        this.anims.create(briefcaseConfig);
        briefcaseready = true;
        this.anims.create(ryanairCardConfig);
        let greenBriefcase = this.add.sprite(600, 400, 'greenBriefcaseStylesheet');
        

        greenBriefcase.on('animationcomplete', this.startCard, this);
        greenBriefcase.anims.play('greenBriefcaseAnim').setScale(4);
        
    }
    startCard() {
        let card = this.add.sprite(600, 400, 'ryanairCard');
        card.anims.play('ryanairCardAnim');
        
        card.setInteractive();
        card.on('clicked', (chest) =>{
            console.log('card clicked');
        });

        this.input.on('gameobjectup', (pointer, gameObject)=>{
            gameObject.emit('clicked', gameObject);
        });
    }
}