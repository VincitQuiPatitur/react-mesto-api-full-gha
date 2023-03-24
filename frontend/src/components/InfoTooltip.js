import React from "react";
import success from '../images/information-popup-success.svg';
import fail from '../images/information-popup-fail.svg';

function InfoTooltip(props) {
    return (
        <div className={`popup ${props.isOpen ? `popup_opened` : null}`}>
            <div className='popup__container popup__infoTooltip-container'>
                <button className={`popup__close-button`} type="button"
                        aria-label="Кнопка закрытия окна" onClick={props.onClose}></button>
                {props.isRegisterOk && (
                    <>
                        <img src={success} alt="Чёрный круг с галочкой" className="popup__icon"/>
                        <p className="popup__info">Вы успешно зарегистрировались!</p>
                    </>
                )}
                {!props.isRegisterOk && (
                    <>
                        <img src={fail} alt="Красный круг с крестиком" className="popup__icon"/>
                        <p className="popup__info">Что-то пошло не&nbsp;так! Попробуйте ещё раз.</p>
                    </>
                )}
            </div>
        </div>
    );
}

export default InfoTooltip;