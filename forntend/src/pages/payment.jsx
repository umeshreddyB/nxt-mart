import { useState } from "react";
import { Link } from "react-router-dom";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";
import Cookie from "js-cookie";



const Payment = () => {
  const [step, setStep] = useState("options");
  
  const navigate = useNavigate(); 
  const user = Cookie.get("jwt-token");
  if(!user){
    return navigate("/login")
  }
 

  return (
      <div className="min-h-screen flex items-center justify-center bg-white px-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center animate-fadeIn">
      
          {step === "options" && (
            <>
              <h1 className="text-2xl font-bold text-gray-800 mb-4">Choose Payment Method</h1>
              <div className="flex flex-col gap-4">
                <button
                  onClick={() => setStep("success")}
                  className="bg-green-500 px-6 py-2 rounded-md text-white text-lg"
                >
                  Pay by UPI
                </button>
                <button
                  onClick={() => setStep("cod")}
                  className="bg-green-600 px-6 py-2 rounded-md text-white text-lg"
                >
                  Cash on Delivery
                </button>
              </div>
            </>
          )}

        
          {step === "success" && (
            <>
              <CheckCircleIcon className="h-20 w-20 text-green-500 mx-auto mb-4 animate-bounce" />
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Payment Successful</h1>
              <p className="text-gray-600 mb-6">
                Thank you for your payment! Your order has been confirmed and will be processed shortly.
              </p>
              <Link
                to="/"
                className="mt-4 bg-green-500 px-4 py-2 rounded-md text-white text-sm sm:text-base"
              >
                Go to Home
              </Link>
            </>
          )}

      
          {step === "cod" && (
            <>
              <CheckCircleIcon className="h-20 w-20 text-green-500 mx-auto mb-4 animate-bounce" />
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Order Placed</h1>
              <p className="text-gray-600 mb-6">
                Your order has been placed successfully. Please keep cash ready at the time of delivery.
              </p>
              <Link
                to="/"
                className="mt-4 bg-green-500 px-4 py-2 rounded-md text-white text-sm sm:text-base"
              >
                Go to Home
              </Link>
            </>
          )}
        </div>
      </div>
    );
};

export default Payment;