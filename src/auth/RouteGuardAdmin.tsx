import { useContext } from "react";
import { AppContext } from "../App";
import { toast } from "react-toastify";
import { Navigate} from "react-router-dom";
import { verifyToken } from "./tokenMgmt";

interface Props{
    children: React.ReactNode
}


function RouteGuardAdmin({children}:Props) {

    const context=useContext(AppContext);
    if(!context) return <div>Error</div>
    const userAdmin = context.userAdmin;
    
    return verifyToken() &&  (userAdmin) ? (
        <>{children}</>
    ) : (
        <>
        {
            
        toast.error('You dont have permission to this page!', {
             position: "top-center",
             autoClose: 5000,
             hideProgressBar: false,
             closeOnClick: true,
             pauseOnHover: true,
             draggable: true,
             progress: undefined,
             theme: "light",
             })
             
        }

        <Navigate to={'/'}  />
        </>
    )
}

export default RouteGuardAdmin;