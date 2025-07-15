import { IoArrowBackCircle, IoArrowForwardCircle } from "react-icons/io5";
import api from "../../../utils/axios"
import { useEffect, useState } from "react"

export default function OrderList(){
    const [orders,setOrders] = useState([])
    const [filter, setFilter] = useState('');
    const [sortKey, setSortKey] = useState('');
    const [sortOrder, setSortOrder] = useState('asc');
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(15);

    const fetchOrders = async ()=>{
        try{
        const response = await api.get("/api/order/all-orders")
        if(response.data.success){
            console.log( response.data.orders)
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
        fetchOrders()
    },[])

    return(
        <>
        <h1>Orders</h1>

            <div className="table-container">
        <table>
            <thead>
                <tr>
                    <th>Order ID</th>
                    <th>Customer</th>
                    <th>Total</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                {orders.map((item,index)=>
                    (
                    <tr key={index}>
                        <td>{item.orderId}</td>
                        <td>{item.userId?.name}</td>
                        <td>₹{item.amount}</td>
                        <td>{item.status}</td>
                    </tr>
                    )
                )}
            </tbody>
        </table>
        </div>
        </>
    )
}