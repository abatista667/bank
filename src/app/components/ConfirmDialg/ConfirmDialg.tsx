import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

interface ConfirmDialogPros {
	title: string;
	description?: string;
	onConfirm: () => void | null;
	onClose: () => void;
	openned: boolean;
}

export function ConfirmDialog({
	title,
	description,
	onConfirm,
	openned,
	onClose,
}: ConfirmDialogPros) {
	return (
		<Dialog
			open={openned}
			onClose={onClose}
			aria-labelledby="alert-dialog-title"
			aria-describedby="alert-dialog-description"
		>
			<DialogTitle id="alert-dialog-title">{title}</DialogTitle>
			<DialogContent>
				<DialogContentText id="alert-dialog-description">
					{description}
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button onClick={onClose}>No</Button>
				<Button
					onClick={() => {
						onConfirm?.();
						onClose();
					}}
					autoFocus
				>
					Yes
				</Button>
			</DialogActions>
		</Dialog>
	);
}

export default ConfirmDialog;
