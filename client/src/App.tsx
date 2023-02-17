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
import { useEffect, useRef, useState } from 'react';

type Price = {
  rtd: number,
};

function App() {
  const [rtd,setRtd] =useState<number>(1.2)
  const currentPrice_ref = useRef<number>(0)



  // 단기 변동성 stv
  const [stv, setStv] = useState<number>(0)
  // 중기 변동성 income_ratio 
  const [mtv, setMtv] = useState<number>(0)

  //1초마다 난수 값 가중 후 배열에 넣음
  useEffect(()=>{
    const stvData = setInterval(()=>{
      currentPrice_ref.current = rtd * (1+stv) * (1+mtv)
      setRtd(currentPrice_ref.current)
      clearInterval(stvData)
    },1000)
    setStv((Math.random()*((0.05+(-0.05))-0.05)))
    
    setInterval(()=>{
      setMtv((Math.random()*((0.01+(-0.01))-0.01)))
    },100000)
  },[new Date().getSeconds()])
  console.log(new Date().getSeconds(),rtd)

  //10초마다 배열을 
  return (
    <div className="App">
      <BrowserRouter>
        <Header/>
        <Nav rtd = {rtd}/>
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
