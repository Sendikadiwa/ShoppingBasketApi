import {
	GET_BASKETS,
	BASKET_ERROR,
	ADD_BASKET,
	DELETE_BASKET,
} from '../actions/types'

const initialState = {
	basket: null,
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
		case DELETE_BASKET:
			return {
				...state,
				baskets: state.baskets.filter(basket => basket._id !== payload),
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
