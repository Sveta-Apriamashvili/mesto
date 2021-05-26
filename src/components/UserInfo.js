export default class UserInfo {
    constructor({usernameSelector, aboutSelector, avatarSelector}) {
        this._usernameLabel = document.querySelector(usernameSelector)
        this._aboutLabel = document.querySelector(aboutSelector)
        this._avatarImage = document.querySelector(avatarSelector)
    }

    getUserInfo() {
        let model = {}
        model.username = this._usernameLabel.textContent
        model.about = this._aboutLabel.textContent

        return model
    }

    setUserInfo({username, about, avatar}) {
        this._usernameLabel.textContent = username
        this._aboutLabel.textContent = about
        this._avatarImage.src = avatar
    }
}