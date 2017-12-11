aoc.forEach((day, i) => {
	let li = document.createElement('li')
	li.innerHTML = `<a href='#${i+1}'>${i+1}</a>`
	li.onclick = () => renderAoc(i)
	document.getElementById('tests').appendChild(li)
})

let formatCode = code => {
	code = code.split('\n')
	// Remove extra tabs
	return code.join('\n')
}

let renderAoc = (i) => {
	document.getElementById('results').innerHTML = `DAY ${i+1} RESULTS:<br/><br/>`

	fetch(`/${year}/day${i+1 < 10 ? '0' + (i+1) : i+1}.txt`)
		.then(response => response.text())
		.then(input => {
			if (aoc[i].warn) {
				document.getElementById('results').innerHTML += `<div>This day's tasks take a while to run...</div>`
			}
			setTimeout(() => {
				aoc[i].parts.forEach((part, j) => {
				var partElement = document.createElement('div')
					partElement.classList = ['part']
					partElement.innerHTML = `<div>Part ${j+1}: ${part(input)}</div>`
										  + `<div>${formatCode(part.toString())}</div>`
					document.getElementById('results').appendChild(partElement)
				})
			}, 10)
		})

}

if (window.location.hash) {
	let i = parseInt(window.location.hash.substr(1)) - 1
	if (typeof aoc[i] === 'object') renderAoc(i)
}
