export function setupCamera(scene, map) {
    const centerX = scene.cameras.main.centerX;
    const centerY = scene.cameras.main.centerY;
    const viewportWidth = 480;
    const viewportHeight = 360;
    
    const x = centerX - (viewportWidth / 2);
    const y = centerY - (viewportHeight / 2);

    scene.cameras.main.setViewport(x, y, viewportWidth, viewportHeight);
    scene.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
}

export function setCharacterFollow(scene, character, map) {
    const centerX = scene.cameras.main.centerX;
    const centerY = scene.cameras.main.centerY;
    const viewportWidth = 480;
    const viewportHeight = 360;
    
    const x = centerX - (viewportWidth / 2);
    const y = centerY - (viewportHeight / 2);

    scene.cameras.main.setViewport(x, y, viewportWidth, viewportHeight);
    scene.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    scene.cameras.main.startFollow(character);
}