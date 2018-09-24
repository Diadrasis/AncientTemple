class Credits extends Phaser.Scene {

  constructor () { super({ key: 'credits' }) }

  init () 
  {
    _this = this;
    // set scene name
    currentScene = 'credits';

    currPage = 1;

    console.info(currentScene+' init')

  }

  preload () {

    showProgress();

    loadBackground();

    // logo
    this.load.image('logo_menu_gr', getSceneImagesFolder() + '/logo_menu_gr.png');
    this.load.image('logo_menu_en', getSceneImagesFolder() + '/logo_menu_en.png');

    //footer
    // this.load.image('footer_menu_gr', imagesFolder + currentScene + '/footer_menu_gr.png');
    // this.load.image('footer_menu_en', imagesFolder + currentScene + '/footer_menu_en.png');

    this.load.image('side_menu_credits', getSceneImagesFolder() + '/side_menu.png');

    this.load.image('btnEmpty', imagesGeneral + 'btnMenuEmpty.png');

    for(var i=1; i<=7; i++){
      this.load.image('credits_'+i+'_'+languange, getSceneImagesFolder() + 'credits_'+i+'_'+languange+'.png');
    }

  }

  create () {
   
    showBackground();

    creditsPage = this.add.image(0,0, 'credits_'+1+'_'+languange).setOrigin(0, 0);


    //show logo loaded from menu
    logo_menu = _this.add.image(284, 184, 'logo_menu_' + languange);
      
    //show footer loaded from menu
    footer_menu = _this.add.image(game.config.width / 2, game.config.height - 50, 'footer_menu_' + languange);

    _this.add.image(87, 150, 'side_menu_credits');

    var btnHomeIntro = this.add.image(55, 63, 'btnEmpty').setInteractive({ cursor: 'pointer' });
    btnHomeIntro.depth = 70;
    btnHomeIntro.on('pointerup',
      function () {
        if(previousScene === 'credits'){previousScene = 'menu';}
        game.scene.stop(currentScene);
        game.scene.start(previousScene);
      }
    );


    var btnNext = this.add.image(56, 139, 'btnEmpty').setInteractive({ cursor: 'pointer' });
    btnNext.on('pointerdown', NextCreditPage, this);
    btnNext.depth = 70;

    var btnPrevious = this.add.image(56, 227, 'btnEmpty').setInteractive({ cursor: 'pointer' });
    btnPrevious.on('pointerdown', PreviousCreditPage, this);
    btnPrevious.depth = 70;

    var btnPrint = this.add.image(56, 310, 'btnEmpty').setInteractive({ cursor: 'pointer' });
    btnPrint.on('pointerdown', PrintPage, this);
    btnPrint.depth = 70;

    createButtonsExtra();

  }

}

var creditsPage;
var currPage = 0;

//'credits_'+i+'_'+languange

function NextCreditPage(){

  currPage++;

  if (currPage < 1) { currPage = 7; }else
  if (currPage > 7) { currPage = 1; }

  if (currPage === 7) {
    creditsPage.x = 1037;
    creditsPage.y = 553;
    creditsPage.setOrigin(0.5, 0.5);
  } else {
    creditsPage.x = 0;
    creditsPage.y = 0;
    creditsPage.setOrigin(0, 0);
  }

  creditsPage.setTexture('credits_'+currPage+'_'+languange);

}

function PreviousCreditPage(){

  currPage--;

  if (currPage < 1) { currPage = 7; }else
  if (currPage > 7) { currPage = 1; }

  if (currPage === 7) {
    creditsPage.x = 1037;
    creditsPage.y = 553;
    creditsPage.setOrigin(0.5);
  } else {
    creditsPage.x = 0;
    creditsPage.y = 0;
    creditsPage.setOrigin(0, 0);
  }

  creditsPage.setTexture('credits_'+currPage+'_'+languange);

}
