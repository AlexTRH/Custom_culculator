/* eslint-disable no-unused-expressions */
/* eslint-disable no-use-before-define */
import {
	CALCULATOR,
	CURRENT_STATE,
	ERROR,
	OUTPUT,
	SIGN_VALUES,
} from './contains';

import { CommandSelector } from './CommandSelector';

export const lastValueValidation = () => {
	if (CURRENT_STATE.command) {
		OUTPUT.value = String(CALCULATOR.value);
		CURRENT_STATE.command = '';
	} else if (CALCULATOR.history.length) {
		ERROR.value ? (ERROR.value = '') : '';
		caches;
		CALCULATOR.undo();
		OUTPUT.value = String(CALCULATOR.value);
	} else {
		ERROR.value = 'History is empty';
	}
};

export const twoValueValidation = (com) => {
	const isPointMinusOrPlus =
		OUTPUT.value === '.' || OUTPUT.value === '-' || OUTPUT.value === '+';
	const invalidValue =
		!OUTPUT.value ||
		(OUTPUT.value.length && isPointMinusOrPlus) ||
		CURRENT_STATE.signIndex;
	const rootFromNegative = com.value === 'x^1/y' && Number(OUTPUT.value) < 0;
	if (CURRENT_STATE.command) {
		ERROR.value = 'Perform previous command';
	} else if (invalidValue) {
		ERROR.value = 'X value should be one number';
	} else if (rootFromNegative) {
		ERROR.value = "Can't find a root of negative number";
	} else {
		CALCULATOR.resetValue(Number(OUTPUT.value));
		OUTPUT.value = '';
		CURRENT_STATE.command = com.value;
	}
};

export const Validation = (com) => {
	const isPointOrMinusOrPlus =
		OUTPUT.value === '.' || OUTPUT.value === '-' || OUTPUT.value === '+';
	const invalidValue =
		!OUTPUT.value ||
		(OUTPUT.value.length && isPointOrMinusOrPlus) ||
		CURRENT_STATE.signIndex;
	const divisionByZero = Number(OUTPUT.value) === 0 && com.value === '1/x';
	const rootFromNegative =
		Number(OUTPUT.value) < 0 &&
		(com.value === 'x^1/2' || com.value === 'x^1/3');
	const factorialFromRealNumber =
		OUTPUT.value.includes('.') && com.value === '!';

	if (CURRENT_STATE.command) {
		ERROR.value = 'Perform previous command';
	} else if (invalidValue) {
		ERROR.value = 'The value should be one number';
	} else if (divisionByZero) {
		ERROR.value = 'Division by 0';
	} else if (rootFromNegative) {
		ERROR.value = "Can't find a root of negative number";
	} else if (factorialFromRealNumber) {
		ERROR.value = "Can't find factorial of a real number";
	} else if (com.value === '10^x') {
		CALCULATOR.resetValue(10);
		CALCULATOR.executeCommand(
			CommandSelector(com.value, Number(OUTPUT.value))
		);
		OUTPUT.value = String(CALCULATOR.value);
	} else {
		CALCULATOR.resetValue(Number(OUTPUT.value));
		CALCULATOR.executeCommand(CommandSelector(com.value));
		OUTPUT.value = String(CALCULATOR.value);
	}
};

export const signValidation = (sign) => {
	const startOfInput = !OUTPUT.value || OUTPUT.value === '-';
	const lastSymbolIsSign = SIGN_VALUES.includes(
		OUTPUT.value[OUTPUT.value.length - 1]
	);

	if (startOfInput) {
		if (sign.value === '-' && !OUTPUT.value) {
			OUTPUT.value += sign.value;
		} else if (sign.value === '+') {
			OUTPUT.value = '';
		}
	} else if (lastSymbolIsSign) {
		replaceSign(sign);
	} else if (CURRENT_STATE.command) {
		twoSignCommandHandler(sign);
	} else {
		arithmeticCommandHandler(sign);
	}
};

const replaceSign = (sign) => {
	const canAddMinus =
		sign.value === '-' &&
		CURRENT_STATE.signIndex === OUTPUT.value.length - 1;
	const lastTwoSymbolsAreSigns =
		CURRENT_STATE.signIndex &&
		CURRENT_STATE.signIndex !== OUTPUT.value.length - 1;

	if (canAddMinus) {
		OUTPUT.value += sign.value;
	} else if (lastTwoSymbolsAreSigns && sign.value !== '=') {
		OUTPUT.value =
			OUTPUT.value.substring(0, OUTPUT.value.length - 2) + sign.value;
	} else if (sign.value !== '=') {
		OUTPUT.value =
			OUTPUT.value.substring(0, OUTPUT.value.length - 1) + sign.value;
	}
};

const twoSignCommandHandler = (sign) => {
	const invalidValue =
		!OUTPUT.value || !Number.isFinite(Number(OUTPUT.value));
	const divisionByZero =
		Number(OUTPUT.value) === 0 && CURRENT_STATE.command === 'x^1/y';
	const rootFromNegative =
		CALCULATOR.value < 0 &&
		Number(OUTPUT.value) < 1 &&
		Number(OUTPUT.value) > -1;

	if (invalidValue) {
		ERROR.value = 'N value should be one number';
	} else if (divisionByZero) {
		ERROR.value = 'Division by 0';
	} else if (rootFromNegative) {
		ERROR.value = "Can't find a root of negative number";
	} else {
		CALCULATOR.executeCommand(
			CommandSelector(CURRENT_STATE.command, Number(OUTPUT.value))
		);
		OUTPUT.value = String(CALCULATOR.value);
		CURRENT_STATE.command = '';
		CURRENT_STATE.signIndex = sign.value === '=' ? 0 : OUTPUT.value.length;
		OUTPUT.value += sign.value === '=' ? '' : sign.value;
	}
};

const arithmeticCommandHandler = (sign) => {
	if (CURRENT_STATE.signIndex) {
		const y = Number(
			OUTPUT.value.substring(
				CURRENT_STATE.signIndex + 1,
				OUTPUT.value.length
			)
		);
		const divisionByZero =
			y === 0 && OUTPUT.value[CURRENT_STATE.signIndex] === '÷';

		if (divisionByZero) {
			ERROR.value = 'Division by 0';
		} else {
			CALCULATOR.executeCommand(
				CommandSelector(OUTPUT.value[CURRENT_STATE.signIndex], y)
			);
			OUTPUT.value = String(CALCULATOR.value);
			CURRENT_STATE.signIndex =
				sign.value === '=' ? 0 : OUTPUT.value.length;
			OUTPUT.value += sign.value === '=' ? '' : sign.value;
		}
	} else {
		CALCULATOR.resetValue(Number(OUTPUT.value));
		CURRENT_STATE.signIndex = sign.value === '=' ? 0 : OUTPUT.value.length;
		OUTPUT.value += sign.value === '=' ? '' : sign.value;
	}
};
