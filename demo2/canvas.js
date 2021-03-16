const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d'); // '2d' | 'webgl'

function drawRect(x, y, width, height) {
	ctx.fillRect(x, y, width, height);
}

function run() {
	ctx.fillStyle = 'orange';
	drawRect(25, 25, 100, 100);
}

run();

// TODOs!
// Change its color!
// Change its position / dimensions