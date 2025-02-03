"use client"
import { getChangeRate } from "@/app/client/getChangeRate";
import Autocomplete, { AutocompleteItem } from "@/app/components/Autocomplete/Autocomplete";
import FormCard from "@/app/components/FormCard";
import { Account, Transaction } from "@/app/types";
import { formatMoney } from "@/app/utils";
import { TextField, FormLabel, Button, styled } from "@mui/material";
import React, { useMemo, useState } from "react";
import * as yup from "yup";
import {useTranslations} from 'next-intl';

interface TransactionFormProps {
	onSave: () => void;
	onCancel: () => void;
	transaction: Partial<Transaction>;
	setTransaction: (Transaction: Transaction) => void;
	accountMap: Map<number | undefined, Account>;
	accounts: Account[];
}

const FormLabelStyled = styled(FormLabel)({
    whiteSpace: "nowrap",
});

const TransactionForm = ({
	onSave,
	onCancel,
	transaction,
	setTransaction,
	accountMap,
	accounts,
}: TransactionFormProps) => {
	const [validationError, setValidationError] = useState<
		Record<string, string>
	>({});
	const currencyTo = accountMap.get(transaction?.toOwnerId)?.currency;
	const t = useTranslations();

	const transactionValidationSchema = yup.object({
		fromOwnerId: yup
			.number()
			.required(t("validationMessage.required"))
			.typeError(t("validationMessage.numeric")),
		toOwnerId: yup
			.number()
			.required(t("validationMessage.required"))
			.typeError(t("validationMessage.numeric")),
		transferAmount: yup
			.number()
			.required(t("validationMessage.required"))
			.typeError(t("validationMessage.numeric"))
			.test("balance", "Account has not enought balance", (value) => {
				const account = accountMap.get(transaction.fromOwnerId);
				return value < (account?.balance ?? 0);
			}),
	});

	const accountsFrom: AutocompleteItem[] = useMemo(
		() =>
			accounts.map((item) => ({
				label: `${item.alias} - ${formatMoney(item.balance, item.currency)}`,
				value: item.ownerId,
			})) ?? [],
		[accounts],
	);

	const accountsTo = useMemo(
		() =>
			accountsFrom.filter((item) => item.value !== transaction.fromOwnerId) ??
			[],
		[accountsFrom, transaction.fromOwnerId],
	);

	const validateField = (fieldName: string, newVersion: Transaction) => {
		transactionValidationSchema
			.validateAt(fieldName, newVersion)
			.then(() => {
				setValidationError((state) => ({ ...state, [fieldName]: "" }));
			})
			.catch((e: yup.ValidationError) => {
				setValidationError((state) => ({
					...state,
					[fieldName]: e.errors.at(0) ?? "",
				}));
			});
	};

	const onChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
		const fieldName = ev.currentTarget.name;
		const newVersion = {
			...transaction,
			[fieldName]: ev.currentTarget.value,
			amount: (transaction.transferAmount ?? 0) * (transaction.changeRate ?? 0),
		} as Transaction;
		calculateAmount(newVersion);
		validateField(fieldName, newVersion);
	};

	const calculateAmount = async (transaction: Transaction) => {
		const currencyFrom = accountMap.get(transaction?.fromOwnerId)?.currency;
		const currencyTo = accountMap.get(transaction?.toOwnerId)?.currency;

		const rate = await getChangeRate(currencyFrom, currencyTo);
		const newVersion = {
			...transaction,
			changeRate: rate,
			amount: (transaction.transferAmount ?? 0) * rate,
		} as Transaction;
		setTransaction(newVersion);
	}

	const onChangeAutocomplete = async (fieldName: string, item: AutocompleteItem) => {
		const newVersion = {
			...transaction,
			[fieldName]: item?.value,
		} as Transaction;

		calculateAmount(newVersion);
		validateField(fieldName, newVersion);
	};

	const onFromOwnerChange = (fieldName: string, item: AutocompleteItem) => {
		onChangeAutocomplete(fieldName, item);

		if (!item) onChangeAutocomplete("toOwnerId", item);
	};

	const isValid = transactionValidationSchema.isValidSync(transaction);

	return (
		<FormCard action={onSave}>
			<FormCard.Fields>
				<FormCard.Row>
					<FormCard.FieldGroup>
						<FormLabelStyled>{t("transaction.from")}</FormLabelStyled>
						<Autocomplete
							aria-label={t("transaction.from")}
                            sx={{minWidth: "200px"}}
							size="small"
							name="fromOwnerId"
							disablePortal
							options={accountsFrom}
							renderInput={(params) => (
								<TextField
									{...params}
									helperText={validationError["fromOwnerId"]}
									error={!!validationError["fromOwnerId"]}
								/>
							)}
							onChange={onFromOwnerChange}
							value={transaction.fromOwnerId}
						/>
					</FormCard.FieldGroup>
					<FormCard.FieldGroup>
						<FormLabelStyled>{t("transaction.to")}</FormLabelStyled>
						<Autocomplete
							aria-label={t("transaction.to")}
							disabled={!transaction.fromOwnerId}
							name="toOwnerId"
                            sx={{minWidth: "200px"}}
							size="small"
							disablePortal
							options={accountsTo}
							renderInput={(params) => (
								<TextField
									{...params}
									helperText={validationError["toOwnerId"]}
									error={!!validationError["toOwnerId"]}
								/>
							)}
							onChange={onChangeAutocomplete}
							value={transaction.toOwnerId}
						/>
					</FormCard.FieldGroup>
                </FormCard.Row>
				<FormCard.Row>
					<FormCard.FieldGroup>
						<FormLabelStyled>{t("transaction.amountToTransfer")}</FormLabelStyled>
						<TextField
							disabled={!transaction.fromOwnerId}
							name="transferAmount"
							aria-label={t("transaction.amountToTransfer")}
							size="small"
							fullWidth
							value={transaction.transferAmount ?? ""}
							helperText={validationError["transferAmount"]}
							error={!!validationError["transferAmount"]}
							onChange={onChange}
						/>
					</FormCard.FieldGroup>
					<FormCard.FieldGroup>
						<FormLabelStyled>{t("transaction.rate")}</FormLabelStyled>
						<TextField
							aria-label={t("transaction.rate")}
							name="changeRate"
							size="small"
							fullWidth
							value={transaction.changeRate ?? ""}
							disabled
							placeholder={t("transaction.calculatedField")}
						/>
					</FormCard.FieldGroup>
					<FormCard.FieldGroup>
						<FormLabelStyled>{t("transaction.totalAmount")}</FormLabelStyled>
						<TextField
							aria-label={t("transaction.totalAmount")}
							name="amount"
							size="small"
							fullWidth
							value={
								transaction.amount && currencyTo
									? formatMoney(transaction.amount, currencyTo)
									: ""
							}
							disabled
							placeholder={t("transaction.calculatedField")}
						/>
					</FormCard.FieldGroup>
                </FormCard.Row>
			</FormCard.Fields>
			<FormCard.Actions>
				<Button variant="outlined" type="submit" disabled={!isValid}>
				{t("transaction.send")}
				</Button>
				<Button variant="outlined" color="warning" onClick={onCancel}>
				{t("cancel")}
				</Button>
			</FormCard.Actions>
		</FormCard>
	);
};

export default TransactionForm;
