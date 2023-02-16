import Footer from "../Components/Footer";
import Limit from "../Components/Trade/Limit";
import Order from "../Components/Trade/Order";
import AssetWrapper from "../Wrapper/AssetWrapper";
import ChartWrapper from "../Wrapper/ChartWrapper";
import HistoryWrapper from "../Wrapper/HistoryWrapper";

const MainPage =() => {

    return(
    <div className="mainpage">
        <h1>MainPage</h1>
        <ChartWrapper/>
        <Limit/>
        <Order/>
        <HistoryWrapper/>
        <AssetWrapper/>
        <Footer/>
    </div>
    )
}
export default MainPage;