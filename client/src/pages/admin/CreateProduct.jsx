import React, { useEffect, useState } from "react";
import AdminMenu from "./AdminMenu";
import axios from "axios";
import { BackEndUrl } from "../../utils/Utils";
import { toast } from "react-toastify";
import { Select } from "antd";
import { useNavigate } from "react-router-dom";
const { Option } = Select;

const CreateProduct = () => {
  const [category, setCategory] = useState([]);
  const [singleCategory, setSingleCategory] = useState([]);
  const [name, setName] = useState("");
  const [shipping, setShipping] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [photo, setPhoto] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !name ||
      !shipping ||
      !description ||
      !price ||
      !quantity ||
      !singleCategory ||
      !shipping ||
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

      console.log(productData);
      const { data } = await axios.post(`${BackEndUrl}/products`, productData);
      if (data?.success) {
        toast.error(data?.message);
        setName("");
        setCategory("");
        setDescription("");
        setPhoto("");
        setPrice("");
        setQuantity("");
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
  }, []);

  return (
    <>
      <div className="row">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-7 main-home">
          {/* <h1>Create Product</h1> */}
          <Select
            bordered={false}
            placeholder="Select a category"
            size="large"
            showSearch
            className="form-select mb-3 w-50 m-auto"
            onChange={(value) => {
              setSingleCategory(value);
            }}
          >
              {category?.map((c) => (
                <Option  key={c._id} value={c._id}>
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
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateProduct;
