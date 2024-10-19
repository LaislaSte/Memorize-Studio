// HOOKS AND LIBS 
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { RiHomeHeartLine } from 'react-icons/ri';
import { MdCircleNotifications } from 'react-icons/md';
import { AiOutlineClose } from 'react-icons/ai';

// ARCHIVES FROM PROJECT
import { UserAuth } from '../../services/UserContext';

const Modal = () => {

    // const { notification } = UserAuth();
    // const [inf, setInf] = useState(false);

    // //ao rederizar, verifica se as notificações são verdadeiras, caso for o modal para notificar aparecerá
    // useEffect(
    //     () => {
    //         if (notification) {
    //             setInf(true)
    //         }
    //         if (!notification) return;
    //     },
    //     [notification]
    // )

    return (
        <p>hi bitch</p>
        // <div className={inf ? 'modal open' : 'modal'} >
        //     <AiOutlineClose onClick={setInf(false)} />
        //     <div className="popup-container">
        //         <h1>
        //             <MdCircleNotifications />
        //             Você tem revisões para fazer
        //         </h1>

        //         <div>
        //             <p>Acesse a tela de revisões</p>
        //             <Link to='/review' className='item-link'>
        //                 <RiHomeHeartLine />
        //             </Link>
        //         </div>

        //     </div>


        // </div>
    )

}

export default Modal