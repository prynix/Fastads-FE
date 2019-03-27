import React from 'react'
import { PieChart, Pie, Cell } from 'recharts';
import styled from 'styled-components';

const GraphContainer = styled.div`
    display: flex;  
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #FFFFFF;
    width: 350px;
    height: auto;
    border-radius: 8px;
    margin: 15px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.35);
    .labels{
        display: flex;
        margin: 10px;
        .label{
            display: flex;
            align-items: center;
            margin-right: 10px;
            .circle{
                width: 10px;
                height: 10px;
                border-radius: 5px;
            }
            .chrome{
                background-color: #0088FE
            }
            .firefox{
                background-color: #FFBB28
            }
            .safari{
                background-color: #00C49F
            }
            .edge{
                background-color: #FF8042
            }
            .other{
                background-color: gray
            }
            p{
                margin-left: 5px;
                font-size: 0.7rem;
            }
        }
    }
`;

export const BrowserInfo = props => {
    const data = [
        { name: 'Chrome', value: props.data.chrome },
        { name: 'Safari', value: props.data.safari },
        { name: 'Firefox', value: props.data.firefox },
        { name: 'Edge', value: props.data.edge },
        { name: 'Other', value: props.data.other },
    ];
    
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#686868'];
    
    const RADIAN = Math.PI / 180;
    
    const renderCustomizedLabel = ({
        cx, cy, midAngle, innerRadius, outerRadius, percent, index,
    }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);
    
        return (
        <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
            {`${(percent * 100).toFixed(0)}%`}
        </text>
        );
    };

  return (
    <GraphContainer>
        <PieChart width={200} height={200}>
            <Pie
                data={data}
                cx={100}
                cy={100}
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
            >
            {
                data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
            }
            </Pie>
        </PieChart>
        <div className="labels">
            <div className="label">
                <div className="circle chrome"/>
                <p>Chrome</p>
            </div>
            <div className="label">
                <div className="circle firefox"/>
                <p>Firefox</p>
            </div>
            <div className="label">
                <div className="circle safari"/>
                <p>Safari</p>
            </div>
            <div className="label">
                <div className="circle edge"/>
                <p>Edge</p>
            </div>
            <div className="label">
                <div className="circle other"/>
                <p>Other</p>
            </div>
        </div>
    </GraphContainer>
  )
}
