import { render, fireEvent, screen } from '@testing-library/react';
import SearchInput from './index';

describe('SearchInput Component', () => {
  const mockOnChange = jest.fn();

  beforeEach(() => {
    mockOnChange.mockClear();
  });

  it('renders with default props', () => {
    render(<SearchInput value='' onChange={mockOnChange} />);

    // Verify basic rendering
    const input = screen.getByPlaceholderText('Search...');
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue('');

    // Verify search icon is present
    expect(screen.getByTestId('SearchIcon')).toBeInTheDocument();

    // Verify clear icon is not present when value is empty
    expect(screen.queryByTestId('ClearIcon')).not.toBeInTheDocument();
  });

  it('calls onChange when typing', () => {
    render(<SearchInput value='' onChange={mockOnChange} />);

    const input = screen.getByPlaceholderText('Search...');
    fireEvent.change(input, { target: { value: 'test' } });

    expect(mockOnChange).toHaveBeenCalledTimes(1);
    expect(mockOnChange).toHaveBeenCalledWith('test');
  });

  it('shows clear button when value is not empty and clearable is true', () => {
    render(<SearchInput value='test' onChange={mockOnChange} clearable={true} />);

    expect(screen.getByTestId('ClearIcon')).toBeInTheDocument();
  });

  it('does not show clear button when clearable is false', () => {
    render(<SearchInput value='test' onChange={mockOnChange} clearable={false} />);

    expect(screen.queryByTestId('ClearIcon')).not.toBeInTheDocument();
  });

  it('clears input when clear button is clicked', () => {
    render(<SearchInput value='test' onChange={mockOnChange} />);

    const clearButton = screen.getByTestId('ClearIcon').closest('button');
    fireEvent.click(clearButton!);

    expect(mockOnChange).toHaveBeenCalledTimes(1);
    expect(mockOnChange).toHaveBeenCalledWith('');
  });

  it('applies custom width', () => {
    const { container } = render(<SearchInput value='' onChange={mockOnChange} width='300px' />);

    const box = container.firstChild;
    expect(box).toHaveStyle('width: 300px');
  });

  it('uses custom placeholder', () => {
    render(<SearchInput value='' onChange={mockOnChange} placeholder='Type to search...' />);

    expect(screen.getByPlaceholderText('Type to search...')).toBeInTheDocument();
  });

  it('has correct styling', () => {
    const { container } = render(<SearchInput value='' onChange={mockOnChange} />);

    const input = container.querySelector('.MuiOutlinedInput-root');
    expect(input).toHaveStyle({
      borderRadius: '4px',
      height: '40px',
    });
  });
});
