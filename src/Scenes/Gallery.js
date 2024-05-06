class Gallery extends Phaser.Scene{
    constructor(){
        super("galleryScene");
        this.my = {sprite: {}}



    }

    preload(){
        //this.load.setPath("./assets/");

        //this.load.image("assetReferenceName", "asset.png");

    }

    create(){
        let my = this.my;
        console.log("Test");

        //my.sprite.mainCharacter = this.add.sprite(x, y, "assetReferenceName");

        //this.aKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    }


    //updates every ticks
    update(){
        let my = this.my;

    }

}