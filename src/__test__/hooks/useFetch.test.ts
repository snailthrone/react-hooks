/* eslint-disable import/no-extraneous-dependencies */

import { renderHook } from '@testing-library/react-hooks';
import useFetch from '../../hooks/useFetch';

describe('useFetch', () => {
  it('returns data', async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      useFetch('https://jsonplaceholder.typicode.com/todos/'),
    );

    expect(result.current.data).toBe(null);
    expect(result.current.loading).toBe(true);
    expect(result.current.error).toBe(false);

    await waitForNextUpdate();

    expect(result.current.data).toHaveLength(200);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe(false);
  });

  it('returns error', async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      useFetch('https://jsonplaceholder.typode.com/todos/300'),
    );

    expect(result.current.data).toBe(null);
    expect(result.current.loading).toBe(true);
    expect(result.current.error).toBe(false);

    await waitForNextUpdate();

    expect(result.current.data).toBe(null);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe(true);
  });
});
