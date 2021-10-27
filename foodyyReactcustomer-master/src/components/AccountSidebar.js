import React from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { Button, ListGroup } from "reactstrap";
import { removeUser } from "../redux/User/actions";

const AccountSidebar = () => {
  const dispatch = useDispatch();
  return (
    <ListGroup>
      <NavLink
        to="/account/profile"
        className="text-decoration-none rounded-3"
        
        activeClassName="bg-primary text-white"
      >
        <h4 className="px-4 p-2">Profile</h4>
      </NavLink>
      <NavLink
        to="/account/orders"
        
        className=" text-decoration-none rounded-3"
        activeClassName="bg-primary text-white"
      >
        <h4 className="px-4 p-2">Orders</h4>
      </NavLink>
      <NavLink
        to="/account/addresses"
        
        className=" text-decoration-none rounded-3"
        activeClassName="bg-primary text-white"
      >
        <h4 className="px-4 p-2">Delivery addresses</h4>
      </NavLink>
      <NavLink
        to="/account/help-center"
        className=" text-decoration-none rounded-3"
        activeClassName="bg-primary text-white"
      >
        <h4 className="px-4 p-2">Help center</h4>
      </NavLink>
      <Button
        outline
        className=" btn-outline-primary pt-2 text-decoration-none rounded-3"
        onClick={() => {
          dispatch(removeUser());
        }}
      >
        <h4 className="px-4 p-2">LOGOUT</h4>
      </Button>
    </ListGroup>
  );
};

export default AccountSidebar;
