import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import './App.css';
import Navbar from './components/layouts/Navbar';
import Register from './components/auth/Register';
import store from './store';
import Alert from './components/layouts/Alert';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <div className='container'>
            <Alert />
            <Switch>
              <Route exact path='/' component={Register} />
            </Switch>
          </div>
        </Fragment>
      </Router>
    </Provider>
  );
}

export default App;
