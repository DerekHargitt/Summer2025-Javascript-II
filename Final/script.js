/* Derek Hargitt 07/25/2025 Final */
function addition(num) {
  let result = '';
  for (let i = 1; i <= 10; i++) {
    result += `${num} + ${i} = ${num + i}\n`;
  }
  document.getElementById('addition').textContent = result;
}

function subtraction(num) {
  let result = '';
  let i = 1;
  while (i <= 10) {
    result += `${num} - ${i} = ${num - i}\n`;
    i++;
  }
  document.getElementById('subtraction').textContent = result;
}

function multiplication(num) {
  let result = '';
  let i = 1;
  do {
    result += `${num} × ${i} = ${num * i}\n`;
    i++;
  } while (i <= 10);
  document.getElementById('multiplication').textContent = result;
}

function division(num) {
  let result = '';
  const divisors = Array.from({ length: 10 }, (_, i) => i + 1);
  for (const divisor of divisors) {
    const quotient = (num / divisor).toFixed(2);
    result += `${num} ÷ ${divisor} = ${quotient}\n`;
  }
  document.getElementById('division').textContent = result;
}

function runCalculations() {
  const inputEl = document.getElementById('num');
  const num = Number(inputEl.value);
  if (isNaN(num)) {
    alert('Please enter a valid number.');
    return;
  }
  addition(num);
  subtraction(num);
  multiplication(num);
  division(num);
}

document.getElementById('calcBtn').addEventListener('click', runCalculations);
