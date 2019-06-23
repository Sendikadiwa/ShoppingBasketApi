import React, { useEffect, Fragment } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { getBaskets } from '../../actions/basket'
import Spinner from '../layouts/Spinner'
import Baskets from '../Baskets/Baskets'
function Dashboard({
	getBaskets,
	basket: { loading, baskets },
	auth: { user },
}) {
	useEffect(() => {
		getBaskets()
	}, [getBaskets])
	return loading && baskets === null ? (
		<Spinner />
	) : (
		<Fragment>
			<div className='my-3'>
				<h1 className='text-5xl text-black'>Dashboard</h1>
				<p className='lead'>
					<i className='far fa-user' /> Welcome{' '}
					<span className='text-blue-600'>{user && user.name}</span>
				</p>
				<hr className='mb-5' />
			</div>
			<div className='row'>
				<div className='col-md-5'>
					<form class='w-full max-w-sm'>
						<div class='flex items-center border-b border-b-2 border-teal-500 py-2'>
							<input
								class='appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none'
								type='text'
								placeholder='Basket category'
								aria-label='Full name'
							/>
							<button
								class='flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded'
								type='button'>
								Create Basket
							</button>
							
						</div>
					</form>
				</div>
				<div className='col-md-7'>
					{baskets !== null ? (
						<Fragment>
							<Baskets basket={baskets} />
						</Fragment>
					) : (
						<Fragment>
							<p className='lead'>You currently have no baskets</p>
						</Fragment>
					)}
				</div>
			</div>
		</Fragment>
	)
}

Dashboard.propTypes = {
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
)(Dashboard)
