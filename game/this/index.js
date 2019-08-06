/**
 * 使用面向对象，分解复杂的工程
 */
// (function () {
//     // 前面准备
//     function prepare(cb) {
//         const imgTask = (img, src) => {
//             return new Promise((resolve, reject) => {
//                 img.onload = resolve;
//                 img.onerror = reject;
//                 img.src = src;
//             });
//         };

//         const context = document.getElementById('content').getContext('2d');
//         const allSpriteImg = new Image();
//         const heroImg = new Image();

//         const resourcesTasks = Promise
//             .all([
//                 imgTask(allSpriteImg, './all.jpg'),
//                 imgTask(heroImg, './hero.png')
//             ]);

//         return {
//             getResource: function (cb) {
//                 resourcesTasks.then(function () {
//                     cb && cb(context, allSpriteImg, heroImg);
//                 });
//             }
//         };
//     }

//     // 画英雄
//     function gameLogic(context, allSpriteImg, heroImg) {

//         Hero_entityWidth = 40;

//         var hero = {
//             imgPos: {
//                 x: 0,
//                 y: 0,
//                 width: 32,
//                 height: 32
//             },
//             rect: {
//                 x: 0,
//                 y: 0,
//                 width: Hero_entityWidth,
//                 height: Hero_entityWidth
//             },
//             context: context,
//             img: heroImg,
//             draw() {
//                 this.context
//                     .drawImage(
//                         this.img,
//                         this.imgPos.x,
//                         this.imgPos.y,
//                         this.imgPos.width,
//                         this.imgPos.height,
//                         this.rect.x,
//                         this.rect.y,
//                         this.rect.width,
//                         this.rect.height
//                     );
//             }
//         };



//         Monster_entityWidth = 40;

//         var monster = {
//             imgPos: {
//                 x: 925,
//                 y: 35,
//                 width: 30,
//                 height: 30
//             },
//             rect: {
//                 x: 100,
//                 y: 100,
//                 width: Monster_entityWidth,
//                 height: Monster_entityWidth
//             },
//             context: context,
//             img: allSpriteImg,
//             draw() {
//                 this.context
//                     .drawImage(
//                         this.img,
//                         this.imgPos.x,
//                         this.imgPos.y,
//                         this.imgPos.width,
//                         this.imgPos.height,
//                         this.rect.x,
//                         this.rect.y,
//                         this.rect.width,
//                         this.rect.height
//                     );
//             }
//         };

//         // 袁鑫

//         var mapManager = {
//             elements: [hero, monster],

//             addElement(element) {
//                 this.elements.push(element);
//             },

//             removeElement(removingElement) {
//                 this.elements = this.elements.filter(element => element !== removingElement);
//             },

//             flush() {
//                 this.elements.forEach(function (element) {
//                     // var draw = element.draw;
//                     // draw();
//                     element.draw();
//                 });
//             }
//         };

//         mapManager.flush();
//     }

//     // 分开作业后，只要保障接口对齐即可
//     prepare()
//         .getResource(function (context, allSpriteImg, heroImg) {
//             gameLogic(context, allSpriteImg, heroImg);
//         });
// })();

// 问题来了！觉得draw特别麻烦？
(function () {
    // 前面准备
    function prepare(cb) {
        const imgTask = (img, src) => {
            return new Promise((resolve, reject) => {
                img.onload = resolve;
                img.onerror = reject;
                img.src = src;
            });
        };

        const context = document.getElementById('content').getContext('2d');
        const allSpriteImg = new Image();
        const heroImg = new Image();

        const resourcesTasks = Promise
            .all([
                imgTask(allSpriteImg, './all.jpg'),
                imgTask(heroImg, './hero.png')
            ]);

        return {
            getResource: function (cb) {
                resourcesTasks.then(function () {
                    cb && cb(context, allSpriteImg, heroImg);
                });
            }
        };
    }

    // 画英雄
    function gameLogic(context, allSpriteImg, heroImg) {


        function draw() {
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

        Hero_entityWidth = 40;

        var hero = {
            imgPos: {
                x: 0,
                y: 0,
                width: 32,
                height: 32
            },
            rect: {
                x: 0,
                y: 0,
                width: Hero_entityWidth,
                height: Hero_entityWidth
            },
            context: context,
            img: heroImg,
            // draw() {
            //     console.log(this);
            //     /* 如果这样，可能就会有问题 */
            //     draw();
            //     /* 可以怎样？使用call与apply，或者bind */
            // }
            draw: draw
        };

        Monster_entityWidth = 40;

        var monster = {
            imgPos: {
                x: 925,
                y: 35,
                width: 30,
                height: 30
            },
            rect: {
                x: 100,
                y: 100,
                width: Monster_entityWidth,
                height: Monster_entityWidth
            },
            context: context,
            img: allSpriteImg,
            draw: draw
        };

        // 袁鑫
        var mapManager = {
            elements: [hero, monster],

            addElement(element) {
                this.elements.push(element);
            },

            removeElement(removingElement) {
                this.elements = this.elements.filter(element => element !== removingElement);
            },

            flush() {
                this.elements.forEach(function (element) {
                    element.draw();
                });
            }
        };

        mapManager.flush();

    }

    // 分开作业后，只要保障接口对齐即可
    prepare()
        .getResource(function (context, allSpriteImg, heroImg) {
            gameLogic(context, allSpriteImg, heroImg);
        });
})();


// 那么问题又来了，我要弄10个8个的怪物，难道要拷贝代码么？接下来我们就来走进科学，不对走进创建对象。