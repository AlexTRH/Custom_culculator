import {
	AddCommand,
	SubtractCommand,
	DivideCommand,
	MultiplyCommand,
	ExponentiationCommand,
	YRootCommand,
	PercentCommand,
	SquareCommand,
	CubeCommand,
	SquareRootCommand,
	CubeRootCommand,
	OneXthCommand,
	EToPowerCommand,
	FactorialCommand,
	TenToPowerCommand,
	SwitchSignCommand,
} from './operations';
import { getOutput } from './output';

jest.mock('./output', () => ({
	getOutput: jest.fn().mockReturnValue({
		value: 5,
	}),
}));

describe('AddCommand', () => {
	let addCommand;
	let calculatorMock;
	let outputMock;
	const initialValue = 15;

	beforeEach(() => {
		calculatorMock = {
			currentValue: initialValue,
			valueBeforeOperation: [getOutput().value], // first output
		};
		outputMock = getOutput();
		addCommand = new AddCommand(calculatorMock);
	});

	afterEach(() => {
		outputMock.value = 5;
	});

	test('execute() should add two numbers and update output', () => {
		addCommand.execute(calculatorMock);
		expect(outputMock.value).toBe(20);
	});
	test('undo() should subtract two numbers and update output', () => {
		outputMock.value = 20; // first test output
		addCommand.undo(calculatorMock);
		expect(outputMock.value).toBe(calculatorMock.currentValue);
	});
});

describe('SubtractCommand', () => {
	let subtractCommand;
	let calculatorMock;
	let outputMock;
	const initialValue = 15;

	beforeEach(() => {
		calculatorMock = {
			currentValue: initialValue,
			valueBeforeOperation: [getOutput().value], // first output
			equalCounter: 0,
		};
		outputMock = getOutput();
		subtractCommand = new SubtractCommand(calculatorMock);
	});

	afterEach(() => {
		outputMock.value = 5;
		calculatorMock.equalCounter = 0;
	});

	test('execute() should subtract two numbers and update output when equalCounter = 0', () => {
		subtractCommand.execute(calculatorMock);
		expect(outputMock.value).toBe(10);
	});

	test('execute() should subtract two numbers and update output when equalCounter = 1', () => {
		calculatorMock.equalCounter = 1;
		subtractCommand.execute(calculatorMock);
		expect(outputMock.value).toBe(-10);
	});
	test('undo() should add two numbers and update output', () => {
		outputMock.value = 10; // first test output
		subtractCommand.undo(calculatorMock);
		expect(outputMock.value).toBe(calculatorMock.currentValue);
	});
});

describe('MultiplyCommand', () => {
	let multiplyCommand;
	let calculatorMock;
	let outputMock;
	const initialValue = 10;

	beforeEach(() => {
		calculatorMock = {
			currentValue: initialValue,
			valueBeforeOperation: [getOutput().value], // first output
		};
		outputMock = getOutput();
		multiplyCommand = new MultiplyCommand(calculatorMock);
	});

	afterEach(() => {
		outputMock.value = 5;
	});

	test('execute() should multiply two numbers and update output', () => {
		multiplyCommand.execute(calculatorMock);
		expect(outputMock.value).toBe(50);
	});

	test('execute() should multiply two numbers and update output when output.value = 0', () => {
		outputMock.value = 0;
		multiplyCommand.execute(calculatorMock);
		expect(outputMock.value).toBe(0);
	});

	test('undo() should divide two numbers and update output', () => {
		outputMock.value = 50; // first test output
		multiplyCommand.undo(calculatorMock);
		expect(outputMock.value).toBe(calculatorMock.currentValue);
	});
});

describe('DivideCommand', () => {
	let divideCommand;
	let calculatorMock;
	let outputMock;
	const initialValue = 10;

	beforeEach(() => {
		calculatorMock = {
			currentValue: initialValue,
			valueBeforeOperation: [getOutput().value], // first output (from getOutput)
			equalCounter: 0,
		};
		outputMock = getOutput();
		divideCommand = new DivideCommand(calculatorMock);
	});

	afterEach(() => {
		outputMock.value = 5;
		calculatorMock.equalCounter = 0;
	});

	test('execute() should divide two numbers and update output when equalCounter = 0', () => {
		divideCommand.execute(calculatorMock);
		expect(outputMock.value).toBe(2);
	});

	test('execute() should divide two numbers and update output when equalCounter = 1', () => {
		calculatorMock.equalCounter = 1;
		divideCommand.execute(calculatorMock);
		expect(outputMock.value).toBe(0.5);
	});

	test('execute() should divide two numbers when first value = 0', () => {
		calculatorMock.currentValue = 0;
		divideCommand.execute(calculatorMock);
		expect(outputMock.value).toBe(0);
	});

	test('execute() should not divide two numbers when second value = 0', () => {
		outputMock.value = 0;
		divideCommand.execute(calculatorMock);
		expect(outputMock.value).toBe('Error');
	});

	test('undo() should multiply two numbers and update output', () => {
		outputMock.value = 2; // first test output
		divideCommand.undo(calculatorMock);
		expect(outputMock.value).toBe(calculatorMock.currentValue);
	});
});

describe('ExponentiationCommand', () => {
	let exponentiationCommand;
	let calculatorMock;
	let outputMock;
	const initialValue = 2;

	beforeEach(() => {
		calculatorMock = {
			currentValue: initialValue,
			equalCounter: 0,
		};
		outputMock = getOutput();
		exponentiationCommand = new ExponentiationCommand(calculatorMock);
	});

	afterEach(() => {
		calculatorMock.currentValue = initialValue;
		outputMock.value = 5;
		calculatorMock.equalCounter = 0;
	});

	test('execute() should raise the number x to the power of y and update output when equalCounter = 0', () => {
		exponentiationCommand.execute(calculatorMock);
		expect(outputMock.value).toBe(32);
	});

	test('execute() should raise the number x to the power of y and update output when equalCounter = 1', () => {
		calculatorMock.equalCounter = 1;
		exponentiationCommand.execute(calculatorMock);
		expect(outputMock.value).toBe(25);
	});

	test('undo() should count the root y of the number x and update output', () => {
		calculatorMock.equalCounter = 1;
		calculatorMock.currentValue = 5;
		outputMock.value = 32; // first test output
		exponentiationCommand.undo(calculatorMock);
		expect(outputMock.value).toBe(2);
	});
});

describe('YRootCommand', () => {
	let yRootCommand;
	let calculatorMock;
	let outputMock;
	const initialValue = 1024;

	beforeEach(() => {
		calculatorMock = {
			currentValue: initialValue,
			valueBeforeOperation: [getOutput().value], // first output
			equalCounter: 0,
		};
		outputMock = getOutput();
		yRootCommand = new YRootCommand(calculatorMock);
	});

	afterEach(() => {
		outputMock.value = 5;
		calculatorMock.valueBeforeOperation = [calculatorMock.currentValue];
		calculatorMock.equalCounter = 0;
	});

	test('execute() should count the root y of the number x and update output when equalCounter = 0', () => {
		yRootCommand.execute(calculatorMock);
		expect(outputMock.value).toBe(4);
	});

	test('execute() should count the root y of the number x and update output when equalCounter = 1', () => {
		calculatorMock.equalCounter = 1;
		yRootCommand.execute(calculatorMock);
		expect(outputMock.value).toBe(1.00157295);
	});

	test('undo() should raise the number x to the power of y and update output', () => {
		calculatorMock.equalCounter = 0;
		outputMock.value = 4; // first test output
		yRootCommand.undo(calculatorMock);
		expect(outputMock.value).toBe(calculatorMock.currentValue);
	});
});

describe('PercentCommand', () => {
	let percentCommand;
	let calculatorMock;
	let outputMock;
	const initialValue = 100;

	beforeEach(() => {
		calculatorMock = {
			currentValue: initialValue,
			valueBeforeOperation: [0.05], // first output
			operatorActive: true,
		};
		outputMock = getOutput();
		percentCommand = new PercentCommand(calculatorMock);
	});

	afterEach(() => {
		outputMock.value = 5;
	});

	test('execute() should count the percent used for previous operator and update output', () => {
		percentCommand.execute(calculatorMock);
		expect(outputMock.value).toBe(0.05);
	});

	test('execute() should count the percent for output from 100 and update output', () => {
		calculatorMock.operatorActive = false;
		percentCommand.execute(calculatorMock);
		expect(outputMock.value).toBe(5);
	});

	test('undo() should multiply 100 and previous value', () => {
		calculatorMock.operatorActive = false;
		percentCommand.undo(calculatorMock);
		expect(outputMock.value).toBe(getOutput().value); // need to get original output
	});
});

describe('SquareCommand', () => {
	let squareCommand;
	let calculatorMock;
	let outputMock;

	beforeEach(() => {
		calculatorMock = {
			valueBeforeOperation: [getOutput().value], // first output
			operatorActive: true,
		};
		outputMock = getOutput();
		squareCommand = new SquareCommand(calculatorMock);
	});

	afterEach(() => {
		outputMock.value = 5;
	});

	test('execute() should square output and update it', () => {
		squareCommand.execute(calculatorMock);
		expect(outputMock.value).toBe(25);
	});

	test('undo() should get output value before square', () => {
		calculatorMock.operatorActive = false;
		squareCommand.undo(calculatorMock);
		expect(outputMock.value).toBe(getOutput().value); // need to get original output
	});
});

describe('CubeCommand', () => {
	let cubeCommand;
	let calculatorMock;
	let outputMock;

	beforeEach(() => {
		calculatorMock = {
			valueBeforeOperation: [getOutput().value], // first output
		};
		outputMock = getOutput();
		cubeCommand = new CubeCommand(calculatorMock);
	});

	afterEach(() => {
		outputMock.value = 5;
	});

	test('execute() should cube output and update it', () => {
		cubeCommand.execute(calculatorMock);
		expect(outputMock.value).toBe(125);
	});

	test('undo() should get output value before cube', () => {
		cubeCommand.undo(calculatorMock);
		expect(outputMock.value).toBe(getOutput().value); // need to get original output
	});
});

describe('SquareRootCommand', () => {
	let squareRootCommand;
	let calculatorMock;
	let outputMock;

	beforeEach(() => {
		calculatorMock = {
			valueBeforeOperation: [4], // first output
		};
		outputMock = getOutput();
		squareRootCommand = new SquareRootCommand(calculatorMock);
	});

	afterEach(() => {
		outputMock.value = 4;
	});

	test('execute() should return Error to output when output value < 0', () => {
		outputMock.value = -1;
		squareRootCommand.execute(calculatorMock);
		expect(outputMock.value).toBe('Error');
	});

	test('execute() should return 0 to output when output value = 0', () => {
		outputMock.value = 0;
		squareRootCommand.execute(calculatorMock);
		expect(outputMock.value).toBe(0);
	});
	test('execute() should calculate square root for output value and update it', () => {
		squareRootCommand.execute(calculatorMock);
		expect(outputMock.value).toBe(2);
	});
	test('undo() should calculate square root for output value and update it', () => {
		squareRootCommand.undo(calculatorMock);
		expect(outputMock.value).toBe(4);
	});
});

describe('CubeRootCommand', () => {
	let cubeRootCommand;
	let calculatorMock;
	let outputMock;

	beforeEach(() => {
		calculatorMock = {
			valueBeforeOperation: [8], // first output
		};
		outputMock = getOutput();
		cubeRootCommand = new CubeRootCommand(calculatorMock);
	});

	afterEach(() => {
		outputMock.value = 8;
	});

	test('execute() should return Error to output when output value < 0', () => {
		outputMock.value = -1;
		cubeRootCommand.execute(calculatorMock);
		expect(outputMock.value).toBe('Error');
	});
	test('execute() should return 0 to output when output value = 0', () => {
		outputMock.value = 0;
		cubeRootCommand.execute(calculatorMock);
		expect(outputMock.value).toBe(0);
	});
	test('execute() should calculate cube root for output value and update it', () => {
		outputMock.value = 8;
		cubeRootCommand.execute(calculatorMock);
		expect(outputMock.value).toBe(2);
	});
	test('undo() should calculate cube root for output value and update it', () => {
		cubeRootCommand.undo(calculatorMock);
		expect(outputMock.value).toBe(8);
	});
});

describe('EToPowerCommand', () => {
	let eToPowerCommand;
	let calculatorMock;
	let outputMock;

	beforeEach(() => {
		calculatorMock = {
			valueBeforeOperation: [getOutput().value], // first output
		};
		outputMock = getOutput();
		eToPowerCommand = new EToPowerCommand(calculatorMock);
	});

	afterEach(() => {
		outputMock.value = 5;
	});

	test('execute() should raise the e value to the power of output and update output', () => {
		eToPowerCommand.execute(calculatorMock);
		expect(outputMock.value).toBe(2980.95774743);
	});
	test('undo() should get output value before operation and update it', () => {
		eToPowerCommand.undo(calculatorMock);
		expect(outputMock.value).toBe(getOutput().value);
	});
});

describe('TenToPowerCommand', () => {
	let tenToPowerCommand;
	let calculatorMock;
	let outputMock;

	beforeEach(() => {
		calculatorMock = {
			valueBeforeOperation: [getOutput().value], // first output
		};
		outputMock = getOutput();
		tenToPowerCommand = new TenToPowerCommand(calculatorMock);
	});

	afterEach(() => {
		outputMock.value = 5;
	});

	test('execute() should raise 10 to the power of output and update output', () => {
		tenToPowerCommand.execute(calculatorMock);
		expect(outputMock.value).toBe(100000);
	});
	test('undo() should return output value before operation and update it', () => {
		tenToPowerCommand.undo(calculatorMock);
		expect(outputMock.value).toBe(getOutput().value);
	});
});

describe('OneXthCommand', () => {
	let oneXthCommand;
	let calculatorMock;
	let outputMock;

	beforeEach(() => {
		calculatorMock = {
			valueBeforeOperation: [getOutput().value], // first output
		};
		outputMock = getOutput();
		oneXthCommand = new OneXthCommand(calculatorMock);
	});

	afterEach(() => {
		outputMock.value = 5;
	});
	test('execute() should not divide 1 by 0 value and should return Error to output', () => {
		outputMock.value = 0;
		oneXthCommand.execute(calculatorMock);
		expect(outputMock.value).toBe('Error');
	});

	test('execute() should divide 1 by the output value and update output', () => {
		oneXthCommand.execute(calculatorMock);
		expect(outputMock.value).toBe(0.2);
	});
	test('undo() should return output value before operation and update it', () => {
		oneXthCommand.undo(calculatorMock);
		expect(outputMock.value).toBe(getOutput().value);
	});
});

describe('FactorialCommand', () => {
	let factorialCommand;
	let calculatorMock;
	let outputMock;

	beforeEach(() => {
		calculatorMock = {
			valueBeforeOperation: [getOutput().value], // first output
		};
		outputMock = getOutput();
		factorialCommand = new FactorialCommand(calculatorMock);
	});

	afterEach(() => {
		outputMock.value = 5;
	});
	test('execute() should not count factorial for values < 0 value operation should return Error to output', () => {
		outputMock.value = -1;
		factorialCommand.execute(calculatorMock);
		expect(outputMock.value).toBe('Error');
	});
	test('execute() should return 1 when output value = 0', () => {
		outputMock.value = 0;
		factorialCommand.execute(calculatorMock);
		expect(outputMock.value).toBe(1);
	});
	test('undo() should calculate factorial for positive integers and update output with result', () => {
		factorialCommand.execute(calculatorMock);
		expect(outputMock.value).toBe(120);
	});
	test('undo() should return output value before operation and update it', () => {
		factorialCommand.undo(calculatorMock);
		expect(outputMock.value).toBe(getOutput().value);
	});
});

describe('SwitchSignCommand', () => {
	let switchSignCommand;
	let calculatorMock;
	let outputMock;

	beforeEach(() => {
		calculatorMock = {
			valueBeforeOperation: [getOutput().value], // first output
		};
		outputMock = getOutput();
		switchSignCommand = new SwitchSignCommand(calculatorMock);
	});

	afterEach(() => {
		outputMock.value = 5;
	});
	test('execute() should change sign to (-) of input value and update output', () => {
		switchSignCommand.execute(calculatorMock);
		expect(outputMock.value).toBe(-5);
	});
	test('execute() should change sign to (+) of input value and update output', () => {
		outputMock.value = -5;
		switchSignCommand.execute(calculatorMock);
		expect(outputMock.value).toBe(5);
	});
	test('undo() should return output value before operation and update it', () => {
		switchSignCommand.undo(calculatorMock);
		expect(outputMock.value).toBe(getOutput().value);
	});
});

// /**
//  * @jest-environment jsdom
//  */
//
// import { calculator } from './contains';
// import {
// 	AddCommand,
// 	SubstractCommand,
// 	MultiplyCommand,
// 	DivideCommand,
// 	PowCommand,
// 	FactorialCommand,
// 	InversionCommand,
// 	PercentageCommand,
// } from './CommandSelector';
//
// test('AddCommand test: 10 + 20 = 30', () => {
// 	calculator.resetValue(10);
// 	calculator.executeCommand(new AddCommand(20));
// 	expect(calculator.value).toBe(30);
// });
//
// test('SubstractCommand test: 22 - 2 = 20', () => {
// 	calculator.resetValue(22);
// 	calculator.executeCommand(new SubstractCommand(2));
// 	expect(calculator.value).toBe(20);
// });
//
// test('MultiplyCommand test: 20 * 3 = 60', () => {
// 	calculator.resetValue(20);
// 	calculator.executeCommand(new MultiplyCommand(3));
// 	expect(calculator.value).toBe(60);
// });
//
// test('DivideCommand test: 50 / 2 = 25', () => {
// 	calculator.resetValue(50);
// 	calculator.executeCommand(new DivideCommand(2));
// 	expect(calculator.value).toBe(25);
// });
//
// test('PowCommand test: 4 ^ 2 = 16', () => {
// 	calculator.resetValue(4);
// 	calculator.executeCommand(new PowCommand(2));
// 	expect(calculator.value).toBe(16);
// });
//
// test('PowCommand test: 2 ^ 3 = 8', () => {
// 	calculator.resetValue(2);
// 	calculator.executeCommand(new PowCommand(3));
// 	expect(calculator.value).toBe(8);
// });
//
// test('PowCommand test: 10 ^ 3 = 1000000', () => {
// 	calculator.resetValue(100);
// 	calculator.executeCommand(new PowCommand(3));
// 	expect(calculator.value).toBe(1000000);
// });
//
// test('PowCommand test: 4 ^ 1/2 = 2', () => {
// 	calculator.resetValue(4);
// 	calculator.executeCommand(new PowCommand(1 / 2));
// 	expect(calculator.value).toBe(2);
// });
//
// test('FactorialCommand test: 5! = 120', () => {
// 	calculator.resetValue(5);
// 	calculator.executeCommand(new FactorialCommand());
// 	expect(calculator.value).toBe(120);
// });
//
// test('FactorialCommand test: -5! = -120', () => {
// 	calculator.resetValue(-5);
// 	calculator.executeCommand(new FactorialCommand());
// 	expect(calculator.value).toBe(-120);
// });
//
// test('FactorialCommand test: 0! = 1', () => {
// 	calculator.resetValue(0);
// 	calculator.executeCommand(new FactorialCommand());
// 	expect(calculator.value).toBe(1);
// });
//
// test('FactorialCommand test: 1! = 1', () => {
// 	calculator.resetValue(1);
// 	calculator.executeCommand(new FactorialCommand());
// 	expect(calculator.value).toBe(1);
// });
//
// test('InversionCommand test: 4 = -4', () => {
// 	calculator.resetValue(4);
// 	calculator.executeCommand(new InversionCommand());
// 	expect(calculator.value).toBe(-4);
// });
//
// test('PercentageCommand test: 32 = 0.32', () => {
// 	calculator.resetValue(32);
// 	calculator.executeCommand(new PercentageCommand());
// 	expect(calculator.value).toBe(0.32);
// });
