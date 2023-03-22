import React from "react";

function ImagePopup(props) {

    return (
        <div className={`popup popup_type_image ${props.isOpen ? `popup_opened` : null}`}>
            <div className="popup__image-container">
                <button className={`popup__close-button`} type="button"
                        aria-label="Кнопка закрытия окна" onClick={props.onClose}></button>
                <figure className="popup__figure-block">
                    <img src={props.card.link} alt={props.card.name}
                         className="popup__image"/>
                    <figcaption className="popup__caption">{props.card.name}</figcaption>
                </figure>
            </div>
        </div>
    )
}

export default ImagePopup;