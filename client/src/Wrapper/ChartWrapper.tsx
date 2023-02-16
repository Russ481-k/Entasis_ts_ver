import Candle from "../Components/Chart/Candle";
import Volume from "../Components/Chart/Volume";

const ChartWrapper =() => {

    return(
    <div className="chartwrapper">
        <h1>ChartWrapper</h1>
        <Candle/>
        <Volume/>
    </div>
    )
}
export default ChartWrapper;