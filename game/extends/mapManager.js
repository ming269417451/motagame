// 袁鑫
function MapManager(elements) {
    this.elements = elements;
}

MapManager.prototype = {

    addElement(element) {
        this.elements.push(element);
    },

    removeElement(removingElement) {
        this.elements = this.elements.filter(element => element !== removingElement);
    },

    flush() {
        this.elements.forEach(function (element) {
            // var draw = element.draw;
            // draw();
            element.draw();
        });
    }
};

window.MapManager = MapManager;