let fs = require('fs');

let input = fs.readFileSync('day-4-input.txt', 'utf8'),
  lines = input.split('\n');

console.log(`line count: ${lines.length}`);

function buildPassports(lines) {
    passports = [],
    passport = new Map();

  lines.forEach(line => {
    if(line !== '') {
      let fields = line.split(' '); 

      fields.forEach(field => {
        let [key, value] = field.split(':');
        passport.set(key, value);
      });
    } else {
      passports.push(passport); 
      passport = new Map();
    }
  });

  return passports
}

function isValidPassport(passport) {
  return ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'].every(key => passport.has(key));
}

function hasValidValues(passport) {
  let result = true,
    fieldValidation = {
    byr: value => {
      let year = parseInt(value, 10);
      return !isNaN(year) && value.length === 4 && year >= 1920 && year <= 2002;
    },
    iyr: value => {
      let year = parseInt(value, 10);
      return !isNaN(year) && value.length === 4 && year >= 2010 && year <= 2020;
    },
    eyr: value => {
      let year = parseInt(value, 10);
      return !isNaN(year) && value.length === 4 && year >= 2020 && year <= 2030;
    },
    hgt: value => {
      let unit = value.slice(-2),
        number = parseInt(value.slice(0,-2), 10);

      if(isNaN(number)) {
        return false;
      }

      if(unit !== 'cm' && unit !== 'in') {
        return false;
      }

      if(unit === 'cm') {
        return number >= 150 && number <= 193;
      }

      if(unit === 'in') {
        return number >= 59 && number <= 76;
      }
    },
    hcl: value => {
      if(value[0] !== '#') {
        return false;
      }

      let hexColor = value.slice(1),
        notHexRegExp = new RegExp(/[^a-f0-9]/);

      if(hexColor.length !== 6) {
        return false;
      }
      return !notHexRegExp.test(hexColor);
    },
    ecl: value => {
      return ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].some(color => value === color);
    },
    pid: value => {
      let notNumber = new RegExp(/[^0-9]/);
      return value.length === 9 && !notNumber.test(value);
    },
    cid: () => true
  }

  passport.forEach((value, key, map) => {
    result = result && fieldValidation[key](value);
  });

  return result;
}

function part1(lines) {
  let passports = buildPassports(lines),
    validCount = 0;

  passports.forEach(passport => {
    if(isValidPassport(passport)) {
      validCount += 1;
    }
  });

  return validCount;
}

function part2(input) {
  let passports = buildPassports(lines),
    validCount = 0;

  passports.forEach(passport => {
    if(isValidPassport(passport) && hasValidValues(passport)) {
      validCount += 1;
    }
  });

  return validCount;
}

console.log('Day 4');
console.log('------------------------');
console.log(`part1: ${part1(lines.slice())}`);
console.log(`part2: ${part2(lines.slice())}`);
console.log('');
