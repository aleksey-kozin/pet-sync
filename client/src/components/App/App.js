import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Main from '../Main/Main'
import Nav from '../Nav/Nav'
import Profile from '../Profile/Profile'
import SignUpForm from '../SignUpForm/SignUpForm'
import LoginForm from '../LoginForm/LoginForm'
import MyPets from '../MyPets/MyPets'
import PetPersonPage from '../PetPersonPage/PetPersonPage'
import TestChart from '../TestChart/TestChart'

function App() {
  return (
    <>
      <Router>
        <Nav />
        <TestChart/>
        <Switch>
          <Route path={"/"} exact component={Main} />
          <Route path={"/login"} component={LoginForm} />
          <Route path={"/registration"} component={SignUpForm} />
          <Route path={"/profile"} component={Profile} />
          <Route exact path={"/mypets"} component={MyPets} />
          <Route path={"/mypets/:name"} component={PetPersonPage} />
        </Switch>
      </Router>
    </>
  )
}

export default App
