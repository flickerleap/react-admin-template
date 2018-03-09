import React from 'react';
import Card from '../components/display/Card';
import { Bar, BarChart, CartesianGrid, Legend, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';


const DashboardScreen = ({content}) => (
    <div className='row'>
        {content}
    </div>
);

export default DashboardScreen;
