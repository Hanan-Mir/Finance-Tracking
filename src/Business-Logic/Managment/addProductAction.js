import { redirect } from "react-router-dom";
import { supabase } from "../../../supabaseClient";

export async function addProductAction({request}){
    const formrequest=await request.formData();
    const idString=formrequest.get('id');
    const id=parseInt(idString,10)
    
    const kind=formrequest.get('_action');
    console.log(kind)
    
//get the authenticated user

    const { data: { user } } = await supabase.auth.getUser();
    

if(kind==='create'){
const formData=Object.fromEntries(formrequest);
  
    const productData={
        product_name:formData.productName,
        vendor_name:formData.vendorName,
        phone_number:formData.phoneNumber,
        manfacturing_type:formData.type,
        unit:formData.unit,
        email_address:formData.emailAddress
}
const productToInsert={
    ...productData,
    user_id:user.id
}
const { data, error } = await supabase
  .from('user_products')
  .insert([
   productToInsert
  ]).select();
 
  if(error){
    return {success:false,error:'Data insertion failed!!'}
  }
  if(data){
 
  return {success:true,message:'Data added sucessfully!!'}
  }
}
if(kind==='edit'){
  const formData=Object.fromEntries(formrequest);
  console.log(formData);
  const updatedData={
    product_name:formData.productName,
        vendor_name:formData.vendorName,
        phone_number:formData.phoneNumber,
        manfacturing_type:formData.type,
        unit:formData.unit,
        email_address:formData.emailAddress

  }
  const { data, error } = await supabase
  .from('user_products')
  .update(updatedData)
  .eq('id',id)
  .select()
 if(data){

 
  return {success:true,message:'Data Edited sucessfully!!',kind:'edit'}
  }
}
}