import { useContext, useState } from "react";
import Title from "../components/Title";
import Joi from "joi";
import { AppContext } from "../App";
import { Link } from "react-router-dom";


function Login() {
     
    const [email,setEmail]=useState<string>('');
    const [password,setPassword] = useState<string>('');
    const [error,setError] = useState<string>('');

    const context=useContext(AppContext);
    if(!context) return <div>Error</div>
    const login = context.login;

    function submit(){
        const schema=Joi.object().keys({
            email:Joi.string().required().min(6).max(255).email({tlds:{allow:false}}),
            password:Joi.string().required().min(6).max(30)
        });

        const {error,value}=schema.validate({
            email,password
        });

        if(error){
            setError(error.message);
            return;
        }
        setError('');
        login(value);
    }

    return ( 
    <>
            <Title
                main="Login"
                sub="You can signin here with your account"
            />

        <div className="form-max-w m-aotu row w-50 p-3 mx-auto mt-5">

            <div className="mb-3" >
                <input
                    type="email" className="form-control rounded-pill" placeholder="Email"
                    value={email} onChange={(e)=>setEmail(e.target.value)}/>
            </div>
            <div className="mb-3">
                <input
                    type="password" className="form-control rounded-pill" placeholder="Password"
                    value={password} onChange={(e)=>setPassword(e.target.value)}/>
            </div>

            <button
                className="btn btn-warning btn-lg w-50 mx-auto rounded-pill mt-3" onClick={submit}>
                Login
            </button>
            
        <div className="m-auto mt-5 text-center">
           <Link to="/passwordReset" >
             Forgot password ?
           </Link>
        </div>
            {
                error &&
                <div className="text-danger text-center">
                    {error}
                </div>
            }
        </div>
    </>
    );
}

export default Login;