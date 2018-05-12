import Phaser from 'phaser'

const Boot = function (game) {}

Boot.prototype = {

    preload() {

    },

    create() {
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL
        this.scale.setScreenSize(true)
        this.game.state.start('Preload')
    },

}

// class Boot {

//     construct(game) {

//     }

//     preload() {

//     }

//     create() {
//         this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL
//         this.scale.setScreenSize(true)
//         this.game.state.start("Preload")
//     }

// }

export default Boot
