import { supabase } from "../../../supabaseClient";

export async function addProductAction({request}){
    const formrequest=await request.formData();
    const formData=Object.fromEntries(formrequest);
  
    const productData={
        product_name:formData.productName,
        vendor_name:formData.vendorName,
        phone_number:formData.phoneNumber,
        manfacturing_type:formData.type,
        unit:formData.unit,
        email_address:formData.emailAddress
}
//get the authenticated user

    const { data: { user } } = await supabase.auth.getUser();
    
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