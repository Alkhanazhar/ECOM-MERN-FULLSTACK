import React from 'react'
import styles from "./About.module.css"
import aboutUsImage from "../../assets/about.svg"
import HelmetContainer from '../../components/layout/Helmet'
const About = () => {
  return (
    <section className="row d-flex justify-content-center mt-5">
      <HelmetContainer title={"About - us | ECOMMERCE"} />
      <div className={styles.aboutUsContainer}>
        <div className={styles.imageContainer}>
          <img src={aboutUsImage} alt="About Us" className={styles.aboutUsImage} />
        </div>
        <div className={styles.contentContainer}>
          <h2>About Us</h2>
          <p>Welcome to Your eCommerce Store, where we strive to provide the best shopping experience for our customers. Our mission is to offer high-quality products and excellent customer service.</p>

          <h3>Our Story</h3>
          <p>Founded in [Year], Your eCommerce Store has been dedicated to delivering top-notch products to customers worldwide. From our humble beginnings, we have grown into a trusted online store with a wide range of products to suit your needs.</p>

          <h3>Our Values</h3>
          <p>We believe in transparency, quality, and customer satisfaction. Our commitment to these values sets us apart and drives everything we do.</p>

          <h3>Meet the Team</h3>
          <p>Our team is made up of passionate individuals who are dedicated to making your shopping experience exceptional. We are here to assist you with any questions or concerns you may have.</p>
        </div>
      </div>

    </section>
  )
}

export default About
