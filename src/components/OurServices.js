import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function OurServices() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  return (
    <div className="container my-5">
      <h3 className="text-center mb-4">Our Products</h3>
      <div className="row">
        {products.map(({ id, title, image, price, description, category }) => (
          <div className="col-md-4 mb-4" key={id}>
            <div className="card h-100 shadow-sm">
              <img
                src={image}
                className="card-img-top"
                alt={title}
                style={{ objectFit: "contain", height: "250px" }}
              />
              <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <p className="card-text">
                  <small className="text-muted">{category}</small>
                </p>
                <p className="card-text text-truncate">{description}</p>
                <h6 className="card-text text-primary">${price}</h6>
              </div>
              <div className="card-footer">
                <button className="btn btn-primary w-100">Add to Cart</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OurServices;
