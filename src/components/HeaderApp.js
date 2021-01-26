import { mount } from 'customer/CustomerApp';
import React, { useRef, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

export default ({ isSignedIn, onSignOut, user }) => {
  const ref = useRef(null);
  const history = useHistory();

  useEffect(() => {
    const { onParentNavigate } = mount(ref.current, {
      initialPath: history.location.pathname,
      onNavigate: ({ pathname: nextPathname }) => {
        const { pathname } = history.location;

        if (pathname !== nextPathname) {
          history.push(nextPathname);
        }
      },
      isSignedIn,
      onSignOut,
      user,
    });

    history.listen(onParentNavigate);
  }, []);

  return <div ref={ref} />;
};
