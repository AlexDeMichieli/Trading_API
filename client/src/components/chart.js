import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';

import '../../node_modules/react-vis/dist/style.css';


export default function chart(props) {
  console.log(props.data)

    return (
      <BarChart width={600} height={300} data={props.data}>
      <XAxis dataKey="time" stroke="#8884d8" />
      <YAxis />
      <Tooltip wrapperStyle={{ width: 500, backgroundColor: '#ccc' }} />
      <Legend width={100} wrapperStyle={{ top: 40, right: 20, backgroundColor: '#f5f5f5', border: '1px solid #d5d5d5', borderRadius: 3, lineHeight: '40px' }} />
      <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
      <Bar dataKey="price" fill="#8884d8" barSize={30} />
    </BarChart>
    )
}
