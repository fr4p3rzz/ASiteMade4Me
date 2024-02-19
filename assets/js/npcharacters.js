import { ScrollableTextBox } from './messageManager.js';

export class NPC {
    constructor(gameManager, scene, posX, posY, spritesheet, idleFramesCount, messages, minScore = 0) {
        this.gameManager = gameManager;
        this.minScore = minScore;
        this.messages = messages;
        this.spritesheet = spritesheet;
        this.messageIndex = 0;
        this.sprite = scene.physics.add.sprite(posX, posY, this.spritesheet);
        this.scene = scene;
        this.distanceFromCharacter = null;
        this.textbox = null;
        this.triggered = false;
        this.canInteract = true; 
        this.interactionCooldown = 1000; 
        const idleFrames = scene.anims.generateFrameNumbers(this.spritesheet, { start: 0, end: idleFramesCount });

        scene.anims.create({
            key: 'npcIdle_'+spritesheet,
            frames: idleFrames,
            frameRate: 6,
            repeat: -1
        });

        this.sprite.anims.play('npcIdle_'+spritesheet);

        const triggerNPC = this.triggerNPC.bind(this);
        scene.input.keyboard.on('keydown-ENTER', () => {
            if (this.canInteract) 
            {
                triggerNPC();
                this.canInteract = false; 
                setTimeout(() => {
                    this.canInteract = true; 
                }, this.interactionCooldown);
            }
        });
    }

    update() {
        this.checkDistanceFromCharacter();

        if (this.distanceFromCharacter >= 15 && this.triggered) {
            this.messageIndex++;

            if (this.messageIndex >= this.messages.length) {
                this.messageIndex = 0;
            }
            this.closeNPC();
        }
    }

    checkDistanceFromCharacter() 
    {
        this.distanceFromCharacter = Phaser.Math.Distance.Between(this.sprite.x, this.sprite.y, this.scene.character.x, this.scene.character.y);
    }

    triggerNPC() 
    {
        if (this.gameManager.score < this.minScore) 
        {
            if (this.distanceFromCharacter < 15 && !this.triggered) 
            {
                const message = "We will talk when you get " + this.minScore + " coins";
                this.textbox = new ScrollableTextBox(this.scene, this.sprite.x - 10, this.sprite.y + 10, 200, 100, message);
                this.triggered = true;
            } 
            else if (this.triggered) 
            {
                this.closeNPC();
            }

        } 
        else 
        {
            if (this.distanceFromCharacter < 15 && !this.triggered) 
            {
                const message = this.messages[this.messageIndex];
                this.textbox = new ScrollableTextBox(this.scene, this.sprite.x - 10, this.sprite.y + 10, 200, 100, message);
                this.triggered = true;
            } 
            else if (this.triggered) 
            {
                this.messageIndex++;

                if (this.messageIndex >= this.messages.length) 
                {
                    this.messageIndex = 0;
                }

                this.closeNPC();
            }
        }
    }

    closeNPC() 
    {
        this.textbox.destroy();
        this.textbox = null;
        this.triggered = false;
    }
}
