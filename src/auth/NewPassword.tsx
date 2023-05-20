import { useEffect, useState } from "react";
import { postRequest } from "../services/apiService";
import { useNavigate, useParams } from "react-router-dom";
import Title from "../components/Title";


function NewPassword() {
    
    const [email,setEmail] = useState<string>('');
    const [password,setPassword] = useState<string>('');
    const [confirmPassword,setconfirmPassword] = useState<string>('');
    const [error,setError]=useState<string>('');
    const navigate=useNavigate();
    
    const {_id,token}=useParams();

    useEffect(()=>{
        const res= fetch(`http://localhost:3000/users/reset-password/${_id}/${token}`)

        if(!res){
            setError('Error get the data');
            return;
        }
         res.then(res => res.json())
          .then(json => {
            if(json.error){
                setError(json.error);
                return;
            }
            setEmail(json.ok)
          });
    },[_id,token])

    function newPassword(password:string){
      if(password!==confirmPassword){
        setError('The passwords dont match');
        setPassword('');
        setconfirmPassword('');
        return;
      }
        
        const res=postRequest(`users/reset-password/${_id}/${token}`,{password},false);
        if(!res)return;
        res.then(response=>response.json())
        .then(json=>{
         if(json.error){
         alert(json.error);
         return;
      }
      
      if(window.confirm(`${json.ok}, Do you want to continue to login?`)){
        navigate('/');
      }
      navigate('/login');
      })
    }

    return ( 
    <>
       <Title
          main="Reset your password"
          sub=""
        />

        <div className="form-max-w m-aotu row w-50 p-3 mx-auto mt-5">

          <div className="mb-3">  
            <input
             type="text" className="form-control rounded-pill" 
             value={email}/>
          </div>

          <div className="mb-3">
            <input
             type="password" className="form-control rounded-pill" placeholder="Password"
             value={password} onChange={(e)=>setPassword(e.target.value)}/>
           </div>

           <div className="mb-3">
            <input
             type="password" className="form-control rounded-pill" placeholder="Confirm password"
             value={confirmPassword} onChange={(e)=>setconfirmPassword(e.target.value)}/>
           </div>

           <button className="btn btn-warning btn-lg w-50 mx-auto rounded-pill" onClick={()=>newPassword(password)}>
             Submit
           </button>
        </div>
        {
            error &&
            
            <div className="mt-5 mb-5 text-center fs-3 text-danger">{error}</div>
            
        }
    </>
     );
}

export default NewPassword;