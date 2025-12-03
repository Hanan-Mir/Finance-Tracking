

import { supabase } from "../../../supabaseClient";

export async function getRowData(id){

let { data: user_products, error } = await supabase
  .from('user_products')
  .select().eq('id',id);
  console.log(user_products);
  return user_products

}
