import React from "react";
import contactImage from "../../assets/contact.svg";
import styles from "./Contact.module.css";
import HelmetContainer from "../../components/layout/Helmet";

function Contact() {
  return (
    <>
      <HelmetContainer title={"contact - us | ECOMMERCE"} />
      <div className={styles.contactUsContainer}>
        <div className={styles.imageContainer}>
          <img
            src={contactImage}
            alt="Contact Us"
            className={styles.contactImage}
          />
        </div>
        <div className={styles.contentContainer}>
          <h2>Contact Us</h2>
          <p>
            Have questions or concerns? Reach out to us using the contact
            information below:
          </p>

          <h3>Contact Information</h3>
          <p>Email: info@example.com</p>
          <p>Phone: (123) 456-7890</p>

          <h3>Visit Us</h3>
          <p>123 Main Street</p>
          <p>City, Country</p>
        </div>
      </div>
    </>
  );
}

export default Contact;
