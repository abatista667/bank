import { Cell, Footer, GridRow, HeadingCell, Root, GridHeadingRow, Action, TruncatedText, TruncatedParent } from "./styles";

const Grid = ({ children }: React.PropsWithChildren) => {
	return (
		<Root>
			{children}
			<Footer></Footer>
		</Root>
	);
};

const Row = ({ children, ...rest }: React.PropsWithChildren) => {
	return (
		<GridRow {...rest}>
			{children}
		</GridRow>
	);
};

Grid.Heading = GridHeadingRow;
Grid.Cell = Cell;
Grid.TruncatedText = TruncatedText;
Grid.Row = Row;
Grid.HeadingCell = HeadingCell;
Grid.ActionCell = Action;

export default Grid;
