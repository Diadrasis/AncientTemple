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
    this.input.mouse.disableContextMenu()
  }

  // #endregion

  preload () {
    DebugLog('loading ' + currentScene);

    loadBackground();

    loadMenuBar();

    loadPopUp();

    loadSceneFooter();

    loadLevelSelectPanel();

    loadHelp();

    showProgress();
  }

  create () {
    console.info(currentScene + ' create')

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

    fadeInCamera(2)
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

  showPopUpMessage('\nType feedback text');
  
}

function ContinueType(){
  isGameOver = true;
  isGamePaused = true;

  var myScore = selectedLevel * timeOfGame;

  showPopUpMessage('\nΜπράβο!!!\n\nΚέρδισες ' + myScore + ' βαθμούς.\n\nΠαίξε πάλι για να αποκτήσεις περισσότερους.');

 
}

function startNewTypeGame () {
  DebugLog('starting ' + currentScene + ' game...')

  _this.time.delayedCall(500, newTypeGame, [], _this)

  isTypeFirstHelp = true;
  isTypeCanDrag = false;
}

function newTypeGame () {
  isGamePaused = false
  isGameOver = false

  timeToRemove = 5

  timePenalty = 0
  timerEventGame = _this.time.addEvent({ delay: totalTimeSelected, timeScale: 1.0 })
  timerEventGame.paused = false
  timeOfGame = totalTimeSelected

  textTime.visible = true
  if (selectedLevel === 1) { StartTypeB(); }
  else if (selectedLevel === 2) { StartTypeC(); }
  else if (selectedLevel === 3) { StartTypeD(); }

  showHelp();
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
