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
		let results = [];
		// 解析結果を順番に取得する
		for (let i=0; i < tokens.length; i++) {
			let token = tokens[i];
			createTbody(token);
		}
		return Promise.resolve(results);
	})
	.catch(()=>{
		let msg = 'tokensの取得失敗';
		console.log(msg);
		document.getElementById('err-msg').innerHTML(msg);
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
	let td1 = document.createElement('td');
	td1.innerHTML = text.word_id;
	let td2 = document.createElement('td');
	td2.innerHTML = text.word_type;
	let td3 = document.createElement('td');
	td3.innerHTML = text.word_position;
	let td4 = document.createElement('td');
	td4.innerHTML = text.surface_form;
	let td5 = document.createElement('td');
	td5.innerHTML = text.pos;
	tr.appendChild(td1);
	tr.appendChild(td2);
	tr.appendChild(td3);
	tr.appendChild(td4);
	tr.appendChild(td5);
	tbody.appendChild(tr);
}

function clearTbody() {
	console.log('clear methods');
	let parent = document.getElementById('final_results');
	while (parent.firstChild) {
		parent.removeChild(parent.firstChild);
	}
}