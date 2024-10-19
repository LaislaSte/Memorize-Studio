import React from 'react';
import './TxtArea.css';

const TxtArea = ({
    text,
    onchange,
    value,
    cols,
    rows,
    message,
    showMessage

}) => {

    return (
        <div className="TxtArea-container">
            <div className='TxtArea-content'>
                <textarea
                    placeholder={text}
                    onChange={onchange}
                    value={value}
                    cols={cols}
                    rows={rows}
                ></textarea>
            </div>
            <div>
                {showMessage && <p className='input-error-message'> {message} </p>}
            </div >
        </div >
    )
}

export default TxtArea