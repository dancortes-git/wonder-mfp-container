import React, { lazy, Suspense, useState, useEffect } from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import {
  StylesProvider,
  createGenerateClassName,
  makeStyles,
} from '@material-ui/core/styles';
import { createBrowserHistory } from 'history';

import Progress from './components/Progress';
import { Box, CssBaseline } from '@material-ui/core';

const HeaderLazy = lazy(() => import('./components/HeaderApp'));
const FooterLazy = lazy(() => import('./components/FooterApp'));
const MarketingLazy = lazy(() => import('./components/MarketingApp'));
const PurchaseLazy = lazy(() => import('./components/PurchaseApp'));
const ProductLazy = lazy(() => import('./components/ProductApp'));

const generateClassName = createGenerateClassName({
  productionPrefix: 'con',
});

const history = createBrowserHistory();

const useStyles = makeStyles((theme) => ({
  app: {
    minHeight: '100vh',
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
}));

const App = () => {
  const [user, setUser] = useState(null);
  const isSignedIn = !!user;

  const defaultUser = {
    name: 'User Name',
    email: 'user@email.com',
  }

  const onSignOut = () => {
    setUser(null);
  }

  const onSignIn = () => {
    setUser(defaultUser);
    console.log('User logged');
  }

  console.log('Rendering container...', 'user:', user, 'isSignedIn:', isSignedIn);

  const classes = useStyles();
  return (
    <Router history={history}>
      <StylesProvider generateClassName={generateClassName}>
        <CssBaseline />
        <Box display="flex" flexDirection="column" className={classes.app} >
          <Suspense fallback={<Progress />}>
            <Switch>
              <Route path="/auth">
                {isSignedIn && <Redirect to="/" />}
                <HeaderLazy isSignedIn={isSignedIn} onSignOut={onSignOut} user={user}/>
                <Box component="main" flexGrow={1} flexShrink={0} flexBasis="auto">
                  <PurchaseLazy isSignedIn={isSignedIn} onSignIn={onSignIn} />
                </Box>
                <Box component="footer" flexShrink={0}>
                  <FooterLazy />
                </Box>
              </Route>
              <Route path="/app">
                <HeaderLazy isSignedIn={isSignedIn} onSignOut={onSignOut} user={user}/>
                <Box component="main" flexGrow={1} flexShrink={0} flexBasis="auto">
                  <ProductLazy isSignedIn={isSignedIn} />
                </Box>
                <Box component="footer" flexShrink={0}>
                  <FooterLazy />
                </Box>
              </Route>
              <Route path="/">
                <HeaderLazy isSignedIn={isSignedIn} onSignOut={onSignOut} user={user}/>
                <Box component="main" flexGrow={1} flexShrink={0} flexBasis="auto">
                  <MarketingLazy isSignedIn={isSignedIn} />
                </Box>
                <Box component="footer" flexShrink={0}>
                  <FooterLazy />
                </Box>
              </Route>
            </Switch>
          </Suspense>
        </Box>
      </StylesProvider>
    </Router>
  );
}

export default App;