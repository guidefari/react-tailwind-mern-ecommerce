import Header from './components/Header'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Footer from './components/Footer'
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';

function App() {
  return (
    <Router>
      <Header/>
        <main className='container py-6'>
          <Route path='/login' component={LoginScreen}/>
          <Route path='/product/:id' component={ProductScreen}/>
          {/* the question mark means the id variable is optional, because sometimes you just want the cart */}
          <Route path='/cart/:id?' component={CartScreen}/>
          <Route path='/' component={HomeScreen} exact/>
        </main>
      <Footer/>
    </Router>
  );
}
export default App;