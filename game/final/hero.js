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
    this._bloodVolume = 500;
    this._attackVolume = 70;
    this._defenseVolume = 40;
}

Hero.prototype = Object.create(Body.prototype);

Hero.prototype.desire = function ({x, y}) {
    return {
        x: this.rect.x + x * this._entityWidth,
        y: this.rect.y + y * this._entityWidth,
    };
};

Hero.prototype.walk = function (step, judge) {

    if (this.status === 'fighting') {
        return false;
    }

    const newPos = this.desire(step);

    if (typeof judge === 'function') {
        if (!judge(newPos)) {
            return false;
        }
    }

    Object.assign(this.rect, newPos);

    return true;
};

Hero.prototype.win = function () {
    console.log('awsl');
};

window.Hero = Hero;
