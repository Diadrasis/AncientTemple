

//var page2;

var page1_text1, page1_text2, page1_text3, answerText;
var page2_photo, page2_bg;

var didyouknowAnswerId = 0;

var dyk_avatar, dyk_postit, dyk_text, dyk_photo, dyk_slogan;

var configDidYouKnowTitles = {
  //x: 0,
  //y: 0,
  //we need this to initialize the text size button
  text: '0000000000000000000000000000000000000000000000000000000000000000',
  origin: { x: 0.5, y: 0.5 },
  style: {
      fontSize: '32px',
      fontFamily: 'centuryGothicRegular',
      color: '#FFFFFF',
      align: 'center',
      wordWrap: { width: 850, useAdvancedWrap: true }
  }
};

var configDidYouKnowAnswer = {
  x: 609,
  y: 300,
  text: '',
  origin: { x: 0.5, y: 0 },
  style: {
      fontSize: '28px',
      fontFamily: 'centuryGothicRegular',
      color: '#FFFFFF',
      align: 'top',
      wordWrap: { width: 690, useAdvancedWrap: true }
  }
};

//array to load from db

class DidYouKnowScene extends Phaser.Scene {

  constructor () { super({ key: 'didYouKnow' }) }

  init () 
  {
    _this = this;
    // set scene name
    currentScene = 'didYouKnow';

    console.info(currentScene+' init');

  }

  preload () {

    showProgress();

    loadBackground();

    this.load.image('did_you_know_02', getSceneImagesFolder() + 'did_you_know_02.png');
    //new background
    this.load.image('dyk_bk', getSceneImagesFolder() + 'bg.jpg');

    this.load.image('dyk_bubble'+ languange, getSceneImagesFolder() + 'did_you_know_bubble_'+ languange + '.png');

    this.load.image('dyk_btnHome', getSceneImagesFolder() + 'btnHome.png');
    this.load.image('dyk_btnPrint', getSceneImagesFolder() + 'print.png');

    this.load.image('did_you_know_hero', getSceneImagesFolder() + 'did_you_know_hero.png');
    this.load.image('did_you_know_photo', getSceneImagesFolder() + 'did_you_know_photo.png');
    this.load.image('did_you_know_postit', getSceneImagesFolder() + 'did_you_know_postit.png');
    this.load.image('did_you_know_slogan', getSceneImagesFolder() + 'did_you_know_slogan.png');
    this.load.image('did_you_know_text', getSceneImagesFolder() + 'did_you_know_text.png');

    loadPreviusIntroCharacter();
    loadPreviousSceneFooter();

    //this.time.delayedCall(500, setDidYouKnowTexts, [], this);
  }

  create () {
       
    showBackground();

    GetGameDidYouKnow(gameId);

    createPreviusIntroCharacter();
    createPreviusSceneFooter();
    footerScene.depth = 50;

    this.add.image(1050, 562, 'dyk_bubble'+ languange);

    page2_bg = this.add.image(0, 0, 'dyk_bk');
    page2_bg.setOrigin(0,0);
    page2_bg.depth = 1;
    page2_bg.visible = false;

    var btnHomeIntro = backgroundObject;
    btnHomeIntro.setInteractive();
   
   //return to main menu
    var btnMenu = _this.add.sprite(55, 165, 'dyk_btnHome').setInteractive({ cursor: 'pointer' });
    btnMenu.once('pointerdown', function (event) {      
        isGamePaused = true;
        game.scene.stop(currentScene);
        game.scene.start('menu'); //menu
    }, _this);
    btnMenu.depth = 50;

    var btnPrint = _this.add.sprite(55, 260, 'dyk_btnPrint').setInteractive({ cursor: 'pointer' });
    btnPrint.on('pointerdown', PrintPage, this);
    btnPrint.depth = 50;
 

    btnHomeIntro.depth = -3;

    page1_text1 = _this.make.text(configDidYouKnowTitles);
    page1_text1.x = 1144;
    page1_text1.y = 405;
    page1_text1.setFontStyle('bold');
    page1_text1.setInteractive({ cursor: 'pointer' });


    page1_text2 = _this.make.text(configDidYouKnowTitles);
    page1_text2.x = 1139;
    page1_text2.y = 585;
    page1_text2.setFontStyle('bold');
    page1_text2.setInteractive({ cursor: 'pointer' });

    page1_text3 = _this.make.text(configDidYouKnowTitles);
    page1_text3.x = 1134;
    page1_text3.y = 785;
    page1_text3.setFontStyle('bold');
    page1_text3.setInteractive({ cursor: 'pointer' });

    dyk_text = this.add.image(592, 604, 'did_you_know_text');
    dyk_text.depth = 5;
    dyk_text.visible = false;

    dyk_postit = this.add.image(1770, 311, 'did_you_know_postit');
    dyk_postit.depth = 10;
    dyk_postit.visible = false;

    dyk_photo = this.add.image(1390, 595, 'did_you_know_photo');
    dyk_photo.depth = 6;
    dyk_photo.visible = false;

    dyk_avatar = this.add.image(-167, 380, 'did_you_know_hero'); //x=123
    dyk_avatar.depth = 6;
    dyk_avatar.visible = false;

    dyk_slogan = this.add.image(1480, 897, 'did_you_know_slogan');
    dyk_slogan.depth = 10;
    dyk_slogan.visible = false;

    
    // page2 = this.add.image(0, 0, 'did_you_know_02').setOrigin(0, 0);
    // page2.depth = -10;
    // page2.visible = false;

    // page2.setInteractive();

    // page2.on('pointerdown',
    //   function () {
    //     game.scene.stop(currentScene);
    //     game.scene.start('menu');
    //   }
    // );

    page1_text1.on('pointerdown',
      function () {
        didyouknowAnswerId = 0;
        showDidYouKnowAnswer();
        //page2.depth = 10;
        //page2.visible = true;
      }
    );

    page1_text2.on('pointerdown',
      function () {
        didyouknowAnswerId = 1;
        showDidYouKnowAnswer();
        //page2.depth = 10;
        //page2.visible = true;
      }
    );

    page1_text3.on('pointerdown',
      function () {
        didyouknowAnswerId = 2;
        showDidYouKnowAnswer();
        //page2.depth = 10;
        //page2.visible = true;
      }
    );

    page1_text1.visible = false;
    page1_text2.visible = false;
    page1_text3.visible = false;

  }

}


function loadPreviusIntroCharacter(){
  _this.load.image(previousScene + 'intro_character', getSceneImagesFolder() + previousScene + '_intro_character.png');
}


function createPreviusIntroCharacter(){
    _this.add.sprite(GetCharacterPosition().x, GetCharacterPosition().y, previousScene + 'intro_character');
}

//sceneNames ['geography', 'sign', 'type', 'construction', 'form', 'sculpture', 'neoclassic']

function GetCharacterPosition(){

  if(previousScene === sceneNames[0]){ return {x:300, y:723}; }
  else if(previousScene === sceneNames[1]){ return {x:304, y:725}; }
  else if(previousScene === sceneNames[2]){ return {x:320, y:723}; }
  else if(previousScene === sceneNames[3]){ return {x:255, y:724}; }
  else if(previousScene === sceneNames[4]){ return {x:327, y:723}; }
  else if(previousScene === sceneNames[5]){ return {x:275, y:721}; }
  else { return {x:300, y:723}; }
}

var randomDidYouKnowList;
function setDidYouKnowTexts()
{

    //get did you  know list from database
    //alert(didYouKnowList.length);

  if (didYouKnowList.length > 2) {
    randomDidYouKnowList = new Array();
    randomDidYouKnowList = didYouKnowList;

    randomDidYouKnowList.sort(() => Math.random() - 0.5);
    randomDidYouKnowList.sort(() => Math.random() - 0.5);

    if (isRealValue(page1_text1)) {
      page1_text1.setText(randomDidYouKnowList[0][0]);
    }
    if (isRealValue(page1_text2)) {
      page1_text2.setText(randomDidYouKnowList[1][0]);
    }
    if (isRealValue(page1_text3)) {
      page1_text3.setText(randomDidYouKnowList[2][0]);
    }

    if (isRealValue(randomDidYouKnowList[0][2])) {
      _this.load.image(randomDidYouKnowList[0][2], getSceneImagesFolder() + randomDidYouKnowList[0][2]);
    }
    if (isRealValue(randomDidYouKnowList[1][2])) {
      _this.load.image(randomDidYouKnowList[1][2], getSceneImagesFolder() + randomDidYouKnowList[1][2]);
    }
    if (isRealValue(randomDidYouKnowList[2][2])) {
      _this.load.image(randomDidYouKnowList[2][2], getSceneImagesFolder() + randomDidYouKnowList[2][2]);
    }

    _this.load.start();

    page1_text1.visible = true;
    page1_text2.visible = true;
    page1_text3.visible = true;
  } else {
      //go to menu
      isGamePaused = true;
      game.scene.stop(currentScene);
      game.scene.start('menu'); //menu

  }
}

/*
var count = 0;
function onDYKEvent() {
    count += 1;
    console.info(count);
    if (dykDataRead == true) {
        //timer.destroy();
        DebugLog("did you know text are loaded!");
        //setDidYouKnowTexts();
        dykTextTimer.destroy();
        dykDataRead = false;
    } else {
        DebugLog("intro text are not loaded!");
    }
}
dykDataRead = false;
var dykTextTimer= _this.time.addEvent({ delay: 100, callback: onDYKEvent, callbackScope: this, loop: true });
*/

function showDidYouKnowAnswer(){
  if (didYouKnowList.length > 0) {

    page1_text1.visible = false;
    page1_text2.visible = false;
    page1_text3.visible = false;

    page2_bg.visible = true;
    dyk_text.visible = true;
    dyk_avatar.visible = true;
    dyk_photo.visible = false;
    dyk_slogan.visible = false;
    dyk_postit.visible = false;

    answerText = _this.make.text(configDidYouKnowAnswer);
    answerText.setText(randomDidYouKnowList[didyouknowAnswerId][1]);
    answerText.depth = 11;
    
    /*
    if (isRealValue(randomDidYouKnowList[didyouknowAnswerId][2])) {
      page2_photo = _this.add.image(1377, 595, randomDidYouKnowList[didyouknowAnswerId][2]);
    }else{
      page2_photo = _this.add.image(1377, 595, imgnotfoundKey);
    }

    if(page2_photo.width > page2_photo.height){
      var log = 828 / page2_photo.width ;
      page2_photo.setScale(log);
    }else{
      var log = 595 / page2_photo.height ;
      page2_photo.setScale(log);
    }

    page2_photo.depth = 7;
    */
    _this.tweens.add({
      targets: dyk_avatar,
      x: 123,
      duration: 1000,
      ease: 'Back',
      easeParams: [1.5],
      delay: 100
    });

  }
}
