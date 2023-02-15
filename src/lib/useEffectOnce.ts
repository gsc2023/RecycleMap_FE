/* eslint-disable */
import { useEffect, useRef, useState } from 'react';

type DesFuncType = void | (() => void);
type PDesFuncType = DesFuncType | Promise<DesFuncType>;
type EffectType = (() => PDesFuncType);

export const useEffectOnce = (effect: EffectType) => {
  const destroyFunc = useRef<PDesFuncType>();
  const effectCalled = useRef(false);
  const renderAfterCalled = useRef(false);
  const [, setVal] = useState(0);

  if (effectCalled.current) {
    renderAfterCalled.current = true;
  }

  useEffect(() => {
    if (!effectCalled.current) {
      destroyFunc.current = effect();
      effectCalled.current = true;
    }
    setVal(val => val + 1);

    return () => {
      if (!renderAfterCalled.current) { return; }
      if (destroyFunc.current) {
        Promise.resolve(destroyFunc.current).then((ret) => ret && ret());
      }
    };
  }, []);
};
