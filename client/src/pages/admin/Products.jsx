import axios from "axios";
import React, { useEffect, useState } from "react";
import { BackEndUrl } from "../../utils/Utils";
import AdminMenu from "./AdminMenu";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import styles from "./Admin.module.css";

const Products = () => {
  const [category, setCategory] = useState([]);
  const getProducts = async () => {
    try {
      const { data } = await axios.get(`${BackEndUrl}/products/`);
      if (data.success) {
        setCategory(data.products);
      }
    } catch (error) {
      console.error(error.message);
      toast.error(error.message);
    }
  };
  useEffect(() => {
    getProducts();
  }, []);
  return (
    <>
      <div className="row">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9 d-flex flex-wrap">
          {category?.map((c) => {
            return (
              <Link key={c._id}
                className={styles.card}
                to={`/dashboard/admin/products/${c.slug}`}
              >
                <Card style={{ width: "20rem" }} key={c._id}>
                  <Card.Img className="h-300" variant="top" src={c.photo} />
                  <Card.Body>
                    <Card.Title>{c.name.substring(0, 23)}...</Card.Title>
                    <Card.Text>
                      {c.description.substring(0, 60)}...
                    </Card.Text>{" "}
                    <Card.Text>{c.price} $</Card.Text>
                    <Button className="btn btn-sm">see</Button>
                  </Card.Body>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Products;
