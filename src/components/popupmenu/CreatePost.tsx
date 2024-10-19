// HOOKS AND LIBS 
import React, { useState } from 'react';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { useAuthState } from 'react-firebase-hooks/auth';
import { AiOutlineClose } from 'react-icons/ai';

// ARCHIVES FROM PROJECT
import './CreatePost.css';
import imageDefault from '../../assets/icons/uploadDefault.svg'
import avatarDefault from '../../assets/icons/avatarDefault.svg'
import { postContentValid, titleValid, validCBpost } from '../../utils/validators';
import { UserAuth } from '../../services/UserContext';
import { auth, storage } from '../../services/Banco';
import { arrCategorys } from '../../utils/arraysHeader';

/*PAGES AND COMPONENTS */
import Button from '../button/Button';
import Input from '../input/Input';
import InputImg from '../inputImg/InputImg';
import TxtArea from '../txtarea/TxtArea';

const CreatePost = ({ funPopUp }) => {
    // states 
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [image, setImage] = useState(null);
    const [isChecked, setIsChecked] = useState(false);
    const [favCategory_user, setFavCategory_user] = useState([]);

    // imports
    const [user, loading, error] = useAuthState(auth);
    const { imgUrl, uid, registerPost, categorys } = UserAuth();

    // functions 

    //adiciona os itens seleionados pelo usuario com checkbox em um estado
    const handleOnChangeCB = (event) => {
        setIsChecked(!isChecked);
        let newArray = [...favCategory_user, event.target.value];
        if (favCategory_user.includes(event.target.value)) {
            newArray = newArray.filter(cat => cat !== event.target.value);
        }
        setFavCategory_user(newArray);
    };

    //para limpar os campos quando cadastrar e fechar o popup
    const cleanForm = () => {
        setContent('');
        setTitle('');
        setFavCategory_user([]);
        setImage(null);
        funPopUp()
    }

    //habilita mensagem de erro ao selecionar mais de uma categoria
    const showMessage = (fav) => {
        if (fav) {
            return !validCBpost(fav)
        }
    }

    //verifica se todos os campos foram preenchidos corretamente para habilitar o botão
    const formValidCreatePost = () => {
        return postContentValid(content) && titleValid(title) && validCBpost(favCategory_user);
    }

    //envia dados do formulário para cadastrar um post e uma revisão desse post
    const sendPost = async (e) => {
        e.preventDefault();
        const file = e.target[5]?.files[0];
        //se não houver um file, cadastra imagem como null
        if (!file) {
            //cadastrado informações do post
            registerPost(title, content, favCategory_user, null);
            cleanForm();
        }

        const imageName = uid + '.' + file?.name?.split('.')?.pop();
        const postRef = ref(storage, `postContent/user:${uid}/${imageName}`);
        //se existir um file cadastre no storage e depois cadastre a url dessa imagem
        if (file) {
            const uploadTask = uploadBytesResumable(postRef, file);
            uploadTask.on(
                'state_changed',
                snapshot => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    // setProgress(progress);
                },
                error => {
                    console.error(error);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then(url => {
                        registerPost(title, content, favCategory_user, url);
                        cleanForm();
                    })
                }
            )
        }

    }

    return (
        <div className='Create'>

            <div className="create-post-container">
                <div className="close-icon-container">
                    <AiOutlineClose className='close-icon' onClick={cleanForm} />
                </div>

                <form onSubmit={sendPost} className="form-create-post">

                    <div className="user-img-container">
                        <img src={user?.photoURL || imgUrl || avatarDefault} alt="" />

                        <Input
                            text='Título'
                            className='input-outline-secondary text-dark'
                            type='text'
                            value={title}
                            onchange={(e) => { setTitle(e.target.value) }}
                            message='Ultrapassa o limite de caracteres'
                            showMessage={title && !titleValid(title)}
                        />
                    </div>

                    <TxtArea
                        text='Adicione uma descrição'
                        cols='30'
                        rows='5'
                        value={content}
                        onchange={(e) => setContent(e.target.value)}
                        message='Ultrapassa o limite de caracteres'
                        showMessage={content && !postContentValid(content)}
                    />

                    <p>Adicione uma categoria</p>

                    <div className='checked-boxes-container' >
                        {categorys.lenght > 0
                            ? (
                                <>
                                    {categorys.map((item, index) => {
                                        return (
                                            <div className="form-checked-box" key={index}>
                                                <input
                                                    type="checkbox"
                                                    value={item}
                                                    id={item}
                                                    onChange={handleOnChangeCB}
                                                />
                                                <label htmlFor={item}>{item}</label>
                                            </div>
                                        )
                                    })}
                                </>
                            )
                            : (
                                <>
                                    {arrCategorys.map((item, index) => {
                                        return (
                                            <div className="form-checked-box" key={index}>
                                                <input
                                                    type="checkbox"
                                                    value={item}
                                                    id={item}
                                                    onChange={handleOnChangeCB}
                                                />
                                                <label htmlFor={item}>{item}</label>
                                            </div>
                                        )
                                    })}
                                </>
                            )
                        }

                        {showMessage(favCategory_user) && <p className='input-error-message'> Selecione apenas 1 categoria </p>}
                    </div>

                    <div className="input-img-container">
                        <div>
                            <InputImg
                                setImage={setImage}
                                className='container-img-upload-preview cursor-pointer'
                                imgPreview={image?.preview || imageDefault}
                                imgPreviewClassName='upload-preview'
                            />
                        </div>

                        <div className="btns-popup">
                            <Button
                                text='Apenas postar'
                                type='submit'
                                bg_color='secondary'
                                disable={!formValidCreatePost()}
                            />
                        </div>
                    </div>


                </form>

            </div>

        </div>
    )
}

export default CreatePost