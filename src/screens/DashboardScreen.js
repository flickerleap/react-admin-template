import React from 'react';
import Card from '../components/Card';
import { Bar, BarChart, CartesianGrid, Legend, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const data = [
    {name: 'Page A', uv: 4000, pv: 2400, amt: 2400},
    {name: 'Page B', uv: 3000, pv: 1398, amt: 2210},
    {name: 'Page C', uv: 2000, pv: 9800, amt: 2290},
    {name: 'Page D', uv: 2780, pv: 3908, amt: 2000},
    {name: 'Page E', uv: 1890, pv: 4800, amt: 2181},
    {name: 'Page F', uv: 2390, pv: 3800, amt: 2500},
    {name: 'Page G', uv: 3490, pv: 4300, amt: 2100},
];

const data01 = [{name: '18 - 25', value: 400}, {name: '25 - 35', value: 300},
    {name: '35 - 45', value: 300}, {name: '45 - 55', value: 200},
    {name: '55 - 65', value: 278}, {name: '65 - 75', value: 189}]

const DashboardScreen = () => (
    <div className='row'>
        <div className='col-md-4'>
            <Card
                title='Revenue'
                text={(
                    <ResponsiveContainer width='100%' height={300}>
                        <BarChart height={300} data={data}
                                  margin={{top: 20, right: 20, left: 20, bottom: 20}}>
                            <XAxis dataKey="name"/>
                            <YAxis/>
                            <CartesianGrid strokeDasharray="3 3"/>
                            <Tooltip/>
                            <Legend />
                            <Bar dataKey="pv" stackId="a" fill="#8884d8" />
                            <Bar dataKey="uv" stackId="a" fill="#82ca9d" />
                        </BarChart>
                    </ResponsiveContainer>
                )}
            />
        </div>
        <div className='col-md-4'>
            <Card
                title='Visitors'
                text={(
                    <ResponsiveContainer width='100%' height={300}>
                        <LineChart height={300} data={data}
                                   margin={{top: 20, right: 20, left: 20, bottom: 20}}>
                            <XAxis dataKey="name"/>
                            <YAxis/>
                            <CartesianGrid strokeDasharray="3 3"/>
                            <Tooltip/>
                            <Legend />
                            <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{r: 8}}/>
                            <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
                        </LineChart>
                    </ResponsiveContainer>
                )}
            />
        </div>
        <div className='col-md-4'>
            <Card
                title='Age Breakdown'
                text={(
                    <ResponsiveContainer width='100%' height={300}>
                        <PieChart height={300}>
                            <Pie isAnimationActive={false} data={data01} cx='50%' cy={150} outerRadius={100} fill="#8884d8" label dataKey='value' />
                            <Tooltip/>
                        </PieChart>
                    </ResponsiveContainer>
                )}
            />
        </div>
    </div>
);

export default DashboardScreen;
