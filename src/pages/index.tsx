import { NextPage } from 'next'
import { Input } from 'antd';
import Link from 'next/link'
import { SyntheticEvent, useState } from 'react'
import { useRouter } from 'next/router'
// import axios from 'axios'
// import { deleteCookie, getCookie } from 'cookies-next'

const Login: NextPage = () => {
	const router = useRouter()
	const [submitting, setSubmitting] = useState(false)
	const [passwordVisible, setPasswordVisible] = useState(false);

	const getRedirect = () => {
		// const redirect = getCookie('redirect')
		// if (redirect) {
		//   deleteCookie('redirect')
		//   return redirect.toString()
		// }

		return '/'
	}

	const login = async (e: SyntheticEvent) => {
		console.log(e);
		e.stopPropagation()
		e.preventDefault()

		setSubmitting(true)

		// const res = await axios.post('api/mock/login')
		// if (res.status === 200) {
		//   router.push(getRedirect())
		// }
		// setSubmitting(false)
	}

	return (
		<div className="bg-light min-vh-100 d-flex flex-col items-center justify-center dark:bg-transparent">
			<div className="flex flex-col items-center justify-center rounded-lg px-6 py-8 mx-auto md:h-screen lg:py-0 w-full md:w-2/3">
				<div className="flex items-center mb-6 text-2xl font-bold text-gray-900 dark:text-white">
					BeLaundry
				</div>
				<div className="flex flex-col md:flex-row bg-white shadow dark:border dark:bg-gray-800 dark:border-gray-700">
					<div className="md:w-6/12 p-6 space-y-4 md:space-y-6 sm:p-8">
						<h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
							Sign in to your account
						</h1>
						<form onSubmit={login} className="space-y-4 md:space-y-6">
							<div>
								<label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
								<Input type='email' name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required={true} />
							</div>
							<div>
								<label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
								<Input.Password visibilityToggle={{ visible: passwordVisible, onVisibleChange: setPasswordVisible }} type="password" name="password" id="password" placeholder="password" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required={true} />
							</div>
							<div className="flex items-center justify-between">
								<div className="flex items-start">
									<div className="flex items-center h-5">
										<input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required={false} />
									</div>
									<div className="ml-3 text-sm">
										<label className="text-gray-500 dark:text-gray-300">Remember me</label>
									</div>
								</div>
								<a href="#" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</a>
							</div>
							<button type="submit" className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign in</button>
							<p className="text-sm font-light text-gray-500 dark:text-gray-400">
								Don’t have an account yet? <a href="#" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</a>
							</p>
						</form>
					</div>
					<div className="md:w-6/12 bg-blue-700 text-white shadow dark:border dark:bg-gray-800 dark:border-gray-700 flex items-center justify-center">
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
		</div>
	)
}

export default Login