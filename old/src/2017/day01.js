AdventOfCode.day01 = {

	part1: async (input, render) => {
		let numbers = input.split('').map(i => parseInt(i))
		numbers.push(numbers[0])
		let sum = 0

		for (let i = 0; i < numbers.length - 1; i++) {
			sum += numbers[i] === numbers[i + 1] ? numbers[i] : 0
			if (render) await AdventOfCode.day01.render(numbers, i, sum)
		}
		return sum
	},

	part2: async (input, render) => {
		let numbers = input.split('').map((i) => parseInt(i))
		let sum = 0

		for (let i = 0; i < numbers.length - 1; i++) {
			let j = (i + numbers.length / 2) % numbers.length
			sum += numbers[i] === numbers[j] ? numbers[i] : 0
			if (render) await AdventOfCode.day01.render2(numbers, i, sum)
		}
		return sum
	},

	renderHtml: "<canvas id='canvas1_1' style='height: 80px;'></canvas><canvas id='canvas1_2' style='height:95px;'></div>",

	render: async (numbers, i, sum) => {
		let c = document.getElementById('canvas1_1').getContext('2d')
		let w = c.canvas.width = document.getElementById('canvas1_1').clientWidth
		let h = c.canvas.height = document.getElementById('canvas1_1').clientHeight
		
		c.fillStyle = numbers[i] === numbers[i + 1] ? '#0F0' : '#FF0'
		c.fillRect(10, 20, 30, 25)
		c.fillStyle = '#000'

		for (let num = i; num < numbers.length; num++) {
			c.fillText(numbers[num], (num - i) * 15 + 15, 35)
		}

		c.fillText(`Part 1`, 15, 10)
		c.fillText(`Sum: ${sum}`, 15, 60)

		await sleep(10)
	},

	render2: async (numbers, i, sum) => {
		let c = document.getElementById('canvas1_2').getContext('2d')
		let w = c.canvas.width = document.getElementById('canvas1_2').clientWidth
		let h = c.canvas.height = document.getElementById('canvas1_2').clientHeight
		

		let j = (i + numbers.length / 2) % numbers.length
		c.fillStyle = numbers[i] === numbers[j] ? '#0F0' : '#FF0'
		c.fillRect(10, 20, 15, 45)
		c.fillStyle = '#000'

		for (let num = i; num < numbers.length; num++) {
			c.fillText(numbers[num], (num - i) * 15 + 15, 35)
			c.fillText(numbers[(num + numbers.length / 2) % numbers.length], (num - i) * 15 + 15, 55)
		}

		c.fillText(`Part 1`, 15, 10)
		c.fillText(`Sum: ${sum}`, 15, 80)

		await sleep(10)
	}

}