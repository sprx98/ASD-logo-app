// PRELOADER
window.onload = function () {
    document.querySelector('.loader-wrapper').remove();
}

// CANVAS SETTINGS
let imageLoader = document.getElementById('img-upload');
    imageLoader.addEventListener('change', handleImage, false);
let canvas = document.getElementById('img_canvas');
let ctx = canvas.getContext('2d');




// X = WIDTH && Y = HEIGHT
let imgLogo = document.getElementById("logo-top-right");
let logoPosition = [];
let image = {
    element: '',
    fullSize: [],
    displaySize: []
};

//function to load an image and set the src so it gets displayed    
/* let loadImg = function(event) {
    image.element = document.getElementById('output');
    image.element.src = URL.createObjectURL(event.target.files[0]);  
    init();
} */
function handleImage(e){
    let reader = new FileReader();
    reader.onload = function(event){
        image.element = new Image();
        image.element.onload = function(){
            checkImgSize();
            canvas.width = parseInt(image.displaySize[0].replace('px', ''));
            canvas.height = parseInt(image.displaySize[1].replace('px', ''));
            ctx.drawImage(image.element,0,0,parseInt(image.displaySize[0].replace('px', '')),parseInt(image.displaySize[1].replace('px', '')));
        }
            image.element.src = event.target.result;
    }
        reader.readAsDataURL(e.target.files[0]);    
        init(); 
}

// function to check image size
function checkImgSize() {

    image.fullSize = [image.element.naturalWidth, image.element.naturalHeight];
    console.log(image.fullSize + ' this is the full size of the image');
    if ((image.fullSize[0] < 1200 || image.fullSize[1] < 700) && (image.fullSize[0] != image.fullSize[1])) {
        image.displaySize = [image.fullSize[0] + 'px',image.fullSize[1] + 'px']
        setDisplayStyle(image.displaySize[0],image.displaySize[1])
    }
    // if img is in portrait mode, set the height to 800px and width to auto
    else if (image.fullSize[0] < image.fullSize[1]) {
        let autoWidth = ((image.fullSize[0] * (700 / image.fullSize[1])).toFixed(0)).toString() + 'px'; 
        image.displaySize = [autoWidth,'700px']
        setDisplayStyle(image.displaySize[0],image.displaySize[1])
    } 
    // if img is normal
    else if (image.fullSize[0] > image.fullSize[1]){
        let autoHeight = ((image.fullSize[1] * (1200 / image.fullSize[0])).toFixed(0)).toString() + 'px';
        image.displaySize = [('1200px'),autoHeight];
        setDisplayStyle(image.displaySize[0],image.displaySize[1]);
    }
    else if (image.fullSize[0] === image.fullSize[1]){
        image.displaySize = ['700px','700px'];
        setDisplayStyle(image.displaySize[0],image.displaySize[1]);
    }
    function setDisplayStyle(x,y,ratio){
        image.element.style.width = x;
        image.element.style.height = y;
    }
    document.getElementById('full-disp').innerHTML = (image.fullSize[0] + ' X ' + image.fullSize[1]);
    document.getElementById('disp-disp').innerHTML = (image.displaySize[0] + ' X ' + image.displaySize[1]);
    // set the canvas size
    document.querySelector('#img_canvas').style.width = image.displaySize[0];
    document.querySelector('#img_canvas').style.height = image.displaySize[1];
}
function clearCanvas(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// displan none on image 
function removeImage(){
    clearCanvas();
}
//function to display the logo over the image
function dispLogo(){
    //document.getElementById('logo-over').style.display = 'block';
    logoPosition[0] = (parseInt((image.displaySize[0]).replace('px', ''))-110);
    logoPosition[1] = (parseInt((image.displaySize[1]).replace('px', ''))-56);
    ctx.drawImage(imgLogo, logoPosition[0], logoPosition[1],100,46);
}
// hide logo
function hideLogo(){
    

}
// ivert logo color
function logoInvertColor(){
  
}
// logo side switch
function logoSideSwitch(){

}

//Export cavas
function exportToPNG(){
    
    let downloadLink = document.createElement('a');
    downloadLink.setAttribute('download', 'CanvasAsImage.png');
    let canvas = document.getElementById('img_canvas');
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
    
    /* check image size when img is loaded */
    /* image.element.onload = checkImgSize; */
    
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