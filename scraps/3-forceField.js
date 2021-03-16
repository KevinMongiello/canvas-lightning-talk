let canvasWidth;
let canvasHeight;

const { PI, atan2, abs, sqrt, random, round, tan } = Math;

window.addEventListener('load', () => {
	var stats = new Stats();
	stats.showPanel( 0 ); // 0: fps, 1: ms, 2: mb, 3+: custom
	document.body.appendChild( stats.dom );
	
	const canvas = document.getElementById('canvas');
	const ctx = canvas.getContext('2d');
	const mousePos = { x: Infinity, y: Infinity};

	canvasWidth = window.innerWidth;
	canvasHeight = 250;
	canvas.width = canvasWidth;
	canvas.height = canvasHeight;

	document.querySelector('#container').addEventListener('mousemove', (e) => {
		mousePos.x = e.clientX;
		mousePos.y = e.clientY;
	});

	const objs = generateObjs(5000)

	let distance = 0;
	let angle = 0;
	let force = 0;
	let xforce = 0;
	let yforce = 0;
	let x, y;
	let colorScale = 10;
	const fieldDistance = 125;

	const draw = () => {
		stats.begin();
		ctx.clearRect(0, 0, canvasWidth, canvasHeight);

		objs.forEach(obj => {
			distance = obj.distance(mousePos.x, mousePos.y);
			angle = obj.angle(mousePos.x, mousePos.y);

			if (distance < fieldDistance) {
				force = ((fieldDistance - distance) / 20);
				xforce = Math.cos(angle) * force;
				yforce = Math.sin(angle) * force;
				x = obj.x + xforce;
				y = obj.y + yforce;
				obj.hue = (obj.hue + xforce * colorScale) % 360;
				// obj.sat = (obj.sat + yforce * colorScale) % 100;
				// obj.lum = ((obj.lum + (xforce + yforce) * colorScale) % 100);
				obj.x = clamp(x, obj.w / 2, canvasWidth - obj.w / 2);
				obj.y = clamp(y, obj.h / 2, canvasHeight - obj.h / 2);
				obj.dx = xforce;
				obj.dy = yforce;
			} else {
				obj.dx = abs(obj.dx) < 50 ? obj.dx : obj.dx * 0.99;
				obj.dy = abs(obj.dy) < 50 ? obj.dy : obj.dy * 0.99;

				obj.x = obj.x + obj.dx;
				obj.y = obj.y + obj.dy;
				if (obj.x <= 0 || obj.x >= canvasWidth) obj.dx *= -1
				if (obj.y <= 0 || obj.y >= canvasHeight) obj.dy *= -1
				
			}

			ctx.fillStyle = `hsl(${obj.hue}, ${obj.sat}%, ${obj.lum}%)`;
			ctx.fillRect(
				obj.x - obj.w / 2,
				obj.y - obj.h /2,
				obj.w,
				obj.h
			);
		})

		stats.end();
		requestAnimationFrame(draw);
	};

	requestAnimationFrame(draw);
});

function generateObjs(number) {
	const objs = [];
	for (let i=0; i < number; i++) {
		objs.push(new Obj({
			x: round(random() * canvasWidth * 0.9 + 25),
			y: round(random() * canvasHeight * 0.9 + 25),
			w: random() * 100 + 1,
			h: random() * 100 + 1
		}));
	}
	return objs;
}

class Obj {
	constructor(config) {
		Object.assign(this, config);
		this.hue = 25;
		this.sat = 75;
		this.lum = 50;
		this.dx = 0;
		this.dy = 0;
	}

	distance(x, y) {
		return sqrt(
			(x - this.x) ** 2 +
			(y - this.y) ** 2
		);
	}

	angle(x, y) {
		let theta = atan2(y - this.y , x - this.x);
		return theta + Math.PI;
	}
}

function clamp(value, min, max) {
	return Math.max(Math.min(value,max), min);
}