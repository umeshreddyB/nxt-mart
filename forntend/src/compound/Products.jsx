import { useCart } from "../contexts/CartContext";
function Products({ pros }) {
    const { cartItems, addItem, removeItem } = useCart();

    return (
        <div>
            <h1 className="font-bold text-lg sm:text-xl mb-4">{pros.name}</h1>
            <div className="flex flex-wrap gap-4 sm:gap-6">
                {pros.products.map(each => {
                    const count = cartItems[each.id]?.count || 0;
                    return (
                        <div
                            key={each.id}
                            className="flex flex-col w-full sm:w-[250px] border-green-400 rounded-lg p-3 sm:p-4 bg-white shadow hover:shadow-xl transition"
                        >
                            <img
                                className="h-32 sm:h-40 w-full object-cover border-none rounded-lg mb-2"
                                alt={each.name}
                                src={each.image}
                            />
                            <div className="flex flex-row justify-between items-center">
                            <div className="mb-2">
                                <p className="flex justify-between text-xs sm:text-sm">
                                    {/* <span className="text-green-800">Name:</span> */}
            
                                    <span>{each.name.slice(0,20)}</span>
                                </p>
                                <p className="flex justify-between text-xs sm:text-sm">
                                    {/* <span className="text-green-800">Weight:</span> */}
                                    <span>{each.weight}</span>
                                </p>
                                <p className="flex justify-between text-xs sm:text-sm">
                                    {/* <span className="text-green-800">Price:</span> */}
                                    <span>{each.price}</span>
                                </p>
                            </div>
                            <div>
                            {count > 0 ? (
                                <div className="text-green-500 text-xs sm:text-sm border py-1 mt-auto rounded border-green-500 flex items-center justify-around">
                                    <button onClick={() => removeItem(each)} className="text-md px-2 hover:cursor-pointer">-</button>
                                    <p>{count}</p>
                                    <button onClick={() => addItem(each)} className="text-md px-2 hover:cursor-pointer">+</button>
                                </div>
                            ) : (
                                <button onClick={() => addItem(each)} className="px-4 mx-auto py-2 border border-green-500 text-green-600 hover:cursor-pointer font-semibold rounded-lg hover:bg-green-500 hover:text-white transition duration-300">
                                    Add
                                </button>
                            )}
                            </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default Products;