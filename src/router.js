import {createBrowserRouter} from 'react-router-dom'
import App from './App'
import Profile from './pages/profile'
import Home from './pages/home'



const router = createBrowserRouter([
    {path: '/', element: <App />, children: [
        {index: true, element: <Home />},
        {path: '/profile', element: <Profile />},
    ]}
])

export default router