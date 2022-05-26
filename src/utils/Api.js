class Api {
  constructor({baseUrl, headers}) {
    this._baseUrl = baseUrl;
    this._headers = headers
  }

  _getResponseData(res) {
    if (!res.ok) {
       return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
} 

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers
    })
    .then(res => this._getResponseData(res))
  }
  
  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers
    })
    .then(res => this._getResponseData(res))
  }

  editProfile(name, about) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name,
        about
      })
    })
    .then(res => this._getResponseData(res))
  }

  editAvatar(avatar) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar
      })
    })
    .then(res => this._getResponseData(res))
  }

  addNewCard(name, link) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name,
        link
      })
    })
    .then(res => this._getResponseData(res))
  }

  deleteCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: 'DELETE',
      headers: this._headers
    })
    .then(res => this._getResponseData(res))
  }

  _deleteLikes(id) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: 'DELETE',
      headers: this._headers
    })
    .then(res => this._getResponseData(res))
  }

  _addLikes(id) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: 'PUT',
      headers: this._headers
    })
    .then(res => this._getResponseData(res))
  }

  changeLikeCardStatus(id, isLiked) {
    if (isLiked) {
      return this._addLikes(id)
    } else {
      return this._deleteLikes(id)
    }
  }
  
}

export const api = new Api({
  baseUrl: 'https://nomoreparties.co/v1/cohort-39',
  headers: {
    authorization: '377cdd1a-9532-4e39-83be-488fe413f634',
    'Content-Type': 'application/json'
  }
})
