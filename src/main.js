// Aiven Jerel Desiderio
// Created: 5/4/2024
// Phaser: 3.70.0
//
// Gallery Fisher
//
// 
// 
// Art assets from Kenny Assets 

"use strict"

// game config
let config = {
    parent: 'phaser-game',
    type: Phaser.CANVAS,
    render: {
        pixelArt: true  // prevent pixel art from getting blurred when scaled
    },
    width: 800,
    height: 600,
    scene: [Gallery],
    fps: { forceSetTimeOut: true, target: 30 }
}

const game = new Phaser.Game(config);