aoc.forEach((day, i) => {
	let li = document.createElement('li')
	li.innerHTML = `<a href='#${i+1}'>${i+1}</a>`
	li.onclick = () => renderAoc(i)
	document.getElementById('tests').appendChild(li)
})

let renderAoc = (i) => {
	document.getElementById('results').innerHTML = `DAY ${i+1} RESULTS:<br/><br/>`

	fetch(`./day${i+1}.txt`)
		.then(response => response.text())
		.then(input => {
			aoc[i].parts.forEach((part, j) => {
				var partElement = document.createElement('div')
				partElement.classList = ['part']
				partElement.innerHTML = `<div>Part ${j+1}: ${part(input)}</div>`
									  + `<div>${part.toString()}</div>`
				document.getElementById('results').appendChild(partElement)
			})
		})

}

if (window.location.hash) {
	let i = parseInt(window.location.hash.substr(1)) - 1
	if (typeof aoc[i] === 'object') renderAoc(i)
}
