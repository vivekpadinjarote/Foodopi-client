import { useState } from "react";
import api from "../../utils/axios";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../../store/auth";

export default function Login({setShowLogin}){
    const user= useSelector((store)=>store.auth.user)
    const dispatch = useDispatch()
    const [currState,setCurrState] = useState("Login")
    const [data , setData] = useState({
        userName:"",
        email:"",
        password:""
    })

    async function handleSubmit() {

        if(currState==='Login'){
            const response = await api.post('/api/user/login',data)

            if(response.data.success){
                await dispatch(setCredentials({
                    user: response.data.user,
                    accessToken: response.data.accessToken
                }))
            }else if(!response.data.success){
                console.log(response.data.message)
            }
            setShowLogin(false);
        }else{
        console.log(data)
            const response = await api.post('/api/user/register',data)

            if(response.data.success){
                await dispatch(setCredentials({
                    user: response.data.user,
                    accessToken: response.data.accessToken
                }))
            }else if(!response.data.success){
                console.log(response.data.message)
            }
            setShowLogin(false);
            
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
                    <h3>{currState}</h3>
                    <i className="material-icons" onClick={()=>setShowLogin(false)}>close</i>
                </div>
                <div >
                    <form className="form">
                    {currState === "Signup" && <input type="text" name="userName" id="userName" placeholder="Username" value={data.userName} onChange={handleChange}/>}
                    <input type="email" name="email" id="email" placeholder="Email" value={data.email} onChange={handleChange} />
                    <input type="password" name="password" id="password" placeholder="Password" value={data.password} onChange={handleChange} />
                    <button type="submit" onClick={(e)=>{e.preventDefault();handleSubmit()}} >{currState}</button>
                    </form>
                    {currState === "Login" ? <p id="form-link">Need to create Account? <a  onClick={()=>setCurrState("Signup")}>Register here</a></p> : <p id="form-link">Already have an Account? <a  onClick={()=>setCurrState("Signup")}>Login here</a></p>}
                    
                </div>
            </div>
        </div>
        
    )
}