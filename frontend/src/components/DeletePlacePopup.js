import React from "react";
import PopupWithForm from "./PopupWithForm";

function DeletePlacePopup(props) {
    function handleSubmit(e) {
        e.preventDefault();

        props.onCardDeletion(props.card);
    }

    return (
        <PopupWithForm
            popupName={'deletion'}
            isOpen={props.isOpen}
            onClose={props.onClose}
            container={'popup__small-container'}
            classTitle={'popup__confirmation-title'}
            title={'Вы уверены?'}
            saveButton={'confirmation-button'}
            buttonText={'Да'}
            onSubmit={handleSubmit}
        />
    );
}

export default DeletePlacePopup;