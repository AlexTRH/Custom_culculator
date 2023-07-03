import '../styles/main.css';
import { operatorsInit } from './operators';
import { numbersInit } from './numbers';
import { themeSwitch } from './switchTheme';
import { switchCalculatorMode } from './calculator_mode';

export class Calculator {
	constructor(
		currentOperator,
		currentValue,
		operatorActive,
		newNumber,
		maxOutputLength,
		equalCounter,
		memoryValue,
		command
	) {
		this.currentOperator = currentOperator;
		this.currentValue = currentValue;
		this.operatorActive = operatorActive;
		this.newNumber = newNumber;
		this.maxOutputLength = maxOutputLength;
		this.equalCounter = equalCounter;
		this.memoryValue = memoryValue;
		this.valueBeforeOperation = [];
		this.history = [];
		this.command = command;
	}

	executeCommand(command) {
		this.history.push(command);
		command.execute(this);
	}

	undoCommand() {
		const historyItem = this.history.pop();
		if (historyItem) {
			const command = historyItem;
			command.undo(this);
		} else {
			throw new Error('No undo operations left');
		}
	}
}

document.addEventListener('DOMContentLoaded', () => {
	const calculator = new Calculator('', 0, false, true, 14, 0, 0);
	const undo = document.getElementById('undo');
	undo.addEventListener('click', () => {
		calculator.undoCommand();
	});
	numbersInit(calculator);
	operatorsInit(calculator);
	switchCalculatorMode();
	themeSwitch();
});
