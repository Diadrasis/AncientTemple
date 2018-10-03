//********** GEOGRAPHY ********************//
//Read temples data from db
 function GeographyGetTemples() {
    var temples = new Array();
    photosTemplesGeography= [];
    var xmlhttp;
    if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();
    }
    else {
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }

    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            temples = JSON.parse(xmlhttp.responseText);
            for (var n = 0; n < temples.length; n++) {                    
                var photo = { templeid: temples[n][0], templeimg: temples[n][1], templename: temples[n][2], mapPos: { x: temples[n][3][0], y: temples[n][3][1] } };
                //DebugLog(photo.templename);
                photosTemplesGeography.push(photo);                      
            }     

            //cannot call both at the same time, read after temples compvared
            GeographyGetQuestions();
        }
    };

    var PageToSendTo = document.location.href + "php/geography_db.php?";
    var action = "selecttemples";
    var UrlToSend = PageToSendTo + "action=" + action + "&lang=" + languange;

    xmlhttp.open("GET", UrlToSend, true);
    xmlhttp.send();
}

//Read questions data from db
      //Read after GetTemples is compvared
      function GeographyGetQuestions() {
        var quests =new Array();
        questionsForGeography = [];
        var xmlhttp;
        if (window.XMLHttpRequest) {
            xmlhttp = new XMLHttpRequest();
        }
        else {
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }

        xmlhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {                 
                quests = JSON.parse(xmlhttp.responseText);
                for (var n = 0; n < quests.length; n++) {
                    var quest = { templeid: quests[n][0], questtext: quests[n][1], feedbacktext: quests[n][2]};
                    questionsForGeography.push(quest);
                }                 
            }
        };          
        var PageToSendTo = document.location.href + "php/geography_db.php?";
        var action = "selectquestions";
        var UrlToSend = PageToSendTo + "action=" + action + "&lang=" + languange;

        xmlhttp.open("GET", UrlToSend, true);
        xmlhttp.send();
    } 


//********** CONSTRUCTION ********************//
function ConstructionGetActivites() {
    //alert("activites were called!")
    //var activities = new Array();
    var xmlhttp;
    if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();
    }
    else {
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }

    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            //alert("activites were read");
            //activities were defined in construction
            activities = JSON.parse(xmlhttp.responseText);
            gameDataRead = true;
            //return activities;
            //alert('activities ' + activities[0]);
        }
    };
    //language = 'gr';
    var PageToSendTo = document.location.href + "php/construction_db.php?";
    var action = "select_activities";
    var UrlToSend = PageToSendTo + "action=" + action + "&lang=" + languange;
    xmlhttp.open("GET", UrlToSend, true);
    xmlhttp.send();
}

/************ SCULPTURES ************/
var sculptures=[];
function SculptureGetSculptures() {
    //alert("activites were called!")
    //var activities = new Array();
    var xmlhttp;
    if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();
    }
    else
    {
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }

    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {          
            sculptures = JSON.parse(xmlhttp.responseText);
            //after read, read TempleParts
            SculptureGetTempleParts();
        }
    };
    //language = 'gr';
    var PageToSendTo = document.location.href + "php/sculpture_db.php?";
    var action = "select_sculptures";
    var UrlToSend = PageToSendTo + "action=" + action + "&lang=" + languange;
    xmlhttp.open("GET", UrlToSend, true);
    xmlhttp.send();
}

var temple_parts = [];
function SculptureGetTempleParts() {
    //alert("activites were called!")
    //var activities = new Array();
    var xmlhttp;
    if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();
    }
    else {
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }

    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {          
            temple_parts = JSON.parse(xmlhttp.responseText);
            //inform sculpture scene thata data were read;
            //alert(temple_parts.length);
            SculptureDataRead();
        }
    };
    //language = 'gr';
    var PageToSendTo = document.location.href + "php/sculpture_db.php?";
    var action = "select_temple_parts";
    var UrlToSend = PageToSendTo + "action=" + action + "&lang=" + languange;
    xmlhttp.open("GET", UrlToSend, true);
    xmlhttp.send();
}


//types
var types_feedback = [];
function TypeGetFeedback() {    
    var xmlhttp;
    if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();
    }
    else {
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }

    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {          
            types_feedback = JSON.parse(xmlhttp.responseText);            
            newTypeGame();
        }
    };  
    var PageToSendTo = document.location.href + "php/type_db.php?";
    var action = "select_types_feedback";
    var UrlToSend = PageToSendTo + "action=" + action + "&lang=" + languange;
    xmlhttp.open("GET", UrlToSend, true);
    xmlhttp.send();
}
//TypeGetFeedback();

