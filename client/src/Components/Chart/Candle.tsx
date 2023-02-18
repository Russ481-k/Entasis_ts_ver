import { useEffect } from "react";
import { dataToArray } from "../../Function/dataToArray";
type RtdArr = {
    addRtd:Array<Array<number|string>>
    rtdPrice:Array<number>
    date:Array<string>
    open:Array<number>
    close:Array<number>
    high:Array<number>
    low:Array<number>
    }

const Candle: React.FC<RtdArr> =({rtdPrice,addRtd,open,close,high,low}) => {
    let width = Number(document.body.querySelector('.candle')?.clientWidth)
    const numXTicks = width > 782 ? 12 : 6 ;
    const numYTicks = 5;
    const height = 600;
    const x0 = 10;
    const y0 = 10;
    const yAxisLength = height - 20;
    const xAxisLength = width - 80;
console.log(rtdPrice)
const rtdArr = [
    String(new Date()).slice(0,-35),
    rtdPrice[0],
    rtdPrice[rtdPrice.length-1],
    Math.max(...rtdPrice),
    Math.min(...rtdPrice),
]
useEffect(()=>{

})
    return(
    <div className="candle">
        <svg width={'100%'}height={height}>
            
            {/*----기본 가로 선----*/}
            <line
                x1={x0}
                y1={yAxisLength}
                x2={xAxisLength}
                y2={yAxisLength}
                stroke="#005469"
            />
            {/*----기본 세로 선----*/}
            <line
                x1={xAxisLength}
                y1={y0}
                x2={xAxisLength}
                y2={yAxisLength}
                stroke="#005469"
            />
            {/*----시세 가로 선----*/}
            {Array.from({ length: numXTicks }).map((_, index) => {
            const x = x0 + index * (xAxisLength / numXTicks) + 10;
                return (
                    <g key={index}>
                    <line
                        className="lineLight"
                        x1={x}
                        x2={x}
                        y1={yAxisLength}
                        y2={y0}
                        stroke='#121212'
                    ></line>
                    <text
                        x={x}
                        y={height}
                        textAnchor="middle"
                        fontSize={Number(document.body.querySelector('.volume')?.clientWidth) < 800 ? 6 : 10}
                    >
                        {/* {xValue[index]} */}
                    </text>
                    </g>
                );
            })}
            {/*----시세 세로 선----*/}
            {Array.from({ length: numYTicks }).map((_, index) => {
            const y = y0 + index * (yAxisLength / numYTicks) -10;
                return (
                    <g key={index}>
                    <line
                        className="lineLight"
                        x1={xAxisLength-1}
                        x2={x0}
                        y1={y}
                        y2={y}
                        stroke='#121212'
                    ></line>
                    <text
                        x={width}
                        y={y}
                        textAnchor="middle"
                        fontSize={Number(document.body.querySelector('.volume')?.clientWidth) < 800 ? 6 : 10}
                    >
                        {/* {xValue[index]} */}
                    </text>
                    </g>
                );
            })}
            {/*----시세 세로 선----*/}
            {/*----시세 세로 선----*/}
            {/*----시세 세로 선----*/}
            
        </svg>

    </div>
    )
}
export default Candle;