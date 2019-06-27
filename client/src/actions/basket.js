import axios from 'axios'
import { GET_BASKETS, BASKET_ERROR, ADD_BASKET } from './types'
import { setAlert } from './alert'

// Get current user baskets
export const getBaskets = () => async dispatch => {
	try {
		const res = await axios.get('/api/v1/basket')
		dispatch({
			type: GET_BASKETS,
			payload: res.data,
		})
	} catch (error) {
		dispatch({
			type: BASKET_ERROR,
			payload: {
				msg: error.response.statusText,
				status: error.response.status,
			},
		})
	}
}

// Add baskets
export const addBasket = ({ name }) => async dispatch => {
	const config = {
		headers: {
			'Content-Type': 'application/json',
		},
	}
	const body = JSON.stringify({ name })
	try {
		const res = await axios.post('/api/v1/basket', body, config)
		dispatch({
			type: ADD_BASKET,
			payload: res.data,
		})
		dispatch(setAlert('Basket created successfully', 'success'))
	} catch (error) {
		dispatch({
			type: BASKET_ERROR,
			payload: {
				msg: error.response.statusText,
				status: error.response.status,
			},
		})
	}
}
