import { readFile } from 'fs';

readFile(`${__dirname}/input.txt`, (_e, data) => {
  const start = +new Date()
  const hexdec = data.toString()
  console.log('Part 1', part1(hexdec))
  console.log('Part 2', part2(hexdec))
  console.log('Time:', new Date().getTime() - start, 'ms')
})

function part1(hex: string) {
  const bin = hexToBin(hex)
  const { packets } = parse(bin)
  return getVersionSum(packets)
}

function part2(hex: string) {
  const bin = hexToBin(hex)
  const { packets: [ { value } ] } = parse(bin)
  return value
}

interface Packet {
  version: number
  typeID: number
  value?: number
  subpackets?: Packet[]
}

function hexToBin(hex: string) {
  return hex.split('').map(hex => 
    parseInt(hex, 16).toString(2).padStart(4, '0'),
  ).join('')
}

function parse(input: string, maxPackets = Infinity) {
  const packets: Packet[] = []

  while (input.length > 0 && packets.length < maxPackets) {
    const packet: Packet = {
      version: parseInt(input.substring(0, 3), 2),
      typeID: parseInt(input.substring(3, 6), 2),
    }
    input = input.substring(6)

    if (packet.typeID !== 4) {
      const lengthTypeId = input[0]
      input = input.substring(1)
      if (lengthTypeId === '0') {
        const subpacketBits = parseInt(input.substring(0, 15), 2)
        input = input.substring(15)
        packet.subpackets = parse(input.substring(0, subpacketBits)).packets
        input = input.substring(subpacketBits)
      } else {
        const numberOfSubpackets = parseInt(input.substring(0, 11), 2)
        input = input.substring(11)
        const subpacketData = parse(input, numberOfSubpackets)
        packet.subpackets = subpacketData.packets
        input = subpacketData.input
      }
      if (packet.subpackets.length === 0) {
        continue
      }
    }

    switch (packet.typeID) {
      case 0: // Sum
        packet.value = packet.subpackets.map(packet => packet.value).reduce((a, b) => a + b, 0)
        break
      case 1: // Product
        packet.value = packet.subpackets.map(packet => packet.value).reduce((a, b) => a * b, 1)
        break
      case 2: // Min
        packet.value = Math.min(...packet.subpackets.map(packet => packet.value))
        break
      case 3: // Max
        packet.value = Math.max(...packet.subpackets.map(packet => packet.value))
        break
      case 4: // Literal Value
        let lastBit = false
        let value = ''
        do {
          lastBit = input[0] === '0'
          value += input.substring(1, 5)
          input = input.substring(5)
        } while (!lastBit)
        packet.value = parseInt(value, 2)
        break
      case 5: // Greater Than
        packet.value = packet.subpackets[0].value > packet.subpackets[1].value ? 1 : 0
        break
      case 6: // Less Than
        packet.value = packet.subpackets[0].value < packet.subpackets[1].value ? 1 : 0
        break
      case 7: // Equal To
        const v1 = packet.subpackets[0] ? packet.subpackets[0].value : null
        const v2 = packet.subpackets[1] ? packet.subpackets[1].value : null
        packet.value = v1 === v2 ? 1 : 0
        break
    }
    packets.push(packet)
  }

  return { packets, input }
}

function getVersionSum(packets: Packet[]) {
  let sum = 0
  packets.forEach(packet => {
    sum += packet.version
    sum += packet.subpackets ? getVersionSum(packet.subpackets) : 0
  })
  return sum
}
