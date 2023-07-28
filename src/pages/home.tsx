import dynamic from 'next/dynamic';
import { Fragment, useState } from 'react';
import { Select, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { Section } from 'components/ui/templates/Section';
import { Container } from 'components/ui/templates/Container';
import { Paragraph } from 'components/ui/templates/Paragraph';
import Link from 'next/link';

const Home = () => {

    const DynamicColumnChart: any = dynamic(() => import('../components/ui/BarChart'), { ssr: false });

    const selectChanege = (value: string) => {
        console.log(`selected ${value}`);
    };

    interface DataType {
        key: string;
        name: string;
        value: string;
    }

    const columns: ColumnsType<DataType> = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Value',
            dataIndex: 'value',
            key: 'value',
            align: 'right',
        },
    ];

    const data: DataType[] = [
        {
            key: '1',
            name: 'John Brown',
            value: '50',
        },
        {
            key: '2',
            name: 'Jim Green',
            value: "42",
        },
        {
            key: '3',
            name: 'Joe Black',
            value: '38',
        },
    ];

    return (
        <Fragment>
            <div className="grid grid-cols-1 bg-white shadow-sm rounded-xl mt-9 px-6 py-5">
                <div className=' border-b-2 border-gray-200 pb-4 flex justify-between mb-4'>
                    <p className=' font-bold'>Product Sold</p>
                    <Select
                        defaultValue="lucy"
                        style={{ width: 150, }}
                        onChange={selectChanege}
                        options={[
                            { value: 'jack', label: 'Jack' },
                            { value: 'lucy', label: 'Lucy' },
                            { value: 'Yiminghe', label: 'yiminghe' },
                            { value: 'disabled', label: 'Disabled', disabled: true },
                        ]}
                    />
                </div>
                <div className='mt-4'>
                    <DynamicColumnChart />
                </div>
            </div>
            <div className="md:w-4/12 bg-white shadow-sm rounded-xl mt-9 px-6 py-5">
                <div className=' border-b-2 border-gray-200 pb-4 flex justify-between mb-4'>
                    <p className=' font-bold'>Top selling product</p>
                    <Select
                        defaultValue="lucy"
                        style={{ width: 150, }}
                        onChange={selectChanege}
                        options={[
                            { value: 'jack', label: 'Jack' },
                            { value: 'lucy', label: 'Lucy' },
                            { value: 'Yiminghe', label: 'yiminghe' },
                            { value: 'disabled', label: 'Disabled', disabled: true },
                        ]}
                    />
                </div>
                <div className='mt-4'>
                    <Table columns={columns} dataSource={data} pagination={false} />
                </div>
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
