import { BrowserRouter as Router} from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import Hero from './Components/Hero/Hero';
import './App.css';

function App() {
  return (
    <div className='app'>
      <Router>
        <Navbar searchData="" />
        {/* Add Routes here */}
      </Router>
      <Hero />
    </div>
  );
}

export default App;
