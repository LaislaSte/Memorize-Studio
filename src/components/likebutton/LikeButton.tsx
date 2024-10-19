//HOOKS AND LIBS
import { useState } from 'react';
import { AiOutlineClose, AiFillHeart, AiOutlineHeart } from 'react-icons/ai';

//ARCHIVES FROM PROJECT
import './LikeButton.css';
import { onChangeHeart } from '../../utils/ArraysAndFunctions';
import { UserAuth } from '../../services/UserContext';

// COMPONENTS
import Button from '../button/Button';

const LikeButton = ({
  postId,
  reviewId,
  uid,
  userPhoto,
  imgContent,
  user_name,
  title,
  content,
  category,
}) => {
  const [popUp, setPopUp] = useState(false);
  const showPopUp = () => setPopUp(!popUp);

  // imports
  const {
    registerReview,
    allReviews,
    removeReview,
    addLikePost,
    removeLikePost,
  } = UserAuth();

  //chama a função do contexto para cadastrar uma revisão com as informações passadas, adiciona um like ao post em questão e fecha o popup
  const addReview = () => {
    registerReview(
      postId,
      uid,
      userPhoto,
      imgContent,
      user_name,
      title,
      content,
      category
    );
    addLikePost(postId);
    showPopUp();
  };

  //função para apagar esta revisão, remover um like do post e fechar o popup
  const delteReview = () => {
    removeReview(postId, reviewId);
    removeLikePost(postId);
    showPopUp();
  };

  return (
    <>
      {onChangeHeart(allReviews, postId) ? (
        <AiFillHeart className="post-like-container-icon" onClick={showPopUp} />
      ) : (
        <AiOutlineHeart
          className="post-like-container-icon"
          onClick={showPopUp}
        />
      )}

      <div className={popUp ? 'modal open' : 'modal'}>
        <AiOutlineClose onClick={showPopUp} />
        <div className="popup-container">
          {onChangeHeart(allReviews, postId) ? (
            <>
              <h1>Deseja remover este post das suas revisões?</h1>
              <div className="btns-popup">
                <Button
                  type="button"
                  bg_color="secondary"
                  fun={delteReview}
                  text="sim"
                />
                <Button
                  type="button"
                  bg_color="secondary"
                  fun={showPopUp}
                  text="não"
                />
              </div>
            </>
          ) : (
            <>
              <h1>Deseja registrar este post nas suas revisões?</h1>
              <div className="btns-popup">
                <Button
                  type="button"
                  bg_color="secondary"
                  fun={addReview}
                  text="sim"
                />
                <Button
                  type="button"
                  bg_color="secondary"
                  fun={showPopUp}
                  text="não"
                />
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default LikeButton;
