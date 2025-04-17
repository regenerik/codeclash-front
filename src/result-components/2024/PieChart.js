import React from 'react';
import ReactECharts from 'echarts-for-react';

const PieChart = () => {

    const option = {
        tooltip: { trigger: 'item', },
        legend: { orient: 'vertical', left: 'left', },
        series: [{
            name: 'Sales', type: 'pie', radius: '50%',
            chartData: [
                { value: 30, name: 'January' },
                { value: 20, name: 'February' },
                { value: 50, name: 'March' },
                { value: 60, name: 'April' },
                { value: 70, name: 'May' },
                { value: 90, name: 'June' },
            ],
            emphasis: {
                itemStyle: { shadowBlur: 10, shadowOffsetX: 0, shadowColor: 'rgba(0, 0, 0, 0.5)', },
            },
        },],
    };
    return <ReactECharts option={option} style={{ height: '400px', width: '100%' }} />;
};
export default PieChart;