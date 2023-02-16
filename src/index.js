let a = '';
let b = '';
let sign = '';
let finish = false;

const digit = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];
const action = [
	'-',
	'+',
	'x',
	'/',
	'',
	'x²',
	'²√x',
	'³√x',
	'ʸ√x',
	'%',
	'+/-',
	'10ˣ',
	'1/x',
	'x!',
];

const out = document.querySelector('.calc_screen');

function clearAll() {
	a = '';
	b = '';
	sign = '';
	finish = false;
	out.textContent = 0;
}

document.querySelector('.ac').onclick = clearAll;
document.querySelector('.buttons').onclick = (event) => {
	if (!event.target.classList.contains('btn')) return;
	if (event.target.classList.contains('ac')) return;

	out.textContent = '';

	const key = event.target.textContent;
	console.log(key);
	if (digit.includes(key)) {
		if (b === '' && sign === '') {
			a += +key;
			out.textContent = a;
		} else if (a !== '' && b !== '' && finish) {
			b += +key;
			finish = false;
			out.textContent = b;
		} else {
			b += +key;
			out.textContent = b;
		}

		return;
	}

	if (action.includes(key)) {
		sign = key;
		out.textContent = sign;
		return;
	}

	if (key === '=') {
		if (b === '') b = a;
		switch (sign) {
			case '+':
				a = +a + +b;
				break;
			case '-':
				a -= b;
				break;
			case 'x':
				a *= b;
				break;
			case '/':
				if (b === '0') {
					out.textContent = 'Error';
					a = '';
					b = '';
					sign = '';
					return;
				}
				a /= b;
				break;
			case '%':
				if (a < 0) {
					out.textContent = '0';
					a = '';
					b = '';
					sign = '';
					return;
				}
				a /= 100;
				break;
			case '+/-':
				a *= -1;
				break;
			case 'x²':
				a **= 2;
				break;
			case 'x³':
				a **= 3;
				break;
			case 'xʸ':
				a **= b;
				break;
			case '²√x':
				if (a < 0) {
					out.textContent = 'Error';
					a = '';
					b = '';
					sign = '';
					return;
				}
				a **= 1 / 2;
				break;
			case '³√x':
				if (a < 0) {
					out.textContent = 'Error';
					a = '';
					b = '';
					sign = '';
					return;
				}
				a **= 1 / 3;
				break;
			case 'ʸ√x':
				if (a < 0) {
					out.textContent = 'Error';
					a = '';
					b = '';
					sign = '';
					return;
				}
				a **= 1 / b;
				break;
			case '10ˣ':
				a = 10 ** a;
				break;
			case '1/x':
				a = 1 / a;
				break;
			case 'x!':
				break;
			default:
		}
		finish = true;
		out.textContent = a;
	}
	console.log(a, b, sign);
};
