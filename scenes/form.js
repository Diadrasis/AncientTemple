var currentPiece, nextPiece, btnHelp, btnReturnToMenu;
var helpPanel;

var pos_NextElement = {x: 1742, y: 382};
var pos_BtnHelp = {x: 1887, y: 71};
var pos_HelpPanel = {x: 960, y: 540};
var pos_BtnMenu = {x: 150, y: 94};
var pos_MouseToMovePiece = {minX: 200, maxX: 1500, minY: 120, maxY: 1020};
var pos_loseGround = {x: 864, y: 1053};

var posIntroCharacterForm = {x:408 , y:693};

// ############ KOLONES #####################
var piecesDorikos = ['dorikos_01', 'dorikos_02', 'dorikos_03', 'dorikos_04' ]
var piecesIonikos = ['ionikos_01', 'ionikos_02', 'ionikos_03', 'ionikos_04']
var piecesKorinthiakos = ['korinthiakos_01', 'korinthiakos_02', 'korinthiakos_03', 'korinthiakos_04']
var piecesActive;

var dorikosCorrect = 0;
var ionikosCorrect = 0;
var korinthiakosCorrect = 0;

// θέσεις κομματιών
var pos_Dorikos = {x1: 426, y1: 882, x2: 425, y2: 701, x3: 425, y3: 518, x4: 468, y4: 319};
var pos_Ionikos = {x1: 881, y1: 884, x2: 882, y2: 703, x3: 883, y3: 517, x4: 953, y4: 328};
var pos_Korinthiakos = {x1: 1318, y1: 882, x2: 1318, y2: 702, x3: 1318, y3: 520, x4: 1331, y4: 311};

// κομμάτια
var dorikos1, dorikos2, dorikos3, dorikos4;
var ionikos1, ionikos2, ionikos3, ionikos4;
var korinth1, korinth2, korinth3, korinth4;

var xml;
var currPieceName, nextPieceName;
//colliders category
var cat1;

var fallSpeed = {easy: 0.1, medium: 0.17, hard: 0.25, champion: 0.3};
var speed = 0;
var extraSpeed = 1;
var arrowDown, arrowDown2, arrowDown3;

var wrongMoves = 0;
//var wrongMovesText;

var timerEventGame;

var btnDorikos, btnIonikos, btnKotinthiakos;


class FormScene extends Phaser.Scene {

  // #region config
  constructor (config) {
    super({
      key: 'form',
      physics: { default: 'matter',
        matter: {
          gravity: {
            x: 0,
            y: 0
          },
          debug: false
        }
      }
    })
  }

  // #endregion

  init () {

    _this = this;
    
    // set scene name
    currentScene = 'form';

    gameId = getDBgameId(currentScene);

    console.info(currentScene+' init')

    isGameOver = true;
    isGamePaused = true;

    isFormFirstHelp = false;

    initTimer();

    totalTime = {easy: 600000, medium: 600000, hard: 300000, champion: 90000};

    timerEventGame = 0;
    timePenalty=0;
    timeOfGame = totalTime.easy;

    usePenaltyTime = false;

    posIntroCharacter = posIntroCharacterForm;

    //GR

    areaEntablature = new Phaser.Geom.Rectangle(introZeroPos.x + 278, introZeroPos.y + 419,106, 35);
    RepositionRect(areaEntablature);

    areaPediments = new Phaser.Geom.Rectangle(introZeroPos.x + 410, introZeroPos.y + 419,130, 35);
    RepositionRect(areaPediments);

    areaDoric = new Phaser.Geom.Rectangle(introZeroPos.x + 702, introZeroPos.y + 492, 117, 35);
    RepositionRect(areaDoric);
    
    areaIonic = new Phaser.Geom.Rectangle(introZeroPos.x + 850, introZeroPos.y + 492, 110, 35);
    RepositionRect(areaIonic);

    areaKorinthian = new Phaser.Geom.Rectangle(introZeroPos.x + 369, introZeroPos.y + 527, 172, 40);
    RepositionRect(areaKorinthian);

    //EN

  }

  preload () {

    
    DebugLog('loading ' + currentScene);

    loadBackground();

    loadMenuBar();


    // load pieces images
    for (var p = 0; p < 4; p++) { // DebugLog(piecesDorikos[p])
      this.load.image(piecesDorikos[p], getSceneImagesFolder() + 'dorikos/' + piecesDorikos[p] + '.png')
      this.load.image(piecesIonikos[p], getSceneImagesFolder() + 'ionikos/' + piecesIonikos[p] + '.png')
      this.load.image(piecesKorinthiakos[p], getSceneImagesFolder() + 'korinthiakos/' + piecesKorinthiakos[p] + '.png')
    }

    // buttons
    this.load.image(currentScene + 'btnPiece', getSceneImagesFolder() + 'btnPiece.png');
    this.load.image(currentScene + 'baseDorikos', getSceneImagesFolder() + 'baseDorikos.png');
    this.load.image(currentScene + 'baseIonikos', getSceneImagesFolder() + 'baseIonikos.png');
    this.load.image(currentScene + 'baseKorinthiakos', getSceneImagesFolder() + 'baseKorinthiakos.png');

    this.load.image('arrowDown', imagesGeneral + 'arrow_down.png');

    this.load.image(currentScene + 'board', imagesGeneral + 'board.jpg');

    loadSceneFooter();

    loadLevelSelectPanel();

    loadPopUp();

    loadHelp();

    showProgress();
  }

  create () {

    imageMouseOver = this.add.image(0,0, currentScene + 'board');
    imageMouseOver.setOrigin(0.5);
    imageMouseOver.depth = 5000;
    imageMouseOver.visible = false;

    textMouseOver = this.make.text(configMouseOverText);
    textMouseOver.depth = 5006;
    textMouseOver.setOrigin(0.5);

    this.input.on('pointermove', function (pointer) {

      if(areaEntablature.contains(pointer.x, pointer.y))
      {
        textMouseOver.setText(entablature_gr);
        textMouseOver.x = pointer.x;
        textMouseOver.y = pointer.y - 70;
       
       // console.log(textMouseOver.getBounds());

        imageMouseOver.setDisplaySize(textMouseOver.getBounds().width + 10, textMouseOver.getBounds().height + 10);
        imageMouseOver.x = textMouseOver.x;
        imageMouseOver.y = textMouseOver.y;
        imageMouseOver.visible = true;
      }
      else if(areaPediments.contains(pointer.x, pointer.y))
      {
        textMouseOver.setText(pediments_gr);
        textMouseOver.x = pointer.x;
        textMouseOver.y = pointer.y - 70;
       
        imageMouseOver.setDisplaySize(textMouseOver.getBounds().width + 10, textMouseOver.getBounds().height + 10);
        imageMouseOver.x = textMouseOver.x;
        imageMouseOver.y = textMouseOver.y;
        imageMouseOver.visible = true;
      }
      else if(areaDoric.contains(pointer.x, pointer.y))
      {
        textMouseOver.setText(doric_gr);
        textMouseOver.x = pointer.x;
        textMouseOver.y = pointer.y - 70;

        imageMouseOver.setDisplaySize(textMouseOver.getBounds().width + 10, textMouseOver.getBounds().height + 10);
        imageMouseOver.x = textMouseOver.x;
        imageMouseOver.y = textMouseOver.y;
        imageMouseOver.visible = true;
      }
      else if(areaIonic.contains(pointer.x, pointer.y))
      {
        textMouseOver.setText(ionic_gr);
        textMouseOver.x = pointer.x;
        textMouseOver.y = pointer.y - 70;

        imageMouseOver.setDisplaySize(textMouseOver.getBounds().width + 10, textMouseOver.getBounds().height + 10);
        imageMouseOver.x = textMouseOver.x;
        imageMouseOver.y = textMouseOver.y;
        imageMouseOver.visible = true;
      }
      else if(areaKorinthian.contains(pointer.x, pointer.y))
      {
        textMouseOver.setText(korinthian_gr);
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

    // synora physics
    this.matter.world.setBounds()

    //#region Pieces

    // prepare kolones pieces
    dorikos1 = this.matter.add.image(pos_Dorikos.x1, -5000, piecesDorikos[0]);
    dorikos2 = this.matter.add.image(pos_Dorikos.x2, -5050, piecesDorikos[1]);
    dorikos3 = this.matter.add.image(pos_Dorikos.x3, -5100, piecesDorikos[2]);
    dorikos4 = this.matter.add.image(pos_Dorikos.x4, -5200, piecesDorikos[3]);

    ionikos1 = this.matter.add.image(pos_Ionikos.x1, -5000, piecesIonikos[0]);
    ionikos2 = this.matter.add.image(pos_Ionikos.x2, -5050, piecesIonikos[1]);
    ionikos3 = this.matter.add.image(pos_Ionikos.x3, -5100, piecesIonikos[2]);
    ionikos4 = this.matter.add.image(pos_Ionikos.x4, -5200, piecesIonikos[3]);

    korinth1 = this.matter.add.image(pos_Korinthiakos.x1, -5000, piecesKorinthiakos[0]);
    korinth2 = this.matter.add.image(pos_Korinthiakos.x2, -5050, piecesKorinthiakos[1]);
    korinth3 = this.matter.add.image(pos_Korinthiakos.x3, -5100, piecesKorinthiakos[2]);
    korinth4 = this.matter.add.image(pos_Korinthiakos.x4, -5200, piecesKorinthiakos[3]);

    // hide pieces
    dorikos1.visible = false;
    dorikos2.visible = false;
    dorikos3.visible = false;
    dorikos4.visible = false;

    ionikos1.visible = false;
    ionikos2.visible = false;
    ionikos3.visible = false;
    ionikos4.visible = false;

    korinth1.visible = false;
    korinth2.visible = false;
    korinth3.visible = false;
    korinth4.visible = false;

    formHelpCreateAllColumns();

    //#endregion

    // #region BUTTONS FOR PIECE MOVEMENT AND ROTATION

    // first time setup
    dorikosCorrect = 0;
    ionikosCorrect = 0;
    korinthiakosCorrect = 0;

    arrowDown = this.add.sprite(424, 1039, 'arrowDown').setInteractive({ cursor: 'pointer' });
    arrowDown.on('pointerdown', function () { extraSpeed = 6; })
    arrowDown.depth = 1000;
    arrowDown.visible = false;

    // set active pieces to random show
    piecesActive = [piecesDorikos[dorikosCorrect], piecesIonikos[ionikosCorrect], piecesKorinthiakos[korinthiakosCorrect]]
    
    currPieceName = getRandomPiece();
    currentPiece = this.matter.add.image(getRandomPosX(), 100, currPieceName);
    currentPiece.setAngle(getRandomAngle());
    currentPiece.getBounds();
    currentPiece.depth=2;

    nextPieceName = getRandomNextPiece();
    nextPiece = this.add.image(pos_NextElement.x, pos_NextElement.y, nextPieceName);
    nextPiece.angle = getRandomAngle();

    var baseDorikos = this.matter.add.sprite(427, 997, currentScene + 'baseDorikos').setStatic(true);
    btnDorikos = this.add.sprite(425, 507, currentScene + 'btnPiece').setInteractive({ cursor: 'pointer' });
    var x = 0;
    var y = 0;
    var z = 0;

    btnDorikos.on('pointerdown', function () {
      if (currentPiece.x === 428) { x++; }else { currentPiece.x = 428; arrowDown.x = 424;}
      y = 0;
      z = 0;
      x++;
      if (x > 1) {
        currentPiece.angle += 90;
      }
    })

    btnDorikos.depth = 10;

    var baseIonikos = this.matter.add.sprite(880, 997, currentScene + 'baseIonikos').setStatic(true);
    btnIonikos = this.add.sprite(879, 507, currentScene + 'btnPiece').setInteractive({ cursor: 'pointer' });
    btnIonikos.on('pointerdown', function () {
      if (currentPiece.x === 881) { x++; }else { currentPiece.x = 881; arrowDown.x = 882;}
      x = 0;
      z = 0;
      y++
      if (y > 1) {
        currentPiece.angle += 90;
      }
    })

    btnIonikos.depth = 10;

    var baseKorinthiakos = this.matter.add.sprite(1317, 997, currentScene + 'baseKorinthiakos').setStatic(true);
    btnKotinthiakos = this.add.sprite(1316, 507, currentScene + 'btnPiece').setInteractive({ cursor: 'pointer' });
    btnKotinthiakos.on('pointerdown', function () {
      if (currentPiece.x === 1317) { x++; }else { currentPiece.x = 1317; arrowDown.x = 1317;}
      x = 0;
      y = 0;
      z++;
      if (z > 1) {
        currentPiece.angle += 90;
      }
    })

    btnKotinthiakos.depth = 10;

    // #endregion

    //#region Collision Check

    this.matter.world.on('collisionstart', function (event, bodyA, bodyB) {

      // event.pairs[0].bodyA.gameObject.setTint(0xff0000)
      // event.pairs[0].bodyB.gameObject.setTint(0x00ff00)

      //stop checking at first time
      //before game start
      if(isGamePaused){return;}

      //DebugLog(currentPiece.angle);

      if (currentPiece.angle === 0) {

        // #region Dorikos Check
        if (currentPiece.x === 428) {
          // DebugLog('hit dorikos column by '+currentPiece)

          if (currPieceName === piecesDorikos[0]) {
            if (dorikos1.visible === false) {
              // set next piece to fall
              currPieceName = nextPieceName;
              currentPiece.setTexture(currPieceName);
              currentPiece.setPosition(getRandomPosX(), 100);
              currentPiece.angle = nextPiece.angle; // getRandomAngle()
              currentPiece.getBounds();

              dorikosCorrect = 1;

              piecesActive = [];

              if (ionikosCorrect <= 3) { piecesActive.push(piecesIonikos[ionikosCorrect]); }
              if (korinthiakosCorrect <= 3) { piecesActive.push(piecesKorinthiakos[korinthiakosCorrect]); }

              // show next piece
              nextPieceName = getRandomNextPiece();
              nextPiece.setTexture(nextPieceName);
              nextPiece.angle = getRandomAngle();

              dorikos1.setPosition(pos_Dorikos.x1, pos_Dorikos.y1);
              dorikos1.setStatic(true);
              dorikos1.setCollisionCategory(cat1);
              dorikos1.visible = true;

              extraSpeed = 1; 

              return;
            }
          } else if (currPieceName === piecesDorikos[1]) {
            if (dorikos2.visible === false) {
              // set next piece to fall
              currPieceName = nextPieceName
              currentPiece.setTexture(currPieceName)
              currentPiece.setPosition(getRandomPosX(), 100)
              currentPiece.angle = nextPiece.angle; // getRandomAngle()
              currentPiece.getBounds()

              dorikosCorrect = 2

              piecesActive = []

              if (ionikosCorrect <= 3) { piecesActive.push(piecesIonikos[ionikosCorrect]); }
              if (korinthiakosCorrect <= 3) { piecesActive.push(piecesKorinthiakos[korinthiakosCorrect]); }

              // show next piece
              nextPieceName = getRandomNextPiece()
              nextPiece.setTexture(nextPieceName)
              nextPiece.angle = getRandomAngle()

              dorikos2.setPosition(pos_Dorikos.x2, pos_Dorikos.y2)
              dorikos2.setStatic(true)
              dorikos2.setCollisionCategory(cat1)
              dorikos2.visible = true

              extraSpeed = 1; 

              return;
            }
          } else if (currPieceName === piecesDorikos[2]) {
            if (dorikos3.visible === false) {
              // set next piece to fall
              currPieceName = nextPieceName
              currentPiece.setTexture(currPieceName)
              currentPiece.setPosition(getRandomPosX(), 100)
              currentPiece.angle = nextPiece.angle; // getRandomAngle()
              currentPiece.getBounds()

              dorikosCorrect = 3

              piecesActive = []

              if (ionikosCorrect <= 3) { piecesActive.push(piecesIonikos[ionikosCorrect]); }
              if (korinthiakosCorrect <= 3) { piecesActive.push(piecesKorinthiakos[korinthiakosCorrect]); }

              // show next piece
              nextPieceName = getRandomNextPiece()
              nextPiece.setTexture(nextPieceName)
              nextPiece.angle = getRandomAngle()

              dorikos3.setPosition(pos_Dorikos.x3, pos_Dorikos.y3)
              dorikos3.setStatic(true)
              dorikos3.setCollisionCategory(cat1)
              dorikos3.visible = true;

              extraSpeed = 1; 
              

              return
            }
          } else if (currPieceName === piecesDorikos[3]) {
            if (dorikos4.visible === false) {
              // set next piece to fall
              currPieceName = nextPieceName
              currentPiece.setTexture(currPieceName)
              currentPiece.setPosition(getRandomPosX(), 100)
              currentPiece.angle = nextPiece.angle; // getRandomAngle()
              currentPiece.getBounds()

              dorikosCorrect = 4

              dorikos4.setPosition(pos_Dorikos.x4, pos_Dorikos.y4)
              dorikos4.setStatic(true)
              dorikos4.setCollisionCategory(cat1)
              dorikos4.visible = true;

              extraSpeed = 1; 
              

              piecesActive = []

              if (ionikosCorrect <= 3) { piecesActive.push(piecesIonikos[ionikosCorrect]); }
              if (korinthiakosCorrect <= 3) { piecesActive.push(piecesKorinthiakos[korinthiakosCorrect]); }

              if (piecesActive.length > 0) {
                // show next piece
                nextPieceName = getRandomNextPiece()
                nextPiece.setTexture(nextPieceName)
                nextPiece.angle = getRandomAngle()
              } else {
                DebugLog('YOU WIN!!!')
                winFormGame();
                
               // winPanel.visible = true
              }

              return
            }
          } else { // if current piece is not for this column

            extraSpeed = 1; 
            //arrowDown.visible = false;

            wrongMoves++;
            // wrongMovesText.setText('Wrong Moves: ' + wrongMoves);
            // set next piece to fall
            currPieceName = nextPieceName
            currentPiece.setTexture(currPieceName)
            currentPiece.setPosition(getRandomPosX(), 100)
            currentPiece.angle = nextPiece.angle; // getRandomAngle()
            currentPiece.getBounds()

            // new piece
            piecesActive = []

            if (dorikosCorrect <= 3) { piecesActive.push(piecesDorikos[dorikosCorrect]); }
            if (ionikosCorrect <= 3) { piecesActive.push(piecesIonikos[ionikosCorrect]); }
            if (korinthiakosCorrect <= 3) { piecesActive.push(piecesKorinthiakos[korinthiakosCorrect]); }

            if (piecesActive.length > 0) {
              // show next piece
              nextPieceName = getRandomNextPiece()
              nextPiece.setTexture(nextPieceName)
              nextPiece.angle = getRandomAngle()
            }

            return
          }
        } else
        // #endregion

        // #region Ionikos Check

        if (currentPiece.x === 881) {
          // DebugLog('hit ionikos column')

          if (currPieceName === piecesIonikos[0]) {
            if (ionikos1.visible === false) {
              // set next piece to fall
              currPieceName = nextPieceName
              currentPiece.setTexture(currPieceName)
              currentPiece.setPosition(getRandomPosX(), 100)
              currentPiece.angle = nextPiece.angle; // getRandomAngle()
              currentPiece.getBounds()

              ionikosCorrect = 1

              piecesActive = []

              if (dorikosCorrect <= 3) { piecesActive.push(piecesDorikos[dorikosCorrect]); }
              if (korinthiakosCorrect <= 3) { piecesActive.push(piecesKorinthiakos[korinthiakosCorrect]); }

              // show next piece
              nextPieceName = getRandomNextPiece()
              nextPiece.setTexture(nextPieceName)
              nextPiece.angle = getRandomAngle()

              ionikos1.setPosition(pos_Ionikos.x1, pos_Ionikos.y1); // = this.matter.add.image(pos_Dorikos.x1, pos_Dorikos.y1, 'dorikos_1').setStatic(true)
              ionikos1.setStatic(true)
              ionikos1.setCollisionCategory(cat1)
              ionikos1.visible = true

              extraSpeed = 1; 
              

              return
            }
          } else if (currPieceName === piecesIonikos[1]) {
            if (ionikos2.visible === false) {
              // set next piece to fall
              currPieceName = nextPieceName
              currentPiece.setTexture(currPieceName)
              currentPiece.setPosition(getRandomPosX(), 100)
              currentPiece.angle = nextPiece.angle; // getRandomAngle()
              currentPiece.getBounds()

              ionikosCorrect = 2

              piecesActive = []

              if (dorikosCorrect <= 3) { piecesActive.push(piecesDorikos[dorikosCorrect]); }
              if (korinthiakosCorrect <= 3) { piecesActive.push(piecesKorinthiakos[korinthiakosCorrect]); }

              // show next piece
              nextPieceName = getRandomNextPiece()
              nextPiece.setTexture(nextPieceName)
              nextPiece.angle = getRandomAngle()

              ionikos2.setPosition(pos_Ionikos.x2, pos_Ionikos.y2); // = this.matter.add.image(pos_Dorikos.x1, pos_Dorikos.y1, 'dorikos_1').setStatic(true)
              ionikos2.setStatic(true)
              ionikos2.setCollisionCategory(cat1)
              ionikos2.visible = true;
              
              extraSpeed = 1; 
              

              return;
            }
          } else if (currPieceName === piecesIonikos[2]) {
            if (ionikos3.visible === false) {
              // set next piece to fall
              currPieceName = nextPieceName
              currentPiece.setTexture(currPieceName)
              currentPiece.setPosition(getRandomPosX(), 100)
              currentPiece.angle = nextPiece.angle; // getRandomAngle()
              currentPiece.getBounds()

              ionikosCorrect = 3

              piecesActive = []

              if (dorikosCorrect <= 3) { piecesActive.push(piecesDorikos[dorikosCorrect]); }
              if (korinthiakosCorrect <= 3) { piecesActive.push(piecesKorinthiakos[korinthiakosCorrect]); }

              // show next piece
              nextPieceName = getRandomNextPiece()
              nextPiece.setTexture(nextPieceName)
              nextPiece.angle = getRandomAngle()

              ionikos3.setPosition(pos_Ionikos.x3, pos_Ionikos.y3); // = this.matter.add.image(pos_Dorikos.x1, pos_Dorikos.y1, 'dorikos_1').setStatic(true)
              ionikos3.setStatic(true)
              ionikos3.setCollisionCategory(cat1)
              ionikos3.visible = true;

              extraSpeed = 1; 
              

              return;
            }
          } else if (currPieceName === piecesIonikos[3]) {
            if (ionikos4.visible === false) {
              // set next piece to fall
              currPieceName = nextPieceName
              currentPiece.setTexture(currPieceName)
              currentPiece.setPosition(getRandomPosX(), 100)
              currentPiece.angle = nextPiece.angle; // getRandomAngle()
              currentPiece.getBounds()

              ionikosCorrect = 4

              ionikos4.setPosition(pos_Ionikos.x4, pos_Ionikos.y4); // = this.matter.add.image(pos_Dorikos.x1, pos_Dorikos.y1, 'dorikos_1').setStatic(true)
              ionikos4.setStatic(true)
              ionikos4.setCollisionCategory(cat1)
              ionikos4.visible = true

              piecesActive = [];

              extraSpeed = 1; 
              

              if (dorikosCorrect <= 3) { piecesActive.push(piecesDorikos[dorikosCorrect]); }
              if (korinthiakosCorrect <= 3) { piecesActive.push(piecesKorinthiakos[korinthiakosCorrect]); }

              if (piecesActive.length > 0) {
                // show next piece
                nextPieceName = getRandomNextPiece()
                nextPiece.setTexture(nextPieceName)
                nextPiece.angle = getRandomAngle()
              } else {
                DebugLog('YOU WIN!!!')
                winFormGame();
                
               // winPanel.visible = true
              }

              return
            }
          } else { // if current piece is not for this column
            wrongMoves++;
            // wrongMovesText.setText('Wrong Moves: ' + wrongMoves);
            // set next piece to fall
            currPieceName = nextPieceName
            currentPiece.setTexture(currPieceName)
            currentPiece.setPosition(getRandomPosX(), 100)
            currentPiece.angle = nextPiece.angle; // getRandomAngle()
            currentPiece.getBounds()

            // new piece
            piecesActive = []

            if (dorikosCorrect <= 3) { piecesActive.push(piecesDorikos[dorikosCorrect]); }
            if (ionikosCorrect <= 3) { piecesActive.push(piecesIonikos[ionikosCorrect]); }
            if (korinthiakosCorrect <= 3) { piecesActive.push(piecesKorinthiakos[korinthiakosCorrect]); }

            if (piecesActive.length > 0) {
              // show next piece
              nextPieceName = getRandomNextPiece()
              nextPiece.setTexture(nextPieceName)
              nextPiece.angle = getRandomAngle()
            }

            extraSpeed = 1; 
            //arrowDown.visible = false;

            return;
          }
        } else

        // #endregion

        // #region Korinthiakos Check

        if (currentPiece.x === 1317) {
          // DebugLog('hit korinthiakos column')

          if (currPieceName === piecesKorinthiakos[0]) {
            if (korinth1.visible === false) {
              // set next piece to fall
              currPieceName = nextPieceName
              currentPiece.setTexture(currPieceName)
              currentPiece.setPosition(getRandomPosX(), 100)

              korinthiakosCorrect = 1

              piecesActive = []

              if (dorikosCorrect <= 3) { piecesActive.push(piecesDorikos[dorikosCorrect]); }
              if (ionikosCorrect <= 3) { piecesActive.push(piecesIonikos[ionikosCorrect]); }

              // show next piece
              nextPieceName = getRandomNextPiece()
              nextPiece.setTexture(nextPieceName)
              nextPiece.angle = getRandomAngle()

              korinth1.setPosition(pos_Korinthiakos.x1, pos_Korinthiakos.y1)
              korinth1.setStatic(true)
              korinth1.setCollisionCategory(cat1)
              korinth1.visible = true;

              extraSpeed = 1; 
              

              return;
            }
          } else if (currPieceName === piecesKorinthiakos[1]) {
            if (korinth2.visible === false) {
              // set next piece to fall
              currPieceName = nextPieceName
              currentPiece.setTexture(currPieceName)
              currentPiece.setPosition(getRandomPosX(), 100)
              currentPiece.angle = nextPiece.angle; // getRandomAngle()
              currentPiece.getBounds()

              korinthiakosCorrect = 2

              piecesActive = []

              if (dorikosCorrect <= 3) { piecesActive.push(piecesDorikos[dorikosCorrect]); }
              if (ionikosCorrect <= 3) { piecesActive.push(piecesIonikos[ionikosCorrect]); }

              // show next piece
              nextPieceName = getRandomNextPiece()
              nextPiece.setTexture(nextPieceName)
              nextPiece.angle = getRandomAngle()

              korinth2.setPosition(pos_Korinthiakos.x2, pos_Korinthiakos.y2); // = this.matter.add.image(pos_Dorikos.x1, pos_Dorikos.y1, 'dorikos_1').setStatic(true)
              korinth2.setStatic(true)
              korinth2.setCollisionCategory(cat1)
              korinth2.visible = true;

              extraSpeed = 1; 
              

              return;
            }
          } else if (currPieceName === piecesKorinthiakos[2]) {
            if (korinth3.visible === false) {
              // set next piece to fall
              currPieceName = nextPieceName
              currentPiece.setTexture(currPieceName)
              currentPiece.setPosition(getRandomPosX(), 100)
              currentPiece.angle = nextPiece.angle; // getRandomAngle()
              currentPiece.getBounds()

              korinthiakosCorrect = 3

              piecesActive = []

              if (dorikosCorrect <= 3) { piecesActive.push(piecesDorikos[dorikosCorrect]); }
              if (ionikosCorrect <= 3) { piecesActive.push(piecesIonikos[ionikosCorrect]); }

              // show next piece
              nextPieceName = getRandomNextPiece()
              nextPiece.setTexture(nextPieceName)
              nextPiece.angle = getRandomAngle()

              korinth3.setPosition(pos_Korinthiakos.x3, pos_Korinthiakos.y3); // = this.matter.add.image(pos_Dorikos.x1, pos_Dorikos.y1, 'dorikos_1').setStatic(true)
              korinth3.setStatic(true)
              korinth3.setCollisionCategory(cat1)
              korinth3.visible = true;

              extraSpeed = 1; 
              

              return;
            }
          } else if (currPieceName === piecesKorinthiakos[3]) {
            if (korinth4.visible === false) {
              // set next piece to fall
              currPieceName = nextPieceName
              currentPiece.setTexture(currPieceName)
              currentPiece.setPosition(getRandomPosX(), 100)
              currentPiece.angle = nextPiece.angle; // getRandomAngle()
              currentPiece.getBounds()

              korinthiakosCorrect = 4

              korinth4.setPosition(pos_Korinthiakos.x4, pos_Korinthiakos.y4); // = this.matter.add.image(pos_Dorikos.x1, pos_Dorikos.y1, 'dorikos_1').setStatic(true)
              korinth4.setStatic(true)
              korinth4.setCollisionCategory(cat1)
              korinth4.visible = true

              piecesActive = [];

              extraSpeed = 1; 
              

              if (dorikosCorrect <= 3) { piecesActive.push(piecesDorikos[dorikosCorrect]); }
              if (ionikosCorrect <= 3) { piecesActive.push(piecesIonikos[ionikosCorrect]); }

              if (piecesActive.length > 0) {
                // show next piece
                nextPieceName = getRandomNextPiece()
                nextPiece.setTexture(nextPieceName)
                nextPiece.angle = getRandomAngle()
              } else {
                DebugLog('YOU WIN!!!')
                winFormGame();
               
               // winPanel.visible = true
              }

              return;
            }
          } else { // if current piece is not for this column

            extraSpeed = 1; 
            //arrowDown.visible = false;

            wrongMoves++;
            // wrongMovesText.setText('Wrong Moves: ' + wrongMoves);
            // set next piece to fall
            currPieceName = nextPieceName
            currentPiece.setTexture(currPieceName)
            currentPiece.setPosition(getRandomPosX(), 100)
            currentPiece.angle = nextPiece.angle; // getRandomAngle()
            currentPiece.getBounds()

            // new piece
            piecesActive = []

            if (dorikosCorrect <= 3) { piecesActive.push(piecesDorikos[dorikosCorrect]); }
            if (ionikosCorrect <= 3) { piecesActive.push(piecesIonikos[ionikosCorrect]); }
            if (korinthiakosCorrect <= 3) { piecesActive.push(piecesKorinthiakos[korinthiakosCorrect]); }

            if (piecesActive.length > 0) {
              // show next piece
              nextPieceName = getRandomNextPiece();
              nextPiece.setTexture(nextPieceName);
              nextPiece.angle = getRandomAngle();
            }

            return;
          }
        } // axonas x check
        else {

          extraSpeed = 1; 
          //arrowDown.visible = false;

          wrongMoves++;
          // wrongMovesText.setText('Wrong Moves: ' + wrongMoves);
          // set next piece to fall
          currPieceName = nextPieceName
          currentPiece.setTexture(currPieceName)
          currentPiece.setPosition(getRandomPosX(), 100)
          currentPiece.angle = nextPiece.angle; // getRandomAngle()
          currentPiece.getBounds()

          // new piece
          piecesActive = []

          if (dorikosCorrect <= 3) { piecesActive.push(piecesDorikos[dorikosCorrect]); }
          if (ionikosCorrect <= 3) { piecesActive.push(piecesIonikos[ionikosCorrect]); }
          if (korinthiakosCorrect <= 3) { piecesActive.push(piecesKorinthiakos[korinthiakosCorrect]); }

          if (piecesActive.length > 0) {
            // show next piece
            nextPieceName = getRandomNextPiece()
            nextPiece.setTexture(nextPieceName)
            nextPiece.angle = getRandomAngle()
          }
          
          return;

        }

        //DebugLog('currentPiece = ' + currPieceName + ' and nextPiece = ' + nextPieceName)

        // #endregion

      } // angle check
      else {
        
        if (usePenaltyTime) {
          timePenalty += timeToRemove;
          timerEventGame.delay -= timeToRemove * 1000;
        }

        extraSpeed = 1; 
        //arrowDown.visible = false;

        wrongMoves++;
        // wrongMovesText.setText('Wrong Moves: ' + wrongMoves);
        // set next piece to fall
        currPieceName = nextPieceName;
        currentPiece.setTexture(currPieceName);
        currentPiece.setPosition(getRandomPosX(), 100);
        currentPiece.angle = nextPiece.angle; // getRandomAngle()
        currentPiece.getBounds()

        // new piece
        piecesActive = []

        if (dorikosCorrect <= 3) { piecesActive.push(piecesDorikos[dorikosCorrect]); }
        if (ionikosCorrect <= 3) { piecesActive.push(piecesIonikos[ionikosCorrect]); }
        if (korinthiakosCorrect <= 3) { piecesActive.push(piecesKorinthiakos[korinthiakosCorrect]); }

        if (piecesActive.length > 0) {
          // show next piece
          nextPieceName = getRandomNextPiece()
          nextPiece.setTexture(nextPieceName)
          nextPiece.angle = getRandomAngle()
        }
      }
    })

    //#endregion

    

    nextPiece.visible = false;
    currentPiece.visible = false;

    var blockA = currentPiece;
    var blockB = baseDorikos;

    var blockC = baseIonikos;
    var blockD = baseKorinthiakos;

    cat1 = this.matter.world.nextCategory()

    blockA.setCollisionCategory(cat1)
    blockB.setCollisionCategory(cat1)
    blockC.setCollisionCategory(cat1)

    var cat2 = this.matter.world.nextCategory()

    blockD.setCollisionCategory(cat2)

    blockA.setCollidesWith([ cat1, cat2 ])

    isGamePaused = true;
    wrongMoves = 0;

    //wrongMovesText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });

    createSceneFooter();

    showLevelSelectPanel();

    createPopUpMessage();

    createHelp();

    fadeInCamera(2);
    
  }//create

  update (time, delta) {


    calculateTime();

    if (!isGamePaused && !isGameOver) {

      //reset position
      if (currentPiece.y < 100 || currentPiece.y > 975) {
        currentPiece.y = 100
        //currentPiece.x = 883; //428; //883 //1317
        currentPiece.setVelocity(0, 0);
      }

      if (currentPiece.y < 975) {
          currentPiece.y += speed * delta * extraSpeed;
      } else {
        // check if is in right place
      }

    }


  }//update


}

function startNewFormGame()
{
  DebugLog('starting '+currentScene+' game...');

  _this.time.delayedCall(500, newFormGame, [], _this);

  isFormFirstHelp = true;
}

function newFormGame()
{

  arrowDown.visible = true;
  nextPiece.visible = true;
  currentPiece.visible = true;

  if(selectedLevel == 1){
    speed = fallSpeed.easy;
  }else
  if(selectedLevel == 2){
    speed = fallSpeed.medium;
  }else
  if(selectedLevel == 3){
    speed = fallSpeed.hard;
  }else
  if(selectedLevel == 4){
    speed = fallSpeed.champion;
  }

  isGamePaused = false;
  isGameOver = false;

  wrongMoves = 0;

  timeToRemove = 5;

  timePenalty=0;
  timerEventGame = _this.time.addEvent({ delay: totalTimeSelected, timeScale: 1.0 });
  timerEventGame.paused = false;
  timeOfGame = totalTimeSelected;

  textTime.visible=true;

  showHelp();
}

function onTimeEnd ()
{
  helpShowHide();
}

// get random piece
function getRandomPiece () {
  // var aImageFiles = ['dorikos_1', 'dorikos_1', 'dorikos_1', 'dorikos_1']
  var randPiece = piecesActive[Math.floor(Math.random() * piecesActive.length)]

  return randPiece;
}

function getRandomNextPiece () {

  if (piecesActive.length === 1) {return piecesActive[0];};

  var aImageFiles = piecesActive;

  for (var i = aImageFiles.length - 1; i >= 0; i--) {
    if (aImageFiles[i] === currPieceName) {
      aImageFiles.splice(i, 1);
    }
  }

  var randPiece = aImageFiles[Math.floor(Math.random() * aImageFiles.length)];

  // DebugLog(' >> Next piece is '+ randPiece)

  return randPiece;
}

// get random angle for piece
function getRandomAngle () {
  var randAngles = [90, -180, -90];
  var rand = randAngles[Math.floor(Math.random() * randAngles.length)];
  return rand;
}

// get random position for piece
function getRandomPosX () {
  var randXpos = [428, 883, 1317];
  var rand = randXpos[Math.floor(Math.random() * randXpos.length)];
  DebugLog('next x position = '+rand);
  arrowDown.x = rand;
  return rand;
}

function hideMe () {
  if (currentPiece.visible === true) {
    currentPiece.visible = false
  }else {
    currentPiece.visible = true
  }
}

function helpShowHide () {
  if (helpPanel.visible === true) {
    helpPanel.visible = false;
    setTimeout(function () { isGamePaused = false; }, 500)
  }else {
    helpPanel.visible = true;
    isGamePaused = true;
  }
}

function loseFormGame()
{
  menuBarPreviewButton.visible = false;
  currentPiece.visible = false;
  nextPiece.visible = false;
  arrowDown.visible = false;
}


function winFormGame()
{
  currentPiece.visible = false;
  arrowDown.visible = false;
  menuBarPreviewButton.visible = false;

  DebugLog('You win '+ currentScene + ' game!');

    var myScore = selectedLevel * timeOfGame;
    if (myScore > scoreForm) {
      scoreForm = myScore;
      SaveScore(myScore);
    }

    textTime.setText(myScore);
    timeBar.setScale(1, 1);
    timeBar.setTint('0xffffff');

    showPopUpMessage('\nForm feedback text');
    
}

function ContinueForm() {
  isGameOver = true;
  isGamePaused = true;
  var myScore = selectedLevel * timeOfGame;
  showPopUpMessage('\nΜπράβο!!!\n\nΚέρδισες ' + myScore + ' βαθμούς.\n\nΠαίξε πάλι για να αποκτήσεις περισσότερους.');

  //_this.time.delayedCall(3500, restartScene, [], _this);
}

var isFormFirstHelp = false;

// κομμάτια
var dorikos1Help, dorikos2Help, dorikos3Help, dorikos4Help;
var ionikos1Help, ionikos2Help, ionikos3Help, ionikos4Help;
var korinth1Help, korinth2Help, korinth3Help, korinth4Help;

function formHelpCreateAllColumns() {

  menuBarPreviewButton.on('pointerdown', function () {
    if (!isPreviewOn) {
      isGamePaused = true;
      timePenalty += timeToRemove * 3;
      timerEventGame.delay -= timeToRemove * 3 * 1000;
      formShowPreview();
      isPreviewOn = true;
    } else {
      isPreviewOn = false;
      formHidePreview();
    }
  }, _this);

  // prepare kolones pieces
  dorikos1Help = _this.add.image(pos_Dorikos.x1, pos_Dorikos.y1, piecesDorikos[0]);
  dorikos2Help = _this.add.image(pos_Dorikos.x2, pos_Dorikos.y2, piecesDorikos[1]);
  dorikos3Help = _this.add.image(pos_Dorikos.x3, pos_Dorikos.y3, piecesDorikos[2]);
  dorikos4Help = _this.add.image(pos_Dorikos.x4, pos_Dorikos.y4, piecesDorikos[3]);

  ionikos1Help = _this.add.image(pos_Ionikos.x1, pos_Ionikos.y1, piecesIonikos[0]);
  ionikos2Help = _this.add.image(pos_Ionikos.x2, pos_Ionikos.y2, piecesIonikos[1]);
  ionikos3Help = _this.add.image(pos_Ionikos.x3, pos_Ionikos.y3, piecesIonikos[2]);
  ionikos4Help = _this.add.image(pos_Ionikos.x4, pos_Ionikos.y4, piecesIonikos[3]);

  korinth1Help = _this.add.image(pos_Korinthiakos.x1, pos_Korinthiakos.y1, piecesKorinthiakos[0]);
  korinth2Help = _this.add.image(pos_Korinthiakos.x2, pos_Korinthiakos.y2, piecesKorinthiakos[1]);
  korinth3Help = _this.add.image(pos_Korinthiakos.x3, pos_Korinthiakos.y3, piecesKorinthiakos[2]);
  korinth4Help = _this.add.image(pos_Korinthiakos.x4, pos_Korinthiakos.y4, piecesKorinthiakos[3]);

  // hide pieces
  dorikos1Help.visible = false;
  dorikos2Help.visible = false;
  dorikos3Help.visible = false;
  dorikos4Help.visible = false;

  ionikos1Help.visible = false;
  ionikos2Help.visible = false;
  ionikos3Help.visible = false;
  ionikos4Help.visible = false;

  korinth1Help.visible = false;
  korinth2Help.visible = false;
  korinth3Help.visible = false;
  korinth4Help.visible = false;

  dorikos1Help.depth = 100;
  dorikos2Help.depth = 100;
  dorikos3Help.depth = 100;
  dorikos4Help.depth = 100;

  ionikos1Help.depth = 100;
  ionikos2Help.depth = 100;
  ionikos3Help.depth = 100;
  ionikos4Help.depth = 100;

  korinth1Help.depth = 100;
  korinth2Help.depth = 100;
  korinth3Help.depth = 100;
  korinth4Help.depth = 100;
}

function formShowPreview(){

  if(isRealValue(currentPiece)){  currentPiece.visible = false; }
  if(isRealValue(btnDorikos)){  btnDorikos.visible = false; }
  if(isRealValue(btnIonikos)){  btnIonikos.visible = false; }
  if(isRealValue(btnKotinthiakos)){  btnKotinthiakos.visible = false; }
  if(isRealValue(arrowDown)){  arrowDown.visible = false; }
  menuBarPauseButton.visible = false;
  menuBarHelpButton.visible = false;

   dorikos1Help.visible = true;
   dorikos2Help.visible = true;
   dorikos3Help.visible = true;
   dorikos4Help.visible = true;

   ionikos1Help.visible = true;
   ionikos2Help.visible = true;
   ionikos3Help.visible = true;
   ionikos4Help.visible = true;

   korinth1Help.visible = true;
   korinth2Help.visible = true;
   korinth3Help.visible = true;
   korinth4Help.visible = true;

}

function formHidePreview(){
  currentPiece.visible = true;
  btnDorikos.visible = true;
  btnIonikos.visible = true;
  btnKotinthiakos.visible = true;
  arrowDown.visible = true;
  menuBarPauseButton.visible = true;
  menuBarHelpButton.visible = true;

  dorikos1Help.visible = false;
  dorikos2Help.visible = false;
  dorikos3Help.visible = false;
  dorikos4Help.visible = false;

  ionikos1Help.visible = false;
  ionikos2Help.visible = false;
  ionikos3Help.visible = false;
  ionikos4Help.visible = false;

  korinth1Help.visible = false;
  korinth2Help.visible = false;
  korinth3Help.visible = false;
  korinth4Help.visible = false;

  isGamePaused = false;
}