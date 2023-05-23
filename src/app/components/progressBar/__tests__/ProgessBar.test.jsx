import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { ProgressBar } from '../ProgressBar';

test('ProgressBar updates the position of the runner and the completed line on mouse down and move', () => {
  const { getByTestId } = render(<ProgressBar />);
  const container = getByTestId('container');
  const completedLine = getByTestId('completed-line');
  const runner = getByTestId('runner');

  const clientX = 150;
  const containerWidth = container.clientWidth;
  const runnerWidth = runner.clientWidth;
  const progress = Math.min(clientX, containerWidth - runnerWidth);

  fireEvent.mouseDown(runner, { clientX: 0 });
  fireEvent.mouseMove(container, { clientX });
  fireEvent.mouseUp(container);

  expect(runner.style.transform).toBe(`translateX(${progress}px)`);
  expect(completedLine.style.transform).toBe(`scaleX(${(progress + runnerWidth) / (containerWidth / 100) / 100})`);
});
