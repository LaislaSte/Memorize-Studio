// HOOKS AND LIBS 
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { BsFillArrowDownCircleFill } from 'react-icons/bs';
import { RiUserUnfollowFill, RiUserFollowFill } from 'react-icons/ri';
import { MdClose } from 'react-icons/md';

// ARCHIVES FROM PROJECT
import './Profile.css';
import avatarDefault from '../../assets/img-avatar.png';
import { UserAuth } from '../../services/UserContext';
import { onChangeFollow } from '../../utils/ArraysAndFunctions';

/*PAGES AND COMPONENTS */
import LikeButton from '../../components/likebutton/LikeButton';
import { Post } from '../../components/post/Post';
import Navbar from '../../components/navbar/Navbar';
import CreateButton from '../../components/createbutton/CreateButton';
import GoToPageModal from './GoToPageModal';

const UserDetail = () => {

    const [modalFollowing, setModalFollowing] = useState(false);
    const changeModalFollowing = () => setModalFollowing(!modalFollowing);
    const [modalFollowers, setModalFollowers] = useState(false);
    const changeModalFollowers = () => setModalFollowers(!modalFollowers);

    /*ao clicar para redirecionar para o perfil, é redirecionado para a rota /user e passado o uid como parametro da url (/user/:id), nesta url estara o componente userdetails que ira usar o hook do router-dom para usar os parametros passados, esse parametro será usado para realizar uma filtragem de todos os users que há no banco e renderiar o que corresponder com o id passado por parâmetro.*/
    //parametro da url
    const { id } = useParams();

    // imports
    const { users, posts, uid, addFollowing, removeFollowing } = UserAuth();

    const clickFollowUser = () => {
        addFollowing(id);
    }

    const clickUnfollowUser = () => {
        removeFollowing(id);
    }

    return (
        <div className='Profile'>
            <Navbar />
            <CreateButton />

            {users.filter(user => user.euid === id).map(user => {

                return (
                    <>
                        <header className='section-profile'>
                            <div className="profile-container">
                                <div className="img-background">
                                    <img src={user.eavatar ? user.eavatar : avatarDefault || avatarDefault} alt="" />
                                </div>
                            </div>

                            <div className="bio">
                                <h2>{user.ename ? user.ename : 'Sem Nome'}</h2>
                                {user.ebios ? user.ebios : 'Nada por aqui'}

                                <div className="network">
                                    <p onClick={changeModalFollowing} className='cursor-pointer'> Seguindo: {user.efollowing ? user.efollowing.length : 0} </p>
                                    {
                                        <div className={modalFollowing ? "modal open" : 'modal'}>
                                            <MdClose onClick={changeModalFollowing} />
                                            <div className="popup-container">
                                                <h1 className='follower-modal-h1'> Seguindo </h1>
                                                {user.efollowing
                                                    ? user.efollowing.map(eid => {
                                                        return (
                                                            <>
                                                                {users.filter(user => user.euid === eid).map(user => {
                                                                    return (
                                                                        <>
                                                                            <GoToPageModal
                                                                                className='popup-container'
                                                                                uid={user.euid}
                                                                                name={user.ename}
                                                                                avatar={user.eavatar}
                                                                                text='seguidores'
                                                                            />
                                                                        </>
                                                                    )

                                                                })}
                                                            </>
                                                        )
                                                    })
                                                    : null
                                                }
                                            </div>
                                        </div>
                                    }

                                    <p onClick={changeModalFollowers} className='cursor-pointer'> Seguidores: {user.efollowers ? user.efollowers.length : 0} </p>
                                    {
                                        <div className={modalFollowers ? "modal open" : 'modal'}>
                                            <MdClose onClick={changeModalFollowers} />
                                            <div className="popup-container">
                                                <h1 className='follower-modal-h1'> Seguidores </h1>
                                                {user.efollowers
                                                    ? user.efollowers.map(eid => {
                                                        return (
                                                            <>
                                                                {users.filter(user => user.euid === eid).map(user => {
                                                                    return (
                                                                        <>
                                                                            <GoToPageModal
                                                                                className='popup-container'
                                                                                uid={user.euid}
                                                                                name={user.ename}
                                                                                avatar={user.eavatar}
                                                                                text='seguidores'
                                                                            />
                                                                        </>
                                                                    )

                                                                })}
                                                            </>
                                                        )
                                                    })
                                                    : null
                                                }
                                            </div>
                                        </div>
                                    }
                                </div>
                            </div>

                            <div className="header-button-profile">
                                {onChangeFollow(user.efollowers, uid)
                                    ? (
                                        <RiUserUnfollowFill className='cursor-pointer' onClick={clickUnfollowUser} />
                                    )
                                    : (
                                        <RiUserFollowFill className='cursor-pointer' onClick={clickFollowUser} />
                                    )
                                }
                            </div>
                        </header>

                        <main className="section-posts">
                            {posts.filter(post => post.user_id === id).length > 0
                                ? (
                                    <>
                                        <h1>Postagens Realizadas <BsFillArrowDownCircleFill className='footer-icon' /> </h1>
                                        <div className="posts-container">
                                            {posts.filter(post => post.user_id === id).map((post, index) => {
                                                return (
                                                    <>
                                                        <Post
                                                            key={index}
                                                            postId={post.id}
                                                            user_id={post.user_id}
                                                            user_name={user.ename ? user.ename : 'Sem Nome'}
                                                            avatar={user.eavatar ? user.eavatar : null}
                                                            title={post.title}
                                                            category={post.category}
                                                            content={post.content}
                                                            img_content={post.img_content}
                                                            likes={post.likes}
                                                            coments={post.coments}
                                                            click_type_like={
                                                                <LikeButton
                                                                    postId={post.id}
                                                                    uid={post.user_id}
                                                                    user_name={user.ename ? user.ename : 'Sem Nome'}
                                                                    userPhoto={user.eavatar ? user.eavatar : null}
                                                                    title={post.title}
                                                                    category={post.category}
                                                                    content={post.content}
                                                                    imgContent={post.img_content}
                                                                />
                                                            }
                                                        />
                                                    </>
                                                )
                                            })}
                                        </div>
                                    </>
                                )
                                : (
                                    <h1>Nenhuma Postagem Realizadas <BsFillArrowDownCircleFill className='footer-icon' /> </h1>
                                )
                            }

                        </main>
                    </>
                )
            })}


        </div>
    )
}

export default UserDetail;

