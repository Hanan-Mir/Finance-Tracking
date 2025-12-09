import { supabase } from "../../../supabaseClient";

//This is the action for the transaction page
export async function addTransactionAction({ request }) {
  console.log("hello");
  const formrequest = await request.formData();
  const formData = Object.fromEntries(formrequest);
  
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if(formData.transactionType==='expense'){
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
      .select("product_name,selling_price,id")
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
    const transactionToInsert={
    ...saleData,
    user_id:user.id
  }
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