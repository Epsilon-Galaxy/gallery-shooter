class Gallery extends Phaser.Scene{
    constructor(){
        super("galleryScene");
        this.my = {sprite: {}}

        this.my.sprite.hook = [];
        this.maxHooks = 3;


    }

    preload(){
        this.load.setPath("./assets/");

        //this.load.image("assetReferenceName", "asset.png");

        this.load.atlasXML("fishSheet", "fishSpritesheet.png", "fishSpritesheet.xml");

    }

    create(){
        let my = this.my;
        console.log("Test");

        //my.sprite.mainCharacter = this.add.sprite(x, y, "fishSheet", atlas sprite name);
        my.sprite.mainCharacter = this.add.sprite(600, 100, "fishSheet", "fishTile_095.png");

        //this.aKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);

        this.aKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.dKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        my.sprite.enemy = this.add.sprite(600, 600, "fishSheet", "fishTile_100.png");




    }


    //updates every ticks
    update(){
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
            if(this.collides(hooks, my.sprite.enemy)){
                console.log("They collided!");
                hooks.y = 900;
            }
        }

        my.sprite.hook = my.sprite.hook.filter((hook) => hook.y < 900);

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