import { Button, ButtonGroup } from "@mui/material"
import { Form, useNavigation } from "react-router-dom"

function TransactionEdit({transactionData,formStatus}) {
    const naviagation=useNavigation();
    const isSubmitting=naviagation.state==='issubmitting'
    const hoverStyles={
    backgroundColor:'#4a32b8',
    transform:'scale(1.05)',
    transition:'all 0.3s ease-in-out',
    color:'white'
  }
  console.log(transactionData)
 const {transaction_type:transactionType,item_name,id,payment:totalPayment,amount_paid:paid,payment_mode:paymentMode,name,itemName,quantity,payment,balance}=transactionData
    return(
     <div className=" w-full h-screen md:flex md:justify-center md:items-center">
        <Form
                action="/transactions"
                method="post"
                className="absolute top-20 left-100 bg-white md:z-40 rounded-[10px] w-[50%] h-[75%] shadow-box flex flex-col md:items-start md:justify-between md:py-8 md:px-5"
              >
                <div className="flex w-[90%] justify-center items-center">
                  <div className="flex justify-start gap-20">
                    <div>
                      <input
                        type="radio"
                        checked={transactionType === "expense"}
                        value="expense"
                        name="transactionType"
                        id=""
                        className="mr-2"
                      
                      />
                      <label htmlFor="Expense" className="text-2xl font-medium">
                        Expense
                      </label>
                    </div>
                    <div>
                      <input
                        type="radio"
                        checked={transactionType === "sale"}
                        value="sale"
                        name="transactionType"
                        id=""
                        className="mr-2"
                       
                      />
                      <label htmlFor="Expense" className="text-2xl font-medium">
                        sale
                      </label>
                    </div>
                  </div>
                </div>
                <input type="text" name="id" id="id" hidden value={id} />
                {transactionType === "expense" ? (
                  <>
                    <div className="flex w-[90%] justify-between items-center">
                      <label htmlFor="vendorName">Vendor Name :</label>
                      <div className="flex md:flex-col gap-2 relative">
                        <input
                          required
                          type="text"
                          name="name"
                          id="name"
                          className="shadow-box px-4 py-2 ml-2 rounded-[10px]"
                          defaultValue={name}
                          readOnly
                          
                          
                        />
                        
                      </div>
                    </div>
                    <div className="flex w-[90%] justify-between items-center">
                      <label htmlFor="itemName">Item Name :</label>
                      <div className="relative">
                        <input
                          required
                          type="text"
                          name="itemName"
                          id="itemName"
                          className="shadow-box px-4 py-2 ml-2 rounded-[10px]"
                          defaultValue={item_name}
                          readOnly
                        />
                        
                      </div>
                    </div>
                   
                    <div className="flex w-[90%] justify-between items-center">
                      <label htmlFor="payment">Balance:</label>
                      <input
                        type="text"
                        name="balance"
                        id="balance"
                        className="shadow-box px-4 py-2 ml-2 rounded-[10px]"
                        disabled={true}
                        defaultValue={balance}
                        readOnly
                      />
                      <input type="text" hidden value={totalPayment} name="payment" />
                    </div>
                    <div className="flex w-[90%] justify-between items-center">
                      <label htmlFor="paid">Amount Paid:</label>
                      <input
                        type="text"
                        name="paid"
                        id="paid"
                        className="shadow-box px-4 py-2 ml-2 rounded-[10px]"
                  
                      />
                    </div>
        
                    <div className="flex w-[90%] justify-between items-center">
                      <label htmlFor="paid">Payment Method:</label>
                      <input
                        type="text"
                        name="paymentMethod"
                        id="paymentMethod"
                        className="shadow-box px-4 py-2 ml-2 rounded-[10px]"
                  
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex w-[90%] justify-between items-center">
                      <label htmlFor="vendorName">Name :</label>
                      <input
                        required
                        type="text"
                        name="name"
                        id="name"
                        className="shadow-box px-4 py-2 ml-2 rounded-[10px]"
                        defaultValue={name}
                        readOnly
                      />
                    </div>
                    <div className="flex w-[90%] justify-between items-center">
                      <label htmlFor="itemPurchased">Item purchased :</label>
                      <input
                        required
                        type="text"
                        name="itemPurchased"
                        id="itemPurchased"
                        className="shadow-box px-4 py-2 ml-2 rounded-[10px]"
                       defaultValue={item_name}
                       readOnly
                      />
                    </div>
                    <input
                      hidden
                      required
                      type="text"
                      name="stock"
                      defaultValue={quantity}
                    />
                   
                   
                    <div className="flex w-[90%] justify-between items-center">
                      <label htmlFor="payment">Balance:</label>
                      <input
                        type="text"
                        name="payment"
                        id="payment"
                        className="shadow-box px-4 py-2 ml-2 rounded-[10px]"
                        readOnly
                        value={balance}
                        disabled
                      />
                    </div>
                    <input
                        type="text"
                        name="payment"
                        id="payment"
                        className="shadow-box px-4 py-2 ml-2 rounded-[10px]"
                        hidden
                        value={payment}
                      />
                    <div className="flex w-[90%] justify-between items-center">
                      <label htmlFor="paid">Amount Paid:</label>
                      <input
                        type="text"
                        name="paid"
                        id="paid"
                        className="shadow-box px-4 py-2 ml-2 rounded-[10px]"
                   
                      />
                    </div>
        
                    <div className="flex w-[90%] justify-between items-center">
                      <label htmlFor="paid">Payment Method:</label>
                      <input
                        type="text"
                        name="paymentMethod"
                        id="paymentMethod"
                        className="shadow-box px-4 py-2 ml-2 rounded-[10px]"
                       
                      />
                    </div>
                  </>
                )}
        
                <div className="w-full flex justify-center mt-5">
                  <ButtonGroup>
                    <Button
                      sx={{ "&:hover": hoverStyles }}
                      type="submit"
                      loading={isSubmitting}
                      loadingPosition="start"
                      name="_action"
                      value="edit"
                    >
                      Update
                    </Button>
                  </ButtonGroup>
                </div>
              </Form>
              <div
                onClick={() => formStatus((cur) => !cur)}
                className="overflow-hidden absolute inset-0 bg-black/30 backdrop-blur-[6px] z-20 h-[100vh] w-full"
              ></div>
            </div>
        
     
    )
}

export default TransactionEdit
