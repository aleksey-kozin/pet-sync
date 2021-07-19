import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Main from '../Main/Main'
import Nav from '../Nav/Nav'
import Profile from '../Profile/Profile'
import MyPets from '../MyPets/MyPets'
import PetPersonPage from '../PetPersonPage/PetPersonPage'
// import TestChart from '../ChartList/ChartList'
import FormLogin from '../Forms/FormLogin'
import FormSignUp from '../Forms/FormSignUp'
import { Provider } from 'react-redux'
import store from '../../utils/redux/store'
import Feed from '../Feed/Feed'
import FeedAbout from '../FeedAbout/FeedAbout'
import AddFeed from '../AddFeed/AddFeed'
import Appointment from '../Appointment/Appointment'
import PetCard from '../PetCard/PetCard'
import ChartList from '../ChartList/ChartList'

function App() {
  return (
    <>
      <Provider store={store}>
        <Router>
          <Nav />
          {/* <TestChart/> */}
          <Switch>
            <Route path={'/'} exact component={Main} />
            {/* <Route path={'/testchart'} component={TestChart} /> */}
            <Route path={'/login'} component={FormLogin} />
            <Route path={'/signup'} component={FormSignUp} />
            <Route path={'/profile'} component={Profile} />
            <Route path={'/mypets/:id'} component={PetPersonPage} />
            <Route path={'/mypets'} component={MyPets} />
            <Route path={'/petcard'} component={PetCard} />
            <Route path={'/appointment'} component={Appointment} />
            <Route path={'/feed/:id'} component={FeedAbout} />
            <Route path={'/addfeed'} component={AddFeed} />
            <Route path={'/feed'} component={Feed} />
            {/* <Route path={"/mypets/:id"} component={ChartList} /> */}
          </Switch>
        </Router>
      </Provider>
    </>
  )
}

export default App
