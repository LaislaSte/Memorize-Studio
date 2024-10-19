// HOOKS AND LIBS 
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { GiHamburgerMenu } from 'react-icons/gi';
import { BiHomeAlt, BiLogOut } from 'react-icons/bi';
import { RiSearch2Line } from 'react-icons/ri';
import { BsPersonCircle } from 'react-icons/bs';
import { RiUserFollowFill } from 'react-icons/ri';

// ARCHIVES FROM PROJECT
import './Navbar.css';
import logo from '../../assets/icons/logo.svg'
import { SidebarDataPublic } from '../../utils/arraysNavbar';
import { UserAuth } from '../../services/UserContext';
import { auth } from '../../services/Banco';

const Navbar = () => {
    // states 
    const [navbar, setNavbar] = useState(false);

    //imports
    const { logout, notification } = UserAuth();
    const [user, loading, error] = useAuthState(auth);

    // functions 
    const showNavbar = () => setNavbar(!navbar);

    return (
        <nav className="navbar">
            <div className="nav-header">
                <div className="nav-toggle" onClick={showNavbar}>
                    <GiHamburgerMenu />
                </div>
                <h1 className='nav-header-logo' >
                    {logo}
                </h1>
            </div>

            <ul className={navbar ? 'nav-menu-items' : 'nav-menu-items nav-menu-items-active'}>

                <div className="nav-header">
                    <div className="nav-toggle" onClick={showNavbar}>
                        <GiHamburgerMenu />
                    </div>
                    <h1>MemorizeStudio</h1>
                </div>

                <li className='item-logo'> <h1>MemorizeStudio</h1> </li>

                {/* caso o usuario esteja autenticado as informações exibidas no navbar mudam */}
                {user
                    ? (
                        <>
                            <li className='nav-text'>
                                <Link to='/explore' className='item-link'>
                                    <RiSearch2Line />
                                    Explorar
                                </Link>
                            </li>
                            <li className='nav-text'>
                                <Link to='/review' className={notification ? 'input-message item-link' : 'item-link'}>
                                    <BiHomeAlt />
                                    Revisão
                                </Link>
                            </li>
                            <li className='nav-text'>
                                <Link to='/following' className='item-link'>
                                    <RiUserFollowFill />
                                    Seguindo
                                </Link>
                            </li>
                            <li className='nav-text'>
                                <Link to='/profile' className='item-link'>
                                    <BsPersonCircle />
                                    Perfil
                                </Link>
                            </li>
                            <li >
                                <div className='nav-text' onClick={() => { logout() }}>
                                    <BiLogOut />
                                    Logout
                                </div>
                            </li>
                        </>
                    )

                    : (SidebarDataPublic.map((item, index) => {
                        return (
                            <li key={index} className={item.cName}>
                                <Link to={item.path} className='item-link'>
                                    {item.icon}
                                    {item.title}
                                </Link>
                            </li>
                        )
                    }))
                }
            </ul>
        </nav>
    )
}

export default Navbar