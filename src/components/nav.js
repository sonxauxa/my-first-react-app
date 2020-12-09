import React from 'react';
import {Link} from 'react-router-dom';

function Nav() {
    return (
        <nav className='my-nav'>
            <h2>Logo</h2>
            {!localStorage.getItem('userToken') ?
                <ul className='nav-bar'>
                    <Link to="/">
                        <li>
                            Home
                        </li>
                    </Link>
                    <Link to="/about">
                        <li>
                            About
                        </li>
                    </Link>
                    <Link to="/login">
                        <li>
                            Login
                        </li>
                    </Link>
                    <Link to="/signup">
                        <li>
                            Register
                        </li>
                    </Link>
                </ul>
                :
                <ul>
                    <Link to="/">
                        <li>
                            Home
                        </li>
                    </Link>
                    <Link to="/about">
                        <li>
                            About
                        </li>
                    </Link>
                    <Link to="/product">
                        <li>
                            show product
                        </li>
                    </Link>
                    <Link to="/data">
                        <li>pagi page</li>
                    </Link>
                    <li className='l-out'>
                        <a href='/' onClick={() => {
                            localStorage.removeItem('userToken')
                        }}>log out</a>
                    </li>
                </ul>
            }
        </nav>
    )
}

export default Nav;