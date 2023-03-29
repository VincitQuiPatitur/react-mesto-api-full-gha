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
import {Routes, Route, Navigate, useNavigate} from "react-router-dom";
import BurgerMenu from "./BurgerMenu";
import ProtectedRoute from "./ProtectedRoute";
import Login from "./Login";
import Register from "./Register";
import * as auth from '../utils/auth.js';

function App() {
    const [isRegisterOk, setRegisterOk] = useState(false);
    const [isLoggedIn, setLoggedIn] = useState(false);
    const [email, setEmail] = useState('');
    const [isInfoTooltipOpen, setInfoTooltipOpen] = useState(false);
    const [isBurgerMenuOpen, setBurgerMenuOpen] = useState(false);
    const navigate = useNavigate();

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

    const jwt = localStorage.getItem('jwt');

    useEffect(() => {
        if (jwt) {
            auth.getContent(jwt)
                .then(res => {
                    setEmail(res.email);
                    setLoggedIn(true);
                    navigate('/');
                })
                .catch(err => {
                    console.log(`Ошибка в процессе проверки токена: ${err}`);
                });
        }
    }, [navigate, jwt]);

    useEffect(() => {
        if (isLoggedIn) {
            Promise.all([api.getInitialCards(), api.getUserInfo()])
                .then(([cards, userInformation]) => {
                    setCurrentUser(userInformation);
                    setCards([...cards]);
                })
                .catch(error => {
                    console.log(error);
                });
        }

    }, [isLoggedIn]);

    function handleRegister({email, password}) {
        return auth.register(email, password)
            .then(() => {
                setRegisterOk(true);
                setInfoTooltipOpen(true);
                navigate('/sign-in');
            })
            .catch(err => {
                console.log(`Ошибка в процессе регистрации пользователя на сайте: ${err}`);
                setInfoTooltipOpen(true);
            });
    }

    function handleLogin({email, password}) {
        return auth.authorize(email, password)
            .then(data => {
                if (data.token) {
                    localStorage.setItem('jwt', data.token);
                    setEmail(email);
                    setLoggedIn(true);
                    navigate('/');
                }
            })
            .catch(err => {
                setInfoTooltipOpen(true);
                console.log(`Ошибка в процессе авторизации пользователя на сайте: ${err}`);
            });
    }

    function signOut() {
        localStorage.removeItem('jwt');
        setEmail('');
        setLoggedIn(false);
        document.querySelector('#burger_menu').classList.replace('menu_opened', 'menu');
    }

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

    function toggleBurgerMenuClick() {
        setBurgerMenuOpen(!isBurgerMenuOpen);
    }

    function handleCardLike(card) {
        const isLiked = card.likes.some(i => i === currentUser._id);

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
        setInfoTooltipOpen(false);
    }

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className="page">
                <div className="page__content">
                    <BurgerMenu
                        isActive={isBurgerMenuOpen}
                        email={email}
                        signOut={signOut}
                        loggedIn={isLoggedIn}
                    />
                    <Header
                        onClick={toggleBurgerMenuClick}
                        isActive={isBurgerMenuOpen}
                        email={email}
                        signOut={signOut}
                        loggedIn={isLoggedIn}
                    />
                    <Routes>
                        <Route
                            path='/'
                            element={<ProtectedRoute
                                component={Main}
                                loggedIn={isLoggedIn}
                                onEditProfile={handleEditProfileClick}
                                onAddPlace={handleAddPlaceClick}
                                onEditAvatar={handleEditAvatarClick}
                                onCardClick={handleCardClick}
                                onCardLike={handleCardLike}
                                onCardDelete={handleDeletePlaceClick}
                                cards={cards}
                            />}/>
                        <Route
                            path='/sign-up'
                            element={<Register
                                handleRegister={handleRegister}
                                isOpen={isInfoTooltipOpen}
                                onClose={closeAllPopups}
                                isRegisterOk={isRegisterOk}
                            />}/>
                        <Route
                            path='/sign-in'
                            element={<Login
                                handleLogin={handleLogin}
                                isOpen={isInfoTooltipOpen}
                                onClose={closeAllPopups}
                                isRegisterOk={isRegisterOk}
                            />}/>
                        <Route
                            path='*'
                            element={isLoggedIn ? <Navigate to='/'/> : <Navigate to='/sign-in'/>}
                        />
                    </Routes>
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
