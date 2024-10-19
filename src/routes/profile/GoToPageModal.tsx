import React from 'react';
import { useNavigate } from 'react-router-dom';
import avatarDefault from '../../assets/img-avatar.png';

const GoToPageModal = ({ uid, name, avatar }) => {
    const navigate = useNavigate();

    const goToUserPage = () => {
        navigate(`/user/${uid}`);
    }

    return (

        <div key={uid} onClick={goToUserPage} className="follow-container">
            <img src={avatar ? avatar : avatarDefault} alt="foto do usuário externo" className='follow-container-img' />
            <p className='p-italic'> {name} </p>
        </div>

    )
}

export default GoToPageModal