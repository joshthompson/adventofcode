AdventOfCode.day13 = {

	process: input => {
		let firewall = []
		input.split('\n').forEach(depth => {
			depth = depth.split(': ').map(i => parseInt(i))
			firewall[depth[0]] = {pos: 0, max: depth[1] - 1, dir: 1}
		})
		return firewall
	},

	moveScanners: firewall => {
		firewall.forEach(fire => {
			fire.pos += fire.dir
			if (fire.pos === fire.max || fire.pos === 0) fire.dir *= -1
		})
	},

	resetScanners: firewall => {
		firewall.forEach(fire => {
			fire.pos = 0
			fire.dir = 1
		})
	},

	moveScannersBulk: (firewall, n) => {
		firewall.forEach(fire => {
			fire.pos += n
			fire.pos %= fire.max * 2
			if (fire.pos >= fire.max) {
				fire.pos = fire.max * 2 - fire.pos
				fire.dir = -1
			}
			if (fire.pos === 0) fire.dir = 1
			if (fire.pos === fire.max) fire.dir = -1
		})
	},

	go: async (firewall, delay, breakable) => {
		AdventOfCode.day13.resetScanners(firewall)
		let severity = 0
		if (delay > 0) AdventOfCode.day13.moveScannersBulk(firewall, delay)
		for (let packetPos = 0; packetPos < firewall.length; packetPos++) {
			let fire = firewall[packetPos]
			if (fire && fire.pos === 0) {
				severity += (fire.max + 1) * packetPos
			}
			// AdventOfCode.day13.render(firewall, packetPos, severity, delay)
			// await sleep(fire && fire.pos === 0 ? 100 : 100)
			if (severity && breakable) return severity
			AdventOfCode.day13.moveScanners(firewall)
		}
		return severity
	},

	part1: async input => {
		// let firewall = AdventOfCode.day13.process(input)
		// let severity = await AdventOfCode.day13.go(firewall, 0, false)
		// return severity
	},
	
	part2: async input => {
		let firewall = AdventOfCode.day13.process(input)
		let delay = 66480 - 10
		// let delay = 3850260 - 10
		delay+=11
		let severity = 1
		while (severity > 0) {
			severity = await AdventOfCode.day13.go(firewall, ++delay, true)
		}
		return delay
	},

	renderHtml: "<canvas id='canvas'></canvas>",

	render: (firewall, packet, severity, delay) => {
		let c = document.getElementById('canvas').getContext('2d')
		let w = c.canvas.width = document.getElementById('canvas').clientWidth
		let h = c.canvas.height = document.getElementById('canvas').clientHeight
		c.font = '10px Verdana'
		let p = 10 // Padding
		c.clearRect(0, 0, w, h);

		firewall.forEach((fire, i) => {
			if (fire) {
				let x = (w - p*2) / firewall.length * i + p
				let y = 20
				let b = 15
				c.fillText(i, x, 10)
				c.moveTo(x, y)
				c.lineTo(x, y + b * fire.max)
				c.rect(x - 5, y + b * fire.pos -5, 10, 10)
			}
		})

		c.fillText(`severity: ${severity}    delay: ${delay}`, 10, 280)
		c.fillStyle = severity ? '#F00' : '#000';
		if (!severity && packet === firewall.length-1) c.fillStyle = '#090';
		c.fillRect((w - p*2) / firewall.length * packet + p - 3, 20 - 3, 6, 6)
		c.stroke()
	}

}
