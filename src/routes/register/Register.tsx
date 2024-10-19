// HOOKS AND LIBS 
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { FaEnvelope } from 'react-icons/fa';
import { RiLockPasswordFill } from 'react-icons/ri';
import { BsFillPersonFill } from 'react-icons/bs';

// ARCHIVES FROM PROJECT
import { auth } from '../../services/Banco';
import { emailValid, passConfValid, passwordValid, nameValid } from '../../utils/validators';
import { UserAuth } from '../../services/UserContext';
import './Register.css';
import logo from '../../assets/icons/logo.svg';

/*PAGES AND COMPONENTS */
import Button from '../../components/button/Button';
import Input from '../../components/input/Input';
import Footer from '../../components/footer/Footer';
import Loader from '../../components/loader/Loader';

const Register = () => {
    // states
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');

    // imports
    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();
    const { registerWithEmailAndPassword, signInWithGoogle } = UserAuth();

    useEffect(
        () => {
            if (loading) {
                return;
            }
            if (user) navigate('/explore');

        },
        [user, loading]
    );

    // functions 
    const formValidRegister = () => {
        if (emailValid(email) && passwordValid(password) && nameValid(name) && passConfValid(passwordConfirm)) {
            return true;
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        try {
            registerWithEmailAndPassword(name, email, password)
            navigate('/explore')
            setName('');
            setEmail('');
            setPassword('');
            setPasswordConfirm('');
        } catch (error) {
            alert(error)
        }
    }

    return (
        <>
            <div className='register'>

                <div className="brand-img-register">
                    <img src={logo} alt="" />
                </div>

                <div className="register-container">
                    <div className="brand-content-item">
                        <h1>Crie sua conta</h1>
                        <p className="p-italic">Preencha seus dados</p>
                    </div>
                    <form className="register-form-container" onSubmit={handleSubmit}>
                        <Input
                            text='Nome'
                            className='input-outline-primary'
                            type='text'
                            icon={<BsFillPersonFill />}
                            value={name}
                            onchange={(e) => { setName(e.target.value) }}
                            message='Nome tem que ter mais de 3 caracteres'
                            showMessage={name && !nameValid(name)}
                        />

                        <Input
                            text='E-mail'
                            className='input-outline-primary'
                            type='text'
                            icon={<FaEnvelope />}
                            value={email}
                            onchange={(e) => { setEmail(e.target.value) }}
                            message='E-mail inválido'
                            showMessage={email && !emailValid(email)}
                        />
                        <Input
                            text='Senha'
                            className='input-outline-primary'
                            type='password'
                            icon={< RiLockPasswordFill />}
                            value={password}
                            onchange={(e) => { setPassword(e.target.value) }}
                            message='Senha inválida'
                            showMessage={password && !passwordValid(password)}
                        />
                        <Input
                            text='Confirme a senha'
                            className='input-outline-primary'
                            type='password'
                            icon={< RiLockPasswordFill />}
                            value={passwordConfirm}
                            onchange={(e) => { setPasswordConfirm(e.target.value) }}
                            message='As senhas tem que conhecidirem'
                            showMessage={passwordConfirm && !passConfValid(password, passwordConfirm)}
                        />

                        <Button
                            type='submit'
                            text='Cadastrar'
                            bg_color='primary'
                            fun={handleSubmit}
                            disable={formValidRegister()}
                        />

                        <Button
                            type='button'
                            text='Entrar com Google'
                            bg_color='google'
                            fun={signInWithGoogle}
                        />

                    </form>

                    <div className="footer">
                        <h3 className='label'>
                            Já possui uma conta?
                            <Link to={'/login'} className=' colorfull-text' >Acesse aqui</Link>
                        </h3>
                    </div>
                </div>

            </div>

            <Footer />

        </>
    )
}

export default Register;

