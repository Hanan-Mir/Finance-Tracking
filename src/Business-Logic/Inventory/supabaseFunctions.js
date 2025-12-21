import { supabase } from "../../../supabaseClient";

export async function loadData() {
  //get the information related to all the products in the supabase
  let { data: user_products, error } = await supabase
    .from("user_products")
    .select("*");

  //get the current inventory value(currentQuantity*costprice)
  const currentInventoryValue = user_products.reduce(
    (acc, item) => acc + item.cost_price * item.current_quantity,
    0
  );
  //get the current sales value(currentQuantity*sellingprice)
  const currentSalesValue = user_products.reduce(
    (acc, item) => acc + item.selling_price * item.current_quantity,
    0
  );
  //calculate profit percentage
  const profitPercentage = Math.floor(
    ((currentSalesValue - currentInventoryValue) / currentInventoryValue) * 100
  );
  //get the items with the low stock
  const itemsWithLowStock = user_products.filter(
    (item) => (item.current_quantity / item.initial_quantity) * 100 <= 20
  );
  //calculate stock health
  const currentQuantity = user_products.reduce(
    (acc, item) => acc + item.current_quantity,
    0
  );
  const initialQuantity = user_products.reduce(
    (acc, item) => acc + item.initial_quantity,
    0
  );
  const stockHealth = Math.floor((currentQuantity / initialQuantity) * 100);

  return {
    currentInventoryValue,
    currentSalesValue,
    profitPercentage,
    itemsWithLowStock,
    stockHealth,
    user_products
  };
}
