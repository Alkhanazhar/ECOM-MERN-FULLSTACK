import React, { useEffect, useState } from "react";
import HelmetContainer from "../components/layout/Helmet";
// import { useAuth } from "../context/auth";
import axios from "axios";
import { BackEndUrl, Prices } from "../utils/Utils";
import { Checkbox, Radio } from "antd";
import { v4 as uuid } from "uuid";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/cart";
import { toast } from "react-toastify";
import img from "./../assets/bg-ecom.jpg";
import styles from "./Home.module.css";

const Homepage = () => {
  const navigate = useNavigate();
  // const [auth, setAuth] = useAuth();
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [cart, setCart] = useCart();

  const getProducts = async () => {
    try {
      const { data } = await axios.get(`${BackEndUrl}/products`);
      setProducts(data?.products);
    } catch (error) {
      console.log(error.message);
    }
  };

  const getCategories = async () => {
    try {
      const { data } = await axios.get(`${BackEndUrl}/get-category`);
      setCategories(data.category);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
    console.log(checked);
  };
  useEffect(() => {
    if (!checked.length || !radio.length) getProducts();
    getCategories();
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio]);

  //get filterd product
  const filterProduct = async () => {
    try {
      const { data } = await axios.post(`${BackEndUrl}/products-filter`, {
        checked,
        radio,
      });
      setProducts(data?.filterProducts);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <HelmetContainer title={"Home | ECOMMERCE"} />
      <div className={styles.hero}>
        <img src={img} alt="" className={styles.bgHome} />
        <h1 className={styles.bigHeading}>
          welcome to <br /> fashion world
        </h1>
      </div>
      <div className="row mt-4">
        <div className="col-md-3 sidebar-filter">
          <h6 className={styles.heading}>filter by category</h6>
          <hr />
          <div className="d-flex flex-column">
            {categories?.map((c) => (
              <p>
                <Checkbox
                  className={styles.chechkbox}
                  key={c._id}
                  onChange={(e) => handleFilter(e.target.checked, c._id)}
                >
                  {c.name}
                </Checkbox>
              </p>
            ))}
          </div>
          <h6 className={styles.heading}>Filter By Price</h6>
          <hr />
          <div className="d-flex flex-column">
            <Radio.Group onChange={(e) => setRadio(e.target.value)}>
              {Prices?.map((p) => (
                <div key={uuid()}>
                  <Radio value={p.array}>
                    <p>{p.name}</p>
                  </Radio>
                </div>
              ))}
            </Radio.Group>
            <div className="mt-3">
              <button
                onClick={() => window.location.reload()}
                className="btn btn-sm btn-danger"
              >
                reload
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-9 main-home">
          <h2 className={styles.heading}>All Products</h2>
          <div className="d-flex flex-wrap">
            {products?.map((p) => (
              <div
                key={p._id}
                className={styles.cardHome}
                style={{ width: "18rem" }}
              >
                <img src={p.photo} className="card-img-top" alt={p.name} />
                <div className="card-body">
                  <h5 className="card-title">{p.name.substring(0, 20)}..</h5>
                  <p className="card-text">
                    {p.description.substring(0, 30)}...
                  </p>
                  <p className="card-text"> $ {p.price}</p>
                  <div className="btn-grp-main">
                    <button
                      className="btn btn-primary btn-sm ms-1"
                      onClick={() => navigate(`/home/${p.slug}`)}
                    >
                      More Details
                    </button>
                    <button
                      className="btn btn-secondary btn-sm ms-1"
                      onClick={() => {
                        window.localStorage.setItem(
                          "cart",
                          JSON.stringify([...cart, p])
                        );
                        setCart([...cart, p]);
                        toast.success("product succesfully added");
                      }}
                    >
                      ADD TO CART
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Homepage;
