import { NavLink, useNavigate } from 'react-router-dom';
import './navbar.css'
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/auth';
import api from '../../utils/axios';

function Navbar({setShowLogin}){
    const user = useSelector((store)=>store.auth.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()


    const handleLogout =async()=>{
        const response = await api.post('/api/user/logout')

        if(response.data.success){
        dispatch(logout()) 
        }
        navigate('/home')
    }
    return(
        <>
        <div className="navbar">
            <div className="header">
                <a  id='logoname' href='/'><img className="logo" src="/images/logo1.png" alt="Foodopia Logo"></img>Foodopia</a>
                    <input type='checkbox' id='sidebar-active'></input>
                    <label htmlFor="sidebar-active" className='open-sidebar-button'><i className='material-icons'>menu</i></label>
                    <label htmlFor='sidebar-active' id='overlay'></label>
                    
                <ul className='nav-items'>
                    <label htmlFor='sidebar-active' className='close-sidebar-button'><i className='material-icons'>close</i></label>
                    {user?.userRole==='admin' && <li><NavLink to={'/admin'} className={'listitem'} onClick={()=>document.getElementById('sidebar-active').checked = false}>Dashboard</NavLink></li>}
                    <li><NavLink to={'/home'} end className={'listitem'} onClick={()=>document.getElementById('sidebar-active').checked = false}> Home</NavLink></li>
                    <li><NavLink to={'/about'} className={'listitem'} onClick={()=>document.getElementById('sidebar-active').checked = false}> About Us</NavLink></li>
                    <li><NavLink to={'/contact'} className={'listitem'} onClick={()=>document.getElementById('sidebar-active').checked = false}> Contact Us</NavLink></li>
                    <div className='navbar-icon-div'>
                    <li><NavLink to={'/home/cart'} className={'listitem'} onClick={()=>document.getElementById('sidebar-active').checked = false}><i className='material-icons'>shopping_cart</i></NavLink></li>
                    {
                        user && <li><NavLink to={'/home/profile'} className={'listitem'} onClick={()=>document.getElementById('sidebar-active').checked = false}><i className='material-icons'>person</i></NavLink></li>
                    }
                    {user 
                    ? 
                    <li onClick={()=>{handleLogout(); document.getElementById('sidebar-active').checked = false} }><button className='listitem nav-btn'><i className='material-icons'>logout</i></button></li>
                    :
                    <li onClick={()=>{setShowLogin(true); document.getElementById('sidebar-active').checked = false} }><button className='listitem nav-btn'><i className='material-icons'>login</i></button></li>
                    }
                    </div>

                </ul>
                
            </div>
        </div>
        </>
    )
}

export default Navbar;