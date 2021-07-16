
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import LoginForm from '../LoginForm/LoginForm'
import Main from '../Main/Main'
import Nav from '../Nav/Nav'
import Profile from '../Profile/Profile'
import SignUpForm from '../SignUpForm/SignUpForm'
import PetCard from '../PetCard/PetCard'
import LoginForm from '../LoginForm/LoginForm'
import SignUpForm from '../SignUpForm/SignUpForm'
import './App.css'
import { createBrowserHistory } from 'history'


function App() {
  return (
    <>
      <Router>
        <Nav />
        <Switch>
          <Route path={'/'} exact component={Main} />
          <Route path={'/login'} component={LoginForm} />
          <Route path={'/signup'} component={SignUpForm} />
          <Route path={'/profile'} component={Profile} />
        </Switch>
      </Router>
    </>
  )
}

export default App
