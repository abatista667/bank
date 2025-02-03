import { screen, within } from "@testing-library/dom";

export const getTextField = (name: string) =>
  screen.getByRole("generic", { name });
export const getTextFieldInput = (name: string) =>
  within(getTextField(name)).getByRole("textbox");
export const getComboInput = (name: string) =>
  within(getTextField(name)).getByRole("combobox");

export const findTextFieldValidationText = (
  name: string,
  validationText: string,
) => within(getTextField(name)).findByText(validationText);
