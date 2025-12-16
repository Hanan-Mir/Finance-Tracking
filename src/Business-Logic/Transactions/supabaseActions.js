import { toast } from "react-toastify";
import { supabase } from "../../../supabaseClient";

//This is the action for the transaction page
export async function addTransactionAction({ request }) {
  const formrequest = await request.formData();
  const kind=formrequest.get('_action')
  const formData = Object.fromEntries(formrequest);
  
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if(kind==='create'){
  if(formData?.transactionType==='expense'){
      const productData = {
    name: formData.name,
    transaction_number: formData.id,
    payment:formData.payment,
    amount_paid: formData.paid,
    payment_mode: formData.paymentMethod,
    balance:formData.payment-formData.paid,
    item_name: formData.itemName,
    quantity:null,
    transaction_type:formData.transactionType
  };
  //get the totalAmount that is payable to the merchant and subtract the payment done 
let { data: paymentData, error:paymentError } = await supabase
  .from('user_products')
  .select('total_payment').eq('id',formData.id)

//condition for if user made the whole payment and now stoping the payment from the user
if(paymentData[0]?.total_payment===0){

return {success:false,message:'Payment cannot be made!!!.',kind:'create'}  


}

if(formData.paid<=paymentData[0]?.total_payment){
//calculate the updated payments
const updatedPayment=paymentData[0]?.total_payment-formData.paid
//Get the row were the updated payment has to be inserted
const { data:updatedRow, error:updateError } = await supabase
  .from('user_products')
  .update({total_payment :updatedPayment})
  .eq('id', formData.id)
  .select()
}else{
  return {success:'false',message:'Payment cannot be more than the balance!!!',kind:'create'}  

} 
 
  const transactionToInsert={
    ...productData,
    user_id:user.id
  }
   const { data, error } = await supabase
      .from("transactions_table")
      .insert([transactionToInsert])
      .select();
       if (error) {
      return { success: false, message: "Failed to add the transaction",kind:'create' };
    }
    if (data) {
      return { success: true, message: "Transaction added sucessfully!!",kind:'create' };
    }
    

  }
  if(formData.transactionType==='sale'){
    const { data:saleInfo, error:saleInfoError } = await supabase
      .from("user_products")
      .select("product_name,selling_price,id,current_quantity")
      .ilike("product_name", `%${formData.itemPurchased}%`)
      .limit(10);
   
    const saleData = {
    name: formData.name,
    amount_paid: formData.paid,
    payment_mode: formData.paymentMethod,
    payment:formData.payment,
    transaction_number:saleInfo[0].id,
     transaction_type:formData.transactionType,
    balance:formData.payment-formData.paid,
    item_name: formData.itemPurchased,
    quantity:formData.quantity
  }
 
    const transactionToInsert={
    ...saleData,
    user_id:user.id
  }
  if(formData.payment>=formData.paid && saleInfo[0].current_quantity>0){
    const updatedQuantity=saleInfo[0].current_quantity-formData.quantity
    if(updatedQuantity<0){
      return {success:false,message:'Please select a lower quantity!!!',kind:'create'}
    }
    const { data:updatedRow, error:updateError } = await supabase
  .from('user_products')
  .update({current_quantity :updatedQuantity})
  .ilike('product_name', `%${formData.itemPurchased}%`)
  .select();
   const { data, error } = await supabase
      .from("transactions_table")
      .insert([transactionToInsert])
      .select();
       if (error) {
        console.log(error)
      return { success: false, error: "Failed to add the transaction",kind:'create' };
    }
    if (data) {
      return { success: true, message: "Transaction added sucessfully!!",kind:'create' };
    }

  }else{
 return {success:'false',message:'Amount paid should be less than the available balance',kind:'create'}

}
}
  }
  if(kind==='edit'){
//get the items that we want to update

let { data: transactions_table, error } = await supabase
  .from('transactions_table')
  .select('*').eq('id',formData.id)
  console.log(transactions_table)
const {balance:previousBalance,amount_paid:previousPayment}=transactions_table[0]
if(previousBalance===0) {
  return {success:false,message:'No payments can be made!!!'}
}
if(formData.paid>previousBalance){
  return {success:false,message:'You cannot pay more than outstanding balance!!',kind:'edit'}
} 
const updatedData={
  amount_paid:Number(previousPayment)+Number(formData.paid),
  balance:previousBalance-formData.paid,
  payment_mode:formData.paymentMethod
}
const { data, error:userError } = await supabase
      .from("transactions_table")
      .update(updatedData)
      .eq("id", formData.id)
      .select();
      if(data){
  return {success:true,message:'Data updated sucessfully.',kind:'edit'}
}else{
  return {success:false,message:'Data updation failed.',kind:'edit'}
}
 
  }


  
 
}
//get the name of vendors as the user types
export async function searchVendors(vendorName) {
  if (!vendorName) return [];
  try {
    const { data, error } = await supabase
      .from("user_products")
      .select("id,vendor_name,product_name")
      .ilike("vendor_name", `%${vendorName}%`)
      .limit(10);
    if (error) {
      console.log(error);
      return [];
    }
    return data;
  } catch (error) {
   return {success:false,message:'Vendor not present.'}
  }
}
//get the products according to the vendor
export async function getProducts(productName, vendorName) {
  if (!productName && !vendorName) return [];
  try {
    const { data, error } = await supabase
      .from("user_products")
      .select("vendor_name,product_name,total_payment,id")
      .ilike("vendor_name", `%${vendorName}`)
      .limit(10);
    if (error) {
   throw error
    }
    return data;
  } catch (error) {
      return {sucess:false,message:'Error in fetching the products'}
  }
}
//get the current available stock of the vendor
export async function getCurrentStock(itemName){
  if(!itemName) return;
  try{
     const { data, error } = await supabase
      .from("user_products")
      .select("current_quantity,product_name,selling_price")
      .ilike("product_name", `%${itemName}`)
      .limit(10);
     
      if(error){
       throw error
      }
       return data;

  }catch(error){
     return {sucess:false,message:'Error in fetching the products'}

  }
}
//loader for the transactions form
export async function getTransactionDataLoader({request}){
 const url=new URL(request.url);
 const typeFilter=url.searchParams.get('transaction_type')
 const modeFilter=url.searchParams.get('payment_mode')
 const searchFilter=url.searchParams.get('q')
  let query = supabase
  .from('transactions_table')
  .select('*')
  if(typeFilter){
    query=query.eq('transaction_type',typeFilter)
  }
  if(modeFilter){
    query=query.eq('payment_mode',modeFilter)
  }
  if(searchFilter){
    query=query.ilike('name',`%${searchFilter}%`).limit('10')
  }
const {data:transaction_data,error}=await query
  return {transaction_data}
}
