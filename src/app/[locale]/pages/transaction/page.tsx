import TransactionList from "./TransactionList/TransactionList";
import { addTransaction, listTransactions } from "./serverFunctions";
import { getAccounts } from "../account/serverFunctions";

const TransactionPage = async () => {
  const accounts = await getAccounts();
  const trasactions = await listTransactions();

  return (
    <TransactionList
      transactionList={trasactions}
      addTransaction={addTransaction}
      accountList={accounts}
    />
  );
};

export default TransactionPage;
