import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Ensure Bootstrap is imported

const MyContact = () => {
  const [user, setUser] = useState({
    fname: "",
    lname: "",
    email: "",
    tel: "",
    gender: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const { fname, lname, gender, tel, email, password } = user;
    if (!email || !tel || !fname || !gender || !lname || !password) {
      alert("Please fill in all the required details.");
      return;
    }
    alert(
      `The registered user details are: ${fname} ${lname}, ${email}, ${tel}, ${gender} and ${
        password !== "" ? "**************" : "--------------"
      }`
    );
    console.log(user);

    setUser({
      fname: "",
      lname: "",
      email: "",
      tel: "",
      gender: "",
      password: "",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((user) => ({ ...user, [name]: value }));
  };

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Contact Form</h2>
      <form onSubmit={handleSubmit} className="row g-3 was-validated">
        <div className="col-md-6">
          <label htmlFor="fname" className="form-label">
            First Name
          </label>
          <input
            onChange={handleChange}
            value={user.fname}
            type="text"
            name="fname"
            id="fname"
            className="form-control"
            required
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="lname" className="form-label">
            Last Name
          </label>
          <input
            onChange={handleChange}
            value={user.lname}
            type="text"
            name="lname"
            id="lname"
            className="form-control"
            required
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            onChange={handleChange}
            value={user.email}
            type="email"
            name="email"
            id="email"
            className="form-control"
            required
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="tel" className="form-label">
            Phone
          </label>
          <input
            onChange={handleChange}
            value={user.tel}
            type="tel"
            name="tel"
            id="tel"
            className="form-control"
            required
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="gender" className="form-label">
            Gender
          </label>
          <select
            value={user.gender}
            name="gender"
            id="gender"
            onChange={handleChange}
            className="form-select"
            required
          >
            <option value="">Select</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className="col-12">
          <button type="submit" className="btn btn-primary w-100">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default MyContact;
