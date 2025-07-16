import { useEffect, useState } from 'react';
import Login from './components/Login-popup/login';
import Navbar from './components/navbar/navbar';
import { Outlet, useOutletContext } from 'react-router-dom';
import EditProfile from './components/update-profile/edit-profile';
import SocialMedia from './components/socialMedia/social-media';
import Footer from './components/footer/footer';



function App() {
  const [showEditProfile, setShowEditProfile] = useState(false);
  const {setShowLogin} = useOutletContext()


  return (
    <>
        {showEditProfile? <EditProfile setShowEditProfile={setShowEditProfile} />:<></>}
    <div>
      <Navbar setShowLogin={setShowLogin} />
    </div>
    <Outlet context={{ showEditProfile, setShowEditProfile }} />
    <SocialMedia page={"app"} />
    <Footer />
    </>
  );
}

export default App;
