export function transformInt(number) {
	if (
		number >= 1e9 ||
		number <= -1e9 ||
		(number >= -1e-9 && number <= 1e-9 && number !== 0)
	) {
		const formatted = number.toExponential(5);
		return formatted.replace(/(\.\d*?)0+e/, '$1e').replace(/\.e/, 'e');
	}
	const rounded = number.toFixed(8);
	if (Number.isInteger(parseFloat(rounded))) {
		return parseFloat(rounded);
	}
	return parseFloat(rounded.toString().replace(/(\.\d*?)0+$/, '$1'));
}

export function numberValidation(...args) {
	for (const element of args) {
		if (isNaN(element)) {
			return false;
		}
	}
	return true;
}
