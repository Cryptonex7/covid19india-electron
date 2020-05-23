import React from 'react';
import {useSelector} from 'react-redux';
import ThemeProvider from '@material-ui/styles/ThemeProvider';
import {darkTheme, lightTheme} from './theme';
import './App.scss';
import Router from './Router';

function App() {
  const isDarkTheme = useSelector((state) => state.theme.isDarkTheme);

  return (
    <ThemeProvider theme={isDarkTheme ? darkTheme : lightTheme}>
      <Router />
    </ThemeProvider>
  );
}

export default App;
