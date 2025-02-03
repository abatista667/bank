"use client";
import { PropsWithChildren } from "react";
import { Content, Root } from "./style";
import Header from "../../components/Header";
import { ConfirmDialogProvider } from "../../components/ConfirmDialg/ConfirmDilogContext";

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <Root>
      <ConfirmDialogProvider>
        <Header />
        <Content data-testid="content">{children}</Content>
      </ConfirmDialogProvider>
    </Root>
  );
};

export default Layout;
