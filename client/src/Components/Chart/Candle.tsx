import { scaleLinear } from "d3-scale";
import { useEffect, useState } from "react";
import { dataToArray } from "../../Function/dataToArray";
type RtdArr = {
    addRtd:Array<Array<number|string>>
    rtdPrice:Array<number>
    date:Array<string>
    open:Array<number>
    high:Array<number>
    low:Array<number>
    close:Array<number>
    currentPrice:number
    }

    const Candle: React.FC<RtdArr> =({rtdPrice,addRtd,date,open,close,high,low,currentPrice}) => {
        let width = Number(document.body.querySelector('.candle')?.clientWidth)
        const [pointer,setPointer]=useState({x:0,y:0})

    const rtdArr = [
        String(new Date()).slice(0,-35),
        rtdPrice[0],
        Math.max(...rtdPrice),
        Math.min(...rtdPrice),
        rtdPrice[rtdPrice.length-1],
    ]
    let dataArr:any[]=[]
    for(let i = 0; i<date.length;i++){
        dataArr.push([
            date[i],
            open[i],
            high[i],
            low[i],
            close[i],
        ])
    }
    dataArr[dataArr.length] = rtdArr
    const dataYMax = dataArr.reduce(
        (max, [_, open, high, low, close]) => Math.max(max, high),
        -Infinity
    );
    const dataYMin = dataArr.reduce(
        (min, [_, open, high, low, close]) => Math.min(min, low),
        +Infinity
    );

    const height = 600;

    let SVG_CHART_WIDTH = typeof width === "number" ? width * 1 : 0;
    let SVG_CHART_HEIGHT = typeof height === "number" ? height * 1 : 0;
    const numXTicks:number = SVG_CHART_WIDTH > 782 ? 12 : 6 ;
    const numYTicks:number = 7;
    const x0 = 0;
    const y0 = 10;
    const yAxisLength:number = height - 20;
    const xAxisLength:number = SVG_CHART_WIDTH - 80;
    const dataYRange:number = dataYMax - dataYMin;
    const barPlothWidth:number = xAxisLength / dataArr.length;

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
            const yValue = (
            dataYMax - index * (dataYRange / numYTicks)
            ).toFixed(2);
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
                        x={SVG_CHART_WIDTH-55}
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
                        <h5>{xValue[index]}</h5>
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
                y1={pointer.x<SVG_CHART_WIDTH-70 &&((pointer.y+windowPageYOffset)<715)?((pointer.y+windowPageYOffset)-115):-10}
                
                y2={pointer.x<SVG_CHART_WIDTH-70 &&((pointer.y+windowPageYOffset)<715)?((pointer.y+windowPageYOffset)-115):-10}
                stroke='#00fbff'
                opacity={0.3}
                ></line>
            <text
                x={SVG_CHART_WIDTH-60}
                y={pointer.x<SVG_CHART_WIDTH-70&&((pointer.y+windowPageYOffset)<715)?((pointer.y+windowPageYOffset)-115):-10}
                fill='#00aab3'
                stroke='#00aab3'
                opacity={0.5}
                fontSize='11px'
            > 
                {((Number(dataYMax)-Number(dataYMin))*(715-Number(pointer.y))/415+dataYMin).toFixed(2).toLocaleString()}ETH
            </text>

            {/*----캔들 구현----*/}
                {dataArr.map(
                (
                    [
                    date,
                    open,
                    high,
                    low,
                    close,
                    ],
                    index
                ) => {
                    const x = x0 + index * barPlothWidth;
                    const xX = x0 + (index + 1) * barPlothWidth;
                    const sidePadding = xAxisLength * 0.0015;
                    const max = Math.max(open, close);
                    const min = Math.min(open, close);
                    const scaleY = scaleLinear()
                    .domain([dataYMin, dataYMax])
                    .range([y0, yAxisLength]);
                    const fill = close > open ? "#00A4D8" : "#b8284a";
                    return (
                    <g key={index}>
                        <line
                    
                        x1={x + (barPlothWidth - sidePadding) / 2}
                        x2={x + (barPlothWidth - sidePadding) / 2}
                        y1={!isNaN(scaleY(low))? Number(yAxisLength) - scaleY(low)+10 : 0}
                        y2={!isNaN(scaleY(high)) ? Number(yAxisLength) - scaleY(high)+10 : 0}
                        stroke={fill}
                        />

                        <rect
                        id={`ID_`+`${dataArr.length-index-1}`}
                        {...{ fill }}
                        x={x}
                        y={!isNaN(scaleY(max)) ?yAxisLength - scaleY(max)+10:0}
                        width={(barPlothWidth - sidePadding)>0?barPlothWidth - sidePadding:0.001}
                        // 시가 종가 최대 최소값의 차
                        height={(scaleY(max) - scaleY(min))>1?scaleY(max) - scaleY(min):1}
                        ></rect>

                        <line
                        x1={xAxisLength+10}
                        x2={x0}
                        y1={(currentPrice!==undefined ? yAxisLength - scaleY(currentPrice)+10 : 0)}
                        y2={(currentPrice!==undefined ? yAxisLength - scaleY(currentPrice)+10 : 0)}
                        strokeWidth='0.1'
                        stroke={fill}
                        >
                        </line>
                        <text
                        x={SVG_CHART_WIDTH - 60}
                        y={(!isNaN(scaleY(currentPrice))?yAxisLength - Number(scaleY(currentPrice))+10:0)}
                        fontSize="12" 
                        fill={fill} 
                        >
                        {currentPrice}
                        </text>
                    </g>
                    );
                })
                }

            
            {/*----시세 세로 선----*/}
            
        </svg>

    </div>
    )
}
export default Candle;