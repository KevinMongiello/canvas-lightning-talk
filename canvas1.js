window.addEventListener('load', () => {
	const canvas = document.getElementById('canvas');
	const ctx = canvas.getContext('2d');

	ctx.fillStyle = 'orange';

	const draw = () => {
		ctx.clearRect(0, 0, 300, 300);

		const x = Math.sin(Date.now() / 1000) * 100 + 100;
		const y = Math.sin(Date.now() / 1000) * 100 + 100
		ctx.fillRect(x, y, 100, 100);
		
		requestAnimationFrame(draw);
	};

	console.log('test"')

	requestAnimationFrame(draw);
});