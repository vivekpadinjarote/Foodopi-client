import { useState } from 'react';
import CardCarousal from '../components/card-carousal/card-carousal';
import ProductList from '../components/product-list/product-list';
import Menulist from '../components/menu-list/menu-list.jsx';
function Home() {

    const [item,setItem] = useState('all');

  return (
    <>
    <div>
        <CardCarousal />
      <ProductList setItem={setItem} item={item} />
      <div style={{width:"90vw",margin:"auto"}} id='menu'>
            <Menulist item={item} />
        </div>
    </div>
    </>
  );
}

export default Home;
