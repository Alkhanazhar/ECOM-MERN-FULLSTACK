import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/auth";
import axios from "axios";
import { Outlet } from "react-router-dom";
import SpinnerContainer from "../../utils/Spinner";

const AdminRoute = () => {
  const [ok, setOk] = useState(false);
  const [auth, setAuth] = useAuth(true);
  useEffect(() => {
    const authCheck = async () => {
      const res = await axios.get("http://localhost:8080/admin-protect");
      if (res.data.ok) {
        setOk(true);
      } else {
        setOk(false);
      }
    };
    if (auth?.token) authCheck();
  }, [auth?.token]);
  return <div>{ok ? <Outlet /> : <SpinnerContainer />}</div>;
};
export default AdminRoute;
