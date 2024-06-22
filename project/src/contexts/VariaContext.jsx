import { createContext, useContext, useState } from 'react';

export const VariaContext = createContext(null)

// eslint-disable-next-line react/prop-types
export const VariaProvider = ({ children }) => {
    const [varia, setVaria]=useState({requirements:"", mattress:"none", room:"", size:"140"})

    return (
        <VariaContext.Provider value={{
            varia, setVaria
        }}>
            {children}

        </VariaContext.Provider>
    )

}

export const useVariaContext = () => {
    return useContext(VariaContext);
}