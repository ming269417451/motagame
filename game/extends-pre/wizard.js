// 袁鑫
function Wizard({x, y}, context, img) {
    this.imgPos = {
        x: 925,
        y: 265,
        width: 30,
        height: 30
    };
    this._entityWidth = 40;

    this.rect = {
        x,
        y,
        width: this._entityWidth,
        height: this._entityWidth
    };
    this.context = context;
    this.img = img;
}

Wizard.prototype = {
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

window.Wizard = Wizard;