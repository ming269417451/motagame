/**
 * 在不使用闭包的情况下，很多变量，要么就要放到全局变量上，要么就要散放在代码里
 */
// (function () {
//     // 前面准备
//     const context = document.getElementById('content').getContext('2d');
//     const heroImg = new Image();

//     heroImg.onload = function () {
//         // 画英雄
//         var imgPos = {
//             x: 0,
//             y: 0,
//             width: 32,
//             height: 32
//         };

//         var rect = {
//             x: 0,
//             y: 0,
//             width: 40,
//             height: 40
//         };

//         context
//             .drawImage(
//                 heroImg,
//                 imgPos.x,
//                 imgPos.y,
//                 imgPos.width,
//                 imgPos.height,
//                 rect.x,
//                 rect.y,
//                 rect.width,
//                 rect.height
//             );
//     };

//     heroImg.src = './hero.png';

// })();

/**
 * 利用闭包封装，我们可以一起协作，让他人享受到你的“胜利果实”
 */
(function () {
    // 前面准备

    // MAX
    function prepare() {
        const context = document.getElementById('content').getContext('2d');
        const heroImg = new Image();
        return {
            getResource: function (callback) {
                // if (heroImg.src) {
                //     callback && callback(context, heroImg);
                //     return ;
                // }
                heroImg.onload = function () {
                    callback && callback(context, heroImg);
                };
                heroImg.src = './hero.png';
            }
        };
    }

    // 画英雄，袁鑫
    function gameLogic(context, heroImg, pos) {

        var imgPos = {
            x: 0,
            y: 0,
            width: 32,
            height: 32
        };

        var rect = {
            x: pos.x || 0,
            y: pos.y || 0,
            width: 40,
            height: 40
        };

        context
            .drawImage(
                heroImg,
                imgPos.x,
                imgPos.y,
                imgPos.width,
                imgPos.height,
                rect.x,
                rect.y,
                rect.width,
                rect.height
            );
    }

    // 分开作业后，只要保障接口对齐即可
    const manager = prepare();

    manager
        .getResource(function (context, heroImg) {
            gameLogic(context, heroImg, {x: 0, y: 0});
        });

    // 也可以对多次应用到的数据做缓存
    const plusHeroBtn = document.getElementById('plusHero');
    plusHeroBtn.onclick = function () {
        manager.getResource(function (context, heroImg) {
            gameLogic(context, heroImg, {x: Math.random() * 100, y: Math.random() * 100});
        });
    };

})();