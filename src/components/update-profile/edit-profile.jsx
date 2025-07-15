import { useState } from "react";
import api from "../../utils/axios";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../../store/auth";
import AlertToast from "../alertToast";

export default function EditProfile({setShowEditProfile}){
    const user= useSelector((store)=>store.auth.user)
    const dispatch = useDispatch()
    const [data , setData] = useState({
        name: user.userName,
        email: user.userEmail,
        address: user.userAddress,
        phone: user.userPhone
    })
    const [toast, setToast] = useState({ show: false, type: '', message: '' });

    async function handleSubmit() {
        const response = await api.put('/api/user/profile',data)

        if(response.data.success){
            dispatch(setCredentials({user:response.data.user}))
            setToast({ show: true, type: 'success', message: 'Profile updated successfully!' });
            setTimeout(() => {
                setToast({ show: false, type: '', message: '' });
                setShowEditProfile(false);
            }, 1500);
        }

    }

    function handleChange(e){
        const name = e.target.name;
        const value = e.target.value;
        setData(data =>({...data , [name]:value}))
    }


    return(
        <>
        {toast.show && (
            <AlertToast
                type={toast.type}
                message={toast.message}
                onClose={() => setToast({ show: false, type: '', message: '' })}
            />
        )}
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
        </>
    )
}