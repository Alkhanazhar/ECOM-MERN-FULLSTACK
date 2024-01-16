import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/auth";
import { useCart } from "../../context/cart";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { v4 as uuid } from "uuid";
import axios from "axios";
import { BackEndUrl } from "../../utils/Utils";
import DropIn from "braintree-web-drop-in-react";

const Cart = () => {
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const totalPrice = () => {
    try {
      let totalPrice = 0;
      const price = cart?.map((item) => {
        totalPrice += +item.price;
      });
      return totalPrice.toLocaleString("en-US", {
        currency: "USD",
        // style: "currency"
      });
    } catch (error) {
      console.log(error.message);
    }
  };
  const removeItem = (id) => {
    const allCartItems = [...cart];
    const findRemoveIndex = allCartItems.findIndex((item) => item._id === id);
    allCartItems.splice(findRemoveIndex, 1);
    localStorage.setItem("cart", JSON.stringify(allCartItems));
    setCart(allCartItems);
    toast.success("item 😊 removed successfully");
  };

  const getToken = async (req, res) => {
    try {
      const { data } = await axios.get(`${BackEndUrl}/braintree/token`);
      console.log(data);
      setClientToken(data?.clientToken);
    } catch (error) {
      console.log(error.message);
    }
  };
  const handlePayment = async () => {
    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post(`${BackEndUrl}/braintree/payment`, {
        nonce,
        cart,
      });
      setLoading(false);
      localStorage.removeItem("cart");
      setCart([]);
      navigate("/dashboard/user/orders");
      toast.success("Payment Completed Successfully ");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  useEffect(() => {
    getToken();
  }, [auth?.token]);
  return (
    <>
      <h2 className="text-capitalize text-center letter-spacing">{`hello , ${
        auth?.token && auth?.user.name
      }`}</h2>
      {cart.length > 0 ? (
        <>
          <div className="row border p-2">
            <div className="col-md-7">
              {cart.map((item) => {
                return (
                  <div key={uuid()} className="row border p-2 mb-2">
                    <div className="col-md-4">
                      <img src={item.photo} className="w-100 h-100" alt="" />
                    </div>
                    <div className="col-md-8">
                      <h6 className="letter-spacing">{item.name}</h6>
                      <hr />
                      <h6>$ {item.price} </h6>
                      <hr />
                      <h6>{item._id}</h6>
                      <div className="mt-3">
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => removeItem(item._id)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="col-md-5">
              <h2>cart & payment</h2>
              <hr />
              <h4>total pay of : $ {totalPrice()}</h4>
              <hr />
              {auth?.user?.address ? (
                <>
                  <div className="mb-3">
                    <h4>Current Address</h4>
                    <h6>{auth?.user?.address}</h6>
                    <button
                      className="btn btn-outline-warning"
                      onClick={() => navigate("/dashboard/user/profile")}
                    >
                      Update Address
                    </button>
                  </div>
                  <div className="mt-2">
                    {!clientToken || !cart?.length ? (
                      ""
                    ) : (
                      <>
                        <DropIn
                          options={{
                            authorization: clientToken,
                            paypal: {
                              flow: "vault",
                            },
                          }}
                          onInstance={(instance) => setInstance(instance)}
                        />
                        <div className="text-center">
                          <button
                            className="btn btn-primary w-100 text-center"
                            onClick={handlePayment}
                            disabled={
                              loading || !instance || !auth?.user?.address
                            }
                          >
                            {loading ? "Processing ...." : "Make Payment"}
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </>
              ) : (
                <div className="mb-3">
                  {auth?.token ? (
                    <>
                      <button
                        className="btn btn-outline-warning"
                        onClick={() => navigate("/dashboard/user/profile")}
                      >
                        Update Address
                      </button>
                    </>
                  ) : (
                    <button
                      className="btn btn-outline-warning"
                      onClick={() =>
                        navigate("/login", {
                          state: "/cart",
                        })
                      }
                    >
                      Plase Login to checkout
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </>
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h2 className="letter-spacing">
            your cart is empty {auth.token ? auth.user.name : "login"} 🛒
          </h2>
        </div>
      )}
    </>
  );
};

export default Cart;
