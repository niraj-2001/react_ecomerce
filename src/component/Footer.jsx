import React from 'react';
import { MDBFooter, MDBContainer, MDBRow, MDBCol, MDBIcon } from 'mdb-react-ui-kit';

function Footer() {
  return (
    <MDBFooter bgColor='dark' className='text-white text-center mt-32 text-lg-start' style={{ position: 'relative', bottom: 0, width: '100%', marginTop: 'auto' }}>
      <section className='d-flex justify-content-center justify-content-lg-between p-4 border-bottom' style={{ backgroundColor: "#1a1a1a" }}>
        <div className='me-5 d-none d-lg-block'>
          <span>Connect with us on social media:</span>
        </div>

        <div>
          <a href='' className='me-4 text-white'>
            <MDBIcon fab icon="facebook-f" />
          </a>
          <a href='' className='me-4 text-white'>
            <MDBIcon fab icon="twitter" />
          </a>
          <a href='' className='me-4 text-white'>
            <MDBIcon fab icon="google" />
          </a>
          <a href='' className='me-4 text-white'>
            <MDBIcon fab icon="instagram" />
          </a>
          <a href='' className='me-4 text-white'>
            <MDBIcon fab icon="linkedin" />
          </a>
          <a href='' className='me-4 text-white'>
            <MDBIcon fab icon="github" />
          </a>
        </div>
      </section>

      <section className=''>
        <MDBContainer className='text-center text-md-start mt-5'>
          <MDBRow className='mt-3'>

            <MDBCol md="3" lg="4" xl="3" className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4 text-warning'>
                <MDBIcon icon="shopping-cart" className="me-3" />
                NirajCart
              </h6>
              <p>
                Best deals on mobiles, electronics, fashion & more. Apna desi online shopping store!
              </p>
            </MDBCol>

            <MDBCol md="2" lg="2" xl="2" className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4 text-info'>Categories</h6>
              <p><a href='#!' className='text-reset'>Mobiles</a></p>
              <p><a href='#!' className='text-reset'>Laptops</a></p>
              <p><a href='#!' className='text-reset'>Fashion</a></p>
              <p><a href='#!' className='text-reset'>Appliances</a></p>
            </MDBCol>

            <MDBCol md="3" lg="2" xl="2" className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4 text-info'>Useful links</h6>
              <p><a href='#!' className='text-reset'>Your Account</a></p>
              <p><a href='#!' className='text-reset'>Track Order</a></p>
              <p><a href='#!' className='text-reset'>Wishlist</a></p>
              <p><a href='#!' className='text-reset'>Help Center</a></p>
            </MDBCol>

            <MDBCol md="4" lg="3" xl="3" className='mx-auto mb-md-0 mb-4'>
              <h6 className='text-uppercase fw-bold mb-4 text-info'>Contact</h6>
              <p><MDBIcon icon="home" className="me-2" /> Bihar, India</p>
              <p><MDBIcon icon="envelope" className="me-3" /> support@nirajcart.in</p>
              <p><MDBIcon icon="phone" className="me-3" /> +91 98765 43210</p>
              <p><MDBIcon icon="print" className="me-3" /> +91 12345 67890</p>
            </MDBCol>

          </MDBRow>
        </MDBContainer>
      </section>

      <div className='text-center p-4' style={{ backgroundColor: "#111", color: "#aaa" }}>
        © {new Date().getFullYear()} Copyright:
        <a className='text-reset fw-bold ms-2' href='https://yourstore.com/'>
          NirajCart.in
        </a>
      </div>
    </MDBFooter>
  )
}

export default Footer;
