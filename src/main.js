days.forEach(day => {
	let li = document.createElement('li')
	li.innerHTML = `<a href='#${day}'>${day}</a>`
	li.onclick = () => render(day)
	document.getElementById('tests').appendChild(li)
})

var AdventOfCode = {}
var AdventOfCodeStrs = {}

let render = async (i) => {
	document.getElementById('results').innerHTML = `DAY ${i} RESULTS:<br/>`
	+ `Read about the task <a href='http://adventofcode.com/${year}/day/${i}' target='_blank'>here</a><br/><br/>`
	+ `<div id='day'><div id='parts'></div><pre id='code' class='prettyprint'></pre></div>`

	let day = i < 10 ? '0' + i : i
	if (typeof AdventOfCode[`day${day}`] === 'undefined') {
		await fetch(`./${year}/day${day}.js`)
			.then(response => response.text())
			.then(js => eval(AdventOfCodeStrs[`day${day}`] = js))
	}

	document.getElementById('code').innerHTML = AdventOfCodeStrs[`day${day}`]
	PR.prettyPrint()

	await fetch(`./${year}/day${day}.txt`)
		.then(response => response.text())
		.then(input => {
			let dayCode = AdventOfCode[`day${day}`]
			if (dayCode.slowWarning) {
				document.getElementById('parts').innerHTML = `<div>This day's tasks take a while to run...</div>`
				document.tmp = {day: day, input: input}
				document.getElementById('parts').innerHTML += `<button onclick='processTask(document.tmp.day, document.tmp.input)'>Process Task</button>`
			} else {
				processTask(day, input)
			}
		})

}

let processTask = async (day, input) => {
	let str = ''
	for (let part = 1; part <= 2; part++) {
		let result = AdventOfCode[`day${day}`][`part${part}`](input)
		str += `<div>Part ${part}: ${result}</div>`
	}
	document.getElementById('parts').innerHTML = str
}

if (window.location.hash) {
	let i = parseInt(window.location.hash.substr(1))
	render(i)
}
