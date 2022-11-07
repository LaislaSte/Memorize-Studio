// import React, { useState } from 'react';
import React, { useState, useContext, useEffect } from 'react';
import './Config.css';
import { nameValid, biosValid } from '../../utils/validators';
import { categorys } from '../../utils/arraysHeader';
import { CostumerContext } from '../../services/UserContext';
import avatarDefault from '../../assets/img-avatar.png';

import InputImg from '../../components/inputImg/InputImg';
import Button from '../../components/button/Button';
import Input from '../../components/input/Input';
// import TxtArea from '../../components/txtarea/TxtArea';
import CheckBox from '../../components/checkbox/CheckBox';

// imports storage
import { getDownloadURL, ref, uploadBytesResumable } from '@firebase/storage';
import { storage } from '../../services/Banco';
import { Link } from 'react-router-dom';
import { AiOutlineClose } from 'react-icons/ai';


const Config = () => {
    const [image, setImage] = useState(null);
    const [imgURL, setImgURL] = useState('');
    const [progress, setProgress] = useState(0);

    const { updateUser, user } = useContext(CostumerContext);

    const [name_user, setUserName] = useState('');
    const [bios_user, setBios] = useState('');
    const [favCategory_user, setCategorys] = useState([]);
    const [img_user, setImgUser] = useState(null);
    const [userLoged_id, setIdUser] = useState('');

    const [isItLimited, setItIsLimited] = useState(false);

    // const onChangeCB = (item) => {
    //     favCategory_user.push(item);
    //     console.log(favCategory_user)
    // if (favCategory_user > 1) {
    //     setCategorys(...favCategory_user + item);
    //     console.log(favCategory_user)
    // }
    //     let arrSelecteds = { ...favCategory_user };
    //     arrSelecteds.splice(1, 0, item);
    //     console.log(favCategory_user)

    // let couter = 0;
    // let max = 2;

    // let index = favCategory_user.findIndex(equalto);
    // const equalto = (i) => {
    //     return i === couter
    // }
    // // let arrSelecteds = { ...favCategory_user };

    // if (index !== -1) {
    //     arrSelecteds.splice(item, 1);
    // } else {
    //     arrSelecteds.push(id);
    // }

    // setCategorys(arrSelecteds);
    // }



    const handleSubmit = (e) => {
        e.preventDefault();

        const file = e.target[0]?.files[0];

        if (!file) return;

        const storageRef = ref(storage, `images/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on(
            'state_changed',
            snapshot => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setProgress(progress);
            },
            error => {
                console.error(error);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then(url => { setImgURL(url) })
            }
        )

        setIdUser(user.token);

        updateUser(userLoged_id, img_user, bios_user, name_user, favCategory_user);
    }

    return (
        <div className='Config'>

            <div className="config-container">

                <div className="close-icon-container">
                    <Link to='/profile'> <AiOutlineClose className='config-link' /> </Link>
                </div>

                <form onSubmit={handleSubmit} className="config-form-container">

                    <div className="user-img-container">

                        <div className="config-user-avatar-container">

                            <InputImg
                                setImage={setImage}
                                className='container-img-profile-preview'
                                imgPreview={image?.preview || avatarDefault}
                                imgPreviewClassName='avatar'
                            />
                            <p>Tirar foto</p>
                        </div>

                        <Input
                            type='text'
                            text='Nome de Usuário'
                            className='input-outline-secondary'
                            value={name_user}
                            onchange={(e) => { setUserName(e.target.value) }}
                            message='Este nome não é válido'
                            showMessage={name_user && !nameValid(name_user)}
                        />
                    </div>


                    <div className="txt-area-container">
                        <textarea
                            cols="30"
                            rows="5"
                            placeholder='Adicione uma descrição...'
                            className='ta-popup-container'
                            value={bios_user}
                            onChange={(e) => setBios(e.target.value)}
                        ></textarea>
                    </div>

                    <div className="selects-container">
                        <p>Escolha suas preferências de estudo (até 5) </p>

                        <div className='checked-boxes-container' >
                            {categorys.map((item, index) => {
                                return (
                                    <div className="form-checked-box" key={index}>

                                        <input type="checkbox" value={item.name} id={item.id} />

                                        <label htmlFor={item.id}>{item.name}</label>

                                    </div>
                                )
                            })}
                        </div>
                    </div>

                    <Button
                        text='Salvar'
                        type='submit'
                        bg_color='secondary save-button'
                    />

                    <div className="config-btns-container">
                        <Link to='/changepassword1'>
                            <Button text='Editar Senha' type='button' bg_color='primary' />
                        </Link>

                        <Link to='/changeemail1'>
                            <Button text='Editar E-mail' type='button' bg_color='primary' />
                        </Link>

                        <Link to='/deleteaccount'>
                            <Button text='Excluir Contar' type='button' bg_color='primary' />
                        </Link>

                    </div>


                </form >

            </div>
        </div >
    )
}

export default Config;

