import { FilterCalories } from "../pages/Recipes";

interface Props{
    search:string;
    handleSearch:Function;
    selectedFilter:FilterCalories;
    handleFilterChange:(e:React.ChangeEvent<HTMLSelectElement>)=>void;
}



function SearchFilteringBar({search,handleSearch,selectedFilter,handleFilterChange}:Props) {
  const filterByCalories=Object.values(FilterCalories);
   
    return ( 
       <div className="d-flex px-5 mt-5 row">        
          <div className="d-flex mb-5 col-sm-2 col-md-10 col-lg-8">

            <div className="d-flex align-items-center me-5 mt-5">
              <input className="forn-control p-1 mb-3" placeholder='Search' type="text"
              value={search} onChange={(e)=> handleSearch(e)}/>
            </div>
        
            <div className="d-flex row align-items-center ">
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