import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AppContext } from "../App";
import Logout from "../auth/Logout";

function Header() {

    const context=useContext(AppContext);
    if(!context) return <div>Error</div>
    const userName = context.userName;
    
    return ( 
 <header>
   <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-5">
     <div className="container-fluid ">   
    <NavLink className="navbar-brand fs-4" to="/">
      <i className="bi bi-speedometer2 fs-4 me-1"></i> Diet Food
    </NavLink>

    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
     aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
    </button>

     <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                          
                            <li className="nav-item">
                                <NavLink
                                    className="nav-link fs-5"
                                    aria-current="page"
                                    to="/about"
                                >
                                    About
                                </NavLink>
                            </li>


                            <li className="nav-item">
                                <NavLink
                                    className="nav-link fs-5"
                                    aria-current="page"
                                    to="/favourites"
                                >
                                    My Favorites
                                </NavLink>

                            </li>               
                        </ul>
              {
                  userName.length>0 &&
                   <h5 className="card-title mx-auto  text-white">Hello! {userName}</h5>
              }

            
                        <ul className="navbar-nav d-flex">

              {
                 userName.length<=0 &&
                <>

                           <li className="nav-item">
                                <NavLink
                                    className="nav-link fs-5"
                                    aria-current="page"
                                    to="/signup"
                                >
                                    Sign Up
                                </NavLink>
                            </li>
                            
                            <li className="nav-item">
                                <NavLink
                                    className="nav-link fs-5"
                                    aria-current="page"
                                    to="/login"
                                >
                                    Login
                                </NavLink>
                            </li>
                </>
            }

            {
                userName.length>0 &&

                           <li className="nav-item">
                                <Logout /> 
                           </li>

            }
                          
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
     );
}

export default Header;