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
const defaultSet = [
  [
    "Sat Mar 18 2023 08:42",
    1.22, //open
    1.207434941328912,  //high
    1.207434941328912,  //low
    1.207434941328912,  //close
    159.8969262608449   //volume
  ],
  [
    "Sat Mar 18 2023 08:42",
    1.207434941328912, //open
    1.228912,  //high
    1.19,  //low
    1.191328912,  //close
    452.8969262608449   //volume
  ],
  [
    "Sat Mar 18 2023 08:42",
    1.191328912, //open
    1.227434941328912,  //high
    1.191328912,  //low
    1.203434941328912,  //close
    59.8969262608449   //volume
  ],
  [
    "Sat Mar 18 2023 08:42",
    1.203434941328912, //open
    1.247434941328912,  //high
    1.200434941328912,  //low
    1.237434941328912,  //close
    1519.8969262608449   //volume
  ],
  [
    "Sat Mar 18 2023 08:42",
    1.237434941328912, //open
    1.277434941328912,  //high
    1.2,  //low
    1.26941328912,  //close
    159.8969262608449   //volume
  ],
  
]
function App() {
  const [currentPrice, setCurrentPrice] = useState(1.2)
  const currentPrice_ref = useRef<number>(0)
  const currentVolume_ref = useRef<number>(0)

  // 단기 변동성 stv
  const [stv, setStv] = useState<number>(0)
  // 중기 변동성 income_ratio 
  const [mtv, setMtv] = useState<number>(0)
  const [rtd,setRtd] = useState<Array<Array<number>>>([[1.26941328912],[0]])
  const [addRtd,setAddRtd] = useState<Array<Array<number|string>>>(defaultSet)
  //1초마다 난수 값 가중 후 배열에 넣음
  const[toggle,setToggle]  = useState(true);

  useEffect(()=>{
    let buf = rtd[0][rtd[0].length-1]

    const stvData = setInterval(()=>{
      setStv((Math.random()*(0.005-(-0.005001))-0.005))
      currentPrice_ref.current = rtd[0][rtd[0].length-1] * (1+stv) * (1+mtv)
      currentVolume_ref.current = (1+stv*50) * (1+mtv*50) * (rtd[0][rtd[0].length-2]!==undefined?(1+Math.abs(rtd[0][rtd[0].length-2]-rtd[0][rtd[0].length-1]))*5:0)
      setCurrentPrice(currentPrice_ref.current)
      if(new Date().getSeconds()%60===0&&toggle===true){
        setMtv((Math.random()*(0.001-(-0.001001))-0.001))
        setAddRtd([...addRtd,[
          String(new Date()).slice(0,-35),
          rtd[0][0], //open
          Math.max(...rtd[0]), //high
          Math.min(...rtd[0]), //low
          rtd[0][rtd[0].length-1], //close
          rtd[1][0] //volume
        ]])
        setRtd([[currentPrice_ref.current],[0]])
        setToggle(false);
        }else if(new Date().getSeconds()%60!==0||toggle===false ){
      setRtd([[...rtd[0],currentPrice_ref.current],[rtd[1][0]+currentVolume_ref.current]])
      setToggle(true);
    }
        clearInterval(stvData)
      },500)
  },[new Date().getMilliseconds()*500])

  return (
    <div className="App">
      <BrowserRouter>
        <Header/>
        <Nav currentPrice = {currentPrice_ref.current}/>
        <Routes>
          <Route path='/' element={<MainPage currentPrice = {currentPrice_ref.current} rtd={rtd} addRtd={addRtd}/>}/>
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
