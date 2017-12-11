for (let day = 1; day <= 11; day++) {
	let li = document.createElement('li')
	li.innerHTML = `<a href='#${day}'>${day}</a>`
	li.onclick = () => render(day)
	document.getElementById('tests').appendChild(li)
}

var AdventOfCode = {}

let render = async (i) => {
	document.getElementById('results').innerHTML = `DAY ${i} RESULTS:<br/><br/><div id='day'><div id='parts'></div><code id='code' class='prettyprint'></code></div>`
	let day = i < 10 ? '0' + i : i
	if (typeof AdventOfCode[`day${day}`] === 'undefined') {
		await fetch(`/${year}/day${day}.js`)
			.then(response => response.text())
			.then(js => {
				eval(js)
				document.getElementById('code').innerHTML = js
			})
	}

	await fetch(`/${year}/day${day}.txt`)
	// await fetch(`/${year}/otherinput/day${day}.txt`)
		.then(response => response.text())
		.then(input => {
			let dayCode = AdventOfCode[`day${day}`]
			if (dayCode.warn) {
				document.getElementById('results').innerHTML += `<div>This day's tasks take a while to run...</div>`
			}

			document.getElementById('parts').innerHTML = ''
			for (let part = 1; part <= 2; part++) {
				let result = AdventOfCode[`day${day}`][`part${part}`](input)
				document.getElementById('parts').innerHTML += `<div>Part ${part}: ${result}</div>`
			}
		})

}

if (window.location.hash) {
	let i = parseInt(window.location.hash.substr(1))
	render(i)
}
