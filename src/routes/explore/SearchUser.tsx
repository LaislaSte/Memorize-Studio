// HOOKS AND LIBS 
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BsBoxArrowInUpRight } from 'react-icons/bs';

// ARCHIVES FROM PROJECT
import './Explore.css';
import avatarDefault from '../../assets/img-avatar.png';

const SearchUser = ({
    euid,
    avatar,
    name

}) => {

    const navigate = useNavigate();

    const goToUserPage = () => {
        navigate(`/user/${euid}`);
    }

    return (
        <div className="user" onClick={goToUserPage} key={euid} >
            <div className='user-content'>
                <img src={avatar ? avatar : avatarDefault} alt="resultado de pesquisa" />
                <p> {name} </p>
            </div>

            <BsBoxArrowInUpRight />

        </div>
    )
}

export default SearchUser