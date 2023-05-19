import { render } from '@testing-library/react';
import { ProgressBar } from '../ProgressBar';

it('renders ProgressBar', () => {
    const { container } = render(<ProgressBar />);
    expect(container).toMatchSnapshot();
});
