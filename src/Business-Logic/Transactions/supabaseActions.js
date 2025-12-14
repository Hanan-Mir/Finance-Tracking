import { toast } from "react-toastify";
import { supabase } from "../../../supabaseClient";

//This is the action for the transaction page
export async function addTransactionAction({ request }) {
  const formrequest = await request.formData();
  const formData = Object.fromEntries(formrequest);
  
  const {
    data: { user },
  } = await supabase.auth.getUser();
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
  return toast.warn('Payments cannot be done', {
position: "top-center",
autoClose: 3000,
hideProgressBar: true,
closeOnClick: false,
pauseOnHover: true,
draggable: true,
progress: undefined,
theme: "dark",
});
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
    return toast.warn('Payments should be less than the balance', {
position: "top-center",
autoClose: 3000,
hideProgressBar: true,
closeOnClick: false,
pauseOnHover: true,
draggable: true,
progress: undefined,
theme: "dark",
});

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
      return { success: false, error: "Failed to add the transaction" };
    }
    if (data) {
      return { success: true, message: "Transaction added sucessfully!!" };
    }
    

  }
  if(formData.transactionType==='sale'){
    const { data:saleInfo, error:saleInfoError } = await supabase
      .from("user_products")
      .select("product_name,selling_price,id,current_quantity")
      .ilike("product_name", `%${formData.itemPurchased}%`)
      .limit(10);
    console.log(saleInfo)
   
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
  console.log(formData.paid,formData.payment)
    const transactionToInsert={
    ...saleData,
    user_id:user.id
  }
  if(formData.payment>=formData.paid && saleInfo[0].current_quantity>0){
    const updatedQuantity=saleInfo[0].current_quantity-formData.quantity
    if(updatedQuantity<0){
      return toast.warn('Please select a lower quantity', {
position: "top-center",
autoClose: 3000,
hideProgressBar: true,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,
theme: "dark",
});
    }
    const { data:updatedRow, error:updateError } = await supabase
  .from('user_products')
  .update({current_quantity :updatedQuantity})
  .ilike('product_name', `%${formData.itemPurchased}%`)
  .select();
  console.log(updatedRow)
   const { data, error } = await supabase
      .from("transactions_table")
      .insert([transactionToInsert])
      .select();
       if (error) {
        console.log(error)
      return { success: false, error: "Failed to add the transaction" };
    }
    if (data) {
      return { success: true, message: "Transaction added sucessfully!!" };
    }

  }else{
  console.log('Insie2')
  toast.warn('Amount paid should be less than the total payable amount', {
position: "top-center",
autoClose: 5000,
hideProgressBar: false,
closeOnClick: false,
pauseOnHover: true,
draggable: true,
progress: undefined,
theme: "dark",
});
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
    console.log(error);
    return [];
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
      console.log(error);
      return [];
    }
    return data;
  } catch (error) {
    console.log(error);
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
        console.log(error)
        return []
      }
       return data;

  }catch(error){
    return toast.warn(`${error}`, {
position: "top-center",
autoClose: 5000,
hideProgressBar: false,
closeOnClick: false,
pauseOnHover: true,
draggable: true,
progress: undefined,
theme: "dark",
});

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
