// SCSS
import './App.scss';

// components
import Header from './Components/Header';
import Nav from './Components/Nav';
import MainPage from './Pages/MainPage';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import MarketPage from './Pages/MarketPage';
import MintPage from './Pages/MintPage';
import TxPage from './Pages/TxPage';


function App() {
  const data = 1
  return (
    <div className="App">
      <BrowserRouter>
        <Header data={data}/>
        <Nav/>
        <Routes>
          <Route path='/' element={<MainPage/>}/>
          <Route path='/market' element={<MarketPage/>}/>
          <Route path='/mint' element={<MintPage/>}/>
          <Route path='/tx' element={<TxPage/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
