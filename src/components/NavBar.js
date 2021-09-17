import './NavBar.css'
import { Link, NavLink } from 'react-router-dom'

const NavBar = () => {
    return (
        <div className='navbar'>
            <Link to='/' className='navbar__logo'>-Mood-</Link>
            <div className='navbar__links'>
                <NavLink to='/login' activeClassName='active' className='navbar__links--link'>Login</NavLink>
                <NavLink to='/signup' activeClassName='active' className='navbar__links--link'>Sign Up</NavLink>
            </div>
        </div>
    )
}

export default NavBar