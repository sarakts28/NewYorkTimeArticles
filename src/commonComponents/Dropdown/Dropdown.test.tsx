import { render, fireEvent } from '@testing-library/react';
import DropDown from './index';

describe('DropDown Component', () => {
  const mockOptions = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
  ];

  it('renders with placeholder when no value is selected', () => {
    const { container } = render(
      <DropDown options={mockOptions} value={null} placeholder='Select something' />
    );

    const displayValue = container.querySelector('.MuiSelect-select');
    expect(displayValue?.textContent).toBe('Select something');
    const placeholderSpan = container.querySelector('.MuiSelect-select span');
    expect(placeholderSpan).toHaveStyle('color: rgba(0, 0, 0, 0.54)');
  });

  it('displays the selected option label', () => {
    const { container } = render(<DropDown options={mockOptions} value='option2' />);

    const displayValue = container.querySelector('.MuiSelect-select');
    expect(displayValue?.textContent).toBe('Option 2');
  });

  it('renders all options when clicked', () => {
    const { container, getByRole } = render(<DropDown options={mockOptions} value={null} />);

    fireEvent.mouseDown(getByRole('combobox'));
    const menuItems = container.querySelectorAll('.MuiMenuItem-root');
    expect(menuItems.length).toBe(2);
    expect(menuItems[0].textContent).toBe('Option 1');
    expect(menuItems[1].textContent).toBe('Option 2');
    expect(menuItems[2].textContent).toBe('Option 3');
  });

  it('calls onChange when an option is selected', () => {
    const handleChange = jest.fn();
    const { getByRole, getAllByRole } = render(
      <DropDown options={mockOptions} value={null} onChange={handleChange} />
    );

    fireEvent.mouseDown(getByRole('combobox'));
    const menuItems = getAllByRole('option');
    fireEvent.click(menuItems[1]);

    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange.mock.calls[0][0].target.value).toBe('option2');
  });

  it('displays help text when provided', () => {
    const { container } = render(
      <DropDown options={mockOptions} value={null} helpText='Some helpful text' />
    );

    const helperText = container.querySelector('.MuiFormHelperText-root');
    expect(helperText?.textContent).toBe('Some helpful text');
  });

  it('applies custom width style', () => {
    const { container } = render(<DropDown options={mockOptions} value={null} width='200px' />);

    const formControl = container.querySelector('.MuiFormControl-root');
    expect(formControl).toHaveStyle('width: 200px');
  });
});
