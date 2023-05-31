import { Link, useNavigate, useParams } from "react-router-dom";
import Title from "../components/Title";
import { deleteRequest } from "../services/apiService";
import { toast } from "react-toastify";

function DeleteUser() {

    const navigate=useNavigate();
    const{id}=useParams();

    function delUser(){
        const res=deleteRequest(`users/${id}`);
        if(!res) return;

        res.then(res=>res.json())
           .then(json=>{
            toast.success('User removed successfully!', {
             position: "top-center",
             autoClose: 5000,
             hideProgressBar: false,
             closeOnClick: true,
             pauseOnHover: true,
             draggable: true,
             progress: undefined,
             theme: "light",
             })
            navigate('/usermanagement');
            })
    }

    return (  
       <>
        <Title main="Delete user" sub=""/>
        <div className="card text-white bg-danger mt-5 mb-3 w-75 p-3 mx-auto ">
          <div className="card-header fs-3 text-center"></div>
            <div className="card-body">
            <h3 className="card-title text-center">Are you sure you want delete this user?</h3>

            <div className="d-flex mt-5 mx-auto">
              <button onClick={delUser} className="btn btn-primary w-25 me-3 mx-auto">
                  Delete
              </button>

              <Link to='/usermanagement' className="btn btn-secondary w-25 mx-auto" >
                  Cancele
              </Link>
            </div>
           </div>
        </div>
        </> 
    );
}

export default DeleteUser;