
class Vector2 {
    constructor(x, y) {
        this.X = x;
        this.Y = y;
        this.LengthSquared = (this.X * this.X + this.Y * this.Y);
        this.Length = Math.sqrt(this.LengthSquared);
        this.ToString = "(" + this.X + ", " + this.Y + ")";
    }
}

var DistanceBetween = function (x1, y1, x2, y2)
{
    var dx = x1 - x2;
    var dy = y1 - y2;

    return Math.sqrt(dx * dx + dy * dy);
};

function getRandomPosFromList(posList) {
    var randList = posList;
    var randPos = randList[Math.floor(Math.random() * randList.length)];
    DebugLog('next random position = ' + randPos);
    return randPos;
}

function shuffle(arra1) {
    var ctr = arra1.length, temp, index;

// While there are elements in the array
    while (ctr > 0) {
// Pick a random index
        index = Math.floor(Math.random() * ctr);
// Decrease ctr by 1
        ctr--;
// And swap the last element with it
        temp = arra1[ctr];
        arra1[ctr] = arra1[index];
        arra1[index] = temp;
    }
    return arra1;
}


function drawClock (graphics, x, y, timer, clockSize, xromaDeikti, xromaClock)
{
    //  Progress is between 0 and 1, where 0 = the hand pointing up and then rotating clockwise a full 360

    //  The frame
    this.graphics.lineStyle(3, xromaClock, 1);
    this.graphics.strokeCircle(x, y, this.clockSize);

    var angle;
    var dest;
    var p1;
    var p2;
    var size;

    //  The overall progress hand (only if repeat > 0)
    if (timer.repeat > 0)
    {
        size = this.clockSize * 0.9;

        angle = (360 * timer.getOverallProgress()) - 90;
        dest = Phaser.Math.RotateAroundDistance({ x: x, y: y }, x, y, Phaser.Math.DegToRad(angle), size);

        this.graphics.lineStyle(2, 0xff0000, 1);

        this.graphics.beginPath();

        this.graphics.moveTo(x, y);

        p1 = Phaser.Math.RotateAroundDistance({ x: x, y: y }, x, y, Phaser.Math.DegToRad(angle - 5), size * 0.7);

        this.graphics.lineTo(p1.x, p1.y);
        this.graphics.lineTo(dest.x, dest.y);

        this.graphics.moveTo(x, y);

        p2 = Phaser.Math.RotateAroundDistance({ x: x, y: y }, x, y, Phaser.Math.DegToRad(angle + 5), size * 0.7);

        this.graphics.lineTo(p2.x, p2.y);
        this.graphics.lineTo(dest.x, dest.y);

        this.graphics.strokePath();
        this.graphics.closePath();
    }

    //  The current iteration hand
    size = this.clockSize * 0.95;

    angle = (360 * timer.getProgress()) - 90;
    dest = Phaser.Math.RotateAroundDistance({ x: x, y: y }, x, y, Phaser.Math.DegToRad(angle), size);

    this.graphics.lineStyle(2, xromaDeikti, 1);

    this.graphics.beginPath();

    this.graphics.moveTo(x, y);

    p1 = Phaser.Math.RotateAroundDistance({ x: x, y: y }, x, y, Phaser.Math.DegToRad(angle - 5), size * 0.7);

    this.graphics.lineTo(p1.x, p1.y);
    this.graphics.lineTo(dest.x, dest.y);

    this.graphics.moveTo(x, y);

    p2 = Phaser.Math.RotateAroundDistance({ x: x, y: y }, x, y, Phaser.Math.DegToRad(angle + 5), size * 0.7);

    this.graphics.lineTo(p2.x, p2.y);
    this.graphics.lineTo(dest.x, dest.y);

    this.graphics.strokePath();
    this.graphics.closePath();
}
