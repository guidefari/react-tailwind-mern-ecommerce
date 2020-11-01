
import Header from './components/Header'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Footer from './components/Footer'
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';

function App() {
  return (
      
    <Router>
      <Header/>
        <main className='container py-6'>
          <Route path='/' component={HomeScreen} exact/>
          <Route path='/product/:id' component={ProductScreen}/>
        </main>
      <Footer/>
    </Router>
  );
}
export default App;