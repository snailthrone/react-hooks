/* eslint-disable import/no-extraneous-dependencies */

import { render } from '@testing-library/react';
import React, { FC } from 'react';
import usePrevious from '../../hooks/usePrevious';

type WrapperProps = {
  value: number;
};

const Wrapper: FC<WrapperProps> = ({ value }) => {
  const previousValue = usePrevious(value);

  return (
    <div>
      <div data-testid="previousValue">{previousValue}</div>
      <div data-testid="value">{value}</div>
    </div>
  );
};

describe('usePrevious', () => {
  it('returns previous value', async () => {
    const { findByTestId, rerender } = render(<Wrapper value={2} />);

    const previousValue = await findByTestId('previousValue');
    const value = await findByTestId('value');

    expect(previousValue).not.toHaveTextContent('undefined');
    expect(value).toHaveTextContent('2');

    await rerender(<Wrapper value={7} />);

    const rerenderedPreviousValue = await findByTestId('previousValue');
    const rerenderedValue = await findByTestId('value');

    expect(rerenderedPreviousValue).toHaveTextContent('2');
    expect(rerenderedValue).toHaveTextContent('7');
  });
});
