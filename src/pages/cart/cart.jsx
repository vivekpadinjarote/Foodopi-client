import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../../store/cartSlice";
import api from "../../utils/axios";
import "./cart.css";
import { addItem, removeItem } from "../../store/cartSlice";
import PayButton from "./checkout";
import { useNavigate } from "react-router-dom";
import { FaArrowAltCircleLeft, FaArrowLeft } from "react-icons/fa";

function Cart() {
    const dispatch = useDispatch();
    const cartItems = useSelector((store) => store.cart.cartItems);
    const totalPrice = useSelector((store) => store.cart.totalPrice);
    const user = useSelector((store) => store.auth.user);
    const navigate = useNavigate()

    const handleIncrement = async (item) => {
  dispatch(addItem(item)); // This will increase quantity by 1

  try {
    await api.post('/api/cart', { cartItem: item, quantity: item.quantity + 1 });
  } catch (error) {
    console.error("Error updating cart item quantity:", error);
  }
};

const handleDecrement = async (item) => {
  dispatch(removeItem(item._id)); // This will decrease quantity by 1 or remove if 0

  try {
    await api.post('/api/cart', { cartItem: item, quantity: item.quantity - 1 });
  } catch (error) {
    console.error("Error updating cart item quantity:", error);
  }
};

    const clearCartItems = async () => {
      dispatch(clearCart()); 
        try {
            await api.delete("/api/cart");
        } catch (error) {
            console.error("Error clearing cart items from database:", error);
        }
    }

  return (
    <div className="cart-container">
    <div>
      <p className="breadcrumbs"  onClick={()=>navigate('/home')}><FaArrowLeft style={{fontSize:"small"}}/> Continue shopping</p>
    </div>
    <div className="cart-page">
      <h1>Your Cart</h1>
      {cartItems.length>0 ? 
      <div className="cart-items">
        {cartItems.map(item => (
          <div key={item._id} className="cart-item">
            <h4>{item.name}</h4>
            <p>Price: ₹{item.price}</p>
            <div className="counter-controls">
      <button onClick={(e) => {e.preventDefault(); handleDecrement(item)}} className="counter-button">-</button>
      <span className="counter-display">{item.quantity}</span>
      <button onClick={(e) => {e.preventDefault(); handleIncrement(item)}} className="counter-button">+</button>
    </div>
            <p>Subtotal: ₹{item.price * item.quantity}</p>
          </div>
        ))}
      </div>
      : <div className="cart-items" style={{alignItems:"center",justifyContent:"center",marginTop:"20vh"}}>
        <p style={{fontSize:"medium",color:"#6c757d"}}>No Items</p>
        <button id="pay-button" onClick={()=>navigate('/home')}>Go Shopping</button>
      </div>
      }
      <div className="cart-page-buttons">
        <button id="clearCart" onClick={() => {clearCartItems();}}>Clear Cart</button>
      <div className="cart-total">
        <h4>Total Price: &#8377;{totalPrice}</h4>
      </div>
      <PayButton totalAmount={totalPrice} user={user} cartItems={cartItems} clearCart={clearCart} />
      </div>
      
    </div>
    </div>
  );
}

export default Cart;