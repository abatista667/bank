import "@testing-library/jest-dom";
import { render, screen, within } from "@testing-library/react";
import { Account } from "@/app/types";
import { Providers } from "@/test/Providers";
import AccountList from "./AccountList";
import userEvent from '@testing-library/user-event'

const acountCollection: Account[] = [
  {
    ownerId: 1111,
    alias: "Dollar1",
    currency: "USD",
    balance: 1111111,
  },
  {
    ownerId: 2222,
    alias: "Euro",
    currency: "EUR",
    balance: 2222,
  },
  {
    ownerId: 1112,
    alias: "Dollar2",
    currency: "USD",
    balance: 2222,
  },
  {
    ownerId: 2223,
    alias: "Euro2",
    currency: "EUR",
    balance: 2222,
  },
];

const currencies = ["USD", "EUR", "GBP"];

const addOrUpdateAccount = jest.fn(() => {});
const deleteAccount = jest.fn(() => {});

// Mock navigation:
jest.mock("next/navigation", () => ({
  //eslint-disable-next-line @typescript-eslint/no-require-imports
  ...require("next-router-mock"),
  useSearchParams: () => [[{ revalidate: "1" }]],
  useParams: () => jest.fn(),
  usePathname: jest.fn().mockReturnValue("/some-route"),
}));

Object.defineProperty(window, "location", {
  value: {
    reload: jest.fn(),
  },
});

const renderComponent = () =>
  render(
    <Providers>
      <AccountList
        accounts={acountCollection}
        currencies={currencies}
        addOrUpdateAccount={addOrUpdateAccount}
        deleteAccount={deleteAccount}
      />
    </Providers>,
  );

describe("Page", () => {
  it("renders account list", async () => {
    renderComponent();

    for (const account of acountCollection) {
      const accountElement = await screen.findByTestId(account.alias);
      expect(accountElement).toBeInTheDocument();
    }
  });

  it("filters accounts by alias", async () => {
    renderComponent();

    const filterInput = screen.getByPlaceholderText("Filter by Alias");
    await userEvent.click(filterInput);
    await userEvent.keyboard("Dollar");

    expect(await screen.findByTestId("Dollar1")).toBeInTheDocument();
    expect(await screen.findByTestId("Dollar2")).toBeInTheDocument();
    expect(screen.queryByTestId("Euro")).not.toBeInTheDocument();
    expect(screen.queryByTestId("Euro2")).not.toBeInTheDocument();
  });

  it("opens account form on add button click", async () => {
    renderComponent();

    const addButton = screen.getByRole("button", { name: "Create New" });
    await userEvent.click(addButton);

    expect(await screen.findByTestId("accountForm")).toBeInTheDocument();
  });

  it("calls deleteAccount on delete button click", async () => {
    renderComponent();

    const deleteButton = screen.getAllByRole("button", { name: /delete/i })[0];
    await userEvent.click(deleteButton);

    const confirm = await screen.findByRole("dialog");

    const confirmBtn = await within(confirm).findByRole("button", {
      name: "Yes",
    });

    await userEvent.click(confirmBtn);

    expect(deleteAccount).toHaveBeenCalledWith(acountCollection[0].ownerId);
  });

  it("opens account form on edit button click", async () => {
    renderComponent();

    const editButton = screen.getAllByRole("button", { name: /edit/i })[0];
    await userEvent.click(editButton);

    expect(await screen.findByTestId("accountForm")).toBeInTheDocument();
  });
});
