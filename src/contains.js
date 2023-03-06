/* eslint-disable object-shorthand */
/* eslint-disable func-names */
/* eslint-disable no-return-assign */
/* eslint-disable no-param-reassign */
/* eslint-disable import/no-cycle */
import { Calculator } from './Calculator';

export const CALCULATOR = new Calculator();

export const OUTPUT = document.getElementById('output');
export const NUMBERS = document.querySelectorAll('button.number');
export const SIGNS = document.getElementsByName('sign');
export const ALLCLEAR = document.getElementById('allClear');
export const ONE_VALUE_COMMANDS =
	document.getElementsByName('oneValueCommands');
export const TWO_VALUE_COMMANDS =
	document.getElementsByName('twoValueCommands');
export const MEMORIES = document.getElementsByName('memory');
export const PREV_OPERATION_BUTTON = document.getElementById('prevOperation');
export const MEMORY_VALUE = document.getElementById('memoryValue');
export const DARK_THEME_BUTTON = document.getElementById('darkTheme');
export const LIGHT_THEME_BUTTON = document.getElementById('lightTheme');
export const ALL_ELEMENTS = document.querySelectorAll('*');
export const BODY = document.querySelectorAll('body')[0];
export const ERROR = document.getElementById('errorMessage');
export const CELL = document.getElementsByName('cell');

export const SIGN_VALUES = ['+', '-', '×', '÷'];

const STATE = {
	x: 0,
	y: 0,
	signIndex: 0,
	command: '',
	theme: 'dark',
};

export const CURRENT_STATE = new Proxy(STATE, {
	set: function (target, key, value) {
		if (key === 'command') {
			TWO_VALUE_COMMANDS.forEach(
				(com) =>
					(com.style.backgroundColor =
						com.value === value
							? 'white'
							: 'rgba(255, 255, 255, 0.1')
			);
		}
		target[key] = value;
		return true;
	},
});
