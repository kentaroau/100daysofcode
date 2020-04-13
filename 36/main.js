import { BackgroundRenderer, loadImage, isWebGLSupported } from './midori.js';
// check WebGL support - usually unnecessary unless your browser requirements are dated
if (isWebGLSupported) {

    // pass in a canvas DOM element
    const renderer = new BackgroundRenderer(document.getElementById('canvas'));
  
    // the loadImage function returns a promise which you can use to load your images.
    // the path can be a url or local path to a file. Make sure to check CORS if using a url.
    loadImage('https://aeroheim.github.io/midori/assets/1.jpg')
      // set background
      .then((image) => renderer.setBackground(image))
      // handle errors
      .catch(err => console.error(err));
  }
  