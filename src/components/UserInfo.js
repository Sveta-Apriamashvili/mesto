export default class UserInfo {
    constructor({usernameSelector, aboutSelector, avatarSelector, editButtonSelector}, {onClickEdit}) {
        this._usernameLabel = document.querySelector(usernameSelector)
        this._aboutLabel = document.querySelector(aboutSelector)
        this._avatarImage = document.querySelector(avatarSelector)
        this._editButton = document.querySelector(editButtonSelector)
        this._onClickEdit = onClickEdit
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

    setEventListeners() {
        this._avatarImage.onmouseover = () => this._showEditButton(this._editButton)
        this._editButton.onmouseleave = () => this._hideEditButton(this._editButton)
        this._editButton.onclick = () => this._onClickEdit()
    }

    _showEditButton(editButton) {
        editButton.classList.add('profile-info__edit-avatar_active')
    }

    _hideEditButton(editButton) {
        editButton.classList.remove('profile-info__edit-avatar_active')
    }
}