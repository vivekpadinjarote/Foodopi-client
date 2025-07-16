import { useEffect, useState } from "react"
import api from "../utils/axios"

function MyOrders(){
    const [orders,setOrders] = useState([])

    async function fetchData() {
        try{
        const response = await api.get('/api/order/my-orders')
        if(response.data.success){
            // console.log( response.data.orders)
            console.log(response.data.message)
            setOrders(response.data.orders)
        }else{
            console.log(response.data.message)
        }
        }catch(err){
            console.log(err)
        }
    }

    useEffect(()=>{
        fetchData()
    },[])



    return(
        <>
        <div className="my-orders">
            <h3>My Orders</h3>
            {orders.map((order,index)=>{
                return(
                <div key={index} className="order-list">
                    <p><span>Order id:</span> {order.orderId}</p>
                    <p><span>Total Items:</span> {order.items.length}</p>
                    <p><span>Total:</span> {order.amount}</p>
                    <p><span>Status:</span> {order.status}</p>
                    <p><span>Date:</span> {order.date.split('T')[0]}</p>
                </div>
                )
            })}
        </div>
        </>
    )
}

export default MyOrders