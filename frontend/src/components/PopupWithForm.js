import React from "react";

function PopupWithForm(props) {
    return (
        <div className={`popup popup_type_${props.popupName} ${props.isOpen ? `popup_opened` : null}`}>
            <div className={`popup__container ${props.container}`}>
                <button className={`popup__close-button`} type="button"
                        aria-label="Кнопка закрытия окна" onClick={props.onClose}></button>
                <form className={`popup__form popup__form_type_${props.form}`} name={props.formName}
                      onSubmit={props.onSubmit}>
                    <h3 className={`popup__title ${props.classTitle}`}>{props.title}</h3>
                    <fieldset className="popup__fieldset">
                        {props.children}
                        <button className={`popup__save-button popup__save-button_type_${props.saveButton}`}
                                type="submit">{props.buttonText}
                        </button>
                    </fieldset>
                </form>
            </div>
        </div>
    )
}

export default PopupWithForm;