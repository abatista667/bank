"use client"
import Heading from "@/app/components/Heading/Heading";
import { Button } from "@mui/material";
import { useMemo, useState } from "react";
import TransactionForm from "../TransactionForm/TransactionForm";
import Grid from "@/app/components/Grid";
import { formatMoney } from "@/app/utils";
import { Account, Transaction, TransactionResponse } from "@/app/types";
import { AliasCell } from "./style";
import {useTranslations} from 'next-intl';

const mapTransactionToTransactionTableRow = (
	transaction: TransactionResponse,
	accountMap: Map<number, Account>,
) => {
	const toAccount = accountMap.get(transaction.toOwnerId);
	return {
		id: transaction.id,
		amount: transaction.amount,
		from: accountMap.get(transaction.fromOwnerId)?.alias,
		to: toAccount?.alias,
		toCurrency: toAccount?.currency,
	};
};

interface TransactionListProps {
    transactionList: TransactionResponse[];
    addTransaction: (transaction: Transaction) => void;
    accountList: Account[]
}

const TransactionList = ({ transactionList, addTransaction, accountList }: TransactionListProps) => {
	const [isNewTransactionOppened, setIsNewTransactionOppened] = useState(false);
	const [transaction, setTransaction] = useState<Partial<Transaction>>({});
	const t = useTranslations();

	const accountMap = useMemo(
		() =>
			new Map<number, Account>(
				accountList.map((item) => [item.ownerId, item]),
			),
		[accountList],
	);

	const tableRow =
        transactionList?.map((item) =>
			mapTransactionToTransactionTableRow(item, accountMap),
		) ?? [];

	const onSave = () => {
		addTransaction(transaction as Transaction);
		setTransaction({});
		setIsNewTransactionOppened(false);
	};
	const onCancel = () => {
		setTransaction({});
		setIsNewTransactionOppened(false);
	};

	const addNewTransaction = () => {
		setIsNewTransactionOppened(true);
	};

	const transactionFormProps = {
		onSave,
		onCancel,
		transaction,
		setTransaction,
		accountMap,
		accounts: accountList ?? [],
	};

	return (
			<div>
				<Heading
					title={t("transaction.title")}
					action={
						!isNewTransactionOppened ? (
							<Button variant="outlined" onClick={addNewTransaction}>
								{t("create")}
							</Button>
						) : null
					}
				/>
				{isNewTransactionOppened ? (
					<TransactionForm {...transactionFormProps} />
				) : null}
				<div>
					<Grid>
						<Grid.Heading>
							<Grid.HeadingCell>{t("transaction.from")}</Grid.HeadingCell>
							<Grid.HeadingCell>{t("transaction.to")}</Grid.HeadingCell>
							<Grid.HeadingCell>{t("transaction.amount")}</Grid.HeadingCell>
						</Grid.Heading>
						{tableRow?.map((item, index) => (
							<Grid.Row key={item.id ?? index} data-testid={item.from}>
								<AliasCell>
									<Grid.TruncatedText>
										{item.from}
									</Grid.TruncatedText>
								</AliasCell>
								<AliasCell>
								<Grid.TruncatedText>
									{item.to}
								</Grid.TruncatedText>
								</AliasCell>
								<Grid.Cell>
									{item.toCurrency && formatMoney(item.amount, item.toCurrency)}
								</Grid.Cell>
							</Grid.Row>
						))}
					</Grid>
				</div>
			</div>
	);
};

export default TransactionList;
