window.addEventListener('load', () => {
	var stats = new Stats();
	stats.showPanel( 0 ); // 0: fps, 1: ms, 2: mb, 3+: custom
	const infoElement = document.querySelector('.info')
	const container = document.querySelector('.container')
	infoElement.appendChild( stats.dom );

	const canvasWidth = 600;
	const canvasHeight = 480;
	const boxWidth = 40;
	const boxHeight = 40;

	let count = 0;
	const countElement = document.createElement('span');
	countElement.className = 'text count'
	countElement.textContent = '# Objects: 0';
	infoElement.appendChild(countElement)
	
	const app = new PIXI.Application({
		width: canvasWidth,
		height: canvasHeight,
		backgroundColor: 0xFFFFFF
	});

	container.appendChild(app.view);
	const batch = 500;
	
	document.body.addEventListener('click', createElements);
	
	function makeRandomHex () {
		const r = Math.round(Math.random() * 255).toString(16);
		const g = Math.round(Math.random() * 255).toString(16);
		const b = Math.round(Math.random() * 255).toString(16);
		return `0x${r}${g}${b}`;
	}

	function createElements() {
		for (let i=0; i < batch; i++) {
			const newObj = new PIXI.Graphics();

			const hex = makeRandomHex();
			newObj.beginFill(hex);
			newObj.drawRect(0, 0, boxWidth, boxHeight);
			newObj.endFill();
			newObj.x = Math.random() * window.innerWidth * 0.95;
			newObj.y = Math.random() * window.innerHeight * 0.95;
			newObj.dx = 1;
			newObj.dy = 1;
			newObj.vx = Math.random() * 10
			newObj.vy = Math.random() * 10
			app.stage.addChild(newObj);
		}
		count += batch;
		countElement.textContent = `# Objects: ${count.toLocaleString('en-US')}`;
	}

	const speed = 2;
	let child;
	const run = (delta) => {
		stats.begin()
		for (child of app.stage.children) {
			if (child.x >= canvasWidth - boxWidth) child.dx = -1;
			if (child.x <= 0) child.dx = 1;
			if (child.y >= canvasHeight - boxHeight) child.dy = -1;
			if (child.y <= 0) child.dy = 1;
			child.x += child.vx * speed * child.dx * delta;
			child.y += child.vy *speed * child.dy * delta
		};
		stats.end();
	}

	app.ticker.add(delta => run(delta));
});