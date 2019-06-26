import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { logout } from '../../actions/auth'

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
	const authLinks = (
		<ul className='navbar-nav ml-auto'>
			<li className='nav-item'>
				<a
					onClick={logout}
					className='nav-link btn btn-outline-secondary btn-sm px-3'
					href='#!'>
					Logout
				</a>
			</li>
		</ul>
	)
	const guestLinks = (
		<ul className='navbar-nav ml-auto'>
			<li className='nav-item'>
				<Link
					className='nav-link btn btn-outline-secondary btn-sm px-3'
					to='/login'>
					Login
				</Link>
			</li>
		</ul>
	)
	return (
		<nav className='navbar navbar-expand-lg bg-gray-400'>
			<div className='container'>
				<Link className='navbar-brand font-bold' to='/'>
					Shopping Basket
				</Link>
				<button
					className='navbar-toggler'
					type='button'
					data-toggle='collapse'
					data-target='#navbarNav'
					aria-controls='navbarNav'
					aria-expanded='false'
					aria-label='Toggle navigation'>
					<span className='navbar-toggler-icon' />
				</button>
				<div className='collapse navbar-collapse' id='navbarNav'>
					<Fragment>
						{!loading && (isAuthenticated ? authLinks : guestLinks)}
					</Fragment>
				</div>
			</div>
		</nav>
	)
}
Navbar.propTypes = {
	auth: PropTypes.object.isRequired,
	logout: PropTypes.func.isRequired,
}
const mapStateToProps = state => ({
	auth: state.auth,
})
export default connect(
	mapStateToProps,
	{ logout },
)(Navbar)
