const fs = require('fs')

fs.readFile(`${__dirname}/input.txt`, (_e, data) => {
	const passports = data.toString().split('\n\n')
        .map(passport =>
            passport.split(/\s+/)
                    .filter(field => field.trim().length)
                    .map(field => field.split(':'))
            )
    console.log('Part 1', validPassports(passports, false))
    console.log('Part 2', validPassports(passports, true))
})

const fields = [
    {   // (Birth Year) - four digits; at least 1920 and at most 2002.
        key: 'byr',
        validation: value => parseInt(value, 10) >= 1920 && parseInt(value, 10) <= 2002
    },
    {   // (Issue Year) - four digits; at least 2010 and at most 2020.
        key: 'iyr',
        validation: value => parseInt(value, 10) >= 2010 && parseInt(value, 10) <= 2020
    },
    {   // (Expiration Year) - four digits; at least 2020 and at most 2030.
        key: 'eyr',
        validation: value => parseInt(value, 10) >= 2020 && parseInt(value, 10) <= 2030
    },
    {   // (Height) - a number followed by either cm or in:
        // - If cm, the number must be at least 150 and at most 193.
        // - If in, the number must be at least 59 and at most 76.
        key: 'hgt',
        validation: value => {
            const v = value.match(/^([0-9]+)(cm|in)$/)
            if (v && v[2] === 'cm' && parseFloat(v[1]) >= 150 && parseFloat(v[1]) <= 193) return true
            if (v && v[2] === 'in' && parseFloat(v[1]) >= 59 && parseFloat(v[1]) <= 76) return true
        }
    },
    {   // (Hair Color) - a # followed by exactly six characters 0-9 or a-f.
        key: 'hcl',
        validation: value => /^#[0-9A-F]{6}$/i.test(value)
    },
    {   // (Eye Color) - exactly one of: amb blu brn gry grn hzl oth.
        key: 'ecl',
        validation: value => /^amb|blu|brn|gry|grn|hzl|oth$/i.test(value)
    },
    {   // (Passport ID) - a nine-digit number, including leading zeroes.
        key: 'pid',
        validation: value => /^[0-9]{9}$/.test(value)
    },
    // {   // (Country ID) - ignored, missing or not.
    //     key: 'cid',
    //     validation: value => true
    // },
]

function validPassports(passports, validate) {
    let valid = 0;
    passports.forEach(passport => {
        let validFields = 0
        fields.forEach(field => {
            const f = passport.find(p => p[0] === field.key)
            if (f && !validate) {
                validFields++
            } else if (f && validate && field.validation(f[1])) {
                validFields++
            }
        })
        if (validFields === fields.length) {
            valid++
        }
    })
    return valid
}
