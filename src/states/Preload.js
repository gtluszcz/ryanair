import Phaser from 'phaser'

const Preload = function (game) {}

Preload.prototype = {

    preload() {

    },

    create() {
        this.game.state.start('Menu')
    },

}

export default Preload
