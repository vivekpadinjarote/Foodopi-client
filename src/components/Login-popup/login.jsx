import { useState } from "react";
import api from "../../utils/axios";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../../store/auth";
import { setCart } from "../../store/cartSlice";

export default function Login({ setShowLogin }) {
  const user = useSelector((store) => store.auth.user);
  const cart = useSelector((store) => store.cart.cartItems);
  const dispatch = useDispatch();
  const [currState, setCurrState] = useState("Login");
  const [data, setData] = useState({
    userName: "",
    email: "",
    password: "",
  });

  async function handleSubmit() {
    try {
      const endpoint =
        currState === "Login" ? "/api/user/login" : "/api/user/register";
      const response = await api.post(endpoint, data);

      if (response.data.success) {
        dispatch(
          setCredentials({
            user: response.data.user,
            accessToken: response.data.accessToken,
          })
        );

        // 🛒 1. Fetch backend cart after login
        const backendCartRes = await api.get("/api/cart");
        const backendCartItems = backendCartRes.data?.cartData?.items || [];
        console.log("Backend Cart Items:", backendCartItems);

        // 🛒 2. Merge Redux (guest) cart with backend cart
        const mergedCart = cart.map((item) => ({ ...item })); // Create a copy of the Redux cart
        console.log("Redux Cart Items:", mergedCart);

        const mergedCartwithBackend = mergedCart
        backendCartItems.forEach((item) => {
            const product = item.productId;
          const existing = mergedCartwithBackend.find((i) => i._id === product._id);
          if (existing) {
            existing.quantity += item.quantity;
          } else {
            mergedCartwithBackend.push({
                _id: product._id,
                name: product.name,
                price: product.price,
                quantity: item.quantity,
            });
          }
        });
        console.log("Merged Cart Items:", mergedCartwithBackend);

        // 🧮 3. Calculate total price and item count
        

        // 🛒 4. Send merged cart to backend
        const updatedRes = await api.put("/api/cart", {
          cartItems: mergedCart,
        });

        if (updatedRes.data.success) {
          const finalCartItems = updatedRes.data.cartData.items.map((item) => ({
            _id: item.productId._id,
            name: item.productId.name,
            price: item.productId.price,
            quantity: item.quantity,
          }));

          console.log("Final Cart Items:", finalCartItems);
          dispatch(
            setCart({
              items: finalCartItems,
              totalPrice: updatedRes.data.cartData.totalPrice,
              totalItems: finalCartItems.length,
            })
          );
        }

        setShowLogin(false);
      } else {
        console.log(response.data.message);
      }
    } catch (err) {
      console.error("Login/Register error:", err);
    }
  }

  function handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    setData((data) => ({ ...data, [name]: value }));
  }

  return (
    <div className="form-popup">
      <div className="form-popup-container">
        <div className="form-title fancy-font">
          <h3>{currState}</h3>
          <i className="material-icons" onClick={() => setShowLogin(false)}>
            close
          </i>
        </div>
        <div>
          <form className="form">
            {currState === "Signup" && (
              <input
                type="text"
                name="userName"
                id="userName"
                placeholder="Username"
                value={data.userName}
                onChange={handleChange}
              />
            )}
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              value={data.email}
              onChange={handleChange}
            />
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              value={data.password}
              onChange={handleChange}
            />
            <button
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
            >
              {currState}
            </button>
          </form>
          {currState === "Login" ? (
            <p id="form-link">
              Need to create Account?{" "}
              <a onClick={() => setCurrState("Signup")}>Register here</a>
            </p>
          ) : (
            <p id="form-link">
              Already have an Account?{" "}
              <a onClick={() => setCurrState("Signup")}>Login here</a>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
