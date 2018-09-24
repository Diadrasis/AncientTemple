
var staticPiecesData = 
[
  {name:'akrokeramo_1', x:1364, y:142},
  {name:'akrokeramo_2', x:1445, y:140},
  {name:'column_1', x:1617, y:247},
  {name:'column_2', x:1711, y:247},
  {name:'column_3', x:1797, y:247},
  {name:'balcony', x:1713, y:726},
  {name:'door_1', x:1408, y:517},
  {name:'door_2', x:1408, y:800},
  {name:'plaka_1', x:1626, y:876},
  {name:'plaka_2', x:1806, y:876},
  {name:'window_1', x:1644, y:534},
  {name:'window_2', x:1774, y:534},
  {name:'object_01', x:1400, y:242},
  {name:'object_02', x:1400, y:322}
]

var namesImagesPieces =
[
  'akrokeramo_1',
  'akrokeramo_2',
  'column_1',
  'column_2',
  'column_3',
  'balcony',
  'door_1',
  'door_2',
  'plaka_1',
  'plaka_2',
  'window_1',
  'window_2',
  'object_01',
  'object_02'
]

var staticPieces = [];

var house;
var btnClear;
var btnShot;

class NeoclassicalScene extends Phaser.Scene 
{

  constructor (config) { super({ key: 'neoclassic' })}

  init() {

    _this = this;

    currentScene = 'neoclassic';

    gameId = getDBgameId(currentScene);

    isGameOver = true;
    isGamePaused = true;

    initTimer();

    totalTime = {easy: 600000, medium: 600000, hard: 600000, champion: 90000};

    posIntroCharacter = {x: 381, y:691};

    staticPieces = [];

  }

  preload () {
    DebugLog('loading ' + currentScene );
    DebugLog('language => ' + languange );

    loadBackground();

    loadMenuBar();

    //#region Load Images

    for(var i=0; i<staticPiecesData.length; i++){
      this.load.image(currentScene + staticPiecesData[i].name, getSceneImagesFolder() + staticPiecesData[i].name + '.png');
    }
    
    this.load.image(currentScene + 'house1', getSceneImagesFolder() +'1_floor_building.png' );
    this.load.image(currentScene + 'house2', getSceneImagesFolder() +'2_floor_building.png' );
    this.load.image(currentScene + 'house3', getSceneImagesFolder() +'3_floor_building.png' );

    this.load.image(currentScene + 'clear', getSceneImagesFolder() +'clear.png' );
    this.load.image(currentScene + 'screenshot', getSceneImagesFolder() +'screenshot.png' );

    //#endregion

    loadPopUp();

    loadSceneFooter();

    loadLevelSelectPanel();

    loadHelp();

   // showProgress();
  }

  create () 
  { 
    console.info(currentScene+' started');

    disableRightMouseClick();

    showBackground();

    //backgroundObject.depth = 10;
    
    showMenuBar();

    //#region create scene currObjectSculpture

    for(var i=0; i<staticPiecesData.length; i++){

      var posX = staticPiecesData[i].x;
      var posY = staticPiecesData[i].y;
      var name = staticPiecesData[i].name;

     // DebugLog( getSceneImagesFolder() +name + '.png');


      //create 24 pieces for each part
      for (var x = 0; x < 24; x++) {
        var piece = this.add.sprite(posX, posY, currentScene + name).setInteractive({ cursor: 'pointer' });

        piece.setDataEnabled();
        piece.data.set('index', i.toString());

        //DebugLog('index = '+piece.data.get('index'));

        

        piece.data.set('alpha', x.toString());

        if (x === 0) {
          piece.depth = 10;
          piece.setAlpha(1);
        } else {
          piece.depth = 11;
          piece.setAlpha(0.1);
        }

        this.input.setDraggable(piece);

        staticPieces.push(piece);

      }

    }

    //  A drop zone
   // var zone = this.add.zone(688, 562, 1077, 790).setDropZone();

    //#region DRAG ENTOLES
  
    this.input.on('dragstart', function (pointer, gameObject) {   //DebugLog('dragstart');

    if (!isGameOver && !isGamePaused) {

      this.children.bringToTop(gameObject);
      gameObject.setAlpha(0.5);

      if (selectedLevel === 3) {
        gameObject.setScale(0.7);
      }

      pointer.y = gameObject.y;
    }

  }, this);

  this.input.on('drag', function (pointer, gameObject) {     //DebugLog('drag');

    if (!isGameOver && !isGamePaused) {
      gameObject.x = pointer.x;
      gameObject.y = pointer.y;
    }

  });

  this.input.on('dragenter', function (pointer, gameObject, dropZone) {    //DebugLog('dragenter');

    // if (!isGameOver && !isGamePaused) {
    //   if (showZoneVisual) {
    //     graphics.clear();
    //     graphics.lineStyle(5, 0x00ff00);
    //     graphics.strokeRect(zone.x + zone.input.hitArea.x, zone.y + zone.input.hitArea.y, zone.input.hitArea.width, zone.input.hitArea.height);
    //   }
    // }

      //gameObject.setAlpha(1);

  });

  this.input.on('dragleave', function (pointer, gameObject, dropZone) {        //DebugLog('dragleave');

    if (!isGameOver && !isGamePaused) {
      // if (showZoneVisual) {
      //   graphics.clear();
      //   graphics.lineStyle(2, 0xff0000);
      //   graphics.strokeRect(zone.x + zone.input.hitArea.x, zone.y + zone.input.hitArea.y, zone.input.hitArea.width, zone.input.hitArea.height);
      // }

     // gameObject.setAlpha(0.5);
    }

  });

  //  Just a visual display of the drop zone
 //var graphicsA = this.add.graphics();

  this.input.on('drop', function (pointer, gameObject, dropZone) {      //  DebugLog('drop');

    if (!isGameOver && !isGamePaused) {

       // gameObject.depth = gameObject.y;
       gameObject.data.set('drop', 1);

    }
  });



  this.input.on('dragend', function (pointer, gameObject, dropped) {    DebugLog('dragend');

    if (!isGameOver && !isGamePaused) {

      gameObject.clearTint();

      if (!dropped) {

        gameObject.data.set('drop', 0);

        //set returning position
        var mIndex = gameObject.data.get('index');
        //set alpha channel
        var myAlpha = gameObject.data.get('alpha');
        if (myAlpha === '0') { myAlpha=1; } else { myAlpha=0.1; }

        _this.tweens.add({
          targets: gameObject,
          x: staticPiecesData[mIndex].x,
          y: staticPiecesData[mIndex].y,
          alpha: myAlpha,
          scaleX: 1,
          scaleY: 1,
          ease: 'Power1',
          duration: 500,
          delay: 0
        });

      } else {
        gameObject.setAlpha(1);
      }

      // if (showZoneVisual) {
      //   graphics.clear();
      //   graphics.lineStyle(2, 0xff0000);
      //   graphics.strokeRect(zone.x + zone.input.hitArea.x, zone.y + zone.input.hitArea.y, zone.input.hitArea.width, zone.input.hitArea.height);
      // }

    }

  });


  //#endregion



    //#endregion

    btnClear = this.add.sprite(54, 787, currentScene + 'clear').setInteractive({ cursor: 'pointer' });
    btnClear.on('pointerdown', ClearHouse, _this);
    btnClear.depth=12;

    btnShot = this.add.sprite(55, 676, currentScene + 'screenshot').setInteractive({ cursor: 'pointer' });
    btnShot.once('pointerdown', TakeSnapshot, _this);
    btnShot.depth=12;

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

function startNewNeoclassicGame()
{
  DebugLog('starting '+currentScene+' game...');

  _this.time.delayedCall(500, newNeoclassicGame, [], _this);
}

function newNeoclassicGame()
{
  isGamePaused = false;
  isGameOver = false;

  timeToRemove = 5;

  timePenalty=0;
  timerEventGame = _this.time.addEvent({ delay: totalTimeSelected, timeScale: 1.0 });
  timerEventGame.paused = false;
  timeOfGame = totalTimeSelected;

  textTime.visible=true;

  if (selectedLevel === 1) {
    //this.add.zone(631, 543, 921, 563).setDropZone();
    house = _this.add.image(637, 555, currentScene + 'house1').setInteractive();
  }
  else if (selectedLevel === 2) {
    //this.add.zone(643, 561, 1021, 800).setDropZone();
    house = _this.add.image(643, 553, currentScene + 'house2').setInteractive();
  }
  else if (selectedLevel === 3) {
    //this.add.zone(656, 522, 853, 973).setDropZone();
    house = _this.add.image(652, 515, currentScene + 'house3').setInteractive();
  }

  house.depth = 7;
  house.input.dropZone = true;

  showHelp();

}

function ClearHouse(){
  for(var i=0; i<staticPieces.length; i++){

    //set returning position
    var mIndex = staticPieces[i].data.get('index');
    //set alpha channel
    var myAlpha = staticPieces[i].data.get('alpha');
    if (myAlpha === '0') {
      staticPieces[i].depth = 10; 
      myAlpha=1; 
    } else {
      staticPieces[i].depth = 11; myAlpha=0.1; 
    }

    _this.tweens.add({
      targets: staticPieces[i],
      x: staticPiecesData[mIndex].x,
      y: staticPiecesData[mIndex].y,
      alpha: myAlpha,
      scaleX: 1,
      scaleY: 1,
      ease: 'Power1',
      duration: 500,
      delay: 0
    });
  }
}

var snapHistory = [];
var indx = 0;

function TakeSnapshot() {

  //hide all elements

  backgroundObject.visible = false;

  var cam = _this.cameras.main;
  
  //cam.setViewport(149, 175, 990, 755);
  cam.setBackgroundColor(0xffcd59);

  for(var d=0; d<staticPieces.length; d++){
    if(staticPieces[d].data.get('drop') === 0){
      staticPieces[d].visible = false;
    }
  }

  btnClear.visible = false;
  btnShot.visible = false;
  footerScene.visible = false;

  ShowMenuBarElements(false);

 _this.time.addEvent({ delay: 100, callback: Snap, callbackScope: this, loop: false });
  
  //########################################################

  // var cam = _this.cameras.main;
  // cam.pan(676, 600, 200, 'Power2');
  // //cam.setZoom(1.5);
  // cam.zoomTo(1.6, 500);

}

function Snap(){
  game.renderer.snapshot(function (image) {
    //show image on canvas under the game's window
    image.style.width = '384px';
    image.style.height = '216px';
    image.style.paddingLeft = '2px';

    snapHistory.push(image);
    console.log('snap!');

    //  _this.cameras.main.zoomTo(150,300); 
    //_this.cameras.main.pan(680, 330, 2000);
    //_this.cameras.main.pan(767, 1096, 2000, 'Power2');
    //_this.cameras.main.pan(703, 1621, 2000, 'Elastic');
    //_this.cameras.main.pan(256, 623, 2000, 'Sine.easeInOut');
    //_this.cameras.main.shake(200);
    // var cam = this.cameras.main;

    _this.cameras.main.flash();

    document.body.appendChild(image);

    indx++;

    image.name = 'snap' + indx.toString();
    snapName = image.name;

    //var cam = _this.cameras.main;
    //cam.setViewport(0, 0, 1920, 1080);

    var dataUrl = game.canvas.toDataURL(image.format);

    //if(!_this.textures.exists('snap'))
    _this.textures.addBase64(snapName, dataUrl);

    //  image.onload = () => {
    //   _this.add.image(800, 400, 'snap');
    // };

    _this.time.addEvent({ delay: 100, callback: onEvent, callbackScope: this, loop: false });

  });
}

function showSnapshot(image, url)
{
  //let path = getSceneFolderImages();

  //console.log(path);

  //_this.load.setPath(_this.textures);

  _this.load.on('filecomplete', function () 
  { 
    console.log('filecomplete'); 
    let img = _this.add.image(300, 400, image.name); 
    img.angle += 30;
  }, this);

  //  It needs _something_ in the queue, or `start` will just exit immediately.
  let img  = _this.load.image(image.name);

  console.log('start loading..' + image.name);
  img.angle += 30;

  _this.load.start();
}

function resetCamera()
{

  backgroundObject.visible = true;

  for (var d = 0; d < staticPieces.length; d++) {
    staticPieces[d].visible = true;
  }

  btnClear.visible = true;
  btnShot.visible = false;
  footerScene.visible = true;

  ShowMenuBarElements(true);

  // var cam = _this.cameras.main;
  // cam.setViewport(0, 0, 1920, 1080);
 // cam.centerOn(960, 540);
 // cam.setZoom(1);
  //cam.zoomTo(960, 540);
  
}

var snapName = '';

function onEvent ()
{
  let snap = _this.add.image(1058, 753, snapName);
  var dataUrl = game.canvas.toDataURL(snap.format);

  snap.setCrop(131, 52, 1064, 937);

  DebugLog(dataUrl);

  SetPlayerHomeImage(playerId, dataUrl);

  snap.setScale(0.3);
  snap.depth = 5000;
  //snap.angle += 30;

  _this.time.addEvent({ delay: 50, callback: resetCamera, callbackScope: this, loop: false });

  showPopUpMessage("");
  showPopUpTitle('Your neoclassic is ready!!!');

}

function ContinueNeoclassic(){
  //restart scene
  isGameOver = true;
  restartScene();
}

