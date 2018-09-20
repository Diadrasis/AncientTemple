
var xmlhttp;
var score_points;


//moved from login
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
            //loadingImg.visible = true;
            //alert(password);
            var message = this.responseText;
            if (message.includes('welcome')) {
                load_anim.anims.play('kitsos');
                ShowLocaleMessage(loginTxtMessage, 960, 'Καλώς ήλθες!', 'Welcome!');
                _this.time.delayedCall(2000, function () {
                    GetPlayerID(user, password);
                }, [], this);

            } else if (message.includes('password')) {
                ShowLocaleMessage(loginTxtMessage, 960, 'Χμμ...Ο κωδικός σου είναι λάθος...Για ξαναδοκίμασε!', 'Your password seems wrong! Try again');
                //loginTxtMessage.setText();
            } else if (message.includes('user not exists')) {
                loginTxtMessage.setText('Δεν υπάρχει τέτοιος χρήστης!... Για ξαναδοκίμασε...');
                ShowLocaleMessage(loginTxtMessage, 960, 'Δεν υπάρχει τέτοιος χρήστης!... Για ξαναδοκίμασε...', 'User does not exist!');

            }
            
        }
    };
    var PageToSendTo = document.location.href + "php/manage_global_db.php?";
    var action = "select";
    var UrlToSend = PageToSendTo + "action=" + action + "&user=" + user + "&psw=" + password;

    xmlhttp.open("GET", UrlToSend, true);
    xmlhttp.send();
}


//get  player's avatar person, haircolor and clothcolor
function GetPlayerID(user, psw) {
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
            //alert(playerId);
            GetPlayerAvatar(playerId);           
        }
    };

    var PageToSendTo = document.location.href + "php/manage_global_db.php?";
    var action = "GetPlayerID";
    var UrlToSend = PageToSendTo + "action=" + action + "&user=" + user + "&psw=" + psw;

    xmlhttp.open("GET", UrlToSend, true);
    xmlhttp.send();
}

function CreateUser() {
    var user = document.getElementById("txtUser").value;
    var password = document.getElementById("txtPsw").value;
    //alert('try to create user');
    var xmlhttp;
    if (user.length < 6) {
        ShowLocaleMessage(loginTxtMessage, 960, 'To όνομα χρήστη  πρέπει να είναι τουλάχιστον 6 χαρακτήρες!', 'The user name should be at least 6 charachters long!' );
    } else if (password.length < 6) {
        ShowLocaleMessage(loginTxtMessage, 960, 'Ο κωδικός πρέπει να είναι τουλάχιστον 6 χαρακτήρες!', 'The password should be at least 6 charachters long!');
    } else {
        if (window.XMLHttpRequest) {
            xmlhttp = new XMLHttpRequest();
        }
        else {
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        xmlhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                //alert(this.responseText);
                if (this.responseText.includes('newuser')) {
                    playerId = this.responseText.substring(8);                    
                    ShowLocaleMessage(loginTxtMessage, 960, 'Έτοιμος!' , 'Ready to go!');                                             
                    ClearForm();
                    game.scene.stop(currentScene);
                    game.scene.start('player');                   
                } else if (this.responseText.includes('userexists')) {
                    ShowLocaleMessage(loginTxtMessage, 960, 'Ο παίκτης υπάρχει ήδη!', 'User already exists!');
                } else {
                    ShowLocaleMessage(loginTxtMessage, 960, this.responseText, this.responseText);
                }
            }
        };

        var PageToSendTo = document.location.href + "php/manage_global_db.php?";
        var action = "insert";

        var UrlToSend = PageToSendTo + "action=" + action + "&user=" + user + "&psw=" + password;

        xmlhttp.open("GET", UrlToSend, true);
        xmlhttp.send();
    }
}


//set players home image from the neoclassical game
function SetPlayerHomeImage(player_id, player_house_file) {
    //DebugLog('saving ' + score_points + ' for game_id ' + game_id);
    var message;
    if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();
    }
    else {
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {            
            message = this.responseText;
            alert(message);
        }
    };

    var PageToSendTo = document.location.href + "php/manage_global_db.php?";
    var action = "SetPlayerHomeImage";
    var UrlToSend = PageToSendTo + "action=" + action + "&player_id=" + player_id + "&player_house_file=" + player_house_file;
    //alert(UrlToSend);
    xmlhttp.open("GET", UrlToSend, true);
    xmlhttp.send();
}
//SetPlayerHomeImage(38, 'aaaaaa');

//get players with the best score
function GetBestScores() {
    bestScoresRead = false;
    //var best_scores = [];
    best_scores = new Array();
    
    if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();
    }
    else {
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            best_scores = JSON.parse(xmlhttp.responseText);
            //gameScores = JSON.parse(xmlhttp.responseText);           
            bestScoresRead = true;           
        }
    };

    var PageToSendTo = document.location.href + "php/manage_global_db.php?";
    var action = "GetBestScores";
    var UrlToSend = PageToSendTo + "action=" + action;

    xmlhttp.open("GET", UrlToSend, true);
    xmlhttp.send();
}

GetBestScores();

//get players scores of all games
var gameScores = [];
function GetGameScores(player_id) {
    gameScoresRead = false;
    var game_scores = [];
    if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();
    }
    else {
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            game_scores = JSON.parse(xmlhttp.responseText);           
            for (var i = 0; i < 6; i++) {
                gameScores.push(new Array(i, 0));
                for (var k = 0; k < game_scores.length; k++) {
                    if (game_scores[k][0] - 1 == i) {
                        gameScores[i][1] = game_scores[k][1];
                    }
                }
            }
            //alert('create buttons');
            createGameButtons();
        }
    };

    var PageToSendTo = document.location.href + "php/manage_global_db.php?";
    var action = "GetGameScores";
    var UrlToSend = PageToSendTo + "action=" + action + "&player_id=" + player_id;

    xmlhttp.open("GET", UrlToSend, true);
    xmlhttp.send();
}
//GetGameScores(111);


//get player's score of a specific game
function GetGameScore(player_id, game_id) {
    score_points = 0;
    if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();
    }
    else {
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            score_points = JSON.parse(xmlhttp.responseText);
            //DebugLog(game_id +') '+score_points);
            //showGameScore(game_id, score_points);
        }
    };

    var PageToSendTo = document.location.href + "php/manage_global_db.php?";
    var action = "GetGameScore";
    var UrlToSend = PageToSendTo + "action=" + action + "&player_id=" + player_id + "&game_id=" + game_id;

    xmlhttp.open("GET", UrlToSend, true);
    xmlhttp.send();
}
//GetGameScore(38, 2);

//set player's score on a specific game, if greater than the current score
function SetGameScore(player_id, game_id, score_points) {
   // DebugLog('saving '+score_points + ' for game_id '+game_id);
    var message;
    if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();
    }
    else {
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            //message= JSON.parse(xmlhttp.responseText);
            message = this.responseText;
            DebugLog(message);
        }
    };

    var PageToSendTo = document.location.href + "php/manage_global_db.php?";
    var action = "SetGameScore";
    var UrlToSend = PageToSendTo + "action=" + action + "&player_id=" + player_id + "&game_id=" + game_id + "&score_points=" + score_points;
    xmlhttp.open("GET", UrlToSend, true);
    xmlhttp.send();
}
//SetGameScore(38, 3, 25);

//get player's total score, adding all game scores
function GetTotalScore(player_id, game_id) {
    var total_points;
    if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();
    }
    else {
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            total_points = JSON.parse(xmlhttp.responseText);
            alert(total_points);
        }
    };

    var PageToSendTo = document.location.href + "php/manage_global_db.php?";
    var action = "GetTotalScore";
    var UrlToSend = PageToSendTo + "action=" + action + "&player_id=" + player_id;

    xmlhttp.open("GET", UrlToSend, true);
    xmlhttp.send();
}
//GetTotalScore(38);

//IntroTextTitle, IntroTextDescription, IntroTextBubble;
//get game's intro and charachter intro texts, according to the selected language 
function GetGameIntroTexts(game_id) {
    var intro_texts = new Array();
    var xmlhttp;
    if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();
    }
    else {
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            intro_texts = JSON.parse(xmlhttp.responseText);
            
            //dbIntroTexts = {title:'', desc:'', character:''};
            dbIntroTexts.title = intro_texts[0];
            dbIntroTexts.desc = intro_texts[1];
            dbIntroTexts.character = intro_texts[2];
            //inform global
            //intoTextsRead = true;

        }
        LoadIntroTexts();
    };

    var PageToSendTo = document.location.href + "php/manage_global_db.php?";
    var action = "GetGameIntroTexts";

    var UrlToSend = PageToSendTo + "action=" + action + "&lang=" + languange + "&game_id=" + game_id;
    xmlhttp.open("GET", UrlToSend, true);
    xmlhttp.send();
}

//$didYouKnowItem= array($row["questiontext_" . $lang],$row["answertext_" . $lang], $row["imagefile"]);  

var didYouKnowList;
//get game's did you know texts, according to the selected language 
function GetGameDidYouKnow(game_id) {
    //DebugLog('GetGameDidYouKnow ID = ' + game_id);
    //alert('reading did you know!');
    dykDataRead = false;
    didYouKnowList = new Array();
    if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();
    }
    else {
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {            
            //dykDataRead = true;
            didYouKnowList = JSON.parse(xmlhttp.responseText);
            //alert("did you know list " + didYouKnowList[1][1]);
            setDidYouKnowTexts();
            
        }
    };

    var PageToSendTo = document.location.href + "php/manage_global_db.php?";
    var action = "GetGameDidYouKnow";

    var UrlToSend = PageToSendTo + "action=" + action + "&lang=" + languange + "&game_id=" + game_id;

    xmlhttp.open("GET", UrlToSend, true);
    xmlhttp.send();
}
//GetGameDidYouKnow(2);

//set  player's avatar with the selected person, haircolor and clothcolor  
function SetPlayerAvatar(player_id, avatar_person, avatar_haircolor, avatar_clothcolor) {
    var message;
    if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();
    }
    else {
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            //message= JSON.parse(xmlhttp.responseText);
            message = this.responseText;
           //alert(message);
        }
    };

    var PageToSendTo = document.location.href + "php/manage_global_db.php?";
    var action = "SetPlayerAvatar";
    var UrlToSend = PageToSendTo + "action=" + action + "&player_id=" + player_id + "&person=" + avatar_person + "&haircolor=" + avatar_haircolor + "&clothcolor=" + avatar_clothcolor;
    xmlhttp.open("GET", UrlToSend, true);
    xmlhttp.send();
}
//SetPlayerAvatar(40, "girl", "brown", "yellow");

var avatarGlobal = new Array();
//get  player's avatar person, haircolor and clothcolor
function GetPlayerAvatar(player_id) {   
    
    //var avatar = new Array();
    //avatarGlobal = new Array();
    if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();
    }
    else {
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            avatarGlobal = JSON.parse(xmlhttp.responseText);
            //alert('avatar finished!')
           AvatarFinishedLoading();
        }
    };

    var PageToSendTo = document.location.href + "php/manage_global_db.php?";
    var action = "GetPlayerAvatar";
    var UrlToSend = PageToSendTo + "action=" + action + "&player_id=" + player_id;

    xmlhttp.open("GET", UrlToSend, true);
    xmlhttp.send();
}
      //GetPlayerAvatar(38);






