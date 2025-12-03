import { supabase } from "../../../supabaseClient";

export async function getData() {
    const {
        data: { user },
      } = await supabase.auth.getUser();
    console.log(user.id)
 let {data:user_productsData,error:fetchError}=await supabase.from('user_products').select(`id,user_id`).eq('user_id',user.id);
 const inventory_insert_data=user_productsData.map(product=>({product_id:product.id,user_id:user.id}));
 console.log(inventory_insert_data)
 const { data: new_inventory_rows, error: insertError } = await supabase
    .from("inventory_table")
    .upsert(inventory_insert_data,{onConflict:'product_id'})
    
    .select();
 const {data:final_data,error:finalError}=await supabase.from('inventory_table').select(`id,
    product_id(
    product_name,unit,selling_price,current_quantity);
    `)   
console.log(final_data)
}
