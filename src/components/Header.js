import React from 'react';

const Header = () => {
  return (
    <div>
      <header>
        <nav className='navbar'>
          <ul className='navbar__menu'>
            <li>Home</li>
            <li>Write</li>
            <li>Board</li>
            <li>FAQ</li>
            <li>Bookings</li>
          </ul>
          <ul className='navbar__icons'></ul>
        </nav>
      </header>
    </div>
  );
};

export default Header;
