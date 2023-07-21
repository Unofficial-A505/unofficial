import { useEffect, useRef } from 'react';

// 첫번째 Mount 막아줌
const useDidMountEffect = ( func, deps ) => {
  const areYouMounted = useRef(false);

  useEffect(() => {
    if (areYouMounted.current) func();
    else areYouMounted.current = true;
  }, deps);
}

export default useDidMountEffect;