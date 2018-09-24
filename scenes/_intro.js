
class IntroScene extends Phaser.Scene 
{

  constructor (config) {super({ key: 'intro' }) }

  init () 
  {
     _this = this;
    
    // set scene name
    currentScene = 'intro';
  }

  preload () {

    showProgress();

    loadBackground();

    //load image button for newPlayer - oldPlayer
    _this.load.image('draftButton', getSceneImagesFolder() + 'emptyButton' + '.png');
    
  }

  create () 
  { 
    showBackground();

    var btnNewPlayer =  _this.add.image(986, 648, 'draftButton').setInteractive({ cursor: 'pointer' });
    btnNewPlayer.on('pointerup',
      function () {
        DebugLog('New Player');
        isNewPlayer = true;
        game.scene.stop(currentScene);
        game.scene.start('login');
        //game.scene.start('menu');
      }
    );

    var btnOldPlayer =  _this.add.image(986, 743, 'draftButton').setInteractive({ cursor: 'pointer' });
    btnOldPlayer.on('pointerup',
      function () {
        DebugLog('Old Player');
        isNewPlayer = false;
        game.scene.stop(currentScene);
        game.scene.start('login');
        //game.scene.start('menu');
      }
    );

    fadeInCamera(2);

    //load menu
    //game.scene.stop(currentScene);
   // game.scene.start('menu');

  }//create


}
