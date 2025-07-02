import { useState } from 'react';
import CardCarousal from '../components/card-carousal/card-carousal';
import Login from '../components/Login-popup/login';
import Navbar from '../components/navbar/navbar';
import ProductList from '../components/product-list/product-list';
function Home() {
  const [showLogin, setShowLogin] = useState(false);


  return (
    <>
    <div>
        <CardCarousal />
      <ProductList />
    </div>
    </>
  );
}

export default Home;
