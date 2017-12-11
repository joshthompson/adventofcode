for (let day = 1; day <= 11; day++) {
	let li = document.createElement('li')
	li.innerHTML = `<a href='#${day}'>${day}</a>`
	li.onclick = () => render(day)
	document.getElementById('tests').appendChild(li)
}

var AdventOfCode = {}

let render = async (i) => {
	document.getElementById('results').innerHTML = `DAY ${i} RESULTS:<br/><br/>`
	let day = i < 10 ? '0' + i : i
	if (typeof AdventOfCode[`day${day}`] === 'undefined') {
		await fetch(`/${year}/day${day}.js`)
			.then(response => response.text())
			.then(js => eval(js))
	}

	await fetch(`/${year}/day${day}.txt`)
	// await fetch(`/${year}/otherinput/day${day}.txt`)
		.then(response => response.text())
		.then(input => {
			let dayCode = AdventOfCode[`day${day}`]
			if (dayCode.warn) {
				document.getElementById('results').innerHTML += `<div>This day's tasks take a while to run...</div>`
			}

			setTimeout(() => {
				[1, 2].forEach((i) => {
					let part = AdventOfCode[`day${day}`][`part${i}`]
					var partElement = document.createElement('div')
						partElement.classList = ['part']
						partElement.innerHTML = `<div>Part ${i}: ${part(input)}</div>`
						document.getElementById('results').appendChild(partElement)
					}
				)
			}, 10)
		})

}

if (window.location.hash) {
	let i = parseInt(window.location.hash.substr(1))
	render(i)
}
