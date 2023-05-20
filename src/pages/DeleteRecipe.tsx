import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Title from "../components/Title";
import { deleteRequest, getRequest, patchRequest } from "../services/apiService";
import { IRecipe } from "./Recipes";
import { AppContext } from "../App";
import { log } from "console";

function DeleteRecipe() {

    const navigate=useNavigate();
    const{id}=useParams();
    const [error,setError]=useState<string>('');
    const [title,setTitle]=useState<string>('');

    useEffect(()=>{
        const res=getRequest(`recipes/${id}`);
        if(!res){
          setError('Error get the data');
          return;
        } 
        res.then(res=>res.json())
           .then(json=>{
           setTitle(json.title);
           })  
    },[id]);

    const context=useContext(AppContext);
    if(!context) return <div>Error</div>
    const userId=context.userId;
    const updateUserFavourites=context.updateUserFavourites;
    
    function handleFavourites(recipe:IRecipe){
      const res=patchRequest(`users/${userId}`,recipe)
      if(!res) return;
            res.then(res => res.json())
            .then(json => {
                if (json.error) {
                    console.log(json.error);
                    return;
                }
                updateUserFavourites(json.favourites); 
                          
              })
    }
 
    
    function delRecipe(){
 
       const recipe=getRequest(`recipes/${id}`);
        if(!recipe){
          setError('Error get the data');
          return;
        } 
        recipe.then(recipe=>recipe.json())
           .then(recipe=>{           
            handleFavourites(recipe);
           }) 

        const res=deleteRequest(`recipes/${id}`);
        if(!res) return;

        res.then(res=>res.json())
           .then(json=>{
            
            navigate('/');
            })
    }

    return ( 
        <>
        <Title main="Delete recipe" sub=""/>
        <div className="card text-white bg-danger mt-5 mb-3 w-75 p-3 mx-auto ">
          <div className="card-header fs-3 text-center">{title}</div>
            <div className="card-body">
            <h3 className="card-title text-center">Are you sure you want delete this recipe?</h3>

            <div className="d-flex mt-5 mx-auto">
              <button onClick={delRecipe} className="btn btn-primary w-25 me-3 mx-auto">
                  Delete
              </button>

              <Link to='/' className="btn btn-secondary w-25 mx-auto" >
                  Cancele
              </Link>
            </div>
           </div>
        </div>
        </>
     );
}

export default DeleteRecipe;