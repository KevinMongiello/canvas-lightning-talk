
window.addEventListener('load', () => {
	var stats = new Stats();
	stats.showPanel( 0 ); // 0: fps, 1: ms, 2: mb, 3+: custom
	document.body.appendChild( stats.dom );
	document.body.style.height = '100vh';
	document.body.style.width = '100vw';
	
	const text = document.createElement('div');
	text.className = 'text';
	document.body.appendChild(text);
	
	const writeText = (count) => {
		text.textContent = `# Objects: ${count}`;
	}
	let count = 0;
	writeText(count);
	
	let objs = [];
	document.body.addEventListener('click', createElements);
	
	const random255 = () => Math.floor(Math.random() * 155 + 100);
	function createElements(e) {
		const x = e.clientX;
		const y = e.clientY;
		const left = `${x}px`
		const top = `${y}px`;

		for (let i=0; i < 250; i++) {
			el = document.createElement('div');
			el.className = 'box';
			el.style.background = `rgb(${random255()}, ${random255()}, ${random255()})`
			el.style.left = 0;
			el.style.top = 0;
			el.style.transform = `translate(${left},${top})`;
			el.dataset.dx = Math.random() * 20;
			el.dataset.dy = Math.random() * 20;
			
			document.body.appendChild(el);
			objs.push(el);
		}

		writeText(count += 250);
	}
	
	let j;
	let obj;
	let objX, objY;
	function run() {
		stats.begin();
		
		for (j = 0; j < objs.length; j++) {
			obj = objs[j];		
			
			const split = obj.style.transform.split(',');
			const splitX = parseInt(split[0].slice(10));
			const splitY = parseInt(split[1].split(')'));
			objX = splitX + parseInt(obj.dataset.dx);
			objY = splitY + parseInt(obj.dataset.dy);

			obj.style.transform = `translate(${objX}px,${objY}px)`;
			if (objX >= window.innerWidth || objX <= 0) obj.dataset.dx *= -1;
			if (objY >= window.innerHeight || objY <= 0) obj.dataset.dy *= -1;
		}
	
		stats.end();
		requestAnimationFrame(run);
	}
	
	requestAnimationFrame(run);
	
});