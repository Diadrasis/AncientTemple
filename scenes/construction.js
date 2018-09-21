let iconsConstruction, numbersConstruction;
let imagesKorres, textsKorres;

let imgW = 400;
let imgH = 250;
let imgS = 20;
let imgX1 = 500;
let imgY1 = 180;
let difNo = 0;

//includes all sorted activites that will be created from database
//let activity;


//var sorted_activities = [];
var activities = [];

var activity_images = [];

//pick some random activites from all
var rand_activities = [];

//sort the activites


let posRandImagesKorres = [];

let posFinalImagesKorres = []; 

let posRandTextsKorres =[];

let posFinalTextsKorres = [];

let posButtonsNumbers = [];

let posNumberIcons = {x:989, y:521};

let randImagePositions, randTextPositions;

let selectedKorresObject;

let allImages, allTexts;

var posIntroCharacterConstruction = {x:354 , y:690};

class ConstructionScene extends Phaser.Scene 
{

  constructor (config) { super({ key: 'construction' })}

  init() {

    _this = this;

    currentScene = 'construction';

    gameId = getDBgameId(currentScene);

    isGameOver = true;
    isGamePaused = true;

    initTimer();

    totalTime = {easy: 120000, medium: 120000, hard: 90000, champion: 90000};

    allImages = [];
    allTexts = [];

    randImagePositions = [];
    randTextPositions = [];

    posIntroCharacter = posIntroCharacterConstruction;

      //#region read data from db
      //read activites from database, loop until all data have been read


      var count = 0;

      //manage game data
      ConstructionGetActivites();
      function onEvent() {
          count += 1;
          console.info(count);
          if (gameDataRead == true) {              
              console.info(" data have been loaded!");               
              //alert("activities read from database! " + activities.length);             
              gameDataTimer.destroy();
              gameDataRead = false;
          } else {
              console.info(" data are not loaded!");
          }
      }

      var gameDataTimer = _this.time.addEvent({
          delay: 100,
          callback: onEvent,
          callbackScope: this,
          loop: true
      });      
      //#endregion

  }

  preload () {
    DebugLog('loading ' + currentScene );

    loadBackground();

    loadMenuBar();

    
    //#region Load Images
    //this.load.image(currentScene+'_icons', getSceneImagesFolder() + 'icons.png');
    //this.load.image(currentScene+'_numbers', getSceneImagesFolder() + 'numbers.png');
      this.load.image(currentScene + '_emptyButton', getSceneImagesFolder() + 'emptyButton.png');

      this.load.image(currentScene + '_img_icon', getSceneImagesFolder() + 'img_icon.png');
      //this.load.image(currentScene + '_text_icon', getSceneImagesFolder() + 'text_icon.png');
      //this.load.image(currentScene + '_number_icon', getSceneImagesFolder() + 'number_icon.png');

      /*
      for (let i = 0; i < 6; i++) {
          this.load.image(currentScene + '_number_icon_' + (i).toString(), getSceneImagesFolder() + 'construction_position_' + (i+1).toString() +'.png');
      }
      */

      

    //for(let i=1; i<=4; i++)
    //{
      //this.load.image(currentScene+'_img_0'+i, getSceneImagesFolder() + 'img_0'+i +'.png');
      //this.load.image(currentScene+'_txt_0'+i, getSceneImagesFolder() + 'txt_0'+i +'.png');
    //}

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

    disableRightMouseClick();

    showBackground();
    
    showMenuBar();

    //#region create scene currObjectSculpture

    //create icons
    //this.add.image(posNumberIcons.x, posNumberIcons.y, currentScene+'_icons');
    //this.add.image(posNumberIcons.x, posNumberIcons.y, currentScene+'_numbers');

   

    

    //#endregion

    createSceneFooter();

    showLevelSelectPanel();

    createPopUpMessage();

    fadeInCamera(2);

    createHelp();

  }//create

  update (time, delta) {

    calculateTime();
    
  }//update

}


function resetSelection() {
  for (let i = 0; i < difNo; i++) {
    allImages[i].setAlpha(1);
    allTexts[i].setAlpha(1);
  }

  if (selectedKorresObject != null) {
    selectedKorresObject.setAlpha(0.5);
  }
}

function checkMatchKorres(gameObject) {
    if (isChecking) {  
        //alert(gameObject.data.get('pair') + '-' + selectedKorresObject.data.get('pair'));   
        if (gameObject.data.get('pair') == selectedKorresObject.data.get('pair')) { 
            //alert('PAIR FOUND');  
            let myCorrectIndex = selectedKorresObject.data.get('pair');
            selectedKorresObject.data.set('active', 'false');
            //gameObject.data, set('active', 'false');
            checkSolutionConstruction();

            //let myCorrectIndex = selectedKorresObject.data.get('index');
            //alert(selectedKorresObject.data.get('type'));
            if (selectedKorresObject.data.get('type') === 'image') {
                //selectedKorresObject.setScale(0.5);
                //alert(myCorrectIndex);
                selectedKorresObject.x = posFinalImagesKorres[myCorrectIndex].x;
                selectedKorresObject.y = posFinalImagesKorres[myCorrectIndex].y;
               
            } else if (selectedKorresObject.data.get('type') === 'text') {
                //selectedKorresObject.x = posFinalTextsKorres[myCorrectIndex].x;
                //selectedKorresObject.y = posFinalTextsKorres[myCorrectIndex].y;
            }

        } else {
            //alert('NO PAIR FOUND');
            if (usePenaltyTime) {
                timePenalty += timeToRemove;
                timerEventGame.delay -= timeToRemove * 1000;
            }
        }


        isChecking = false;
        selectedKorresObject = null;
        resetSelection();      
    }
}

function checkSolutionConstruction(){
  let count =0;
  for (let i = 0; i < difNo; i++) {
    if(allImages[i].data.get('active') === 'false'){
      count ++;
    }

    //if(allTexts[i].data.get('active') === 'false'){
      //count ++;
    //}
  }

  if(count === difNo){
    isGameOver = true;
    //set delay timers
    _this.time.delayedCall(500, winConstructionGame, [], this);
  }
}

function winConstructionGame() {
  //winGame();
  DebugLog('You win ' + currentScene + ' game!');

  hidePopUpMessage();

  isGameOver = true;
  isGamePaused = true;

  var myScore = selectedLevel * timeOfGame;

  if (myScore > scoreConstruction) {
    scoreConstruction = myScore;
    SaveScore(myScore);
  }

  textTime.setText(myScore);
  timeBar.setScale(1, 1);
  timeBar.setTint('0xffffff');

  showPopUpMessage('\nΜπράβο!!!\n\nΚέρδισες ' + myScore + ' βαθμούς.\n\nΠαίξε πάλι για να αποκτήσεις περισσότερους.');

  _this.time.delayedCall(3500, restartScene, [], _this);
}

function loseConstructionGame()
{
  for (let i = 0; i < difNo; i++) {
    allImages[i].visible = false;
    allTexts[i].visible = false;
  }

}

function startNewConstructionGame()
{
  //DebugLog('starting '+currentScene+' game...');
  _this.time.delayedCall(500, newConstructionGame, [], _this);
    //newConstructionGame();
}

function newConstructionGame()
{

  //alert('start new game!');
  isGamePaused = false;
  isGameOver = false;

  isChecking = false;

  timeToRemove = 15;

  timePenalty=0;
  timerEventGame = _this.time.addEvent({ delay: totalTimeSelected, timeScale: 1.0 });
  timerEventGame.paused = false;
  timeOfGame = totalTimeSelected;

  textTime.visible=true;

    showHelp();

    //#region define game difficulty parameters
    //alert("level: " + selectedLevel);

    //choose random activites
    //alert("random number: " + Phaser.Math.RND.between(1, 10));

      
    //alert(selectedLevel);
    if (selectedLevel === 1) {
        difNo = 4;
        imgS=20

    } else if (selectedLevel === 2) {
        difNo = 5;
        imgS = 15;

    } else if (selectedLevel === 3) {
        difNo = 6;
        imgS = 10;
    }

    imgW = game.config.width / (difNo + 1);
    imgX1=imgW*1.2;   

    var btns = [];
    for (var i = 0; i < difNo; i++) {           

       // this.add.image(imgX1 + i * (imgW + imgS), imgY1 + 200, currentScene + '_img_icon');
        this.add.image(imgX1 + i * (imgW + imgS), imgY1 + 530, currentScene + '_img_icon');
       // this.add.image(imgX1 + i * (imgW + imgS), imgY1 + 400, currentScene + '_text_icon');
                        
        posFinalImagesKorres[i] = {
            x: imgX1 + i * (imgW + imgS),
            y: imgY1 + 430
        };           

       /*
        posFinalTextsKorres[i] = {
            x: imgX1 + (i-1/2) * imgW + i*imgS,
            y: imgY1 + 400
        }; 
        */
        
           
    }

    activities.sort(function compareNumbers(a, b) {
        return a[1] - b[1];
    });

    shuffleArray(activities);
    
    //pick the first random images
    rand_activities = [];
    for (var i = 0; i < difNo; i++) {
        rand_activities.push(activities[i]);
    }

    //sort them    
    rand_activities.sort(function compareNumbers(a, b) {
        return a[1] - b[1];
    });
     
    LoadImages();      
       
  
    //#endregion
    //randImagePositions = shuffle(posRandImagesKorres);
    //randTextPositions = shuffle(posRandTextsKorres);     

}

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

function LoadImages() {    

    _this.load.once('complete', SetInteraction, this);  
        
    //activity_images=[];
    for (let i = 0; i < difNo; i++) {
        //alert(rand_activities[i][1] + "-" + rand_activities[i][3]);
        _this.load.image(currentScene + '_img_' +rand_activities[i][1], getSceneImagesFolder() + rand_activities[i][3]);       
    } 
    _this.load.start();
}



function SetInteraction() {
    //_this.textures.TextureManager.remove(currentScene + '_img_' + 1);
    
    //position buttons
    for (let i = 0; i < difNo; i++) {
        let btn = _this.add.image(imgX1 + i * (imgW + imgS), imgY1+500, currentScene + '_emptyButton').setInteractive({ cursor: 'pointer' });
        btn.setDataEnabled();
        btn.data.set('pair', i);
        btn.on('pointerdown', function () {           
            checkMatchKorres(this);
        });
    }
      

    //position rand_images
    allImages = [];  
    for (let i = 0; i < difNo; i++) {
        let btnImg = _this.add.image(imgX1 + i * (imgW + imgS), imgY1, currentScene + '_img_' + rand_activities[i][1]);
        //alert(btnImg.image);
        let scale=(imgW / btnImg.width);
        btnImg.setDisplaySize(imgW, btnImg.height*scale);
        btnImg.setInteractive();
        btnImg.setDataEnabled();
        btnImg.data.set('pair', i.toString());
        //btnImg.data.set('index', i.toString());
        btnImg.data.set('type', 'image');
        btnImg.data.set('active', 'true');
        btnImg.on('pointerdown', function () {           
            //alert('image' + this.data.get('pair'));
            //alert(btnImg.data.get('active'));
            if (this.data.get('active') === 'true') {
                isChecking = true;
                selectedKorresObject = this;
                resetSelection();
                //alert(this.index)
            }
            //checkMatchKorres(btnImg);
        });
        allImages.push(btnImg);        
    } 
      
    //texts
    allTexts = [];
    for (let i = 0; i < difNo; i++) {
        let btnText = _this.make.text(configConstructionText);        
        btnText.x = imgX1 + (i-1/2) * (imgW) + (i)*imgS;
        btnText.y = imgY1 + 570;
        btnText.setText(rand_activities[i][2]);
        //btnText.setInteractive();
        //btnText.setDataEnabled();
        //btnText.data.set('pair', i.toString());
        //btnText.data.set('index', i.toString());
        //btnText.data.set('type', 'text');
        //btnText.data.set('active', 'true');
        //btnText.on('pointerdown', function () {
            //alert('text' + btnText.data.get('pair'));
            //alert(btnText.data.get('active'));
           //if (btnText.data.get('active') === 'true') {
               //isChecking = true;
               //selectedKorresObject = this;
               //resetSelection();
            //}
        //});       
        allTexts.push(btnText);
    }

    //alert('check');

    //shuffle positions
    
    shuffleArray(allImages);
    //reposition
    for (var i = 0; i < difNo; i++) {
        //alert("init " + allImages[i].x);
        allImages[i].x = imgX1 + i * (imgW + imgS);
        //btnImg.data.set('index', i.toString());
        //alert("final " + allImages[i].x);
    }
    
}

//************ CONSTRUCTION TEXTS*************/
var constructionTextStyle = {
    fontSize: '20px',
    fontFamily: 'centuryGothicRegular',
    color: '#FFFFFF',
    backgroundColor: '#7cb4ab',
    align: 'top',
    wordWrap: { width: imgW-25, useAdvancedWrap: true }
}

var configConstructionText = {
    x: 0,
    y: 0,
    padding: 16,
    text: '',
    style: constructionTextStyle
}

//********************************************/
