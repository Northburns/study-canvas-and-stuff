import _ from 'lodash';
import * as PIXI from 'pixi.js';
global.PIXI = PIXI;
require("pixi-projection");

function component() {
    const app = new PIXI.Application({
        width: 800,
        height: 600,
        backgroundColor: 0x1099bb,
        resolution: window.devicePixelRatio || 1,
    });

    const texture = PIXI.Texture.from('imgs/parrot.png');

    const camera = new PIXI.projection.Camera3d();
    camera.setPlanes(300, 10, 1000, false);
    camera.position.set(app.screen.width / 2, 0);
    camera.position3d.y = -500; // camera is above the ground
    app.stage.addChild(camera);

    const groundLayer = new PIXI.projection.Container3d();
    groundLayer.euler.x = Math.PI / 2;
    camera.addChild(groundLayer);

    // Those two layers can have 2d objects inside
    // because they return everything to affine space

    const bgLayer = new PIXI.projection.Container3d();
    bgLayer.proj.affine = PIXI.projection.AFFINE.AXIS_X;
    camera.addChild(bgLayer);
    bgLayer.position3d.z = 80;

    const mainLayer = new PIXI.projection.Container3d();
    mainLayer.proj.affine = PIXI.projection.AFFINE.AXIS_X;
    camera.addChild(mainLayer);

    // FOOO
    const f = new PIXI.projection.Sprite3d(texture);
    groundLayer.addChild(f);


    // const texture = PIXI.Texture.from('imgs/parrot.png');
    // const container = new PIXI.Container();
    // app.stage.addChild(container);

    // for (let i = 0; i < 25; i++) {
    //     const bunny = new PIXI.Sprite(texture);
    //     bunny.anchor.set(0.5);
    //     bunny.x = (i % 5) * 40;
    //     bunny.y = Math.floor(i / 5) * 40;
    //     container.addChild(bunny);
    // }

    // container.x = app.screen.width / 2;
    // container.y = app.screen.height / 2;

    // // Center bunny sprite in local container coordinates
    // container.pivot.x = container.width / 2;
    // container.pivot.y = container.height / 2;

    // // Listen for animate update
    // app.ticker.add((delta) => {
    //     // rotate the container!
    //     // use delta to create frame-independent transform
    //     container.rotation -= 0.01 * delta;
    // });

    
    return app.view;
}

document.body.appendChild(component());
