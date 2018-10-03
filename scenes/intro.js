
class IntroScene extends Phaser.Scene 
{

    constructor (config) {super({ key: 'intro' }) }

    init () 
    {
        _this = this;
    
        // set scene name
        currentScene = 'intro';
    }

    preload() {

        //sound
        this.load.audio('audioStoneMason', [
           'assets/audio/stoneMason.ogg',
           'assets/audio/stoneMason.mp3'
        ]); 

        this.load.audio('audioBellIdea', [
            'assets/audio/bellIdea.ogg',
            'assets/audio/bellIdea.mp3'
        ]); 

        //sprite sheets       
        _this.load.spritesheet('spshArchitectIntro', 'assets/animation/' + 'arxitektonas_intro.png', { frameWidth: 235, frameHeight: 405});
        _this.load.spritesheet('spshPristessIntro', 'assets/animation/' + 'ieria_intro.png', { frameWidth: 201, frameHeight: 328});


        //language buttons
        this.load.image('en', imagesFolder + currentScene + '/lang_en.png');
        this.load.image('gr', imagesFolder + currentScene + '/lang_gr.png');

        //load image button for newPlayer - oldPlayer
        _this.load.image('draftButton', getSceneImagesFolder() + 'emptyButton' + '.png');

        showProgress();
        loadBackground();
    
    }

    create () 
    { 
        //play sound
        audioStoneMason = this.sound.add('audioStoneMason');
        audioStoneMason.volume = 0;
        audioStoneMason.play({ 'loop': -1 });
        _this.add.tween({
            targets: [audioStoneMason],
            ease: 'Sine.easeInOut',
            duration: 3000,
            delay: 0,
            volume: {
                getStart: () => 0,
                getEnd: () => 1
            },
            onComplete: () => { }
        });

        //preapare sound
        audioBellIdea = this.sound.add('audioBellIdea');
        audioBellIdea.volume = 1;

        showBackground();

        btn_lang_intro = this.add.image(1835, 52, 'gr').setInteractive({ cursor: 'pointer' });
        btn_lang_intro.on('pointerdown', ChangeIntroLang);

        introTxtMessage1 = _this.make.text(configLoginMessageText);
        introTxtMessage1.x = 880;
        introTxtMessage1.y = 635;

        introTxtMessage2 = _this.make.text(configLoginMessageText);
        introTxtMessage2.x = 875;
        introTxtMessage2.y = 732;

        //ChangeIntroLang();
        if (languange == 'gr') {
            introTxtMessage1.setText('Νέος παίκτης!');
            introTxtMessage2.setText('Έχω ξαναπαίξει...');
    
        } else {
            introTxtMessage1.setText('New player!');
            introTxtMessage2.setText("I 've played again...");
        }

        var btnNewPlayer = _this.add.image(986, 648, 'draftButton').setInteractive({ cursor: 'pointer' });
        btnNewPlayer.on('pointerover', function () { audioButton1.play();})
        btnNewPlayer.on('pointerup',
          function () {
              DebugLog('New Player');
              isNewPlayer = true;
              game.scene.stop(currentScene);
              game.scene.start('login');
              //game.scene.start('menu');
          }
        );

        var btnOldPlayer = _this.add.image(986, 743, 'draftButton').setInteractive({ cursor: 'pointer' });
        btnOldPlayer.on('pointerover', function () { audioButton1.play(); })
        btnOldPlayer.on('pointerup',
          function () {
              DebugLog('Old Player');
              isNewPlayer = false;
              game.scene.stop(currentScene);
              game.scene.start('login');             
          }
        );

        fadeInCamera(1);

        //load menu
        //game.scene.stop(currentScene);
        // game.scene.start('menu');

    }//create

}

var audioStoneMason;

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
