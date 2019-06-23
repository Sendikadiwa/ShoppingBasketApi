import axios from 'axios'
import { GET_BASKETS, BASKET_ERROR } from './types'

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
