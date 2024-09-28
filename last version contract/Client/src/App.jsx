import {Routes, Route} from 'react-router-dom'
import Login from './pages/login/Login'
import Signup from './pages/signup/Signup'
import {Toaster} from 'react-hot-toast'
import { useEffect } from "react";
import Home from './pages/home/Home';
import { useDispatch, useSelector } from 'react-redux';
import { current } from './Redux/actions/user';
import './style/dark.scss'

function App() {

  const darkMode = useSelector((state) => state.darkMode.darkMode);

  const dispatch = useDispatch()
  useEffect(() => {
    if(localStorage.getItem("token")){
      dispatch(current())
    }
  }, [dispatch]);


  return (
    <>
    <div className={darkMode ? "app dark" : "app"}>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path="/*" element={<Home />} />
        </Routes>
      <Toaster />
    </div>
    </>
  )


}

export default App
