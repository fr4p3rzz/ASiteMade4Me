export class ScrollableTextBox {
    constructor(scene, x, y, width, height, content, size = 11, hasBackGround = true) 
    {
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.content = content;
        this. typingTimer = null;

        if(hasBackGround)
        {
            // Text box background image
            this.backgroundImage = this.scene.add.image(this.x, this.y, 'textbox');
            this.backgroundImage.setOrigin(0);
            this.backgroundImage.setDepth(900);
            this.backgroundImage.setScale(this.width / this.backgroundImage.width, this.height / this.backgroundImage.height);
        }
        else
        {
            this.backgroundImage = this.scene.add.image(this.x, this.y, 'invisible_background');
            this.backgroundImage.setOrigin(0);
            this.backgroundImage.setDepth(900);
            this.backgroundImage.setScale(this.width / this.backgroundImage.width, this.height / this.backgroundImage.height); 
        }


        // Text writing zone
        this.zoneWidth = Math.max(this.backgroundImage.width * this.backgroundImage.scaleX, 1); 
        this.zoneHeight = Math.max(this.backgroundImage.height * this.backgroundImage.scaleY, 1); 
        this.graphics = this.scene.make.graphics();
        this.graphics.fillStyle(0xbbf000);
        this.graphics.fillRect(this.x, this.y + 7, this.zoneWidth, this.zoneHeight - 17);
        this.mask = new Phaser.Display.Masks.GeometryMask(this.scene, this.graphics);

        // Text itself
        this.text = this.scene.add.text(this.x + 10, this.y + 10, '', { font: size+'px Arial', fill: '#ffffff', wordWrap: { width: this.width - 15, useAdvancedWrap: true } });
        this.text.setMask(this.mask);
        this.text.setDepth(999);

        // this.totalTextHeight = this.content.length; 
        // this.minY = -(this.totalTextHeight - this.zoneHeight); 

        // this.zone = this.scene.add.zone(this.backgroundImage.x, this.backgroundImage.y, this.zoneWidth, this.zoneHeight).setOrigin(0).setInteractive();

        // this.zone.on('pointermove', pointer => {
        //     console.log(this.minY);
        //     if (pointer.isDown) {
        //         this.text.y += (pointer.velocity.y / 10);
        //         this.text.y = Phaser.Math.Clamp(this.text.y, this.minY, this.zoneHeight + 20);
        //     }
        // });

        this.showTextWithTypewriterEffect();
    }

    showTextWithTypewriterEffect() 
    {
        let currentIndex = 0;
        const textToDisplay = this.content;

        this.typingTimer = this.scene.time.addEvent({
            delay: 20, 
            callback: () => {
                if (currentIndex < textToDisplay.length) 
                {
                    this.text.setText(textToDisplay.substring(0, currentIndex + 1));
                    currentIndex++;
                } 
                else 
                {
                    this.typingTimer.destroy(); 
                }
            },
            loop: true
        });
    }

    destroy() {
        this.typingTimer.destroy(); 
        this.text.destroy();
        this.backgroundImage.destroy();
        this.mask.destroy();
        this.graphics.destroy();
    }
}