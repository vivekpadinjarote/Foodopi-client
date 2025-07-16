import { useEffect, useState } from 'react'
import './menu-list.css'
import api from '../../utils/axios'
import { useDispatch,useSelector } from 'react-redux';
import { addItem, clearCart, removeItem, setCart } from '../../store/cartSlice';
import { useNavigate } from 'react-router-dom';


function Menulist(props){
    const {item } = props
    const [count,setCount]=useState(0)
    const [data,setData] = useState([])
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const user = useSelector((store)=>store.auth.user);
    const cart = useSelector((store)=>store.cart.cartItems);
    const totalPrice = useSelector((store)=>store.cart.totalPrice);

    const countIncrement = async (index) =>  {
        const selectedItem = data[index];
        setCount(prev=>({
            ...prev,[index]:(prev[index]||0)+1
        }))

        // console.log("Selected Item:", selectedItem);

        dispatch(addItem(selectedItem));
        // Update the cart in the backend
        if(user){
           const response =  await api.post('/api/cart', { cartItem: selectedItem , quantity: (count[index]||0)+1 });
              if(response.data.success){
                console.log("Item added to cart successfully");
                // console.log("Updated Cart:", response.data.cartData);
              }
    }
}
    const countDecrement = async (index) =>  {
        const selectedItem = data[index];
        setCount(prev=>({
            ...prev,[index]:(prev[index]||0)-1
        }))
        dispatch(removeItem(selectedItem._id));
        if(user){
           const response =  await api.post('/api/cart', { cartItem: selectedItem , quantity: (count[index]||0)-1 });
              if(response.data.success){
                console.log("Item removed from cart successfully");
                // console.log("Updated Cart:", response.data.cartData);
              }else{
                console.error("Failed to remove item from cart:", response.data.message);
              }
    }
    }
    const fetchData = async (item) => {
        try{
                const response = await api.get('/api/food/list');
                if(response.data.success){

                    let foodItems = response.data.foodItems;
                    if (!Array.isArray(foodItems)) {
                        foodItems = Object.values(foodItems);
                    }

                    if(item === 'all'){
                        setData(foodItems);
                    }else{
                        setData(foodItems.filter(foodItem => foodItem.category === item));
                    }
                }
            }catch(err){
                console.error("Error fetching food items:", err);
            }
    };

    const handleNavigation = (path) => {
        navigate(path);
    };

useEffect(() => {
        fetchData(item);
}, [item]);

useEffect(() => {
     const updatedCount = {};

  if (cart && cart.length > 0 && data.length > 0) {
    cart.forEach((item) => {
      const index = data.findIndex((foodItem) => foodItem._id === item._id);
      if (index !== -1) {
        updatedCount[index] = item.quantity;
      }
    });
  }

  setCount(updatedCount); 
}, [cart, data]);

    return(
        <>
        
            <div className="menu-list">


                {data.map((item,index)=>(
                    <div className="menu-item-card" key={index}>
                    <div className='menu-img-div'>
                        <img src={item.image?.url} alt='food-item' className='item-img'/>
                    </div>
                    <div className='card-content'>
                        <h4>{item.name}</h4>
                        <p id='menulist-price'>&#8377;{item.price}</p>
                        <p className='rating'><i className='material-icons' id='menulist-rating'>star</i> {item.rating}</p>
                        <p id='item-description'>{item.description}</p>
                    </div>
                    <div className='button-container'>
                            {(count[index]||0)===0 ? (
                                <button className='add-button' onClick={(e)=>{e.preventDefault() ; countIncrement(index)}}>Add</button>
                                ):(
                                <div className='counter-controls' >
                                    <button className='counter-button' onClick={e=>{e.preventDefault(); countDecrement(index)}}>-</button>
                                    <span className='counter-display'>{count[index]}</span>
                                    <button className='counter-button' onClick={(e)=>{e.preventDefault() ; countIncrement(index)}}>+</button>
                                </div>
                            )}
                    </div>
                </div>

                ))}

                
                
            </div>
                {cart.length > 0 && (<div className='cart-button-container'>
                <button className='cart-button' onClick={e=>{e.preventDefault(); handleNavigation('/home/cart')}}><i className='material-icons'>shopping_cart</i> View Cart</button>
            </div>)}

        </>
    )
}

export default Menulist