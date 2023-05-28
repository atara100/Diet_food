import { useContext, useEffect, useState } from "react";
import RecipeCard from "../components/RecipeCard";
import SearchFilteringBar from "../components/ButtonsBar";
import {  getRequest, patchRequest } from "../services/apiService";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../App";

export interface IRecipe{
   _id:number;
   image:string;
   title:string;
   description:string;
   ingredients:string
   method:string;
   calories:number;
}

export enum FilterCalories{
  all='all',
  upTo300='300',
  upTo500= '500',
  upTo800= '800',
  over800='801'
}


function Recipes() {

   const [recipes,setRecipes]=useState<Array<IRecipe>>([]);
   const [search,setSearch]=useState('');
   const [filtered,setFiltered]=useState([...recipes]);
   const [selectedFilter,setSelectedFilter]=useState(FilterCalories.all);

   function fetchRecipes(){
    const res=getRequest('recipes');
    if(!res) return;
    res.then(response=>response.json())
       .then(json=>{
        setRecipes(json);
        setFiltered(json);
       })
   }

   useEffect(fetchRecipes,[]);
  
    const context=useContext(AppContext);
    if(!context) return <div>Error</div>
    const userAdmin=context.userAdmin;
    const userId=context.userId;
    const userFavourites=context.userFavourites;
    const updateUserFavourites=context.updateUserFavourites;

    function filterByCalories(calorie:FilterCalories,recipes:Array<IRecipe>):Array<IRecipe>{
      if(calorie===FilterCalories.all){
        
         return recipes;
      }

    return recipes.filter(recipe=> recipe.calories<=+(calorie));
     }

    function handleFilterChange(e:React.ChangeEvent<HTMLSelectElement>){
       const value=e.target.value as FilterCalories;
       
       filterChange(value);
    }
    function filterChange(value:FilterCalories){
       const filteredData=filterByCalories(value,[...recipes]);

       setSelectedFilter(value);
        setSearch('');
       setFiltered(filteredData);     
    }

    function handleSearch(e:React.ChangeEvent<HTMLInputElement>){

      const value=e.target.value;
      let res=[...recipes]
      if(value ){

      const stripVal=value.trim().toLowerCase()
      res=[...recipes].filter(recipe=>recipe.title.toLowerCase().includes(stripVal));      
      }
    
       setSearch(value);
       setFiltered(res);
       
    }

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
   

    return ( 
    <>
        <h1 className="text-center">All Recipes </h1> 

          <SearchFilteringBar 
           search={search} handleSearch={handleSearch} 
           selectedFilter={selectedFilter}
           handleFilterChange={handleFilterChange}
          />

        {
          userAdmin &&

          <div className="d-flex align-items-center">
              <Link to={`/addrecipe`} className="btn btn-primary mb-3 ms-5">
                 <i className="bi bi-plus-lg"></i> Add Recipe
              </Link>
            </div>
        }
        
        <div className="mx-5 d-flex row justify-content-around">
        {
            filtered.map((recipe:IRecipe)=> 
            <div key={recipe._id} className="card p-3 me-5 col-sm-6 col-md-4 col-lg-3 mb-3">            
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

              <div className="d-flex d-flex justify-content-between mt-3">
                
                <Link to={`/contentDetails/${recipe._id}`} className="btn btn-light">see more <i className="bi bi-caret-right"></i></Link>

                <button onClick={()=>handleFavourites(recipe)} className="btn btn-lg">
                  {
                    userFavourites.includes(`${recipe._id}`) &&
                    <i className="bi bi-suit-heart-fill"></i>
                  }
                  {
                    !userFavourites.includes(`${recipe._id}`) &&
                    <i className="bi bi-suit-heart"></i>
                  }
                  
                </button>
              </div>
              
            </div>
            )
        }
        </div>
    </>       
    );
}

export default Recipes;