/* eslint-disable import/no-extraneous-dependencies */

import { render, waitFor } from '@testing-library/react';
import React, { FC, useEffect } from 'react';
import useDebounce from '../../hooks/useDebounce';

type WrapperProps = {
  initialValue: number;
  timeoutTime?: number;
};

const Wrapper: FC<WrapperProps> = ({ initialValue, timeoutTime }) => {
  const [value, setValue] = useDebounce<number>(timeoutTime);

  useEffect(() => {
    setValue(initialValue * initialValue);
  }, [initialValue, setValue]);

  return <div data-testid="value">{value || initialValue}</div>;
};

describe('useDebounce', () => {
  it('updates value after defined time.', async () => {
    const { findByTestId } = render(<Wrapper initialValue={2} timeoutTime={100} />);
    const value = await findByTestId('value');
    expect(value).toHaveTextContent('2');

    await waitFor(
      async () => {
        const debouncedValue = await findByTestId('value');
        expect(debouncedValue).toHaveTextContent('4');
      },
      { timeout: 100 },
    );
  });
  it('updates value if the time is not defined', async () => {
    const { findByTestId } = render(<Wrapper initialValue={3} />);
    const value = await findByTestId('value');
    expect(value).toHaveTextContent('3');

    await waitFor(
      async () => {
        const debouncedValue = await findByTestId('value');
        expect(debouncedValue).toHaveTextContent('9');
      },
      { timeout: 100 },
    );
  });
});
