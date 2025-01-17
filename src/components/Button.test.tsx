import { render, fireEvent } from '@testing-library/react';
import Button from './Button';
import '@testing-library/jest-dom';


jest.mock('./Button.module.css', () => ({
    button: 'button',
}));

describe('Button Component', () => {
    test('renders children correctly', () => {
        const { getByText } = render(<Button onClick={() => {}}>Click Me</Button>);
        expect(getByText(/Click Me/i)).toBeInTheDocument();
    });

    test('calls onClick when clicked', () => {
        const onClickMock = jest.fn();
        const { getByText } = render(<Button onClick={onClickMock}>Click Me</Button>);

        const button = getByText(/Click Me/i);
        fireEvent.click(button);

        expect(onClickMock).toHaveBeenCalledTimes(1);
    });

    test('applies default color when no color is provided', () => {
        const { getByText } = render(<Button onClick={() => {}}>Default Color</Button>);

        const button = getByText(/Default Color/i);
        expect(button).toHaveStyle('background-color: #0366d6');
    });

    test('applies custom color when provided', () => {
        const customColor = '#ff5733';
        const { getByText } = render(
            <Button onClick={() => {}} color={customColor}>
                Custom Color
            </Button>
        );

        const button = getByText(/Custom Color/i);
        expect(button).toHaveStyle(`background-color: ${customColor}`);
    });

    test('has the correct class applied', () => {
        const { getByText } = render(<Button onClick={() => {}}>Test Class</Button>);

        const button = getByText(/Test Class/i);
        expect(button).toHaveClass('button');
    });
});
