/* eslint-disable no-unused-expressions */
/* eslint-disable no-return-assign */
import './main.css';
import {
	DARK_THEME_BUTTON,
	LIGHT_THEME_BUTTON,
	MEMORIES,
	NUMBERS,
	ONE_VALUE_COMMANDS,
	PREV_OPERATION_BUTTON,
	OUTPUT,
	SIGNS,
	TWO_VALUE_COMMANDS,
	ERROR,
	ALLCLEAR,
} from './contains';

import {
	Validation,
	twoValueValidation,
	signValidation,
	lastValueValidation,
} from './errorHandler';

import { themeChangeDark, themeChangeLight } from './themeChange';

ALLCLEAR.addEventListener('click', () => {
	OUTPUT.value = '';
});

NUMBERS.forEach((num) =>
	num.addEventListener('click', () => (OUTPUT.value += num.value))
);

SIGNS.forEach((sign) =>
	sign.addEventListener('click', () => signValidation(sign))
);

ONE_VALUE_COMMANDS.forEach((com) =>
	com.addEventListener('click', () => Validation(com))
);

TWO_VALUE_COMMANDS.forEach((com) =>
	com.addEventListener('click', () => twoValueValidation(com))
);

MEMORIES.forEach((mem) => mem.addEventListener('click', () => Validation(mem)));

DARK_THEME_BUTTON.addEventListener('click', themeChangeDark);
LIGHT_THEME_BUTTON.addEventListener('click', themeChangeLight);

PREV_OPERATION_BUTTON.addEventListener('click', lastValueValidation);

OUTPUT.addEventListener('input', ERROR.value ? (ERROR.value = '') : '');

const descriptorProp = Object.getOwnPropertyDescriptor(
	HTMLInputElement.prototype,
	'value'
);
const descriptorAttr = Object.getOwnPropertyDescriptor(
	Element.prototype,
	'setAttribute'
);

Object.defineProperties(OUTPUT, {
	value: {
		get: descriptorProp.get,
		set(value) {
			ERROR.value ? (ERROR.value = '') : '';
			descriptorProp.set.call(this, value);
		},
	},
	setAttribute: {
		value(attr, value) {
			if (attr === 'value') {
				ERROR.value ? (ERROR.value = '') : '';
			}
			descriptorAttr.value.call(this, attr, value);
		},
	},
});
