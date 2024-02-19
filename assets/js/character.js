export function createCharacter(scene) 
{
    const character = scene.physics.add.sprite(164, 184, 'idle_front');
    const anims = scene.anims;

    anims.create({
        key: 'walk_left',
        frames: anims.generateFrameNumbers('walk_left', { start: 0, end: 5 }), 
        frameRate: 10,
        repeat: -1
    });

    anims.create({
        key: 'walk_right',
        frames: anims.generateFrameNumbers('walk_right', { start: 0, end: 5 }), 
        frameRate: 10,
        repeat: -1
    });

    anims.create({
        key: 'walk_back',
        frames: anims.generateFrameNumbers('walk_back', { start: 0, end: 5 }), 
        frameRate: 10,
        repeat: -1
    });

    anims.create({
        key: 'walk_front',
        frames: anims.generateFrameNumbers('walk_front', { start: 0, end: 5 }), 
        frameRate: 10,
        repeat: -1
    });

    // Crea le animazioni di idle
    anims.create({
        key: 'idle_back',
        frames: anims.generateFrameNumbers('idle_back', { start: 0, end: 5 }), 
        frameRate: 10,
        repeat: -1
    });

    anims.create({
        key: 'idle_left',
        frames: anims.generateFrameNumbers('idle_left', { start: 0, end: 5 }), 
        frameRate: 10,
        repeat: -1
    });

    anims.create({
        key: 'idle_right',
        frames: anims.generateFrameNumbers('idle_right', { start: 0, end: 5 }), 
        frameRate: 10,
        repeat: -1
    });

    anims.create({
        key: 'idle_front',
        frames: anims.generateFrameNumbers('idle_front', { start: 0, end: 5 }), 
        frameRate: 10,
        repeat: -1
    });

    character.anims.play('idle_front');
    character.currentDirection = 'front';
    return character;
}