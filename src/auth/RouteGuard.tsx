import { Navigate } from "react-router-dom";
import { verifyToken } from "./tokenMgmt";

interface Props{
    children: React.ReactNode
}

function RouteGuard({children}:Props) {
     return verifyToken() ? (
        <>{children}</>
    ) : (
        
       <Navigate to={'/login'}  />
        
    )
}

export default RouteGuard;