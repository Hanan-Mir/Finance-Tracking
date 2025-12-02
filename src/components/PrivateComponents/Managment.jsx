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
import { useActionData, useLoaderData, useRevalidator } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { deleteRecord } from "../../Business-Logic/Managment/deleteEntry";

function Managment() {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const actionData = useActionData();
  //this effect is related if when the user submits the product
  useEffect(() => {
    if (!actionData) return;
    if (actionData?.success) {
      toast.success(`${actionData?.message}`, {
        position: "top-center",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });
      setIsFormVisible((curStatus) => !curStatus);
    }

    if (!actionData?.success) {
      toast.error(`${actionData?.error}`, {
        position: "top-center",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });
    }
  }, [actionData]);
  function actionAddProduct() {
    setIsFormVisible((curStatus) => !curStatus);
  }
  //this is to get the data from the supabase and i am using react router loader to get the data
  const loaderData = useLoaderData();
  const productData=loaderData?loaderData?.user_products:[];
  const revalidator=useRevalidator();
  console.log(productData)
  const handleDelete=async(productId)=>{
    try{
      await deleteRecord(productId);
      revalidator.revalidate();
      
    }catch(error){
      console.log(error)
    }
  }

  return (
    <section className="managment">
      <ToastContainer />
     { productData.length>0 &&  <div className="w-full h-[95vh] flex md:flex-col gap-2">
        <TableContainer
          component={Paper}
          sx={{ overflowY:'auto' }}
        >
          <Table sx={{ minWidth: 600 }} stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>Product Name</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Vendor Name</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>
                  Contact Number
                </TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Email Address</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Manfacturing</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Unit</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Operation</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {productData.map((row) => (
                <TableRow >
                  <TableCell>{row.product_name}</TableCell>
                  <TableCell>{row.vendor_name}</TableCell>
                  <TableCell>{row.phone_number}</TableCell>
                  <TableCell>{row.email_address}</TableCell>
                  <TableCell>{row.manfacturing_type}</TableCell>
                  <TableCell>{row.unit}</TableCell>
                  <TableCell align='center' sx={{display:'flex',gap:2}}>
                  
                    <img onClick={()=>{handleDelete(row.id)}} src="/images/bin.png" alt="" className="w-5 hover:cursor-pointer" />
                    <img src="/images/edit.png" alt="" className="w-5 hover:cursor-pointer" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
        </TableContainer>
       <div className="flex justify-end" >
             <button
              onClick={() => actionAddProduct()}
              className="mr-2 shadow-box hover:cursor-pointer rounded-xl md:py-2 md:px-10 text-[1.2rem] bg-[#6F4FED] text-white"
            >
              Add Product
            </button>
          </div>
        
      </div>}
     
      {isFormVisible && <ManagmentForm formStatus={setIsFormVisible} />}
      {productData.length==0 && (
        <div className="w-full h-full flex justify-center">
          <div className="w-[50%] h-full flex md:flex-col md:justify-center md:items-center gap-5">
            <h1 className="text-[2.5rem] font-bold text-[#565758] ">
              Manage your business here.
            </h1>
            <button
              onClick={() => actionAddProduct()}
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
