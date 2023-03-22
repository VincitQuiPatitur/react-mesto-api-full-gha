import {useContext, useState, useEffect} from "react";
import PopupWithForm from "./PopupWithForm";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function EditProfilePopup(props) {
    const currenUser = useContext(CurrentUserContext);
    const [name, setName] = useState('Арина Кострова');
    const [description, setDescription] = useState('Программирую и путешествую');

    useEffect(() => {
        setName(currenUser.name);
        setDescription(currenUser.about);
    }, [currenUser, props.isOpen]);

    function handleChangeName(e) {
        setName(e.target.value);
    }

    function handleChangeDescription(e) {
        setDescription(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();

        props.onUpdateUser({
            name,
            about: description,
        });
    }

    return (
        <PopupWithForm
            popupName={'edit-profile'}
            isOpen={props.isOpen}
            onClose={props.onClose}
            form={'profile-redaction'}
            formName={'redaction'}
            title={'Редактировать профиль'}
            saveButton={'save-profile-info'}
            buttonText={!props.isLoaded ? 'Сохранить' : 'Сохранение...'}
            onSubmit={handleSubmit}
        >
            <>
                <label className="popup__label">
                    <input
                        type="text"
                        value={name || ''}
                        onChange={handleChangeName}
                        placeholder="Имя пользователя"
                        required
                        id="userName"
                        name="name"
                        className="popup__input popup__input_type_user-name"
                        minLength="2"
                        maxLength="40"/>
                    <span className="popup__input-error userName-error"> </span>
                </label>
                <label className="popup__label">
                    <input
                        type="text"
                        value={description || ''}
                        onChange={handleChangeDescription}
                        placeholder="Краткое описание"
                        required
                        id="description"
                        minLength="2"
                        name="about"
                        maxLength="200"
                        className="popup__input popup__input_type_description"/>
                    <span className="popup__input-error description-error"> </span>
                </label>
            </>
        </PopupWithForm>
    )
}

export default EditProfilePopup;