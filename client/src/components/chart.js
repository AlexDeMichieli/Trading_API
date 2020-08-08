import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';

export default function chart(props) {

    return (
      <BarChart width={800} height={400} data={props.data}>
      <XAxis dataKey="time" stroke="#8884d8" />
      <YAxis />
      <Tooltip wrapperStyle={{ width: 500, backgroundColor: '#ccc' }} />
      <Legend width={100} wrapperStyle={{ top: 40, right: 20, backgroundColor: 'green', border: '1px solid #d5d5d5', borderRadius: 3, lineHeight: '40px' }} />
      <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
      <Bar dataKey="price" fill="red" barSize={40} />
    </BarChart>
    )
}
