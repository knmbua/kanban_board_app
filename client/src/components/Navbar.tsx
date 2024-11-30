import { NavLink, useNavigate } from 'react-router-dom';
import { logOut } from '../api/authAPI';

import { LoginProps } from '../interfaces/LoginProps';

const Navbar = ({
  user,
  setUser
}: LoginProps) => {
  const navigate = useNavigate();

  const logoutUser = async () => {
    await logOut();

    setUser(null);
    navigate('/login');
  }

  return (
    <div className='nav'>
      <div className='nav-title'>
        <NavLink to='/'>Krazy Kanban Board</NavLink>
      </div>
      <ul>
        {
          !user ? (
            <>
              <li className='nav-item'>
                <NavLink to='/login'>
                  <button type='button'>Login</button>
                </NavLink>
              </li>
              <li className='nav-item'>
                <NavLink to='/register'>
                  <button type='button'>Register</button>
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li className='nav-item'>
                <p>Welcome, {user.username}</p>
              </li>
              <li className='nav-item' id='create-ticket-link'>
                <NavLink to='/create'>
                  <button type='button'>New Ticket</button>
                </NavLink>
              </li>
              <li className='nav-item'>
                <button type='button' onClick={logoutUser}>Logout</button>
              </li>
            </>
          )
        }
      </ul>
    </div>
  )
}

export default Navbar;
