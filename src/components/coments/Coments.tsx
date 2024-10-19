// HOOKS AND LIBS
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdClose } from 'react-icons/md';
import { BiPencil, BiTrash } from 'react-icons/bi';
import { AiOutlineClose } from 'react-icons/ai';

// ARCHIVES FROM PROJECT
import './Coments.css';
import imgDefault from '../../assets/img-avatar.png';
import { UserAuth } from '../../services/UserContext';

/*PAGES AND COMPONENTS */
import Button from '../button/Button';
import UpdateComent from './UpdateComent';

interface IComents {
  comentId: string;
  fatherPostId: string;
  euid: string;
  name: string;
  avatar: string;
  content: string;
  imgContent: string;
}

const Coments: React.FC<IComents> = ({
  comentId,
  fatherPostId,
  euid,
  name,
  avatar,
  content,
  imgContent,
}) => {
  // estados e funções para os modais (para imagem, opção de deletar ou editar comentário)
  const [modal, setModal] = useState(false);
  const onCickImg = () => setModal(!modal);
  const [showMore, setShowMore] = useState(false);
  const onClickSM = () => setShowMore(!showMore);
  const [showMore1, setShowMore1] = useState(false);
  const onClickSM1 = () => setShowMore1(!showMore1);

  //imports e instancias
  const { uid, removeComent, posts } = UserAuth();
  const navigate = useNavigate();

  //função para deletar um comentário
  const clickDeletePost = () => {
    removeComent(comentId, fatherPostId, imgContent);
    onClickSM1();
  };

  //redireciona para o perfil do usuário selecionado
  const goToUserPage = () => {
    navigate(`/user/${euid}`);
  };

  return (
    <div className="post-coments-container" key={comentId}>
      <div className="header-post">
        <div className="header-content-user" onClick={goToUserPage}>
          <div className="header-user-avatar">
            <img
              src={avatar || imgDefault}
              alt="avatar do usuário do post"
              className="header-user-avatar-img"
            />
          </div>
          <p> {name ? name : 'Sem Nome'} </p>
        </div>

        {/* se o comentário for do usuário as opções de edição e de apagar são mostradas  */}
        {euid === uid ? (
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
              <>
                {posts
                  .filter((post) => post.id === comentId)
                  .map((item) => {
                    return (
                      <UpdateComent
                        funPopUp={onClickSM}
                        postFather={fatherPostId}
                        comentContent={item.content}
                        img={item.img_content}
                      />
                    );
                  })}
              </>
            ) : null}
          </div>
        ) : null}
      </div>

      <div className="content-post">
        <p>{content}</p>
        <div className="img-content-container">
          {imgContent ? (
            <>
              <img
                src={imgContent}
                alt="imagem do conteúdo do post"
                className="img-content cursor-pointer"
                onClick={onCickImg}
              />
              <div className={modal ? 'modal open' : 'modal'}>
                <img src={imgContent} alt="" />
                <MdClose onClick={onCickImg} />
              </div>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Coments;
