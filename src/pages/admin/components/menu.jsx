import { useEffect, useState } from 'react';
import './table.css';
import api from '../../../utils/axios';
import { IoTriangle,IoArrowForwardCircle,IoArrowBackCircle } from 'react-icons/io5';
import { FaCircle, FaEdit, FaTrash, FaSort } from 'react-icons/fa';
import { useOutletContext } from 'react-router-dom';
import socket from '../../../utils/socket';

export default function MenuList() {
    const [foodItems, setFoodItems] = useState([]);
    const [filter, setFilter] = useState('');
    const [sortKey, setSortKey] = useState('');
    const [sortOrder, setSortOrder] = useState('asc');
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(15);
    const { setShowFoodItemForm, setCurrState, setItemId, setShowConfirmPopup } = useOutletContext();


    const fetchFoodList = async () => {
        const response = await api.get('/api/food/list');
        if (response.data.success) {
            setFoodItems(response.data.foodItems);
            console.log("Food items fetched successfully:");
        } else {
            console.error("Failed to fetch food items");
        }
    };

    useEffect(() => {
        fetchFoodList();
        handleSort('category');
    }, []);

    // Filtering
    const filteredItems = foodItems.filter(item =>
        item.name.toLowerCase().includes(filter.toLowerCase()) ||
        item.category.toLowerCase().includes(filter.toLowerCase())
    );

    // Sorting
    const sortedItems = [...filteredItems].sort((a, b) => {
        if (!sortKey) return 0;
        if (sortOrder === 'asc') {
            return a[sortKey] > b[sortKey] ? 1 : -1;
        } else {
            return a[sortKey] < b[sortKey] ? 1 : -1;
        }
    });

    // Pagination
    const startIdx = page * pageSize;
    const paginatedItems = sortedItems.slice(startIdx, startIdx + pageSize);

    const handleSort = (key) => {
        if (sortKey === key) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortKey(key);
            setSortOrder('asc');
        }
    };

    const handleNext = () => {
        if ((page + 1) * pageSize < sortedItems.length) {
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

    useEffect(() => {
  socket.on('menu:update', () => {
    fetchFoodList();
  });
  return () => {
    socket.off('menu:update');
  };
}, []);

    return (
        <>
            <h1 style={{margin: '10px 0px 10px 20px'}}>Menu</h1>
            <div style={{ margin: '10px 20px' }}> 
                <button className='addItemButton' onClick={() => { setShowFoodItemForm(true); setCurrState("Add Food Item"); setItemId(null); }}>Add New Item</button>|
                <input
                    type="text"
                    placeholder="Filter by name or category"
                    value={filter}
                    onChange={e => { setFilter(e.target.value); setPage(0); }}
                    style={{ marginLeft: '10px', marginRight: '10px', padding: '4px' }}
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
            
            <div className='table-container'>
                <table>
                    <thead>
                        <tr>
                            <th>Sl No.</th>
                            <th onClick={() => handleSort('_id')}>
                                Item ID <FaSort className={`FaSort${sortKey === '_id' ? ' sorted' : ''}`} />
                            </th>
                            <th onClick={() => handleSort('category')}>
                                Category <FaSort className={`FaSort${sortKey === 'category' ? ' sorted' : ''}`} />
                            </th>
                            <th onClick={() => handleSort('name')}>
                                Name <FaSort className={`FaSort${sortKey === 'name' ? ' sorted' : ''}`} />
                            </th>
                            <th>Description</th>
                            <th onClick={() => handleSort('price')}>
                                Price <FaSort className={`FaSort${sortKey === 'price' ? ' sorted' : ''}`} />
                            </th>
                            <th onClick={() => handleSort('rating')}>
                                Rating <FaSort className={`FaSort${sortKey === 'rating' ? ' sorted' : ''}`} />
                            </th>
                            <th>Type</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedItems.map((item, index) => (
                            <tr key={item._id}>
                                <td>{startIdx + index + 1}</td>
                                <td>{item._id}</td>
                                <td>{item.category.charAt(0).toUpperCase() + item.category.slice(1)}</td>
                                <td>{item.name}</td>
                                <td>{item.description}</td>
                                <td>{item.price}</td>
                                <td>{item.rating}</td>
                                {item.veg_type === "veg" ? (<td id='veg'><IoTriangle /></td>) : (<td id='non-veg'><FaCircle /></td>)}
                                <td id='actions'>
                                    <button className='edit' onClick={() => { setShowFoodItemForm(true); setCurrState("Update Item"); setItemId(item._id); }}> <FaEdit /></button>
                                    <button className='delete' onClick={() => { setShowConfirmPopup(true); setItemId(item._id); }}><FaTrash /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className='table-pagination'>
                    <button onClick={handlePrev} disabled={page === 0}><IoArrowBackCircle /></button>
                    <span style={{ margin: '0 10px' }}>{page + 1}</span>
                    <button onClick={handleNext} disabled={startIdx + pageSize >= sortedItems.length}><IoArrowForwardCircle/></button>
                </div>
            </div>
        </>
    );
}