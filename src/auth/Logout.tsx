import { useContext } from "react";
import { AppContext } from "../App";


function Logout() {

    const context=useContext(AppContext);
    if(!context) return <div>Error</div>
    const handleLogout=context.handlelogout;

    return ( 
        <button
            onClick={(e) =>handleLogout()}
            className="btn btn-link nav-link fs-5 text-light " 
        >
            Log Out
        </button>
     );
}

export default Logout;