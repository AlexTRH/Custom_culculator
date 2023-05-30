export function switchTheme() {
	const calculator = document.querySelector('.body');
	calculator.classList.toggle('day_theme');
}

const themeSwitch = document.getElementById('switchThemeButton');
themeSwitch.addEventListener('click', switchTheme);

export { themeSwitch };

// import {
// 	allElements,
// 	body,
// 	currentState,
// 	darkThemeButton,
// 	lightThemeButton,
// 	cell,
// } from './contains';
//
// export const themeChangeDark = () => {
// 	if (currentState.theme !== 'dark') {
// 		currentState.theme = 'dark';
// 		darkThemeButton.classList.add('selectedTheme');
// 		lightThemeButton.classList.remove('selectedTheme');
//
// 		allElements.forEach((el) => (el.style.color = '#e6e6e6'));
// 		body.style.background = 'linear-gradient(to right #2e2e2e, #6e1a07)';
// 	}
// };
//
// export const themeChangeLight = () => {
// 	if (currentState.theme !== 'light') {
// 		currentState.theme = 'light';
// 		lightThemeButton.classList.add('selectedTheme');
// 		darkThemeButton.classList.remove('selectedTheme');
//
// 		allElements.forEach((el) => (el.style.color = 'black'));
// 		body.style.background =
// 			'linear-gradient(rgb(238, 238, 238), rgb(241 219 134));';
// 		cell.style.border = '1px solid rgba(0, 0, 0, 0.5);';
// 	}
// };
