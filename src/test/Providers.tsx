import { ThemeProvider } from "@mui/material";
import { NextIntlClientProvider } from "next-intl";
import { PropsWithChildren } from "react";
import { theme } from "@/app/theme";
import messages from "../../messages/en.json";
import { ConfirmDialogProvider } from "@/app/components/ConfirmDialg/ConfirmDilogContext";

export const Providers = ({ children }: PropsWithChildren) => {
  return (
    <ThemeProvider theme={theme}>
      <NextIntlClientProvider messages={messages} locale="en">
        <ConfirmDialogProvider>{children}</ConfirmDialogProvider>
      </NextIntlClientProvider>
    </ThemeProvider>
  );
};
