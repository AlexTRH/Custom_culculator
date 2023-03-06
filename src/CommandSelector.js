/* eslint-disable consistent-return */
/* eslint-disable no-use-before-define */
/* eslint-disable class-methods-use-this */
// eslint-disable-next-line max-classes-per-file
import { CALCULATOR, OUTPUT } from './contains';

export class AddCommand {
	constructor(valueToAdd) {
		this.valueToAdd = valueToAdd;
	}

	execute(currentValue) {
		return currentValue + this.valueToAdd;
	}
}

export class SubstractCommand {
	constructor(valueToSubstract) {
		this.valueToSubstract = valueToSubstract;
	}

	execute(currentValue) {
		return currentValue - this.valueToSubstract;
	}
}

export class DivideCommand {
	constructor(valueToDivide) {
		this.valueToDivide = valueToDivide;
	}

	execute(currentValue) {
		return currentValue / this.valueToDivide;
	}
}

export class MultiplyCommand {
	constructor(valueToMultiply) {
		this.valueToMultiply = valueToMultiply;
	}

	execute(currentValue) {
		return currentValue * this.valueToMultiply;
	}
}

export class PowCommand {
	constructor(valueToPow) {
		this.valueToPow = valueToPow;
	}

	execute(currentValue) {
		return currentValue ** this.valueToPow;
	}
}

export class FactorialCommand {
	execute(currentValue) {
		return factorial(currentValue, 1);
	}
}

export const factorial = (n, val = 1) => {
	if (n > 18) {
		return Number.MAX_SAFE_INTEGER;
	}
	if (n < 0) {
		return -factorial(-n, val);
	}
	if (n === 1 || n === 0) {
		return val;
	}
	return factorial(n - 1, val * n);
};

export class InversionCommand {
	execute(currentValue) {
		return -currentValue;
	}
}

export class PercentageCommand {
	execute(currentValue) {
		return currentValue / 100;
	}
}

export const CommandSelector = (command, value = 1) => {
	switch (command) {
		case '+':
			return new AddCommand(value);
		case '-':
			return new SubstractCommand(value);
		case '×':
			return new MultiplyCommand(value);
		case '÷':
			return new DivideCommand(value);
		case '+/-':
			return new InversionCommand();
		case '%':
			return new PercentageCommand();
		case '!':
			return new FactorialCommand();
		case 'x^2':
			return new PowCommand(2);
		case 'x^3':
			return new PowCommand(3);
		case '10^x':
			return new PowCommand(value);
		case '1/x':
			return new PowCommand(-1);
		case 'x^1/2':
			return new PowCommand(1 / 2);
		case 'x^1/3':
			return new PowCommand(1 / 3);
		case 'x^y':
			return new PowCommand(value);
		case 'x^1/y':
			return new PowCommand(1 / value);
		case 'MC':
			CALCULATOR.resetMemory();
			break;
		case 'M+':
			CALCULATOR.changeMemory(Number(OUTPUT.value));
			break;
		case 'M-':
			CALCULATOR.changeMemory(-Number(OUTPUT.value));
			break;
		case 'MR':
			OUTPUT.value = String(CALCULATOR.memory);
			break;
		default:
	}
};
