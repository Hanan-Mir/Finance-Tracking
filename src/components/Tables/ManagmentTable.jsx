import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"


import { useManagmentContext } from "../../context/ManagmentContext"

function ManagmentTable({productData,deleteAndRevalidate}) {
   const {handleEditForm}=useManagmentContext();
  
   
    return (
        <>
         <TableContainer
          component={Paper}
          sx={{ overflowY:'auto' }}
        >
          <Table sx={{ minWidth: 100 }} stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>Product Name</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Vendor Name</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>
                  Contact Number
                </TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Email Address</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Cost Price</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Selling Price</TableCell>
                 <TableCell sx={{ fontWeight: "bold" }}>Initial Quantity</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Unit</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Operation</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {productData.map((row) => (
                <TableRow >
                  <TableCell>{row.product_name}</TableCell>
                  <TableCell>{row.vendor_name}</TableCell>
                  <TableCell>{row.phone_number}</TableCell>
                  <TableCell>{row.email_address}</TableCell>
                  <TableCell>{row.cost_price}</TableCell>
                  <TableCell>{row.selling_price}</TableCell>
                  <TableCell>{row.initial_quantity}</TableCell>
                  <TableCell>{row.unit}</TableCell>
                  <TableCell align='center' sx={{display:'flex',justifyContent:'justify-start'}}>
                  
                    <img onClick={()=>{deleteAndRevalidate(row.id)}} src="/images/bin.png" alt="" className="w-10 px-2 py-2 hover:cursor-pointer hover:bg-gray-300" />
            <img onClick={()=>handleEditForm(row.id)} src="/images/edit.png" alt="" className="w-10 px-2 py-2  hover:cursor-pointer hover:bg-gray-300 " />      
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
        </TableContainer>
            
        </>
    )
}

export default ManagmentTable
