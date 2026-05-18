import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { useLocation, useNavigate } from "react-router-dom";
import { isAuthenticated } from "../utils/auth";
import { useCart } from "../contexts/CartContext";



const Payment = () => {
  const [step, setStep] = useState("options");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const navigate = useNavigate(); 
  const location = useLocation();
  const { makeEmpty } = useCart();
  const loggedIn = isAuthenticated();
  const items = location.state?.items || [];
  const totalAmount = location.state?.totalAmount || 0;
  useEffect(() => {
    if (!loggedIn) {
      navigate("/login", { replace: true });
    }
    if (loggedIn && items.length === 0) {
      navigate("/cart", { replace: true });
    }
  }, [loggedIn, items.length, navigate]);

  if (!loggedIn) return null;

  const handlePlaceOrder = async (paymentMethod, nextStep) => {
    setIsSubmitting(true);
    try {
      const response = await fetch("http://localhost:8000/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items,
          totalAmount,
          paymentMethod,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to place order");
      }

      makeEmpty();
      setStep(nextStep);
    } catch (error) {
      alert("Unable to place order. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
 

  return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-50 to-white px-4 py-8">
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-6 sm:p-8 max-w-md w-full text-center animate-fadeIn">
      
          {step === "options" && (
            <>
              <h1 className="text-2xl font-semibold text-gray-800 mb-4">Choose Payment Method</h1>
              <div className="flex flex-col gap-4">
                <button
                  onClick={() => handlePlaceOrder("UPI", "success")}
                  disabled={isSubmitting}
                  className="bg-green-500 px-6 py-2 rounded-lg text-white text-lg hover:bg-green-600 transition disabled:opacity-60"
                >
                  {isSubmitting ? "Placing order..." : "Pay by UPI"}
                </button>
                <button
                  onClick={() => handlePlaceOrder("Cash on Delivery", "cod")}
                  disabled={isSubmitting}
                  className="bg-slate-800 px-6 py-2 rounded-lg text-white text-lg hover:bg-slate-700 transition disabled:opacity-60"
                >
                  Cash on Delivery
                </button>
              </div>
            </>
          )}

        
          {step === "success" && (
            <>
              <CheckCircleIcon className="h-20 w-20 text-green-500 mx-auto mb-4 animate-bounce" />
              <h1 className="text-3xl font-semibold text-gray-800 mb-2">Payment Successful</h1>
              <p className="text-gray-600 mb-6">
                Thank you for your payment! Your order has been confirmed and will be processed shortly.
              </p>
              <Link
                to="/"
                className="mt-4 inline-block bg-green-500 px-4 py-2 rounded-lg text-white text-sm sm:text-base hover:bg-green-600 transition"
              >
                Go to Home
              </Link>
            </>
          )}

      
          {step === "cod" && (
            <>
              <CheckCircleIcon className="h-20 w-20 text-green-500 mx-auto mb-4 animate-bounce" />
              <h1 className="text-3xl font-semibold text-gray-800 mb-2">Order Placed</h1>
              <p className="text-gray-600 mb-6">
                Your order has been placed successfully. Please keep cash ready at the time of delivery.
              </p>
              <Link
                to="/"
                className="mt-4 inline-block bg-green-500 px-4 py-2 rounded-lg text-white text-sm sm:text-base hover:bg-green-600 transition"
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