import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import ManagmentForm from "../Forms/ManagmentForm";
import { useEffect, useState } from "react";

import {
  useActionData,
  useLoaderData,
  Link,
  useRevalidator,
} from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import EditForm from "../Forms/Edit";
import ManagmentTable from "../Tables/ManagmentTable";

import { useManagmentContext } from "../../context/ManagmentContext";

function Managment() {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const actionData = useActionData();
  const revalidator=useRevalidator();
  const { setEnableEditForm, enableEditForm, curRowId, formData,handleAddProduct,handleDelete } =
    useManagmentContext();
     //this is to get the data from the supabase and i am using react router loader to get the data
  const loaderData = useLoaderData();
  const productData= loaderData ? loaderData?.user_products : [];

  async function deleteAndRevalidate(id){
    await handleDelete(id);
    revalidator.revalidate();
  }
  
  
  //this effect is related if when the user submits the productrun dev
  useEffect(() => {
    if (!actionData) return;
    if (actionData?.success) {
      toast.success(`${actionData?.message}`, {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        theme: "dark",
      });
      if (actionData.kind === "edit") {
        setEnableEditForm((curStatus) => !curStatus);
      } else {
        setIsFormVisible((curStatus) => !curStatus);
      }
    }

    if (!actionData?.success) {
      toast.error(`${actionData?.error}`, {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        theme: "dark",
      });
    }
  }, [actionData]);

 

  return (
    <section className="managment">
      <ToastContainer />
      {productData?.length > 0 && (
        <div className="w-full h-[95vh] flex md:flex-col gap-2">
          <ManagmentTable productData={productData} deleteAndRevalidate={deleteAndRevalidate} />
          <div className="flex justify-end">
            <button
              onClick={() => handleAddProduct(setIsFormVisible)}
              className="mr-2 shadow-box hover:cursor-pointer rounded-xl md:py-2 md:px-10 text-[1.2rem] bg-[#6F4FED] text-white hover:text-[#6F4FED] hover:bg-gray-100 transition-all ease-in duration-100"
            >
              Add Product
            </button>
          </div>
          
        </div>
      )}

      {isFormVisible && <ManagmentForm formStatus={setIsFormVisible} />}
      {enableEditForm && (
        <EditForm
          formStatus={setEnableEditForm}
          id={curRowId}
          formData={formData}
        />
      )}
      {productData?.length == 0 && (
        <div className="w-full h-full flex justify-center" >
          <div className="w-[50%] h-full flex md:flex-col md:justify-center md:items-center gap-5">
            <h1 className="text-[2.5rem] font-bold text-[#565758] ">
              Manage your business here.
            </h1>
            <button
              onClick={() => handleAddProduct(setIsFormVisible)}
              className=" shadow-box hover:cursor-pointer rounded-3xl md:py-2 md:px-10 text-[1.2rem] bg-[#6F4FED] text-white"
            >
              Add Product
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

export default Managment;
