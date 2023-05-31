import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getRequest } from "../services/apiService";

function AdminMessage() {

    const{id}=useParams();
     const [error, setError] = useState<string>('');
     const [name,setName] = useState<string>('');
     const [admin,setAdmin] = useState<boolean>();

    useEffect(()=>{
        const res=getRequest(`users/get-user/${id}`);
        if(!res) return;
        res.then(res=>res.json())
           .then(json=>{
            if(json.error){
                setError(json.error);
                return;
            }
            
            setName(json.name);
            setAdmin(json.admin);
           })
    },[id])


    return ( 
        <>
        <Link className="btn ms-5" to={"/usermanagement"}><i className="bi bi-arrow-left-circle fs-2"></i></Link>

        {
           admin &&
           <div className="card text-bg-success mb-3  p-3 w-75 mx-auto mt-5 mb-5">
            <div className="card-header fs-4">For your attention:</div>
            <div className="card-body">
              <h5 className="card-title fs-3">{name} is admin now!</h5>
              <p className="card-text fs-5">
                He has permissions to create, update and delete recipe <br/> 
                He has also access to the user management tab. 
              </p>
            </div>
           </div>
        }

        {
           !admin &&

           <div className="card text-bg-danger mb-3 ms-5 me-5 p-3 w-75 mx-auto mt-5 mb-5">
             <div className="card-header fs-4">For your attention:</div>
             <div className="card-body">
               <h5 className="card-title fs-3">{name} is not admin now!</h5>
               <p className="card-text fs-5">
                He dose not have permissions to create, update and delete recipe <br/> 
                He dose not have also access to the user management tab.
               </p>
             </div>
           </div>
        }

        {
        error &&
         <div className="text-danger text-center"> {error}</div>
        }

        </>

     );
}

export default AdminMessage;