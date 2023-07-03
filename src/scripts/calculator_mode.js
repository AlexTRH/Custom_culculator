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
