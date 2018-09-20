class MoreToLearnScene extends Phaser.Scene {

  constructor () { super({ key: 'moreToLearn' }) }

  init () 
  {
    _this = this;
    // set scene name
    currentScene = 'moreToLearn';

    console.info(currentScene+' init');

    
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
