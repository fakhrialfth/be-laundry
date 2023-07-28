import 'styles/global.css';
import type {AppProps} from 'next/app'
import { Dispatch, Fragment, SetStateAction, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import {DefaultLayout} from "components/ui/layouts/Default";

const App = ({Component, pageProps}: AppProps) => {
    const [isActivePath, setIsActivePath] = useState("");
	const router = useRouter(); 
	const { pathname } = router; 

	useEffect(() => {
		console.log("path", pathname);
		setIsActivePath(pathname)
	}, [pathname]);

    const isLoginOrRegister = isActivePath === "/" || isActivePath === "/register";

    return isLoginOrRegister ? <Component {...pageProps} /> : <DefaultLayout>
        <Component {...pageProps} />
    </DefaultLayout>
}

export default App