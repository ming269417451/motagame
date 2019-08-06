function Body({x, y}, context, img) {

    this.imgPos = {};

    this._entityWidth = 40;

    this.alive = true;

    this.rect = {
        x,
        y,
        width: this._entityWidth,
        height: this._entityWidth
    };

    this.context = context;
    this.img = img;
}

Body.prototype = {

    drawBlood() {
        this.context.font = '16px "微软雅黑"';
        this.context.fillStyle = 'red';
        this.context.fillText('血量：' + this._bloodVolume,
                this.rect.x + this.rect.height - this._entityWidth,
                this.rect.y + this.rect.width + this._entityWidth / 2,
                this._entityWidth * 2, 5);
    },

    draw() {

        if (!this.checkAlive()) {
            return;
        }
        this.drawBlood();
        this.context
            .drawImage(
                this.img,
                this.imgPos.x,
                this.imgPos.y,
                this.imgPos.width,
                this.imgPos.height,
                this.rect.x,
                this.rect.y,
                this.rect.width,
                this.rect.height
            );
    },

    attacked(body) {
        this._bloodVolume -= body.getAttackVolume() - this._defenseVolume;
    },

    checkAlive: function () {
        if (this._bloodVolume <= 0) {
            this.alive = false;
        }
        return this.alive;
    },

    getRect: function () {
        return this.rect;
    },

    getAttackVolume: function () {
        return this._attackVolume;
    }
};

window.Body = Body;
