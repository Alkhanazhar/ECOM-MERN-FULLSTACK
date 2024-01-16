import React from "react";
import AdminMenu from "./AdminMenu";
import { useAuth } from "../../context/auth";

const AdminDashboard = () => {
  const [auth] = useAuth();
  return (
    <div className="container p-3">
      <div className="row">
        <div className="col-md-4">
          <AdminMenu />
        </div>
        <div className="col-md-8">
          <div className="col-md-9">
            <div className="card w-75 p-3">
              <h4> Admin Name : {auth?.user?.name}</h4>
              <h4> Admin Email : {auth?.user?.email}</h4>
              <h4> Admin Contact : {auth?.user?.phone}</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
