import {createBrowserRouter} from 'react-router-dom'
import App from './App'
import Profile from './pages/profile'
import Home from './pages/home'
import Cart from './pages/cart/cart'
import LandingPage from './pages/LandingPage/landingPage'
import AdminPage from './pages/admin/admin'
import MenuList from './pages/admin/components/menu'
import OrderList from './pages/admin/components/orders'
import Root from './root'



const router = createBrowserRouter([
    {path:'/', element:<Root />,children: [
        {index: true, element: <LandingPage />},
    {path: '/home', element: <App />, children: [
        {index: true, element: <Home />},
        {path: 'profile', element: <Profile />},
        {path: 'cart', element: <Cart />}
    ]},
    {path:'/admin',element:<AdminPage/>,children:[
        {path:'menu', element:<MenuList/>},
        {index: true, element:<OrderList/>},

    ]}
    ]},
])

export default router