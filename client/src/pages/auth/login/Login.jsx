import React, { useState } from "react";
import styles from "../register/Register.module.css";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../../context/auth";
import { BackEndUrl } from "../../../utils/Utils";
const Login = () => {
  const [auth, setAuth] = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const location = useLocation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(formData);
      const res = await axios.post(`${BackEndUrl}/login`, { ...formData });

      if (res.data.success) {
        setAuth({ ...auth, user: res.data.user, token: res.data.token });
        toast.success(res.data.message);
        window.localStorage.setItem("auth", JSON.stringify(res.data));
        console.log(location);
        navigate(location.state || "/home");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error("something went wrong");
    }
    setFormData({
      email: "",
      password: "",
    });
  };

  return (
    <div>
      <h2 className={styles.h2}>Log in</h2>
      <form onSubmit={handleSubmit} className={styles}>
        <br />
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </label>
        <br />

        <br />
        <button type="submit" className={styles.button}>
          sign in
        </button>
      </form>
    </div>
  );
};

export default Login;
