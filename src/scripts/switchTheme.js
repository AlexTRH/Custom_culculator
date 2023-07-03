export function switchTheme() {
	const calculator = document.querySelector('.body');
	calculator.classList.toggle('day_theme');
}

const themeSwitch = document.getElementById('switchThemeButton');
themeSwitch.addEventListener('click', switchTheme);

export { themeSwitch };
