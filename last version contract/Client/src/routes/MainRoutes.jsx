import { Routes, Route } from 'react-router-dom';
import User from '../pages/user/User';
import Suppliers from '../pages/suppliers/Suppliers';
import Alerts from '../pages/alerts/Alerts';
import Contracts from '../pages/contract/Contracts';
import Dashboard from '../pages/dashboard/Dashboard';
import Documents from '../pages/Documents/Documents';
import Profile from '../pages/profile/Profile';


const MainRoutes = () => {
  return (
    <div>
        <Routes>
      <Route path="/user" element={<User/>} />
      <Route path="/contract" element={< Contracts/>} />
      <Route path="/suppliers" element={<Suppliers/>} />
      <Route path="/alerts" element={<Alerts/>} />
      <Route path="/dashboard" element={<Dashboard/>} />
      <Route path="/document" element={<Documents/>} />
      <Route path="/profile" element={<Profile/>} />
    </Routes>
    </div>
  )
}

export default MainRoutes;