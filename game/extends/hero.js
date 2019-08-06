// 汪洋老师

var Body = window.Body;

function Hero({x, y}, context, img) {
    Body.call(this, {x, y}, context, img);
    this.imgPos = {
        x: 0,
        y: 0,
        width: 32,
        height: 32
    };
}

Hero.prototype = Object.create(Body.prototype);

Hero.prototype.desire = function ({x, y}) {
    return {
        x: this.rect.x + x * this._entityWidth,
        y: this.rect.y + y * this._entityWidth,
    };
};

Hero.prototype.walk = function (step) {

    const newPos = this.desire(step);

    Object.assign(this.rect, newPos);

    return true;
};

window.Hero = Hero;