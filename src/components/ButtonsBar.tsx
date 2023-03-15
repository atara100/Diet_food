interface Props{
    search:string;
    handleSearch:Function;
}

function SearchFilteringBar({search,handleSearch}:Props) {
    return ( 
       <div className="d-flex px-5 mt-5">        
          <div>

            <div className="d-flex align-items-center">
              <input className="forn-control p-1 mb-3" placeholder='Search' type="text"
              value={search} onChange={(e)=> handleSearch(e)}/>
            </div>

          </div>
        </div> 
     );
}

export default SearchFilteringBar;