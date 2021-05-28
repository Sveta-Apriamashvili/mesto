class Api {
    constructor(options) {
        this._baseUrl = options.baseUrl
        this._headers = options.headers
    }

    // User

    getUserInfo() {
        const url = this._baseUrl + '/users/me'
        return fetch(url, {
                headers: this._headers
            })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }

                return Promise.reject(`Ошибка: ${res.status}`);
            });
    }

    editUserInfo({
        name,
        about
    }) {
        const url = this._baseUrl + '/users/me'
        return fetch(url, {
                method: 'PATCH',
                headers: this._headers,

                body: JSON.stringify({
                    name: name,
                    about: about
                })
            })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`);
            });
    }

    // Cards

    getInitialCards() {
        const url = this._baseUrl + '/cards'
        return fetch(url, {
                headers: this._headers
            })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`);
            });
    }

    addNewCard({
        name,
        link
    }) {
        const url = this._baseUrl + '/cards'
        return fetch(url, {
                method: 'POST',
                headers: this._headers,
                body: JSON.stringify({
                    name: name,
                    link: link
                })
            })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`);
            });
    }

    deleteCard(id) {
        const url = this._baseUrl + '/cards/' + id
        return fetch(url, {
            method: 'DELETE',
            headers: this._headers,
        })
        .then(res => {
            if (res.ok) {
                return res;
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        });
    }

    addLike(id) {
        const url = this._baseUrl + '/cards/likes/' + id
        return fetch(url, {
            method: 'PUT',
            headers: this._headers,
        })
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        });
    }

    deleteLike(id) {
        const url = this._baseUrl + '/cards/likes/' + id
        return fetch(url, {
            method: 'DELETE',
            headers: this._headers,
        })
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        });
    }

}

export const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-24',
    headers: {
        authorization: '8e2b4449-94a0-4beb-aa9f-18ee80fa9c26',
        'Content-Type': 'application/json'
    }
});