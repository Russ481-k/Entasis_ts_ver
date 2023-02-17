
// SCSS
import './MainPage.scss'

// components
import Footer from "../Components/Footer";
import Limit from "../Components/Trade/Limit";
import Order from "../Components/Trade/Order";
import AssetWrapper from "../Wrapper/AssetWrapper";
import ChartWrapper from "../Wrapper/ChartWrapper";
import HistoryWrapper from "../Wrapper/HistoryWrapper";



const MainPage =() => {

    return(
    <div className="mainpage">
        <div className='main_top'>
            <ChartWrapper/>
            <div className='main_top_order'>
                <Limit/>
                <Order/>
            </div>
        </div>
        <div className='main_body'>
            <HistoryWrapper/>
            <AssetWrapper/>
        </div>
        <Footer/>
    </div>
    )
}
export default MainPage;