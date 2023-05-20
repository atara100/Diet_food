import { Link } from "react-router-dom";

function Footer() {
    return ( 
        <>
        <footer id="footer">
              <div className="footer-top">
                <div className="container">
                  <div className="row">

                    <div className="col-lg-3 col-md-6 footer-contact">
                      <h3>Diet Food</h3>
                      <p>
                      Shivat zion 25 <br/>
                       Haifa <br/> <br/>
                       <strong>Phone:</strong> +1 5589 55488 55<br/>
                       <strong>Email:</strong> al0583230109@gmail.com<br/>
                      </p>
                    </div>

                   <div className="col-lg-2 col-md-6 footer-links">
                     <h4>Useful Links</h4>
                     <ul>
                       <li><i className="bx bx-chevron-right"></i> <Link to={'/recipes'}>Recipes</Link></li>
                       <li><i className="bx bx-chevron-right"></i> <Link to={'/about'}>About</Link></li>
                       <li><i className="bx bx-chevron-right"></i> <Link to={'/favourites'}>Favourites</Link></li>
                     </ul>
                   </div>
                 </div>
               </div>
             </div>
             <div className="container d-md-flex py-4">
               <div className="me-md-auto text-center text-md-center">
                 <div className="copyright">
                   &copy; Created by Atara Levi 2023
                 </div>
               </div>
             </div>
           </footer>
      </>
     );
}

export default Footer;