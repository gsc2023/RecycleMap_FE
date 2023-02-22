import { useState } from 'react';

const useForceUpdate = () => {
  const [, forceUpdate] = useState(0);
  return () => forceUpdate(st => ++st);
};

export default useForceUpdate;
