import { type } from "os";
import { FilterCalories } from "../pages/Recipes";
import { log } from "console";

interface Props{
    search:string;
    handleSearch:Function;
    selectedFilter:FilterCalories;
    handleFilterChange:(e:React.ChangeEvent<HTMLSelectElement>)=>void;
}



function SearchFilteringBar({search,handleSearch,selectedFilter,handleFilterChange}:Props) {
  const filterByCalories=Object.values(FilterCalories);
   
    return ( 
       <div className="d-flex px-5 mt-5">        
          <div className="d-flex ">

            <div className="d-flex align-items-center me-5">
              <input className="forn-control p-1 mb-3" placeholder='Search' type="text"
              value={search} onChange={(e)=> handleSearch(e)}/>
            </div>
        
            <div className="d-flex align-items-center ">
             <label className="mx-3" htmlFor="filter" >Filter by maximum number of calories:</label>
             <select value={selectedFilter} onChange={handleFilterChange} 
               className="form-select" name="filter" id="filter">
                <>
             {
              filterByCalories.map(calorieNum=>
                         
              <option key={calorieNum} value={calorieNum}> {calorieNum}</option>
               )
            }
            </>
             </select>
            </div>
        
          </div>
        </div> 
     );
}

export default SearchFilteringBar;