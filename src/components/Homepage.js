import React, { useState, useEffect } from "react";
import useFetch from "../components/useFetch.js";

function Homepage() {
  const [data, error] = useFetch("https://fakestoreapi.com/products?limit=4");
  const [products, setProducts] = useState([]);
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products?limit=5")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        const imageUrls = data.map((product) => product.image);
        setImages(imageUrls.slice(0, 6)); // limit to 6 images
      });
  }, []);

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-lg-6 text-center mb-5">
          <div id="demo" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-indicators">
              {images.map((image, index) => (
                <button
                  key={index}
                  type="button"
                  data-bs-target="#demo"
                  data-bs-slide-to={index}
                  className={index === 0 ? "active" : ""}
                  aria-current={index === 0 ? "true" : undefined}
                  aria-label={`Slide ${index + 1}`}
                ></button>
              ))}
            </div>

            <div className="carousel-inner">
              {images.map((image, index) => (
                <div
                  className={`carousel-item ${index === 0 ? "active" : ""}`}
                  key={index}
                >
                  <img
                    src={image}
                    alt={`Product ${index + 1}`}
                    className="d-block w-100"
                  />
                </div>
              ))}
            </div>

            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#demo"
              data-bs-slide="prev"
            >
              <span className="carousel-control-prev-icon"></span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#demo"
              data-bs-slide="next"
            >
              <span className="carousel-control-next-icon"></span>
            </button>
          </div>
        </div>

        <div className="col-lg-4">
          <ol className="list-group list-group-numbered">
            {data.map(({ category, id, title, description }) => (
              <li className="list-group-item mb-3" key={id}>
                <h5 className="mb-1">{title}</h5>
                <p className="mb-1">{description}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>

      <h3 className="text-center mb-4">Product Description</h3>

      <div className="row">
        {data.map(({ image, id, title }) => (
          <div className="col-md-4 mb-4" key={id}>
            <div className="card h-100">
              <img
                src={image}
                className="card-img-top"
                alt={`Product ${title}`}
                style={{ objectFit: "contain", height: "250px" }}
              />
              <div className="card-body">
                <h5 className="card-title">{title}</h5>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Homepage;
