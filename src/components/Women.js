import React, { useState, useEffect } from "react";
import {
  FaStar,
  FaHeart,
  FaCartPlus,
  FaTrash,
  FaMinus,
  FaPlus,
} from "react-icons/fa";
import Swal from "sweetalert2";
import "bootstrap/dist/css/bootstrap.min.css";

const Women = () => {
  const [data, setData] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [modalType, setModalType] = useState(""); // For wishlist or cart modal
  const [isModalVisible, setIsModalVisible] = useState(false); // Toggle modal

  useEffect(() => {
    const fetchData = async () => {
      const randomPage = Math.floor(Math.random() * 10) + 1;
      const response = await fetch(
        `https://fakestoreapi.com/products/category/women's clothing?limit=10&page=${randomPage}`
      );
      const data = await response.json();
      setData(data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    let total = cart.reduce(
      (acc, product) => acc + product.price * product.quantity,
      0
    );
    setTotalPrice(total);
  }, [cart]);

  const showAlert = (title, text, icon) => {
    Swal.fire({
      title,
      text,
      icon,
      showConfirmButton: false,
      timer: 2000,
      toast: true,
      position: "top",
    });
  };

  const handleCart = (product) => {
    const existingProduct = cart.find((item) => item.id === product.id);
    if (existingProduct) {
      const updatedCart = cart.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
      setCart(updatedCart);
      showAlert(
        "Increased Quantity",
        `${product.title} quantity increased in your cart!`,
        "success"
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
      showAlert(
        "Added to Cart",
        `${product.title} has been added to your cart!`,
        "success"
      );
    }
  };

  const decreaseQuantity = (product) => {
    const existingProduct = cart.find((item) => item.id === product.id);
    if (existingProduct.quantity > 1) {
      const updatedCart = cart.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity - 1 } : item
      );
      setCart(updatedCart);
      showAlert(
        "Decreased Quantity",
        `${product.title} quantity decreased in your cart!`,
        "info"
      );
    } else {
      removeCart(product.id);
    }
  };

  const handleWishlist = (product) => {
    const existingProduct = wishlist.find((item) => item.id === product.id);
    if (existingProduct) {
      showAlert(
        "Already in Wishlist",
        `${product.title} is already in your wishlist!`,
        "info"
      );
    } else {
      setWishlist([...wishlist, { ...product, quantity: 1 }]);
      showAlert(
        "Added to Wishlist",
        `${product.title} has been added to your wishlist!`,
        "success"
      );
    }
  };

  const removeCart = (id) => {
    const product = cart.find((item) => item.id === id);
    const updatedCart = cart.filter((product) => product.id !== id);
    setCart(updatedCart);
    showAlert(
      "Removed from Cart",
      `${product.title} has been removed from your cart!`,
      "warning"
    );
  };

  const removeWishlist = (id) => {
    const product = wishlist.find((item) => item.id === id);
    const updatedWishlist = wishlist.filter((product) => product.id !== id);
    setWishlist(updatedWishlist);
    showAlert(
      "Removed from Wishlist",
      `${product.title} has been removed from your wishlist!`,
      "warning"
    );
  };

  const toggleModal = (type) => {
    setModalType(type);
    setIsModalVisible(!isModalVisible);
  };

  return (
    <div className="container my-5">
      {/* Buttons to toggle wishlist/cart modal */}
      <div className="d-flex justify-content-between">
        <button
          className="btn btn-primary m-3"
          onClick={() => toggleModal("wishlist")}
        >
          <FaHeart /> Wishlist
        </button>
        <button
          className="btn btn-primary m-3"
          onClick={() => toggleModal("cart")}
        >
          <FaCartPlus /> Cart
        </button>
      </div>

      {/* Wishlist and Cart Modals */}
      {isModalVisible && (
        <div
          className="modal show d-block"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-scrollable" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  {modalType === "wishlist" ? "Wishlist" : "Cart"}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => toggleModal("")}
                ></button>
              </div>
              <div className="modal-body">
                {modalType === "wishlist" ? (
                  <div className="wishlist-section">
                    <ul className="list-group">
                      {wishlist.length > 0 ? (
                        wishlist.map((product) => (
                          <li
                            key={product.id}
                            className="list-group-item d-flex justify-content-between align-items-center"
                          >
                            {product.title}
                            <button
                              className="btn btn-danger"
                              onClick={() => removeWishlist(product.id)}
                            >
                              <FaTrash />
                            </button>
                          </li>
                        ))
                      ) : (
                        <p className="text-center">No items in wishlist.</p>
                      )}
                    </ul>
                  </div>
                ) : (
                  <div className="cart-section">
                    <ul className="list-group">
                      {cart.length > 0 ? (
                        cart.map((product) => (
                          <li
                            key={product.id}
                            className="list-group-item d-flex justify-content-between align-items-center"
                          >
                            {product.title}
                            <span className="badge bg-primary rounded-pill">
                              {product.quantity}
                            </span>
                            <div className="btn-group">
                              <button
                                className="btn btn-sm btn-primary"
                                onClick={() => decreaseQuantity(product)}
                              >
                                <FaMinus />
                              </button>
                              <button
                                className="btn btn-sm btn-primary"
                                onClick={() => handleCart(product)}
                              >
                                <FaPlus />
                              </button>
                            </div>
                            <button
                              className="btn btn-danger"
                              onClick={() => removeCart(product.id)}
                            >
                              <FaTrash />
                            </button>
                          </li>
                        ))
                      ) : (
                        <p className="text-center">No items in cart.</p>
                      )}
                    </ul>
                    <p className="lead text-center my-4 text-primary fw-bold">
                      Total Price: ${totalPrice.toFixed(2)}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Product cards */}
      <h1 className="display-4">Women's Collection</h1>
      <div className="container-fluid">
        <div className="row g-4">
          {data.map((product) => (
            <div className="col-12 col-md-6 col-lg-4" key={product.id}>
              <div className="card h-100">
                <img
                  src={product.image}
                  className="card-img-top img-fluid"
                  style={{ objectFit: "contain", height: "200px" }}
                  alt={product.title}
                />
                <div className="card-body">
                  <h5 className="card-title">{product.title}</h5>
                  <p className="card-text">{product.description}</p>
                  <p className="card-text">Price: ${product.price}</p>
                  <p className="card-text">
                    Rating: {product.rating.rate} <FaStar color="blue" />
                  </p>
                </div>
                <div className="card-footer d-flex justify-content-between">
                  <button
                    className="btn btn-primary"
                    onClick={() => handleCart(product)}
                  >
                    Add to Cart <FaCartPlus />
                  </button>
                  <button
                    className="btn btn-secondary"
                    onClick={() => handleWishlist(product)}
                  >
                    Add to Wishlist <FaHeart />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Women;
