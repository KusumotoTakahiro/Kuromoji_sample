const DICT_PATH = "./dict";

async function analysis() {
	const text = await getText();
	getTokenizer()
	.then(tokenizer=>{
		const tokens = tokenizer.tokenize(text);
		//console.log(tokens);
		return Promise.resolve(tokens);
	})
	.then(tokens => {
		// 解析結果を順番に取得する
		let tl = tokens.length;
		for (let i=0; i < tl; i++) {
			let token = tokens[i];
			document.getElementById("myprogress").style.width=(i+1)*100/tl+"%";
			createTbody(token);
		}
	})
	.catch(()=>{
		let msg = 'tokensの取得失敗';
		console.log(msg);
	})
}

function getTokenizer() {
	return new Promise((resolve, reject) => {
		kuromoji.builder({dicPath: DICT_PATH}).build((err, tokenizer)=>{
			if (err) console.log(err);
			resolve(tokenizer);
		});
	})
}

async function getText() {
	return document.getElementById('text').value;
}

async function createTbody(text) {
	let tbody = document.getElementById('final_results');
	let tr = document.createElement('tr');
	let selector = [
		'word_id', 
		'word_type', 
		'word_position',
		'surface_form',
		'pos'
	]
	for (let i = 0; i < 5; i++) {
		let td = document.createElement('td');
		td.innerHTML = text[selector[i]];
		tr.appendChild(td);
	}
	tbody.appendChild(tr);
}

function clearTbody() {
	console.log('clear methods');
	let parent = document.getElementById('final_results');
	while (parent.firstChild) {
		parent.removeChild(parent.firstChild);
	}
}