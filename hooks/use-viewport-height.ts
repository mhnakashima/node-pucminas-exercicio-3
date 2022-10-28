import { useEffect } from 'react';

import debounce from 'lodash.debounce';

const VIEWPORT_HEIGHT_VARIABLE = '--vw';

const useViewportHeight = () => {
  useEffect(() => {
    const update = () => {
      const height = window.innerHeight * 0.01;
      document.documentElement.style.setProperty(VIEWPORT_HEIGHT_VARIABLE, `${height}px`);
    };

    update();

    const debounceUpdate = debounce(update, 500);
    window.addEventListener('resize', debounceUpdate);
    return () => window.removeEventListener('resize', debounceUpdate);
  }, []);
};

export default useViewportHeight;
