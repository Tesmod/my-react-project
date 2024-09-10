import React, { useState, useRef, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal as BootstrapModal } from "bootstrap";
import img1 from "../resources/doctors/doctors-1.jpg";

function UserProfile() {
  const [show, setShow] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "johndoe@example.com",
    about:
      "Hello, I'm John Doe, a passionate web developer with experience in building responsive and user-friendly websites.",
    favoriteCategory: "Electronics",
    favoriteBrand: "Apple",
  });

  const modalRef = useRef(null);

  const handleShow = () => {
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
    setIsEditing(false);
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsEditing(false);
    console.log("Profile updated:", profile);
    handleClose(); // Close modal after saving changes
  };

  useEffect(() => {
    if (modalRef.current) {
      const bsModal = new BootstrapModal(modalRef.current);
      show ? bsModal.show() : bsModal.hide();
    }
  }, [show]);

  return (
    <>
      {/* Navbar with Profile Icon */}
      <nav className="navbar navbar-light bg-light justify-content-between ">
        <div className="container-fluid">
          <button
            className="btn btn-outline-primary rounded-circle p-2"
            onClick={handleShow}
            style={{ border: "none" }}
          >
            <img
              src={img1}
              alt="Profile Icon"
              width="30"
              height="30"
              className="d-inline-block align-text-top"
              style={{ borderRadius: "50%" }}
            />
          </button>
        </div>
      </nav>

      {/* Modal for User Profile */}
      <div
        className="modal fade"
        tabIndex="-1"
        ref={modalRef}
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div
          className="modal-dialog modal-dialog-centered"
          role="document"
          style={{ maxWidth: "800px" }} // Increased width for modal
        >
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">User Profile</h5>
              <button
                type="button"
                className="btn-close"
                onClick={handleClose}
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {isEditing ? (
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      value={profile.name}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      value={profile.email}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">About Me</label>
                    <textarea
                      className="form-control"
                      name="about"
                      value={profile.about}
                      onChange={handleChange}
                    ></textarea>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Favorite Category</label>
                    <input
                      type="text"
                      className="form-control"
                      name="favoriteCategory"
                      value={profile.favoriteCategory}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Favorite Brand</label>
                    <input
                      type="text"
                      className="form-control"
                      name="favoriteBrand"
                      value={profile.favoriteBrand}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={handleClose}
                    >
                      Close
                    </button>
                    <button type="submit" className="btn btn-primary">
                      Save Changes
                    </button>
                  </div>
                </form>
              ) : (
                <>
                  <div className="text-center mb-4">
                    <img
                      src={img1}
                      alt="User Avatar"
                      className="rounded-circle"
                      style={{ width: "100px", height: "100px" }}
                    />
                  </div>
                  <h5 className="text-center">{profile.name}</h5>
                  <p className="text-muted text-center">{profile.email}</p>
                  <div className="mt-4">
                    <h6>About Me:</h6>
                    <p>{profile.about}</p>
                    <h6>Preferences:</h6>
                    <ul>
                      <li>Favorite Category: {profile.favoriteCategory}</li>
                      <li>Favorite Brand: {profile.favoriteBrand}</li>
                    </ul>
                  </div>
                </>
              )}
            </div>
            {!isEditing && (
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleClose}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleEditToggle}
                >
                  Edit Profile
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default UserProfile;
