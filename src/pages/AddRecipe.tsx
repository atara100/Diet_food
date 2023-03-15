import { useState } from "react";
import Title from "../components/Title";
import Joi from "joi";
import { IRecipe } from "./Recipes";
import { postRequest } from "../services/apiService";
import { Link, useNavigate } from "react-router-dom";

function AddRecipe() {

    const navigate=useNavigate();
    const [image,setimage]=useState<string>('');
    const [title,setTitle]=useState<string>('');
    const [description,setdescription]=useState<string>('');
    const [ingredients,setIngredients]=useState<string>('');
    const [method,setMethod]=useState<string>('');
    const [calories,setCalories]=useState<string>('');
    const [error, setError] = useState<string>('');

    function handleClick(){
        const schema=Joi.object().keys({
            image:Joi.string().min(10),
            title:Joi.string().required().min(3),
            description:Joi.string().required().min(10).max(200),
            ingredients:Joi.string().required().min(10),
            method:Joi.string().required().min(10),
            calories:Joi.string().required().min(1)
        });

        const {error,value}=schema.validate({
            image,title,description,ingredients,method,calories
        });

        if(error){
            setError(error.message)
            return;
        }
        setError('');
        createRecipe(value);
    }

    function createRecipe(recipe:IRecipe){
        const res=postRequest('recipes/',recipe);
        if(!res) return;
        res.then(res=>res.json())
            .then(json=>{
            if(json.error) {
                alert(json.error);
                return;
            }
            alert('Added succses🤗');
            navigate('/');
            });
    }
    

    return ( 
       <>
        <Title main="New Recipe"
                sub="create your recipe"
        />

        <div className=" form-max-w m-aotu row w-50 p-3 mx-auto mt-5">

            <div className="mb-3">
                <label className="mb-2" htmlFor="">Dish Image</label>
               <input className="form-control" type="text" 
                value={image} onChange={(e)=>setimage(e.target.value)}/>
            </div>

            <div className="mb-3 ">
                <label className="mb-2" htmlFor="">Dish Name</label>
                <input className="form-control" type="text"
                 value={title} onChange={(e)=>setTitle(e.target.value)}/>
            </div>

            <div className="mb-3">
                <label className="mb-2" htmlFor="">Description</label>
               <input className="form-control" type="text" 
                value={description} onChange={(e)=>setdescription(e.target.value)}/>
            </div>

            <div className="mb-3">
                <label className="mb-2" htmlFor="">Ingredients:</label>
               <input className="form-control" type="text" 
                value={ingredients} onChange={(e)=>setIngredients(e.target.value)}/>
            </div>

            <div className="mb-3">
                <label className="mb-2" htmlFor="">Method:</label>
               <input className="form-control" type="text" 
                value={method} onChange={(e)=>setMethod(e.target.value)}/>
            </div>

            <div className="mb-3">
                <label className="mb-2" htmlFor="">Calories:</label>
               <input className="form-control" type="text" 
                value={calories} onChange={(e)=>setCalories(e.target.value)}/>
            </div>

            <div className="d-flex">
              <button onClick={handleClick} className="btn btn-primary btn-lg w-50 mx-auto">
                  Create Recipe
              </button>

              <Link to='/' className="btn btn-secondary ms-3 me-3" >
                  Cancele
              </Link>
            </div>

        </div>

        {
        error &&
         <div className="text-danger text-center"> {error}</div>
        }
     </> 
     );
}

export default AddRecipe;