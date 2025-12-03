import { Paper, Table, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import { getData } from "../../Business-Logic/Inventory/supabaseFunctions"

function Inventory() {
async function productsData(){
const data=await getData();
console.log(data)
}
productsData();


    return (
        <section className="inventory ">
         <div className="card">
            <h1>Inventory Value</h1>
            
            </div>   
            <div className="card">
            <h1>Total Sales Value</h1>
            
            </div>   
             <div className="card">
            <h1>Profit Percentage</h1>
            
            </div>
            <div className="table">
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{fontWeight:'bold'}}>Product Name</TableCell>
                                 <TableCell sx={{fontWeight:'bold'}}>Selling Price</TableCell>
                                <TableCell sx={{fontWeight:'bold'}}>Current Quantity</TableCell>
                                <TableCell sx={{fontWeight:'bold'}}>Unit</TableCell>
                                <TableCell sx={{fontWeight:'bold'}}>Status</TableCell>
                            </TableRow>


                        </TableHead>
                    </Table>
                </TableContainer>

            </div>   

        </section>
    )
}

export default Inventory
