// HOOKS AND LIBS 
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { BsGearFill, BsFillArrowDownCircleFill } from 'react-icons/bs';
import { MdClose } from 'react-icons/md';

// ARCHIVES FROM PROJECT
import './Profile.css';
import avatarDefault from '../../assets/img-avatar.png';
import { auth } from '../../services/Banco';
import { UserAuth } from '../../services/UserContext';

/*PAGES AND COMPONENTS */
import LikeButton from '../../components/likebutton/LikeButton';
import { Post } from '../../components/post/Post';
import Navbar from '../../components/navbar/Navbar';
import CreateButton from '../../components/createbutton/CreateButton';
import GoToPageModal from './GoToPageModal';
import Modal from '../../components/modal/Modal';

const Profile = () => {
    const [modalFollowing, setModalFollowing] = useState(false);
    const changeModalFollowing = () => setModalFollowing(!modalFollowing);
    const [modalFollowers, setModalFollowers] = useState(false);
    const changeModalFollowers = () => setModalFollowers(!modalFollowers);

    // imports
    const [user, loading, error] = useAuthState(auth);
    const { bios, imgUrl, name, uposts, getUserId, following, followers, getReviews, users } = UserAuth();

    // useeffect
    useEffect(() => {
        const callUser = () => {
            getUserId();
            getReviews();
        }
        callUser()

    }, []);

    return (
        <div className='Profile'>
            <Navbar />
            <CreateButton />
            <Modal />

            <header className='section-profile'>
                <div className="profile-container">
                    <div className="img-background">
                        <img src={imgUrl ? imgUrl : avatarDefault || user.photoURL ? user.photoURL : avatarDefault} alt="imagem de usuário" />
                    </div>
                </div>
                <div className="bio">
                    <h2>{name || user.displayName || 'sem Nome'}</h2>
                    {bios ? bios : 'Nada por aqui'}

                    <div className="network">
                        <p onClick={changeModalFollowing} className='cursor-pointer'> Seguindo: {following ? following.length : 0} </p>
                        {
                            <div className={modalFollowing ? "modal open" : 'modal'}>
                                <MdClose onClick={changeModalFollowing} />
                                <div className="popup-container">
                                    <h1 className='follower-modal-h1'> Seguindo </h1>
                                    {following
                                        ? following.map(id => {
                                            return (
                                                <>
                                                    {users.filter(user => user.euid === id).map(user => {
                                                        return (
                                                            <GoToPageModal
                                                                uid={user.euid}
                                                                name={user.ename}
                                                                avatar={user.eavatar}
                                                            />
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

                        <p onClick={changeModalFollowers} className='cursor-pointer'> Seguidores: {followers ? followers.length : 0} </p>
                        {
                            <div className={modalFollowers ? "modal open" : 'modal'}>
                                <MdClose onClick={changeModalFollowers} />
                                <div className="popup-container">
                                    <h1 className='follower-modal-h1'> Seguidores </h1>
                                    {followers
                                        ? followers.map(id => {
                                            return (
                                                <>
                                                    {users.filter(user => user.euid === id).map(user => {
                                                        return (
                                                            <GoToPageModal
                                                                uid={user.euid}
                                                                name={user.ename}
                                                                avatar={user.eavatar}
                                                            />
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
                    <Link to='/config'>
                        <BsGearFill />
                    </Link>
                </div>
            </header>

            <main className="section-posts">
                {uposts.length > 0
                    ? (
                        <>
                            <h1>Postagens Realizadas <BsFillArrowDownCircleFill className='footer-icon' /> </h1>
                            <div className="posts-container">
                                {uposts.map((item, index) => {
                                    return (
                                        <Post
                                            key={index}
                                            postId={item.id}
                                            internalUser={true}
                                            user_id={user.uid}
                                            user_name={name ? name : user.displayName}
                                            avatar={imgUrl}
                                            title={item.title}
                                            category={item.category}
                                            content={item.content}
                                            img_content={item.img_content}
                                            likes={item.likes}
                                            coments={item.coments}
                                            click_type_like={
                                                <LikeButton
                                                    postId={item.id}
                                                    uid={user.uid}
                                                    userPhoto={imgUrl}
                                                    imgContent={item.img_content}
                                                    user_name={name || user.displayName}
                                                    title={item.title}
                                                    content={item.content}
                                                    category={item.category}
                                                />
                                            }
                                        />
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
        </div>
    )
}

export default Profile;

