import React, { useEffect, ReactNode } from 'react';
import ReactDOM from 'react-dom';

const Portal = ({ children, parent, className }) => {
  const element = React.useMemo(() => document?.createElement('div'), []);

  useEffect(() => {
    if (process.browser) {
      const target = parent && parent?.appendChild ? parent : document?.body;
      const classList = ['portal-container'];

      if (className) {
        className?.split(' ').forEach((item) => classList.push(item));
      }

      classList.forEach((item) => element?.classList.add(item));

      target?.appendChild(element);

      return () => {
        target?.removeChild(element);
      };
    }
  }, [element, parent, className]);

  return process.browser && element && ReactDOM.createPortal(children, element);
};

export default Portal;
