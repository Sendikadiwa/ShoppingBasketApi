import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment'
import moment from 'moment'

const Baskets = ({ basket }) => {
	const baskets = basket.map(bask => (
		<ul key={bask._id} className='list-group'>
			<li className='list-group-item list-group-item-action'>
				<div className='d-flex w-100 justify-content-between'>
					<p className='lead text-teal-700'> {bask.name}</p>
					<div>
						<a href='!#' className='mx-3'>
							<i className='fas fa-edit text-orange-600' />
						</a>
						<a href='!#'>
							<i className='fas fa-trash' />
						</a>
					</div>
				</div>
				<small>
					Created on:{' '}
					<Moment format='YYYY/MM/DD'>{moment.utc(bask.date)}</Moment>
				</small>
			</li>
		</ul>
	))
	return <Fragment>{baskets}</Fragment>
}

Baskets.propTypes = {
	basket: PropTypes.array.isRequired,
}

export default Baskets
