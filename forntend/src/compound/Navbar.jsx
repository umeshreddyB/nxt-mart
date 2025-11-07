import { Link} from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import { useLocation } from "react-router-dom";
import Cookies from "js-cookie";
function Navbar() {
    const {isLogin,setIsLogin}=useCart()
    const location = useLocation();
    const pathname = location.pathname;
    
    console.log(Cookies.get("jwt-token"))

    const Logout = () => {
        Cookies.remove("jwt-token");
        setIsLogin(false)
    };
    return (
        <div className="flex flex-col md:flex-row justify-between items-center shadow-lg px-4 md:px-10 py-3 md:py-4 fixed w-full bg-green-500 border-none z-20">
            <img className="h-8 w-16 md:h-10 md:w-20 mb-2 md:mb-0" alt="log" src="https://i.postimg.cc/HLyKdqVm/Screenshot-2025-09-01-135155.png" />
            <div className="flex flex-col md:flex-row items-center gap-3 md:gap-6">
                <Link to="/" className={pathname==="/" ? ("bg-white text-green-500 px-2 py-1 border-none rounded font-bold"):("font-bold text-white")} >Home</Link>
                <Link to="/cart" className={pathname==="/cart" ? ("bg-white text-green-500 px-2 py-1 border-none rounded font-bold"):("font-bold text-white")}>Cart</Link>
                { !isLogin
                    ? (<Link to="/login" className="font-bold text-white">Login</Link>)
                    : (<button className="font-bold text-white" onClick={Logout}>Logout</button>)
                }
            </div>
        </div>
    );
}
export default Navbar;