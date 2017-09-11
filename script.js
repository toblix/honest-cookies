const honestLabel = document.createElement('p');
honestLabel.id = 'honest-cookies';
honestLabel.className = 'title';

const cookiesEl = document.getElementById('cookies');
cookiesEl.parentNode.insertBefore(honestLabel, cookiesEl.nextElementSibling);

const luckyBank = (cps)=>cps*6000;
const luckyFrenzyBank = (cps)=>luckyBank(cps)*7;

const tick = function() {
	honestLabel.innerHTML = `
	<div class="honest-div">
		<span class="honest-label">Lucky Bank:</span>
		<span class="honest-amount">${Beautify(luckyBank(Game.cookiesPs))}</span>
	</div>
	<div class="honest-div">
		<span class="honest-label">Lucky Frenzy Bank:</span>
		<span class="honest-amount">${Beautify(luckyFrenzyBank(Game.cookiesPs))}</span>
	</div>
`;
};

// setInterval(tick, 500);
setTimeout(tick, 1000);