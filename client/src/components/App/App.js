import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Main from '../Main/Main'
import Nav from '../Nav/Nav'
import Profile from '../Profile/Profile'
import MyPets from '../MyPets/MyPets'
import PetPersonPage from '../PetPersonPage/PetPersonPage'
import TestChart from '../TestChart/TestChart'
import FormLogin from '../Forms/FormLogin'
import FormSignUp from '../Forms/FormSignUp'
import { Provider } from 'react-redux'
import store from '../../utils/redux/store'
import Appointment from '../Appointment/Appointment'

function App() {
  return (
    <>
      <Provider store={store}>
        <Router>
          <Nav />
          <Switch>
            <Route path={'/'} exact component={Main} />
            <Route path={'/testchart'} component={TestChart} />
            <Route path={'/login'} component={FormLogin} />
            <Route path={'/signup'} component={FormSignUp} />
            <Route path={'/profile'} component={Profile} />
            <Route path={'/mypets'} component={MyPets} />
            <Route path={'/appointment'} component={Appointment} />
            <Route path={'/mypets/:name'} component={PetPersonPage} />
          </Switch>
        </Router>
      </Provider>
    </>
  )
}

export default App
