let fs = require('fs');

let input = fs.readFileSync('day-5-input.txt', 'utf8'),
  lines = input.split('\n');

  // remove extra line from newline at the end of the file
  lines.pop()

function getSeat(input) {
  let = rowStr = input.slice(0, -3),
    colStr = input.slice(-3);

  return 8 * getRow(rowStr) + getCol(colStr);
}

function getRow(rowStr) {
  let min = 0, 
    max = 127;

  rowStr.split('').forEach(char => {
    let mid = (min + max) / 2;

    if(char === 'F') {
      max = Math.floor(mid);
    } else if(char === 'B') {
      min = Math.ceil(mid);
    }
  });

  return min;
}

function getCol(colStr) {
  let min = 0,
    max = 7;

  colStr.split('').forEach(char => {
    let mid = (min + max) / 2;

    if(char === 'L') {
      max = Math.floor(mid);
    } else if(char === 'R') {
      min = Math.ceil(mid);
    }
  });

  return min;
}

function part1(input) {
  let max = 0;

  input.forEach((row, idx) => {
    max = Math.max(max, getSeat(row));
  });

  return max;
}

// not a pretty solution but gets the job done
function part2(input) {
  let ids = [],
    result = null;

  input.forEach((row, idx) => {
    ids.push(getSeat(row));
  });

  ids.sort((a, b) => a - b);

  ids.forEach((seatId, idx) => {
    if(ids[idx+1] !== seatId+1 && idx !== input.length - 1) {
      result = ids[idx+1] - 1;
    }
  });

  return result;
}

console.log('Day 5');
console.log('------------------------');
console.log(`part1: ${part1(lines.slice())}`);
console.log(`part2: ${part2(lines.slice())}`);
console.log('');
