class Gallery extends Phaser.Scene{
    constructor(){
        super("galleryScene");
        this.my = {sprite: {}}

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

    }

    preload(){
        this.load.setPath("./assets/");

        //this.load.image("assetReferenceName", "asset.png");

        this.load.atlasXML("fishSheet", "fishSpritesheet.png", "fishSpritesheet.xml");

    
        this.load.image("Underwater_map", "fishTilesheet.png"); 
        this.load.tilemapTiledJSON("map", "UnderwaterMap.json");   
        
    
    }

    create(){



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
        

        this.curve = new Phaser.Curves.Spline(this.points);


        let my = this.my;
        console.log("Test");

        //my.sprite.mainCharacter = this.add.sprite(x, y, "fishSheet", atlas sprite name);
        my.sprite.mainCharacter = this.add.sprite(600, 50, "fishSheet", "fishTile_095.png");

        //this.aKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);

        this.aKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.dKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);


    }


    //updates every ticks
    update(){
        this.fish1cooldowncounter++;
        this.fish2cooldowncounter++;
        this.fish3cooldowncounter++;

        let my = this.my;

        

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
                my.sprite.hook.push(this.add.sprite(my.sprite.mainCharacter.x, my.sprite.mainCharacter.y, "fishSheet", "fishTile_095.png"));
            }
        }

        for (let hooks of my.sprite.hook){
            hooks.y += 20;
        }

        if(this.fish1cooldowncounter > this.fish1cooldown){
            if(my.sprite.fishType1.length < this.maxfishType1){
                my.sprite.fishType1.push(this.add.sprite(0, 300, "fishSheet", "fishTile_101.png"));
            }
            this.fish1cooldowncounter = 0
        }
        for (let fish of my.sprite.fishType1){
            fish.x += 20;
        }

        if(this.fish2cooldowncounter > this.fish2cooldown){
            if(my.sprite.fishType2.length < this.maxfishType2){
                my.sprite.fishType2.push(this.add.sprite(0, 500, "fishSheet", "fishTile_100.png"));
            }
            this.fish2cooldowncounter = 0;
        }
        for(let fish of my.sprite.fishType2){
            fish.x += 50;
        }



        if(this.fish3cooldowncounter > this.fish3cooldown){
            if(my.sprite.fishType3.length < this.maxfishType3){
                let fish = this.add.follower(this.curve, 0, 400, "fishSheet", "fishTile_101.png");
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
    }
    
    collides(a, b){
        if(Math.abs(a.x - b.x) > (a.displayWidth/2 + b.displayWidth/2)) return false;
        if(Math.abs(a.y - b.y) > (a.displayHeight/2 + b.displayHeight/2)) return false;
        return true;
    }

}