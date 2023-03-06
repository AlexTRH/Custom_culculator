/* eslint-disable import/no-cycle */
import { MEMORY_VALUE } from './contains';

// eslint-disable-next-line import/prefer-default-export
export class Calculator {
	constructor() {
		this.value = 0;
		this.history = [];
		this.memory = 0;
	}

	resetMemory() {
		this.memory = 0;
		MEMORY_VALUE.innerHTML = this.memory;
	}

	changeMemory(value) {
		this.memory += value;
		MEMORY_VALUE.innerHTML = this.memory;
	}

	resetValue(value) {
		this.value = value;
	}

	executeCommand(command) {
		this.history.push(this.value);
		this.value = command.execute(this.value);
	}

	undo() {
		this.resetValue(this.history.pop());
	}
}
