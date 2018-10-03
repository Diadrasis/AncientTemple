
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

var isSignFirstHelp = true;

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

var randomTextToChoose = 0;

var logSize = {x:1.12, y:1.7};

function MakeMatchHighLight(pos, size){
  var draft = _this.add.image(pos.x, pos.y, currentScene + hightlighted_sign_keyName);
  draft.setOrigin(0.5);
  draft.displayWidth = size.x * logSize.x;
  draft.displayHeight = size.y * logSize.y;
  //draft.setTint(0x0000ff);
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

    //intro mouse over
    //GR
    if (languange === 'gr') {
      areaInscriptions = new Phaser.Geom.Rectangle(introZeroPos.x + 530, introZeroPos.y + 407, 175, 45);
      RepositionRect(areaInscriptions);
    }
    else{//EN
      areaInscriptions = new Phaser.Geom.Rectangle(introZeroPos.x + 791, introZeroPos.y + 384, 190, 45);
      RepositionRect(areaInscriptions);
    }

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

    loadLoadingImage();

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

    isOnWord = false;

    this.input.on('pointermove', function (pointer) {

      if(!isGameOver || !isGamePaused){ return; }

      if(areaInscriptions.contains(pointer.x, pointer.y))
      {
        isOnWord = true;
        mouseSetCursor(cursorType.pointer);

        if(languange === 'gr'){ textMouseOver.setText(inscriptions_gr); }
        else{ textMouseOver.setText(inscriptions_en); }

        textMouseOver.x = RectCenter(areaInscriptions).x;// pointer.x;
        textMouseOver.y = RectCenter(areaInscriptions).y - 70; //pointer.y - 70;

        imageMouseOver.setDisplaySize(textMouseOver.getBounds().width + 10, textMouseOver.getBounds().height + 10);
        imageMouseOver.x = textMouseOver.x;
        imageMouseOver.y = textMouseOver.y;
        imageMouseOver.visible = true;
      }
      else
      {
        if (isOnWord) {
          mouseSetCursor(cursorType.default);
          isOnWord = false;
        }

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

    fadeInCamera(1);

    createHelp();


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

  showPopUpMessage('\n'+signFeedback[0]);

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

  //show loading image
  showLoadingImage();

  newSignGame();
  //_this.time.delayedCall(500, newSignGame, [], _this);
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

  if (selectedLevel === 1) {
    usePenaltyTime = true; 
    timeToRemove = 5; 
    totalWordsToFound = 3;
    totalTimeSelected = totalTime.easy;
    signId = 1;
  }
  else if (selectedLevel === 2) {
    usePenaltyTime = true; 
    timeToRemove = 10; 
    totalWordsToFound = 4;
    totalTimeSelected = totalTime.medium;
    signId = 2;
  }
  else if (selectedLevel === 3) {
    usePenaltyTime = true; 
    timeToRemove = 15; 
    totalWordsToFound = 5;
    totalTimeSelected = totalTime.hard;
    signId = 3;
  }

  maxEfforts = totalWordsToFound;

  showEfforts();

  SignGetWords();

}

var areasOnRock = [];
var areasOnText = [];

function StartSignAfterDatabase(){
  
  StartSign();

 // _this.anims.remove(currentScene + 'animLoader');
  
}

function StartSign()
{

  DebugLog('Start Sign');

  SignPrepareVariables();

}

function ShowSignHelp(){

  if(isGameOver || isGamePaused){return;}

  timePenalty += timeToRemove * 7;
  timerEventGame.delay -= timeToRemove * 7 * 1000;

  ShowSignHelpWord();

}

//save found words in array
//search if help word dont exist in save array
function ShowSignHelpWord(){

  resetLightsSign();

  //how many words we have
  var totalWords = areasOnRock.length - 1;
  //select random index
  var randomWord = Phaser.Math.Between(0, totalWords);

  //random select to show on rock or on text
  var randomPlace = Phaser.Math.Between(0, 100);

  //random select a word to show
  if(randomPlace % 2 === 0){//on text

    var wordData = GetWordDataFromDBArray(areasOnText[randomWord].name);

    //create draft for text
    MoveAndResizeObject({ x: parseInt(wordData[4]), y: parseInt(wordData[5]) }, { x: parseInt(wordData[6]), y: parseInt(wordData[7]) }, draftCopyText);

    textSelectedWord = wordData[8];

    isTapOnText = true; 

    //light on help
    graphics.clear();
    graphics.lineStyle(3, 0x00ffff);
    graphics.strokeRectShape(areasOnText[randomWord]);
    draftCopyText.setTint(0x00ff00);
    _this.time.delayedCall(1000, function(){draftCopyText.clearTint(); graphics.clear(); }, [], _this);
  }
  else{//on rock

    var wordData = GetWordDataFromDBArray(areasOnRock[randomWord].name);

    //create draft for text
    MoveAndResizeObject({ x: parseInt(wordData[0]), y: parseInt(wordData[1]) }, { x: parseInt(wordData[2]), y: parseInt(wordData[3]) }, draftCopyRock);

    signSelectedWord = wordData[8];

    isTapOnRock = true; 

    //light on help
    graphics.clear();
    graphics.lineStyle(3, 0x00ffff);
    graphics.strokeRectShape(areasOnRock[randomWord]);
    draftCopyRock.setTint(0x00ffff);
    _this.time.delayedCall(1000, function(){draftCopyRock.clearTint(); graphics.clear();}, [], _this);

  }

    

}

function SignPrepareVariables(){

  isSignWordOnRockSelected = false;
  isSignWordOnTextSelected = false;
  signSelectedWord ='';
  currentWordsFound = 0;
  isTapOnRock = false;
  isTapOnText = false;
  isSignTouchActive = true;
  rectanglesSignRock = [];
  rectanglesSignText = [];

  //random choose
  SignLoad();

}

function SignLoad() {
  _this.load.once('complete', SignCreate, this);

  _this.load.image(currentScene + 'sign_'+signId, getSceneImagesFolder() + 'sign_'+signId+'.png');

  _this.load.image(currentScene + 'text_'+signId, getSceneImagesFolder() + 'sign_'+signId+'_text.png');

  _this.load.start();
}

var signRockImagePos = [{x:936, y:579}, {x:938, y:593}, {x:1009, y:511}, {x:953, y:525}];
var signTextImagePos = [{x:1540, y:537}, {x:1555, y:556}, {x:1469, y:469}, {x:1501, y:516}];

function SignCreate(){

  var indx = signId-1;
  var rockPos = signRockImagePos[indx];
  var textPos = signTextImagePos[indx];

  _this.add.image(rockPos.x, rockPos.y, currentScene + 'sign_'+signId).setOrigin(0.5);

  _this.add.image(textPos.x, textPos.y, currentScene + 'text_'+signId).setOrigin(0.5);

  //highlight copy
  draftCopyRock = _this.add.image(-1000, -1000, currentScene + 'hightlighted_sign');
  draftCopyRock.setOrigin(0.5);
  draftCopyText = _this.add.image(-1000, -1000, currentScene + 'hightlighted_sign');
  draftCopyText.setOrigin(0.5);

  //word array to use
  //signWords
  console.log('words for this sign are '+signWords.length);

  //reset arrays
  areasOnRock = [];
  areasOnText = [];

  //create areas list with name word id for later match checking
  for(var i=0; i<signWords.length; i++){
    
    var rockX = parseInt(signWords[i][0]);  //console.log('rockX = '+rockX);
    var rockY = parseInt(signWords[i][1]);  //console.log('rockY = '+rockY);
    var rockW = parseInt(signWords[i][2]);  //console.log('rockW = '+rockW);
    var rockH = parseInt(signWords[i][3]);  //console.log('rockH = '+rockH);
    var textX = parseInt(signWords[i][4]);  //console.log('rockX = '+rockX);
    var textY = parseInt(signWords[i][5]);  //console.log('textY = '+textY);
    var textW = parseInt(signWords[i][6]);  //console.log('textW = '+textW);
    var textH = parseInt(signWords[i][7]);  //console.log('textH = '+textH);

    var rockArea = new Phaser.Geom.Rectangle(rockX, rockY, rockW, rockH);
    RepositionRect(rockArea);
    var textArea = new Phaser.Geom.Rectangle(textX, textY, textW, textH);
    RepositionRect(textArea);

    rockArea.name = signWords[i][8];
    textArea.name = signWords[i][9];

    areasOnRock.push(rockArea);
    areasOnText.push(textArea);

  }

  rectMouse = new Phaser.Geom.Rectangle(0, 0, 0.1, 0.1);

  //#####################################################
  //for testing
  /*
  
  for (var x = 0; x < areasOnRock.length; x++) {

    var wordData = GetWordDataFromDBArray(areasOnRock[x].name);

    console.log(' >> FOUND ' + wordData[8]);

    //rock
    MakeMatchHighLight({ x: parseInt(wordData[0]), y: parseInt(wordData[1]) }, { x: parseInt(wordData[2]), y: parseInt(wordData[3]) });
    //text
    MakeMatchHighLight({ x: parseInt(wordData[4]), y: parseInt(wordData[5]) }, { x: parseInt(wordData[6]), y: parseInt(wordData[7]) });
  }
  
  */
  //#####################################################

  graphics = _this.add.graphics();

  _this.input.on('pointermove', function (pointer) {

    Phaser.Geom.Rectangle.CenterOn(rectMouse, pointer.x, pointer.y);

    //#####################################################
    //for testing
    /*
    graphics.clear();
    graphics.lineStyle(3, 0x00ffff);
    graphics.strokeRectShape(rectMouse);
    graphics.lineStyle(3, 0xffff00);
    for (var x = 0; x < areasOnRock.length; x++) {
      graphics.strokeRectShape(areasOnRock[x]);
      graphics.strokeRectShape(areasOnText[x]);
    }
    */
    //#####################################################


  });

  _this.input.on('pointerdown', function (pointer) {

    var pointerPos = {x:pointer.x, y:pointer.y};

    if(pointer.x<100){return;}

    if(isSignTouchActive === false || isGameOver || isGamePaused){return;}

    if(IsOnRock(pointerPos))
    {
      if(signSelectedWord === textSelectedWord){
        //console.log("found "+signSelectedWord);
        //create draft focus for rock and text
        SignCreateDraft(signSelectedWord);
        return;
      }else{
        if(textSelectedWord != ''){
          isSignTouchActive = false;
          MoveObject({x:pointer.x, y:pointer.y}, wrongSignIcon);
          _this.time.delayedCall(1000, SignHideWrongIcon, [], this);
          //console.log("words dont match!!");
         RemoveTime();
          return;
        }
      }
      //console.log("On rock tap word "+signSelectedWord);
      //console.log("...waiting for text word match...");
      return;
    }else
    if(IsOnText(pointerPos))
    {
      if(signSelectedWord === textSelectedWord){
        DebugLog("found "+signSelectedWord);
        //create draft focus for rock and text
        SignCreateDraft(textSelectedWord);
        return;
      }else{
        if(signSelectedWord != ''){
          isSignTouchActive = false;
          MoveObject({x:pointer.x, y:pointer.y}, wrongSignIcon);
          _this.time.delayedCall(1000, SignHideWrongIcon, [], this);
          DebugLog("words dont match!!");
          RemoveTime();
          return;
        }
      }
      DebugLog("On text tap word "+textSelectedWord);
      DebugLog("...waiting for rock word match...");
      return;
    }

    //console.log("word not found..");

    isSignTouchActive = false;

    MoveObject({ x: pointer.x, y: pointer.y }, wrongSignIcon);

    _this.time.delayedCall(250, SignHideWrongIcon, [], this);
    
    RemoveTime();

    resetLightsSign1();

  });


  //hide loading image
  hideLoadingImage();

  if (isSignFirstHelp && !isGamePaused) {
    showHelp();
    isSignFirstHelp = false;
  } 

}

function GetElementFromArray(array, elementName){
  for(var i=0; i<array.length; i++){
    if(array[i].name === elementName){
      return array[i];
    }
  }
}

function GetWordDataFromDBArray(areaName){
  for(var i=0; i<signWords.length; i++){
    if(signWords[i][8] === areaName){
      return signWords[i];
    }
  }
}

function DisableAreaFromRockArray(areaName){
  for(var i=0; i<areasOnRock.length; i++){
    if(areasOnRock[i].name === areaName){
      areasOnRock[i].setEmpty();
    }
  }
}

function DisableAreaFromTextArray(areaName){
  for(var i=0; i<areasOnText.length; i++){
    if(areasOnText[i].name === areaName){
      areasOnText[i].setEmpty();
    }
  }
}


function SignCreateDraft(wordID){

  showCorrectEffort(currentWordsFound);

  currentWordsFound ++;

  checkMatchSign();

  //destroy copies to use in another word
  resetLightsSign();
  //hide clickable areas
  DisableAreaFromRockArray(wordID);
  DisableAreaFromTextArray(wordID);

  var wordData = GetWordDataFromDBArray(wordID);

  //create draft for rock
  MakeMatchHighLight({ x: parseInt(wordData[0]), y: parseInt(wordData[1]) }, { x: parseInt(wordData[2]), y: parseInt(wordData[3]) });
  //create draft for text
  MakeMatchHighLight({ x: parseInt(wordData[4]), y: parseInt(wordData[5]) }, { x: parseInt(wordData[6]), y: parseInt(wordData[7]) });


  //console.log('rock array have '+areasOnRock.length);

  //remove from arrays so help can find only active words
  var indexRock = areasOnRock.indexOf(GetElementFromArray(areasOnRock, wordID));
  if (indexRock > -1) {
    areasOnRock.splice(indexRock, 1);
  }

  var indexText = areasOnText.indexOf(GetElementFromArray(areasOnText, wordID));
  if (indexText > -1) {
    areasOnText.splice(indexText, 1);
  }

  //console.log('rock array now have '+areasOnRock.length);

}


function IsOnRock(mousePos){

  //console.log('mousePos = '+mousePos.x + ' , ' + mousePos.y);

  for (var i = 0; i < areasOnRock.length; i++) {

    if (Phaser.Geom.Rectangle.ContainsPoint(areasOnRock[i], mousePos)) {

      isTapOnText = false;
      if(isTapOnRock){ resetLightsSign(); }else{ isTapOnRock = true; }

      var wordData = GetWordDataFromDBArray(areasOnRock[i].name);

      //create copy 
      MoveAndResizeObject({ x: parseInt(wordData[0]), y: parseInt(wordData[1]) }, { x: parseInt(wordData[2]), y: parseInt(wordData[3]) }, draftCopyRock);
      //set looking for match word
      signSelectedWord = areasOnRock[i].name;

     // console.log("rock word found >> "+ signSelectedWord);


      return true;

    }
  }

  return false;
}

function IsOnText(mousePos){
  for (var i = 0; i < areasOnText.length; i++) {

    if (Phaser.Geom.Rectangle.ContainsPoint(areasOnText[i], mousePos)) {
      DebugLog("text word found!!");   
      
      isTapOnRock = false;
      if(isTapOnText){ resetLightsSign(); }else{ isTapOnText = true; }

      var wordData = GetWordDataFromDBArray(areasOnText[i].name);

      //create copy 
      MoveAndResizeObject({ x: parseInt(wordData[4]), y: parseInt(wordData[5]) }, { x: parseInt(wordData[6]), y: parseInt(wordData[7]) }, draftCopyText);

      //set looking for match word
      textSelectedWord = areasOnText[i].name;
      return true;

    }

  }

  return false;
}


function resetLightsSign(){
  DebugLog('resetLightsSign1');

  signSelectedWord = '';
  textSelectedWord = '';

  isTapOnText = false;
  isTapOnRock = false;

  if(isRealValue(draftCopyRock)){ draftCopyRock.visible = false; }
  if(isRealValue(draftCopyText)){ draftCopyText.visible = false; }
}


//####### DATABASE ##############################################

var signWords=[];
var signId = 1;
function SignGetWords() {
    
    //console.log('getting words...')
    signWords = [];
    
    var xmlhttp;
    if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();
    }
    else
    {
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }

    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            signWords = JSON.parse(xmlhttp.responseText);

            //console.log('DB OK! START SIGN GAME');
            StartSignAfterDatabase();
            //get feedback texts
            SignGetFeedback();
        }
    };

    //language = 'gr';

    var PageToSendTo = document.location.href + "php/sign_db.php?";
    var action = "select_words_from_sign";
    var UrlToSend = PageToSendTo + "action=" + action + "&sign_id=" + signId;
    xmlhttp.open("GET", UrlToSend, true);
    xmlhttp.send();
}

var signFeedback = [];

function SignGetFeedback() {
    
  //console.log('getting feedback...')
  signFeedback = [];
  
  var xmlhttp;
  if (window.XMLHttpRequest) {
      xmlhttp = new XMLHttpRequest();
  }
  else
  {
      xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
  }

  xmlhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {

      signFeedback = JSON.parse(xmlhttp.responseText);
      console.log(signFeedback[0]);

    }
  };

  //language = 'gr';

  var PageToSendTo = document.location.href + "php/sign_db.php?";
  var action = "feedback_sign";
  var UrlToSend = PageToSendTo + "action=" + action + "&sign_id=" + signId + "&lang=" + languange;
  xmlhttp.open("GET", UrlToSend, true);
  xmlhttp.send();
}


//####### LOADING IMAGE #########################################

var loadingImage;

function loadLoadingImage(){
  _this.load.spritesheet(currentScene + 'spshLoader', 'assets/animation/' + 'loader.png', { frameWidth: 380, frameHeight: 380 });  
}

function showLoadingImage(){

  pauseFog.visible = true;

  _this.anims.create({
    key: currentScene + 'animLoader',
    frames: _this.anims.generateFrameNumbers(currentScene + 'spshLoader', { start: 0, end: 11 }),
    frameRate: 6,
    repeat: -1,
    showOnStart: true
  });

  load_anim = _this.add.sprite(960, 600, currentScene + 'spshLoader');
  load_anim.setDisplaySize(120, 120);
  load_anim.depth = 5010;
  //  load_anim.visible = true;
  load_anim.anims.play(currentScene + 'animLoader');
}

function hideLoadingImage(){
  pauseFog.visible = false;
  if(isRealValue(load_anim)){load_anim.destroy();}
}