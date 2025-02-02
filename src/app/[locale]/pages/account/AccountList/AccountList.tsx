"use client"
import { Button, IconButton, InputAdornment } from "@mui/material";
import { useDeferredValue, useMemo, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Account, EditMode } from "@/app/types";
import { formatMoney } from "@/app/utils.ts";
import { AliasCell, CellMargin, FilterInput, FilterWrapper, Root, TableWrapper } from "./styles";
import AccountForm from "../AccountForm/AccountForm";
import { useConfirmDialog } from "@/app/components/ConfirmDialg/ConfirmDilogContext";
import Heading from "@/app/components/Heading/Heading";
import Grid from "@/app/components/Grid";
import {useTranslations} from 'next-intl';

interface AccountListProps {
  accounts: Account[];
  currencies: string[];
  addOrUpdateAccount: (account: Account) => void;
  deleteAccount: (id: number) => void;
}

const AccountList = ({ accounts, currencies, addOrUpdateAccount, deleteAccount }: AccountListProps) => {
	const [isEditFormOpenned, setIsEditFormOpenned] = useState(false);
	const [filterBy, setFilterBy] = useState("");
	const filterByDeferred = useDeferredValue(filterBy);
	const [selectedAccount, setSelectedAccount] = useState<Partial<Account>>({});
	const [editMode, setEditMode] = useState<EditMode>("create");
	const t = useTranslations();

	const accountSet = useMemo(
		() => new Set(accounts.map((item) => item.ownerId)),
		[accounts],
	);

	const accountsToDisplay = useMemo(() => 
		filterByDeferred
		? accounts.filter((item) =>
				item.alias.toLowerCase().includes(filterByDeferred.toLowerCase()),
			)
		: accounts, [filterByDeferred, accounts]) 

	const { showMessage } = useConfirmDialog();

	const displayAccountForm = () => {
		setIsEditFormOpenned(true);
		setSelectedAccount({});
		setEditMode("create");
	};
	const onDeleteAccount = (id: number) => {
		showMessage("", t("account.confirmDelete"), async () =>
			{
				await deleteAccount(id);
				window.location.reload();
			},
		);
	};
	const onEditAccount = (account: Account) => {
		setIsEditFormOpenned(true);
		setSelectedAccount(account);
		setEditMode("edit");
	};

	return (<Root>
				<Heading
					title={t("account.title")}
					action={
						!isEditFormOpenned ? (
							<Button variant="outlined" onClick={displayAccountForm}>
								{t("create")}
							</Button>
						) : null
					}
				/>
				{isEditFormOpenned ? (
					<AccountForm
						selectedAccount={selectedAccount}
						setSelectedAccount={setSelectedAccount}
						mode={editMode}
						onSave={async () => {
							await addOrUpdateAccount(selectedAccount as Account);
							window.location.reload();

						}}
						onCancel={() => {
							setIsEditFormOpenned(false);
						}}
						existingAccounts={accountSet}
						currencies={currencies}
					/>
				) : null}
				<FilterWrapper>
					<FilterInput
						value={filterBy}
						size="small"
						placeholder={t("account.filter")}
						aria-label={t("account.filter")}
						onChange={(ev) => setFilterBy(ev.currentTarget.value)}
						InputProps={{
							endAdornment: filterBy ? (
								<InputAdornment position="end">
									<IconButton onClick={() => setFilterBy("")}>
										<CloseIcon />
									</IconButton>
								</InputAdornment>
							) : null,
						}}
					/>
				</FilterWrapper>
				<TableWrapper data-testid="grid">
					<Grid>
						<Grid.Heading>
							<Grid.HeadingCell>{t("account.alias")}</Grid.HeadingCell>
							<Grid.HeadingCell>{t("account.currency")}</Grid.HeadingCell>
							<Grid.HeadingCell>{t("account.balance")}</Grid.HeadingCell>
							<CellMargin />
						</Grid.Heading>
						{accountsToDisplay.map((item) => (
							<Grid.Row key={item.ownerId} data-testid={item.alias}>
								<AliasCell>
									<Grid.TruncatedText>{item.alias}</Grid.TruncatedText>
								</AliasCell>
								<Grid.Cell>{item.currency}</Grid.Cell>
								<Grid.Cell>
									{formatMoney(item.balance, item.currency)}
								</Grid.Cell>
								<Grid.ActionCell>
									<IconButton onClick={() => onEditAccount(item)}>
										<EditIcon sx={{ width: 20 }} />
									</IconButton>
									<IconButton onClick={() => onDeleteAccount(item.ownerId)}>
										<DeleteIcon sx={{ width: 20 }} />
									</IconButton>
								</Grid.ActionCell>
							</Grid.Row>
						))}
					</Grid>
				</TableWrapper>
			</Root>
	);
};

export default AccountList;
