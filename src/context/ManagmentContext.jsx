import { createContext, useContext, useState } from "react";
import { getRowData } from "../Business-Logic/Managment/editProduct";
import { deleteRecord } from "../Business-Logic/Managment/deleteEntry";

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
      }}
    >
      {children}
    </ManagmentContext.Provider>
  );
}
export function useManagmentContext() {
  return useContext(ManagmentContext);
}
