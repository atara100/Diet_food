import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../App";
import RecipeCard from "../components/RecipeCard";
import { getRequest } from "../services/apiService";
import { IRecipe } from "./Recipes";

function Favourites() {

    const [recipes,setRecipes]=useState<Array<IRecipe>>([]);

    useEffect( fetchFavourites,[]);

    const context=useContext(AppContext);
    if(!context) return <div>Error</div>
    const userId=context.userId;
    const userAdmin=context.userAdmin;

    function fetchFavourites(){
        const res=getRequest(`users/${userId}`);
        if(!res) return;

        res.then(response=>response.json())
       .then(json=>{
        setRecipes(json);             
       })
    }
  
    return ( 
    <>
        <h1>favourites</h1>

        <div className="mx-5 d-flex">
        {
           recipes.map((recipe:IRecipe)=> 
            <div key={recipe._id} className="card p-3 me-3  col col-10 col-sm-12 col-md-4 col-lg-3 mb-3">            
              <RecipeCard recipe={recipe}/>

              {
              userAdmin &&

              <div className="d-flex mt-3">
                <Link  to={`/updaterecipe/${recipe._id}`}  className="btn me-3">
                      <i className="bi-pen"></i> 
                </Link>

                <Link  to={`/deleterecipe/${recipe._id}`}  className="btn ">
                      <i className="bi-trash"></i>
                </Link>
              </div>
              }
              
            </div>
           )
        }
        </div>
        {
          recipes.length<1 &&
          <div className="text-danger text-center">
            You have not selected favourites yet!
          </div>
        }
    </>
    );
}

export default Favourites;