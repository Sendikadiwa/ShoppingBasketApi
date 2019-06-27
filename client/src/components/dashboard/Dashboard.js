import React, { useEffect, Fragment } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { getBaskets } from '../../actions/basket'
import Spinner from '../layouts/Spinner'
import Baskets from '../Baskets/Baskets'
import BasketForm from '../Baskets/BasketForm';

const Dashboard = ({
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
				<h1 className='text-5xl text-black'>Dashboard</h1>
				<p className='lead'>
					<i className='far fa-user' /> Welcome{' '}
					<span className='text-blue-600'>{user && user.name}</span>
				</p>
				<hr className='mb-5' />
			</div>
			<div className='row'>
				<div className='col-md-5'>
					<BasketForm />
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
