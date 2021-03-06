// (image preview object)
var templePreview
var piecesNames = ['wall_1', 'wall_2', 'wall_3', 'kolona' ]
var piecesShadowNames = ['wall_1_skia', 'wall_2_skia', 'wall_3_skia', 'kolona_skia']
var posPiecesStaticX = [1629, 1700, 1600, 1460]
var posPiecesStaticY = [788, 240, 550, 411]
var posTempleBase = {x: 153, y: 301}
var pieces = []
var currPiece
var currPieceInitPos = [{x: 1645, y: 888}]
var tween

var grid_wall_4 = []
var grid_wall_3 = []; // sosti thesi [6] [42]
var grid_wall_2 = []; // sosti thesi [0]
var grid_wall_1 = []; // sosti thesi [0] [8]
var grid_column = []; // sosti thesi [0]  [8]  [16]  [24]
var grid_column_2 = []
var allGrids = [grid_wall_1, grid_wall_2, grid_wall_3, grid_column]
var thesi = {x: 0, y: 0}

// οι θέσεις των κομματιών που είναι πάνω στη βάση
var piecesOnBoard = []; // example {id: 0, x: 120, y: 235}
var piecesOnBoardItem = {id: 0, x: 120, y: 235}

var showZoneVisual = false

var maxSearchDistance = 400

var posIntroCharacterType = {x: 433,  y: 692}

var templeLoadKeyName = 'temple_1'
var templeFolderName = 'pieces_0/'
var typeTimeToShowTemplePreview = 5000

// to show complete temple and stop dragging
var isTypeFirstHelp = false;
var isTypeCanDrag = false;

//  A drop zone
//var typeDragZone

// πόσα κομμάτια έχει ο ναός τύπου 1
var allPiecesForCurrentTempleType = 50

class TypeScene extends Phaser.Scene {
  // #region config
  constructor (config) {
    super({
      key: 'type'
    })
  }

  init () {
    _this = this

    // set scene name
    currentScene = 'type'

    gameId = getDBgameId(currentScene)

    console.info(currentScene + ' init')

    showZoneVisual = true

    isGameOver = true
    isGamePaused = true
    isTypeFirstHelp = false

    initTimer()

    totalTime = {easy: 300000, medium: 300000, hard: 600000, champion: 700000}

    usePenaltyTime = true

    posIntroCharacter = posIntroCharacterType

    // DISABLE RIGHT MOUSE CLICK
    //  You can also set this in the game config
    this.input.mouse.disableContextMenu();


    //GR
    if (languange === 'gr') {
      areaCella = new Phaser.Geom.Rectangle(introZeroPos.x + 243, introZeroPos.y + 346, 80, 39);
      RepositionRect(areaCella);

      areaFacade = new Phaser.Geom.Rectangle(introZeroPos.x + 625, introZeroPos.y + 348, 135, 36);
      RepositionRect(areaFacade);
    }
    else{//EN
      areaCella = new Phaser.Geom.Rectangle(introZeroPos.x + 356, introZeroPos.y + 346, 75, 35);
      RepositionRect(areaCella);

      areaFacade = new Phaser.Geom.Rectangle(introZeroPos.x + 777, introZeroPos.y + 346, 110, 35);
      RepositionRect(areaFacade);
    }


  }

  // #endregion

  preload () {
    DebugLog('loading ' + currentScene);

    this.load.image(currentScene + 'board', imagesGeneral + 'board.jpg');

    loadBackground();

    loadMenuBar();

    loadPopUp();

    loadSceneFooter();

    loadLevelSelectPanel();

    loadHelp();

    showProgress();
  }

  create () {
    console.info(currentScene + ' create');

    imageMouseOver = this.add.image(0,0, currentScene + 'board');
    imageMouseOver.setOrigin(0.5);
    imageMouseOver.depth = 5000;
    imageMouseOver.visible = false;

    textMouseOver = this.make.text(configMouseOverText);
    textMouseOver.depth = 5006;
    textMouseOver.setOrigin(0.5);

    isOnWord = false;

    this.input.on('pointermove', function (pointer) {


      if(areaCella.contains(pointer.x, pointer.y))
      {
        isOnWord = true;
        mouseSetCursor(cursorType.pointer);

        if(languange === 'gr'){ textMouseOver.setText(cella_gr); }
        else{ textMouseOver.setText(cella_en); }

        textMouseOver.x = RectCenter(areaCella).x;
        textMouseOver.y = RectCenter(areaCella).y - 70;

        imageMouseOver.setDisplaySize(textMouseOver.getBounds().width + 10, textMouseOver.getBounds().height + 10);
        imageMouseOver.x = textMouseOver.x;
        imageMouseOver.y = textMouseOver.y;
        imageMouseOver.visible = true;
      }
      else if(areaFacade.contains(pointer.x, pointer.y))
      {
        isOnWord = true;
        mouseSetCursor(cursorType.pointer);

        if(languange === 'gr'){ textMouseOver.setText(facade_gr); }
        else{ textMouseOver.setText(facade_en); }
        
        textMouseOver.x = RectCenter(areaFacade).x;
        textMouseOver.y = RectCenter(areaFacade).y - 70;

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

    showBackground()


    //  A drop zone
    // typeDragZone = this.add.zone(20, 20, 20, 20).setDropZone();

    //  Just a visual display of the drop zone
    // graphics = this.add.graphics();

    // if (showZoneVisual && inDevelopmentState) {
    //   graphics.lineStyle(3, 0xff0000);
    //   graphics.strokeRect(typeDragZone.x + typeDragZone.input.hitArea.x, typeDragZone.y + typeDragZone.input.hitArea.y, typeDragZone.input.hitArea.width, typeDragZone.input.hitArea.height)
    // }

    // #region DRAG ENTOLES

    this.input.on('dragstart', function (pointer, gameObject) {
      if (!isTypeCanDrag) {return;}

      mouseSetCursor(cursorType.move)

      if (!isGameOver && !isGamePaused) { // DebugLog('dragstart')

        this.children.bringToTop(gameObject)
        gameObject.setScale(1)
        gameObject.setAlpha(0.5)

        // gameObject.setOrigin(0.5, 0.5)

        pointer.y = gameObject.y
        gameObject.setTexture(templeLoadKeyName + piecesNames[gameObject.name])
      }
    }, this)

    this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
      if (!isTypeCanDrag) {return;}
      if (!isGameOver && !isGamePaused) {  //DebugLog(pointer.x + ' , '+pointer.y)
        gameObject.x = pointer.x
        gameObject.y = pointer.y
      }
    })

    this.input.on('dragenter', function (pointer, gameObject, dropZone) {
      if (!isTypeCanDrag) {return;}

      if (!isGameOver && !isGamePaused) { // DebugLog('dragenter')
        // if (showZoneVisual && inDevelopmentState) {
        //   graphics.clear()
        //   graphics.lineStyle(5, 0x00ff00)
        //   graphics.strokeRect(typeDragZone.x + typeDragZone.input.hitArea.x, typeDragZone.y + typeDragZone.input.hitArea.y, typeDragZone.input.hitArea.width, typeDragZone.input.hitArea.height)
        // }
      }
    })

    this.input.on('dragleave', function (pointer, gameObject, dropZone) {
      if (!isTypeCanDrag) {return;}

      if (!isGameOver && !isGamePaused) { // DebugLog('dragleave')
        // if (showZoneVisual && inDevelopmentState) {
        //   graphics.clear()
        //   graphics.lineStyle(2, 0xff0000)
        //   graphics.strokeRect(typeDragZone.x + typeDragZone.input.hitArea.x, typeDragZone.y + typeDragZone.input.hitArea.y, typeDragZone.input.hitArea.width, typeDragZone.input.hitArea.height)
        // }

        //gameObject.setAlpha(0.5)
      }
    })

    this.input.on('drop', function (pointer, gameObject, dropZone) {
      if (!isTypeCanDrag) {return;}

      if (!isGameOver && !isGamePaused) { // DebugLog('drop')

        thesi = getNearest(pointer.x, pointer.y, allGrids[gameObject.name])

        if (thesi.x === 1234567890) {

          // αφαιρεσε το κομμάτι απο τη λίστα με εκείνα που είνα πάνω στη βάση
          removeFromBase(gameObject)

          _this.tweens.add({
            targets: gameObject,
            x: posPiecesStaticX[gameObject.name], // gameObject.input.dragStartX,
            y: posPiecesStaticY[gameObject.name], // gameObject.input.dragStartY,
            // alpha: 0.1,
            scaleX: 0.8,
            scaleY: 0.8,
            ease: 'Power1',
            duration: 500,
            delay: 0
          })
        } else {
          gameObject.x = thesi.x
          gameObject.y = thesi.y

          gameObject.depth = gameObject.y

          // προσθεσε το κομμάτι σε εκείνα που είναι πάνω στη βάση
          addToBase(gameObject)
        }

        checkSolutionType()
      }
    })

    this.input.on('dragend', function (pointer, gameObject, dropped) {
      if (!isTypeCanDrag) {return;}

      mouseSetCursor(cursorType.default)

      if (!isGameOver && !isGamePaused) {   DebugLog('dragend')

        if (!dropped) {
          // DebugLog(gameObject.name)

          // αφαιρεσε το κομμάτι απο τη λίστα με εκείνα που είναι πάνω στη βάση
          removeFromBase(gameObject)

          if (gameObject.name === '0') { gameObject.setAlpha(1); } else { gameObject.setAlpha(0.1); }

          _this.tweens.add({
            targets: gameObject,
            x: posPiecesStaticX[gameObject.name], // gameObject.input.dragStartX,
            y: posPiecesStaticY[gameObject.name], // gameObject.input.dragStartY,
            // alpha: 0.1,
            scaleX: 0.8,
            scaleY: 0.8,
            ease: 'Power1',
            duration: 500,
            delay: 0
          })

          checkSolutionType()
        }

        // gameObject.setAlpha(1)

        // if (showZoneVisual && inDevelopmentState) {
        //   graphics.clear()
        //   graphics.lineStyle(2, 0xff0000)
        //   graphics.strokeRect(typeDragZone.x + typeDragZone.input.hitArea.x, typeDragZone.y + typeDragZone.input.hitArea.y, typeDragZone.input.hitArea.width, typeDragZone.input.hitArea.height)
        // }
      }
    })

    // #endregion

    piecesOnBoard = [];

    showMenuBar();

    createSceneFooter();

    showLevelSelectPanel();

    createPopUpMessage();

    menuBarPreviewButton.on('pointerdown', function () {
      if (!isPreviewOn) {
        isGamePaused = true;
        timePenalty += timeToRemove * 3;
        timerEventGame.delay -= timeToRemove * 3 * 1000;
        typeShowPreview();
        isPreviewOn = true;
      } else {
        isPreviewOn = false;
        typeHidePreview();
      }
    }, _this);

    createHelp();

    fadeInCamera(1);
  } // create

  update (time, delta) {
    calculateTime()
  } // update

}

function getNearest (posX, posY, array) {
  var X = 1234567890
  var Y = 0
  var dist = 100000

  for (var i = 0; i < array.length; i++) {
    var p = DistanceBetween(posX, posY, array[i].x, array[i].y)

    if (p > maxSearchDistance) {continue;}

    // DebugLog(p)

    if (p < dist) {
      dist = p
      X = array[i].x
      Y = array[i].y
    }
  }

  return {x: X, y: Y}
}

function removeFromBase (piece) {
  if (piecesOnBoard.length > 0) {
    var index = piecesOnBoard.indexOf(piece)
    if (index > -1) {
      piecesOnBoard.splice(index, 1)
    }
  }
}

function addToBase (piece) {
  if (piecesOnBoard.includes(piece)) {return;}

  if (piecesOnBoard.length === 0) {
    piecesOnBoard.push(piece)
  }
  else if (piecesOnBoard.length > 0) {
    var all = 0

    for (var t = 0; t < piecesOnBoard.length; t++) {
      if (piecesOnBoard[t].x === piece.x && piecesOnBoard[t].y === piece.y) {
        all++
      }
    }

    if (all === 0) {
      piecesOnBoard.push(piece)
    }else {
      removeFromBase(piece)

      if (piece.name === '0') {piece.setAlpha(1);}else {piece.setAlpha(0.1);}

      // return to static pos
      _this.tweens.add({
        targets: piece,
        x: posPiecesStaticX[piece.name], // gameObject.input.dragStartX,
        y: posPiecesStaticY[piece.name], // gameObject.input.dragStartY,
        // alpha: 0.1,
        scaleX: 0.8,
        scaleY: 0.8,
        ease: 'Power1',
        duration: 500,
        delay: 0
      })
    }
  }
}

function loseTypeGame () {
  menuBarPreviewButton.visible = false;
  for (var i = 0; i < piecesOnBoard.length; i++) {
    piecesOnBoard[i].visible = false
  }
}

function winTypeGame () {
  DebugLog('You win ' + currentScene + ' game!');

  menuBarPreviewButton.visible = false;

  var myScore = selectedLevel * timeOfGame;
  if (myScore > scoreType) {
    scoreType = myScore;
    SaveScore(myScore);
  }

  textTime.setText(myScore);
  timeBar.setScale(1, 1);
  timeBar.setTint('0xffffff');
       
    showPopUpImage(currentScene + 'feedback_img_' + type_feedback[0], 0, 70);   
    showPopUpTitle( type_feedback[1]);
    showPopUpMessage(type_feedback[2]);  
  
}



function ContinueType(){
  isGameOver = true;
  isGamePaused = true;

  var myScore = selectedLevel * timeOfGame;

  showPopUpMessage('\nΜπράβο!!!\n\nΚέρδισες ' + myScore + ' βαθμούς.\n\nΠαίξε πάλι για να αποκτήσεις περισσότερους.');

 
}

function startNewTypeGame () {
  DebugLog('starting ' + currentScene + ' game...')

  //_this.time.delayedCall(500, newTypeGame, [], _this)

   isTypeFirstHelp = true;
    isTypeCanDrag = false;

    //read feedback from db
    type_feedback = [];
    TypeGetFeedback();
    //when read, start new Type Game

}

var type_feedback = [];

function newTypeGame() {
    
    

    isGamePaused = false
    isGameOver = false

  timeToRemove = 5

  timePenalty = 0
  timerEventGame = _this.time.addEvent({ delay: totalTimeSelected, timeScale: 1.0 })
  timerEventGame.paused = false
  timeOfGame = totalTimeSelected

    textTime.visible = true

    //get types_feedback from database
    if (selectedLevel === 1) { StartTypeB(); type_feedback = types_feedback[0]; }
    else if (selectedLevel === 2) { StartTypeC(); type_feedback = types_feedback[1]; }
    else if (selectedLevel === 3) { StartTypeD(); type_feedback = types_feedback[2]; }

    //if feedback image exists, load it!!!    
    if (type_feedback[3]) {
        LoadSelectedFeedbackImage();
    } else {
        showHelp();
    }

  
}

function LoadSelectedFeedbackImage() {    
    _this.load.once('complete', showHelp, this);  
    _this.load.image(currentScene + 'feedback_img_' + type_feedback[0], getSceneImagesFolder() + type_feedback[3]);    
    _this.load.start();
}

function typeShowPreview () {
  isGamePaused = true;
  isTypeCanDrag = false;
  templePreview.visible = true;
  menuBarPauseButton.visible = false;
  menuBarHelpButton.visible = false;
}

function typeHidePreview(){
  isGamePaused = false;
  isTypeCanDrag = true;
  templePreview.visible = false;
  menuBarPauseButton.visible = true;
  menuBarHelpButton.visible = true;
}

function checkSolutionType () {
  if (selectedLevel === 1) { checkSolutionTypeB(); }
  else if (selectedLevel === 2) { checkSolutionTypeC(); }
  else if (selectedLevel === 3) { checkSolutionTypeD(); }
}
