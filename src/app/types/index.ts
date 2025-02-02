export interface Account {
	ownerId: number;
	currency: string;
	alias: string;
	balance: number;
}

export type EditMode = "create" | "edit";

export interface Transaction {
	fromOwnerId: number;
	toOwnerId: number;
	transferAmount: number;
	transactionId: string;
	changeRate: number;
	amount: number;
}

export interface TransactionResponse extends Transaction {
	id: string;
}