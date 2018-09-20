
function startInit()
{
  _this = this;
  DebugLog('init login');
}

class BootScenes extends Phaser.Scene 
{

  constructor (config) {super({ key: 'bootScenes' }) }

  preload () {

    // #region load progress

    var progressbar = this.add.graphics()
    var progressBox = this.add.graphics()
    progressBox.fillStyle(0x222222, 0.8)
    progressBox.fillRect(1920 / 2 - 350, 1080 / 2 - 12.5, 700, 25)

    /**
     * Updates the progress bar.
     * 
     * @param {number} percentage 
     */
    var updateProgressbar = function (percentage) {
      progressbar.clear()
      progressbar.fillStyle(0xffffff, 1)
      progressbar.fillRect(1920 / 2 - 350, 1080 / 2 - 12.5, percentage * 700, 25)
    }

    this.load.on('progress', updateProgressbar)

    this.load.once('complete', function () {
      this.load.off('progress', updateProgressbar)
      progressbar.destroy()
      progressBox.destroy()
      // this.scene.start("title")

    }, this)

    // #endregion

    //Load All Scripts
    var file = 'script';

    this.load.script('math'+file, 'helpers/math.js');
    this.load.script('textConfigs'+file, 'helpers/textConfigs.js');
    this.load.script('camera'+file, 'helpers/camera.js');
    


    //games
    this.load.script('geography'+file, 'scenes/geography.js');

    this.load.script('type'+file, 'scenes/type.js');  
    this.load.script('type0'+file, 'scenes/type_temple_0.js');
    this.load.script('type1'+file, 'scenes/type_temple_1.js');
    this.load.script('type2'+file, 'scenes/type_temple_2.js');
    this.load.script('type3'+file, 'scenes/type_temple_3.js');

    this.load.script('form'+file, 'scenes/form.js');
    this.load.script('sculpture'+file, 'scenes/sculpture.js');
    this.load.script('sign'+file, 'scenes/sign.js');
    this.load.script('sign_type_1'+file, 'scenes/sign_type_1.js');
    this.load.script('construction'+file, 'scenes/construction.js');
    this.load.script('neoclassical'+file, 'scenes/neoclassical.js');

    this.load.script('intro'+file, 'scenes/intro.js');
    this.load.script('player'+file, 'scenes/player.js');
    this.load.script('login'+file, 'scenes/login.js');

    this.load.script('credits'+file, 'scenes/credits.js');
    this.load.script('leaderboard'+file, 'scenes/leaderboard.js');
    this.load.script('moreToLearn'+file, 'scenes/moreToLearn.js');
    this.load.script('didYouKnow'+file, 'scenes/didYouKnow.js');

    this.load.script('menu'+file, 'scenes/menu.js');
    this.load.script('global'+file, 'core/global.js');
    this.load.script('db'+file, 'helpers/db_interaction.js');
    this.load.script('db2'+file, 'helpers/manage_db_functions.js');

    this.load.script('intro_site'+file, 'scenes/intro_site.js');
  }

  create () 
  { 
    // _this = this;

    addAllScenes();
    
    // set scene name
    currentScene = 'bootScenes';

    DebugLog(currentScene+' create')

    IntroTextTitle = this.make.text(configIntroTextTitle);
    IntroTextDescription = this.make.text(configIntroTextDescription);
    IntroTextBubble = this.make.text(configIntroTextBubble);

    if (inDevelopmentState) {
      isNewPlayer = false;
      game.scene.stop(currentScene);
      game.scene.start('login');
    } else {

      //load intro site
      game.scene.stop(currentScene);
      game.scene.start('intro_site');
    }


    //get did you know from db

  }//create

}

function addAllScenes()
{
  game.scene.add('intro_site', IntroSiteScene, false, { x: 0, y: 0 });
  game.scene.add('intro', IntroScene, false, { x: 0, y: 0 });
  game.scene.add('login', LoginScene, false, { x: 0, y: 0 });
  game.scene.add('player', PlayerScene, false, { x: 0, y: 0 });
  game.scene.add('menu', Menu, false, { x: 0, y: 0 });
  game.scene.add('credits', Credits, false, { x: 0, y: 0 });
  game.scene.add('leaderboard', LeaderboardScene, false, { x: 0, y: 0 });
  game.scene.add('moreToLearn', MoreToLearnScene, false, { x: 0, y: 0 });
  game.scene.add('didYouKnow', DidYouKnowScene, false, { x: 0, y: 0 });
  game.scene.add('form', FormScene, false, { x: 0, y: 0 });//tetris
  game.scene.add('type', TypeScene, false, { x: 0, y: 0 });//puzzle 3d
  game.scene.add('geography', GeographyScene, false, { x: 0, y: 0 });
  game.scene.add('neoclassic', NeoclassicalScene, false, { x: 0, y: 0 });
  game.scene.add('sculpture', SculptureScene, false, { x: 0, y: 0 });
  game.scene.add('sign', SignScene, false, { x: 0, y: 0 });
  game.scene.add('construction', ConstructionScene, false, { x: 0, y: 0 });
}