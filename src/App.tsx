import React, { createContext, useState } from 'react';
import './App.css';
import { removeToken, setToken } from './auth/tokenMgmt';
import { postRequest } from './services/apiService';
import {Route, Routes, useNavigate} from 'react-router-dom';
import Login from './auth/Login';
import Home from './pages/Home';
import SignUp from './auth/SignUp';
import About from './pages/About';
import Header from './components/Header';
import Footer from './components/Footer';
import Recipes from './pages/Recipes';
import RouteGuard from './auth/RouteGuard';
import AddRecipe from './pages/AddRecipe';
import UpdateRecipe from './pages/UpdateRecipe';
import DeleteRecipe from './pages/DeleteRecipe';
import Favourites from './pages/Favourites';
import PasswordReset from './auth/PasswordReset';
import ContentDetails from './pages/ContentDetails';
import NewPassword from './auth/NewPassword';
import RouteGuardAdmin from './auth/RouteGuardAdmin';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserManagement from './pages/UserManagement';
import DeleteUser from './pages/DeleteUser';
import AdminMessage from './pages/AdminMessage';

interface ILoginData{
  email:string,
  password:string
}

interface Context{
  login:Function,
  userId:string,
  userName:string,
  handlelogout:Function,
  userAdmin:boolean,
  userFavourites:Array<string>,
  updateUserFavourites:Function
}

export const AppContext=createContext<Context | null>(null);

function App() {

  const navigate=useNavigate();
  const [userId,setUserId]=useState<string>('');
  const [userName,setUserName]=useState<string>('');
  const [userAdmin,setUserAdmin]=useState<boolean>(false);
  const [userFavourites,setUserFavourites]=useState<Array<string>>([]);

  function login(data:ILoginData) {
     const res=postRequest('users/login',data,false);
     if(!res)return;
     res.then(response=>response.json())
     .then(json=>{
      if(json.error){
        alert(json.error);
        return;
      }

      setToken(json.token);
      setUserAdmin(json.admin);
      setUserId(json.id);
      setUserName(json.name);
      setUserFavourites(json.favourites);
      navigate('/recipes');
     })
  }

  function handlelogout(){
    removeToken();
    setUserName('');
    navigate('/login');
  }

  function updateUserFavourites(favourites:Array<string>){
    setUserFavourites(favourites);
  }

  return (
    <AppContext.Provider value={{login,userId,userName,handlelogout,userAdmin,userFavourites,updateUserFavourites}}>

      <Header/>
      <ToastContainer/>

    <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path='/login' element={<Login/>}></Route>
      <Route path='/signup' element={<SignUp/>}></Route>
      <Route path='/recipes' element={<RouteGuard> <Recipes/> </RouteGuard>}></Route>
      <Route path='/addrecipe' element={<RouteGuardAdmin><AddRecipe/></RouteGuardAdmin>}></Route>
      <Route path='/updaterecipe/:id' element={<RouteGuardAdmin><UpdateRecipe/></RouteGuardAdmin>}></Route>
      <Route path='/deleterecipe/:id' element={<RouteGuardAdmin><DeleteRecipe/></RouteGuardAdmin>}></Route>
      <Route path='/about' element={<About/>}></Route>
      <Route path='/favourites' element={<RouteGuard><Favourites/></RouteGuard>}></Route>
      <Route path='/passwordReset' element={<PasswordReset/>}></Route>
      <Route path='/contentDetails/:id' element={<RouteGuard><ContentDetails/></RouteGuard>}></Route>
      <Route path='/reset-password/:_id/:token' element={<NewPassword/>}></Route>
      <Route path='/usermanagement' element={<RouteGuardAdmin><UserManagement/></RouteGuardAdmin>}></Route>
      <Route path='/deleteuser/:id' element={<RouteGuardAdmin><DeleteUser/></RouteGuardAdmin>}></Route>
      <Route path='/adminMessage/:id' element={<RouteGuardAdmin><AdminMessage/></RouteGuardAdmin>}></Route>
    </Routes>

    <Footer/>

    </AppContext.Provider>
  );
}

export default App;
