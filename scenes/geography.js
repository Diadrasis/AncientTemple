
var photosTemplesGeography = new Array();
//photo = { templeid, templeimg, templename , mapPos{ x, y } };

var questionsForGeography = new Array();
//quest = { templeid, questtext, feedbacktext };


//var posFotosStatic = [{x:358, y: 342}, {x:1618, y:342}, {x:358, y:710}, {x:1618, y:710}];// [{x:1619, y: 114}, {x:1619, y:362}, {x:1619, y:611}, {x:1619, y:862}];
var axisX1 = 352;
var axisX2 = 1618;
var axisY1;
var axisY2;
var axisY3;


var imgWidth = 221;
var imgHeight = 156;

var posFotosStatic = [{ x: 352, y: 842 }, { x: 1618, y: 842 }, { x: 1618, y: 592 }, { x: 358, y: 592 }, { x: 1618, y: 342 }, { x: 358, y: 342 }];
var posIntroCharacterGeography = {x:438 , y:688};

var posQuestion = {x:894, y:61};
var questionBackImage;
var questionText;

//the dot on map
var dotIcon;

//user's selected answer is the image name and temple id
var selectedAnswer = 'none';
//set for correct key answer
var correctAnswer = 'null';
//draft list gor all questions
var gameQuestions = [];
//the question now
var currentQuestion;
//the selected photo pos (correct or wrong)
var selectedPhotoPos;

var totalLevelAnswers = {easy: 5, medium: 7, hard: 9, champion: 10};
var totalGameCorrectAnswers;
var currGameCorrectAnswers;
var totalGeographyPhotosToSelect = 4;


var totalxronos;
var timeBarPercentage;


var correctIconGeo, wrongIconGeo;
var waitSelectedAnswerMessage=false;

var buttonsGeography = new Array();
var btnG1, btnG2, btnG3, btnG4, btnG5, btnG6;

var configGeographyQuestionText = {
  x: posQuestion.x,
  y: 5,// posQuestion.y,
  text: '',
  origin: { x: 0.5, y: 0 },
  style: {
      fontSize: '25px',
      fontFamily: 'centuryGothicRegular',
      color: '#000000',
      align: 'top',
      wordWrap: { width: 1000, useAdvancedWrap: true }
  }
};

//var templeNameText1, templeNameText2, templeNameText3, templeNameText4, templeNameText5, templeNameText6;

var configGeographyTempleName = {
  x: 0,
  y: 0,
  text: 'Temple Name - Title',
  origin: { x: 0.5, y: 0.5 },
  style: {
      fontSize: '25px',
      fontFamily: 'centuryGothicRegular',
      color: '#000000',
      align: 'center',
      wordWrap: { width: 270, useAdvancedWrap: true }
  }
};

var zoomBackgroundImage;
var zoomButtonClose;

var currentButtonDoubleClickCheck;
function btnDoubleClickCheck(){     DebugLog(clickCounts);
  if(clickCounts>=2){ DebugLog("Zoom "+ currentButtonDoubleClickCheck.name); ZoomImage(currentButtonDoubleClickCheck.name); }
  else if(clickCounts === 1) { selectedAnswer = currentButtonDoubleClickCheck.name;  selectedPhotoPos = {x:currentButtonDoubleClickCheck.x, y:currentButtonDoubleClickCheck.y}; checkAnswer(currentButtonDoubleClickCheck); clickCounts = 0;}
}

var zoomedImageObject;
function ZoomImage(key){
  if(isRealValue(zoomedImageObject)){zoomedImageObject.destroy();}
  zoomedImageObject = _this.add.image(1920/2, 1080/2, key);
  zoomedImageObject.setOrigin(0.5);

  zoomButtonClose.visible = true;
  zoomBackgroundImage.visible = true;
  zoomBackgroundImage.depth = 100;
  zoomedImageObject.depth = 101;
  zoomButtonClose.depth = 102;

  clickCounts=0;
}

class GeographyScene extends Phaser.Scene 
{

  // #region config
  constructor (config) {
    super({
      key: 'geography'
    })
  }

  // #endregion

  init () 
  {

    _this = this;

    currentScene = 'geography';
    gameId = getDBgameId(currentScene);

    //το init καλείται πριν το create
    console.info(currentScene +' init')
    isGameOver = true;
    isGamePaused = true;
    initTimer();
    allFotoContainers = [];
   // allFotoTitlesTexts = [];
    buttonsGeography = [];
    gameQuestions = [];
    photosTemplesGeography = [];
    questionsForGeography = [];
    usePenaltyTime = true;

    //bug fix on restart
    posFotosStatic = [{ x: axisX1, y: axisY3 }, { x: axisX2, y: axisY3 }, { x: axisX2, y: axisY2 }, { x: axisX1, y: axisY2 }, { x: axisX1, y: axisY1 }, { x: axisX2, y: axisY1 } ];

    totalTime = {easy: 120000, medium: 120000, hard: 90000, champion: 90000};

    posIntroCharacter = posIntroCharacterGeography;

   // console.time("load temples time");
    GeographyGetTemples();   

    _this.time.delayedCall(500, delayLoadTempleImages, [], _this);
    //delayLoadTempleImages();


//GR

    areaAltar = new Phaser.Geom.Rectangle(introZeroPos.x + 440, introZeroPos.y + 500, 106, 52);
    RepositionRect(areaAltar);

  }

  preload () {

    loadBackground();

    loadMenuBar();

    this.load.image(currentScene + 'right', getSceneImagesFolder() + 'right.png');
    this.load.image(currentScene + 'wrong', getSceneImagesFolder() + 'wrong.png');
    this.load.image(currentScene + 'try', getSceneImagesFolder() + 'try.png');
    this.load.image(currentScene + 'try_checked', getSceneImagesFolder() + 'try_checked.png');
 
    //this.load.image(currentScene + 'pin', getSceneImagesFolder() + 'pin.png');
    this.load.image(currentScene + 'pin', getSceneImagesFolder() + 'pin_02.png');
    this.load.image(currentScene + 'photo_box', getSceneImagesFolder() + 'photo_box.png');
    this.load.image(currentScene + 'photo_box_back', getSceneImagesFolder() + 'photo_box_back.png');
   // this.load.image(currentScene + 'photo_box_selected', getSceneImagesFolder() + 'photo_box_selected.png');

    this.load.image('bg_grey', getSceneImagesFolder() + 'bg_grey.png');

    this.load.image(currentScene + 'board', imagesGeneral + 'board.jpg');

    loadSceneFooter();

    loadLevelSelectPanel();
    
    loadPopUp();

    loadHelp();

    showProgress(); 

  }

  create () 
  { 


    imageMouseOver = this.add.image(0,0, currentScene + 'board');
    imageMouseOver.setOrigin(0.5);
    imageMouseOver.depth = 5000;
    imageMouseOver.visible = false;

    textMouseOver = this.make.text(configMouseOverText);
    textMouseOver.depth = 5006;
    textMouseOver.setOrigin(0.5);

    this.input.on('pointermove', function (pointer) {

      if(areaAltar.contains(pointer.x, pointer.y))
      {
        textMouseOver.setText(altar_gr);
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



    showBackground();
    
    showMenuBar();  

    zoomBackgroundImage = this.add.image(0,0,'bg_grey').setOrigin(0, 0); 
    zoomBackgroundImage.setInteractive();
    zoomBackgroundImage.visible = false;

    //1835, 85
    zoomButtonClose = this.add.sprite(1835, 85, currentScene + 'wrong');
    zoomButtonClose.setInteractive({ cursor: 'pointer' });
    zoomButtonClose.visible = false;
    zoomButtonClose.setScale(0.5);
    zoomButtonClose.on('pointerdown', function () { zoomBackgroundImage.visible = false; zoomButtonClose.visible = false; if(isRealValue(zoomedImageObject)){zoomedImageObject.destroy();} });

    //set dot icons
    dotIcon = this.add.sprite(0, 0, currentScene + 'pin');

    dotIcon.visible = false;
    dotIcon.setOrigin(0.7, 1);  

    // for (var i = 0; i < 6; i++) {
    //   this.add.image(posFotosStatic[i].x, posFotosStatic[i].y, currentScene + 'photo_box_back');
    // }

    btnG1 = this.add.image(posFotosStatic[0].x, posFotosStatic[0].y,currentScene +  'photo_box_back').setInteractive({ cursor: 'pointer' });
    btnG1.on('pointerdown', function () {  clickCounts++; currentButtonDoubleClickCheck = btnG1;  _this.time.delayedCall(250, btnDoubleClickCheck, [], _this);});
    btnG2 = this.add.image(posFotosStatic[1].x, posFotosStatic[1].y,currentScene +  'photo_box_back').setInteractive({ cursor: 'pointer' });
    btnG2.on('pointerdown', function () {  clickCounts++; currentButtonDoubleClickCheck = btnG2;  _this.time.delayedCall(250, btnDoubleClickCheck, [], _this);});
    btnG3 = this.add.image(posFotosStatic[2].x, posFotosStatic[2].y,currentScene +  'photo_box_back').setInteractive({ cursor: 'pointer' });
    btnG3.on('pointerdown', function () {  clickCounts++; currentButtonDoubleClickCheck = btnG3;  _this.time.delayedCall(250, btnDoubleClickCheck, [], _this);});
    btnG4 = this.add.image(posFotosStatic[3].x, posFotosStatic[3].y,currentScene +  'photo_box_back').setInteractive({ cursor: 'pointer' });
    btnG4.on('pointerdown', function () {  clickCounts++; currentButtonDoubleClickCheck = btnG4;  _this.time.delayedCall(250, btnDoubleClickCheck, [], _this);});
    btnG5 = this.add.image(posFotosStatic[4].x, posFotosStatic[4].y,currentScene +  'photo_box_back').setInteractive({ cursor: 'pointer' });
    btnG5.on('pointerdown', function () {  clickCounts++; currentButtonDoubleClickCheck = btnG5;  _this.time.delayedCall(250, btnDoubleClickCheck, [], _this);});
    btnG6 = this.add.image(posFotosStatic[5].x, posFotosStatic[5].y,currentScene +  'photo_box_back').setInteractive({ cursor: 'pointer' });
    btnG6.on('pointerdown', function () {  clickCounts++; currentButtonDoubleClickCheck = btnG6;  _this.time.delayedCall(250, btnDoubleClickCheck, [], _this);});

    

    buttonsGeography.push(btnG1);
    buttonsGeography.push(btnG2);
    buttonsGeography.push(btnG3);
    buttonsGeography.push(btnG4);
    buttonsGeography.push(btnG5);
    buttonsGeography.push(btnG6);

    foto1 = this.add.image(posFotosStatic[0].x, posFotosStatic[0].y,currentScene +  'photo_box');
    foto2 = this.add.image(posFotosStatic[1].x, posFotosStatic[1].y,currentScene +  'photo_box');
    foto3 = this.add.image(posFotosStatic[2].x, posFotosStatic[2].y,currentScene +  'photo_box');
    foto4 = this.add.image(posFotosStatic[3].x, posFotosStatic[3].y,currentScene +  'photo_box');
    foto5 = this.add.image(posFotosStatic[4].x, posFotosStatic[4].y,currentScene +  'photo_box');
    foto6 = this.add.image(posFotosStatic[5].x, posFotosStatic[5].y,currentScene +  'photo_box');
    
    //prepare foto containers
    allFotoContainers.push(foto1);
    allFotoContainers.push(foto2);
    allFotoContainers.push(foto3);
    allFotoContainers.push(foto4);
    allFotoContainers.push(foto5);
    allFotoContainers.push(foto6);

    resetFotos();

    // wrap width
    questionText = this.make.text(configGeographyQuestionText);

    correctIconGeo = this.add.image(-1000, -1000, currentScene + 'right');
    wrongIconGeo = this.add.image(-1000, -1000, currentScene + 'wrong');
    wrongIconGeo.visible = false;
    correctIconGeo.visible = false;

    correctIconGeo.setScale(0.5);
    wrongIconGeo.setScale(0.5);

    groupEffortIcons = _this.add.group({
      key: currentScene + 'try',
      maxSize: 10,
      setXY:
        {
          x: 821,
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
          x: 821,
          y: 998,
          stepX: 62
        },
      repeat: 10
    });

    hideGroupCorrectIcons();

    createSceneFooter();

    showLevelSelectPanel();
    
    createPopUpMessage();
   
    createHelp();   

    fadeInCamera(2);

  }//create

  update (time, delta) {

    calculateTime();

  }//update

}

function DelayLoadCompleted(){
  //console.timeEnd('load temples time');
  DebugLog('Temples Geography = ' + photosTemplesGeography.length);  
}

function delayLoadTempleImages() {
  if (photosTemplesGeography.length > 0) {

      _this.load.once('complete', DelayLoadCompleted, this);

      for (var i = 0; i < photosTemplesGeography.length; i++) {
          _this.load.image(photosTemplesGeography[i].templeid,  getSceneImagesFolder() + photosTemplesGeography[i].templeimg);//+'.jpg' );
      }

      _this.load.start();

  }else{
      DebugLog('list to load is empty !!!');
      //try again
      tryToLoadTempleImagesAgain();
  }
}

function tryToLoadTempleImagesAgain(){_this.time.delayedCall(500, delayLoadTempleImages, [], _this);}

function startNewGeographyGame()
{
  DebugLog('starting '+currentScene+' game...');
  setDifficultyGeography();
  showEfforts();

  _this.time.delayedCall(500, newGeographyName, [], _this);
}

function newGeographyName()
{
DebugLog('newGeographyName');

  isGamePaused = false;
  isGameOver = false;

  currGameCorrectAnswers=0;

  timePenalty=0;
  timerEventGame = _this.time.addEvent({ delay: totalTimeSelected, timeScale: 1.0 });
  timerEventGame.paused = false;
  timeOfGame = totalTimeSelected;

  textTime.visible=true;

  //shuffle questions
  gameQuestions = questionsForGeography.slice();
  gameQuestions.sort( () => Math.random() - 0.5) ;

  //show question
  nextQuestion();

  showHelp();

}

function setDifficultyGeography(){
  if(selectedLevel===1){
    totalGameCorrectAnswers = totalLevelAnswers.easy;
    totalTimeSelected = totalTime.easy;
    totalGeographyPhotosToSelect = 4;
    timeToRemove = 5;
    usePenaltyTime = true;
    levelText.setText('1');
  }else
  if(selectedLevel===2){
    totalGameCorrectAnswers = totalLevelAnswers.medium;
    totalTimeSelected = totalTime.medium;
    totalGeographyPhotosToSelect = 4;
    timeToRemove = 10;
    usePenaltyTime = true;
    levelText.setText('2');
  }else
  if(selectedLevel===3){
    totalGameCorrectAnswers = totalLevelAnswers.hard;
    totalTimeSelected = totalTime.hard;
    totalGeographyPhotosToSelect = 6;
    timeToRemove = 15;
    usePenaltyTime = true;
    levelText.setText('3');
  }else
  {
    totalGameCorrectAnswers = totalLevelAnswers.easy;
    totalTimeSelected = totalTime.easy;
    totalGeographyPhotosToSelect = 4;
    timeToRemove = 5;
    usePenaltyTime = false;
    levelText.setText('1');
  }

  //alert(totalGeographyPhotosToSelect);
  if (totalGeographyPhotosToSelect == 4) {
      //hide buttons
      buttonsGeography[4].visible = false;
      buttonsGeography[5].visible = false;
      imgWidth = 450;
      imgHeight = 320;
      axisY1 = 400;
      axisY2 = 800;
      //
      posFotosStatic = [{ x: axisX1, y: axisY2 }, { x: axisX2, y: axisY2 }, { x: axisX2, y: axisY1 }, { x: axisX1, y: axisY1 }];      
      for (var i = 0; i < 4; i++) {
          buttonsGeography[i].setPosition(posFotosStatic[i].x, posFotosStatic[i].y);
          allFotoContainers[i].setPosition(posFotosStatic[i].x, posFotosStatic[i].y);
          buttonsGeography[i].setDisplaySize(imgWidth, imgHeight);
          allFotoContainers[i].setDisplaySize(imgWidth, imgHeight);
      }

  } else {
      buttonsGeography[4].visible = true;
      buttonsGeography[5].visible = true;
      imgWidth = 380;
      imgHeight = 280;
      axisY1 = 310;
      axisY2 = 595;
      axisY3 = 880;
            //
      posFotosStatic = [{ x: axisX1, y: axisY3 }, { x: axisX2, y: axisY3 }, { x: axisX2, y: axisY2 }, { x: axisX1, y: axisY2 }, { x: axisX1, y: axisY1 }, { x: axisX2, y: axisY1 } ];
      for (var i = 0; i < 6; i++) {
          buttonsGeography[i].setPosition(posFotosStatic[i].x, posFotosStatic[i].y);
          allFotoContainers[i].setPosition(posFotosStatic[i].x, posFotosStatic[i].y);
          buttonsGeography[i].setDisplaySize(imgWidth, imgHeight);
          allFotoContainers[i].setDisplaySize(imgWidth, imgHeight);
      }
  }
  totalxronos = totalTimeSelected / 1000;
  maxEfforts = totalGameCorrectAnswers;

}

function checkAnswer(gameobject)
{

  if(waitSelectedAnswerMessage){return;}else{waitSelectedAnswerMessage = true;}

  correctIconGeo.visible = false;
  wrongIconGeo.visible = false;

  if(selectedAnswer === correctAnswer)
  {
    //DebugLog('CORRECT!!');

    //hide other fotos
    for (var b = 0; b < allFotoContainers.length; b++) {
      if (allFotoContainers[b].name != gameobject.name) {
        allFotoContainers[b].visible = false;
        //allFotoTitlesTexts[b].visible = false;
      }
    }

    var newX = selectedPhotoPos.x;

    if(newX<500){newX = selectedPhotoPos.x - 150;}else{newX = selectedPhotoPos.x + 150; }

    correctIconGeo.setPosition(newX, selectedPhotoPos.y);
    correctIconGeo.visible = true;

    //show correct icon
    groupCorrectIcons.getChildren()[currGameCorrectAnswers].visible = true;

    showCorrectEffort(currGameCorrectAnswers);

    //count ++ correct answers
    currGameCorrectAnswers ++;

    //show feedback
    showPopUpMessage(currentQuestion.feedbacktext);
    //the check if win the game is in continueGeography() after pop up closed
  }
  else
  {
    //DebugLog('WRONG...');

    var newX = selectedPhotoPos.x;

    if(newX<500){newX = selectedPhotoPos.x - 150;}else{newX = selectedPhotoPos.x + 150; }


    wrongIconGeo.setPosition(newX, selectedPhotoPos.y);
    wrongIconGeo.visible = true;

    //remove 10 sec from time
    if (usePenaltyTime) {
      timePenalty += timeToRemove;
      timerEventGame.delay -= timeToRemove * 1000;
    }

    //showPopUpMessage('ΛΑΘΟΣ');

    _this.time.delayedCall(1000, function(){ waitSelectedAnswerMessage = false; wrongIconGeo.visible = false; }, [], this);

  }

}

function continueGeography(){
  //check if max has reached to finished the game
    if(currGameCorrectAnswers === totalGameCorrectAnswers)
    {
      isGameOver = true;
      popUpTitle.setText('');
      //set delay timers
      _this.time.delayedCall(500, winGeographyGame, [], this);
    }else{ //now is from pop up message
        //set delay next question
       // _this.time.delayedCall(1000, nextQuestion, [], this);
        nextQuestion();
    }
}

function loseGeographyGame()
{

  correctIconGeo.visible = false;
  wrongIconGeo.visible = false;
  popUpTitle.setText('');

  //clear texts and fotos values
  hideGroupCorrectIcons();

  questionText.setText('');

  resetFotos();

  dotIcon.visible = false;
}

function winGeographyGame()
{
 // graphics.clear();

  correctIconGeo.visible = false;
  wrongIconGeo.visible = false;

  hideGroupCorrectIcons();
  questionText.setText('');
  resetFotos();

  dotIcon.visible = false;

  DebugLog('You win '+ currentScene + ' game!');

  isGameOver = true;
  isGamePaused = true;

  var myScore = selectedLevel * timeOfGame;
  if (myScore > scoreGeography) {
    scoreGeography = myScore;
    SaveScore(myScore);
  }

  textTime.setText(myScore);
  timeBar.setScale(1, 1);
  timeBar.setTint('0xffffff');
    
  showPopUpMessage('\nΜπράβο!!!\n\nΚέρδισες '+ myScore + ' βαθμούς.\n\nΠαίξε πάλι για να αποκτήσεις περισσότερους.');

  //_this.time.delayedCall(3500, restartScene, [], _this);
}

function resetFotos()
{
  for (var f = 0; f < allFotoContainers.length; f++) {
    allFotoContainers[f].visible = false;
  }

  // for(var f=0; f<allFotoTitlesTexts.length; f++)
  //   {
  //     allFotoTitlesTexts[f].visible = false;
  //   }
}

function nextQuestion() { DebugLog('next Question');

  if (isGameOver) { return; }

  waitSelectedAnswerMessage = false;

  hidePopUpMessage();

  wrongIconGeo.visible = false;
  correctIconGeo.visible = false;

  isGamePaused = false;

  if (gameQuestions.length > 0) {
    //move first question to end of the array (gameQuestions)
    var firstQuestion = gameQuestions[0];
    //remove question from list
    gameQuestions.splice(0, 1);
    //add question as last
    gameQuestions.push(firstQuestion);
  }
  //set correct question the first from the shuffled list 
  currentQuestion = gameQuestions[0];
  //set the correct answer
  correctAnswer = currentQuestion.templeid;
  //show question text
  questionText.setText(currentQuestion.questtext);

  //shuflle buttons twice
  var randomIndex = [0, 1, 2, 3];
  if(totalGeographyPhotosToSelect>4){randomIndex = [0, 1, 2, 3, 4, 5];}
  randomIndex.sort(() => Math.random() - 0.5);
  randomIndex.sort(() => Math.random() - 0.5);

  //DebugLog('correct question is '+ randomIndex[0]);

  //create draft list to use in current question
  var draftFotos = photosTemplesGeography.slice();
  //get correct foto
  var photo = getPhoto(correctAnswer);
  
  if(photo === 'null'){
    nextQuestion();
    return;
  }

  popUpTitle.setText(photo.templename);

  dotIcon.x = photo.mapPos.x
  dotIcon.y = photo.mapPos.y;

  dotIcon.visible = true;

  //get position in list
  var indx = draftFotos.indexOf(photo);
  //remove from list
  draftFotos.splice(indx, 1);
  //shuffle draft fotos
  draftFotos.sort(() => Math.random() - 0.5);
  draftFotos.sort(() => Math.random() - 0.5);

  //prepare and set photo containers
  for (var i = 0; i < totalGeographyPhotosToSelect; i++) {

    //show next foto from questions array
    if (i > 0) {
      photo = draftFotos[i - 1];
    }

    //set the new texure
    allFotoContainers[randomIndex[i]].setTexture(photo.templeid);

    // var newWidth = 0;
    // var newHeight = 0;
    var log =0;

    //resize 221x156
    if(allFotoContainers[randomIndex[i]].width > allFotoContainers[randomIndex[i]].height){
    log = imgWidth / allFotoContainers[randomIndex[i]].width ;
      //allFotoContainers[randomIndex[i]].setScale(log);
    }else{
     log = imgHeight / allFotoContainers[randomIndex[i]].height ;
     // allFotoContainers[randomIndex[i]].setScale(log);
    }

    allFotoContainers[randomIndex[i]].displayWidth = allFotoContainers[randomIndex[i]].width * log;
    allFotoContainers[randomIndex[i]].displayHeight = allFotoContainers[randomIndex[i]].height * log;

    //show foto
    allFotoContainers[randomIndex[i]].visible = true;
   // allFotoTitlesTexts[randomIndex[i]].visible = true;
    //set name to find if answer is correct
    allFotoContainers[randomIndex[i]].setName(photo.templeid);
    buttonsGeography[randomIndex[i]].setName(photo.templeid);


    //allFotoTitlesTexts[randomIndex[i]].setText(photo.templename);

    //setTempleText(i, photo.templename);
    

    //DebugLog(photo.templename);
  }
}

// function setTempleText(index, text){
//   if(index===0){
//     templeNameText1.setText(text);
//   }else
//   if(index===1){
//     templeNameText2.setText(text);
//   }else
//   if(index===2){
//     templeNameText3.setText(text);
//   }else
//   if(index===3){
//     templeNameText4.setText(text);
//   }else
//   if(index===4){
//     templeNameText5.setText(text);
//   }else
//   if(index===5){
//     templeNameText6.setText(text);
//   }
// }

function getPhoto(onoma)
{
 // DebugLog('get photo '+ onoma);

  for(var i=0; i<photosTemplesGeography.length; i++){ 
    if(photosTemplesGeography[i].templeid === onoma)
    {
      return photosTemplesGeography[i];
    }
  }
  DebugLog('photo not found with temple id '+onoma);
  return 'null';
}
