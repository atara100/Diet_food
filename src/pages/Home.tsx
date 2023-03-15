import { useContext} from "react";
import { AppContext } from "../App";
import Title from "../components/Title";
import Recipes from "./Recipes";


function Home() {

    const context=useContext(AppContext);
    if(!context) return <div>Error</div>
    const userName=context.userName;

    return ( 
        <>
        {
            userName.length<=0 &&           
            <Title main ="HOME" sub={`welcome! ${context.userName}`}/>
        }
        
        {
            userName.length>0 &&           
            <Recipes/>
        }
        </>
     );
}

export default Home;