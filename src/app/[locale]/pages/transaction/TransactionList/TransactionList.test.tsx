import { render, screen, within } from "@testing-library/react";
import TransactionList from "./TransactionList";
import { Account, TransactionResponse } from "@/app/types";
import { Providers } from "@/test/Providers";
import { getTextFieldInput, pickAutocompleteFirstOption } from "@/test/helpers";
import userEvent from "@testing-library/user-event";
import client from "@/app/client/client";
import AxiosMockAdapter from "axios-mock-adapter";

const mock = new AxiosMockAdapter(client);

// Mock GET request to /changeRate
mock.onGet("/changeRate/USD/EUR").reply(200, 1.1);

const mockAccounts: Account[] = [
  { ownerId: 1, alias: "Account 1", balance: 1000, currency: "USD" },
  { ownerId: 2, alias: "Account 2", balance: 2000, currency: "EUR" },
];

const mockTransactions: TransactionResponse[] = [
  {
    id: "1",
    fromOwnerId: 1,
    toOwnerId: 2,
    amount: 100,
    changeRate: 1.1,
    transferAmount: 110,
    transactionId: "id",
  },
  {
    id: "2",
    fromOwnerId: 2,
    toOwnerId: 1,
    amount: 200,
    changeRate: 1.1,
    transferAmount: 110,
    transactionId: "id",
  },
];

const mockAddTransaction = jest.fn();

const renderComponent = () =>
  render(
    <Providers>
      <TransactionList
        transactionList={mockTransactions}
        addTransaction={mockAddTransaction}
        accountList={mockAccounts}
      />
    </Providers>,
  );

describe("TransactionList", () => {
  it("renders the transaction list correctly", () => {
    renderComponent();
    const row = screen.getByTestId("row-1");

    expect(row).toBeInTheDocument();
    expect(within(row).getByText("Account 1")).toBeInTheDocument();
    expect(within(row).getByText("Account 2")).toBeInTheDocument();
    expect(within(row).getByText("€100.00")).toBeInTheDocument();
  });

  it("opens the transaction form when the add button is clicked", async () => {
    renderComponent();

    await userEvent.click(screen.getByRole("button", { name: "Create New" }));
    expect(
      await screen.findByRole("button", { name: "Send transaction" }),
    ).toBeInTheDocument();
  });

  it("calls addTransaction when a new transaction is saved", async () => {
    renderComponent();

    await userEvent.click(screen.getByRole("button", { name: "Create New" }));
    expect(
      await screen.findByRole("button", { name: "Send transaction" }),
    ).toBeDisabled();

    await pickAutocompleteFirstOption("From Account");
    await pickAutocompleteFirstOption("To Account");

    await userEvent.click(getTextFieldInput("Amount to transfer"));
    await userEvent.keyboard("100");

    expect(
      await screen.findByRole("button", { name: "Send transaction" }),
    ).not.toBeDisabled();
    await userEvent.click(
      await screen.findByRole("button", { name: "Send transaction" }),
    );

    expect(mockAddTransaction).toHaveBeenCalledWith({
      fromOwnerId: 1,
      changeRate: 1.1,
      amount: 110.00000000000001,
      toOwnerId: 2,
      transferAmount: "100",
    });
  });

  it("closes the transaction form when the cancel button is clicked", async () => {
    renderComponent();

    userEvent.click(screen.getByRole("button", { name: "Create New" }));
    expect(
      await screen.findByRole("button", { name: "Send transaction" }),
    ).toBeInTheDocument();

    await userEvent.click(
      await screen.findByRole("button", { name: "Cancel" }),
    );
    expect(screen.queryByText("Send transaction")).not.toBeInTheDocument();
  });
});
