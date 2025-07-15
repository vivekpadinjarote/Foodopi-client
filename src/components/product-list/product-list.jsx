import './product-list.css'
import { useEffect,useRef} from 'react'

function ProductList(props){
    const {item, setItem} = props;
    const navRef = useRef(null);
    const sentinelRef = useRef(null)

    function handleClick(x){
        switch(x){
            case 'burgers':
                setItem('burgers');
                break;
            case 'salads':
                setItem('salads');
                break;
            case 'wraps':
                setItem('wraps');
                break;
            case 'beverages':
                setItem('beverages');
                break;
            case 'sides':
                setItem('sides');
                break;
            default:
                setItem('all');

        }
    }

    useEffect(() => {
    const handleScroll = () => {
      const rect = sentinelRef.current.getBoundingClientRect();
      if (rect.top <= 0) {
        navRef.current.classList.add('stuck');
      } else {
        navRef.current.classList.remove('stuck');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

    return(
        <>
        <div style={{textAlign:'center',margin:"10px auto"}}><h2 className='fancy-font' id='menu-heading' style={{color:"#13293D"}}>Explore the Menu</h2></div>
        <div ref={sentinelRef} style={{height:"1px"}}></div>
        <div className="product-list-nav" ref={navRef}>
            
            <div className='items'>

                <div onClick={e=>{e.preventDefault();handleClick("all")}} className={`image-link ${item === 'all' ? 'active' : ''}`}>
                <img src="/images/menu.jpg" className="product-img"></img>
                <div className="overlay-text"><strong>Menu</strong></div>
                </div>

                <div onClick={e=>{e.preventDefault();handleClick("burgers")}} className={`image-link ${item === 'burgers' ? 'active' : ''}`}>
                <img src="/images/burger.jpg" className="product-img"></img>
                <div className="overlay-text"><strong>Burgers</strong></div>
                </div>
                
            
                <div onClick={e=>{e.preventDefault();handleClick("salads")}} className={`image-link ${item === 'salads' ? 'active' : ''}`}>
                <img src="/images/salad.jpg" className="product-img"></img>
                <div className="overlay-text"><strong>Salads</strong></div>
                </div>
            
            
                <div onClick={e=>{e.preventDefault();handleClick("wraps")}} className={`image-link ${item === 'wraps' ? 'active' : ''}`}>
                <img src="/images/wrap.jpg" className="product-img"></img>
                <div className="overlay-text"><strong>Wraps</strong></div>
                </div>
              
                <div onClick={e=>{e.preventDefault();handleClick("beverages")}} className={`image-link ${item === 'beverages' ? 'active' : ''}`}>
                <img src="/images/beverages.jpg" className="product-img"></img>
                <div className="overlay-text"><strong>Beverages</strong></div>
                </div>

                <div onClick={e=>{e.preventDefault();handleClick("sides")}} className={`image-link ${item === 'sides' ? 'active' : ''}`}>
                <img src="/images/sides.jpg" className="product-img"></img>
                <div className="overlay-text"><strong>Sides</strong></div>
                </div>
              
            </div>
        </div>
        <div style={{width:"90vw",margin:"auto"}}><hr /></div>
        
        </>
    )
}

export default ProductList