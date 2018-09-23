
let posTextHighlight = {x:1694, y:680};
let posSignHighlight = {x:1015, y:616};

let selectionTextObject, selectionSignObject;

let taps = 0;
let selectedSign;

var posIntroCharacterSign = {x:369 , y:692};

var sign_1, sign_2, sign_3, sign_4, sign_5;
//var sign_footer;

var isSignWordOnRockSelected, isSignWordOnTextSelected;
var signSelectedWord ='';
var textSelectedWord ='';
//highlight copies
var draftCopyRock, draftCopyText;



//the words areas
var rectanglesSignRock, rectanglesSignText;
//hit null area
var rectNullSign;
//mousec hit area
var rectMouse;
//highlight image
var signFocusOnWord;

var totalWordsToFound = 0;
var currentWordsFound = 0;

var isTapOnRock = false;
var isTapOnText = false;
var isSignTouchActive = true;

var wrongSignIcon;

var hightlighted_sign_keyName = 'hightlighted_sign';

var graphics;

var randomTextToChoose = 0;

var logSize = {x:1.12, y:1.7};

function MakeMatchHighLight(pos, size){
  var draft = _this.add.image(pos.x, pos.y, currentScene + hightlighted_sign_keyName);
  draft.setOrigin(0.5);
  draft.displayWidth = size.x * logSize.x;
  draft.displayHeight = size.y * logSize.y;
  draft.setTint(0x0000ff);
}

function MoveAndResizeObject(pos, size, objectTarget){
  objectTarget.x = pos.x; 
  objectTarget.y = pos.y;
  objectTarget.displayWidth = size.x  * logSize.x;
  objectTarget.displayHeight = size.y * logSize.y;
  objectTarget.visible = true;
}

function MoveObject(pos, objectTarget){
  objectTarget.x = pos.x; 
  objectTarget.y = pos.y;
  objectTarget.visible = true;
}

function RepositionRect(rect){
  rect.x -= rect.width / 2;
  rect.y -= rect.height / 2;
}

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

class SignScene extends Phaser.Scene 
{

  constructor (config) { super({ key: 'sign' })}

  init() {

    _this = this;

    currentScene = 'sign';

    gameId = getDBgameId(currentScene);

    isGameOver = true;
    isGamePaused = true;

    initTimer();

    totalTime = {easy: 600000, medium: 500000, hard: 400000, champion: 90000};

    selectedSign = -1;

    posIntroCharacter = posIntroCharacterSign;

    //GR

    areaInscriptions = new Phaser.Geom.Rectangle(introZeroPos.x + 530, introZeroPos.y + 407, 175, 45);
    RepositionRect(areaInscriptions);
    

    //EN

  }

  preload () {
    DebugLog('loading ' + currentScene );

    loadBackground();

    loadMenuBar();

    //#region Load Images

    //footer
    //this.load.image(currentScene + 'footer', getSceneImagesFolder() + 'sign_footer.png');
    //wrong icon
    this.load.image(currentScene + 'wrong', getSceneImagesFolder() + 'wrong.png');
    //epigrafi_highlight
    this.load.image(currentScene + hightlighted_sign_keyName, getSceneImagesFolder() + 'hightlighted_sign.png');
    //indicators
    this.load.image(currentScene + 'try', getSceneImagesFolder() + 'try.png');
    this.load.image(currentScene + 'try_checked', getSceneImagesFolder() + 'try_checked.png');

    this.load.image(currentScene + 'board', imagesGeneral + 'board.jpg');

    //#endregion

    loadPopUp();

    loadSceneFooter();

    loadLevelSelectPanel();

    loadHelp();

    showProgress();
  }

  create () 
  { 
    console.info(currentScene+' started');

    imageMouseOver = this.add.image(0,0, currentScene + 'board');
    imageMouseOver.setOrigin(0.5);
    imageMouseOver.depth = 5000;
    imageMouseOver.visible = false;

    textMouseOver = this.make.text(configMouseOverText);
    textMouseOver.depth = 5006;
    textMouseOver.setOrigin(0.5);

    this.input.on('pointermove', function (pointer) {

      if(areaInscriptions.contains(pointer.x, pointer.y))
      {
        textMouseOver.setText(inscriptions_gr);
        textMouseOver.x = pointer.x;
        textMouseOver.y = pointer.y - 70;

        imageMouseOver.setDisplaySize(textMouseOver.getBounds().width + 10, textMouseOver.getBounds().height + 10);
        imageMouseOver.x = textMouseOver.x;
        imageMouseOver.y = textMouseOver.y;
        imageMouseOver.visible = true;
      }
      else
      {
        imageMouseOver.visible = false;
        textMouseOver.setText('');
      }


  });

    disableRightMouseClick();

    showBackground();
    
    showMenuBar();

    menuBarPreviewButton.on('pointerdown', ShowSignHelp, _this);

    wrongSignIcon = this.add.image(-1000, -1000, currentScene+'wrong');
    wrongSignIcon.depth = 49;
    wrongSignIcon.visible = false;
    wrongSignIcon.setScale(0.3);


    groupEffortIcons = _this.add.group({
      key: currentScene + 'try',
      maxSize: 10,
      setXY:
        {
          x: 1346,
          y: 998,
          stepX: 62
        },
      repeat: 10
    });

    groupCorrectIcons = _this.add.group({
      key: currentScene + 'try_checked',
      maxSize: 10,
      setXY:
        {
          x: 1346,
          y: 998,
          stepX: 62
        },
      repeat: 10
    });

    hideGroupCorrectIcons();

    createSceneFooter();

    showLevelSelectPanel();

    createPopUpMessage();

    //onCanvasLoseFocus();

    fadeInCamera(2);

    createHelp();

    this.input.keyboard.on('keydown_A', function (event) {

      console.log('Hello from the A Key!');

      ShowSign1HelpWord();

  });

  }//create

  update (time, delta) {

    calculateTime();
    
  }//update


}

function checkMatchSign()
{
  DebugLog('checkMatchSign');

  if(currentWordsFound === totalWordsToFound){
    isGamePaused = true;
    //set delay timers
    _this.time.delayedCall(1000, winSignGame, [], this);
  }else{
    //hideSignElements();
  }
}

function winSignGame() {
  //winGame();
  DebugLog('You win ' + currentScene + ' game!');

  hidePopUpMessage();

  hideGroupCorrectIcons();

  //hideSignElements();

  var myScore = selectedLevel * timeOfGame;
  if (myScore > scoreSign) {
    scoreSign = myScore;
    SaveScore(myScore)
  }

  textTime.setText(myScore);
  timeBar.setScale(1, 1);
  timeBar.setTint('0xffffff');

  showPopUpMessage('\nSign feedback text');

}

function ContinueSign(){
  isGameOver = true;
  isGamePaused = true;
  var myScore = selectedLevel * timeOfGame;
  showPopUpMessage('\nΜπράβο!!!\n\nΚέρδισες ' + myScore + ' βαθμούς.\n\nΠαίξε πάλι για να αποκτήσεις περισσότερους.');

  //_this.time.delayedCall(3500, restartScene, [], _this);
}

function loseSignGame()
{
  //hideSignElements();
  hideGroupCorrectIcons();
}

function startNewSignGame()
{
  DebugLog('starting '+currentScene+' game...');

  _this.time.delayedCall(500, newSignGame, [], _this);
}

function newSignGame() 
{
  isGamePaused = false;
  isGameOver = false;

  timeToRemove = 5;

  timePenalty = 0;
  timerEventGame = _this.time.addEvent({ delay: totalTimeSelected, timeScale: 1.0 });
  timerEventGame.paused = false;
  timeOfGame = totalTimeSelected;

  textTime.visible = true;

  if (selectedLevel === 1) {usePenaltyTime = true; timeToRemove = 5; totalWordsToFound = 3; StartSign1(); }
  else if (selectedLevel === 2) {usePenaltyTime = true; timeToRemove = 10; totalWordsToFound = 4; StartSign1(); }
  else if (selectedLevel === 3) {usePenaltyTime = true; timeToRemove = 15; totalWordsToFound = 5; StartSign1(); }

  maxEfforts = totalWordsToFound; 
  showEfforts();

  showHelp();

}


function ShowSignHelp(){

  if(isGameOver || isGamePaused){return;}

  timePenalty += timeToRemove * 7;
  timerEventGame.delay -= timeToRemove * 7 * 1000;

  if (selectedLevel === 1) { ShowSign1HelpWord(); }
  else if (selectedLevel === 2) { ShowSign1HelpWord(); }
  else if (selectedLevel === 3) { ShowSign1HelpWord(); }
}