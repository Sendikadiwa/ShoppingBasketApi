import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function Register(props) {
  return (
    <Fragment>
      <div className='container flex flex-row justfiy-between'>
        <div className='mt-40'>
          <h3 className='text-gray-900 mb-2 text-4xl font-bold'>Shopping List</h3>
          <p className='text-gray-700 mr-5 leading-relaxed'>
            Get away with papers and note books when you want to quickly create
            a shopping list. This application helps you create, delete, and
            update your list with easy anytime anywhere. <span className='bg-gray-600 p-1 text-white'>Give it a try.</span>
          </p>
        </div>
        <div className='w-full max-w-xl mt-40'>
          <form className='bg-white shadow-md px-8 pt-6 pb-8 mb-2'>
            <h3 className='my-4 text-dark text-2xl font-bold'>
              Please register to get started
            </h3>

            <div className='mb-2'>
              <input
                className='appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                type='text'
                placeholder='Username'
              />
            </div>
            <div className='mb-2'>
              <input
                className='appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                type='email'
                placeholder='Email address'
              />
            </div>
            <div className='mb-2'>
              <input
                className='appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                type='password'
                placeholder='Password'
              />
            </div>
            <div className='md:w-2/3 mt-3'>
              <button
                className='shadow bg-gray-800 hover:bg-gray-900 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded'
                type='submit'
              >
                Register
              </button>
              <p className='mt-2 inline-block mr-2'>Already have an account?</p>
              <Link to='/login' className='text-blue-600'>Login</Link>
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
}

Register.propTypes = {};

export default Register;
//  <div class="md:w-2/3">
//       <button class="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="button">
//         Sign Up
//       </button>
//     </div>
