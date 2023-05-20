import { useEffect, useState } from "react";
import { getRequest } from "../services/apiService";
import { Link, useParams } from "react-router-dom";

function ContentDetails() {

    const{id}=useParams();

    const [error,setError]=useState<string>('');
    const [title,setTitle]=useState<string>('');
    const [image,setImage]=useState<string>('');
    const [description,setDescription]=useState<string>('');
    const [ingredients,setIngredients]=useState<string>('');
    const [method,setMethod]=useState<string>('');
    const [calories,setCalories]=useState<string>('');

    useEffect(()=>{
        const res=getRequest(`recipes/${id}`);
        if(!res){
          setError('Error get the data');
          return;
        } 
        res.then(res=>res.json())
           .then(json=>{
           setTitle(json.title);
           setImage(json.image);
           setDescription(json.description);
           setIngredients(json.ingredients);
           setMethod(json.method);
           setCalories(json.calories);
           })  
    },[id]);
    
    return (
      <>
        <Link className="btn ms-5" to={"/"}><i className="bi bi-arrow-left-circle fs-2"></i></Link>
        <div className=" w-75 mx-auto mt-3">
          <h2 className="card-title">{title}</h2>
          <div className="card-body">
            <img src={image} className="img-thumbnail card-img-top mt-3 mb-3 w-50 mx-auto" alt={title}/>            
            <h5 className="card-text">{description}</h5>
            <div className="d-flex justify-content-between mt-5 mb-3" >
              <p className="card-text me-5"><b>Ingredients:</b> <br/>{ingredients}</p>
              <p className="card-text ms-5"><b>Method:</b><br/> {method}</p>
            </div>
            <p className="card-text fs-5"><i className="bi bi-speedometer2"></i> <b>calories:</b> {calories}</p>
          </div>
        </div>
      </>

      );
}

export default ContentDetails;