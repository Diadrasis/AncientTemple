


class Menu extends Phaser.Scene 
{

  constructor (config) {super({ key: 'menu' }) }

  init () 
  {
    _this = this;
    // set scene name
    currentScene = 'menu';
      DebugLog(currentScene + ' init');
      

  }

  preload() {
    //language buttons
    this.load.image('en', imagesFolder + currentScene + '/lang_en.jpg');
    this.load.image('gr', imagesFolder + currentScene + '/lang_gr.jpg');   
     
    // logo
    this.load.image('logo_menu_gr', imagesFolder + currentScene + '/logo_menu_gr.png');
    this.load.image('logo_menu_en', imagesFolder + currentScene + '/logo_menu_en.png');

    //footer
    this.load.image('footer_menu_gr', imagesFolder + currentScene + '/footer_menu_gr.png');
    this.load.image('footer_menu_en', imagesFolder + currentScene + '/footer_menu_en.png');

    //help - return
    this.load.image('side_menu', imagesFolder + currentScene + '/side_menu.png');
    this.load.image('menu_help_en', imagesFolder + currentScene + '/menu_help_en.jpg');
    this.load.image('menu_help_gr', imagesFolder + currentScene + '/menu_help_gr.jpg');
    this.load.image('btnEmpty', imagesGeneral + 'btnMenuEmpty.png');
    
    showProgress();
    loadBackground();      
    loadButtonsImages();
    loadScoreImages();
    loadNeoclassical();
    loadButtonsExtra();
    //readGameScores(playerId);
  }

 

  create () 
  { 
    
      showBackground();
     
     GetGameScores(playerId);

    //show logo
    logo_menu = _this.add.image(1825, 150, 'logo_menu_' + languange);
      
    //show footer
    footer_menu = _this.add.image(game.config.width / 2, game.config.height - 50, 'footer_menu_' + languange);

    //show logo
     _this.add.image(53, 148, 'side_menu');

    // _this.time.delayedCall(3500, createScores, [], this);

    //call when sure that the data have been read!
    //createScores();

    btnLanguange = this.add.image(1835, 52, 'gr').setInteractive({ cursor: 'pointer' });
    btnLanguange.on('pointerdown', ChangeLanguange);
    btnLanguange.setTexture(languange); 

    //call when the data have been read!
    //createGameButtons();

    //createNeoclassical();

    createButtonsExtra(); 

    btnHelpMenu = this.add.image(56, 108, 'btnEmpty').setInteractive({ cursor: 'pointer' });
    btnHelpMenu.on('pointerdown', ShowMenuHelp, this);
    btnHelpMenu.depth = 70;

    btnReturnMenu = this.add.image(56, 188, 'btnEmpty').setInteractive({ cursor: 'pointer' });
    btnReturnMenu.on('pointerdown', ReturnToIntro, this);
    btnReturnMenu.depth = 70;


    helpMenu = this.add.image(0, 0, 'menu_help_gr').setInteractive({ cursor: 'pointer' });
    helpMenu.setOrigin(0, 0); 
    helpMenu.visible = false;
    helpMenu.depth = 100;
    helpMenu.on('pointerdown', function(){ helpMenu.visible = false;}, this);

    if(!isMenuFirstHelp){
        this.time.delayedCall(1000, ShowMenuHelp, [], this);
        isMenuFirstHelp = true;
    }

  }//create

}

var isMenuFirstHelp = false;
var helpMenu;
var btnHelpMenu, btnReturnMenu;
var footer_menu;
var logo_menu;
var btnLanguange;

function ReturnToIntro(){
    isMenuFirstHelp = false;
    game.scene.stop(currentScene);
    game.scene.start('intro_site');
}

function ShowMenuHelp(){
    helpMenu.setTexture('menu_help_'+languange);
    helpMenu.visible = true;
}

function ChangeLanguange() {   
    languange = languange === 'gr' ? 'en' : 'gr';
    btnLanguange.setTexture(languange);   
    ShowLangFiles();
    helpMenu.setTexture('menu_help_'+languange);
}

function ShowLangFiles() {
    //logo
    logo_menu.destroy();
    logo_menu = _this.add.image(1825, 150, 'logo_menu_' + languange);

    //footer
    footer_menu.destroy();
    footer_menu = _this.add.image(game.config.width/2, game.config.height-50, 'footer_menu_' + languange);

    //titles
    for (var i = 0; i < btnTitles.length; i++) {
        btnTitles[i].destroy();       
    }
    btnTitles = [];   

    for (var i = 0; i < 6; i++) {        
        if (gameScores[i][1] === 0) {                
            createBtnTitles(posGameButtons[i].x + 20, posGameButtons[i].y + 40, sceneNames[i]);
        }
    }
     
}



//#region loading functions

function loadButtonsImages () 
{
    for(var i=0; i<6; i++)
    {
        if (gameScores[i][i]>0)
        {
            _this.load.image(sceneNames[i] + '_back', getSceneImagesFolder() + sceneNames[i] + '_back' + '.png');           
        }else{
            _this.load.image(sceneNames[i] + '_front', getSceneImagesFolder() + sceneNames[i] + '_front' + '.png');
            _this.load.image(sceneNames[i] + '_menu_title_gr', getSceneImagesFolder() + sceneNames[i] + '_menu_title_gr' + '.png');
            _this.load.image(sceneNames[i] + '_menu_title_en', getSceneImagesFolder() + sceneNames[i] + '_menu_title_en' + '.png');
        }
    }
}

function loadScoreImages () {
  // load btn images
  for (var x = 0; x < 6; x++) {
    _this.load.image(scoreImages[x], getSceneImagesFolder() + scoreImages[x] + '.png');
  }
}

function loadNeoclassical()
{
  _this.load.image('neoclassic_button', getSceneImagesFolder() + 'neoclassic_button' + '.png');

  //DebugLog(isUnlockNeoclassical());

  //if(!isUnlockNeoclassical()){
    _this.load.image('lock', getSceneImagesFolder() + 'neoclassic_lock' + '.png');
  //}
}


//#endregion

//#region create functions

var posGameButtons = Object.freeze([
  {x:559, y:288}, 
  {x:953, y:288}, 
  {x:1347, y:288}, 
  {x:559, y:698}, 
  {x:953, y:698}, 
  {x:1347, y:698}
]);



function createBtn(btn, posX, posY, name, action, sceneName) {   
  if (action !== null) {
    btn = _this.add.sprite(posX, posY, name).setInteractive({ cursor: 'pointer' });
    btn.on('pointerdown', function(){ currentScene = sceneName;});
    btn.on('pointerdown', action);     
     
  }else {
    btn = Menu.add.sprite(0, 0, name);
  }
}

var btnTitles=[];
function createBtnTitles(posX, posY, scene) {
    //alert('create ' + scene + '_menu_title_' + languange);
    var btnTitle = _this.add.image(posX, posY, scene + '_menu_title_'+ languange);
    btnTitles.push(btnTitle);    
}

function loadScene(){
  DebugLog('about to load '+currentScene);
  game.scene.stop('menu');
  game.scene.start(currentScene);
};

var posMenuScores = Object.freeze([
  {x:559, y:65}, 
  {x:953, y:65}, 
  {x:1347, y:65}, 
  {x:559, y:917}, 
  {x:953, y:917}, 
  {x:1347, y:917}
]);


function createNeoclassical()
{
  var btnNeoclassic =  _this.add.image(175, 462, 'neoclassic_button');

  if(isUnlockNeoclassical()){
    
    btnNeoclassic.setInteractive({ cursor: 'pointer' });

    btnNeoclassic.once('pointerdown',
      function () {
        game.scene.stop('menu');
        game.scene.start(sceneNames[6]);
      }
    );

  }else{
    btnNeoclassic.setAlpha(0.5);
    _this.add.image(198, 381, 'lock');
  }
}

//#endregion

function loadButtonsImages() {
    for (var i = 0; i < 6; i++) {
        //if (gameScores[i][i] > 0) {
            _this.load.image(sceneNames[i] + '_back', getSceneImagesFolder() + sceneNames[i] + '_back' + '.png'); btnLanguange
        //} else {
            _this.load.image(sceneNames[i] + '_front', getSceneImagesFolder() + sceneNames[i] + '_front' + '.png');
            _this.load.image(sceneNames[i] + '_menu_title_gr', getSceneImagesFolder() + sceneNames[i] + '_menu_title_gr' + '.png');
            _this.load.image(sceneNames[i] + '_menu_title_en', getSceneImagesFolder() + sceneNames[i] + '_menu_title_en' + '.png');
        //}
    }
    
}

function createGameButtons() {    
    var b1, b2, b3, b4, b5, b6;
    var btns = [b1, b2, b3, b4, b5, b6];  

    

    for (var i = 0; i < 6; i++) {        
        if (gameScores[i][1] > 0) {
            createBtn(btns[i], posGameButtons[i].x, posGameButtons[i].y, sceneNames[i] + '_back', loadScene, sceneNames[i]);
        } else {
            createBtn(btns[i], posGameButtons[i].x, posGameButtons[i].y, sceneNames[i] + '_front', loadScene, sceneNames[i]);
            createBtnTitles(posGameButtons[i].x + 20, posGameButtons[i].y + 40, sceneNames[i]);
        }
    }
    createGameScores();
    createNeoclassical();
}

function createGameScores() {
    for (var i = 0; i < 6; i++) {
        _this.add.image(posMenuScores[i].x, posMenuScores[i].y, scoreImages[i]).setOrigin(0.5, 0.5);
        //_this.add.text(posMenuScores[i].x, posMenuScores[i].y, getScoreOfGame(i+1), configScoreMenuText).setOrigin(0.5, 0.5);
        _this.add.text(posMenuScores[i].x, posMenuScores[i].y, gameScores[i][1], configScoreMenuText).setOrigin(0.5, 0.5);
    }
}