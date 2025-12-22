//This function is related to the email services in the about page using emailjs
async function handleEmailService({request}){
    const formData=await request.formData();
    const templateParams={
        ...Object.fromEntries(formData),
        recipient_name:'Hanan',
        sender_name:'FinTrack Team'

    }
    
    const emailJsPayload={
      service_id:'service_i1uy96f',
      template_id:'template_m2qsald',
      user_id:'C_iC9AuA3ceX34D4E',
      template_params:templateParams
  }
 
  try{
    const response=await fetch('https://api.emailjs.com/api/v1.0/email/send',{
      method:'POST',
      headers:{
'Content-Type':'application/json',
      },
      body:JSON.stringify(emailJsPayload)
      
     
    })
    if(response.ok){
        return {success:true,message:'Message sent sucessfully!'}
    }else{
        return {success:false,message:'Error in sending message'}
    }
}catch(error){
    return {success:false,message:`Error ${error}:A network error has occured.`}
}
    
}
export {handleEmailService}