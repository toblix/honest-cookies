/*
 * Add honest labels
 */

const honestLabel = document.createElement('p');
honestLabel.id = 'honest-cookies';
honestLabel.className = 'title';

const cookiesEl = document.getElementById('cookies');
cookiesEl.parentNode.insertBefore(honestLabel, cookiesEl.nextElementSibling);


/*
 * Add copy stats button
 */


const copyStatsLink = document.createElement('a');
copyStatsLink.innerHTML = 'Copy stats';
copyStatsLink.href ="#";	// :O
copyStatsLink.onclick = e=> {
	e.preventDefault();

	// Copy-paste from CC
	const chipsOwned=Game.HowMuchPrestige(Game.cookiesReset);
	const ascendNowToOwn=Math.floor(Game.HowMuchPrestige(Game.cookiesReset+Game.cookiesEarned));
	const ascendNowToGet=ascendNowToOwn-Math.floor(chipsOwned);

	const date=new Date();
	date.setTime(Date.now()-Game.startDate);
	const timeInSeconds=date.getTime()/1000;
	const startDate=Game.sayTime(timeInSeconds*Game.fps,-1);

	const tmpElem = document.createElement('div');
	tmpElem.style.position = 'absolute';
	tmpElem.style.left = '-1000px';
	tmpElem.style.top = '-1000px';
	tmpElem.style.userSelect = 'auto';
	tmpElem.innerText = `
	Cookies baked (all time): ${Beautify(Game.cookiesEarned)}
	Prestige level: ${Beautify(Game.prestige)}
	Heavenly chips: ${Beautify(ascendNowToGet)}
	Run started: ${startDate} ago
	`.trim();
	document.body.appendChild(tmpElem);

	const range = document.createRange();
	range.selectNode(tmpElem);
	const selection = window.getSelection();
	selection.removeAllRanges();
	selection.addRange(range);

	let success;
	try {
		success = document.execCommand ("copy");
	} catch(e) {
		success = false;
	}
	tmpElem.parentNode.removeChild(tmpElem);
	if (!success) alert('Copying stats failed D:');
};

const copyStatsDiv = document.createElement('div');
copyStatsDiv.appendChild(copyStatsLink);
document.getElementById('topBar').appendChild(copyStatsDiv);



const frenzyDivisor = ({ buffs })=>buffs.includes('frenzy') ? 7 : 1;
const luckyBank = game=>game.cookiesPs*6000 / frenzyDivisor(game);
const luckyFrenzyBank = game=>luckyBank(game)*7;

const tick = function() {
	honestLabel.innerHTML = `
	<div class="honest-div">
		<span class="honest-label">Lucky Bank:</span>
		<span class="honest-amount">${Beautify(luckyBank(Game))}</span>
	</div>
	<div class="honest-div">
		<span class="honest-label">Lucky Frenzy Bank:</span>
		<span class="honest-amount">${Beautify(luckyFrenzyBank(Game))}</span>
	</div>
`;
};

const init = ()=> {
	if(Game.ready) setInterval(tick, 500);
	else setTimeout(init, 100);
};
init();