import { supabase } from "../../../supabaseClient";

export async function deleteRecord(id){

    const { error } = await supabase
  .from('user_products')
  .delete()
  .eq('id',id)
  if(error){
    return {success:false,message:'Row cannot be deleted'}

  }
  return {success:true,message:'Product deleted successfully'}
  
}