class Api {
  constructor(options) {
    this.baseUrl = options.baseUrl;
    this.headers = options.headers;
  }

  _getHeaders() {
    let currentHeaders = this.headers;
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      currentHeaders["Authorization"] = `Bearer ${jwt}`;
    }
    return currentHeaders;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  _executeGetRequest(path) {
    return fetch(this.baseUrl + path, {
      headers: this._getHeaders(),
    }).then(this._checkResponse);
  }

  getUserInfo() {
    return this._executeGetRequest("/users/me");
  }

  getInitialCards() {
    return this._executeGetRequest("/cards");
  }

  _executePatchRequest(path, data) {
    return fetch(this.baseUrl + path, {
      method: "PATCH",
      headers: this._getHeaders(),
      body: JSON.stringify(data),
    }).then(this._checkResponse);
  }

  patchUserInfo(data) {
    return this._executePatchRequest("/users/me", data);
  }

  patchUserAvatar(data) {
    return this._executePatchRequest("/users/me/avatar", data);
  }

  postCard({ name, link }) {
    return fetch(this.baseUrl + "/cards", {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    }).then(this._checkResponse);
  }

  _executeDeleteRequest(path) {
    return fetch(this.baseUrl + path, {
      method: "DELETE",
      headers: this._getHeaders(),
    }).then(this._checkResponse);
  }

  deleteCard(cardId) {
    return this._executeDeleteRequest("/cards/" + cardId);
  }

  deleteLikes(cardId) {
    return this._executeDeleteRequest("/cards/" + cardId + "/likes");
  }

  putLikes(cardId) {
    return fetch(this.baseUrl + "/cards/" + cardId + "/likes", {
      method: "PUT",
      headers: this.headers,
    }).then(this._checkResponse);
  }

  signUp({ password, email }) {
    return fetch(this.baseUrl + "/signup", {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({
        password: password,
        email: email,
      }),
    }).then(this._checkResponse);
  }

  signIn({ password, email }) {
    return fetch(this.baseUrl + "/signin", {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({
        password: password,
        email: email,
      }),
    }).then(this._checkResponse);
  }

  getUserAuth(token) {
    return fetch(this.baseUrl + "/users/me", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then(this._checkResponse);
  }
}

export const api = new Api({
  baseUrl: "http://localhost:3001",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;

export const auth = new Api({
  baseUrl: "http://localhost:3001",
  headers: {
    "Content-Type": "application/json",
  },
});
