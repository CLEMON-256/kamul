import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from '../App';

test('renders navigation links', () => {
    render(
        <BrowserRouter>
        App
        </BrowserRouter>
    );

    except(screen.getByText('Home').toBeIntheDocument());
    except(screen.getByText('Menu').toBeIntheDocument());

});