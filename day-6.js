let fs = require('fs');

let input = fs.readFileSync('day-6-input.txt', 'utf8'),
  lines = input.split('\n');

function addToSet(line, set) {
  line.split('').forEach(char => set.add(char));
  return set;
}

function everyoneAnswered(lines) {
  let groupSize = lines.length,
    answerCounts = new Map(),
    allVoted = 0;

  if(lines.length === 1) {
    return lines[0].length;
  }

  lines.forEach(line => {
    line.split('').forEach(char => {
      if(answerCounts.has(char)) {
        let count = answerCounts.get(char);

        // increase count
        count++;

        answerCounts.set(char, count);
        if(count === groupSize) {
          allVoted++;
        }
      }
      else {
        answerCounts.set(char, 1);
      }
    });
  });

  return allVoted;
}

function part1(input) {
  let result = 0,
    group = new Set();

  input.forEach(line => {
    if(line !== '') {
      group = addToSet(line, group);
    } else {
      result += group.size; 
      group = new Set();
    }
  });

  return result;
}

function part2(input) {
  let idx = 0,
    result = 0,
    startOfGroup = 0;

  while(idx < input.length) {
    if(input[idx] === '') {
      result += everyoneAnswered(input.slice(startOfGroup, idx));
      startOfGroup = idx+1;
    }
    idx++;
  }

  result += everyoneAnswered(input.slice(startOfGroup, idx));

  return result;
}

console.log('Day 6');
console.log('------------------------');
console.log(`part1: ${part1(lines.slice())}`);
console.log(`part2: ${part2(lines.slice())}`);
console.log('');
