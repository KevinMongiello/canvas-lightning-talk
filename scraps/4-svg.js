const numEls = 10000;

window.addEventListener('load', () => {
	var stats = new Stats();
	stats.showPanel( 0 ); // 0: fps, 1: ms, 2: mb, 3+: custom
	document.body.appendChild( stats.dom );

	let el;
	for (let i = 0; i < numEls; i++) {
		el = document.createElement('div');
		el.className = 'box';

		const top = (Math.random() * window.innerHeight);
		const left = (Math.random() * window.innerWidth);
		
		el.style.delay = i * 0.001 + 's';

		el.dataset.top = top;
		el.dataset.left = left;
		el.dataset.dx = 1;
		
		el.style.top = top + 'px';
		el.style.left = left + 'px';
		
		document.body.appendChild(el);
	}

	function draw() {
		stats.begin();
		
		let left;
		document
			.querySelectorAll('.box')
			.forEach(box => {
				left = parseFloat(box.style.left) + 1 * box.dataset.dx;
				box.style.left = left + 'px';
				if (left >= window.innerWidth || left <= 0) {
					box.dataset.dx *= -1;
				}
			});
		
		stats.end();

		requestAnimationFrame(draw);
	}

	// requestAnimationFrame(draw);

});