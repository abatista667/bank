import { screen, within } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";

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


export  const pickAutocompleteFirstOption = async (autoCompleteAccesibleName: string) => {
  const fromComboBox = getComboInput(autoCompleteAccesibleName)
  await userEvent.click(fromComboBox)
  const presentation =  await screen.findByRole("presentation")
  const option = within(presentation).getAllByRole("option")[0]
  await userEvent.click(option)
} 