import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Main from '../Main/Main'
import Nav from '../Nav/Nav'
import Profile from '../Profile/Profile'
import MyPets from '../MyPets/MyPets'
import PetPersonPage from '../PetPersonPage/PetPersonPage'
import FormLogin from '../Forms/FormLogin'
import FormSignUp from '../Forms/FormSignUp'
import { Provider } from 'react-redux'
import store from '../../utils/redux/store'
import Feed from '../Feed/Feed'
import FeedAbout from '../FeedAbout/FeedAbout'
import AddFeed from '../AddFeed/AddFeed'

function App() {
  return (
    <>
      <Provider store={store}>
        <Router>
          <Nav />
          <Switch>
            <Route path={"/"} exact component={Main} />
            <Route path={"/login"} component={FormLogin} />
            <Route path={"/signup"} component={FormSignUp} />
            <Route path={"/profile"} component={Profile} />
            <Route exact path={"/mypets"} component={MyPets} />
            <Route path={"/mypets/:name"} component={PetPersonPage} />
            <Route path={"/feed/:id"} component={FeedAbout} />
            <Route path={"/addfeed"} component={AddFeed} />
            <Route path={"/feed"} component={Feed} />
          </Switch>
        </Router>
      </Provider>
    </>
  );
}

export default App
