import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav class='navbar navbar-expand-lg bg-gray-400'>
      <div className='container'>
        <Link class='navbar-brand font-bold' to='/'>
          Shopping Basket
        </Link>
        <button
          class='navbar-toggler'
          type='button'
          data-toggle='collapse'
          data-target='#navbarNav'
          aria-controls='navbarNav'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span class='navbar-toggler-icon' />
        </button>
        <div class='collapse navbar-collapse' id='navbarNav'>
          <ul class='navbar-nav ml-auto'>
            <li class='nav-item'>
              <Link
                class='nav-link btn btn-outline-secondary btn-sm px-3'
                to='/'
              >
                Login
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
