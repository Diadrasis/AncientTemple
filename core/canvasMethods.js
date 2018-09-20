

var cursorType = Object.freeze(
    {
        "auto":'auto', 
        "default": 'default', 
        "pointer": 'pointer', 
        "move": 'move', 
        "help": 'help', 
        "no-drop": 'no-drop', 
        "wait": 'wait', 
        "none": 'none', 
        "crosshair": 'crosshair'
    });

function mouseSetCursor(type){
    game.canvas.style.cursor = type;
}

function loadScript(url, callback){

    var script = document.createElement("script");
    script.type = "text/javascript";

    if (script.readyState){  //IE
        script.onreadystatechange = function(){
            if (script.readyState == "loaded" ||
                    script.readyState == "complete"){
                script.onreadystatechange = null;
                callback();
            }
        };
    } else {  //Others
        script.onload = function(){
            callback();
        };
    }

    script.src = url;
    document.getElementsByTagName("head")[0].appendChild(script);
}

var doc;
var myWindow;

function setAutoresize()
{
    myWindow.onload = function () {
        resize();
        myWindow.addEventListener("resize", resize, false);
    }
}

// Fullscreen
function fs_status() {
    if (doc.fullscreenElement) {
        return true;
    }
    else if (doc.webkitFullscreenElement) {
        return true;
    }
    else if (doc.mozFullScreenElement) {
        return true;
    }
    else {
        return false;
    }
}

function goFullscreen() {
    if (fs_status()) {
        return;
    }

    var el = doc.getElementsByTagName('canvas')[0];
    var requestFullScreen = el.requestFullscreen || el.msRequestFullscreen || el.mozRequestFullScreen || el.webkitRequestFullscreen;

    if (requestFullScreen) {
        requestFullScreen.call(el);
    }
}

function resize() {
    var canvas = document.querySelector("canvas");
    var windowWidth = window.innerWidth;
    var windowHeight = window.innerHeight;
    var windowRatio = windowWidth / windowHeight;
    var gameRatio = game.config.width / game.config.height;
    if (windowRatio < gameRatio) {
        canvas.style.width = windowWidth + "px";
        canvas.style.height = (windowWidth / gameRatio) + "px";
    }
    else {
        canvas.style.width = (windowHeight * gameRatio) + "px";
        canvas.style.height = windowHeight + "px";
    }
}