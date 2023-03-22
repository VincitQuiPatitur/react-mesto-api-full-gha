import {useState, useEffect} from 'react';
import '../index.css';
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import ImagePopup from "./ImagePopup";
import {api} from '../utils/api';
import {CurrentUserContext} from "../contexts/CurrentUserContext";
import AddPlacePopup from "./AddPlacePopup";
import DeletePlacePopup from "./DeletePlacePopup";

function App() {
    const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
    const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
    const [isDeleteImagePopupOpen, setDeleteImagePopupOpen] = useState(false);
    const [isImagePopupOpen, setImagePopupOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState({});
    const [currentUser, setCurrentUser] = useState({});
    const [cards, setCards] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [selectedCardForDeletion, setSelectedCardForDeletion] = useState({});

    useEffect(() => {
        api.getUserInfo()
            .then(result => setCurrentUser(result))
            .catch(error => console.log(error));

        api.getInitialCards()
            .then(cards => setCards([...cards]))
            .catch(error => console.log(error));
    }, []);

    function handleEditAvatarClick() {
        setEditAvatarPopupOpen(true);
    }

    function handleEditProfileClick() {
        setEditProfilePopupOpen(true);
    }

    function handleAddPlaceClick() {
        setAddPlacePopupOpen(true);
    }

    function handleDeletePlaceClick(card) {
        setSelectedCardForDeletion(card);
        setDeleteImagePopupOpen(true);
    }

    function handleCardClick(card) {
        setSelectedCard(card);
        setImagePopupOpen(true);
    }

    function handleCardLike(card) {
        const isLiked = card.likes.some(i => i._id === currentUser._id);

        api.changeLikeCardStatus(card._id, isLiked)
            .then((newCard) => {
                setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
            })
            .catch(error => console.log(error))
    }

    function handleCardDelete(card) {
        api.deleteCard(card)
            .then(() => {
                setCards((state) => state.filter((c) => c._id !== card._id));
                closeAllPopups();
            })
            .catch(error => console.log(error));
    }

    function handleUpdateUser(userInfo) {
        setIsLoaded(true);
        api.setUserInfo(userInfo)
            .then((result) => {
                setCurrentUser(result);
                closeAllPopups();
            })
            .catch(error => console.log(error))
            .finally(() => setIsLoaded(false));
    }

    function handleUpdateAvatar(userInfo) {
        setIsLoaded(true);
        api.setUserAvatar(userInfo.avatar)
            .then((result) => {
                setCurrentUser(result);
                closeAllPopups();
            })
            .catch(error => console.log(error))
            .finally(() => setIsLoaded(false));
    }

    function handleAddPlaceSubmit(card) {
        setIsLoaded(true);
        api.addNewCard(card)
            .then((newCard) => {
                setCards([newCard, ...cards]);
                closeAllPopups();
            })
            .catch(error => console.log(error))
            .finally(() => setIsLoaded(false));
    }

    function closeAllPopups() {
        setEditProfilePopupOpen(false);
        setAddPlacePopupOpen(false);
        setEditAvatarPopupOpen(false);
        setDeleteImagePopupOpen(false);
        setImagePopupOpen(false);
        setSelectedCard({});
        setSelectedCardForDeletion({});
    }

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className="page">
                <div className="page__content">
                    <Header/>
                    <Main
                        onEditProfile={handleEditProfileClick}
                        onAddPlace={handleAddPlaceClick}
                        onEditAvatar={handleEditAvatarClick}
                        onCardClick={handleCardClick}
                        onCardLike={handleCardLike}
                        onCardDelete={handleDeletePlaceClick /*handleCardDelete*/}
                        cards={cards}
                    />
                    <Footer/>
                    <EditProfilePopup
                        isOpen={isEditProfilePopupOpen}
                        onClose={closeAllPopups}
                        onUpdateUser={handleUpdateUser}
                        isLoaded={isLoaded}
                    />
                    <AddPlacePopup
                        isOpen={isAddPlacePopupOpen}
                        onClose={closeAllPopups}
                        onAddNewCard={handleAddPlaceSubmit}
                        isLoaded={isLoaded}
                    />

                    <DeletePlacePopup
                        isOpen={isDeleteImagePopupOpen}
                        onClose={closeAllPopups}
                        onCardDeletion={handleCardDelete}
                        card={selectedCardForDeletion}
                    />

                    <EditAvatarPopup
                        isOpen={isEditAvatarPopupOpen}
                        onClose={closeAllPopups}
                        onUpdateAvatar={handleUpdateAvatar}
                        isLoaded={isLoaded}
                    />
                    <ImagePopup
                        card={selectedCard}
                        isOpen={isImagePopupOpen}
                        onClose={closeAllPopups}
                    />
                </div>
            </div>
        </CurrentUserContext.Provider>
    );
}

export default App;
