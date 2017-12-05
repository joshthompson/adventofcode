require('js-md5')

var aoc =  [
	{
		// DAY 1
		parts: [
			input => {
				let up = input.replace(/\)/g, '').length
				let down = input.replace(/\(/g, '').length
				return up - down
			},
			input => {
				let floor = 0
				let cmds = input.split('')
				for (let i = 0; i < cmds.length; i++) {
					floor += cmds[i] === '(' ? 1 : -1
					if (floor === -1) return i + 1
				}
			}
		]
	},
	{
		// DAY 2
		parts: [
			input => {
				let presents = input.split('\n').map(line => line.split('x').map(i => parseInt(i)))
				let size = 0
				presents.forEach(present => {
					let w = present[0]
					let h = present[1]
					let l = present[2]
					size += 2*l*w + 2*w*h + 2*h*l + Math.min(l*w, w*h, h*l)
				})
				return size
			},
			input => {
				let presents = input.split('\n').map(line => line.split('x').map(i => parseInt(i)))
				let length = 0
				presents.forEach(present => {
					let w = present[0]
					let h = present[1]
					let l = present[2]
					let o = [w, h, l].sort((a, b) => a > b)
					length += o[0]*2 + o[1]*2 + w*h*l
				})
				return length
			}
		]
	},
	{
		// DAY 3
		parts: [
			input => {
				let x = 0, y = 0
				let houses = {}
				let gift = () => houses[x+','+y] = houses[x+','+y] ? houses[x+','+y] + 1 : 1
				gift()
				input.split('').forEach(cmd => {
					if (cmd === '>') x++
					else if (cmd === '<') x--
					else if (cmd === 'v') y++
					else if (cmd === '^') y--
					gift()
				})
				return Object.keys(houses).length
			},
			input => {
				let sx = 0, sy = 0, rx = 0, ry = 0
				let houses = {'0,0': 1}
				let gift = (x, y) => houses[x+','+y] = houses[x+','+y] ? houses[x+','+y] + 1 : 1
				input.split('').forEach((cmd, i) => {
					if (cmd === '>')      i%2 ? sx++ : rx++
					else if (cmd === '<') i%2 ? sx-- : rx--
					else if (cmd === 'v') i%2 ? sy++ : ry++
					else if (cmd === '^') i%2 ? sy-- : ry--
					gift(i%2 ? sx : rx, i%2 ? sy : ry)
				})
				return Object.keys(houses).length
			}
		]
	},
	{
		// DAY 4
		parts: [
			input => {
				
			}
		]
	}
]

aoc.forEach((day, i) => {
	let li = document.createElement('li')
	li.innerHTML = `<a href='#${i+1}'>${i+1}</a>`
	li.onclick = () => renderAoc(i)
	document.getElementById('tests').appendChild(li)
})

let renderAoc = (i) => {
	document.getElementById('results').innerHTML = `DAY ${i+1} RESULTS:<br/><br/>`
	fetch(`./day${i+1}.txt`)
		.then((response) => response.text())
		.then((input) => {
			aoc[i].parts.forEach((part, j) => {
				document.getElementById('results').innerHTML += `Part ${j+1}: ${part(input)}<br/>`
			})
		})
}

if (window.location.hash) {
	let i = parseInt(window.location.hash.substr(1)) - 1
	if (typeof aoc[i] === 'object') renderAoc(i)
}
