window.addEventListener('load', () => {
	const canvas = document.getElementById('canvas');
	const ctx = canvas.getContext('2d');

	const html = document.querySelector('html');
	const rem = parseInt(window.getComputedStyle(html).fontSize);

	// Resizing
	canvas.height = window.innerHeight- (2 * rem);
	canvas.width = window.innerWidth- (2 * rem);

	// makeRects(ctx);
	// drawLines(ctx);
	let painting = false;

	function startPosition() {
		painting = true;
		ctx.beginPath();
	}

	function finishedPosition() {
		painting = false;
	}

	function draw(e) {
		if (!painting) return;
		ctx.lineWidth = 10;
		ctx.lineCap = 'round';
		ctx.lineTo(e.clientX - 16, e.clientY - 16);
		ctx.stroke();
	}
	
	canvas.addEventListener('mousedown', startPosition)
	canvas.addEventListener('mouseup', finishedPosition)
	canvas.addEventListener('mousemove', draw)
})


function makeRects(ctx) {
	ctx.fillRect(0, 0, 200, 200)
	ctx.strokeStyle = 'red';
	ctx.strokeRect(100, 100, 200, 200);
	ctx.strokeStyle = 'blue';
	ctx.strokeRect(200, 200, 200, 200);
}

function drawLines (ctx) {
	ctx.beginPath();
	ctx.moveTo(100,100);
	ctx.lineTo(200,100);
	ctx.lineTo(150,175);
	ctx.closePath();
	ctx.stroke()
}