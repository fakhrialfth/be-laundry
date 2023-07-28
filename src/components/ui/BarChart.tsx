import { useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const BarChart = () => {

    const [products, setProducts] = useState([])

    interface Product {
        id: number;
        title: string;
        description: string;
        price: number;
        discountPercentage: number;
        rating: number;
        stock: number;
        brand: string;
        category: string;
        thumbnail: string;
        images: string[];
    }

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

    const brands: string[] = ["11/05", "12/05", "13/05"];
    const stock: number[] = [10, 9, 13];

    const options: ChartOptions = {
        chart: {
            id: 'basic-column'
        },
        xaxis: {
            categories: brands
        }
    }

    const series: ChartSeries[] = [{
        name: 'Sold',
        data: stock
    }];

    return (
        <>
            <ReactApexChart options={options} series={series} type="bar" height={350} />
        </>
    );
};

export default BarChart;
