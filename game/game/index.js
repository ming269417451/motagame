(function () {

    function Hero({x, y}, context, img) {

        this.bloodVolume = 5000;
        this.attackVolume  = 200;
        this.defenseVolume  = 50;

        this.entityWidth = 40;
        this.position = {
            x,
            y,
            width: this.entityWidth,
            height: this.entityWidth
        };
        this.context = context;
        this.img = img;
        this.imgPos = {
            x: 0,
            y: 0,
            width: 33,
            height: 33
        };
        this.alive = true;
    }

    Hero.prototype = {

        attack: function (body) {
            body.bloodVolume -= this.attackVolume - body.defenseVolume;
            body.checkAlive();
            this.status = 'fighting';
        },

        win: function () {
            this.status = 'normal';
        },

        checkAlive: function () {
            if (this.bloodVolume <= 0) {
                this.alive = false;
            }
            return this.alive;
        },

        desire: function ({x, y}) {
            return {
                x: this.position.x + x * this.entityWidth,
                y: this.position.y + y * this.entityWidth,
            };
        },

        walk: function (step, judge) {

            if (this.status === 'fighting') {
                return false;
            }

            const newPos = this.desire(step);

            if (typeof judge === 'function') {
                if (!judge(newPos)) {
                    return false;
                }
            }

            Object.assign(this.position, newPos);
            return true;
        },

        getPosition: function () {
            return this.position;
        },

        draw: function () {
            if (!this.checkAlive()) {
                return;
            }

            this.context.font = '16px "微软雅黑"';
            this.context.fillStyle = 'red';
            this.context.fillText('血量：' + this.bloodVolume,
                this.position.x + this.position.height - 40,
                this.position.y + this.position.width + 10, 50, 3);

            this.context
                .drawImage(
                    this.img, this.imgPos.x, this.imgPos.y,
                    this.imgPos.width, this.imgPos.height,
                    this.position.x, this.position.y, this.position.width, this.position.height
                );
        }
    };

    function Monster({x, y}, context, img) {

        this.bloodVolume = 500;
        this.attackVolume  = 70;
        this.defenseVolume  = 40;
        this.alive = true;

        this.attackAble = true;
        this.entityWidth = 40;
        this.position = {
            x,
            y,
            width: this.entityWidth,
            height: this.entityWidth
        };
        this.context = context;
        this.img = img;
        this.imgPos = {
            x: 925,
            y: 35,
            width: 30,
            height: 30
        };
    }

    Monster.prototype = {
        
        getPosition: function () {
            return this.position;
        },

        attack: function (body) {
            body.bloodVolume -= this.attackVolume - body.defenseVolume;
            body.checkAlive();
        },

        checkAlive: function () {
            if (this.bloodVolume <= 0) {
                this.alive = false;
            }
            return this.alive;
        },

        draw: function () {
            if (!this.checkAlive()) {
                return;
            }

            this.context.font = '16px "微软雅黑"';
            this.context.fillStyle = 'red';
            this.context.fillText('血量：' + this.bloodVolume,
                this.position.x - 5, 
                this.position.y - 5, 50, 3);

            this.context
                .drawImage(
                    this.img, this.imgPos.x, this.imgPos.y,
                    this.imgPos.width, this.imgPos.height,
                    this.position.x, this.position.y, this.position.width, this.position.height
                );
        }
    };

    function Wizard({x, y}, context, img) {
        this.entityWidth = 40;
        this.position = {
            x,
            y,
            width: this.entityWidth,
            height: this.entityWidth
        };
        this.attackAble = true;
        this.context = context;
        this.img = img;
        this.bloodVolume = 1000;
        this.attackVolume  = 100;
        this.defenseVolume  = 50;
        this.alive = true;
        this.imgPos = {
            x: 925,
            y: 265,
            width: 30,
            height: 30
        };
    }

    Wizard.prototype = {
        
        getPosition: function () {
            return this.position;
        },

        attack: function (body) {
            body.bloodVolume -= this.attackVolume - body.defenseVolume;
            body.checkAlive();
        },

        checkAlive: function () {
            if (this.bloodVolume <= 0) {
                this.alive = false;
            }
            return this.alive;
        },

        draw: function () {

            if (!this.checkAlive()) {
                return;
            }

            this.context.font = '16px "微软雅黑"';
            this.context.fillStyle = 'red';
            this.context.fillText('血量：' + this.bloodVolume,
                this.position.x - 5, 
                this.position.y - 5, 50, 3);
            
            this.context
                .drawImage(
                    this.img, this.imgPos.x, this.imgPos.y,
                    this.imgPos.width, this.imgPos.height,
                    this.position.x, this.position.y, this.position.width, this.position.height
                );
        }
    };

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
        var cellWidth = 40;
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

    function MapManager(cellManager, elements) {
        this.elements = elements;
        this.cellManager = cellManager;
    }

    MapManager.prototype = {

        addElement(element) {
            this.elements.push(element);
        },

        getElement({x, y}) {
            return this.elements.find(function (element) {
                const elementPos = element.getPosition();
                return elementPos.x === x && elementPos.y === y;
            });
        },

        removeElement(removingElement) {
            this.elements = this.elements.filter(element => element !== removingElement);
        },

        flush() {
            this.cellManager.draw();
            this.elements.forEach(function (element) {
                element.draw();
            });
        }

    };

    const imgTask = (img, src) => {
        return new Promise((resolve, reject) => {
            img.onload = resolve;
            img.onerror = reject;
            img.src = src;
        });
    };

    const context = document.getElementById('content').getContext('2d');
    const img = new Image();
    const heroImg = new Image();

    Promise
        .all([imgTask(img, './all.jpg'), imgTask(heroImg, './hero.png')])
        .then(() => {

            const cellManager = constructCell(context, img);
            const hero = new Hero({x: 0, y: 0}, context, heroImg);
            const monster = new Monster({x: 80, y: 40}, context, img);
            const wizard = new Wizard({x: 120, y: 120}, context, img);
            const mapManager = new MapManager(cellManager, [monster, hero, wizard]);
            mapManager.flush();

            document.onkeyup = function (event) {
                var keyMap = {
                    40: {x: 0, y: 1},
                    38: {x: 0, y: -1},
                    39: {x: 1, y: 0},
                    37: {x: -1, y: 0}
                };

                if (keyMap[event.keyCode]) {
                    hero.walk(keyMap[event.keyCode], function shouldElemetWalk(desirePos) {
                        const element = mapManager.getElement(desirePos);
                        if (element && element.attackAble) {
                            function fight() {
                                hero.attack(element);
                                element.attack(hero);
                                mapManager.flush();
                                if (hero.alive && element.alive) {
                                    setTimeout(() => {
                                        fight();
                                    }, 500);
                                }
                                else {
                                    hero.win();
                                    mapManager.removeElement(element);
                                }
                            }
                            fight();
                            return false;
                        }
                        return cellManager.judgeIn(desirePos);
                    });
                }
                mapManager.flush();
            };

        });
})();
