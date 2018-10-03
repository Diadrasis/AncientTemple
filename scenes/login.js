
let loadingImg;

class LoginScene extends Phaser.Scene 
{

  constructor (config) {super({ key: 'login' }) }

  init () 
  {
     _this = this;    
    // set scene name
    currentScene = 'login';
    console.info(currentScene + ' init');
      //isLoginFinishLoading = false; 

      /*
      
      if (this.sys.game.device.browser.chrome) {
          //alert('chrome ' + this.sys.game.device.browser.chrome.chromeVersion + ' is runninng!');
      } else if (this.sys.game.device.browser.firefox) { //running in Firefox.
        
      } else if (this.sys.game.device.browser.ie) { //running in Internet Explorer 11 or less(not Edge)

      } else if (this.sys.game.device.browser.mobileSafari) { // running in Mobile Safari.

      } else if (this.sys.game.device.browser.opera) { //running in Opera.

      } else if (this.sys.game.device.browser.safari) {// running in Safari

      } else if (this.sys.game.device.browser.trident) {//running a Trident version of Internet Explorer(IE11 +)

      }
      */

  }

    
  preload () {
    showProgress();
    loadBackground();

      //language buttons
    this.load.image('en', imagesFolder + currentScene + '/lang_en.png');
    this.load.image('gr', imagesFolder + currentScene + '/lang_gr.png');

      // logo
    this.load.image('logo_gr', imagesFolder + currentScene + '/logo_gr.png');
    this.load.image('logo_en', imagesFolder + currentScene + '/logo_en.png');

    //load image button for newPlayer - oldPlayer  
    _this.load.image(currentScene + 'draftButton', getSceneImagesFolder() + 'button' + '.png');   

      //load sprite sheets for animation
    _this.load.spritesheet('spshLoader', 'assets/animation/' + 'loader.png', { frameWidth: 380, frameHeight: 380 });  
    _this.load.spritesheet('spshNaopios', 'assets/animation/' + 'naopoios_intro.png', { frameWidth: 289, frameHeight: 371});

    
  } 

 
  create () 
  { 
      showBackground();

      //the animation is called by 
      _this.anims.create({
          key: 'animLoader',
          frames: _this.anims.generateFrameNumbers('spshLoader', { start: 0, end: 11 }),
          frameRate: 6,
          repeat: -1,
          showOnStart: true
      });
      load_anim = _this.add.sprite(960, 600, 'spshLoader');
      load_anim.visible = false;
      load_anim.setDisplaySize(120, 120);
          
     
      _this.anims.create({
          delay: 600,
          key: 'wave',
          frames: _this.anims.generateFrameNumbers('spshNaopios', { start: 0, end: 15 }),
          frameRate: 12,
          repeat: -1,
          repeatDelay: 3000,
          showOnStart: false
      });
      animWave = _this.add.sprite(1400, 840, 'spshNaopios');
      //animBlink.setDisplaySize(168, 168);
      animWave.anims.play('wave');

      //show logo
      logo_login = _this.add.image(1825, 150, 'logo_' + languange);

      btn_lang_login = this.add.image(1835, 52, languange).setInteractive({ cursor: 'pointer' });
      btn_lang_login.on('pointerdown', ChangeLoginLang);

      loadingImg = _this.add.image(1920/2, 1080/2, currentScene + 'loading');
      loadingImg.setOrigin(0.5, 0.5); 
      loadingImg.visible = false;
      loadingImg.depth = 777;
      loadingImg.setScale(1);
      
      var body = document.getElementsByTagName('body')[0];
      
      body.onresize = function () {
          PositionFormElements();
      }             

      var inputUser = document.createElement("input");
      inputUser.type = 'text';
      inputUser.id = 'txtUser';
      inputUser.name = 'txtUser'; 
      body.appendChild(inputUser);

      var inputPsw = document.createElement("input");
      inputPsw.type = 'text';
     
      inputPsw.id = 'txtPsw';
      inputPsw.name = 'txtPsw';           
      body.appendChild(inputPsw);

      var btn = document.createElement("button");
      btn.id = 'button';
      btn.type = 'button';    
      body.appendChild(btn);     

      loginTxtMessage = _this.make.text(configLoginMessageText);
      //loginTxtMessage.x = 860;
      loginTxtMessage.y = 660;
     
      if (isNewPlayer) {
          ShowLocaleMessage(loginTxtMessage, 960, 'Δημιούργησε Χρήστη', 'Create User');         
          //manage_db
          btn.onclick = CreateUser;
      } else {
          ShowLocaleMessage(loginTxtMessage, 960, 'Εισαγωγή!', 'Login')  ;
          //manage_db
          btn.onclick = GetPassword;
      }   

      PositionFormElements(); 
      function PositionFormElements() {
          //get canvas dimensions and position
          var cwidth = document.getElementsByTagName('canvas')[0].offsetWidth;
          var cheight = document.getElementsByTagName('canvas')[0].offsetHeight;
          var rect = document.getElementsByTagName('canvas')[0].getBoundingClientRect();
          var cleft = rect.left;

          //user
          inputUser.style.width = (cwidth * 0.19).toString() + 'px';
          inputUser.style.left = (cleft + (cwidth * 0.27)).toString() + 'px';
          inputUser.style.top = (cheight * 0.48).toString() + 'px';

          //password
          inputPsw.style.width = (cwidth * 0.19).toString() + 'px';
          inputPsw.style.left = (cleft + (cwidth * 0.55)).toString() + 'px';
          inputPsw.style.top = (cheight * 0.48).toString() + 'px';

          //button
          btn.style.width = (cwidth * 0.2).toString() + 'px';
          btn.style.left = (cleft+ (cwidth * 0.40)).toString() + 'px';
          btn.style.top = (cheight * 0.67).toString() + 'px';

          
     }

      //show button
      var btnLoginEnter = _this.add.image(983, 744, currentScene + 'draftButton').setInteractive({ cursor: 'pointer' });

  }//create
}

var logo_login;
var btn_lang_login;
var loginTxtMessage;


var load_anim;
var animWave;

function ChangeLoginLang() {
    languange = languange === 'gr' ? 'en' : 'gr';
    btn_lang_login.setTexture(languange);

    logo_login.destroy();
    logo_login = _this.add.image(1825, 150, 'logo_' + languange);

    if (isNewPlayer) {        
        ShowLocaleMessage(loginTxtMessage, 960, 'Δημιούργησε Χρήστη!', 'Creat User');
    } else {        
        ShowLocaleMessage(loginTxtMessage, 960, 'Εισαγωγή', 'Enter');
    }
}



//var isLoginFinishLoading = false;

//GetPlayerPsw
//GetPlayerId
//GetPlayerAvatar

function AvatarFinishedLoading() {    
    ClearForm();   
    initPlayerArrays();
    //go to scene
    game.scene.stop(currentScene);
    game.scene.start('menu');
}

function ClearForm() {
    //remove button
    
    var btn = document.getElementById("button");
    if (!!btn) {
        btn.parentNode.removeChild(btn);
    }

    //remove text boxes
    var txtUser = document.getElementById('txtUser');
    if (!!txtUser) {
        txtUser.parentNode.removeChild(txtUser);
    }

    var txtPsw = document.getElementById('txtPsw');
    if (!!txtPsw) {
        txtPsw.parentNode.removeChild(txtPsw);
    }
}

function ShowLocaleMessage(txt, xpos, message_gr, message_en) { 
    if (languange == 'gr') {
        txt.setText(message_gr);
    } else {
        txt.setText(message_en);
    }
    txt.x = xpos - (txt.width/2);
    
}

//not using
/*
function Continue() {
    //var btnLoginEnter = _this.add.image(983, 744, currentScene + 'draftButton').setInteractive({ cursor: 'pointer' });
    btnLoginEnter.on('pointerup',
      function () {
          if (isNewPlayer) {
              DebugLog('Load Player Customization');
              game.scene.stop(currentScene);
              game.scene.start('player');
          } else {
              DebugLog('Login to menu');
              game.scene.stop(currentScene);
              game.scene.start('menu');
          }
      }
    );
}
*/
