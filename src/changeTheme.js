/* eslint-disable no-return-assign */
/* eslint-disable no-param-reassign */
import {
	ALL_ELEMENTS,
	BODY,
	CURRENT_STATE,
	DARK_THEME_BUTTON,
	LIGHT_THEME_BUTTON,
	CELL,
} from './contains';

export const themeChangeDark = () => {
	if (CURRENT_STATE.theme !== 'dark') {
		CURRENT_STATE.theme = 'dark';
		DARK_THEME_BUTTON.classList.add('selectedTheme');
		LIGHT_THEME_BUTTON.classList.remove('selectedTheme');

		ALL_ELEMENTS.forEach((el) => (el.style.color = '#e6e6e6'));
		BODY.style.background = 'linear-gradient(to right #2e2e2e, #6e1a07)';
	}
};

export const themeChangeLight = () => {
	if (CURRENT_STATE.theme !== 'light') {
		CURRENT_STATE.theme = 'light';
		LIGHT_THEME_BUTTON.classList.add('selectedTheme');
		DARK_THEME_BUTTON.classList.remove('selectedTheme');

		ALL_ELEMENTS.forEach((el) => (el.style.color = 'black'));
		BODY.style.background =
			'linear-gradient(rgb(238, 238, 238), rgb(241 219 134));';
		CELL.style.border = '1px solid rgba(0, 0, 0, 0.5);';
	}
};
