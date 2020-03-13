import {
    BackgroundRenderer,
    loadImage,
    isWebGLSupported
} from 'midori-bg';

// check WebGL support - usually unnecessary unless your browser requirements are dated
if (isWebGLSupported) {

    // pass in a canvas DOM element
    const renderer = new BackgroundRenderer(document.getElementById('canvas'));

    // the loadImage function returns a promise which you can use to load your images
    loadImage('https://w.wallhaven.cc/full/5w/wallhaven-5w82r1.jpg')
        // set background
        .then((image) => renderer.setBackground(image))
        // handle errors
        .catch(err => console.error(err));
}
