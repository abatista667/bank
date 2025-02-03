import { render, screen, fireEvent } from "@testing-library/react";
import TransactionForm from "./TransactionForm";
import { Account, Transaction } from "@/app/types";
import { Providers } from "@/test/Providers";
import { getTextField } from "@/test/helpers";

const mockAccounts: Account[] = [
  { ownerId: 1, alias: "Account 1", balance: 1000, currency: "USD" },
  { ownerId: 2, alias: "Account 2", balance: 2000, currency: "EUR" },
];

const mockAccountMap = new Map<number, Account>([
  [1, mockAccounts[0]],
  [2, mockAccounts[1]],
]);

const mockTransaction: Partial<Transaction> = {
  fromOwnerId: 1,
  toOwnerId: 2,
  transferAmount: 100,
  changeRate: 1.1,
  amount: 110,
};

const mockOnSave = jest.fn();
const mockOnCancel = jest.fn();
const mockSetTransaction = jest.fn();

const renderComponent = () =>
  render(
    <Providers>
      <TransactionForm
        onSave={mockOnSave}
        onCancel={mockOnCancel}
        transaction={mockTransaction}
        setTransaction={mockSetTransaction}
        accountMap={mockAccountMap}
        accounts={mockAccounts}
      />
    </Providers>,
  );

describe("TransactionForm", () => {
  it("renders the form fields correctly", () => {
    renderComponent();

    expect(getTextField("From Account")).toBeInTheDocument();
    expect(getTextField("To Account")).toBeInTheDocument();
    expect(getTextField("Amount to transfer")).toBeInTheDocument();
    expect(getTextField("Change rate")).toBeInTheDocument();
    expect(getTextField("Total Amount")).toBeInTheDocument();
  });

  it("calls onSave when the form is submitted", () => {
    renderComponent();

    fireEvent.click(screen.getByRole("button", { name: "Send transaction" }));
    expect(mockOnSave).toHaveBeenCalled();
  });

  it("calls onCancel when the cancel button is clicked", () => {
    renderComponent();

    fireEvent.click(screen.getByText("Cancel"));
    expect(mockOnCancel).toHaveBeenCalled();
  });

  it("validates the form fields correctly", () => {
    render(
      <Providers>
        <TransactionForm
          onSave={mockOnSave}
          onCancel={mockOnCancel}
          transaction={{}}
          setTransaction={mockSetTransaction}
          accountMap={mockAccountMap}
          accounts={mockAccounts}
        />
      </Providers>,
    );

    expect(
      screen.getByRole("button", { name: "Send transaction" }),
    ).toBeDisabled();
  });
});
