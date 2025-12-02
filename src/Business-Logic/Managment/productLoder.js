import { supabase } from "../../../supabaseClient"

export async function loadProductsData({request,params}){
let { data: user_products, error } = await supabase
  .from('user_products')
  .select('*')
  return {user_products}
}