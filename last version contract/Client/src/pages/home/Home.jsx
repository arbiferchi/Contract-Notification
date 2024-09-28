import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./home.scss";
import MainRoutes from "../../routes/MainRoutes";




const Home = () => {
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <MainRoutes/>
      </div>
    </div>
  );
};

export default Home;
