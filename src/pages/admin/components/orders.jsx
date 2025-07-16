import { IoArrowBackCircle, IoArrowForwardCircle } from "react-icons/io5";
import api from "../../../utils/axios"
import { useEffect, useState } from "react"
import { FaSort } from "react-icons/fa";

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
        fetchOrders()
    },[])

    const filteredOrders = orders.filter(order =>
        order.userId.name.toLowerCase().includes(filter.toLowerCase()) ||
        order.status.toLowerCase().includes(filter.toLowerCase())
    );

    const sortedOrders = [...filteredOrders].sort((a, b) => {
        if (!sortKey) return 0;
        if (sortOrder === 'asc') {
            return a[sortKey] > b[sortKey] ? 1 : -1;
        } else {
            return a[sortKey] < b[sortKey] ? 1 : -1;
        }
    });

    const startIdx = page * pageSize;
    const paginatedItems = sortedOrders.slice(startIdx, startIdx + pageSize);

    const handleSort = (key) => {
        if (sortKey === key) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortKey(key);
            setSortOrder('asc');
        }
    };

    const handleNext = () => {
        if ((page + 1) * pageSize < sortedOrders.length) {
            setPage(page + 1);
        }
    };

    const handlePrev = () => {
        if (page > 0) {
            setPage(page - 1);
        }
    };

    const handlePageSizeChange = (e) => {
        setPageSize(Number(e.target.value));
        setPage(0);
    };


    return(
        <>
        <h1 style={{margin: '10px 0px 10px 20px'}}>Orders</h1>
        <div style={{margin: '10px 20px'}}> 
                
                <input
                    type="text"
                    placeholder="Filter by name or category"
                    value={filter}
                    onChange={e => { setFilter(e.target.value); setPage(0); }}
                    style={{  marginRight: '10px', padding: '4px' }}
                />|
                <label style={{margin: '10px 0px 10px 10px'}}>Rows per page: </label>
                <select value={pageSize} onChange={handlePageSizeChange}>
                    <option value={15}>15</option>
                    <option value={16}>16</option>
                    <option value={17}>17</option>
                    <option value={18}>18</option>
                    <option value={19}>19</option>
                    <option value={20}>20</option>
                </select>
            </div>

            <div className="table-container">
        <table>
            <thead>
                <tr>
                    <th>Order ID</th>
                    <th onClick={() => handleSort('name')}>Customer <FaSort className={`FaSort${sortKey === 'name' ? ' sorted' : ''}`} /></th>
                    <th>Total</th>
                    <th onClick={() => handleSort('status')}>Status <FaSort className={`FaSort${sortKey === 'status' ? ' sorted' : ''}`} /></th>
                </tr>
            </thead>
            <tbody>
                {paginatedItems.map((item,index)=>
                    (
                    <tr key={index}>
                        <td>{item.orderId} </td>
                        <td>{item.userId?.name}</td>
                        <td>₹{item.amount}</td>
                        <td>{item.status}</td>
                    </tr>
                    )
                )}
            </tbody>
        </table>
        <div className='table-pagination'>
                    <button onClick={handlePrev} disabled={page === 0}><IoArrowBackCircle /></button>
                    <span style={{ margin: '0 10px' }}>{page + 1}</span>
                    <button onClick={handleNext} disabled={startIdx + pageSize >= sortedOrders.length}><IoArrowForwardCircle/></button>
                </div>
        </div>
        </>
    )
}