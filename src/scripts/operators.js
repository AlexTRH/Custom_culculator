import {
	AddCommand,
	SubtractCommand,
	MultiplyCommand,
	DivideCommand,
	ClearCommand,
	ExponentiationCommand,
	YRootCommand,
	SwitchSignCommand,
	PercentCommand,
	memoryAdd,
	memorySubtract,
	memoryClear,
	RecallMemoryCommand,
	SquareCommand,
	CubeCommand,
	SquareRootCommand,
	CubeRootCommand,
	EToPowerCommand,
	TenToPowerCommand,
	OneXthCommand,
	FactorialCommand,
	PiValueCommand,
	EValueCommand,
} from './operations';

import { getOutput } from './output';

const output = getOutput();

function operationsSwitch(calculator) {
	const outputBeforeOperation = output.value;
	switch (calculator.currentOperator) {
		case '+':
			calculator.command = new AddCommand(calculator);
			break;
		case '-':
			calculator.command = new SubtractCommand(calculator);
			break;
		case '*':
			calculator.command = new MultiplyCommand(calculator);
			break;
		case '/':
			calculator.command = new DivideCommand(calculator);
			break;
		case 'exponentiation':
			calculator.command = new ExponentiationCommand(calculator);
			break;
		case 'y_root':
			calculator.command = new YRootCommand(calculator);
			break;
		default:
			break;
	}
	if (calculator.equalCounter === 0) {
		calculator.valueBeforeOperation.push(output.value);
	} else {
		calculator.valueBeforeOperation.push(calculator.currentValue);
	}
	calculator.executeCommand(calculator.command);
	if (calculator.equalCounter === 0) {
		calculator.currentValue = outputBeforeOperation;
	}
}

function handleOperatorClick(clickedOperator, calculator) {
	if (calculator.operatorActive === true) {
		calculator.currentValue = output.value;
		calculator.currentOperator = clickedOperator;
		return;
	}
	if (calculator.currentOperator !== '') {
		operationsSwitch(calculator);
	}
	calculator.operatorActive = true;
	calculator.currentValue = output.value;
	calculator.currentOperator = clickedOperator;
	calculator.newNumber = true;
}

export function operatorsInit(calculator) {
	const operators = document.querySelector('.calculator_container');
	operators.addEventListener('click', (operator) => {
		if (operator.target.classList.contains('key_operator')) {
			handleOperatorClick(operator.target.value, calculator);
			calculator.equalCounter = 0;
		} else if (operator.target.id === 'equal') {
			operationsSwitch(calculator);
			calculator.operatorActive = true;
			calculator.newNumber = true;
			calculator.equalCounter += 1;
		} else if (operator.target.id === 'clear') {
			calculator.command = new ClearCommand(calculator);
			calculator.executeCommand(calculator.command);
			calculator.equalCounter = 0;
		} else if (operator.target.id === 'switchSign') {
			calculator.command = new SwitchSignCommand(calculator);
			calculator.executeCommand(calculator.command);
			calculator.equalCounter = 0;
		} else if (operator.target.id === 'percent') {
			calculator.command = new PercentCommand(calculator);
			calculator.executeCommand(calculator.command);
		} else if (operator.target.id === 'memoryAdd') {
			memoryAdd(calculator);
		} else if (operator.target.id === 'memorySubtract') {
			memorySubtract(calculator);
		} else if (operator.target.id === 'memoryClear') {
			memoryClear(calculator);
		} else if (operator.target.id === 'memoryRecall') {
			calculator.command = new RecallMemoryCommand(calculator);
			calculator.executeCommand(calculator.command);
		} else if (operator.target.id === 'square') {
			calculator.command = new SquareCommand(calculator);
			calculator.executeCommand(calculator.command);
		} else if (operator.target.id === 'cube') {
			calculator.command = new CubeCommand(calculator);
			calculator.executeCommand(calculator.command);
		} else if (operator.target.id === 'squareRoot') {
			calculator.command = new SquareRootCommand(calculator);
			calculator.executeCommand(calculator.command);
		} else if (operator.target.id === 'cubeRoot') {
			calculator.command = new CubeRootCommand(calculator);
			calculator.executeCommand(calculator.command);
		} else if (operator.target.id === 'eToPower') {
			calculator.command = new EToPowerCommand(calculator);
			calculator.executeCommand(calculator.command);
		} else if (operator.target.id === '10_toPower') {
			calculator.command = new TenToPowerCommand(calculator);
			calculator.executeCommand(calculator.command);
		} else if (operator.target.id === 'one_x-th') {
			calculator.command = new OneXthCommand(calculator);
			calculator.executeCommand(calculator.command);
		} else if (operator.target.id === 'factorial') {
			calculator.command = new FactorialCommand(calculator);
			calculator.executeCommand(calculator.command);
		} else if (operator.target.id === 'pi') {
			calculator.command = new PiValueCommand(calculator);
			calculator.executeCommand(calculator.command);
		} else if (operator.target.id === 'e') {
			calculator.command = new EValueCommand(calculator);
			calculator.executeCommand(calculator.command);
		}
	});
}
