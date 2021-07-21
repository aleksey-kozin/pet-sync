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
import DetailsBloodAnalyse from '../DetailsBloodAnalyse/DetailsBloodAnalyse'
import ChartLine from '../ChartLine/ChartLine'
import Blood from '../Analysis/Blood'
import Pee from '../Analysis/Pee'
import Hormonal from '../Analysis/Hormonal'
import AddPet from '../AddPet/AddPet'


function App() {
  return (
    <>
      <Provider store={store}>
        <Router>
          <Nav />
          {/* <TestChart/> */}
          <Switch>
            <Route path={"/"} exact component={Main} />
            {/* <Route path={'/testchart'} component={TestChart} /> */}
            <Route path={"/detailsanalyse"} component={DetailsBloodAnalyse} />
            <Route path={"/chartline"} component={ChartLine} />
            <Route path={"/login"} component={FormLogin} />
            <Route path={"/signup"} component={FormSignUp} />
            <Route path={"/profile"} component={Profile} />
            <Route path={"/mypets/:id"} component={PetPersonPage} />
            <Route path={"/mypets"} component={MyPets} />
            <Route path={"/petcard"} component={AddPet} />
            <Route path={"/appointment"} component={Appointment} />
            <Route path={"/feed/:id"} component={FeedAbout} />
            <Route path={"/tests/blood/:id"} component={Blood} />
            <Route path={"/tests/pee/:id"} component={Pee} />
            <Route path={"/tests/research/:id"} component={Hormonal} />
            <Route path={"/addfeed"} component={AddFeed} />
            <Route path={"/feed"} component={Feed} />
            {/* <Route path={"/mypets/:id"} component={ChartList} /> */}
          </Switch>
        </Router>
      </Provider>
    </>
  );
}

export default App
