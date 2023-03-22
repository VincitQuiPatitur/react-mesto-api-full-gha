import {useContext} from "react";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function Card({card, myKey, onCardClick, onCardLike, onCardDelete}) {

    const currentUser = useContext(CurrentUserContext);
    const isOwn = card.owner._id === currentUser._id;
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    const cardLikeButtonClassName = (`post__like ${isLiked && 'post__like_active'}`);

    function handleClick() {
        onCardClick(card);
    }

    function handleLikeClick() {
        onCardLike(card);
    }

    function handleDeleteClick() {
        onCardDelete(card);
    }

    return (
        <li className="post" key={myKey}>
            {isOwn && <button className="post__delete" onClick={handleDeleteClick} type="button"
                              aria-label="Удаление"></button>}
            <img src={card.link} alt={card.name} className="post__image" onClick={handleClick}/>
            <div className="post__description">
                <h2 className="post__subscription">{card.name}</h2>
                <div className="post__like-container">
                    <button className={cardLikeButtonClassName} onClick={handleLikeClick} type="button"
                            aria-label="Лайк"></button>
                    <p className="post__like-count" name="likeCount">{card.likes.length}</p>
                </div>
            </div>
        </li>
    )
}

export default Card;