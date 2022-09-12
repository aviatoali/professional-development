import { useCallback, useState } from 'react';

export const useForceUpdate = () => {
  const [, setState] = useState(0);
  return useCallback(() => setState((s) => s + 1), []);
};
