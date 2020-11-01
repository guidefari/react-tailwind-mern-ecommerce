
import Header from './components/Header'
import Footer from './components/Footer'
import HomeScreen from './screens/HomeScreen';

function App() {
  return (
      
    <>
      <Header/>
        <main className='container py-6'>
          <HomeScreen/>
        </main>
      <Footer/>
    </>
  );
}
export default App;