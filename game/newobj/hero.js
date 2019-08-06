
// 汪洋老师
function Hero({x, y}, context, img) {
    this._entityWidth = 40;
    this.imgPos = {
        x: 0,
        y: 0,
        width: 32,
        height: 32
    };

    this.rect = {
        x,
        y,
        width: this._entityWidth,
        height: this._entityWidth
    };
    this.context = context;
    this.img = img;
}

Hero.prototype = {
    draw() {
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
    }
};

window.Hero = Hero;