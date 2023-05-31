import { useEffect, useState } from "react";
import { deleteRequest, getRequest, patchRequest } from "../services/apiService";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export interface IUser{
   _id:number;
   name:string;
   email:string;
   password:string;
   image:string;
   weight:string
   admin:boolean;
}

function UserManagement() {

    const [usersList,setUsersList]=useState<Array<IUser>>([]);
    const navigate=useNavigate();
    let index=0;

    function fetchRecipes(){
    const res=getRequest('users');
    if(!res) return;
    res.then(response=>response.json())
       .then(json=>{
        setUsersList(json);
       })
   }

   useEffect(fetchRecipes,[]);
   
   function handleChange(userAdmin:boolean,userId:number){
      const id=''+userId;
      const userAdminData=!userAdmin;
      const data={userAdminData}
     const res=patchRequest(`users/admin-status/${id}`,data);
       if(!res) return;
        res.then(res=>res.json())
           .then(json=>{
            if(json.error){
                console.log(json.error)
                return;
            }

            navigate(`/adminMessage/${id}`);
           })
    
   }


    return ( 
        <>
        <Link className="btn ms-5" to={"/"}><i className="bi bi-arrow-left-circle fs-2"></i></Link>
        <h1 className="mt-5 mb-5 text-center">Users List:</h1>

        <div className="p-5">
           

            <table className="table">
               <thead>
                 <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    {/* <th scope="col">Image</th> */}
                    <th scope="col">Admin</th>
                    <th scope="col"></th>
                 </tr>
               </thead>

               <tbody>
                {
                usersList.map((user:IUser)=>
                 <tr key={user._id}>
                    <th scope="row">{index=index+1}</th>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    
                    <td>
                      <input
                      type="checkbox"
                      checked={user.admin}
                      onChange={()=>handleChange(user.admin,user._id)}
                       />
                    </td>

                    <td>
                      <Link  to={`/deleteuser/${user._id}`}  className="btn">
                        <i className="bi-trash"></i>
                      </Link>
                    </td>

                 </tr>
                   )
                }

               </tbody>
            </table>
            
        </div>
        </>

     );
}

export default UserManagement;