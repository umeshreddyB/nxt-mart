import { useState, useEffect } from "react";
import Categories from "../compound/categories";
import Products from "../compound/Products";
import { Link } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import {SkeletonCard} from "../styling/skelton";

function Home() {
    const [products, setProducts] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const {cartItems}=useCart()


    const lenOfCart=Object.keys(cartItems).length;
    



    useEffect(() => {
        const getdata = async () => {
            setLoading(true);
            try{
                const reponse = await fetch("http://localhost:8000/getProducts");
                const data = await reponse.json();

                const categoryList = Array.isArray(data)
                    ? (data[0]?.categories || [])
                    : (data?.categories || []);

                setProducts(categoryList);
                setFilteredProducts(categoryList);
                setLoading(false);
            }                                                    
            catch(error) {
                console.error("Error fetching data:", error);
                setFilteredProducts([])
                setProducts([])
                setLoading(false);
            }
        };
        getdata();
    }, []);


    const callBack = (category) => {
        if(category === "All"){
            setFilteredProducts(products);
        }
        else{
            const filtered = products.filter(each => each.name === category);
            setFilteredProducts(filtered);
        }
    }
    
    return (
        <div className="m-0">
            <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 p-3 sm:p-5 lg:flex-row lg:gap-6">
                   <div className="mb-2 md:mb-0">
                        <Categories props={products} callBack={callBack}/>
                    </div>
            
               <div className="flex-1 flex flex-col gap-5 sm:gap-8">
                    {isLoading ? (
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {Array.from({ length: 8 }).map((_, index) => (
                                <SkeletonCard key={index} />
                                ))}
                            </div>
                    ) : filteredProducts.length > 0 ? (filteredProducts.map(each => <Products pros={each} key={each.name} />)
                    ) : (
                        <div className="rounded-xl border border-slate-200 bg-white p-8 text-center text-slate-600 shadow-sm">
                            No products found right now.
                        </div>
                    )}
                </div>
            </div>
            {lenOfCart > 0 ? (
                <Link
                    to="/cart"
                    className="flex items-center justify-around gap-2 sm:gap-4 fixed bottom-4 sm:bottom-5 left-1/2 -translate-x-1/2 bg-green-500 px-3 sm:px-6 py-2 sm:py-3 rounded-full shadow-xl hover:bg-green-600 transition duration-300 z-50 w-[92vw] max-w-md">
                    <img className="h-8 w-8 sm:h-10 sm:w-10"  alt="cart" src="https://pngimg.com/d/shopping_cart_PNG10.png"/>
                    <div>
                        <p className="font-bold text-sm sm:text-md"> View Cart  </p>
                        <p className="text-xs sm:text-base"> {lenOfCart} items</p>
                    </div>
                    <p className="font-bold text-2xl sm:text-3xl"> &gt;</p>  
                </Link>):null
            }
        </div>
    );
}

export default Home;

