import React, { Fragment, useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import './App.css'
import Navbar from './components/layouts/Navbar'
import Register from './components/auth/Register'
import Login from './components/auth/Login'
import store from './store'
import Alert from './components/layouts/Alert'
import setAuthToken from './utils/setAuthToken'
import { loadUser } from './actions/auth'
import PrivateRoute from './components/routing/PrivateRoute'
import Baskets from './components/baskets/Baskets'
import AddBasket from './components/basket-forms/AddBasket';

if (localStorage.token) {
	setAuthToken(localStorage.token)
}
const App = () => {
	useEffect(() => {
		store.dispatch(loadUser())
	}, [])
	return (
		<Provider store={store}>
			<Router>
				<Fragment>
					<Navbar />
					<div className='container'>
						<Alert />
						<Switch>
							<Route exact path='/' component={Register} />
							<Route exact path='/login' component={Login} />
							<PrivateRoute exact path='/baskets' component={Baskets} />
							<PrivateRoute exact path='/add_basket' component={AddBasket} />
						</Switch>
					</div>
				</Fragment>
			</Router>
		</Provider>
	)
}

export default App
