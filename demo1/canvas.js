window.addEventListener('load', () => {
	var stats = new Stats();
	stats.showPanel( 0 ); // 0: fps, 1: ms, 2: mb, 3+: custom
	document.body.appendChild( stats.dom );
	
	const canvas = document.querySelector('canvas');
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	const ctx = canvas.getContext('2d'); // '2d' | 'webgl'
	let objs = [];
	document.body.addEventListener('click', createElements);
	
	const random255 = () => Math.floor(Math.random() * 155 + 100);
	function createElements(e) {
		const x = e.clientX;
		const y = e.clientY;
		for (let i=0; i < 250; i++) {
			objs.push(new Obj({
				x: x + Math.random() * 100,
				y: y + Math.random() * 100,
				dx: Math.random() * 20,
				dy: Math.random() * -20,
				hue: Math.random() * 360,
				fill: `rgb(${random255()}, ${random255()}, ${random255()})`
			}));
		}
	}
	
	function drawRect(x, y) {
		ctx.fillRect(x, y, 100, 100);
	}
	
	function clear() {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
	}
	
	let j;
	let obj;
	function run() {
		stats.begin();
	
		clear();
		for (j = 0; j < objs.length; j++) {
			obj = objs[j];
			ctx.fillStyle = `hsl(${obj.hue}, 75%, 75%)`;
			// ctx.fillStyle = obj.fill;
			// ctx.fillStyle = `orange`;
			drawRect(obj.x, obj.y, 100, 100);
			obj.x += obj.dx;
			obj.y += obj.dy;
			if (obj.x >= canvas.width || obj.x <= 0) obj.dx *= -1;
			if (obj.y >= canvas.height || obj.y <= 0) obj.dy *= -1;

		}
	
		ctx.font = '48px Sans-Serif';
		ctx.fillStyle = 'black';
		ctx.fillText(`# of Objects: ${objs.length}`, 100, 36);
	
		stats.end();
		requestAnimationFrame(run);
	}
	
	requestAnimationFrame(run);
	
	class Obj {
		constructor(config) {
			Object.assign(this, config);
		}
	}
});