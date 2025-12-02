import { createContext, useContext, useState } from "react";

const ManagmentContext= createContext();
export function ManagmentContextProvider({children}){
    const [productData,setProductData]=useState();
    const [formData,setFormData]=useState();
    
    return (<ManagmentContext.Provider value={{productData}}>
        {children}
    </ManagmentContext.Provider>)
}
export function useManagmentContext(){
    return useContext(ManagmentContext)
}