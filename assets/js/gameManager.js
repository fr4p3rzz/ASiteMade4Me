import { getAvailableTiles, createButton, createCenteredImage } from './functions.js';


export class GameManager {
    constructor(scene, map) {
        this.data = new Data();
        this.scene = scene;
        this.map = map;
        this.score = 0;
        this.timer = 0;
        this.timerEvent = null;
        this.scoreText = 0;
        this.timerText = this.formatTime(this.timer);
        this.availableTiles = null;
    }

    create() {
        this.background = this.scene.add.image(3, 3, 'background_large').setOrigin(0);
        this.background.setScale(0.4);
        this.background.setDepth(1000);
        this.background.setScrollFactor(0);

        this.background = this.scene.add.image(120, 3, 'name').setOrigin(0);
        this.background.setScale(1);
        this.background.setDepth(900);
        this.background.setScrollFactor(0);

        this.background = this.scene.add.image(260, 3, 'class').setOrigin(0);
        this.background.setScale(1);
        this.background.setDepth(900);
        this.background.setScrollFactor(0);

        this.downloadButton = createButton(this.scene, 85, 50, 'download_button', 'download resume', () => {
            const fileUrl = './assets/files/cv.pdf';
            window.open(fileUrl, '_blank');
        });

        this.creditsButton = createButton(this.scene, 85, 30, 'credits_button', 'credits', () => {
            createCenteredImage(this.scene, 'credits');
        });

        this.tutorialButton = createButton(this.scene, 85, 10, 'tutorial_button', 'tutorial', () => {
            createCenteredImage(this.scene, 'tutorial');
        });

        this.audioButton = createButton(this.scene, 85, 75, 'audio_on', '', () => {
            if(this.scene.sound.mute == false)
            {
                this.audioButton.setTexture('audio_off');
                this.scene.sound.mute = true;
            }
            else
            {
                this.audioButton.setTexture('audio_on');
                this.scene.sound.mute = false;   
            }
        })

        this.ageText = this.scene.add.text(10, 7, 'Lv. ' + this.data.getAge(this.data.birthTimestamp), { fontSize: '11px', fill: '#FFF' });
        this.ageText.setScrollFactor(0);
        this.ageText.setDepth(2000);

        this.nameText = this.scene.add.text(10, 20, 'From:' + this.data.getNation(), { fontSize: '11px', fill: '#FFF' });
        this.nameText.setScrollFactor(0);
        this.nameText.setDepth(2000);

        this.timerText = this.scene.add.text(10, 32, this.timerText, { fontSize: '11px', fill: '#FFF' });
        this.timerText.setScrollFactor(0);
        this.timerText.setDepth(2000);

        this.scoreText = this.scene.add.text(10, 41, 'Score: ' + this.scoreText, { fontSize: '11px', fill: '#FFF' });
        this.scoreText.setScrollFactor(0);
        this.scoreText.setDepth(2000);

        this.timerEvent = this.scene.time.addEvent({
            delay: 1000, 
            callback: this.updateTimer,
            callbackScope: this,
            loop: true
        });

        this.availableTiles = getAvailableTiles(this.map.soilLayer, this.map.mountainsAndTreesLayer, this.map.mountainsAndTrees2Layer);

    }

    updateTimer() {
        this.timer++;
        const formattedTime = this.formatTime(this.timer);
        this.timerText.setText(formattedTime);
    }

    increaseScore(amount) {
        this.score += amount;
        this.scoreText.setText('Score: ' + this.score);
    }

    formatTime(seconds) {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const remainingSeconds = seconds % 60;
        return `${this.pad(hours)}:${this.pad(minutes)}:${this.pad(remainingSeconds)}`;
    }

    pad(value) {
        return String(value).padStart(2, '0');
    }
}

class Data {
    constructor() {
        this.dateOfBirth = new Date('1995-07-31');
        this.birthTimestamp = this.dateOfBirth.getTime();
        this.firstName = 'Francesco';
        this.lastName = 'Peruzzi';
        this.livingIn = 'Italy';
    }

    getNation()
    {
        return this.livingIn;
    }

    getName()
    {
        return this.firstName + " " + this.lastName;
    }

    getAge(timestamp) 
    {
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth() + 1; 
        const birthDate = new Date(timestamp);
        const birthYear = birthDate.getFullYear();
        const birthMonth = birthDate.getMonth() + 1; 

        let age = currentYear - birthYear;

        
        if (currentMonth < birthMonth) {
            age--; 
        } 
        else if (currentMonth === birthMonth) 
        { 
            const currentDay = currentDate.getDate();
            const birthDay = birthDate.getDate();
            if (currentDay < birthDay) {
                age--; 
            }
        }

        return age;
    }
}