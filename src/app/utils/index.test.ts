import { formatMoney } from './index';

describe('formatMoney', () => {
	it('should format number as USD currency', () => {
		expect(formatMoney(1234.56, 'USD')).toBe('$1,234.56');
	});

	it('should format number as EUR currency', () => {
		expect(formatMoney(1234.56, 'EUR')).toBe('€1,234.56');
	});

	it('should format number as JPY currency', () => {
		expect(formatMoney(1234, 'JPY')).toBe('¥1,234');
	});

	it('should handle negative values', () => {
		expect(formatMoney(-1234.56, 'USD')).toBe('-$1,234.56');
	});

	it('should handle zero value', () => {
		expect(formatMoney(0, 'USD')).toBe('$0.00');
	});
});