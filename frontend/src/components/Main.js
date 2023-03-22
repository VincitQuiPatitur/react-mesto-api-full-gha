import {useContext} from "react";
import Card from "./Card";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function Main(props) {

    const currentUser = useContext(CurrentUserContext);

    return (
        <main className="main">
            <section className="profile">
                <div className="profile__avatar"
                     onClick={props.onEditAvatar}>
                    <img src={currentUser.avatar} alt="Фото пользователя"
                         className="profile__avatar-image"/>
                </div>
                <div className="profile__info">
                    <h1 className="profile__user-name">{currentUser.name}</h1>
                    <button className="profile__edit-button" id='profileEditBtn' type="button"
                            aria-label="Кнопка редактирования профиля"
                            onClick={props.onEditProfile}></button>
                    <p className="profile__description">{currentUser.about}</p>
                </div>
                <button className="profile__add-button" type="button" aria-label="Добавить пост"
                        onClick={props.onAddPlace}></button>
            </section>

            <section className="posts">
                <ul className="posts__container">
                    {props.cards.map(card => (
                        <Card card={card}
                              key={card._id}
                              onCardClick={props.onCardClick}
                              onCardLike={props.onCardLike}
                              onCardDelete={props.onCardDelete}
                        />
                    ))}
                </ul>
            </section>
        </main>
    );
}

export default Main;