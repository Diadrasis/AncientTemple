
//var btnClothColorNames, btnHairColorNames;
//var girlHeadNames, boyHeadNames;
//var girlBodyNames, boyBodyNames;

var posBtnClothRed = { x: 334, y: 589 };
var posBtnClothGreen = { x: 485, y: 589 };
var posBtnClothBlue = { x: 652, y: 589 };
var posBtnClothNavy = { x: 822, y: 589 };
var posBtnClothPurple = { x: 982, y: 589 };

var posBtnHairBrown = { x: 486, y: 856 };
var posBtnHairYellow = { x: 651, y: 856 };
var posBtnHairBlack = { x: 823, y: 856 };

var posGirlHead = { x: 1552, y: 655 };
var posGirlBody = { x: 1568, y: 849 };

var posBoyBody = { x: 1530, y: 848 };
var posBoyHead = { x: 1544, y: 607 };

var posBtnBoy = {x:549, y:246};
var posBtnGirl = {x:320, y:246};
var posBtnBoy2 = {x:1007, y:246};
var posBtnGirl2 = {x:781, y:246};

var posShadowGirl = {x:1567, y:775};
var posShadowBoy = {x:1543, y:774};
var posShadowGirl2 = {x:1568, y:775};
var posShadowBoy2 = {x:1530, y:784};

var btnBoy, btnBoy2, btnGirl, btnGirl2;

var btnClothRed, btnClothGreen, btnClothBlue, btnClothNavy, btnClothPurple;
var btnHairBlack, btnHairBrown, btnHairYellow;

var avatarHead, avatarBody, avatarShadow;

var currHairColor = 'black', currClothColor = 'red', currAvatarIsBoy = 'true';

class PlayerScene extends Phaser.Scene 
{

  constructor (config) {super({ key: 'player' }) }

  init () 
  {
     _this = this;
    
    // set scene name
    currentScene = 'player';

    console.info(currentScene+' init')

    initPlayerArrays();

    mouseSetCursor(cursorType.wait);

  }

  preload () {

    showProgress();

    //loadBackground();
    background = 'avatar_background' + currentScene;
    if (languange === 'gr') {
      _this.load.image(background, getSceneImagesFolder() + 'avatar_background.jpg');
    }else{
      _this.load.image(background, getSceneImagesFolder() + 'avatar_background_en.jpg');
    }


    //load images
    loadImagesPlayerScene();

  }

  create () 
  { 

    mouseSetCursor(cursorType.default);

    //showBackground();
    backgroundObject = _this.add.image(0, 0, background).setOrigin(0, 0);

    var btnCreateAvatar =  _this.add.image(1263, 274, currentScene + 'draftButton').setInteractive({ cursor: 'pointer' });
    btnCreateAvatar.on('pointerup',
      function () {
          DebugLog('go to menu');

          DebugLog('On CreateUser playerId = ' +playerId + ' avatar boy is '+currAvatarIsBoy);
          SetPlayerAvatar(playerId, currAvatarIsBoy, currHairColor, currClothColor);

          avatarGlobal = new Array();
          avatarGlobal.push([currAvatarIsBoy, currHairColor, currClothColor]);
          /*********/
          //createGameButtons();
          game.scene.stop(currentScene);
          game.scene.start('menu');
      }
    );

    createClothColorButtons();

    createHairColorButtons();

    createAvatarButtons();

    currHairColor = 'black';
    currClothColor = 'red';
    currAvatarIsBoy = 'true';

    createAvatar();


  }//create

}

function createAvatar() 
{
  avatarHead = _this.add.image(posBoyHead.x, posBoyHead.y, currentScene + boyHeadNames.black);
  avatarHead.depth = 10;
  avatarBody = _this.add.image(posBoyBody.x, posBoyBody.y,currentScene + boyBodyNames.red);
  avatarBody.depth = 9;
  
  if(currAvatarIsBoy === 'true'){
    avatarShadow = _this.add.image(posShadowBoy.x, posShadowBoy.y,currentScene +'boy_shadow');
  }
  else if(currAvatarIsBoy === 'boy2'){
    avatarShadow = _this.add.image(posShadowBoy2.x, posShadowBoy2.y,currentScene +'boy2_shadow');
  }
  else if(currAvatarIsBoy === 'girl2'){
    avatarShadow = _this.add.image(posShadowGirl2.x, posShadowGirl2.y,currentScene +'girl2_shadow');
  }
  else{
    avatarShadow = _this.add.image(posShadowGirl.x, posShadowGirl.y,currentScene +'girl_shadow');
  }

  avatarShadow.depth = 8;
}

function setAvatar()
{
  avatarBody.setTexture(getClothName());
  let posBody = getBodyPosition();
  avatarBody.setPosition(posBody.x, posBody.y)

  avatarHead.setTexture(getHeadName());
  let posHead = getHeadPosition();
  avatarHead.setPosition(posHead.x, posHead.y);

  if(currAvatarIsBoy === 'true'){
    avatarShadow.setTexture(currentScene +'boy_shadow').setPosition(posShadowBoy.x, posShadowBoy.y);
  }
  else if(currAvatarIsBoy === 'boy2'){
    avatarShadow.setTexture(currentScene +'boy2_shadow').setPosition(posShadowBoy2.x, posShadowBoy2.y);
  }
  else if(currAvatarIsBoy === 'girl2'){
    avatarShadow.setTexture(currentScene +'girl2_shadow').setPosition(posShadowGirl2.x, posShadowGirl2.y);
  }
  else{
    avatarShadow.setTexture(currentScene +'girl_shadow').setPosition(posShadowGirl.x, posShadowGirl.y);
  }
}

function getHeadPosition()
{
  if(currAvatarIsBoy === 'true' || currAvatarIsBoy === 'boy2'){
    return posBoyHead;
  }else{
    return posGirlHead;
  }
}

function getBodyPosition()
{
  if(currAvatarIsBoy === 'true' || currAvatarIsBoy === 'boy2'){
    return posBoyBody;
  }else{
    return posGirlBody;
  }
}

function getHeadName(){
  if (currHairColor === 'brown') {
    if(currAvatarIsBoy === 'true'){
      return currentScene + boyHeadNames.brown;
    }
    else if(currAvatarIsBoy === 'boy2'){
      return currentScene + boy2HeadNames.brown;
    }
    else if(currAvatarIsBoy === 'girl2'){
      return currentScene + girl2HeadNames.brown;
    }
    else if(currAvatarIsBoy === 'false'){
      return currentScene +  girlHeadNames.brown;
    }
  } else
  if (currHairColor === 'yellow') {
    if(currAvatarIsBoy === 'true'){
      return currentScene + boyHeadNames.yellow;
    }
    else if(currAvatarIsBoy === 'boy2'){
      return currentScene + boy2HeadNames.yellow;
    }
    else if(currAvatarIsBoy === 'girl2'){
      return currentScene + girl2HeadNames.yellow;
    }
    else if(currAvatarIsBoy === 'false'){
      return currentScene +  girlHeadNames.yellow;
    }
  } else
  if (currHairColor === 'black') {
    if(currAvatarIsBoy === 'true'){
      return currentScene + boyHeadNames.black;
    }
    else if(currAvatarIsBoy === 'boy2'){
      return currentScene + boy2HeadNames.black;
    }
    else if(currAvatarIsBoy === 'girl2'){
      return currentScene + girl2HeadNames.black;
    }
    else if(currAvatarIsBoy === 'false'){
      return currentScene +  girlHeadNames.black;
    }
  }else{
    return '';
  }
}

function getClothName() {
  if (currClothColor === 'red') {
    if(currAvatarIsBoy === 'true' || currAvatarIsBoy === 'boy2'){
      return currentScene + boyBodyNames.red;
    }else{
      return currentScene +  girlBodyNames.red;
    }
  } else
  if (currClothColor === 'green') {
    if(currAvatarIsBoy === 'true' || currAvatarIsBoy === 'boy2'){
      return currentScene + boyBodyNames.green;
    }else{
      return currentScene +  girlBodyNames.green;
    }
  } else
  if (currClothColor === 'blue') {
    if(currAvatarIsBoy === 'true' || currAvatarIsBoy === 'boy2'){
      return currentScene + boyBodyNames.blue;
    }else{
      return currentScene +  girlBodyNames.blue;
    }
  } else
  if (currClothColor === 'navy') {
    if(currAvatarIsBoy === 'true' || currAvatarIsBoy === 'boy2'){
      return currentScene + boyBodyNames.navy;
    }else{
      return currentScene +  girlBodyNames.navy;
    }
  } else
  if (currClothColor === 'purple') {
    if(currAvatarIsBoy === 'true' || currAvatarIsBoy === 'boy2'){
      return currentScene + boyBodyNames.purple;
    }else{
      return currentScene +  girlBodyNames.purple;
    }
  }else{
    return '';
  }

}


function resetClothButtons(){
  btnClothRed.setTexture(currentScene + btnClothColorNames.red);
  btnClothGreen.setTexture(currentScene + btnClothColorNames.green);
  btnClothBlue.setTexture(currentScene + btnClothColorNames.blue);
  btnClothNavy.setTexture(currentScene + btnClothColorNames.navy);
  btnClothPurple.setTexture(currentScene + btnClothColorNames.purple);
}

function resetHairButtons(){
  btnHairBlack.setTexture(currentScene + btnHairColorNames.black);
  btnHairBrown.setTexture(currentScene + btnHairColorNames.brown);
  btnHairYellow.setTexture(currentScene + btnHairColorNames.yellow);
}

//#region create images

function createClothColorButtons() 
{
  btnClothRed = _this.add.image(posBtnClothRed.x, posBtnClothRed.y, currentScene + btnClothColorNames.red+'_checked').setInteractive();
  btnClothRed.on('pointerdown',
    function () {
      resetClothButtons();
      btnClothRed.setTexture(currentScene + btnClothColorNames.red+'_checked');
      currClothColor = 'red';
      setAvatar();
    }
  );

  btnClothGreen = _this.add.image(posBtnClothGreen.x, posBtnClothGreen.y, currentScene + btnClothColorNames.green).setInteractive();
  btnClothGreen.on('pointerdown',
    function () {
      resetClothButtons();
      btnClothGreen.setTexture(currentScene + btnClothColorNames.green+'_checked');
      currClothColor = 'green';
      setAvatar();
    }
  );

  btnClothBlue = _this.add.image(posBtnClothBlue.x, posBtnClothBlue.y, currentScene + btnClothColorNames.blue).setInteractive();
  btnClothBlue.on('pointerdown',
    function () {
      resetClothButtons();
      btnClothBlue.setTexture(currentScene + btnClothColorNames.blue+'_checked');
      currClothColor = 'blue';
      setAvatar();
    }
  );

  btnClothNavy = _this.add.image(posBtnClothNavy.x, posBtnClothNavy.y, currentScene + btnClothColorNames.navy).setInteractive();
  btnClothNavy.on('pointerdown',
    function () {
      resetClothButtons();
      btnClothNavy.setTexture(currentScene + btnClothColorNames.navy+'_checked');
      currClothColor = 'navy';
      setAvatar();
    }
  );

  btnClothPurple = _this.add.image(posBtnClothPurple.x, posBtnClothPurple.y, currentScene + btnClothColorNames.purple).setInteractive();
  btnClothPurple.on('pointerdown',
    function () {
      resetClothButtons();
      btnClothPurple.setTexture(currentScene + btnClothColorNames.purple+'_checked');
      currClothColor = 'purple';
      setAvatar();
    }
  );

}

function createHairColorButtons() 
{
  btnHairBlack = _this.add.image(posBtnHairBlack.x, posBtnHairBlack.y, currentScene + btnHairColorNames.black+'_checked').setInteractive();
  btnHairBlack.on('pointerdown',
    function () {
      resetHairButtons();
      btnHairBlack.setTexture(currentScene + btnHairColorNames.black+'_checked');
      currHairColor = 'black';
      setAvatar();
    }
  );

  btnHairBrown = _this.add.image(posBtnHairBrown.x, posBtnHairBrown.y, currentScene + btnHairColorNames.brown).setInteractive();
  btnHairBrown.on('pointerdown',
    function () {
      resetHairButtons();
      btnHairBrown.setTexture(currentScene + btnHairColorNames.brown+'_checked');
      currHairColor = 'brown';
      setAvatar();
    }
  );

  btnHairYellow = _this.add.image(posBtnHairYellow.x, posBtnHairYellow.y, currentScene + btnHairColorNames.yellow).setInteractive();
  btnHairYellow.on('pointerdown',
    function () {
      resetHairButtons();
      btnHairYellow.setTexture(currentScene + btnHairColorNames.yellow+'_checked');
      currHairColor = 'yellow';
      setAvatar();
    }
  );

}

function createAvatarButtons() 
{
  btnBoy = _this.add.image(posBtnBoy.x, posBtnBoy.y, currentScene + 'boy_button_on').setInteractive();
  btnBoy.on('pointerdown',
    function () {
      btnGirl.setTexture(currentScene +'girl_button_off');
      btnBoy.setTexture(currentScene +'boy_button_on');
      btnGirl2.setTexture(currentScene +'girl2_button_off');
      btnBoy2.setTexture(currentScene +'boy2_button_off');
      currAvatarIsBoy = 'true';
      setAvatar();
    }
  );

  btnGirl = _this.add.image(posBtnGirl.x, posBtnGirl.y, currentScene + 'girl_button_off').setInteractive();
  btnGirl.on('pointerdown',
    function () {
      btnBoy.setTexture(currentScene +'boy_button_off');
      btnGirl.setTexture(currentScene +'girl_button_on');
      btnGirl2.setTexture(currentScene +'girl2_button_off');
      btnBoy2.setTexture(currentScene +'boy2_button_off');
      currAvatarIsBoy = 'false';
      setAvatar();
    }
  );

  btnBoy2 = _this.add.image(posBtnBoy2.x, posBtnBoy2.y, currentScene + 'boy2_button_off').setInteractive();
  btnBoy2.on('pointerdown',
    function () {
      btnBoy2.setTexture(currentScene +'boy2_button_on');
      btnGirl.setTexture(currentScene +'girl_button_off');
      btnBoy.setTexture(currentScene +'boy_button_off');
      btnGirl2.setTexture(currentScene +'girl2_button_off');
      currAvatarIsBoy = 'boy2';
      setAvatar();
    }
  );

  btnGirl2 = _this.add.image(posBtnGirl2.x, posBtnGirl2.y, currentScene + 'girl2_button_off').setInteractive();
  btnGirl2.on('pointerdown',
    function () {
      btnGirl2.setTexture(currentScene +'girl2_button_on');
      btnBoy.setTexture(currentScene +'boy_button_off');
      btnBoy2.setTexture(currentScene +'boy2_button_off');
      btnGirl.setTexture(currentScene +'girl_button_off');
      currAvatarIsBoy = 'girl2';
      setAvatar();
    }
  );
}



//#endregion

//#region load images

function loadImagesPlayerScene()
{
    //load image button for newPlayer - oldPlayer
  _this.load.image(currentScene + 'draftButton', imagesFolder + 'login/' + 'emptyButton' + '.png');

  //load avatar buttons
  _this.load.image(currentScene + 'boy_button_on', getSceneImagesFolder() + 'boy_button_on' + '.png');
  _this.load.image(currentScene + 'boy_button_off', getSceneImagesFolder() + 'boy_button_off' + '.png');
  _this.load.image(currentScene + 'girl_button_on', getSceneImagesFolder() + 'girl_button_on' + '.png');
  _this.load.image(currentScene + 'girl_button_off', getSceneImagesFolder() + 'girl_button_off' + '.png');
  _this.load.image(currentScene + 'boy2_button_on', getSceneImagesFolder() + 'boy2_button_on' + '.png');
  _this.load.image(currentScene + 'boy2_button_off', getSceneImagesFolder() + 'boy2_button_off' + '.png');
  _this.load.image(currentScene + 'girl2_button_on', getSceneImagesFolder() + 'girl2_button_on' + '.png');
  _this.load.image(currentScene + 'girl2_button_off', getSceneImagesFolder() + 'girl2_button_off' + '.png');

  //load cloth color buttons
  _this.load.image(currentScene + btnClothColorNames.red, getSceneImagesFolder() + btnClothColorNames.red + '.png');
  _this.load.image(currentScene + btnClothColorNames.green, getSceneImagesFolder() + btnClothColorNames.green + '.png');
  _this.load.image(currentScene + btnClothColorNames.blue, getSceneImagesFolder() + btnClothColorNames.blue + '.png');
  _this.load.image(currentScene + btnClothColorNames.navy, getSceneImagesFolder() + btnClothColorNames.navy + '.png');
  _this.load.image(currentScene + btnClothColorNames.purple, getSceneImagesFolder() + btnClothColorNames.purple + '.png');

  //load cloth color checked buttons
  _this.load.image(currentScene + btnClothColorNames.red+'_checked', getSceneImagesFolder() + btnClothColorNames.red + '_checked.png');
  _this.load.image(currentScene + btnClothColorNames.green+'_checked', getSceneImagesFolder() + btnClothColorNames.green + '_checked.png');
  _this.load.image(currentScene + btnClothColorNames.blue+'_checked', getSceneImagesFolder() + btnClothColorNames.blue + '_checked.png');
  _this.load.image(currentScene + btnClothColorNames.navy+'_checked', getSceneImagesFolder() + btnClothColorNames.navy + '_checked.png');
  _this.load.image(currentScene + btnClothColorNames.purple+'_checked', getSceneImagesFolder() + btnClothColorNames.purple + '_checked.png');

  //load hair color buttons
  _this.load.image(currentScene + btnHairColorNames.brown, getSceneImagesFolder() + btnHairColorNames.brown + '.png');
  _this.load.image(currentScene + btnHairColorNames.yellow, getSceneImagesFolder() + btnHairColorNames.yellow + '.png');
  _this.load.image(currentScene + btnHairColorNames.black, getSceneImagesFolder() + btnHairColorNames.black + '.png');

  //load hair color checked buttons
  _this.load.image(currentScene + btnHairColorNames.brown+'_checked', getSceneImagesFolder() + btnHairColorNames.brown + '_checked.png');
  _this.load.image(currentScene + btnHairColorNames.yellow+'_checked', getSceneImagesFolder() + btnHairColorNames.yellow + '_checked.png');
  _this.load.image(currentScene + btnHairColorNames.black+'_checked', getSceneImagesFolder() + btnHairColorNames.black + '_checked.png');

  //load heads
  _this.load.image(currentScene + girlHeadNames.brown, getSceneImagesFolder() + girlHeadNames.brown + '.png');
  _this.load.image(currentScene + girlHeadNames.yellow, getSceneImagesFolder() + girlHeadNames.yellow + '.png');
  _this.load.image(currentScene + girlHeadNames.black, getSceneImagesFolder() + girlHeadNames.black + '.png');
  _this.load.image(currentScene + boyHeadNames.brown, getSceneImagesFolder() + boyHeadNames.brown + '.png');
  _this.load.image(currentScene + boyHeadNames.yellow, getSceneImagesFolder() + boyHeadNames.yellow + '.png');
  _this.load.image(currentScene + boyHeadNames.black, getSceneImagesFolder() + boyHeadNames.black + '.png');
  _this.load.image(currentScene + girl2HeadNames.brown, getSceneImagesFolder() + girl2HeadNames.brown + '.png');
  _this.load.image(currentScene + girl2HeadNames.yellow, getSceneImagesFolder() + girl2HeadNames.yellow + '.png');
  _this.load.image(currentScene + girl2HeadNames.black, getSceneImagesFolder() + girl2HeadNames.black + '.png');
  _this.load.image(currentScene + boy2HeadNames.brown, getSceneImagesFolder() + boy2HeadNames.brown + '.png');
  _this.load.image(currentScene + boy2HeadNames.yellow, getSceneImagesFolder() + boy2HeadNames.yellow + '.png');
  _this.load.image(currentScene + boy2HeadNames.black, getSceneImagesFolder() + boy2HeadNames.black + '.png');

  //load bodies
  _this.load.image(currentScene + girlBodyNames.red, getSceneImagesFolder() + girlBodyNames.red + '.png');
  _this.load.image(currentScene + girlBodyNames.green, getSceneImagesFolder() + girlBodyNames.green + '.png');
  _this.load.image(currentScene + girlBodyNames.blue, getSceneImagesFolder() + girlBodyNames.blue + '.png');
  _this.load.image(currentScene + girlBodyNames.navy, getSceneImagesFolder() + girlBodyNames.navy + '.png');
  _this.load.image(currentScene + girlBodyNames.purple, getSceneImagesFolder() + girlBodyNames.purple + '.png');

  _this.load.image(currentScene + boyBodyNames.red, getSceneImagesFolder() + boyBodyNames.red + '.png');
  _this.load.image(currentScene + boyBodyNames.green, getSceneImagesFolder() + boyBodyNames.green + '.png');
  _this.load.image(currentScene + boyBodyNames.blue, getSceneImagesFolder() + boyBodyNames.blue + '.png');
  _this.load.image(currentScene + boyBodyNames.navy, getSceneImagesFolder() + boyBodyNames.navy + '.png');
  _this.load.image(currentScene + boyBodyNames.purple, getSceneImagesFolder() + boyBodyNames.purple + '.png');

  //load shadows
  _this.load.image(currentScene + 'girl_shadow', getSceneImagesFolder() + 'girl_shadow' + '.png');
  _this.load.image(currentScene + 'boy_shadow', getSceneImagesFolder() + 'boy_shadow' + '.png');
  _this.load.image(currentScene + 'girl2_shadow', getSceneImagesFolder() + 'girl2_shadow' + '.png');
  _this.load.image(currentScene + 'boy2_shadow', getSceneImagesFolder() + 'boy2_shadow' + '.png');

}

//#endregion

//#region  init arrays

//function initPlayerArrays() {
var btnClothColorNames =
{
  red: 'b_clothes_01',
  green: 'b_clothes_02',
  blue: 'b_clothes_03',
  navy: 'b_clothes_04',
  purple: 'b_clothes_05'
}

var btnHairColorNames =
{
  brown: 'b_head_01',
  yellow: 'b_head_02',
  black: 'b_head_03'
}

var girlHeadNames =
{
  brown: 'girl_head_01',
  yellow: 'girl_head_02',
  black: 'girl_head_03'
}

var girl2HeadNames =
{
  brown: 'girl2_head_1',
  yellow: 'girl2_head_2',
  black: 'girl2_head_3'
}

var boyHeadNames =
{
  brown: 'boy_head_01',
  yellow: 'boy_head_02',
  black: 'boy_head_03'
}

var boy2HeadNames =
{
  brown: 'boy2_head_1',
  yellow: 'boy2_head_2',
  black: 'boy2_head_3'
}

var girlBodyNames =
{
  red: 'girl_clothes_01',
  green: 'girl_clothes_02',
  blue: 'girl_clothes_03',
  navy: 'girl_clothes_04',
  purple: 'girl_clothes_05'
}

var boyBodyNames =
{
  red: 'boy_clothes_01',
  green: 'boy_clothes_02',
  blue: 'boy_clothes_03',
  navy: 'boy_clothes_04',
  purple: 'boy_clothes_05'
}



function initPlayerArrays() {
  // posBtnCloth = [red = { x: 334, y: 589 }, green = { x: 485, y: 589 }, blue = { x: 652, y: 589 }, navy = { x: 822, y: 589 }, purple = { x: 982, y: 589 }];
  // posBtnHair = [brown = { x: 486, y: 856 }, yellow = { x: 651, y: 856 }, black = { x: 823, y: 856 }];
  // posGirl = [body = { x: 1568, y: 849 }, head = { x: 1552, y: 655 }];
  // posBoy = [body = { x: 1530, y: 848 }, head = { x: 1544, y: 607 }];

  posBtnClothRed = { x: 334, y: 589 };
  posBtnClothGreen = { x: 485, y: 589 };
  posBtnClothBlue = { x: 652, y: 589 };
  posBtnClothNavy = { x: 822, y: 589 };
  posBtnClothPurple = { x: 982, y: 589 };

  posBtnHairBrown = { x: 486, y: 856 };
  posBtnHairYellow = { x: 651, y: 856 };
  posBtnHairBlack = { x: 823, y: 856 };

  posGirlHead = { x: 1552, y: 655 };
  posGirlBody = { x: 1568, y: 849 };

  posBoyBody = { x: 1530, y: 848 };
  posBoyHead = { x: 1544, y: 607 };

}




//#endregion


//#region GLOBAL

//var currHairColor = 'black', currClothColor = 'red', currAvatarIsBoy = true;
function globalLoadCurrentAvatar(){
  //load head
  _this.load.image('globalhead' + playerId, imagesFolder + 'player/' + getHeadFileName()+'.png');
  _this.load.image('globalbody' + playerId, imagesFolder + 'player/' + getClothFileName()+'.png');
}

function getHeadFileName(){

  if (avatarGlobal[0][0] === 'true') {
    currAvatarIsBoy = 'true';
  }
  else if(avatarGlobal[0][0]  === 'boy2'){
    currAvatarIsBoy = 'boy2';
  }
  else if(avatarGlobal[0][0]  === 'girl2'){
    currAvatarIsBoy = 'girl2';
  }
  else {
    currAvatarIsBoy = 'false';
  }
  currHairColor = avatarGlobal[0][1];
  currClothColor = avatarGlobal[0][2];

  if (currHairColor === 'brown') {
    if(currAvatarIsBoy === 'true'){
      return boyHeadNames.brown;
    }
    else if(currAvatarIsBoy === 'boy2'){
      return boy2HeadNames.brown;
    }
    else if(currAvatarIsBoy === 'girl2'){
      return girl2HeadNames.brown;
    }
    else if(currAvatarIsBoy === 'false'){
      return  girlHeadNames.brown;
    }
  } 
  else
  if (currHairColor === 'yellow') {
    if(currAvatarIsBoy === 'true'){
      return boyHeadNames.yellow;
    }
    else if(currAvatarIsBoy === 'boy2'){
      return boy2HeadNames.yellow;
    }
    else if(currAvatarIsBoy === 'girl2'){
      return girl2HeadNames.yellow;
    }
    else if(currAvatarIsBoy === 'false'){
      return  girlHeadNames.yellow;
    }
  } 
  else
  if (currHairColor === 'black') {
    if(currAvatarIsBoy === 'true'){
      return boyHeadNames.black;
    }
    else if(currAvatarIsBoy === 'boy2'){
      return boy2HeadNames.black;
    }
    else if(currAvatarIsBoy === 'girl2'){
      return girl2HeadNames.black;
    }
    else if(currAvatarIsBoy === 'false'){
      return  girlHeadNames.black;
    }
  }
  else{
    if(currAvatarIsBoy === 'true'){
      return boyHeadNames.black;
    }
    else if(currAvatarIsBoy === 'boy2'){
      return boy2HeadNames.black;
    }
    else if(currAvatarIsBoy === 'girl2'){
      return girl2HeadNames.black;
    }
    else if(currAvatarIsBoy === 'false'){
      return  girlHeadNames.black;
    }
  }
}

function getClothFileName() {
  if (currClothColor === 'red') {
    if(currAvatarIsBoy === 'true' || currAvatarIsBoy === 'boy2'){
      return boyBodyNames.red;
    }else{
      return girlBodyNames.red;
    }
  } else
  if (currClothColor === 'green') {
    if(currAvatarIsBoy === 'true' || currAvatarIsBoy === 'boy2'){
      return boyBodyNames.green;
    }else{
      return girlBodyNames.green;
    }
  } else
  if (currClothColor === 'blue') {
    if(currAvatarIsBoy === 'true' || currAvatarIsBoy === 'boy2'){
      return boyBodyNames.blue;
    }else{
      return girlBodyNames.blue;
    }
  } else
  if (currClothColor === 'navy') {
    if(currAvatarIsBoy === 'true' || currAvatarIsBoy === 'boy2'){
      return boyBodyNames.navy;
    }else{
      return girlBodyNames.navy;
    }
  } else
  if (currClothColor === 'purple') {
    if(currAvatarIsBoy === 'true' || currAvatarIsBoy === 'boy2'){
      return boyBodyNames.purple;
    }else{
      return girlBodyNames.purple;
    }
  }else{
    if(currAvatarIsBoy === 'true' || currAvatarIsBoy === 'boy2'){
      return boyBodyNames.purple;
    }else{
      return girlBodyNames.purple;
    }
  }

}


function leaderLoadPlayerAvatar(username, boy, headColor, bodyColor) {
  _this.load.image(username + 'leaderhead', imagesFolder + 'player/' + getLeaderHeadFileName(boy, headColor) + '.png');
  _this.load.image(username + 'leaderbody', imagesFolder + 'player/' + getLeaderClothFileName(boy, bodyColor) + '.png');
  
  if (boy === 'true') {
    _this.load.image(username + 'leaderShadow', imagesFolder + 'player/' + 'boy_shadow' + '.png');
  } 
  else if (boy === 'boy2') {
    _this.load.image(username + 'leaderShadow', imagesFolder + 'player/' + 'boy2_shadow' + '.png');
  } 
  else if (boy === 'girl2') {
    _this.load.image(username + 'leaderShadow', imagesFolder + 'player/' + 'girl2_shadow' + '.png');
  } 
  else {
    _this.load.image(username + 'leaderShadow', imagesFolder + 'player/' + 'girl_shadow' + '.png');
  }
}

function getLeaderHeadFileName(boy, color) {
  if (color === 'brown') {
    if (boy === 'true') {
      return boyHeadNames.brown;
    } 
    else if(boy === 'boy2'){
      return boy2HeadNames.brown;
    }
    else if(boy === 'girl2'){
      return girl2HeadNames.brown;
    }
    else if(boy === 'false'){
      return  girlHeadNames.brown;
    }
  } 
  else if (color === 'yellow') {
    if (boy === 'true') {
      return boyHeadNames.yellow;
    } 
    else if(boy === 'boy2'){
      return boy2HeadNames.yellow;
    }
    else if(boy === 'girl2'){
      return girl2HeadNames.yellow;
    }
    else if(boy === 'false'){
      return  girlHeadNames.yellow;
    }
  }
  else if (color === 'black') {
    if (boy === 'true') {
      return boyHeadNames.black;
    } 
    else if(boy === 'boy2'){
      return boy2HeadNames.black;
    }
    else if(boy === 'girl2'){
      return girl2HeadNames.black;
    }
    else if(boy === 'false'){
      return  girlHeadNames.black;
    }
  }
  else {
    if (boy === 'true') {
      return boyHeadNames.black;
    } 
    else if(boy === 'boy2'){
      return boy2HeadNames.black;
    }
    else if(boy === 'girl2'){
      return girl2HeadNames.black;
    }
    else if(boy === 'false'){
      return  girlHeadNames.black;
    }
  }
}

function getLeaderClothFileName(boy, color) {
  if (color === 'red') {
    if(boy === 'true' || boy === 'boy2'){
      return boyBodyNames.red;
    }else{
      return girlBodyNames.red;
    }
  } else
  if (color === 'green') {
    if(boy === 'true' || boy === 'boy2'){
      return boyBodyNames.green;
    }else{
      return girlBodyNames.green;
    }
  } else
  if (color === 'blue') {
    if(boy === 'true' || boy === 'boy2'){
      return boyBodyNames.blue;
    }else{
      return girlBodyNames.blue;
    }
  } else
  if (color === 'navy') {
    if(boy === 'true' || boy === 'boy2'){
      return boyBodyNames.navy;
    }else{
      return girlBodyNames.navy;
    }
  } else
  if (color === 'purple') {
    if(boy === 'true' || boy === 'boy2'){
      return boyBodyNames.purple;
    }else{
      return girlBodyNames.purple;
    }
  }else{
    if(boy === 'true' || boy === 'boy2'){
      return boyBodyNames.purple;
    }else{
      return girlBodyNames.purple;
    }
  }

}

//#endregion