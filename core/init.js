
function initialize()
{
    //start login scene
    game.scene.add('bootScenes', BootScenes, true, { x: 0, y: 0 });
}

// our game's configuration
var config =
  {
    type: Phaser.AUTO, // Phaser will decide how to render our game (WebGL or Canvas)
    parent: 'canvas',
    width: 1920, // game width
    height: 1080, // game height
    physics: {
      default: 'matter',
      matter: {
        gravity: {
          y: 0
        },
        debug: true
      }
    },

    // transparent: true,
    // backgroundColor: 'rgba(255,110,110,0)',
    //backgroundColor: 'rgba(178,220,255,255)',

    // plugins: {
    //   global: [{
    //       key: 'BBCodeTextPlugin',
    //       plugin: BBCodeTextPlugin,
    //       start: true
    //   }]},
    //  Notice that it no longer says Phaser, or the Phaser version, in the banner
    banner: {
        hidePhaser: true
    },
    cursor: 'default'
    //,
    //scene: [Login, Menu, Credits, Tetris, Puzzle, Quiz, Game_4,]
  };



// create the game, and pass it the configuration
var game = new Phaser.Game(config);

//start login scene
// game.scene.add('login', Login, true, { x: 0, y: 0 });
