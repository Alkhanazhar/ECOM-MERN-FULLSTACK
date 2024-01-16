import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Layout.module.css";
import notFoundImage from "../../assets/not-found.svg";

const PageNotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="row">
      <img src={notFoundImage} alt="" />

      <button className={styles.navigate} onClick={() => navigate("/home")}>
        Home
      </button>
    </div>
  );
};

export default PageNotFound;
