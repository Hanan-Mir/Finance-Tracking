import { Box, Divider, Typography } from "@mui/material";
import { forwardRef } from "react";

const Reciept = forwardRef(({ transaction }, ref) => {
  // if(!transaction) return ;
  return (
    <Box ref={ref} sx={{ width: "780px", padding: 2, fontFamily: "monospace", }}>
      <Typography align="center" fontWeight="bold" sx={{fontSize:'3rem'}}>
        Reciept
      </Typography>
      <Divider sx={{ my: 1 }} />
      <Typography sx={{ fontSize: "2rem",marginBottom:'2rem' }}>
        Customer Name:{transaction?.name}
      </Typography>
      <Typography sx={{ fontSize: "2rem" ,marginBottom:'2rem'  }}>
        Product Name:{transaction?.item_name}
      </Typography>
      <Typography sx={{ fontSize: "2rem" ,marginBottom:'2rem'  }}>Transaction Type:{transaction?.transaction_type.toUpperCase()}</Typography>
      <Typography sx={{ fontSize: "2rem" ,marginBottom:'2rem'  }}>Total Payment:{transaction?.payment}</Typography>
      <Typography sx={{ fontSize: "2rem" ,marginBottom:'2rem'  }}>Paid:{transaction?.amount_paid}</Typography>
      <Divider sx={{ my: 1 }} />
      <Typography sx={{ fontSize: "2rem" ,marginBottom:'2rem',backgroundColor:'yellow'  }}>Balance:{transaction?.balance}</Typography>
      <Typography sx={{ fontSize: "2rem" ,marginBottom:'2rem'  }}>Payment Mode:{transaction?.payment_mode.toUpperCase()}</Typography>
      <Divider sx={{ my: 1 }} />
      <Typography variant="caption">
        Date:{new Date(transaction?.created_at).toLocaleString()}
      </Typography>
      <Typography align="right" mt={1} sx={{fontSize:'1.2rem'}}>
        Signature
      </Typography>
      <Divider sx={{ my: 1 }} />
      <Typography align="center" mt={1} sx={{fontSize:'1.5rem'}}>
        Thank you
      </Typography>
    </Box>
  );
});
export default Reciept;
