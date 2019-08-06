// MAX
var Body = window.Body;

function Monster({x, y}, context, img) {
    Body.call(this, {x, y}, context, img);
    this.imgPos = {
        x: 925,
        y: 35,
        width: 30,
        height: 30
    };
    this.attackAble = true;
    this._bloodVolume = 1000;
    this._attackVolume  = 170;
    this._defenseVolume  = 40;
}

Monster.prototype = Object.create(Body.prototype);

window.Monster = Monster;
