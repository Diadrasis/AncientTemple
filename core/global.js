//#region General Variables

var inDevelopmentState = false;


function DebugLog(text){
    if(!inDevelopmentState){return;}
    console.log(text);
}

var _this;

var languange ='gr';

var isNewPlayer = true;

var playerId;
var gameId;

//boolean to check if player's game scores have been read
//var bestScoresRead = false;

//boolean to check if player's game scores have been read
//var gameScoresRead = false;

//boolean to determine if the intro texts have been read from the database;
//var intoTextsRead=false;

//boolean to check that did you know have been read
//var dykDataRead=false;

// boolean to determine if the data of each game have been read from the database
var gameDataRead = false;

//to determine double click (is not implement yet in phaser 3)
var clickCounts = 0;

//hit top sprite
// this.input.topOnly = true;

//readonly
//var sceneNames = Object.freeze(['construction', 'type', 'sign', 'form', 'sculpture', 'geography', 'neoclassic']);
var sceneNames = Object.freeze(['geography', 'sign', 'type', 'construction', 'form', 'sculpture', 'neoclassic']);

//get scene name for menu buttons
function getScene(x) {
    if (x > 0 && x < 8) {
        return sceneNames[x - 1];
    }
    DebugLog('error loading scene!!! (global.js: line 70');
    return 'menu';
}

//scores image elements
var scoreImages =  Object.freeze(['points_geography', 'points_sign', 'points_type', 'points_construction', 'points_form', 'points_sculpture']);
//scores text elements
var scoreText_1, scoreText_2, scoreText_3, scoreText_4, scoreText_5, scoreText_6;

var imagesFolder =  Object.freeze('assets/images/');

var imagesGeneral = Object.freeze('assets/images/global/');

var previousScene = 'none';
var currentScene = '0';
var didyouknowScene = '0';

//game scores
var scoreSculpture = 0;
var scoreGeography = 0;
var scoreType = 0;
var scoreForm = 0;
var scoreSign = 0;
var scoreConstruction = 0;
var scoreNeoclassic = 0;

//var scoreGames = [scoreGeography, scoreSign,  scoreType, scoreConstruction, scoreForm, , scoreSculpture, , scoreNeoclassic];

var dbSceneNames = Object.freeze(['null','geography', 'sign', 'type', 'construction', 'form', 'sculpture', 'neoclassic']);

//get scene index
function getDBgameId(scene){
    return  dbSceneNames.indexOf(scene);
}

function SaveScore(score){
    gameId = dbSceneNames.indexOf(currentScene);
    SetGameScore(playerId, gameId, score);
}

function showGameScore(game_id, score){
    if(game_id===1){scoreGeography = score;}else
    if(game_id===2){scoreSign = score;}else
    if(game_id===3){scoreType = score;}else
    if(game_id===4){scoreConstruction = score;}else
    if(game_id===5){scoreForm = score;}else
    if(game_id===6){scoreSculpture = score;}else
    if(game_id===7){scoreNeoclassic = score;}
}

function getScoreOfGame(indx){
    if(indx===1){ return scoreGeography;}else
    if(indx===2){ return scoreSign;}else
    if(indx===3){ return scoreType;}else
    if(indx===4){ return scoreConstruction;}else
    if(indx===5){ return scoreForm;}else
    if(indx===6){ return scoreSculpture;}else
    if(indx===7){ return scoreNeoclassic;}
}

function setScoreOfGame(indx, score){
    indx ++;

    if(indx===1){ scoreGeography = score;}else
    if(indx===2){ scoreSign = score;}else
    if(indx===3){ scoreType = score;}else
    if(indx===4){ scoreConstruction = score;}else
    if(indx===5){ scoreForm = score;}else
    if(indx===6){ scoreSculpture = score;}else
    if(indx===7){ scoreNeoclassic = score;}

}

//EFFORTS or TRIES ##################################################
var maxEfforts = 7;
var groupEffortIcons, groupCorrectIcons;

function hideGroupCorrectIcons()
{
  for(var i=0; i<groupCorrectIcons.getLength(); i++){
    groupCorrectIcons.getChildren()[i].visible=false;
  }
}

function showEfforts()
{
  for(var i=0; i<groupEffortIcons.getLength(); i++){
    if(i<maxEfforts){
      groupEffortIcons.getChildren()[i].visible=true;
    }else{
      groupEffortIcons.getChildren()[i].visible=false;
    }
  }
}

function showCorrectEffort(indx) {
    groupCorrectIcons.getChildren()[indx].visible = true;
}

//##################################################################


function loadScores(){
    //scoreGames = [scoreGeography, scoreSign,  scoreType, scoreConstruction, scoreForm, scoreSculpture, scoreNeoclassic];
    DebugLog('start loading scores...');

    (function myLoop(i) {
        setTimeout(function () {

            GetGameScore(playerId, i);

            //DebugLog(playerId + ' >> hello ' + i + ' = ' + score_points);

            if (--i) {myLoop(i); }else{
               // DebugLog('finsh loading scores...');
                isLoginFinishLoading = true;
                _this.time.delayedCall(1500, OnScoresFinishLoading, [], _this);
            }     //  decrement i and call myLoop again if i > 0
        }, 250)
            
    })(7); 

    

}

function isUnlockNeoclassical()
{
    for(var i=0; i<6; i++){
        if(gameScores[i][1]  <= 0){
            return false;
        }
    }
    return true;
}

function isRealValue(obj)
{
 return obj && obj !== 'null' && obj !== 'undefined';
}

var customList = new Array();

//example
//customList.push({keyName:'img1', fileUrl:''assets/pics/img1.jpg', posX:100, posY:150})
//loadCustom(customList);

function loadCustom(listToLoad) {
    if (listToLoad.length > 0) {
        this.load.once('complete', addCustom, this);

        for (var i = 0; i < customList.length; i++) {
            _this.load.image(listToLoad[i].keyName, listToLoad[i].fileUrl);
        }

        this.load.start();
    }else{
        DebugLog('list to load is empty !!!')
    }
}

function addCustom ()
{
    if (listToLoad.length > 0) {
        for (var i = 0; i < customList.length; i++) {
            _this.add.image(listToLoad[i].posX, listToLoad[i].posY, listToLoad[i].keyName);
        }
    }else{
        DebugLog('list to add is empty !!!')
    }
}



//#region In GAME  Variables
var isGamePaused = true;
var isGameOver = true;

var isChecking = false;

var timePenalty;
var usePenaltyTime = false;

var foundPoints = [0,0,0,0,0,0];
var zonesFound = [];

//#endregion



function returnToMenu() {
    game.scene.stop(currentScene);
    game.scene.start('menu');
}

function restartScene (){
    game.scene.stop(currentScene);
    game.scene.start(currentScene);
}

function disableRightMouseClick(){
    //  Stop the right-click from triggering the context menu
    //  You can also set this in the game config
    _this.input.mouse.disableContextMenu();
}

function onCanvasLoseFocus(){
    var graphicsDraft = _this.add.graphics();

    graphicsDraft.fillStyle(0x000000, 0.5);
    graphicsDraft.fillRect(0, 0, 1920, 1080);
    graphicsDraft.setVisible(false);

    _this.sys.game.events.on('mouseout', function () {

        graphicsDraft.setVisible(true);

    });

    _this.sys.game.events.on('mouseover', function () {

        graphicsDraft.setVisible(false);

    });
}

function pauseGame()
{
    isGamePaused = !isGamePaused;
    timerEventGame.paused = isGamePaused;
    backgroundObject.depth = isGamePaused ? 5000 : -5;
    pauseFog.visible = isGamePaused;
    pauseTextObject.visible = isGamePaused;

    DebugLog('PAUSE = '+isGamePaused);
}

function winGame()
{
    DebugLog('You win '+ currentScene + ' game!');

    isGameOver = true;
    isGamePaused = true;

    var score = selectedLevel * timeOfGame;

    DebugLog('selectedLevel = '+selectedLevel);
    DebugLog('timeOfGame = '+timeOfGame);
    DebugLog('score = '+score);
  
    textTime.setText(score);
    timeBar.setScale(1, 1);
    timeBar.setTint('0xffffff');

    //_this.time.delayedCall(2000, restartScene, [], _this);
    
}

function loseGame()
{
   DebugLog('You lose '+ currentScene +' game');

   isGameOver = true;
   isGamePaused = true;
   
   if(currentScene==='geography'){
    loseGeographyGame();
   }else
   if(currentScene==='type'){
    loseTypeGame();
   }else
   if(currentScene==='form'){
    loseFormGame();
   }else
   if(currentScene==='construction'){
    loseConstructionGame();
   }else
   if(currentScene==='sculpture'){
    loseSculptureGame();
   }else
   if(currentScene==='sign'){
    loseSignGame();
   }else
   if(currentScene==='neoclassic'){
    
   }

   showPopUpMessage('\nΤέλος Χρόνου!\n\nΈχασες\n\nΠαίξε ξανά.');

}

// #region load progress
var progressbar;
var progressBox;

function showProgress()
{
    progressbar = _this.add.graphics()
    progressBox = _this.add.graphics()
    progressBox.fillStyle(0x222222, 0.8)
    progressBox.fillRect(1920 / 2 - 350, 1080 / 2 - 12.5, 700, 25)

    progressbar.depth = 100;
    progressBox.depth = 101;


    /**
     * Updates the progress bar.
     * 
     * @param {number} percentage 
     */
    var updateProgressbar = function (percentage) {
        progressbar.clear();
        progressbar.fillStyle(0xffffff, 1);
        progressbar.fillRect(1920 / 2 - 350, 1080 / 2 - 12.5, percentage * 700, 25);
    }

    _this.load.on('progress', updateProgressbar)

    _this.load.once('complete', function () {
        _this.load.off('progress', updateProgressbar)
        progressbar.destroy();
        progressBox.destroy();
    }, _this)

}

// #endregion


//#endregion


//#region Visual Functions


var graphics;
var levelText;

//the static containers of photos
var foto1, foto2, foto3, foto4, foto5, foto6;
var allFotoContainers = [];
var allFotoTitlesTexts = [];

var inGame_MenuLeft = 'menuLeft';
var inGame_MenuLeft2 = 'menuLeft2';
var inGame_BarTimer = 'timerBar';
var inGame_Player = 'player';

var background = 'bg';
var backgroundObject;
var helpObject;
var pauseTextObject, pauseFog;

var menuBarHomeButton, menuBarPauseButton, menuBarRestartButton, menuBarHelpButton, menuBarPreviewButton;

var popUpMessage, popUpText, popUpTitle;
var posPopUpMessage = {x: 941, y:740};

var imgnotfoundKey = 'imgnotfound';

//#region background

function loadBackground()
{
   // game.canvas.style.cursor = "progress"; //move //pointer //crosshair
    mouseSetCursor(cursorType.wait);
    
    background = background + currentScene;
    _this.load.image(background, getSceneImagesFolder() + 'bg.jpg');
    
    //DebugLog(getSceneImagesFolder() + 'bg.jpg');

    _this.load.image(imgnotfoundKey, imagesGeneral + 'imgnotfound.png');
}

function getSceneImagesFolder()
{
    return imagesFolder + currentScene + '/';
}

function showBackground()
{
    //game.canvas.style.cursor = "default";
    mouseSetCursor(cursorType.default);

    backgroundObject = _this.add.image(0, 0, background).setOrigin(0, 0); 
}

//#endregion background

//#region menu bar

function loadMenuBar()
{
    _this.load.image(inGame_MenuLeft, imagesGeneral + 'menu.png');
    _this.load.image(inGame_MenuLeft2, imagesGeneral + 'menu_2.png');
    _this.load.image(inGame_BarTimer, imagesGeneral + 'timeBar.png');
    _this.load.image(inGame_Player, imagesGeneral + 'player.png');
    _this.load.image('btnMenuEmpty', imagesGeneral + 'btnMenuEmpty.png');
    _this.load.image('pauseFog', imagesGeneral + 'pauseFog.png');

    //load avatar
    _this.load.image('head', imagesFolder + 'player/' + getHeadFileName()+'.png');
}

function ShowMenuBarElements(boolValue){
    //pauseFog.visible = boolValue;
    //pauseTextObject.visible = boolValue;
    timeBar.visible = boolValue;

    menuBarInGame_MenuLeft.visible = boolValue;
    menuBarInGame_BarTimer.visible = boolValue;
    menuBarHeadIcon.visible = boolValue;
    menuBarMaskHead.visible = boolValue;

    levelText.visible = boolValue;
    textTime.visible = boolValue;

    menuBarHomeButton.visible = boolValue;

    menuBarPauseButton.visible = boolValue;
    menuBarRestartButton.visible = boolValue;
    menuBarHelpButton.visible = boolValue;
}

var menuBarInGame_MenuLeft;
var menuBarInGame_BarTimer;
var menuBarHeadIcon;
var menuBarMaskHead;

function showMenuBar()
{
    pauseFog = _this.add.image(0, 0, 'pauseFog').setOrigin(0, 0); 
    pauseFog.depth = 5005;
    pauseFog.setInteractive();
    pauseFog.visible = false;
    pauseFog.on('pointerdown', pauseGame, _this);

    pauseTextObject = _this.make.text(configPauseText);
    pauseTextObject.depth = 5006;
    pauseTextObject.setOrigin(0.5, 0.5);
    pauseTextObject.visible = false;

    if(currentScene === 'form' || currentScene === 'sign' || currentScene === 'type'){
        menuBarInGame_MenuLeft = _this.add.sprite(87, 494, inGame_MenuLeft2);
        menuBarPreviewButton = _this.add.sprite(55, 551, 'btnMenuEmpty').setInteractive({ cursor: 'pointer' });
        menuBarPreviewButton.depth = 10;
    }else{
        menuBarInGame_MenuLeft = _this.add.sprite(87, 494, inGame_MenuLeft);
        if(isRealValue(menuBarPreviewButton)){menuBarPreviewButton.destroy();}
    }

    menuBarInGame_BarTimer = _this.add.sprite(0, 66, inGame_BarTimer).setOrigin(0, 0.5).setTint('0xa3a3a3');

    timeBar = _this.add.sprite(0, 66, inGame_BarTimer);
    timeBar.setOrigin(0, 0.5);
    timeBar.setTint('0xc4ffcb');

   // _this.add.sprite(192, 66, inGame_Player);

    menuBarMaskHead = _this.make.image({
        x: 192,
        y: 66,
        key: inGame_Player,
        add: true
    });

    if (currAvatarIsBoy === 'true') {
        menuBarHeadIcon =  _this.add.sprite(204.5, 65, 'head');
        menuBarHeadIcon.setScale(0.3);
        menuBarHeadIcon.depth = 10;
        menuBarHeadIcon.flipX = true;
        menuBarHeadIcon.mask = new Phaser.Display.Masks.BitmapMask(_this, menuBarMaskHead);
    } else {
        menuBarHeadIcon =  _this.add.sprite(203.5, 80, 'head');
        menuBarHeadIcon.setScale(0.3);
        menuBarHeadIcon.depth = 10;
        menuBarHeadIcon.flipX = true;
        menuBarHeadIcon.mask = new Phaser.Display.Masks.BitmapMask(_this, menuBarMaskHead);
    }


    levelText = _this.add.text(150, 66, '1', { fontSize: '23px', fill: '#000' });
    levelText.setOrigin(0.5);
    levelText.depth=12;
    levelText.setFontStyle('bold');

    textTime = _this.add.text(pos_Clock.textX, pos_Clock.textY, '', { fontSize: '40px', fill: '#000' });
    textTime.setOrigin(0.5,  0.5);
    textTime.visible=false;

    menuBarHomeButton = _this.add.sprite(55, 458, 'btnMenuEmpty').setInteractive({ cursor: 'pointer' });
    menuBarHomeButton.once('pointerdown', function (event) 
    {  
        DebugLog('from '+currentScene+' to didYouKnow');

        //store this scene
        previousScene = currentScene;

        isGamePaused = true;
        game.scene.stop(currentScene);
        game.scene.start('didYouKnow'); //menu
    }, _this);

    menuBarPauseButton = _this.add.sprite(55, 290, 'btnMenuEmpty').setInteractive({ cursor: 'pointer' });
    menuBarPauseButton.on('pointerdown', function () { pauseGame(); }, _this);
    menuBarPauseButton.depth = 10;

    menuBarRestartButton = _this.add.sprite(55, 365, 'btnMenuEmpty').setInteractive({ cursor: 'pointer' });
    menuBarRestartButton.once('pointerdown', function () {  _this.scene.restart() }, _this);
    menuBarRestartButton.depth = 10;

    menuBarHelpButton = _this.add.sprite(55, 210, 'btnMenuEmpty').setInteractive({ cursor: 'help' });
    menuBarHelpButton.on('pointerdown', function () { showHelp(); }, _this);
    menuBarHelpButton.depth = 10;
}



//#endregion menu bar

//#region popUp message

function loadPopUp()
{
    _this.load.image('popup', imagesGeneral + 'popup.png');
}

function createPopUpMessage()
{
    popUpMessage = _this.add.image(posPopUpMessage.x, posPopUpMessage.y, 'popup').setOrigin(0.5, 0.5);
    popUpMessage.setInteractive();
    popUpMessage.visible = false;
    popUpMessage.depth = 2500;
    popUpMessage.on('pointerdown',
    function () {
      isGamePaused = false;
      hidePopUpMessage();
      if(!isGameOver){ continueGame();}else{ _this.time.delayedCall(1500, restartScene, [], _this);}
    });

    popUpText = _this.make.text(configPopUpText);
    popUpText.setOrigin(0.5, 0.5);
    popUpText.visible=false;
    popUpText.depth = 2600;

    popUpTitle = _this.make.text(configPopUpTitle);
    popUpTitle.setOrigin(0.5, 0.5);
    popUpTitle.visible=false;
    popUpTitle.depth = 2600;
}

function showPopUpMessage(infoText) {
    //DebugLog(infoText);

    isGamePaused = true;
    popUpMessage.visible = true;
    popUpText.setText(infoText);
    popUpText.visible = true;

    popUpTitle.visible = true;
}

function showPopUpTitle(infoTitle){
    popUpTitle.setText(infoTitle);
    popUpTitle.visible = true;
}

function hidePopUpMessage() {
    popUpText.visible = false;
    popUpText.setText('');
    popUpMessage.visible = false;
    //popUpTitle.setText('');
    popUpTitle.visible = false;
}


//['geography', 'sign', 'type', 'construction', 'form', 'sculpture', 'neoclassic']
function continueGame(){
    if(currentScene === 'geography'){ continueGeography(); }
    else
    if(currentScene === 'sign'){ ContinueSign(); }
    else
    if(currentScene === 'form'){ ContinueForm(); }
    else
    if(currentScene === 'type'){ ContinueType(); }
    else
    if(currentScene === 'sculpture'){ ContinueSculpture(); }
    else
    if(currentScene === 'neoclassic'){ ContinueNeoclassic(); }
}

//#endregion

//#region help panel

function loadHelp()
{
    _this.load.image(currentScene + '_help_' + languange, getSceneImagesFolder() + currentScene + '_help_' + languange +'.jpg');
    loadButtonsExtra();
}

function createHelp()
{
    helpObject = _this.add.image(0, 0, currentScene + '_help_' + languange).setOrigin(0, 0); 
    helpObject.setInteractive();
    helpObject.on('pointerdown',  function () { showHelp(); }, _this);
    helpObject.visible = false;
    helpObject.depth = 3000;
    createButtonsExtra();
}

var previewButton;
var isPreviewOn = false;


function showHelp() {
    helpObject.visible = !isGamePaused;
    isGamePaused = helpObject.visible;
    timerEventGame.paused = isGamePaused;

    if (currentScene === 'type') {
        if (isTypeFirstHelp && !isGamePaused) {
            isGamePaused = true;
            typeShowPreview();
            isTypeFirstHelp = false;
            _this.time.delayedCall(typeTimeToShowTemplePreview, typeHidePreview, [], _this)
        }
    }
    else
    if (currentScene === 'form') {
        if (isFormFirstHelp && !isGamePaused) {
            isGamePaused = true;
            formShowPreview();
            isFormFirstHelp = false;
            _this.time.delayedCall(4000, formHidePreview, [], _this)
        }
    }
    
}



//#endregion

//#region EXTRA BUTTONS Credits..

function loadButtonsExtra()
{
     //load image button for βαθμολογία - μάθε περισσότερα - συντελεστές
     _this.load.image('btnExtra', imagesFolder + 'menu/' + 'emptyButton' + '.png');
}

var btnRating, btnLearnMore, btnCredits;

function createButtonsExtra()
{

    if (currentScene != 'leaderboard') {

        btnRating = _this.add.image(650, 1022, 'btnExtra').setInteractive({ cursor: 'pointer' });
        btnRating.on('pointerup',
            function () {
                DebugLog('ΒΑΘΜΟΛΟΓΙΑ');
                isGameOver = true;
                previousScene = currentScene;
                game.scene.stop(currentScene);
                game.scene.start('leaderboard');
            }
        );

        btnRating.depth = 3002;
    }

    btnLearnMore =  _this.add.image(964, 1022, 'btnExtra').setInteractive({ cursor: 'pointer' });
    btnLearnMore.on('pointerup',
      function () {
        DebugLog('ΜΑΘΕ ΠΕΡΙΣΣΟΤΕΡΑ');
          isGameOver = true;
          /* go to learnomore.ancienttemple.gr, according to the current scene
        previousScene = currentScene;
        game.scene.stop(currentScene);
        game.scene.start('moreToLearn'); */
          //alert(currentScene);
          switch (currentScene) {
              case 'geogrphy':
                  window.location.href = "http://learnmore.ancienttemple.gr";
                  break;
              case 'form':
                  window.location.href = "http://learnmore.ancienttemple.gr";
                  break;
              default:
                  window.location.href = "http://learnmore.ancienttemple.gr"; 
          }

      }
    );

    btnLearnMore.depth = 3002;

    if (currentScene != 'credits') {

        btnCredits = _this.add.image(1280, 1022, 'btnExtra').setInteractive({ cursor: 'pointer' });
        btnCredits.on('pointerup',
            function () {
                DebugLog('ΣΥΝΤΕΛΕΣΤΕΣ');
                isGameOver = true;
                previousScene = currentScene;
                game.scene.stop(currentScene);
                game.scene.start('credits');
            }
        );

         btnCredits.depth = 3002;
    }

    
}

function destroyButtonsExtra(){ DebugLog('destroyButtonsExtra');
    menuBarHomeButton.depth=10;
    btnRating.depth = -3002;
    btnLearnMore.depth = -3002;
    btnCredits.depth = -3002;
    btnRating.destroy();
    btnLearnMore.destroy();
    btnCredits.destroy();
}

//#endregion

//#region scene footer
var footerScene;

function loadSceneFooter(){     DebugLog('language = '+languange);
    _this.load.image(currentScene + 'footer' +languange, getSceneImagesFolder() + currentScene + '_footer_'+languange+'.png');
}

function createSceneFooter(){
    footerScene = _this.add.image(960, 1015, currentScene + 'footer'+languange);
    footerScene.setOrigin(0.5, 0.5);
    footerScene.depth = 39;
}

function loadPreviousSceneFooter(){     DebugLog('language = '+languange);
    _this.load.image(previousScene + 'footer' + languange, getSceneImagesFolder() + previousScene + '_footer_'+ languange + '.png');
}

function createPreviusSceneFooter(){
    footerScene = _this.add.image(960, 1015, previousScene + 'footer' + languange);
    footerScene.setOrigin(0.5, 0.5);
    footerScene.depth = 39;
}

//#endregion



//#region level select panel


var selectedLevel;

var lvl1, lvl2, lvl3;
var introPanelBubble, introPanelTextImage, introPanelLevelButtons, introBackground;
var IntroTextTitle, IntroTextDescription, IntroTextBubble;
var posLevel_1 = {x:1088, y:910};
var posLevel_2 = {x:1353, y:910};
var posLevel_3 = {x:1615, y:910};
var posLevel_Neoclassic = {x:954, y:823};
var posIntroCharacter = {x:438 , y:688};
//intro
var posIntroBubble = {x:494, y:236};
var posIntroBubbleText = {x:494, y:80};
var posIntroTextImage = {x:1338, y:599};
var posIntroTextTitle = {x:1338, y:328};
var posIntroTextDescription = {x:1338, y:416};
var posIntroPlayerBoy = {x:0, y:0};
var posIntroPlayerGirl = {x:0, y:0};
var posIntroPlayerThing = {x:0, y:0};
var introCharacter;
var btnIntroHome, footer_menu;
var introAvatarShadow , introAvatarBody, introAvatarHead;

var posIntroAvatarBoyShadow = {x:689, y:797};
var posIntroAvatarBoyHead = {x:689, y:666};
var posIntroAvatarBoyBody = {x:679, y:855};
var posIntroAvatarGirlShadow = {x:706, y:794};
var posIntroAvatarGirlHead = {x:692, y:695};
var posIntroAvatarGirlBody = {x:705, y:851};

var configIntroTextTitle = {
    x: posIntroTextTitle.x,
    y: posIntroTextTitle.y,
    text: '',
    origin: { x: 0.5, y: 0.5 },
    style: {
        fontSize: '35px',
        fontFamily: 'centuryGothicRegular',
        color: '#000000',
        align: 'center',
        wordWrap: { width: 1000, useAdvancedWrap: true }
    }
  };

  var configIntroTextDescription = {
    x: posIntroTextDescription.x,
    y: posIntroTextDescription.y,
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

  var configIntroTextBubble = {
    x: posIntroBubbleText.x,
    y: posIntroBubbleText.y,
    text: '',
    origin: { x: 0.5, y: 0 },
    style: {
        fontSize: '25px',
        fontFamily: 'centuryGothicRegular',
        color: '#FFFFFF',
        align: 'top',
        wordWrap: { width: 600, useAdvancedWrap: true }
    }
  };


function loadLevelSelectPanel()
{
    DebugLog(currentScene + ' >> loadLevelSelectPanel');
    DebugLog(getSceneImagesFolder() + currentScene + '_intro_character.png');

   // if (currentScene != sceneNames[6]) {//if not neoclassic
        _this.load.image(currentScene + 'intro_bubble', getSceneImagesFolder() + currentScene + '_intro_bubble.png');
        _this.load.image(currentScene + 'intro_text', getSceneImagesFolder() + currentScene + '_intro_text.png');
        _this.load.image(currentScene + 'intro_character', getSceneImagesFolder() + currentScene + '_intro_character.png');
        _this.load.image(currentScene + 'level_buttons' +languange, getSceneImagesFolder() + currentScene + '_level_'+languange+'.png');
   // }

    _this.load.image('intro_bg', imagesGeneral + 'intro_bg.jpg');
    _this.load.image('home_button', imagesGeneral + 'home_button.png');
    _this.load.image('footer_menu'+languange, imagesGeneral + 'footer_menu_'+languange+'.png');

    if (currentScene === sceneNames[6]) {
        _this.load.image(currentScene + 'difficultyButton', imagesGeneral + 'levelButton.png');
    } else {
        _this.load.image(currentScene + 'difficultyButton', imagesGeneral + 'difficultyButton.png');
    }

    //DebugLog(currAvatarIsBoy);
    //DebugLog(avatarGlobal[0][2]);

    globalLoadCurrentAvatar();

    if (currAvatarIsBoy === 'true') {
        _this.load.image('globalplayerShadow', imagesFolder + 'player/' + 'boy_shadow' + '.png');
    } else {
        _this.load.image('globalplayerShadow', imagesFolder + 'player/' + 'girl_shadow' + '.png');
    }
    
}

var dbIntroTexts = {title:'', desc:'', character:''};

function delayLoadIntroTexts()
{
    //dbIntroTexts = {title:'', desc:'', character:''};
  IntroTextTitle.setText(dbIntroTexts.title);
  IntroTextDescription.setText(dbIntroTexts.desc);
  IntroTextBubble.setText(dbIntroTexts.character);
}

// substitutes the previews delayed
function LoadIntroTexts() {
    //dbIntroTexts = {title:'', desc:'', character:''};
    IntroTextTitle.setText(dbIntroTexts.title);
    IntroTextDescription.setText(dbIntroTexts.desc);
    IntroTextBubble.setText(dbIntroTexts.character);
}

function showLevelSelectPanel()
{
    DebugLog(currentScene + ' >> showLevelSelectPanel');
    
    var posShadow = posIntroAvatarBoyShadow;
    var posHead = posIntroAvatarBoyHead;
    var posBody = posIntroAvatarBoyBody;

    if(currAvatarIsBoy != 'true'){
        posShadow = posIntroAvatarGirlShadow;
        posHead = posIntroAvatarGirlHead;
        posBody = posIntroAvatarGirlBody;
    }

    introAvatarShadow = _this.add.image(posShadow.x, posShadow.y, 'globalplayerShadow');
    introAvatarShadow.setScale(0.8);
    introAvatarShadow.depth = 179;

    introAvatarBody = _this.add.image(posBody.x, posBody.y, 'globalbody');
    introAvatarBody.setScale(0.8);
    introAvatarBody.depth = 180;

    introAvatarHead = _this.add.image(posHead.x, posHead.y, 'globalhead');
    introAvatarHead.setScale(0.8);
    introAvatarHead.depth = 181;

    introBackground = _this.add.image(0, 0, 'intro_bg').setOrigin(0, 0).setInteractive(); 

    introPanelBubble = _this.add.image(posIntroBubble.x, posIntroBubble.y, currentScene+'intro_bubble');
    introPanelBubble.setOrigin(0.5, 0.5);

    introPanelTextImage = _this.add.image(posIntroTextImage.x, posIntroTextImage.y, currentScene+'intro_text');
    introPanelTextImage.setOrigin(0.5, 0.5);

    introPanelLevelButtons = _this.add.image(1353, 880, currentScene + 'level_buttons'+languange);
    introPanelLevelButtons.setOrigin(0.5, 0.5);

    //intro character
    introCharacter = _this.add.sprite(posIntroCharacter.x, posIntroCharacter.y, currentScene + 'intro_character');
    introCharacter.depth = 75;

    IntroTextTitle = _this.make.text(configIntroTextTitle);
    IntroTextTitle.setFontStyle('bold');
    
    IntroTextDescription = _this.make.text(configIntroTextDescription);
    IntroTextBubble = _this.make.text(configIntroTextBubble);

    //alert('call intro texts!');
    
    //_this.time.delayedCall(500, delayLoadIntroTexts, [], _this);
    GetGameIntroTexts(gameId);

    var count = 0;
    function onIntroEvent() {
        count += 1;
        console.info(count);
        if (intoTextsRead == true) {
            //timer.destroy();
            DebugLog("intro text are loaded!");
            //LoadIntroTexts();
            introTextTimer.destroy();
            introTextsRead = false;
        } else {
            DebugLog("intro text are not loaded!");
        }
    }

    //intoTextsRead = false;   
    //var introTextTimer = _this.time.addEvent({ delay: 100, callback: onIntroEvent, callbackScope: this, loop: true });

    
    introBackground.depth = 40;
    IntroTextBubble.depth = 60;
    IntroTextTitle.depth = 60;
    IntroTextDescription.depth = 60;
    introPanelTextImage.depth = 49;
    introPanelBubble.depth = 50;
    introPanelLevelButtons.depth = 51;

    //3 extra buttons image
    footer_menu = _this.add.image(959, 1022, 'footer_menu'+languange);
    footer_menu.setOrigin(0.5, 0.5);
    footer_menu.depth = 55;

    btnIntroHome = _this.add.sprite(55, 458, 'home_button').setInteractive({ cursor: 'pointer' });
    btnIntroHome.once('pointerdown', function (event) 
    {  
        DebugLog('from '+currentScene+' to menu');

        isGamePaused = true;

        //store this scene
        previousScene = currentScene;

        game.scene.stop(currentScene);
        game.scene.start('didYouKnow'); //menu
    }, _this);

    btnIntroHome.depth=61;


    // if (currentScene === sceneNames[6]) {//neoclassic

    //     lvl1 = _this.add.sprite(posLevel_Neoclassic.x, posLevel_Neoclassic.y, currentScene + 'difficultyButton').setInteractive({ cursor: 'pointer' }); 
    //     lvl1.depth = 51;

    //     introAvatarShadow.destroy();
    //     introAvatarBody.destroy();
    //     introAvatarHead.destroy();
    //     introPanelBubble.destroy();
    //     introCharacter.destroy();
    //     introPanelTextImage.destroy();
    //     introPanelLevelButtons.destroy();
        
    //     IntroTextBubble.destroy();
    //     IntroTextTitle.destroy();
    //     IntroTextDescription.destroy();

    //     lvl1.once('pointerdown', function () {
    //         selectedLevel = 1;
    //         totalGameCorrectAnswers = totalLevelAnswers.easy;
    //         totalTimeSelected = totalTime.easy;
    //         totalxronos = totalTimeSelected / 1000;
    //         usePenaltyTime = true;
    //         introPanelBubble.visible = false;
    //         startNewGame();
    //     }, _this);

    // } else {

        lvl1 = _this.add.sprite(posLevel_1.x, posLevel_1.y, currentScene + 'difficultyButton').setInteractive({ cursor: 'pointer' });
        lvl2 = _this.add.sprite(posLevel_2.x, posLevel_2.y, currentScene + 'difficultyButton').setInteractive({ cursor: 'pointer' });
        lvl3 = _this.add.sprite(posLevel_3.x, posLevel_3.y, currentScene + 'difficultyButton').setInteractive({ cursor: 'pointer' });

        lvl1.depth = 51;
        lvl2.depth = 51;
        lvl3.depth = 51;

        lvl1.once('pointerdown', function () {
            selectedLevel = 1;
            totalGameCorrectAnswers = totalLevelAnswers.easy;
            totalTimeSelected = totalTime.easy;
            totalxronos = totalTimeSelected / 1000;
            usePenaltyTime = false;
            introPanelBubble.visible = false;
            startNewGame();
        }, _this);

        lvl2.once('pointerdown', function () {
            selectedLevel = 2;
            totalGameCorrectAnswers = totalLevelAnswers.medium;
            totalTimeSelected = totalTime.medium;
            totalxronos = totalTimeSelected / 1000;
            usePenaltyTime = true;
            introPanelBubble.visible = false;
            startNewGame();
        }, _this);

        lvl3.once('pointerdown', function () {
            selectedLevel = 3;
            totalGameCorrectAnswers = totalLevelAnswers.hard;
            totalTimeSelected = totalTime.hard;
            totalxronos = totalTimeSelected / 1000;
            usePenaltyTime = true;
            introPanelBubble.visible = false;
            startNewGame();
        }, _this);

    //}

}

function destroySelectPanel(){  DebugLog('destroySelectPanel');
    introAvatarShadow.destroy();
    introAvatarBody.destroy();
    introAvatarHead.destroy();
    footer_menu.destroy();
    btnIntroHome.destroy();
    introBackground.destroy();
    introPanelBubble.destroy();
    introCharacter.destroy();
    introPanelTextImage.destroy();
    introPanelLevelButtons.destroy();
    IntroTextBubble.destroy();
    IntroTextTitle.destroy();
    IntroTextDescription.destroy();
    lvl1.destroy();
    if(lvl2)
    lvl2.destroy();
    if(lvl3)
    lvl3.destroy();

}

function startNewGame()
{
    destroyButtonsExtra();

    destroySelectPanel();

    mouseSetCursor(cursorType.default);

    if(currentScene==='geography'){
        startNewGeographyGame();
    }else
    if(currentScene==='type'){
        startNewTypeGame();
    }else
    if(currentScene==='form'){
        startNewFormGame();
    }else
    if(currentScene==='construction'){
        startNewConstructionGame();
    }else
    if(currentScene==='neoclassic'){
        startNewNeoclassicGame();
    }else
    if(currentScene==='sculpture'){
        startNewSculptureGame();
    }else
    if(currentScene==='sign'){
        startNewSignGame();
    }

}


//#endregion

//#region timer

var textTime ='';
var pos_Clock = {x: 90, y: 960, textX: 66, textY: 69};
var totalTime = {easy: 120000, medium: 120000, hard: 90000, champion: 90000};
var timeOfGame = 0;
var timerEventGame;
var timeToRemove=0;
var totalTimeSelected = 0;
var timeBar;


function calculateTime()
{
    if (!isGamePaused && !isGameOver) {

        if (timerEventGame.paused) {
            timerEventGame.paused = false;
        }

        timeOfGame = Math.round((totalTimeSelected / 1000) - ((timerEventGame.delay * timerEventGame.getProgress()) / 1000)) - timePenalty;

        timeBarPercentage = timeOfGame / totalxronos;

        timeBar.setScale(timeBarPercentage, 1);

        if (timeOfGame <= totalxronos / 2 && timeOfGame > totalxronos / 3) {
            timeBar.setTint('0xffe0c4');
        }else
        if (timeOfGame <= totalxronos / 3) {
         timeBar.setTint('0xffc4c4');
        }

        if (timeOfGame <= 0 || isNaN(timeOfGame) ) {
            timeOfGame = 0;
            loseGame();
            timerEventGame.paused = true;
        }

        textTime.setText(formatTime(Math.round(timeOfGame)));
    }else{
        if (!timerEventGame.paused) {
            timerEventGame.paused = true;
        }
      }
}

function formatTime(s) {
    // Convert seconds (s) to a nicely formatted and padded time string
    var minutes = "0" + Math.floor(s / 60);
    var seconds = "0" + (s - minutes * 60);
    return minutes.substr(-2) + ":" + seconds.substr(-2);
}

function initTimer()
{
    timerEventGame = _this.time.addEvent({ delay: totalTimeSelected, timeScale: 1.0 });
    timerEventGame.paused = true;
}

function RemoveTime(){
    //remove sec from time
    if (usePenaltyTime) {
      timePenalty += timeToRemove;
      timerEventGame.delay -= timeToRemove * 1000;
    }
  }

//#endregion timer

//#endregion Visual Functions

//#region MENU VARIABLES




var textTitleConfig = {fill: '#ffffff',font: 'bold 72px Tahoma'}; //{fontSize: '50px',color: '#595959',fontFamily: 'Arial'}; // , align: 'center'};
var style = { font: "bold 32px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };

//#endregion

//#region Tetris Variables

//dorikos pieces
var keysDorikos = ['game_01_', 'game_02_', 'game_03_', 'game_04_', 'game_05_', 'game_06_'];


// var sceneObject =
// {
//     id: '',
//     name: '',
//     buttonMenu: 
//     {
//         imageFront:'',
//         imageBack:'',
//         sceneToLoad:'',
//     },
//     score:'',


// }

//#endregion

//#region Check Broser
	 



	
//#endregion
