import { supabase } from "../../../supabaseClient";

export async function deleteRecord(id){
    const { error } = await supabase
  .from('user_products')
  .delete()
  .eq('id',id)
}