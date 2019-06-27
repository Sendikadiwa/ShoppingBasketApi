import { GET_BASKETS, BASKET_ERROR, ADD_BASKET } from '../actions/types'

const initialState = {
	baskets: [],
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
		case ADD_BASKET:
			return {
				baskets: [payload, ...state.baskets],
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
