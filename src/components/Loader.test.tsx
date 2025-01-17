import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Loader from './Loader';

describe('Loader Component', () => {
    test('renders without crashing', () => {
        const { container } = render(<Loader />);
        expect(container).toBeInTheDocument();
    });
});
