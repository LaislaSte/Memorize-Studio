// HOOKS AND LIBS
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { AiOutlineClose } from 'react-icons/ai';

// ARCHIVES FROM PROJECT
import './Config.css';
import { nameValid, biosValid, validCBcategorys } from '../../utils/validators';
import { arrCategorys } from '../../utils/arraysHeader';
import avatarDefault from '../../assets/img-avatar.png';

/*PAGES AND COMPONENTS */
import InputImg from '../../components/inputImg/InputImg';
import Button from '../../components/button/Button';
import Input from '../../components/input/Input';
import TxtArea from '../../components/txtarea/TxtArea';
import services from '../../services';
import { useAuthContext } from '../../context/AuthContext';

const Config = () => {
  const [image, setImage] = useState(null);
  const [imgURL, setImgURL] = useState('');
  const [name_user, setUserName] = useState<string | null | undefined>('');
  const [bios_user, setBios] = useState('');
  const [category, setCategory] = useState([]);

  const { user, googleUser } = useAuthContext();

  useEffect(() => {
    setImgURL(user?.avatar ? user?.avatar : googleUser?.photoURL);
    setUserName(user?.name ? user?.name : googleUser?.displayName);
    setBios(user?.bios ? user?.bios : '');
  }, []);

  const handleCheckboxChange = (event) => {
    let newArray = [...category, event.target.value];
    if (category.includes(event.target.value)) {
      newArray = newArray.filter((cat) => cat !== event.target.value);
    }
    setCategory(newArray);
  };

  //habilita mensagem de erro ao selecionar mais de uma categoria
  const showMessage = (fav) => {
    if (fav) {
      return !validCBcategorys(fav);
    }
  };

  const updateUserProfile = (e: React.FormEvent<HTMLFormElement>) => {
    e.target.
    const file = e.target[0]?.files[0];

    if (user.id) {
      const newValues = {
        imgURL: imgURL ? imgURL : null,
        name_user: name_user,
        bios_user: bios_user,
        categorys: categorys ? categorys : category,
      };
      services.firetore.updateDocument('users', user.id, newValues);

      services.authProviders.updateProfileAuth(
        googleUser,
        imgURL ? imgURL : null,
        name_user
      );

      if (file) {
        const imageName = user?.uid + '.' + file?.name?.split('.')?.pop();
        const refPath = `profile/user:${user?.uid}/${imageName}`;
        services.storage.addObject(refPath, file);
      }
    }
  };

  return (
    <div className="Config">
      <div className="config-container">
        <Link to="/profile">
          {' '}
          <AiOutlineClose className="close-icon-container config-link" />{' '}
        </Link>

        <form
          onSubmit={(e) => updateUserProfile(e)}
          className="config-form-container"
          name="form1">
          <div className="user-img-container">
            <div className="config-user-avatar-container">
              <InputImg
                setImage={setImage}
                className="container-img-profile-preview"
                imgPreview={image?.preview || imgURL || avatarDefault}
                imgPreviewClassName="avatar"
              />
              <p>Adicionar imagem</p>
            </div>

            <Input
              type="text"
              text="Nome de Usuário"
              className="input-outline-secondary"
              value={name_user}
              onchange={(e) => {
                setUserName(e.target.value);
              }}
              message="Este nome não é válido"
              showMessage={name_user && !nameValid(name_user)}
            />
          </div>

          <div className="txt-area-container">
            <TxtArea
              text="Adicione uma descrição"
              cols="30"
              rows="5"
              value={bios_user}
              onchange={(e) => setBios(e.target.value)}
              message="Ultrapassa o limite de caracteres"
              showMessage={bios_user && !biosValid(bios_user)}
            />
          </div>

          <div className="selects-container">
            <p>Escolha suas preferências de estudo (até 5) </p>

            {categorys && (
              <>
                <p>Preferências já selecionadas: </p>
                {categorys.map((i, index) => {
                  return <p key={index}> {i} </p>;
                })}
              </>
            )}

            <div className="checked-boxes-container">
              {arrCategorys.map((item, index) => {
                return (
                  <div className="form-checked-box" key={index}>
                    <input
                      type="checkbox"
                      id={item}
                      value={item}
                      onChange={handleCheckboxChange}
                    />

                    <label htmlFor={item}>{item}</label>
                  </div>
                );
              })}
            </div>

            {showMessage(category) && (
              <p className="input-error-message"> Selecione até 5 categoria </p>
            )}
          </div>

          <Button
            text="Salvar"
            type="submit"
            bg_color="secondary save-button"
          />

          <div className="config-btns-container">
            <Link to="/changepassword">
              <Button text="Editar Senha" type="button" bg_color="primary" />
            </Link>
            <Link to="/changeemail">
              <Button text="Editar E-mail" type="button" bg_color="primary" />
            </Link>
            <Link to="/deleteaccount">
              <Button text="Excluir Contar" type="button" bg_color="primary" />
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Config;
