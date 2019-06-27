import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { addBasket } from '../../actions/basket'
import { connect } from 'react-redux'

const BasketForm = ({ addBasket }) => {
	const [name, setName] = useState('')

	return (
		<form
			onSubmit={e => {
				e.preventDefault()
				addBasket({ name })
				setName('')
			}}
			className='w-full max-w-sm'>
			<div className='flex items-center border-b border-b-2 border-teal-500 py-2'>
				<input
					className='appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none'
					type='text'
					placeholder='Basket category'
					aria-label='Full name'
					value={name}
					onChange={e => setName(e.target.value)}
				/>
				<button
					className='flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded'
					type='submit'>
					Create Basket
				</button>
			</div>
		</form>
	)
}

BasketForm.propTypes = {
	addBasket: PropTypes.func.isRequired,
}

export default connect(
	null,
	{ addBasket },
)(BasketForm)
