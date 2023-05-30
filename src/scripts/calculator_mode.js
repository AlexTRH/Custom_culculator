const switchCalculatorMode = document.getElementById('showOperations');

export function switchMode() {
	const calculator = document.querySelector('.calculator_container');
	const zero = document.querySelector('.zero');
	calculator.classList.toggle('pro');
	zero.classList.toggle('no_radius');
	if (switchCalculatorMode.innerText === 'More') {
		switchCalculatorMode.innerText = 'Close';
	} else {
		switchCalculatorMode.innerText = 'More';
	}
}

switchCalculatorMode.addEventListener('click', switchMode);
export { switchCalculatorMode };

// const memoryValue = document.getElementById('memoryValue');
//
// export default class Calculator_mode {
// 	constructor() {
// 		this.value = 0;
// 		this.history = [];
// 		this.memory = 0;
// 	}
//
// 	resetMemory() {
// 		this.memory = 0;
// 		memoryValue.innerHTML = this.memory;
// 	}
//
// 	changeMemory(value) {
// 		this.memory += value;
// 		memoryValue.innerHTML = this.memory;
// 	}
//
// 	resetValue(value) {
// 		this.value = value;
// 	}
//
// 	executeCommand(command) {
// 		this.history.push(this.value);
// 		this.value = command.execute(this.value);
// 	}
//
// 	undo() {
// 		this.resetValue(this.history.pop());
// 	}
// }
