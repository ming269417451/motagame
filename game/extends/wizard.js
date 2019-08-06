// 袁鑫
var Body = window.Body;

function Wizard({x, y}, context, img) {
    Body.call(this, {x, y}, context, img);
    this.imgPos = {
        x: 925,
        y: 265,
        width: 30,
        height: 30
    };
}

Wizard.prototype = Object.create(Body.prototype);

window.Wizard = Wizard;