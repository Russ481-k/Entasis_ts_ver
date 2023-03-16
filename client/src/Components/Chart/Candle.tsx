import { useEffect, useState } from "react";
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

    const Candle: React.FC<RtdArr> =({rtdPrice,addRtd,date,open,close,high,low}) => {
        let width = Number(document.body.querySelector('.candle')?.clientWidth)
        const [pointer,setPointer]=useState({x:0,y:0})




    const rtdArr = [
        String(new Date()).slice(0,-35),
        rtdPrice[0],
        rtdPrice[rtdPrice.length-1],
        Math.max(...rtdPrice),
        Math.min(...rtdPrice),
    ]
    let dataArr:any[]=[]
    for(let i = 0; i<date.length;i++){
        dataArr.push([
            date[i],
            open[i],
            close[i],
            high[i],
            low[i],
        ])
    }

    const dataYMax = dataArr.reduce(
        (max, [_, open, close, high, low]) => Math.max(max, high),
        -Infinity
    );
    const dataYMin = dataArr.reduce(
        (min, [_, open, close, high, low]) => Math.min(min, low),
        +Infinity
    );
    const numXTicks = width > 782 ? 12 : 6 ;
    const numYTicks = 7;
    const height = 600;
    const x0 = 0;
    const y0 = 0;
    const yAxisLength = height - 20;
    const xAxisLength = width - 80;
    const dataYRange = dataYMax - dataYMin;
    const barPlothWidth = xAxisLength / dataArr.length;

    let SVG_CHART_WIDTH = typeof width === "number" ? width * 1 : 0;
    let SVG_CHART_HEIGHT = typeof height === "number" ? height * 1 : 0;

    const xValue: string[] = [];
    const generateDate = () => {
        for (let i = 0; i < 12; i++) {
        xValue.push(date[(date.length / 12) * i]);
        }
      // xValue.reverse();
      // console.log(xValue);
        return xValue;
    };
    const handleMouseMove=(e:{clientX:number;clientY:number})=>{
        setPointer({
            x: e.clientX+10,
            y: e.clientY-5
        })
    }
    generateDate();
    let windowPageYOffset = window.pageYOffset

    return(
    <div className="candle">
        <svg 
        width={'100%'}
        height={height}
        onMouseMove={handleMouseMove}
        >
            
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
            {Array.from({ length: numYTicks }).map((_, index) => {
          const y = y0 + index * (yAxisLength / numYTicks);
            const yValue = Math.round(
            dataYMax - index * (dataYRange / numYTicks)
            );
                return (
                    <g key={index}>
                    <line
                        className="lineLight"
                        x1={xAxisLength-1}
                        x2={x0}
                        y1={y}
                        y2={y}
                        stroke='#323232'
                    ></line>
                    <text
                        x={width-55}
                        y={y+5}
                        textAnchor="middle"
                        fontSize={Number(document.body.querySelector('.volume')?.clientWidth) < 800 ? 6 : 10}
                        stroke='#323232'
                    >
                        {yValue.toLocaleString()}
                    </text>
                    </g>
                );
            })}

            {/*----시세 세로 선----*/}
            {Array.from({ length: numXTicks }).map((_, index) => {
            const x = x0 + index * (xAxisLength / numXTicks) 
                return (
                    <g key={index}>
                    <line
                        className="lineLight"
                        x1={x}
                        x2={x}
                        y1={yAxisLength}
                        y2={y0}
                        stroke='#323232'
                    ></line>
                    <text
                        x={x}
                        y={height-5}
                        textAnchor="middle"
                        fontSize={Number(document.body.querySelector('.volume')?.clientWidth) < 800 ? 6 : 10}
                        stroke='#323232'
                    >
                        {xValue[index]}
                    </text>
                    </g>
                );
            })}
 
            {/* ----------포인터----------- */}
            <line
                
                    x1={pointer.x<SVG_CHART_WIDTH-70 &&((pointer.y+windowPageYOffset)<715)?pointer.x-11:-10}
                    x2={pointer.x<SVG_CHART_WIDTH-70 &&((pointer.y+windowPageYOffset)<715)?pointer.x-11:-10}
                    y1={0}
                    y2={SVG_CHART_HEIGHT-20}
                    stroke='#00fbff'
                    opacity={0.3}
                    ></line>

                    <line
                    x1={0}
                    x2={SVG_CHART_WIDTH-65}
                    y1={pointer.x<SVG_CHART_WIDTH-70 &&((pointer.y+windowPageYOffset)<715)?((pointer.y+windowPageYOffset)-135):-10}
                    
                    y2={pointer.x<SVG_CHART_WIDTH-70 &&((pointer.y+windowPageYOffset)<715)?((pointer.y+windowPageYOffset)-135):-10}
                    stroke='#00fbff'
                    opacity={0.3}
                    ></line>
                    <text
                
                    x={SVG_CHART_WIDTH-60}
                    y={pointer.x<SVG_CHART_WIDTH-70&&((pointer.y+windowPageYOffset)<715)?((pointer.y+windowPageYOffset)-135):-10}
                    fill='#00aab3'
                    stroke='#00aab3'
                    opacity={0.5}
                    fontSize='11px'
                > 
                {((Number(dataYMax)-Number(dataYMin))*(715-Number(pointer.y))/415+dataYMin).toFixed(2).toLocaleString()}ETH
                </text>

            {/*----캔들 구현----*/}
            {/*----시세 세로 선----*/}
            
        </svg>

    </div>
    )
}
export default Candle;