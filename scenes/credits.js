class Credits extends Phaser.Scene {

  constructor () { super({ key: 'credits' }) }

  init () 
  {
    _this = this;
    // set scene name
    currentScene = 'credits';

    console.info(currentScene+' init')

  }

  preload () {

    showProgress();

    loadBackground();

  }

  create () {
   
    showBackground();


    var btnHomeIntro = backgroundObject;

    btnHomeIntro.setInteractive();

    btnHomeIntro.on('pointerup',
      function () {
        game.scene.stop(currentScene);
        game.scene.start(previousScene);
      }
    );


  }

}
