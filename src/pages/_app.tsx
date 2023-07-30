import 'styles/global.css';
import type { AppProps } from 'next/app'
import { useEffect, useState, createContext, useReducer, Dispatch } from 'react';
import { useRouter } from 'next/router';
import { DefaultLayout } from "components/ui/layouts/Default";

// Tipe data untuk context
type AuthContextType = {
	isAuthenticated: boolean;
	token: string | null;
	dispatch: Dispatch<ActionType>;
};
// Nilai default untuk context
const initialState: AuthContextType = {
	isAuthenticated: false,
	token: null,
	dispatch: () => {},
};
// Buat context
export const AuthContext = createContext<AuthContextType>(initialState);
// Buat action types
type ActionType = {
	type: "LOGIN" | "LOGOUT" | "USER";
	response: string;
};
// Buat reducer
const reducer = (state: AuthContextType, action: ActionType) => {
	console.log("action", action);
	switch (action.type) {
		case "LOGIN":
			localStorage.setItem("token", action.response)
			return {
				...state,
				isAuthenticated: true,
				token: action.response
			}
		case "LOGOUT":
			localStorage.clear()
			return {
				...state,
				isAuthenticated: false,
			}
		default:
			return state;
	}
}

const App = ({ Component, pageProps }: AppProps) => {
	const [state, dispatch] = useReducer(reducer, initialState);
	const [isActivePath, setIsActivePath] = useState("");
	const router = useRouter();
	const { pathname } = router;

	useEffect(() => {
		console.log("path", pathname);
		setIsActivePath(pathname)
		if (pathname !== '/' && pathname!== '/register' && !state.token) {
			router.push('/');
		  }
	}, [pathname, state.token]);

	const isLoginOrRegister = isActivePath === "/" || isActivePath === "/register";

	return (
		<AuthContext.Provider value={{ ...state, dispatch }}>
			{isLoginOrRegister ? <Component {...pageProps} /> : <DefaultLayout>
				<Component {...pageProps} />
			</DefaultLayout>}
		</AuthContext.Provider>
	);
}

export default App;
