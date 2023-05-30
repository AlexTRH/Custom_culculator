import { numberValidation, transformInt } from './utils';
import { getOutput } from './output';

const output = getOutput();

export class Command {
	constructor(calculator) {
		this.calculator = calculator;
	}

	execute() {}

	undo() {}
}

export class AddCommand extends Command {
	execute(calculator) {
		if (!numberValidation(calculator.currentValue, output.value)) return;
		output.value = transformInt(
			Number(calculator.currentValue) + Number(output.value)
		);
	}

	undo(calculator) {
		output.value = transformInt(
			Number(output.value) - Number(calculator.valueBeforeOperation.pop())
		);
	}
}

export class SubtractCommand extends Command {
	execute(calculator) {
		if (!numberValidation(calculator.currentValue, output.value)) return;
		output.value = transformInt(
			calculator.equalCounter === 0
				? Number(calculator.currentValue) - Number(output.value)
				: Number(output.value) - Number(calculator.currentValue)
		);
	}

	undo(calculator) {
		output.value = transformInt(
			Number(output.value) + Number(calculator.valueBeforeOperation.pop())
		);
	}
}

export class MultiplyCommand extends Command {
	execute(calculator) {
		if (!numberValidation(calculator.currentValue, output.value)) return;
		output.value = transformInt(
			Number(calculator.currentValue) * Number(output.value)
		);
	}

	undo(calculator) {
		output.value = transformInt(
			Number(output.value) / Number(calculator.valueBeforeOperation.pop())
		);
	}
}

export class DivideCommand extends Command {
	execute(calculator) {
		if (!numberValidation(calculator.currentValue, output.value)) return;
		if (Number(output.value) === 0) {
			output.value = 'Error';
		} else {
			output.value = transformInt(
				calculator.equalCounter === 0
					? Number(calculator.currentValue) / Number(output.value)
					: Number(output.value) / Number(calculator.currentValue)
			);
		}
	}

	undo(calculator) {
		output.value = transformInt(
			Number(output.value) * Number(calculator.valueBeforeOperation.pop())
		);
	}
}

/// other functions ///

function power(x, y) {
	let result = 1;
	for (let i = 0; i < y; i += 1) {
		result *= x;
	}
	return result;
}

function root(x, y) {
	const precision = 0.0001;
	let estimate = x;
	while (
		(x - power(estimate, y)) * (x - power(estimate, y)) >
		precision * precision
	) {
		estimate = ((y - 1) * estimate + x / power(estimate, y - 1)) / y;
	}
	return estimate;
}

export class ExponentiationCommand extends Command {
	execute(calculator) {
		if (!numberValidation(calculator.currentValue, output.value)) return;
		output.value = transformInt(
			calculator.equalCounter === 0
				? Number(calculator.currentValue) ** Number(output.value)
				: Number(output.value) ** Number(calculator.currentValue)
		);
	}

	undo(calculator) {
		const x =
			calculator.equalCounter === 0 ? calculator.currentValue : output.value;
		const y =
			calculator.equalCounter === 0 ? output.value : calculator.currentValue;
		output.value = transformInt(root(x, y));
	}
}

export class YRootCommand extends Command {
	execute(calculator) {
		if (!numberValidation(calculator.currentValue, output.value)) return;
		const x =
			calculator.equalCounter === 0 ? calculator.currentValue : output.value;
		const y =
			calculator.equalCounter === 0 ? output.value : calculator.currentValue;
		output.value = transformInt(root(x, y));
	}

	undo(calculator) {
		output.value = transformInt(
			Number(output.value) ** Number(calculator.valueBeforeOperation.pop())
		);
	}
}

export class ClearCommand extends Command {
	constructor(calculator) {
		super(calculator);
		this.previousValue = calculator.currentValue;
		this.previousOperator = calculator.currentOperator;
		this.previousNewNumber = output.value;
	}

	execute() {
		this.calculator.valueBeforeOperation.push(output.value);
		output.value = 0;
		this.calculator.currentOperator = '';
		this.calculator.currentValue = 0;
	}

	undo() {
		output.value = this.calculator.valueBeforeOperation.pop();
		this.calculator.currentOperator = this.previousOperator;
		this.calculator.currentValue = this.previousValue;
		this.calculator.newNumber = this.previousNewNumber;
	}
}

export class SwitchSignCommand extends Command {
	execute(calculator) {
		if (!numberValidation(output.value)) return;
		calculator.valueBeforeOperation.push(output.value);
		output.value = transformInt(output.value * -1);
	}

	undo(calculator) {
		output.value = calculator.valueBeforeOperation.pop();
	}
}

export class PercentCommand extends Command {
	execute(calculator) {
		if (!numberValidation(output.value)) return;
		if (
			calculator.currentOperator === '' ||
			calculator.operatorActive === true
		) {
			output.value = transformInt(output.value / 100);
			calculator.valueBeforeOperation.push(output.value);
		} else {
			calculator.valueBeforeOperation.push(output.value);
			output.value = transformInt(
				(Number(calculator.currentValue) * Number(output.value)) / 100
			);
		}
	}

	undo(calculator) {
		if (calculator.operatorActive === false) {
			output.value = transformInt(100 * calculator.valueBeforeOperation.pop());
		} else {
			calculator.valueBeforeOperation.pop();
			calculator.undoCommand();
		}
	}
}

// pro keypad //

export class SquareCommand extends Command {
	execute(calculator) {
		if (!numberValidation(output.value)) return;
		calculator.valueBeforeOperation.push(output.value);
		output.value = transformInt(Number(output.value) ** 2);
	}

	undo(calculator) {
		output.value = calculator.valueBeforeOperation.pop();
	}
}

export class CubeCommand extends Command {
	execute(calculator) {
		if (!numberValidation(output.value)) return;
		calculator.valueBeforeOperation.push(output.value);
		output.value = transformInt(Number(output.value) ** 3);
	}

	undo(calculator) {
		output.value = calculator.valueBeforeOperation.pop();
	}
}

export class SquareRootCommand extends Command {
	execute(calculator) {
		if (!numberValidation(output.value)) return;
		calculator.valueBeforeOperation.push(output.value);
		if (Number(output.value) < 0) {
			output.value = 'Error';
		} else if (Number(output.value) === 0) {
			output.value = 0;
		} else {
			let result;
			let x = Number(output.value) / 2;
			do {
				result = x;
				x = (result + Number(output.value) / result) / 2;
			} while (result !== x);
			output.value = transformInt(result);
		}
	}

	undo(calculator) {
		output.value = calculator.valueBeforeOperation.pop();
	}
}

export class CubeRootCommand extends Command {
	execute(calculator) {
		if (!numberValidation(output.value)) return;
		calculator.valueBeforeOperation.push(output.value);
		if (Number(output.value) < 0) {
			output.value = 'Error';
		} else if (Number(output.value) === 0) {
			output.value = 0;
		} else {
			let result;
			let x = Number(output.value) / 2;
			do {
				result = x;
				x = (Number(output.value) / (x * x) + x * 2) / 3;
			} while (result !== x);
			output.value = transformInt(result);
		}
	}

	undo(calculator) {
		output.value = calculator.valueBeforeOperation.pop();
	}
}

export class EToPowerCommand extends Command {
	execute(calculator) {
		if (!numberValidation(output.value)) return;
		calculator.valueBeforeOperation.push(output.value);
		output.value = transformInt(2.7182818011463845 ** Number(output.value));
	}

	undo(calculator) {
		output.value = calculator.valueBeforeOperation.pop();
	}
}

export class TenToPowerCommand extends Command {
	execute(calculator) {
		if (!numberValidation(output.value)) return;
		calculator.valueBeforeOperation.push(output.value);
		output.value = transformInt(10 ** Number(output.value));
	}

	undo(calculator) {
		output.value = calculator.valueBeforeOperation.pop();
	}
}

export class OneXthCommand extends Command {
	execute(calculator) {
		if (!numberValidation(output.value)) return;
		calculator.valueBeforeOperation.push(output.value);
		if (Number(output.value) === 0) {
			output.value = 'Error';
		} else {
			output.value = transformInt(1 / Number(output.value));
		}
	}

	undo(calculator) {
		output.value = calculator.valueBeforeOperation.pop();
	}
}

export class FactorialCommand extends Command {
	execute(calculator) {
		if (!numberValidation(output.value)) return;
		if (!Number.isInteger(Number(output.value))) {
			return;
		}
		calculator.valueBeforeOperation.push(output.value);
		if (Number(output.value) < 0) {
			output.value = 'Error';
		} else if (Number(output.value) === 0) {
			output.value = 1;
		} else {
			for (let i = Number(output.value) - 1; i > 0; i -= 1) {
				output.value = transformInt(Number(output.value) * i);
			}
		}
	}

	undo(calculator) {
		output.value = calculator.valueBeforeOperation.pop();
	}
}

export class PiValueCommand extends Command {
	execute(calculator) {
		calculator.valueBeforeOperation.push(output.value);
		output.value = 3.14159265359;
	}

	undo(calculator) {
		output.value = calculator.valueBeforeOperation.pop();
	}
}

export class EValueCommand extends Command {
	execute(calculator) {
		calculator.valueBeforeOperation.push(output.value);
		output.value = 2.71828182846;
	}

	undo(calculator) {
		output.value = calculator.valueBeforeOperation.pop();
	}
}

export function memoryAdd(calculator) {
	calculator.memoryValue += Number(output.value);
}

export function memorySubtract(calculator) {
	calculator.memoryValue -= Number(output.value);
}

export function memoryClear(calculator) {
	calculator.memoryValue = 0;
}

export class RecallMemoryCommand extends Command {
	execute(calculator) {
		calculator.valueBeforeOperation.push(output.value);
		output.value = calculator.memoryValue;
	}

	undo(calculator) {
		output.value = calculator.valueBeforeOperation.pop();
	}
}
