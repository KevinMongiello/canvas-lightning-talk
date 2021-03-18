// local "globals"
const { PI, atan2, abs, sqrt, random, round, tan, sin, cos } = Math;
const mouse = { x: Infinity, y: Infinity};
let canvasHeight, canvasWidth;
const coefficients = { 
	field: 125,
	color: 10
};
// Predefine params to
// avoid declarations + memory allocation inside loop
const params = {
	distance: 0,
	angle: 0,
	force: 0,
	xforce: 0,
	yforce: 0,
}

/**
 * 
 * 
 * LOOK HERE  |
 *            |
 *            V
 */
function setupCanvas(canvasSelector, width = window.innerWidth, height = 250) {
	const canvas = document.querySelector(canvasSelector);
	const ctx = canvas.getContext('2d');
	
	canvas.width = canvasWidth = width;
	canvas.height =	canvasHeight = height;

	return ctx;
}

function paint(obj, ctx) {
	ctx.fillStyle = `hsl(${obj.hue}, ${obj.sat}%, ${obj.lum}%)`;
	ctx.fillRect(
		obj.x,
		obj.y,
		obj.w,
		obj.h
	);
}


window.addEventListener('load', () => {
	mouseListener(mouse);
	const stats = fpsStats();
	const ctx = setupCanvas('#canvas');
	const objs = generateObjs(5000);
/**
 * 
 * 
 * WHERE THE MAGIC (animation) HAPPENS !! 
 *              |
 *              |
 *              V
 */

	const animate = () => {
		stats.begin(); // fps monitor
		ctx.clearRect(0, 0, canvasWidth, canvasHeight); // clear canvas for a fresh paint

		// render and paint
		for (obj of objs) {
			render(obj, params, coefficients, mouse);
			paint(obj, ctx);
		}

		stats.end();
		requestAnimationFrame(animate);
	}

	animate();
});







function render(obj, params, coefficients, mouse) {
	params.distance = obj.distance(mouse.x, mouse.y);
	params.angle = obj.angle(mouse.x, mouse.y);
	
	// If mouse is within range of obj
	if (params.distance < coefficients.field) {
		// the closer to the box, the bigger the force
		params.force = ((coefficients.field - params.distance) / 20);
		params.xforce = cos(params.angle) * params.force;
		params.yforce = sin(params.angle) * params.force;
		params.x = obj.x + params.xforce;
		params.y = obj.y + params.yforce;

		obj.hue = (obj.hue + params.xforce * coefficients.color) % 360;
		// obj.sat = (obj.sat + params.yforce * coefficients.color) % 50 + 50;
		// obj.lum = (obj.lum + (params.xforce + params.yforce) * coefficients.color) % 50 + 50;
		obj.x = clamp(params.x, obj.w / 2, canvasWidth - obj.w / 2);
		obj.y = clamp(params.y, obj.h / 2, canvasHeight - obj.h / 2);
		obj.dx = params.xforce;
		obj.dy = params.yforce;
	} else {
		// Keep the objects in drift, slowly reducing speed (dx,dy) over time
		obj.dx = abs(obj.dx) < 50 ? obj.dx : obj.dx * 0.99;
		obj.dy = abs(obj.dy) < 50 ? obj.dy : obj.dy * 0.99;
		obj.x = obj.x + obj.dx;
		obj.y = obj.y + obj.dy;
		// Bounce off canvas walls
		if (obj.x <= 0) obj.dx = 1
		if (obj.x >= canvasWidth) obj.dx = -1
		if (obj.y <= 0) obj.dy *= 1
		if (obj.y >= canvasHeight) obj.dy *= -1
	}
}

function generateObjs(number) {
	const objs = [];
	for (let i=0; i < number; i++) {
		objs.push(new Obj({
			x: round(random() * canvasWidth * 0.9),
			y: round(random() * canvasHeight * 0.9),
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
		this.sat = 100;
		this.lum = 52.5;
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
		return theta + PI;
	}
}

function clamp(value, min, max) {
	return Math.max(Math.min(value,max), min);
}

function fpsStats() {
	const stats = new Stats();
	stats.showPanel( 0 ); // 0: fps, 1: ms, 2: mb, 3+: custom
	document.body.appendChild( stats.dom )
	return stats;
}

function mouseListener(mouse) {
	const container = document.querySelector('#container');
	container.addEventListener('mousemove', (e) => {
		const rect = container.getBoundingClientRect();
		mouse.x = e.clientX - rect.x;
		mouse.y = e.clientY - rect.y;
	});
}