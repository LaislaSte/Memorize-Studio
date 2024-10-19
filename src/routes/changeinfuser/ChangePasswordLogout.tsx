// HOOKS AND LIBS
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { BiArrowBack } from 'react-icons/bi';

// ARCHIVES FROM PROJECT
import './Global.css';
import { emailValid } from '../../utils/validators';
import { UserAuth } from "../../services/UserContext";
import logo from '../../assets/icons/logo.svg';

/*PAGES AND COMPONENTS */
import Input from '../../components/input/Input';
import Button from '../../components/button/Button';

const ChangePasswordLogout = () => {

    const [email, setEmail] = useState("");

    const { updateUserPasswordLogOut } = UserAuth();

    function sendEmail(e) {
        e.preventDefault();
        console.log(email);
        updateUserPasswordLogOut(email);
    }

    return (
        <div className="change-container">
            <Link to='/login' className="colorfull-text">
                <BiArrowBack className='back-icon' />
            </Link>

            <div className="img-container">
                <img src={logo} alt="logo do site" />
                <h1 className="title">Altere sua senha</h1>
            </div>

            <p className="input-warning p-italic"> Certifique-se de que seu e-mail cadastrado é um e-mail existente
                Caso contrário não sera possível enviar nenhum e-mail de redefinição</p>

            <form className="form" onSubmit={sendEmail}>
                <p>Insira seu e-mail para enviar uma mensagem de atualização de senha</p>
                <Input
                    className="input-outline-secondary"
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

            <div className="footer">
                <h3 className='label'>
                    Não possui uma conta?
                    <Link to={'/register'} className='colorfull-text' >Cadastre-se</Link>
                </h3>
            </div>

        </div>
    )
}

export default ChangePasswordLogout