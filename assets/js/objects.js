export class Coin extends Phaser.GameObjects.Sprite {
    constructor(scene, map, x, y, texture, gameManager) {
        super(scene, x, y, texture);

        this.gameManager = gameManager;
        this.map = map;
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);

        this.setScale(1); 
        this.setDepth(1); 

        this.body.setCollideWorldBounds(true);
        this.body.setBounce(0.2);

        this.scene.physics.add.collider(this, this.scene.character, this.handleCollision, null, this);

        this.anims.create({
            key: 'coin_spin',
            frames: this.anims.generateFrameNumbers('coin', { start: 0, end: 23 }),
            frameRate: 10,
            repeat: -1
        });

        this.play('coin_spin'); 
    }

    handleCollision(coin) 
    {
        this.collectCoin(coin, this.gameManager.availableTiles); 
    }

    collectCoin(coin, availableTiles) 
    {
        const soundEffect = this.scene.sound.add('pickup');
        soundEffect.setVolume(0.075);
        soundEffect.play();

        this.gameManager.increaseScore(1);
        if (availableTiles.length === 0) return;
    
        const randomIndex = Phaser.Math.RND.between(0, availableTiles.length - 1);
        const randomTile = availableTiles[randomIndex];
    
        const newPosX = randomTile.x + this.map.tileWidth / 2; 
        const newPosY = randomTile.y + this.map.tileHeight / 2; 
    
        coin.setPosition(newPosX, newPosY);
        coin.body.setVelocity(0, 0);
        coin.body.setAllowRotation(false);
    }
}