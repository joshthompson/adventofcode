var aoc =  [
	{
		// DAY 1
		parts: [
			(input) => {
				let numbers = input.split('').map(i => parseInt(i))
				numbers.push(numbers[0])
				let sum = 0

				for (let i = 0; i < numbers.length - 1; i++) {
					sum += numbers[i] === numbers[i + 1] ? numbers[i] : 0
				}
				return sum
			},
			(input) => {
				let numbers = input.split('').map((i) => parseInt(i))
				let sum = 0

				for (let i = 0; i < numbers.length - 1; i++) {
					j = (i + numbers.length / 2) % numbers.length
					sum += numbers[i] === numbers[j] ? numbers[i] : 0
				}
				return sum
			}
		]
	},
	{
		// DAY 2
		parts: [
			(input) => {
				return input.split('\n').map((line) => {
					let values = line.split('\t').map(i => parseInt(i))
					let min = Math.min.apply(Math, values)
					let max = Math.max.apply(Math, values)
					return max - min
				}).reduce((a, b) => a + b, 0)
			},
			(input) => {
				return input.split('\n').map((line) => {
					let values = line.split('\t').map(i => parseInt(i))
					let divided_value = false
					values.forEach((a, i) => {
						values.forEach((b, j) => {
							if (i !== j) {
								let min = Math.min(a, b)
								let max = Math.max(a, b)
								if (max / min === Math.round(max / min)) {
									return divided_value = max / min
								}
							}
						})
						if (divided_value) return divided_value
					})
					if (divided_value) return divided_value
				}).reduce((a, b) => a + b, 0)
			}
		]
	},
	{
		// DAY 3
		parts: [
			(n) => {

				// Functions
				let sideFn = level => 2 * level + 1
				let startFn = level => Math.pow(sideFn(level - 1), 2) + 1

				// Which level of the spiral we're on 
				// Also the numbers of intial outward steps
				let level = Math.floor(Math.ceil(Math.sqrt(n)) / 2)
				let side = sideFn(level)
				let start = startFn(level)
				let offset = level - 1 // Offset from lowest value in level to middle

				let distance = n
				
				for (let i = 0; i < 4; i++) { // Loop each side
					let side_middle = start + offset + (side - 1) * i // Middle value for this side
					let side_distance = Math.abs(side_middle - n)
					distance = Math.min(distance, side_distance) // Keep shortest side distance
				}

				return level + distance
				
			},
			(input) => {
				let grid = {
					'0,0': 1
				}
				let g = (x, y) => grid[x + ',' + y] ? grid[x + ',' + y] : 0// value of cell in grid
				let c = (x, y) => !g(x, y) // is cell clear
				let set = (x, y, value) => grid[x + ',' + y] = value

				var value = 1
				var x = 0
				var y = 0

				while (value < input) {
					// Move to next cell

					// 			NORTH			EAST			SOUTH			WEST
					if (		c(x, y-1) && 	c(x+1, y) && 	c(x, y+1) &&	c(x-1, y))	x += 1 // Everything is empty

					else if (	c(x, y-1) &&	c(x+1, y) &&	!c(x, y+1) &&	c(x-1, y))	x -= 1 // Just south is blocked
					else if (	c(x, y-1) &&	!c(x+1, y) &&	!c(x, y+1) &&	c(x-1, y))	x -= 1 // Just south and east are blocked

					else if (	c(x, y-1) &&	!c(x+1, y) &&	c(x, y+1) &&	c(x-1, y))	y += 1 // Just east is blocked
					else if (	!c(x, y-1) &&	!c(x+1, y) &&	c(x, y+1) &&	c(x-1, y))	y += 1 // Just north and east are blocked

					else if (	!c(x, y-1) &&	c(x+1, y) &&	c(x, y+1) &&	c(x-1, y))	x += 1 // Just north is blocked
					else if (	!c(x, y-1) &&	c(x+1, y) &&	c(x, y+1) &&	!c(x-1, y))	x += 1 // Just north and west are blocked

					else if (	c(x, y-1) &&	c(x+1, y) &&	c(x, y+1) &&	!c(x-1, y))	y -= 1 // Just west is blocked
					else if (	c(x, y-1) &&	c(x+1, y) &&	!c(x, y+1) &&	!c(x-1, y))	y -= 1 // Just south and west are blocked

					// Calculate total
					value = g(x-1, y-1) + g(x+0, y-1) + g(x+1, y-1)
						  + g(x-1, y+0) + 0           + g(x+1, y+0)
						  + g(x-1, y+1) + g(x+0, y+1) + g(x+1, y+1)
					set(x, y, value)
				}

				return value

			}
		]
	},
	{
		// DAY 4
		funcs: {
			valid: (passphrases) => {
				let valid = 0
				passphrases.forEach((phrases) => {
					var phrasesValid = true
					phrases.forEach((word, i) => {
						if (phrases.indexOf(word) !== i) {
							return phrasesValid = false
						}
					})
					valid += phrasesValid ? 1 : 0
				})
				return valid
			}
		},
		parts: [
			(input) => {
				let passphrases = input.split('\n').map(line => line.split(' '))
				return aoc[3].funcs.valid(passphrases)
			},
			(input) => {
				let passphrases = input.split('\n').map(line => line.split(' ').map((word) => {
					return word.split('').sort((a,b)=>a>b).join('')
				}))
				return aoc[3].funcs.valid(passphrases)
			}
		]
	},
	{
		// DAY 5
		parts: [
			(input) => {
				let cmds = input.split('\n').map(i => parseInt(i))
				let pos = 0
				let steps = 0
				while (pos < cmds.length) {
					cmds[pos]++
					pos += cmds[pos] - 1
					steps++
				}
				return steps
			},
			(input) => {
				let cmds = input.split('\n').map(i => parseInt(i))
				let pos = 0
				let steps = 0
				while (pos < cmds.length) {
					let cpos = pos
					pos += cmds[cpos]
					cmds[cpos] += cmds[cpos] >= 3 ? -1 : 1
					steps++
				}
				return steps
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
	fetch(`/day${i+1}.txt`)
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
