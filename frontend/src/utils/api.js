class Api {
    constructor({baseUrl}) {
        this._url = baseUrl;
    }

    _getResult(res) {
        if (res.ok) {
            return res.json();
        } else {
            return Promise.reject(`Ошибка: ${res.status} ${res.statusText}`);
        }
    }

    getUserInfo() {
        const token = localStorage.getItem('jwt');
        return fetch(
            `${this._url}/users/me`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                }
            })
            .then(this._getResult);
    }

    getInitialCards() {
        const token = localStorage.getItem('jwt');
        return fetch(
            `${this._url}/cards`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                }
            })
            .then(this._getResult);
    }

    setUserInfo(userInfo) {
        const token = localStorage.getItem('jwt');
        return fetch(
            `${this._url}/users/me`,
            {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    name: userInfo.name,
                    about: userInfo.about
                }),
            })
            .then(this._getResult);
    }

    addNewCard(card) {
        const token = localStorage.getItem('jwt');
        return fetch(
            `${this._url}/cards`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    name: card.name,
                    link: card.link
                })
            })
            .then(this._getResult);
    }

    deleteCard(card) {
        const token = localStorage.getItem('jwt');
        return fetch(
            `${this._url}/cards/${card._id}`,
            {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            })
            .then(this._getResult);
    }

    changeLikeCardStatus(id, isLiked) {
        const token = localStorage.getItem('jwt');
        return fetch(
            `${this._url}/cards/${id}/likes`,
            {
                method: isLiked ? 'DELETE' : 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            })
            .then(this._getResult);
    }

    setUserAvatar(avatar) {
        const token = localStorage.getItem('jwt');
        return fetch(
            `${this._url}/users/me/avatar`,
            {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    avatar
                })
            })
            .then(this._getResult);
    }
}

const api = new Api({
    baseUrl: 'https://api.mesto.kostrova.nomoredomains.work',
});

export {api};