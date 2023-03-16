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
import RankPage from './Pages/RankPage';
import LogInPage from './Pages/LogInPage';
import SignUpPage from './Pages/SignUpPage';

type Price = {
  currentPrice: number,
};
type RtdArr = {
  rtd:Array<Array<number|string>>
}

function App() {
  const [currentPrice, setCurrentPrice] = useState(1.2)
  const currentPrice_ref = useRef<number>(0)
  const currentVolume_ref = useRef<number>(0)

  // 단기 변동성 stv
  const [stv, setStv] = useState<number>(0)
  // 중기 변동성 income_ratio 
  const [mtv, setMtv] = useState<number>(0)
  const [rtd,setRtd] = useState<Array<Array<number>>>([[1.22],[0]])
  const [addRtd,setAddRtd] = useState<Array<Array<number|string>>>([
    [1.2,1.232,1.19,1.22],[1231]


  ])
  //1초마다 난수 값 가중 후 배열에 넣음
  useEffect(()=>{
    let toggle = false;
    const stvData = setInterval(()=>{
      setStv((Math.random()*(0.005-(-0.005001))-0.005))
      currentPrice_ref.current = rtd[0][rtd[0].length-1] * (1+stv) * (1+mtv)
      currentVolume_ref.current = 10 * (1+stv) * (1+mtv)
      setCurrentPrice(currentPrice_ref.current)
      setRtd([[...rtd[0],currentPrice_ref.current],[rtd[1][0]+currentVolume_ref.current]])

      const mtvData = setInterval(()=>{
        if(new Date().getSeconds()%60===0&&toggle===false){
          toggle = true
          setMtv((Math.random()*(0.001-(-0.001001))-0.001))
          setAddRtd([...addRtd,[
            String(new Date()).slice(0,-35),
            rtd[0][0], //open
            Math.max(...rtd[0]), //high
            Math.min(...rtd[0]), //low
            rtd[0][rtd[0].length-1], //close
            rtd[1][0] //volume
          ]])
          setRtd([[rtd[0][rtd[0].length-1]],[0]])
          console.log(rtd,rtd[0][rtd[0].length-1])
          clearInterval(mtvData)
        }}
        ,1000)
        clearInterval(stvData)
      },500)
      
  },[new Date().getMilliseconds()*500])

  return (
    <div className="App">
      <BrowserRouter>
        <Header/>
        <Nav currentPrice = {currentPrice}/>
        <Routes>
          <Route path='/' element={<MainPage currentPrice = {currentPrice} rtd={rtd} addRtd={addRtd}/>}/>
          <Route path='/market' element={<MarketPage/>}/>
          <Route path='/mint' element={<MintPage/>}/>
          <Route path='/rank' element={<RankPage/>}/>
          <Route path='/tx' element={<TxPage/>}/>
          <Route path='/sign_up' element={<SignUpPage/>}/>
          <Route path='/log_in' element={<LogInPage/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
