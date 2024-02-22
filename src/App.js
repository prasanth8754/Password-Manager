import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import PasswordItem from './components/PasswordItem'
import './App.css'

const bgColorsClassNames = [
  'yellow',
  'green',
  'orange',
  'light-green',
  'red',
  'blue',
  'gray',
]

class App extends Component {
  state = {
    passwordsList: [],
    isPasswordHidden: true,
    searchInput: '',
    website: '',
    username: '',
    password: '',
  }

  onCheckBox = () => {
    this.setState(prevState => ({
      isPasswordHidden: !prevState.isPasswordHidden,
    }))
  }

  onDeletePasswordItem = id => {
    this.setState(prevState => ({
      passwordsList: prevState.passwordsList.filter(
        eachItem => eachItem.id !== id,
      ),
    }))
  }

  onChangeWebsite = event => {
    this.setState({website: event.target.value})
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onChangeSearch = event => {
    this.setState({searchInput: event.target.value})
  }

  filterPasswordsList = () => {
    const {passwordsList, searchInput} = this.state

    return passwordsList.filter(eachItem =>
      eachItem.website.toLowerCase().includes(searchInput.toLowerCase()),
    )
  }

  onSubmitForm = event => {
    event.preventDefault()
    const {website, username, password} = this.state
    const initialBgClassName = bgColorsClassNames[Math.floor(Math.random() * 7)]

    const newPasswordItem = {
      id: uuidv4(),
      website,
      username,
      password,
      initialBgClassName,
    }

    if (website !== '' && username !== '' && password !== '') {
      this.setState(prevState => ({
        passwordsList: [...prevState.passwordsList, newPasswordItem],
        website: '',
        username: '',
        password: '',
      }))
    }
  }

  render() {
    const {
      passwordsList,
      isPasswordHidden,
      searchInput,
      website,
      username,
      password,
    } = this.state
    const filteredPasswordsList = this.filterPasswordsList()
    const passwordsCount = filteredPasswordsList.length

    return (
      <div className="bg-cont">
        <div className="container">
          <img
            className="app-logo"
            src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png "
            alt="app logo"
          />
          <div className="top-container">
            <img
              className="top-img-1"
              src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png "
              alt="password manager"
            />
            <form className="form-cont" onSubmit={this.onSubmitForm}>
              <h1 className="form-heading">Add New Password</h1>
              <div className="input-cont">
                <img
                  className="form-logo"
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                  alt="website"
                />
                <input
                  value={website}
                  type="text"
                  placeholder="Enter Website"
                  onChange={this.onChangeWebsite}
                />
              </div>
              <div className="input-cont">
                <img
                  className="form-logo"
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png "
                  alt="username"
                />
                <input
                  value={username}
                  type="text"
                  placeholder="Enter Username"
                  onChange={this.onChangeUsername}
                />
              </div>
              <div className="input-cont">
                <img
                  className="form-logo"
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png "
                  alt="password"
                />
                <input
                  value={password}
                  type="password"
                  placeholder="Enter Password"
                  onChange={this.onChangePassword}
                />
              </div>
              <button type="submit" className="add-btn">
                Add
              </button>
            </form>
            <img
              className="top-img-2"
              src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
              alt="password manager"
            />
          </div>

          <div className="bottom-cont">
            <div className="your-password-cont">
              <div className="count-cont">
                <h1 className="your-password-heading">Your Passwords</h1>
                <p className="count">{passwordsCount}</p>
              </div>
              <div className="search-cont">
                <img
                  className="search-logo"
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                  alt="search"
                />
                <input
                  value={searchInput}
                  type="search"
                  placeholder="Search"
                  onChange={this.onChangeSearch}
                />
              </div>
            </div>
            <div className="checkbox-cont">
              <input type="checkbox" id="checkbox" onClick={this.onCheckBox} />
              <label htmlFor="checkbox">Show Passwords</label>
            </div>
            {passwordsCount === 0 && (
              <div className="no-password-cont">
                <img
                  className="bottom-img"
                  src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png "
                  alt="no passwords"
                />
                <p>No Passwords</p>
              </div>
            )}

            {passwordsCount > 0 && (
              <ul className="ul-cont">
                {filteredPasswordsList.map(eachItem => (
                  <PasswordItem
                    key={eachItem.id}
                    passwordDetails={eachItem}
                    isPasswordHidden={isPasswordHidden}
                    onDeletePasswordItem={this.onDeletePasswordItem}
                  />
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    )
  }
}

export default App
