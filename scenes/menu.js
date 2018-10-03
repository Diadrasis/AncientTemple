


class Menu extends Phaser.Scene 
{

  constructor (config) {super({ key: 'menu' }) }

  init () 
  {
    _this = this;
    // set scene name
    currentScene = 'menu';
      DebugLog(currentScene + ' init');      

  }

  preload() {

      //sounds   
      this.load.audio('audioCountrySide', [
         'assets/audio/countryside.ogg',
         'assets/audio/countryside.mp3'
      ]);
              
      this.load.audio('audioClock', [
         'assets/audio/clock.ogg',
         'assets/audio/clock.mp3'
      ]);

      this.load.audio('audioBellFuneral', [
          'assets/audio/bellFuneral.ogg',
          'assets/audio/bellFuneral.mp3'
      ]);

      this.load.audio('audioDisappointment', [
          'assets/audio/disappointed.ogg',
          'assets/audio/disappointed.mp3'
      ]);

      this.load.audio('audioFanfare', [
          'assets/audio/fanfare.ogg',
          'assets/audio/fanfare.mp3'
      ]);

      this.load.audio('audioCheer', [
          'assets/audio/cheer.ogg',
          'assets/audio/cheer.mp3'
      ]);

    //animation
      _this.load.spritesheet('spshPristess', 'assets/animation/' + 'ieria_blink.png', { frameWidth: 168, frameHeight: 168 });
      _this.load.spritesheet('spshArchitectMenu', 'assets/animation/' + 'arxitektonas_menu.png', { frameWidth: 168, frameHeight: 168 });
      _this.load.spritesheet('spshSculptureMenu', 'assets/animation/' + 'gluptis_menu.png', { frameWidth: 168, frameHeight: 168 });


    //language buttons
    this.load.image('en', imagesFolder + currentScene + '/lang_en.jpg');
    this.load.image('gr', imagesFolder + currentScene + '/lang_gr.jpg');   
     
    // logo
    this.load.image('logo_menu_gr', imagesFolder + currentScene + '/logo_menu_gr.png');
    this.load.image('logo_menu_en', imagesFolder + currentScene + '/logo_menu_en.png');

    //footer
    this.load.image('footer_menu_gr', imagesFolder + currentScene + '/footer_menu_gr.png');
    this.load.image('footer_menu_en', imagesFolder + currentScene + '/footer_menu_en.png');

    //help - return
    this.load.image('side_menu', imagesFolder + currentScene + '/side_menu.png');
    this.load.image('menu_help_en', imagesFolder + currentScene + '/menu_help_en.jpg');
    this.load.image('menu_help_gr', imagesFolder + currentScene + '/menu_help_gr.jpg');
    this.load.image('btnEmpty', imagesGeneral + 'btnMenuEmpty.png');
    
    showProgress();
    loadBackground();      
    loadButtonsImages();
    loadScoreImages();
    loadNeoclassical();
    loadButtonsExtra();
    //readGameScores(playerId);
  }

 

  create () 
  { 
    
      showBackground();

      //#region sounds

      //fade out audio
      _this.add.tween({
          targets: [audioStoneMason],
          ease: 'Sine.easeInOut',
          duration: 3000,
          delay: 0,
          volume: {
              getStart: () => audioStoneMason.volume,
              getEnd: () => 0
          },
          onComplete: () => { }
      });

      //fade in sound
      audioCountrySide = this.sound.add('audioCountrySide');
      audioCountrySide.volume = 0.7;
      audioCountrySide.play({ 'loop': -1 });

      //prepare clock for game start
      audioClock = this.sound.add('audioClock');
      audioClock.volume = 1;

      //prepare bell for game finish
      audioBellFuneral = this.sound.add('audioBellFuneral');
      audioBellFuneral.volume = 1;

      //disappointment
      audioDisappointment = this.sound.add('audioDisappointment');
      audioDisappointment.volume = 1;

      audioFanfare = this.sound.add('audioFanfare');
      audioFanfare.volume = 1;

      audioCheer = this.sound.add('audioCheer');
      audioCheer.volume = 1;
      //#endregion

      //#region animation
      //animation test
      _this.anims.create({
          delay: 2000,
          key: 'blink',
          frames: _this.anims.generateFrameNumbers('spshPristess', { start: 0, end: 5 }),
          frameRate: 24,
          repeat: -1,
          repeatDelay: 3000,
          showOnStart: true
      });


     //#endregion
      _this.anims.create({
          delay: 1000,
          key: 'sculpture_blink',
          frames: _this.anims.generateFrameNumbers('spshSculptureMenu', { start: 0, end: 6}),
          frameRate: 24,
          repeat: -1,
          repeatDelay: 3000,
          showOnStart: true
      });

      //#endregion
      _this.anims.create({
          delay: 1000,
          key: 'architect_blink',
          frames: _this.anims.generateFrameNumbers('spshArchitectMenu', { start: 0, end: 9 }),
          frameRate: 24,
          repeat: -1,
          repeatDelay: 3000,
          showOnStart: true
      });

     
     GetGameScores(playerId);

    //show logo
    logo_menu = _this.add.image(1825, 150, 'logo_menu_' + languange);
      
    //show footer
    footer_menu = _this.add.image(game.config.width / 2, game.config.height - 50, 'footer_menu_' + languange);

    //show logo
     _this.add.image(53, 220, 'side_menu');

    // _this.time.delayedCall(3500, createScores, [], this);

    //call when sure that the data have been read!
    //createScores();

    btnLanguange = this.add.image(1835, 52, 'gr').setInteractive({ cursor: 'pointer' });
    btnLanguange.on('pointerdown', ChangeLanguange);
    btnLanguange.setTexture(languange); 

    //call when the data have been read!
    //createGameButtons();

    //createNeoclassical();

    createButtonsExtra(); 

    var btnPrint = this.add.image(54, 260, 'btnEmpty').setInteractive({ cursor: 'pointer' });
    btnPrint.on('pointerdown', PrintPage, this);
    btnPrint.depth = 70;

    var btnMail = this.add.image(54, 337, 'btnEmpty').setInteractive({ cursor: 'pointer' });
    btnMail.on('pointerdown', MailTo, this);
      btnMail.depth = 70;

      var btnPrivacy = this.add.image(54, 400, 'btnEmpty').setInteractive({ cursor: 'pointer' });
      btnPrivacy.on('pointerdown', GoPrivacy, this);
      btnPrivacy.depth = 70;

    btnHelpMenu = this.add.image(56, 108, 'btnEmpty').setInteractive({ cursor: 'pointer' });
    btnHelpMenu.on('pointerdown', ShowMenuHelp, this);
    btnHelpMenu.depth = 70;

    btnReturnMenu = this.add.image(56, 188, 'btnEmpty').setInteractive({ cursor: 'pointer' });
    btnReturnMenu.on('pointerdown', ReturnToIntro, this);
    btnReturnMenu.depth = 70;


    helpMenu = this.add.image(0, 0, 'menu_help_gr').setInteractive({ cursor: 'pointer' });
    helpMenu.setOrigin(0, 0); 
    helpMenu.visible = false;
    helpMenu.depth = 5000;
    helpMenu.on('pointerup', function(){ helpMenu.visible = false;}, this);

    if(!isMenuFirstHelp){
        this.time.delayedCall(1000, ShowMenuHelp, [], this);
        isMenuFirstHelp = true;
    }

  }//create

}
//anim
var animBlink;

//sound


var isMenuFirstHelp = false;
var helpMenu;
var btnHelpMenu, btnReturnMenu;
var footer_menu;
var logo_menu;
var btnLanguange;

function ReturnToIntro(){
    isMenuFirstHelp = false;
    game.scene.stop(currentScene);
    game.scene.start('intro_site');
}

function ShowMenuHelp() {
    audioBellIdea.play();
    helpMenu.setTexture('menu_help_'+languange);
    helpMenu.visible = true;
}

function ChangeLanguange() {   
    languange = languange === 'gr' ? 'en' : 'gr';
    btnLanguange.setTexture(languange);   
    ShowLangFiles();
    helpMenu.setTexture('menu_help_'+languange);
}

function ShowLangFiles() {
    //logo
    logo_menu.destroy();
    logo_menu = _this.add.image(1825, 150, 'logo_menu_' + languange);

    //footer
    footer_menu.destroy();
    footer_menu = _this.add.image(game.config.width/2, game.config.height-50, 'footer_menu_' + languange);

    //titles
    for (var i = 0; i < btnTitles.length; i++) {
        btnTitles[i].destroy();       
    }
    btnTitles = [];   

    for (var i = 0; i < 6; i++) {        
        if (gameScores[i][1] === 0) {                
            createBtnTitles(posGameButtons[i].x + 20, posGameButtons[i].y + 40, sceneNames[i]);
        }
    }
     
}

function MailTo(){
    window.location.href ='mailto:?subject=Ancient Temple&body=Δες το site ένας αρχαίος ναός εδώ: ' +window.location;
   // console.log(window.location.href);
}

function GoPrivacy() {
    let link = "http://learnmore.ancienttemple.gr/privacy-policy";
    if (languange === "en") { link = link + "?lang=en" };
    window.open(link, "_blank");
}

function loadScoreImages () {
  // load btn images
  for (var x = 0; x < 6; x++) {
    _this.load.image(scoreImages[x], getSceneImagesFolder() + scoreImages[x] + '.png');
  }
}

function loadNeoclassical()
{
  _this.load.image('neoclassic_button', getSceneImagesFolder() + 'neoclassic_button' + '.png');

  //DebugLog(isUnlockNeoclassical());

  //if(!isUnlockNeoclassical()){
    _this.load.image('lock', getSceneImagesFolder() + 'neoclassic_lock' + '.png');
  //}
}


//#endregion

//#region create functions

var posGameButtons = Object.freeze([
  {x:559, y:288}, 
  {x:953, y:288}, 
  {x:1347, y:288}, 
  {x:559, y:698}, 
  {x:953, y:698}, 
  {x:1347, y:698}
]);



function createBtn(btn, posX, posY, name, action, sceneName) {   
    if (action !== null) {
        btn = _this.add.sprite(posX, posY, name).setInteractive({ cursor: 'pointer' });
        btn.on('pointerover', function () {
            audioButton1.play();
        });
        btn.on('pointerdown', function () {
            currentScene = sceneName;
            audioButton2.play();
        });
        btn.on('pointerdown', action);
    } else {
        btn = Menu.add.sprite(0, 0, name);
    }
}

var btnTitles=[];
function createBtnTitles(posX, posY, scene) {
    //alert('create ' + scene + '_menu_title_' + languange);
    var btnTitle = _this.add.image(posX, posY, scene + '_menu_title_'+ languange);
    btnTitles.push(btnTitle);    
}

function loadScene(){
    DebugLog('about to load ' + currentScene);
    
  game.scene.stop('menu');
  game.scene.start(currentScene);
};

var posMenuScores = Object.freeze([
  {x:559, y:65}, 
  {x:953, y:65}, 
  {x:1347, y:65}, 
  {x:559, y:917}, 
  {x:953, y:917}, 
  {x:1347, y:917}
]);


function createNeoclassical()
{
  var btnNeoclassic =  _this.add.image(175, 462, 'neoclassic_button');

  if(isUnlockNeoclassical()){
    
    btnNeoclassic.setInteractive({ cursor: 'pointer' });

    btnNeoclassic.once('pointerdown',
      function () {
        game.scene.stop('menu');
        game.scene.start(sceneNames[6]);
      }
    );

  }else{
    btnNeoclassic.setAlpha(0.5);
    _this.add.image(198, 381, 'lock');
  }
}

//#endregion

function loadButtonsImages() {
    for (var i = 0; i < 6; i++) {
        //if (gameScores[i][i] > 0) {
            _this.load.image(sceneNames[i] + '_back', getSceneImagesFolder() + sceneNames[i] + '_back' + '.png'); btnLanguange
        //} else {
            _this.load.image(sceneNames[i] + '_front', getSceneImagesFolder() + sceneNames[i] + '_front' + '.png');
            _this.load.image(sceneNames[i] + '_menu_title_gr', getSceneImagesFolder() + sceneNames[i] + '_menu_title_gr' + '.png');
            _this.load.image(sceneNames[i] + '_menu_title_en', getSceneImagesFolder() + sceneNames[i] + '_menu_title_en' + '.png');
        //}
    }
    
}

function createGameButtons() {    
    var b1, b2, b3, b4, b5, b6;
    var btns = [b1, b2, b3, b4, b5, b6]; 

    for (var i = 0; i < 6; i++) {        
        if (gameScores[i][1] > 0) {
            createBtn(btns[i], posGameButtons[i].x, posGameButtons[i].y, sceneNames[i] + '_back', loadScene, sceneNames[i]);
        } else {
            createBtn(btns[i], posGameButtons[i].x, posGameButtons[i].y, sceneNames[i] + '_front', loadScene, sceneNames[i]);
            createBtnTitles(posGameButtons[i].x + 20, posGameButtons[i].y + 40, sceneNames[i]);
            if (i === 0) {
                animBlink = _this.add.sprite(575, 200, 'spshPristess');
                animBlink.setDisplaySize(168, 168);
                animBlink.anims.play('blink');
            }
        }
    }
    createGameScores();
    createNeoclassical();
}

function createGameScores() {
    for (var i = 0; i < 6; i++) {
        _this.add.image(posMenuScores[i].x, posMenuScores[i].y, scoreImages[i]).setOrigin(0.5, 0.5);
        //_this.add.text(posMenuScores[i].x, posMenuScores[i].y, getScoreOfGame(i+1), configScoreMenuText).setOrigin(0.5, 0.5);
        _this.add.text(posMenuScores[i].x, posMenuScores[i].y, gameScores[i][1], configScoreMenuText).setOrigin(0.5, 0.5);
    }
}