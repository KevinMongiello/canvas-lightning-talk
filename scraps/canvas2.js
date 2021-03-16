window.addEventListener('load', () => {
	const canvas = document.getElementById('canvas');
	const ctx = canvas.getContext('2d');
	const mousePos = { x: Infinity, y: Infinity};
	const boxPos = { x: 0, y: 0 };
	let clickCount = 0;
	const counter = document.querySelector('#counter');
	const increment = () => {
		counter.textContent = ++clickCount;
	};
	const reset = () => {
		clickCount = 0;
		counter.textContent = clickCount;
	}
	// Resizing

	const canvasWidth = window.innerWidth;
	const canvasHeight = window.innerHeight;
	const halfWidth = canvasWidth / 2;
	const halfHeight = canvasHeight / 2;
	canvas.width = canvasWidth;
	canvas.height = canvasHeight;
	const boxWidth = 100;
	const boxHeight = 100;

	canvas.addEventListener('mousemove', (e) => {
		mousePos.x = e.clientX;
		mousePos.y = e.clientY;
	});

	canvas.addEventListener('mousedown', (e) => {
		const mouseX = e.clientX;
		const mouseY = e.clientY;
		if (mouseX > boxPos.x && mouseX < boxPos.x + boxWidth
			&& mouseY > boxPos.y && mouseY < boxPos.y + boxHeight) {
				increment();
			} else {
				reset();
			}
	})

	ctx.fillStyle = 'orange';

	const draw = () => {
		ctx.clearRect(0, 0, canvasWidth, canvasHeight);

		const now = Date.now();
		boxPos.x = Math.sin(now / 10000) * 0.7 * halfWidth + halfWidth + Math.cos(now / 10000) * 100 - 50;
		boxPos.y = Math.sin(now / 10000) * 0.7 * halfHeight + halfHeight + Math.cos(now / 7500) * 100 - 50;

		const x_diff = mousePos.x - boxPos.x;
		const y_diff = mousePos.y - boxPos.y;

		const distance = Math.sqrt(x_diff**2 + y_diff**2);

		ctx.fillStyle = distance < 141.42 ? 'green' : 'orange';

		ctx.fillRect(boxPos.x, boxPos.y, boxWidth, boxHeight);
		ctx.font = '36px serif';

		// ctx.fillText(`mouse X,Y: ${mousePos.x.toFixed(0)}, ${mousePos.y.toFixed(0)}`, 300, 25)
		// ctx.fillText(`obj X, Y: ${boxPos.x.toFixed(0)}, ${boxPos.y.toFixed(0)}`, 300, 25 + 36)
		// ctx.fillText(`diff X, Y: ${x_diff.toFixed(0)}, ${y_diff.toFixed(0)}`, 300, 25 + 36 * 2)
		
		requestAnimationFrame(draw);
	};

	requestAnimationFrame(draw);
});