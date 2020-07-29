import React from 'react'
import {XYPlot, LineSeries,  HorizontalGridLines,
    VerticalGridLines,
    XAxis,
    YAxis,
    LineMarkSeries} from 'react-vis';
import '../../node_modules/react-vis/dist/style.css'


export default function chart() {

    const data = [
        {x: 0, y: 8},
        {x: 1, y: 5},
        {x: 2, y: 4},
        {x: 3, y: 9},
        // {x: 4, y: 1},
        // {x: 5, y: 7},
        // {x: 6, y: 6},
        // {x: 7, y: 3},
        // {x: 8, y: 2},
        // {x: 9, y: 0},
        // {x: 10, y: 4}

    ]
    return (
        <div className="App">
            <XYPlot height={300} width={300}>
            <LineSeries data={data} />
            <XAxis/><YAxis/>
    <HorizontalGridLines />
    <VerticalGridLines />
            </XYPlot>
        </div>
    )
}
