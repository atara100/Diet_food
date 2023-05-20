import { Link } from "react-router-dom";

function About() {
    return (
        <>
        <div className="card mb-5 " >
         <img src="assets/img/about-page.jpg" className="card-img-top" alt="..."/>
         <div className="card-body w-75 mx-auto">
           <h1 className="card-title mb-5 text-center">About us...</h1>
           <p className="card-text fs-5 ms-5">
            Diet food is a website that set a goal for himself to help for people that want to lose weight and eat healthy
            food.
           </p>

           <p className="card-text fs-5 ms-5">
            healthy food and low calorie dont have to be not tasty, greyish and not stimulating.
           </p>

           <p className="card-text fs-5 ms-5">
            we are, in Diet food, accessible hundreds of recipes with low calorie but they are delicious, Colorful and stimulating.
           </p>

           <p className="card-text fs-5 ms-5">
            we built the site so that everyone can find the type of recipe he likes,
            everything is explained and clearly written including the number of calories in each dish.
           </p>

           <p className="card-text fs-5 ms-5">
            There is an option to filter the multitude of recipes according to the maximum number of calories
            that the user select
           </p>

           <p className="card-text fs-5 ms-5">
            There is also an option to sign  the recipes that you liked as a favourites and find them every time in a
            in a separate tab.
           </p>

           <p className="card-text fs-5 ms-5">
            To view the recipes you have register and login to the site.
           </p>

           <br/>

           <p className="card-text fs-5 ms-5">
            so, which recipe would you like to make today?
           </p>
           
         </div>

         <div className="d-flex justify-content-center">
                 <Link to={'/login'} className="btn btn-warning rounded-pill mt-5 mb-5 fs-5">To the full recipes please login</Link>
               </div>
        </div>
        {/* <h1>About us</h1>
        <p>
            Diet food is a website that set a goal for himself to help for people that want to lose weight and eat healthy
            food.

            healthy food and Low calorie dont have to be not tasty, greyish and not stimulating.

            we, in Diet food accessible hundreds of recipes with low calorie but they are delicious, Colorful and stimulating.

            we built the site so that everyone can find the type of recipe he likes,
            everything is explained and clearly written including the number of calories in each dish.

            There is an option to filter the multitude of recipes according to the maximum number of calories
            that the user select.

            There is also an option to sign  the recipes that you liked as a favourites and find them every time in a
            in a separate tab.

            To view the recipes you have register and login to the site.

            so, which recipe would you like to make today?

 
        </p> */}
        </> 
     );
}

export default About;