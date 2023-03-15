import { IRecipe } from "../pages/Recipes";

interface Props{
    recipe:IRecipe
}

function RecipeCard({recipe}:Props) {
    return (         
            <>
              <img src={recipe.image} className="card-img-top" alt={recipe.title}/>
              <div className="card-body">
                 <h5 className="card-title">{recipe.title}</h5>
                 <h6 className="card-title">{recipe.description}</h6>
                 <hr />
                 <h6 className="card-text"><b>calories:</b> {recipe.calories} </h6>
                 {/* <button onClick={()=>buttonLike(card)} className="btn"><i className={`bi bi-hand-thumbs-up`}></i></button> */}
               </div>
            </>            
     );
}

export default RecipeCard;