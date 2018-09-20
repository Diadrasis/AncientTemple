
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

        //language buttons
        this.load.image('en', imagesFolder + currentScene + '/lang_en.png');
        this.load.image('gr', imagesFolder + currentScene + '/lang_gr.png');

        //load image button for newPlayer - oldPlayer
        _this.load.image('draftButton', getSceneImagesFolder() + 'emptyButton' + '.png');
    
    }

    create () 
    { 
        showBackground();

        btn_lang_intro = this.add.image(1835, 52, 'gr').setInteractive({ cursor: 'pointer' });
        btn_lang_intro.on('pointerdown', ChangeIntroLang);

        introTxtMessage1 = _this.make.text(configLoginMessageText);
        introTxtMessage1.x = 880;
        introTxtMessage1.y = 635;

        introTxtMessage2 = _this.make.text(configLoginMessageText);
        introTxtMessage2.x = 875;
        introTxtMessage2.y = 732;

        ChangeIntroLang();

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

        fadeInCamera(1);

        //load menu
        //game.scene.stop(currentScene);
        // game.scene.start('menu');

    }//create

}

var btn_lang_intro;
var introTxtMessage1;
var introTxtMessage2;

function ChangeIntroLang() {
    languange = languange === 'gr' ? 'en' : 'gr';
    btn_lang_intro.setTexture(languange);
    if (languange == 'gr') {
        introTxtMessage1.setText('Νέος παίκτης!');
        introTxtMessage2.setText('Έχω ξαναπαίξει...');

    } else {
        introTxtMessage1.setText('New player!');
        introTxtMessage2.setText("I 've played again...");
    }

}
