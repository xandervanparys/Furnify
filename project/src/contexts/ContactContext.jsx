import { createContext, useContext, useState } from 'react';

export const ContactContext = createContext(null);

// eslint-disable-next-line react/prop-types
export const ContactProvider = ({ children }) => {
    const [contact, setContact]= useState({firstname: "", lastname: "", email: "", phone_number: {number: null, country: 'be'}, address: "", city: "", postcode: "", country: ""})

    return (
        <ContactContext.Provider
            value={{
                contact,
                setContact
            }}>
            {children}
        </ContactContext.Provider>
    )
}

export const useContactContext = () => {
    return useContext(ContactContext);
}