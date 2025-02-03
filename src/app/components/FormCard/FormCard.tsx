import { DataHTMLAttributes, PropsWithChildren } from "react";
import { Actions, FieldGroup, Fields, Root, Row } from "./styles";

type FormCardProps = PropsWithChildren & DataHTMLAttributes<HTMLFormElement> &
  React.FormHTMLAttributes<HTMLFormElement>;

const FormCard = ({ children, ...rest }: FormCardProps) => {
  return (
    <Root {...rest} component="form">
      {children}
    </Root>
  );
};

FormCard.Fields = Fields;
FormCard.FieldGroup = FieldGroup;
FormCard.Actions = Actions;
FormCard.Row = Row;

export default FormCard;
