// HOOKS AND LIBS
import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { FaBrain } from 'react-icons/fa';
import { BiNetworkChart } from 'react-icons/bi';
import { MdPermMedia } from 'react-icons/md';
import { BsFillArrowDownCircleFill } from 'react-icons/bs';

// ARCHIVES FROM PROJECT
import './Public.css';
import CurlyHairWoman from '../../assets/woman-with-curly-hair-and-yellow-shirt.jpg';
import WomanStraighHair from '../../assets/woman-with-yellow-shirt.jpg';
import WhiteGuyStuduing from '../../assets/white-guy-studing.jpg';
import brainMen from '../../assets/icons/brain-2029363.svg';

import Navbar from '../../components/navbar/Navbar';

import Button from '../../components/button/Button';
import Footer from '../../components/footer/Footer';

import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../services/Banco';
import Loader from '../../components/loader/Loader';

const Public = () => {
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) {
      return;
    }
    if (user) navigate('/explore');
  }, [user, loading]);

  return (
    <div className=" public-container">
      <Navbar />

      <section className="first-section" id="first-section">
        <div className="first-s-header-container">
          <div className="first-s-header">
            <p>Bem Vindos(as) ao</p>
            <h1>MemorizeStudio</h1>
          </div>
          <div className="first-s-paragraph">
            <p>
              Plataforma de criação e memorização de conteúdos didáticos, nossa
              missão é ajudar estudantes do Brasil, independente de nível de
              escolaridade, a aprender e absorver melhor informações estudantis
              de uma maneira mais elaborada, levando em consideração métodos
              pisicológicos de aprendizagem e memorização.
            </p>
          </div>
          <div className="first-s-header2">
            <h1>Faça</h1>

            <Link to="/login" className="link">
              <h1>Login</h1>
            </Link>

            <h1>ou</h1>
            <Link to="register" className="link">
              <h1>Cadastre-se</h1>
            </Link>
          </div>
        </div>

        <div className="first-s-img">
          <img src={brainMen} alt="" />
        </div>

        <Link to="#public-header" className="first-s-header3">
          <h1>
            Memorizar nunca foi tão fácil
            <BsFillArrowDownCircleFill className="footer-icon" />
          </h1>
        </Link>
      </section>

      <section className="second-section section-info" id="section-info">
        <h1 className="section-header">
          Memorize seus conteúdos com os seguintes métodos
        </h1>

        <div className="section-info-content">
          <div className="my-card">
            <h2>Repetição Espaçada</h2>
            <p className="p-italic">
              Consiste em repetir assuntos já aprendidos, ou seja, fazer
              revisões com uma determinada frequência até consolida-lo no seu
              cérebro.
            </p>
            <h1>
              <FaBrain className="my-icon" />
            </h1>
          </div>

          <div className="my-card">
            <h2>Rede Didática</h2>
            <p className="p-italic">
              Será sua rede social para estudos, onde você faz o menor esforço
              possível, dê uma chance e verá que estudar também pode ser
              divertido.
            </p>
            <h1>
              <BiNetworkChart className="my-icon" />
            </h1>
          </div>
          <div className="my-card">
            <h2>Post Resumidos e Interativos</h2>
            <p className="p-italic">
              Conte com uma variedade de textos, imagens, vídeos e muito mais.
            </p>
            <h1>
              <MdPermMedia className="my-icon" />
            </h1>
          </div>
        </div>
      </section>

      <section className="section third-section">
        <h1 className="section-header">
          Rede social própria para estudos e recuperação de conteúdos básicos
        </h1>

        <div className="section-info-content">
          <div className="my-card my-card-img">
            <img src={CurlyHairWoman} alt="card" className="card-img" />

            <div className="my-card-content">
              <h2>Explorar diversos conteúdos feitos por outros alunos</h2>
              <Link to="about-us">
                <Button text="Verificar" bg_color="primary" />
              </Link>
            </div>
          </div>
          <div className="my-card my-card-img">
            <img src={WomanStraighHair} alt="card" className="card-img" />
            <div className="my-card-content">
              <h2>Criar seus próprio posts para memorizar</h2>
              <Link to="about-us">
                <Button text="Verificar" bg_color="primary" />
              </Link>
            </div>
          </div>
          <div className="my-card my-card-img">
            <img src={WhiteGuyStuduing} alt="card" className="card-img" />

            <div className="my-card-content">
              <h2>
                Crie, e manipule uma rotina de estudos mais eficiente e menos
                cansativa
              </h2>
              <Link to="about-us">
                <Button text="Verificar" bg_color="primary" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Public;
