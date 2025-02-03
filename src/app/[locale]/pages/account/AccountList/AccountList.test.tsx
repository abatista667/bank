import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Layout from '@/app/[locale]/pages/layout';
import { Account } from '@/app/types';
import { fireEvent } from '@testing-library/react';
import { Providers } from '@/test/Providers';
import AccountList from './AccountList';

const  acountCollection: Account[] = [
    {
        "ownerId": 1111,
        "alias": "Dollar1",
        "currency": "USD",
        "balance": 1111111
    },
    {
        "ownerId": 2222,
        "alias": "Euro",
        "currency": "EUR",
        "balance": 2222
    },
    {
        "ownerId": 1112,
        "alias": "Dollar2",
        "currency": "USD",
        "balance": 2222
    },
    {
        "ownerId": 2223,
        "alias": "Euro2",
        "currency": "EUR",
        "balance": 2222
    }
];

const currencies = [
    "USD",
    "EUR",
    "GBP",
];

const addOrUpdateAccount = jest.fn((account:Account) => {})
const deleteAccount = jest.fn((id: number) => {})

// Mock navigation:
jest.mock('next/navigation', () => ({
    ...require('next-router-mock'),
    useSearchParams: () => [[{ revalidate: '1' }]],
    useParams: () => jest.fn(),
    usePathname: jest.fn().mockReturnValue('/some-route'),
  }));

describe('Page',() => {
	it('renders account list', async () => {
		render(
			<Providers>
				<Layout>
					<AccountList
						accounts={acountCollection}
						currencies={currencies}
						addOrUpdateAccount={addOrUpdateAccount}
						deleteAccount={deleteAccount}
					/>
				</Layout>
			</Providers>
		);

		for(const account of acountCollection){
			const accountElement = await screen.findByTestId(account.alias);
			expect(accountElement).toBeInTheDocument();
		}
	});

    it('filters accounts by alias', async () => {
		render(
			<Providers>
				<Layout>
					<AccountList
						accounts={acountCollection}
						currencies={currencies}
						addOrUpdateAccount={addOrUpdateAccount}
						deleteAccount={deleteAccount}
					/>
				</Layout>
			</Providers>
		);

		const filterInput = screen.getByPlaceholderText('Filter by Alias');
		fireEvent.change(filterInput, { target: { value: 'Dollar' } });

		expect(await screen.findByTestId('Dollar1')).toBeInTheDocument();
		expect(await screen.findByTestId('Dollar2')).toBeInTheDocument();
		expect(screen.queryByTestId('Euro')).not.toBeInTheDocument();
		expect(screen.queryByTestId('Euro2')).not.toBeInTheDocument();
	});

	it('opens account form on add button click', async () => {
		render(
			<Providers>
				<Layout>
					<AccountList
						accounts={acountCollection}
						currencies={currencies}
						addOrUpdateAccount={addOrUpdateAccount}
						deleteAccount={deleteAccount}
					/>
				</Layout>
			</Providers>
		);

		const addButton = screen.getByRole("button", { name: "Create New"});
		fireEvent.click(addButton);

		expect(await screen.findByTestId('accountForm')).toBeInTheDocument();
	});
})