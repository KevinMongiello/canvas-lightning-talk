window.addEventListener('load', () => {
	var stats = new Stats();
	stats.showPanel( 0 ); // 0: fps, 1: ms, 2: mb, 3+: custom
	document.body.appendChild( stats.dom );
	document.body.style.height = '100vh';
	document.body.style.width = '100vw';

	const mainWidth = 600;
	const mainHeight = 480;
	const boxHeight = 40;
	const boxWidth = 40;
	const batch = 50;
	
	const text = document.createElement('div');
	text.className = 'text count';
	document.body.appendChild(text);
	
	const writeText = (count) => {
		text.textContent = `# Objects: ${count}`;
	}
	let count = 0;
	writeText(count);
	
	let objs = [];
	document.body.addEventListener('click', createElements);
	const main = document.querySelector('main');
	
	const random255 = () => Math.floor(Math.random() * 155 + 100);
	function createElements(e) {
		const x = e.clientX;
		const y = e.clientY;
		const left = `${x}px`
		const top = `${y}px`;

		for (let i=0; i < batch; i++) {
			el = document.createElement('div');
			el.className = 'box';
			el.style.background = `rgb(${random255()}, ${random255()}, ${random255()})`
			el.style.top = top;
			el.style.left = left;
			el.dataset.dx = Math.random() * 20;
			el.dataset.dy = Math.random() * 20;
			
			main.appendChild(el);
			objs.push(el);
		}

		writeText(count += batch);
	}
	
	let j;
	let obj;
	let objX, objY;
	function run() {
		stats.begin();
		
		for (j = 0; j < objs.length; j++) {
			obj = objs[j];		
			
			objX = parseInt(obj.style.left) + parseInt(obj.dataset.dx);
			objY = parseInt(obj.style.top) + parseInt(obj.dataset.dy);
			obj.style.left = objX + 'px';
			obj.style.top = objY + 'px';
			if (objX >= mainWidth - boxWidth || objX <= 0) obj.dataset.dx *= -1;
			if (objY >= mainHeight - boxHeight || objY <= 0) obj.dataset.dy *= -1;
		}
	
		stats.end();
		requestAnimationFrame(run);
	}
	
	requestAnimationFrame(run);
	
});