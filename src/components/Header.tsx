import { useContext } from "react";
import { AppContext } from "../App";
import Logout from "../auth/Logout";
import {Navbar,Nav} from 'react-bootstrap'
import { Link } from "react-router-dom";

function Header() {

    const context=useContext(AppContext);
    if(!context) return <div>Error</div>
    const userName = context.userName;
    const userAdmin=context.userAdmin;
     
    return ( 
<>
<div className="">
   <Navbar bg="dark" variant="dark" expand="lg" className="">
    <> 
    <Navbar.Brand as={Link} to={'/'} className="navbar-brand fs-4">
      <i className="bi bi-speedometer2 fs-4 me-1"></i> Diet Food
    </Navbar.Brand>

    <Navbar.Toggle aria-controls="basic-navbar-nav" />

    <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
            <Nav.Link className="nav-link fs-5" as={Link} to={'/about'}>
                About
            </Nav.Link>

            <Nav.Link className="nav-link fs-5 " as={Link} to={'/favourites'}>
                My Favorites
            </Nav.Link>

            {
              userAdmin &&
              <Nav.Link className="nav-link fs-5 me-5" as={Link} to={'/usermanagement'}>
                    User Management
              </Nav.Link>
            }
                        

            {
                  userName.length>0 &&
                  <Nav.Link className="ms-5 fs-3 text-warning" >
                    Hello! {userName}
                  </Nav.Link>
            }

        </Nav>

        <Nav>
         {
            userName.length<=0 && 
            <>         

                <Nav.Link className="nav-link fs-5" as={Link} to={'/signup'}>
                 Sign Up
               </Nav.Link>

               <Nav.Link className="nav-link fs-5" as={Link} to={'/login'}>
                 Login
               </Nav.Link>

            </>            
         }

         {
            userName.length>0 &&
            <Nav.Link className="nav-link fs-5">
                 <Logout /> 
            </Nav.Link>
         }

       </Nav>


    </Navbar.Collapse>
    </>
    </Navbar>
    </div>
    </>
     );
}

export default Header;