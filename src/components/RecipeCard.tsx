import { IRecipe } from "../pages/Recipes";

interface Props{
    recipe:IRecipe
}

function RecipeCard({recipe}:Props) {
    return (         
            <>
              <img src={recipe.image} className="card-img-top" alt={recipe.title}/>
              <div className="card-body d-flex flex-column ">
                 <h5 className="card-title p-2">{recipe.title}</h5>
                 <h6 className="card-title p-2">{recipe.description}</h6>
                 <hr />
                 <h6 className="card-text"><b>calories:</b> {recipe.calories} </h6>
               </div>
            </>            
     );
}

export default RecipeCard;