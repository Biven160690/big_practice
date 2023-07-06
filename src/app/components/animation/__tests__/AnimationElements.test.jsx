import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { AnimationElements } from '../AnimationElements';
import { example } from '../helper';

describe('AnimationElements', () => {
    it('renders a div with a class of container', () => {
        const { container } = render(<AnimationElements />);
        expect(container.firstChild.classList.contains('container')).toBe(true);
    });

    it('renders a List component', () => {
        const { getByTestId } = render(<AnimationElements />);
        expect(getByTestId('list')).toBeInTheDocument();
    });

    it('renders Parent component', () => {
        const { getAllByTestId } = render(<AnimationElements />);
        const parentComponents = getAllByTestId('parent');
        expect(parentComponents.length).toEqual(example.length);
    });
});
