import { Button, ButtonGroup } from "@mui/material";
import { Form, useActionData, useNavigation } from "react-router-dom";
import { getRowData } from "../../Business-Logic/Managment/editProduct";
import { useEffect, useState } from "react";
import { supabase } from "../../../supabaseClient";
import { useManagmentContext } from "../../context/ManagmentContext";

function EditForm({ formStatus,id }) {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  const hoverStyles={
    backgroundColor:'#4a32b8',
    transform:'scale(1.05)',
    transition:'all 0.3s ease-in-out',
    color:'white'
  }
  const {formData}=useManagmentContext();

 
 
 
 
  return (
    <div className=" w-full h-screen md:flex md:justify-center md:items-center">
      <Form
        action='/managment'
        method="patch"
        className="absolute top-20 bg-white md:z-40 rounded-[10px] w-[50%] h-[75%] shadow-box flex flex-col md:items-start md:justify-between md:py-8 md:px-5"
      >
        <input type="hidden" name="id" value={id} />
        <div className="flex w-[90%] justify-between items-center">
          <label htmlFor="productName">Product Name :</label>
          <input
            required
            type="text"
            name="productName"
            id="productName"
            className="shadow-box px-4 py-2 ml-2 rounded-[10px]"
            defaultValue={formData[0]?.product_name}
          />
        </div>
        <div className="flex w-[90%] justify-between items-center">
          <label htmlFor="vendorName">Vendor Name :</label>
          <input
            required
            type="text"
            name="vendorName"
            id="vendorName"
            defaultValue={formData[0]?.vendor_name}
            className="shadow-box px-4 py-2 ml-2 rounded-[10px]"
          />
        </div>
        <div className="flex w-[90%] justify-between items-center">
          <label htmlFor="phoneNumber">Phone Number :</label>
          <input
            required
            type="text"
            name="phoneNumber"
            id="phoneNumber"
            defaultValue={formData[0]?.phone_number}
            className="shadow-box px-4 py-2 ml-2 rounded-[10px]"
          />
        </div>
        <div className="flex w-[90%] justify-between items-center">
          <label htmlFor="emailAddress">Email Address:</label>
          <input
            required
            type="text"
            name="emailAddress"
            id="emailAddress"
            defaultValue={formData[0]?.email_address}
            className="shadow-box px-4 py-2 ml-2 rounded-[10px]"
          />
        </div>
        <div className="flex w-[90%] justify-between items-center">
          <label htmlFor="unit">Measuring Unit:</label>
          <input
            type="text"
            name="unit"
            id="unit"
            defaultValue={formData[0]?.unit}
            className="shadow-box px-4 py-2 ml-2 rounded-[10px]"
          />
        </div>
        <div className="flex w-[90%] justify-between items-center">
          <label htmlFor="costPrice">Cost Price:</label>
          <input
            type="text"
            name="costPrice"
            id="costPrice"
            defaultValue={formData[0]?.cost_price}
            className="shadow-box px-4 py-2 ml-2 rounded-[10px]"
          />
        </div>
        <div className="flex w-[90%] justify-between items-center">
          <label htmlFor="sellingPrice">Selling Price:</label>
          <input
            type="text"
            name="sellingPrice"
            id="sellingPrice"
            defaultValue={formData[0]?.selling_price}
            className="shadow-box px-4 py-2 ml-2 rounded-[10px]"
          />
        </div>
        <div className="flex w-[90%] justify-between items-center">
          <label htmlFor="currentQuantity"> Current quantity:</label>
          <input
            type="text"
            name="currentQuantity"
            id="currentQuantity"
            className="shadow-box px-4 py-2 ml-2 rounded-[10px]"
            defaultValue={formData[0]?.current_quantity}
          />
        </div>
        <div className="w-full flex justify-center mt-5">
            <ButtonGroup>
                <Button sx={{"&:hover":hoverStyles}}  type="submit" loading={isSubmitting} loadingPosition="start" name='_action' value='edit' >Update</Button>
            </ButtonGroup>
          
        </div>
      </Form>
       <div
        onClick={() => formStatus((cur) => !cur)}
        className="absolute inset-0 bg-black/30 backdrop-blur-[6px] z-20 h-[120vh] w-full"
      ></div>
    </div>
  );
}

export default EditForm;