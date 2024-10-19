// HOOKS AND LIBS
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEnvelope } from 'react-icons/fa';
import { RiLockPasswordFill } from 'react-icons/ri';

// ARCHIVES FROM PROJECT
import './Login.css';
import { emailValid, passwordValid } from '../../utils/validators';
import { UserAuth } from '../../services/UserContext';

/*PAGES AND COMPONENTS */
import Input from '../../components/input/Input';
import Button from '../../components/button/Button';
import Footer from '../../components/footer/Footer';

import Loader from '../../components/loader/Loader';
import { useAuthState } from 'react-firebase-hooks/auth';

import services from '../../services';
import config from '../../config';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  //   const { logInWithEmailAndPassword, signInWithGoogle } = UserAuth();
  const [user, loading, error] = useAuthState(config.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) {
      return;
    }
    if (user) navigate('/explore');
  }, [user, loading]);

  const formValidLogin = () => {
    return emailValid(email) && passwordValid(password);
  };

  const handleClick = () => {
    // logInWithEmailAndPassword(email, password);
    services.authProviders.logInWithEmailAndPassword(email, password);
    navigate('/explore');
  };

  return (
    <div className="login">
      <section className="section-brand" id="public-header">
        <div className="brand-content">
          <h2>Faça seu login para começar ou se cadastre.</h2>
          <div className="brand-content-item">
            <h1>Acesse</h1>
            <p className="p-italic">Insira seus dados</p>
          </div>
          <form className="login-form-container">
            <Input
              text="E-mail"
              className="input-outline-secondary text-dark"
              type="text"
              icon={<FaEnvelope />}
              value={email}
              onchange={(e) => {
                setEmail(e.target.value);
              }}
              message="E-mail inválido"
              showMessage={email && !emailValid(email)}
            />
            <Input
              text="Senha"
              className="input-outline-secondary"
              type="password"
              icon={<RiLockPasswordFill />}
              value={password}
              onchange={(e) => {
                setPassword(e.target.value);
              }}
              message="Senha inválida"
              showMessage={password && !passwordValid(password)}
            />

            <Button
              type="button"
              text="Entrar"
              bg_color="secondary"
              fun={handleClick}
              disable={!formValidLogin()}
            />

            <Button
              type="button"
              text="Entrar com Google"
              bg_color="google"
              fun={services.authProviders.signInWithGoogle()}
            />
          </form>

          <div className="footer">
            <h3 className="label">
              Não possui uma conta?
              <Link to={'/register'} className=" colorfull-text">
                Cadastre-se
              </Link>
            </h3>
            <h3 className="label">
              Esqueceu sua senha?
              <Link to={'/changepasswordlogout'} className=" colorfull-text">
                Clique aqui
              </Link>
            </h3>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Login;
