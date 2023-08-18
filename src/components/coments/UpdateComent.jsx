// HOOKS AND LIBS 
import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { AiOutlineClose } from 'react-icons/ai';

// ARCHIVES FROM PROJECT
import { postContentValid } from '../../utils/validators';
import { auth, storage } from '../../services/Banco';
import { UserAuth } from '../../services/UserContext';
import avatarDefault from '../../assets/img-avatar.png';
import imageDefault from '../../assets/img-camera.png';

/*PAGES AND COMPONENTS */
import Button from '../button/Button';
import InputImg from '../inputImg/InputImg';
import TxtArea from '../txtarea/TxtArea';
import { useEffect } from 'react';

const UpdateComent = ({
    postFather,
    comentContent,
    img,
    funPopUp
}) => {

    // states 
    const [content, setContent] = useState('');
    const [image, setImage] = useState(null);
    const [imgURL, setImgURL] = useState('');

    // imports
    const [user, loading, error] = useAuthState(auth);
    const { uid, updateComent, imgUrl } = UserAuth();

    //ao renderizar componente, set os campos com os valores do comentário já criado para visualizar o o que já está cadastrado
    useEffect(
        () => {
            setContent(comentContent);
            setImgURL(img);
        },
        []
    )

    //para limpar os campos quando cadastrar e fechar o popup
    const cleanForm = () => {
        setContent('');
        setImage(null);
        funPopUp();
    }

    //envia dados do formulário para atualizar um comentario.
    const sendPost = async (e) => {
        e.preventDefault();
        const file = e.target[1]?.files[0];
        console.log(file);
        //se não houver um file, cadastra uma url já existente ou null
        if (!file) {
            //cadastrado informações do post
            updateComent(postFather, content, imgURL ? imgURL : null);
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
                        updateComent(postFather, content, url);
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
                    <AiOutlineClose className='close-icon' onClick={funPopUp} />
                </div>

                <form onSubmit={sendPost} className="form-create-post">

                    <div className="user-img-container">
                        <img src={user?.photoURL || imgUrl || avatarDefault} alt="" />
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

                    <div className="input-img-container">
                        <div>
                            <InputImg
                                setImage={setImage}
                                className='container-img-upload-preview cursor-pointer'
                                imgPreview={image?.preview || img || imageDefault || imgURL}
                                imgPreviewClassName='upload-preview'
                            />
                        </div>

                        <div className="btns-popup">
                            <Button
                                text='Apenas postar'
                                type='submit'
                                bg_color='secondary'
                                disable={!postContentValid(content)}
                            />
                        </div>
                    </div>


                </form>

            </div>

        </div>
    )
}

export default UpdateComent