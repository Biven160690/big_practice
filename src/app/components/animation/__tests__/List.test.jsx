import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { List } from '../List';

describe('List component', () => {
  it('should render the List component', () => {
    const { container } = render(<List />);
    expect(container.firstChild.classList.contains('awardContainer')).toBe(true);
  });
});
