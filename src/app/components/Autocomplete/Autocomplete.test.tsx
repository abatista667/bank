import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import Autocomplete, { AutocompleteItem } from './Autocomplete';
import { TextField } from '@mui/material';

const options: AutocompleteItem[] = [
	{ label: 'Option 1', value: 1 },
	{ label: 'Option 2', value: 2 },
	{ label: 'Option 3', value: 3 },
];

const onChange = jest.fn();

describe('Autocomplete', () => {
	it('renders without crashing', () => {
		render(
			<Autocomplete
				options={options}
				value={1}
				name="test-autocomplete"
				onChange={onChange}
                renderInput={(par) => <TextField {...par}/>}
			/>
		);
		expect(screen.getByRole('combobox')).toBeInTheDocument();
	});

	it('displays the correct value', () => {
		render(
			<Autocomplete
				options={options}
				value={1}
				name="test-autocomplete"
				onChange={onChange}
                renderInput={(par) => <TextField {...par}/>}
			/>
		);
		expect(screen.getByDisplayValue('Option 1')).toBeInTheDocument();
	});

	it('handles empty value', () => {
		render(
			<Autocomplete
				options={options}
				value={undefined}
				name="test-autocomplete"
				onChange={onChange}
                renderInput={(par) => <TextField {...par}/>}
			/>
		);
		expect(screen.getByRole('combobox')).toHaveValue('');
	});
});