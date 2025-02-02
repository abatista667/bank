import { TextField, FormLabel, Button } from "@mui/material";
import { Alias, FieldGroup, Fields } from "./styles";
import React, { useMemo, useState } from "react";
import * as yup from "yup";
import { Account, EditMode } from "@/app/types";
import { errorMessage } from "@/app/constants/errorMessages";
import FormCard from "@/app/components/FormCard";
import Autocomplete, { AutocompleteItem } from "@/app/components/Autocomplete/Autocomplete";
import {useTranslations} from 'next-intl';

interface AccountFormProps {
	onSave: () => void;
	onCancel: () => void;
	selectedAccount: Partial<Account>;
	setSelectedAccount: (account: Account) => void;
	mode: EditMode;
	existingAccounts?: Set<number>;
	currencies: string[];
}

const AccountForm = ({
	currencies,
	selectedAccount,
	setSelectedAccount,
	mode,
	existingAccounts,
	onSave,
	onCancel,
}: AccountFormProps) => {
	const { ownerId, alias, currency, balance } = selectedAccount;
	const [validationError, setValidationError] = useState<
		Record<string, string>
	>({});

	const t = useTranslations();

	const accountValidationSchema = useMemo(() =>yup.object({
		ownerId: yup
			.number()
			.test(
				"notRepeated",
				t("account.ownerIdNotUnique"),
				(value) => {
					return !(mode === "create" && value && existingAccounts?.has(value));
				},
			)
			.required(errorMessage.required)
			.typeError(errorMessage.numeric),
		alias: yup.string().required(errorMessage.required),
		currency: yup.string().required(errorMessage.required),
		balance: yup
			.number()
			.required(errorMessage.required)
			.typeError(errorMessage.numeric),
	}), [existingAccounts, mode, t]);

		const currenciesAutocompleteOptions: AutocompleteItem[] = useMemo(
			() =>
				currencies.map((item) => ({
					label: item,
					value: item,
				})) ?? [],
			[currencies],
		);
	
	const onChangeAutocomplete = (fieldName: string, item: AutocompleteItem) => {
				const newVersion = {
					...selectedAccount,
					[fieldName]: item.value,
				} as Account;
				setSelectedAccount(newVersion);
	};

	const onChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
		const fieldName = ev.currentTarget.name;
		const newVersion = {
			...selectedAccount,
			[fieldName]: ev.currentTarget.value,
		} as Account;
		setSelectedAccount(newVersion);

		accountValidationSchema
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

	const isValid = accountValidationSchema.isValidSync(selectedAccount);

	return (
		<FormCard data-testid="accountForm" action={onSave}>
			<Fields>
				<FieldGroup>
					<FormLabel>{t("account.ownerId")}</FormLabel>
					<TextField
						aria-label={t("account.ownerId")}
						name="ownerId"
						size="small"
						fullWidth
						value={ownerId ?? ""}
						onChange={onChange}
						helperText={validationError["ownerId"]}
						error={!!validationError["ownerId"]}
						disabled={mode === "edit"}
					/>
				</FieldGroup>
				<Alias>
					<FormLabel>{t("account.alias")}</FormLabel>
					<TextField
						name="alias"
						aria-label={t("account.alias")}
						size="small"
						fullWidth
						value={alias ?? ""}
						onChange={onChange}
						helperText={validationError["alias"]}
						error={!!validationError["alias"]}
					/>
				</Alias>
				<FieldGroup>
					<FormLabel>{t("account.currency")}</FormLabel>
						<Autocomplete
                            sx={{minWidth: "200px"}}
							size="small"
							name="currency"
							disablePortal
							options={currenciesAutocompleteOptions}
							renderInput={(params) => (
								<TextField
									{...params}
									helperText={validationError["currency"]}
									error={!!validationError["currency"]}
								/>
							)}
							onChange={onChangeAutocomplete}
							value={currency ?? ""}
						/>
				</FieldGroup>
				<FieldGroup>
					<FormLabel>{t("account.balance")}</FormLabel>
					<TextField
						aria-label={t("account.balance")}
						name="balance"
						size="small"
						fullWidth
						value={balance ?? ""}
						onChange={onChange}
						helperText={validationError["balance"]}
						error={!!validationError["balance"]}
					/>
				</FieldGroup>
			</Fields>
			<FormCard.Actions>
				<Button variant="outlined" type="submit" disabled={!isValid}>
				{t("account.save")}
				</Button>
				<Button variant="outlined" color="warning" onClick={onCancel}>
				{t("cancel")}
				</Button>
			</FormCard.Actions>
		</FormCard>
	);
};

export default AccountForm;
