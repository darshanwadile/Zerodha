import HomePage from './landing_page/home/HomePage'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import SignUp from "./landing_page/signup/SignUp.jsx"
import Login from "./landing_page/login/Login.jsx"
import AboutPage from './landing_page/about/AboutPage.jsx'
import Productpage from './landing_page/products/ProductPage.jsx'
import PricingPage from './landing_page/pricing/PricingPage.jsx'
import SupportPage from './landing_page/support/SupportPage.jsx'

function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element = {<HomePage/>} />
        <Route path='/signup' element = {<SignUp/>} />
        <Route path='/login' element = {<Login/>} />
        <Route path='/about' element = {<AboutPage/>} />
        <Route path='/products' element = {<Productpage/>} />
        <Route path='/pricing' element = {<PricingPage/>} />
        <Route path='/support' element = {<SupportPage/>} />
        <Route path='*' element = {<div>Page Not Found</div>} />
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
