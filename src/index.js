import Phaser from 'phaser'

import Game from './scenes/Game.js'
import Animations from './scenes/ChestAnim.js'


var config = {
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    backgroundColor: '#000000',
    parent: 'phaser-example',
    physics: {
        default: 'arcade',
        arcade: {
            debug: true
        }
    },
    scene: [ Animations ]
};

var game = new Phaser.Game(config);
