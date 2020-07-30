import React from "react";

import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';



export default function chart(props) {
  console.log(props.data)
  let data = [{price: 11220, trade: "BINANCE:BTCUSDT"}, {price: 11179.19, trade: "BINANCE:BTCUSDT"},{price: 11179.21, trade: "BINANCE:BTCUSDT"} ]
    return (

      // <div></div>
        <LineChart width={500} height={300} data={props.data}>
        <XAxis dataKey="trade"/>
        <YAxis/>
        <CartesianGrid stroke="#eee" strokeDasharray="5 5"/>
        <Line type="monotone" dataKey="price" stroke="#8884d8" />
      </LineChart>
    )
}
