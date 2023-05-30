import { getOutput } from './output';

function appendNumber(calculator, appendValue) {
	const output = getOutput();
	const outputValue = output.value;
	if (appendValue.trim() === '.') {
		if (calculator.newNumber === true) {
			output.value = 0 + appendValue;
		} else if (!outputValue.includes('.')) {
			output.value += appendValue;
		}
		return;
	}
	if (outputValue === '0' || calculator.newNumber === true) {
		output.value = appendValue;
		return;
	}
	if (outputValue.toString().length <= calculator.maxOutputLength) {
		output.value += appendValue;
	}
}

function handleNumberClick(clickedButton, calculator) {
	appendNumber(calculator, clickedButton);
	calculator.newNumber = false;
	calculator.operatorActive = false;
	if (calculator.equalCounter > 0) {
		calculator.currentValue = 0;
		calculator.equalCounter = 0;
	}
}

export function numbersInit(calculator) {
	const numbers = document.querySelectorAll('.key_number');
	numbers.forEach((number) => {
		number.addEventListener('click', () => {
			handleNumberClick(number.value, calculator);
		});
	});
}
