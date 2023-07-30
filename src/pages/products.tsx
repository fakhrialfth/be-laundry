// import { isEqual, uniqWith } from 'lodash'
import { Fragment, useEffect, useState, useContext } from "react";
import { Table, Input, message, Skeleton, Space, Tooltip, Radio, Button } from "antd";
import type { RadioChangeEvent } from 'antd';
import type { ColumnsType, TableProps } from 'antd/es/table';
import { Section } from "components/ui/templates/Section";
import { Container } from "components/ui/templates/Container";
import { H1, H2, H3 } from "components/ui/templates/headings";
import { Subtitle } from "components/ui/templates/Subtitle";
import { Paragraph } from "components/ui/templates/Paragraph";
import Link from 'next/link';
import { AiOutlineClose, AiFillEdit, AiFillDelete } from "react-icons/ai";
import axios from "axios";
import { AuthContext } from "./_app";

const Dashboard = () => {
    const [products, setProduct] = useState([]);
    const [category, setCategory] = useState([]);

    const [productName, setProductName] = useState("");
    const [description, setDesciption] = useState("");
    const [sku, setSku] = useState("");
    const [stock, setStock] = useState("");
    const [idCategory, setIdCategory] = useState("1");
    const [price, setPrice] = useState("");

    const [radio, setRadio] = useState(1);
    const [messageApi, contextHolder] = message.useMessage();
    const [loading, setLoading] = useState(true)
    const { Search } = Input;
    const { TextArea } = Input;
    const { token, dispatch } = useContext(AuthContext)

    const [viewAddProduct, setViewAddProduct] = useState(false);

    useEffect(() => {
        getProduct()
        getCategory()
    }, [token]);

    const getProduct = () => {
        axios.get('https://belaundry-api.sebaris.link/platform/product', {
            headers: { token: `${token}` }
        })
            .then((res) => {
                console.log("product all", res);
                setLoading(false)
                setProduct(res.data.response)
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const getCategory = () => {
        axios.get('https://belaundry-api.sebaris.link/platform/product/categories', {
            headers: { token: `${token}` }
        })
            .then((res) => {
                console.log("category", res);
                setCategory(res.data.response)
            })
            .catch((error) => {
                console.error(error);
            });
    }

    // Set for data table
    interface DataType {
        name: string;
        sku: string;
        price: number;
        stock: number;
        category: string;
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

    const viewEditProduct = (record: any) => {

    }
    const deleteProduct = (record: any) => {

    }

    const categoryById = (id: string) => {
        switch (id) {
            case "1":
                return "Wash and Fold"
            case "2":
                return "Dry Clean"
            case "3":
                return "Home"
            case "4":
                return "Other"
            case "5":
                return "Other"
        }
    }
    const columns: ColumnsType<DataType> = [
        {
            title: 'Product Name',
            dataIndex: 'name',
            key: 'name',
            //   filters: title,
            onFilter: (value: string | number | boolean, record: any) => record.title.indexOf(value) === 0,
        },
        {
            title: 'Sku',
            dataIndex: 'sku',
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
            dataIndex: 'category_id',
            key: 'category',
            //   filters: category,
            render: (text) => <a>{categoryById(text)}</a>,
            // onFilter: (value: string | number | boolean, record: any) => record.category.indexOf(value) === 0,
        },
        {
            title: 'Action',
            key: 'action',
            align: 'center',
            render: (record: any) => (
                <Space size="middle">
                    <Tooltip title="Edit product">
                        <AiFillEdit
                            className=" text-blue-500 cursor-pointer"
                            onClick={() => viewEditProduct(record)}
                        />
                    </Tooltip>
                    <Tooltip title="Delete product">
                        <AiFillDelete
                            className=" text-red-500 cursor-pointer"
                            onClick={() => deleteProduct(record)}
                        />
                    </Tooltip>
                </Space>
            ),
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
        axios.get(`https://belaundry-api.sebaris.link/platform/product/${value}`, {
            headers: { token: `${token}` }
        })
            .then((res) => {
                console.log("length", res.data.response.length);
                console.log("length", res.data.response.length);
                let arr: any = []
                if (res.data.response != null && res.data.response.length == undefined) {
                    messageApi.open({
                        type: 'success',
                        content: 'Success get product',
                    });
                    arr.push(res.data.response)
                    setProduct(arr)
                } else if (res.data.response != null && res.data.response.length != undefined) {
                    messageApi.open({
                        type: 'success',
                        content: 'Success get product',
                    });
                    setProduct(res.data.response)
                } else {
                    messageApi.open({
                        type: 'error',
                        content: 'Product not found',
                    });
                    setProduct([])
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }

    // Add Function
    const changeProduct = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setProductName(e.target.value);
    };
    const changeDescription = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDesciption(e.target.value);
    };
    const changeSku = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setSku(e.target.value);
    };
    const changeStock = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setStock(e.target.value);
    };
    const changeIdCategory = (e: React.MouseEvent<HTMLButtonElement>) => {
        console.log(e.currentTarget.value);
        setIdCategory(e.currentTarget.value);
    };
    const changePrice = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setPrice(e.target.value);
    };
    const success = () => {
        messageApi.open({
            type: 'success',
            content: 'Success data has been added',
        });
    };
    const addProduct = () => {
        console.log("yuhuuuuu");


    }

    // Set view page
    const showAddProduct = () => {
        setViewAddProduct(true)
    }
    const showProduct = () => {
        setViewAddProduct(false)
    }
    const CreateProduct = () => {
        return (
            <div className="grid grid-cols-1 bg-white shadow-sm rounded-xl mt-9 px-6 py-5">
                <Skeleton loading={loading}>
                    <main>
                        <div className="px-4 mb-6 flex justify-between">
                            <H3 className="text-sky-600">
                                Add New Product
                            </H3>
                            <div>
                                <AiOutlineClose onClick={showProduct} className="text-sky-600 text-2xl cursor-pointer" />
                            </div>
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
                                        <div className="flex items-start md:w-12/12 mb-4">
                                            {category.map((e: any) => {
                                                return (
                                                    <button value={e.id} onClick={changeIdCategory}
                                                        className={idCategory == e.id ? "bg-sky-600 border-none hover:text-white hover:bg-sky-600 text-white mr-2 px-2 py-1 rounded-md font-medium text-sm" :
                                                            "bg-sky-400 border-none hover:text-white hover:bg-sky-600 text-white mr-2 px-2 py-1 rounded-md font-medium text-sm"} >
                                                        {e.name}
                                                    </button>
                                                )
                                            })}
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
    const ListProduct = () => {
        return (
            <div className="grid grid-cols-1 bg-white shadow-sm rounded-xl mt-9 px-6 py-5">
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
                                placeholder="find product by id"
                                onSearch={onSearch}
                            />
                        </div>

                        <div className="px-4">
                            <div className="flex justify-between mb-2">
                                <H3 className="text-sky-600">Product</H3>
                                <button onClick={showAddProduct} type="button" className="focus:outline-none text-white bg-sky-600 hover:bg-sky-700 focus:ring-4 focus:ring-sky-300 font-medium rounded-lg text-sm px-3 py-1 mb-2 dark:bg-sky-600 dark:hover:bg-sky-700 dark:focus:ring-sky-900">Add Product</button>
                            </div>
                            <Table
                                columns={columns}
                                dataSource={data}
                                onChange={onChange}
                            />
                        </div>
                    </main>
                </Skeleton>
            </div>
        )
    }

    return (
        <Fragment>
            {contextHolder}

            {viewAddProduct ? <CreateProduct /> : <ListProduct />}

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
