import { Coin } from './objects.js';
import { ScrollableTextBox } from './messageManager.js';

export function getAvailableTiles(ground, obstacle1, obstacle2) {
    const availableTiles = [];

    ground.forEachTile(tile => {
        const tileObstacle1 = obstacle1.getTileAt(tile.x, tile.y);
        const tileObstacle2 = obstacle2.getTileAt(tile.x, tile.y);

        if (tile && tile.index !== -1 && !tileObstacle1 && !tileObstacle2) {
            availableTiles.push({ x: tile.pixelX, y: tile.pixelY });
        }
    });

    return availableTiles;
}

export function spawnCoins(scene, map, numberOfCoins, gameManager, ground, obstacle1, obstacle2) {
    const coinGroup = scene.physics.add.group();

    const availableTiles = getAvailableTiles(ground, obstacle1, obstacle2);

    for (let i = 0; i < numberOfCoins; i++) {
        const randomTile = Phaser.Math.RND.pick(availableTiles);
        const coin = new Coin(scene, map, randomTile.x, randomTile.y, 'coin', gameManager);
        coinGroup.add(coin);
    }
}


export function getAge(timestamp)
{
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const timestampDate = new Date(timestamp);
    const timestampYear = timestampDate.getFullYear();
    
    const yearsPassed = currentYear - timestampYear;
    
    return yearsPassed;
}

export function createButton(scene, x, y, imageKey, label, callback) {
    const button = scene.add.image(x, y, imageKey).setOrigin(0);
    button.setScale(0.4);
    button.setDepth(1000);
    button.setScrollFactor(0);
    button.setInteractive();
    let textbox = null;

    button.on('pointerover', () => {
        if(label != "")
        {
            textbox = new ScrollableTextBox(scene, button.x + 30 + scene.cameras.main.scrollX, button.y + scene.cameras.main.scrollY, 120, 30, label, 10);
        }
        button.setScale(1); 
        scene.game.canvas.style.cursor = 'pointer';

        const soundEffect = scene.sound.add('blip');
        soundEffect.setVolume(0.1);
        soundEffect.play();

    });

    button.on('pointerout', () => {
        if(label != "")
        {
            textbox.destroy();
        }
        button.setScale(0.4); 
        scene.game.canvas.style.cursor = 'default';
    });
    
    button.on('pointerdown', callback);

    return button;
}

export function createCenteredImage(scene, imageKey) {
    const Image = scene.add.image(scene.cameras.main.centerX, scene.cameras.main.centerY, imageKey).setOrigin(0.5);
    Image.setDepth(3000);
    Image.setScrollFactor(0);

    const closeButton = createButton(scene, (scene.cameras.main.centerX + Image.displayWidth / 2) - 7 , scene.cameras.main.centerY - Image.displayHeight / 2, 'close_button', '', () => {
        Image.destroy();
        closeButton.destroy();
    });
    closeButton.setDepth(4000);
}


