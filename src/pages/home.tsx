import dynamic from 'next/dynamic';
import { Fragment, useState, useEffect, useContext } from 'react';
import { Select, Skeleton, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { Section } from 'components/ui/templates/Section';
import { Container } from 'components/ui/templates/Container';
import { Paragraph } from 'components/ui/templates/Paragraph';
import Link from 'next/link';
import axios from 'axios';
import { AuthContext } from './_app';

const Home = () => {
    const DynamicColumnChart: any = dynamic(() => import('../components/ui/BarChart'), { ssr: false });

    const { token, dispatch } = useContext(AuthContext)
    const [report, setReport] = useState([])
    const [loading, setLoading] = useState(true)

    console.log("token", token);
    
    interface Report {
        created_at: string,
        income: string,
        total: number,
    }

    const date: string[] = report.map((e: Report) => e.created_at);
    const income: string[] = report.map((e: Report) => e.income);
    const total: number[] = report.map((e: Report) => e.total);

    const topSell = [...report].sort((a: any, b: any) => {
        return b.income - a.income;
    });

    useEffect(() => {
        if (token != null) {
            reportProduct()
        }
    }, []);

    const reportProduct = () => {
        axios.get('https://belaundry-api.sebaris.link/platform/product/report', {
            headers: { token: `${token}` }
        })
            .then((res) => {
                setReport(res.data)
                setLoading(false)
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const selectChanege = (value: string) => {
        console.log(`selected ${value}`);
    };

    interface DataType {
        created_at: string,
        income: string,
        total: number,
    }

    const columns: ColumnsType<DataType> = [
        {
            title: 'Date',
            dataIndex: 'created_at',
            key: 'date',
        },
        {
            title: 'Value',
            dataIndex: 'income',
            key: 'income',
            align: 'right',
            render: (text) => <a>{`$ ${text}`}</a>,
        },
    ];

    const data: DataType[] = topSell

    return (
        <Fragment>
            <div className="grid grid-cols-1 bg-white shadow-sm rounded-xl mt-9 px-6 py-5">
                <Skeleton loading={loading}>
                    <div className=' border-b-2 border-gray-200 pb-4 flex justify-between mb-4'>
                        <p className=' font-bold'>Product Sold</p>
                        <Select
                            defaultValue="thisWeek"
                            style={{ width: 150, }}
                            onChange={selectChanege}
                            options={[
                                { value: 'thisWeek', label: 'This week' },
                                { value: 'lastWeek', label: 'Last week' },
                                { value: 'thisMonth', label: 'This month' },
                                { value: 'lastMonth', label: 'Last month' },
                            ]}
                        />
                    </div>
                    <div className='mt-4'>
                        <DynamicColumnChart date={date} total={total} />
                    </div>
                </Skeleton>
            </div>
            <div className="md:w-4/12 bg-white shadow-sm rounded-xl mt-9 px-6 py-5">
                <Skeleton loading={loading}>
                    <div className=' border-b-2 border-gray-200 pb-4 flex justify-between mb-4'>
                        <p className=' font-bold'>Top selling product</p>
                        <Select
                            defaultValue="thisWeek"
                            style={{ width: 150, }}
                            onChange={selectChanege}
                            options={[
                                { value: 'thisWeek', label: 'This week' },
                                { value: 'lastWeek', label: 'Last week' },
                                { value: 'thisMonth', label: 'This month' },
                                { value: 'lastMonth', label: 'Last month' },
                            ]}
                        />
                    </div>
                    <div className='mt-4'>
                        <Table columns={columns} dataSource={data} pagination={false} />
                    </div>
                </Skeleton>
            </div>
            <footer>
                <Section>
                    <Container center>
                        <Paragraph>
                            Created by{" "}
                            <Link href="https://www.linkedin.com/in/fakhrialfatah/">
                                Fakhri Al Fatah
                            </Link>
                        </Paragraph>
                    </Container>
                </Section>
            </footer>
        </Fragment>
    );
};

export default Home;
