const GoogleSpreadsheet = require('google-spreadsheet');
const { promisify } = require('util');
const creds = require('./blindData.json');


let enemy = {
	order : 0,
	name: '',
	hp : 0,
	room : 0,
	exprate : 0,
	boss : false,
}
let dataList = [];

export function getEnemy(){
	enemy.order = dataList.shift();
	enemy.name = dataList.shift();
	enemy.hp = dataList.shift();
	enemy.room = dataList.shift();
	enemy.exprate = dataList.shift();
	enemy.boss = dataList.shift();
	return enemy;
}


export async function accessSpreadsheet(){
	let i=0;
	const doc = new GoogleSpreadsheet('1mudNFXV2cmTJ0eNfrBHfQeyXpurrNe2-22L6ko_iAuU');
	await promisify(doc.useServiceAccountAuth)(creds);
	const info = await promisify(doc.getInfo)();
	const sheet = info.worksheets[0];

	const rows = await promisify(sheet.getRows)({offset: 1});

	const cells = await promisify(sheet.getCells)({
		'min-row' : 2,
		'max-row' : 4,
		'min-col' : 1,
		'max-col' : 6,
	})

	for(const cell of cells){
		dataList.push(cell.value);
	}
	enemy = getEnemy();
	console.table(enemy);
	enemy = getEnemy();
	console.table(enemy);

}

accessSpreadsheet();