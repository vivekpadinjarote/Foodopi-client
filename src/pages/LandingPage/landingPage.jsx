import { NavLink, Outlet } from 'react-router-dom'
import bgImage from './asset/homeimage.jpg'
import logo from './asset/logo1.png'
import './landingpage.css'
import SocialMedia from '../../components/socialMedia/social-media'
import { useDispatch, useSelector } from 'react-redux'
import api from '../../utils/axios'
import { logout } from '../../store/auth'
import { useState } from 'react'
import Login from '../../components/Login-popup/login'

function LandingPage(){
    const user = useSelector(store=>store.auth.user)
    const [showLogin,setShowLogin] = useState(false)
    const dispatch = useDispatch()


    const handleLogout =async()=>{
        const response = await api.post('/api/user/logout')

        if(response.data.success){
        dispatch(logout()) 
        }
    }
    return(
        <>
        <SocialMedia page={"landingPage"} />
        {showLogin ? <Login setShowLogin={setShowLogin} /> : '' }
        <nav className='landing-nav'>
            <ul className='landing-nav-items'>
                    <li><NavLink to={'/home'} className={'landing-listitem'}> Home</NavLink></li>
                    <li><NavLink to={'/about'} className={'landing-listitem'}>About Us</NavLink></li>
                    <li><NavLink to={'/contact'} className={'landing-listitem'}>Contact Us</NavLink></li>
                    {
                        user && <li><NavLink to='/home/profile' className={'landing-listitem'}>Profile</NavLink></li>
                    }
                    {user 
                    ? 
                    <li onClick={()=>{handleLogout()} }><NavLink className='landing-listitem'>Logout</NavLink></li>
                    :
                    <li onClick={()=>{setShowLogin(true)}}><NavLink className='landing-listitem'> Login</NavLink></li>
                    }

                </ul>
        </nav>
        <div className="background-container">
            <img className="background-img" src={bgImage} />
        </div>
        <div className='brandLogo'>
            <a className='logoname'><img className="logo" src={logo} alt="Foodopia Logo"></img>Foodopia</a>
        </div>

        <div className='tagline'>
            <h3>Feel the Explosive Flavours</h3>
            <p>From street-side classics to gourmet delights.</p>
               {/* <p> Discover your next favorite dish.</p> */}
               <p>Delivering happiness, one meal at a time.</p>

            <NavLink to={'/home'} id='link'><span>Explore</span> The World of Flavours</NavLink>

        </div>

        <Outlet context={setShowLogin}/>
        
        </>
    )
}
export default LandingPage