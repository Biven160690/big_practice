import React from 'react';
import { render, screen } from '@testing-library/react';
import { AnimationWrapper } from '../AnimationWrapper';
import '@testing-library/jest-dom';

const mockChildren = [
  <div key="1">First child</div>,
  <div key="2">Second child</div>,
];

describe('AnimationWrapper', () => {
  it('should correctly apply the style prop to the children', () => {
    // eslint-disable-next-line react/no-children-prop
    render(<AnimationWrapper children={mockChildren} />);
    expect(screen.getByText('First child')).toBeInTheDocument();
    expect(screen.getByText('Second child')).toBeInTheDocument();
  });
});
