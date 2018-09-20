var controls;

class LeaderboardScene extends Phaser.Scene {

  constructor () { super({ key: 'leaderboard' }) }
      

  init () 
  {
    _this = this;
    // set scene name
    currentScene = 'leaderboard';

    console.info(currentScene+' init')

  }

  preload () {

    showProgress();
    loadBackground();

    this.load.image(currentScene + 'btnHome', imagesGeneral + 'home_button.png');
    this.load.image(currentScene + 'arrow', getSceneImagesFolder()  + 'arrow.png');

  }

  create () {
   
    showBackground();

    var bg2 = this.add.image(1920, 0, background).setOrigin(0, 0); 
    bg2.flipX = true;
    this.add.image(3840, 0, background).setOrigin(0, 0); 
    var bg3 = this.add.image(5760, 0, background).setOrigin(0, 0); 
    bg3.flipX = true;

      //read scores
    readBestScores();  

    //  Set the camera bounds to be the size of the image
    this.cameras.main.setBounds(0, 0, 7680, 1080);

    //  Camera controls
    var cursors = this.input.keyboard.createCursorKeys();

    var controlConfig = {
        camera: this.cameras.main,
        left: cursors.left,
        right: cursors.right,
        //up: cursors.up,
        //down: cursors.down,
        acceleration: 0.06,
        drag: 0.0005,
        maxSpeed: 1.0
    };

    controls = new Phaser.Cameras.Controls.SmoothedKeyControl(controlConfig);

    btnRight = this.add.image(68, 525, currentScene + 'arrow').setScrollFactor(0);
    btnRight.setInteractive({ cursor: 'pointer' });
    btnRight.depth = 200;

    btnRight.on('pointerup',
    function () {

    }
    );

    btnRight.on('pointerdown',
      function () {

        if(waitToMove){return;}

        waitToMove = true;

        var cam = _this.cameras.main;

        if (camStep === 0) {
          cam.pan(1920 + 960, 0, 2000, 'Power2');
        }
        else if (camStep === 1) {
          cam.pan(3840 + 960, 0, 2000, 'Power2');
        }
        else if (camStep === 2) {
          cam.pan(5760 + 960, 0, 2000, 'Power2');
        }

        camStep++;

        if(camStep> 0){ btnLeft.visible = true;}
        if(camStep>2){btnRight.visible = false;}

        _this.time.delayedCall(2000, ResetWaitToMove, [], _this);

      }
    );

    btnLeft = this.add.image(68, 578, currentScene + 'arrow').setScrollFactor(0);
    btnLeft.setInteractive({ cursor: 'pointer' });
    btnLeft.flipX = true;
    btnLeft.depth = 200;

    btnLeft.visible = false;

    btnLeft.on('pointerup',
      function () {}
    );

    btnLeft.on('pointerdown',
      function () {

        if(waitToMove){return;}

        waitToMove = true;


        var cam = _this.cameras.main;

        if (camStep === 3) {
          cam.pan(3840 + 960, 0, 2000, 'Power2');
        }
        else if (camStep === 2) {
          cam.pan(1920 + 960, 0, 2000, 'Power2');
        }
        else if (camStep === 1) {
          cam.pan(0 + 960, 0, 2000, 'Power2');
        }

        camStep--;

        if(camStep<= 0){ camStep = 0;  btnLeft.visible = false;}
        if(camStep<3){btnRight.visible = true;}

        _this.time.delayedCall(2000, ResetWaitToMove, [], _this);

      }
    );

    //  A sprite, doesn't scroll with the camera (is fixed to camera)
    btnHome = this.add.image(24, 494, currentScene + 'btnHome').setScrollFactor(0);

    btnHome.setInteractive({ cursor: 'pointer' });

    btnHome.depth = 200;

    btnHome.on('pointerup',
      function () {

        houseStartPos = { x: 413, y: 784 }; //+=672 *9 times
        flagTextPos = { x: 369, y: 476 } //+=672 *9 times
        leaderBoyShadowPos = { x: 249, y: 405 };
        leaderBoyBodyPos = { x: 243, y: 437 };
        leaderBoyHeadPos = { x: 250, y: 331 };

        leaderGirlShadowPos = { x: 259, y: 406 };
        leaderGirlBodyPos = { x: 259, y: 438 };
        leaderGirlHeadPos = { x: 251, y: 352 };

        leaderTextNamePos = { x: 261, y: 551 };
        leaderTextScorePos = { x: 530, y: 551 };
        leaderTextPosition = { x: 146, y: 411 };


        game.scene.stop(currentScene);
        game.scene.start(previousScene);
      }
    );

  }

  update(time, delta) {
    controls.update(delta);

    // console.log(camStep);
  }

}

var btnRight, btnLeft, btnHome;
var camStep = 0;
var waitToMove = false;

function ResetWaitToMove(){
  waitToMove = false;
}

var  best_scores= [];


function readBestScores() {
    GetBestScores();   
    var count = 0;
    function onEvent() {
        count += 1;
        console.info(count);

        if (bestScoresRead == true) {    

            DebugLog(">>> best scores are loaded!");     

            var boolboy = ['true', 'false', 'true', 'false'];
            var colorhead = ['brown', 'yellow', 'black', 'brown'];
            var colorbody = ['red', 'green', 'blue', 'navy', 'purple'];

            for(var i=0; i<best_scores.length; i++){
              //DebugLog("user = "+ best_scores[i][0]);
              //DebugLog("score = "+ best_scores[i][1]);

              //set random avatar
              boolboy.sort( () => Math.random() - 0.5) ;
              best_scores[i].push(boolboy[0]);

              colorhead.sort( () => Math.random() - 0.5) ;
              best_scores[i].push(colorhead[0]);

              colorbody.sort( () => Math.random() - 0.5) ;
              best_scores[i].push(colorbody[0]);
            }

            bestScoresTimer.destroy();

            bestScoresRead = false;      
            
            LoadHouses();

        } else {
            console.info(">> best scores are not loaded!");
        }
    }

    bestScoresRead = false;

    var bestScoresTimer;

    bestScoresTimer = _this.time.addEvent({ delay: 100, callback: onEvent, callbackScope: this, loop: true });

}

function LoadHouses(){
    
  _this.load.once('complete', AddHouses, this);

  _this.load.image(currentScene+ 'player_score', getSceneImagesFolder() + 'player_score.png');

  for(var i=0; i<best_scores.length; i++){
    DebugLog(best_scores[i][2] + ' - ' + best_scores[i][3] + ' - ' + best_scores[i][4]);
    leaderLoadPlayerAvatar(best_scores[i][0], best_scores[i][2], best_scores[i][3], best_scores[i][4]);
    _this.load.image(best_scores[i][0] + 'house', getSceneImagesFolder() + 'house.jpg');

  }

  _this.load.start();

}

var houseStartPos = {x:413, y:784}; //+=672 *9 times
var flagTextPos = {x:369, y:476} //+=672 *9 times
var leaderBoyShadowPos = {x:249, y: 405};
var leaderBoyBodyPos = {x:243, y: 437};
var leaderBoyHeadPos = {x:250, y: 331};

var leaderGirlShadowPos = {x:259, y: 406};
var leaderGirlBodyPos = {x:259, y: 438};
var leaderGirlHeadPos = {x:251, y: 352};

var leaderTextNamePos = {x:261, y: 551};
var leaderTextScorePos = {x:530, y: 551};
var leaderTextPosition = {x:146, y:411};

function AddHouses(){

  houseStartPos = { x: 413, y: 784 }; //+=672 *9 times
  flagTextPos = { x: 369, y: 476 } //+=672 *9 times
  leaderBoyShadowPos = { x: 249, y: 405 };
  leaderBoyBodyPos = { x: 243, y: 437 };
  leaderBoyHeadPos = { x: 250, y: 331 };

  leaderGirlShadowPos = { x: 259, y: 406 };
  leaderGirlBodyPos = { x: 259, y: 438 };
  leaderGirlHeadPos = { x: 251, y: 352 };

  leaderTextNamePos = { x: 261, y: 551 };
  leaderTextScorePos = { x: 530, y: 551 };
  leaderTextPosition = { x: 146, y: 411 };

 

  for(var i=0; i<best_scores.length; i++){

    //DebugLog('Adding house....'+i);

    _this.add.image(houseStartPos.x, houseStartPos.y, best_scores[i][0] + 'house');
    _this.add.image(flagTextPos.x, flagTextPos.y, currentScene + 'player_score');

    if(best_scores[i][2] === 'true'){
      var shadow = _this.add.image(leaderBoyShadowPos.x, leaderBoyShadowPos.y, best_scores[i][0] + 'leaderShadow');
      var body = _this.add.image(leaderBoyBodyPos.x, leaderBoyBodyPos.y, best_scores[i][0] + 'leaderbody');
      var head = _this.add.image(leaderBoyHeadPos.x, leaderBoyHeadPos.y, best_scores[i][0] + 'leaderhead');
      shadow.setScale(0.45);
      body.setScale(0.45);
      head.setScale(0.45);
    }else{
      var shadow = _this.add.image(leaderGirlShadowPos.x, leaderGirlShadowPos.y, best_scores[i][0] + 'leaderShadow');
      var body = _this.add.image(leaderGirlBodyPos.x, leaderGirlBodyPos.y, best_scores[i][0] + 'leaderbody');
      var head = _this.add.image(leaderGirlHeadPos.x, leaderGirlHeadPos.y, best_scores[i][0] + 'leaderhead');
      shadow.setScale(0.45);
      body.setScale(0.45);
      head.setScale(0.45);
    }

    var nameText = _this.make.text(configLeaderNameText);
    nameText.setOrigin(0.5, 0.5);
    nameText.depth = 100;
    nameText.setText(best_scores[i][0]);
    nameText.x = leaderTextNamePos.x;
    nameText.y = leaderTextNamePos.y;

    var nameText = _this.make.text(configLeaderPositionText);
    nameText.setOrigin(0.5, 0.5);
    nameText.depth = 100;
    nameText.setText(i+1);
    nameText.x = leaderTextPosition.x;
    nameText.y = leaderTextPosition.y;

   // DebugLog('>>>>>>>>>>>>'+best_scores[i][0]+'<<<<<<<<<<<<<<<<<<');

    var scoreText = _this.make.text(configLeaderScoreText);
    scoreText.setOrigin(0.5, 0.5);
    scoreText.depth = 100;
    scoreText.setText(best_scores[i][1]);
    scoreText.x = leaderTextScorePos.x;
    scoreText.y = leaderTextScorePos.y;

    houseStartPos.x += 672;
    flagTextPos.x += 672;
    leaderBoyShadowPos.x += 672;
    leaderBoyBodyPos.x += 672;
    leaderBoyHeadPos.x += 672;
    leaderGirlShadowPos.x += 672;
    leaderGirlBodyPos.x += 672;
    leaderGirlHeadPos.x += 672;
    leaderTextNamePos.x += 672;
    leaderTextScorePos.x += 672;
    leaderTextPosition.x += 672;
  }
}
