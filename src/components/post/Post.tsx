// HOOKS AND LIBS
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AiOutlineClose } from 'react-icons/ai';
import { BiPencil, BiTrash } from 'react-icons/bi';
import { MdClose } from 'react-icons/md';
import { FaRegCommentDots } from 'react-icons/fa';
import { FiSend } from 'react-icons/fi';

// ARCHIVES FROM PROJECT
import './Post.css';
import { UserAuth } from '../../services/UserContext';
import avatarDefault from '../../assets/icons/avatarDefault.svg';

/*PAGES AND COMPONENTS */
import Button from '../button/Button';
import UpdatePost from '../popupmenu/UpdatePost';
import Coments from '../coments/Coments';
import SendComent from '../coments/SendComent';

export const Post = ({
  postId,
  content,
  user_name,
  user_id, //será usado para redirecionar a página para o perfil recebido pelo id/token
  avatar,
  category,
  title,
  likes,
  coments,
  img_content,
  click_type_review,
  click_type_like,
  internalUser = false,
}) => {
  // states e functions para os popups
  const [modal, setModal] = useState(false);
  const onCickImg = () => setModal(!modal);
  const [showMore, setShowMore] = useState(false);
  const onClickSM = () => setShowMore(!showMore);
  const [showMore1, setShowMore1] = useState(false);
  const onClickSM1 = () => setShowMore1(!showMore1);
  const [comentsModal, setComentsModal] = useState(false);
  const showComents = () => setComentsModal(!comentsModal);

  const [sendComent, setSendComent] = useState(false);
  const callSendComent = () => setSendComent(!sendComent);

  // imports
  const { deletePost, posts, uid } = UserAuth();
  const navigate = useNavigate();

  // functions
  //função que chama o deletar post do context
  const clickDeletePost = () => {
    deletePost(postId, img_content);
    onClickSM1();
  };

  const goToUserPage = () => {
    navigate(`/user/${user_id}`);
  };

  return (
    <div className={comentsModal ? 'coment-modal' : ''}>
      {comentsModal ? (
        <MdClose onClick={showComents} className="coment-modal-icon" />
      ) : null}

      <div className="post-container">
        <div className="header-post">
          <div className="header-content-user" onClick={goToUserPage}>
            <div className="header-user-avatar">
              <img
                src={avatar || avatarDefault}
                alt="avatar do usuário do post"
                className="header-user-avatar-img"
              />
            </div>
            <p> {user_name ? user_name : 'Sem Nome'} </p>
          </div>

          {internalUser ? (
            <div className="header-icons">
              <BiTrash onClick={onClickSM1} className="cursor-pointer" />
              <div className={showMore1 ? 'modal open' : 'modal'}>
                <AiOutlineClose onClick={onClickSM1} />
                <div className="popup-container">
                  <h1>Certeza que deseja excluir?</h1>
                  <div className="btns-popup">
                    <Button
                      text="Sim"
                      fun={clickDeletePost}
                      bg_color="secondary"
                      type="button"
                    />
                    <Button
                      text="Não"
                      fun={onClickSM1}
                      bg_color="secondary"
                      type="button"
                    />
                  </div>
                </div>
              </div>

              <BiPencil onClick={onClickSM} className="cursor-pointer" />
              {showMore ? (
                <UpdatePost
                  funPopUp={onClickSM}
                  postId={postId}
                  utitle={title}
                  ucontent={content}
                  uimgURL={img_content}
                  ucategory={category}
                />
              ) : null}
            </div>
          ) : null}
        </div>

        <div className="content-post">
          <h2>
            {title} - {category}
          </h2>

          <p> {content} </p>
          <div className="img-content-container">
            {img_content ? (
              <>
                <img
                  src={img_content}
                  alt="imagem do conteúdo do post"
                  className="img-content cursor-pointer"
                  onClick={onCickImg}
                />
                <div className={modal ? 'modal open' : 'modal'}>
                  <img src={img_content} alt="" />
                  <MdClose onClick={onCickImg} />
                </div>
              </>
            ) : null}
          </div>
        </div>

        <div className="footer-post">
          <div className="review-like-container">
            <>
              {sendComent ? (
                <SendComent postFather={postId} funPopUp={callSendComent} />
              ) : null}
              {comentsModal ? (
                <FiSend
                  className="post-coment-container-icon"
                  onClick={callSendComent}
                />
              ) : (
                <FaRegCommentDots
                  className="post-coment-container-icon"
                  onClick={showComents}
                />
              )}
            </>
            {coments}
          </div>

          <div className="review-like-container">
            {click_type_review}

            <>
              {click_type_like}
              {likes}
            </>
          </div>
        </div>
      </div>

      {comentsModal ? (
        <div className="coments-container">
          {posts.filter((post) => post.postFather === postId) ? (
            <>
              {posts
                .filter(
                  (post) => post.postFather === postId && post.user_id === uid
                )
                .map((item) => {
                  return (
                    <>
                      {item ? (
                        <Coments
                          name={item.user_name}
                          avatar={item.avatar}
                          comentId={item.id}
                          euid={item.user_id}
                          content={item.content}
                          imgContent={item.img_content}
                          fatherPostId={item.postFather}
                        />
                      ) : null}
                    </>
                  );
                })}

              {posts
                .filter(
                  (post) => post.postFather === postId && post.user_id !== uid
                )
                .map((item) => {
                  return (
                    <>
                      <Coments
                        name={item.user_name}
                        avatar={item.avatar}
                        comentId={item.id}
                        euid={item.user_id}
                        content={item.content}
                        imgContent={item.img_content}
                        fatherPostId={item.postFather}
                      />
                    </>
                  );
                })}
            </>
          ) : (
            <p> Sem comentários </p>
          )}
        </div>
      ) : null}
    </div>
  );
};
