import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setAlert } from '../../actions/alert';
import { registerUser } from '../../actions/auth';

function Register({ registerUser }) {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: ''
  });
  // destructure
  const { name, email, password } = userData;

  // onchange
  const onChange = e => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };
  const onSubmit = async e => {
    e.preventDefault();
    registerUser({ name, email, password });
  };
  return (
    <Fragment>
      <div className='container flex flex-row justfiy-between'>
        <div className='mt-40'>
          <h3 className='text-gray-900 mb-2 text-4xl font-bold'>
            Shopping List
          </h3>
          <p className='text-gray-700 mr-5 leading-relaxed'>
            Get away with papers and note books when you want to quickly create
            a shopping list. This application helps you create, delete, and
            update your list with easy anytime anywhere.{' '}
            <span className='bg-gray-600 p-1 text-white'>Give it a try.</span>
          </p>
        </div>
        <div className='w-full max-w-xl mt-40'>
          <form
            onSubmit={e => onSubmit(e)}
            className='bg-white shadow-md px-8 pt-6 pb-8 mb-2'
          >
            <h3 className='my-4 text-dark text-2xl font-bold'>
              Please register to get started
            </h3>

            <div className='mb-2'>
              <input
                className='bg-gray-200 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                type='text'
                name='name'
                placeholder='Username'
                onChange={e => onChange(e)}
                value={name}
              />
            </div>
            <div className='mb-2'>
              <input
                className='bg-gray-200 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                type='email'
                name='email'
                placeholder='Email address'
                onChange={e => onChange(e)}
                value={email}
              />
            </div>
            <div className='mb-2'>
              <input
                className='bg-gray-200 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                type='password'
                name='password'
                placeholder='Password'
                onChange={e => onChange(e)}
                value={password}
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
              <Link to='/login' className='text-blue-600'>
                Login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
}

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  registerUser: PropTypes.func.isRequired
};

export default connect(
  null,
  { setAlert, registerUser }
)(Register);
