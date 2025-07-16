import Footer from "../../components/footer/footer";
import Navbar from "../../components/navbar/navbar";
import "./contactus.css";
import { useOutletContext } from "react-router-dom";

const ContactUs = () => {
    const {setShowLogin} = useOutletContext()
  return (
    <>
    <Navbar setShowLogin={setShowLogin}/>
    <div className="contact-container">
      <div className="contact-header">
        <h2>Contact Us</h2>
        <p>We’d love to hear from you. Drop us a message!</p>
      </div>

      <div className="contact-content">
        <form className="contact-form">
          <label>
            Name
            <input type="text" placeholder="Your Name" required />
          </label>

          <label>
            Email
            <input type="email" placeholder="your@email.com" required />
          </label>

          <label>
            Message
            <textarea rows="5" placeholder="Write your message here..." required></textarea>
          </label>

          <button type="submit">Send Message</button>
        </form>

        <div className="contact-info">
          <h3>Reach us at:</h3>
          <p><strong>Email:</strong> support@foodopia.com</p>
          <p><strong>Phone:</strong> +91 98765 43210</p>
          <p><strong>Location:</strong> 123 Food Street, Kochi, Kerala</p>
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
};

export default ContactUs;
