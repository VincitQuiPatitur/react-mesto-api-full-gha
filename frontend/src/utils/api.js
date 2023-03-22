class Api {
    constructor({baseUrl, headers}) {
        this._url = baseUrl;
        this._headers = headers;
    }

    _getResult(res) {
        if (res.ok) {
            return res.json();
        } else {
            return Promise.reject(`Ошибка: ${res.status} ${res.statusText}`);
        }
    }

    getUserInfo() {
        return fetch(
            `${this._url}/users/me`,
            {
                headers: this._headers
            })
            .then(this._getResult);
    }

    getInitialCards() {
        return fetch(
            `${this._url}/cards`,
            {
                headers: this._headers
            })
            .then(this._getResult);
    }

    setUserInfo(userInfo) {
        return fetch(
            `${this._url}/users/me`,
            {
                method: 'PATCH',
                headers: this._headers,
                body: JSON.stringify({
                    name: userInfo.name,
                    about: userInfo.about
                }),
            })
            .then(this._getResult);
    }

    addNewCard(card) {
        return fetch(
            `${this._url}/cards`,
            {
                method: 'POST',
                headers: this._headers,
                body: JSON.stringify({
                    name: card.name,
                    link: card.link
                })
            })
            .then(this._getResult);
    }

    deleteCard(card) {
        return fetch(
            `${this._url}/cards/${card._id}`,
            {
                method: 'DELETE',
                headers: this._headers
            })
            .then(this._getResult);
    }

    changeLikeCardStatus(id, isLiked) {
        return fetch(
            `${this._url}/cards/${id}/likes`,
            {
                method: isLiked ? 'DELETE' : 'PUT',
                headers: this._headers
            })
            .then(this._getResult);
    }

    setUserAvatar(avatar) {
        return fetch(
            `${this._url}/users/me/avatar`,
            {
                method: 'PATCH',
                headers: this._headers,
                body: JSON.stringify({
                    avatar
                })
            })
            .then(this._getResult);
    }
}

const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-55',
    headers: {
        authorization: '5edfebd6-970d-4762-80ff-378f56c29b55',
        'Content-Type': 'application/json'
    }
});

export {api};