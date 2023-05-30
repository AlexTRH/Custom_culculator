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
// import '../styles/main.css';
// import {
// 	darkThemeButton,
// 	lightThemeButton,
// 	memories,
// 	numbers,
// 	oneValueCommands,
// 	prevOperationButton,
// 	output,
// 	signs,
// 	twoValueCommands,
// 	error,
// 	allClear,
// } from './contains';
//
// import {
// 	Validation,
// 	twoValueValidation,
// 	signValidation,
// 	lastValueValidation,
// } from './errorHandler';
//
// import { themeChangeDark, themeChangeLight } from './switchTheme';
//
// allClear.addEventListener('click', () => {
// 	output.value = '';
// });
//
// numbers.forEach((num) =>
// 	num.addEventListener('click', () => (output.value += num.value))
// );
//
// signs.forEach((sign) =>
// 	sign.addEventListener('click', () => signValidation(sign))
// );
//
// oneValueCommands.forEach((com) =>
// 	com.addEventListener('click', () => Validation(com))
// );
//
// twoValueCommands.forEach((com) =>
// 	com.addEventListener('click', () => twoValueValidation(com))
// );
//
// memories.forEach((mem) => mem.addEventListener('click', () => Validation(mem)));
//
// darkThemeButton.addEventListener('click', themeChangeDark);
// lightThemeButton.addEventListener('click', themeChangeLight);
//
// prevOperationButton.addEventListener('click', lastValueValidation);
//
// output.addEventListener('input', error.value ? (error.value = '') : '');
//
// const descriptorProp = Object.getOwnPropertyDescriptor(
// 	HTMLInputElement.prototype,
// 	'value'
// );
// const descriptorAttr = Object.getOwnPropertyDescriptor(
// 	Element.prototype,
// 	'setAttribute'
// );
//
// Object.defineProperties(output, {
// 	value: {
// 		get: descriptorProp.get,
// 		set(value) {
// 			error.value ? (error.value = '') : '';
// 			descriptorProp.set.call(this, value);
// 		},
// 	},
// 	setAttribute: {
// 		value(attr, value) {
// 			if (attr === 'value') {
// 				error.value ? (error.value = '') : '';
// 			}
// 			descriptorAttr.value.call(this, attr, value);
// 		},
// 	},
// });
