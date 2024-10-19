// HOOKS AND LIBS
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { BiArrowBack } from 'react-icons/bi';

// ARCHIVES FROM PROJECT
import { auth } from "../../services/Banco";
import './Global.css';
import { emailValid } from '../../utils/validators';
import { UserAuth } from "../../services/UserContext";
import avatarDefault from '../../assets/img-avatar.png';

/*PAGES AND COMPONENTS */
import Input from '../../components/input/Input';
import Button from '../../components/button/Button';

const ChangePassword = () => {

    const [email, setEmail] = useState("");

    const { updateUserPasswordLogIn, imgUrl } = UserAuth();

    function sendEmail(e) {
        e.preventDefault();
        console.log(email);
        updateUserPasswordLogIn(email);
    }

    return (
        <div className="change-container">
            <Link to='/config'>
                <BiArrowBack className='back-icon' />
            </Link>
            <div className="img-container">
                <img src={imgUrl ? imgUrl : avatarDefault} alt="imagem do usuário logado" />
            </div>
            <h1 className="title">Altere sua senha</h1>
            <h3 className="input-warning">
                Certifique-se de que seu e-mail cadastrado é um e-mail existente.
                Caso contrário é possível edita-lo nas configurações
            </h3>

            <form className="form" onSubmit={sendEmail}>
                <p>Insira seu e-mail para enviar uma mensagem de atualização de senha</p>
                <Input
                    className="input-outline-secondary input-light"
                    type="text"
                    text="E-mail cadastrado"
                    value={email}
                    onchange={(e) => setEmail(e.target.value)}
                    message='E-mail inválido'
                    showMessage={email && !emailValid(email)}
                />

                <Button
                    text='Enviar'
                    type='submit'
                    bg_color='secondary'
                />

            </form>
        </div>
    )
}

export default ChangePassword
