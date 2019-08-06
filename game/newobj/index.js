/**
 * 使用面向对象，分解复杂的工程，不同于字面量对象，使用面向对象的方法，可以创建多个
 */
(function () {
    var MapManager = window.MapManager;
    var Hero = window.Hero;
    var prepare = window.prepare;
    var Monster = window.Monster;
    var constructCell = window.constructCell;

    // 画英雄
    function gameLogic(context, allSpriteImg, heroImg) {
        var hero = new Hero({x: 0, y: 0}, context, heroImg);
        var monster = new Monster({x: 100, y: 100}, context, allSpriteImg);
        // var monster2 = new Monster({x: 200, y: 200}, context, allSpriteImg);
        var cells = constructCell(context, allSpriteImg);
        var mapManager = new MapManager([cells, hero, monster]);
        mapManager.flush();
    }

    // 分开作业后，只要保障接口对齐即可
    prepare()
        .getResource(function (context, allSpriteImg, heroImg) {
            gameLogic(context, allSpriteImg, heroImg);
        });
})();