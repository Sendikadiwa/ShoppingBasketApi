import React, { Fragment } from 'react'
import loading from './loading.gif'

export default () => {
	return (
		<Fragment>
			<img
				src={loading}
				style={{ width: '150px', margin: '200px auto', display: 'block' }}
				alt='loading...'
			/>
		</Fragment>
	)
}
