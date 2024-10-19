// HOOKS AND LIBS 
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { MdClose } from 'react-icons/md';

// ARCHIVES FROM PROJECT
import './Global.css';
import { UserAuth } from '../../services/UserContext';
import avatarDefault from '../../assets/img-avatar.png';
import { passConfValid, passwordValid } from '../../utils/validators';

/*PAGES AND COMPONENTS */
import Button from '../../components/button/Button';
import Input from '../../components/input/Input';

const DeleteAccount = () => {

    const [modal, setModal] = useState(false);
    const changeModal = () => setModal(!modal);
    const [password, setPassword] = useState('');
    const [passwordConf, setPasswordConf] = useState('');

    // imports 
    const { revomeUser, imgUrl } = UserAuth();
    const navigate = useNavigate();

    const formValid = () => {
        return passwordValid(password) && passConfValid(passwordConf);
    }

    const deleteAccount = (e) => {
        e.preventDefault();
        revomeUser(password);
        navigate('/');
    }

    const notDeleteAccount = () => {
        navigate('/config');
    }

    return (
        <div className='change-container'>
            <div className="img-container">
                <img src={imgUrl ? imgUrl : avatarDefault} alt="" />
                <h1>Certeza que deseja deletar sua conta?</h1>
            </div>

            <div className="btns-container">
                <Button
                    text='Não deletar'
                    type='button'
                    bg_color='secondary'
                    fun={notDeleteAccount}
                />

                <Button
                    text='Deletar'
                    type='button'
                    bg_color='secondary'
                    fun={changeModal}
                />
            </div>

            <div className={modal ? 'modal open' : 'modal'}>
                <MdClose onClick={changeModal} />
                <form onSubmit={deleteAccount} className="popup-container">
                    <h2 className="input-warning">Antes disso, insira sua senha</h2>
                    <p>Insira sua senha</p>
                    <Input
                        className="input-outline-secondary"
                        type="password"
                        text="Senha"
                        value={password}
                        onchange={(e) => setPassword(e.target.value)}
                        message='Insira uma senha válida'
                        showMessage={password && !passwordValid(password)}
                    />
                    <p>Confirme sua senha</p>
                    <Input
                        className="input-outline-secondary"
                        type="password"
                        text="Confirme sua senha"
                        value={passwordConf}
                        onchange={(e) => setPasswordConf(e.target.value)}
                        message='As senhas tem que ser iguais'
                        showMessage={passwordConf && !passConfValid(password, passwordConf)}
                    />

                    <div className="btns-popup">
                        <Button
                            type='submit'
                            text='Deletar conta permanentemente'
                            bg_color='secondary'
                        />
                    </div>
                </form>
            </div>

            <Link to='/explore' className='link'>
                <p>Voltar para página principal</p>
            </Link>
        </div>
    )
}

export default DeleteAccount