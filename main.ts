// 1. إعداد البيئة والجاذبية
scene.setBackgroundColor(9) // لون السماء
stats.setTime(0)

// إنشاء شخصية ماريو اليمني (حمودي)
let hamoudi = sprites.create(img`
    . . . . f f f f . . . . 
        . . f f 4 4 4 4 f f . . 
            . . f e d e e d e f . . 
                . . f d d d d d d f . . 
                    . . f e d f d f e f . . 
                        . f f 1 1 1 1 1 1 f f . 
                            . f d 1 1 f f 1 1 d f . 
                                . f f 1 1 1 1 1 1 f f . 
                                    . . f d d d d d d f . . 
                                        . . f e e f f e e f . . 
                                            . . f f f . . f f f . . 
                                            `, SpriteKind.Player)

                                            // ضبط موقع البداية والفيزياء (الجاذبية والقفز)
                                            hamoudi.setPosition(20, 90)
                                            hamoudi.ay = 300 // جاذبية الأرض
                                            controller.moveSprite(hamoudi, 80, 0) // الحركة يميناً ويساراً فقط

                                            // أزرار القفز (عند الضغط على A أو سهم الأعلى)
                                            controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
                                                if (hamoudi.isHittingTile(CollisionDirection.Bottom)) {
                                                        hamoudi.vy = -140 // قوة القفز لأعلى
                                                                music.jumpUp.play()
                                                                    }
                                                                    })

                                                                    // 2. بناء الأرضية (رصف صنعاء القديمة)
                                                                    scene.setBackgroundImage(img`
                                                                        ................................................................................................................................................
                                                                            ................................................................................................................................................
                                                                                ................................................................................................................................................
                                                                                    ................................................................................................................................................
                                                                                        ................................................................................................................................................
                                                                                        `)

                                                                                        // بناء بلاط الأرضية
                                                                                        for (let i = 0; i < 160; i += 16) {
                                                                                            let ground = sprites.create(img`
                                                                                                    b b b b b b b b b b b b b b b b 
                                                                                                            b d d d d d d d d d d d d d d b 
                                                                                                                    b d b b b b b b b b b b b b d b 
                                                                                                                            b d b d d d d d d d d d d b d b 
                                                                                                                                    b d b d b b b b b b b b d b d b 
                                                                                                                                            b d b d b d d d d d b d b d b d b 
                                                                                                                                                    b b b b b b b b b b b b b b b b 
                                                                                                                                                            b d d d d d d d d d d d d d d b 
                                                                                                                                                                `, SpriteKind.Food)
                                                                                                                                                                    ground.setPosition(i + 8, 112)
                                                                                                                                                                        ground.setKind(SpriteKind.Player) // جعلها صلبة بشكل مبسط
                                                                                                                                                                        }

                                                                                                                                                                        // 3. تساقط القات (عنصر زيادة النقاط والسرعة)
                                                                                                                                                                        game.onUpdateInterval(2500, function () {
                                                                                                                                                                            let qat = sprites.create(img`
                                                                                                                                                                                    . . . 7 7 7 . . . 
                                                                                                                                                                                            . . 7 7 6 7 7 . . 
                                                                                                                                                                                                    . 7 7 6 6 6 7 7 . 
                                                                                                                                                                                                            . 7 6 6 6 6 6 7 . 
                                                                                                                                                                                                                    . . 7 7 6 7 7 . . 
                                                                                                                                                                                                                            . . . . 7 . . . . 
                                                                                                                                                                                                                                `, SpriteKind.Food)
                                                                                                                                                                                                                                    
                                                                                                                                                                                                                                        qat.setPosition(randint(40, 150), randint(30, 70))
                                                                                                                                                                                                                                        })

                                                                                                                                                                                                                                        // التقاط القات
                                                                                                                                                                                                                                        sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function (sprite, otherSprite) {
                                                                                                                                                                                                                                            otherSprite.destroy(effects.starStuff, 100)
                                                                                                                                                                                                                                                info.changeScoreBy(10)
                                                                                                                                                                                                                                                    music.powerUp.play()
                                                                                                                                                                                                                                                    })

                                                                                                                                                                                                                                                    // 4. ظهور العقبات (الأعداء)
                                                                                                                                                                                                                                                    game.onUpdateInterval(4000, function () {
                                                                                                                                                                                                                                                        let enemy = sprites.create(img`
                                                                                                                                                                                                                                                                . . . . 2 2 2 . . . . 
                                                                                                                                                                                                                                                                        . . . 2 2 2 2 2 . . . 
                                                                                                                                                                                                                                                                                . . 2 2 e e e 2 2 . . 
                                                                                                                                                                                                                                                                                        . . 2 e 2 e 2 e 2 . . 
                                                                                                                                                                                                                                                                                                . . 2 2 2 2 2 2 2 . . 
                                                                                                                                                                                                                                                                                                        . . . 2 2 2 2 2 . . . 
                                                                                                                                                                                                                                                                                                            `, SpriteKind.Enemy)
                                                                                                                                                                                                                                                                                                                
                                                                                                                                                                                                                                                                                                                    enemy.setPosition(160, 100)
                                                                                                                                                                                                                                                                                                                        enemy.vx = -40 // التحرك باتجاه حمودي
                                                                                                                                                                                                                                                                                                                        })

                                                                                                                                                                                                                                                                                                                        // الاصطدام بالعدو
                                                                                                                                                                                                                                                                                                                        sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
                                                                                                                                                                                                                                                                                                                            // إذا كان حمودي يقفز فوق العدو
                                                                                                                                                                                                                                                                                                                                if (hamoudi.vy > 0 && hamoudi.y < otherSprite.y) {
                                                                                                                                                                                                                                                                                                                                        otherSprite.destroy(effects.disintegrate, 100)
                                                                                                                                                                                                                                                                                                                                                hamoudi.vy = -100 // قفزة صغيرة عند القضاء على العدو
                                                                                                                                                                                                                                                                                                                                                        info.changeScoreBy(20)
                                                                                                                                                                                                                                                                                                                                                                music.baDing.play()
                                                                                                                                                                                                                                                                                                                                                                    } else {
                                                                                                                                                                                                                                                                                                                                                                            // خسارة
                                                                                                                                                                                                                                                                                                                                                                                    game.over(false, effects.melt)
                                                                                                                                                                                                                                                                                                                                                                                        }
                                                                                                                                                                                                                                                                                                                                                                                        })
                                                                                                                                                                                                                                                                                                                                                                                        
