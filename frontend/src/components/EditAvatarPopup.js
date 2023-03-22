import {useRef, useEffect} from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
    const imageLinkRef = useRef();

    function handleSubmit(e) {
        e.preventDefault();

        props.onUpdateAvatar({
            avatar: imageLinkRef.current.value,
        });
    }

    useEffect(() => {
        imageLinkRef.current.value = '';
    }, [props.isOpen])

    return (
        <PopupWithForm
            isOpen={props.isOpen}
            onClose={props.onClose}
            popupName={'avatar'}
            container={'popup__avatar-container'}
            form={'avatar-redaction'}
            formName={'avatar'}
            title={'Обновить аватар'}
            saveButton={'update-avatar'}
            buttonText={!props.isLoaded ? 'Сохранить' : 'Сохранение...'}
            onSubmit={handleSubmit}
        >
            <label className="popup__label">
                <input
                    type="url"
                    ref={imageLinkRef}
                    placeholder="Ссылка на аватар"
                    required
                    id="avatarLink"
                    name="link"
                    className="popup__input popup__input_type_avatar-link"/>
                <span className="popup__input-error avatarLink-error"> </span>
            </label>
        </PopupWithForm>
    );
}

export default EditAvatarPopup;