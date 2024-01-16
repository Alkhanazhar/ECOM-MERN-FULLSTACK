import React, { useState } from "react";
import styles from "./Register.module.css";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BackEndUrl } from "../../../utils/Utils";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    role: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    console.log(formData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log(formData);
      const res = await axios.post(`${BackEndUrl}/register`, { ...formData });
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error("something went wrong");
    }
    setFormData({
      email: "",
      name: "",
      password: "",
      phone: "",
      address: "",
      role: "",
    });
  };

  return (
    <div>
      <h2 className={styles.h2}>Register</h2>
      <form onSubmit={handleSubmit} className={styles}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>
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
        <label>
          Phone:
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Address:
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </label>

        <br />
        <label className="d-flex mb-3">
          <input
            type="radio"
            name="role"
            value={"admin"}
            onChange={handleChange}
            required
          />
          <label>admin</label>
          <input
            type="radio"
            name="role"
            value={"buyer"}
            onChange={handleChange}
            required
          />
          <label>buyer</label>
        </label>
        <button type="submit" className={styles.button}>
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
