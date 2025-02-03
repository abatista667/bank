import { styled } from "@mui/material";

export const Root = styled("div")(() => ({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  minHeight: 400,
  minWidth: 300,
}));
export const GridRow = styled("div")(({ theme }) => ({
  width: "100%",
  borderTop: `1px solid ` + theme.palette.grey[300],
  display: "flex",
  paddingInline: 8,
  borderInline: `1px solid ` + theme.palette.grey[300],
}));
export const Cell = styled("div")(({ theme }) => ({
  ...theme.typography.body1,
  flex: 1,
  paddingBlock: 12,
}));
export const TruncatedText = styled("div")(() => ({
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
}));
export const Action = styled("div")(({ theme }) => ({
  ...theme.typography.body1,
  display: "flex",
  flexDirection: "column",
  [theme.breakpoints.up("sm")]: {
    flexDirection: "row",
  },
}));
export const HeadingCell = styled("div")(({ theme }) => ({
  ...theme.typography.body1,
  fontWeight: theme.typography.fontWeightBold,
  flex: 1,
  paddingBlock: 14,
}));
export const GridHeadingRow = styled("div")(({ theme }) => ({
  width: "100%",
  borderTop: `1px solid ` + theme.palette.grey[300],
  borderInline: `1px solid ` + theme.palette.grey[300],
  display: "flex",
  borderTopRightRadius: 5,
  borderTopLeftRadius: 5,
  paddingInline: 8,
}));
export const Footer = styled("div")(({ theme }) => ({
  flex: "1",
  border: `1px solid ` + theme.palette.grey[300],
  borderBottomRightRadius: 5,
  borderBottomLeftRadius: 5,
}));
