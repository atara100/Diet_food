import { useEffect, useState } from "react";
import { getRequest, patchRequest, postRequest } from "../services/apiService";
import React from "react";

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
    const [checked,setChecked]=React.useState<boolean>(false);
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
   
   function handleChange(checked:any,userId:number){
    console.log('changed');
    
    if(checked){
        // const res=patchRequest(`users/${userId}`);
    }else{
        checked=true;
    }   
    
   }

   function deleteUser(){
    console.log('delete');
    
   }

    return ( 
        <>
        <h1 className="mt-5 mb-5 text-center">Users List:</h1>

        <div>
           

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
                      onChange={()=>handleChange(checked,user._id)}
                       />
                    </td>

                    <td>
                      <button onClick={deleteUser} className="btn btn-default">
                        <i className="bi-trash "></i>
                      </button>
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