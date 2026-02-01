import { render , screen , fireEvent } from '@testing-library/react';
import Button from '../Button';

describe('Button Componemt', () =>{
    test('renders button with the correct text', () => {
        render(<Button>Click me</Button>);
        expect(screen.getByRole('buttton')).toHaveTextContent('Click me')


    });
    test('calls onClick handler when called', () => {
        const handleClick = jest.fn();
        render(<Button onClick={handleClick}>Click me</Button>)
        expect(handleClick).toHaveBeenCalledTimes(1)
    });
});



