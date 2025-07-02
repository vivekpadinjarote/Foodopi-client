import { useEffect, useState } from 'react'
import './menu-list.css'
import api from '../../utils/axios'

function Menulist(props){
    const {item} = props
    const [count,setCount]=useState(0)
    const [data,setData] = useState([])

    const countIncrement = (index) =>  {
        setCount(prev=>({
            ...prev,[index]:(prev[index]||0)+1
        }))
    }
    const countDecrement = (index) =>  {
        setCount(prev=>({
            ...prev,[index]:(prev[index]||0)-1
        }))
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


useEffect(() => {
        fetchData(item);
}, [item]);


    

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
                        <p id='price'>&#8377;{item.price}</p>
                        <p className='rating'><span ><i className='material-icons' id='rating'>star</i> {item.rating}</span></p>
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
        </>
    )
}

export default Menulist