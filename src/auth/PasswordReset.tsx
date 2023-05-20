import { useState } from "react";
import Title from "../components/Title";
import { postRequest } from "../services/apiService";

function PasswordReset() {
    
    const [email,setEmail]=useState<string>('');
    const [error,setError] = useState<string>('');

    function submit(){
       const res=postRequest('users/forgot-password',{email},false);
        if(!res)return;
        res.then(response=>response.json())
        .then(json=>{
          if(json.error){
           setError(json.error);
           return;
          }
          if(json.ok){
           alert('we sent the link for reset your password to your email');         
          }
         })
      
    }
    
    return ( 
        <>
            <Title
                main="Reset your password"
                sub=""
            />

        <div className="form-max-w m-aotu row w-50 p-3 mx-auto mt-5 mb-5">

            <div className="mb-3">
                <input
                    type="email" className="form-control rounded-pill" placeholder="Email"
                    value={email} onChange={(e)=>setEmail(e.target.value)}/>
            </div>

            <button
                className="btn btn-warning btn-lg w-50 mx-auto rounded-pill mb-5" onClick={submit}>
                submit
            </button>

            {
                error &&
                <div className="text-danger text-center">
                    {error}
                </div>
            }
        </div>
    </>
     );
}

export default PasswordReset;