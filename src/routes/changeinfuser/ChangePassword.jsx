// HOOKS AND LIBS
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
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

    const { updateUserPasswordLogIn, imgUrl } = UserAuth()
    const [user, loading, error] = useAuthState(auth);

    const navigate = useNavigate();
    useEffect(() => {
        if (loading) return;
        if (!user) navigate("/login");
    }, [user, loading]);

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
            <h2 className="input-warning"> Certifique-se de que seu e-mail cadastrado é um e-mail existente</h2>
            <h3>Caso contrário é possível edita-lo nas configurações</h3>

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
        </div>
    )
}

export default ChangePassword
