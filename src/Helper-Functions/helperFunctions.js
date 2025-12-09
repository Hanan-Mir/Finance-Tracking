
//function to format the date
const options={
     day:'2-digit',
    year:'numeric',
    month:'long',
   
}
export function formatDate(dateString){
    const date=new Date(dateString);
    return date.toLocaleString('en-GB',options)
}
