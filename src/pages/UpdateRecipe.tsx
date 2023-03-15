import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Title from "../components/Title";
import { getRequest, patchRequest } from "../services/apiService";
import Joi from 'joi';
import { IRecipe } from "./Recipes";

function UpdateRecipe() {

    const{id}=useParams();

    const navigate=useNavigate();
    const [image,setimage]=useState<string>('');
    const [title,setTitle]=useState<string>('');
    const [description,setdescription]=useState<string>('');
    const [ingredients,setIngredients]=useState<string>('');
    const [method,setMethod]=useState<string>('');
    const [calories,setCalories]=useState<string>('');
    const [error, setError] = useState<string>('');

    useEffect(()=>{
        const res=getRequest(`recipes/${id}`);
        if(!res) return;
        res.then(res=>res.json())
           .then(json=>{
            if(json.error){
                setError(json.error);
                return;
            }
            setimage(json.image);
            setTitle(json.title);
            setdescription(json.description);
            setIngredients(json.ingredients);
            setMethod(json.method);
            setCalories(json.calories);
           })
    },[id])

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
        updateRecipe(value);
    }

    function updateRecipe(data:IRecipe){
        const res=patchRequest(`recipes/${id}`,data);
        if(!res) return;
        res.then(res=>res.json())
           .then(json=>{
            if(json.error){
                setError(json.error)
                return;
            }
            alert('Updated succses🤗');
            navigate('/');
           })
    }

    return ( 
        <>
        <Title main="Update Recipe"
                sub="update this recipe"
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

            <button onClick={handleClick} className="btn btn-primary btn-lg w-50 mx-auto">
                Update 
            </button>

            <Link to='/' className="btn btn-secondary ms-3 me-3" >
                Cancele
            </Link>

        </div>

        {
        error &&
         <div className="text-danger text-center"> {error}</div>
        }
     </>
     );
}

export default UpdateRecipe;