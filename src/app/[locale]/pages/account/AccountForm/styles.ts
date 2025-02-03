import { styled } from "@mui/material";

export const Fields = styled("div")(({ theme }) => ({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  gap: 8,
  [theme.breakpoints.up("md")]: {
    flexDirection: "row",
  },
}));
export const FieldGroup = styled("div")(() => ({
  display: "flex",
  flexDirection: "column",
  gap: 4,
}));
export const Alias = styled(FieldGroup)(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    width: "50%",
  },
}));
