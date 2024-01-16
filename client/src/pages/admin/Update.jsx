import React, { useEffect, useState } from "react";
import AdminMenu from "./AdminMenu";
import axios from "axios";
import { BackEndUrl } from "../../utils/Utils";
import { Select } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const { Option } = Select;

const Update = () => {
  const [category, setCategory] = useState([]);
  const [singleCategory, setSingleCategory] = useState([]);
  const [name, setName] = useState("");
  const [shipping, setShipping] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [photo, setPhoto] = useState("");
  const [id, setId] = useState("");
  const navigate = useNavigate();
  const params = useParams();
  const getProduct = async () => {
    try {
      const { data } = await axios.get(`${BackEndUrl}/products/${params.slug}`);
      if (data.product) {
        setName(data.product.name);
        setDescription(data.product.description);
        setPhoto(data.product.photo);
        setPrice(data.product.price);
        setQuantity(data.product.quantity);
        setId(data.product._id);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !name ||
      !shipping ||
      !description ||
      !price ||
      !quantity ||
      !singleCategory ||
      !description
    ) {
      return toast.error("fill the empty input");
    }
    try {
      const productData = {
        name: name,
        description: description,
        price: price,
        quantity: quantity,
        photo: photo,
        shipping: shipping,
        category: singleCategory,
      };
      const { data } = await axios.put(
        `${BackEndUrl}/products/${id}`,
        productData
      );
      if (data) {
        toast.success(data?.message);
        navigate("/dashboard/admin/get-products");
      } else {
        toast.success("Product Created Successfully");
        navigate("/dashboard/admin/get-products");
      }
    } catch (error) {
      console.log(error.message);
      toast.error("something went wrong");
    }
  };
  const getCategory = async () => {
    try {
      const { data } = await axios.get(`${BackEndUrl}/get-category`);
      if (data.success) {
        setCategory(data.category);
      }
    } catch (error) {
      console.log(error.message);
      toast.error(error.message, "can't send");
    }
  };
  useEffect(() => {
    getCategory();
    getProduct();
  }, []);
  const handleDelete = async () => {
    try {
      let answer = window.prompt(`Are you sure you want`);
      console.log(answer);
      console.log(id);
      if (!answer) return;
      const { data } = await axios.delete(`${BackEndUrl}/products/${id}`);
      toast.success("Product DEleted Succfully");
      //  navigate("/dashboard/admin/products");
      navigate("/dashboard/admin/get-products");
    } catch (error) {
      console.log(error.message);
      toast.error("Something went wrong");
    }
  };
  return (
    <div className="container-fluid m-3 p-3">
      <div className="row">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <h1>Update Product</h1>
          <Select
            bordered={false}
            placeholder="Select a category"
            size="large"
            showSearch
            className="form-select mb-3"
            onChange={(value) => {
              setSingleCategory(value);
            }}
          >
            {category?.map((c) => (
              <Option key={c._id} value={c._id}>
                {c.name}
              </Option>
            ))}
          </Select>
          <div className="mb-3">
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                className="form-control mb-3"
                placeholder="Enter products name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="text"
                className="form-control mb-3"
                placeholder="Enter products description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <input
                type="text"
                className="form-control mb-3"
                placeholder="Enter price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
              <input
                type="text"
                className="form-control mb-3"
                placeholder="Enter products Quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
              <input
                type="text"
                className="form-control mb-3"
                placeholder="Enter products image Url"
                value={photo}
                onChange={(e) => setPhoto(e.target.value)}
              />
              <input
                type="text"
                className="form-control mb-3"
                placeholder="Enter shipping"
                value={shipping}
                onChange={(e) => setShipping(e.target.value)}
              />
              <button type="submit" className="btn btn-sm btn-primary w-100">
                submit
              </button>
            </form>
            <button
              onClick={handleDelete}
              className="btn btn-sm btn-danger w-100"
            >
              delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Update;
