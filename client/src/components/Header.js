import React from 'react';
import { useSelector } from 'react-redux';

const Header = () => {
  const user = useSelector(state => state.auth.user);
  const renderContent = () => {
    if (!user) {
      return (
        <a href='/auth/google'>
          <i className='material-icons'>account_circle</i>
        </a>
      );
    }
    return (<a href='/auth/logout'>Logout</a>);
  };

  return (
    <nav>
      <div className='nav-wrapper'>
        <a href='/' className='brand-logo center'>
          Golden Moledy
        </a>
        <ul className='right hide-on-med-and-down'>
          <li key='1'>
            <a href='/search'>
              <i className='material-icons'>search</i>
            </a>
          </li>
          <li key='2'>
            {renderContent()}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
