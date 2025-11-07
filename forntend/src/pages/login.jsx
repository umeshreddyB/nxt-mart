import { useEffect, useState } from 'react';
import Cookies from 'js-cookie'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from "../contexts/CartContext";




function Aute (){
    const {setIsLogin}=useCart()
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [userDetails, setUserDetails] = useState({});
    const [result, setResult] = useState('');
    const navigate = useNavigate();
    const [email,setEmail] = useState('')
    const [place,setPlace] = useState('')
    const [aute,setAute] = useState(true)



    function login(){

              const submit = () => {
                const getuserDetails = async () =>{
                    try{
                        const options= {
                            method:"post",
                            headers :{
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                "username": username,
                                "password": password
                        }),}


                        const reponse = await fetch("http://localhost:8000/login", options);
                        const data= await reponse.json()
                        console.log(data);
                        
                        if(data.token === undefined){
                            setResult('Invalid username or password');
                            return;
                        }
                        Cookies.set("jwt-token", data.token)
                        setIsLogin(true)
                        return navigate('/', {replace: true}) 
                    }
                    catch (er){
                        console.error("Error fetching user details:", er);
                        setResult('Invalid username or password');
                    }
                }
                getuserDetails();
}

            return (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center pt-10 sm:pt-20 z-50">
                        <div className="bg-white shadow-lg p-4 sm:p-6 rounded-lg flex flex-col items-center gap-4 sm:gap-6 w-[90vw] max-w-xs sm:max-w-md">
                            <div>
                                <img alt='logo' className='h-12 sm:h-16' src="https://i.postimg.cc/qRrm0gPc/Whats-App-Image-2025-09-01-at-13-57-13-c417250a.jpg" />
                            </div>
                            <div className="w-full">
                            <label className="text-sm sm:text-base">Username</label><br/>
                            <input type="text" placeholder="enter your username" value={username} onChange={(e)=> setUsername(e.target.value)} className="border rounded w-full p-2" />
                            </div>
                            <div className="w-full">
                            <label className="text-sm sm:text-base">Password</label><br/>
                            <input type="password" placeholder="enter your password" value={password} onChange={e => setPassword(e.target.value)} className="border rounded w-full p-2" />
                            </div>
                            <p className="text-red-500 text-xs sm:text-sm">{result}</p>
                            <button className="mt-2 sm:mt-4 px-4 sm:px-6 py-2 bg-blue-500 text-white rounded w-full" value={password} onClick={submit}>Login</button>

                            <p>you don't have accout ? <Link className='text-blue-500' onClick={()=>(setAute(false))}>register</Link></p>
                        </div>
                </div>
            )

    }

        
    
    function signup(){
        const submit = () => {
                const getuserDetails = async () =>{
                    try{
                        const options= {
                            method:"post",
                            headers :{
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                "username": username,
                                "email":email,
                                "place":place,
                                "password": password
                                
                        }),}


                        const reponse = await fetch("http://localhost:8000/register", options);
                        const data= await reponse.json()
                        console.log(data);
                        
                        if(data.token === undefined){
                            setResult('Invalid username or password');
                            return;
                        }
                        Cookies.set("jwt-token", data.token)
                        setIsLogin(true)
                        return navigate('/', {replace: true}) 
                    }
                    catch (er){
                        console.error("Error fetching user details:", er);
                        setResult('Invalid username or password');
                    }
                }
                getuserDetails();
}

            return (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center pt-10 sm:pt-20 z-50">
                        <div className="bg-white shadow-lg p-4 rounded-lg flex flex-col items-center gap-2 w-[90vw] max-w-xs sm:max-w-md">
                            <div>
                                <img alt='logo' className='h-12 sm:h-16' src="https://img.icons8.com/fluent-systems-regular/512w/40C057/shopping-cart.png" />
                            </div>
                            <div className="w-full">
                                <label className="text-sm sm:text-base">Username</label><br/>
                                <input type="text" placeholder="enter your username" value={username} onChange={(e)=> setUsername(e.target.value)} className="border rounded w-full p-2" />
                            </div>
                            <div className="w-full">
                                <label className="text-sm sm:text-base">Email</label><br/>
                                <input type="text" placeholder="enter your Email" value={email} onChange={(e)=> setEmail(e.target.value)} className="border rounded w-full p-2" />
                            </div>
                            <div className="w-full">
                                <label className="text-sm sm:text-base">Place</label><br/>
                                <input type="text" placeholder="enter your Place" value={place} onChange={(e)=> setPlace(e.target.value)} className="border rounded w-full p-2" />
                            </div>
                            <div className="w-full">
                                <label className="text-sm sm:text-base">Password</label><br/>
                                <input type="password" placeholder="enter your password" value={password} onChange={e => setPassword(e.target.value)} className="border rounded w-full p-2" />
                            </div>
                            <p className="text-red-500 text-xs sm:text-sm">{result}</p>
                            <button className="px-4  py-2 bg-blue-500 text-white rounded w-full" value={password} onClick={submit}>SignUp</button>

                            <p>you already have accout ? <Link className='text-blue-500' onClick={()=>(setAute(true))}>Login</Link></p>
                        </div>
                </div>
            )

    }
    return(
        <>
        {aute? login():signup()}
        </>
    )

    
            

}

export default Aute;
