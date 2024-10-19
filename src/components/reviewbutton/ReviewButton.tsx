//HOOKS AND LIBS
import React, { useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';

//ARCHIVES FROM PROJECT
import './ReviewButton.css';
import { dateChangeReview } from '../../utils/changeDate';
import { UserAuth } from '../../services/UserContext';

//COMPONENTS
import Button from '../button/Button';

const ReviewButton = ({
    reviewId,
    currentCounter
}) => {

    //usestate
    const [popUp, setPopUp] = useState(false);
    const showPopUp = () => setPopUp(!popUp);

    //imports
    const { updateReview } = UserAuth();

    //functions
    //função para atualizar data de revisão e contador
    const alreadyReviewed = () => {
        let stillReviwing = true;

        //manda para a função de criar nova data o contador e se o user optou por continuar revisando
        const result = dateChangeReview(currentCounter, stillReviwing);
        //atualiza o documento com os novos valores dos parametros data de review e contador
        updateReview(reviewId, result.date, result.count);
        showPopUp()

        stillReviwing = false;
    }

    return (
        <div className='post-review-container'>
            <Button
                text='Checar'
                fun={showPopUp}
                bg_color='primary review-btn'
            />

            <div className={popUp ? 'modal open' : 'modal'}>
                <div className="popup-container">
                    <div className='icon-container close-popup'>
                        <AiOutlineClose onClick={showPopUp} />
                    </div>
                    <div className="popup-content">
                        <h1>Já revisou este post?</h1>
                        <div className="btns-popup">
                            <Button type='button' bg_color='secondary' fun={alreadyReviewed} text='sim' />
                            <Button type='button' bg_color='secondary' fun={showPopUp} text='não' />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ReviewButton