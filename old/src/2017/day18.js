AdventOfCode.day18 = {

	// PART 1 STUFF

	reg: {},

	lookup: x => typeof AdventOfCode.day18.reg[x] === 'undefined' ? 0 : parseInt(AdventOfCode.day18.reg[x]),
	get: x => isNaN(parseInt(x)) ? AdventOfCode.day18.lookup(x) : parseInt(x),

	played: null,
	recovered: null,

	fns: {
		snd: (a) => {
			AdventOfCode.day18.played = AdventOfCode.day18.get(a)
			playNote(AdventOfCode.day18.played, 100)
		},
		set: (a, b) => AdventOfCode.day18.reg[a] = AdventOfCode.day18.get(b),
		add: (a, b) => AdventOfCode.day18.reg[a] = AdventOfCode.day18.get(a) + AdventOfCode.day18.get(b),
		mul: (a, b) => AdventOfCode.day18.reg[a] = AdventOfCode.day18.get(a) * AdventOfCode.day18.get(b),
		mod: (a, b) => AdventOfCode.day18.reg[a] = AdventOfCode.day18.get(a) % AdventOfCode.day18.get(b),
		rcv: (a) => AdventOfCode.day18.get(a) !== 0 ? AdventOfCode.day18.recovered = AdventOfCode.day18.played : false
	},

	part1: async input => {
		// return null
		AdventOfCode.day18.reg = {}
		let cmds = input.split('\n').map(cmd => cmd.split(' '))
		
		let i = 0
		while (i < cmds.length) {
			let cmd = cmds[i]
			if (cmd[0] === 'rcv') {
				if (AdventOfCode.day18.get(cmd[1]) !== 0) return AdventOfCode.day18.played
			} else if (cmd[0] === 'jgz') {
				if (AdventOfCode.day18.get(cmd[1]) > 0) {
					i += AdventOfCode.day18.get(cmd[2])
					continue
				}
			} else {
				eval(`AdventOfCode.day18.fns['${cmd[0]}']('${cmd[1]}', '${cmd[2]}')`)
				if (cmd[0] === 'snd') await sleep(50)
			}
			i++
		}
		return AdventOfCode.day18.recovered
	},

	// PART 2 STUFF

	register: function(cmds, index) {

		this.cmds = cmds 
		this.reg = {p: index}
		this.terminated = false
		this.waiting = false
		this.other = null
		this.list = []
		this.pos = 0
		this.sent = 0

		// Access functions
		this.lookup = x => typeof this.reg[x] === 'undefined' ? 0 : parseInt(this.reg[x])
		this.get = x => isNaN(parseInt(x)) ? this.lookup(x) : parseInt(x)

		// Mutator functions
		this.set = (a, b) => this.reg[a] = this.get(b)
		this.add = (a, b) => this.reg[a] = this.get(a) + this.get(b)
		this.mul = (a, b) => this.reg[a] = this.get(a) * this.get(b)
		this.mod = (a, b) => this.reg[a] = this.get(a) % this.get(b)

		// Jump
		this.jgz = (a, b) => this.pos += this.get(a) > 0 ? this.get(b) : 1

		// List functions
		this.snd = (a) => {
			this.other.list.push(this.get(a))
			// playNote(this.get(a) / 10, 100)
			this.sent++
		}
		this.rcv = async (a) => {
			this.waiting = true
			do {
				if (this.list.length) {
					this.reg[a] = this.list.shift()
					this.waiting = false
				} else await sleep(0)
			} while (!this.terminated && this.waiting)
		}

		report = () => {
			var d = Object.keys(this.reg).map(i => `${i}: ${this.reg[i]}`).join(', ')
			var c = this.cmds[this.pos].join("', '")
			console.log(`{ i: ${this.pos}, d: { ${d} } } [ '${c}' ]`)
		}

		// Run the commands
		this.process = async () => {
			while (this.pos < this.cmds.length && !this.terminated) {
				report()
				let cmd = this.cmds[this.pos]
				this[cmd[0]](`${cmd[1]}`, `${cmd[2]}`)
				this.pos += cmd[0] === 'jgz' ? 0 : 1
				await sleep(0)
			}
			this.terminated = true
		}

	},

	part2: async input => {
		return null
		let cmds = input.split('\n').map(cmd => cmd.split(' '))

		let r0 = new AdventOfCode.day18.register(cmds, 0)
		let r1 = new AdventOfCode.day18.register(cmds, 1)
		AdventOfCode.day18.r0 = r0
		AdventOfCode.day18.r1 = r1
		r0.other = r1
		r1.other = r0
		r0.process()
		r1.process()

		let timer = 0
		let time = new Date().getTime()
		while (!(r0.terminated && r1.terminated) && !(r0.waiting && r1.waiting)) {
			await sleep(0)
			timer++
		}
		if (r0.waiting && r1.waiting) console.log('jammed')
		if (r0.terminated && r1.terminated) console.log('terminated')
		r0.terminated = r1.terminated = true

		return r1.sent
	}

}

var audioCtx = new (window.AudioContext || window.webkitAudioContext)()
async function playNote(frequency, duration) {
	var oscillator = audioCtx.createOscillator()
	oscillator.type = 'square'
	oscillator.frequency.value = frequency
	oscillator.connect(audioCtx.destination)
	oscillator.start()
	setTimeout(() => oscillator.stop(), duration)
}