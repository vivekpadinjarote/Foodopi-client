import './social-media.css'
import { IoLogoWhatsapp } from "react-icons/io";
import { IoCall, IoLogoFacebook, IoLogoInstagram } from "react-icons/io5";
export default function SocialMedia({page}){

    return(
        <>
        <div className={page === 'landingPage' ? 'social-media-container-landing' : 'social-media-container'} >
            <a href=''><IoLogoWhatsapp /></a>
            <a href=''><IoLogoInstagram /></a>
            <a href=''><IoLogoFacebook /></a>
        </div>
        {page==='landingPage'?(<div className={'phone'}>
            <p><IoCall /> +91 98765 43210</p>
        </div>):''}
        </>
    )
}