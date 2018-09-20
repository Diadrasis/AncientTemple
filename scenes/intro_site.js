


let bg1, bg2, bg3;
let textbox1, textbox2, text1, text2;

let columns_back, columns_front;

let arxitektonas, arxitektonas_bubble, arxitektonas_text;
let glyptis;
let iereia, iereia_bubble, iereia_text;
let lithoxoos, lithoxoos_bubble, lithoxoos_text;
let naopoios, naopoios_bubble, naopoios_text;

let btnskip;

var musicIntroSite;

var greyBG;

class IntroSiteScene extends Phaser.Scene 
{

  constructor (config) {super({ key: 'intro_site' }) }

  init () 
  {
     _this = this;
    
    // set scene name
      currentScene = 'intro_site';

    //detetc browser, if explorer on not supported show image with links to download other brosers
    //  alert(Phaser.Device.Browser);
      
   
  }

  preload () {

    showProgress();

    this.load.audio('themeIntro', [
      'assets/audio/oedipus_wizball_highscore.ogg',
      'assets/audio/oedipus_wizball_highscore.mp3'
    ]);

    var folderPlano1 = 'plano_1/';
    var folderPlano2 = 'plano_2/';
    var folderPlano3 = 'plano_3/';

    _this.load.image(currentScene+'grey', getSceneImagesFolder() + 'grey' + '.jpg');
    
    _this.load.image(currentScene+'frame', getSceneImagesFolder() + 'frame' + '.png');
    _this.load.image(currentScene+'skip', getSceneImagesFolder() + 'skip' + '.png');
    _this.load.image(currentScene+'bg1', getSceneImagesFolder() + folderPlano1+ 'bg' + '.jpg');
    _this.load.image(currentScene+'text_box1', getSceneImagesFolder() + folderPlano1 + 'text_box' + '.png');
    _this.load.image(currentScene+'bg2', getSceneImagesFolder() + folderPlano2 + 'bg' + '.jpg');
    _this.load.image(currentScene+'text_box2', getSceneImagesFolder() + folderPlano2 + 'text_box' + '.png');

    _this.load.image(currentScene+'bg3', getSceneImagesFolder() + folderPlano3 + 'bg' + '.jpg');
    _this.load.image(currentScene+'columns_back', getSceneImagesFolder() + folderPlano3 + 'columns_back' + '.png');
    _this.load.image(currentScene+'columns_front', getSceneImagesFolder() + folderPlano3 + 'columns_front' + '.png');
    _this.load.image(currentScene+'arxitektonas', getSceneImagesFolder() + folderPlano3 + 'arxitektonas' + '.png');
    _this.load.image(currentScene+'glyptis', getSceneImagesFolder() + folderPlano3 + 'glyptis' + '.png');
    _this.load.image(currentScene+'iereia', getSceneImagesFolder() + folderPlano3 + 'iereia' + '.png');
    _this.load.image(currentScene+'lithoxoos', getSceneImagesFolder() + folderPlano3 + 'lithoxoos' + '.png');
    _this.load.image(currentScene+'naopoios', getSceneImagesFolder() + folderPlano3 + 'naopoios' + '.png');
    _this.load.image(currentScene+'arxitektonas_bubble', getSceneImagesFolder() + folderPlano3 + 'arxitektonas_bubble' + '.png');
    _this.load.image(currentScene+'ieria_bubble', getSceneImagesFolder() + folderPlano3 + 'ieria_bubble' + '.png');
    _this.load.image(currentScene+'lithoxoos_bubble', getSceneImagesFolder() + folderPlano3 + 'lithoxoos_bubble' + '.png');
    _this.load.image(currentScene+'naopoios_bubble', getSceneImagesFolder() + folderPlano3 + 'naopoios_bubble' + '.png');
    
  }

  create () 
  { 

   
    musicIntroSite = this.sound.add('themeIntro');

    greyBG = _this.add.image(0, 0, currentScene + 'grey').setOrigin(0, 0);
    greyBG.depth = 500;
    greyBG.alpha=0;
    greyBG.visible=false;

    bg3 = _this.add.image(0, 0, currentScene + 'bg3').setOrigin(0, 0);
    bg3.depth = 14;
    bg3.visible = false;
    columns_back = _this.add.image(0, 0, currentScene + 'columns_back').setOrigin(0, 0);
    columns_back.depth = 15;
    columns_back.visible = false;
    columns_front = _this.add.image(0, 0, currentScene + 'columns_front').setOrigin(0, 0);
    columns_front.depth = 16;
    columns_front.visible = false;
    arxitektonas = _this.add.image(381, 611, currentScene+'arxitektonas');
    arxitektonas.depth = 17;
    arxitektonas.visible = false;
    arxitektonas_bubble = _this.add.image(917, 273, currentScene+'arxitektonas_bubble');
    arxitektonas_bubble.depth = 18;
    arxitektonas_bubble.visible = false;
    iereia = _this.add.image(823, 729, currentScene+'iereia');
    iereia.depth = 19;
    iereia.visible = false;
    iereia_bubble = _this.add.image(1048, 336, currentScene+'ieria_bubble');
    iereia_bubble.depth = 19;
    iereia_bubble.visible = false;
    lithoxoos = _this.add.image(1722, 764, currentScene+'lithoxoos');
    lithoxoos.depth = 20;
    lithoxoos.visible = false;
    lithoxoos_bubble = _this.add.image(1246, 458, currentScene+'lithoxoos_bubble');
    lithoxoos_bubble.depth = 20;
    lithoxoos_bubble.visible = false;
    naopoios = _this.add.image(1294, 752, currentScene+'naopoios');
    naopoios.depth = 21;
    naopoios.visible = false;
    naopoios_bubble = _this.add.image(1286, 315, currentScene+'naopoios_bubble');
    naopoios_bubble.depth = 21;
    naopoios_bubble.visible = false;
    
    _this.time.delayedCall(100, showPlaisio, [], _this);

    var btnskip =  _this.add.image(1721, 968, currentScene+'skip').setInteractive({ cursor: 'pointer' });
    btnskip.on('pointerup',
      function () {
        SkipIntro();
      }
    );
    btnskip.depth = 105;

    fadeInCamera(2);
    //SkipIntro();


  }//create


}


function showPlaisio(){

  musicIntroSite.volume = 0;

  //musicIntroSite.play();

  _this.add.tween({
    targets: [musicIntroSite],
    ease: 'Sine.easeInOut',
    duration: 7000,
    delay: 0,
    volume: {
      getStart: () => 0,
      getEnd: () => 1
    },
    onComplete: () => {   }
  });

  _this.add.image(0, 0, currentScene+'frame').setOrigin(0, 0).depth = 100;
  _this.time.delayedCall(100, showbg1, [], _this);
}

function showbg1(){

  _this.add.image(0, 0, currentScene+'bg1').setOrigin(0, 0).depth = 10;
  _this.time.delayedCall(2500, showText1, [], _this);
}

function showText1(){

  text1 = _this.add.image(948, 142, currentScene+'text_box1');
  text1.visible = false;
  text1.depth = 11;
  text1.alpha =0;
  text1.visible = true;

  _this.add.tween({
    targets: [text1],
    ease: 'Sine.easeInOut',
    duration: 1000,
    delay: 0,
    alpha: {
      getStart: () => 0,
      getEnd: () => 1
    },
    onComplete: () => {
      //handle completion
    }
  });

  _this.time.delayedCall(4500, showbg2, [], _this);
}

function showbg2(){
  bg2 = _this.add.image(0, 0, currentScene+'bg2').setOrigin(0, 0);
  bg2.depth = 12;
  bg2.visible = false;
  bg2.alpha = 0;
  bg2.visible = true;

  _this.add.tween({
    targets: [bg2],
    ease: 'Sine.easeInOut',
    duration: 1000,
    delay: 0,
    alpha: {
      getStart: () => 0,
      getEnd: () => 1
    },
    onComplete: () => {
      //handle completion
    }
  });

  _this.time.delayedCall(3000, showText2, [], _this);
}

function showText2(){
  text2 = _this.add.image(948, 142, currentScene + 'text_box2');
  text2.depth = 13;
  text2.visible = false;
  text2.alpha = 0;
  text2.visible = true;

  _this.add.tween({
    targets: [text2],
    ease: 'Sine.easeInOut',
    duration: 1000,
    delay: 0,
    alpha: {
      getStart: () => 0,
      getEnd: () => 1
    },
    onComplete: () => {
      //handle completion
    }
  });

  _this.time.delayedCall(4500, showbg3, [], _this);
}

function showbg3(){
  bg3.alpha=0;
  columns_back.alpha=0;
  columns_front.alpha=0;
  bg3.visible = true;
  columns_back.visible = true;
  columns_front.visible = true;


  _this.add.tween({
    targets: [bg3, columns_back, columns_front],
    ease: 'Sine.easeInOut',
    duration: 1000,
    delay: 0,
    alpha: {
      getStart: () => 0,
      getEnd: () => 1
    },
    onComplete: () => {
      //handle completion
    }
  });

  _this.time.delayedCall(3500, showArxitektona, [], _this);
}


function showArxitektona(){
  arxitektonas.alpha = 0;
  arxitektonas.visible = true;

  _this.add.tween({
    targets: [arxitektonas],
    ease: 'Sine.easeInOut',
    duration: 1000,
    delay: 0,
    alpha: {
      getStart: () => 0,
      getEnd: () => 1
    },
    onComplete: () => {
      //handle completion
    }
  });

  _this.time.delayedCall(1500, showArxitektonaBubble, [], _this);
}

function showArxitektonaBubble(){
  arxitektonas_bubble.alpha = 0;
 arxitektonas_bubble.visible = true;

 _this.add.tween({
  targets: [arxitektonas_bubble],
  ease: 'Sine.easeInOut',
  duration: 1000,
  delay: 0,
  alpha: {
    getStart: () => 0,
    getEnd: () => 1
  },
  onComplete: () => {
    //handle completion
  }
});

  _this.time.delayedCall(3500, hideArxitektonas, [], _this);
}

function hideArxitektonas(){

  _this.add.tween({
    targets: [arxitektonas, arxitektonas_bubble],
    ease: 'Sine.easeInOut',
    duration: 1000,
    delay: 0,
    alpha: {
      getStart: () => 1,
      getEnd: () => 0
    },
    onComplete: () => {
      //handle completion
      arxitektonas.visible = false;
      arxitektonas_bubble.visible = false;
    }
  });

  
  _this.time.delayedCall(1500, showIereia, [], _this);
}

function showIereia(){
  iereia.alpha=0;
  iereia.visible = true;

  _this.add.tween({
    targets: [iereia],
    ease: 'Sine.easeInOut',
    duration: 1000,
    delay: 0,
    alpha: {
      getStart: () => 0,
      getEnd: () => 1
    },
    onComplete: () => {
      //handle completion
    }
  });

  _this.time.delayedCall(1500, showIereiaBubble, [], _this);
}

function showIereiaBubble(){
  iereia_bubble.alpha=0;
  iereia_bubble.visible = true;

  _this.add.tween({
    targets: [iereia_bubble],
    ease: 'Sine.easeInOut',
    duration: 1000,
    delay: 0,
    alpha: {
      getStart: () => 0,
      getEnd: () => 1
    },
    onComplete: () => {
      //handle completion
    }
  });

  _this.time.delayedCall(3500, showLithoxoos, [], _this);
}

function showLithoxoos(){
  _this.add.tween({
    targets: [iereia, iereia_bubble],
    ease: 'Sine.easeInOut',
    duration: 1000,
    delay: 0,
    alpha: {
      getStart: () => 1,
      getEnd: () => 0
    },
    onComplete: () => {
      iereia.visible = false;
      iereia_bubble.visible = false;
    }
  });

  lithoxoos.alpha = 0;
  lithoxoos.visible = true;

  _this.add.tween({
    targets: [lithoxoos],
    ease: 'Sine.easeInOut',
    duration: 1000,
    delay: 0,
    alpha: {
      getStart: () => 0,
      getEnd: () => 1
    },
    onComplete: () => {
      //handle completion
    }
  });
  
  _this.time.delayedCall(1500, showLithoxoosBubble, [], _this);
}

function showLithoxoosBubble(){
  lithoxoos_bubble.alpha=0;
  lithoxoos_bubble.visible = true;

  _this.add.tween({
    targets: [lithoxoos_bubble],
    ease: 'Sine.easeInOut',
    duration: 1000,
    delay: 0,
    alpha: {
      getStart: () => 0,
      getEnd: () => 1
    },
    onComplete: () => {
      //handle completion
    }
  });

  _this.time.delayedCall(3500, showNaopoios, [], _this);
}

function showNaopoios(){
  _this.add.tween({
    targets: [lithoxoos, lithoxoos_bubble],
    ease: 'Sine.easeInOut',
    duration: 1000,
    delay: 0,
    alpha: {
      getStart: () => 1,
      getEnd: () => 0
    },
    onComplete: () => {
      lithoxoos.visible = false;
      lithoxoos_bubble.visible = false;
    }
  });
  
  naopoios.alpha=0;
  naopoios.visible = true;

  _this.add.tween({
    targets: [naopoios],
    ease: 'Sine.easeInOut',
    duration: 1000,
    delay: 1000,
    alpha: {
      getStart: () => 0,
      getEnd: () => 1
    },
    onComplete: () => {
      //handle completion
    }
  });

  _this.time.delayedCall(2500, showNaopoiosBubble, [], _this);
}

function showNaopoiosBubble(){
  naopoios_bubble.alpha=0;
  naopoios_bubble.visible = true;

  _this.add.tween({
    targets: [naopoios_bubble],
    ease: 'Sine.easeInOut',
    duration: 1000,
    delay: 0,
    alpha: {
      getStart: () => 0,
      getEnd: () => 1
    },
    onComplete: () => {
      //handle completion
    }
  });

  _this.time.delayedCall(3500, SkipIntro, [], _this);
}

function SkipIntro() {

  if(greyBG.visible === true){return;}

  greyBG.visible = true;

  _this.add.tween({
    targets: [greyBG],
    ease: 'Sine.easeInOut',
    duration: 2000,
    delay: 0,
    alpha: {
      getStart: () => 0,
      getEnd: () => 1
    },
    onComplete: () => {
      //handle completion
    }
  });

  _this.add.tween({
    targets: [musicIntroSite],
    ease: 'Sine.easeInOut',
    duration: 2000,
    delay: 0,
    volume: {
      getStart: () => musicIntroSite.volume,
      getEnd: () => 0
    },
    onComplete: () => {
      musicIntroSite.stop();
      game.scene.stop(currentScene);
      game.scene.start('intro');
      //game.scene.start('menu');
    }
  });

  
}