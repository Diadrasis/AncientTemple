

//focus effects and check areas for words


//######## 1η επιγραφή - 1ο κείμενο  #######################################################################################################

//words
var word_ieron = {rockPosX:852, rockPosY:365, rockSizeX:159, rockSizeY:36, textPosX:1503, textPosY:440, textSizeX:67, textSizeY:28};
var word_kallikratis1 = {rockPosX:645, rockPosY:412, rockSizeX:372, rockSizeY:43, textPosX:1738, textPosY:377, textSizeX:152, textSizeY:26};
var word_kallikratis2 = {rockPosX:400, rockPosY:681, rockSizeX:377, rockSizeY:47, textPosX:1339, textPosY:697, textSizeX:143, textSizeY:26};
var word_leonidas = {rockPosX:365, rockPosY:500, rockSizeX:303, rockSizeY:42, textPosX:1518, textPosY:472, textSizeX:121, textSizeY:27};
var word_peninta = {rockPosX:629, rockPosY:551, rockSizeX:344, rockSizeY:40, textPosX:1515, textPosY:537, textSizeX:100, textSizeY:26};

//rects
var rectRockIeron, rectTextIeron;
var rectKallikratisRock, rectKallikratisText;
var rectKallikratis2Rock, rectKallikratis2Text;
var rectPenintaRock, rectPenintaText;
var rectLeonidaRock, rectLeonidasText;

//###########################################################################################################################################


//######## 1η επιγραφή - 2ο κείμενο  ########################################################################################################

//words
var word_skeli = {rockPosX:293, rockPosY:590, rockSizeX:165, rockSizeY:43, textPosX:1686, textPosY:600, textSizeX:69, textSizeY:27};
var word_thyros = {rockPosX:1029, rockPosY:368, rockSizeX:177, rockSizeY:40, textPosX:1361, textPosY:441, textSizeX:84, textSizeY:30};
var word_syggrapsei = {rockPosX:1017, rockPosY:415, rockSizeX:289, rockSizeY:40, textPosX:1374, textPosY:408, textSizeX:130, textSizeY:28};
var word_prytanis = {rockPosX:697, rockPosY:504, rockSizeX:350, rockSizeY:40, textPosX:1336, textPosY:473, textSizeX:138, textSizeY:28};
var word_draxmes = {rockPosX:924, rockPosY:552, rockSizeX:239, rockSizeY:40, textPosX:1622, textPosY:536, textSizeX:102, textSizeY:26};
var word_dermata = {rockPosX:679, rockPosY:595, rockSizeX:242, rockSizeY:38, textPosX:1531, textPosY:600, textSizeX:100, textSizeY:27};
var word_oikodomes = {rockPosX:714, rockPosY:642, rockSizeX:310, rockSizeY:44, textPosX:1741, textPosY:633, textSizeX:145, textSizeY:28};
var word_lithinos = {rockPosX:366, rockPosY:726, rockSizeX:243, rockSizeY:41, textPosX:1311, textPosY:663, textSizeX:88, textSizeY:25};

//rects
var rectRockSkeli, rectTextSkeli;
var rectRockThyros, rectTextThyros;
var rectRockSyggrapsei, rectTextSyggrapsei;
var rectRockPrytanis, rectTextPrytanis;
var rectRockDraxmes, rectTextDraxmes;
var rectRockDermata, rectTextDermata;
var rectRockOikodomes, rectTextOikodomes;
var rectRockLithinos, rectTextLithinos;

//###########################################################################################################################################


function StartSign1()
{
  DebugLog('Start Sign 1');
  var randomArray = [0,1,2,3,4,5,6,7,8,9];

  randomArray = shuffle(randomArray);

  // for(var i=0; i<randomArray.length; i++){
  //   DebugLog(randomArray[i]);
  // }

  //DebugLog('Remainder of ' + randomArray[0] + ' is ' + randomArray[0] % 2);

  randomTextToChoose = randomArray[0] % 2;

  DebugLog('random is text '+randomTextToChoose);

  Sign1PrepareVariables();

}

function Sign1PrepareVariables(){
  isSignWordOnRockSelected = false;
  isSignWordOnTextSelected = false;
  signSelectedWord ='';
  currentWordsFound = 0;
  isTapOnRock = false;
  isTapOnText = false;
  isSignTouchActive = true;
  rectanglesSignRock = [];
  rectanglesSignText = [];

  //random choose
  Sign1Load();

}

function Sign1Load() {
  _this.load.once('complete', Sign1Create, this);

  _this.load.image(currentScene + 'sign_1', getSceneImagesFolder() + 'sign_1.png');

 // if (randomTextToChoose === 0) {
    _this.load.image(currentScene + 'text_1', getSceneImagesFolder() + 'sign_1_text.png');
 // }else{
  //  _this.load.image(currentScene + 'text_2', getSceneImagesFolder() + 'sign_1_text.png');
  //}

  _this.load.image(currentScene + 'hightlighted_sign', getSceneImagesFolder() + 'hightlighted_sign.png');

  _this.load.start();
}

function Sign1Create(){
  
  _this.add.image(936, 579, currentScene + 'sign_1').setOrigin(0.5);

  //if (randomTextToChoose === 0) {
    _this.add.image(1540, 537, currentScene + 'text_1').setOrigin(0.5);
 // } else {
 //   _this.add.image(1540, 537, currentScene + 'text_2').setOrigin(0.5);
 // }

  //highlight copy
  draftCopyRock = _this.add.image(-1000, -1000, currentScene + 'hightlighted_sign');
  draftCopyRock.setOrigin(0.5);
  draftCopyText = _this.add.image(-1000, -1000, currentScene + 'hightlighted_sign');
  draftCopyText.setOrigin(0.5);

  //if (randomTextToChoose === 0) {

    //#region  TEXT 1

    //rect buttons
    rectRockIeron = new Phaser.Geom.Rectangle(word_ieron.rockPosX, word_ieron.rockPosY, word_ieron.rockSizeX, word_ieron.rockSizeY);
    RepositionRect(rectRockIeron);

    rectTextIeron = new Phaser.Geom.Rectangle(word_ieron.textPosX, word_ieron.textPosY, word_ieron.textSizeX, word_ieron.textSizeY);
    RepositionRect(rectTextIeron);

    rectanglesSignRock.push(rectRockIeron);
    rectanglesSignText.push(rectTextIeron);

    rectKallikratisRock = new Phaser.Geom.Rectangle(word_kallikratis1.rockPosX, word_kallikratis1.rockPosY, word_kallikratis1.rockSizeX, word_kallikratis1.rockSizeY);
    RepositionRect(rectKallikratisRock);

    rectKallikratisText = new Phaser.Geom.Rectangle(word_kallikratis1.textPosX, word_kallikratis1.textPosY, word_kallikratis1.textSizeX, word_kallikratis1.textSizeY);
    RepositionRect(rectKallikratisText);

    rectanglesSignRock.push(rectKallikratisRock);
    rectanglesSignText.push(rectKallikratisText);

    rectKallikratis2Rock = new Phaser.Geom.Rectangle(word_kallikratis2.rockPosX, word_kallikratis2.rockPosY, word_kallikratis2.rockSizeX, word_kallikratis2.rockSizeY);
    RepositionRect(rectKallikratis2Rock);

    rectKallikratis2Text = new Phaser.Geom.Rectangle(word_kallikratis2.textPosX, word_kallikratis2.textPosY, word_kallikratis2.textSizeX, word_kallikratis2.textSizeY);
    RepositionRect(rectKallikratis2Text);

    rectanglesSignRock.push(rectKallikratis2Rock);
    rectanglesSignText.push(rectKallikratis2Text);

    rectPenintaRock = new Phaser.Geom.Rectangle(word_peninta.rockPosX, word_peninta.rockPosY, word_peninta.rockSizeX, word_peninta.rockSizeY);
    RepositionRect(rectPenintaRock);

    rectPenintaText = new Phaser.Geom.Rectangle(word_peninta.textPosX, word_peninta.textPosY, word_peninta.textSizeX, word_peninta.textSizeY);
    RepositionRect(rectPenintaText);

    rectanglesSignRock.push(rectPenintaRock);
    rectanglesSignText.push(rectPenintaText);

    rectLeonidaRock = new Phaser.Geom.Rectangle(word_leonidas.rockPosX, word_leonidas.rockPosY, word_leonidas.rockSizeX, word_leonidas.rockSizeY);
    RepositionRect(rectLeonidaRock);

    rectLeonidasText = new Phaser.Geom.Rectangle(word_leonidas.textPosX, word_leonidas.textPosY, word_leonidas.textSizeX, word_leonidas.textSizeY);
    RepositionRect(rectLeonidasText);

    rectanglesSignRock.push(rectLeonidaRock);
    rectanglesSignText.push(rectLeonidasText);

    //#endregion

 // }
 // else
 // {

    rectRockSkeli = new Phaser.Geom.Rectangle(word_skeli.rockPosX, word_skeli.rockPosY, word_skeli.rockSizeX, word_skeli.rockSizeY);
    RepositionRect(rectRockSkeli);

    rectTextSkeli = new Phaser.Geom.Rectangle(word_skeli.textPosX, word_skeli.textPosY, word_skeli.textSizeX, word_skeli.textSizeY);
    RepositionRect(rectTextSkeli);

    rectanglesSignRock.push(rectRockSkeli);
    rectanglesSignText.push(rectTextSkeli);

    rectRockThyros = new Phaser.Geom.Rectangle(word_thyros.rockPosX, word_thyros.rockPosY, word_thyros.rockSizeX, word_thyros.rockSizeY);
    RepositionRect(rectRockThyros);

    rectTextThyros = new Phaser.Geom.Rectangle(word_thyros.textPosX, word_thyros.textPosY, word_thyros.textSizeX, word_thyros.textSizeY);
    RepositionRect(rectTextThyros);

    rectanglesSignRock.push(rectRockThyros);
    rectanglesSignText.push(rectTextThyros);

    rectRockSyggrapsei = new Phaser.Geom.Rectangle(word_syggrapsei.rockPosX, word_syggrapsei.rockPosY, word_syggrapsei.rockSizeX, word_syggrapsei.rockSizeY);
    RepositionRect(rectRockSyggrapsei);

    rectTextSyggrapsei = new Phaser.Geom.Rectangle(word_syggrapsei.textPosX, word_syggrapsei.textPosY, word_syggrapsei.textSizeX, word_syggrapsei.textSizeY);
    RepositionRect(rectTextSyggrapsei);

    rectanglesSignRock.push(rectRockSyggrapsei);
    rectanglesSignText.push(rectTextSyggrapsei);

    rectRockPrytanis = new Phaser.Geom.Rectangle(word_prytanis.rockPosX, word_prytanis.rockPosY, word_prytanis.rockSizeX, word_prytanis.rockSizeY);
    RepositionRect(rectRockPrytanis);

    rectTextPrytanis = new Phaser.Geom.Rectangle(word_prytanis.textPosX, word_prytanis.textPosY, word_prytanis.textSizeX, word_prytanis.textSizeY);
    RepositionRect(rectTextPrytanis);

    rectanglesSignRock.push(rectRockPrytanis);
    rectanglesSignText.push(rectTextPrytanis);

    rectRockDraxmes = new Phaser.Geom.Rectangle(word_draxmes.rockPosX, word_draxmes.rockPosY, word_draxmes.rockSizeX, word_draxmes.rockSizeY);
    RepositionRect(rectRockDraxmes);

    rectTextDraxmes = new Phaser.Geom.Rectangle(word_draxmes.textPosX, word_draxmes.textPosY, word_draxmes.textSizeX, word_draxmes.textSizeY);
    RepositionRect(rectTextDraxmes);

    rectanglesSignRock.push(rectRockDraxmes);
    rectanglesSignText.push(rectTextDraxmes);

    rectRockDermata = new Phaser.Geom.Rectangle(word_dermata.rockPosX, word_dermata.rockPosY, word_dermata.rockSizeX, word_dermata.rockSizeY);
    RepositionRect(rectRockDermata);

    rectTextDermata = new Phaser.Geom.Rectangle(word_dermata.textPosX, word_dermata.textPosY, word_dermata.textSizeX, word_dermata.textSizeY);
    RepositionRect(rectTextDermata);

    rectanglesSignRock.push(rectRockDermata);
    rectanglesSignText.push(rectTextDermata);

    rectRockOikodomes = new Phaser.Geom.Rectangle(word_oikodomes.rockPosX, word_oikodomes.rockPosY, word_oikodomes.rockSizeX, word_oikodomes.rockSizeY);
    RepositionRect(rectRockOikodomes);

    rectTextOikodomes = new Phaser.Geom.Rectangle(word_oikodomes.textPosX, word_oikodomes.textPosY, word_oikodomes.textSizeX, word_oikodomes.textSizeY);
    RepositionRect(rectTextOikodomes);

    rectanglesSignRock.push(rectRockOikodomes);
    rectanglesSignText.push(rectTextOikodomes);

    rectRockLithinos = new Phaser.Geom.Rectangle(word_lithinos.rockPosX, word_lithinos.rockPosY, word_lithinos.rockSizeX, word_lithinos.rockSizeY);
    RepositionRect(rectRockLithinos);

    rectTextLithinos = new Phaser.Geom.Rectangle(word_lithinos.textPosX, word_lithinos.textPosY, word_lithinos.textSizeX, word_lithinos.textSizeY);
    RepositionRect(rectTextLithinos);

    rectanglesSignRock.push(rectRockLithinos);
    rectanglesSignText.push(rectTextLithinos);

 // }

  //Mouse
  rectMouse = new Phaser.Geom.Rectangle(0, 0, 0.5, 0.5);

  if(inDevelopmentState){
   graphics = _this.add.graphics();   
  }

  _this.input.on('pointermove', function (pointer) {

    Phaser.Geom.Rectangle.CenterOn(rectMouse, pointer.x, pointer.y);

    if(inDevelopmentState){
      //if (randomTextToChoose === 0) {
        graphics.clear();
        graphics.lineStyle(1, 0x00ff00);
        graphics.strokeRectShape(rectMouse);
        graphics.strokeRectShape(rectRockIeron);
        graphics.strokeRectShape(rectTextIeron);
        graphics.strokeRectShape(rectKallikratisRock);
        graphics.strokeRectShape(rectKallikratisText);
        graphics.strokeRectShape(rectPenintaRock);
        graphics.strokeRectShape(rectPenintaText);
        graphics.strokeRectShape(rectKallikratis2Rock);
        graphics.strokeRectShape(rectKallikratis2Text);
        graphics.strokeRectShape(rectLeonidaRock);
        graphics.strokeRectShape(rectLeonidasText);
     // }else{
        graphics.clear();
        graphics.lineStyle(1, 0x00ff00);
        graphics.strokeRectShape(rectMouse);
        graphics.strokeRectShape(rectRockSkeli);
        graphics.strokeRectShape(rectTextSkeli);
        graphics.strokeRectShape(rectRockThyros);
        graphics.strokeRectShape(rectTextThyros);
        graphics.strokeRectShape(rectRockSyggrapsei);
        graphics.strokeRectShape(rectTextSyggrapsei);
        graphics.strokeRectShape(rectRockPrytanis);
        graphics.strokeRectShape(rectTextPrytanis);
        graphics.strokeRectShape(rectRockDraxmes);
        graphics.strokeRectShape(rectTextDraxmes);
        graphics.strokeRectShape(rectRockDermata);
        graphics.strokeRectShape(rectTextDermata);
        graphics.strokeRectShape(rectRockOikodomes);
        graphics.strokeRectShape(rectTextOikodomes);
        graphics.strokeRectShape(rectRockLithinos);
        graphics.strokeRectShape(rectTextLithinos);
      //}
    }

  });

  _this.input.on('pointerdown', function (pointer) {

    if(pointer.x<100){return;}

    if(isSignTouchActive === false || isGameOver || isGamePaused){return;}

    if(IsOnSignRock1())
    {
      if(signSelectedWord === textSelectedWord){
        DebugLog("found "+signSelectedWord);
        //create draft focus for rock and text
        Sign1CreateDraft(signSelectedWord);
        return;
      }else{
        if(textSelectedWord != ''){
          isSignTouchActive = false;
          MoveObject({x:pointer.x, y:pointer.y}, wrongSignIcon);
          _this.time.delayedCall(1000, SignHideWrongIcon, [], this);
         DebugLog("words dont match!!");
         RemoveTime();
          return;
        }
      }
      DebugLog("On rock tap word "+signSelectedWord);
      DebugLog("...waiting for text word match...");
      return;
    }else
    if(IsOnSignText1())
    {
      if(signSelectedWord === textSelectedWord){
        DebugLog("found "+signSelectedWord);
        //create draft focus for rock and text
        Sign1CreateDraft(textSelectedWord);
        return;
      }else{
        if(signSelectedWord != ''){
          isSignTouchActive = false;
          MoveObject({x:pointer.x, y:pointer.y}, wrongSignIcon);
          _this.time.delayedCall(1000, SignHideWrongIcon, [], this);
          DebugLog("words dont match!!");
          RemoveTime();
          return;
        }
      }
      DebugLog("On text tap word "+textSelectedWord);
      DebugLog("...waiting for rock word match...");
      return;
    }

    console.log("word not found..");

    isSignTouchActive = false;

    MoveObject({ x: pointer.x, y: pointer.y }, wrongSignIcon);

    _this.time.delayedCall(250, SignHideWrongIcon, [], this);
    
    RemoveTime();

    resetLightsSign1();

  });

}

function SignHideWrongIcon(){
  isSignTouchActive = true;
  wrongSignIcon.visible = false;
  resetLightsSign1();
}

function Sign1CreateDraft(word){

  showCorrectEffort(currentWordsFound);

  currentWordsFound ++;

  checkMatchSign();

 // if (randomTextToChoose === 0) {

    if (word === 'ieron') {
      //destroy copies to use in another word
      resetLightsSign1();
      //hide clickable areas
      rectRockIeron.setEmpty();
      rectTextIeron.setEmpty();
      //create draft for rock
      MakeMatchHighLight({ x: word_ieron.rockPosX, y: word_ieron.rockPosY }, { x: word_ieron.rockSizeX, y: word_ieron.rockSizeY });
      //create draft for text
      MakeMatchHighLight({ x: word_ieron.textPosX, y: word_ieron.textPosY }, { x: word_ieron.textSizeX, y: word_ieron.textSizeY });
    }
    else
      if (word === 'kallikratis') {
        //destroy copies to use in another word
        resetLightsSign1();
        //hide clickable areas
        rectKallikratisRock.setEmpty();
        rectKallikratisText.setEmpty();
        //create draft for rock
        MakeMatchHighLight({ x: word_kallikratis1.rockPosX, y: word_kallikratis1.rockPosY }, { x: word_kallikratis1.rockSizeX, y: word_kallikratis1.rockSizeY });
        //create draft for text
        MakeMatchHighLight({ x: word_kallikratis1.textPosX, y: word_kallikratis1.textPosY }, { x: word_kallikratis1.textSizeX, y: word_kallikratis1.textSizeY });
      }
      else
        if (word === 'kallikratis_2') {
          //destroy copies to use in another word
          resetLightsSign1();
          //hide clickable areas
          rectKallikratis2Rock.setEmpty();
          rectKallikratis2Text.setEmpty();
          //create draft for rock
          MakeMatchHighLight({ x: word_kallikratis2.rockPosX, y: word_kallikratis2.rockPosY }, { x: word_kallikratis2.rockSizeX, y: word_kallikratis2.rockSizeY });
          //create draft for text
          MakeMatchHighLight({ x: word_kallikratis2.textPosX, y: word_kallikratis2.textPosY }, { x: word_kallikratis2.textSizeX, y: word_kallikratis2.textSizeY });
        }
        else
          if (word === 'peninta') {
            //destroy copies to use in another word
            resetLightsSign1();
            //hide clickable areas
            rectPenintaRock.setEmpty();
            rectPenintaText.setEmpty();
            //create draft for rock
            MakeMatchHighLight({ x: word_peninta.rockPosX, y: word_peninta.rockPosY }, { x: word_peninta.rockSizeX, y: word_peninta.rockSizeY });
            //create draft for text
            MakeMatchHighLight({ x: word_peninta.textPosX, y: word_peninta.textPosY }, { x: word_peninta.textSizeX, y: word_peninta.textSizeY });
          }
          else
            if (word === 'leonidas') {
              //destroy copies to use in another word
              resetLightsSign1();
              //hide clickable areas
              rectLeonidaRock.setEmpty();
              rectLeonidasText.setEmpty();
              //create draft for rock
              MakeMatchHighLight({ x: word_leonidas.rockPosX, y: word_leonidas.rockPosY }, { x: word_leonidas.rockSizeX, y: word_leonidas.rockSizeY });
              //create draft for text
              MakeMatchHighLight({ x: word_leonidas.textPosX, y: word_leonidas.textPosY }, { x: word_leonidas.textSizeX, y: word_leonidas.textSizeY });
            }

 // }
 // else{

    if (word === 'skeli') {
      //destroy copies to use in another word
      resetLightsSign1();
      //hide clickable areas
      rectRockSkeli.setEmpty();
      rectTextSkeli.setEmpty();
      //create draft for rock
      MakeMatchHighLight({ x: word_skeli.rockPosX, y: word_skeli.rockPosY }, { x: word_skeli.rockSizeX, y: word_skeli.rockSizeY });
      //create draft for text
      MakeMatchHighLight({ x: word_skeli.textPosX, y: word_skeli.textPosY }, { x: word_skeli.textSizeX, y: word_skeli.textSizeY });
    }
    else if (word === 'thyros') {
      //destroy copies to use in another word
      resetLightsSign1();
      //hide clickable areas
      rectRockThyros.setEmpty();
      rectTextThyros.setEmpty();
      //create draft for rock
      MakeMatchHighLight({ x: word_thyros.rockPosX, y: word_thyros.rockPosY }, { x: word_thyros.rockSizeX, y: word_thyros.rockSizeY });
      //create draft for text
      MakeMatchHighLight({ x: word_thyros.textPosX, y: word_thyros.textPosY }, { x: word_thyros.textSizeX, y: word_thyros.textSizeY });
    }
    else if (word === 'syggrapsei') {
      //destroy copies to use in another word
      resetLightsSign1();
      //hide clickable areas
      rectRockSyggrapsei.setEmpty();
      rectTextSyggrapsei.setEmpty();
      //create draft for rock
      MakeMatchHighLight({ x: word_syggrapsei.rockPosX, y: word_syggrapsei.rockPosY }, { x: word_syggrapsei.rockSizeX, y: word_syggrapsei.rockSizeY });
      //create draft for text
      MakeMatchHighLight({ x: word_syggrapsei.textPosX, y: word_syggrapsei.textPosY }, { x: word_syggrapsei.textSizeX, y: word_syggrapsei.textSizeY });
    }
    else if (word === 'prytanis') {
      //destroy copies to use in another word
      resetLightsSign1();
      //hide clickable areas
      rectRockPrytanis.setEmpty();
      rectTextPrytanis.setEmpty();
      //create draft for rock
      MakeMatchHighLight({ x: word_prytanis.rockPosX, y: word_prytanis.rockPosY }, { x: word_prytanis.rockSizeX, y: word_prytanis.rockSizeY });
      //create draft for text
      MakeMatchHighLight({ x: word_prytanis.textPosX, y: word_prytanis.textPosY }, { x: word_prytanis.textSizeX, y: word_prytanis.textSizeY });
    }
    else if (word === 'draxmes') {
      //destroy copies to use in another word
      resetLightsSign1();
      //hide clickable areas
      rectRockDraxmes.setEmpty();
      rectTextDraxmes.setEmpty();
      //create draft for rock
      MakeMatchHighLight({ x: word_draxmes.rockPosX, y: word_draxmes.rockPosY }, { x: word_draxmes.rockSizeX, y: word_draxmes.rockSizeY });
      //create draft for text
      MakeMatchHighLight({ x: word_draxmes.textPosX, y: word_draxmes.textPosY }, { x: word_draxmes.textSizeX, y: word_draxmes.textSizeY });
    }
    else if (word === 'dermata') {
      //destroy copies to use in another word
      resetLightsSign1();
      //hide clickable areas
      rectRockDermata.setEmpty();
      rectTextDermata.setEmpty();
      //create draft for rock
      MakeMatchHighLight({ x: word_dermata.rockPosX, y: word_dermata.rockPosY }, { x: word_dermata.rockSizeX, y: word_dermata.rockSizeY });
      //create draft for text
      MakeMatchHighLight({ x: word_dermata.textPosX, y: word_dermata.textPosY }, { x: word_dermata.textSizeX, y: word_dermata.textSizeY });
    }
    else if (word === 'oikodomes') {
      //destroy copies to use in another word
      resetLightsSign1();
      //hide clickable areas
      rectRockOikodomes.setEmpty();
      rectTextOikodomes.setEmpty();
      //create draft for rock
      MakeMatchHighLight({ x: word_oikodomes.rockPosX, y: word_oikodomes.rockPosY }, { x: word_oikodomes.rockSizeX, y: word_oikodomes.rockSizeY });
      //create draft for text
      MakeMatchHighLight({ x: word_oikodomes.textPosX, y: word_oikodomes.textPosY }, { x: word_oikodomes.textSizeX, y: word_oikodomes.textSizeY });
    }
    else if (word === 'lithinos') {
      //destroy copies to use in another word
      resetLightsSign1();
      //hide clickable areas
      rectRockLithinos.setEmpty();
      rectTextLithinos.setEmpty();
      //create draft for rock
      MakeMatchHighLight({ x: word_lithinos.rockPosX, y: word_lithinos.rockPosY }, { x: word_lithinos.rockSizeX, y: word_lithinos.rockSizeY });
      //create draft for text
      MakeMatchHighLight({ x: word_lithinos.textPosX, y: word_lithinos.textPosY }, { x: word_lithinos.textSizeX, y: word_lithinos.textSizeY });
    }


  //}

}

function IsOnSignRock1(){
  for (var i = 0; i < rectanglesSignRock.length; i++) {

    if (Phaser.Geom.Rectangle.ContainsRect(rectanglesSignRock[i], rectMouse)) {
      DebugLog("rock word found!!");

      isTapOnText = false;
      if(isTapOnRock){ resetLightsSign1(); }else{ isTapOnRock = true; }


     // if (randomTextToChoose === 0) {

        if (rectanglesSignRock[i] === rectRockIeron) {
          //create copy 
          MoveAndResizeObject({ x: word_ieron.rockPosX, y: word_ieron.rockPosY }, { x: word_ieron.rockSizeX, y: word_ieron.rockSizeY }, draftCopyRock);
          //set looking for match word
          signSelectedWord = 'ieron';
          return true;
        }
        else if (rectanglesSignRock[i] === rectKallikratisRock) {
          MoveAndResizeObject({ x: word_kallikratis1.rockPosX, y: word_kallikratis1.rockPosY }, { x: word_kallikratis1.rockSizeX, y: word_kallikratis1.rockSizeY }, draftCopyRock);
          //set looking for match word
          signSelectedWord = 'kallikratis';
          return true;
        }
        else if (rectanglesSignRock[i] === rectKallikratis2Rock) {
          //create copy 
          MoveAndResizeObject({ x: word_kallikratis2.rockPosX, y: word_kallikratis2.rockPosY }, { x: word_kallikratis2.rockSizeX, y: word_kallikratis2.rockSizeY }, draftCopyRock);
          //set looking for match word
          signSelectedWord = 'kallikratis_2';
          return true;
        }
        else if (rectanglesSignRock[i] === rectPenintaRock) {
          //create copy 
          MoveAndResizeObject({ x: word_peninta.rockPosX, y: word_peninta.rockPosY }, { x: word_peninta.rockSizeX, y: word_peninta.rockSizeY }, draftCopyRock);
          //set looking for match word
          signSelectedWord = 'peninta';
          return true;
        }
        else if (rectanglesSignRock[i] === rectLeonidaRock) {
          //create copy 
          MoveAndResizeObject({ x: word_leonidas.rockPosX, y: word_leonidas.rockPosY }, { x: word_leonidas.rockSizeX, y: word_leonidas.rockSizeY }, draftCopyRock);
          //set looking for match word
          signSelectedWord = 'leonidas';
          return true;
        }

     // }
     // else{

        if (rectanglesSignRock[i] === rectRockSkeli) {
          //create copy 
          MoveAndResizeObject({ x: word_skeli.rockPosX, y: word_skeli.rockPosY }, { x: word_skeli.rockSizeX, y: word_skeli.rockSizeY }, draftCopyRock);
          //set looking for match word
          signSelectedWord = 'skeli';
          return true;
        }
        else if (rectanglesSignRock[i] === rectRockThyros) {
          //create copy 
          MoveAndResizeObject({ x: word_thyros.rockPosX, y: word_thyros.rockPosY }, { x: word_thyros.rockSizeX, y: word_thyros.rockSizeY }, draftCopyRock);
          //set looking for match word
          signSelectedWord = 'thyros';
          return true;
        }
        else if (rectanglesSignRock[i] === rectRockSyggrapsei) {
          //create copy 
          MoveAndResizeObject({ x: word_syggrapsei.rockPosX, y: word_syggrapsei.rockPosY }, { x: word_syggrapsei.rockSizeX, y: word_syggrapsei.rockSizeY }, draftCopyRock);
          //set looking for match word
          signSelectedWord = 'syggrapsei';
          return true;
        }
        else if (rectanglesSignRock[i] === rectRockPrytanis) {
          //create copy 
          MoveAndResizeObject({ x: word_prytanis.rockPosX, y: word_prytanis.rockPosY }, { x: word_prytanis.rockSizeX, y: word_prytanis.rockSizeY }, draftCopyRock);
          //set looking for match word
          signSelectedWord = 'prytanis';
          return true;
        }
        else if (rectanglesSignRock[i] === rectRockDraxmes) {
          //create copy 
          MoveAndResizeObject({ x: word_draxmes.rockPosX, y: word_draxmes.rockPosY }, { x: word_draxmes.rockSizeX, y: word_draxmes.rockSizeY }, draftCopyRock);
          //set looking for match word
          signSelectedWord = 'draxmes';
          return true;
        }
        else if (rectanglesSignRock[i] === rectRockDermata) {
          //create copy 
          MoveAndResizeObject({ x: word_dermata.rockPosX, y: word_dermata.rockPosY }, { x: word_dermata.rockSizeX, y: word_dermata.rockSizeY }, draftCopyRock);
          //set looking for match word
          signSelectedWord = 'dermata';
          return true;
        }
        else if (rectanglesSignRock[i] === rectRockOikodomes) {
          //create copy 
          MoveAndResizeObject({ x: word_oikodomes.rockPosX, y: word_oikodomes.rockPosY }, { x: word_oikodomes.rockSizeX, y: word_oikodomes.rockSizeY }, draftCopyRock);
          //set looking for match word
          signSelectedWord = 'oikodomes';
          return true;
        }
        else if (rectanglesSignRock[i] === rectRockLithinos) {
          //create copy 
          MoveAndResizeObject({ x: word_lithinos.rockPosX, y: word_lithinos.rockPosY }, { x: word_lithinos.rockSizeX, y: word_lithinos.rockSizeY }, draftCopyRock);
          //set looking for match word
          signSelectedWord = 'lithinos';
          return true;
        }

     // }


    }
  }

  return false;
}

function IsOnSignText1(){
  for (var i = 0; i < rectanglesSignText.length; i++) {

    if (Phaser.Geom.Rectangle.ContainsRect(rectanglesSignText[i], rectMouse)) {
      DebugLog("text word found!!");   
      
      isTapOnRock = false;
      if(isTapOnText){ resetLightsSign1(); }else{ isTapOnText = true; }

     // if (randomTextToChoose === 0) {

        if (rectanglesSignText[i] === rectTextIeron) {
          //set this object as new sprite with data
          MoveAndResizeObject({ x: word_ieron.textPosX, y: word_ieron.textPosY }, { x: word_ieron.textSizeX, y: word_ieron.textSizeY }, draftCopyText);
          //set looking for match word
          textSelectedWord = 'ieron';
          return true;
        }
        else if (rectanglesSignText[i] === rectKallikratisText) {
          //set this object as new sprite with data
          MoveAndResizeObject({ x: word_kallikratis1.textPosX, y: word_kallikratis1.textPosY }, { x: word_kallikratis1.textSizeX, y: word_kallikratis1.textSizeY }, draftCopyText);
          //set looking for match word
          textSelectedWord = 'kallikratis';
          return true;
        }
        else if (rectanglesSignText[i] === rectKallikratis2Text) {
          //set this object as new sprite with data
          MoveAndResizeObject({ x: word_kallikratis2.textPosX, y: word_kallikratis2.textPosY }, { x: word_kallikratis2.textSizeX, y: word_kallikratis2.textSizeY }, draftCopyText);
          //set looking for match word
          textSelectedWord = 'kallikratis_2';
          return true;
        }
        else if (rectanglesSignText[i] === rectPenintaText) {
          //set this object as new sprite with data
          MoveAndResizeObject({ x: word_peninta.textPosX, y: word_peninta.textPosY }, { x: word_peninta.textSizeX, y: word_peninta.textSizeY }, draftCopyText);
          //set looking for match word
          textSelectedWord = 'peninta';
          return true;
        }
        else if (rectanglesSignText[i] === rectLeonidasText) {
          //set this object as new sprite with data
          MoveAndResizeObject({ x: word_leonidas.textPosX, y: word_leonidas.textPosY }, { x: word_leonidas.textSizeX, y: word_leonidas.textSizeY }, draftCopyText);
          //set looking for match word
          textSelectedWord = 'leonidas';
          return true;
        }

     // }
     // else{

        if (rectanglesSignText[i] === rectTextSkeli) {
          //set this object as new sprite with data
          MoveAndResizeObject({ x: word_skeli.textPosX, y: word_skeli.textPosY }, { x: word_skeli.textSizeX, y: word_skeli.textSizeY }, draftCopyText);
          //set looking for match word
          textSelectedWord = 'skeli';
          return true;
        }
        else if (rectanglesSignText[i] === rectTextThyros) {
          //set this object as new sprite with data
          MoveAndResizeObject({ x: word_thyros.textPosX, y: word_thyros.textPosY }, { x: word_thyros.textSizeX, y: word_thyros.textSizeY }, draftCopyText);
          //set looking for match word
          textSelectedWord = 'thyros';
          return true;
        }
        else if (rectanglesSignText[i] === rectTextSyggrapsei) {
          //set this object as new sprite with data
          MoveAndResizeObject({ x: word_syggrapsei.textPosX, y: word_syggrapsei.textPosY }, { x: word_syggrapsei.textSizeX, y: word_syggrapsei.textSizeY }, draftCopyText);
          //set looking for match word
          textSelectedWord = 'syggrapsei';
          return true;
        }
        else if (rectanglesSignText[i] === rectTextPrytanis) {
          //set this object as new sprite with data
          MoveAndResizeObject({ x: word_prytanis.textPosX, y: word_prytanis.textPosY }, { x: word_prytanis.textSizeX, y: word_prytanis.textSizeY }, draftCopyText);
          //set looking for match word
          textSelectedWord = 'prytanis';
          return true;
        }
        else if (rectanglesSignText[i] === rectTextDraxmes) {
          //set this object as new sprite with data
          MoveAndResizeObject({ x: word_draxmes.textPosX, y: word_draxmes.textPosY }, { x: word_draxmes.textSizeX, y: word_draxmes.textSizeY }, draftCopyText);
          //set looking for match word
          textSelectedWord = 'draxmes';
          return true;
        }
        else if (rectanglesSignText[i] === rectTextDermata) {
          //set this object as new sprite with data
          MoveAndResizeObject({ x: word_dermata.textPosX, y: word_dermata.textPosY }, { x: word_dermata.textSizeX, y: word_dermata.textSizeY }, draftCopyText);
          //set looking for match word
          textSelectedWord = 'dermata';
          return true;
        }
        else if (rectanglesSignText[i] === rectTextOikodomes) {
          //set this object as new sprite with data
          MoveAndResizeObject({ x: word_oikodomes.textPosX, y: word_oikodomes.textPosY }, { x: word_oikodomes.textSizeX, y: word_oikodomes.textSizeY }, draftCopyText);
          //set looking for match word
          textSelectedWord = 'oikodomes';
          return true;
        }
        else if (rectanglesSignText[i] === rectTextLithinos) {
          //set this object as new sprite with data
          MoveAndResizeObject({ x: word_lithinos.textPosX, y: word_lithinos.textPosY }, { x: word_lithinos.textSizeX, y: word_lithinos.textSizeY }, draftCopyText);
          //set looking for match word
          textSelectedWord = 'lithinos';
          return true;
        }

      //}

    }
  }

  return false;
}

function resetLightsSign1(){
  DebugLog('resetLightsSign1');

  signSelectedWord = '';
  textSelectedWord = '';

  isTapOnText = false;
  isTapOnRock = false;

  if(isRealValue(draftCopyRock)){ draftCopyRock.visible = false; }
  if(isRealValue(draftCopyText)){ draftCopyText.visible = false; }
}

//!!!!!!! πρέπει να αποθηκεύονται οι λέξεις που έχουν βρεθεί για να δείξουμε μια λέξη βοήθεια διαφορετική
//!!!!!!! ??
function ShowSign1HelpWord() {


 // if (randomTextToChoose === 0) {

    var randomArray = [1, 2, 3, 4, 5];

    randomArray = shuffle(randomArray);

    if (randomArray[0] === 1) {
      MoveAndResizeObject({ x: word_ieron.textPosX, y: word_ieron.textPosY }, { x: word_ieron.textSizeX, y: word_ieron.textSizeY }, draftCopyText);
      textSelectedWord = 'ieron';
      return;
    }
    else if (randomArray[0] === 2) {
      MoveAndResizeObject({ x: word_kallikratis1.textPosX, y: word_kallikratis1.textPosY }, { x: word_kallikratis1.textSizeX, y: word_kallikratis1.textSizeY }, draftCopyText);
      textSelectedWord = 'kallikratis';
      return;
    }
    else if (randomArray[0] === 3) {
      MoveAndResizeObject({ x: word_kallikratis2.textPosX, y: word_kallikratis2.textPosY }, { x: word_kallikratis2.textSizeX, y: word_kallikratis2.textSizeY }, draftCopyText);
      textSelectedWord = 'kallikratis_2';
      return;
    }
    else if (randomArray[0] === 4) {
      MoveAndResizeObject({ x: word_peninta.textPosX, y: word_peninta.textPosY }, { x: word_peninta.textSizeX, y: word_peninta.textSizeY }, draftCopyText);
      textSelectedWord = 'peninta';
      return;
    }
    else if (randomArray[0] === 5) {
      MoveAndResizeObject({ x: word_leonidas.textPosX, y: word_leonidas.textPosY }, { x: word_leonidas.textSizeX, y: word_leonidas.textSizeY }, draftCopyText);
      textSelectedWord = 'leonidas';
      return;
    }

 // }
 // else {

    var randomArray = [1, 2, 3, 4, 5, 6, 7, 8];

    randomArray = shuffle(randomArray);

    if (randomArray[0] === 1) {
      MoveAndResizeObject({ x: word_skeli.textPosX, y: word_skeli.textPosY }, { x: word_skeli.textSizeX, y: word_skeli.textSizeY }, draftCopyText);
      textSelectedWord = 'skeli';
      return;
    }
    else if (randomArray[0] === 2) {
      MoveAndResizeObject({ x: word_thyros.textPosX, y: word_thyros.textPosY }, { x: word_thyros.textSizeX, y: word_thyros.textSizeY }, draftCopyText);
      textSelectedWord = 'thyros';
      return;
    }
    else if (randomArray[0] === 3) {
      MoveAndResizeObject({ x: word_syggrapsei.textPosX, y: word_syggrapsei.textPosY }, { x: word_syggrapsei.textSizeX, y: word_syggrapsei.textSizeY }, draftCopyText);
      textSelectedWord = 'syggrapsei';
      return;
    }
    else if (randomArray[0] === 4) {
      MoveAndResizeObject({ x: word_prytanis.textPosX, y: word_prytanis.textPosY }, { x: word_prytanis.textSizeX, y: word_prytanis.textSizeY }, draftCopyText);
      textSelectedWord = 'prytanis';
      return;
    }
    else if (randomArray[0] === 5) {
      MoveAndResizeObject({ x: word_draxmes.textPosX, y: word_draxmes.textPosY }, { x: word_draxmes.textSizeX, y: word_draxmes.textSizeY }, draftCopyText);
      textSelectedWord = 'draxmes';
      return;
    }
    else if (randomArray[0] === 6) {
      MoveAndResizeObject({ x: word_dermata.textPosX, y: word_dermata.textPosY }, { x: word_dermata.textSizeX, y: word_dermata.textSizeY }, draftCopyText);
      textSelectedWord = 'dermata';
      return;
    }
    else if (randomArray[0] === 7) {
      MoveAndResizeObject({ x: word_oikodomes.textPosX, y: word_oikodomes.textPosY }, { x: word_oikodomes.textSizeX, y: word_oikodomes.textSizeY }, draftCopyText);
      textSelectedWord = 'oikodomes';
      return;
    }
    else if (randomArray[0] === 8) {
      MoveAndResizeObject({ x: word_lithinos.textPosX, y: word_lithinos.textPosY }, { x: word_lithinos.textSizeX, y: word_lithinos.textSizeY }, draftCopyText);
      textSelectedWord = 'lithinos';
      return;
    }
  //}
}