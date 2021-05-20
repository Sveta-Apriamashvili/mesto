export default class UserInfo {
    constructor({usernameSelector, aboutSelector}) {
        this._usernameLabel = document.querySelector(usernameSelector)
        this._aboutLabel = document.querySelector(aboutSelector)
    }

    getUserInfo() {
        let model = {}
        model.username = this._usernameLabel.textContent
        model.about = this._aboutLabel.textContent

        return model
    }

    setUserInfo({username, about}) {
        this._usernameLabel.textContent = username
        this._aboutLabel.textContent = about
    }
}