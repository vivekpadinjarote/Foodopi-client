import { useEffect, useState } from "react";
import api from "../../../utils/axios";

export default function FoodItemForm({onClose, currState, itemId, showToast}) {
    const [data, setData] = useState({
        name: "",
        description: "",
        price: "",
        category: "",
        rating: "",
        veg_type: "",
        image: null
    });

    const fetchFoodItem = async (itemId) => {
        try {
            const response = await api.get(`/api/food/${itemId}`);
            if (response.data.success) {
                setData({
                    name: response.data.foodItem.name,
                    description: response.data.foodItem.description,
                    price: response.data.foodItem.price,
                    category: response.data.foodItem.category,
                    rating: response.data.foodItem.rating,
                    veg_type: response.data.foodItem.veg_type,
                    image: response.data.foodItem.image ? response.data.foodItem.image.url : null
                });
            } else {
                console.error("Failed to fetch food item");
            }
        } catch (error) {
            console.error("Error fetching food item:", error);
        }
    };

    useEffect(() => {
        if(itemId!== null) {
            fetchFoodItem(itemId);
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    }

    const handleSubmit = async () => {
        const formData = new FormData();
        for (const key in data) {
            // Only append image if it's a File (new upload)
            if (key === 'image') {
                if (data.image instanceof File) {
                    formData.append('image', data.image);
                }
            } else {
                formData.append(key, data[key]);
            }
        }

        try {
            let response;
            if (itemId) {
                // Update existing item (PUT)
                response = await api.put(`/api/food/update/${itemId}`, formData
                );
                if (response.data.success) {
                    showToast('success', 'Food item updated successfully!');
                }
            } else {
                // Add new item (POST)
                response = await api.post('/api/food/add', formData);
                if (response.data.success) {
                    showToast('success', 'Food item added successfully!');
                }
            }
            if (response.data.success) {
                setTimeout(() => {
                  onClose();
                }, 1200);
            } else {
                showToast('error', 'Failed to submit food item');
            }
        } catch (error) {
            showToast('error', 'Error submitting food item');
        }
    }



    return(
        <div className="form-popup">
            <div className="form-popup-container">
                <div className="form-title fancy-font">
          <h3>{currState}</h3>
                    <i className="material-icons" onClick={onClose}>close</i>
                </div>
                <div >
                    <form className="form" onSubmit={e => { e.preventDefault(); handleSubmit(); }}>
                    <input type="text" name="name" id="name" placeholder="Name" value={data?.name} onChange={handleChange} required/>
                    <input type="text" name="description" id="description" placeholder="Description" value={data?.description} onChange={handleChange} required/>
                    <input type="text" name="price" id="price" placeholder="Price" value={data?.price} onChange={handleChange} required/>
                    <select name="category" id="category" value={data?.category} onChange={handleChange} required>
                        <option value="">Select Category</option>
                        <option value="beverages">Beverages</option>
                        <option value="burgers">Burgers</option>
                        <option value="salads">Salads</option>
                        <option value="wraps">Wraps</option>
                        <option value="sides">Sides</option>
                    </select>
                    <input type="text" name="rating" id="rating" placeholder="Rating" value={data?.rating} onChange={handleChange} required />
                    <select name="veg_type" id="veg_type" value={data?.veg_type} onChange={handleChange} required>
                        <option value="">Select Veg Type</option>
                        <option value="veg">Veg</option>
                        <option value="non-veg">Non-Veg</option>
                    </select>
                    <div className="file-input">
                    <label htmlFor="image" className="file-label">
  {data?.image instanceof File
    ? data.image.name
    : data?.image
      ? "Update Image"
      : "Upload Image"}
</label>
                    <input type="file" accept="image/*" id="image" onChange={(e)=>{setData({...data, image:e.target.files[0]})}}  />
                    </div>
                    <button type="submit">Submit</button>
                    </form>
                    
                </div>  
            </div>
        </div>
    )
}