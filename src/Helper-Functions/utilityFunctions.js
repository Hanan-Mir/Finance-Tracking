import { toast } from "react-toastify";
//function to convert json that is fetched from the table to a csv file

//csv-----comma seperated values
export function jsonToCsv(data,columns){
    if(!data || data.length===0) return '';
    //get the keys from the first object
    const headers=columns || Object.keys(data[0])
    const headerRow=headers.join(',')
    //get the data from the rows
    const csvRowsData=data.map(row=>{
        return headers.map(feildName=>{
            let value=row[feildName] ??'';
            if(typeof value==='string' && (value.includes(',') || value.includes('"'))){
                value=value.replace(/"/g,'""')
                return `"${value}"`
            }
            return value;
        }).join(',')
    })
    return [headerRow,...csvRowsData].join('\n')

}
export async function handleGenerateCSV(tableName,fileName='report',data){
    if(data.length===0){
        toast.error('Report generation failed', {
position: "top-center",
autoClose: 2000,
hideProgressBar: true,
closeOnClick: false,
pauseOnHover: false,
draggable: false,
progress: undefined,
theme: "dark",
});
    }
    const csvString=jsonToCsv(data);
    //BLOB===binary large object
    const blob=new Blob([csvString],{type:'text/csv;charset=utf-8;'});
    //provides the url to the blob object in the browser memory
    const url=URL.createObjectURL(blob);
    const link=document.createElement('a')
    link.href=url;
    link.setAttribute('download',`${fileName}-${new Date().toISOString()}.csv`)
    document.body.appendChild(link);
    link.click();
    console.log(link.click())
    if(url){
        toast.success('Report downloaded sucessfully', {
position: "top-center",
autoClose: 2000,
hideProgressBar: true,
closeOnClick: false,
pauseOnHover: false,
draggable: false,
progress: undefined,
theme: "dark",
});
    }
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    console.log('csv report generated');

}
//function to add payments elements
export function addArray(arr){
    let sum=arr.reduce((acc,el)=>{
return acc+el.payment
  } ,0);
  return sum
}
//function to add Balances elements
export function addBalance(arr){
    let sum=arr.reduce((acc,el)=>{
return acc+el.balance
  } ,0);
  return sum
}