//guides to position the sculptures
var posY1 = 125;
var posX1 = 250;
var noScultpures = 5; //sculptures to position

//cound found sculptures
var foundSculptures = 0;

//array to hold sculpture thumbs and 
var foto_thumbs = [];
//positions of the foto_thumbs
var previews = [];

// current sculpture
var currObjectSculpture;

//right - wrong
var s1, w1;
//higlight selected 
var selectedSculpture;

var posIntroCharacterSculpture = {x: 389,  y: 689};

//according to level
var totalPiecesToFound;

var canContinue = 0;

class SculptureScene extends Phaser.Scene {

  // #region config
  constructor (config) {
    super({
      key: 'sculpture'
    })
  }
  // #endregion

  init () {
    _this = this

    // set scene name
    currentScene = 'sculpture'

    gameId = getDBgameId(currentScene)

    isGameOver = true
    isGamePaused = true

    initTimer()

    totalTime = {easy: 60000, medium: 600000, hard: 300000, champion: 90000}

    //foundPoints = [0, 0, 0, 0, 0, 0]

    //allFotoContainers = []

    currObjectSculpture = null

    posIntroCharacter = posIntroCharacterSculpture;
    
    //#region set intro links
    if (languange === 'gr') {
      areaAkroteria = new Phaser.Geom.Rectangle(introZeroPos.x + 528, introZeroPos.y + 475, 151, 35);
      RepositionRect(areaAkroteria);

      areaPediments = new Phaser.Geom.Rectangle(introZeroPos.x + 825, introZeroPos.y + 366, 134, 35);
      RepositionRect(areaPediments);

      areaDoricFrieze = new Phaser.Geom.Rectangle(introZeroPos.x + 890, introZeroPos.y + 404, 104, 35);
      RepositionRect(areaDoricFrieze);

      areaIonicFrieze = new Phaser.Geom.Rectangle(introZeroPos.x + 471, introZeroPos.y + 440, 89, 37);
      RepositionRect(areaIonicFrieze);

      areaCofferings = new Phaser.Geom.Rectangle(introZeroPos.x + 349, introZeroPos.y + 510, 160, 36);
      RepositionRect(areaCofferings);
    }
    else{//EN
      areaAkroteria = new Phaser.Geom.Rectangle(introZeroPos.x + 486, introZeroPos.y + 492, 123, 35);
      RepositionRect(areaAkroteria);

      areaPediments = new Phaser.Geom.Rectangle(introZeroPos.x + 761, introZeroPos.y + 386, 142, 35);
      RepositionRect(areaPediments);

      areaDoricFrieze = new Phaser.Geom.Rectangle(introZeroPos.x + 876, introZeroPos.y + 419, 72, 35);
      RepositionRect(areaDoricFrieze);

      areaIonicFrieze = new Phaser.Geom.Rectangle(introZeroPos.x + 417, introZeroPos.y + 455, 73, 34);
      RepositionRect(areaIonicFrieze);

      areaCofferings = new Phaser.Geom.Rectangle(introZeroPos.x + 858, introZeroPos.y + 493, 135, 39);
      RepositionRect(areaCofferings);
    }  
    //#endregion
  }

  preload () {
      DebugLog('loading ' + currentScene)

      /******** READ DATA FROM DATABASE *******/
     // SculptureGetSculptures();     
      /****************************************/

      loadBackground();

      loadMenuBar();

    // #region Load Images
    this.load.image(currentScene + 'lathos', getSceneImagesFolder() + 'lathos.png');
    this.load.image(currentScene + 'sosto', getSceneImagesFolder() + 'sosto.png');
    //this.load.image(currentScene + 'hitArea', getSceneImagesFolder() + 'hitArea.png');
    this.load.image(currentScene + 'selected', getSceneImagesFolder() + 'selected.png');
   
    this.load.image(currentScene + 'temple_spots_' + languange, getSceneImagesFolder() + 'temple_spots_' + languange + '.png');
   
    //indicators
    this.load.image(currentScene + 'try', getSceneImagesFolder() + 'try.png');
    this.load.image(currentScene + 'try_checked', getSceneImagesFolder() + 'try_checked.png');
    this.load.image(currentScene + 'board', imagesGeneral + 'board.jpg');

    // #endregion
    loadSceneFooter();
    loadPopUp();
    loadLevelSelectPanel();
    loadHelp();
    showProgress();
  }

  create () {
    console.info(currentScene + ' started');

    imageMouseOver = this.add.image(0,0, currentScene + 'board');
    imageMouseOver.setOrigin(0.5);
    imageMouseOver.depth = 5000;
    imageMouseOver.visible = false;

    textMouseOver = this.make.text(configMouseOverText);
    textMouseOver.depth = 5006;
    textMouseOver.setOrigin(0.5);

      isOnWord = false;
     
    //#region set intro links
    this.input.on('pointermove', function (pointer) {
      var posX = pointer.x < 1615 ? pointer.x : 1615;
      if(areaAkroteria.contains(pointer.x, pointer.y))
      {
        isOnWord = true;
        mouseSetCursor(cursorType.pointer);

        if(languange === 'gr'){ textMouseOver.setText(akroteria_gr); }
        else{ textMouseOver.setText(akroteria_en); }

        textMouseOver.x =  RectCenter(areaAkroteria).x;
        textMouseOver.y = RectCenter(areaAkroteria).y - 70;// pointer.y - 70;
       
        imageMouseOver.setDisplaySize(textMouseOver.getBounds().width + 10, textMouseOver.getBounds().height + 10);
        imageMouseOver.x = textMouseOver.x;
        imageMouseOver.y = textMouseOver.y;
        imageMouseOver.visible = true;
      }
      else if(areaPediments.contains(pointer.x, pointer.y))
      {
        isOnWord = true;
        mouseSetCursor(cursorType.pointer);

        if(languange === 'gr'){ textMouseOver.setText(pediments_gr); }
        else{ textMouseOver.setText(pediments_en); }

        textMouseOver.x = RectCenter(areaPediments).x;
        textMouseOver.y = RectCenter(areaPediments).y - 70; //pointer.y - 70;
       
        imageMouseOver.setDisplaySize(textMouseOver.getBounds().width + 10, textMouseOver.getBounds().height + 10);
        imageMouseOver.x = textMouseOver.x;
        imageMouseOver.y = textMouseOver.y;
        imageMouseOver.visible = true;
      }
      else if(areaDoricFrieze.contains(pointer.x, pointer.y))
      {
        isOnWord = true;
        mouseSetCursor(cursorType.pointer);

        if(languange === 'gr'){ textMouseOver.setText(doric_frieze_gr); }
        else{ textMouseOver.setText(doric_frieze_en); }

        textMouseOver.x = 1615;
        textMouseOver.y = RectCenter(areaDoricFrieze).y - 70;// pointer.y - 70;

        imageMouseOver.setDisplaySize(textMouseOver.getBounds().width + 10, textMouseOver.getBounds().height + 10);
        imageMouseOver.x = textMouseOver.x;
        imageMouseOver.y = textMouseOver.y;
        imageMouseOver.visible = true;
      }
      else if(areaIonicFrieze.contains(pointer.x, pointer.y))
      {
        isOnWord = true;
        mouseSetCursor(cursorType.pointer);

        if(languange === 'gr'){ textMouseOver.setText(ionic_frieze_gr); }
        else{ textMouseOver.setText(ionic_frieze_en); }

        textMouseOver.x = RectCenter(areaIonicFrieze).x;
        textMouseOver.y = RectCenter(areaIonicFrieze).y - 70;

        imageMouseOver.setDisplaySize(textMouseOver.getBounds().width + 10, textMouseOver.getBounds().height + 10);
        imageMouseOver.x = textMouseOver.x;
        imageMouseOver.y = textMouseOver.y;
        imageMouseOver.visible = true;
      }
      else if(areaCofferings.contains(pointer.x, pointer.y))
      {
        isOnWord = true;
        mouseSetCursor(cursorType.pointer);

        if(languange === 'gr'){ textMouseOver.setText(cofferings_gr); }
        else{ textMouseOver.setText(cofferings_en); }

        textMouseOver.x = RectCenter(areaCofferings).x;
        textMouseOver.y = RectCenter(areaCofferings).y - 70;

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
    //#endregion

      disableRightMouseClick();

      showBackground();

    showMenuBar();

    this.add.image(1061, 410, currentScene + 'temple_spots_'+ languange);

    // this.input.setDefaultCursor('url(assets/input/cursors/vigyori/arrow.cur), pointer')
    //  Create some custom cursor boxes
    // this.add.sprite(100, 300, 'box').setInteractive({ cursor: 'url(assets/input/cursors/vigyori/link.cur), pointer' })

    selectedSculpture = this.add.image(0, 0, currentScene + 'selected').setOrigin(0, 0.5);
    selectedSculpture.visible = false;
    selectedSculpture.depth = 0;

    w1 = this.add.image(0, 0, currentScene + 'lathos').setOrigin(0.5, 0.5);
    w1.visible = false;
    w1.depth = 20;

      /*
    var hitArea = this.add.image(1004, 524, currentScene + 'hitArea').setInteractive().setOrigin(0.5, 0.5).setName('hitArea');
    hitArea.on('pointerdown', function () {
      if (usePenaltyTime) {
        timePenalty += timeToRemove;
        timerEventGame.delay -= timeToRemove * 1000;
      }

      checkMatchSculpture(hitArea);
      })
      */
         
    

    createSceneFooter();

    showLevelSelectPanel();

    createPopUpMessage();

    // onCanvasLoseFocus()

    fadeInCamera(1);

    createHelp();
  } // create

  update (time, delta) {
    calculateTime()
  } // update

}

function SculptureDataRead() {   
    //CREATE ZONES
    for (let i = 0; i < temple_parts.length; i++) {
        //alert(temple_parts[i]);
        var id = temple_parts[i][0];
        var memberid = temple_parts[i][1];
        var name = temple_parts[i][2]
        var x = temple_parts[i][3];
        var y = temple_parts[i][4];
        var w = temple_parts[i][5];
        var h = temple_parts[i][6];
        var z = _this.add.zone(x, y, w, h).setInteractive({ cursor: 'pointer' }).setOrigin(0, 0);
        z.setDataEnabled();
        z.data.set('zone', temple_parts[i][0]);
        z.data.set('member', 'member' + temple_parts[i][1]);       
        z.on('pointerdown', function () {           
            checkMatchSculpture(this);
        })
                
        var preview = [temple_parts[i][0], temple_parts[i][3], parseInt(temple_parts[i][4]), 0];        
        previews.push(preview);
    }
    
    //to READ  RANDOM SCULPTURES
    shuffleArray(sculptures);   
    //Load images of the randomly selected sculptures
    LoadSelectedSculptureImages();

}

function LoadSelectedSculptureImages() {
    _this.load.once('complete', SetSculptureImagesIntereaction, this);

    //give image a name according to the database value and not the i
    for (let i = 0; i < noScultpures; i++) {       
        _this.load.image(currentScene + '_img_' + sculptures[i][0], getSceneImagesFolder() + sculptures[i][2]);
        //alert(currentScene + '_img_' + sculptures[i][0]);
    }
    _this.load.start();
}

function SetSculptureImagesIntereaction() {
    var guideX = posX1;
    //calculate scale!!!
    var totalWidth = 0;
    var fotos = [];
    for (let i = 0; i < noScultpures; i++) {        
        var foto = _this.add.image(posX1, posY1, currentScene + '_img_' + sculptures[i][0]).setInteractive({ cursor: 'pointer' }).setOrigin(0, 0.5).setName(sculptures[i][0]);

        //calulate total images width
        totalWidth += foto.width; 

        foto.setDataEnabled();
        foto.data.set('found', 'no');
        foto.data.set('zone', sculptures[i][1]);
        foto.data.set('member', 'member' + sculptures[i][3]);
        foto.data.set('index', i)
        foto.data.set('info', sculptures[i][4])
        foto.on('pointerdown', function () {
             btnListener(this);           
        })
        fotos.push(foto);
    }
    //calculate the scale for all images to fit
    let scale = (game.config.width - posX1) / totalWidth;
      
    //scale and reposition images
    for (var i = 0; i < fotos.length; i++) {
        fotos[i].setScale(scale);
        fotos[i].x = guideX;
        fotos[i].y=posY1;
       // fotos[i].y = (250 - fotos[i].displayHeight)/2;
        guideX += fotos[i].displayWidth;
    }

    //create preview images 
    foto_thumbs = [];
    for (let i = 0; i < noScultpures; i++) {
        var foto_thumb = _this.add.image(0, 0, currentScene + '_img_' + sculptures[i][0]).setOrigin(0, 0.5);
        foto_thumb.setScale(0.4);
        foto_thumb.setCrop(0, 0, foto_thumb.height, foto_thumb.height);
        foto_thumb.visible = false;
        foto_thumbs.push(foto_thumb);
    }
}

//Shuffle array
function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

function btnListener(gameObject) {
 
  if (!isGamePaused && !isGameOver) {
    currObjectSculpture = gameObject;   
      if (currObjectSculpture.data.get('found') === 'no') {
          selectedSculpture.setDisplaySize(gameObject.displayWidth, gameObject.displayHeight);
          selectedSculpture.setPosition(gameObject.x, gameObject.y);
          selectedSculpture.visible = true;
          w1.visible = false;
          isChecking = true;
    } else {
        currObjectSculpture = null;
    }
  }
}

function checkMatchSculpture (gameObject) {
  if (isChecking) {
    isChecking = false;
    selectedSculpture.visible = false;
    if (currObjectSculpture.data.get('member') === gameObject.data.get('member')) {      
        currObjectSculpture.setAlpha(0.5);
        currObjectSculpture.data.set('found', 'yes');                
        var curZone = gameObject.data.get('zone'); 
        for (var i=0; i < temple_parts.length; i++) {
            if (previews[i][0] === curZone) {               
                curPreview = previews[i];
            }
        }        
       
        var curIndex = currObjectSculpture.data.get('index');
        var curThumb = foto_thumbs[curIndex];       
        curThumb.x = parseInt(curPreview[3]) * curThumb.displayHeight + parseInt(curPreview[1]);
        curThumb.y = parseInt(curPreview[2]) ;
        if (curZone == 3 || curZone==4) { curThumb.y +=75;}
               
        curThumb.visible = true;
        curPreview[3]++; //add to move next preview       

        totalPiecesToFound--;
        foundSculptures++;     
        
     
        showCorrectEffort(foundSculptures-1);     
        if (totalPiecesToFound === 0) { canContinue = 1; }
      
        showPopUpMessage(currObjectSculpture.data.get('info'));

    } else {
        w1.setPosition(currObjectSculpture.x+currObjectSculpture.displayWidth/2, currObjectSculpture.y)
        w1.visible = true; 
        if (usePenaltyTime) {
            timePenalty += timeToRemove;
            timerEventGame.delay -= timeToRemove * 1000;
        }
    }
    currObjectSculpture = null;
  }
}

function startNewSculptureGame () { 
  _this.time.delayedCall(500, newSculptureGame, [], _this)
}

function newSculptureGame() {

    /******** READ DATA FROM DATABASE *******/
    SculptureGetSculptures();  
    //when read, go to load the images
    /****************************************/ 
    isGamePaused = false;
    isGameOver = false;

    isChecking = false;
    canContinue = 0;

    timeToRemove = 5;

    timePenalty = 0;
    timerEventGame = _this.time.addEvent({ delay: totalTimeSelected, timeScale: 1.0 });
    timerEventGame.paused = false;
    timeOfGame = totalTimeSelected;

    textTime.visible = true;

    if (selectedLevel === 1) { usePenaltyTime = true; timeToRemove = 5; totalPiecesToFound = 3;  }
    else if (selectedLevel === 2) { usePenaltyTime = true; timeToRemove = 10; totalPiecesToFound = 4; }
    else if (selectedLevel === 3) { usePenaltyTime = true; timeToRemove = 15; totalPiecesToFound = 5; }

    maxEfforts = totalPiecesToFound;

    //#region Indicators
    //try indicators
    groupEffortIcons = _this.add.group({
        key: currentScene + 'try',
        maxSize: 10,
        setXY:
        {
            x: 855,
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
            x: 855,
            y: 998,
            stepX: 62
        },
        repeat: 10
    });

    hideGroupCorrectIcons();
    showEfforts();

    //#endregion    

    currObjectSculpture = null;

    isChecking = false;
    showHelp();
}

function loseSculptureGame () {
    hideGroupCorrectIcons();
}

function winSculptureGame () {
  // winGame()
  //DebugLog('You win ' + currentScene + ' game!');
   // audio
   

  canContinue = 2;

  hidePopUpMessage();

  hideGroupCorrectIcons();

  var myScore = selectedLevel * timeOfGame;
  if (myScore > scoreSculpture) {
    scoreSculpture = myScore;
    SaveScore(myScore);
  }

  textTime.setText(myScore);
  timeBar.setScale(1, 1);
  timeBar.setTint('0xffffff');  

}

function ContinueSculpture(){

  if (canContinue === 0) {
    hidePopUpMessage();
    return;
  }else
  if(canContinue === 1){
    winSculptureGame();
    return;
  }


  isGameOver = true;
  isGamePaused = true;
  var myScore = selectedLevel * timeOfGame;
  showPopUpMessage('\nΜπράβο!!!\n\nΚέρδισες ' + myScore + ' βαθμούς.\n\nΠαίξε πάλι για να αποκτήσεις περισσότερους.');
    //play sound
    audioFanfare.play();
    audioCheer.play(); 
  //_this.time.delayedCall(3500, restartScene, [], _this);
}
