import { useDispatch, useSelector } from 'react-redux';
import Navbar from '../components/navbar/navbar'
import './profile.css'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EditProfile from '../components/update-profile/edit-profile';
import api from '../utils/axios';
import { setCredentials } from '../store/auth';

export default function Profile(){
    const user = useSelector((store)=> store.auth.user)
    const accessToken = useSelector((store)=>store.auth.accessToken)
    const navigate = useNavigate()
    const [showEditProfile,setShowEditProfile] = useState(false)
    const [processing, setProcessing] = useState(false)
    const dispatch = useDispatch()

    const  handleImageChange = async (e) => {
        const file = e.target.files[0];
        if(!file){
            return ;
        }

        const data = new FormData()
        data.append("profilePic",file)

        try{
            setProcessing(true)
        const response = await api.put("/api/user/profile/upload-image",data,{headers:{"Content-Type":"multipart/form-data"}})

        if(response.data.success){
            dispatch(setCredentials({user:{...user,userProfilePic:response.data.profilePic}}))
            setProcessing(false)
            console.log(response.data.message)
        }
    }catch(err){
        console.log(err)
    }
    };

    const  handleImageDelete = async (e) => {

        try{
            setProcessing(true)
        const response = await api.put("/api/user/profile/delete-image")

        if(response.data.success){
            dispatch(setCredentials({user:{...user,userProfilePic:""}}))
            setProcessing(false)
            console.log(response.data.message)
        }
    }catch(err){
        console.log(err)
    }
    };

    useEffect(()=>{
        if(!user){
        navigate('/')
        }
    },[user])

    return(
        <>
        {showEditProfile? <EditProfile setShowEditProfile={setShowEditProfile} />:<></>}
        
        <div className="profile-container">
            <div className="image-container">
                <div className='image'>
                <img src={user?.userProfilePic?.url || `https://api.dicebear.com/7.x/initials/svg?seed=${user?.userName}`} className='profile-photo' alt="Profile"></img>
                </div>
                <button id="delete-file" onClick={handleImageDelete}><i className="material-icons">delete</i></button>
                <input type="file" id='input-file' onChange={handleImageChange} />
                <label htmlFor="input-file" id='input-file-label'><i className="material-icons">photo_camera</i></label>
                
                {processing && <label id="processing"><i className="material-icons">sync</i></label>}

            </div>
                
                
            <div className="details-container">
                <button id='edit' onClick={()=>setShowEditProfile(true)}><i className='material-icons'>edit</i></button>
                <h3>Profile</h3>
                <h5>Name</h5>
                <p className="data-field">{user?.userName}</p>
                <h5>Email Id</h5>
                <p className="data-field">{user?.userEmail}</p>
                <h5>Phone </h5>
                <p className="data-field">{user?.userPhone || "No Phone Number"}</p>
                <h5>Address</h5>
                <p className="data-field">{user?.userAddress || "No Address"}</p>
            </div>
        <div className="my-orders">
            <h3>My Orders</h3>
        </div>
        </div>
        </>
    )
}
