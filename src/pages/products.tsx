// import { isEqual, uniqWith } from 'lodash'
import { Fragment, useEffect, useState } from "react";
import { Table, Input, Modal, Row, Col, message, Skeleton } from "antd";
import type { ColumnsType, TableProps } from 'antd/es/table';
import { Section } from "components/ui/templates/Section";
import { Container } from "components/ui/templates/Container";
import { H1, H2, H3 } from "components/ui/templates/headings";
import { Subtitle } from "components/ui/templates/Subtitle";
import { Paragraph } from "components/ui/templates/Paragraph";
import Link from 'next/link';

const Dashboard = () => {
    const [products, setProduct] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [productName, setProductName] = useState("");
    const [brandName, setBrandName] = useState("");
    const [price, setPrice] = useState("");
    const [stock, setStock] = useState("");
    const [categoryName, setCategoryName] = useState("");
    const [messageApi, contextHolder] = message.useMessage();
    const [loading, setLoading] = useState(true)
    const { Search } = Input;
    const { TextArea } = Input;

    useEffect(() => {
        fetchProduct()
    }, []);
    const fetchProduct = () => {
        fetch("https://dummyjson.com/products/")
            .then(response => {
                return response.json()
            })
            .then(data => {
                console.log(data);
                setProduct(data.products)
                setLoading(false)
            })
            .catch(err => {
                console.log(err);
            })
    }

    // Set for data table
    interface DataType {
        key: string;
        title: string;
        brand: string;
        price: number;
        stock: number;
        category: number;
    }

    interface Item {
        title?: string,
        brand?: string,
        category?: string,

    }

    //   const titles = products.map((item: Item) => ({
    //     text: item.title,
    //     value: item.title,
    //   }));
    //   const title: any = uniqWith(titles, isEqual)
    //   console.log('jj', title);


    //   const brands = products.map((item: Item) => ({
    //     text: item.brand,
    //     value: item.brand,
    //   }));
    //   const brand: any = uniqWith(brands, isEqual)

    //   const categorys = products.map((item: Item) => ({
    //     text: item.category,
    //     value: item.category,
    //   }));
    //   const category: any = uniqWith(categorys, isEqual)

    const columns: ColumnsType<DataType> = [
        {
            title: 'Product Name',
            dataIndex: 'title',
            key: 'title',
            //   filters: title,
            onFilter: (value: string | number | boolean, record: any) => record.title.indexOf(value) === 0,
        },
        {
            title: 'Brand',
            dataIndex: 'brand',
            key: 'brand',
            //   filters: brand,
            onFilter: (value: string | number | boolean, record: any) => record.brand.indexOf(value) === 0,
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: 'Stock',
            dataIndex: 'stock',
            key: 'stock',
        },
        {
            title: 'Category',
            dataIndex: 'category',
            key: 'category',
            //   filters: category,
            onFilter: (value: string | number | boolean, record: any) => record.category.indexOf(value) === 0,
        },
        {
            title: 'Action',
            dataIndex: '',
            key: 'action',
        },
    ];

    const data: DataType[] = products
    const onChange: TableProps<DataType>['onChange'] = (
        pagination,
        filters,
        sorter,
        extra
    ) => {
        console.log('params', pagination, filters, sorter, extra);
    };

    // Search Function
    const onSearch = (value: string) => {
        console.log('value', value);
        fetch(`https://dummyjson.com/products/search?q=${value}`)
            .then(response => {
                return response.json()
            })
            .then(data => {
                console.log(data);
                setProduct(data.products)
            })
    }
    // Add Function
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const changeProduct = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setProductName(e.target.value);
    };
    const changeBrand = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setBrandName(e.target.value);
    };
    const changePrice = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setPrice(e.target.value);
    };
    const changeCategory = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setCategoryName(e.target.value);
    };
    const changeStock = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setStock(e.target.value);
    };

    const success = () => {
        messageApi.open({
            type: 'success',
            content: 'Success data has been added',
        });
    };
    const addProduct = () => {
        console.log("yuhuuuuu");

        fetch('https://dummyjson.com/products/add', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                title: productName,
                brand: brandName,
                price: price,
                stock: stock,
                category: categoryName
            })
        })
            .then(response => {
                return response.json()
            })
            .then(res => {
                success()
                handleCancel();
                setProductName("");
                setBrandName("");
                setPrice("");
                setCategoryName("");
                setStock("");
                console.log(res);
            })
            .catch(err => {
                console.log(err);
            })
    }

    const CreateProduct = () => {
        return (
            <div className="grid grid-cols-1 bg-white shadow-sm rounded-xl mt-9 px-6 py-5">
                <Skeleton loading={loading}>
                    <main>
                        <div className="px-4 mb-6">
                            <H3 className="text-sky-600">
                                Add New Product
                            </H3>
                        </div>
                        <div className="px-4">
                            <div className="flex flex-col md:flex-row">
                                <div className="md:w-3/4 space-y-1 md:space-y-2 sm:pr-8 mb-4">
                                    <div>
                                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product Name</label>
                                        <Input name="name" id="name" placeholder="product name" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required={true} />
                                    </div>
                                    <div>
                                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                                        <TextArea rows={4} name="description" id="description" placeholder="description" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required={true} />
                                    </div>
                                    <div className="flex">
                                        <div>
                                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">SKU</label>
                                            <Input name="sku" id="sku" placeholder="sku" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required={true} />
                                        </div>
                                        <div className="ml-3">
                                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Stock</label>
                                            <Input type="number" name="stock" id="stock" placeholder="stock" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required={true} />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category</label>
                                        <div className="flex items-start md:w-8/12">
                                            <Input name="sku" id="sku" placeholder="sku" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required={true} />
                                            <Input type="number" name="stock" id="stock" placeholder="stock" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required={true} />
                                        </div>
                                    </div>
                                    <button type="submit" className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign in</button>
                                </div>

                                <div className="md:w-1/4 bg-blue-700 text-white shadow dark:border dark:bg-gray-800 dark:border-gray-700 flex items-center justify-center">
                                    <div className="p-6 space-y-4 grid text-center content-center">
                                        <h2 className="text-xl font-bold leading-tight tracking-tight text-white md:text-2xl dark:text-white mb-4">
                                            Sign up
                                        </h2>
                                        <p>
                                            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                        </p>
                                        <Link href="/register">
                                            <button
                                                type="submit"
                                                className="w-2/4 text-white bg-blue-700 border-white border-2 hover:bg-white hover:text-blue-600 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                                            >
                                                Register Now
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>
                </Skeleton>
            </div>
        )
    }

    return (
        <Fragment>
            {contextHolder}
            <CreateProduct />
            {/* <div className="grid grid-cols-1 bg-white shadow-sm rounded-xl mt-9 px-6 py-5">
                <Skeleton loading={loading}>
                    <main>
                        <Section>
                            <Container>
                                <H1>
                                    <span className="text-sky-600">Product List</span>{" "}
                                </H1>
                                <Subtitle className="text-sky-300">You can manage the items you need below.</Subtitle>
                            </Container>
                        </Section>

                        <div className=" flex justify-end px-4 mb-5">
                            <Search
                                className="w-2/5"
                                placeholder="search product"
                                onSearch={onSearch}
                            />
                        </div>

                        <div className="px-4">
                            <div className="flex justify-between mb-2">
                                <H3 className="text-sky-600">Product</H3>
                                <button onClick={showModal} type="button" className="focus:outline-none text-white bg-sky-600 hover:bg-sky-700 focus:ring-4 focus:ring-sky-300 font-medium rounded-lg text-sm px-3 py-1 mb-2 dark:bg-sky-600 dark:hover:bg-sky-700 dark:focus:ring-sky-900">Add Product</button>
                            </div>
                            <Table
                                columns={columns}
                                dataSource={data}
                                onChange={onChange}
                            />
                        </div>
                    </main>
                </Skeleton>
            </div> */}
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

export default Dashboard;
