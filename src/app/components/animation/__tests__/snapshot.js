import { render } from '@testing-library/react';
import { Child } from '../Child';
import { Parent } from '../Parent';
import { AnimationElements } from '../AnimationElements';
import { List } from '../List';
import { AnimationWrapper } from '../AnimationWrapper';

it('renders Child', () => {
    const { container } = render(<Child delay={10} />);
    expect(container).toMatchSnapshot();
});

it('renders Parent', () => {
    const { container } = render(<Parent elements={[1, 2, 3]} delay={10} />);
    expect(container).toMatchSnapshot();
});

it('renders AnimationElements', () => {
    const { container } = render(<AnimationElements />);
    expect(container).toMatchSnapshot();
});

it('renders List', () => {
    const { container } = render(<List />);
    expect(container).toMatchSnapshot();
});

it('renders AnimationWrapper', () => {
    const mockChildren = [
        <div key="1">First child</div>,
        <div key="2">Second child</div>,
    ];
    // eslint-disable-next-line react/no-children-prop
    const { container } = render(<AnimationWrapper children={mockChildren} />);
    expect(container).toMatchSnapshot();
});
