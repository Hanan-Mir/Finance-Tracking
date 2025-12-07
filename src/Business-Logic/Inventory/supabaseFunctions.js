import { supabase } from "../../../supabaseClient";

export async function loadData() {
   //function to check for the authentic users
  const {
    data: { user },
  } = await supabase.auth.getUser();
  //Get the foreign key and user_id from the user_products
  let { data: user_productsData, error: fetchError } = await supabase
    .from("user_products")
    .select(`id,user_id`)
    .eq("user_id", user?.id);
  //Map the data fetched from the user_poducts to the columns names in the inventory table  
  const inventory_insert_data = user_productsData.map((product) => ({
    product_id: product.id,
    user_id: user.id,
  }));
  //insert the table that we have fetched into the inventory_table and using upsert here to avoid duplication
  const { data: new_inventory_rows, error: insertError } = await supabase
    .from("inventory_table")
    .upsert(inventory_insert_data, { onConflict: "product_id" })

    .select();
  //Get the data from the inventory_table and return the data  
  const { data: final_data, error: finalError } = await supabase.from(
    "inventory_table"
  ).select(`id,
    product_id(
    product_name,unit,selling_price,current_quantity,cost_price);
    `);
//calculate the total inventory value
    const inventoryQuantity=final_data.reduce((acc,el)=>{
      return acc+el.product_id.current_quantity
    },0)
    const totalInventoryCostPrice=final_data.reduce((acc,el)=>{
      return acc+el.product_id.cost_price
    },0)
     const totalInventoryValue= inventoryQuantity*totalInventoryCostPrice;
    //calculate the total sales value to be achieved
    const totalInventorySellingPrice=final_data.reduce((acc,el)=>{
      return acc+el.product_id.selling_price
    },0)
const totalSalesValue= inventoryQuantity*totalInventorySellingPrice;
const profitPercentage=((totalSalesValue/totalInventoryValue)*100).toFixed(2)
   
   return {success:true,data:final_data,InventoryValue:totalInventoryValue,Sales:totalSalesValue,profit:profitPercentage} 
}
