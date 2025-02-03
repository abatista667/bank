import { render, screen, fireEvent } from '@testing-library/react';
import AccountForm from './AccountForm';
import { Account, EditMode } from '@/app/types';
import { Providers } from '@/test/Providers';
import { findTextFieldValidationText, getComboInput, getTextField, getTextFieldInput } from '@/test/helpers';

// Mock navigation:
jest.mock('next/navigation', () => ({
	//eslint-disable-next-line @typescript-eslint/no-require-imports
    ...require('next-router-mock'),
    useSearchParams: () => [[{ revalidate: '1' }]],
    useParams: () => jest.fn(),
    usePathname: jest.fn().mockReturnValue('/some-route'),
  }));

Object.defineProperty(window, 'location', {
	value: {
	  reload: jest.fn()
	},
  });

describe('AccountForm', () => {
	const mockOnSave = jest.fn();
	const mockOnCancel = jest.fn();
	const mockSetSelectedAccount = jest.fn();
	const selectedAccount: Partial<Account> = {
		ownerId: 1,
		alias: 'Test Account',
		currency: 'USD',
		balance: 1000,
	};
	const currencies = ['USD', 'EUR'];

	const renderComponent = (mode: EditMode, selectedAccount: Partial<Account> = {}) => {
		render(
            <Providers>
			<AccountForm
				currencies={currencies}
				selectedAccount={selectedAccount}
				setSelectedAccount={mockSetSelectedAccount}
				mode={mode}
				onSave={mockOnSave}
				onCancel={mockOnCancel}
			/>
			</Providers>
		);
	};

	it('renders the form with initial values', () => {
		renderComponent('edit', selectedAccount);
		expect(getTextFieldInput("Owner Id")).toHaveValue("1");
		expect(getTextFieldInput("Alias")).toHaveValue('Test Account');
		expect(getComboInput("Currency")).toHaveValue('USD');
		expect(getTextFieldInput("Balance")).toHaveValue("1000");
	});

	it('calls onSave when save button is clicked', () => {
		renderComponent('create', selectedAccount);
		fireEvent.click(screen.getByText('Save'));
		expect(mockOnSave).toHaveBeenCalled();
	});
	it('save button is disabled when selectedAccount is invalid', () => {
		renderComponent('create');
		expect(screen.getByText('Save')).toBeDisabled()
	});

	it('calls onCancel when cancel button is clicked', () => {
		renderComponent('create');
		fireEvent.click(screen.getByText('Cancel'));
		expect(mockOnCancel).toHaveBeenCalled();
	});

	it('disables ownerId field in edit mode', () => {
		renderComponent('edit');
		expect(getTextFieldInput('Owner Id')).toBeDisabled();
	});

	it('validates required fields', async() => {
		renderComponent('create', selectedAccount);
		fireEvent.change(getTextFieldInput("Alias"), { target: { value: 'a' } });
		fireEvent.change(getTextFieldInput("Alias"), { target: { value: '' } });

		const aliasValidation = await findTextFieldValidationText("Alias", "This field is required")
		expect(aliasValidation).toBeInTheDocument();

		fireEvent.change(getTextFieldInput("Owner Id"), { target: { value: 1 } });
		fireEvent.change(getTextFieldInput("Owner Id"), { target: { value: '' } });
		const owenerIdValidation = await findTextFieldValidationText("Owner Id", "This field must be a number")
		expect(owenerIdValidation).toBeInTheDocument();

		fireEvent.change(getTextFieldInput("Balance"), { target: { value: 1 } });
		fireEvent.change(getTextFieldInput("Balance"), { target: { value: '' } });
		const balanceValidation = await findTextFieldValidationText("Balance", "This field must be a number")
		expect(balanceValidation).toBeInTheDocument();
	});
});