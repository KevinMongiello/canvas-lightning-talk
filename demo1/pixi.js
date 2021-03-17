
window.addEventListener('load', () => {
	var stats = new Stats();
	stats.showPanel( 0 ); // 0: fps, 1: ms, 2: mb, 3+: custom
	document.body.appendChild( stats.dom );
	
	const app = new PIXI.Application({
		width: window.innerWidth,
		height: window.innerHeight,
		transparent: true,
	});

	document.body.appendChild(app.view);
	const batch = 1000;
	
	document.body.addEventListener('click', createElements);
	
	function makeRandomHex () {
		const r = Math.round(Math.random() * 255).toString(16);
		const g = Math.round(Math.random() * 255).toString(16);
		const b = Math.round(Math.random() * 255).toString(16);
		return `0x${r}${g}${b}`;
	}
	function createElements() {
		console.log('creatign elements')
		for (let i=0; i < batch; i++) {
			const newObj = new PIXI.Graphics();

			const hex = makeRandomHex();
			newObj.beginFill(hex);
			newObj.drawRect(0, 0, 64, 64);
			newObj.endFill();
			newObj.x = Math.random() * window.innerWidth * 0.95;
			newObj.y = Math.random() * window.innerHeight * 0.95;
			app.stage.addChild(newObj);
		}
	}

	createElements();

	const run = (delta) => {
		app.stage.children.forEach(child => {
			// child.beginFill(makeRandomHex());
			// child.endFill();
			child.x += 1 * delta
		});
	}

	app.ticker.add(delta => run(delta));
});