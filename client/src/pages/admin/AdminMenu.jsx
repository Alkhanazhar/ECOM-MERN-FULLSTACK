import React from 'react'
import ListGroup from 'react-bootstrap/ListGroup';
import {  NavLink } from 'react-router-dom';
import styles from "./Admin.module.css";

const AdminMenu = () => {
  return (
    <>
        <div className="list-group">
      <ListGroup as="ul">
        <ListGroup.Item
          as="li"
          active
          style={{
            background: "#ff5a5f",
            border: "none",
            fontSize: "1.6rem",
          }}
        >
          Admin
        </ListGroup.Item>
        <NavLink
          className="list-group-item list-group-item-action"
          to={"/dashboard/admin/create-category"}
        >
          create-category
        </NavLink>
        <NavLink
          className="list-group-item list-group-item-action"
          to={"/dashboard/admin/create-product"}
        >
          create-product
        </NavLink>
        <NavLink
          className="list-group-item list-group-item-action"
          to={"/dashboard/admin/get-products"}
        >
        get-products
        </NavLink>
      </ListGroup>
      </div>
    </>
  );
}

export default AdminMenu
