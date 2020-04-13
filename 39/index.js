import {
    BackgroundRenderer,
    loadImage,
    isWebGLSupported,
    TransitionType,
    EffectType,
    Easings,
    WipeDirection,
    SlideDirection
} from 'midori-bg';


function loadBackgroundImage(url, transitionType, renderer){


    loadImage(url)
        .then((image) => {
            // set a new background with a slide transition.
            renderer.setBackground(image, {
                type: transitionType,
                config: {
                    slides: 2,
                    intensity: 5,
                    duration: 1.5,
                    easing: Easings.Quintic.InOut,
                    direction: SlideDirection.Right,
                }
            });
            const effects = renderer.background.effects;

            effects.set(EffectType.Vignette, { darkness: 1, offset: 1 });
            effects.set(EffectType.VignetteBlur, { size: 3, radius: 1.5, passes: 2 });

            const camera = renderer.background.camera;
            camera.sway({
                x: 0.2,
                y: 0.15,
                z: 0.05,
                zr: 2
            }, {
                duration: 1.5,
                easing: Easings.Quadratic.InOut,
                loop: true,
            });

            const particles = renderer.background.particles;

            // generate two named groups of particles in the background.
            particles.generate([{
                    name: 'small',
                    amount: 200,
                    maxSize: 10,
                    maxOpacity: 0.8,
                    minGradient: 0.75,
                    maxGradient: 1.0,
                    color: 0xffffff,
                },
                {
                    name: 'large',
                    amount: 30,
                    minSize: 100,
                    maxSize: 150,
                    maxOpacity: 0.05,
                    minGradient: 1.0,
                    maxGradient: 1.0,
                    color: 0xffffff,
                },
            ]);

            // move the particles by a distance and angle in degrees with a transition.
            particles.move('small', {
                distance: 0.5,
                angle: 25
            }, {
                duration: 5,
                loop: true
            });
            particles.move('large', {
                distance: 0.4,
                angle: 35
            }, {
                duration: 5,
                loop: true
            });

            // sway the particles up to a given distance with a transition.
            particles.sway('small', {
                x: 0.025,
                y: 0.025
            }, {
                duration: 1.5,
                easing: Easings.Sinusoidal.InOut,
                loop: true
            });
            particles.sway('large', {
                x: 0.025,
                y: 0.025
            }, {
                duration: 1.5,
                easing: Easings.Sinusoidal.InOut,
                loop: true
            });


        })
        // handle errors
        .catch(err => console.error(err));

}
// check WebGL support - usually unnecessary unless your browser requirements are dated
if (isWebGLSupported) {

    // pass in a canvas DOM element
    const renderer = new BackgroundRenderer(document.getElementById('canvas'));
    const images = ['1.jpg', '2.jpg','3.png','4.jpg'];
    const transitionTypes = [TransitionType.Slide, TransitionType.Blur, TransitionType.Blend, TransitionType.Glitch];
    var imageIndex = 0;

    loadBackgroundImage(images[imageIndex], transitionTypes[imageIndex], renderer);
    setTimeout(function(){

        $('#heading'+imageIndex).toggleClass('is-active');


    }, 1000);


    $('.show-next').click(function(){
        $('#heading'+imageIndex).toggleClass('is-active');

        imageIndex++;
        loadBackgroundImage(images[imageIndex], transitionTypes[imageIndex], renderer);
        setTimeout(function(){
            $('#heading'+imageIndex).toggleClass('is-active');

        }, 600);

    });
    $('.show-prev').click(function(){
        $('#heading'+imageIndex).toggleClass('is-active');

        imageIndex--;
        loadBackgroundImage(images[imageIndex], transitionTypes[imageIndex], renderer);
        setTimeout(function(){
            $('#heading'+imageIndex).toggleClass('is-active');

        }, 600);

    });
}