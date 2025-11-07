import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

function WrapNavbar() {
  return (
    <>
      <Navbar />
      <div className="pt-20">
      <Outlet />
      </div>
    
    </>
  );
}
export default WrapNavbar;