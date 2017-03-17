
function formatFloat(num, casasDec) {
	/// <summary>Fromats float number to wanted formatting</summary>
	/// <param name="num" type="Number">Float number to format</param>
	/// <param name="casasDec" type="Number">Number of decimal numbers, if undefined  or null than 0</param>
	/// <returns type="String">Float number in string format based on passed parametars</returns>
	num = num === Infinity ? 0 : num;

	if (isNaN(num)) {
		return 0;
	}
	var origNum = num;

	if (casasDec == 'undefined' || casasDec == null) {
		casacDec = 0;
	}

	sepDecimal = decimalSeparator;
	sepMilhar = thousandSeparator;

	if (num < 0) {
		num = -num;
		sinal = -1;
	}
	else {
		sinal = 1;
	}

	var resposta = "";
	var part = "";

	if (num != Math.floor(num)) // decimal values present
	{
		part = Math.round((num - Math.floor(num)) * Math.pow(10, casasDec)).toString(); // transforms decimal part into integer (rounded)
		while (part.length < casasDec)
			part = '0' + part;

		if (casasDec > 0) {
			resposta = sepDecimal + part;
			num = Math.floor(num);
		}
		else {
			num = Math.round(num);
		}

	} // end of decimal part
	while (num > 0) // integer part
	{
		part = (num - Math.floor(num / 1000) * 1000).toString(); // part = three less significant digits
		num = Math.floor(num / 1000);

		if (num > 0) {
			while (part.length < 3) // 123.023.123  if sepMilhar = '.'
			{
				part = '0' + part; // 023
			}
		}

		resposta = part + resposta;

		if (num > 0) {
			resposta = sepMilhar + resposta;
		}
	}

	if (origNum < 1 && origNum > -1) {
		resposta = '0' + resposta;
	}

	if (sinal < 0) {
		resposta = '-' + resposta;
	}

	if (resposta == '') {
		return '0';
	}
	return resposta;
}