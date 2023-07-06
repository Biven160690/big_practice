import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import { Parent } from '../Parent';

describe('Parent component', () => {
    const mockElements = [1, 2, 3];
    const mockDelay = 100;

    it('should render all children when given an array of elements', async () => {
        render(<Parent elements={mockElements} delay={mockDelay} />);
        await waitFor(() => {
            expect(screen.getAllByTestId('child')).toHaveLength(
                mockElements.length
            );
        });
    });

    it('should parent component to be in document', () => {
        render(<Parent elements={mockElements} delay={mockDelay} />);

        const parentElement = screen.getByTestId('parent');
        expect(parentElement).toBeInTheDocument();
    });

    it('renders with the given delay prop', () => {
        const { getByTestId } = render(
            <Parent delay={mockDelay} elements={mockElements} />
        );
        const childElement = getByTestId('parent');
        const style = childElement.getAttribute('style');
        const expectedStyle = 'opacity: 0; transform: translateY(-100%);';
        expect(style).toBe(expectedStyle);
    });
});
