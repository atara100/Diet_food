import { Navigate } from "react-router-dom";
import { verifyToken } from "./tokenMgmt";
import { toast } from "react-toastify";

interface Props{
    children: React.ReactNode
}

function RouteGuard({children}:Props) {
     return verifyToken() ? (
        <>{children}</>
    ) : (
        
       <>
        {
            
        toast.error('You have login to access this page!', {
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

        <Navigate to={'/login'}  />
        </>
        
    )
}

export default RouteGuard;