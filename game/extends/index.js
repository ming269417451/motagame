/**
 * 当袁鑫老师开始写另一个怪物的时候，出现了问题
 * 1. 他不想看MAX老师的源码，MAX老师也不得不为自己的代码写文档（需要draw方法）
 * 2. 他只能复制粘贴一下MAX老师的源码
 * 3. 改标准的时候，大家得一起改（集体加班的惨状）
 */
(function () {

    var MapManager = window.MapManager;
    var Hero = window.Hero;
    var prepare = window.prepare;
    var Monster = window.Monster;
    var Wizard = window.Wizard;
    var constructCell = window.constructCell;

    // 画英雄
    function gameLogic({context, allSpriteImg, heroImg}) {
        var hero = new Hero({x: 0, y: 0}, context, heroImg);
        var monster = new Monster({x: 100, y: 100}, context, allSpriteImg);
        var wizard = new Wizard({x: 200, y: 200}, context, allSpriteImg);
        var cells = constructCell(context, allSpriteImg);
        var mapManager = new MapManager([cells, hero, monster, wizard]);

        document.onkeyup = function (event) {
                var keyMap = {
                    40: {x: 0, y: 1},
                    38: {x: 0, y: -1},
                    39: {x: 1, y: 0},
                    37: {x: -1, y: 0}
                };

                if (keyMap[event.keyCode]) {
                    hero.walk(keyMap[event.keyCode]);
                    mapManager.flush();
                }
        };


        mapManager.flush();
    }

    // 分开作业后，只要保障接口对齐即可
    prepare()
        .then(gameLogic);
})();