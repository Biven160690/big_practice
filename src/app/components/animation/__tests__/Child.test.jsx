import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { Child } from '../Child';

describe('Child Component', () => {
    it('renders without crashing', () => {
        const { getByTestId } = render(<Child delay={1500} />);
        const child = getByTestId('child');
        expect(child).toBeInTheDocument();
    });

    it('renders with the given delay prop', () => {
        const delay = 500;
        const { getByTestId } = render(<Child delay={delay} />);
        const childElement = getByTestId('child');
        const style = childElement.getAttribute('style');
        const expectedStyle = 'opacity: 0; transform: translateY(-100%);';
        expect(style).toBe(expectedStyle);
    });
});
