import { createContext, useContext, useRef, useState } from "react";
import ConfirmDialog from "./ConfirmDialg";

interface ConfirmDilogContextProps {
	showMessage: (message: string, title: string, onConfirm: () => void) => void;
}

const ConfirmDilogContext = createContext<ConfirmDilogContextProps | null>(
	null,
);

export const useConfirmDialog = () => useContext(ConfirmDilogContext) as ConfirmDilogContextProps

export const ConfirmDialogProvider = ({ children }: React.PropsWithChildren) => {
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [show, setShow] = useState(false);
	const confirmMethod = useRef(() => {});

	const showMessage = (
		description: string,
		title: string,
		onConfirm: () => void,
	) => {
		setShow(true);
		setDescription(description);
		setTitle(title);

		confirmMethod.current = onConfirm;
	};
	const onCancel = () => {
		setShow(false);
		setDescription("");
		setTitle("");
	};

	return (
		<ConfirmDilogContext.Provider value={{ showMessage }}>
			{children}
			<ConfirmDialog
				openned={show}
				title={title}
				description={description}
				onConfirm={confirmMethod.current}
				onClose={onCancel}
			/>
		</ConfirmDilogContext.Provider>
	);
};
