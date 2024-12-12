import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'
const Footer = () => {
  return (
    
      <div className='footer' id='footer'>
          <div className='footer-content'>
              <div className='footer-content-left'>
                  <img src={assets.logo}></img>
                  <p>
                      Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
                  </p>
                  <div className='footer-social-icon'>
                      <img src={assets.facebook_icon} alt="" />
                      <img src={assets.twitter_icon} alt="" />
                      <img src={assets.linkedin_icon} alt="" />
                  </div>

              </div>
              <div className='footer-content-center'>
                  <h2>Company</h2>
                  <ul>
                      <li>Home</li>
                      <li>Aboutus</li>
                      <li>Delivery</li>
                      <li>Privacy Policy</li>
                  </ul>
              </div>
              <div className='footer-content-right'>
                  <h2>Get In Touch</h2>
                  <ul>
                      <li>+01 12345 78965</li>
                      <li>Contact@tomoto.com</li>
                  </ul>
              </div>
          </div>

          <hr />
          <p className='footer-copy-right'>Copyright 2024 @ Tomoto.com - All Rights Reserved.</p>

      </div>
  )
}

export default Footer
