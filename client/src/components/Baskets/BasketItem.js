import React from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment'
import moment from 'moment'
import { deleteBasket } from '../../actions/basket'
import { connect } from 'react-redux'

const BasketItem = ({ basket: { _id, name, date }, deleteBasket }) => {
	return (
		<ul className='list-group'>
			<li className='list-group-item list-group-item-action'>
				<div className='d-flex w-100 justify-content-between'>
					<p className='lead text-teal-700'> {name}</p>
					<div>
						<a href='!#' className='mx-3'>
							<i className='fas fa-edit text-orange-600' />
						</a>

						<i onClick={() => deleteBasket(_id)} className='fas fa-trash' />
					</div>
				</div>
				<small>
					Created on: <Moment format='YYYY/MM/DD'>{moment.utc(date)}</Moment>
				</small>
			</li>
		</ul>
	)
}
BasketItem.propTypes = {
	basket: PropTypes.object.isRequired,
	deleteBasket: PropTypes.func.isRequired,
}

export default connect(
	null,
	{ deleteBasket }
)(BasketItem)
