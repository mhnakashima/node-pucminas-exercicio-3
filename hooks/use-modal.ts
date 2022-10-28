import { useCallback, useState } from 'react';

export type TModalState<T extends object> = T & { show: boolean };

function useModalState<T extends object = { title: string; body: React.ReactNode; }>(initialState?: T) {
  // @ts-ignore
  const [state, setState] = useState<TModalState<T>>({ ...initialState, show: false });

  const show = useCallback((options?: Partial<T>) => {
    setState(state => ({ ...state, ...options, show: true }));
  }, [setState]);

  const hide = useCallback(() => {
    setState(state => ({ ...state, show: false }));
  }, [setState]);

  return { state, show, hide };
}

export default useModalState;
