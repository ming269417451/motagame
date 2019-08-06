function constructCell(context, img) {
    var cells = [];
    var initCell = {
        icon: 'normal',
        imgPos: {
            x: 0,
            y: 0,
            width: 30,
            height: 30
        },
        mapPos: {}
    };
    var width = 15;
    var cellWidth = 20;
    for (var i = 0; i < width; i++) {
        cells[i] = [];
        for (var j = 0; j < width; j++) {
            cells[i][j] = JSON.parse(JSON.stringify(initCell));
            cells[i][j].mapPos = {
                x: i * cellWidth,
                y: j * cellWidth,
                width: cellWidth,
                height: cellWidth
            };
        }
    }
    return {

        getCells: function () {
            return cells;
        },

        decorateCell: function ({x, y}, value) {
            cells[x][y] = value;
        },

        forEach: function (cb) {
            cells.forEach(column => {
                column.forEach(cell => {
                    cb && cb(cell);
                });
            });
        },

        judgeIn: function (pos) {
            return (pos.x >= 0
                && pos.y >= 0
                && pos.x < width * cellWidth
                && pos.y < width * cellWidth);
        },

        draw: function () {
            this.forEach(cell => {
                const {imgPos, mapPos} = cell;
                context.drawImage(img, imgPos.x, imgPos.y,
                    imgPos.width, imgPos.height,
                    mapPos.x, mapPos.y, mapPos.width, mapPos.height);
            });
        }
    };
}

window.constructCell = constructCell;