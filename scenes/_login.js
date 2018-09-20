
let loadingImg;

class LoginScene extends Phaser.Scene 
{

  constructor (config) {super({ key: 'login' }) }

  init () 
  {
     _this = this;
    
    // set scene name
    currentScene = 'login';
    console.info(currentScene+' init')
    isLoginFinishLoading = false;
      
  }

    
  preload () {
    showProgress();
    loadBackground();

    //load image button for newPlayer - oldPlayer
    //_this.load.image(currentScene + 'draftButton', imagesFolder + 'login/' + 'emptyButton' + '.png');
    _this.load.image(currentScene + 'draftButton', getSceneImagesFolder() + 'button' + '.png');
    //_this.load.image(currentScene + 'loading', getSceneImagesFolder() + 'loading' + '.png');
    _this.load.image(currentScene + 'loading', getSceneImagesFolder() + 'loading_icon' + '.gif');
  } 

 

  create () 
  { 
      showBackground();     

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

      var message = document.createElement("div");
      message.style.position = 'absolute';
      message.id = 'txtHint';

      body.appendChild(message);

      //PositionFormElements();         

      //show button
      var btnLoginEnter = _this.add.image(983, 744, currentScene + 'draftButton').setInteractive({ cursor: 'pointer' });

      if (isNewPlayer) {
          btn.innerHTML = 'Δημιούργησε Χρήστη';
          btn.onclick = CreateUser;
      } else {
          btn.innerHTML = 'Βάλε με μέσα';
          btn.onclick = GetPassword;
      }

     

     // function PositionFormElements() {
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

          //message - to be replaced by phaser text         
          message.style.width = (cwidth).toString() + 'px';
          message.style.top = (cheight * 0.57).toString() + 'px';
     // }

  }//create
}



var isLoginFinishLoading = false;

function OnScoresFinishLoading() {
    ClearForm();

    GetPlayerAvatar(playerId);
    initPlayerArrays();

    //go to scene
    game.scene.stop(currentScene);
    game.scene.start('menu');
}

function GetPassword() {

    var user = document.getElementById("txtUser").value;
    var password = document.getElementById("txtPsw").value;
    var xmlhttp;
    if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();
    }
    else {
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }

    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("txtHint").innerHTML = this.responseText;                
            if (this.responseText.includes('Καλώς ήλθες')) {    

                loadingImg.visible = true;

                //get player id
                GetPlayerID(user, password);
                DebugLog('loadScores >> '+playerId);
                loadScores();

                var btn = document.getElementById("button");
                btn.innerHTML = 'Έτοιμος!!!';
                btn.onclick = function () { 
                    DebugLog('etoimos!');
                    // if (isLoginFinishLoading) {

                    //     ClearForm();

                    //     GetPlayerAvatar(playerId);
                    //     initPlayerArrays();

                    //     //go to scene
                    //     game.scene.stop(currentScene);
                    //     game.scene.start('menu');
                    // }
                }
            }
        }
    };         
    var PageToSendTo = document.location.href + "php/manageancienttempledb.php?";
    var action = "select";
    var UrlToSend = PageToSendTo + "action=" + action + "&user=" + user + "&psw=" + password;

    xmlhttp.open("GET", UrlToSend, true);
    xmlhttp.send();
}


//get  player's avatar person, haircolor and clothcolor
function GetPlayerID(user,psw) {

    playerId = '0';

    if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();
    }
    else {
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            playerId = this.responseText;
        }
    };

    var PageToSendTo = document.location.href + "php/manageancienttempledb.php?";
    var action = "GetPlayerID";
    var UrlToSend = PageToSendTo + "action=" + action + "&user="+user + "&psw="+psw;

    xmlhttp.open("GET", UrlToSend, true);
    xmlhttp.send();
}

function CreateUser() {
    var user = document.getElementById("txtUser").value;
    var password = document.getElementById("txtPsw").value;
    var xmlhttp;
    if (user.length < 6) {
        document.getElementById("txtHint").innerHTML = "το όνομα χρήστη πρέπει να έχει τουλάχιστον έξι χαρακτήρες!";
    } else if (password.length < 6) {
        document.getElementById("txtHint").innerHTML = "ο κωδικός πρέπει επίσης να έχει τουλάχιστον έξι χαρακτήρες!";
    } else {
        if (window.XMLHttpRequest) {
            xmlhttp = new XMLHttpRequest();
        }
        else {
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }

        xmlhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                document.getElementById("txtHint").innerHTML = this.responseText;
                if (this.responseText.includes('δημιουργήθηκε')) {                         
                    var btn = document.getElementById("button");
                    btn.innerHTML = 'Έτοιμος!!!';
                    btn.onclick = function () {
                        ClearForm();       

                        GetPlayerID(user, password);  

                        //playerPsw = password;
                       // playerName = user;                    
                        
                        //go to scene
                        game.scene.stop(currentScene);
                        game.scene.start('player');
                    }                          
                }
            }
        };
                   
        var PageToSendTo = document.location.href + "php/manageancienttempledb.php?";
        var action = "insert";

        var UrlToSend = PageToSendTo + "action=" + action + "&user=" + user + "&psw=" + password;

        xmlhttp.open("GET", UrlToSend, true);
        xmlhttp.send();
    }
}

function ClearForm() {
    //remove button
    var btn = document.getElementById("button");
    btn.parentNode.removeChild(btn);

    //remove text boxes
    var txtUser = document.getElementById('txtUser');
    txtUser.parentNode.removeChild(txtUser);

    var txtPsw = document.getElementById('txtPsw');
    txtPsw.parentNode.removeChild(txtPsw);

    var txtHint = document.getElementById('txtHint');
    txtHint.parentNode.removeChild(txtHint);
}

//not using
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