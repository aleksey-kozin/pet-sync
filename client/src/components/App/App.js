
import PetCard from '../PetCard/PetCard'
import './App.css'
import { createBrowserHistory } from 'history'
import LoginForm from '../LoginForm/LoginForm'
import SignUpForm from '../SignUpForm/SignUpForm'

function App() {
  return (
    <>
    <PetCard />
      <LoginForm />
      {/* <SignUpForm /> */}
    </>
  )
}

export default App;
