import Header from './components/Header'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Footer from './components/Footer'
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';

function App() {
  return (
    <Router>
      <Header/>
        <main className='container py-6'>
          <Route path='/' component={HomeScreen} exact/>
          <Route path='/product/:id' component={ProductScreen}/>
          {/* the question mark means the id variable is optional, because sometimes you just want the cart */}
          <Route path='/cart/:id?' component={CartScreen}/>
        </main>
      <Footer/>
    </Router>
  );
}
export default App;