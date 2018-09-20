var posIconsFotoSculpture =
[
  {x: 387, y: 131},
  {x: 640, y: 133},
  {x: 889, y: 131},
  {x: 1139, y: 139},
  {x: 1399, y: 131},
  {x: 1664, y: 131}
]

var elementInfos =
[
  'default message\nfor element 1',
  'default message\nfor element 2',
  'default message\nfor element 3',
  'default message\nfor element 4',
  'default message\nfor element 5',
  'default message\nfor element 6'
]

var foundPhotoPositions =
[
  {x: 1236, y: 319},
  {x: 859, y: 329},
  {x: 1133, y: 381},
  {x: 913, y: 329},
  {x: 1022, y: 473},
  {x: 1074, y: 381}
]

var foundPreviews = [];
var foundPreviewPhoto1, foundPreviewPhoto2, foundPreviewPhoto3, foundPreviewPhoto4, foundPreviewPhoto5, foundPreviewPhoto6;

var currObjectSculpture;

var s1,w1;
var selectedSculpture;

var posIntroCharacterSculpture = {x: 389,  y: 689};

var totalPiecesToFound = 6;

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

    totalTime = {easy: 600000, medium: 600000, hard: 300000, champion: 90000}

    foundPoints = [0, 0, 0, 0, 0, 0]

    allFotoContainers = []

    currObjectSculpture = null

    posIntroCharacter = posIntroCharacterSculpture
  }

  preload () {
    DebugLog('loading ' + currentScene)

    loadBackground()

    loadMenuBar()

    // #region Load Images

    this.load.image(currentScene + 'lathos', getSceneImagesFolder() + 'lathos.png')
    this.load.image(currentScene + 'sosto', getSceneImagesFolder() + 'sosto.png')
    this.load.image(currentScene + 'hitArea', getSceneImagesFolder() + 'hitArea.png')
    this.load.image(currentScene + 'selected', getSceneImagesFolder() + 'selected.png')

    for (var i = 1; i < 7; i++) {
      this.load.image(currentScene + 'img_0' + i, getSceneImagesFolder() + 'img_0' + i + '.png')
    }

    //indicators
    this.load.image(currentScene + 'try', getSceneImagesFolder() + 'try.png');
    this.load.image(currentScene + 'try_checked', getSceneImagesFolder() + 'try_checked.png');

    // #endregion

    loadSceneFooter();

    loadPopUp();

    loadLevelSelectPanel();

    loadHelp();

    showProgress();
  }

  create () {
    console.info(currentScene + ' started')

    disableRightMouseClick()

    showBackground()

    showMenuBar()

    // this.input.setDefaultCursor('url(assets/input/cursors/vigyori/arrow.cur), pointer')
    //  Create some custom cursor boxes
    // this.add.sprite(100, 300, 'box').setInteractive({ cursor: 'url(assets/input/cursors/vigyori/link.cur), pointer' })

    selectedSculpture = this.add.image(posIconsFotoSculpture[0].x, posIconsFotoSculpture[0].y, currentScene + 'selected').setOrigin(0.5, 0.5);
    selectedSculpture.visible = false;
    selectedSculpture.depth = 20;

    w1 = this.add.image(posIconsFotoSculpture[0].x, posIconsFotoSculpture[0].y, currentScene + 'lathos').setOrigin(0.5, 0.5);
    w1.visible = false;
    w1.depth = 20;

    var hitArea = this.add.image(1004, 524, currentScene + 'hitArea').setInteractive().setOrigin(0.5, 0.5).setName('hitArea');
    hitArea.on('pointerdown', function () {
      if (usePenaltyTime) {
        timePenalty += timeToRemove;
        timerEventGame.delay -= timeToRemove * 1000;
      }

      checkMatchSculpture(hitArea);
    })

    // #region ELEMENTS


    foto1 = this.add.image(posIconsFotoSculpture[0].x, posIconsFotoSculpture[0].y, currentScene + 'img_01').setInteractive({ cursor: 'pointer' }).setOrigin(0.5, 0.5).setName('1')
    foto1.setDataEnabled()
    foto1.data.set('zone', 'zone1')
    foto1.data.set('index', 0)
    foto1.data.set('info', elementInfos[0])
    foto1.on('pointerdown', function () { btnListener(foto1); })


    foto2 = this.add.image(posIconsFotoSculpture[1].x, posIconsFotoSculpture[1].y, currentScene + 'img_02').setInteractive({ cursor: 'pointer' }).setOrigin(0.5, 0.5).setName('2')
    foto2.setDataEnabled()
    foto2.data.set('zone', 'zone3')
    foto2.data.set('index', 1)
    foto2.data.set('info', elementInfos[1])
    foto2.on('pointerdown', function () { btnListener(foto2); })

    foto3 = this.add.image(posIconsFotoSculpture[2].x, posIconsFotoSculpture[2].y, currentScene + 'img_03').setInteractive({ cursor: 'pointer' }).setOrigin(0.5, 0.5).setName('3')
    foto3.setDataEnabled()
    foto3.data.set('zone', 'zone4')
    foto3.data.set('index', 2)
    foto3.data.set('info', elementInfos[2])
    foto3.on('pointerdown', function () { btnListener(foto3); })

    foto4 = this.add.image(posIconsFotoSculpture[3].x, posIconsFotoSculpture[3].y, currentScene + 'img_04').setInteractive({ cursor: 'pointer' }).setOrigin(0.5, 0.5).setName('4')
    foto4.setDataEnabled()
    foto4.data.set('zone', 'zone3')
    foto4.data.set('index', 3)
    foto4.data.set('info', elementInfos[3])
    foto4.on('pointerdown', function () { btnListener(foto4); })

    foto5 = this.add.image(posIconsFotoSculpture[4].x, posIconsFotoSculpture[4].y, currentScene + 'img_05').setInteractive({ cursor: 'pointer' }).setOrigin(0.5, 0.5).setName('5')
    foto5.setDataEnabled()
    foto5.data.set('zone', 'zone2')
    foto5.data.set('index', 4)
    foto5.data.set('info', elementInfos[4])
    foto5.on('pointerdown', function () { btnListener(foto5); })

    foto6 = this.add.image(posIconsFotoSculpture[5].x, posIconsFotoSculpture[5].y, currentScene + 'img_06').setInteractive({ cursor: 'pointer' }).setOrigin(0.5, 0.5).setName('6')
    foto6.setDataEnabled()
    foto6.data.set('zone', 'zone4')
    foto6.data.set('index', 5)
    foto6.data.set('info', elementInfos[5])
    foto6.on('pointerdown', function () { btnListener(foto6); })

    allFotoContainers.push(foto1)
    allFotoContainers.push(foto2)
    allFotoContainers.push(foto3)
    allFotoContainers.push(foto4)
    allFotoContainers.push(foto5)
    allFotoContainers.push(foto6)

    for (var i = 0; i < allFotoContainers.length; i++) {
      allFotoContainers[i].visible = false;
    // DebugLog(allFotoContainers[i].data.get('info'))
    }

    

    // #endregion

    // #region ZONES

    //  A drop zone positioned at 600x300 with a circular drop zone 128px in radius
    // var zone = this.add.zone(600, 300).setCircleDropZone(128)

    // ακρωτήριο
    var z1 = this.add.zone(1480, 342, 100, 100).setName('zone1').setInteractive({ cursor: 'pointer' }).setOrigin(0.5, 0.5)
    z1.on('pointerdown', function () { checkMatchSculpture(z1); })

    // μετόπη
    var z2 = this.add.zone(576, 486, 542, 44).setName('zone2').setInteractive({ cursor: 'pointer' }).setOrigin(0.5, 0.5)
    z2.on('pointerdown', function () { checkMatchSculpture(z2); })

    // αέτωμα
    var z3 = this.add.zone(583, 408, 260, 75).setName('zone3').setInteractive({ cursor: 'pointer' }).setOrigin(0.5, 0.5)
    z3.on('pointerdown', function () { checkMatchSculpture(z3); })

    // ζωοφόρος
    var z4 = this.add.zone(1472, 458, 518, 44).setName('zone4').setInteractive({ cursor: 'pointer' }).setOrigin(0.5, 0.5)
    z4.on('pointerdown', function () { checkMatchSculpture(z4); })

    // #endregion

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

    createSceneFooter();

    showLevelSelectPanel()

    createPopUpMessage()

    // onCanvasLoseFocus()

    fadeInCamera(2)

    createHelp()
  } // create

  update (time, delta) {
    calculateTime()
  } // update

}

function btnListener (gameObject) {  DebugLog('btnListener for '+gameObject.data.get('index'));
  if (!isGamePaused && !isGameOver) {
    currObjectSculpture = gameObject;
    var indx = currObjectSculpture.data.get('index');
    if (foundPoints[indx] === 0) {
      selectedSculpture.setPosition(gameObject.x, gameObject.y)
      selectedSculpture.visible = true;
      w1.visible = false;
      isChecking = true;
    }else {
      currObjectSculpture = null;
    }
  }
}

function checkMatchSculpture (gameObject) {
  if (isChecking) {
    DebugLog('checking zone ' + gameObject.name)

    isChecking = false;

    selectedSculpture.visible = false;

    if (currObjectSculpture.data.get('zone') === gameObject.name) {

      DebugLog(gameObject.name + ' is correct zone!');

      currObjectSculpture.setAlpha(0.5);

      foundPoints[currObjectSculpture.data.get('index')] = 1;

      //show in correct position
      // posFotosFound[currObjectSculpture.data.get('index')].x
      foundPreviews[currObjectSculpture.data.get('index')].visible = true;

      totalPiecesToFound --;

      var count = 0;

      for (var x = 0; x < foundPoints.length; x++) {
        // if not founded add it to list
        if (foundPoints[x] === 1) {
          // count founded points
          count++
        }
      }

     // DebugLog('count = ' + count);

      showCorrectEffort(count - 1);

      //if (count === foundPoints.length) {  canContinue = 1; }

      if(totalPiecesToFound === 0){ canContinue = 1; }

      // show popup info text
      showPopUpMessage(currObjectSculpture.data.get('info'));


    } else {
      w1.setPosition(currObjectSculpture.x, currObjectSculpture.y)
      w1.visible = true

      DebugLog(gameObject.name + ' is fault zone!');

      if (usePenaltyTime) {
        timePenalty += timeToRemove;
        timerEventGame.delay -= timeToRemove * 1000;
      }
    }

    currObjectSculpture = null;
  }
}

function startNewSculptureGame () {
  DebugLog('starting ' + currentScene + ' game...')

  _this.time.delayedCall(500, newSculptureGame, [], _this)
}


function newSculptureGame () {
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

  if (selectedLevel === 1) {usePenaltyTime = true; timeToRemove = 5; totalPiecesToFound = 3;  }
  else if (selectedLevel === 2) {usePenaltyTime = true; timeToRemove = 10; totalPiecesToFound = 4;  }
  else if (selectedLevel === 3) {usePenaltyTime = true; timeToRemove = 15; totalPiecesToFound = 6;  }

  foundPoints = [0, 0, 0, 0, 0, 0];

  for(var i=0; i<allFotoContainers.length; i++){
    //if (i < totalPiecesToFound) {
      allFotoContainers[i].visible = true;
    //} else {
      //allFotoContainers[i].visible = false;
    //}
  }

  foundPreviews = [foundPreviewPhoto1, foundPreviewPhoto2, foundPreviewPhoto3, foundPreviewPhoto4, foundPreviewPhoto5, foundPreviewPhoto6];

  for (var i = 0; i < 6; i++) {
    var nameIndex = i+1;
    foundPreviews[i] = _this.add.image(foundPhotoPositions[i].x, foundPhotoPositions[i].y, currentScene + 'img_0' + nameIndex.toString()).setScale(0.2);
    foundPreviews[i].visible = false;
  }

  //load database info


  maxEfforts = totalPiecesToFound; 
  showEfforts();

  currObjectSculpture = null;

  isChecking = false;

  showHelp();
}

function loseSculptureGame () {
  hideGroupCorrectIcons();
}

function winSculptureGame () {
  // winGame()
  DebugLog('You win ' + currentScene + ' game!');

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

  showPopUpMessage('\Sculpture feedback text');

}

var canContinue = 0;

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

  //_this.time.delayedCall(3500, restartScene, [], _this);
}
