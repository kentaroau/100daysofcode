
{
 
    const canvasWrapper = document.querySelector('.canvas-wrap');
    const canvas = canvasWrapper.querySelector('canvas');
    const poster = document.querySelector('.poster');
    const posterImg = poster.style.backgroundImage.match(/\((.*?)\)/)[1].replace(/('|")/g,'');

	const ctx = canvas.getContext('2d');
    const img = new Image();
    let imgRatio;
    let wrapperRatio;
    let newWidth;
    let newHeight;
    let newX;
    let newY;

    let pxFactor = 100;

    img.src = posterImg;
    img.onload = () => {
        const imgWidth = img.width;
        const imgHeight = img.height;
        imgRatio = imgWidth / imgHeight;
        setCanvasSize();
        render();
    };

    const setCanvasSize = () => {
        canvas.width = canvasWrapper.offsetWidth;
        canvas.height = canvasWrapper.offsetHeight;
    };

    const render = () => {
        const w = canvasWrapper.offsetWidth;
        const h = canvasWrapper.offsetHeight;

        newWidth = w;
        newHeight = h;
        newX = 0;
        newY = 0;
        wrapperRatio = newWidth / newHeight;

        if ( wrapperRatio > imgRatio ) {
            newHeight = Math.round(w / imgRatio);
            newY = (h - newHeight) / 2;
        } 
        else {
            newWidth = Math.round(h * imgRatio);
            newX = (w - newWidth) / 2;
        }

        // pxFactor will depend on the current typed password.
        // values will be in the range [1,100].
        const size = pxFactor;

        // turn off image smoothing - this will give the pixelated effect
        ctx.mozImageSmoothingEnabled = size === 1 ? true : false;
        ctx.webkitImageSmoothingEnabled = size === 1 ? true : false;
        ctx.imageSmoothingEnabled = size === 1 ? true : false;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        // draw original image to the scaled size
        ctx.drawImage(img, 0, 0, w*size, h*size);
        // then draw that scaled image thumb back to fill canvas
        // As smoothing is off the result will be pixelated
        ctx.drawImage(canvas, 0, 0, w*size, h*size, newX, newY, newWidth+.05*w, newHeight+.05*h);
    };

    window.addEventListener('resize', () => {
        setCanvasSize();
        render();
    });

}
