import { createContext, useContext, useState } from "react";
import { getRowData } from "../Business-Logic/Managment/editProduct";
import { deleteRecord } from "../Business-Logic/Managment/deleteEntry";
import { supabase } from "../../supabaseClient";

const ManagmentContext = createContext();
export function ManagmentContextProvider({ children }) {

  const [formData, setFormData] = useState();
  const [curRowId, setCurRowId] = useState();
  const [enableEditForm, setEnableEditForm] = useState(false);
  

  function handleAddProduct(actionFn) {
    actionFn((curStatus) => !curStatus);
  }

  //function to get the details of the row selected
  async function handleEditForm(id) {
    setCurRowId(id);
    const data = await getRowData(id);

    setFormData(data);
    setEnableEditForm((cur) => !cur);
  }
  //function to delete an record from the table
  const handleDelete = async (productId) => {
    try {
      await deleteRecord(productId);
    } catch (error) {
      console.log(error);
    }
  };
  //function to check weather we are having data added to the supabase
async function getManagmentData(){

let { data: user_products, error } = await supabase
  .from('user_products')
  .select('*')
  return user_products;
}

  return (
    <ManagmentContext.Provider
      value={{
        handleDelete,
        handleEditForm,
        handleAddProduct,
        formData,
        curRowId,
        enableEditForm,
        setEnableEditForm,
        getManagmentData
      }}
    >
      {children}
    </ManagmentContext.Provider>
  );
}
export function useManagmentContext() {
  return useContext(ManagmentContext);
}
