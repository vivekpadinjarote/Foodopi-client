import api from "../../utils/axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import AlertToast from "../../components/alertToast";
import { useState } from "react";


export default function PayButton({ totalAmount, user, cartItems , clearCart }) {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [alertMessage, setAlertMessage] = useState('');
const [alertType, setAlertType] = useState('success');
    const handleCheckOut = async (totalAmount) => {
    try {
        const response = await api.post("/api/order/create-order", {
            amount: totalAmount * 100,
        });
        let orderId;
        if (response.data.success) {
            orderId = response.data.order.id;
        }
        
            const options = {
                key: 'rzp_test_DAa0a8sv6lsAso',
                amount: totalAmount,
                currency: "INR",
                name: "Foodopia",
                order_id: orderId,
                handler: async function (response) {
                    console.log("Payment response:", response);
                    try{
                        const res = await api.post("/api/order/verify", {
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature,
                            items: cartItems,
                            amount: totalAmount,
                            address: user.userAddress
                        });
                        if (res.data.success) {
                            console.log("Payment successful and order saved in DB");
                            setAlertMessage('Payment successful! Your order has been placed.');
            setAlertType('success');
                                dispatch(clearCart())
                                setTimeout(() => navigate('/home'), 2000);
                                
                            } else {
                                console.error("Payment verification failed:", res.data.message);
                                setAlertMessage('Payment verification failed.');
            setAlertType('error');
                            }
                    } catch (error) {
                        console.error("Error verifying payment signature:", error);
                        setAlertMessage('An error occurred during payment verification.');
        setAlertType('error');
                    }
                },
                prefill: {
                    name: user.userName,
                    email: user.userEmail,
                    contact: user.userPhone
                },
                notes: {
                    address: user.userAddress
                },
                theme: {
                    color: "#12af6e"
                }
            };
    const rzp = new window.Razorpay(options);
    rzp.open();
        console.log("Order created successfully:", response.data);
    } catch (error) {
        console.error("Error creating order:", error);
    }
}
    return(
        <>
        <button id="pay-button" onClick={() => handleCheckOut(totalAmount)}>Pay</button>
         <AlertToast
        message={alertMessage}
        type={alertType}
        onClose={() => setAlertMessage('')}
    />
        </>
    )
}
