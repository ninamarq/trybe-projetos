let paleta = document.getElementById('color-palette');
let colorPaleta = paleta.children;
for (let i = 0; i < colorPaleta.length; i++){
    colorPaleta[i].addEventListener('click', colorSelected);
}

function colorSelected(event) {
    let paleta = document.getElementById('color-palette');
    let colorPaleta = paleta.children;

    for (let i = 0; i < colorPaleta.length; i++){
        colorPaleta[i].className = 'color';
    }

    event.target.className = 'color selected';
}

let pixelBoard = document.getElementById('pixel-board');
let pixel = pixelBoard.children;
for (let i = 0; i < pixel.length; i++) {
    pixel[i].addEventListener('click', pixelColoring);
}

function pixelColoring(event) {
    let selectColor = document.getElementsByClassName('selected')[0];
    event.target.style.backgroundColor = selectColor.style.backgroundColor;
}

let buttonCleaner = document.getElementById('clear-board');
buttonCleaner.addEventListener('click', clearPixels);

function clearPixels() {
    for (let i = 0; i < pixel.length; i++) {
        pixel[i].style.backgroundColor = 'white';
    }
}
