import { ThemeProvider } from "@mui/material";
import { NextIntlClientProvider } from "next-intl";
import { PropsWithChildren } from "react";
import { theme } from "@/app/theme";
import messages from "../../messages/en.json"

export const Providers = ({ children }: PropsWithChildren) => {
    return  <ThemeProvider theme={theme}>
        <NextIntlClientProvider messages={messages} locale="en">
         {children}
        </NextIntlClientProvider>
    </ThemeProvider>
}