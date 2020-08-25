// PRELOADER
window.onload = function () {
    document.querySelector('.loader-wrapper').remove();
}

// X = WIDTH && Y = HEIGHT
let image = {
    element: '',
    fullSize: [],
    displaySize: []
};

//function to load an image and set the src so it gets displayed    
let loadImg = function(event) {
    image.element = document.getElementById('output');
    image.element.src = URL.createObjectURL(event.target.files[0]);  
    init();
}

// function to check image size
function checkImgSize() {
    image.fullSize = [image.element.naturalWidth, image.element.naturalHeight];
    console.log(image.fullSize + ' this is the full size of the image');
    // if img is in portrait mode, set the height to 800px and width to auto
    if (image.fullSize[0] < image.fullSize[1]) {
        let autoWidth = ((image.fullSize[0] * (700 / image.fullSize[1])).toFixed(0)).toString() + 'px'; 
        image.displaySize = [autoWidth,'700px']
        image.element.style.width = image.displaySize[0];
        image.element.style.height = image.displaySize[1];
    } 
    // if img is normal
    else if (image.fullSize[0] > image.fullSize[1]){
        let autoHeight = ((image.fullSize[1] * (1000 / image.fullSize[0])).toFixed(0)).toString() + 'px';
        image.displaySize = ['1000px',autoHeight];
        image.element.style.width = image.displaySize[0];
        image.element.style.height = image.displaySize[1];
    }
    document.getElementById('full-disp').innerHTML = (image.fullSize[0] + ' X ' + image.fullSize[1]);
    document.getElementById('disp-disp').innerHTML = (image.displaySize[0] + ' X ' + image.displaySize[1]);
    // set the canvas size
    document.querySelector('.canvas').style.width = image.displaySize[0];
    document.querySelector('.canvas').style.height = image.displaySize[1];
}

// displan none on image 
function removeImage(){
    image.element.style.display = 'none';
    document.getElementById('full-disp').innerHTML = '';
    document.getElementById('disp-disp').innerHTML = '';
    document.getElementById('logo-over').style.display = 'none';
}
//function to display the logo over the image
function dispLogo(){
    document.getElementById('logo-over').style.display = 'block';
}
// hide logo
function hideLogo(){
    document.getElementById('logo-over').style.display = 'none';
}
// ivert logo color
function logoInvertColor(){
    if(document.querySelector('#logo-over').style.filter === 'invert(0)'){
        document.querySelector('#logo-over').style.filter = 'invert(1)';
    }
    else{
        document.querySelector('#logo-over').style.filter = 'invert(0)';
    }    
}
// logo side switch
function logoSideSwitch(){
    if(document.querySelector('#logo-over').style.left === '10px'){
        document.querySelector('#logo-over').style.removeProperty('left');
        document.querySelector('#logo-over').style.right = '10px';
    }
    else{
        document.querySelector('#logo-over').style.removeProperty('right');
        document.querySelector('#logo-over').style.left = '10px';    
    }  
}

//Export cavas
function exportToPNG(){
    
    let downloadLink = document.createElement('a');
    downloadLink.setAttribute('download', 'CanvasAsImage.png');
    let canvas = document.getElementById('canvas');
    console.log(canvas);
    let dataURL = canvas.toDataURL('image/png');
    let url = dataURL.replace(/^data:image\/png/, 'data:application/octet-stream');
    downloadLink.setAttribute('href', url);
    downloadLink.click();
    
}

function init(){
    //setup eventlisteners
    let btn = {
        removeImg: 'img-remove',
        displayLogo: 'logo-display',
        hideLogo: 'hide-logo',
        switchLogoSide: 'logo-switch-side',
        invertLogoColor: 'logo-invert-color',
        exportImage: 'export-img'
    };
    //remove image hides the img, this line sets it back to block
    image.element.style.display = 'block';
    /* check image size when img is loaded */
    image.element.onload = checkImgSize;
    
    /* if remove image is pressed remov the image */
    document.getElementById(btn.removeImg).addEventListener("click", removeImage);
    
    // toggle the logo display
    document.getElementById(btn.displayLogo).addEventListener("click", dispLogo);
    document.getElementById(btn.hideLogo).addEventListener("click", hideLogo);
    
    // change the color of the logo
    document.getElementById(btn.invertLogoColor).addEventListener("click", logoInvertColor);

    // change the logo side
    document.getElementById(btn.switchLogoSide).addEventListener("click", logoSideSwitch);

    // Export canvas to imagee
    document.getElementById(btn.exportImage).addEventListener("click", exportToPNG);
}