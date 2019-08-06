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
}

Monster.prototype = Object.create(Body.prototype);

window.Monster = Monster;
