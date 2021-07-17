import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Main from '../Main/Main'
import Nav from '../Nav/Nav'
import Profile from '../Profile/Profile'
import SignUpForm from '../SignUpForm/SignUpForm'
import LoginForm from '../LoginForm/LoginForm'
import MyPets from '../MyPets/MyPets'
import PetPersonPage from '../PetPersonPage/PetPersonPage'
import FormLogin from '../Forms/FormLogin'
import FormSignUp from '../Forms/FormSignUp'

function App() {
  return (
    <>
      <Router>
        <Nav />
        <Switch>
          <Route path={"/"} exact component={Main} />
          <Route path={"/login"} component={FormLogin} />
          <Route path={"/signup"} component={FormSignUp} />
          <Route path={"/profile"} component={Profile} />
          <Route exact path={"/mypets"} component={MyPets} />
          <Route path={"/mypets/:name"} component={PetPersonPage} />
        </Switch>
      </Router>
    </>
  )
}

export default App
