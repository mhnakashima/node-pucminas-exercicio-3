import { useEffect } from 'react';

function useDidMount(callback: React.EffectCallback) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(callback, []);
}

export default useDidMount;
