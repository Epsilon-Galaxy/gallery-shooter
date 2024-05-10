class Gallery extends Phaser.Scene{
    constructor(){
        super("galleryScene");
        this.my = {sprite: {}}

        this.score = 0;

        this.my.sprite.hook = [];
        this.maxHooks = 3;

        this.my.sprite.fishType1 = [];
        this.maxfishType1 = 10;

        this.fish1cooldown = 20;
        this.fish1cooldowncounter= 0;

        this.my.sprite.fishType2 = [];
        this.maxfishType2 = 10;

        this.fish2cooldown = 55;
        this.fish2cooldowncounter = 0;

        this.my.sprite.fishType3 = [];
        this.maxfishType3 = 10;

        this.fish3cooldown = 150;
        this.fish3cooldowncounter = 0;


        this.mainTimerCounter = 60;
        this.tickCounter = 0;

        this.quota = 5000;

        this.gameOver = false;

    }

    preload(){
        this.load.setPath("./assets/");

        //this.load.image("assetReferenceName", "asset.png");

        this.load.atlasXML("fishSheet", "fishSpritesheet.png", "fishSpritesheet.xml");

        this.load.image("magic1", "magic_01.png");
        this.load.image("magic2", "magic_02.png");
        this.load.image("magic3", "magic_03.png");
        this.load.image("magic4", "magic_04.png");
        this.load.image("magic5", "magic_05.png");

        this.load.image("hookImage", "HookImage.png");

        this.load.audio("hookSound", "highDown.ogg");
        this.load.audio("catchSound", "pepSound3.ogg");
    
        this.load.image("Underwater_map", "fishTilesheet.png"); 
        this.load.tilemapTiledJSON("map", "UnderwaterMap.json"); 
        
        this.load.bitmapFont("KennyPixel", "KennyPixelFont_0.png", "KennyPixelFont.fnt");
        
    
    }

    create(){




        this.anims.create({
            key: "magic",
            frames: [
                { key: "magic1"},
                { key: "magic2"},
                { key: "magic3"},
                { key: "magic4"},
                { key: "magic5"},
            ],
            frameRate: 30,
            repeat: 2,
            hideOnComplete: true
        })

        this.map = this.add.tilemap("map", 16, 16, 80, 50);
        this.tileset = this.map.addTilesetImage("tiny-fish-packed", "Underwater_map");

        this.water = this.map.createLayer("Water", this.tileset, 0, 0);
        this.sand = this.map.createLayer("Sand", this.tileset, 0, 0);
        this.foliage = this.map.createLayer("Foliage", this.tileset, 0, 0);

    

        this.points = [
            0, 300,
            300, 200,
            600, 100,
            800, 300,
            1000, 200,
            1300, 0,
        ];

        this.pointsaftercatch = [
            1300, 1300,
            1400, 1400,
        ]
        

        this.curve = new Phaser.Curves.Spline(this.points);

        this.curveaftercatch = new Phaser.Curves.Spline(this.pointsaftercatch);


        let my = this.my;

        this.scoreText = this.add.bitmapText(0, 0, "KennyPixel", "Score: 0", 64);
        this.timeText = this.add.bitmapText(1000, 0, "KennyPixel", "Time: 60", 64);
        this.quotaText = this.add.bitmapText(0, 600, "KennyPixel", "Quota: " + this.quota, 64);
        this.gameOverText = this.add.bitmapText(450, 300, "KennyPixel", "GAME OVER", 64);
        this.nextLevelText = this.add.bitmapText(100, 400, "KennyPixel", "Retry? (Space)", 64)
        this.nextLevelText.visible = false;
        this.gameOverText.visible = false;



        console.log("Test");

        //my.sprite.mainCharacter = this.add.sprite(x, y, "fishSheet", atlas sprite name);
        my.sprite.mainCharacter = this.add.sprite(600, 50, "hookImage").setScale(2);

        //this.aKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);

        this.aKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.dKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);


    }


    //updates every ticks
    update(){
        let my = this.my;

        if(this.gameOver == false){
            this.fish1cooldowncounter++;
            this.fish2cooldowncounter++;
            this.fish3cooldowncounter++;
    
            this.tickCounter++;

            if(this.tickCounter >= 30){
                this.mainTimerCounter--;
                this.tickCounter = 0;
            }
    
            this.timeText.setText("Time: " + this.mainTimerCounter);

            if(this.aKey.isDown){
                my.sprite.mainCharacter.x -= 15;
                if (my.sprite.mainCharacter.x <= 25) my.sprite.mainCharacter.x = 25;
            }
            if(this.dKey.isDown){
                my.sprite.mainCharacter.x += 15;
                if(my.sprite.mainCharacter.x >=1175) my.sprite.mainCharacter.x = 1175;
            }
    
            if(Phaser.Input.Keyboard.JustDown(this.spaceKey)){
                if(my.sprite.hook.length < this.maxHooks){
                    this.sound.play("hookSound");
                    my.sprite.hook.push(this.add.sprite(my.sprite.mainCharacter.x, my.sprite.mainCharacter.y, "hookImage").setScale(2));
                }
            }
    
            for (let hooks of my.sprite.hook){
                hooks.y += 20;
                if(hooks.visible == true){
    
                    for (let fish1 of my.sprite.fishType1){
                        if(this.collides(fish1, hooks) == true){
                            this.sound.play("catchSound");
                            this.magic = this.add.sprite(hooks.x, hooks.y, "magic5").setScale(0.25).play("magic");
                            fish1.x += 1300;
                            hooks.y += 900;
                            this.score += 100;
                            this.scoreText.setText("Score: " + this.score);
                            console.log("plus 100 points");
                        }
                    }  
                    for (let fish2 of my.sprite.fishType2){
                        if(this.collides(fish2, hooks) == true){
                            this.sound.play("catchSound");
                            this.magic = this.add.sprite(hooks.x, hooks.y, "magic5").setScale(0.25).play("magic");
                            fish2.x += 1300;
                            hooks.y += 900;
                            this.score += 1000;
                            this.scoreText.setText("Score: " + this.score);
                            console.log("Plus 1000 points");
                        }
    
                    }
                    for (let fish3 of my.sprite.fishType3){
                        if(this.collides(fish3, hooks) == true){
                            this.sound.play("catchSound");
                            this.magic = this.add.sprite(hooks.x, hooks.y, "magic5").setScale(0.25).play("magic");
                            fish3.startFollow({from: 0, to: 1, delay: 0, duration: 10, ease: 'Sine.easeInOutBack', repeat: 0, yoyo: false, rotateToPath: true, rotationOffset: 0});
                            hooks.y += 900;
                            this.score += 500;
                            this.scoreText.setText("Score: " + this.score);
                            console.log("Plus 500 points");
                        }
                    }
    
                }
    
            }
    
            if(this.fish1cooldowncounter > this.fish1cooldown){
                if(my.sprite.fishType1.length < this.maxfishType1){
                    my.sprite.fishType1.push(this.add.sprite(0, 300, "fishSheet", "fishTile_078.png"));
                }
                this.fish1cooldowncounter = 0
            }
            for (let fish of my.sprite.fishType1){
                fish.x += 20;
            }
    
            if(this.fish2cooldowncounter > this.fish2cooldown){
                if(my.sprite.fishType2.length < this.maxfishType2){
                    my.sprite.fishType2.push(this.add.sprite(0, 500, "fishSheet", "fishTile_101.png"));
                }
                this.fish2cooldowncounter = 0;
            }
            for(let fish of my.sprite.fishType2){
                fish.x += 50;
            }
    
    
    
            if(this.fish3cooldowncounter > this.fish3cooldown){
                if(my.sprite.fishType3.length < this.maxfishType3){
                    let fish = this.add.follower(this.curve, 0, 400, "fishSheet", "fishTile_077.png");
                    fish.visible = false;
                    my.sprite.fishType3.push(fish);
                }
                this.fish3cooldowncounter = 0
            }
            for(let fish of my.sprite.fishType3){
                if(fish.visible == false){
                    fish.visible = true;
                    fish.startFollow({from: 0, to: 1, delay: 0, duration: 2000, ease: 'Sine.easeInOutBack', repeat: 0, yoyo: false, rotateToPath: true, rotationOffset: 0});
                }
                
            }
    
            my.sprite.hook = my.sprite.hook.filter((hook) => hook.y < 900);
            my.sprite.fishType1 = my.sprite.fishType1.filter((fish) => fish.x < 1300);
            my.sprite.fishType2 = my.sprite.fishType2.filter((fish) => fish.x < 1300);
            my.sprite.fishType3 = my.sprite.fishType3.filter((fish) => fish.x < 1300);
    
    
            if(Phaser.Input.Keyboard.JustDown(this.spaceKey)){
                this.scene.start("gallaryScene");
            }

            if(this.mainTimerCounter <= 0){
                this.gameOver = true;
                this.gameOverText.visible = true;
            }
    
        }

        else{
            

            this.gameOverText.visible = true;
            this.nextLevelText.visible = true;

            if(this.score > this.quota){
                this.nextLevelText.setText("Next Level (Space): Quota + 2000");
                this.quota += 2000;
            }

            if(Phaser.Input.Keyboard.JustDown(this.spaceKey)){
                this.score = 0;
                this.scoreText.setText("Score: " + this.score);
                this.quotaText.setText("Quota: " + this.quota);
                for(let fish of my.sprite.fishType3){
                    fish.x += 1300;
                }
                for(let fish of my.sprite.fishType2){
                    fish.x += 1300;
                }
                for(let fish of my.sprite.fishType1){
                    fish.x += 1300;
                }
                for(let hooks of my.sprite.hook){
                    hooks.y += 900;
                }

                my.sprite.hook = my.sprite.hook.filter((hook) => hook.y < 900);
                my.sprite.fishType1 = my.sprite.fishType1.filter((fish) => fish.x < 1300);
                my.sprite.fishType2 = my.sprite.fishType2.filter((fish) => fish.x < 1300);
                my.sprite.fishType3 = my.sprite.fishType3.filter((fish) => fish.x < 1300);
                this.fish1cooldowncounter = 0;
                this.fish2cooldowncounter = 0;
                this.fish3cooldowncounter = 0;
                this.mainTimerCounter = 60;
                this.gameOver = false;
                this.gameOverText.visible = false;
                this.nextLevelText.visible = false;
            }
        }
        





        

        
    }
    
    collides(a, b){
        if(Math.abs(a.x - b.x) > (a.displayWidth/2 + b.displayWidth/2)) return false;
        if(Math.abs(a.y - b.y) > (a.displayHeight/2 + b.displayHeight/2)) return false;
        return true;
    }

}