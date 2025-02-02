'use client';

import { createTheme } from "@mui/material";

export const theme = createTheme({
    typography: {
        body1: {
            fontSize: 12,
        },
    }
});

theme.typography.body1 = {
    ...theme.typography.body1,
    [theme.breakpoints.up("sm")]: {
        fontSize: 16,
    },
};