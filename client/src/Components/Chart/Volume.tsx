import { useState } from "react"

type RtdArr = {
    addRtd:Array<Array<number|string>>
    rtd:Array<Array<number>>
    vol:Array<number>
    }
const Volume:React.FC<RtdArr> =({rtd,addRtd,vol}) => {
    const [pointer, setPointer] = useState({x:0,y:0}) 
    const height = 160;
    const numYTicks = 4;
    let width = Number(document.body.querySelector('.candle')?.clientWidth)
    const x0 = 10;
    const y0 = 0;
    const yAxisLength = height - 20;
    const xAxisLength = width - 80;
    const handleMouseMove=(e:{clientX:number;clientY:number}) =>{        setPointer({
            x: e.clientX+10,
            y: e.clientY-10
        })
    }
    const dataArray=[]
    // for (let i = 0; i < volTo.length; i++) {
    //     dataArray.push([
    //         i,
    //         volTo[i],
    //         open[i],
    //         close[i]
    //     ]
    //     );
    // }
    dataArray[dataArray.length] = [
        // dataArray.length,
        // currentPrice.totalVolTo,
        // currentPrice.open,
        // currentPrice.close
    ];

    const dataYMax = dataArray.reduce(
        (max, [_, vol]) => Math.max(vol, /*현재 거래량 */ max),
        -Infinity
        
    );
    let SVG_VOLUME_WIDTH = typeof width === "number" ? width * 1 : 0;
    let SVG_VOLUME_HEIGHT = typeof height === "number" ? height * 1 : 0;

    let windowPageYOffset = window.pageYOffset
    // console.log(pointer)

    return(
    <div className="volume">
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

            {/*----시세 세로 선----*/}
            {Array.from({ length: numYTicks }).map((_, index) => {
            const y = y0 + index * (yAxisLength / numYTicks);
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
            {/* ----------포인터-----------735 895 */}
            <line
                x1={pointer.x<SVG_VOLUME_WIDTH-70&&((pointer.y+windowPageYOffset)<875)?pointer.x-10:-20}
                x2={pointer.x<SVG_VOLUME_WIDTH-70&&((pointer.y+windowPageYOffset)<875)?pointer.x-10:-20}
                y1={0}
                y2={SVG_VOLUME_HEIGHT-20}
                stroke='#00fbff'
                opacity={0.3}
                ></line>
                <line
                x1={0}
                x2={SVG_VOLUME_WIDTH-70}
                y1={pointer.x+10<SVG_VOLUME_WIDTH-60&&((pointer.y+windowPageYOffset)<875)?((pointer.y+windowPageYOffset)-735):-20}
                y2={pointer.x+10<SVG_VOLUME_WIDTH-60&&((pointer.y+windowPageYOffset)<875)?((pointer.y+windowPageYOffset)-735):-20}
                stroke='#00fbff'
                opacity={0.3}
                ></line>
                <text
                x={SVG_VOLUME_WIDTH-60}
                y={pointer.x+10<SVG_VOLUME_WIDTH-60&&
                ((pointer.y+windowPageYOffset)<875)?
                ((pointer.y+windowPageYOffset)-735):-20}
                fill='#00fbff'
                stroke='#00fbff'
                opacity={0.5}
                fontSize='12px'
            > 
            {(Number(dataYMax)*(700-Number(pointer.y))/120).toFixed(1).toLocaleString()}
                </text>
            {/*----시세 세로 선----*/}
            {/*----시세 세로 선----*/}
            {/*----시세 세로 선----*/}
            
        </svg>    
    </div>
    )
}
export default Volume;