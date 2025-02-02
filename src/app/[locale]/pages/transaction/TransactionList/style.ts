import Grid from "@/app/components/Grid";
import { styled } from "@mui/material";

export const AliasCell = styled(Grid.Cell)(({ theme }) => ({
    width: "22%",
    [theme.breakpoints.up("sm")]: {
        width: 160,
    },
}));