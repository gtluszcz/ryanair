import Phaser from 'phaser'

import Menu from './states/Menu'
import Boot from './states/Boot'
import Preload from './states/Preload'

window.game = new Phaser.Game({
    type: Phaser.AUTO,
    width: window.innerWidth * window.devicePixelRatio,
    height: window.innerHeight * window.devicePixelRatio,
})

console.log(window.game.state)

window.game.Scene.add('Menu', Menu)
window.game.Scene.add('Boot', Boot)
window.game.Scene.add('Preload', Preload)
// window.game.state.add('GameTitle', GameTitle)
// window.game.state.add('Main', Main)
// window.game.state.add('GameOver', GameOver)

window.game.state.start('Boot')
