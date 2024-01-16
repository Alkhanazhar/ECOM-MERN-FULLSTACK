import React, { useEffect, useState } from "react";
import AdminMenu from "./AdminMenu";
import axios from "axios";
import { BackEndUrl } from "../../utils/Utils";
import { toast } from "react-toastify";
import CategoryForm from "../../components/form/CategoryForm";
import { Modal } from "antd";

const CreateCategory = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatedName, setUpdatedName] = useState("");
  const [category, setCategory] = useState([]);
  const [name, setName] = useState("");
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const getCategory = async () => {
    try {
      const { data } = await axios.get(`${BackEndUrl}/get-category`);
      if (data.success) {
        setCategory(data.category);
      }
    } catch (error) {
      console.log(error.message);
      toast.error(error.message, "cant send");
    }
  };
  //handle submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data } = await axios.post(`${BackEndUrl}/create-category`, {
      name,
    });
    if (data) {
      toast.success(data.message);
      getCategory();
    }
    setName("");
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `${BackEndUrl}/update-category/${selected._id}`,
        { name: updatedName }
      );
      if (data) {
        toast.success(`${updatedName} is updated`);
        setSelected(null);
        setUpdatedName("");
        setIsModalOpen(false);
        getCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Somtihing went wrong");
    }
  };
  useEffect(() => {
    getCategory();
  }, []);

  const handleDelete = async (pId) => {
    try {
      const { data } = await axios.delete(
        `${BackEndUrl}/delete-category/${pId}`
      );
      if (data) {
        toast.success(`category is deleted`);
        getCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Somtihing went wrong");
    }
  };
  return (
    <>
      <div className="row">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <h1>Create Category</h1>
          <CategoryForm
            handleSubmit={handleSubmit}
            value={name}
            setValue={setName}
          />
        </div>
        <table className="table mt-3">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {category?.map((c) => (
              <tr key={c._id}>
                <td>
                  <h4>{c.name}</h4>
                </td>
                <td>
                  <button
                    className="btn btn-primary ms-2 btn-sm"
                    onClick={() => {
                      setIsModalOpen(true);
                      setUpdatedName(c.name);
                      setSelected(c);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger ms-2 btn-sm"
                    onClick={() => {
                      console.log(c._id);
                      handleDelete(c._id);
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Modal
          title="Edit Category"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <CategoryForm
            handleSubmit={handleUpdate}
            value={updatedName}
            setValue={setUpdatedName}
          />
        </Modal>
      </div>
    </>
  );
};

export default CreateCategory;
