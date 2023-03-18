import { scaleLinear } from "d3-scale"
import { useState } from "react"

type RtdArr = {
    addRtd:Array<Array<number|string>>
    rtd:Array<Array<number>>
    vol:Array<number>
    open:Array<Array<number>>
    close:Array<Array<number>>
    }
const Volume:React.FC<RtdArr> =({rtd,addRtd,vol,open,close}) => {
    const [pointer, setPointer] = useState({x:0,y:0}) 
    const height = 160;
    const numYTicks = 4;
    let width = Number(document.body.querySelector('.candle')?.clientWidth)
    const x0 = 0;
    const y0 = 10;
    const yAxisLength = height - 20;
    const xAxisLength = width - 80;
    const handleMouseMove=(e:{clientX:number;clientY:number}) =>{
        setPointer({
            x: e.clientX+10,
            y: e.clientY-10
        })
    }
    const dataArray:any[]=[]
    for (let i = 0; i < vol.length; i++) {
        dataArray.push([
            i,
            vol[i],
            open[i],
            close[i]
        ]
        );
    }
    // console.log(rtd[rtd.length-1])
    dataArray[dataArray.length] = [
        dataArray.length,
        rtd[rtd.length-1],
        rtd[0][0],
        rtd[0][rtd[0].length-1]
    ];
    const dataYMax = dataArray.reduce(
        (max, [_, vol,open,close]) => Math.max(vol, max),
        -Infinity
    );
    let SVG_VOLUME_WIDTH = typeof width === "number" ? width * 1 : 0;
    let SVG_VOLUME_HEIGHT = typeof height === "number" ? height * 1 : 0;

    const dataYMin = 0
    const dataYRange = dataYMax;
    const barPlothWidth = xAxisLength / dataArray.length>0?xAxisLength / dataArray.length:0.001;
    const currentFill = rtd[0][0]>rtd[0][rtd[0].length-1] ? "#b8284a" : "#00A4D8" ;
    let windowPageYOffset = window.pageYOffset
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
                const yValue = (
                    dataYMax - index * (dataYRange / numYTicks)
                );
                
                return (
                    <g key={index}>
                    <line
                        className="lineLight"
                        x1={xAxisLength}
                        x2={x0}
                        y1={y}
                        y2={y}
                        stroke='#323232'
                    ></line>
                    <text
                        className='select_ven'
                        x={SVG_VOLUME_WIDTH - 60} 
                        y={y} 
                        fontSize="10" 
                        stroke='#323232' >
                        {yValue.toFixed(2)} 
                    </text>
                    </g>
                )})};

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
                y1={pointer.x+10<SVG_VOLUME_WIDTH-60&&((pointer.y+windowPageYOffset)<875)?((pointer.y+windowPageYOffset)-715):-20}
                y2={pointer.x+10<SVG_VOLUME_WIDTH-60&&((pointer.y+windowPageYOffset)<875)?((pointer.y+windowPageYOffset)-715):-20}
                stroke='#00fbff'
                opacity={0.3}
                ></line>
                <text
                x={SVG_VOLUME_WIDTH-60}
                y={pointer.x+10<SVG_VOLUME_WIDTH-60&&
                ((pointer.y+windowPageYOffset)<875)?
                ((pointer.y+windowPageYOffset)-715):-20}
                fill='#00fbff'
                stroke='#00fbff'
                opacity={0.5}
                fontSize='12px'
            > 
            {(dataYMax*(875-pointer.y)/160).toFixed(1).toLocaleString()}
                </text>

            {/*----거래량----*/}
            {dataArray.map(
                ([index, vol, open, close]) => {
                    const x = x0 + index * barPlothWidth;
                    const sidePadding = xAxisLength * 0.0015;
                    let yRatio = 0;
                    const yRatioGenerator = () => {
                        yRatio = (vol - dataYMin)*0.9 / dataYMax;
                        if (yRatio > 0) {
                        return yRatio;
                        } else return (yRatio = vol / dataYRange);
                    };
                    const y = y0 + (1 - yRatioGenerator()) * yAxisLength-10;
                    const height = yRatioGenerator() * yAxisLength;
                    const fill = open>close ? "#b8284a" : "#00A4D8" ;
                    
                    return (                 
                    <g key={index}>
                        <rect
                        {...{ fill }}
                        x={x}
                        y={y-0.5}
                        width={(barPlothWidth - sidePadding)>0?barPlothWidth - sidePadding:0.01}
                        height={height}
                        ></rect>
                        {index===dataArray.length-1?
                            <g key={index}>
                                <line
                                    x1={xAxisLength+10}
                                    x2={x0}
                                    y1={y-0.5}
                                    y2={y-0.5}
                                    strokeWidth='0.1'
                                    stroke={currentFill}
                                    >
                                    </line>
                                    <text
                                    x={SVG_VOLUME_WIDTH - 60}
                                    y={y-0.5}
                                    fontSize="12" 
                                    fill={currentFill} 
                                    >
                                    {Number(rtd[rtd.length-1]).toFixed(2)}
                                </text>
                            </g>:<></>
                        }
                    </g>
                    
                    );
                    
                }
                
            )}
            {/*----시세 선----*/}



            {/*----시세 세로 선----*/}
            
        </svg>    
    </div>
    )
}
export default Volume;