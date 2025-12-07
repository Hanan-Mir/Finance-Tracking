import { supabase } from "../../../supabaseClient";

export async function addTransaction({ request }) {
  console.log("hello");
  const formrequest = await request.formData();
  const formData = Object.fromEntries(formrequest);
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const transactionData = {
    name: formData.productName,
  };
  console.log(transactionData);
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
      .select("vendor_name,product_name")
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
