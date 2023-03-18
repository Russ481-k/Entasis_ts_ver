import Candle from "../Components/Chart/Candle";
import Volume from "../Components/Chart/Volume";
import { dataToArray } from "../Function/dataToArray";
type RtdArr = {
    currentPrice:number
    addRtd:Array<Array<number|string>>
    rtd:Array<Array<number>>
    }
const ChartWrapper: React.FC<RtdArr> =({currentPrice,rtd,addRtd}) => {
    let date = dataToArray(addRtd,0)
    let open = dataToArray(addRtd,1)
    let high =dataToArray(addRtd,2)
    let low =dataToArray(addRtd,3)
    let close =dataToArray(addRtd,4)
    let vol =dataToArray(addRtd,5)

    return(
    <div className="chartwrapper">
        <span>{currentPrice}</span>
        <Candle 
            rtdPrice={rtd[0]} 
            addRtd={addRtd}
            date={date}
            open={open}
            close={close}
            high={high}
            low={low}
            currentPrice={currentPrice}

            />
        <Volume 
        rtd={rtd} 
        addRtd={addRtd} 
        open={open}
        close={close}
        vol={vol}
        />
    </div>
    )
}
export default ChartWrapper;