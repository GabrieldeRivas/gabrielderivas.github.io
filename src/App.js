import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import Mixer from './components/Mixer';
import About from './components/About';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <Header></Header>
      <Mixer></Mixer>
      <About></About>
      <Footer></Footer>
    </div>
  );
}


export default App;
