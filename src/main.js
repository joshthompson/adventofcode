days.forEach(day => {
	let li = document.createElement('li')
	li.innerHTML = `<a href='#${day}'>${day}</a>`
	li.onclick = () => render(day)
	document.getElementById('tests').appendChild(li)
})

var AdventOfCode = {}
var AdventOfCodeStrs = {}

let loadDayScript = async day => {
	if (typeof AdventOfCode[`day${day}`] === 'undefined') {
		await fetch(`./${year}/day${day}.js`)
			.then(response => response.text())
			.then(js => eval(AdventOfCodeStrs[`day${day}`] = js))
	}
}

let render = async (i) => {
	document.getElementById('results').innerHTML = `DAY ${i} RESULTS:<br/>`
	+ `Read about the task <a href='http://adventofcode.com/${year}/day/${i}' target='_blank'>here</a><br/><br/>`
	+ `<div id='day'>`
		+ `<div id='render'></div>`
		+ `<div id='parts'></div>`
		+ `<pre id='code' class='prettyprint'></pre>`
	+ `</div>`

	let day = i < 10 ? '0' + i : i
	await loadDayScript(day)

	document.getElementById('code').innerHTML = AdventOfCodeStrs[`day${day}`]
	if (typeof PR !== 'undefined') PR.prettyPrint()

	await fetch(`./${year}/day${day}.txt`)
		.then(response => response.text())
		.then(input => {
			let dayCode = AdventOfCode[`day${day}`]
			document.tmp = {day: day, input: input}
			if (dayCode.slowWarning) {
				document.getElementById('parts').innerHTML = `<div>This day's tasks take a while to run...</div>`
				document.getElementById('parts').innerHTML += `<button onclick='processTask(document.tmp.day, document.tmp.input)'>Process Task</button>`
			} else {
				processTask(day, input)
			}

			if (AdventOfCode[`day${day}`].renderHtml) {
				document.getElementById('parts').innerHTML += `<button onclick='processTask(document.tmp.day, document.tmp.input, true)'>Watch Animation</button>`
			}

		})

}

let processTask = async (day, input, render) => {
	
	if (render) {
		document.getElementById('render').innerHTML = AdventOfCode[`day${day}`].renderHtml
	}

	if (typeof AdventOfCode[`day${day}`].init === 'function') await AdventOfCode[`day${day}`].init()
	for (let part = 1; part <= 2; part++) {
		let result = AdventOfCode[`day${day}`][`part${part}`](input, render ? true : false)
		Promise.resolve(result).then(r => {
			document.getElementById('parts').innerHTML += `<div>Part ${part}: ${r}</div>`
		})
	}
}

if (window.location.hash) {
	let i = parseInt(window.location.hash.substr(1))
	render(i)
}

function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}
