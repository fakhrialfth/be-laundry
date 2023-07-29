import { useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const BarChart = (date: any) => {
    console.log("date", date);
    interface ChartOptions {
        chart: {
            id: string;
        };
        xaxis: {
            categories: string[];
        };
    }
    interface ChartSeries {
        name: string;
        data: number[];
    }

    const options: ChartOptions = {
        chart: {
            id: 'basic-column'
        },
        xaxis: {
            categories: date.date
        }
    }

    const series: ChartSeries[] = [{
        name: 'Total',
        data: date.total
    }];

    return (
        <>
            <ReactApexChart options={options} series={series} type="bar" height={350} />
        </>
    );
};

export default BarChart;
