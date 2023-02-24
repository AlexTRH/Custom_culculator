class Calculator {
	constructor(
		previousOperandTextElement,
		currentOperandTextElement,
		memoryTextElement
	) {
		this.previousOperandTextElement = previousOperandTextElement;
		this.currentOperandTextElement = currentOperandTextElement;
		this.memoryTextElement = memoryTextElement;
		this.memory = null;
		this.resetCalc = false;
		this.clear();
	}

	clear() {
		this.currentOperand = '';
		this.previousOperand = '';
		this.operation = undefined;
	}

	appendNumber(number) {
		if (number === '.' && this.currentOperand.includes('.')) return;
		this.currentOperand =
			this.currentOperand.toString() + number.toString();
	}

	changeSign() {
		this.currentOperand = this.currentOperand.toString();
		if (this.currentOperand.includes('-')) {
			this.currentOperand = this.currentOperand.slice(1);
		} else {
			this.currentOperand = `-${this.currentOperand}`;
		}
	}

	clearMemory() {
		this.memory = null;
	}

	addToMemory() {
		if (this.currentOperand === '') return;
		// eslint-disable-next-line no-unused-expressions
		this.memory
			? (this.memory += parseFloat(this.currentOperand))
			: (this.memory = parseFloat(this.currentOperand));
	}

	subMemory() {
		if (this.currentOperand === '') return;
		// eslint-disable-next-line no-unused-expressions
		this.memory
			? (this.memory -= parseFloat(this.currentOperand))
			: (this.memory = -parseFloat(this.currentOperand));
	}

	readMemory() {
		if (this.memory === null) return;
		this.currentOperand = this.memory;
	}

	factorial(n) {
		if (n === 1) {
			return n;
		}
		return n * this.factorial(n - 1);
	}

	singleOperation(operationSingle) {
		let computation;
		const current = parseFloat(this.currentOperand);

		// eslint-disable-next-line no-restricted-globals
		if (isNaN(current)) return;

		this.operationSingle = operationSingle;

		switch (this.operationSingle) {
			case '%':
				computation = current / 100;
				break;
			case 'x²':
				computation = current ** 2;
				break;
			case 'x³':
				computation = current ** 3;
				break;
			case '1/x':
				computation = 1 / current;
				break;
			case '10ˣ':
				computation = 10 ** current;
				break;
			case '²√x':
				computation = current ** (1 / 2);
				break;
			case '³√x':
				computation = current ** (1 / 3);
				break;
			case 'x!':
				if (current < 0) computation = NaN;
				else if (current === 0) computation = 1;
				else computation = this.factorial(current);
				break;
			default:
		}

		if (this.previousOperand === '') {
			this.resetCalc = true;
		}

		// eslint-disable-next-line no-restricted-globals
		this.currentOperand = isNaN(computation) ? 'Error' : computation;
	}

	chooseOperation(operation) {
		if (this.currentOperand === '') return;
		if (this.previousOperand !== '') {
			this.compute();
		}

		if (operation === 'xʸ') this.operation = '^';
		else if (operation === 'ʸ√x') this.operation = '^ 1/';
		else this.operation = operation;

		this.previousOperand = this.currentOperand;
		this.currentOperand = '';
	}

	setOperation(operation) {
		this.operation = operation;
	}

	compute() {
		let computation;
		const prev = parseFloat(this.previousOperand);
		const current = parseFloat(this.currentOperand);
		// eslint-disable-next-line no-restricted-globals
		if (isNaN(prev) || isNaN(current)) return;
		switch (this.operation) {
			case '+':
				computation = prev + current;
				break;
			case '-':
				computation = prev - current;
				break;
			case 'x':
				computation = prev * current;
				break;
			case '÷':
				computation = prev / current;
				break;
			case '^':
				computation = prev ** current;
				break;
			case '^ 1/':
				if (prev < 0 && current % 2 !== 1) computation = NaN;
				else
					computation =
						(prev < 0 ? -1 : 1) * Math.abs(prev) ** (1 / current);
				break;
			default:
				return;
		}
		this.currentOperand =
			// eslint-disable-next-line no-restricted-globals
			computation === Infinity || isNaN(computation)
				? 'Error'
				: computation;
		this.operation = undefined;
		this.previousOperand = '';
	}

	// eslint-disable-next-line class-methods-use-this
	getDisplayNumber(number) {
		const stringNumber = number.toString();
		const integerDigits = parseFloat(stringNumber.split('.')[0]);
		const decimalDigits = stringNumber.split('.')[1];
		let integerDisplay;
		// eslint-disable-next-line no-restricted-globals
		if (isNaN(integerDigits)) {
			integerDisplay = '';
		} else {
			integerDisplay = integerDigits.toLocaleString('en', {
				maximumFractionDigits: 0,
			});
		}
		if (decimalDigits != null) {
			return `${integerDisplay}.${decimalDigits}`;
		}
		return integerDisplay;
	}

	updateDisplay() {
		if (this.memory !== null) {
			this.memoryTextElement.innerText = `M: ${this.memory}`;
		} else {
			this.memoryTextElement.innerText = '';
		}

		if (this.currentOperand === 'Error') {
			this.currentOperandTextElement.innerText = this.currentOperand;
			this.clear();
		} else
			this.currentOperandTextElement.innerText = this.getDisplayNumber(
				this.currentOperand
			);

		if (this.operation != null) {
			this.previousOperandTextElement.innerText = `${this.getDisplayNumber(
				this.previousOperand
			)} ${this.operation}`;
		} else {
			this.previousOperandTextElement.innerText = '';
		}
	}
}

const prevOperand = document.querySelector('[data_previous_operand]');
const currentOperand = document.querySelector('[data_current_operand]');
const calcMemory = document.querySelector('[data_calc_memory]');
const numberButtons = document.querySelectorAll('[data_number]');
const operationButtons = document.querySelectorAll('[data_operation]');
const singleOperationButtons = document.querySelectorAll(
	'[data_single_operation]'
);
const equalsButton = document.querySelector('[data_equals]');
const allClearButton = document.querySelector('[data_all_clear]');
const changeSign = document.querySelector('[data_change_sign]');
const readMemory = document.querySelector('[data_memory_read]');
const addToMemory = document.querySelector('[data_add_value]');
const subMemory = document.querySelector('[data_sub_value]');
const clearMemory = document.querySelector('[data_memory_clear]');

const calculator = new Calculator(prevOperand, currentOperand, calcMemory);

function mapEvent(element, callback) {
	// eslint-disable-next-line no-prototype-builtins
	if (!NodeList.prototype.isPrototypeOf(element)) {
		element.addEventListener('click', () => {
			callback.call(calculator);
			calculator.updateDisplay();
			if (callback.name === 'compute') calculator.resetCalc = true;
		});
	} else {
		Array.from(element).forEach((el) => {
			el.addEventListener('click', () => {
				callback.call(calculator, el.innerText);
				calculator.updateDisplay();
			});
		});
	}
}

function mapAllEvents() {
	mapEvent(equalsButton, calculator.compute); // compute
	mapEvent(allClearButton, calculator.clear); // clear
	mapEvent(changeSign, calculator.changeSign); // change

	mapEvent(subMemory, calculator.subMemory);
	mapEvent(addToMemory, calculator.addToMemory);
	mapEvent(clearMemory, calculator.clearMemory); // memory
	mapEvent(readMemory, calculator.readMemory);

	mapEvent(numberButtons, calculator.appendNumber); // append
	mapEvent(operationButtons, calculator.chooseOperation); // choose
	mapEvent(singleOperationButtons, calculator.singleOperation); // single
}

mapAllEvents();
