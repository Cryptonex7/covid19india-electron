import React, {lazy} from 'react';
import {Switch, Route} from 'react-router';
import suspenseHoc from './hoc/suspenseHoc';
import withStyles from '@material-ui/styles/withStyles';
import './App.scss';
import {globalStyles} from './globalStyles';

const HomePage = lazy(() => import('./pages/HomePage'));

function Router(props) {
  return (
    <Switch>
      <Route exact path="/" component={suspenseHoc(HomePage)} />
    </Switch>
  );
}

export default withStyles(globalStyles)(Router);
