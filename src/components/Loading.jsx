import { Box, CircularProgress } from "@mui/material"

function Loading() {
    return (
      <Box sx={{display:'flex',justifyContent:'center',alignItems:'center',height:'100vh'}}>
        <CircularProgress color="primary" size={60} />
      </Box>
    )
}

export default Loading
