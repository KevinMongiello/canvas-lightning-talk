const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d'); // '2d' | 'webgl'
let x = 0;
let y = 0;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function drawRect(x, y) {
	ctx.fillRect(x, y, 100, 100);
}

function clear() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function run() {
	const date = Date.now();
	ctx.fillStyle = `hsl(${(date / 10) % 360}, 75%, 75%)`;
	x = (x + 3) % canvas.width;
	clear();
	drawRect(x, y);

	requestAnimationFrame(run);
}

requestAnimationFrame(run);