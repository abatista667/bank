import Grid from "@/app/components/Grid";
import { styled, TextField } from "@mui/material";

export const Root = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  [theme.breakpoints.up("lg")]: {
    alignItems: "start",
    maxWidth: 1000,
  },
}));
export const FilterWrapper = styled("div")(() => ({
  width: "100%",
  display: "flex",
}));
export const FilterInput = styled(TextField)(({ theme }) => ({
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    width: 300,
  },
}));
export const TableWrapper = styled("div")(() => ({
  marginTop: 20,
  width: "100%",
}));
export const CellMargin = styled("div")(() => ({
  width: 75,
}));
export const AliasCell = styled(Grid.Cell)(({ theme }) => ({
  width: "22%",
  [theme.breakpoints.up("sm")]: {
    width: 160,
  },
}));
