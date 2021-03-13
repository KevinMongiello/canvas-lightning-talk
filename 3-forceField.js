let canvasWidth;
let canvasHeight;

const { PI, atan2, abs, sqrt, random, round, tan } = Math;

window.addEventListener('load', () => {
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

	ctx.fillStyle = 'orange';
	const objs = generateObjs(5000)

	const draw = () => {
		ctx.clearRect(0, 0, canvasWidth, canvasHeight);
		let distance = 0;
		let angle = 0;
		let force = 0;
		let xforce = 0;
		let yforce = 0;
		let x, y;
		let colorScale = 10;

		objs.forEach(obj => {
			distance = obj.distance(mousePos.x, mousePos.y);
			angle = obj.angle(mousePos.x, mousePos.y);

			if (distance < 200) {
				force = ((200 - distance) / 20);
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

		// ctx.fillStyle = distance < 141.42 ? 'green' : 'orange';
		// ctx.font = '36px serif';

		// ctx.fillText(`mouse X,Y: ${mousePos.x.toFixed(0)}, ${mousePos.y.toFixed(0)}`, 300, 25)
		// ctx.fillText(`obj X, Y: ${boxPos.x.toFixed(0)}, ${boxPos.y.toFixed(0)}`, 300, 25 + 36)
		// ctx.fillText(`diff X, Y: ${x_diff.toFixed(0)}, ${y_diff.toFixed(0)}`, 300, 25 + 36 * 2)
		
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