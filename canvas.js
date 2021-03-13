window.addEventListener('load', () => {
	const canvas = document.getElementById('canvas');
	const ctx = canvas.getContext('2d');

	ctx.fillStyle = 'orange';
	ctx.fillRect(25, 25, 100, 200);
});