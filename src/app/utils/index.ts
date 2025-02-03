export const formatMoney = (value: number, currency: string) => {
	return new Intl.NumberFormat(undefined, {
		style: "currency",
		currency: currency,
	}).format(value);
};
