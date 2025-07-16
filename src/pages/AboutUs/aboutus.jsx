import Footer from '../../components/footer/footer'
import Navbar from '../../components/navbar/navbar'
import './aboutus.css'
import { useOutletContext } from 'react-router-dom'

function AboutUs(){
    const {setShowLogin} = useOutletContext()
    return(
        <>
        <Navbar setShowLogin={setShowLogin}/>
         <div className="about-container">
      <section className="about-hero">
        <h1>About <span>Foodopia</span></h1>
        <p>Your daily destination for delicious flavors and quality meals.</p>
      </section>

      <section className="about-cards">
        <div className="card">
          <h2>🚀 Our Mission</h2>
          <p>
            At Foodopia, our mission is to make great food accessible to everyone. 
            Whether it's a quick snack or a hearty dinner, we bring joy to your plate.
          </p>
        </div>
        <div className="card">
          <h2>💡 What We Offer</h2>
          <p>
            A curated menu of high-quality dishes, lightning-fast delivery, and 
            a seamless online experience built with love.
          </p>
        </div>
        <div className="card">
          <h2>📞 Let's Connect</h2>
          <p>
            Questions? Suggestions? Email us at <a href="mailto:support@foodopia.com">support@foodopia.com</a> — we’d love to hear from you!
          </p>
          
        </div>
      </section>
    </div>
    <Footer  />
        </>
    )
}

export default AboutUs