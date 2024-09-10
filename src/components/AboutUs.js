import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function AboutUs() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products?limit=3")
      .then((response) => response.json())
      .then((data) => setProducts(data));
  }, []);

  return (
    <div className="container my-5">
      {/* About Us Section */}
      <div className="row justify-content-center text-center mb-5">
        <div className="col-lg-8">
          <h1 className="display-4 fw-bold">About Our Store</h1>
          <p className="lead mt-4">
            Welcome to our e-commerce store, where quality meets convenience.
            Discover a curated selection of products that cater to all your
            needs. From the latest trends to timeless classics, we have
            something for everyone.
          </p>
        </div>
      </div>

      {/* Featured Products Section */}
      <div className="row justify-content-center">
        {products.map(({ id, title, description, image }) => (
          <div className="col-md-4 mb-4" key={id}>
            <div className="card h-100 shadow-lg border-0">
              <img
                src={image}
                className="card-img-top rounded"
                alt={`Product ${title}`}
                style={{
                  objectFit: "contain",
                  height: "380px",
                  width: "100%",
                  borderRadius: "10px",
                }}
              />
              <div className="card-body">
                <h5 className="card-title text-dark fw-bold">{title}</h5>
                <p className="card-text text-muted">
                  {description.length > 100
                    ? `${description.substring(0, 100)}...`
                    : description}
                </p>
                <a href="#" className="btn btn-primary mt-3 w-100">
                  Learn More
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Our Mission Section */}
      <div className="row justify-content-center text-center mt-5">
        <div className="col-lg-8">
          <h2 className="display-6 fw-bold">Our Mission</h2>
          <p className="mt-3">
            Our mission is to deliver the best shopping experience by offering
            top-quality products, competitive prices, and exceptional customer
            service. Your satisfaction is our priority, and we are committed to
            helping you find exactly what you need.
          </p>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="row justify-content-center text-center mt-5">
        <div className="col-lg-6">
          <h3 className="fw-bold">Join Our Community</h3>
          <p className="mt-3">
            Sign up for our newsletter to stay updated on the latest products
            and exclusive offers.
          </p>
          <a href="#" className="btn btn-success btn-lg mt-3">
            Subscribe Now
          </a>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
