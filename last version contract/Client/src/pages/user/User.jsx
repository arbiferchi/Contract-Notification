import { useEffect } from "react";
import UserList from "../../components/userlist/UserList";
import "./user.scss"
import { useDispatch } from "react-redux";
import { current } from "../../Redux/actions/user";

const User = () => {

  const dispatch = useDispatch()
  useEffect(() => {
    if(localStorage.getItem("token")){
      dispatch(current())
    }
  }, [dispatch]);
  return (
      <div className="user">
      <div className="userContainer">
        <h2>
         <UserList/>
        </h2>
        
      </div>
      </div>
    
  )
}

export default User;
