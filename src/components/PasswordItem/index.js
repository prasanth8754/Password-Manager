import './index.css'

const PasswordItem = props => {
  const {passwordDetails, isPasswordHidden, onDeletePasswordItem} = props
  const {id, website, username, password, initialBgClassName} = passwordDetails

  const initial = website.slice(0, 1).toUpperCase()

  const passwordText = isPasswordHidden ? (
    <img
      className="stars-img"
      src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png "
      alt="stars"
    />
  ) : (
    <p>{password}</p>
  )

  const deletePassword = () => {
    onDeletePasswordItem(id)
  }

  return (
    <li className="list-cont">
      <div className="initial-cont">
        <div className={`initial-bg ${initialBgClassName}`}>
          <h1 className="initial">{initial}</h1>
        </div>
        <div>
          <p className="website-name">{website}</p>
          <p>{username}</p>
          {passwordText}
        </div>
      </div>
      <button
        data-testid="delete"
        className="delete-btn"
        type="button"
        onClick={deletePassword}
      >
        <img
          className="delete-img"
          src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
          alt="delete"
        />
      </button>
    </li>
  )
}

export default PasswordItem
