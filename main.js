const DICT_PATH = "./dict";

async function analysis() {
	const text = await getText();
	console.log(text);
	const results = await kuro(text);
	console.log(results);
	results.forEach(result=> {
		createTbody(result);
	})
}

async function kuro(text) {
	const results = [];
	const result = {};
	kuromoji.builder({dicPath: DICT_PATH}).build((err, tokenizer)=>{
		if (err) console.log(err);
		const tokens = tokenizer.tokenize(text);// 解析データの取得
		tokens.forEach((token)=>{// 解析結果を順番に取得する
			console.log(token);
			console.log(token.word_id);
			result.word_id = token.word_id;
			result.word_type = token.word_type;
			result.word_position = token.word_position;
			result.surface_form = token.surface_form;
			result.pos = token.pos;
			console.log(result);
			results.push(result);
		});
	});
	console.log(results);
	return results;
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