import { useState } from "react";
import api from "../../utils/axios";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../../store/auth";

export default function EditProfile({setShowEditProfile}){
    const user= useSelector((store)=>store.auth.user)
    const accessToken = useSelector((store)=>store.auth.accessToken)
    const dispatch = useDispatch()
    const [data , setData] = useState({
        name: user.userName,
        email: user.userEmail,
        address: user.userAddress,
        phone: user.userPhone
    })

    async function handleSubmit() {
        const response = await api.put('/api/user/profile',data)

        if(response.data.success){
            dispatch(setCredentials({user:response.data.user}))
            setShowEditProfile(false)
        }

    }

    function handleChange(e){
        const name = e.target.name;
        const value = e.target.value;
        setData(data =>({...data , [name]:value}))
    }


    return(
        
        <div className="form-popup">
            <div className="form-popup-container">
                <div className="form-title fancy-font">
                    <h3>Update Profile</h3>
                    <i className="material-icons" onClick={()=>setShowEditProfile(false)}>close</i>
                </div>
                <div >
                    <form className="form">
                    <input type="text" name="name" id="name" placeholder="Name" value={data.name} onChange={handleChange}/>
                    <input type="email" name="email" id="email" placeholder="Email" value={data.email} onChange={handleChange} />
                    <input type="text" name="phone" id="phone" placeholder="Phone" value={data.phone} onChange={handleChange} />
                    <input type="text" name="address" id="address" placeholder="Address" value={data.address} onChange={handleChange} />
                    <button type="submit" onClick={(e)=>{e.preventDefault();handleSubmit()}} >Update</button>
                    </form>
                    
                </div>
            </div>
        </div>
        
    )
}