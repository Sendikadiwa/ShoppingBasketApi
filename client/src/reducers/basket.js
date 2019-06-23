import { GET_BASKETS, BASKET_ERROR } from '../actions/types'

const initialState = {
	baskets: null,
	loading: true,
	error: {},
}

export default function(state = initialState, action) {
	const { type, payload } = action

	switch (type) {
		case GET_BASKETS:
			return {
				...state,
				baskets: payload,
				loading: false,
			}
		case BASKET_ERROR:
			return {
				...state,
				error: payload,
				loading: false,
			}
		default:
			return state
	}
}
