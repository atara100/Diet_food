import { useContext, useEffect, useState} from "react";
import { AppContext } from "../App";
import Recipes, { IRecipe } from "./Recipes";
import { Link } from "react-router-dom";
import RecipeCard from "../components/RecipeCard";

function Home() {
        
    const context=useContext(AppContext);
    if(!context) return <div>Error</div>
    const userName=context.userName;
    

    return ( 
        <>
        {
            userName.length<=0 &&
            <>           
            <section id="hero" className="d-flex align-items-center justify-content-center">
             <div className="container position-relative">
               <h1>Welcome to Diet food</h1>
               <h2>please login to see all the diet recipes</h2>
               <Link to={"/login"} className="btn-get-started scrollto">Login</Link>
             </div>
            </section>
 
            <section id="about" className="about">
            <div className="container">

                <div className="row">
                <div className="col-lg-6">
                    <img src="assets/img/about.jpg" className="img-fluid" alt=""/>
                </div>
                <div className="col-lg-6 pt-4 pt-lg-0">
                    <h3>Diet food is a website that set a goal for himself to help for people that want to lose weight and eat healthy food.</h3>
                    <p>
                    we, in Diet food accessible hundreds of recipes with low calorie but they are delicious, Colorful and stimulating.
                    </p>
                    <div className="row">
                    <div className="col-md-6">
                        <i className="bx bx-receipt"></i>
                        <h4>Filter the recipes</h4>
                        <p>There is an option to filter the multitude of recipes according to the maximum number of calories
                        that the user select.</p>
                    </div>
                    <div className="col-md-6">
                        <i className="bx bx-cube-alt"></i>
                        <h4>Favourites</h4>
                        <p>There is also an option to sign  the recipes that you liked as a favourites and find them every time in a
                        in a separate tab.</p>
                    </div>
                    </div>
                </div>
                </div>

            </div>
            </section>

            <section id="testimonials" className="testimonials text-align-center">
              <h1 className="text-center mb-3">What will we cook today?</h1>
              <div className="container d-flex justify-content-around ">
                <div className="card p-3 me-3  col col-10 col-sm-12 col-md-4 col-lg-3 mb-3">
                  <img src='https://cdn.pixabay.com/photo/2017/03/19/14/59/italian-salad-2156723__340.jpg' className="card-img-top" alt='Healthy chicken salad'/>
                  <div className="card-body">
                   <h5 className="card-title">Healthy chicken salad</h5>
                   <h6 className="card-title">This easy-to-prepare healthy chicken salad is filled with zingy flavours - the simplified version is great for kids' lunchboxes too</h6>
                   <hr />
                   <h6 className="card-text"><b>calories:</b> 110 </h6>
                  </div>
                </div>

                <div className="card p-3 me-3  col col-10 col-sm-12 col-md-4 col-lg-3 mb-3">
                  <img src='https://cdn.pixabay.com/photo/2019/05/01/16/57/glass-noodle-salad-4171364_960_720.jpg' className="card-img-top" alt='Healthy chicken salad'/>
                  <div className="card-body">
                   <h5 className="card-title">Crunchy noodle salad</h5>
                   <h6 className="card-title">Make our noodle salad for a light lunch or side – toasted dried noodles are combined with fresh veg and citrus to make this satisfying recipe</h6>
                   <hr />
                   <h6 className="card-text"><b>calories:</b> 430 </h6>
                  </div>
                </div>

                <div className="card p-3 me-3  col col-10 col-sm-12 col-md-4 col-lg-3 mb-3">
                  <img src='https://cdn.pixabay.com/photo/2016/11/06/23/36/pancake-1804463__340.jpg' className="card-img-top" alt='Healthy chicken salad'/>
                  <div className="card-body">
                   <h5 className="card-title">Eggs benedict pancakes</h5>
                   <h6 className="card-title">Try an indulgent twist on a classNameic breakfast dish with our eggs benedict pancakes. This easy but impressive stack makes a filling brunch for a crowd</h6>
                   <hr />
                   <h6 className="card-text"><b>calories:</b> 605</h6>
                  </div>         
                </div>
               </div>
               <div className="d-flex justify-content-center">
                 <Link to={'/login'} className="btn btn-warning rounded-pill mt-3">To the full recipes please login</Link>
               </div>
            </section>

            <section id="contact" className="contact ">
              <div className="container">

                <div className="section-title">
                  <h2>Contact</h2>
                </div>

                <div className="row">

                  <div className="col-lg-6  mx-auto">

                    <div className="row">
                      <div className="col-md-12">
                        <div className="info-box">
                          <i className="bx bx-map"></i>
                          <h3>Our Address</h3>
                          <p>Shivat zion 25, Haifa</p>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="info-box mt-4">
                          <i className="bx bx-envelope"></i>
                          <h3>Email Us</h3>
                          <p>al0583230109@gmail.com </p>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="info-box mt-4">
                          <i className="bx bx-phone-call"></i>
                          <h3>Call Us</h3>
                          <p>+1 5589 55488 55 <br/>+1 6678 254445 41</p>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </section>

        </>
        }
        
        {
            userName.length>0 &&           
            <Recipes/>
        }
        </>
     );
}

export default Home;