import { createContext, useContext, useState } from 'react';

// Membuat context
const AuthContext = createContext<{
  token: string | null;
  loginData: any; // Ganti any dengan tipe data yang sesuai dengan data login
  setAuthData: (token: string | null, loginData: any) => void;
}>({
  token: null,
  loginData: null,
  setAuthData: () => {},
});

// Membuat fungsi provider
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [loginData, setLoginData] = useState<any>(null); // Ganti any dengan tipe data yang sesuai dengan data login

  // Fungsi untuk menyimpan token dan data login
  const setAuthData = (newToken: string | null, newLoginData: any) => {
    setToken(newToken);
    setLoginData(newLoginData);
  };

  return (
    <AuthContext.Provider value={{ token, loginData, setAuthData }}>
      {children}
    </AuthContext.Provider>
  );
}

// Membuat fungsi custom hook untuk menggunakan context
export function useAuthContext() {
  return useContext(AuthContext);
}
