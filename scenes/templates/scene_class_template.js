
class SceneClassTemplate extends Phaser.Scene 
{

  // #region config
  constructor (config) {
    super({
      key: 'template',
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

  preload () {

       
  }

  init () 
  {

  }

  create () 
  { 
    

  }//create

  update (time, delta) {
    
  }//update


}

