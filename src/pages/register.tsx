import { NextPage } from 'next'
import { Checkbox, Input, notification } from 'antd';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import Link from 'next/link'
import { useState, useContext } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import { RequiredTooltip } from 'components/ui/RequiredTooltip';
import { AuthContext } from './_app';

const Register: NextPage = () => {
    const router = useRouter()
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [chceked, setChecked] = useState(false)
    const [loading, setLoading] = useState(false)
    const [api, contextHolder] = notification.useNotification();

    const { dispatch } = useContext(AuthContext)

    const openNotificationWithIcon = (description: string) => {
        api['error']({
            message: 'Error Registing',
            description: description,
        });
    };
    const successNotification = (description: string) => {
        api['success']({
            message: description,
        });
    };
    const requiredNotification = (description: string) => {
        api['error']({
            message: description,
        });
    };

    const changeName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value)
    }
    const changePhone = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPhone(e.target.value)
    }
    const changeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
    }
    const changePass = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
    }
    const changeChecked = (e: CheckboxChangeEvent) => {
        setChecked(e.target.checked)
    };

    const payLoad = {
        name: name,
        phone: phone,
        email: email,
        password: password,
    }
    const requestHeaders = {
        'Content-Type': 'application/json',
    };

    const register = (e: React.FormEvent) => {
        e.preventDefault();
        if (name === "") {
            requiredNotification('Name is required!')
        } else if (email === "") {
            requiredNotification('Email is required!')
        } else if (password === "") {
            requiredNotification('Password is required!')
        }
        else if (chceked === false) {
            requiredNotification('You must accept the Terms and Conditions!')
        } else {
            axios.post('https://belaundry-api.sebaris.link/platform/user/sign-up', payLoad, { headers: requestHeaders })
                .then((res) => {
                    if (res.data.status === true) {
                        dispatch({
                            type: "LOGIN",
                            response: res.data.token,
                        })
                        successNotification(res.data.message)
					setLoading(true)
                        router.push("/home");
                    } else {
                        openNotificationWithIcon(res.data.message)
                    }
                })
                .catch((error) => {
                    console.error(error);
                    openNotificationWithIcon('An error occurred while registing the account. Please try again!')
                });
        }
    };

    return (
        <>
            {contextHolder}
            <section className="bg-gray-50 dark:bg-gray-900">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <div className="flex items-center mb-6 text-2xl font-bold text-gray-900 dark:text-white">
                        BeLaundry
                    </div>
                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Create and account
                            </h1>
                            <form className="space-y-4 md:space-y-6" action="#">
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name <RequiredTooltip /></label>
                                    <Input onChange={changeName} name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Your name" required />
                                </div>
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone</label>
                                    <Input onChange={changePhone} type="number" name="phone" id="phone" placeholder="phone" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                                </div>
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email <RequiredTooltip /></label>
                                    <Input onChange={changeEmail} type="email" name="email" id="email" placeholder="name@company.com" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                                </div>
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password <RequiredTooltip /></label>
                                    <Input.Password onChange={changePass} visibilityToggle={{ visible: passwordVisible, onVisibleChange: setPasswordVisible }} type="password" name="password" id="password" placeholder="password" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required={true} />
                                </div>
                                <div className="flex items-start">
                                    <div className="flex items-center h-5">
                                        <Checkbox onChange={changeChecked} />
                                    </div>
                                    <div className="ml-3 text-sm">
                                        <label className="font-light text-gray-500 dark:text-gray-300">I accept the <a className="font-medium text-primary-600 hover:underline dark:text-primary-500" href="#">Terms and Conditions</a></label>
                                    </div>
                                </div>
                                <button onClick={register} type="submit" className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">{loading ? "...loading" : "Create an account"}</button>
                                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                    Already have an account? <Link href="/" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Login here</Link>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Register