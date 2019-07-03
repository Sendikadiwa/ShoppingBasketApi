import React, { useEffect, Fragment } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { getBaskets } from '../../actions/basket'
import Spinner from '../layouts/Spinner'
import BasketItem from './BasketItem'

const Baskets = ({
	getBaskets,
	basket: { loading, baskets },
	auth: { user },
}) => {
	useEffect(() => {
		getBaskets()
	}, [getBaskets])

	return loading ? (
		<Spinner />
	) : (
		<Fragment>
			<div className='my-3'>
				<h1 className='text-4xl text-black'>Dashboard</h1>
				<p className='lead'>
					<i className='far fa-user' /> Welcome{' '}
					<span className='text-blue-600 text-sm'>{user && user.name}</span>
				</p>
				<hr className='mb-5' />
			</div>
			<div className='flex justify-between'>
				<div>
					<Link
						to='/add_basket'
						className='cursor-pointer bg-gray-700 hover:no-underline hover:bg-gray-800 py-2 px-4 text-white font-bold rounded'>
						Add Basket
					</Link>
				</div>

				{/* search */}
			</div>
			<div className='row justify-center'>
				<div className='col-md-8 mt-5'>
					{baskets !== null ? (
						<Fragment>
							{baskets.map(basket => (
								<BasketItem key={basket._id} basket={basket} />
							))}
						</Fragment>
					) : (
						<p>You currently have no baskets</p>
					)}
				</div>
			</div>
		</Fragment>
	)
}

Baskets.propTypes = {
	basket: PropTypes.object.isRequired,
	auth: PropTypes.object.isRequired,
}

const mapStateToprops = state => ({
	basket: state.basket,
	auth: state.auth,
})
export default connect(
	mapStateToprops,
	{ getBaskets },
)(Baskets)
