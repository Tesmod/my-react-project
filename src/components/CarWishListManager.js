import React from "react";
import Swal from "sweetalert2";
import { FaTrash } from "react-icons/fa";

function CarWishListManager(cart, wishlist, setCart, setWishlist) {
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
      showAlert(
        "Already in Cart",
        `${product.title} is already in your cart!`,
        "info"
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

  return (
    <div className="container my-5">
      <div className="row">
        <div className="col-6">
          <h2>Wishlist</h2>
          <ul className="list-group">
            {wishlist.map((product) => (
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
            ))}
          </ul>
        </div>
        <div className="col-6">
          <h2>Cart</h2>
          <ul className="list-group">
            {cart.map((product) => (
              <li
                key={product.id}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                {product.title}
                <button
                  className="btn btn-danger"
                  onClick={() => removeCart(product.id)}
                >
                  <FaTrash />
                </button>
              </li>
            ))}
          </ul>
          <p className="lead text-center my-4 text-primary fw-bold">
            Total Price: $
            {cart
              .reduce(
                (acc, product) => acc + product.price * product.quantity,
                0
              )
              .toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
}

export default CarWishListManager;
