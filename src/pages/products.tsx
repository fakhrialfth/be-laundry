// import { isEqual, uniqWith } from 'lodash'
import { Fragment, useEffect, useState, useContext } from "react";
import { Table, Input, message, Skeleton, Space, Tooltip, Radio, Button, Modal } from "antd";
import type { RadioChangeEvent } from 'antd';
import type { ColumnsType, TableProps } from 'antd/es/table';
import { Section } from "components/ui/templates/Section";
import { Container } from "components/ui/templates/Container";
import { H1, H2, H3 } from "components/ui/templates/headings";
import { Subtitle } from "components/ui/templates/Subtitle";
import { Paragraph } from "components/ui/templates/Paragraph";
import Image from 'next/image';
import Link from 'next/link';
import { AiOutlineClose, AiFillEdit, AiFillDelete, AiOutlinePlus } from "react-icons/ai";
import axios from "axios";
import { AuthContext } from "./_app";
import Swal from "sweetalert2";

const Dashboard = () => {
    const [products, setProduct] = useState([]);
    const [category, setCategory] = useState([]);

    const [productName, setProductName] = useState("");
    const [description, setDesciption] = useState("");
    const [sku, setSku] = useState("");
    const [stock, setStock] = useState("");
    const [idCategory, setIdCategory] = useState("1");
    const [price, setPrice] = useState("");
    const [image, setImage] = useState("");
    const [selectedProduct, setSelectedProduct] = useState<SelectedProduct>({
        id: "",
        name: "",
        sku: "",
        price: 0,
        stock: 0,
        category_id: "1",
        image: "",
        description: "",
    });
    console.log("record", selectedProduct);

    const [messageApi, contextHolder] = message.useMessage();
    const [loading, setLoading] = useState(true)
    const { Search } = Input;
    const { TextArea } = Input;
    const { token, dispatch } = useContext(AuthContext)

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [viewAddProduct, setViewAddProduct] = useState(false);
    const [viewEdit, setViewEdit] = useState(false)

    
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
    useEffect(() => {
        getProduct()
        getCategory()
    }, [token]);

    interface SelectedProduct {
        id: number | string;
        name: string;
        sku: string;
        price: number | string;
        stock: number;
        category_id: string;
        image: string;
        description: string;
    }

    // Set view page
    const showAddProduct = () => {
        setViewAddProduct(true);
    }
    const showProduct = () => {
        setViewAddProduct(false);
        setViewEdit(false);
        setSelectedProduct({
            id: "",
            name: "",
            sku: "",
            price: 0,
            stock: 0,
            category_id: "1",
            image: "",
            description: "",
        });
        setProductName("");
        setDesciption("");
        setSku("");
        setStock("");
        setIdCategory("1")
        setPrice("");
        setImage("");
    }
    const editForm = (record: any) => {
        console.log(record);
        setViewEdit(true);
        setSelectedProduct(record);
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
                            onClick={() => editForm(record)}
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
                console.log("length", res);
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
        const value = e.currentTarget.value
        setProductName(e.target.value);
        setSelectedProduct((prevSelectedProduct) => ({
            ...prevSelectedProduct,
            name: value,
        }));
    };
    const changeDescription = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.currentTarget.value
        setDesciption(e.target.value);
        setSelectedProduct((prevSelectedProduct) => ({
            ...prevSelectedProduct,
            description: value,
        }));
    };
    const changeSku = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.currentTarget.value
        setSku(e.target.value);
        setSelectedProduct((prevSelectedProduct) => ({
            ...prevSelectedProduct,
            sku: value,
        }));
    };
    const changeStock = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value: any = e.target.value
        setStock(e.target.value);
        setSelectedProduct((prevSelectedProduct) => ({
            ...prevSelectedProduct,
            stock: value,
        }));
    };
    const changeIdCategory = (e: React.MouseEvent<HTMLButtonElement>) => {
        const value = e.currentTarget.value
        setIdCategory(e.currentTarget.value);
        setSelectedProduct((prevSelectedProduct) => ({
            ...prevSelectedProduct,
            category_id: value,
        }));
    };
    const changePrice = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.currentTarget.value
        setPrice(e.target.value);
        setSelectedProduct((prevSelectedProduct) => ({
            ...prevSelectedProduct,
            price: value,
        }));
    };

    const handleUploadChange = async (e: any) => {
        console.log("test", e);
        let uploaded = e.target.files[0];
        const base64: any = await convertBase64(uploaded);
        console.log(base64);
        setImage(base64);
    };
    const convertBase64 = (uploaded: any) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(uploaded);

            fileReader.onload = () => {
                resolve(fileReader.result);
            };

            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    };
    const payLoad = {
        name: productName,
        description: description,
        sku: sku,
        stock: stock,
        category_id: idCategory,
        price: price,
        image: ''
    }
    const payLoadEdit = {
        name: selectedProduct.name,
        description: selectedProduct.description,
        sku: selectedProduct.sku,
        stock: selectedProduct.stock,
        category_id: selectedProduct.category_id,
        price: selectedProduct.price,
        image: selectedProduct.image
    }
    const requestHeaders = {
        token: `${token}`
    };

    const addProduct = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("payload", payLoad);
        axios.post('https://belaundry-api.sebaris.link/platform/product', payLoad, { headers: requestHeaders })
            .then((res) => {
                console.log("upload", res);
                if (res.data.status === true) {
                    setViewAddProduct(false)
                    Swal.fire(
                        res.data.message, productName,
                        "success"
                    );
                    getProduct()
                    showProduct()
                } else {
                    Swal.fire("Error insert product, value cannot be empty", "Error");
                }
            })
            .catch((error) => {
                console.error(error);
                Swal.fire("Error when fetching data", "Error")
            });
    };

    const editProduct = () => {
        console.log("payload", payLoadEdit);
        axios.put(`https://belaundry-api.sebaris.link/platform/product/${selectedProduct.id}`, payLoadEdit, { headers: requestHeaders })
            .then((res) => {
                console.log("upload", res);
                if (res.data.status === true) {
                    setViewEdit(false)
                    Swal.fire(
                        res.data.message, selectedProduct.name,
                        "success"
                    );
                    getProduct()
                    showProduct()
                } else {
                    Swal.fire("Error update product, please double check your data", "Error");
                }
            })
            .catch((error) => {
                console.error(error);
                Swal.fire("Error when fetching data", "Error")
            });
    };

    const deleteProduct = (record: any) => {
        Swal.fire({
            title: "Are you sure to delete the product?",
            text: "",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            cancelButtonText: "Cancel",
            confirmButtonText: "Delete",
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`https://belaundry-api.sebaris.link/platform/product/${record.id}`, { headers: requestHeaders })
                    .then((res) => {
                        console.log("delete", res);
                        if (res.data.status === true) {
                            Swal.fire(
                                res.data.message,
                                "Deleted product " + record.name,
                                "success"
                            );
                            getProduct()
                        } else {
                            Swal.fire("Error delete product, id notfound", "Error");
                        }
                    })
                    .catch((error) => {
                        console.error(error);
                        Swal.fire("Error when fetching data", "Error");
                    });
            }
        });
    }

    return (
        <Fragment>
            {contextHolder}

            {viewAddProduct ?
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
                                            <Input value={productName} onChange={(e: any) => changeProduct(e)} placeholder="product name" className="sm:text-sm p-2.5" />
                                        </div>
                                        <div>
                                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                                            <TextArea value={description} onChange={(e: any) => changeDescription(e)} rows={4} placeholder="description" className="sm:text-sm p-2.5" />
                                        </div>
                                        <div className="flex">
                                            <div className="w-full md:w-3/12 mb-3 md:mb-0">
                                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">SKU</label>
                                                <Input value={sku} onChange={(e: any) => changeSku(e)} placeholder="sku" className="sm:text-sm p-2.5" />
                                            </div>
                                            <div className="ml-3 w-full md:w-3/12 mb-3 md:mb-0">
                                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Stock</label>
                                                <Input value={stock} onChange={(e: any) => changeStock(e)} type="number" placeholder="stock" className="sm:text-sm p-2.5" />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category</label>
                                            <div className="flex items-start md:w-12/12 mb-4">
                                                {category?.map((e: any, i: number) => {
                                                    return (
                                                        <button value={e.id} key={i} onClick={changeIdCategory}
                                                            className={idCategory == e.id ? "bg-sky-600 border-none hover:text-white hover:bg-sky-600 text-white mr-2 px-2 py-1 rounded-md font-medium text-sm" :
                                                                "bg-sky-400 border-none hover:text-white hover:bg-sky-600 text-white mr-2 px-2 py-1 rounded-md font-medium text-sm"} >
                                                            {e.name}
                                                        </button>
                                                    )
                                                })}
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Price</label>
                                        </div>
                                        <div className="flex flex-wrap justify-between items-center">
                                            <div className="w-full md:w-3/12 mb-3 md:mb-0">
                                                <Input value={price} onChange={(e: any) => changePrice(e)} placeholder="price" className="sm:text-sm p-2.5" />
                                            </div>
                                            <div className="w-full md:w-auto">
                                                <button onClick={addProduct} className=" w-full bg-green-400 border-none hover:text-white hover:bg-green-500 text-white px-6 py-3 rounded-md font-medium text-sm">
                                                    Publish
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="md:w-1/4 text-black dark:bg-gray-800 dark:border-gray-700 md:mt-5">
                                        <div className="md:h-48 border-dashed border-2 border-sky-400 rounded-md bg-white p-6 space-y-4 grid text-center items-center">
                                            <label htmlFor="formFile" className="w-full h-full cursor-pointer flex flex-col items-center">
                                                {image === "" ?
                                                    <Image src={'/image.png'} alt={'Ferox'} width={120} height={120} />
                                                    :
                                                    <img src={image} width={120} height={120}></img>
                                                }
                                                <input
                                                    onChange={handleUploadChange}
                                                    name="image"
                                                    className="hidden"
                                                    type="file"
                                                    id="formFile"
                                                    accept="image/*"
                                                />
                                                <h2 className="font-bold leading-tight tracking-tight text-sky-600 md:text-sm md:mt-2 dark:text-white mb-4">
                                                    Upload image here
                                                </h2>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </main>
                    </Skeleton>
                </div> :
                viewEdit ?
                    <div className="grid grid-cols-1 bg-white shadow-sm rounded-xl mt-9 px-6 py-5">
                        <Skeleton loading={loading}>
                            <main>
                                <div className="px-4 mb-6 flex justify-between">
                                    <H3 className="text-sky-600">
                                        Edit Product
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
                                                <Input value={selectedProduct.name} onChange={(e: any) => changeProduct(e)} placeholder="product name" className="sm:text-sm p-2.5" />
                                            </div>
                                            <div>
                                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                                                <TextArea value={selectedProduct.description} onChange={(e: any) => changeDescription(e)} rows={4} placeholder="description" className="sm:text-sm p-2.5" />
                                            </div>
                                            <div className="flex">
                                                <div className="w-full md:w-3/12 mb-3 md:mb-0">
                                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">SKU</label>
                                                    <Input value={selectedProduct.sku} onChange={(e: any) => changeSku(e)} placeholder="sku" className="sm:text-sm p-2.5" />
                                                </div>
                                                <div className="ml-3 w-full md:w-3/12 mb-3 md:mb-0">
                                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Stock</label>
                                                    <Input value={selectedProduct.stock} onChange={(e: any) => changeStock(e)} type="number" placeholder="stock" className="sm:text-sm p-2.5" />
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category</label>
                                                <div className="flex items-start md:w-12/12 mb-4">
                                                    {category?.map((e: any, i: number) => {
                                                        return (
                                                            <button value={e.id} key={i} onClick={changeIdCategory}
                                                                className={selectedProduct.category_id == e.id ? "bg-sky-600 border-none hover:text-white hover:bg-sky-600 text-white mr-2 px-2 py-1 rounded-md font-medium text-sm" :
                                                                    "bg-sky-400 border-none hover:text-white hover:bg-sky-600 text-white mr-2 px-2 py-1 rounded-md font-medium text-sm"} >
                                                                {e.name}
                                                            </button>
                                                        )
                                                    })}
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Price</label>
                                            </div>
                                            <div className="flex flex-wrap justify-between items-center">
                                                <div className="w-full md:w-3/12 mb-3 md:mb-0">
                                                    <Input value={selectedProduct.price} onChange={(e: any) => changePrice(e)} placeholder="price" className="sm:text-sm p-2.5" />
                                                </div>
                                                <div className="w-full md:w-auto">
                                                    <button onClick={editProduct} className=" w-full bg-green-400 border-none hover:text-white hover:bg-green-500 text-white px-6 py-3 rounded-md font-medium text-sm">
                                                        Edit Product
                                                    </button>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="md:w-1/4 text-black dark:bg-gray-800 dark:border-gray-700 md:mt-5">
                                            <div className="md:h-48 border-dashed border-2 border-sky-400 rounded-md bg-white p-6 space-y-4 grid text-center items-center">
                                                <label htmlFor="formFile" className="w-full h-full cursor-pointer flex flex-col items-center">
                                                    {image === "" && selectedProduct.image != "" ?
                                                        <img alt="image" src={selectedProduct.image} width={120} height={120}></img>
                                                        : image === "" && selectedProduct.image === "" ?
                                                        <Image alt="image" src={'/image.png'} width={120} height={120} />
                                                        : <Image alt="image" src={image} width={120} height={120}></Image>
                                                    }
                                                    <input
                                                        onChange={handleUploadChange}
                                                        name="image"
                                                        className="hidden"
                                                        type="file"
                                                        id="formFile"
                                                        accept="image/*"
                                                    />
                                                    <h2 className="font-bold leading-tight tracking-tight text-sky-600 md:text-sm md:mt-2 dark:text-white mb-4">
                                                        Upload image here
                                                    </h2>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </main>
                        </Skeleton>
                    </div>
                    :
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
            }

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
